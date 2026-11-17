// Physically based materials for the castle work (?castle=1).
// three's MeshStandardMaterial does the surface (albedo, normal, roughness, AO, specular from a
// pre-filtered environment), and the room's own analytic light rig from materials.js LIGHTING
// replaces three's lights: diffuse light = irradiance(P, N) x baked AO + the bay's torches, which
// are baked into the light map (G) and only flicker at run time.
import * as THREE from '../vendor/three/three.module.js';
import { LIGHT, LIGHTING, NOISE, castleLighting } from './materials.js';

// shared knobs: env strength follows the room (bright by day, low at night). Once the hall has
// captured its own reflection probes (castle.js captureProbes) envMap is the day probe, uEnvMapN the
// night one, and the reflection is day*uProbeA + night*uProbeB.
export const PBR = { uEnvK: { value: 1 }, uTorchK: { value: 1 }, uEnvMapN: { value: null }, uProbeA: { value: 1 }, uProbeB: { value: 0 } };
// the sky term of the bake is stored sqrt(E/SKYMAX) (tools/blender/bake_hall.py)
const SKYMAX = 0.25;

// the room light without the analytic candles: in a castle bay the torches come from the bake
// Baked surfaces (step 5) also take the sky from the bake (B: light through the windows and the
// lantern) instead of the analytic lantern disc and window band, and scale the room's hemisphere
// ambient by uCAmb; surfaces without a bake (door leaves, inscription) keep the analytic forms.
function roomLight() {
  let s = castleLighting(LIGHTING);
  const r = (a, b) => { if (!s.includes(a)) throw new Error('LIGHTING moved: ' + a.slice(0, 50)); s = s.replace(a, b); };
  r('vec3 irradiance(vec3 P, vec3 N){', 'vec3 roomIrradiance(vec3 P, vec3 N){');
  r('if (uCandle > .003) {', 'if (CASTLE_ANALYTIC && uCandle > .003) {');
  r('vec3 E = mix(uAmbDn, uAmbUp, N.y*.5 + .5);', 'vec3 E = mix(uAmbDn, uAmbUp, N.y*.5 + .5)*(CASTLE_ANALYTIC ? 1. : uCAmb);');
  r('E += uSkyCol*max(dot(N, Lo)', 'if (CASTLE_ANALYTIC) E += uSkyCol*max(dot(N, Lo)');
  r('vec3 E = uSkyCol*uWinSky*s*', 'vec3 E = (CASTLE_ANALYTIC ? 1. : 0.)*uSkyCol*uWinSky*s*');
  return s;
}
const ROOM_LIGHT = roomLight();

// three's image-based specular, with the second (night) probe mixed in
const ENV_PARS = THREE.ShaderChunk.envmap_physical_pars_fragment.replace(
  'vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );',
  'vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness )*uProbeA + (uProbeB > .001 ? textureCubeUV( uEnvMapN, reflectVec, roughness )*uProbeB : vec4(0.));');
if (ENV_PARS === THREE.ShaderChunk.envmap_physical_pars_fragment) throw new Error('envmap chunk moved');

const PARS = /* glsl */`
uniform float uEnvK; uniform float uTorchK; uniform float uOpenA[20]; uniform float uWideA[20];
uniform sampler2D uEnvMapN; uniform float uProbeA; uniform float uProbeB; uniform float uCSky; uniform float uCAmb;
varying vec3 vCW;
${NOISE}
${ROOM_LIGHT}
`;

// the soft shade an altarpiece and the arch leave on the niche back (as mode 4 of the fresco)
const NICHE = /* glsl */`
  {
    float ang = atan(vCW.x, -vCW.z); float yy = vCW.y; float bi = floor(ang/0.314159265 + .5); float s = (ang - bi*0.314159265)*12.;
    float dTop = yy > 2.5 ? 1.5 - length(vec2(s, yy - 2.5)) : 1.5 - abs(s);
    float occ = 1. - .30*smoothstep(1.0, 0., dTop)*smoothstep(1.6, 3.4, yy) - .12*smoothstep(.5, 0., 1.5 - abs(s));
    int ki = int(mod(bi + 20., 20.) + .5); if (ki > 19) ki = 0;
    float hw = uWideA[ki]; float hh = hw > .49 ? .67 : .763;
    float wd = mix(1., 2.9, uOpenA[ki]);
    vec2 q = abs(vec2(s, yy - (1.252 + hh))) - vec2(hw*wd - .08, hh - .06);
    float sd = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - .08;
    sd = min(sd, length(vec2(s, yy - (1.302 + 2.*hh))) - hw);
    occ *= 1. - .30*smoothstep(.30, -.06, sd);
    castleE *= occ;
  }
`;

// kind: 'stone' | 'render' | 'oak' | 'iron' | 'pitch'
export function castleMaterial(kind, o) {
  const m = new THREE.MeshStandardMaterial({
    color: o.color ?? 0xffffff, roughness: o.roughness ?? 1, metalness: o.metalness ?? 0,
    map: o.map || null, normalMap: o.normalMap || null, normalScale: new THREE.Vector2(o.normal ?? 1, -(o.normal ?? 1)),
    aoMap: o.arm || null, aoMapIntensity: o.aoK ?? 1, roughnessMap: o.arm || null, metalnessMap: o.metalMap ? o.arm : null,
    envMap: o.env || null, envMapIntensity: o.envK ?? 0.35, lightMap: o.lm || null, lightMapIntensity: 0,
    alphaTest: o.alphaTest ?? 0,
  });
  m.defines = { CASTLE_ANALYTIC: o.lm ? 'false' : 'true' }; if (o.polar) m.defines.FLOOR_POLAR = '';
  m.name = 'castle-' + kind;
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, LIGHT, PBR);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vCW;')
      .replace('#include <project_vertex>', '#include <project_vertex>\n  vCW = (modelMatrix*vec4(transformed, 1.)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + PARS).replace('#include <envmap_physical_pars_fragment>', ENV_PARS)
      // calm a busy texture: pull it part of the way to its own average colour
      .replace('#include <map_fragment>', o.mapMean ? `#include <map_fragment>
  diffuseColor.rgb = mix(diffuse*vec3(${o.mapMean.map((v) => v.toFixed(3)).join(', ')}), diffuseColor.rgb, ${(o.mapK ?? 1).toFixed(3)});${o.moss ? `
  // the faintest moss, low down where the damp would sit
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb*vec3(.80, .90, .70), ${o.moss.toFixed(3)}*smoothstep(.9, .05, vCW.y)*smoothstep(.35, .75, vnoise(vCW*2.7)));` : ''}` : '#include <map_fragment>')
      .replace('#include <lights_fragment_maps>', /* glsl */`#include <lights_fragment_maps>
  {
    vec3 Nw = inverseTransformDirection(normal, viewMatrix);
    #if defined(USE_LIGHTMAP) && defined(FLOOR_POLAR)
    // the floor: one wedge of the bake for every exhibition bay, its own for the door bay (bay 10)
    float fa = atan(vCW.x, -vCW.z); float fb = floor(fa/0.314159265 + .5);
    float fu = clamp((fa - fb*0.314159265)/0.314159265 + .5, .002, .998)*.5 + (abs(mod(fb + 20., 20.) - 10.) < .5 ? .5 : 0.);
    vec4 lmS = texture2D(lightMap, vec2(fu, 1. - length(vCW.xz)/12.7));
    #elif defined(USE_LIGHTMAP)
    vec4 lmS = lightMapTexel;
    #else
    vec4 lmS = vec4(1., 0., 0., .5);
    #endif
    float flick = 1. + .06*(vnoise(vec3(uTime*7.3, 2.1, 0.)) - .5)*2.;
    float bakedAO = pow(lmS.r, .65);   // the bake sees proxies, not the whole room: soften it
    vec3 castleE = roomIrradiance(vCW, Nw)*bakedAO;
    #ifdef USE_LIGHTMAP
    castleE += uCandleCol*uCandle*uTorchK*(lmS.g*4.*flick + .03);
    // the sky through the windows (amber glass) and the open lantern, with its bounces
    castleE += uSkyCol*uCSky*(lmS.b*lmS.b*${SKYMAX.toFixed(2)})*vec3(1.03, .90, .74);
    #endif
    ${kind === 'render' ? NICHE : ''}
    iblIrradiance = castleE*PI;    // feeds the energy-conserving diffuse of RE_IndirectSpecular
    irradiance = vec3(0.);
    radiance *= uEnvK;
  }`)
      .replace('#include <opaque_fragment>', /* glsl */`
  outgoingLight = mix(outgoingLight, uHazeCol, 1. - exp(-length(cameraPosition - vCW)*uHaze));
  #include <opaque_fragment>`);
  };
  m.customProgramCacheKey = () => 'castle-' + kind + (o.lm ? '' : '-nolm') + (o.polar ? '-polar' : '') + (o.alphaTest ? '-at' : '');
  return m;
}


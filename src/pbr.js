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

// Step 6, the wear of the hall, warm and never dirty (the plan's caps: nothing darker than x0.85,
// no green, no blue-black). All analytic from the world position except the edges, which read the
// curvature baked into the light map (A). ?nowear turns it off, for before/after comparisons.
const NOWEAR = typeof location !== 'undefined' && new URLSearchParams(location.search).has('nowear');
const WEAR = /* glsl */`
// rising damp at the foot of the wall: up to 0.55 m, the edge broken by noise at 1.5 per metre
float wDamp(vec3 P){
  if (length(P.xz) < 11.0) return 0.;
  float e = .55 + .09*(vnoise(P*1.5) - .5)*2.;
  return 1. - smoothstep(e - .20, e, P.y);
}
// soot over each torch (y 3.0-4.4, 0.35 wide) and a breath of it under the string course
float wSoot(vec3 P){
  if (length(P.xz) < 10.8) return 0.;
  float ang = atan(P.x, -P.z); float a0 = (floor(ang/0.314159265) + .5)*0.314159265; float s = (ang - a0)*12.;
  float dy = P.y - 3.7; float g = exp(-.5*(s*s/(.12*.12) + dy*dy/(.33*.33)))*(.8 + .2*vnoise(P*6.));
  float band = exp(-.5*s*s/(.28*.28))*smoothstep(5.15, 5.58, P.y)*step(P.y, 5.62);
  return max(g, band*.35);
}
// feet: the walkway ring (r 9.2-11.0) and the way from the middle to the door (bay 10, +z)
float wPolish(vec3 P){
  float r = length(P.xz);
  float ring = smoothstep(9.0, 9.4, r)*(1. - smoothstep(10.9, 11.2, r));
  float path = (1. - smoothstep(.55, 1.05, abs(P.x)))*step(0., P.z)*smoothstep(1.8, 2.4, r);
  return max(ring, path)*(.70 + .30*vnoise(P*.9));
}
`;

const PARS = /* glsl */`
uniform float uEnvK; uniform float uTorchK; uniform float uOpenA[20]; uniform float uWideA[20];
uniform sampler2D uEnvMapN; uniform float uProbeA; uniform float uProbeB; uniform float uCSky; uniform float uCAmb;
varying vec3 vCW;
${NOISE}
${ROOM_LIGHT}
${WEAR}
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

// the wear on the albedo (after the map) and on the roughness
function wearColour(w) {
  if (!w) return '';
  if (w === 'wall') return /* glsl */`
  {
    float dmp = wDamp(vCW), sot = wSoot(vCW);
    diffuseColor.rgb *= mix(vec3(1.), vec3(.90, .86, .80), dmp);    // warm brown, x0.86 at most
    diffuseColor.rgb *= mix(vec3(1.), vec3(.86, .85, .84), sot);    // x0.85 at the heart of a soot mark
    #if defined(USE_LIGHTMAP) && !defined(FLOOR_POLAR)
    diffuseColor.rgb *= 1. + .06*smoothstep(.62, .85, texture2D(lightMap, vLightMapUv).a);   // worn, lighter edges
    #endif
  }`;
  if (w === 'floor') return /* glsl */`
  diffuseColor.rgb *= 1. + .05*wPolish(vCW);`;
  if (w === 'rose') return /* glsl */`
  {
    // the rose as two stones: pale petals and centre, a warm red-brown ground between them and in the outer band
    float r = length(vCW.xz); float a = atan(vCW.x, -vCW.z); float d = a - floor(a/0.785398 + .5)*0.785398;
    float t = clamp((r - .40)/1.16, 0., 1.); float w = sin(3.14159*t)*.30*(1. - .35*t);
    float petal = (1. - smoothstep(-.012, .012, abs(d)*r - w*r))*step(.40, r)*step(r, 1.56);
    float ground = step(.40, r)*(1. - petal);
    diffuseColor.rgb *= mix(vec3(1.10, 1.08, 1.04), vec3(.66, .50, .38), ground);
  }`;
  return '';
}
function wearRough(w) {
  if (w === 'wall') return '\n  roughnessFactor = max(.2, roughnessFactor - .10*wDamp(vCW));';
  if (w === 'floor') return '\n  roughnessFactor = mix(roughnessFactor, .32, wPolish(vCW));';
  return '';
}

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
  const wear = NOWEAR ? null : o.wear;   // 'wall' | 'floor' | 'rose'
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
      .replace('#include <color_fragment>', '#include <color_fragment>' + wearColour(wear))
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>' + wearRough(wear))
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
  m.customProgramCacheKey = () => 'castle-' + kind + (o.lm ? '' : '-nolm') + (o.polar ? '-polar' : '') + (o.alphaTest ? '-at' : '') + (wear ? '-w' + wear : '');
  return m;
}


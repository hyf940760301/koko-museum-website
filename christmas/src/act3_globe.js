// Act III: Clockwork Brass Snowglobe & Automaton — "The Midnight Horologium" (午夜天文钟 · V2 Director's Cut)
// Craftsmanship highlights:
// - Haute-horlogerie brass plinth with 96-tooth coin-edge fluted bezels, curved engraved brass plaque
//   ("HOROLOGIUM NOCTIS · IV" with blued-steel screws), 6Hz oscillating balance wheel & hairspring,
//   pinned music-box cylinder & 12-tooth silver steel comb!
// - 14-arch stone masonry railway viaduct with timber sleepers, half-timbered Swiss chalets with streetlamps,
//   and a 4-4-0 steam express locomotive with rotating spoked brass wheels, piston rods & glowing coach windows!
// - 100% GPU Vertex-Shader Driven Blizzard: 1,200 dendritic snowflakes + 320 tumbling 3D champagne gold-leaf
//   flakes flashing specular glints (0.00ms CPU particle loop overhead!).
// - Instantaneous pointer velocity vector injection into 3D globe angular momentum & fluid vortex spin.

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  Spring2D,
  clamp,
  lerp,
  mergeGeometries,
  transformGeo,
  batchStaticMeshes,
  collapseSolidMeshes,
  createGearGeometry,
  createCoinEdgeRingGeometry,
  createRoundedBlockGeometry,
  createFacetedStarGeometry,
  createVolumetricShaftMaterial,
  injectAnisotropicBrass,
} from './physics.js';
import { CuratedMacroRig } from './camera_rig.js';

const GLOBE_VS = /* glsl */`
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vLocalPos;
varying vec4 vScreenPos;

void main() {
  vLocalPos = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 clip = projectionMatrix * viewMatrix * wp;
  vScreenPos = clip;
  gl_Position = clip;
}
`;

// Thick blown-glass meniscus dome with base glass-thickening gradient, RGB dispersion & studio reflections
const GLOBE_FS = /* glsl */`
uniform sampler2D tRefract;
uniform float uSwirlGlow;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vLocalPos;
varying vec4 vScreenPos;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - ndv, 3.6);

  // Thick meniscus base collar magnification near bottom of glass sphere
  float baseThick = smoothstep(-0.9, -2.1, vLocalPos.y);
  vec2 uv = (vScreenPos.xy / max(vScreenPos.w, 1e-4)) * 0.5 + 0.5;
  vec3 viewN = mat3(viewMatrix) * N;
  float rimBend = ((1.0 - ndv) * 0.052 + baseThick * 0.032);

  vec2 offR = -viewN.xy * (rimBend * 0.87);
  vec2 offG = -viewN.xy * (rimBend * 1.00);
  vec2 offB = -viewN.xy * (rimBend * 1.15);

  float r = texture2D(tRefract, clamp(uv + offR, vec2(0.002), vec2(0.998))).r;
  float g = texture2D(tRefract, clamp(uv + offG, vec2(0.002), vec2(0.998))).g;
  float b = texture2D(tRefract, clamp(uv + offB, vec2(0.002), vec2(0.998))).b;
  vec3 refracted = vec3(r, g, b);

  vec3 R = reflect(-V, N);
  vec3 Lwin = normalize(vec3(-0.62, 0.66, 0.42));
  vec3 Lhearth = normalize(vec3(0.68, -0.18, 0.71));
  float specWin = pow(max(dot(R, Lwin), 0.0), 46.0) * 1.65 + smoothstep(0.80, 0.96, dot(R, Lwin)) * 0.78;
  float specFire = pow(max(dot(R, Lhearth), 0.0), 30.0) * 1.42;

  vec3 rimTint = mix(vec3(0.76, 0.91, 1.0), vec3(1.0, 0.82, 0.54), clamp(N.x * 0.5 + 0.5, 0.0, 1.0));
  vec3 glassCol = refracted * (1.0 - fresnel * 0.26);
  glassCol += rimTint * (fresnel + baseThick * 0.22) * (0.56 + uSwirlGlow * 0.35);
  glassCol += vec3(0.88, 0.95, 1.0) * specWin;
  glassCol += vec3(1.0, 0.70, 0.35) * specFire;

  gl_FragColor = vec4(glassCol, 1.0);
}
`;

// 100% GPU Vertex-Shader 3D Vortex Blizzard Snowflakes (Zero CPU iteration!)
const GPU_SNOW_VS = /* glsl */`
attribute vec4 aSeed; // x: radiusFrac, y: baseAngle, z: fallSpeed, w: phase
uniform float uTime;
uniform float uSwirlPhase;
uniform float uVortex;
uniform float uPixelRatio;
varying float vAlpha;

void main() {
  float hCycle = fract(aSeed.w - uTime * aSeed.z * (0.14 + uVortex * 0.08));
  float y = mix(-1.32, 1.98, hCycle);
  // Sphere chord envelope so no flake ever leaves the 2.16m inner glass boundary!
  float maxChord = sqrt(max(0.02, 2.14 * 2.14 - y * y));
  float r = aSeed.x * maxChord * (0.92 + 0.08 * sin(uTime * 1.7 + aSeed.w * 12.0));
  float theta = aSeed.y + uSwirlPhase * (0.7 + (1.0 - aSeed.x) * 0.9) + sin(uTime * 1.3 + aSeed.w * 9.0) * 0.35;

  vec3 pos = vec3(cos(theta) * r, y, sin(theta) * r);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float sz = mix(0.075, 0.145, fract(aSeed.w * 7.13));
  gl_PointSize = sz * uPixelRatio * (340.0 / max(-mv.z, 0.5));
  vAlpha = smoothstep(-1.32, -1.05, y) * smoothstep(1.98, 1.65, y);
}
`;

const GPU_SNOW_FS = /* glsl */`
uniform sampler2D tSnow;
varying float vAlpha;
void main() {
  vec4 tex = texture2D(tSnow, gl_PointCoord);
  if (tex.a < 0.04) discard;
  gl_FragColor = vec4(tex.rgb, tex.a * vAlpha * 0.92);
}
`;

// 100% GPU 3D Tumbling Champagne Gold-Leaf Flakes with Specular Glint Flashes (1 DrawCall!)
const GOLD_FLAKE_VS = /* glsl */`
attribute vec4 aFlakeSeed; // x: radFrac, y: baseAngle, z: spinRate, w: phase
attribute vec3 aCorner;
uniform float uTime;
uniform float uSwirlPhase;
uniform float uVortex;
varying vec3 vFlakeNormal;
varying vec3 vWorldPos;
varying float vFade;

void main() {
  float hCycle = fract(aFlakeSeed.w - uTime * (0.09 + uVortex * 0.06));
  float y = mix(-1.25, 1.90, hCycle);
  float maxChord = sqrt(max(0.02, 2.08 * 2.08 - y * y));
  float r = aFlakeSeed.x * maxChord;
  float theta = aFlakeSeed.y + uSwirlPhase * 1.15 + cos(uTime * 1.5 + aFlakeSeed.w * 11.0) * 0.3;
  vec3 center = vec3(cos(theta) * r, y, sin(theta) * r);

  // 3D tumbling rotation matrix in vertex shader!
  float ax = uTime * aFlakeSeed.z * 2.8 + uSwirlPhase * 2.2 + aFlakeSeed.w * 6.28;
  float ay = uTime * aFlakeSeed.z * 1.9 + aFlakeSeed.y;
  float cx = cos(ax), sx = sin(ax);
  float cy = cos(ay), sy = sin(ay);
  mat3 rotX = mat3(1.0, 0.0, 0.0,  0.0, cx, -sx,  0.0, sx, cx);
  mat3 rotY = mat3(cy, 0.0, sy,    0.0, 1.0, 0.0, -sy, 0.0, cy);
  mat3 tumble = rotY * rotX;

  vec3 localPos = center + tumble * aCorner;
  vec3 localNorm = tumble * vec3(0.0, 0.0, 1.0);

  vec4 wp = modelMatrix * vec4(localPos, 1.0);
  vWorldPos = wp.xyz;
  vFlakeNormal = normalize(mat3(modelMatrix) * localNorm);
  vFade = smoothstep(-1.25, -0.98, y) * smoothstep(1.90, 1.60, y);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const GOLD_FLAKE_FS = /* glsl */`
varying vec3 vFlakeNormal;
varying vec3 vWorldPos;
varying float vFade;
void main() {
  if (vFade < 0.02) discard;
  vec3 N = normalize(vFlakeNormal);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L1 = normalize(vec3(0.52, 0.74, 0.45));
  vec3 L2 = normalize(vec3(-0.45, 0.35, 0.82));
  vec3 H1 = normalize(V + L1);
  vec3 H2 = normalize(V + L2);
  // Sharp mirror glint flash when tumbling gold leaf catches studio lights!
  float glint = pow(max(dot(N, H1), 0.0), 38.0) * 4.2 + pow(max(dot(N, H2), 0.0), 28.0) * 2.5;
  float diff = 0.35 + 0.65 * abs(dot(N, L1));
  vec3 goldBase = vec3(0.96, 0.78, 0.42) * diff + vec3(1.0, 0.94, 0.76) * glint;
  gl_FragColor = vec4(goldBase * vFade, vFade);
}
`;

export function createAct3Globe({ envMap, textures, refractTex, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070910);
  scene.environment = envMap;

  const cameraRig = new CuratedMacroRig(
    new THREE.Vector3(0, 2.32, 8.28),
    new THREE.Vector3(0, 1.72, 0),
    { parallaxX: 0.75, parallaxY: 0.42, minZoom: 0.56, maxZoom: 1.18 }
  );

  // ---------------- Studio & Hearth Lighting ----------------
  scene.add(new THREE.AmbientLight(0x263558, 0.85));

  const keyLight = new THREE.DirectionalLight(0xffe6bd, 2.45);
  keyLight.position.set(5.5, 8.8, 6.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 20;
  keyLight.shadow.camera.left = -4.5;
  keyLight.shadow.camera.right = 4.5;
  keyLight.shadow.camera.top = 5.5;
  keyLight.shadow.camera.bottom = -3.0;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.radius = 3.0;
  scene.add(keyLight);

  const rimCool = new THREE.DirectionalLight(0x6ea8ff, 1.25);
  rimCool.position.set(-6.5, 5.5, -4.5);
  scene.add(rimCool);

  const globeCoreLight = new THREE.PointLight(0xffb454, 1.55, 6.8, 1.6);
  globeCoreLight.position.set(0, 2.35, 0.2);
  scene.add(globeCoreLight);

  // ---------------- Anisotropic Horology Brass & Artisan Materials ----------------
  const matBrass = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xe6ba66,
      roughnessMap: textures.brassTex,
      bumpMap: textures.brassTex,
      bumpScale: 0.008,
      metalness: 0.96,
      roughness: 0.22,
      clearcoat: 0.28,
      envMapIntensity: 2.35,
    }),
    { anisoStrength: 0.44, patinaStrength: 0.26 }
  );

  const matCopper = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xd67e50,
      roughnessMap: textures.brassTex,
      metalness: 0.94,
      roughness: 0.25,
      envMapIntensity: 2.1,
    }),
    { anisoStrength: 0.35, patinaStrength: 0.24 }
  );

  const matSilverSteel = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xdce4f0,
      metalness: 0.96,
      roughness: 0.16,
      envMapIntensity: 2.4,
    }),
    { anisoStrength: 0.40, patinaStrength: 0.15 }
  );

  const matDarkBronze = new THREE.MeshStandardMaterial({
    color: 0x261b13,
    roughness: 0.46,
    metalness: 0.72,
    envMapIntensity: 1.3,
  });

  const matMasonryStone = new THREE.MeshStandardMaterial({
    color: 0x5c5b63,
    bumpMap: textures.clayBump,
    bumpScale: 0.018,
    roughness: 0.82,
    metalness: 0.12,
  });

  const matPlaque = new THREE.MeshPhysicalMaterial({
    map: textures.plaqueTex,
    bumpMap: textures.plaqueTex,
    bumpScale: 0.006,
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.3,
    envMapIntensity: 2.1,
  });

  const matVelvetTable = new THREE.MeshPhysicalMaterial({
    color: 0x0f211b,
    bumpMap: textures.paperTex,
    bumpScale: 0.014,
    roughness: 0.90,
    sheen: 0.92,
    sheenRoughness: 0.74,
    sheenColor: new THREE.Color(0x3a6e5c),
  });

  const matSnow = new THREE.MeshPhysicalMaterial({
    color: 0xf7f9ff,
    bumpMap: textures.clayBump,
    bumpScale: 0.012,
    roughness: 0.46,
    clearcoat: 0.24,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xdbeeff),
    envMapIntensity: 0.98,
  });

  const matPine = new THREE.MeshStandardMaterial({
    color: 0x173c2c,
    roughness: 0.78,
    envMapIntensity: 0.82,
  });

  const matTrainRed = new THREE.MeshPhysicalMaterial({
    color: 0xa82029,
    roughness: 0.26,
    metalness: 0.25,
    clearcoat: 0.78,
    envMapIntensity: 1.55,
  });

  const matWarmWindow = new THREE.MeshStandardMaterial({
    color: 0xffe8a8,
    emissive: new THREE.Color(0xff9e32),
    emissiveIntensity: 1.65,
    roughness: 0.25,
  });

  // ---------------- Velvet Desk & Batched Out-of-Focus Hearth Bokeh ----------------
  const velvetDesk = new THREE.Mesh(new THREE.PlaneGeometry(34, 24), matVelvetTable);
  velvetDesk.rotation.x = -Math.PI * 0.5;
  velvetDesk.position.y = -1.15;
  velvetDesk.receiveShadow = true;
  scene.add(velvetDesk);

  // Single Points DrawCall for 28 distant fireplace bokeh orbs (replaces 26 separate meshes!)
  const bokehCount = 28;
  const bokehGeo = new THREE.BufferGeometry();
  const bokehPos = new Float32Array(bokehCount * 3);
  for (let i = 0; i < bokehCount; i++) {
    bokehPos[i * 3] = Math.sin(i * 2.37) * 7.8;
    bokehPos[i * 3 + 1] = -0.4 + ((i * 0.618) % 1) * 6.8;
    bokehPos[i * 3 + 2] = -9.0 - (i % 4) * 1.2;
  }
  bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
  scene.add(
    new THREE.Points(
      bokehGeo,
      new THREE.PointsMaterial({
        map: textures.sparkTex,
        color: 0xffb668,
        size: 1.35,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
  );

  // ---------------- Lathe-Turned Coin-Edge Brass Horologium Plinth & Escapement ----------------
  const globeRig = new THREE.Group();
  globeRig.position.y = -1.12;
  scene.add(globeRig);

  const staticPlinthBrassParts = [
    new THREE.LatheGeometry([
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(2.40, 0.0),
      new THREE.Vector2(2.40, 0.11),
      new THREE.Vector2(2.24, 0.18),
      new THREE.Vector2(2.14, 0.28),
      new THREE.Vector2(1.96, 0.34),
      new THREE.Vector2(0.0, 0.34),
    ], 64),
    new THREE.LatheGeometry([
      new THREE.Vector2(0.0, 1.06),
      new THREE.Vector2(1.98, 1.06),
      new THREE.Vector2(2.14, 1.15),
      new THREE.Vector2(2.04, 1.28),
      new THREE.Vector2(1.88, 1.38),
      new THREE.Vector2(0.0, 1.38),
    ], 64),
    // 96-tooth Coin-Edge Fluted Bezel Rings on lower foot & upper crown!
    transformGeo(createCoinEdgeRingGeometry({ radius: 2.41, height: 0.09, flutes: 96, fluteDepth: 0.025 }), { y: 0.06 }),
    transformGeo(createCoinEdgeRingGeometry({ radius: 2.15, height: 0.10, flutes: 96, fluteDepth: 0.024 }), { y: 1.18 }),
  ];

  const energyGems = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    staticPlinthBrassParts.push(
      transformGeo(new THREE.CylinderGeometry(0.055, 0.068, 0.76, 14), {
        x: Math.cos(a) * 1.98,
        y: 0.70,
        z: Math.sin(a) * 1.98,
      })
    );
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xffd27d,
      emissive: new THREE.Color(0xff9d2e),
      emissiveIntensity: 0.28,
      roughness: 0.2,
    });
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), gemMat);
    gem.position.set(Math.cos(a) * 2.11, 1.20, Math.sin(a) * 2.11);
    globeRig.add(gem);
    energyGems.push(gemMat);
  }

  const plinthBrassMesh = new THREE.Mesh(mergeGeometries(staticPlinthBrassParts), matBrass);
  plinthBrassMesh.castShadow = true;
  plinthBrassMesh.receiveShadow = true;
  globeRig.add(plinthBrassMesh);

  // Curved Engraved Front Brass Nameplate ("HOROLOGIUM NOCTIS · IV")!
  const plaqueGeo = new THREE.CylinderGeometry(2.34, 2.34, 0.22, 32, 1, true, -0.34, 0.68);
  const plaqueMesh = new THREE.Mesh(plaqueGeo, matPlaque);
  plaqueMesh.position.y = 0.16;
  globeRig.add(plaqueMesh);

  const coreDrum = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.42, 0.82, 40), matDarkBronze);
  coreDrum.position.y = 0.70;
  globeRig.add(coreDrum);

  const clockworkGlow = new THREE.PointLight(0xffa43b, 1.75, 4.4, 1.8);
  clockworkGlow.position.set(0, 0.72, 2.28);
  globeRig.add(clockworkGlow);

  // Meshing Planetary Gears
  const gears = [];
  const addMeshingGear = (angFromFront, y, radius, teeth, ratio, mat, rDist = 1.86) => {
    const gMesh = new THREE.Mesh(
      createGearGeometry({
        teeth,
        outerRadius: radius,
        innerRadius: radius * 0.82,
        thickness: 0.082,
        holeRadius: radius * 0.18,
        spokes: 5,
        bevelSize: 0.013,
      }),
      mat
    );
    gMesh.position.set(Math.sin(angFromFront) * rDist, y, Math.cos(angFromFront) * rDist);
    gMesh.lookAt(0, y, 0);
    globeRig.add(gMesh);
    gears.push({ mesh: gMesh, ratio });
  };
  addMeshingGear(0.0, 0.74, 0.36, 22, 1.0, matBrass, 1.88);
  addMeshingGear(0.34, 0.75, 0.28, 16, -1.375, matCopper, 1.86);
  addMeshingGear(-0.34, 0.67, 0.29, 18, -1.22, matCopper, 1.86);
  addMeshingGear(0.68, 0.71, 0.33, 20, 1.1, matBrass, 1.85);
  addMeshingGear(-0.68, 0.73, 0.31, 18, 1.22, matBrass, 1.85);

  // 6Hz Oscillating Watchmaker Balance Wheel & Hairspring (visible on front-left gallery)!
  const balanceWheelGroup = new THREE.Group();
  balanceWheelGroup.position.set(-0.38, 0.88, 1.82);
  balanceWheelGroup.lookAt(0, 0.88, 0);
  const balParts = [
    new THREE.TorusGeometry(0.19, 0.022, 10, 28),
    new THREE.BoxGeometry(0.37, 0.024, 0.018),
    new THREE.BoxGeometry(0.024, 0.37, 0.018),
    new THREE.TorusGeometry(0.08, 0.008, 6, 20), // hairspring inner coil
  ];
  balanceWheelGroup.add(new THREE.Mesh(mergeGeometries(balParts), matBrass));
  globeRig.add(balanceWheelGroup);

  // Pinned Music-Box Brass Cylinder + 12-Tooth Silver Steel Comb!
  const drumParts = [transformGeo(new THREE.CylinderGeometry(0.125, 0.125, 0.54, 24), { rz: Math.PI * 0.5 })];
  for (let p = 0; p < 28; p++) {
    const pa = p * 1.9;
    const px = -0.22 + (p / 27) * 0.44;
    drumParts.push(transformGeo(new THREE.BoxGeometry(0.014, 0.028, 0.014), { x: px, y: Math.cos(pa) * 0.132, z: Math.sin(pa) * 0.132 }));
  }
  const musicDrum = new THREE.Mesh(mergeGeometries(drumParts), matBrass);
  musicDrum.position.set(0, 0.43, 1.79);
  globeRig.add(musicDrum);

  const combParts = [transformGeo(new THREE.BoxGeometry(0.54, 0.028, 0.12), { z: 0.07 })];
  for (let t = 0; t < 12; t++) {
    const tx = -0.23 + (t / 11) * 0.46;
    const tLen = 0.08 + (t / 11) * 0.05;
    combParts.push(transformGeo(new THREE.BoxGeometry(0.026, 0.012, tLen), { x: tx, z: 0.01 - tLen * 0.3 }));
  }
  const steelComb = new THREE.Mesh(mergeGeometries(combParts), matSilverSteel);
  steelComb.position.set(0, 0.565, 1.80);
  globeRig.add(steelComb);

  const interactables = [];

  // ---------------- Interactive Butterfly Brass Winding Key ----------------
  const keyAssembly = new THREE.Group();
  keyAssembly.position.set(2.12, 0.72, 0.35);
  keyAssembly.rotation.y = -0.18;
  globeRig.add(keyAssembly);

  const keyShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.62, 16), matBrass);
  keyShaft.rotation.z = Math.PI * 0.5;
  keyShaft.position.x = 0.25;
  keyAssembly.add(keyShaft);

  const keyTurnGroup = new THREE.Group();
  keyTurnGroup.position.x = 0.56;
  const wingParts = [];
  for (const sy of [-1, 1]) {
    wingParts.push(transformGeo(new THREE.TorusGeometry(0.24, 0.048, 12, 26), { x: 0.10, y: sy * 0.24, sx: 1.15, sy: 0.88 }));
  }
  keyTurnGroup.add(new THREE.Mesh(mergeGeometries(wingParts), matBrass));
  const keyFinial = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), matCopper);
  keyFinial.position.x = 0.24;
  keyTurnGroup.add(keyFinial);
  keyAssembly.add(keyTurnGroup);

  const keyHit = new THREE.Mesh(new THREE.BoxGeometry(1.18, 1.18, 1.08), new THREE.MeshBasicMaterial({ visible: false }));
  keyHit.position.x = 0.42;
  keyHit.userData = { kind: 'windkey', label: '拧动蝴蝶黄铜发条 · 为摆轮游丝与蒸汽列车上弦' };
  keyAssembly.add(keyHit);
  interactables.push(keyHit);

  // ---------------- Interior Alpine Snow-Town, 14-Arch Masonry Viaduct & 4-4-0 Steam Train ----------------
  const globeCenterY = 3.22;
  const globeRadius = 2.36;

  const interior = new THREE.Group();
  interior.position.y = globeCenterY;
  globeRig.add(interior);

  const interiorSnowParts = [
    transformGeo(new THREE.CylinderGeometry(1.94, 1.55, 0.75, 48), { y: -1.52 }),
    transformGeo(new THREE.ConeGeometry(1.24, 0.84, 36), { y: -0.95 }),
  ];
  const interiorTimberParts = [];
  const interiorWindowParts = [];
  const interiorBrassParts = [];

  // 6 Half-Timbered Two-Story Swiss Chalets + Warm Cast-Iron Streetlamps!
  for (let c = 0; c < 6; c++) {
    const a = (c / 6) * Math.PI * 2 + 0.32;
    const r = 1.14;
    const cx = Math.cos(a) * r;
    const cz = Math.sin(a) * r;
    const cy = -1.06;
    const ry = -a + Math.PI * 0.5;

    // Two-story timber walls + stone chimney
    interiorTimberParts.push(
      transformGeo(new THREE.BoxGeometry(0.36, 0.34, 0.32), { x: cx, y: cy + 0.17, z: cz, ry }),
      transformGeo(new THREE.BoxGeometry(0.40, 0.04, 0.36), { x: cx, y: cy + 0.21, z: cz, ry }), // balcony belt
      transformGeo(new THREE.BoxGeometry(0.07, 0.22, 0.07), { x: cx + Math.cos(a + 0.2) * 0.1, y: cy + 0.46, z: cz + Math.sin(a + 0.2) * 0.1, ry })
    );
    // Thick overhanging snow gable roof
    const roofSlopeL = transformGeo(createRoundedBlockGeometry(0.30, 0.06, 0.40, 0.02, 0.015), { x: -0.11, y: 0.40, rz: 0.62 });
    const roofSlopeR = transformGeo(createRoundedBlockGeometry(0.30, 0.06, 0.40, 0.02, 0.015), { x: 0.11, y: 0.40, rz: -0.62 });
    const chaletRoof = mergeGeometries([roofSlopeL, roofSlopeR], true);
    interiorSnowParts.push(transformGeo(chaletRoof, { x: cx, y: cy, z: cz, ry }));

    // Warm cross-mullioned glowing windows + streetlamp lantern
    const winPair = mergeGeometries([
      transformGeo(new THREE.PlaneGeometry(0.08, 0.10), { x: -0.07, y: 0.13, z: 0.165 }),
      transformGeo(new THREE.PlaneGeometry(0.08, 0.10), { x: 0.07, y: 0.13, z: 0.165 }),
      transformGeo(new THREE.PlaneGeometry(0.07, 0.08), { x: 0, y: 0.28, z: 0.165 }),
      // Streetlamp glowing globe outside chalet!
      transformGeo(new THREE.SphereGeometry(0.032, 8, 8), { x: 0.24, y: 0.24, z: 0.16 }),
    ], true);
    interiorWindowParts.push(transformGeo(winPair, { x: cx, y: cy, z: cz, ry }));
    interiorBrassParts.push(transformGeo(new THREE.CylinderGeometry(0.012, 0.016, 0.24, 8), { x: cx + Math.cos(a - 0.25) * 0.22, y: cy + 0.12, z: cz + Math.sin(a - 0.25) * 0.22 }));
  }

  // Centerpiece Evergreen Tree (batched!)
  const pineParts = [];
  for (let t = 0; t < 5; t++) {
    const tierR = 0.78 - t * 0.135;
    const tierH = 0.56 - t * 0.05;
    pineParts.push(transformGeo(new THREE.ConeGeometry(tierR, tierH, 24), { y: -0.62 + 0.28 + t * 0.34 }));
    interiorSnowParts.push(transformGeo(new THREE.TorusGeometry(tierR * 0.92, 0.036, 8, 24), { y: -0.62 + 0.04 + t * 0.34, rx: Math.PI * 0.5 }));
  }
  const treeMesh = new THREE.Mesh(mergeGeometries(pineParts), matPine);
  treeMesh.castShadow = true;
  interior.add(treeMesh);

  // Jewel baubles on tree (batched into 2 emissive groups for crisp contrast & low DrawCalls)
  const baubleRedParts = [];
  const baubleGoldParts = [];
  for (let b = 0; b < 28; b++) {
    const u = b / 28;
    const ang = b * 2.39996;
    const rad = lerp(0.70, 0.14, u);
    const y = -0.62 + lerp(0.14, 1.72, u);
    const g = transformGeo(new THREE.SphereGeometry(0.048, 10, 8), { x: Math.cos(ang) * rad, y, z: Math.sin(ang) * rad });
    if (b % 2 === 0) baubleRedParts.push(g);
    else baubleGoldParts.push(g);
  }
  interior.add(new THREE.Mesh(mergeGeometries(baubleRedParts), matTrainRed));
  interiorBrassParts.push(...baubleGoldParts);

  // 6 Mechanical Brass Blossom Petals around tree base (Single InstancedMesh — 1 DrawCall!)
  const blossomPetals = [];
  const blossomInstanced = new THREE.InstancedMesh(new THREE.ConeGeometry(0.14, 0.38, 4), matBrass, 6);
  interior.add(blossomInstanced);
  const _blosRoot = new THREE.Matrix4();
  const _blosLeaf = new THREE.Matrix4();
  const _blosEuler = new THREE.Euler();
  for (let p = 0; p < 6; p++) {
    blossomPetals.push((p / 6) * Math.PI * 2);
  }

  const topStarMat = new THREE.MeshStandardMaterial({
    color: 0xfff5d4,
    emissive: new THREE.Color(0xffbe4f),
    emissiveIntensity: 1.25,
    metalness: 0.6,
    roughness: 0.18,
  });
  const topStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.30, innerRadius: 0.11, depth: 0.09 }),
    topStarMat
  );
  topStar.position.y = 1.42;
  interior.add(topStar);

  // Volumetric God-Ray Cone radiating softly from Bethlehem Top Star inside the globe!
  const starShaftMat = createVolumetricShaftMaterial({ color: 0xffd685, opacity: 0.11, power: 2.2 });
  const starShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 1.45, 2.55, 20, 1, true), starShaftMat);
  starShaft.position.y = 0.25;
  interior.add(starShaft);

  // ---------------- 14-Arch Masonry Stone Viaduct & Timber Ties ----------------
  const trackR = 1.62;
  const trackY = -0.98;
  interiorBrassParts.push(
    transformGeo(new THREE.TorusGeometry(trackR + 0.062, 0.015, 8, 64), { y: trackY, rx: Math.PI * 0.5 }),
    transformGeo(new THREE.TorusGeometry(trackR - 0.062, 0.015, 8, 64), { y: trackY, rx: Math.PI * 0.5 })
  );

  // Build pierced stone arch viaduct segments!
  const archSegShape = new THREE.Shape();
  archSegShape.moveTo(-0.36, -0.32);
  archSegShape.lineTo(-0.36, 0.0);
  archSegShape.lineTo(0.36, 0.0);
  archSegShape.lineTo(0.36, -0.32);
  archSegShape.lineTo(0.22, -0.32);
  archSegShape.absarc(0, -0.32, 0.22, 0, Math.PI, false); // true semicircular stone vault cutout!
  archSegShape.lineTo(-0.36, -0.32);
  archSegShape.closePath();

  const viaductParts = [];
  const archCount = 14;
  for (let i = 0; i < archCount; i++) {
    const a = (i / archCount) * Math.PI * 2;
    const segGeo = new THREE.ExtrudeGeometry(archSegShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, steps: 1 });
    segGeo.center();
    viaductParts.push(
      transformGeo(segGeo, {
        x: Math.cos(a) * trackR,
        y: trackY - 0.16,
        z: Math.sin(a) * trackR,
        ry: -a + Math.PI * 0.5,
      })
    );
  }
  // 56 Timber Railway Sleepers along the circular viaduct!
  for (let s = 0; s < 56; s++) {
    const a = (s / 56) * Math.PI * 2;
    interiorTimberParts.push(
      transformGeo(new THREE.BoxGeometry(0.19, 0.018, 0.036), {
        x: Math.cos(a) * trackR,
        y: trackY - 0.008,
        z: Math.sin(a) * trackR,
        ry: -a,
      })
    );
  }
  const viaductMesh = new THREE.Mesh(mergeGeometries(viaductParts), matMasonryStone);
  viaductMesh.castShadow = true;
  viaductMesh.receiveShadow = true;
  interior.add(viaductMesh);

  const snowMesh = new THREE.Mesh(mergeGeometries(interiorSnowParts), matSnow);
  snowMesh.receiveShadow = true;
  interior.add(snowMesh);
  interior.add(new THREE.Mesh(mergeGeometries(interiorTimberParts), matDarkBronze));
  interior.add(new THREE.Mesh(mergeGeometries(interiorWindowParts), matWarmWindow));
  interior.add(new THREE.Mesh(mergeGeometries(interiorBrassParts), matBrass));

  // ---------------- 4-4-0 Steam Express Locomotive + Gift Tender + 2 Glowing Coaches ----------------
  const trainOrbit = new THREE.Group();
  trainOrbit.position.y = trackY + 0.02;
  interior.add(trainOrbit);

  const locoWheels = [];
  const makeSpokedAxleGeo = (r = 0.065, halfSpan = 0.105) => {
    const parts = [transformGeo(new THREE.CylinderGeometry(0.010, 0.010, halfSpan * 2.0, 8), { rz: Math.PI * 0.5 })];
    for (const sx of [-halfSpan, halfSpan]) {
      parts.push(transformGeo(new THREE.TorusGeometry(r, 0.012, 8, 18), { x: sx, ry: Math.PI * 0.5 }));
      for (let k = 0; k < 4; k++) {
        parts.push(transformGeo(new THREE.BoxGeometry(0.012, r * 1.9, 0.012), { x: sx, rx: (k * Math.PI) / 4 }));
      }
    }
    return mergeGeometries(parts, true);
  };
  const engineAxleGeo = makeSpokedAxleGeo(0.065, 0.105);
  const coachAxleGeo = makeSpokedAxleGeo(0.051, 0.095);

  const buildDetailedCar = (angOffset, type) => {
    const g = new THREE.Group();
    g.position.set(Math.cos(angOffset) * trackR, 0, Math.sin(angOffset) * trackR);
    g.rotation.y = -angOffset;

    if (type === 'engine') {
      const redParts = [
        transformGeo(new THREE.CylinderGeometry(0.095, 0.095, 0.36, 16), { y: 0.13, z: 0.05, rx: Math.PI * 0.5 }),
        transformGeo(new THREE.BoxGeometry(0.20, 0.24, 0.18), { y: 0.17, z: -0.15 }),
      ];
      const brassParts = [
        transformGeo(new THREE.CylinderGeometry(0.044, 0.030, 0.15, 12), { y: 0.25, z: 0.16 }), // smokestack
        transformGeo(new THREE.SphereGeometry(0.048, 10, 8), { y: 0.22, z: 0.02 }), // steam dome
        // Brass Cowcatcher pilot on front!
        transformGeo(new THREE.ConeGeometry(0.11, 0.14, 4), { y: 0.06, z: 0.26, rx: Math.PI * 0.5, ry: Math.PI * 0.25 }),
        transformGeo(new THREE.BoxGeometry(0.22, 0.024, 0.20), { y: 0.30, z: -0.15 }), // cab roof
        // Piston connecting rods on flanks
        transformGeo(new THREE.BoxGeometry(0.014, 0.022, 0.28), { x: 0.115, y: 0.065, z: 0.02 }),
        transformGeo(new THREE.BoxGeometry(0.014, 0.022, 0.28), { x: -0.115, y: 0.065, z: 0.02 }),
      ];
      g.add(new THREE.Mesh(mergeGeometries(redParts), matTrainRed));
      g.add(new THREE.Mesh(mergeGeometries(brassParts), matBrass));

      const winCab = new THREE.Mesh(
        mergeGeometries([
          transformGeo(new THREE.SphereGeometry(0.038, 10, 8), { y: 0.14, z: 0.24 }), // headlamp
          transformGeo(new THREE.BoxGeometry(0.205, 0.09, 0.09), { y: 0.20, z: -0.15 }), // cab side glow
        ]),
        matWarmWindow
      );
      g.add(winCab);

      for (const wz of [-0.11, 0.08]) {
        const w = new THREE.Mesh(engineAxleGeo, matBrass);
        w.position.set(0, 0.065, wz);
        g.add(w);
        locoWheels.push(w);
      }
    } else if (type === 'tender') {
      g.add(new THREE.Mesh(transformGeo(new THREE.BoxGeometry(0.18, 0.14, 0.22), { y: 0.10 }), matTrainRed));
      g.add(
        new THREE.Mesh(
          mergeGeometries([
            transformGeo(new THREE.BoxGeometry(0.09, 0.09, 0.09), { x: -0.03, y: 0.20, z: 0.03, ry: 0.3 }),
            transformGeo(new THREE.BoxGeometry(0.08, 0.10, 0.08), { x: 0.04, y: 0.20, z: -0.04 }),
          ]),
          matBrass
        )
      );
    } else {
      g.add(new THREE.Mesh(transformGeo(new THREE.BoxGeometry(0.19, 0.19, 0.33), { y: 0.13 }), matTrainRed));
      g.add(new THREE.Mesh(transformGeo(new THREE.BoxGeometry(0.21, 0.032, 0.35), { y: 0.23 }), matSnow));
      // Glowing amber passenger row windows along both sides of coach!
      const coachWins = [];
      for (let w = -1; w <= 1; w++) {
        coachWins.push(transformGeo(new THREE.BoxGeometry(0.196, 0.075, 0.068), { y: 0.15, z: w * 0.095 }));
      }
      g.add(new THREE.Mesh(mergeGeometries(coachWins), matWarmWindow));
      for (const wz of [-0.11, 0.11]) {
        const w = new THREE.Mesh(coachAxleGeo, matBrass);
        w.position.set(0, 0.055, wz);
        g.add(w);
      }
    }
    return g;
  };

  trainOrbit.add(
    buildDetailedCar(0, 'engine'),
    buildDetailedCar(-0.18, 'tender'),
    buildDetailedCar(-0.39, 'coach'),
    buildDetailedCar(-0.62, 'coach')
  );
  batchStaticMeshes(trainOrbit, locoWheels);

  // Steam Puffs (Single InstancedMesh — 1 DrawCall instead of 9!)
  const puffCount = 9;
  const puffInstanced = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.055, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff6e8, transparent: true, opacity: 0.42, depthWrite: false }),
    puffCount
  );
  interior.add(puffInstanced);
  const _puffDummy = new THREE.Object3D();
  const puffs = [];
  for (let i = 0; i < puffCount; i++) {
    puffs.push({ x: 0, y: -10, z: 0, age: i * 0.24 });
  }

  // ---------------- 100% GPU Vortex Blizzard: 1,200 Snowflakes + 320 Tumbling Gold Leaf Flakes ----------------
  const snowCount = 1200;
  const snowGeo = new THREE.BufferGeometry();
  const snowSeeds = new Float32Array(snowCount * 4);
  const snowDummyPos = new Float32Array(snowCount * 3); // required by Three.js frustum/attrib count
  for (let i = 0; i < snowCount; i++) {
    snowSeeds[i * 4] = Math.sqrt(Math.random()) * 0.96;
    snowSeeds[i * 4 + 1] = Math.random() * Math.PI * 2;
    snowSeeds[i * 4 + 2] = 0.55 + Math.random() * 0.85;
    snowSeeds[i * 4 + 3] = Math.random();
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowDummyPos, 3));
  snowGeo.setAttribute('aSeed', new THREE.BufferAttribute(snowSeeds, 4));

  const gpuSnowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      tSnow: { value: textures.snowflakeTex },
      uTime: { value: 0 },
      uSwirlPhase: { value: 0 },
      uVortex: { value: 0.25 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    },
    vertexShader: GPU_SNOW_VS,
    fragmentShader: GPU_SNOW_FS,
  });
  const snowPoints = new THREE.Points(snowGeo, gpuSnowMat);
  snowPoints.frustumCulled = false;
  interior.add(snowPoints);

  // 320 Tumbling 3D Champagne Gold-Leaf Flakes (1 single DrawCall, 0 CPU updates!)
  const flakeCount = 320;
  const flakeGeo = new THREE.BufferGeometry();
  const flakePos = new Float32Array(flakeCount * 6 * 3);
  const flakeCorners = new Float32Array(flakeCount * 6 * 3);
  const flakeSeeds = new Float32Array(flakeCount * 6 * 4);
  const s = 0.024;
  const quadVerts = [
    [-s, -s * 0.7, 0], [s, -s * 0.7, 0], [s * 0.6, s, 0],
    [-s, -s * 0.7, 0], [s * 0.6, s, 0], [-s * 0.8, s * 0.8, 0],
  ];
  for (let i = 0; i < flakeCount; i++) {
    const rf = 0.15 + Math.sqrt(Math.random()) * 0.80;
    const ba = Math.random() * Math.PI * 2;
    const sp = (Math.random() > 0.5 ? 1 : -1) * (0.7 + Math.random() * 1.4);
    const ph = Math.random();
    for (let v = 0; v < 6; v++) {
      const idx = i * 6 + v;
      flakeCorners[idx * 3] = quadVerts[v][0];
      flakeCorners[idx * 3 + 1] = quadVerts[v][1];
      flakeCorners[idx * 3 + 2] = quadVerts[v][2];
      flakeSeeds[idx * 4] = rf;
      flakeSeeds[idx * 4 + 1] = ba;
      flakeSeeds[idx * 4 + 2] = sp;
      flakeSeeds[idx * 4 + 3] = ph;
    }
  }
  flakeGeo.setAttribute('position', new THREE.BufferAttribute(flakePos, 3));
  flakeGeo.setAttribute('aCorner', new THREE.BufferAttribute(flakeCorners, 3));
  flakeGeo.setAttribute('aFlakeSeed', new THREE.BufferAttribute(flakeSeeds, 4));

  const goldFlakeMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSwirlPhase: { value: 0 },
      uVortex: { value: 0.25 },
    },
    vertexShader: GOLD_FLAKE_VS,
    fragmentShader: GOLD_FLAKE_FS,
  });
  const goldFlakeMesh = new THREE.Mesh(flakeGeo, goldFlakeMat);
  goldFlakeMesh.frustumCulled = false;
  interior.add(goldFlakeMesh);

  // ---------------- Outer Thick Blown-Glass Globe Shell ----------------
  const glassMat = new THREE.ShaderMaterial({
    vertexShader: GLOBE_VS,
    fragmentShader: GLOBE_FS,
    uniforms: {
      tRefract: { value: refractTex },
      uSwirlGlow: { value: 0 },
    },
  });
  const glassShell = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 48), glassMat);
  glassShell.position.y = globeCenterY;
  globeRig.add(glassShell);

  glassShell.userData = { kind: 'globe', label: '快速划过或摇晃水晶球 · 掀起碎金暴风雪漩涡' };
  interactables.push(glassShell);

  // Coalesce static clockwork & village meshes so Act III stays cleanly within <45 DrawCalls!
  const matVillageVC = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    bumpMap: textures.clayBump,
    bumpScale: 0.015,
    roughness: 0.72,
  });
  batchStaticMeshes(keyTurnGroup);
  batchStaticMeshes(balanceWheelGroup);
  collapseSolidMeshes(interior, matVillageVC, [
    trainOrbit,
    puffInstanced,
    blossomInstanced,
    topStar,
    starShaft,
    goldFlakeMesh,
  ]);
  collapseSolidMeshes(globeRig, matVillageVC, [
    keyAssembly,
    balanceWheelGroup,
    musicDrum,
    interior,
    glassShell,
    ...gears.map((g) => g.mesh),
  ]);
  batchStaticMeshes(globeRig, [
    keyAssembly,
    balanceWheelGroup,
    musicDrum,
    interior,
    glassShell,
    ...gears.map((g) => g.mesh),
  ]);

  // ---------------- Velocity-Driven Angular Momentum & Clockwork Physics ----------------
  let windEnergy = 0.34;
  let totalWound = 0;
  let hasShakenGlobe = false;
  let trainAngle = 0.6;
  let keyAngle = 0;
  let lastClickAngle = 0;
  let vortexStrength = 0.25;
  let swirlPhase = 0;
  let awakened = false;

  const globeTilt = new Spring2D(0, 0, 148, 11);
  const blossomSpring = new Spring1D(0, 95, 12);
  const starPowerSpring = new Spring1D(0.95, 80, 12);

  let dragMode = null;
  let lastPointer = { x: 0, y: 0, time: 0 };

  function getProgress() {
    const woundStep = totalWound > 0.35 ? 1 : 0;
    const fullStep = awakened ? 1 : 0;
    const shakeStep = hasShakenGlobe ? 1 : 0;
    return { current: Math.min(3, woundStep + fullStep + shakeStep), total: 3 };
  }

  function stirBlizzard(impulseAmt, tiltX = 0, tiltZ = 0) {
    vortexStrength = clamp(vortexStrength + impulseAmt, 0, 3.6);
    globeTilt.impulse(tiltX, tiltZ);
    if (impulseAmt > 0.35) {
      hasShakenGlobe = true;
      audio.playSnowWhoosh(Math.min(1, impulseAmt));
    }
  }

  function addWindEnergy(delta) {
    windEnergy = clamp(windEnergy + delta, 0, 1.38);
    totalWound += delta;
    keyAngle += delta * 9.5;
    if (Math.abs(keyAngle - lastClickAngle) > 0.40) {
      lastClickAngle = keyAngle;
      audio.playRatchetClick(1.0);
    }
    if ((windEnergy >= 0.95 || totalWound >= 0.82) && !awakened) {
      awakened = true;
      blossomSpring.target = 1.0;
      starPowerSpring.target = 2.6;
      stirBlizzard(1.85, 0.35, -0.55);
      cameraRig.focusOn(0, 0.45, 0, 0.80, 2.2);
      audio.playSigilAwaken();
      onAwaken(3, '第三声部已唤醒 · 瑞士八音盒主旋律清脆流淌');
      onHint('午夜天文钟满弦运转 · 可滚轮推近观赏摆轮游丝、12齿音梳与石拱列车');
    }
  }

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind } = hit.object.userData;
    lastPointer = { x: pointerNDC.x, y: pointerNDC.y, time: performance.now() };
    if (kind === 'windkey') {
      dragMode = 'windkey';
      addWindEnergy(0.32);
      stirBlizzard(0.35, 0.12, -0.22);
      return true;
    }
    if (kind === 'globe') {
      dragMode = 'globe';
      stirBlizzard(1.15, (Math.random() - 0.5) * 0.55, -pointerNDC.x * 0.85);
      addWindEnergy(0.18);
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    if (!dragMode) return false;
    const now = performance.now();
    const dtMs = Math.max(8, now - lastPointer.time);
    const dx = pointerNDC.x - lastPointer.x;
    const dy = pointerNDC.y - lastPointer.y;
    const vx = (dx / dtMs) * 16.0;
    const vy = (dy / dtMs) * 16.0;
    lastPointer = { x: pointerNDC.x, y: pointerNDC.y, time: now };

    if (dragMode === 'windkey') {
      const amt = Math.hypot(dx, dy) * 1.45;
      if (amt > 0.002) addWindEnergy(amt);
      return true;
    }
    if (dragMode === 'globe') {
      const speed = Math.hypot(vx, vy);
      if (speed > 0.004) {
        // Inject instantaneous pointer velocity vector into 3D angular momentum!
        stirBlizzard(speed * 2.8, clamp(-vy * 1.4, -1.2, 1.2), clamp(-vx * 1.8, -1.5, 1.5));
        addWindEnergy(speed * 0.25);
      }
      return true;
    }
    return false;
  }

  function onPointerUp() {
    dragMode = null;
  }

  function update(dt, t, parallax) {
    const minEnergy = awakened ? 0.55 : 0.22;
    windEnergy = Math.max(minEnergy, windEnergy - dt * 0.032);
    vortexStrength = Math.max(0.24 + windEnergy * 0.35, vortexStrength * Math.exp(-dt * 0.72));
    swirlPhase += dt * (0.45 + vortexStrength * 1.95);

    globeTilt.update(dt);
    globeRig.rotation.x = globeTilt.x;
    globeRig.rotation.z = globeTilt.y;

    keyTurnGroup.rotation.x = keyAngle + t * windEnergy * 1.25;

    const gearSpin = dt * windEnergy * 1.85;
    for (const g of gears) {
      g.mesh.rotation.z += gearSpin * g.ratio;
    }
    // 6Hz precision watchmaker balance wheel oscillation!
    balanceWheelGroup.rotation.z = Math.sin(t * Math.PI * 2 * 6.0) * (0.35 + windEnergy * 0.35);
    musicDrum.rotation.x += gearSpin * 0.9;

    for (let i = 0; i < energyGems.length; i++) {
      const lit = windEnergy * energyGems.length > i;
      energyGems[i].emissiveIntensity = lit ? 1.85 : 0.22;
    }

    const prevTrain = trainAngle;
    trainAngle += dt * (0.38 + windEnergy * 1.25);
    trainOrbit.rotation.y = -trainAngle;
    const wheelDelta = (trainAngle - prevTrain) * (trackR / 0.065);
    for (let w = 0; w < locoWheels.length; w++) {
      locoWheels[w].rotation.x += wheelDelta;
    }

    const headA = -trainAngle;
    const emitX = Math.cos(headA + 0.09) * trackR;
    const emitZ = Math.sin(headA + 0.09) * trackR;
    for (let i = 0; i < puffs.length; i++) {
      const p = puffs[i];
      p.age += dt * (0.8 + windEnergy * 0.65);
      if (p.age > 2.15) {
        p.age = 0;
        p.x = emitX;
        p.y = trackY + 0.32;
        p.z = emitZ;
      } else {
        p.y += dt * 0.36;
        p.x += Math.sin(t * 2 + p.age * 4) * dt * 0.08;
      }
      const life = p.age / 2.15;
      const env = Math.sin(life * Math.PI);
      _puffDummy.position.set(p.x, p.y, p.z);
      _puffDummy.scale.setScalar(Math.max(0.001, (0.45 + life * 1.45) * env));
      _puffDummy.updateMatrix();
      puffInstanced.setMatrixAt(i, _puffDummy.matrix);
    }
    puffInstanced.instanceMatrix.needsUpdate = true;

    const bl = blossomSpring.update(dt);
    const blRotZ = lerp(-0.35, -1.18, bl);
    for (let p = 0; p < blossomPetals.length; p++) {
      const a = blossomPetals[p];
      _blosEuler.set(0, -a, 0);
      _blosRoot.makeRotationFromEuler(_blosEuler);
      _blosRoot.setPosition(Math.cos(a) * 0.55, -0.60, Math.sin(a) * 0.55);

      _blosEuler.set(0, 0, blRotZ);
      _blosLeaf.makeRotationFromEuler(_blosEuler);
      _blosLeaf.setPosition(0, 0.18, 0);

      _blosRoot.multiply(_blosLeaf);
      blossomInstanced.setMatrixAt(p, _blosRoot);
    }
    blossomInstanced.instanceMatrix.needsUpdate = true;

    const sp = starPowerSpring.update(dt);
    topStarMat.emissiveIntensity = sp;
    topStar.rotation.y = t * 0.9;
    starShaftMat.uniforms.uTime.value = t;
    starShaftMat.uniforms.uOpacity.value = 0.07 + (sp - 0.9) * 0.05;
    globeCoreLight.intensity = 1.25 + sp * 0.55;
    matWarmWindow.emissiveIntensity = 1.35 + windEnergy * 0.85;

    // Zero-CPU-Loop GPU Blizzard Uniform Update!
    gpuSnowMat.uniforms.uTime.value = t;
    gpuSnowMat.uniforms.uSwirlPhase.value = swirlPhase;
    gpuSnowMat.uniforms.uVortex.value = vortexStrength;

    goldFlakeMat.uniforms.uTime.value = t;
    goldFlakeMat.uniforms.uSwirlPhase.value = swirlPhase;
    goldFlakeMat.uniforms.uVortex.value = vortexStrength;

    glassMat.uniforms.uSwirlGlow.value = clamp(vortexStrength * 0.32, 0, 1);

    cameraRig.update(dt, parallax);
  }

  function applyCamera(camera) {
    cameraRig.apply(camera);
  }

  function setCaptureState(preset) {
    if (preset === 'hero' || preset === 'climax') {
      windEnergy = 1.18;
      vortexStrength = 1.85;
      swirlPhase = 2.4;
      awakened = true;
      blossomSpring.snap(1.0);
      starPowerSpring.snap(2.6);
      trainAngle = 1.05;
    }
    update(0.016, 3.1, { x: 0.06, y: 0.04 });
  }

  return {
    id: 3,
    roman: 'ACT III',
    title: '午夜天文钟',
    subtitle: '发条黄铜水晶球 · CLOCKWORK BRASS HOROLOGIUM',
    defaultHint: '拧动右侧蝴蝶发条 · 快速拨晃水晶球掀起碎金暴风雪 · 滚轮推近看摆轮与列车',
    transTint: new THREE.Color(0x8cc2ff),
    cameraRig,
    getProgress,
    getPostOpts: () => ({
      bloomStrength: 0.48,
      bloomThreshold: 0.80,
      starburst: 0.32,
      focusDist: cameraRig.getFocusDistance(),
      aperture: 0.50,
      aoStrength: 0.78,
      aoRadius: 0.32,
      refractMeshes: [glassShell],
    }),
    scene,
    interactables,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    update,
    applyCamera,
    setCaptureState,
  };
}

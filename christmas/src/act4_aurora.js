// Act IV: Aurora Dichroic Crystal Wonderland — "The Polaris Sanctuary" (北极星圣殿 · V2 Director's Cut)
// Craftsmanship & GPU Engineering highlights:
// - Eliminates Three.js native `transmission` double-scene render overhead! Uses our bespoke
//   Spectral Dichroic Prism Shader sampling PostPipeline.refractRT with RGB chromatic fire.
// - True Half-Res Planar Mirror Reflection (mirrorRT + mirrored virtual camera across y=0) so every
//   flowing green/violet aurora curtain, crystal prism & chime reflects 1:1 in the black-ice lake!
// - 2-Layer Parallax Glacial Frost Veins (shallow 4cm razor cracks + deep 28cm abyssal blue fractures).
// - Twin Sculpted Blown-Glass Dichroic Spirit Stags flanking the crystal tree, 3 counter-rotating
//   golden astrolabe rings, celestial chime suspension archway with inner clappers & vertical Aurora shaft!

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  clamp,
  lerp,
  mergeGeometries,
  transformGeo,
  createCrystalPrismGeometry,
  createFacetedStarGeometry,
  createDichroicPrismMaterial,
  createVolumetricShaftMaterial,
  injectAnisotropicBrass,
} from './physics.js';
import { CuratedMacroRig } from './camera_rig.js';

const AURORA_VS = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const AURORA_FS = /* glsl */`
uniform float uTime;
uniform float uSurge;
varying vec3 vDir;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // Support upside-down reflection rays by taking abs(vDir.y) when needed, or natural dome y
  vec3 d = normalize(vDir);
  float h = clamp(d.y, 0.0, 1.0);

  vec3 zenith = vec3(0.012, 0.022, 0.068);
  vec3 horizon = vec3(0.024, 0.065, 0.118);
  vec3 sky = mix(horizon, zenith, pow(h, 0.65));

  vec2 uv = d.xz / (h + 0.22);
  vec3 aurora = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float speed = (0.14 + fi * 0.05) * (1.0 + uSurge * 0.8);
    float wave = sin(uv.x * (1.65 + fi * 0.72) + uTime * speed + noise2(uv * 1.45 + fi * 3.1) * 3.0);
    // Centered across the -Z polar vista (uv.y ~ -1.6) directly behind the Polaris Sanctuary!
    float ribbon = exp(-abs(uv.y + 1.65 + wave * 0.52 - (fi - 1.0) * 0.55) * (2.6 + fi * 0.5));
    float verticalMask = smoothstep(0.04, 0.22, h) * smoothstep(0.92, 0.36, h);
    float striations = 0.55 + 0.45 * noise2(vec2(uv.x * 16.0 + uTime * 0.35, h * 9.0 + fi));

    vec3 cGreen = vec3(0.14, 1.0, 0.66);
    vec3 cCyan = vec3(0.20, 0.85, 1.0);
    vec3 cViolet = vec3(0.72, 0.32, 1.0);
    vec3 ribCol = mix(cGreen, cCyan, fi * 0.45);
    ribCol = mix(ribCol, cViolet, smoothstep(0.24, 0.68, h));

    aurora += ribCol * ribbon * verticalMask * striations * (0.92 + uSurge * 0.75);
  }

  vec2 starGrid = d.xz / (h + 0.35) * 44.0;
  vec2 starId = floor(starGrid);
  vec2 starF = fract(starGrid) - 0.5;
  float sRnd = hash21(starId);
  float starDot = smoothstep(0.14, 0.0, length(starF));
  float star = step(0.968, sRnd) * starDot * smoothstep(0.08, 0.35, h);
  float twinkle = 0.6 + 0.4 * sin(uTime * 3.2 + sRnd * 60.0);
  sky += vec3(0.9, 0.96, 1.0) * star * twinkle * 1.35;

  gl_FragColor = vec4(sky + aurora, 1.0);
}
`;

// Planar Mirror Obsidian Black-Ice Floor Shader with 2-Layer Parallax Glacial Frost Veins!
const BLACK_ICE_VS = /* glsl */`
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vScreenPos = projectionMatrix * viewMatrix * wp;
  gl_Position = vScreenPos;
}
`;

const BLACK_ICE_FS = /* glsl */`
uniform sampler2D tMirror;
uniform sampler2D tVeins;
uniform float uTime;
uniform float uEnergy;
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec4 vScreenPos;

void main() {
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndv = clamp(V.y, 0.02, 1.0);
  float fresnel = 0.38 + 0.58 * pow(1.0 - ndv, 2.8);

  // Subtle ice-micro-undulation ripple on planar mirror UV
  vec2 worldUV = vWorldPos.xz * 0.12;
  vec2 ripple = vec2(
    sin(vWorldPos.x * 3.2 + vWorldPos.z * 2.1) * 0.0032,
    cos(vWorldPos.z * 3.6 - vWorldPos.x * 1.8) * 0.0032
  );

  // Mirror camera renders with flipped Y; screen X matches, screen Y flips!
  vec2 sUv = (vScreenPos.xy / max(vScreenPos.w, 1e-4)) * 0.5 + 0.5;
  vec2 reflUv = clamp(vec2(sUv.x, 1.0 - sUv.y) + ripple, vec2(0.003), vec2(0.997));
  vec3 mirrorCol = texture2D(tMirror, reflUv).rgb;

  // 2-Layer Parallax Offset Mapping into deep frozen abyssal ice!
  vec2 parallaxDir = (V.xz / max(ndv + 0.25, 0.28));
  float shallowCrack = texture2D(tVeins, worldUV * 1.65 - parallaxDir * 0.016).r;
  float deepFracture = texture2D(tVeins, worldUV * 0.95 - parallaxDir * 0.072).g;

  vec3 abyssBase = vec3(0.008, 0.020, 0.045);
  vec3 crackCol = vec3(0.32, 0.78, 0.96) * shallowCrack * (0.11 + uEnergy * 0.07)
                + vec3(0.09, 0.42, 0.72) * deepFracture * (0.14 + uEnergy * 0.08);

  // Distance radial fade so horizon blends seamlessly into aurora mist
  float distFade = 1.0 - smoothstep(7.0, 20.0, length(vWorldPos.xz));
  vec3 col = mix(abyssBase + crackCol, mirrorCol * 1.06 + crackCol * 0.35, fresnel);
  col = mix(vec3(0.016, 0.046, 0.090), col, distFade);

  gl_FragColor = vec4(col, 1.0);
}
`;

const _mirrorCam = new THREE.PerspectiveCamera();
const _mirTarget = new THREE.Vector3();
const _camDir = new THREE.Vector3();

// Sculpted Blown-Glass Dichroic Spirit Stag Builder (graceful spline body + faceted antlers)
function buildCrystalSpiritStagGeo(lookBack = false) {
  const parts = [];
  const headTurn = lookBack ? -0.65 : 0.15;
  // Arched torso
  const spineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.32, 0.48, 0),
    new THREE.Vector3(0.0, 0.52, 0),
    new THREE.Vector3(0.28, 0.56, 0),
    new THREE.Vector3(0.38, 0.88, Math.sin(headTurn) * 0.08),
    new THREE.Vector3(0.48 * Math.cos(headTurn), 0.96, Math.sin(headTurn) * 0.22),
  ]);
  parts.push(new THREE.TubeGeometry(spineCurve, 24, 0.078, 8, false));
  // Slender crystal legs
  const legCoords = [
    [-0.28, 0.0, -0.07, -0.26, 0.48, -0.06],
    [-0.24, 0.0, 0.07, -0.24, 0.48, 0.06],
    [0.24, 0.0, -0.07, 0.22, 0.54, -0.06],
    [0.28, 0.0, 0.07, 0.25, 0.54, 0.06],
  ];
  for (const [x0, y0, z0, x1, y1, z1] of legCoords) {
    parts.push(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(x0, y0, z0), new THREE.Vector3(x1, y1, z1)), 4, 0.024, 6, false));
  }
  // Faceted crystal crown antlers!
  const hx = 0.40, hy = 0.95, hz = Math.sin(headTurn) * 0.16;
  for (const sz of [-1, 1]) {
    const antlerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(hx, hy, hz),
      new THREE.Vector3(hx - 0.06, hy + 0.20, hz + sz * 0.14),
      new THREE.Vector3(hx - 0.14, hy + 0.38, hz + sz * 0.24),
    ]);
    parts.push(new THREE.TubeGeometry(antlerCurve, 12, 0.015, 5, false));
    parts.push(transformGeo(createCrystalPrismGeometry({ sides: 5, radius: 0.032, height: 0.14 }), { x: hx - 0.14, y: hy + 0.42, z: hz + sz * 0.24 }));
  }
  return mergeGeometries(parts, true);
}

export function createAct4Aurora({ envMap, textures, refractTex, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x040711);
  scene.environment = envMap;

  const cameraRig = new CuratedMacroRig(
    new THREE.Vector3(0, 2.52, 8.75),
    new THREE.Vector3(0, 2.28, 0),
    { parallaxX: 0.82, parallaxY: 0.46, minZoom: 0.56, maxZoom: 1.18 }
  );

  // Half-Res Planar Mirror RenderTarget for real-time Aurora & Crystal Tree reflection on black ice!
  const mirrorRT = new THREE.WebGLRenderTarget(512, 512, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
  });

  // ---------------- Lighting ----------------
  scene.add(new THREE.AmbientLight(0x1f3652, 0.9));

  const keyLight = new THREE.DirectionalLight(0xd8f6ff, 2.3);
  keyLight.position.set(5.5, 9.5, 6.5);
  scene.add(keyLight);

  const rimViolet = new THREE.DirectionalLight(0xb978ff, 1.65);
  rimViolet.position.set(-6.5, 5.5, -5.0);
  scene.add(rimViolet);

  const treeHeartLight = new THREE.PointLight(0x52ffd8, 2.1, 10.5, 1.5);
  treeHeartLight.position.set(0, 2.4, 0);
  scene.add(treeHeartLight);

  // ---------------- Aurora Sky Dome ----------------
  const auroraMat = new THREE.ShaderMaterial({
    vertexShader: AURORA_VS,
    fragmentShader: AURORA_FS,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSurge: { value: 0 },
    },
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(52, 48, 32), auroraMat);
  scene.add(skyDome);

  // ---------------- Planar Mirror Black-Ice Floor with 2-Layer Parallax Frost Veins ----------------
  const blackIceMat = new THREE.ShaderMaterial({
    vertexShader: BLACK_ICE_VS,
    fragmentShader: BLACK_ICE_FS,
    uniforms: {
      tMirror: { value: mirrorRT.texture },
      tVeins: { value: textures.iceVeinTex },
      uTime: { value: 0 },
      uEnergy: { value: 0.35 },
    },
  });
  const iceFloor = new THREE.Mesh(new THREE.CircleGeometry(22, 72), blackIceMat);
  iceFloor.rotation.x = -Math.PI * 0.5;
  iceFloor.position.y = 0;
  scene.add(iceFloor);

  const matChampagneGold = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xf7dfaa,
      roughnessMap: textures.brassTex,
      metalness: 0.96,
      roughness: 0.16,
      envMapIntensity: 2.55,
    }),
    { anisoStrength: 0.40, patinaStrength: 0.14 }
  );

  // Batched Sacred Geometry Floor Rings + Celestial Chime Archway Beam!
  const staticGoldSanctuaryParts = [];
  for (const [r, w] of [[1.65, 0.018], [2.85, 0.022], [4.15, 0.015]]) {
    staticGoldSanctuaryParts.push(transformGeo(new THREE.RingGeometry(r, r + w, 72), { y: 0.008, rx: -Math.PI * 0.5 }));
  }

  // Sweeping Celestial Suspension Archway Beam holding the 8 Glass Chimes!
  const archPts = [];
  for (let i = 0; i <= 36; i++) {
    const u = i / 36;
    const ang = lerp(-1.26, 1.26, u);
    const r = 3.05;
    const x = Math.sin(ang) * r;
    const z = Math.cos(ang) * r * 0.72 + 0.55;
    const y = 2.68 + Math.cos((u - 0.5) * Math.PI) * 0.55;
    archPts.push(new THREE.Vector3(x, y, z));
  }
  staticGoldSanctuaryParts.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(archPts), 56, 0.018, 8, false));

  // ---------------- Spectral Dichroic Crystal Tree, Astrolabe Rings & Spirit Stags ----------------
  const treeRoot = new THREE.Group();
  scene.add(treeRoot);

  const refractMeshes = [];
  const matDichroic = createDichroicPrismMaterial(refractTex, {
    tint: 0xe2faff,
    emissive: 0x1b4d70,
    emissiveIntensity: 0.38,
    dispersion: 0.030,
  });

  // Twin champagne-gold ribbons + inner crystalline core spire
  const treeRibbonParts = [];
  for (let s = 0; s < 2; s++) {
    const pts = [];
    for (let i = 0; i <= 84; i++) {
      const u = i / 84;
      const a = u * 4.2 * Math.PI * 2 + s * Math.PI;
      const r = lerp(1.75, 0.08, Math.pow(u, 0.88));
      const y = 0.25 + u * 4.25;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    treeRibbonParts.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 100, 0.017, 7, false));
  }
  treeRoot.add(new THREE.Mesh(mergeGeometries(treeRibbonParts), matChampagneGold));

  // 3 Counter-Rotating Golden Astrolabe Halo Rings around the Crystal Tree!
  const astrolabeRings = [];
  for (let r = 0; r < 3; r++) {
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.45 - r * 0.32, 0.013, 8, 56), matChampagneGold);
    ringMesh.position.y = 1.45 + r * 0.95;
    ringMesh.rotation.x = 0.35 * (r % 2 === 0 ? 1 : -1);
    ringMesh.rotation.z = 0.22 * (r - 1);
    treeRoot.add(ringMesh);
    astrolabeRings.push(ringMesh);
  }

  // 220 Fibonacci-Spiral Dichroic Crystal Prisms (1 InstancedMesh DrawCall, Zero native transmission!)
  const prismCount = 220;
  const prismGeo = createCrystalPrismGeometry({ sides: 6, radius: 0.11, height: 0.38, waist: 0.16 });
  const prismInst = new THREE.InstancedMesh(prismGeo, matDichroic, prismCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < prismCount; i++) {
    const u = i / prismCount;
    const ang = i * 2.3999632;
    const rad = lerp(1.68, 0.12, Math.pow(u, 0.82)) * (0.88 + 0.18 * Math.sin(i * 3.7));
    const y = 0.32 + u * 4.12;
    const scale = lerp(1.15, 0.58, u);
    dummy.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
    dummy.rotation.set(0.12 * Math.sin(i), -ang, 0.15 * Math.cos(i));
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    prismInst.setMatrixAt(i, dummy.matrix);
  }
  treeRoot.add(prismInst);
  refractMeshes.push(prismInst);

  // Twin Blown-Glass Dichroic Spirit Stags flanking the Crystal Sanctuary Tree!
  const stagLeft = new THREE.Mesh(buildCrystalSpiritStagGeo(false), matDichroic);
  stagLeft.position.set(-1.95, 0.02, 0.65);
  stagLeft.rotation.y = 0.52;
  const stagRight = new THREE.Mesh(buildCrystalSpiritStagGeo(true), matDichroic);
  stagRight.position.set(1.98, 0.02, 0.58);
  stagRight.rotation.y = Math.PI - 0.58;
  scene.add(stagLeft, stagRight);
  refractMeshes.push(stagLeft, stagRight);

  // Crown Polaris Diamond Star + Vertical Aurora Sanctuary Shaft!
  const polarisMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: new THREE.Color(0x8cf6ff),
    emissiveIntensity: 1.85,
    metalness: 0.3,
    roughness: 0.08,
  });
  const polarisStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.52, innerRadius: 0.18, depth: 0.16 }),
    polarisMat
  );
  polarisStar.position.y = 4.78;
  treeRoot.add(polarisStar);

  const auroraShaftMat = createVolumetricShaftMaterial({ color: 0x62ffda, opacity: 0.10, power: 2.5 });
  const auroraShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 1.85, 5.2, 24, 1, true), auroraShaftMat);
  auroraShaft.position.y = 2.45;
  scene.add(auroraShaft);

  const interactables = [];

  // ---------------- Mechanism 1: 8 Dichroic Glass Harmonica Chimes with Inner Golden Clappers ----------------
  const chimes = [];
  const chimePalette = [0x6efce0, 0x74d8ff, 0xa89cff, 0xf5b8ff, 0xffe29e, 0x7effc4, 0x8bc8ff, 0xd8a8ff];
  for (let i = 0; i < 8; i++) {
    const u = i / 7;
    const ang = lerp(-1.18, 1.18, u);
    const r = 3.05;
    const x = Math.sin(ang) * r;
    const z = Math.cos(ang) * r * 0.72 + 0.55;
    const topY = 2.68 + Math.cos((u - 0.5) * Math.PI) * 0.55;

    staticGoldSanctuaryParts.push(transformGeo(new THREE.CylinderGeometry(0.005, 0.005, 0.85, 6), { x, y: topY - 0.42, z }));

    const pendulum = new THREE.Group();
    pendulum.position.set(x, topY - 0.85, z);
    scene.add(pendulum);

    const cMat = createDichroicPrismMaterial(refractTex, {
      tint: chimePalette[i],
      emissive: chimePalette[i],
      emissiveIntensity: 0.35,
      dispersion: 0.032,
    });
    const len = 0.78 - Math.abs(i - 3.5) * 0.055;
    const crystalBar = new THREE.Mesh(
      createCrystalPrismGeometry({ sides: 6, radius: 0.115, height: len, waist: 0.24 }),
      cMat
    );
    pendulum.add(crystalBar);
    refractMeshes.push(crystalBar);

    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.48, 1.15, 0.48), new THREE.MeshBasicMaterial({ visible: false }));
    const chimeObj = {
      idx: i,
      pendulum,
      baseX: x,
      baseY: topY - 0.85,
      baseZ: z,
      clapperDrop: len * 0.42,
      mat: cMat,
      swing: new Spring1D(0, 185, 7),
      glow: new Spring1D(0.35, 90, 12),
      cooldown: 0,
    };
    hit.userData = { kind: 'chime', chimeObj, label: `轻拂琉璃冰晶风铃 · 第 ${i + 1} 音` };
    pendulum.add(hit);
    interactables.push(hit);
    chimes.push(chimeObj);
  }

  // Single InstancedMesh for all 8 golden chime clappers (1 DrawCall instead of 8!)
  const clapperInstanced = new THREE.InstancedMesh(new THREE.SphereGeometry(0.034, 10, 8), matChampagneGold, 8);
  scene.add(clapperInstanced);
  const _clapDummy = new THREE.Object3D();

  scene.add(new THREE.Mesh(mergeGeometries(staticGoldSanctuaryParts), matChampagneGold));

  // ---------------- Mechanism 2: 6 Crystal Ice-Lotuses (Single 36-Petal InstancedMesh!) ----------------
  const lotuses = [];
  const petalGeo = createCrystalPrismGeometry({ sides: 4, radius: 0.085, height: 0.34, waist: 0.15 });
  const lotusInstanced = new THREE.InstancedMesh(petalGeo, matDichroic, 36);
  scene.add(lotusInstanced);
  refractMeshes.push(lotusInstanced);

  const _lotusRootMat = new THREE.Matrix4();
  const _lotusPivMat = new THREE.Matrix4();
  const _lotusPetMat = new THREE.Matrix4();
  const _lotusEuler = new THREE.Euler();

  for (let l = 0; l < 6; l++) {
    const a = (l / 6) * Math.PI * 2 + 0.52;
    const r = 2.25;
    lotuses.push({
      x: Math.cos(a) * r,
      z: Math.sin(a) * r,
      bloom: new Spring1D(0.2, 95, 12),
    });
  }

  // ---------------- Mechanism 3: 5 Floating Constellation Polaris Nodes ----------------
  const nodes = [];
  const nodeCoords = [
    [-2.25, 3.55, -0.35],
    [-1.35, 4.45, 0.25],
    [0.0, 4.78, 0.55],
    [1.35, 4.45, 0.25],
    [2.25, 3.55, -0.35],
  ];

  for (let n = 0; n < 5; n++) {
    const [nx, ny, nz] = nodeCoords[n];
    const ng = new THREE.Group();
    ng.position.set(nx, ny, nz);
    scene.add(ng);

    const nMat = new THREE.MeshStandardMaterial({
      color: 0xeafaff,
      emissive: new THREE.Color(0x4ef6da),
      emissiveIntensity: 0.48,
      roughness: 0.15,
      metalness: 0.5,
    });
    const starMesh = new THREE.Mesh(
      createFacetedStarGeometry({ points: 6, outerRadius: 0.24, innerRadius: 0.09, depth: 0.08 }),
      nMat
    );
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.012, 8, 32), matChampagneGold);
    ng.add(starMesh, halo);

    const beamCurve = new THREE.LineCurve3(new THREE.Vector3(nx, ny, nz), new THREE.Vector3(0, 4.78, 0));
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x9effec,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(beamCurve, 6, 0.014, 6, false), beamMat));

    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.46, 10, 8), new THREE.MeshBasicMaterial({ visible: false }));
    const nodeObj = { idx: n, lit: false, group: ng, starMesh, halo, mat: nMat, beamMat, glowSpring: new Spring1D(0.45, 110, 12) };
    hit.userData = { kind: 'star_node', nodeObj, label: `点亮第 ${n + 1} 颗极光星冕节点` };
    ng.add(hit);
    interactables.push(hit);
    nodes.push(nodeObj);
  }

  // ---------------- Cursor Starlight Trail Particles ----------------
  const trailCount = 72;
  const trailGeo = new THREE.BufferGeometry();
  const trailPos = new Float32Array(trailCount * 3);
  for (let i = 0; i < trailCount; i++) trailPos[i * 3 + 1] = -20;
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  const trailPoints = new THREE.Points(
    trailGeo,
    new THREE.PointsMaterial({
      map: textures.sparkTex,
      color: 0xbfffe8,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(trailPoints);
  let trailHead = 0;

  // ---------------- Interaction & Awakening Logic ----------------
  let chimesPlayed = 0;
  let litNodesCount = 0;
  let awakened = false;
  const treeEnergySpring = new Spring1D(0.38, 75, 13);
  const surgeSpring = new Spring1D(0, 55, 11);

  function getProgress() {
    const cStep = chimesPlayed >= 2 ? 1 : 0;
    const nStep1 = litNodesCount >= 1 ? 1 : 0;
    const nStep2 = awakened ? 1 : 0;
    return { current: Math.min(3, cStep + nStep1 + nStep2), total: 3 };
  }

  function checkAwaken() {
    if (awakened) return;
    if (litNodesCount >= 3 || (litNodesCount >= 2 && chimesPlayed >= 4) || chimesPlayed >= 6) {
      awakened = true;
      for (const nd of nodes) {
        nd.lit = true;
        nd.glowSpring.target = 3.2;
      }
      treeEnergySpring.target = 2.45;
      surgeSpring.target = 1.0;
      cameraRig.focusOn(0, 0.65, 0, 0.82, 2.2);
      audio.playSigilAwaken();
      onAwaken(4, '第四声部已唤醒 · 水晶玻璃琴与极光圣咏齐鸣');
      onHint('北极星圣殿全冠点亮 · 黑冰实时倒映漫天极光，终章已就绪');
    }
  }

  function strikeChime(cObj) {
    if (cObj.cooldown > 0) return;
    cObj.cooldown = 0.16;
    cObj.swing.impulse((Math.random() > 0.5 ? 1 : -1) * 5.2);
    cObj.glow.snap(2.6);
    cObj.glow.target = 0.55;
    audio.playCrystalHarmonica(cObj.idx);
    chimesPlayed++;
    checkAwaken();
  }

  function igniteNode(nObj) {
    if (!nObj.lit) {
      nObj.lit = true;
      litNodesCount++;
      nObj.glowSpring.target = 3.0;
      audio.playCrystalHarmonica(nObj.idx + 2);
      checkAwaken();
    } else {
      nObj.glowSpring.impulse(4.0);
      audio.playCrystalHarmonica(nObj.idx + 2);
    }
  }

  function onPointerDown(hit) {
    if (!hit) return false;
    const { kind, chimeObj, nodeObj } = hit.object.userData;
    if (kind === 'chime' && chimeObj) {
      strikeChime(chimeObj);
      return true;
    }
    if (kind === 'star_node' && nodeObj) {
      igniteNode(nodeObj);
      return true;
    }
    return false;
  }

  function onHoverHit(hit) {
    if (!hit) return;
    const { kind, chimeObj } = hit.object.userData;
    if (kind === 'chime' && chimeObj) {
      strikeChime(chimeObj);
    }
  }

  function onPointerMove(pointerNDC) {
    const wx = pointerNDC.x * 4.4;
    const wy = clamp(2.35 + pointerNDC.y * 2.4, 0.25, 5.2);
    trailPos[trailHead * 3] = wx + (Math.random() - 0.5) * 0.14;
    trailPos[trailHead * 3 + 1] = wy + (Math.random() - 0.5) * 0.14;
    trailPos[trailHead * 3 + 2] = 1.65;
    trailHead = (trailHead + 1) % trailCount;

    for (const lt of lotuses) {
      const dist = Math.hypot(lt.x - wx, lt.z - 1.2);
      lt.bloom.target = dist < 2.2 ? 1.0 : (awakened ? 0.85 : 0.22);
    }
    return false;
  }

  function onPointerUp() {}

  // Render real-time Planar Mirror Reflection across y = 0 before main pass!
  function renderPlanarMirror(renderer, mainCam) {
    _mirrorCam.fov = mainCam.fov;
    _mirrorCam.aspect = mainCam.aspect;
    _mirrorCam.near = mainCam.near;
    _mirrorCam.far = mainCam.far;
    _mirrorCam.position.set(mainCam.position.x, -mainCam.position.y, mainCam.position.z);

    mainCam.getWorldDirection(_camDir);
    _mirTarget.set(
      _mirrorCam.position.x + _camDir.x * 10,
      _mirrorCam.position.y - _camDir.y * 10,
      _mirrorCam.position.z + _camDir.z * 10
    );
    _mirrorCam.up.set(0, -1, 0); // flip vertical up-vector for true mirror reflection!
    _mirrorCam.lookAt(_mirTarget);
    _mirrorCam.updateProjectionMatrix();
    _mirrorCam.updateMatrixWorld();

    const prevShadow = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    iceFloor.visible = false;
    renderer.setRenderTarget(mirrorRT);
    renderer.clear();
    renderer.render(scene, _mirrorCam);
    iceFloor.visible = true;
    renderer.shadowMap.autoUpdate = prevShadow;
  }

  function update(dt, t, parallax) {
    auroraMat.uniforms.uTime.value = t;
    auroraMat.uniforms.uSurge.value = surgeSpring.update(dt);

    const treeE = treeEnergySpring.update(dt);
    matDichroic.uniforms.uTime.value = t;
    matDichroic.uniforms.uEmissiveIntensity.value = treeE * 0.42;

    blackIceMat.uniforms.uTime.value = t;
    blackIceMat.uniforms.uEnergy.value = treeE;
    auroraShaftMat.uniforms.uTime.value = t;
    auroraShaftMat.uniforms.uOpacity.value = 0.06 + treeE * 0.035;

    polarisMat.emissiveIntensity = 1.45 + treeE * 1.35;
    polarisStar.rotation.y = t * 0.75;
    treeRoot.rotation.y = t * 0.16;
    treeHeartLight.intensity = 1.85 + treeE * 1.1;

    for (let r = 0; r < astrolabeRings.length; r++) {
      astrolabeRings[r].rotation.y = t * (r % 2 === 0 ? 0.35 : -0.42);
    }

    for (let ci = 0; ci < chimes.length; ci++) {
      const c = chimes[ci];
      if (c.cooldown > 0) c.cooldown -= dt;
      const sw = c.swing.update(dt);
      const rz = sw * 0.12;
      c.pendulum.rotation.z = rz;
      c.pendulum.rotation.x = Math.sin(t * 1.5 + c.idx) * 0.03;
      c.mat.uniforms.uTime.value = t;
      c.mat.uniforms.uEmissiveIntensity.value = c.glow.update(dt);

      _clapDummy.position.set(
        c.baseX + Math.sin(rz) * c.clapperDrop * 0.85,
        c.baseY - Math.cos(rz) * c.clapperDrop,
        c.baseZ
      );
      _clapDummy.updateMatrix();
      clapperInstanced.setMatrixAt(ci, _clapDummy.matrix);
    }
    clapperInstanced.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < lotuses.length; i++) {
      const lt = lotuses[i];
      const b = lt.bloom.update(dt);
      const baseRotY = t * 0.25 + i;
      const tiltZ = lerp(-0.22, -0.95, b);
      for (let p = 0; p < 6; p++) {
        _lotusEuler.set(0, baseRotY + (p / 6) * Math.PI * 2, 0);
        _lotusRootMat.makeRotationFromEuler(_lotusEuler);
        _lotusRootMat.setPosition(lt.x, 0.04, lt.z);

        _lotusEuler.set(0, 0, tiltZ);
        _lotusPetMat.makeRotationFromEuler(_lotusEuler);
        _lotusPetMat.setPosition(0.08, 0.15, 0);

        _lotusPivMat.multiplyMatrices(_lotusRootMat, _lotusPetMat);
        lotusInstanced.setMatrixAt(i * 6 + p, _lotusPivMat);
      }
    }
    lotusInstanced.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < nodes.length; i++) {
      const nd = nodes[i];
      const g = nd.glowSpring.update(dt);
      // Gentle shimmer hint pulse on unlit constellation nodes
      const hintPulse = nd.lit ? 0 : Math.pow(Math.max(0, Math.sin(t * 1.8 + i * 1.2)), 4.0) * 0.85;
      nd.mat.emissiveIntensity = g + hintPulse;
      nd.starMesh.rotation.y = t * 0.9 + i;
      nd.halo.rotation.x = Math.sin(t * 0.8 + i) * 0.6;
      nd.halo.rotation.y = t * 0.5;
      nd.beamMat.opacity = clamp((g - 0.6) * 0.32, 0, 0.72);
    }

    for (let i = 0; i < trailCount; i++) {
      if (trailPos[i * 3 + 1] > -10) {
        trailPos[i * 3 + 1] -= dt * 0.22;
        if (trailPos[i * 3 + 1] < 0.05) trailPos[i * 3 + 1] = -20;
      }
    }
    trailGeo.attributes.position.needsUpdate = true;

    cameraRig.update(dt, parallax);
  }

  function applyCamera(camera) {
    cameraRig.apply(camera);
  }

  function setCaptureState(preset) {
    if (preset === 'hero' || preset === 'climax') {
      for (const nd of nodes) {
        nd.lit = true;
        nd.glowSpring.snap(3.2);
      }
      for (const lt of lotuses) lt.bloom.snap(0.95);
      awakened = true;
      treeEnergySpring.snap(2.45);
      surgeSpring.snap(1.0);
    }
    update(0.016, 4.2, { x: -0.04, y: 0.05 });
  }

  return {
    id: 4,
    roman: 'ACT IV',
    title: '北极星圣殿',
    subtitle: '极光琉璃冰晶奇境 · AURORA DICHROIC SANCTUARY',
    defaultHint: '轻拂琉璃冰晶风铃 · 点亮五颗极光星冕节点 · 俯视黑冰欣赏实时极光倒影与深渊冰纹',
    transTint: new THREE.Color(0x6cfce2),
    cameraRig,
    getProgress,
    getPostOpts: () => ({
      bloomStrength: 0.56,
      bloomThreshold: 0.76,
      starburst: 0.65,
      focusDist: cameraRig.getFocusDistance(),
      aperture: 0.44,
      aoStrength: 0.45,
      aoRadius: 0.30,
      refractMeshes,
      onBeforeMainRender: renderPlanarMirror,
    }),
    scene,
    interactables,
    onPointerDown,
    onHoverHit,
    onPointerMove,
    onPointerUp,
    update,
    applyCamera,
    setCaptureState,
  };
}

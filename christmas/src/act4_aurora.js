// Act IV: Aurora Dichroic Crystal Wonderland — "Sanctuary of Polaris" (北极星圣殿)
// Real-time flowing silk-curtain aurora dome shader, obsidian mirror ice floor, Fibonacci-spiral
// dichroic crystal prism Christmas tree, interactive 8-note Glass Harmonica chimes, cursor starlight
// trail blooming crystal ice-lotuses, and 5-node Constellation Ignition!

import * as THREE from '../../vendor/three/three.module.js';
import {
  Spring1D,
  Spring3D,
  clamp,
  lerp,
  createCrystalPrismGeometry,
  createFacetedStarGeometry,
} from './physics.js';

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
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y, -0.2, 1.0);

  // Polar night deep indigo-violet sky gradient
  vec3 sky = mix(vec3(0.025, 0.045, 0.11), vec3(0.008, 0.012, 0.038), smoothstep(0.0, 0.85, max(h, 0.0)));

  // Crisp circular polar starfield (never square grid cells)
  vec2 starUv = d.xz / (abs(d.y) + 0.35) * 46.0;
  vec2 starCell = floor(starUv);
  vec2 starFrac = fract(starUv) - 0.5;
  float st = hash21(starCell);
  if (st > 0.965 && d.y > 0.01) {
    vec2 jitter = vec2(hash21(starCell + 7.1), hash21(starCell + 19.3)) - 0.5;
    float dist = length(starFrac - jitter * 0.55);
    float pinpoint = smoothstep(0.14, 0.0, dist);
    float tw = 0.55 + 0.45 * sin(uTime * 3.2 + st * 90.0);
    sky += vec3(0.88, 0.94, 1.0) * tw * pinpoint * 2.8;
  }

  // Multi-curtain flowing polar aurora ribbons with vivid vertical magnetic rays
  if (d.y > -0.04) {
    vec2 p = d.xz / (d.y + 0.42);
    float wave1 = sin(p.x * 1.7 + uTime * 0.28 + sin(p.y * 1.4 - uTime * 0.2) * 1.6);
    float wave2 = sin(p.x * 2.8 - uTime * 0.22 + cos(p.y * 2.0 + uTime * 0.18) * 1.3);

    float band1 = exp(-pow((p.y + 0.55 - wave1 * 0.36) * 2.4, 2.0));
    float band2 = exp(-pow((p.y + 0.95 - wave2 * 0.34) * 2.7, 2.0));

    // Fine vertical magnetic-field striations along the aurora curtains
    float rays1 = pow(0.35 + 0.65 * noise2(vec2(p.x * 16.0 + uTime * 0.45, d.y * 4.5)), 1.4);
    float rays2 = pow(0.35 + 0.65 * noise2(vec2(p.x * 22.0 - uTime * 0.38, d.y * 5.0 + 7.0)), 1.4);

    float fadeH = smoothstep(-0.02, 0.14, d.y) * (1.0 - smoothstep(0.55, 0.92, d.y));
    float a1 = band1 * rays1 * fadeH;
    float a2 = band2 * rays2 * fadeH;

    vec3 colEmerald = vec3(0.12, 1.0, 0.74);
    vec3 colViolet = vec3(0.66, 0.32, 1.0);
    vec3 colCyan = vec3(0.22, 0.84, 1.0);

    vec3 aur = mix(colEmerald, colViolet, clamp(d.y * 2.1, 0.0, 1.0)) * a1 * 2.35;
    aur += mix(colCyan, colViolet, clamp(d.y * 1.8 + 0.18, 0.0, 1.0)) * a2 * 1.85;
    sky += aur * (1.0 + uSurge * 0.95);
  }

  gl_FragColor = vec4(sky, 1.0);
}
`;

export function createAct4Aurora({ envMap, textures, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x040712);
  scene.environment = envMap;

  const camBasePos = new THREE.Vector3(0, 2.55, 9.25);
  const camBaseLook = new THREE.Vector3(0, 2.35, 0);
  const camPosSpring = new Spring3D(camBasePos.x, camBasePos.y, camBasePos.z, 62, 14);
  const camLookSpring = new Spring3D(camBaseLook.x, camBaseLook.y, camBaseLook.z, 72, 15);

  // Ethereal polar & champagne lighting
  const amb = new THREE.AmbientLight(0x1f365c, 0.9);
  scene.add(amb);

  const keyCyan = new THREE.DirectionalLight(0x70ffe0, 1.85);
  keyCyan.position.set(-6, 9, 5);
  scene.add(keyCyan);

  const keyGold = new THREE.DirectionalLight(0xffe5b4, 2.1);
  keyGold.position.set(6, 8, 6);
  scene.add(keyGold);

  const treeHeartLight = new THREE.PointLight(0x9beeff, 2.2, 11, 1.5);
  treeHeartLight.position.set(0, 2.6, 0);
  scene.add(treeHeartLight);

  // ---------------- Silk-Curtain Polar Aurora Sky Dome ----------------
  const auroraMat = new THREE.ShaderMaterial({
    vertexShader: AURORA_VS,
    fragmentShader: AURORA_FS,
    uniforms: {
      uTime: { value: 0 },
      uSurge: { value: 0 },
    },
    side: THREE.BackSide,
    depthWrite: false,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(52, 48, 32), auroraMat);
  scene.add(skyDome);

  // ---------------- Obsidian Black-Ice Mirror Floor & Gold Astrolabe Compass ----------------
  const iceFloor = new THREE.Mesh(
    new THREE.CircleGeometry(24, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x091326,
      roughness: 0.08,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      iridescence: 0.55,
      iridescenceIOR: 1.5,
      envMapIntensity: 2.2,
    })
  );
  iceFloor.rotation.x = -Math.PI * 0.5;
  iceFloor.position.y = 0;
  scene.add(iceFloor);

  const matChampagneGold = new THREE.MeshPhysicalMaterial({
    color: 0xf7dfaa,
    metalness: 0.96,
    roughness: 0.16,
    envMapIntensity: 2.5,
  });

  // Inlaid golden sacred geometry rings on the black ice
  for (const [r, w] of [[1.65, 0.018], [2.85, 0.022], [4.15, 0.015]]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + w, 72), matChampagneGold);
    ring.rotation.x = -Math.PI * 0.5;
    ring.position.y = 0.008;
    scene.add(ring);
  }

  // ---------------- Dichroic Iridescent Crystal Christmas Tree ----------------
  const treeRoot = new THREE.Group();
  scene.add(treeRoot);

  // Dichroic crystal material: high iridescence + thin-film interference + glass clarity
  const matDichroic = new THREE.MeshPhysicalMaterial({
    color: 0xdff8ff,
    emissive: new THREE.Color(0x1b4668),
    emissiveIntensity: 0.35,
    metalness: 0.12,
    roughness: 0.07,
    transmission: 0.72,
    ior: 1.65,
    thickness: 0.65,
    iridescence: 1.0,
    iridescenceIOR: 1.85,
    iridescenceThicknessRange: [160, 680],
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8,
  });

  // Twin champagne-silver spun ribbons spiraling up the crystal tree
  for (let s = 0; s < 2; s++) {
    const pts = [];
    const turns = 4.2;
    for (let i = 0; i <= 90; i++) {
      const u = i / 90;
      const a = u * turns * Math.PI * 2 + s * Math.PI;
      const r = lerp(1.75, 0.08, Math.pow(u, 0.88));
      const y = 0.25 + u * 4.25;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const ribbon = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 120, 0.018, 8, false),
      matChampagneGold
    );
    treeRoot.add(ribbon);
  }

  // 220 Fibonacci-spiral suspended bicone crystal prisms forming the radiant tree canopy!
  const prismCount = 220;
  const prismGeo = createCrystalPrismGeometry({ sides: 6, radius: 0.11, height: 0.38, waist: 0.16 });
  const prismInst = new THREE.InstancedMesh(prismGeo, matDichroic, prismCount);
  const prismData = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < prismCount; i++) {
    const u = i / prismCount;
    const ang = i * 2.3999632;
    const rad = lerp(1.68, 0.12, Math.pow(u, 0.82)) * (0.88 + 0.18 * Math.sin(i * 3.7));
    const y = 0.32 + u * 4.12;
    const scale = lerp(1.15, 0.58, u);
    prismData.push({ ang, rad, y, scale, phase: Math.random() * Math.PI * 2 });
    dummy.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
    dummy.rotation.set(0.12 * Math.sin(i), -ang, 0.15 * Math.cos(i));
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    prismInst.setMatrixAt(i, dummy.matrix);
  }
  treeRoot.add(prismInst);

  // Crown Polaris Diamond Star atop the crystal sanctuary tree
  const polarisMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: new THREE.Color(0x8cf6ff),
    emissiveIntensity: 1.8,
    metalness: 0.3,
    roughness: 0.08,
    iridescence: 1.0,
    envMapIntensity: 3.0,
  });
  const polarisStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.52, innerRadius: 0.18, depth: 0.16 }),
    polarisMat
  );
  polarisStar.position.y = 4.78;
  treeRoot.add(polarisStar);

  const interactables = [];

  // ---------------- Mechanism 1: 8 Suspended Dichroic Glass Harmonica Chimes ----------------
  const chimes = [];
  const chimePalette = [0x6efce0, 0x74d8ff, 0xa89cff, 0xf5b8ff, 0xffe29e, 0x7effc4, 0x8bc8ff, 0xd8a8ff];
  for (let i = 0; i < 8; i++) {
    const u = i / 7;
    const ang = lerp(-1.18, 1.18, u); // graceful front semicircle arc facing viewer
    const r = 3.05;
    const x = Math.sin(ang) * r;
    const z = Math.cos(ang) * r * 0.72 + 0.55;
    const topY = 2.65 + Math.cos((u - 0.5) * Math.PI) * 0.55;

    const anchor = new THREE.Group();
    anchor.position.set(x, topY, z);
    scene.add(anchor);

    // Fine gold suspension filament
    const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.9, 6), matChampagneGold);
    thread.position.y = -0.45;
    anchor.add(thread);

    const pendulum = new THREE.Group();
    pendulum.position.y = -0.85;
    anchor.add(pendulum);

    const cMat = new THREE.MeshPhysicalMaterial({
      color: chimePalette[i],
      emissive: new THREE.Color(chimePalette[i]),
      emissiveIntensity: 0.35,
      roughness: 0.06,
      metalness: 0.1,
      transmission: 0.78,
      ior: 1.6,
      iridescence: 1.0,
      iridescenceIOR: 1.9,
      envMapIntensity: 2.6,
    });
    const len = 0.78 - Math.abs(i - 3.5) * 0.055;
    const crystalBar = new THREE.Mesh(
      createCrystalPrismGeometry({ sides: 6, radius: 0.115, height: len, waist: 0.24 }),
      cMat
    );
    pendulum.add(crystalBar);

    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 1.15, 0.48),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    const chimeObj = {
      idx: i,
      pendulum,
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

  // ---------------- Mechanism 2: 6 Crystal Ice-Lotuses on the Mirror Floor ----------------
  const lotuses = [];
  for (let l = 0; l < 6; l++) {
    const a = (l / 6) * Math.PI * 2 + 0.52;
    const r = 2.25;
    const g = new THREE.Group();
    g.position.set(Math.cos(a) * r, 0.04, Math.sin(a) * r);
    scene.add(g);

    const petals = [];
    for (let p = 0; p < 6; p++) {
      const pa = (p / 6) * Math.PI * 2;
      const piv = new THREE.Group();
      piv.rotation.y = pa;
      const pet = new THREE.Mesh(
        createCrystalPrismGeometry({ sides: 4, radius: 0.085, height: 0.34, waist: 0.15 }),
        matDichroic
      );
      pet.position.set(0.08, 0.15, 0);
      pet.rotation.z = -0.35;
      piv.add(pet);
      g.add(piv);
      petals.push(pet);
    }
    lotuses.push({ group: g, petals, bloom: new Spring1D(0.2, 95, 12) });
  }

  // ---------------- Mechanism 3: 5 Floating Constellation Polaris Nodes ----------------
  const nodes = [];
  const nodeCoords = [
    [-2.25, 3.55, -0.35],
    [-1.35, 4.45, 0.25],
    [0.0, 4.78, 0.55], // Near apex
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
      emissiveIntensity: 0.42,
      roughness: 0.15,
      metalness: 0.5,
    });
    const starMesh = new THREE.Mesh(
      createFacetedStarGeometry({ points: 6, outerRadius: 0.24, innerRadius: 0.09, depth: 0.08 }),
      nMat
    );
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.012, 8, 32), matChampagneGold);
    ng.add(starMesh, halo);

    // Golden constellation beam linking node to the Crown Polaris Star (0, 4.78, 0)
    const pStart = new THREE.Vector3(nx, ny, nz);
    const pEnd = new THREE.Vector3(0, 4.78, 0);
    const beamCurve = new THREE.LineCurve3(pStart, pEnd);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x9effec,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const beam = new THREE.Mesh(new THREE.TubeGeometry(beamCurve, 8, 0.014, 6, false), beamMat);
    scene.add(beam);

    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 12, 10),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    const nodeObj = {
      idx: n,
      lit: false,
      group: ng,
      starMesh,
      halo,
      mat: nMat,
      beamMat,
      glowSpring: new Spring1D(0.42, 110, 12),
    };
    hit.userData = { kind: 'star_node', nodeObj, label: `点亮第 ${n + 1} 颗极光星冕节点` };
    ng.add(hit);
    interactables.push(hit);
    nodes.push(nodeObj);
  }

  // ---------------- Cursor Starlight Trail Particles ----------------
  const trailCount = 72;
  const trailGeo = new THREE.BufferGeometry();
  const trailPos = new Float32Array(trailCount * 3);
  for (let i = 0; i < trailCount; i++) {
    trailPos[i * 3 + 1] = -20; // hidden initially
  }
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  const trailMat = new THREE.PointsMaterial({
    map: textures.sparkTex,
    color: 0xbfffe8,
    size: 0.30,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const trailPoints = new THREE.Points(trailGeo, trailMat);
  scene.add(trailPoints);
  let trailHead = 0;

  // ---------------- Interaction & Awakening Logic ----------------
  let chimesPlayed = 0;
  let litNodesCount = 0;
  let awakened = false;
  const treeEnergySpring = new Spring1D(0.35, 75, 13);
  const surgeSpring = new Spring1D(0, 55, 11);

  function checkAwaken() {
    if (awakened) return;
    if (litNodesCount >= 3 || (litNodesCount >= 2 && chimesPlayed >= 4) || chimesPlayed >= 6) {
      awakened = true;
      // Ignite all remaining constellation nodes in celebration!
      for (const nd of nodes) {
        nd.lit = true;
        nd.glowSpring.target = 3.2;
      }
      treeEnergySpring.target = 2.4;
      surgeSpring.target = 1.0;
      audio.playSigilAwaken();
      onAwaken(4, '第四声部已唤醒 · 水晶玻璃琴与极光圣咏齐鸣');
      onHint('北极星圣殿全冠点亮 · 四重奏终章已就绪');
    }
  }

  function strikeChime(cObj) {
    if (cObj.cooldown > 0) return;
    cObj.cooldown = 0.16;
    cObj.swing.impulse((Math.random() > 0.5 ? 1 : -1) * 5.2);
    cObj.glow.snap(2.8);
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

  // Hovering smoothly across the crystal chimes plays them like a real glass harp!
  function onHoverHit(hit) {
    if (!hit) return;
    const { kind, chimeObj } = hit.object.userData;
    if (kind === 'chime' && chimeObj) {
      strikeChime(chimeObj);
    }
  }

  function onPointerMove(pointerNDC) {
    // Emit shimmering starlight dust along cursor trajectory in 3D space
    const wx = pointerNDC.x * 4.4;
    const wy = clamp(2.35 + pointerNDC.y * 2.4, 0.25, 5.2);
    const wz = 1.65;
    trailPos[trailHead * 3] = wx + (Math.random() - 0.5) * 0.14;
    trailPos[trailHead * 3 + 1] = wy + (Math.random() - 0.5) * 0.14;
    trailPos[trailHead * 3 + 2] = wz;
    trailHead = (trailHead + 1) % trailCount;

    // Bloom ice-lotuses near cursor X projection
    for (const lt of lotuses) {
      const dist = Math.hypot(lt.group.position.x - wx, lt.group.position.z - 1.2);
      lt.bloom.target = dist < 2.2 ? 1.0 : (awakened ? 0.85 : 0.22);
    }
    return false;
  }

  function onPointerUp() {}

  function update(dt, t, parallax) {
    auroraMat.uniforms.uTime.value = t;
    auroraMat.uniforms.uSurge.value = surgeSpring.update(dt);

    const treeE = treeEnergySpring.update(dt);
    matDichroic.emissiveIntensity = treeE * 0.45;
    polarisMat.emissiveIntensity = 1.4 + treeE * 1.35;
    polarisStar.rotation.y = t * 0.75;
    treeRoot.rotation.y = t * 0.16;
    treeHeartLight.intensity = 1.8 + treeE * 1.1;

    // Gentle breathing shimmer of the 220 suspended crystal prisms
    for (let i = 0; i < prismCount; i++) {
      const d = prismData[i];
      const bob = Math.sin(t * 1.8 + d.phase) * 0.035;
      dummy.position.set(Math.cos(d.ang) * d.rad, d.y + bob, Math.sin(d.ang) * d.rad);
      dummy.rotation.set(0.12 * Math.sin(t + d.phase), -d.ang + t * 0.4, 0.14 * Math.cos(t + d.phase));
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      prismInst.setMatrixAt(i, dummy.matrix);
    }
    prismInst.instanceMatrix.needsUpdate = true;

    // Update 8 Glass Harmonica chimes
    for (const c of chimes) {
      if (c.cooldown > 0) c.cooldown -= dt;
      const sw = c.swing.update(dt);
      const gl = c.glow.update(dt);
      c.pendulum.rotation.z = sw * 0.25;
      c.pendulum.rotation.y = t * 0.45 + c.idx;
      c.mat.emissiveIntensity = gl;
    }

    // Update 6 Ice-Lotuses
    for (const lt of lotuses) {
      const bl = lt.bloom.update(dt);
      for (const pet of lt.petals) {
        pet.rotation.z = -0.25 - bl * 0.72;
      }
      lt.group.rotation.y = t * 0.25;
    }

    // Update 5 Constellation Nodes
    for (const nd of nodes) {
      const g = nd.glowSpring.update(dt);
      nd.mat.emissiveIntensity = g;
      nd.starMesh.rotation.y = t * 1.1 + nd.idx;
      nd.halo.rotation.x = Math.sin(t + nd.idx) * 0.6;
      nd.beamMat.opacity = clamp((g - 0.6) * 0.35, 0, 0.78);
    }

    // Drift starlight cursor trail upward & fade out
    for (let i = 0; i < trailCount; i++) {
      if (trailPos[i * 3 + 1] > -10) {
        trailPos[i * 3 + 1] += dt * 0.28;
        if (trailPos[i * 3 + 1] > 6.5) trailPos[i * 3 + 1] = -20;
      }
    }
    trailGeo.attributes.position.needsUpdate = true;

    camPosSpring.setTarget(camBasePos.x + parallax.x * 1.2, camBasePos.y + parallax.y * 0.65, camBasePos.z);
    camLookSpring.setTarget(camBaseLook.x + parallax.x * 0.25, camBaseLook.y + parallax.y * 0.2, camBaseLook.z);
    camPosSpring.update(dt);
    camLookSpring.update(dt);
  }

  function applyCamera(camera) {
    camPosSpring.copyTo(camera.position);
    const target = new THREE.Vector3();
    camLookSpring.copyTo(target);
    camera.lookAt(target);
  }

  function setCaptureState(preset = 'hero') {
    for (let i = 0; i < (preset === 'climax' ? 5 : 3); i++) {
      nodes[i].lit = true;
      nodes[i].glowSpring.snap(3.0);
    }
    if (preset === 'climax') {
      treeEnergySpring.snap(2.4);
      surgeSpring.snap(1.0);
      for (const lt of lotuses) lt.bloom.snap(0.95);
    }
    update(0.016, 4.2, { x: 0.08, y: 0.06 });
  }

  return {
    id: 4,
    roman: 'ACT IV',
    title: '北极星圣殿',
    subtitle: '极光琉璃与冰晶奇境 · AURORA DICHROIC WONDERLAND',
    defaultHint: '轻拂八枚琉璃风铃合奏音阶 · 点亮树冠五颗北极星冕节点',
    transTint: new THREE.Color(0x64f5d8),
    postOpts: { bloomStrength: 0.56, bloomThreshold: 0.76, starburst: 0.85, tiltShift: 0.36 },
    scene,
    interactables,
    onHoverHit,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    update,
    applyCamera,
    setCaptureState,
  };
}

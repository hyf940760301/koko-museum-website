// Act III: Clockwork Brass Snowglobe & Automaton — "The Midnight Horologium" (午夜天文钟)
// Screen-space chromatic-dispersion thick blown-glass globe shader, lathe-turned antique brass
// plinth with meshing involute gears & music-box cylinder, spiral viaduct miniature steam train
// puffing starlight smoke, butterfly winding key, and 3D vortex blizzard snow physics!

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  Spring2D,
  Spring3D,
  clamp,
  lerp,
  createGearGeometry,
  createFacetedStarGeometry,
} from './physics.js';

const GLOBE_VS = /* glsl */`
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec4 vScreenPos;

void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 clip = projectionMatrix * viewMatrix * wp;
  vScreenPos = clip;
  gl_Position = clip;
}
`;

// Thick blown-glass snowglobe shell: magnifies & refracts the interior sceneRT with subtle RGB
// chromatic dispersion near the rim, crisp studio window arc reflections & warm hearth highlights
const GLOBE_FS = /* glsl */`
uniform sampler2D tRefract;
uniform vec2 uRes;
uniform float uSwirlGlow;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec4 vScreenPos;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - ndv, 3.8);

  vec2 uv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;
  // Thick meniscus lens refraction (gentle barrel bend near rim + RGB dispersion)
  vec3 viewN = mat3(viewMatrix) * N;
  float rimBend = (1.0 - ndv) * 0.052;
  vec2 offR = -viewN.xy * (rimBend * 0.88);
  vec2 offG = -viewN.xy * (rimBend * 1.00);
  vec2 offB = -viewN.xy * (rimBend * 1.14);

  float r = texture2D(tRefract, clamp(uv + offR, vec2(0.002), vec2(0.998))).r;
  float g = texture2D(tRefract, clamp(uv + offG, vec2(0.002), vec2(0.998))).g;
  float b = texture2D(tRefract, clamp(uv + offB, vec2(0.002), vec2(0.998))).b;
  vec3 refracted = vec3(r, g, b);

  // Studio window arc reflection (cool upper-left crescent) & warm hearth reflection (lower-right)
  vec3 R = reflect(-V, N);
  vec3 Lwin = normalize(vec3(-0.62, 0.66, 0.42));
  vec3 Lhearth = normalize(vec3(0.68, -0.18, 0.71));
  float specWin = pow(max(dot(R, Lwin), 0.0), 42.0) * 1.65 + smoothstep(0.78, 0.96, dot(R, Lwin)) * 0.85;
  float specFire = pow(max(dot(R, Lhearth), 0.0), 28.0) * 1.45;

  // Delicate prismatic caustics tint along the thick glass rim
  vec3 rimTint = mix(vec3(0.76, 0.90, 1.0), vec3(1.0, 0.82, 0.55), clamp(N.x * 0.5 + 0.5, 0.0, 1.0));
  vec3 glassCol = refracted * (1.0 - fresnel * 0.28);
  glassCol += rimTint * fresnel * (0.58 + uSwirlGlow * 0.35);
  glassCol += vec3(0.86, 0.94, 1.0) * specWin;
  glassCol += vec3(1.0, 0.68, 0.34) * specFire;

  gl_FragColor = vec4(glassCol, 1.0);
}
`;

export function createAct3Globe({ envMap, textures, refractTex, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080a12);
  scene.environment = envMap;

  const camBasePos = new THREE.Vector3(0, 2.35, 8.35);
  const camBaseLook = new THREE.Vector3(0, 1.75, 0);
  const camPosSpring = new Spring3D(camBasePos.x, camBasePos.y, camBasePos.z, 65, 14);
  const camLookSpring = new Spring3D(camBaseLook.x, camBaseLook.y, camBaseLook.z, 75, 15);
  const focusOffset = new THREE.Vector3();
  const focusLookOffset = new THREE.Vector3();
  let focusTimer = 0;

  // Studio & Hearth Lighting
  const amb = new THREE.AmbientLight(0x263558, 0.85);
  scene.add(amb);

  const keyLight = new THREE.DirectionalLight(0xffe6bd, 2.4);
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

  const globeCoreLight = new THREE.PointLight(0xffb454, 1.5, 6.5, 1.6);
  globeCoreLight.position.set(0, 2.35, 0.2);
  scene.add(globeCoreLight);

  // ---------------- Materials ----------------
  const matBrass = new THREE.MeshPhysicalMaterial({
    color: 0xe3b664,
    roughnessMap: textures.brassTex,
    bumpMap: textures.brassTex,
    bumpScale: 0.008,
    metalness: 0.95,
    roughness: 0.24,
    clearcoat: 0.25,
    envMapIntensity: 2.2,
  });

  const matCopper = new THREE.MeshPhysicalMaterial({
    color: 0xd47d50,
    roughnessMap: textures.brassTex,
    metalness: 0.94,
    roughness: 0.26,
    envMapIntensity: 2.0,
  });

  const matDarkBronze = new THREE.MeshStandardMaterial({
    color: 0x261c14,
    roughness: 0.46,
    metalness: 0.78,
    envMapIntensity: 1.3,
  });

  const matVelvetTable = new THREE.MeshPhysicalMaterial({
    color: 0x10221c,
    bumpMap: textures.paperTex,
    bumpScale: 0.015,
    roughness: 0.9,
    sheen: 0.9,
    sheenRoughness: 0.75,
    sheenColor: new THREE.Color(0x3a6e5c),
  });

  const matSnow = new THREE.MeshPhysicalMaterial({
    color: 0xf7f9ff,
    bumpMap: textures.clayBump,
    bumpScale: 0.012,
    roughness: 0.48,
    clearcoat: 0.22,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xdbeeff),
    envMapIntensity: 0.95,
  });

  const matPine = new THREE.MeshStandardMaterial({
    color: 0x183d2d,
    roughness: 0.78,
    envMapIntensity: 0.8,
  });

  const matTrainRed = new THREE.MeshPhysicalMaterial({
    color: 0xa6212a,
    roughness: 0.28,
    metalness: 0.25,
    clearcoat: 0.75,
    envMapIntensity: 1.5,
  });

  // ---------------- Velvet Desk & Warm Out-of-Focus Hearth Bokeh Backdrop ----------------
  const velvetDesk = new THREE.Mesh(new THREE.PlaneGeometry(34, 24), matVelvetTable);
  velvetDesk.rotation.x = -Math.PI * 0.5;
  velvetDesk.position.y = -1.15;
  velvetDesk.receiveShadow = true;
  scene.add(velvetDesk);

  // Distant warm fireplace & fairy-light bokeh spheres in background
  const bgBokehGroup = new THREE.Group();
  bgBokehGroup.position.z = -7.5;
  scene.add(bgBokehGroup);
  const bokehPalette = [0xff983f, 0xffcf75, 0xff6b3d, 0x7eb8ff];
  for (let i = 0; i < 26; i++) {
    const rad = 0.22 + (i % 5) * 0.14;
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(rad, 24),
      new THREE.MeshBasicMaterial({
        color: bokehPalette[i % bokehPalette.length],
        transparent: true,
        opacity: 0.14 + (i % 4) * 0.06,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    m.position.set(
      Math.sin(i * 2.37) * 7.8,
      -0.4 + ((i * 0.618) % 1) * 6.8,
      -1.5 - (i % 4) * 1.2
    );
    bgBokehGroup.add(m);
  }

  // Whole Snowglobe Assembly (tilts & settles with spring inertia when shaken!)
  const globeRig = new THREE.Group();
  globeRig.position.y = -1.12;
  scene.add(globeRig);

  // ---------------- Lathe-Turned Brass Horologium Base & Meshing Planetary Gears ----------------
  // Lower stepped base ring + upper crown collar, with open gallery between y=0.28..1.12 showing the gears!
  const lowerProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(2.38, 0.0),
    new THREE.Vector2(2.38, 0.12),
    new THREE.Vector2(2.22, 0.18),
    new THREE.Vector2(2.14, 0.28),
    new THREE.Vector2(1.96, 0.34),
    new THREE.Vector2(0.0, 0.34),
  ];
  const baseLower = new THREE.Mesh(new THREE.LatheGeometry(lowerProfile, 64), matBrass);
  baseLower.castShadow = true;
  baseLower.receiveShadow = true;
  globeRig.add(baseLower);

  const upperProfile = [
    new THREE.Vector2(0.0, 1.06),
    new THREE.Vector2(1.98, 1.06),
    new THREE.Vector2(2.12, 1.15),
    new THREE.Vector2(2.04, 1.28),
    new THREE.Vector2(1.88, 1.38),
    new THREE.Vector2(0.0, 1.38),
  ];
  const baseUpper = new THREE.Mesh(new THREE.LatheGeometry(upperProfile, 64), matBrass);
  baseUpper.castShadow = true;
  globeRig.add(baseUpper);

  // Recessed dark bronze drum core inside the open clockwork gallery + warm amber horology backlight
  const coreDrum = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.42, 0.82, 40), matDarkBronze);
  coreDrum.position.y = 0.70;
  globeRig.add(coreDrum);

  const clockworkGlow = new THREE.PointLight(0xffa43b, 1.65, 4.2, 1.8);
  clockworkGlow.position.set(0, 0.72, 2.25);
  globeRig.add(clockworkGlow);

  const energyGems = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const px = Math.cos(a) * 1.98;
    const pz = Math.sin(a) * 1.98;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.068, 0.76, 16), matBrass);
    col.position.set(px, 0.70, pz);
    globeRig.add(col);

    // Amber power-reserve jewel indicators along front collar
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xffd27d,
      emissive: new THREE.Color(0xff9d2e),
      emissiveIntensity: 0.25,
      roughness: 0.2,
    });
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), gemMat);
    gem.position.set(Math.cos(a) * 2.09, 1.20, Math.sin(a) * 2.09);
    globeRig.add(gem);
    energyGems.push(gemMat);
  }

  // Prominent meshing watchmaker gears facing camera (+Z = PI/2 in atan2(z,x), wait: cos/sin!)
  // Note: camera is at +Z (x=0, z=+8.35), so front-center corresponds to x=sin(ang), z=cos(ang)!
  const gears = [];
  const addMeshingGear = (angFromFront, y, radius, teeth, ratio, mat, rDist = 1.86) => {
    const gMesh = new THREE.Mesh(
      createGearGeometry({
        teeth,
        outerRadius: radius,
        innerRadius: radius * 0.82,
        thickness: 0.085,
        holeRadius: radius * 0.18,
        spokes: 5,
        bevelSize: 0.014,
      }),
      mat
    );
    gMesh.position.set(Math.sin(angFromFront) * rDist, y, Math.cos(angFromFront) * rDist);
    gMesh.lookAt(0, y, 0);
    globeRig.add(gMesh);
    gears.push({ mesh: gMesh, ratio });
  };

  addMeshingGear(0.0, 0.72, 0.37, 22, 1.0, matBrass, 1.88);
  addMeshingGear(0.34, 0.75, 0.28, 16, -1.375, matCopper, 1.86);
  addMeshingGear(-0.34, 0.67, 0.29, 18, -1.22, matCopper, 1.86);
  addMeshingGear(0.68, 0.71, 0.33, 20, 1.1, matBrass, 1.85);
  addMeshingGear(-0.68, 0.73, 0.31, 18, 1.22, matBrass, 1.85);

  // Music-box pinned brass cylinder visible at front-bottom window
  const musicDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.52, 24), matBrass);
  musicDrum.rotation.z = Math.PI * 0.5;
  musicDrum.position.set(0, 0.44, 1.78);
  globeRig.add(musicDrum);

  const interactables = [];

  // ---------------- Interactive Butterfly Brass Winding Key (Right Flank) ----------------
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
  keyAssembly.add(keyTurnGroup);

  for (const sy of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.048, 14, 28), matBrass);
    wing.position.set(0.10, sy * 0.24, 0);
    wing.scale.set(1.15, 0.88, 1.0);
    keyTurnGroup.add(wing);
  }
  const keyFinial = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 14), matCopper);
  keyFinial.position.x = 0.24;
  keyTurnGroup.add(keyFinial);

  const keyHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 1.15, 1.05),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  keyHit.position.x = 0.42;
  keyHit.userData = { kind: 'windkey', label: '拧动黄铜发条钥匙 · 驱动蒸汽小火车与八音盒' };
  keyAssembly.add(keyHit);
  interactables.push(keyHit);

  // ---------------- Interior Miniature Alpine Snow-Town & Centerpiece Tree ----------------
  const globeCenterY = 3.22;
  const globeRadius = 2.36;

  const interior = new THREE.Group();
  interior.position.y = globeCenterY;
  globeRig.add(interior);

  // Sculpted snow mound terrain cap inside bottom of sphere
  const snowCap = new THREE.Mesh(
    new THREE.CylinderGeometry(1.92, 1.55, 0.75, 48),
    matSnow
  );
  snowCap.position.y = -1.52;
  snowCap.receiveShadow = true;
  interior.add(snowCap);

  // Central terraced snow hill
  const centerHill = new THREE.Mesh(new THREE.ConeGeometry(1.22, 0.82, 36), matSnow);
  centerHill.position.y = -0.95;
  centerHill.receiveShadow = true;
  interior.add(centerHill);

  // Ring of charming miniature glowing chalets nestled around the snow hill
  const chaletWindows = [];
  for (let c = 0; c < 6; c++) {
    const a = (c / 6) * Math.PI * 2 + 0.3;
    const r = 1.15;
    const ch = new THREE.Group();
    ch.position.set(Math.cos(a) * r, -1.06, Math.sin(a) * r);
    ch.rotation.y = -a + Math.PI * 0.5;

    const walls = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.30, 0.32), matDarkBronze);
    walls.position.y = 0.15;
    walls.castShadow = true;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.31, 0.24, 4), matSnow);
    roof.rotation.y = Math.PI * 0.25;
    roof.position.y = 0.40;
    const winMat = new THREE.MeshStandardMaterial({
      color: 0xffe4a0,
      emissive: new THREE.Color(0xff9c30),
      emissiveIntensity: 1.4,
    });
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.14), winMat);
    win.position.set(0, 0.16, 0.165);
    chaletWindows.push(winMat);
    ch.add(walls, roof, win);
    interior.add(ch);
  }

  // Grand Centerpiece Evergreen Tree + Brass Mechanical Blossom Petals + Bethlehem Crown Star
  const treeGroup = new THREE.Group();
  treeGroup.position.y = -0.62;
  interior.add(treeGroup);

  for (let t = 0; t < 5; t++) {
    const tierR = 0.78 - t * 0.135;
    const tierH = 0.56 - t * 0.05;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(tierR, tierH, 24), matPine);
    cone.position.y = 0.28 + t * 0.34;
    cone.castShadow = true;
    // Frosted snow skirt on each tier
    const frost = new THREE.Mesh(new THREE.TorusGeometry(tierR * 0.92, 0.036, 8, 24), matSnow);
    frost.rotation.x = Math.PI * 0.5;
    frost.position.y = 0.04 + t * 0.34;
    treeGroup.add(cone, frost);
  }

  // 28 Glowing jewel baubles spiraling up the centerpiece tree
  const baubleCols = [0xff4747, 0xffcb47, 0x4ee8b5, 0x70b5ff];
  const baubleMats = [];
  for (let b = 0; b < 28; b++) {
    const u = b / 28;
    const ang = b * 2.39996;
    const rad = lerp(0.70, 0.14, u);
    const y = lerp(0.14, 1.72, u);
    const bm = new THREE.MeshPhysicalMaterial({
      color: baubleCols[b % baubleCols.length],
      emissive: new THREE.Color(baubleCols[b % baubleCols.length]),
      emissiveIntensity: 0.45,
      metalness: 0.65,
      roughness: 0.15,
    });
    const sph = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 10), bm);
    sph.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
    treeGroup.add(sph);
    baubleMats.push(bm);
  }

  // 6 Mechanical brass blossom petals around tree base that unfold at full wind!
  const blossomPetals = [];
  for (let p = 0; p < 6; p++) {
    const a = (p / 6) * Math.PI * 2;
    const piv = new THREE.Group();
    piv.position.set(Math.cos(a) * 0.55, 0.02, Math.sin(a) * 0.55);
    piv.rotation.y = -a;
    const petal = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.38, 4), matBrass);
    petal.position.y = 0.18;
    petal.rotation.z = -0.35;
    piv.add(petal);
    treeGroup.add(piv);
    blossomPetals.push(piv);
  }

  // Top Bethlehem Faceted Star
  const topStarMat = new THREE.MeshStandardMaterial({
    color: 0xfff3cc,
    emissive: new THREE.Color(0xffbe4f),
    emissiveIntensity: 0.9,
    metalness: 0.6,
    roughness: 0.2,
  });
  const topStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.30, innerRadius: 0.11, depth: 0.09 }),
    topStarMat
  );
  topStar.position.y = 2.04;
  treeGroup.add(topStar);

  // ---------------- Brass Viaduct Track & Miniature Steam Express Train ----------------
  const trackR = 1.62;
  const trackY = -0.98;
  const railOuter = new THREE.Mesh(new THREE.TorusGeometry(trackR + 0.06, 0.016, 8, 64), matBrass);
  railOuter.rotation.x = Math.PI * 0.5;
  railOuter.position.y = trackY;
  const railInner = new THREE.Mesh(new THREE.TorusGeometry(trackR - 0.06, 0.016, 8, 64), matBrass);
  railInner.rotation.x = Math.PI * 0.5;
  railInner.position.y = trackY;
  interior.add(railOuter, railInner);

  for (let p = 0; p < 16; p++) {
    const a = (p / 16) * Math.PI * 2;
    const trestle = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.032, 0.26, 8), matCopper);
    trestle.position.set(Math.cos(a) * trackR, trackY - 0.13, Math.sin(a) * trackR);
    interior.add(trestle);
  }

  const trainOrbit = new THREE.Group();
  trainOrbit.position.y = trackY + 0.02;
  interior.add(trainOrbit);

  // Locomotive + 2 Holiday Coaches positioned along the circular track arc
  const buildCar = (angOffset, isEngine) => {
    const g = new THREE.Group();
    g.position.set(Math.cos(angOffset) * trackR, 0, Math.sin(angOffset) * trackR);
    g.rotation.y = -angOffset;

    if (isEngine) {
      const boiler = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.34, 16), matTrainRed);
      boiler.rotation.x = Math.PI * 0.5;
      boiler.position.set(0, 0.12, 0.05);
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.24, 0.18), matTrainRed);
      cab.position.set(0, 0.16, -0.15);
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.03, 0.14, 12), matBrass);
      stack.position.set(0, 0.24, 0.16);
      const headlamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xfff3c4 })
      );
      headlamp.position.set(0, 0.13, 0.23);
      g.add(boiler, cab, stack, headlamp);
    } else {
      const coach = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.19, 0.32), matTrainRed);
      coach.position.y = 0.12;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.035, 0.34), matBrass);
      roof.position.y = 0.22;
      g.add(coach, roof);
    }
    return g;
  };

  const engineCar = buildCar(0, true);
  const coach1 = buildCar(-0.26, false);
  const coach2 = buildCar(-0.50, false);
  trainOrbit.add(engineCar, coach1, coach2);

  // Rising steam puffs emitted from the locomotive smokestack
  const puffs = [];
  for (let i = 0; i < 10; i++) {
    const pm = new THREE.MeshBasicMaterial({
      color: 0xfff6e8,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), pm);
    interior.add(puff);
    puffs.push({ mesh: puff, mat: pm, age: i * 0.22 });
  }

  // ---------------- 850 Dendritic Snowflakes & Gold Leaf Flakes in 3D Vortex Field ----------------
  const snowCount = 850;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  const snowVel = new Float32Array(snowCount * 3);
  const maxSnowR = globeRadius - 0.18;

  const respawnSnowflake = (i, randomY = true) => {
    // Rejection-sample inside sphere
    let x = 0, y = 0, z = 0;
    for (let tries = 0; tries < 8; tries++) {
      x = (Math.random() * 2 - 1) * maxSnowR;
      y = randomY ? (Math.random() * 2 - 0.85) * maxSnowR : (0.55 + Math.random() * 0.4) * maxSnowR;
      z = (Math.random() * 2 - 1) * maxSnowR;
      if (x * x + y * y + z * z < maxSnowR * maxSnowR * 0.92 && y > -1.42) break;
    }
    snowPos[i * 3] = x;
    snowPos[i * 3 + 1] = y;
    snowPos[i * 3 + 2] = z;
    snowVel[i * 3] = (Math.random() - 0.5) * 0.15;
    snowVel[i * 3 + 1] = -(0.22 + Math.random() * 0.28);
    snowVel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  };

  for (let i = 0; i < snowCount; i++) respawnSnowflake(i, true);
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));

  const snowMat = new THREE.PointsMaterial({
    map: textures.snowflakeTex,
    color: 0xffffff,
    size: 0.105,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const snowPoints = new THREE.Points(snowGeo, snowMat);
  interior.add(snowPoints);

  // ---------------- Outer Thick Blown-Glass Globe Shell (Screen-Space Dispersion) ----------------
  const glassMat = new THREE.ShaderMaterial({
    vertexShader: GLOBE_VS,
    fragmentShader: GLOBE_FS,
    uniforms: {
      tRefract: { value: refractTex },
      uRes: { value: new THREE.Vector2(1280, 720) },
      uSwirlGlow: { value: 0 },
    },
  });
  const glassShell = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 48), glassMat);
  glassShell.position.y = globeCenterY;
  globeRig.add(glassShell);

  glassShell.userData = { kind: 'globe', label: '晃动或拨动水晶球 · 掀起球内漫天暴风雪' };
  interactables.push(glassShell);

  // ---------------- Clockwork & Blizzard Vortex Physics State ----------------
  let windEnergy = 0.32; // starts gently ticking so the globe already feels alive!
  let totalWound = 0;
  let trainAngle = 0.6;
  let keyAngle = 0;
  let lastClickAngle = 0;
  let vortexStrength = 0.25;
  let awakened = false;

  const globeTilt = new Spring2D(0, 0, 145, 11);
  const blossomSpring = new Spring1D(0, 95, 12);
  const starPowerSpring = new Spring1D(0.9, 80, 12);

  let dragMode = null; // 'windkey' | 'globe' | null
  let lastPointer = { x: 0, y: 0 };

  function stirBlizzard(impulseAmt, tiltX = 0, tiltZ = 0) {
    vortexStrength = clamp(vortexStrength + impulseAmt, 0, 3.2);
    globeTilt.impulse(tiltX, tiltZ);
    if (impulseAmt > 0.45) audio.playSnowWhoosh(Math.min(1, impulseAmt));
  }

  function addWindEnergy(delta) {
    windEnergy = clamp(windEnergy + delta, 0, 1.35);
    totalWound += delta;
    keyAngle += delta * 9.5;
    if (Math.abs(keyAngle - lastClickAngle) > 0.42) {
      lastClickAngle = keyAngle;
      audio.playRatchetClick(1.0);
    }
    if ((windEnergy >= 0.95 || totalWound >= 0.85) && !awakened) {
      awakened = true;
      blossomSpring.target = 1.0;
      starPowerSpring.target = 3.6;
      stirBlizzard(1.6, 1.2, -0.8);
      audio.playSigilAwaken();
      onAwaken(3, '第三声部已唤醒 · 发条八音盒主旋律奏响');
      onHint('午夜天文钟发条满格 · 蒸汽小火车与伯利恒之星已全速点亮');
    }
  }

  function onPointerDown(hit, pointerNDC) {
    lastPointer = { x: pointerNDC.x, y: pointerNDC.y };
    if (!hit) return false;
    const { kind } = hit.object.userData;
    if (kind === 'windkey') {
      dragMode = 'windkey';
      addWindEnergy(0.34);
      focusOffset.set(0.85, -0.45, -1.35);
      focusLookOffset.set(0.65, -0.65, 0);
      focusTimer = 2.4;
      return true;
    }
    if (kind === 'globe') {
      dragMode = 'globe';
      stirBlizzard(1.35, (Math.random() - 0.5) * 2.4, 1.8);
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    const dx = pointerNDC.x - lastPointer.x;
    const dy = pointerNDC.y - lastPointer.y;
    const speed = Math.hypot(dx, dy);
    lastPointer = { x: pointerNDC.x, y: pointerNDC.y };

    if (dragMode === 'windkey') {
      addWindEnergy(speed * 1.45);
      focusTimer = 1.8;
      return true;
    }
    if (dragMode === 'globe') {
      stirBlizzard(speed * 4.5, dy * 6.0, -dx * 6.0);
      return true;
    }
    // Rapid mouse shake anywhere near the globe also stirs a magical snow eddy!
    if (speed > 0.045) {
      stirBlizzard(speed * 2.2, dy * 3.0, -dx * 3.0);
    }
    return false;
  }

  function onPointerUp() {
    dragMode = null;
  }

  function update(dt, t, parallax) {
    // Decay wind energy slowly, keeping a gentle baseline motion once awakened
    const minEnergy = awakened ? 0.55 : 0.16;
    windEnergy = Math.max(minEnergy, windEnergy - dt * 0.045);

    // Key & planetary watchmaker gear train rotation
    keyTurnGroup.rotation.x = keyAngle;
    const gearSpeed = (0.35 + windEnergy * 2.6) * dt;
    for (const g of gears) {
      g.mesh.rotation.z += gearSpeed * g.ratio;
    }
    musicDrum.rotation.x += gearSpeed * 1.4;

    // Power-reserve amber jewels around brass collar
    const litCount = windEnergy * energyGems.length;
    for (let i = 0; i < energyGems.length; i++) {
      const f = clamp(litCount - i, 0, 1);
      energyGems[i].emissiveIntensity = 0.22 + f * 2.4;
    }

    // Miniature steam express train & rising starlight smoke puffs
    trainAngle -= dt * (0.28 + windEnergy * 1.55);
    trainOrbit.rotation.y = trainAngle;

    const engWorldAng = -trainAngle;
    const stackR = trackR;
    for (let i = 0; i < puffs.length; i++) {
      const p = puffs[i];
      p.age += dt * (0.55 + windEnergy * 0.85);
      if (p.age > 2.2) {
        p.age = 0;
        p.mesh.position.set(
          Math.cos(engWorldAng) * stackR,
          trackY + 0.30,
          Math.sin(engWorldAng) * stackR
        );
      }
      const u = p.age / 2.2;
      p.mesh.position.y += dt * 0.32;
      p.mesh.scale.setScalar(0.55 + u * 1.65);
      p.mat.opacity = Math.sin(u * Math.PI) * 0.52 * clamp(windEnergy * 1.4, 0.2, 1.0);
    }

    // Mechanical brass blossom & crown Bethlehem star
    const bl = blossomSpring.update(dt);
    for (const piv of blossomPetals) {
      piv.children[0].rotation.z = -0.35 - bl * 0.78;
    }
    const sp = starPowerSpring.update(dt);
    topStarMat.emissiveIntensity = sp;
    topStar.rotation.y = t * (0.7 + windEnergy * 0.9);
    globeCoreLight.intensity = 1.25 + sp * 0.42;

    for (let i = 0; i < baubleMats.length; i++) {
      baubleMats[i].emissiveIntensity = (0.35 + sp * 0.35) * (0.75 + 0.25 * Math.sin(t * 4.2 + i));
    }

    // Globe spring tilt & 3D helical snow vortex simulation
    globeTilt.update(dt);
    globeRig.rotation.x = clamp(globeTilt.x * 0.08, -0.14, 0.14);
    globeRig.rotation.z = clamp(globeTilt.y * 0.08, -0.14, 0.14);

    vortexStrength = Math.max(0.18, vortexStrength - dt * 0.55);
    glassMat.uniforms.uSwirlGlow.value = clamp(vortexStrength * 0.4, 0, 1);

    const pArr = snowGeo.attributes.position.array;
    const maxR2 = maxSnowR * maxSnowR;
    for (let i = 0; i < snowCount; i++) {
      const ix = i * 3;
      let x = pArr[ix];
      let y = pArr[ix + 1];
      let z = pArr[ix + 2];

      // Tangential swirl + upward lift when shaken, gentle gravity settle when calm
      const swirl = 0.35 + vortexStrength * 1.85;
      const vx = -z * swirl + snowVel[ix] + Math.sin(t * 1.7 + i) * 0.08;
      const vz = x * swirl + snowVel[ix + 2] + Math.cos(t * 1.5 + i) * 0.08;
      const vy = snowVel[ix + 1] + (vortexStrength > 0.45 ? (vortexStrength - 0.45) * 0.68 * Math.sin(i * 1.3 + t * 3.0) + 0.18 * vortexStrength : 0);

      x += vx * dt;
      y += vy * dt;
      z += vz * dt;

      const r2 = x * x + y * y + z * z;
      if (y < -1.42 || r2 > maxR2) {
        if (vortexStrength > 0.65 && y < -1.35) {
          // Kick settled snow back up from the floor during a shake!
          y = -1.25 + Math.random() * 0.5;
          const ang = Math.random() * Math.PI * 2;
          const rr = Math.random() * 1.5;
          x = Math.cos(ang) * rr;
          z = Math.sin(ang) * rr;
        } else {
          respawnSnowflake(i, false);
          continue;
        }
      }
      pArr[ix] = x;
      pArr[ix + 1] = y;
      pArr[ix + 2] = z;
    }
    snowGeo.attributes.position.needsUpdate = true;

    // Subtle background bokeh drift
    bgBokehGroup.position.x = -parallax.x * 0.65;
    bgBokehGroup.position.y = -parallax.y * 0.4;

    if (focusTimer > 0) {
      focusTimer -= dt;
      if (focusTimer <= 0) {
        focusOffset.set(0, 0, 0);
        focusLookOffset.set(0, 0, 0);
      }
    }
    camPosSpring.setTarget(
      camBasePos.x + parallax.x * 1.05 + focusOffset.x,
      camBasePos.y + parallax.y * 0.6 + focusOffset.y,
      camBasePos.z + focusOffset.z
    );
    camLookSpring.setTarget(
      camBaseLook.x + parallax.x * 0.2 + focusLookOffset.x,
      camBaseLook.y + parallax.y * 0.18 + focusLookOffset.y,
      camBaseLook.z + focusLookOffset.z
    );
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
    windEnergy = preset === 'climax' ? 1.15 : 0.75;
    vortexStrength = preset === 'climax' ? 1.45 : 0.75;
    if (preset === 'climax') {
      blossomSpring.snap(1.0);
      starPowerSpring.snap(3.5);
    } else {
      starPowerSpring.snap(2.1);
    }
    for (let s = 0; s < 15; s++) update(0.05, 1.5 + s * 0.05, { x: 0.1, y: 0.04 });
  }

  return {
    id: 3,
    roman: 'ACT III',
    title: '午夜天文钟',
    subtitle: '发条黄铜水晶球 · CLOCKWORK BRASS SNOWGLOBE',
    defaultHint: '拧动右侧黄铜发条钥匙驱动小火车 · 晃动水晶球掀起暴风雪',
    transTint: new THREE.Color(0xffbe6b),
    postOpts: {
      bloomStrength: 0.50,
      bloomThreshold: 0.82,
      starburst: 0.26,
      tiltShift: 0.48,
      refractMeshes: [glassShell],
    },
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

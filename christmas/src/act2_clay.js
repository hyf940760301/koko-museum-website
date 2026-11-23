// Act II: Tactile Claymation & Dollhouse Advent — "The Gingerbread Wonder-Workshop" (姜饼奇遇屋 · V2 Director's Cut)
// Craftsmanship highlights:
// - Hand-piped scalloped shell royal icing trim, catenary twisted fairy-light wire with brass sockets,
//   and continuous elastic pull-cord stretching with spring snap-back!
// - Unbroken 3-story Rube Goldberg Peppermint Coaster: Chimney -> 3F Attic Chute & 4 Turned Brass Bells
//   -> Blown-Glass Funnel -> Twin-Rail Candy-Cane S-Curve Coaster -> 1F Dotted Biscuit Dominoes -> Ribboned Gift!
//   Exact arc-length rolling rotation (dTheta = ds / r, zero slip) + sugar-frost burst particles on impacts!
// - Expressive 12fps clay puppets (Nutcracker with moustache, rosy cheeks, gold epaulets & saluting arms;
//   Penguin Postman with mailbag & letter; Chef Snowman with carrot nose & gingerbread tray).
// - Cozy 1F parlor dressed with Scottish tartan plaid rug, wingback clay armchair, steaming cocoa table & cuckoo clock!

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  clamp,
  lerp,
  steppedTime,
  mergeGeometries,
  transformGeo,
  batchStaticMeshes,
  collapseSolidMeshes,
  createRoundedBlockGeometry,
  createFacetedStarGeometry,
  createPipedIcingGeometry,
  injectClayMicrograin,
  injectAnisotropicBrass,
} from './physics.js';
import { CuratedMacroRig } from './camera_rig.js';

const _tangent = new THREE.Vector3();
const _rollAxis = new THREE.Vector3();
const _upVec = new THREE.Vector3(0, 1, 0);
const _dq = new THREE.Quaternion();

export function createAct2Clay({ envMap, textures, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x150d10);
  scene.environment = envMap;

  const cameraRig = new CuratedMacroRig(
    new THREE.Vector3(0, 2.72, 9.55),
    new THREE.Vector3(0, 2.42, 0),
    { parallaxX: 0.72, parallaxY: 0.42, minZoom: 0.56, maxZoom: 1.18 }
  );

  // ---------------- Cozy Tabletop Studio Lighting ----------------
  scene.add(new THREE.AmbientLight(0x4c343b, 0.95));

  const key = new THREE.DirectionalLight(0xfff0d8, 2.38);
  key.position.set(4.8, 9.2, 7.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 22;
  key.shadow.camera.left = -6.8;
  key.shadow.camera.right = 6.8;
  key.shadow.camera.top = 7.5;
  key.shadow.camera.bottom = -2.5;
  key.shadow.bias = -0.0005;
  key.shadow.radius = 3.6;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xa2c8ff, 0.85);
  fill.position.set(-6.5, 4.5, 5.0);
  scene.add(fill);

  const hearthLight = new THREE.PointLight(0xff7b29, 1.55, 6.8, 1.6);
  hearthLight.position.set(-1.72, 0.78, 0.35);
  scene.add(hearthLight);

  // ---------------- Dual-Scale Polymer Clay, Tartan Felt & Royal Icing Materials ----------------
  const makeClayMat = (hex, rough = 0.72) =>
    injectClayMicrograin(
      new THREE.MeshPhysicalMaterial({
        color: hex,
        bumpMap: textures.clayBump,
        bumpScale: 0.022,
        roughness: rough,
        metalness: 0.01,
        sheen: 0.35,
        sheenRoughness: 0.85,
        sheenColor: new THREE.Color(0xffe8d6),
        envMapIntensity: 0.78,
      }),
      { ridgeScale: 44.0, ridgeStrength: 0.055, icingScatter: 0.14 }
    );

  const makeFeltMat = (hex) =>
    new THREE.MeshPhysicalMaterial({
      color: hex,
      bumpMap: textures.paperTex,
      bumpScale: 0.028,
      roughness: 0.92,
      sheen: 1.0,
      sheenRoughness: 0.76,
      sheenColor: new THREE.Color(0xfff5ea),
      envMapIntensity: 0.65,
    });

  const matGinger = makeClayMat(0x9e5a34, 0.75);
  const matGingerDark = makeClayMat(0x6c391d, 0.78);
  const matWallMint = makeClayMat(0x365b56, 0.75);
  const matWallRose = makeClayMat(0x883b46, 0.75);
  const matWallCream = makeClayMat(0xeedcc5, 0.74);
  const matPeachSkin = makeClayMat(0xf5cfb4, 0.68);
  const matCarrot = makeClayMat(0xf27d24, 0.58);
  const matCoal = makeClayMat(0x1b1615, 0.55);

  const matIcing = injectClayMicrograin(
    new THREE.MeshPhysicalMaterial({
      color: 0xfdf8f0,
      bumpMap: textures.clayBump,
      bumpScale: 0.007,
      roughness: 0.22,
      clearcoat: 0.90,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.32,
    }),
    { ridgeScale: 28.0, ridgeStrength: 0.018, icingScatter: 0.26 }
  );

  const matCandyStripe = new THREE.MeshPhysicalMaterial({
    map: textures.candyStripeTex,
    roughness: 0.20,
    clearcoat: 0.88,
    clearcoatRoughness: 0.10,
    envMapIntensity: 1.25,
  });

  const matBrass = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xf2ca78,
      roughnessMap: textures.brassTex,
      metalness: 0.94,
      roughness: 0.22,
      envMapIntensity: 2.25,
    }),
    { anisoStrength: 0.36, patinaStrength: 0.18 }
  );

  const matGlassFunnel = new THREE.MeshPhysicalMaterial({
    color: 0xdff6ff,
    roughness: 0.12,
    metalness: 0.1,
    transparent: true,
    opacity: 0.42,
    clearcoat: 1.0,
    envMapIntensity: 2.2,
  });

  const matFeltRed = makeFeltMat(0xc43238);
  const matFeltGreen = makeFeltMat(0x285e46);
  const matFeltWhite = makeFeltMat(0xf8f2e8);
  const matFeltCocoa = makeFeltMat(0x4b2e22);
  const matTartan = new THREE.MeshPhysicalMaterial({
    map: textures.plaidTex,
    bumpMap: textures.paperTex,
    bumpScale: 0.022,
    roughness: 0.90,
    sheen: 0.95,
    sheenColor: new THREE.Color(0xffe6cc),
  });

  // ---------------- Dollhouse Shell & Batched Architectural Craftsmanship ----------------
  const houseRoot = new THREE.Group();
  scene.add(houseRoot);

  const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(6.9, 7.3, 0.36, 48), makeClayMat(0x261816, 0.65));
  tableBase.position.y = -0.22;
  tableBase.receiveShadow = true;
  houseRoot.add(tableBase);

  const W = 5.4, H1 = 1.65, H2 = 3.25, D = 1.78;

  const gingerLightParts = [];
  const gingerDarkParts = [];
  const icingParts = [
    transformGeo(createRoundedBlockGeometry(7.9, 0.26, 4.5, 0.35, 0.09), { y: 0.02, rx: Math.PI * 0.5 }),
  ];
  const staticBrassParts = [];
  const staticGreenParts = [];
  const staticRedParts = [];

  // Back wallpapers
  const back1F = new THREE.Mesh(new THREE.BoxGeometry(W - 0.16, 1.58, 0.12), matWallRose);
  back1F.position.set(0, 0.86, -D * 0.5);
  back1F.receiveShadow = true;
  const back2F = new THREE.Mesh(new THREE.BoxGeometry(W - 0.16, 1.55, 0.12), matWallMint);
  back2F.position.set(0, 2.45, -D * 0.5);
  back2F.receiveShadow = true;

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-W * 0.5, 0);
  gableShape.lineTo(W * 0.5, 0);
  gableShape.lineTo(0, 1.98);
  gableShape.closePath();
  const back3F = new THREE.Mesh(new THREE.ExtrudeGeometry(gableShape, { depth: 0.12, bevelEnabled: false }), matWallCream);
  back3F.position.set(0, 3.22, -D * 0.5 - 0.06);
  back3F.receiveShadow = true;
  houseRoot.add(back1F, back2F, back3F);

  const candyStripeParts = [
    transformGeo(new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24), { y: 5.18, z: D * 0.5 + 0.16, rx: Math.PI * 0.5 }),
  ];

  for (const sx of [-1, 1]) {
    gingerLightParts.push(
      transformGeo(createRoundedBlockGeometry(0.18, 3.25, D, 0.04, 0.03), { x: sx * (W * 0.5 - 0.06), y: 1.66 })
    );
    candyStripeParts.push(
      transformGeo(new THREE.CylinderGeometry(0.095, 0.095, 3.22, 20), { x: sx * (W * 0.5 + 0.02), y: 1.66, z: D * 0.5 - 0.06 })
    );
  }

  for (const fy of [0.08, H1, H2]) {
    gingerDarkParts.push(transformGeo(createRoundedBlockGeometry(W + 0.18, 0.14, D + 0.14, 0.04, 0.03), { y: fy }));
    // Hand-piped royal icing shell trim along each floor cornice!
    icingParts.push(
      createPipedIcingGeometry(
        new THREE.Vector3(-W * 0.5, fy + 0.06, D * 0.5 + 0.08),
        new THREE.Vector3(W * 0.5, fy + 0.06, D * 0.5 + 0.08),
        { beads: 26, radius: 0.038 }
      )
    );
  }

  // Frosted gingerbread roof slopes + piped scalloped icing borders
  const roofLen = Math.hypot(W * 0.56, 2.05);
  const roofAng = Math.atan2(2.05, W * 0.56);
  for (const sx of [-1, 1]) {
    const cx = sx * W * 0.27;
    const cy = 4.22;
    const rz = -sx * roofAng;
    gingerLightParts.push(transformGeo(createRoundedBlockGeometry(roofLen, 0.16, D + 0.36, 0.05, 0.04), { x: cx, y: cy, z: 0.04, rz }));
    icingParts.push(transformGeo(createRoundedBlockGeometry(roofLen + 0.08, 0.11, D + 0.44, 0.05, 0.045), { x: cx - Math.sin(rz) * 0.09, y: cy + Math.cos(rz) * 0.09, z: 0.04, rz }));

    // Piped icing border along front gable slope
    icingParts.push(
      createPipedIcingGeometry(
        new THREE.Vector3(0, 5.22, D * 0.5 + 0.24),
        new THREE.Vector3(sx * (W * 0.5 + 0.35), 3.16, D * 0.5 + 0.24),
        { beads: 18, radius: 0.046 }
      )
    );
    for (let d = 0; d < 9; d++) {
      const u = (d + 0.5) / 9;
      const dx = lerp(0.12 * sx, sx * (W * 0.5 + 0.28), u);
      const dy = lerp(5.12, 3.18, u);
      icingParts.push(transformGeo(new THREE.CapsuleGeometry(0.048, 0.08 + (d % 2) * 0.05, 6, 10), { x: dx, y: dy - 0.12, z: D * 0.5 + 0.22 }));
    }
  }

  // Apex Holly Wreath
  staticGreenParts.push(transformGeo(new THREE.TorusGeometry(0.26, 0.075, 10, 24), { y: 4.42, z: D * 0.5 + 0.14 }));
  for (let wb = 0; wb < 6; wb++) {
    const wa = (wb / 6) * Math.PI * 2;
    staticRedParts.push(transformGeo(new THREE.SphereGeometry(0.04, 8, 8), { x: Math.cos(wa) * 0.26, y: 4.42 + Math.sin(wa) * 0.26, z: D * 0.5 + 0.205 }));
  }

  const interactables = [];

  // ---------------- Brick-Course Clay Chimney & Candy Hopper (Top-Right) ----------------
  const chimneyGroup = new THREE.Group();
  chimneyGroup.position.set(1.78, 4.55, 0.08);
  houseRoot.add(chimneyGroup);

  const chimBrickParts = [createRoundedBlockGeometry(0.60, 0.92, 0.60, 0.05, 0.03)];
  for (let row = 0; row < 4; row++) {
    for (let b = -1; b <= 1; b += 2) {
      chimBrickParts.push(
        transformGeo(createRoundedBlockGeometry(0.24, 0.13, 0.06, 0.02, 0.01), {
          x: b * 0.14 + (row % 2) * 0.05,
          y: -0.28 + row * 0.19,
          z: 0.30,
        })
      );
    }
  }
  const chimBody = new THREE.Mesh(mergeGeometries(chimBrickParts), matWallRose);
  chimBody.castShadow = true;
  const chimSnow = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.095, 10, 22), matIcing);
  chimSnow.rotation.x = Math.PI * 0.5;
  chimSnow.position.y = 0.46;
  const readyCandy = new THREE.Mesh(new THREE.SphereGeometry(0.175, 24, 20), matCandyStripe);
  readyCandy.position.y = 0.64;
  chimneyGroup.add(chimBody, chimSnow, readyCandy);

  const chimHit = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.38, 0.98), new THREE.MeshBasicMaterial({ visible: false }));
  chimHit.position.y = 0.35;
  chimHit.userData = { kind: 'chimney', label: '点击烟囱 · 投递薄荷糖球开启三层过山车连锁机关' };
  chimneyGroup.add(chimHit);
  interactables.push(chimHit);

  // ---------------- Mechanism 1: Catenary Wired C9 Fairy Lights & Elastic Pull-Cord ----------------
  const bulbColors = [0xff4747, 0xffc43d, 0x3ce69c, 0x56a8ff];
  const bulbs = [];
  const wirePts = [];
  for (let i = 0; i <= 20; i++) {
    const u = i / 20;
    const x = lerp(-2.68, 2.92, u);
    const sag = Math.sin(u * Math.PI) * 0.18 + Math.sin(u * Math.PI * 5) * 0.015;
    wirePts.push(new THREE.Vector3(x, 3.18 - sag, D * 0.5 + 0.09));
  }
  const wireCurve = new THREE.CatmullRomCurve3(wirePts);
  staticGreenParts.push(new THREE.TubeGeometry(wireCurve, 56, 0.014, 6, false));

  const bulbGeo = new THREE.ConeGeometry(0.058, 0.135, 10);
  bulbGeo.rotateX(Math.PI);
  const bulbMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.20,
    roughness: 0.16,
    clearcoat: 0.9,
  });
  bulbMat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace(
      'vec3 totalEmissiveRadiance = emissive;',
      'vec3 totalEmissiveRadiance = emissive * diffuseColor.rgb;'
    );
  };
  const bulbInstanced = new THREE.InstancedMesh(bulbGeo, bulbMat, 11);
  const _bulbDummy = new THREE.Object3D();
  const _bulbCol = new THREE.Color();

  for (let i = 0; i < 11; i++) {
    const u = (i + 0.5) / 11;
    const pt = wireCurve.getPoint(u);
    staticBrassParts.push(transformGeo(new THREE.CylinderGeometry(0.032, 0.026, 0.055, 10), { x: pt.x, y: pt.y - 0.02, z: pt.z }));

    _bulbDummy.position.set(pt.x, pt.y - 0.095, pt.z);
    _bulbDummy.updateMatrix();
    bulbInstanced.setMatrixAt(i, _bulbDummy.matrix);
    _bulbCol.setHex(bulbColors[i % bulbColors.length]);
    bulbInstanced.setColorAt(i, _bulbCol);
    bulbs.push({ x: pt.x, baseY: pt.y - 0.095, z: pt.z });
  }
  bulbInstanced.instanceMatrix.needsUpdate = true;
  if (bulbInstanced.instanceColor) bulbInstanced.instanceColor.needsUpdate = true;
  houseRoot.add(bulbInstanced);

  // Elastic Knitted Pull-Cord (Direct Manipulation: drag downward to stretch!)
  const cordAnchor = new THREE.Group();
  cordAnchor.position.set(2.94, 3.16, D * 0.5 + 0.08);
  houseRoot.add(cordAnchor);

  const cordLine = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 1.0, 8), matFeltWhite);
  cordLine.geometry.translate(0, -0.5, 0);
  const cordKnobGroup = new THREE.Group();
  cordKnobGroup.position.y = -1.08;
  const cordPom = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 14), matFeltRed);
  const cordRing = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.016, 8, 18), matBrass);
  cordRing.position.y = 0.14;
  cordKnobGroup.add(cordPom, cordRing);
  cordAnchor.add(cordLine, cordKnobGroup);

  const cordHit = new THREE.Mesh(new THREE.BoxGeometry(0.70, 1.65, 0.70), new THREE.MeshBasicMaterial({ visible: false }));
  cordHit.position.y = -0.72;
  cordHit.userData = { kind: 'cord', label: '向下拽动毛毡红绒球 · 点亮全屋复古彩灯' };
  cordAnchor.add(cordHit);
  interactables.push(cordHit);

  // ---------------- Unbroken 3-Story Candy-Cane Coaster Track & Turned Brass Bells ----------------
  // 3F Attic Sloped Chute
  gingerDarkParts.push(transformGeo(createRoundedBlockGeometry(3.35, 0.08, 0.38, 0.03, 0.02), { x: 0.18, y: 3.74, z: 0.18, rz: 0.15 }));

  const bells = [];
  for (let b = 0; b < 4; b++) {
    const bx = 1.18 - b * 0.76;
    const by = 4.18 - b * 0.11;
    const bellPivot = new THREE.Group();
    bellPivot.position.set(bx, by, 0.18);
    const bellMesh = new THREE.Mesh(
      mergeGeometries([
        transformGeo(new THREE.ConeGeometry(0.115, 0.20, 16), { y: -0.10 }),
        transformGeo(new THREE.TorusGeometry(0.112, 0.016, 8, 18), { y: -0.20, rx: Math.PI * 0.5 }),
        transformGeo(new THREE.SphereGeometry(0.036, 10, 8), { y: -0.22 }), // clapper!
      ]),
      matBrass
    );
    bellPivot.add(bellMesh);
    houseRoot.add(bellPivot);
    bells.push({ pivot: bellPivot, swing: new Spring1D(0, 215, 9), hitInRun: false, x: bx, y: by - 0.18 });
  }

  // Left-Flank Blown-Glass Funnel + Twin-Rail Candy-Cane S-Coaster connecting 3F -> 2F -> 1F!
  const funnel = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.42, 24, 1, true), matGlassFunnel);
  funnel.rotation.x = Math.PI;
  funnel.position.set(-1.62, 3.38, 0.22);
  houseRoot.add(funnel);
  staticBrassParts.push(transformGeo(new THREE.TorusGeometry(0.32, 0.022, 8, 24), { x: -1.62, y: 3.59, z: 0.22, rx: Math.PI * 0.5 }));

  // Continuous 3D Coaster Spline from Chimney -> Attic Chute -> Left S-Coaster -> 1F Domino Entry!
  const coasterWaypoints = [
    new THREE.Vector3(1.78, 5.05, 0.12),   // 0: Chimney drop
    new THREE.Vector3(1.62, 4.08, 0.18),   // 1: Attic chute top
    new THREE.Vector3(0.42, 3.89, 0.18),   // 2: Bell 1-2
    new THREE.Vector3(-0.95, 3.68, 0.18),  // 3: Bell 3-4
    new THREE.Vector3(-1.62, 3.48, 0.22),  // 4: Into Glass Funnel!
    new THREE.Vector3(-2.88, 2.85, 0.58),  // 5: Swing outside left wall (2F height)
    new THREE.Vector3(-3.12, 2.02, 0.68),  // 6: S-curve outer apex
    new THREE.Vector3(-2.65, 1.15, 0.52),  // 7: Swoop back into 1F parlor
    new THREE.Vector3(-1.15, 0.36, 0.18),  // 8: 1F Parlor floor entry
    new THREE.Vector3(-0.62, 0.34, 0.18),  // 9: Hit Domino #1!
  ];
  const marbleSpline = new THREE.CatmullRomCurve3(coasterWaypoints, false, 'catmullrom', 0.38);

  // Build visible Twin-Rail Candy-Cane Coaster Track along the S-curve segment (u = 0.46 .. 0.88)!
  const railLeftPts = [];
  const railRightPts = [];
  for (let s = 0; s <= 32; s++) {
    const u = lerp(0.45, 0.90, s / 32);
    const p = marbleSpline.getPoint(u);
    railLeftPts.push(new THREE.Vector3(p.x, p.y - 0.11, p.z - 0.085));
    railRightPts.push(new THREE.Vector3(p.x, p.y - 0.11, p.z + 0.085));
    if (s % 5 === 0) {
      staticBrassParts.push(transformGeo(new THREE.BoxGeometry(0.05, 0.03, 0.24), { x: p.x, y: p.y - 0.13, z: p.z }));
    }
  }
  candyStripeParts.push(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railLeftPts), 44, 0.024, 8, false),
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railRightPts), 44, 0.024, 8, false)
  );

  const rollingCandy = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 20), matCandyStripe);
  rollingCandy.castShadow = true;
  rollingCandy.visible = false;
  houseRoot.add(rollingCandy);

  // Sugar-frost burst particle pool on bell & domino impacts!
  const burstCount = 36;
  const burstGeo = new THREE.BufferGeometry();
  const burstPos = new Float32Array(burstCount * 3);
  const burstVel = new Float32Array(burstCount * 3);
  for (let i = 0; i < burstCount; i++) burstPos[i * 3 + 1] = -20;
  burstGeo.setAttribute('position', new THREE.BufferAttribute(burstPos, 3));
  const burstPoints = new THREE.Points(
    burstGeo,
    new THREE.PointsMaterial({
      map: textures.sparkTex,
      color: 0xfff0c8,
      size: 0.24,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  houseRoot.add(burstPoints);
  let burstHead = 0;

  function emitBurst(wx, wy, wz, count = 7) {
    for (let k = 0; k < count; k++) {
      const idx = burstHead;
      burstHead = (burstHead + 1) % burstCount;
      burstPos[idx * 3] = wx;
      burstPos[idx * 3 + 1] = wy;
      burstPos[idx * 3 + 2] = wz;
      burstVel[idx * 3] = (Math.random() - 0.5) * 2.2;
      burstVel[idx * 3 + 1] = 0.8 + Math.random() * 1.8;
      burstVel[idx * 3 + 2] = (Math.random() - 0.2) * 1.6;
    }
  }

  // ---------------- 2F Workshop: Expressive 12fps Clay Puppets with Faces, Moustaches & Props ----------------
  const adventDoors = [];
  const puppetTypes = ['nutcracker', 'penguin', 'snowman'];
  const doorLabels = [
    '敲开 I 号盲盒门 · 唤醒胡须敬礼胡桃夹子',
    '敲开 II 号盲盒门 · 唤醒送信小企鹅邮差',
    '敲开 III 号盲盒门 · 唤醒姜饼大厨雪人',
  ];

  function buildExpressivePuppet(type) {
    const g = new THREE.Group();
    const coalParts = [];
    const icingDetailParts = [];
    let armPivot = null;

    if (type === 'nutcracker') {
      const coat = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.165, 0.42, 16), matFeltRed);
      coat.position.y = 0.24;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.145, 16, 14), matPeachSkin);
      head.position.y = 0.56;
      const shako = new THREE.Mesh(new THREE.CylinderGeometry(0.158, 0.142, 0.26, 16), matFeltCocoa);
      shako.position.y = 0.77;
      // Rosy cheeks
      const cheeks = new THREE.Mesh(
        mergeGeometries([
          transformGeo(new THREE.SphereGeometry(0.032, 8, 8), { x: -0.085, y: 0.53, z: 0.12 }),
          transformGeo(new THREE.SphereGeometry(0.032, 8, 8), { x: 0.085, y: 0.53, z: 0.12 }),
        ]),
        matFeltRed
      );
      // Curled white moustache + beard!
      icingDetailParts.push(
        transformGeo(new THREE.CapsuleGeometry(0.025, 0.09, 6, 8), { x: -0.055, y: 0.50, z: 0.14, rz: 1.32 }),
        transformGeo(new THREE.CapsuleGeometry(0.025, 0.09, 6, 8), { x: 0.055, y: 0.50, z: 0.14, rz: -1.32 }),
        transformGeo(new THREE.ConeGeometry(0.055, 0.14, 10), { y: 0.41, z: 0.12, rx: Math.PI })
      );
      // Beady coal eyes + boots
      coalParts.push(
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: -0.05, y: 0.58, z: 0.135 }),
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: 0.05, y: 0.58, z: 0.135 })
      );
      // Gold epaulets, double-breasted buttons & shako plume badge
      const goldTrim = new THREE.Mesh(
        mergeGeometries([
          transformGeo(new THREE.TorusGeometry(0.148, 0.02, 8, 20), { y: 0.66, rx: Math.PI * 0.5 }),
          transformGeo(new THREE.SphereGeometry(0.048, 10, 8), { x: -0.17, y: 0.42, sx: 1.3, sy: 0.6 }),
          transformGeo(new THREE.SphereGeometry(0.048, 10, 8), { x: 0.17, y: 0.42, sx: 1.3, sy: 0.6 }),
          transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: -0.05, y: 0.34, z: 0.155 }),
          transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: 0.05, y: 0.34, z: 0.155 }),
          transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: -0.05, y: 0.24, z: 0.158 }),
          transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: 0.05, y: 0.24, z: 0.158 }),
        ]),
        matBrass
      );
      // Articulated saluting right arm!
      armPivot = new THREE.Group();
      armPivot.position.set(0.18, 0.40, 0);
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.038, 0.18, 6, 10), matFeltRed);
      arm.position.y = -0.10;
      armPivot.add(arm);
      g.add(coat, head, shako, cheeks, goldTrim, armPivot);
    } else if (type === 'penguin') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.24, 12, 16), matFeltCocoa);
      body.position.y = 0.28;
      icingDetailParts.push(transformGeo(new THREE.SphereGeometry(0.145, 14, 12), { y: 0.26, z: 0.09, sx: 0.9, sy: 1.15, sz: 0.5 }));
      const scarf = new THREE.Mesh(
        mergeGeometries([
          transformGeo(new THREE.TorusGeometry(0.155, 0.038, 10, 20), { y: 0.42, rx: Math.PI * 0.5 }),
          transformGeo(new THREE.CapsuleGeometry(0.032, 0.14, 6, 8), { x: 0.11, y: 0.31, z: 0.14, rz: -0.2 }),
        ]),
        matFeltRed
      );
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.048, 0.12, 12), matCarrot);
      beak.rotation.x = Math.PI * 0.5;
      beak.position.set(0, 0.48, 0.19);
      coalParts.push(
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: -0.06, y: 0.53, z: 0.145 }),
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: 0.06, y: 0.53, z: 0.145 })
      );
      // Mini clay mailbag + golden letter corner!
      const bag = new THREE.Mesh(createRoundedBlockGeometry(0.14, 0.12, 0.07, 0.02, 0.01), matGingerDark);
      bag.position.set(-0.16, 0.22, 0.08);
      const letter = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.02), matBrass);
      letter.position.set(-0.16, 0.28, 0.09);
      letter.rotation.z = 0.25;

      armPivot = new THREE.Group();
      armPivot.position.set(0.17, 0.36, 0);
      const flipper = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.16, 6, 8), matFeltCocoa);
      flipper.position.y = -0.08;
      armPivot.add(flipper);
      g.add(body, scarf, beak, bag, letter, armPivot);
    } else {
      icingDetailParts.push(
        transformGeo(new THREE.SphereGeometry(0.20, 18, 16), { y: 0.20 }),
        transformGeo(new THREE.SphereGeometry(0.145, 18, 16), { y: 0.49 }),
        // Tall puffy chef toque hat!
        transformGeo(new THREE.CylinderGeometry(0.12, 0.11, 0.18, 14), { y: 0.68, rz: -0.1 }),
        transformGeo(new THREE.SphereGeometry(0.145, 14, 12), { x: 0.02, y: 0.79, sy: 0.75 })
      );
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.14, 10), matCarrot);
      nose.rotation.x = Math.PI * 0.5;
      nose.position.set(0, 0.49, 0.18);
      coalParts.push(
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: -0.05, y: 0.53, z: 0.135 }),
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { x: 0.05, y: 0.53, z: 0.135 }),
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { y: 0.31, z: 0.185 }),
        transformGeo(new THREE.SphereGeometry(0.022, 8, 8), { y: 0.21, z: 0.198 })
      );
      // Baking tray with tiny gingerbread cookie man!
      armPivot = new THREE.Group();
      armPivot.position.set(0, 0.34, 0.18);
      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16), matBrass);
      const miniCookie = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), matGinger);
      miniCookie.scale.set(1, 0.4, 1);
      miniCookie.position.y = 0.025;
      armPivot.add(tray, miniCookie);
      g.add(nose, armPivot);
    }

    if (coalParts.length) g.add(new THREE.Mesh(mergeGeometries(coalParts), matCoal));
    if (icingDetailParts.length) g.add(new THREE.Mesh(mergeGeometries(icingDetailParts), matIcing));
    g.userData.armPivot = armPivot;
    batchStaticMeshes(g, [armPivot]);
    return g;
  }

  for (let i = 0; i < 3; i++) {
    const dx = (i - 1) * 1.52;
    const slot = new THREE.Group();
    slot.position.set(dx, 1.74, 0.08);
    houseRoot.add(slot);

    icingParts.push(transformGeo(createRoundedBlockGeometry(0.94, 1.18, 0.08, 0.05, 0.025), { x: dx, y: 2.34, z: 0.34 }));

    const puppet = buildExpressivePuppet(puppetTypes[i]);
    puppet.position.set(0, 0.05, -0.10);
    puppet.scale.setScalar(0.86);
    slot.add(puppet);

    const hinge = new THREE.Group();
    hinge.position.set(-0.41, 0.60, 0.31);
    slot.add(hinge);

    const doorPanel = new THREE.Mesh(
      createRoundedBlockGeometry(0.82, 1.06, 0.06, 0.04, 0.02),
      i === 1 ? matFeltGreen : matFeltRed
    );
    doorPanel.position.x = 0.41;
    doorPanel.castShadow = true;

    const doorBrassParts = [transformGeo(new THREE.SphereGeometry(0.048, 12, 10), { x: 0.70, z: 0.05 })];
    for (let r = 0; r <= i; r++) {
      doorBrassParts.push(transformGeo(new THREE.BoxGeometry(0.04, 0.24, 0.02), { x: 0.41 + (r - i * 0.5) * 0.085, y: 0.14, z: 0.04 }));
    }
    hinge.add(doorPanel, new THREE.Mesh(mergeGeometries(doorBrassParts), matBrass));

    const hit = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.25, 0.55), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0, 0.60, 0.30);
    const doorObj = {
      idx: i,
      open: false,
      doorSpring: new Spring1D(0, 175, 13),
      popSpring: new Spring1D(0, 160, 11),
      hinge,
      puppet,
    };
    hit.userData = { kind: 'advent', doorObj, label: doorLabels[i] };
    slot.add(hit);
    interactables.push(hit);
    adventDoors.push(doorObj);
  }

  // ---------------- 1F Cozy Parlor: Tartan Rug, Wingback Armchair, Cocoa Table, Clock & Hearth ----------------
  // Scottish Tartan Plaid Circular Rug
  const tartanRug = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.68, 0.024, 40), matTartan);
  tartanRug.position.set(0.15, 0.165, 0.05);
  tartanRug.receiveShadow = true;
  houseRoot.add(tartanRug);

  // Cozy Clay Wingback Armchair + Side Table with Hot Cocoa Mug (back-center parlor behind dominoes!)
  const chairParts = [
    transformGeo(createRoundedBlockGeometry(0.62, 0.24, 0.56, 0.06, 0.04), { x: 0.42, y: 0.32, z: -0.46, ry: -0.28 }),
    transformGeo(createRoundedBlockGeometry(0.58, 0.66, 0.16, 0.06, 0.04), { x: 0.46, y: 0.66, z: -0.66, ry: -0.28 }),
    transformGeo(createRoundedBlockGeometry(0.14, 0.42, 0.52, 0.05, 0.03), { x: 0.16, y: 0.48, z: -0.39, ry: -0.28 }),
    transformGeo(createRoundedBlockGeometry(0.14, 0.42, 0.52, 0.05, 0.03), { x: 0.68, y: 0.48, z: -0.53, ry: -0.28 }),
  ];
  staticGreenParts.push(...chairParts);

  // Side wooden table + steaming red cocoa mug + fireplace logs!
  gingerDarkParts.push(
    transformGeo(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 18), { x: -0.45, y: 0.50, z: -0.52 }),
    transformGeo(new THREE.CylinderGeometry(0.05, 0.07, 0.34, 12), { x: -0.45, y: 0.32, z: -0.52 }),
    // Bark logs in hearth
    transformGeo(new THREE.CylinderGeometry(0.065, 0.065, 0.44, 10), { x: -1.72, y: 0.25, z: 0.04, rz: Math.PI * 0.48, ry: 0.2 }),
    transformGeo(new THREE.CylinderGeometry(0.06, 0.06, 0.40, 10), { x: -1.72, y: 0.31, z: 0.09, rz: Math.PI * 0.52, ry: -0.25 }),
    // Cuckoo wall clock body on 1F rose back wall!
    transformGeo(createRoundedBlockGeometry(0.32, 0.38, 0.10, 0.03, 0.02), { x: 0.0, y: 1.24, z: -0.80 })
  );
  staticRedParts.push(transformGeo(new THREE.CylinderGeometry(0.065, 0.058, 0.13, 14), { x: -0.45, y: 0.59, z: -0.52 }));
  icingParts.push(transformGeo(new THREE.SphereGeometry(0.058, 10, 8), { x: -0.45, y: 0.66, z: -0.52, sy: 0.6 })); // whipped cream!

  // Swinging brass pendulum on 1F wall cuckoo clock
  const clockPendulum = new THREE.Group();
  clockPendulum.position.set(0, 1.05, -0.76);
  const pendBob = new THREE.Mesh(
    mergeGeometries([
      transformGeo(new THREE.BoxGeometry(0.018, 0.22, 0.01), { y: -0.11 }),
      transformGeo(new THREE.CylinderGeometry(0.055, 0.055, 0.02, 16), { y: -0.22, rx: Math.PI * 0.5 }),
    ]),
    matBrass
  );
  clockPendulum.add(pendBob);
  houseRoot.add(clockPendulum);

  // Left Parlor Hearth
  icingParts.push(transformGeo(createRoundedBlockGeometry(1.26, 1.08, 0.56, 0.06, 0.04), { x: -1.72, y: 0.69, z: -0.05 }));
  const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.62, 0.38), matCoal);
  firebox.position.set(-1.72, 0.49, 0.07);
  houseRoot.add(firebox);

  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xffad38,
    emissive: new THREE.Color(0xff5e14),
    emissiveIntensity: 2.35,
    roughness: 0.3,
  });
  const flameGroup = new THREE.Group();
  flameGroup.position.set(-1.72, 0.36, 0.09);
  const flameGeos = [];
  for (let f = -1; f <= 1; f++) {
    flameGeos.push(transformGeo(new THREE.ConeGeometry(0.11 - Math.abs(f) * 0.02, 0.34, 12), { x: f * 0.13, y: 0.12 }));
  }
  flameGroup.add(new THREE.Mesh(mergeGeometries(flameGeos, true), flameMat));
  houseRoot.add(flameGroup);

  for (let s = -1; s <= 1; s++) {
    const sockGeo = transformGeo(new THREE.CapsuleGeometry(0.055, 0.14, 8, 10), { x: -1.72 + s * 0.32, y: 1.07, z: 0.26, rz: 0.14 });
    if (s === 0) staticGreenParts.push(sockGeo);
    else staticRedParts.push(sockGeo);
  }

  // Commit all batched static house meshes (massive DrawCall reduction!)
  const addBatched = (arr, mat, shadow = true) => {
    if (!arr.length) return;
    const m = new THREE.Mesh(mergeGeometries(arr), mat);
    m.castShadow = shadow;
    m.receiveShadow = shadow;
    houseRoot.add(m);
  };
  addBatched(gingerLightParts, matGinger);
  addBatched(gingerDarkParts, matGingerDark);
  addBatched(icingParts, matIcing);
  addBatched(candyStripeParts, matCandyStripe);
  addBatched(staticBrassParts, matBrass, false);
  addBatched(staticGreenParts, matFeltGreen);
  addBatched(staticRedParts, matFeltRed);

  // Biscuit Dominoes with 1..4 Royal Icing Pips!
  const dominoes = [];
  for (let d = 0; d < 4; d++) {
    const domPivot = new THREE.Group();
    domPivot.position.set(-0.62 + d * 0.44, 0.16, 0.18);
    const cookie = new THREE.Mesh(createRoundedBlockGeometry(0.095, 0.56, 0.34, 0.025, 0.015), matGinger);
    cookie.position.y = 0.28;
    cookie.castShadow = true;
    const pipParts = [];
    for (let p = 0; p <= d; p++) {
      pipParts.push(
        transformGeo(new THREE.SphereGeometry(0.028, 8, 8), {
          y: 0.42 - p * 0.085,
          z: 0.17,
        })
      );
    }
    domPivot.add(cookie, new THREE.Mesh(mergeGeometries(pipParts), matIcing));
    houseRoot.add(domPivot);
    dominoes.push({ pivot: domPivot, spring: new Spring1D(0, 185, 13), fallen: false });
  }

  // Right Parlor Grand Ribboned Gift Box
  const giftGroup = new THREE.Group();
  giftGroup.position.set(1.55, 0.16, 0.18);
  houseRoot.add(giftGroup);

  const giftBox = new THREE.Mesh(createRoundedBlockGeometry(0.92, 0.76, 0.86, 0.05, 0.03), matFeltGreen);
  giftBox.position.y = 0.38;
  giftBox.castShadow = true;
  const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.78, 0.89), matFeltRed);
  ribbonV.position.y = 0.38;
  giftGroup.add(giftBox, ribbonV);

  const giftLidPivot = new THREE.Group();
  giftLidPivot.position.set(0.45, 0.76, 0);
  giftGroup.add(giftLidPivot);

  const giftLid = new THREE.Mesh(createRoundedBlockGeometry(0.98, 0.16, 0.92, 0.04, 0.025), matFeltRed);
  giftLid.position.x = -0.45;
  giftLid.castShadow = true;
  const bowMesh = new THREE.Mesh(
    mergeGeometries([
      transformGeo(new THREE.TorusGeometry(0.14, 0.042, 10, 20), { x: -0.56, y: 0.14, rz: 0.45 }),
      transformGeo(new THREE.TorusGeometry(0.14, 0.042, 10, 20), { x: -0.34, y: 0.14, rz: -0.45 }),
    ]),
    matBrass
  );
  giftLidPivot.add(giftLid, bowMesh);

  const sigilStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.38, innerRadius: 0.15, depth: 0.12 }),
    matBrass
  );
  sigilStar.position.set(0, 0.45, 0);
  sigilStar.scale.setScalar(0.001);
  giftGroup.add(sigilStar);

  const giftHit = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), new THREE.MeshBasicMaterial({ visible: false }));
  giftHit.position.y = 0.5;
  giftHit.userData = { kind: 'gift', label: '点击烟囱投递糖球（或轻敲礼盒）开启惊喜' };
  giftGroup.add(giftHit);
  interactables.push(giftHit);

  // Coalesce static clay & parlor props so Act II stays comfortably within <45 DrawCalls!
  const matClayVC = injectClayMicrograin(
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      vertexColors: true,
      bumpMap: textures.clayBump,
      bumpScale: 0.022,
      roughness: 0.62,
      clearcoat: 0.14,
    }),
    { ridgeStrength: 0.024, icingScatter: 0.25 }
  );
  for (const d of adventDoors) {
    collapseSolidMeshes(d.puppet, matClayVC, [d.puppet.userData.armPivot]);
    if (d.puppet.userData.armPivot) collapseSolidMeshes(d.puppet.userData.armPivot, matClayVC);
    collapseSolidMeshes(d.hinge, matClayVC);
  }
  for (const dm of dominoes) collapseSolidMeshes(dm.pivot, matClayVC);
  collapseSolidMeshes(giftLidPivot, matClayVC);
  collapseSolidMeshes(cordKnobGroup, matClayVC);

  batchStaticMeshes(chimneyGroup, [readyCandy]);
  batchStaticMeshes(giftGroup, [giftLidPivot, sigilStar]);
  collapseSolidMeshes(houseRoot, matClayVC, [
    chimneyGroup,
    cordAnchor,
    bulbInstanced,
    rollingCandy,
    readyCandy,
    clockPendulum,
    flameGroup,
    giftGroup,
    ...bells.map((b) => b.pivot),
    ...dominoes.map((d) => d.pivot),
    ...adventDoors.flatMap((d) => [d.hinge, d.puppet]),
  ]);
  batchStaticMeshes(houseRoot, [
    chimneyGroup,
    cordAnchor,
    bulbInstanced,
    rollingCandy,
    readyCandy,
    clockPendulum,
    flameGroup,
    giftGroup,
    ...bells.map((b) => b.pivot),
    ...dominoes.map((d) => d.pivot),
    ...adventDoors.flatMap((d) => [d.hinge, d.puppet]),
  ]);

  // ---------------- Direct Manipulation & Coaster Physics State ----------------
  let lightsOn = false;
  const cordPullSpring = new Spring1D(0, 210, 11);
  const lightsSpring = new Spring1D(0.16, 85, 14);
  const lidOpenSpring = new Spring1D(0, 150, 11);
  const sigilRiseSpring = new Spring1D(0, 110, 12);

  let cordDragging = false;
  let cordDragStartY = 0;

  let candyRunU = -1; // 0..1 spline parameter while running, >1 domino phase
  let prevSplinePos = new THREE.Vector3();
  let doorsOpened = 0;
  let candyCompleted = false;
  let awakened = false;
  let funnelChimed = false;

  function getProgress() {
    const done = (lightsOn ? 1 : 0) + (doorsOpened > 0 ? 1 : 0) + (candyCompleted ? 1 : 0);
    return { current: done, total: 3 };
  }

  function triggerAwaken() {
    if (awakened) return;
    awakened = true;
    lidOpenSpring.target = 1.0;
    sigilRiseSpring.target = 1.0;
    lightsOn = true;
    lightsSpring.target = 2.5;
    cameraRig.focusOn(1.1, -0.8, 0.4, 0.80, 2.2);
    emitBurst(1.55, 0.95, 0.25, 14);
    audio.playSigilAwaken();
    onAwaken(2, '第二声部已唤醒 · 温暖木琴与雪橇银铃汇入合奏');
    onHint('姜饼奇遇屋全屋点亮 · 可滚轮推近观赏玩偶胡须与格纹地毯');
  }

  function startCandyRun() {
    if (candyRunU >= 0) return;
    for (const b of bells) b.hitInRun = false;
    for (const d of dominoes) {
      d.fallen = false;
      d.spring.snap(0);
    }
    funnelChimed = false;
    candyRunU = 0;
    marbleSpline.getPoint(0, prevSplinePos);
    rollingCandy.position.copy(prevSplinePos);
    rollingCandy.quaternion.identity();
    rollingCandy.visible = true;
    readyCandy.visible = false;
    audio.playClayPop(1);
    onHint('薄荷糖球已入轨 · 撞响铜钟并滑入左侧拐杖糖双轨过山车…');
  }

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind, doorObj } = hit.object.userData;

    if (kind === 'cord') {
      cordDragging = true;
      cordDragStartY = pointerNDC.y;
      cordPullSpring.target = 0.28;
      return true;
    }

    if (kind === 'advent' && doorObj) {
      doorObj.open = !doorObj.open;
      doorObj.doorSpring.target = doorObj.open ? 1 : 0;
      doorObj.popSpring.target = doorObj.open ? 1 : 0;
      audio.playClayPop(doorObj.idx + 1);
      if (doorObj.open) {
        doorsOpened++;
        audio.playBellChime(doorObj.idx * 2);
        cameraRig.focusOn((doorObj.idx - 1) * 0.95, 0.0, 0.2, 0.84, 1.45);
        if (doorsOpened >= 3) triggerAwaken();
      }
      return true;
    }

    if (kind === 'chimney') {
      startCandyRun();
      return true;
    }

    if (kind === 'gift') {
      if (!candyCompleted && candyRunU < 0) {
        startCandyRun();
      } else {
        triggerAwaken();
      }
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    if (!cordDragging) return false;
    const pull = clamp((cordDragStartY - pointerNDC.y) * 1.9 + 0.22, 0.0, 0.82);
    cordPullSpring.target = pull;
    return true;
  }

  function onPointerUp() {
    if (cordDragging) {
      cordDragging = false;
      lightsOn = !lightsOn;
      lightsSpring.target = lightsOn ? 2.5 : 0.16;
      cordPullSpring.impulse(-4.5);
      cordPullSpring.target = 0;
      audio.playClayPop(lightsOn ? 3 : 0);
      if (lightsOn) audio.playBellChime(5);
    }
  }

  function update(dt, t, parallax) {
    const qTime = steppedTime(t, 12);

    // Elastic pull-cord stretch + fairy light sag response
    const cPull = cordPullSpring.update(dt);
    const stretch = Math.max(0.55, 1.0 + cPull * 0.68);
    cordLine.scale.y = stretch;
    cordKnobGroup.position.y = -1.08 * stretch;

    const bulbGlow = lightsSpring.update(dt);
    bulbMat.emissiveIntensity = bulbGlow * (0.88 + 0.12 * Math.sin(qTime * 6.0));
    for (let i = 0; i < bulbs.length; i++) {
      _bulbDummy.position.set(
        bulbs[i].x,
        bulbs[i].baseY - Math.max(0, cPull) * (i / 10) * 0.08,
        bulbs[i].z
      );
      _bulbDummy.updateMatrix();
      bulbInstanced.setMatrixAt(i, _bulbDummy.matrix);
    }
    bulbInstanced.instanceMatrix.needsUpdate = true;

    // 12fps Stop-Motion Puppets + Saluting Arms + Cuckoo Pendulum!
    clockPendulum.rotation.z = Math.sin(qTime * 4.2) * 0.28;

    for (let i = 0; i < adventDoors.length; i++) {
      const d = adventDoors[i];
      const dv = d.doorSpring.update(dt);
      const pv = d.popSpring.update(dt);
      d.hinge.rotation.y = -dv * 2.22;
      d.puppet.position.z = lerp(-0.10, 0.30, pv);
      if (pv > 0.2) {
        d.puppet.rotation.z = Math.sin(qTime * 5.5 + i * 2.1) * 0.12 * pv;
        d.puppet.position.y = 0.05 + Math.abs(Math.sin(qTime * 6.2 + i)) * 0.065 * pv;
        if (d.puppet.userData.armPivot) {
          d.puppet.userData.armPivot.rotation.x = -Math.abs(Math.sin(qTime * 5.5 + i)) * 0.95 * pv;
        }
      }
    }

    // Unbroken Spline Coaster Physics with Exact Arc-Length Rolling!
    if (candyRunU >= 0 && candyRunU <= 1.0) {
      // Gravity speed boost on steep S-coaster drop (u = 0.45..0.85)
      const slopeBoost = candyRunU > 0.44 && candyRunU < 0.86 ? 0.38 : 0.25;
      candyRunU += dt * slopeBoost;
      const clampedU = Math.min(1.0, candyRunU);

      marbleSpline.getPoint(clampedU, rollingCandy.position);
      const ds = rollingCandy.position.distanceTo(prevSplinePos);
      if (ds > 1e-5) {
        _tangent.copy(rollingCandy.position).sub(prevSplinePos).normalize();
        _rollAxis.crossVectors(_upVec, _tangent).normalize();
        if (_rollAxis.lengthSq() > 0.01) {
          _dq.setFromAxisAngle(_rollAxis, ds / 0.17);
          rollingCandy.quaternion.premultiply(_dq);
        }
        prevSplinePos.copy(rollingCandy.position);
      }

      // Check 4 Attic Brass Bells along chute (u < 0.46)
      if (clampedU < 0.46) {
        for (let b = 0; b < bells.length; b++) {
          if (!bells[b].hitInRun && rollingCandy.position.x <= bells[b].x + 0.08) {
            bells[b].hitInRun = true;
            bells[b].swing.impulse(-9.2);
            emitBurst(bells[b].x, bells[b].y, 0.25, 6);
            audio.playBellChime(b * 2);
          }
        }
      } else if (!funnelChimed) {
        funnelChimed = true;
        emitBurst(-1.62, 3.48, 0.26, 8);
        audio.playClayPop(4);
      }
    } else if (candyRunU > 1.0) {
      candyRunU += dt;
      // Domino Cascade Phase (candyRunU: 1.0 -> 1.85)
      const domElapsed = candyRunU - 1.0;
      rollingCandy.visible = false;
      for (let d = 0; d < dominoes.length; d++) {
        if (!dominoes[d].fallen && domElapsed >= d * 0.15) {
          dominoes[d].fallen = true;
          dominoes[d].spring.target = -1.24;
          emitBurst(-0.62 + d * 0.44, 0.55, 0.24, 5);
          audio.playClayPop(d + 2);
        }
      }
      if (domElapsed >= 0.72) {
        candyRunU = -1;
        readyCandy.visible = true;
        candyCompleted = true;
        triggerAwaken();
      }
    } else {
      readyCandy.position.y = 0.64 + Math.abs(Math.sin(qTime * 3.8)) * 0.06;
      readyCandy.rotation.y = qTime * 1.4;
    }

    // Update Sugar Burst Particles
    for (let i = 0; i < burstCount; i++) {
      if (burstPos[i * 3 + 1] > -10) {
        burstPos[i * 3] += burstVel[i * 3] * dt;
        burstPos[i * 3 + 1] += burstVel[i * 3 + 1] * dt;
        burstPos[i * 3 + 2] += burstVel[i * 3 + 2] * dt;
        burstVel[i * 3 + 1] -= 4.8 * dt;
        if (burstPos[i * 3 + 1] < 0.05) burstPos[i * 3 + 1] = -20;
      }
    }
    burstGeo.attributes.position.needsUpdate = true;

    for (const b of bells) {
      b.pivot.rotation.z = b.swing.update(dt);
    }
    for (const dm of dominoes) {
      dm.pivot.rotation.z = dm.spring.update(dt);
    }

    const lidV = lidOpenSpring.update(dt);
    giftLidPivot.rotation.z = -lidV * 2.05;

    const sigV = sigilRiseSpring.update(dt);
    sigilStar.scale.setScalar(Math.max(0.001, sigV));
    sigilStar.position.y = lerp(0.45, 1.25, sigV) + Math.sin(t * 2.6) * 0.05 * sigV;
    sigilStar.rotation.y = t * 1.25;

    flameGroup.scale.y = 0.88 + 0.20 * Math.sin(qTime * 9.5);
    hearthLight.intensity = 1.40 + 0.28 * Math.sin(qTime * 8.2);

    cameraRig.update(dt, parallax);
  }

  function applyCamera(camera) {
    cameraRig.apply(camera);
  }

  function setCaptureState(preset) {
    if (preset === 'hero' || preset === 'climax') {
      lightsOn = true;
      lightsSpring.snap(2.5);
      adventDoors[0].open = true;
      adventDoors[0].doorSpring.snap(1);
      adventDoors[0].popSpring.snap(1);
      adventDoors[1].open = true;
      adventDoors[1].doorSpring.snap(1);
      adventDoors[1].popSpring.snap(1);
      for (const dm of dominoes) dm.spring.snap(-1.24);
      awakened = true;
      candyCompleted = true;
      lidOpenSpring.snap(1);
      sigilRiseSpring.snap(1);
    }
    update(0.016, 2.6, { x: -0.05, y: 0.04 });
  }

  return {
    id: 2,
    roman: 'ACT II',
    title: '姜饼奇遇屋',
    subtitle: '定格黏土礼盒工坊 · TACTILE CLAYMATION WORKSHOP',
    defaultHint: '向下拽动毛毡绒球点亮彩灯 · 敲开盲盒门 · 点击烟囱开启拐杖糖过山车连锁',
    transTint: new THREE.Color(0xff9d5c),
    cameraRig,
    getProgress,
    getPostOpts: () => ({
      bloomStrength: 0.42,
      bloomThreshold: 0.84,
      starburst: 0.16,
      focusDist: cameraRig.getFocusDistance(),
      aperture: 0.48,
      aoStrength: 0.82,
      aoRadius: 0.34,
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

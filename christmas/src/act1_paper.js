// Act I: Gilded Pop-up Paper Diorama — "The Pinewood Starlight Book" (松林星夜书)
// Multi-layered cold-pressed 300gsm watercolour cardstock, V-fold origami pines, champagne gold-foil
// bevel trims, translucent vellum windows, interactive pull-tab sleigh, rotatable celestial volvelle,
// and hinged lift-the-flaps.

import * as THREE from '../../vendor/three/three.module.js';
import { Spring1D, Spring3D, clamp, lerp, createFacetedStarGeometry } from './physics.js';

function extrudeCard(shape, depth = 0.028, bevel = 0.005) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 14,
  });
}

// Tiered serrated pine silhouette half-wing (paired at 110 deg to form a true 3D V-fold origami tree)
function makePineWingShape(w, h, tiers = 4) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(w * 0.16, 0);
  s.lineTo(w * 0.16, h * 0.12);
  for (let i = 0; i < tiers; i++) {
    const t0 = i / tiers;
    const t1 = (i + 1) / tiers;
    const yBase = h * (0.12 + t0 * 0.82);
    const yTop = h * (0.12 + t1 * 0.88);
    const outerW = w * (1 - t0 * 0.68);
    const innerW = w * (1 - t1 * 0.72) * 0.42;
    s.lineTo(outerW, yBase);
    if (i < tiers - 1) {
      s.lineTo(innerW, yTop * 0.96);
    } else {
      s.lineTo(0, h);
    }
  }
  s.closePath();
  return s;
}

// Origami reindeer silhouette in graceful mid-leap
function makeReindeerShape(scale = 1) {
  const s = new THREE.Shape();
  const pts = [
    [-0.55, -0.15], [-0.82, -0.45], [-0.72, -0.48], [-0.42, -0.18],
    [-0.12, -0.16], [0.22, -0.12], [0.54, -0.42], [0.62, -0.38],
    [0.36, -0.04], [0.46, 0.24], [0.68, 0.30], [0.64, 0.38],
    [0.48, 0.38], [0.54, 0.62], [0.46, 0.64], [0.40, 0.46],
    [0.30, 0.58], [0.24, 0.55], [0.34, 0.36], [0.22, 0.14],
    [-0.26, 0.12], [-0.52, 0.18], [-0.62, 0.08],
  ];
  s.moveTo(pts[0][0] * scale, pts[0][1] * scale);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0] * scale, pts[i][1] * scale);
  s.closePath();
  return s;
}

// Ornate filigree sleigh silhouette
function makeSleighShape(scale = 1) {
  const s = new THREE.Shape();
  s.moveTo(-0.85 * scale, -0.18 * scale);
  s.quadraticCurveTo(-0.95 * scale, 0.32 * scale, -0.58 * scale, 0.38 * scale);
  s.lineTo(-0.18 * scale, 0.22 * scale);
  s.lineTo(0.38 * scale, 0.24 * scale);
  s.quadraticCurveTo(0.75 * scale, 0.35 * scale, 0.88 * scale, 0.08 * scale);
  s.quadraticCurveTo(0.96 * scale, -0.16 * scale, 0.68 * scale, -0.22 * scale);
  s.lineTo(-0.78 * scale, -0.22 * scale);
  s.closePath();
  return s;
}

export function createAct1Paper({ envMap, textures, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c090a);
  scene.environment = envMap;

  // Master macro camera rig with curated parallax & focus zoom
  const camBasePos = new THREE.Vector3(0, 4.35, 9.15);
  const camBaseLook = new THREE.Vector3(0, 1.55, -0.35);
  const camPosSpring = new Spring3D(camBasePos.x, camBasePos.y, camBasePos.z, 65, 14);
  const camLookSpring = new Spring3D(camBaseLook.x, camBaseLook.y, camBaseLook.z, 75, 15);
  let focusOffset = new THREE.Vector3();
  let focusLookOffset = new THREE.Vector3();
  let focusTimer = 0;

  // Warm dramatic theatrical lighting with soft shadows
  const ambLight = new THREE.AmbientLight(0x2d3554, 0.85);
  scene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xffe2b0, 2.5);
  keyLight.position.set(5.5, 9.5, 6.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -7.5;
  keyLight.shadow.camera.right = 7.5;
  keyLight.shadow.camera.top = 7.5;
  keyLight.shadow.camera.bottom = -4.5;
  keyLight.shadow.bias = -0.0006;
  keyLight.shadow.radius = 3.5;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x6b92ff, 1.15);
  rimLight.position.set(-6.5, 6.0, -5.5);
  scene.add(rimLight);

  const villageCandleLight = new THREE.PointLight(0xffaa44, 0.8, 9.5, 1.6);
  villageCandleLight.position.set(0, 1.35, 0.35);
  scene.add(villageCandleLight);

  // ---------------- Materials ----------------
  const makePaperMat = (hex, rough = 0.86) =>
    new THREE.MeshStandardMaterial({
      color: hex,
      map: textures.paperTex,
      bumpMap: textures.paperTex,
      bumpScale: 0.018,
      roughness: rough,
      metalness: 0.02,
      envMapIntensity: 0.65,
    });

  const matCream = makePaperMat(0xf5ecda, 0.84);
  const matIvorySnow = makePaperMat(0xfbf7ef, 0.80);
  const matPineDark = makePaperMat(0x18362a, 0.85);
  const matPineMid = makePaperMat(0x244c3b, 0.84);
  const matBurgundy = makePaperMat(0x451018, 0.76);
  const matNavyArch = makePaperMat(0x13203d, 0.82);
  const matWalnut = new THREE.MeshStandardMaterial({
    color: 0x1a110d,
    bumpMap: textures.paperTex,
    bumpScale: 0.008,
    roughness: 0.52,
    metalness: 0.05,
    envMapIntensity: 0.8,
  });

  // Champagne hot-stamped gold foil material
  const matGoldFoil = new THREE.MeshPhysicalMaterial({
    color: 0xf4d284,
    metalness: 0.96,
    roughness: 0.19,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
    envMapIntensity: 2.35,
  });

  // Translucent illuminated vellum window material
  const matVellumWindow = new THREE.MeshStandardMaterial({
    color: 0xffe4a8,
    emissive: new THREE.Color(0xff9d38),
    emissiveIntensity: 0.45,
    roughness: 0.4,
  });

  // ---------------- Dark Walnut Desk & Open Hardcover Spread ----------------
  const desk = new THREE.Mesh(new THREE.PlaneGeometry(36, 26), matWalnut);
  desk.rotation.x = -Math.PI * 0.5;
  desk.position.y = -0.18;
  desk.receiveShadow = true;
  scene.add(desk);

  const bookRoot = new THREE.Group();
  scene.add(bookRoot);

  // Unfolding book spring (starts slightly folded and blossoms open)
  const bookOpenSpring = new Spring1D(0.18, 52, 11);
  bookOpenSpring.target = 1.0;

  // Hardcover boards (left & right) + brass corner protectors
  const coverW = 5.4, coverD = 6.8, coverT = 0.09;
  const coverGeo = new THREE.BoxGeometry(coverW, coverT, coverD);
  const leftCover = new THREE.Mesh(coverGeo, matBurgundy);
  leftCover.position.set(-coverW * 0.5 - 0.04, -0.11, 0);
  leftCover.receiveShadow = true;
  const rightCover = new THREE.Mesh(coverGeo, matBurgundy);
  rightCover.position.set(coverW * 0.5 + 0.04, -0.11, 0);
  rightCover.receiveShadow = true;
  bookRoot.add(leftCover, rightCover);

  // Central spine ridge
  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, coverD, 16, 1, false, 0, Math.PI),
    matBurgundy
  );
  spine.rotation.x = Math.PI * 0.5;
  spine.rotation.z = Math.PI;
  spine.position.y = -0.09;
  bookRoot.add(spine);

  // Cream deckle-edge page block with subtle arch near spine
  const pageShape = new THREE.Shape();
  pageShape.moveTo(-5.15, -0.06);
  pageShape.quadraticCurveTo(-2.5, 0.07, 0, -0.02);
  pageShape.quadraticCurveTo(2.5, 0.07, 5.15, -0.06);
  pageShape.lineTo(5.15, -0.12);
  pageShape.lineTo(-5.15, -0.12);
  pageShape.closePath();
  const pageBlockGeo = new THREE.ExtrudeGeometry(pageShape, {
    depth: 6.4,
    bevelEnabled: true,
    bevelSize: 0.015,
    bevelThickness: 0.015,
    steps: 1,
  });
  pageBlockGeo.center();
  const pageBlock = new THREE.Mesh(pageBlockGeo, matCream);
  pageBlock.position.y = -0.02;
  pageBlock.receiveShadow = true;
  pageBlock.castShadow = true;
  bookRoot.add(pageBlock);

  // Gold foil border rules inlaid on the open page spread
  const borderFrame = new THREE.Mesh(
    new THREE.RingGeometry(4.55, 4.61, 4),
    matGoldFoil
  );
  borderFrame.visible = false; // use rectangular gold strips for crisp book margin
  const addMarginStrip = (x, z, w, d) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.008, d), matGoldFoil);
    m.position.set(x, 0.045, z);
    bookRoot.add(m);
  };
  addMarginStrip(0, -2.95, 9.8, 0.035);
  addMarginStrip(0, 2.95, 9.8, 0.035);
  addMarginStrip(-4.9, 0, 0.035, 5.94);
  addMarginStrip(4.9, 0, 0.035, 5.94);

  // Pop-up folding stage container (scales Y with bookOpenSpring like real pop-up pleats)
  const popupGroup = new THREE.Group();
  popupGroup.position.y = 0.03;
  bookRoot.add(popupGroup);

  const interactables = [];

  // ---------------- Layer 6: Celestial Proscenium Arch & Rotatable Volvelle ----------------
  const archShape = new THREE.Shape();
  archShape.moveTo(-4.4, 0);
  archShape.lineTo(-4.4, 2.8);
  archShape.quadraticCurveTo(-4.4, 4.95, 0, 5.25);
  archShape.quadraticCurveTo(4.4, 4.95, 4.4, 2.8);
  archShape.lineTo(4.4, 0);
  archShape.closePath();
  // Circular cutout window at top of arch to reveal the spinning Volvelle star disc
  const volHole = new THREE.Path();
  volHole.absarc(0, 3.35, 1.48, 0, Math.PI * 2, true);
  archShape.holes.push(volHole);

  const backArch = new THREE.Mesh(extrudeCard(archShape, 0.04, 0.008), matNavyArch);
  backArch.position.set(0, 0, -2.35);
  backArch.castShadow = true;
  backArch.receiveShadow = true;
  popupGroup.add(backArch);

  // Gold foil arch rim around the celestial circular window
  const volRim = new THREE.Mesh(new THREE.TorusGeometry(1.50, 0.032, 12, 64), matGoldFoil);
  volRim.position.set(0, 3.35, -2.30);
  popupGroup.add(volRim);

  // Top Polaris pointer triangle in gold foil
  const ptrShape = new THREE.Shape();
  ptrShape.moveTo(0, -0.18);
  ptrShape.lineTo(-0.09, 0.06);
  ptrShape.lineTo(0.09, 0.06);
  ptrShape.closePath();
  const volPointer = new THREE.Mesh(extrudeCard(ptrShape, 0.02, 0.004), matGoldFoil);
  volPointer.position.set(0, 4.86, -2.26);
  popupGroup.add(volPointer);

  // Interactive Rotatable Celestial Volvelle Disc
  const volvelleGroup = new THREE.Group();
  volvelleGroup.position.set(0, 3.35, -2.44);
  popupGroup.add(volvelleGroup);

  const volDiscMat = new THREE.MeshStandardMaterial({
    map: textures.volvelleTex,
    roughness: 0.42,
    metalness: 0.38,
    envMapIntensity: 1.5,
  });
  const volDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 0.03, 64), volDiscMat);
  volDisc.rotation.x = Math.PI * 0.5;
  volvelleGroup.add(volDisc);

  // Brass finger tabs around the outer edge of the volvelle so it visibly begs to be spun
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const tab = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.045, 16), matGoldFoil);
    tab.rotation.x = Math.PI * 0.5;
    tab.position.set(Math.cos(a) * 1.72, Math.sin(a) * 1.72, 0.01);
    volvelleGroup.add(tab);
  }
  const brassRivet = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 16), matGoldFoil);
  brassRivet.position.z = 0.03;
  volvelleGroup.add(brassRivet);

  volDisc.userData = { kind: 'volvelle', label: '拨动星象转盘 · 对齐北极星' };
  interactables.push(volDisc);

  // ---------------- Layer 5: Snow-Capped Paper Mountains & Pull-Tab Flying Sleigh ----------------
  const mtnShape = new THREE.Shape();
  mtnShape.moveTo(-4.3, 0);
  mtnShape.lineTo(-3.4, 2.35);
  mtnShape.lineTo(-2.3, 1.45);
  mtnShape.lineTo(-0.95, 2.85);
  mtnShape.lineTo(0.35, 1.65);
  mtnShape.lineTo(1.85, 2.95);
  mtnShape.lineTo(3.15, 1.75);
  mtnShape.lineTo(4.3, 2.25);
  mtnShape.lineTo(4.3, 0);
  mtnShape.closePath();
  const mountains = new THREE.Mesh(extrudeCard(mtnShape, 0.032, 0.006), matIvorySnow);
  mountains.position.set(0, 0, -1.78);
  mountains.castShadow = true;
  mountains.receiveShadow = true;
  popupGroup.add(mountains);

  // Flying Origami Reindeer Sleigh Rig (driven by the right-side Pull-Tab!)
  const sleighPivot = new THREE.Group();
  sleighPivot.position.set(0, 0.6, -1.35);
  popupGroup.add(sleighPivot);

  const sleighCarriage = new THREE.Group();
  sleighPivot.add(sleighCarriage);

  const sleighMesh = new THREE.Mesh(extrudeCard(makeSleighShape(0.56), 0.04, 0.008), matBurgundy);
  const sleighTrim = new THREE.Mesh(extrudeCard(makeSleighShape(0.58), 0.018, 0.005), matGoldFoil);
  sleighTrim.position.z = -0.01;
  sleighCarriage.add(sleighMesh, sleighTrim);

  // Tiny wrapped paper gift parcels in sleigh
  const gift1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.18), matGoldFoil);
  gift1.position.set(-0.14, 0.22, 0.02);
  const gift2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.26, 0.16), matCream);
  gift2.position.set(0.08, 0.24, 0.02);
  sleighCarriage.add(gift1, gift2);

  const reindeerMeshes = [];
  for (let r = 0; r < 3; r++) {
    const deerG = new THREE.Group();
    deerG.position.set(0.82 + r * 0.68, 0.06 + r * 0.05, 0);
    const body = new THREE.Mesh(extrudeCard(makeReindeerShape(0.46), 0.03, 0.006), matCream);
    const goldShadow = new THREE.Mesh(extrudeCard(makeReindeerShape(0.475), 0.014, 0.004), matGoldFoil);
    goldShadow.position.z = -0.012;
    deerG.add(body, goldShadow);
    sleighCarriage.add(deerG);
    reindeerMeshes.push(deerG);
  }
  // Golden ribbon reins connecting sleigh to reindeer
  const reinCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.35, 0.12, 0.02),
    new THREE.Vector3(1.25, -0.02, 0.04),
    new THREE.Vector3(2.25, 0.26, 0.02)
  );
  const reinMesh = new THREE.Mesh(new THREE.TubeGeometry(reinCurve, 24, 0.009, 6, false), matGoldFoil);
  sleighCarriage.add(reinMesh);

  // ---------------- Layer 4: Pop-up Gothic Starlight Belltower & Village Row ----------------
  const villageGroup = new THREE.Group();
  villageGroup.position.set(0, 0, -0.65);
  popupGroup.add(villageGroup);

  const vellumWindows = [];

  const addPaperHouse = (x, z, w, h, roofH, isTower = false) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    // V-fold front & subtle angled wing so it reads as true folded cardstock
    const wallShape = new THREE.Shape();
    wallShape.moveTo(-w * 0.5, 0);
    wallShape.lineTo(-w * 0.5, h);
    wallShape.lineTo(0, h + roofH);
    wallShape.lineTo(w * 0.5, h);
    wallShape.lineTo(w * 0.5, 0);
    wallShape.closePath();

    // Cut arched window openings right through the cardstock!
    const winRows = isTower ? 2 : 1;
    const winCols = isTower ? 1 : 2;
    for (let ry = 0; ry < winRows; ry++) {
      for (let cx = 0; cx < winCols; cx++) {
        const wx = winCols === 1 ? 0 : (cx - 0.5) * (w * 0.44);
        const wy = isTower ? (0.58 + ry * 0.85) : h * 0.42;
        const ww = isTower ? 0.16 : 0.13;
        const wh = isTower ? 0.30 : 0.24;
        const hole = new THREE.Path();
        hole.moveTo(wx - ww, wy - wh * 0.5);
        hole.lineTo(wx - ww, wy + wh * 0.2);
        hole.absarc(wx, wy + wh * 0.2, ww, Math.PI, 0, true);
        hole.lineTo(wx + ww, wy - wh * 0.5);
        hole.closePath();
        wallShape.holes.push(hole);

        // Illuminated translucent vellum backing sheet behind each cutout window
        const vellumMat = matVellumWindow.clone();
        const vellum = new THREE.Mesh(new THREE.PlaneGeometry(ww * 2.3, wh * 1.4), vellumMat);
        vellum.position.set(wx, wy, -0.008);
        g.add(vellum);
        vellumWindows.push(vellumMat);
      }
    }

    const wall = new THREE.Mesh(extrudeCard(wallShape, 0.036, 0.007), matCream);
    wall.castShadow = true;
    wall.receiveShadow = true;
    g.add(wall);

    // Scalloped gold-foil snow eaves
    const eaveL = Math.hypot(w * 0.54, roofH);
    const ang = Math.atan2(roofH, w * 0.5);
    for (const dir of [-1, 1]) {
      const eave = new THREE.Mesh(new THREE.BoxGeometry(eaveL, 0.045, 0.055), matGoldFoil);
      eave.position.set(dir * w * 0.26, h + roofH * 0.5 + 0.02, 0.02);
      eave.rotation.z = -dir * ang;
      g.add(eave);
    }

    if (isTower) {
      // Rose window gold filigree + spire finial star
      const rose = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.19, 16), matGoldFoil);
      rose.position.set(0, h + roofH * 0.32, 0.048);
      g.add(rose);
      const spireStar = new THREE.Mesh(
        createFacetedStarGeometry({ points: 6, outerRadius: 0.18, innerRadius: 0.07, depth: 0.05 }),
        matGoldFoil
      );
      spireStar.position.set(0, h + roofH + 0.16, 0.02);
      g.add(spireStar);
    }
    villageGroup.add(g);
    return g;
  };

  addPaperHouse(0, 0, 1.25, 1.95, 1.35, true);
  addPaperHouse(-1.35, 0.22, 1.15, 1.15, 0.68, false);
  addPaperHouse(1.38, 0.18, 1.18, 1.22, 0.72, false);
  addPaperHouse(-2.48, 0.45, 0.96, 0.95, 0.58, false);
  addPaperHouse(2.52, 0.42, 0.98, 1.02, 0.62, false);

  // ---------------- Layer 3: Arched Paper Footbridge & Vellum Frozen Stream ----------------
  const stream = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.9),
    new THREE.MeshPhysicalMaterial({
      color: 0xd9ecff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.35,
      envMapIntensity: 1.8,
    })
  );
  stream.rotation.x = -Math.PI * 0.5;
  stream.position.set(0, 0.032, 1.15);
  popupGroup.add(stream);

  const bridgeShape = new THREE.Shape();
  bridgeShape.moveTo(-1.45, 0);
  bridgeShape.quadraticCurveTo(0, 0.68, 1.45, 0);
  bridgeShape.lineTo(1.45, 0.22);
  bridgeShape.quadraticCurveTo(0, 0.92, -1.45, 0.22);
  bridgeShape.closePath();
  const bridge = new THREE.Mesh(extrudeCard(bridgeShape, 0.03, 0.005), matCream);
  bridge.position.set(0, 0, 1.05);
  bridge.castShadow = true;
  popupGroup.add(bridge);
  const bridgeGold = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, 0.014, 8, 32, Math.PI * 0.58),
    matGoldFoil
  );
  bridgeGold.rotation.z = Math.PI * 0.21;
  bridgeGold.position.set(0, -0.72, 1.09);
  popupGroup.add(bridgeGold);

  // ---------------- Layer 2 & 1: 3D V-Fold Origami Pine Forest ----------------
  const addVFoldPine = (x, z, w, h, dark = true, goldTrim = false) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const wingGeo = extrudeCard(makePineWingShape(w, h, 4), 0.022, 0.004);
    const mat = dark ? matPineDark : matPineMid;

    const leftWing = new THREE.Mesh(wingGeo, mat);
    leftWing.rotation.y = Math.PI - 0.52;
    leftWing.castShadow = true;
    leftWing.receiveShadow = true;

    const rightWing = new THREE.Mesh(wingGeo, mat);
    rightWing.rotation.y = 0.52;
    rightWing.castShadow = true;
    rightWing.receiveShadow = true;

    g.add(leftWing, rightWing);

    if (goldTrim) {
      const trimGeo = extrudeCard(makePineWingShape(w * 1.03, h * 1.015, 4), 0.01, 0.003);
      const tL = new THREE.Mesh(trimGeo, matGoldFoil);
      tL.rotation.y = Math.PI - 0.55;
      tL.position.z = -0.015;
      const tR = new THREE.Mesh(trimGeo, matGoldFoil);
      tR.rotation.y = 0.55;
      tR.position.z = -0.015;
      g.add(tL, tR);
    }
    popupGroup.add(g);
  };

  const pineSpecs = [
    [-3.85, 1.75, 0.78, 2.25, true, true],
    [-3.05, 2.18, 0.62, 1.68, false, false],
    [-2.15, 1.88, 0.55, 1.45, true, true],
    [3.75, 1.72, 0.80, 2.30, true, true],
    [2.95, 2.15, 0.60, 1.62, false, false],
    [2.05, 1.92, 0.52, 1.38, true, true],
    [-3.65, -0.55, 0.72, 2.05, false, true],
    [3.62, -0.48, 0.74, 2.12, false, true],
  ];
  for (const p of pineSpecs) addVFoldPine(...p);

  // ---------------- Interactive Mechanism 1: Right-Side Gilded Pull-Tab ----------------
  const pullTabGroup = new THREE.Group();
  pullTabGroup.position.set(4.55, 0.075, 1.35);
  bookRoot.add(pullTabGroup);

  const tabStrip = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.024, 0.46), matBurgundy);
  tabStrip.castShadow = true;
  const tabBorder = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.016, 0.50), matGoldFoil);
  tabBorder.position.y = -0.005;
  const tabRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.028, 12, 32), matGoldFoil);
  tabRing.rotation.x = Math.PI * 0.5;
  tabRing.position.set(0.92, 0, 0);
  // Arrow chevron embossed in gold foil
  const chev = new THREE.Mesh(
    createFacetedStarGeometry({ points: 4, outerRadius: 0.13, innerRadius: 0.05, depth: 0.02 }),
    matGoldFoil
  );
  chev.rotation.x = Math.PI * 0.5;
  chev.position.set(0.42, 0.02, 0);
  pullTabGroup.add(tabStrip, tabBorder, tabRing, chev);

  // Invisible generous hit box for effortless dragging
  const tabHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.35, 0.85),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  tabHit.position.set(0.3, 0.05, 0);
  tabHit.userData = { kind: 'pulltab', label: '向右拖动纸拉条 · 放飞折纸雪橇' };
  pullTabGroup.add(tabHit);
  interactables.push(tabHit);

  // ---------------- Interactive Mechanism 3: Three Hinged Lift-the-Flaps ----------------
  const flaps = [];
  const addLiftFlap = (x, y, z, label, charmColor) => {
    const wrap = new THREE.Group();
    wrap.position.set(x, y, z);
    popupGroup.add(wrap);

    // Warm recessed alcove glow behind the flap
    const alcoveGlow = new THREE.Mesh(
      new THREE.CircleGeometry(0.24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xffefc2,
        emissive: new THREE.Color(charmColor),
        emissiveIntensity: 1.6,
        roughness: 0.3,
      })
    );
    alcoveGlow.position.set(0.22, 0.24, -0.01);
    wrap.add(alcoveGlow);

    // Tiny pop-out gold origami charm inside
    const charm = new THREE.Mesh(
      createFacetedStarGeometry({ points: 6, outerRadius: 0.15, innerRadius: 0.06, depth: 0.045 }),
      matGoldFoil
    );
    charm.position.set(0.22, 0.24, 0.02);
    charm.scale.setScalar(0.01);
    wrap.add(charm);

    // Hinged door leaf (pivots around left edge x=0)
    const hinge = new THREE.Group();
    wrap.add(hinge);

    const doorShape = new THREE.Shape();
    doorShape.moveTo(0, 0);
    doorShape.lineTo(0, 0.34);
    doorShape.absarc(0.22, 0.34, 0.22, Math.PI, 0, true);
    doorShape.lineTo(0.44, 0);
    doorShape.closePath();

    const leaf = new THREE.Mesh(extrudeCard(doorShape, 0.022, 0.004), matBurgundy);
    leaf.position.z = 0.025;
    leaf.castShadow = true;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 10), matGoldFoil);
    knob.position.set(0.36, 0.20, 0.055);
    hinge.add(leaf, knob);

    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.68, 0.28),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.set(0.22, 0.26, 0.05);
    const flapObj = {
      open: false,
      spring: new Spring1D(0, 165, 14),
      hinge,
      charm,
      alcoveGlow,
    };
    hit.userData = { kind: 'flap', flapObj, label };
    wrap.add(hit);
    interactables.push(hit);
    flaps.push(flapObj);
  };

  addLiftFlap(-0.22, 0.02, -0.58, '掀开钟楼折页小门', 0xff9f38);
  addLiftFlap(-2.95, 0.02, 1.52, '掀开古松树洞折页', 0xff6b4a);
  addLiftFlap(1.92, 0.02, 1.48, '掀开雪桥灯龛折页', 0xffcb57);

  // ---------------- Centerpiece Awakening Star Sigil & Floating Gold Paper Dust ----------------
  const sigilGroup = new THREE.Group();
  sigilGroup.position.set(0, 2.35, 0.45);
  sigilGroup.scale.setScalar(0.001);
  popupGroup.add(sigilGroup);

  const sigilStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.48, innerRadius: 0.18, depth: 0.14 }),
    matGoldFoil
  );
  const sigilHalo = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.014, 10, 48),
    matGoldFoil
  );
  sigilGroup.add(sigilStar, sigilHalo);

  // Floating golden paper-cut dust motes
  const dustCount = 90;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 9.2;
    dustPos[i * 3 + 1] = 0.25 + Math.random() * 4.6;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5.2;
    dustSeed[i] = Math.random() * Math.PI * 2;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    map: textures.sparkTex,
    color: 0xffe4a0,
    size: 0.22,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  bookRoot.add(dustPoints);

  // ---------------- Interaction State & Physics ----------------
  const pullSpring = new Spring1D(0.18, 130, 16);
  const volSpring = new Spring1D(0.68, 110, 15); // starts off Polaris so user can align it!
  const windowGlowSpring = new Spring1D(0.45, 70, 13);
  const sigilScaleSpring = new Spring1D(0.001, 95, 11);

  let dragMode = null; // 'pulltab' | 'volvelle' | null
  let dragStartX = 0;
  let dragStartVal = 0;
  let pulledOnce = false;
  let volAligned = false;
  let flapsOpenedCount = 0;
  let awakened = false;

  function checkAwaken() {
    if (awakened) return;
    const score = (pulledOnce ? 1 : 0) + (volAligned ? 1 : 0) + (flapsOpenedCount >= 1 ? 1 : 0);
    if (score >= 2) {
      awakened = true;
      sigilScaleSpring.target = 1.0;
      windowGlowSpring.target = 2.6;
      audio.playSigilAwaken();
      onAwaken(1, '第一声部已唤醒 · 竖琴与烫金纸雕共鸣');
      onHint('松林星夜书已点亮 · 可继续把玩机关或前往下一幕');
    }
  }

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind, flapObj } = hit.object.userData;
    if (kind === 'pulltab') {
      dragMode = 'pulltab';
      dragStartX = pointerNDC.x;
      dragStartVal = pullSpring.target;
      audio.playPaperFold(true);
      focusOffset.set(0.3, 0.35, -1.0);
      focusLookOffset.set(0, 1.1, -0.6);
      focusTimer = 2.4;
      return true;
    }
    if (kind === 'volvelle') {
      dragMode = 'volvelle';
      dragStartX = pointerNDC.x;
      dragStartVal = volSpring.target;
      audio.playHoverTick(1.2);
      focusOffset.set(0, 0.45, -1.35);
      focusLookOffset.set(0, 1.35, -1.2);
      focusTimer = 2.5;
      return true;
    }
    if (kind === 'flap' && flapObj) {
      flapObj.open = !flapObj.open;
      flapObj.spring.target = flapObj.open ? 1.0 : 0.0;
      flapObj.spring.impulse(flapObj.open ? 3.5 : -2.5);
      audio.playPaperFold(flapObj.open);
      if (flapObj.open) {
        flapsOpenedCount++;
        checkAwaken();
      }
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    if (!dragMode) return false;
    const dx = pointerNDC.x - dragStartX;
    if (dragMode === 'pulltab') {
      pullSpring.target = clamp(dragStartVal + dx * 2.3, 0, 1);
      focusTimer = 1.8;
      if (pullSpring.target > 0.68 && !pulledOnce) {
        pulledOnce = true;
        audio.playBellChime(5);
        checkAwaken();
      }
      return true;
    }
    if (dragMode === 'volvelle') {
      let next = dragStartVal - dx * 3.4;
      // Magnetic snap when Polaris approaches 12 o'clock (multiples of 2*PI)
      const nearest = Math.round(next / (Math.PI * 2)) * Math.PI * 2;
      if (Math.abs(next - nearest) < 0.24) {
        next = nearest;
        if (!volAligned) {
          volAligned = true;
          windowGlowSpring.target = 2.45;
          audio.playBellChime(6);
          onHint('北极星已归位 · 整座松林纸雕小镇烛光点亮');
          checkAwaken();
        }
      }
      volSpring.target = next;
      focusTimer = 1.8;
      return true;
    }
    return false;
  }

  function onPointerUp() {
    if (dragMode === 'pulltab') {
      // If user clicked without dragging far, animate a graceful full sleigh leap!
      if (Math.abs(pullSpring.target - dragStartVal) < 0.06) {
        const next = pullSpring.target > 0.65 ? 0.12 : 0.96;
        pullSpring.target = next;
        if (next > 0.7 && !pulledOnce) {
          pulledOnce = true;
          audio.playBellChime(5);
          checkAwaken();
        }
      }
    } else if (dragMode === 'volvelle') {
      if (Math.abs(volSpring.target - dragStartVal) < 0.05) {
        // Click-step rotation toward Polaris alignment
        volSpring.target = 0;
        if (!volAligned) {
          volAligned = true;
          windowGlowSpring.target = 2.45;
          audio.playBellChime(6);
          onHint('北极星已归位 · 整座松林纸雕小镇烛光点亮');
          checkAwaken();
        }
      }
    }
    dragMode = null;
  }

  function update(dt, t, parallax) {
    const openAmt = bookOpenSpring.update(dt);
    popupGroup.scale.y = Math.max(0.05, openAmt);
    leftCover.rotation.z = (1 - openAmt) * 0.42;
    rightCover.rotation.z = -(1 - openAmt) * 0.42;

    // Pull-tab & arched sleigh flight kinematics
    const pull = pullSpring.update(dt);
    pullTabGroup.position.x = 4.32 + pull * 1.18;
    const arcX = lerp(-3.1, 1.55, pull);
    const arcY = 2.35 + Math.sin(pull * Math.PI) * 1.48;
    sleighCarriage.position.set(arcX, arcY, 0);
    sleighCarriage.rotation.z = Math.cos(pull * Math.PI) * 0.28;
    for (let i = 0; i < reindeerMeshes.length; i++) {
      reindeerMeshes[i].position.y = 0.06 + i * 0.05 + Math.sin(t * 5.2 + i * 1.1) * 0.055;
      reindeerMeshes[i].rotation.z = Math.sin(t * 5.2 + i * 0.9) * 0.08;
    }

    // Volvelle rotation & window illumination
    const vAng = volSpring.update(dt);
    volvelleGroup.rotation.z = vAng;

    const glow = windowGlowSpring.update(dt);
    villageCandleLight.intensity = 0.55 + glow * 0.85 + Math.sin(t * 6.3) * 0.08;
    for (let i = 0; i < vellumWindows.length; i++) {
      vellumWindows[i].emissiveIntensity = glow * (0.85 + 0.15 * Math.sin(t * 3.7 + i));
    }

    // Lift-the-flap hinges
    for (const f of flaps) {
      const fv = f.spring.update(dt);
      f.hinge.rotation.y = -fv * 2.25;
      f.charm.scale.setScalar(clamp(fv * 1.1, 0.001, 1.15));
      f.charm.rotation.y = t * 1.6;
    }

    // Awakened centerpiece star sigil
    const sScale = sigilScaleSpring.update(dt);
    sigilGroup.scale.setScalar(Math.max(0.001, sScale));
    sigilStar.rotation.y = t * 0.95;
    sigilHalo.rotation.x = Math.sin(t * 0.8) * 0.45;
    sigilHalo.rotation.y = -t * 0.55;

    // Gentle floating paper-gold motes
    const posArr = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      posArr[i * 3 + 1] += dt * (0.12 + (i % 5) * 0.03);
      posArr[i * 3] += Math.sin(t * 0.9 + dustSeed[i]) * dt * 0.08;
      if (posArr[i * 3 + 1] > 5.0) posArr[i * 3 + 1] = 0.2;
    }
    dustGeo.attributes.position.needsUpdate = true;

    // Curated macro camera parallax + automatic close-up decay
    if (focusTimer > 0) {
      focusTimer -= dt;
      if (focusTimer <= 0) {
        focusOffset.set(0, 0, 0);
        focusLookOffset.set(0, 0, 0);
      }
    }
    camPosSpring.setTarget(
      camBasePos.x + parallax.x * 1.15 + focusOffset.x,
      camBasePos.y + parallax.y * 0.65 + focusOffset.y,
      camBasePos.z + focusOffset.z
    );
    camLookSpring.setTarget(
      camBaseLook.x + parallax.x * 0.25 + focusLookOffset.x,
      camBaseLook.y + parallax.y * 0.2 + focusLookOffset.y,
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

  // Deterministic state setter for automated QA visual capture
  function setCaptureState(preset = 'hero') {
    bookOpenSpring.snap(1.0);
    if (preset === 'climax') {
      pullSpring.snap(0.62);
      volSpring.snap(0);
      windowGlowSpring.snap(2.5);
      flaps[0].open = true;
      flaps[0].spring.snap(1.0);
      sigilScaleSpring.snap(1.0);
    } else {
      pullSpring.snap(0.45);
      volSpring.snap(0);
      windowGlowSpring.snap(2.1);
    }
    update(0.016, 2.4, { x: 0.12, y: 0.05 });
  }

  return {
    id: 1,
    roman: 'ACT I',
    title: '松林星夜书',
    subtitle: '烫金立体折纸剧场 · GILDED POP-UP DIORAMA',
    defaultHint: '向右拖动烫金纸拉条 · 拨动天顶星盘 · 掀开树洞与钟楼小门',
    transTint: new THREE.Color(0xf6c976),
    postOpts: { bloomStrength: 0.44, bloomThreshold: 0.85, starburst: 0.18, tiltShift: 0.56 },
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

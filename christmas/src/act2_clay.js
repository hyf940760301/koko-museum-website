// Act II: Tactile Claymation & Dollhouse Advent — "The Gingerbread Wonder-Workshop" (姜饼奇遇屋)
// Wes Anderson symmetrical cross-section dollhouse, thumbprint polymer clay, needle-felted sheen
// characters quantized to 12fps stop-motion, glossy piped royal icing, fairy-light pull-cord,
// numbered Advent doors, and a Rube Goldberg peppermint candy marble run!

import * as THREE from '../../vendor/three/three.module.js';
import {
  Spring1D,
  Spring3D,
  clamp,
  lerp,
  steppedTime,
  createRoundedBlockGeometry,
  createFacetedStarGeometry,
} from './physics.js';

export function createAct2Clay({ envMap, textures, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x160e11);
  scene.environment = envMap;

  // Symmetrical Wes Anderson miniature macro camera
  const camBasePos = new THREE.Vector3(0, 2.75, 9.65);
  const camBaseLook = new THREE.Vector3(0, 2.45, 0);
  const camPosSpring = new Spring3D(camBasePos.x, camBasePos.y, camBasePos.z, 68, 14);
  const camLookSpring = new Spring3D(camBaseLook.x, camBaseLook.y, camBaseLook.z, 76, 15);
  const focusOffset = new THREE.Vector3();
  const focusLookOffset = new THREE.Vector3();
  let focusTimer = 0;

  // Cozy studio tabletop lighting
  const amb = new THREE.AmbientLight(0x4b333a, 0.95);
  scene.add(amb);

  const key = new THREE.DirectionalLight(0xfff0d8, 2.35);
  key.position.set(4.8, 9.2, 7.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 22;
  key.shadow.camera.left = -6.5;
  key.shadow.camera.right = 6.5;
  key.shadow.camera.top = 7.5;
  key.shadow.camera.bottom = -2.5;
  key.shadow.bias = -0.0006;
  key.shadow.radius = 4.0;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xa2c8ff, 0.85);
  fill.position.set(-6.5, 4.5, 5.0);
  scene.add(fill);

  const hearthLight = new THREE.PointLight(0xff7b29, 1.35, 6.5, 1.6);
  hearthLight.position.set(-1.65, 0.82, 0.45);
  scene.add(hearthLight);

  // ---------------- Tactile Clay, Felt & Royal Icing Materials ----------------
  const makeClayMat = (hex, rough = 0.72) =>
    new THREE.MeshPhysicalMaterial({
      color: hex,
      bumpMap: textures.clayBump,
      bumpScale: 0.024,
      roughness: rough,
      metalness: 0.01,
      sheen: 0.35,
      sheenRoughness: 0.85,
      sheenColor: new THREE.Color(0xffe8d6),
      envMapIntensity: 0.75,
    });

  const makeFeltMat = (hex) =>
    new THREE.MeshPhysicalMaterial({
      color: hex,
      bumpMap: textures.paperTex,
      bumpScale: 0.03,
      roughness: 0.92,
      sheen: 1.0,
      sheenRoughness: 0.78,
      sheenColor: new THREE.Color(0xfff5ea),
      envMapIntensity: 0.65,
    });

  const matGinger = makeClayMat(0x9e5a34, 0.76);
  const matGingerDark = makeClayMat(0x6e3b1f, 0.78);
  const matWallMint = makeClayMat(0x365b56, 0.75);
  const matWallRose = makeClayMat(0x883b46, 0.75);
  const matWallCream = makeClayMat(0xeedcc5, 0.74);

  // Glossy piped royal icing (egg-white sugar glaze)
  const matIcing = new THREE.MeshPhysicalMaterial({
    color: 0xfdf8f0,
    bumpMap: textures.clayBump,
    bumpScale: 0.008,
    roughness: 0.24,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    envMapIntensity: 1.25,
  });

  const matCandyStripe = new THREE.MeshPhysicalMaterial({
    map: textures.candyStripeTex,
    roughness: 0.22,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.2,
  });

  const matBrass = new THREE.MeshPhysicalMaterial({
    color: 0xf0c875,
    metalness: 0.92,
    roughness: 0.24,
    envMapIntensity: 2.1,
  });

  const matFeltRed = makeFeltMat(0xc43238);
  const matFeltGreen = makeFeltMat(0x285e46);
  const matFeltWhite = makeFeltMat(0xf8f2e8);
  const matFeltCocoa = makeFeltMat(0x4b2e22);

  // ---------------- Plinth & Snow Felt Cushion ----------------
  const houseRoot = new THREE.Group();
  scene.add(houseRoot);

  const tableBase = new THREE.Mesh(
    new THREE.CylinderGeometry(6.8, 7.2, 0.36, 48),
    makeClayMat(0x261816, 0.65)
  );
  tableBase.position.y = -0.22;
  tableBase.receiveShadow = true;
  houseRoot.add(tableBase);

  const snowBlanket = new THREE.Mesh(
    createRoundedBlockGeometry(7.8, 0.26, 4.4, 0.35, 0.09),
    matIcing
  );
  snowBlanket.rotation.x = Math.PI * 0.5;
  snowBlanket.position.y = 0.02;
  snowBlanket.receiveShadow = true;
  houseRoot.add(snowBlanket);

  // ---------------- 3-Story Symmetrical Gingerbread Dollhouse Shell ----------------
  const W = 5.4, H1 = 1.65, H2 = 3.25, H3 = 4.65, D = 1.75;

  // Back wallpapers per story (1F warm rose, 2F pistachio mint, 3F cream attic)
  const back1F = new THREE.Mesh(new THREE.BoxGeometry(W - 0.16, 1.58, 0.12), matWallRose);
  back1F.position.set(0, 0.86, -D * 0.5);
  back1F.receiveShadow = true;
  const back2F = new THREE.Mesh(new THREE.BoxGeometry(W - 0.16, 1.55, 0.12), matWallMint);
  back2F.position.set(0, 2.45, -D * 0.5);
  back2F.receiveShadow = true;

  // Triangular gable attic back wall
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-W * 0.5, 0);
  gableShape.lineTo(W * 0.5, 0);
  gableShape.lineTo(0, 1.95);
  gableShape.closePath();
  const back3F = new THREE.Mesh(
    new THREE.ExtrudeGeometry(gableShape, { depth: 0.12, bevelEnabled: false }),
    matWallCream
  );
  back3F.position.set(0, 3.22, -D * 0.5 - 0.06);
  back3F.receiveShadow = true;
  houseRoot.add(back1F, back2F, back3F);

  // Side gingerbread walls & floor slabs with rounded cookie edges
  for (const sx of [-1, 1]) {
    const sideWall = new THREE.Mesh(
      createRoundedBlockGeometry(0.18, 3.25, D, 0.04, 0.03),
      matGinger
    );
    sideWall.position.set(sx * (W * 0.5 - 0.06), 1.66, 0);
    sideWall.castShadow = true;
    sideWall.receiveShadow = true;
    houseRoot.add(sideWall);

    // Candy-cane front corner columns
    const caneCol = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 3.22, 20), matCandyStripe);
    caneCol.position.set(sx * (W * 0.5 + 0.02), 1.66, D * 0.5 - 0.06);
    caneCol.castShadow = true;
    houseRoot.add(caneCol);
  }

  for (const fy of [0.08, H1, H2]) {
    const slab = new THREE.Mesh(
      createRoundedBlockGeometry(W + 0.18, 0.14, D + 0.14, 0.04, 0.03),
      matGingerDark
    );
    slab.position.set(0, fy, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    houseRoot.add(slab);
  }

  // Thick frosted gingerbread roof slopes + scalloped icing drips & gumdrop studs
  const roofLen = Math.hypot(W * 0.56, 2.05);
  const roofAng = Math.atan2(2.05, W * 0.56);
  for (const sx of [-1, 1]) {
    const roofG = new THREE.Group();
    roofG.position.set(sx * W * 0.27, 4.22, 0.04);
    roofG.rotation.z = -sx * roofAng;

    const cookieSlab = new THREE.Mesh(
      createRoundedBlockGeometry(roofLen, 0.16, D + 0.36, 0.05, 0.04),
      matGinger
    );
    cookieSlab.castShadow = true;
    const icingBlanket = new THREE.Mesh(
      createRoundedBlockGeometry(roofLen + 0.08, 0.11, D + 0.44, 0.05, 0.045),
      matIcing
    );
    icingBlanket.position.y = 0.09;
    icingBlanket.castShadow = true;
    roofG.add(cookieSlab, icingBlanket);

    // Colorful clay gumdrops along the roof ridge
    const gumColors = [0xd93b44, 0x3da67a, 0xf2b63d, 0x5c8be6];
    for (let k = 0; k < 5; k++) {
      const gum = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65),
        makeClayMat(gumColors[k % gumColors.length], 0.45)
      );
      gum.position.set((k - 2) * 0.58, 0.14, D * 0.5 + 0.12);
      roofG.add(gum);
    }

    // Piped icing droplets hanging along front roof eave
    for (let d = 0; d < 9; d++) {
      const drop = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.052, 0.09 + (d % 2) * 0.05, 8, 12),
        matIcing
      );
      drop.position.set(-roofLen * 0.44 + d * (roofLen * 0.11), -0.04, D * 0.5 + 0.20);
      roofG.add(drop);
    }
    houseRoot.add(roofG);
  }

  // Crown ridge icing & peppermint rosette medallion at apex
  const apexRosette = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24),
    matCandyStripe
  );
  apexRosette.rotation.x = Math.PI * 0.5;
  apexRosette.position.set(0, 5.18, D * 0.5 + 0.16);
  // Festive felt Holly Wreath & Red Berries below the apex rosette
  const wreathGroup = new THREE.Group();
  wreathGroup.position.set(0, 4.42, D * 0.5 + 0.14);
  const wreathRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.075, 12, 24), matFeltGreen);
  wreathGroup.add(wreathRing);
  for (let wb = 0; wb < 6; wb++) {
    const wa = (wb / 6) * Math.PI * 2;
    const berry = new THREE.Mesh(new THREE.SphereGeometry(0.038, 10, 10), matFeltRed);
    berry.position.set(Math.cos(wa) * 0.26, Math.sin(wa) * 0.26, 0.065);
    wreathGroup.add(berry);
  }
  houseRoot.add(apexRosette, wreathGroup);

  const interactables = [];

  // ---------------- Mechanism 3 Trigger: Chimney Candy Hopper (Top-Right Roof) ----------------
  const chimneyGroup = new THREE.Group();
  chimneyGroup.position.set(1.78, 4.55, 0.05);
  houseRoot.add(chimneyGroup);

  const chimBody = new THREE.Mesh(
    createRoundedBlockGeometry(0.62, 0.92, 0.62, 0.06, 0.04),
    matWallRose
  );
  chimBody.castShadow = true;
  const chimSnowRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.30, 0.095, 12, 24),
    matIcing
  );
  chimSnowRim.rotation.x = Math.PI * 0.5;
  chimSnowRim.position.y = 0.46;
  // Peppermint candy waiting playfully on chimney rim!
  const readyCandy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 20), matCandyStripe);
  readyCandy.position.y = 0.64;
  chimneyGroup.add(chimBody, chimSnowRim, readyCandy);

  const chimHit = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 1.35, 0.95),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  chimHit.position.y = 0.35;
  chimHit.userData = { kind: 'chimney', label: '点击烟囱 · 投递薄荷糖球触发连锁机关' };
  chimneyGroup.add(chimHit);
  interactables.push(chimHit);

  // ---------------- Mechanism 1: Eave Fairy-Light Garland & Tactile Pull-Cord ----------------
  const bulbColors = [0xff4f4f, 0xffc145, 0x45e09b, 0x5ca8ff];
  const bulbs = [];
  for (let i = 0; i < 11; i++) {
    const u = i / 10;
    const x = lerp(-2.52, 2.52, u);
    const sag = Math.sin(u * Math.PI) * 0.16;
    const y = 3.16 - sag;
    const bMat = new THREE.MeshStandardMaterial({
      color: bulbColors[i % bulbColors.length],
      emissive: new THREE.Color(bulbColors[i % bulbColors.length]),
      emissiveIntensity: 0.18,
      roughness: 0.2,
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 12), bMat);
    bulb.position.set(x, y, D * 0.5 + 0.10);
    houseRoot.add(bulb);
    bulbs.push({ mesh: bulb, mat: bMat, baseY: y });
  }

  // Right-side knitted pull-cord with red felt pom-pom
  const cordAnchor = new THREE.Group();
  cordAnchor.position.set(2.92, 3.15, D * 0.5 + 0.05);
  houseRoot.add(cordAnchor);

  const cordLine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 1.15, 8),
    matFeltWhite
  );
  cordLine.position.y = -0.58;
  const cordPom = new THREE.Mesh(new THREE.SphereGeometry(0.145, 20, 16), matFeltRed);
  cordPom.position.y = -1.16;
  const cordRing = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 18), matBrass);
  cordRing.position.y = -1.0;
  cordAnchor.add(cordLine, cordPom, cordRing);

  const cordHit = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.55, 0.65),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  cordHit.position.y = -0.68;
  cordHit.userData = { kind: 'cord', label: '拽一下毛绒拉绳 · 点亮整屋圣诞彩灯' };
  cordAnchor.add(cordHit);
  interactables.push(cordHit);

  // ---------------- 3F Attic: Sloped Candy Chute & 4 Musical Brass Bells ----------------
  const chuteRamp = new THREE.Mesh(
    createRoundedBlockGeometry(3.45, 0.09, 0.36, 0.03, 0.02),
    matGingerDark
  );
  chuteRamp.position.set(0.15, 3.72, 0.18);
  chuteRamp.rotation.z = 0.145; // slopes down from right (+x) to left (-x)
  chuteRamp.castShadow = true;
  houseRoot.add(chuteRamp);

  const bells = [];
  for (let b = 0; b < 4; b++) {
    const bx = 1.15 - b * 0.78;
    const by = 4.16 - b * 0.10;
    const bellPivot = new THREE.Group();
    bellPivot.position.set(bx, by, 0.18);
    const bellCup = new THREE.Mesh(
      new THREE.ConeGeometry(0.115, 0.20, 18, 1, false),
      matBrass
    );
    bellCup.position.y = -0.10;
    bellPivot.add(bellCup);
    houseRoot.add(bellPivot);
    bells.push({ pivot: bellPivot, swing: new Spring1D(0, 210, 9), hitInRun: false });
  }

  // Rolling Peppermint Marble
  const rollingCandy = new THREE.Mesh(new THREE.SphereGeometry(0.175, 24, 20), matCandyStripe);
  rollingCandy.castShadow = true;
  rollingCandy.visible = false;
  houseRoot.add(rollingCandy);

  // ---------------- 2F Workshop: Three Numbered Advent Blind-Box Doors & 12fps Clay Puppets ----------------
  const adventDoors = [];
  const puppetTypes = ['nutcracker', 'penguin', 'snowman'];
  const doorLabels = [
    '敲开 I 号盲盒窗 · 唤醒毛毡胡桃夹子',
    '敲开 II 号盲盒窗 · 唤醒围巾小企鹅',
    '敲开 III 号盲盒窗 · 唤醒糖霜雪人',
  ];

  function buildClayPuppet(type) {
    const g = new THREE.Group();
    if (type === 'nutcracker') {
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.42, 16), matFeltRed);
      torso.position.y = 0.24;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.145, 16, 14), makeClayMat(0xf4cfb4, 0.7));
      head.position.y = 0.56;
      const shakoHat = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.14, 0.26, 16), matFeltCocoa);
      shakoHat.position.y = 0.76;
      const crownTrim = new THREE.Mesh(new THREE.TorusGeometry(0.148, 0.02, 8, 20), matBrass);
      crownTrim.rotation.x = Math.PI * 0.5;
      crownTrim.position.y = 0.66;
      g.add(torso, head, shakoHat, crownTrim);
    } else if (type === 'penguin') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.24, 12, 16), matFeltCocoa);
      body.position.y = 0.28;
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 12), matFeltWhite);
      belly.scale.set(0.9, 1.15, 0.5);
      belly.position.set(0, 0.26, 0.09);
      const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.038, 10, 20), matFeltRed);
      scarf.rotation.x = Math.PI * 0.5;
      scarf.position.y = 0.42;
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 12), makeClayMat(0xf29b2e, 0.6));
      beak.rotation.x = Math.PI * 0.5;
      beak.position.set(0, 0.48, 0.19);
      g.add(body, belly, scarf, beak);
    } else {
      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.20, 18, 16), matFeltWhite);
      b1.position.y = 0.20;
      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.145, 18, 16), matFeltWhite);
      b2.position.y = 0.49;
      const hat = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 16), matFeltGreen);
      hat.position.y = 0.72;
      hat.rotation.z = -0.15;
      const pom = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), matIcing);
      pom.position.set(0.04, 0.86, 0);
      g.add(b1, b2, hat, pom);
    }
    return g;
  }

  for (let i = 0; i < 3; i++) {
    const dx = (i - 1) * 1.55;
    const slot = new THREE.Group();
    slot.position.set(dx, 1.74, 0.08);
    houseRoot.add(slot);

    // Cozy recessed box frame
    const frame = new THREE.Mesh(
      createRoundedBlockGeometry(0.94, 1.18, 0.08, 0.05, 0.025),
      matIcing
    );
    frame.position.set(0, 0.60, 0.26);
    slot.add(frame);

    const puppet = buildClayPuppet(puppetTypes[i]);
    puppet.position.set(0, 0.05, -0.12);
    puppet.scale.setScalar(0.85);
    slot.add(puppet);

    // Hinged gingerbread shutter door
    const hinge = new THREE.Group();
    hinge.position.set(-0.41, 0.60, 0.31);
    slot.add(hinge);

    const doorPanel = new THREE.Mesh(
      createRoundedBlockGeometry(0.82, 1.06, 0.06, 0.04, 0.02),
      i === 1 ? matFeltGreen : matFeltRed
    );
    doorPanel.position.x = 0.41;
    doorPanel.castShadow = true;

    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.048, 14, 12), matBrass);
    knob.position.set(0.70, 0, 0.05);
    // Brass Roman bar emblem (I, II, III)
    for (let r = 0; r <= i; r++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.02), matBrass);
      bar.position.set(0.41 + (r - i * 0.5) * 0.085, 0.14, 0.04);
      hinge.add(bar);
    }
    hinge.add(doorPanel, knob);

    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 1.25, 0.55),
      new THREE.MeshBasicMaterial({ visible: false })
    );
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

  // ---------------- 1F Parlor: Clay Hearth, Cookie Dominoes & Ribboned Finale Gift Box ----------------
  // Left Parlor Hearth
  const hearth = new THREE.Group();
  hearth.position.set(-1.68, 0.15, -0.05);
  houseRoot.add(hearth);

  const mantle = new THREE.Mesh(
    createRoundedBlockGeometry(1.26, 1.08, 0.56, 0.06, 0.04),
    matIcing
  );
  mantle.position.y = 0.54;
  mantle.castShadow = true;
  const firebox = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.62, 0.38),
    makeClayMat(0x1b0e0b, 0.9)
  );
  firebox.position.set(0, 0.34, 0.12);

  // Sculpted clay flame teardrops
  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xffa834,
    emissive: new THREE.Color(0xff5e14),
    emissiveIntensity: 2.2,
    roughness: 0.3,
  });
  const flameGroup = new THREE.Group();
  flameGroup.position.set(0, 0.24, 0.14);
  for (let f = -1; f <= 1; f++) {
    const fl = new THREE.Mesh(new THREE.ConeGeometry(0.11 - Math.abs(f) * 0.02, 0.34, 12), flameMat);
    fl.position.set(f * 0.13, 0.12, 0);
    flameGroup.add(fl);
  }
  // Three cute felt stockings hung on the mantlepiece
  for (let s = -1; s <= 1; s++) {
    const sock = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.055, 0.14, 8, 12),
      s === 0 ? matFeltGreen : matFeltRed
    );
    sock.position.set(s * 0.32, 0.92, 0.31);
    sock.rotation.z = 0.12;
    hearth.add(sock);
  }
  hearth.add(mantle, firebox, flameGroup);

  // Center Biscuit Dominoes (topple in sequence during the candy run!)
  const dominoes = [];
  for (let d = 0; d < 4; d++) {
    const domPivot = new THREE.Group();
    domPivot.position.set(-0.62 + d * 0.42, 0.16, 0.18);
    const cookie = new THREE.Mesh(
      createRoundedBlockGeometry(0.09, 0.56, 0.34, 0.025, 0.015),
      matGinger
    );
    cookie.position.y = 0.28;
    cookie.castShadow = true;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), matIcing);
    dot.position.set(0, 0.40, 0.17);
    domPivot.add(cookie, dot);
    houseRoot.add(domPivot);
    dominoes.push({ pivot: domPivot, spring: new Spring1D(0, 180, 13), fallen: false });
  }

  // Right Parlor Grand Ribboned Gift Box (springs open to reveal Act II Star Sigil!)
  const giftGroup = new THREE.Group();
  giftGroup.position.set(1.55, 0.16, 0.18);
  houseRoot.add(giftGroup);

  const giftBox = new THREE.Mesh(
    createRoundedBlockGeometry(0.92, 0.76, 0.86, 0.05, 0.03),
    matFeltGreen
  );
  giftBox.position.y = 0.38;
  giftBox.castShadow = true;
  const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.78, 0.89), matFeltRed);
  ribbonV.position.y = 0.38;
  giftGroup.add(giftBox, ribbonV);

  const giftLidPivot = new THREE.Group();
  giftLidPivot.position.set(0.45, 0.76, 0);
  giftGroup.add(giftLidPivot);

  const giftLid = new THREE.Mesh(
    createRoundedBlockGeometry(0.98, 0.16, 0.92, 0.04, 0.025),
    matFeltRed
  );
  giftLid.position.x = -0.45;
  giftLid.castShadow = true;
  const bowL = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.042, 10, 20), matBrass);
  bowL.position.set(-0.56, 0.14, 0);
  bowL.rotation.z = 0.45;
  const bowR = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.042, 10, 20), matBrass);
  bowR.position.set(-0.34, 0.14, 0);
  bowR.rotation.z = -0.45;
  giftLidPivot.add(giftLid, bowL, bowR);

  // Rising Star Sigil inside the gift box
  const sigilStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.38, innerRadius: 0.15, depth: 0.12 }),
    matBrass
  );
  sigilStar.position.set(0, 0.45, 0);
  sigilStar.scale.setScalar(0.001);
  giftGroup.add(sigilStar);

  const giftHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 1.1, 1.1),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  giftHit.position.y = 0.5;
  giftHit.userData = { kind: 'gift', label: '点击烟囱投递糖球（或轻敲礼盒）开启惊喜' };
  giftGroup.add(giftHit);
  interactables.push(giftHit);

  // ---------------- State & Rube Goldberg Machine Timeline ----------------
  let lightsOn = false;
  const cordPullSpring = new Spring1D(0, 220, 12);
  const lightsSpring = new Spring1D(0.15, 85, 14);
  const lidOpenSpring = new Spring1D(0, 150, 11);
  const sigilRiseSpring = new Spring1D(0, 110, 12);

  let candyRunTime = -1; // >= 0 while the peppermint marble is running
  let doorsOpened = 0;
  let candyCompleted = false;
  let awakened = false;

  function triggerAwaken() {
    if (awakened) return;
    awakened = true;
    lidOpenSpring.target = 1.0;
    sigilRiseSpring.target = 1.0;
    lightsOn = true;
    lightsSpring.target = 2.4;
    audio.playSigilAwaken();
    onAwaken(2, '第二声部已唤醒 · 木琴与雪橇银铃加入合奏');
    onHint('姜饼奇遇屋全屋点亮 · 可继续开启盲盒窗或前往下一幕');
  }

  function startCandyRun() {
    if (candyRunTime >= 0) return;
    // Reset dominoes & bells for repeatable delight!
    for (const b of bells) b.hitInRun = false;
    for (const d of dominoes) {
      d.fallen = false;
      d.spring.snap(0);
    }
    candyRunTime = 0;
    rollingCandy.visible = true;
    readyCandy.scale.setScalar(0.01);
    audio.playClayPop(2);
    focusOffset.set(0, 0.25, -1.25);
    focusLookOffset.set(0, 0.35, 0);
    focusTimer = 3.6;
  }

  function onPointerDown(hit) {
    if (!hit) return false;
    const { kind, doorObj } = hit.object.userData;
    if (kind === 'cord') {
      lightsOn = !lightsOn;
      lightsSpring.target = lightsOn ? 2.45 : 0.22;
      cordPullSpring.impulse(-4.2);
      audio.playClayPop(4);
      if (lightsOn) audio.playBellChime(3);
      if (lightsOn && doorsOpened >= 2) triggerAwaken();
      return true;
    }
    if (kind === 'advent' && doorObj) {
      doorObj.open = !doorObj.open;
      doorObj.doorSpring.target = doorObj.open ? 1 : 0;
      doorObj.popSpring.target = doorObj.open ? 1 : 0;
      doorObj.popSpring.impulse(doorObj.open ? 3.5 : -2.0);
      audio.playClayPop(doorObj.idx);
      if (doorObj.open) {
        audio.playBellChime(doorObj.idx * 2);
        doorsOpened++;
        if (doorsOpened >= 2 && (lightsOn || candyCompleted)) triggerAwaken();
      }
      return true;
    }
    if (kind === 'chimney' || kind === 'gift') {
      startCandyRun();
      return true;
    }
    return false;
  }

  function onPointerMove() { return false; }
  function onPointerUp() {}

  function update(dt, t, parallax) {
    // 12fps quantized stop-motion clock for claymation puppets & hearth fire!
    const t12 = steppedTime(t, 12);

    // Pull-cord & fairy lights
    const pullY = cordPullSpring.update(dt);
    cordAnchor.position.y = 3.15 + pullY * 0.22;
    const bulbGlow = lightsSpring.update(dt);
    for (let i = 0; i < bulbs.length; i++) {
      const b = bulbs[i];
      const twinkle = lightsOn ? 0.8 + 0.25 * Math.sin(t12 * 5.0 + i * 1.3) : 1.0;
      b.mat.emissiveIntensity = bulbGlow * twinkle;
      b.mesh.position.y = b.baseY + Math.sin(t * 4.0 + i * 0.6) * Math.abs(pullY) * 0.06;
    }

    // Stop-motion hearth fire dance
    flameGroup.scale.y = 0.92 + 0.18 * Math.sin(t12 * 11.0);
    flameGroup.rotation.z = 0.06 * Math.cos(t12 * 8.5);
    hearthLight.intensity = 1.25 + 0.25 * Math.sin(t12 * 9.0) + bulbGlow * 0.35;

    // Advent blind-box doors & 12fps bobbing felt puppets
    for (const d of adventDoors) {
      const openV = d.doorSpring.update(dt);
      const popV = d.popSpring.update(dt);
      d.hinge.rotation.y = -openV * 2.15;
      d.puppet.position.z = lerp(-0.14, 0.22, popV);
      if (d.open) {
        d.puppet.rotation.z = Math.sin(t12 * 6.2 + d.idx) * 0.14;
        d.puppet.rotation.y = Math.cos(t12 * 4.5 + d.idx * 2) * 0.26;
        d.puppet.position.y = 0.05 + Math.abs(Math.sin(t12 * 6.2 + d.idx)) * 0.06;
      }
    }

    // Rube Goldberg Peppermint Marble Run Kinematics!
    if (candyRunTime >= 0) {
      candyRunTime += dt;
      if (candyRunTime < 0.45) {
        // Phase 1: Drop down chimney into 3F attic chute
        const u = candyRunTime / 0.45;
        rollingCandy.position.set(1.78, lerp(5.15, 3.98, u * u), 0.18);
      } else if (candyRunTime < 1.75) {
        // Phase 2: Roll along sloped 3F attic chute, striking all 4 brass bells!
        const u = (candyRunTime - 0.45) / 1.30;
        const x = lerp(1.72, -1.52, u);
        const y = lerp(3.98, 3.52, u) + 0.16;
        rollingCandy.position.set(x, y, 0.18);
        rollingCandy.rotation.z += dt * 11.0;

        for (let i = 0; i < bells.length; i++) {
          const bx = 1.15 - i * 0.78;
          if (!bells[i].hitInRun && x <= bx + 0.12) {
            bells[i].hitInRun = true;
            bells[i].swing.impulse(9.5);
            audio.playBellChime(i * 2);
          }
        }
      } else if (candyRunTime < 2.20) {
        // Phase 3: Drop down left shaft onto 1F domino parlor floor!
        const u = (candyRunTime - 1.75) / 0.45;
        const x = lerp(-1.52, -0.82, u);
        const y = lerp(3.68, 0.34, u * u);
        rollingCandy.position.set(x, y, 0.18);
        rollingCandy.rotation.z += dt * 14.0;
      } else if (candyRunTime < 3.05) {
        // Phase 4: Topple the 4 cookie dominoes into the ribboned gift box!
        const u = (candyRunTime - 2.20) / 0.85;
        rollingCandy.position.set(lerp(-0.82, -0.58, Math.min(1, u * 3)), 0.34, 0.18);
        for (let i = 0; i < dominoes.length; i++) {
          if (!dominoes[i].fallen && u >= i * 0.19) {
            dominoes[i].fallen = true;
            dominoes[i].spring.target = i === dominoes.length - 1 ? 1.18 : 0.92;
            audio.playClayPop(i + 1);
          }
        }
      } else {
        // Phase 5: Grand Gift Box pops open & awakens Act II Sigil!
        candyRunTime = -1;
        rollingCandy.visible = false;
        readyCandy.scale.setScalar(1.0);
        candyCompleted = true;
        triggerAwaken();
      }
    } else {
      readyCandy.position.y = 0.64 + Math.sin(t12 * 4.5) * 0.035;
      readyCandy.rotation.y = t12 * 1.2;
    }

    for (const b of bells) {
      b.pivot.rotation.z = b.swing.update(dt);
    }
    for (const dm of dominoes) {
      dm.pivot.rotation.z = -dm.spring.update(dt);
    }

    // Finale Gift Lid & Rising Star Sigil
    const lidV = lidOpenSpring.update(dt);
    giftLidPivot.rotation.z = -lidV * 2.05;
    const sigV = sigilRiseSpring.update(dt);
    sigilStar.scale.setScalar(Math.max(0.001, sigV));
    sigilStar.position.y = lerp(0.45, 1.26, sigV);
    sigilStar.rotation.y = t * 1.25;

    // Camera rig
    if (focusTimer > 0) {
      focusTimer -= dt;
      if (focusTimer <= 0) {
        focusOffset.set(0, 0, 0);
        focusLookOffset.set(0, 0, 0);
      }
    }
    camPosSpring.setTarget(
      camBasePos.x + parallax.x * 0.95 + focusOffset.x,
      camBasePos.y + parallax.y * 0.55 + focusOffset.y,
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
    lightsOn = true;
    lightsSpring.snap(2.45);
    adventDoors[0].open = true;
    adventDoors[0].doorSpring.snap(1.0);
    adventDoors[0].popSpring.snap(1.0);
    adventDoors[1].open = true;
    adventDoors[1].doorSpring.snap(1.0);
    adventDoors[1].popSpring.snap(1.0);
    if (preset === 'climax') {
      for (const d of dominoes) d.spring.snap(0.92);
      lidOpenSpring.snap(1.0);
      sigilRiseSpring.snap(1.0);
    }
    update(0.016, 3.1, { x: -0.08, y: 0.04 });
  }

  return {
    id: 2,
    roman: 'ACT II',
    title: '姜饼奇遇屋',
    subtitle: '定格黏土礼盒工坊 · TACTILE CLAYMATION WORKSHOP',
    defaultHint: '拽动右侧彩灯拉绳 · 敲开编号盲盒门 · 点击烟囱投递薄荷糖球',
    transTint: new THREE.Color(0xff9a62),
    postOpts: { bloomStrength: 0.42, bloomThreshold: 0.86, starburst: 0.12, tiltShift: 0.62 },
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

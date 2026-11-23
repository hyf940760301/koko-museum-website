// Act V (Grand Finale): The Four-Act Royal Music-Box Carousel & Bespoke Gilded Keepsake Card Renderer
// Brings miniatures from all 4 acts onto one rotating brass-and-crystal pavilion while all 4 voices
// play in full harmony, plus renders a high-DPI 1080x1350 hot-foil & wax-seal Christmas keepsake card.

import * as THREE from '../../vendor/three/three.module.js';
import {
  Spring1D,
  Spring3D,
  createGearGeometry,
  createFacetedStarGeometry,
  createCrystalPrismGeometry,
  createRoundedBlockGeometry,
} from './physics.js';

export function createFinaleCarousel({ envMap, textures, audio, onOpenCardStudio }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a070c);
  scene.environment = envMap;

  const camBasePos = new THREE.Vector3(0, 2.65, 8.85);
  const camBaseLook = new THREE.Vector3(0, 1.85, 0);
  const camPosSpring = new Spring3D(camBasePos.x, camBasePos.y, camBasePos.z, 62, 14);
  const camLookSpring = new Spring3D(camBaseLook.x, camBaseLook.y, camBaseLook.z, 72, 15);

  const amb = new THREE.AmbientLight(0x34294a, 0.95);
  scene.add(amb);

  const keyWarm = new THREE.DirectionalLight(0xffe4b2, 2.5);
  keyWarm.position.set(5, 9, 7);
  keyWarm.castShadow = true;
  scene.add(keyWarm);

  const rimAurora = new THREE.DirectionalLight(0x66f7d8, 1.35);
  rimAurora.position.set(-6, 6, -5);
  scene.add(rimAurora);

  const centerGlow = new THREE.PointLight(0xffc970, 2.4, 12, 1.5);
  centerGlow.position.set(0, 2.2, 0);
  scene.add(centerGlow);

  // Materials
  const matGold = new THREE.MeshPhysicalMaterial({
    color: 0xf3cb7a,
    roughnessMap: textures.brassTex,
    metalness: 0.95,
    roughness: 0.19,
    clearcoat: 0.35,
    envMapIntensity: 2.4,
  });

  const matBurgundy = new THREE.MeshPhysicalMaterial({
    color: 0x4e0f19,
    roughness: 0.52,
    metalness: 0.08,
    sheen: 0.55,
    sheenRoughness: 0.72,
    sheenColor: new THREE.Color(0x8c2230),
    envMapIntensity: 1.15,
  });

  const matEmerald = new THREE.MeshPhysicalMaterial({
    color: 0x133b2e,
    roughness: 0.45,
    metalness: 0.12,
    sheen: 0.5,
    sheenColor: new THREE.Color(0x2d7a5e),
    envMapIntensity: 1.25,
  });

  const matIvory = new THREE.MeshPhysicalMaterial({
    color: 0xfbf4e6,
    bumpMap: textures.paperTex,
    bumpScale: 0.012,
    roughness: 0.55,
    clearcoat: 0.3,
  });

  const matCrystal = new THREE.MeshPhysicalMaterial({
    color: 0xe6fbff,
    emissive: new THREE.Color(0x2d6d88),
    emissiveIntensity: 0.55,
    roughness: 0.07,
    transmission: 0.72,
    ior: 1.65,
    iridescence: 1.0,
    iridescenceIOR: 1.85,
    envMapIntensity: 2.8,
  });

  // Reflective dark marble table floor
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(22, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x110c12,
      roughness: 0.16,
      metalness: 0.25,
      clearcoat: 0.9,
      envMapIntensity: 1.8,
    })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  // ---------------- Grand Rotating Quartet Carousel Pavilion ----------------
  const carousel = new THREE.Group();
  scene.add(carousel);

  // Stepped velvet & brass circular stage deck
  const lowerBase = new THREE.Mesh(new THREE.CylinderGeometry(2.85, 3.05, 0.28, 64), matGold);
  lowerBase.position.y = 0.14;
  const velvetDeck = new THREE.Mesh(new THREE.CylinderGeometry(2.68, 2.75, 0.18, 64), matBurgundy);
  velvetDeck.position.y = 0.34;
  carousel.add(lowerBase, velvetDeck);

  // Central spiral brass column & floating Gilded Envelope Emblem
  const centerPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.30, 3.2, 32), matGold);
  centerPillar.position.y = 1.95;
  carousel.add(centerPillar);

  // Canopy dome with scalloped burgundy arches, meshing crown gear & grand Bethlehem star
  const canopyRing = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.075, 16, 64), matGold);
  canopyRing.rotation.x = Math.PI * 0.5;
  canopyRing.position.y = 3.45;
  const canopyCone = new THREE.Mesh(new THREE.ConeGeometry(2.62, 1.05, 32), matBurgundy);
  canopyCone.position.y = 3.98;
  const crownGear = new THREE.Mesh(
    createGearGeometry({ teeth: 28, outerRadius: 1.45, innerRadius: 1.22, thickness: 0.08, spokes: 6 }),
    matGold
  );
  crownGear.rotation.x = Math.PI * 0.5;
  crownGear.position.y = 3.42;
  const apexStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.52, innerRadius: 0.19, depth: 0.15 }),
    matGold
  );
  apexStar.position.y = 4.78;
  // Hanging crystal teardrops around the canopy cornice for haute-horlogerie luxury
  for (let b = 0; b < 16; b++) {
    const ba = (b / 16) * Math.PI * 2;
    const drop = new THREE.Mesh(
      createCrystalPrismGeometry({ sides: 6, radius: 0.055, height: 0.22, waist: 0.2 }),
      b % 2 === 0 ? matCrystal : matGold
    );
    drop.position.set(Math.cos(ba) * 2.55, 3.28, Math.sin(ba) * 2.55);
    carousel.add(drop);
  }
  carousel.add(canopyRing, canopyCone, crownGear, apexStar);

  // 4 Twisted brass carousel poles + 4 Miniature Tributes from Acts I–IV!
  const tributes = [];
  for (let q = 0; q < 4; q++) {
    const a = (q / 4) * Math.PI * 2;
    const poleX = Math.cos(a + Math.PI * 0.25) * 2.42;
    const poleZ = Math.sin(a + Math.PI * 0.25) * 2.42;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.05, 16), matGold);
    pole.position.set(poleX, 1.92, poleZ);
    carousel.add(pole);

    // Stage pedestal for each act's miniature emblem
    const stage = new THREE.Group();
    const rStage = 1.68;
    stage.position.set(Math.cos(a) * rStage, 0.45, Math.sin(a) * rStage);
    stage.rotation.y = -a + Math.PI * 0.5;
    carousel.add(stage);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.62, 0.12, 32), matGold);
    plinth.position.y = 0.06;
    stage.add(plinth);

    const fig = new THREE.Group();
    fig.position.y = 0.14;
    stage.add(fig);

    if (q === 0) {
      // Tribute I: Layered V-Fold Origami Pines, Gold Star Halo & Leaping Deer
      for (let t = 0; t < 3; t++) {
        const tier = new THREE.Mesh(new THREE.ConeGeometry(0.42 - t * 0.09, 0.48, 6), matEmerald);
        tier.position.y = 0.28 + t * 0.28;
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.39 - t * 0.09, 0.016, 8, 24), matGold);
        rim.rotation.x = Math.PI * 0.5;
        rim.position.y = 0.06 + t * 0.28;
        fig.add(tier, rim);
      }
      const st = new THREE.Mesh(
        createFacetedStarGeometry({ points: 6, outerRadius: 0.18, innerRadius: 0.07, depth: 0.05 }),
        matGold
      );
      st.position.y = 1.16;
      fig.add(st);
    } else if (q === 1) {
      // Tribute II: Frosted Gingerbread Cottage & Top-Hat Clay Snowman
      const house = new THREE.Mesh(createRoundedBlockGeometry(0.46, 0.48, 0.42, 0.04, 0.02), matBurgundy);
      house.position.set(-0.14, 0.24, -0.06);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.34, 4), matIvory);
      roof.rotation.y = Math.PI * 0.25;
      roof.position.set(-0.14, 0.62, -0.06);
      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.20, 20, 16), matIvory);
      b1.position.set(0.22, 0.20, 0.14);
      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 16), matIvory);
      b2.position.set(0.22, 0.48, 0.14);
      const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.032, 8, 20), matBurgundy);
      scarf.rotation.x = Math.PI * 0.5;
      scarf.position.set(0.22, 0.38, 0.14);
      const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.20, 16), matEmerald);
      hat.position.set(0.22, 0.68, 0.14);
      fig.add(house, roof, b1, b2, scarf, hat);
    } else if (q === 2) {
      // Tribute III: Detailed Brass & Crimson Steam Express Locomotive with Wheels & Cab
      const boiler = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.56, 20), matBurgundy);
      boiler.rotation.z = Math.PI * 0.5;
      boiler.position.set(0.06, 0.28, 0);
      const cab = new THREE.Mesh(createRoundedBlockGeometry(0.30, 0.38, 0.34, 0.03, 0.02), matBurgundy);
      cab.position.set(-0.22, 0.34, 0);
      const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.38), matGold);
      cabRoof.position.set(-0.22, 0.54, 0);
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.052, 0.24, 16), matGold);
      stack.position.set(0.22, 0.50, 0);
      for (let w = -1; w <= 1; w++) {
        for (const sz of [-0.18, 0.18]) {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.035, 16), matGold);
          wheel.rotation.x = Math.PI * 0.5;
          wheel.position.set(w * 0.20, 0.10, sz);
          fig.add(wheel);
        }
      }
      fig.add(boiler, cab, cabRoof, stack);
    } else {
      // Tribute IV: Dichroic Crystal Sanctuary Cluster & Golden Spiral Halo
      for (let k = 0; k < 7; k++) {
        const ka = (k / 6) * Math.PI * 2;
        const cr = new THREE.Mesh(
          createCrystalPrismGeometry({ sides: 6, radius: k === 0 ? 0.15 : 0.105, height: k === 0 ? 1.22 : 0.76, waist: 0.2 }),
          matCrystal
        );
        cr.position.set(k === 0 ? 0 : Math.cos(ka) * 0.24, k === 0 ? 0.62 : 0.38, k === 0 ? 0 : Math.sin(ka) * 0.24);
        if (k > 0) {
          cr.rotation.z = -Math.cos(ka) * 0.22;
          cr.rotation.x = Math.sin(ka) * 0.22;
        }
        fig.add(cr);
      }
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.014, 10, 32), matGold);
      halo.rotation.x = 0.45;
      halo.position.y = 0.72;
      fig.add(halo);
    }
    tributes.push(fig);
  }

  // Floating Gilded Keepsake Envelope Plaque in front of center pillar (click to open Card Studio!)
  const cardPlaque = new THREE.Group();
  cardPlaque.position.set(0, 1.85, 2.35);
  scene.add(cardPlaque);

  const envMesh = new THREE.Mesh(
    createRoundedBlockGeometry(0.92, 0.64, 0.06, 0.04, 0.015),
    matBurgundy
  );
  const envGoldRim = new THREE.Mesh(
    createRoundedBlockGeometry(0.96, 0.68, 0.04, 0.04, 0.012),
    matGold
  );
  envGoldRim.position.z = -0.01;
  const sealDot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 24), matGold);
  sealDot.rotation.x = Math.PI * 0.5;
  sealDot.position.z = 0.035;
  cardPlaque.add(envMesh, envGoldRim, sealDot);

  const interactables = [];
  const cardHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.95, 0.45),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  cardHit.userData = { kind: 'open_card', label: '点击开启烫金圣诞礼笺工坊 · 定制并保存纪念贺卡' };
  cardPlaque.add(cardHit);
  interactables.push(cardHit);

  const carouselHit = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8, 2.8, 3.8, 24),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  carouselHit.position.y = 1.9;
  carouselHit.userData = { kind: 'spin_carousel', label: '左右拖动旋转四重奏走马灯 · 欣赏四幕微缩奇景' };
  carousel.add(carouselHit);
  interactables.push(carouselHit);

  // Golden celebration snowfall around the pavilion
  const snowCount = 320;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 14;
    snowPos[i * 3 + 1] = Math.random() * 8;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
  const snowPoints = new THREE.Points(
    snowGeo,
    new THREE.PointsMaterial({
      map: textures.sparkTex,
      color: 0xffe8b0,
      size: 0.20,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(snowPoints);

  const spinVelSpring = new Spring1D(0.32, 40, 8);
  let spinAngle = 0;
  let dragging = false;
  let lastX = 0;

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind } = hit.object.userData;
    if (kind === 'open_card') {
      audio.playWaxSealBreak();
      onOpenCardStudio();
      return true;
    }
    if (kind === 'spin_carousel') {
      dragging = true;
      lastX = pointerNDC.x;
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    if (!dragging) return false;
    const dx = pointerNDC.x - lastX;
    lastX = pointerNDC.x;
    spinAngle += dx * 3.8;
    spinVelSpring.impulse(dx * 12);
    return true;
  }

  function onPointerUp() {
    dragging = false;
    spinVelSpring.target = 0.32;
  }

  function update(dt, t, parallax) {
    const vel = spinVelSpring.update(dt);
    if (!dragging) spinAngle += vel * dt;
    carousel.rotation.y = spinAngle;
    crownGear.rotation.z = -t * 0.6;
    apexStar.rotation.y = t * 1.1;

    for (let i = 0; i < tributes.length; i++) {
      // Classic carousel horse up-and-down gentle bobbing!
      tributes[i].position.y = 0.14 + Math.sin(t * 2.4 + i * Math.PI * 0.5) * 0.14;
      tributes[i].rotation.y = t * 0.5;
    }

    cardPlaque.position.y = 1.65 + Math.sin(t * 2.2) * 0.08;
    cardPlaque.rotation.y = Math.sin(t * 1.1) * 0.14;

    const pArr = snowGeo.attributes.position.array;
    for (let i = 0; i < snowCount; i++) {
      pArr[i * 3 + 1] -= dt * 0.42;
      pArr[i * 3] += Math.sin(t + i) * dt * 0.12;
      if (pArr[i * 3 + 1] < 0.1) pArr[i * 3 + 1] = 7.8;
    }
    snowGeo.attributes.position.needsUpdate = true;

    camPosSpring.setTarget(camBasePos.x + parallax.x * 1.0, camBasePos.y + parallax.y * 0.55, camBasePos.z);
    camLookSpring.setTarget(camBaseLook.x + parallax.x * 0.2, camBaseLook.y + parallax.y * 0.18, camBaseLook.z);
    camPosSpring.update(dt);
    camLookSpring.update(dt);
  }

  function applyCamera(camera) {
    camPosSpring.copyTo(camera.position);
    const target = new THREE.Vector3();
    camLookSpring.copyTo(target);
    camera.lookAt(target);
  }

  function setCaptureState() {
    spinAngle = 0.38;
    update(0.016, 2.5, { x: 0.06, y: 0.04 });
  }

  return {
    id: 5,
    roman: 'FINALE · V',
    title: '平安夜四重奏',
    subtitle: '皇家八音盒走马灯与烫金礼笺 · GRAND CAROUSEL QUARTET',
    defaultHint: '左右拨动四幕走马灯 · 点击前方烫金信笺书写并保存专属纪念贺卡',
    transTint: new THREE.Color(0xf8d78c),
    postOpts: { bloomStrength: 0.52, bloomThreshold: 0.80, starburst: 0.55, tiltShift: 0.42 },
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

// High-resolution 1080x1350 Bespoke Gilded & Wax-Sealed Keepsake Card Renderer (Canvas 2D)
export function renderKeepsakeCard(canvas, { to, message, from }) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // 1. Deep burgundy-noir cotton paper background with warm radial vignette
  const bg = ctx.createRadialGradient(W * 0.5, H * 0.38, 60, W * 0.5, H * 0.5, H * 0.78);
  bg.addColorStop(0, '#3a131b');
  bg.addColorStop(0.58, '#210b10');
  bg.addColorStop(1, '#110609');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle cotton paper grain
  ctx.fillStyle = 'rgba(255, 238, 205, 0.022)';
  for (let i = 0; i < 1800; i++) {
    const gx = (Math.sin(i * 91.7) * 0.5 + 0.5) * W;
    const gy = (Math.cos(i * 47.3) * 0.5 + 0.5) * H;
    ctx.fillRect(gx, gy, 2, 2);
  }

  // Champagne gold metallic linear gradient for borders & emblems
  const gold = ctx.createLinearGradient(0, 0, W, H);
  gold.addColorStop(0, '#f8e6ba');
  gold.addColorStop(0.35, '#d5a858');
  gold.addColorStop(0.68, '#f6dfaa');
  gold.addColorStop(1, '#9f732d');

  // 2. Double architectural gold-foil borders + corner flourishes
  ctx.strokeStyle = gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  ctx.lineWidth = 1.2;
  ctx.strokeRect(74, 74, W - 148, H - 148);

  const drawCorner = (cx, cy, sx, sy) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, 68);
    ctx.quadraticCurveTo(0, 0, 68, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(28, 28, 6, 0, Math.PI * 2);
    ctx.fillStyle = gold;
    ctx.fill();
    ctx.restore();
  };
  drawCorner(74, 74, 1, 1);
  drawCorner(W - 74, 74, -1, 1);
  drawCorner(74, H - 74, 1, -1);
  drawCorner(W - 74, H - 74, -1, -1);

  // 3. Top Celestial Starburst Emblem & Quartet Act Sigils
  ctx.save();
  ctx.translate(W * 0.5, 225);
  ctx.strokeStyle = gold;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.stroke();

  // 8-point Polaris Star
  ctx.fillStyle = gold;
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 - Math.PI * 0.5;
    const r = i % 2 === 0 ? (i % 4 === 0 ? 58 : 38) : 13;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Eyebrow & Title
  ctx.fillStyle = 'rgba(246, 226, 180, 0.72)';
  ctx.font = '20px Georgia, "Songti SC", serif';
  ctx.textAlign = 'center';
  ctx.fillText('NOEL  ·  IV    W I N T E R   Q U A R T E T', W * 0.5, 355);

  ctx.fillStyle = gold;
  ctx.font = '52px Georgia, "Songti SC", serif';
  ctx.fillText('冬 夜 四 重 奏', W * 0.5, 432);

  // Decorative hairline divider with 4 awakened sigil diamonds
  ctx.strokeStyle = 'rgba(213, 168, 88, 0.45)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(190, 482);
  ctx.lineTo(W - 190, 482);
  ctx.stroke();

  for (let s = 0; s < 4; s++) {
    const sx = W * 0.5 + (s - 1.5) * 44;
    ctx.save();
    ctx.translate(sx, 482);
    ctx.rotate(Math.PI * 0.25);
    ctx.fillStyle = '#f8e6ba';
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  }

  // 4. Recipient, Wrapped Message & Sender Typography
  const cleanTo = (to || '亲爱的朋友').trim();
  const cleanMsg = (message || '圣诞快乐，愿冬夜烛火与星光常伴你左右。').trim();
  const cleanFrom = (from || '冬夜寄信人').trim();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f7e4b6';
  ctx.font = '32px Georgia, "Songti SC", "Noto Serif SC", serif';
  ctx.fillText(`致  ${cleanTo}：`, 156, 585);

  // Character-aware wrapping for elegant Chinese + Latin mixed lines
  ctx.fillStyle = '#f6efe2';
  ctx.font = '31px Georgia, "Songti SC", "Noto Serif SC", serif';
  const maxLineW = W - 312;
  const chars = Array.from(cleanMsg);
  const lines = [];
  let current = '    '; // 2-em poetic first-line indent
  for (const ch of chars) {
    if (ch === '\n') {
      lines.push(current);
      current = '';
      continue;
    }
    const test = current + ch;
    if (ctx.measureText(test).width > maxLineW && current.length > 0) {
      lines.push(current);
      current = ch;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  let yCursor = 668;
  for (const ln of lines.slice(0, 6)) {
    ctx.fillText(ln, 156, yCursor);
    yCursor += 58;
  }

  // Sender signature & date
  ctx.textAlign = 'right';
  ctx.fillStyle = '#f7e4b6';
  ctx.font = '30px Georgia, "Songti SC", "Noto Serif SC", serif';
  ctx.fillText(`—— ${cleanFrom}`, W - 156, 1020);
  ctx.fillStyle = 'rgba(246, 226, 180, 0.58)';
  ctx.font = '21px Georgia, serif';
  ctx.fillText('SOLSTITIUM HIEMALE · CHRISTMAS MMXXVI', W - 156, 1064);

  // 5. Bottom Embossed Crimson Wax Seal
  ctx.save();
  ctx.translate(W * 0.5, 1185);
  const wax = ctx.createRadialGradient(-18, -20, 8, 0, 0, 68);
  wax.addColorStop(0, '#cf3d42');
  wax.addColorStop(0.55, '#8c1a22');
  wax.addColorStop(1, '#47090e');
  ctx.fillStyle = wax;
  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = gold;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = gold;
  ctx.textAlign = 'center';
  ctx.font = '24px Georgia, serif';
  ctx.fillText('NOEL · IV', 0, 8);
  ctx.restore();
}

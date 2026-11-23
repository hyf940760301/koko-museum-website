// Finale (Act V): "The Grand Carousel Quartet & Bespoke Keepsake Card Atelier" (平安夜四重奏 · V2 Director's Cut)
// Craftsmanship highlights:
// - Alternating 8-segment Royal Burgundy & Forest Emerald velvet crown dome with scalloped gold valances,
//   16 spectral dichroic crystal teardrops, 4 Baroque double-strand twisted-rope brass columns,
//   and an 8-facet beveled antique mirror central column!
// - Clicking any of the 4 miniature Act tributes smoothly transitions back to inspect that Act!
// - 4 Museum-Grade 1080x1350 Gilded Keepsake Card Paper Themes:
//   1) 'burgundy' (勃艮第火漆红金)  2) 'pine' (松林冷压棉纸绿金)
//   3) 'horologium' (午夜天文深蓝鎏金) 4) 'aurora' (极夜琉璃幻彩紫银)

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  mergeGeometries,
  transformGeo,
  createGearGeometry,
  createFacetedStarGeometry,
  createCrystalPrismGeometry,
  createRoundedBlockGeometry,
  createTwistedColumnGeometry,
  createDichroicPrismMaterial,
  injectAnisotropicBrass,
} from './physics.js';
import { CuratedMacroRig } from './camera_rig.js';

export function createFinaleCarousel({ envMap, textures, refractTex, audio, onOpenCardStudio, onSelectAct }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x09070b);
  scene.environment = envMap;

  const cameraRig = new CuratedMacroRig(
    new THREE.Vector3(0, 2.75, 8.95),
    new THREE.Vector3(0, 1.85, 0),
    { parallaxX: 0.85, parallaxY: 0.46, minZoom: 0.58, maxZoom: 1.18 }
  );

  scene.add(new THREE.AmbientLight(0x3a2c3b, 0.92));

  const keyLight = new THREE.DirectionalLight(0xffe5b8, 2.55);
  keyLight.position.set(5.5, 9.5, 6.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.camera.left = -5.5;
  keyLight.shadow.camera.right = 5.5;
  keyLight.shadow.camera.top = 6.5;
  keyLight.shadow.camera.bottom = -2.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.radius = 3.2;
  scene.add(keyLight);

  const rimCyan = new THREE.DirectionalLight(0x7be0ff, 1.35);
  rimCyan.position.set(-6.5, 5.5, -5.0);
  scene.add(rimCyan);

  const warmCore = new THREE.PointLight(0xffb457, 2.3, 10, 1.5);
  warmCore.position.set(0, 2.25, 0.4);
  scene.add(warmCore);

  // ---------------- Haute-Horlogerie & Royal Velvet Materials ----------------
  const matGold = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xf4cf80,
      roughnessMap: textures.brassTex,
      metalness: 0.96,
      roughness: 0.18,
      clearcoat: 0.35,
      envMapIntensity: 2.5,
    }),
    { anisoStrength: 0.42, patinaStrength: 0.20 }
  );

  const matAntiqueMirror = new THREE.MeshPhysicalMaterial({
    color: 0xfff5e4,
    metalness: 1.0,
    roughness: 0.04,
    clearcoat: 1.0,
    envMapIntensity: 2.8,
  });

  const matBurgundy = new THREE.MeshPhysicalMaterial({
    color: 0x5c131d,
    bumpMap: textures.paperTex,
    bumpScale: 0.014,
    roughness: 0.78,
    sheen: 0.95,
    sheenColor: new THREE.Color(0xffb8b8),
  });

  const matEmerald = new THREE.MeshPhysicalMaterial({
    color: 0x184836,
    bumpMap: textures.paperTex,
    bumpScale: 0.014,
    roughness: 0.78,
    sheen: 0.88,
    sheenColor: new THREE.Color(0x9effd6),
  });

  const matIvory = new THREE.MeshPhysicalMaterial({
    color: 0xfbf5e8,
    bumpMap: textures.clayBump,
    bumpScale: 0.01,
    roughness: 0.42,
    clearcoat: 0.55,
  });

  const matCrystal = createDichroicPrismMaterial(refractTex, {
    tint: 0xdffbff,
    emissive: 0x266580,
    emissiveIntensity: 0.42,
    dispersion: 0.030,
  });

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(22, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x0e0a0d,
      roughness: 0.18,
      metalness: 0.42,
      clearcoat: 0.88,
      envMapIntensity: 1.85,
    })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  // ---------------- Grand Rotating Royal Carousel Pavilion ----------------
  const carousel = new THREE.Group();
  scene.add(carousel);

  const refractMeshes = [];
  const carouselGoldParts = [
    transformGeo(new THREE.CylinderGeometry(2.88, 3.08, 0.28, 64), { y: 0.14 }),
    transformGeo(new THREE.TorusGeometry(2.58, 0.075, 14, 64), { y: 3.45, rx: Math.PI * 0.5 }),
  ];

  // 8-Facet Beveled Antique Mirror Central Column!
  const mirrorColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 3.15, 8), matAntiqueMirror);
  mirrorColumn.position.y = 1.95;
  carousel.add(mirrorColumn);

  const velvetDeck = new THREE.Mesh(new THREE.CylinderGeometry(2.70, 2.76, 0.18, 64), matBurgundy);
  velvetDeck.position.y = 0.34;
  velvetDeck.receiveShadow = true;
  carousel.add(velvetDeck);

  // 8-Segment Alternating Burgundy & Emerald Velvet Royal Dome + Scalloped Gold Valances!
  const domeBurgundyParts = [];
  const domeEmeraldParts = [];
  const segArc = (Math.PI * 2) / 8;
  for (let s = 0; s < 8; s++) {
    const startA = s * segArc;
    const wedge = transformGeo(new THREE.ConeGeometry(2.64, 1.08, 12, 1, false, startA, segArc), { y: 3.99 });
    if (s % 2 === 0) domeBurgundyParts.push(wedge);
    else domeEmeraldParts.push(wedge);

    // Scalloped Baroque valance swag along cornice!
    const midA = startA + segArc * 0.5;
    carouselGoldParts.push(
      transformGeo(new THREE.TorusGeometry(0.48, 0.025, 8, 18, Math.PI), {
        x: Math.cos(midA) * 2.56,
        y: 3.42,
        z: Math.sin(midA) * 2.56,
        ry: -midA + Math.PI * 0.5,
        rz: Math.PI,
      })
    );
  }
  carousel.add(new THREE.Mesh(mergeGeometries(domeBurgundyParts), matBurgundy));
  carousel.add(new THREE.Mesh(mergeGeometries(domeEmeraldParts), matEmerald));

  const crownGear = new THREE.Mesh(
    createGearGeometry({ teeth: 28, outerRadius: 1.48, innerRadius: 1.24, thickness: 0.08, spokes: 6 }),
    matGold
  );
  crownGear.rotation.x = Math.PI * 0.5;
  crownGear.position.y = 3.42;

  const apexStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.54, innerRadius: 0.19, depth: 0.15 }),
    matGold
  );
  apexStar.position.y = 4.82;
  carousel.add(crownGear, apexStar);

  // 16 Hanging Crystal & Gold Teardrops
  const crystalDropParts = [];
  for (let b = 0; b < 16; b++) {
    const ba = (b / 16) * Math.PI * 2;
    const dropGeo = transformGeo(
      createCrystalPrismGeometry({ sides: 6, radius: 0.058, height: 0.24, waist: 0.2 }),
      { x: Math.cos(ba) * 2.58, y: 3.24, z: Math.sin(ba) * 2.58 }
    );
    if (b % 2 === 0) crystalDropParts.push(dropGeo);
    else carouselGoldParts.push(dropGeo);
  }

  // 4 Baroque Double-Strand Twisted Rope Brass Columns!
  const twistedColGeo = createTwistedColumnGeometry({ radius: 0.052, height: 3.05, turns: 5.5 });
  for (let q = 0; q < 4; q++) {
    const pa = (q / 4) * Math.PI * 2 + Math.PI * 0.25;
    carouselGoldParts.push(
      transformGeo(twistedColGeo.clone(), {
        x: Math.cos(pa) * 2.42,
        y: 1.92,
        z: Math.sin(pa) * 2.42,
      })
    );
    // Vertical brass guide rod for each bobbing tribute stage
    const sa = (q / 4) * Math.PI * 2;
    carouselGoldParts.push(
      transformGeo(new THREE.CylinderGeometry(0.022, 0.022, 3.02, 10), {
        x: Math.cos(sa) * 1.68,
        y: 1.92,
        z: Math.sin(sa) * 1.68,
      })
    );
  }
  twistedColGeo.dispose();

  const carouselGoldMesh = new THREE.Mesh(mergeGeometries(carouselGoldParts), matGold);
  carouselGoldMesh.castShadow = true;
  carousel.add(carouselGoldMesh);

  const dropCrystalMesh = new THREE.Mesh(mergeGeometries(crystalDropParts), matCrystal);
  carousel.add(dropCrystalMesh);
  refractMeshes.push(dropCrystalMesh);

  const interactables = [];

  // ---------------- 4 Miniature Tributes from Acts I–IV ----------------
  const tributes = [];
  const tributeLabels = [
    '双击回访第一幕 · 松林星夜书',
    '双击回访第二幕 · 姜饼奇遇屋',
    '双击回访第三幕 · 午夜天文钟',
    '双击回访第四幕 · 北极星圣殿',
  ];

  for (let q = 0; q < 4; q++) {
    const a = (q / 4) * Math.PI * 2;
    const stage = new THREE.Group();
    stage.position.set(Math.cos(a) * 1.68, 0.45, Math.sin(a) * 1.68);
    stage.rotation.y = -a + Math.PI * 0.5;
    carousel.add(stage);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.62, 0.12, 32), matGold);
    plinth.position.y = 0.06;
    stage.add(plinth);

    const fig = new THREE.Group();
    fig.position.y = 0.14;
    stage.add(fig);

    if (q === 0) {
      const emParts = [];
      const gdParts = [transformGeo(createFacetedStarGeometry({ points: 6, outerRadius: 0.18, innerRadius: 0.07, depth: 0.05 }), { y: 1.16 })];
      for (let t = 0; t < 3; t++) {
        emParts.push(transformGeo(new THREE.ConeGeometry(0.42 - t * 0.09, 0.48, 6), { y: 0.28 + t * 0.28 }));
        gdParts.push(transformGeo(new THREE.TorusGeometry(0.39 - t * 0.09, 0.016, 8, 24), { y: 0.06 + t * 0.28, rx: Math.PI * 0.5 }));
      }
      fig.add(new THREE.Mesh(mergeGeometries(emParts), matEmerald), new THREE.Mesh(mergeGeometries(gdParts), matGold));
    } else if (q === 1) {
      fig.add(
        new THREE.Mesh(
          mergeGeometries([
            transformGeo(createRoundedBlockGeometry(0.46, 0.48, 0.42, 0.04, 0.02), { x: -0.14, y: 0.24, z: -0.06 }),
            transformGeo(new THREE.TorusGeometry(0.12, 0.032, 8, 18), { x: 0.22, y: 0.36, z: 0.14, rx: Math.PI * 0.5 }),
          ]),
          matBurgundy
        ),
        new THREE.Mesh(
          mergeGeometries([
            transformGeo(new THREE.ConeGeometry(0.38, 0.34, 4), { x: -0.14, y: 0.62, z: -0.06, ry: Math.PI * 0.25 }),
            transformGeo(new THREE.SphereGeometry(0.20, 16, 14), { x: 0.22, y: 0.20, z: 0.14 }),
            transformGeo(new THREE.SphereGeometry(0.14, 16, 14), { x: 0.22, y: 0.47, z: 0.14 }),
          ]),
          matIvory
        ),
        new THREE.Mesh(transformGeo(new THREE.CylinderGeometry(0.11, 0.11, 0.20, 14), { x: 0.22, y: 0.68, z: 0.14 }), matEmerald)
      );
    } else if (q === 2) {
      const locoRed = mergeGeometries([
        transformGeo(new THREE.CylinderGeometry(0.16, 0.16, 0.56, 18), { x: 0.06, y: 0.28, rz: Math.PI * 0.5 }),
        transformGeo(createRoundedBlockGeometry(0.30, 0.38, 0.34, 0.03, 0.02), { x: -0.22, y: 0.34 }),
      ]);
      const locoGoldParts = [
        transformGeo(new THREE.BoxGeometry(0.34, 0.04, 0.38), { x: -0.22, y: 0.54 }),
        transformGeo(new THREE.CylinderGeometry(0.075, 0.052, 0.24, 14), { x: 0.22, y: 0.50 }),
      ];
      for (let w = -1; w <= 1; w++) {
        for (const sz of [-0.18, 0.18]) {
          locoGoldParts.push(transformGeo(new THREE.CylinderGeometry(0.095, 0.095, 0.035, 14), { x: w * 0.20, y: 0.10, z: sz, rx: Math.PI * 0.5 }));
        }
      }
      fig.add(new THREE.Mesh(locoRed, matBurgundy), new THREE.Mesh(mergeGeometries(locoGoldParts), matGold));
    } else {
      const crParts = [];
      for (let k = 0; k < 7; k++) {
        const ka = (k / 6) * Math.PI * 2;
        crParts.push(
          transformGeo(
            createCrystalPrismGeometry({ sides: 6, radius: k === 0 ? 0.15 : 0.105, height: k === 0 ? 1.22 : 0.76, waist: 0.2 }),
            {
              x: k === 0 ? 0 : Math.cos(ka) * 0.24,
              y: k === 0 ? 0.62 : 0.38,
              z: k === 0 ? 0 : Math.sin(ka) * 0.24,
              rx: k === 0 ? 0 : Math.sin(ka) * 0.22,
              rz: k === 0 ? 0 : -Math.cos(ka) * 0.22,
            }
          )
        );
      }
      const crCluster = new THREE.Mesh(mergeGeometries(crParts), matCrystal);
      refractMeshes.push(crCluster);
      fig.add(
        crCluster,
        new THREE.Mesh(transformGeo(new THREE.TorusGeometry(0.38, 0.014, 8, 28), { y: 0.72, rx: 0.45 }), matGold)
      );
    }

    const tribHit = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 1.35, 14), new THREE.MeshBasicMaterial({ visible: false }));
    tribHit.position.y = 0.65;
    tribHit.userData = { kind: 'tribute', actTarget: q + 1, label: `${tributeLabels[q]}（左右拖动可旋转走马灯）` };
    fig.add(tribHit);
    interactables.push(tribHit);
    tributes.push(fig);
  }

  // Floating Gilded Keepsake Envelope Plaque
  const cardPlaque = new THREE.Group();
  cardPlaque.position.set(0, 1.85, 2.38);
  scene.add(cardPlaque);

  const envMesh = new THREE.Mesh(createRoundedBlockGeometry(0.92, 0.64, 0.06, 0.04, 0.015), matBurgundy);
  const envGoldMesh = new THREE.Mesh(
    mergeGeometries([
      transformGeo(createRoundedBlockGeometry(0.96, 0.68, 0.04, 0.04, 0.012), { z: -0.01 }),
      transformGeo(new THREE.CylinderGeometry(0.115, 0.115, 0.032, 24), { z: 0.036, rx: Math.PI * 0.5 }),
    ]),
    matGold
  );
  cardPlaque.add(envMesh, envGoldMesh);

  const cardHit = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.95, 0.45), new THREE.MeshBasicMaterial({ visible: false }));
  cardHit.userData = { kind: 'open_card', label: '点击开启烫金圣诞礼笺工坊 · 4 款馆藏纸张主题定制保存' };
  cardPlaque.add(cardHit);
  interactables.push(cardHit);

  const carouselHit = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 3.8, 24), new THREE.MeshBasicMaterial({ visible: false }));
  carouselHit.position.y = 1.9;
  carouselHit.userData = { kind: 'spin_carousel', label: '左右拖动旋转皇家八音盒走马灯' };
  carousel.add(carouselHit);
  interactables.push(carouselHit);

  // Golden Celebration Snowfall
  const snowCount = 320;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 14;
    snowPos[i * 3 + 1] = Math.random() * 8;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
  scene.add(
    new THREE.Points(
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
    )
  );

  const spinVelSpring = new Spring1D(0.32, 40, 8);
  let spinAngle = 0;
  let dragging = false;
  let lastX = 0;
  let lastTapTime = 0;
  let lastTapAct = 0;

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind, actTarget } = hit.object.userData;
    if (kind === 'open_card') {
      audio.playWaxSealBreak();
      onOpenCardStudio();
      return true;
    }
    if (kind === 'tribute') {
      const now = performance.now();
      if (now - lastTapTime < 360 && lastTapAct === actTarget && onSelectAct) {
        onSelectAct(actTarget);
        return true;
      }
      lastTapTime = now;
      lastTapAct = actTarget;
      dragging = true;
      lastX = pointerNDC.x;
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
    matCrystal.uniforms.uTime.value = t;

    for (let i = 0; i < tributes.length; i++) {
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

    cameraRig.update(dt, parallax);
  }

  function applyCamera(camera) {
    cameraRig.apply(camera);
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
    defaultHint: '左右拨动八瓣皇冠走马灯 · 双击微缩展台回访剧幕 · 点击前方烫金信笺定制贺卡',
    transTint: new THREE.Color(0xf8d78c),
    cameraRig,
    getProgress: () => ({ current: 4, total: 4 }),
    getPostOpts: () => ({
      bloomStrength: 0.50,
      bloomThreshold: 0.80,
      starburst: 0.52,
      focusDist: cameraRig.getFocusDistance(),
      aperture: 0.46,
      aoStrength: 0.72,
      aoRadius: 0.34,
      refractMeshes,
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

// ---------------- 4 Bespoke Museum-Grade 1080x1350 Gilded Keepsake Card Themes ----------------
export const CARD_THEMES = {
  burgundy: {
    name: '勃艮第火漆',
    bgStops: ['#3d131c', '#220b10', '#110608'],
    foilStops: ['#f9e7bc', '#d6a856', '#f7dfaa', '#9f732d'],
    textMain: '#f8f0e2',
    textSub: 'rgba(247, 226, 182, 0.76)',
    sealStops: ['#d13b3b', '#8d1921', '#46080f'],
  },
  pine: {
    name: '松林棉纸绿',
    bgStops: ['#1c3f31', '#10271e', '#08140f'],
    foilStops: ['#faecc8', '#dbb265', '#f8e4b4', '#9e7632'],
    textMain: '#f6f2e6',
    textSub: 'rgba(232, 244, 226, 0.76)',
    sealStops: ['#d99b38', '#9c6417', '#4f3008'],
  },
  horologium: {
    name: '午夜天文蓝',
    bgStops: ['#182b52', '#0d1832', '#060b19'],
    foilStops: ['#fbe9be', '#d8a650', '#ffe3a8', '#986924'],
    textMain: '#f2f5fc',
    textSub: 'rgba(220, 232, 255, 0.78)',
    sealStops: ['#b86b35', '#7d3f18', '#3d1c08'],
  },
  aurora: {
    name: '极夜琉璃紫',
    bgStops: ['#241b4a', '#111836', '#070b1a'],
    foilStops: ['#e4fff7', '#9ad8ff', '#e5c6ff', '#7498c8'],
    textMain: '#f4faff',
    textSub: 'rgba(205, 245, 255, 0.80)',
    sealStops: ['#3ec8b8', '#1d7588', '#0c3547'],
  },
};

export function renderKeepsakeCard(canvas, { to, message, from, theme = 'burgundy' }) {
  const pal = CARD_THEMES[theme] || CARD_THEMES.burgundy;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const bg = ctx.createRadialGradient(W * 0.5, H * 0.38, 60, W * 0.5, H * 0.5, H * 0.78);
  bg.addColorStop(0, pal.bgStops[0]);
  bg.addColorStop(0.58, pal.bgStops[1]);
  bg.addColorStop(1, pal.bgStops[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Cold-pressed paper grain
  ctx.fillStyle = 'rgba(255, 245, 225, 0.024)';
  for (let i = 0; i < 1800; i++) {
    const gx = (Math.sin(i * 91.7) * 0.5 + 0.5) * W;
    const gy = (Math.cos(i * 47.3) * 0.5 + 0.5) * H;
    ctx.fillRect(gx, gy, 2, 2);
  }

  const foil = ctx.createLinearGradient(0, 0, W, H);
  foil.addColorStop(0, pal.foilStops[0]);
  foil.addColorStop(0.35, pal.foilStops[1]);
  foil.addColorStop(0.68, pal.foilStops[2]);
  foil.addColorStop(1, pal.foilStops[3]);

  // Double architectural foil borders + inner hairline + Baroque scroll corners
  ctx.strokeStyle = foil;
  ctx.lineWidth = 3.2;
  ctx.strokeRect(54, 54, W - 108, H - 108);
  ctx.lineWidth = 1.2;
  ctx.strokeRect(72, 72, W - 144, H - 144);

  // Theme-specific subtle geometric watermark behind emblem
  ctx.save();
  ctx.translate(W * 0.5, 275);
  ctx.strokeStyle = foil;
  ctx.globalAlpha = 0.16;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 145, 0, Math.PI * 2);
  ctx.stroke();
  if (theme === 'horologium') {
    for (let k = 0; k < 24; k++) {
      const a = (k / 24) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 130, Math.sin(a) * 130);
      ctx.lineTo(Math.cos(a) * 145, Math.sin(a) * 145);
      ctx.stroke();
    }
  } else if (theme === 'aurora') {
    ctx.rotate(Math.PI / 4);
    ctx.strokeRect(-102, -102, 204, 204);
  }
  ctx.restore();

  const drawCorner = (cx, cy, sx, sy) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = foil;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, 76);
    ctx.bezierCurveTo(0, 24, 24, 0, 76, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(14, 48);
    ctx.quadraticCurveTo(14, 14, 48, 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(28, 28, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = foil;
    ctx.fill();
    ctx.restore();
  };
  drawCorner(72, 72, 1, 1);
  drawCorner(W - 72, 72, -1, 1);
  drawCorner(72, H - 72, 1, -1);
  drawCorner(W - 72, H - 72, -1, -1);

  // Top Polaris Star Crest
  ctx.save();
  ctx.translate(W * 0.5, 268);
  ctx.strokeStyle = foil;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(0, 0, 96, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = foil;
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 - Math.PI * 0.5;
    const r = i % 2 === 0 ? (i % 4 === 0 ? 78 : 48) : 18;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = foil;
  ctx.textAlign = 'center';
  ctx.font = '500 22px Georgia, "Songti SC", serif';
  ctx.fillText('N O E L  ·  I V   ｜   W I N T E R   Q U A R T E T', W * 0.5, 424);

  ctx.font = '400 18px Georgia, "Songti SC", serif';
  ctx.fillStyle = pal.textSub;
  ctx.fillText('I · 烫金纸雕    II · 定格黏土    III · 发条雪球    IV · 极光琉璃', W * 0.5, 464);

  ctx.strokeStyle = 'rgba(244, 223, 174, 0.34)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(220, 506);
  ctx.lineTo(W - 220, 506);
  ctx.stroke();

  const cleanTo = (to || '亲爱的朋友').trim();
  ctx.textAlign = 'left';
  ctx.fillStyle = foil;
  ctx.font = '600 36px "Songti SC", "Noto Serif SC", Georgia, serif';
  ctx.fillText(`致 ${cleanTo}：`, 156, 594);

  const cleanMsg = (message || '愿冬夜四重奏的烛光、银铃、八音盒与极光伴你温暖过冬。圣诞快乐。').trim();
  ctx.fillStyle = pal.textMain;
  ctx.font = '400 33px "Songti SC", "Noto Serif SC", Georgia, serif';

  const maxWidth = W - 312;
  const lineHeight = 60;
  let line = '';
  let y = 682;
  for (let i = 0; i < cleanMsg.length; i++) {
    const ch = cleanMsg[i];
    if (ch === '\n') {
      ctx.fillText(line, 156, y);
      line = '';
      y += lineHeight;
      continue;
    }
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, 156, y);
      line = ch;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, 156, y);

  const cleanFrom = (from || '冬夜寄信人').trim();
  ctx.textAlign = 'right';
  ctx.fillStyle = foil;
  ctx.font = '500 31px "Songti SC", "Noto Serif SC", Georgia, serif';
  ctx.fillText(`—— ${cleanFrom}`, W - 156, 1020);
  ctx.font = '400 20px Georgia, serif';
  ctx.fillStyle = pal.textSub;
  ctx.fillText('SOLSTITIUM · DECEMBER · MMXXVI', W - 156, 1060);

  // Embossed Wax Seal at bottom center
  const sealX = W * 0.5;
  const sealY = 1178;
  const waxGrad = ctx.createRadialGradient(sealX - 18, sealY - 18, 8, sealX, sealY, 68);
  waxGrad.addColorStop(0, pal.sealStops[0]);
  waxGrad.addColorStop(0.58, pal.sealStops[1]);
  waxGrad.addColorStop(1, pal.sealStops[2]);
  ctx.fillStyle = waxGrad;
  ctx.beginPath();
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const wobble = 64 + Math.sin(a * 5) * 3.5 + Math.cos(a * 3) * 2.5;
    const px = sealX + Math.cos(a) * wobble;
    const py = sealY + Math.sin(a) * wobble;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = foil;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = foil;
  ctx.textAlign = 'center';
  ctx.font = '600 26px Georgia, serif';
  ctx.fillText('IV', sealX, sealY + 9);
}

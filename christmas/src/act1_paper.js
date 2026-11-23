// Act I: Gilded Pop-up Paper Diorama — "The Pinewood Starlight Book" (松林星夜书 · V2 Director's Cut)
// Craftsmanship highlights:
// - 24-sheet deckle-edge paper stack, brass Baroque book corners, velvet swallowtail ribbon bookmark,
//   and real folding V-gusset accordion pleats driven by bookOpenSpring.
// - 3-tier Gothic rose-window cathedral with pierced 8-petal tracery & swinging miniature brass bell.
// - Cubic-Bezier filigree leaping reindeer with 3D cross-slotted 5-point antlers & curled-runner sleigh.
// - French-polished walnut study desk dressed with a dripping-wax brass candlestick (dual-temp swaying
//   flame + Tyndall warm light shaft), antique feather letter opener, pinecones & holly berries.
// - Paper subsurface scattering (SSS) & static geometry batching (<38 DrawCalls).

import * as THREE from '../vendor/three.module.js';
import {
  Spring1D,
  clamp,
  lerp,
  mergeGeometries,
  transformGeo,
  batchStaticMeshes,
  collapseSolidMeshes,
  createFacetedStarGeometry,
  createVolumetricShaftMaterial,
  createCandleFlameMaterial,
  injectPaperSubsurface,
  injectAnisotropicBrass,
} from './physics.js';
import { CuratedMacroRig } from './camera_rig.js';

const _v3 = new THREE.Vector3();

function extrudeCard(shape, depth = 0.028, bevel = 0.005, curveSegments = 18) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments,
  });
}

// Serrated V-fold origami pine half-wing with pierced starlight eyelets
function makePineWingShape(w, h, tiers = 5) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(w * 0.14, 0);
  s.lineTo(w * 0.14, h * 0.10);
  for (let i = 0; i < tiers; i++) {
    const t0 = i / tiers;
    const t1 = (i + 1) / tiers;
    const yBase = h * (0.10 + t0 * 0.84);
    const yTop = h * (0.10 + t1 * 0.90);
    const outerW = w * (1 - t0 * 0.70);
    const innerW = w * (1 - t1 * 0.74) * 0.38;
    s.quadraticCurveTo(outerW * 0.7, yBase - 0.03 * h, outerW, yBase);
    if (i < tiers - 1) {
      s.quadraticCurveTo(outerW * 0.65, yTop * 0.92, innerW, yTop * 0.95);
    } else {
      s.quadraticCurveTo(outerW * 0.42, h * 0.94, 0, h);
    }
  }
  s.closePath();

  // Delicate pierced filigree diamond cutouts along the fold crease
  for (let k = 0; k < 2; k++) {
    const cy = h * (0.34 + k * 0.28);
    const cw = w * (0.14 - k * 0.03);
    const hole = new THREE.Path();
    hole.moveTo(w * 0.08, cy);
    hole.lineTo(w * 0.08 + cw, cy + cw * 1.3);
    hole.lineTo(w * 0.08 + cw * 1.9, cy);
    hole.lineTo(w * 0.08 + cw, cy - cw * 1.3);
    hole.closePath();
    s.holes.push(hole);
  }
  return s;
}

// High-order Cubic-Bezier Baroque Leaping Reindeer with pierced scroll cutout
function makeBezierReindeerShape(sc = 1) {
  const s = new THREE.Shape();
  s.moveTo(-0.56 * sc, -0.08 * sc);
  // Hindquarters & extended leaping hind leg
  s.bezierCurveTo(-0.74 * sc, -0.22 * sc, -0.88 * sc, -0.44 * sc, -0.84 * sc, -0.52 * sc);
  s.bezierCurveTo(-0.78 * sc, -0.54 * sc, -0.62 * sc, -0.32 * sc, -0.44 * sc, -0.18 * sc);
  // Sweeping ribcage & tucked forelegs
  s.bezierCurveTo(-0.18 * sc, -0.22 * sc, 0.16 * sc, -0.18 * sc, 0.36 * sc, -0.12 * sc);
  s.bezierCurveTo(0.54 * sc, -0.28 * sc, 0.72 * sc, -0.44 * sc, 0.78 * sc, -0.38 * sc);
  s.bezierCurveTo(0.76 * sc, -0.30 * sc, 0.56 * sc, -0.14 * sc, 0.44 * sc, 0.02 * sc);
  // Proudly arched swan neck & muzzle
  s.bezierCurveTo(0.52 * sc, 0.22 * sc, 0.58 * sc, 0.36 * sc, 0.74 * sc, 0.38 * sc);
  s.bezierCurveTo(0.78 * sc, 0.44 * sc, 0.66 * sc, 0.50 * sc, 0.50 * sc, 0.48 * sc);
  // Ear & back of neck
  s.bezierCurveTo(0.42 * sc, 0.56 * sc, 0.32 * sc, 0.54 * sc, 0.36 * sc, 0.42 * sc);
  s.bezierCurveTo(0.30 * sc, 0.24 * sc, 0.18 * sc, 0.12 * sc, -0.06 * sc, 0.12 * sc);
  // Back & uplifted tail
  s.bezierCurveTo(-0.32 * sc, 0.12 * sc, -0.52 * sc, 0.20 * sc, -0.64 * sc, 0.26 * sc);
  s.bezierCurveTo(-0.68 * sc, 0.18 * sc, -0.62 * sc, 0.04 * sc, -0.56 * sc, -0.08 * sc);
  s.closePath();

  // Pierced filigree teardrop cutout inside torso
  const filigree = new THREE.Path();
  filigree.absellipse(-0.04 * sc, -0.02 * sc, 0.18 * sc, 0.075 * sc, 0, Math.PI * 2, true, 0.12);
  s.holes.push(filigree);
  return s;
}

// 5-Point Branched Coral Antler Crown (slotted cross-plane origami!)
function makeAntlerCrownShape(sc = 1) {
  const s = new THREE.Shape();
  s.moveTo(-0.03 * sc, 0);
  s.bezierCurveTo(-0.18 * sc, 0.14 * sc, -0.28 * sc, 0.32 * sc, -0.22 * sc, 0.48 * sc);
  s.lineTo(-0.16 * sc, 0.44 * sc);
  s.lineTo(-0.12 * sc, 0.30 * sc);
  s.lineTo(-0.04 * sc, 0.46 * sc);
  s.lineTo(0.02 * sc, 0.44 * sc);
  s.lineTo(0.02 * sc, 0.24 * sc);
  s.lineTo(0.14 * sc, 0.38 * sc);
  s.lineTo(0.19 * sc, 0.34 * sc);
  s.bezierCurveTo(0.14 * sc, 0.18 * sc, 0.08 * sc, 0.08 * sc, 0.03 * sc, 0);
  s.closePath();
  return s;
}

// Baroque Filigree Sleigh with Curled Swan-Neck Runners
function makeBaroqueSleighShape(sc = 1) {
  const s = new THREE.Shape();
  s.moveTo(-0.92 * sc, -0.18 * sc);
  s.bezierCurveTo(-1.06 * sc, 0.18 * sc, -0.88 * sc, 0.48 * sc, -0.56 * sc, 0.44 * sc);
  s.bezierCurveTo(-0.34 * sc, 0.40 * sc, -0.24 * sc, 0.22 * sc, 0.04 * sc, 0.22 * sc);
  s.bezierCurveTo(0.32 * sc, 0.22 * sc, 0.56 * sc, 0.38 * sc, 0.78 * sc, 0.34 * sc);
  // Swan-neck curled front scroll
  s.bezierCurveTo(0.98 * sc, 0.30 * sc, 1.04 * sc, 0.02 * sc, 0.86 * sc, -0.18 * sc);
  s.lineTo(-0.92 * sc, -0.18 * sc);
  s.closePath();

  const cut1 = new THREE.Path();
  cut1.absarc(-0.46 * sc, 0.12 * sc, 0.11 * sc, 0, Math.PI * 2, true);
  const cut2 = new THREE.Path();
  cut2.absarc(0.38 * sc, 0.08 * sc, 0.09 * sc, 0, Math.PI * 2, true);
  s.holes.push(cut1, cut2);
  return s;
}

export function createAct1Paper({ envMap, textures, audio, onAwaken, onHint }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0809);
  scene.environment = envMap;

  const cameraRig = new CuratedMacroRig(
    new THREE.Vector3(0, 4.25, 9.05),
    new THREE.Vector3(0, 1.58, -0.30),
    { parallaxX: 0.78, parallaxY: 0.45, minZoom: 0.56, maxZoom: 1.18 }
  );

  // ---------------- Lighting ----------------
  scene.add(new THREE.AmbientLight(0x2b3452, 0.82));

  const keyLight = new THREE.DirectionalLight(0xffe2b0, 2.55);
  keyLight.position.set(5.6, 9.6, 6.4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -7.6;
  keyLight.shadow.camera.right = 7.6;
  keyLight.shadow.camera.top = 7.4;
  keyLight.shadow.camera.bottom = -4.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.radius = 3.2;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x6e95ff, 1.18);
  rimLight.position.set(-6.5, 6.2, -5.5);
  scene.add(rimLight);

  const villageCandlePos = new THREE.Vector3(0, 1.35, -0.15);
  const villageCandleLight = new THREE.PointLight(0xffa63f, 1.35, 9.8, 1.6);
  villageCandleLight.position.copy(villageCandlePos);
  scene.add(villageCandleLight);

  // Desk candlestick warm point light on left foreground
  const deskCandleLight = new THREE.PointLight(0xff9e38, 1.55, 8.2, 1.7);
  deskCandleLight.position.set(-3.85, 1.42, 2.38);
  scene.add(deskCandleLight);

  // ---------------- Bespoke Micro-Surface Materials ----------------
  const makePaperMat = (hex, rough = 0.84, sss = 0.42) => {
    const m = new THREE.MeshStandardMaterial({
      color: hex,
      map: textures.paperTex,
      bumpMap: textures.paperTex,
      bumpScale: 0.018,
      roughness: rough,
      metalness: 0.02,
      envMapIntensity: 0.68,
    });
    return injectPaperSubsurface(m, { lightPos: villageCandlePos, strength: sss });
  };

  const matCream = makePaperMat(0xf6eddc, 0.83, 0.48);
  const matIvorySnow = makePaperMat(0xfcf8f0, 0.79, 0.44);
  const matPineDark = makePaperMat(0x163428, 0.85, 0.30);
  const matPineMid = makePaperMat(0x234b3a, 0.84, 0.34);
  const matBurgundy = makePaperMat(0x471019, 0.75, 0.22);
  const matNavyArch = makePaperMat(0x111e3b, 0.82, 0.25);

  const matWalnut = new THREE.MeshPhysicalMaterial({
    map: textures.walnutTex,
    bumpMap: textures.walnutTex,
    bumpScale: 0.008,
    roughness: 0.42,
    metalness: 0.04,
    clearcoat: 0.38,
    clearcoatRoughness: 0.28,
    envMapIntensity: 0.95,
  });

  const matGoldFoil = injectAnisotropicBrass(
    new THREE.MeshPhysicalMaterial({
      color: 0xf4d386,
      roughnessMap: textures.brassTex,
      metalness: 0.96,
      roughness: 0.19,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      envMapIntensity: 2.45,
    }),
    { anisoStrength: 0.42, patinaStrength: 0.18 }
  );

  const matWaxIvory = new THREE.MeshPhysicalMaterial({
    color: 0xf7eed8,
    roughness: 0.34,
    clearcoat: 0.45,
    sheen: 0.4,
    sheenColor: new THREE.Color(0xffd699),
  });

  const matVellumWindow = new THREE.MeshStandardMaterial({
    color: 0xffe6ad,
    emissive: new THREE.Color(0xff9c34),
    emissiveIntensity: 0.85,
    roughness: 0.38,
  });

  // ---------------- French-Polished Walnut Study Desk & Foreground Still-Life Props ----------------
  const desk = new THREE.Mesh(new THREE.PlaneGeometry(36, 26), matWalnut);
  desk.rotation.x = -Math.PI * 0.5;
  desk.position.y = -0.18;
  desk.receiveShadow = true;
  scene.add(desk);

  // Left-Foreground Brass Candlestick + Dripping Wax Tears + Flickering Flame + Tyndall Ray!
  const candleRig = new THREE.Group();
  candleRig.position.set(-3.85, -0.18, 2.38);
  scene.add(candleRig);

  const holderProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.58, 0.0),
    new THREE.Vector2(0.55, 0.06),
    new THREE.Vector2(0.38, 0.12),
    new THREE.Vector2(0.14, 0.22),
    new THREE.Vector2(0.22, 0.46),
    new THREE.Vector2(0.11, 0.72),
    new THREE.Vector2(0.34, 0.80),
    new THREE.Vector2(0.36, 0.86),
    new THREE.Vector2(0.19, 0.86),
    new THREE.Vector2(0.19, 0.78),
  ];
  const holderBrassGeos = [new THREE.LatheGeometry(holderProfile, 36)];
  // Finger ring handle on candlestick
  holderBrassGeos.push(transformGeo(new THREE.TorusGeometry(0.18, 0.024, 10, 24), { x: -0.44, y: 0.22 }));
  // Right-side antique feather brass letter opener on desk!
  holderBrassGeos.push(transformGeo(new THREE.ConeGeometry(0.065, 1.35, 4), { x: 11.15, y: 0.03, z: 0.2, rz: Math.PI * 0.5, ry: 0.38, sy: 1, sz: 0.28 }));
  holderBrassGeos.push(transformGeo(new THREE.TorusGeometry(0.11, 0.022, 8, 20), { x: 11.82, y: 0.04, z: -0.06, rx: Math.PI * 0.5 }));
  const deskBrassMesh = new THREE.Mesh(mergeGeometries(holderBrassGeos), matGoldFoil);
  deskBrassMesh.castShadow = true;
  deskBrassMesh.receiveShadow = true;
  candleRig.add(deskBrassMesh);

  // Wax pillar + frozen dripping wax tears down the side
  const waxParts = [transformGeo(new THREE.CylinderGeometry(0.165, 0.175, 0.68, 24), { y: 1.14 })];
  for (let d = 0; d < 5; d++) {
    const da = d * 1.25 + 0.4;
    const len = 0.16 + (d % 3) * 0.11;
    waxParts.push(
      transformGeo(new THREE.CapsuleGeometry(0.022, len, 6, 10), {
        x: Math.cos(da) * 0.168,
        y: 1.42 - len * 0.5,
        z: Math.sin(da) * 0.168,
      })
    );
  }
  const waxMesh = new THREE.Mesh(mergeGeometries(waxParts), matWaxIvory);
  waxMesh.castShadow = true;
  candleRig.add(waxMesh);

  const candleFlameMat = createCandleFlameMaterial();
  const flameGeo = new THREE.ConeGeometry(0.068, 0.28, 16, 10);
  flameGeo.translate(0, 0.14, 0);
  const candleFlame = new THREE.Mesh(flameGeo, candleFlameMat);
  candleFlame.position.y = 1.49;
  candleRig.add(candleFlame);

  // Right-Rear Pinecones, Spruce Sprigs & Red Holly Berries on Desk (batched into 2 meshes!)
  const hollyGreenParts = [];
  const hollyRedParts = [];
  for (let s = 0; s < 7; s++) {
    const a = -0.5 + s * 0.24;
    hollyGreenParts.push(
      transformGeo(new THREE.ConeGeometry(0.14, 0.55, 5), {
        x: 5.55 + Math.cos(a) * 0.35,
        y: -0.13,
        z: -2.15 + Math.sin(a) * 0.35,
        rx: Math.PI * 0.48,
        ry: a,
        sz: 0.22,
      })
    );
  }
  for (let b = 0; b < 6; b++) {
    hollyRedParts.push(
      transformGeo(new THREE.SphereGeometry(0.055, 10, 8), {
        x: 5.45 + (b % 3) * 0.13,
        y: -0.11,
        z: -2.05 + Math.floor(b / 3) * 0.14,
      })
    );
  }
  scene.add(new THREE.Mesh(mergeGeometries(hollyGreenParts), matPineDark));
  scene.add(new THREE.Mesh(mergeGeometries(hollyRedParts), matBurgundy));

  // Volumetric Tyndall Candlelight Ray slanting gently across the pop-up forest!
  const shaftMat = createVolumetricShaftMaterial({ color: 0xffca7a, opacity: 0.095, power: 2.3 });
  const shaftCone = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 2.65, 8.2, 24, 1, true), shaftMat);
  shaftCone.position.set(-1.6, 2.85, 0.65);
  shaftCone.rotation.z = -0.58;
  shaftCone.rotation.x = 0.18;
  scene.add(shaftCone);

  // ---------------- Hardcover Spread, 24-Sheet Deckle Stack, Brass Corners & Bookmark ----------------
  const bookRoot = new THREE.Group();
  scene.add(bookRoot);

  const bookOpenSpring = new Spring1D(0.18, 52, 11);
  bookOpenSpring.target = 1.0;

  const coverW = 5.45, coverD = 6.85, coverT = 0.09;
  const burgundyBookParts = [
    transformGeo(new THREE.BoxGeometry(coverW, coverT, coverD), { x: -coverW * 0.5 - 0.04, y: -0.11 }),
    transformGeo(new THREE.BoxGeometry(coverW, coverT, coverD), { x: coverW * 0.5 + 0.04, y: -0.11 }),
    transformGeo(new THREE.CylinderGeometry(0.15, 0.15, coverD, 16, 1, false, 0, Math.PI), { y: -0.09, rx: Math.PI * 0.5, rz: Math.PI }),
  ];
  // Velvet swallowtail ribbon bookmark draping gracefully over front book edge onto the desk
  const ribbonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.02, 1.2),
    new THREE.Vector3(0.18, 0.03, 3.22),
    new THREE.Vector3(0.32, -0.15, 3.68),
    new THREE.Vector3(0.46, -0.165, 4.35),
  ]);
  burgundyBookParts.push(new THREE.TubeGeometry(ribbonCurve, 28, 0.055, 6, false));
  const bookCoverMesh = new THREE.Mesh(mergeGeometries(burgundyBookParts), matBurgundy);
  bookCoverMesh.receiveShadow = true;
  bookCoverMesh.castShadow = true;
  bookRoot.add(bookCoverMesh);

  // 24-layer deckle-edge paper block + page spread batched into 1 Cream Mesh!
  const creamBookParts = [];
  for (let s = 0; s < 12; s++) {
    const t = s / 11;
    const inset = t * 0.11 + (s % 2) * 0.014; // organic handmade deckle step!
    const yLvl = -0.065 + t * 0.085;
    creamBookParts.push(
      transformGeo(new THREE.BoxGeometry(10.42 - inset * 2, 0.008, 6.46 - inset * 1.4), { y: yLvl })
    );
  }
  const pageArch = new THREE.Shape();
  pageArch.moveTo(-5.12, 0.01);
  pageArch.quadraticCurveTo(-2.5, 0.10, 0, 0.005);
  pageArch.quadraticCurveTo(2.5, 0.10, 5.12, 0.01);
  pageArch.lineTo(5.12, -0.03);
  pageArch.lineTo(-5.12, -0.03);
  pageArch.closePath();
  const topSpreadGeo = new THREE.ExtrudeGeometry(pageArch, { depth: 6.32, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, steps: 1 });
  topSpreadGeo.center();
  transformGeo(topSpreadGeo, { y: 0.025 });
  creamBookParts.push(topSpreadGeo);

  const pageStackMesh = new THREE.Mesh(mergeGeometries(creamBookParts), matCream);
  pageStackMesh.receiveShadow = true;
  pageStackMesh.castShadow = true;
  bookRoot.add(pageStackMesh);

  // Brass Baroque book corners + inlaid gold foil margin rules + ribbon tassel (1 batched Gold Mesh!)
  const staticGoldBookParts = [
    transformGeo(new THREE.BoxGeometry(9.8, 0.008, 0.035), { y: 0.056, z: -2.92 }),
    transformGeo(new THREE.BoxGeometry(9.8, 0.008, 0.035), { y: 0.056, z: 2.92 }),
    transformGeo(new THREE.BoxGeometry(0.035, 0.008, 5.88), { x: -4.9, y: 0.056 }),
    transformGeo(new THREE.BoxGeometry(0.035, 0.008, 5.88), { x: 4.9, y: 0.056 }),
    // Ribbon gold tassel end
    transformGeo(createFacetedStarGeometry({ points: 4, outerRadius: 0.11, innerRadius: 0.045, depth: 0.02 }), { x: 0.46, y: -0.155, z: 4.42, rx: Math.PI * 0.5 }),
  ];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const cornerTri = new THREE.Shape();
      cornerTri.moveTo(0, 0);
      cornerTri.lineTo(0.42, 0);
      cornerTri.quadraticCurveTo(0.18, 0.18, 0, 0.42);
      cornerTri.closePath();
      const hole = new THREE.Path();
      hole.absarc(0.12, 0.12, 0.05, 0, Math.PI * 2, true);
      cornerTri.holes.push(hole);
      const cg = extrudeCard(cornerTri, 0.025, 0.004, 8);
      cg.rotateX(-Math.PI * 0.5);
      transformGeo(cg, {
        x: sx * 5.48,
        y: -0.05,
        z: sz * 3.41,
        ry: (sx < 0 ? (sz < 0 ? 0 : Math.PI * 0.5) : (sz < 0 ? -Math.PI * 0.5 : Math.PI)),
      });
      staticGoldBookParts.push(cg);
    }
  }
  bookRoot.add(new THREE.Mesh(mergeGeometries(staticGoldBookParts), matGoldFoil));

  // ---------------- Pop-up Stage + Accordion V-Gusset Folding Supports ----------------
  const popupGroup = new THREE.Group();
  popupGroup.position.y = 0.04;
  bookRoot.add(popupGroup);

  // V-fold paper engineering accordion gussets on left & right flanks
  const gussetParts = [];
  for (const sx of [-1, 1]) {
    for (let p = 0; p < 3; p++) {
      const zOff = -1.8 + p * 1.45;
      gussetParts.push(
        transformGeo(new THREE.BoxGeometry(0.55, 0.014, 0.42), {
          x: sx * 4.25,
          y: 0.18,
          z: zOff,
          rz: sx * 0.48,
        }),
        transformGeo(new THREE.BoxGeometry(0.55, 0.014, 0.42), {
          x: sx * 4.25,
          y: 0.42,
          z: zOff,
          rz: -sx * 0.48,
        })
      );
    }
  }
  popupGroup.add(new THREE.Mesh(mergeGeometries(gussetParts), matCream));

  const interactables = [];

  // ---------------- Layer 6: Celestial Proscenium Arch & Rotatable Volvelle ----------------
  const archShape = new THREE.Shape();
  archShape.moveTo(-4.45, 0);
  archShape.lineTo(-4.45, 2.85);
  archShape.bezierCurveTo(-4.45, 4.95, -1.6, 5.28, 0, 5.32);
  archShape.bezierCurveTo(1.6, 5.28, 4.45, 4.95, 4.45, 2.85);
  archShape.lineTo(4.45, 0);
  archShape.closePath();

  const volHole = new THREE.Path();
  volHole.absarc(0, 3.35, 1.48, 0, Math.PI * 2, true);
  archShape.holes.push(volHole);
  // Pierced Gothic spandrel stars on upper corners of proscenium arch
  for (const sx of [-1, 1]) {
    const sp = new THREE.Path();
    sp.absarc(sx * 3.15, 3.55, 0.26, 0, Math.PI * 2, true);
    archShape.holes.push(sp);
  }

  const backArch = new THREE.Mesh(extrudeCard(archShape, 0.042, 0.008), matNavyArch);
  backArch.position.set(0, 0, -2.35);
  backArch.castShadow = true;
  backArch.receiveShadow = true;
  popupGroup.add(backArch);

  const volvelleGroup = new THREE.Group();
  volvelleGroup.position.set(0, 3.35, -2.44);
  popupGroup.add(volvelleGroup);

  const volDiscMat = new THREE.MeshStandardMaterial({
    map: textures.volvelleTex,
    roughness: 0.36,
    metalness: 0.42,
    envMapIntensity: 1.65,
  });
  const volDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.76, 1.76, 0.03, 64), volDiscMat);
  volDisc.rotation.x = Math.PI * 0.5;
  volvelleGroup.add(volDisc);

  const volTabsParts = [transformGeo(new THREE.SphereGeometry(0.09, 18, 14), { z: 0.03 })];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    volTabsParts.push(
      transformGeo(new THREE.CylinderGeometry(0.095, 0.095, 0.045, 14), {
        x: Math.cos(a) * 1.74,
        y: Math.sin(a) * 1.74,
        z: 0.01,
        rx: Math.PI * 0.5,
      })
    );
  }
  volvelleGroup.add(new THREE.Mesh(mergeGeometries(volTabsParts), matGoldFoil));
  volDisc.userData = { kind: 'volvelle', label: '拨动星象转盘 · 将北极星刻度转至正上方指针' };
  interactables.push(volDisc);

  // ---------------- Layer 5: Bezier Rolling Alpine Ridges & Pull-Tab Flying Sleigh ----------------
  const mtnShape = new THREE.Shape();
  mtnShape.moveTo(-4.35, 0);
  mtnShape.bezierCurveTo(-4.0, 1.4, -3.65, 2.45, -3.25, 2.42);
  mtnShape.bezierCurveTo(-2.85, 2.38, -2.55, 1.48, -2.15, 1.52);
  mtnShape.bezierCurveTo(-1.65, 1.58, -1.25, 2.95, -0.82, 2.92);
  mtnShape.bezierCurveTo(-0.38, 2.88, -0.05, 1.65, 0.42, 1.68);
  mtnShape.bezierCurveTo(0.95, 1.72, 1.45, 3.05, 1.92, 3.02);
  mtnShape.bezierCurveTo(2.42, 2.98, 2.85, 1.82, 3.28, 1.85);
  mtnShape.bezierCurveTo(3.68, 1.88, 4.05, 2.38, 4.35, 2.22);
  mtnShape.lineTo(4.35, 0);
  mtnShape.closePath();

  const mountains = new THREE.Mesh(extrudeCard(mtnShape, 0.032, 0.006, 22), matIvorySnow);
  mountains.position.set(0, 0, -1.78);
  mountains.castShadow = true;
  mountains.receiveShadow = true;
  popupGroup.add(mountains);

  // Flying Bezier Filigree Reindeer Sleigh + Golden Stardust Wake!
  const sleighPivot = new THREE.Group();
  sleighPivot.position.set(0, 0.6, -1.35);
  popupGroup.add(sleighPivot);

  const sleighCarriage = new THREE.Group();
  sleighPivot.add(sleighCarriage);

  const sleighMesh = new THREE.Mesh(extrudeCard(makeBaroqueSleighShape(0.56), 0.042, 0.007), matBurgundy);
  sleighCarriage.add(sleighMesh);

  const sleighGoldParts = [
    transformGeo(extrudeCard(makeBaroqueSleighShape(0.58), 0.018, 0.004), { z: -0.012 }),
    // Curled swan-neck metal runner blade underneath
    transformGeo(new THREE.TorusGeometry(0.16, 0.014, 8, 24, Math.PI * 1.25), { x: 0.48, y: -0.14, z: 0.02 }),
    transformGeo(new THREE.BoxGeometry(1.08, 0.018, 0.03), { x: -0.05, y: -0.22, z: 0.02 }),
    transformGeo(new THREE.BoxGeometry(0.22, 0.22, 0.18), { x: -0.16, y: 0.22, z: 0.02 }),
  ];
  const reinCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.38, 0.14, 0.02),
    new THREE.Vector3(1.28, -0.02, 0.04),
    new THREE.Vector3(2.28, 0.28, 0.02)
  );
  sleighGoldParts.push(new THREE.TubeGeometry(reinCurve, 24, 0.009, 6, false));
  sleighCarriage.add(new THREE.Mesh(mergeGeometries(sleighGoldParts), matGoldFoil));

  const reindeerMeshes = [];
  const deerBodyGeo = extrudeCard(makeBezierReindeerShape(0.48), 0.028, 0.005, 18);
  // Slotted 3D 5-point origami antler pair (crossed at +/-28 deg!)
  const antlerWingA = transformGeo(extrudeCard(makeAntlerCrownShape(0.46), 0.012, 0.002, 12), { x: 0.22, y: 0.22, z: 0.015, ry: 0.46 });
  const antlerWingB = transformGeo(extrudeCard(makeAntlerCrownShape(0.46), 0.012, 0.002, 12), { x: 0.22, y: 0.22, z: 0.015, ry: -0.46 });
  const antlerPairGeo = mergeGeometries([antlerWingA, antlerWingB], true);

  for (let r = 0; r < 3; r++) {
    const deerG = new THREE.Group();
    deerG.position.set(0.84 + r * 0.70, 0.06 + r * 0.05, 0);
    const body = new THREE.Mesh(deerBodyGeo, matCream);
    const antlers = new THREE.Mesh(antlerPairGeo, matGoldFoil);
    deerG.add(body, antlers);
    sleighCarriage.add(deerG);
    reindeerMeshes.push(deerG);
  }

  // Golden origami stardust wake trail behind the sleigh
  const wakeCount = 36;
  const wakeGeo = new THREE.BufferGeometry();
  const wakePos = new Float32Array(wakeCount * 3);
  for (let i = 0; i < wakeCount; i++) wakePos[i * 3 + 1] = -20;
  wakeGeo.setAttribute('position', new THREE.BufferAttribute(wakePos, 3));
  const wakePoints = new THREE.Points(
    wakeGeo,
    new THREE.PointsMaterial({
      map: textures.sparkTex,
      color: 0xffe49c,
      size: 0.24,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  popupGroup.add(wakePoints);
  let wakeHead = 0;

  // ---------------- Layer 4: 3-Tier Pierced Rose-Window Gothic Cathedral & Village Row ----------------
  const villageCreamParts = [];
  const villageGoldParts = [];
  const vellumParts = [];

  // Volvelle arch rim + top Polaris pointer batched into villageGoldParts
  villageGoldParts.push(transformGeo(new THREE.TorusGeometry(1.50, 0.032, 12, 64), { y: 3.35, z: -2.30 }));
  const ptrShape = new THREE.Shape();
  ptrShape.moveTo(0, -0.18); ptrShape.lineTo(-0.09, 0.06); ptrShape.lineTo(0.09, 0.06); ptrShape.closePath();
  villageGoldParts.push(transformGeo(extrudeCard(ptrShape, 0.02, 0.004, 6), { y: 4.86, z: -2.26 }));

  const addGothicHouseGeo = (x, z, w, h, roofH, isCathedral = false) => {
    const wallShape = new THREE.Shape();
    wallShape.moveTo(-w * 0.5, 0);
    wallShape.lineTo(-w * 0.5, h);
    if (isCathedral) {
      // Stepped belfry shoulders + soaring spire
      wallShape.lineTo(-w * 0.28, h + 0.22);
      wallShape.lineTo(-w * 0.28, h + 0.68);
      wallShape.lineTo(0, h + roofH);
      wallShape.lineTo(w * 0.28, h + 0.68);
      wallShape.lineTo(w * 0.28, h + 0.22);
    } else {
      wallShape.lineTo(0, h + roofH);
    }
    wallShape.lineTo(w * 0.5, h);
    wallShape.lineTo(w * 0.5, 0);
    wallShape.closePath();

    if (isCathedral) {
      // 1. Ground arched portal doorway
      const portal = new THREE.Path();
      portal.moveTo(-0.18, 0.06);
      portal.lineTo(-0.18, 0.42);
      portal.absarc(0, 0.42, 0.18, Math.PI, 0, true);
      portal.lineTo(0.18, 0.06);
      portal.closePath();
      wallShape.holes.push(portal);

      // 2. Real Pierced 8-Petal Gothic Rose Window!
      const roseY = 1.28;
      const centerEye = new THREE.Path();
      centerEye.absarc(0, roseY, 0.085, 0, Math.PI * 2, true);
      wallShape.holes.push(centerEye);
      for (let p = 0; p < 8; p++) {
        const pa = (p / 8) * Math.PI * 2;
        const pet = new THREE.Path();
        pet.absarc(Math.cos(pa) * 0.20, roseY + Math.sin(pa) * 0.20, 0.058, 0, Math.PI * 2, true);
        wallShape.holes.push(pet);
      }

      // 3. Pierced upper belfry arch (houses swinging golden bell!)
      const belfry = new THREE.Path();
      belfry.moveTo(-0.15, h + 0.18);
      belfry.lineTo(-0.15, h + 0.52);
      belfry.absarc(0, h + 0.52, 0.15, Math.PI, 0, true);
      belfry.lineTo(0.15, h + 0.18);
      belfry.closePath();
      wallShape.holes.push(belfry);

      vellumParts.push(transformGeo(new THREE.PlaneGeometry(0.72, 1.65), { x, y: 0.95, z: z - 0.01 }));

      // Flying buttress side wings
      for (const sx of [-1, 1]) {
        const but = new THREE.Shape();
        but.moveTo(0, 0);
        but.lineTo(sx * 0.34, 0);
        but.lineTo(sx * 0.12, h * 0.85);
        but.lineTo(0, h * 0.92);
        but.closePath();
        const bh = new THREE.Path();
        bh.absarc(sx * 0.14, h * 0.38, 0.065, 0, Math.PI * 2, true);
        but.holes.push(bh);
        villageCreamParts.push(transformGeo(extrudeCard(but, 0.026, 0.004, 10), { x: x + sx * w * 0.5, z }));
      }

      villageGoldParts.push(
        transformGeo(new THREE.RingGeometry(0.28, 0.32, 24), { x, y: roseY, z: z + 0.048 }),
        transformGeo(createFacetedStarGeometry({ points: 8, outerRadius: 0.20, innerRadius: 0.07, depth: 0.05 }), { x, y: h + roofH + 0.16, z: z + 0.02 })
      );
    } else {
      for (let cx = 0; cx < 2; cx++) {
        const wx = (cx - 0.5) * (w * 0.44);
        const wy = h * 0.44;
        const hole = new THREE.Path();
        hole.moveTo(wx - 0.12, wy - 0.14);
        hole.lineTo(wx - 0.12, wy + 0.06);
        hole.absarc(wx, wy + 0.06, 0.12, Math.PI, 0, true);
        hole.lineTo(wx + 0.12, wy - 0.14);
        hole.closePath();
        wallShape.holes.push(hole);
      }
      // Attic oculus window
      const attic = new THREE.Path();
      attic.absarc(0, h + roofH * 0.36, 0.085, 0, Math.PI * 2, true);
      wallShape.holes.push(attic);

      vellumParts.push(transformGeo(new THREE.PlaneGeometry(w * 0.78, h * 0.85), { x, y: h * 0.56, z: z - 0.01 }));

      const eaveL = Math.hypot(w * 0.54, roofH);
      const ang = Math.atan2(roofH, w * 0.5);
      for (const dir of [-1, 1]) {
        villageGoldParts.push(
          transformGeo(new THREE.BoxGeometry(eaveL, 0.042, 0.055), {
            x: x + dir * w * 0.26,
            y: h + roofH * 0.5 + 0.02,
            z: z + 0.02,
            rz: -dir * ang,
          })
        );
      }
    }

    villageCreamParts.push(transformGeo(extrudeCard(wallShape, 0.036, 0.007, 16), { x, z }));
  };

  addGothicHouseGeo(0, -0.65, 1.32, 1.98, 1.55, true);
  addGothicHouseGeo(-1.42, -0.42, 1.15, 1.16, 0.70, false);
  addGothicHouseGeo(1.44, -0.46, 1.18, 1.22, 0.72, false);
  addGothicHouseGeo(-2.55, -0.18, 0.96, 0.96, 0.58, false);
  addGothicHouseGeo(2.58, -0.22, 0.98, 1.02, 0.62, false);

  // Layer 3 Arched Paper Footbridge batched into villageCreamParts & villageGoldParts!
  const bridgeShape = new THREE.Shape();
  bridgeShape.moveTo(-1.48, 0);
  bridgeShape.quadraticCurveTo(0, 0.72, 1.48, 0);
  bridgeShape.lineTo(1.48, 0.24);
  bridgeShape.quadraticCurveTo(0, 0.96, -1.48, 0.24);
  bridgeShape.closePath();
  for (let b = -3; b <= 3; b++) {
    const bx = b * 0.34;
    const by = 0.52 - bx * bx * 0.22;
    const bal = new THREE.Path();
    bal.absarc(bx, by, 0.045, 0, Math.PI * 2, true);
    bridgeShape.holes.push(bal);
  }
  villageCreamParts.push(transformGeo(extrudeCard(bridgeShape, 0.032, 0.005, 18), { z: 1.05 }));
  villageGoldParts.push(transformGeo(new THREE.TorusGeometry(1.56, 0.015, 8, 32, Math.PI * 0.58), { y: -0.70, z: 1.09, rz: Math.PI * 0.21 }));

  const villageMesh = new THREE.Mesh(mergeGeometries(villageCreamParts), matCream);
  villageMesh.castShadow = true;
  villageMesh.receiveShadow = true;
  popupGroup.add(villageMesh);
  popupGroup.add(new THREE.Mesh(mergeGeometries(vellumParts), matVellumWindow));

  // Swinging miniature brass bell inside cathedral belfry!
  const belfryBell = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.16, 16), matGoldFoil);
  belfryBell.position.set(0, 2.42, -0.63);
  popupGroup.add(belfryBell);

  // Frozen specular stream
  const stream = new THREE.Mesh(
    new THREE.PlaneGeometry(3.25, 2.95),
    new THREE.MeshPhysicalMaterial({
      color: 0xd9ecff,
      roughness: 0.14,
      metalness: 0.12,
      clearcoat: 0.85,
      envMapIntensity: 1.95,
    })
  );
  stream.rotation.x = -Math.PI * 0.5;
  stream.position.set(0, 0.032, 1.15);
  popupGroup.add(stream);

  // ---------------- Layer 2 & 1: Batched 3D V-Fold Origami Pine Forest ----------------
  const darkPineParts = [];
  const midPineParts = [];
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
  for (const [px, pz, pw, ph, isDark, goldTrim] of pineSpecs) {
    const targetArr = isDark ? darkPineParts : midPineParts;
    targetArr.push(
      transformGeo(extrudeCard(makePineWingShape(pw, ph, 5), 0.022, 0.004, 10), { x: px, z: pz, ry: Math.PI - 0.52 }),
      transformGeo(extrudeCard(makePineWingShape(pw, ph, 5), 0.022, 0.004, 10), { x: px, z: pz, ry: 0.52 })
    );
    if (goldTrim) {
      villageGoldParts.push(
        transformGeo(extrudeCard(makePineWingShape(pw * 1.03, ph * 1.015, 5), 0.01, 0.003, 8), { x: px, z: pz - 0.015, ry: Math.PI - 0.55 }),
        transformGeo(extrudeCard(makePineWingShape(pw * 1.03, ph * 1.015, 5), 0.01, 0.003, 8), { x: px, z: pz - 0.015, ry: 0.55 })
      );
    }
  }

  const darkPinesMesh = new THREE.Mesh(mergeGeometries(darkPineParts), matPineDark);
  darkPinesMesh.castShadow = true;
  darkPinesMesh.receiveShadow = true;
  const midPinesMesh = new THREE.Mesh(mergeGeometries(midPineParts), matPineMid);
  midPinesMesh.castShadow = true;
  midPinesMesh.receiveShadow = true;
  const villageGoldMesh = new THREE.Mesh(mergeGeometries(villageGoldParts), matGoldFoil);
  popupGroup.add(darkPinesMesh, midPinesMesh, villageGoldMesh);

  // ---------------- Interactive Mechanism 1: Right-Side Gilded Pull-Tab ----------------
  const pullTabGroup = new THREE.Group();
  pullTabGroup.position.set(4.55, 0.075, 1.35);
  bookRoot.add(pullTabGroup);

  const tabStrip = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.024, 0.46), matBurgundy);
  tabStrip.castShadow = true;
  const tabGoldMesh = new THREE.Mesh(
    mergeGeometries([
      transformGeo(new THREE.BoxGeometry(1.68, 0.016, 0.50), { y: -0.005 }),
      transformGeo(new THREE.TorusGeometry(0.18, 0.028, 12, 32), { x: 0.92, rx: Math.PI * 0.5 }),
      transformGeo(createFacetedStarGeometry({ points: 4, outerRadius: 0.13, innerRadius: 0.05, depth: 0.02 }), { x: 0.42, y: 0.02, rx: Math.PI * 0.5 }),
    ]),
    matGoldFoil
  );
  // Subtle pulsing shimmer cue ring on pull-tab until pulled!
  const tabCueMat = new THREE.MeshBasicMaterial({ color: 0xffe49c, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending });
  const tabCueRing = new THREE.Mesh(new THREE.RingGeometry(0.20, 0.28, 32), tabCueMat);
  tabCueRing.rotation.x = -Math.PI * 0.5;
  tabCueRing.position.set(0.92, 0.025, 0);
  pullTabGroup.add(tabStrip, tabGoldMesh, tabCueRing);

  const tabHit = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.38, 0.88), new THREE.MeshBasicMaterial({ visible: false }));
  tabHit.position.set(0.3, 0.05, 0);
  tabHit.userData = { kind: 'pulltab', label: '向右拉动烫金纸拉条 · 放飞镂空跃鹿雪橇' };
  pullTabGroup.add(tabHit);
  interactables.push(tabHit);

  // ---------------- Interactive Mechanism 3: Three Hinged Lift-the-Flaps ----------------
  const flaps = [];
  const addLiftFlap = (x, y, z, label, charmColor) => {
    const wrap = new THREE.Group();
    wrap.position.set(x, y, z);
    popupGroup.add(wrap);

    const alcoveMat = new THREE.MeshStandardMaterial({
      color: 0xffefc2,
      emissive: new THREE.Color(charmColor),
      emissiveIntensity: 1.65,
      roughness: 0.3,
    });
    const alcoveGlow = new THREE.Mesh(new THREE.CircleGeometry(0.24, 24), alcoveMat);
    alcoveGlow.position.set(0.22, 0.24, -0.01);
    wrap.add(alcoveGlow);

    const charm = new THREE.Mesh(
      createFacetedStarGeometry({ points: 6, outerRadius: 0.15, innerRadius: 0.06, depth: 0.045 }),
      matGoldFoil
    );
    charm.position.set(0.22, 0.24, 0.02);
    charm.scale.setScalar(0.01);
    wrap.add(charm);

    const hinge = new THREE.Group();
    wrap.add(hinge);

    const doorShape = new THREE.Shape();
    doorShape.moveTo(0, 0);
    doorShape.lineTo(0, 0.34);
    doorShape.absarc(0.22, 0.34, 0.22, Math.PI, 0, true);
    doorShape.lineTo(0.44, 0);
    doorShape.closePath();

    const leaf = new THREE.Mesh(extrudeCard(doorShape, 0.022, 0.004, 12), matBurgundy);
    leaf.position.z = 0.025;
    leaf.castShadow = true;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), matGoldFoil);
    knob.position.set(0.36, 0.20, 0.055);
    hinge.add(leaf, knob);

    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.68, 0.32), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0.22, 0.26, 0.05);
    const flapObj = { open: false, spring: new Spring1D(0, 165, 14), hinge, charm, alcoveMat };
    hit.userData = { kind: 'flap', flapObj, label };
    wrap.add(hit);
    interactables.push(hit);
    flaps.push(flapObj);
  };

  addLiftFlap(-1.82, 0.02, 1.52, '掀开松林折页小门 · 藏着金箔星徽', 0xffaa3b);
  addLiftFlap(-0.22, 0.04, -0.58, '轻敲哥特钟楼拱门 · 点亮圣咏烛火', 0xffc455);
  addLiftFlap(1.48, 0.02, 1.48, '掀开溪畔雪屋折页 · 寻觅冬夜星光', 0xff9e40);

  // ---------------- Ambient Golden Paper Fireflies ----------------
  const dustCount = 48;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustPhase = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 9.5;
    dustPos[i * 3 + 1] = 0.35 + Math.random() * 4.4;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5.2;
    dustPhase[i] = Math.random() * Math.PI * 2;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        map: textures.sparkTex,
        color: 0xffe6a8,
        size: 0.22,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
  );

  // ---------------- Direct Manipulation State & Progress ----------------
  const pullSpring = new Spring1D(0.12, 125, 15);
  const volvelleSpring = new Spring1D(0.72, 115, 15);
  let lastRatchetStep = Math.round(0.72 / (Math.PI / 12));
  let activeDrag = null;
  let dragStartX = 0;
  let dragStartVal = 0;
  let volStartAngle = 0;

  let hasPulledSleigh = false;
  let hasAlignedStar = false;
  let openedFlapCount = 0;
  let awakened = false;

  const crownStar = new THREE.Mesh(
    createFacetedStarGeometry({ points: 8, outerRadius: 0.44, innerRadius: 0.16, depth: 0.12 }),
    matGoldFoil
  );
  crownStar.position.set(0, 5.58, -2.26);
  crownStar.scale.setScalar(0.001);
  popupGroup.add(crownStar);
  const crownSpring = new Spring1D(0, 140, 12);

  // Coalesce static paper & book components so Act I runs in ~24 main-pass DrawCalls (<45 budget)!
  const matPaperVC = makePaperMat(0xffffff, 0.80, 0.42);
  matPaperVC.vertexColors = true;
  for (const d of reindeerMeshes) collapseSolidMeshes(d, matPaperVC, [], textures.paperTex);
  for (const f of flaps) collapseSolidMeshes(f.hinge, matPaperVC, [], textures.paperTex);
  collapseSolidMeshes(sleighCarriage, matPaperVC, reindeerMeshes, textures.paperTex);
  collapseSolidMeshes(pullTabGroup, matPaperVC, [tabCueRing], textures.paperTex);
  collapseSolidMeshes(
    popupGroup,
    matPaperVC,
    [
      volvelleGroup,
      sleighPivot,
      belfryBell,
      crownStar,
      ...flaps.flatMap((f) => [f.hinge, f.charm]),
    ],
    textures.paperTex
  );
  batchStaticMeshes(popupGroup, [
    volvelleGroup,
    sleighPivot,
    belfryBell,
    crownStar,
    ...flaps.flatMap((f) => [f.hinge, f.charm]),
  ]);
  batchStaticMeshes(scene, [
    popupGroup,
    pullTabGroup,
    candleFlame,
    shaftCone,
  ]);

  function getProgress() {
    const done = (hasPulledSleigh ? 1 : 0) + (hasAlignedStar ? 1 : 0) + (openedFlapCount > 0 ? 1 : 0);
    return { current: done, total: 3 };
  }

  function checkAwaken() {
    if (awakened) return;
    if (getProgress().current >= 2 || openedFlapCount >= 2) {
      awakened = true;
      crownSpring.target = 1.0;
      cameraRig.focusOn(0, 1.35, -0.6, 0.82, 2.2);
      audio.playSigilAwaken();
      onAwaken(1, '第一声部已唤醒 · 烫金纸雕竖琴与钢片琴悠扬奏响');
      onHint('松林星夜书已点亮 · 可滚轮推近细赏镂空鹿角与蜡泪，或前往第二幕');
    }
  }

  function onPointerDown(hit, pointerNDC) {
    if (!hit) return false;
    const { kind, flapObj } = hit.object.userData;
    if (kind === 'pulltab') {
      activeDrag = 'pulltab';
      dragStartX = pointerNDC.x;
      dragStartVal = pullSpring.target;
      audio.playPaperFold(true);
      return true;
    }
    if (kind === 'volvelle') {
      activeDrag = 'volvelle';
      volStartAngle = Math.atan2(pointerNDC.y - 0.18, pointerNDC.x);
      dragStartVal = volvelleSpring.target;
      audio.playRatchetClick(0.7);
      return true;
    }
    if (kind === 'flap' && flapObj) {
      flapObj.open = !flapObj.open;
      flapObj.spring.target = flapObj.open ? 1 : 0;
      audio.playPaperFold(flapObj.open);
      if (flapObj.open) {
        openedFlapCount++;
        cameraRig.focusOn(hit.point.x * 0.25, 0.1, 0.2, 0.86, 1.5);
        checkAwaken();
      }
      return true;
    }
    return false;
  }

  function onPointerMove(pointerNDC) {
    if (!activeDrag) return false;
    if (activeDrag === 'pulltab') {
      const dx = (pointerNDC.x - dragStartX) * 2.35;
      const prev = pullSpring.target;
      const next = clamp(dragStartVal + dx, 0.0, 1.0);
      pullSpring.target = next;
      // Tactile paper-stop detent bump at full pull!
      if (next >= 0.98 && prev < 0.98) {
        pullSpring.impulse(1.8);
        audio.playRatchetClick(0.9);
      }
      if (next > 0.52 && !hasPulledSleigh) {
        hasPulledSleigh = true;
        audio.playBellChime(4);
        checkAwaken();
      }
      return true;
    }
    if (activeDrag === 'volvelle') {
      const curA = Math.atan2(pointerNDC.y - 0.18, pointerNDC.x);
      let delta = curA - volStartAngle;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      const nextVal = dragStartVal - delta * 1.4;
      volvelleSpring.target = nextVal;
      // 15-degree precision brass astrolabe detent tick!
      const stepIdx = Math.round(nextVal / (Math.PI / 12));
      if (stepIdx !== lastRatchetStep) {
        lastRatchetStep = stepIdx;
        audio.playRatchetClick(0.55);
      }
      const norm = ((nextVal % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if ((norm < 0.34 || norm > Math.PI * 2 - 0.34) && !hasAlignedStar) {
        hasAlignedStar = true;
        volvelleSpring.target = Math.round(nextVal / (Math.PI * 2)) * (Math.PI * 2);
        audio.playBellChime(6);
        checkAwaken();
      }
      return true;
    }
    return false;
  }

  function onPointerUp() {
    if (activeDrag === 'volvelle') {
      const step = Math.PI / 12;
      volvelleSpring.target = Math.round(volvelleSpring.target / step) * step;
    }
    activeDrag = null;
  }

  let prevSleighP = 0.12;
  function update(dt, t, parallax) {
    const unfold = bookOpenSpring.update(dt);
    popupGroup.scale.y = Math.max(0.05, unfold);

    candleFlameMat.uniforms.uTime.value = t;
    shaftMat.uniforms.uTime.value = t;
    deskCandleLight.intensity = 1.38 + Math.sin(t * 7.8) * 0.12 + Math.sin(t * 14.3) * 0.06;

    // Gentle shimmer cue on un-pulled pulltab every 4.5s
    const cuePulse = hasPulledSleigh ? 0 : Math.pow(Math.max(0, Math.sin(t * 1.6)), 4.0) * 0.65;
    tabCueMat.opacity = cuePulse;

    // Pull-tab & flying Bezier reindeer sleigh arc
    const p = pullSpring.update(dt);
    pullTabGroup.position.x = 4.45 + p * 0.98;

    const arcT = lerp(-0.82, 0.82, p);
    const sx = arcT * 2.65;
    const sy = 2.48 + (1 - arcT * arcT) * 1.18 + Math.sin(t * 2.2) * 0.05;
    sleighCarriage.position.set(sx, sy, 0);
    sleighCarriage.rotation.z = -arcT * 0.34;

    // Emit golden stardust wake particles when sleigh moves!
    if (Math.abs(p - prevSleighP) > 0.0025) {
      wakePos[wakeHead * 3] = sx - 0.55 + (Math.random() - 0.5) * 0.18;
      wakePos[wakeHead * 3 + 1] = sy + 0.45 + (Math.random() - 0.5) * 0.18;
      wakePos[wakeHead * 3 + 2] = -1.32 + (Math.random() - 0.5) * 0.12;
      wakeHead = (wakeHead + 1) % wakeCount;
    }
    prevSleighP = p;
    for (let i = 0; i < wakeCount; i++) {
      if (wakePos[i * 3 + 1] > -10) {
        wakePos[i * 3 + 1] -= dt * 0.28;
        if (wakePos[i * 3 + 1] < 0.2) wakePos[i * 3 + 1] = -20;
      }
    }
    wakeGeo.attributes.position.needsUpdate = true;

    for (let r = 0; r < reindeerMeshes.length; r++) {
      reindeerMeshes[r].position.y = 0.06 + r * 0.05 + Math.sin(t * 4.5 + r * 1.1 + p * 8) * 0.055;
      reindeerMeshes[r].rotation.z = Math.sin(t * 4.5 + r) * 0.07;
    }

    const vAng = volvelleSpring.update(dt);
    volDisc.rotation.y = vAng;
    belfryBell.rotation.z = Math.sin(t * 3.2) * (awakened ? 0.18 : 0.05);

    for (let i = 0; i < flaps.length; i++) {
      const f = flaps[i];
      const fv = f.spring.update(dt);
      f.hinge.rotation.y = -fv * 2.15;
      f.charm.scale.setScalar(Math.max(0.01, fv));
      f.charm.rotation.y = t * 1.6 + i;
      // Subtle glow breathe on unopened flaps
      f.alcoveMat.emissiveIntensity = f.open ? 2.1 : 1.35 + Math.sin(t * 2.4 + i) * 0.35;
    }

    const cs = crownSpring.update(dt);
    crownStar.scale.setScalar(Math.max(0.001, cs));
    crownStar.rotation.y = t * 0.9;

    const flicker = 0.88 + 0.12 * Math.sin(t * 6.3) * Math.cos(t * 10.7);
    villageCandleLight.intensity = (awakened ? 2.15 : 1.25) * flicker;
    matVellumWindow.emissiveIntensity = (awakened ? 1.35 : 0.82) * flicker;

    const dArr = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      dArr[i * 3 + 1] += dt * 0.14;
      dArr[i * 3] += Math.sin(t * 0.8 + dustPhase[i]) * dt * 0.08;
      if (dArr[i * 3 + 1] > 5.0) dArr[i * 3 + 1] = 0.25;
    }
    dustGeo.attributes.position.needsUpdate = true;

    cameraRig.update(dt, parallax);
  }

  function applyCamera(camera) {
    cameraRig.apply(camera);
  }

  function setCaptureState(preset) {
    bookOpenSpring.snap(1.0);
    if (preset === 'hero' || preset === 'climax') {
      pullSpring.snap(0.68);
      volvelleSpring.snap(0.0);
      flaps[0].open = true;
      flaps[0].spring.snap(1.0);
      awakened = true;
      crownSpring.snap(1.0);
    }
    update(0.016, 2.4, { x: 0.08, y: 0.04 });
  }

  return {
    id: 1,
    roman: 'ACT I',
    title: '松林星夜书',
    subtitle: '烫金立体折纸剧场 · GILDED POP-UP DIORAMA',
    defaultHint: '向右拉动纸拉条放飞雪橇 · 拨动星象盘 · 滚轮可推近细赏纸雕与烛台',
    transTint: new THREE.Color(0xffca7a),
    cameraRig,
    getProgress,
    getPostOpts: () => ({
      bloomStrength: 0.44,
      bloomThreshold: 0.82,
      starburst: 0.20,
      focusDist: cameraRig.getFocusDistance(),
      aperture: 0.50,
      aoStrength: 0.85,
      aoRadius: 0.36,
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

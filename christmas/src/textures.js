// Procedural micro-surface textures & studio HDR IBL environment baking (zero external assets)
import * as THREE from '../vendor/three.module.js';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

// Deterministic hash for clean repeatable procedural grain
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x, y, oct = 4) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * valueNoise(x * f, y * f);
    f *= 2.03;
    amp *= 0.5;
  }
  return v;
}

// Bake 4 bespoke HDR studio lighting environments using PMREMGenerator so brass, gold foil,
// royal icing and dichroic crystal catch silky studio softboxes & warm hearth bokeh
export function buildStudioEnvironments(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const bakeRig = (skyTop, skyBot, panels) => {
    const s = new THREE.Scene();
    // Gradient dome
    const domeGeo = new THREE.SphereGeometry(30, 32, 24);
    const pos = domeGeo.attributes.position;
    const cols = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(skyTop);
    const cBot = new THREE.Color(skyBot);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp(pos.getY(i) / 30 * 0.5 + 0.5, 0, 1);
      tmp.copy(cBot).lerp(cTop, Math.pow(t, 0.85));
      cols[i * 3] = tmp.r;
      cols[i * 3 + 1] = tmp.g;
      cols[i * 3 + 2] = tmp.b;
    }
    domeGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    const dome = new THREE.Mesh(
      domeGeo,
      new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, toneMapped: false })
    );
    s.add(dome);

    // Emissive HDR studio softboxes & specular accent orbs
    const createdMeshes = [];
    for (const p of panels) {
      const geo = p.sphere
        ? new THREE.SphereGeometry(p.r || 1.2, 16, 12)
        : new THREE.PlaneGeometry(p.w || 8, p.h || 5);
      const col = new THREE.Color(p.color).multiplyScalar(p.intensity || 4.0);
      const m = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, toneMapped: false })
      );
      m.position.set(p.x, p.y, p.z);
      m.lookAt(0, 0, 0);
      s.add(m);
      createdMeshes.push(m);
    }

    const rt = pmrem.fromScene(s, 0.025, 0.1, 60);
    domeGeo.dispose();
    dome.material.dispose();
    for (const m of createdMeshes) {
      m.geometry.dispose();
      m.material.dispose();
    }
    return rt.texture;
  };

  // Act I: Warm candlelight + Prussian midnight studio for champagne gold foil
  const envPaper = bakeRig(0x13203b, 0x1b100b, [
    { x: 9, y: 12, z: 10, w: 12, h: 7, color: 0xffe4b5, intensity: 4.5 },
    { x: -12, y: 8, z: 6, w: 10, h: 6, color: 0xffc778, intensity: 3.2 },
    { x: 0, y: 15, z: -10, w: 14, h: 5, color: 0x6c96ff, intensity: 2.2 },
    { sphere: true, x: 4, y: 4, z: 12, r: 1.4, color: 0xffdfa0, intensity: 6.5 },
  ]);

  // Act II: Wes Anderson tabletop softboxes for velvety clay, felt & glossy royal icing
  const envClay = bakeRig(0x302226, 0x1d120e, [
    { x: 0, y: 16, z: 8, w: 18, h: 10, color: 0xfff3e2, intensity: 3.6 },
    { x: -13, y: 6, z: 9, w: 9, h: 9, color: 0xffd1a6, intensity: 2.8 },
    { x: 13, y: 7, z: 8, w: 9, h: 9, color: 0xcce6ff, intensity: 2.3 },
    { sphere: true, x: -4, y: 2, z: 13, r: 1.5, color: 0xffa95c, intensity: 4.8 },
  ]);

  // Act III: High-contrast window arc + warm hearth embers for crystal snowglobe & brushed brass
  const envGlobe = bakeRig(0x0c182e, 0x1a0e08, [
    { x: -10, y: 11, z: 11, w: 6, h: 14, color: 0xd8ecff, intensity: 6.2 },
    { x: 11, y: 9, z: 10, w: 9, h: 7, color: 0xffcb80, intensity: 5.2 },
    { sphere: true, x: 6, y: -1, z: 13, r: 1.3, color: 0xff8c3b, intensity: 9.0 },
    { sphere: true, x: 9, y: 2, z: 11, r: 0.9, color: 0xffb95e, intensity: 8.5 },
    { sphere: true, x: -6, y: 14, z: -8, r: 2.0, color: 0x7eb6ff, intensity: 4.5 },
  ]);

  // Act IV: Polar aurora ribbons & crisp diamond pinlights for dichroic crystal prisms
  const envAurora = bakeRig(0x09162b, 0x050712, [
    { x: -9, y: 13, z: 8, w: 16, h: 5, color: 0x4effc8, intensity: 5.8 },
    { x: 10, y: 11, z: 7, w: 15, h: 5, color: 0xb678ff, intensity: 5.2 },
    { x: 0, y: 6, z: 14, w: 10, h: 4, color: 0xfff0cc, intensity: 4.6 },
    { sphere: true, x: -5, y: 8, z: 12, r: 1.0, color: 0xffffff, intensity: 10.0 },
    { sphere: true, x: 6, y: 4, z: 12, r: 1.0, color: 0x8cf6ff, intensity: 9.0 },
  ]);

  pmrem.dispose();
  return { envPaper, envClay, envGlobe, envAurora };
}

export function buildProceduralTextures() {
  // 1. Cold-pressed 300gsm watercolour cotton paper bump & warm grain
  const paperCanvas = makeCanvas(256, 256);
  const pCtx = paperCanvas.getContext('2d');
  const pImg = pCtx.createImageData(256, 256);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const n1 = fbm(x * 0.14, y * 0.14, 4);
      const fiber = valueNoise(x * 0.85, y * 0.22) * 0.3 + valueNoise(x * 0.22, y * 0.85) * 0.3;
      const v = Math.floor(THREE.MathUtils.clamp((n1 * 0.65 + fiber * 0.55) * 255, 0, 255));
      const idx = (y * 256 + x) * 4;
      pImg.data[idx] = 242 + ((v - 128) >> 3);
      pImg.data[idx + 1] = 235 + ((v - 128) >> 3);
      pImg.data[idx + 2] = 220 + ((v - 128) >> 3);
      pImg.data[idx + 3] = 255;
    }
  }
  pCtx.putImageData(pImg, 0, 0);
  const paperTex = new THREE.CanvasTexture(paperCanvas);
  paperTex.wrapS = paperTex.wrapT = THREE.RepeatWrapping;
  paperTex.repeat.set(3, 3);

  // 2. Sculpted polymer clay thumbprint & organic dimple bump map
  const clayCanvas = makeCanvas(256, 256);
  const cCtx = clayCanvas.getContext('2d');
  const cImg = cCtx.createImageData(256, 256);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const mound = fbm(x * 0.045, y * 0.045, 3);
      // subtle thumbprint ridges
      const ridge = Math.sin((x * 0.42 + y * 0.28) + mound * 6.5) * 0.5 + 0.5;
      const pore = hash2(x, y) * 0.15;
      const val = Math.floor((mound * 0.68 + ridge * 0.18 + pore) * 255);
      const idx = (y * 256 + x) * 4;
      cImg.data[idx] = val;
      cImg.data[idx + 1] = val;
      cImg.data[idx + 2] = val;
      cImg.data[idx + 3] = 255;
    }
  }
  cCtx.putImageData(cImg, 0, 0);
  const clayBump = new THREE.CanvasTexture(clayCanvas);
  clayBump.wrapS = clayBump.wrapT = THREE.RepeatWrapping;
  clayBump.repeat.set(2, 2);

  // 3. Radial brushed antique brass roughness/bump map
  const brassCanvas = makeCanvas(256, 256);
  const bCtx = brassCanvas.getContext('2d');
  const bImg = bCtx.createImageData(256, 256);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const dx = x - 128;
      const dy = y - 128;
      const r = Math.hypot(dx, dy);
      const ang = Math.atan2(dy, dx);
      const groove = Math.sin(r * 2.6 + valueNoise(ang * 8, r * 0.1) * 2.0) * 0.5 + 0.5;
      const patina = fbm(x * 0.05, y * 0.05, 3);
      const val = Math.floor((groove * 0.45 + patina * 0.55) * 255);
      const idx = (y * 256 + x) * 4;
      bImg.data[idx] = val;
      bImg.data[idx + 1] = val;
      bImg.data[idx + 2] = val;
      bImg.data[idx + 3] = 255;
    }
  }
  bCtx.putImageData(bImg, 0, 0);
  const brassTex = new THREE.CanvasTexture(brassCanvas);
  brassTex.wrapS = brassTex.wrapT = THREE.RepeatWrapping;

  // 4. Crisp 6-branch dendritic snowflake sprite
  const snowCanvas = makeCanvas(128, 128);
  const sCtx = snowCanvas.getContext('2d');
  sCtx.clearRect(0, 0, 128, 128);
  sCtx.translate(64, 64);
  const sGrad = sCtx.createRadialGradient(0, 0, 2, 0, 0, 58);
  sGrad.addColorStop(0, 'rgba(255,255,255,1)');
  sGrad.addColorStop(0.55, 'rgba(245,250,255,0.85)');
  sGrad.addColorStop(1, 'rgba(220,240,255,0)');
  sCtx.strokeStyle = sGrad;
  sCtx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    sCtx.save();
    sCtx.rotate((i * Math.PI) / 3);
    sCtx.lineWidth = 3.2;
    sCtx.beginPath();
    sCtx.moveTo(0, 0);
    sCtx.lineTo(0, -52);
    sCtx.stroke();
    sCtx.lineWidth = 2.0;
    for (const d of [18, 32, 43]) {
      const len = (56 - d) * 0.48;
      sCtx.beginPath();
      sCtx.moveTo(-len * 0.75, -d - len * 0.65);
      sCtx.lineTo(0, -d);
      sCtx.lineTo(len * 0.75, -d - len * 0.65);
      sCtx.stroke();
    }
    sCtx.restore();
  }
  const snowflakeTex = new THREE.CanvasTexture(snowCanvas);

  // 5. Soft diamond starlight / firefly glow sprite
  const glowCanvas = makeCanvas(128, 128);
  const gCtx = glowCanvas.getContext('2d');
  const gGrad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 62);
  gGrad.addColorStop(0, 'rgba(255,252,240,1)');
  gGrad.addColorStop(0.22, 'rgba(255,232,175,0.72)');
  gGrad.addColorStop(0.6, 'rgba(255,198,110,0.16)');
  gGrad.addColorStop(1, 'rgba(255,180,90,0)');
  gCtx.fillStyle = gGrad;
  gCtx.fillRect(0, 0, 128, 128);
  // Crisp 4-point cross flare inside sprite
  gCtx.fillStyle = 'rgba(255,252,240,0.85)';
  gCtx.beginPath();
  gCtx.moveTo(64, 6);
  gCtx.quadraticCurveTo(66, 60, 122, 64);
  gCtx.quadraticCurveTo(66, 68, 64, 122);
  gCtx.quadraticCurveTo(62, 68, 6, 64);
  gCtx.quadraticCurveTo(62, 60, 64, 6);
  gCtx.fill();
  const sparkTex = new THREE.CanvasTexture(glowCanvas);

  // 6. Gilded Celestial Volvelle (Astrolabe Star Disc) for Act I Pop-up Book
  const volCanvas = makeCanvas(512, 512);
  const vCtx = volCanvas.getContext('2d');
  vCtx.translate(256, 256);
  // Deep midnight indigo paper disc
  const vBg = vCtx.createRadialGradient(0, 0, 18, 0, 0, 246);
  vBg.addColorStop(0, '#1e3058');
  vBg.addColorStop(0.7, '#121d38');
  vBg.addColorStop(1, '#0b1224');
  vCtx.fillStyle = vBg;
  vCtx.beginPath();
  vCtx.arc(0, 0, 246, 0, Math.PI * 2);
  vCtx.fill();

  // Concentric gold foil rings & 24 astronomical degree ticks
  vCtx.strokeStyle = '#f2d594';
  for (const [r, w] of [[242, 3.5], [228, 1.2], [186, 1.8], [128, 1.0], [54, 1.4]]) {
    vCtx.lineWidth = w;
    vCtx.beginPath();
    vCtx.arc(0, 0, r, 0, Math.PI * 2);
    vCtx.stroke();
  }
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r0 = i % 2 === 0 ? 186 : 206;
    vCtx.lineWidth = i % 6 === 0 ? 2.4 : 1.1;
    vCtx.beginPath();
    vCtx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    vCtx.lineTo(Math.cos(a) * 228, Math.sin(a) * 228);
    vCtx.stroke();
  }
  // Constellation lines & golden stars + North Star marker at top (angle -PI/2)
  vCtx.strokeStyle = 'rgba(242,213,148,0.52)';
  vCtx.lineWidth = 1.2;
  const constel = [
    [[0, -156], [36, -138], [62, -102], [28, -82]],
    [[-140, -52], [-108, -96], [-64, -84], [-82, -38]],
    [[-92, 118], [-42, 146], [18, 134], [54, 96]],
    [[138, 42], [156, 92], [112, 126]],
  ];
  for (const poly of constel) {
    vCtx.beginPath();
    poly.forEach(([px, py], idx) => (idx === 0 ? vCtx.moveTo(px, py) : vCtx.lineTo(px, py)));
    vCtx.stroke();
    for (const [px, py] of poly) {
      vCtx.fillStyle = '#fff3d1';
      vCtx.beginPath();
      vCtx.arc(px, py, 3.6, 0, Math.PI * 2);
      vCtx.fill();
    }
  }
  // Prominent Polaris star at 12 o'clock
  vCtx.fillStyle = '#fff8e3';
  vCtx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? 24 : 7;
    const x = Math.cos(a) * rad;
    const y = -156 + Math.sin(a) * rad;
    if (i === 0) vCtx.moveTo(x, y);
    else vCtx.lineTo(x, y);
  }
  vCtx.closePath();
  vCtx.fill();

  const volvelleTex = new THREE.CanvasTexture(volCanvas);
  volvelleTex.colorSpace = THREE.SRGBColorSpace;

  // 7. Candy cane diagonal stripe texture for Act II Rube Goldberg track & poles
  const candyCanvas = makeCanvas(128, 128);
  const cdCtx = candyCanvas.getContext('2d');
  cdCtx.fillStyle = '#fbf5ea';
  cdCtx.fillRect(0, 0, 128, 128);
  cdCtx.strokeStyle = '#c8343a';
  cdCtx.lineWidth = 22;
  for (let i = -128; i < 256; i += 48) {
    cdCtx.beginPath();
    cdCtx.moveTo(i, 0);
    cdCtx.lineTo(i + 128, 128);
    cdCtx.stroke();
  }
  const candyStripeTex = new THREE.CanvasTexture(candyCanvas);
  candyStripeTex.wrapS = candyStripeTex.wrapT = THREE.RepeatWrapping;
  candyStripeTex.colorSpace = THREE.SRGBColorSpace;

  return {
    paperTex,
    clayBump,
    brassTex,
    snowflakeTex,
    sparkTex,
    volvelleTex,
    candyStripeTex,
  };
}

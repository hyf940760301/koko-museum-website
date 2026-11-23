// High-resolution (512–1024px) procedural micro-surface textures with 8x Anisotropic Filtering
// & bespoke HDR studio IBL environment baking (zero external image files).
import * as THREE from '../vendor/three.module.js';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

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

export function buildStudioEnvironments(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const bakeRig = (skyTop, skyBot, panels) => {
    const s = new THREE.Scene();
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

    const rt = pmrem.fromScene(s, 0.02, 0.1, 60);
    domeGeo.dispose();
    dome.material.dispose();
    for (const m of createdMeshes) {
      m.geometry.dispose();
      m.material.dispose();
    }
    return rt.texture;
  };

  const envPaper = bakeRig(0x13203b, 0x1b100b, [
    { x: 9, y: 12, z: 10, w: 12, h: 7, color: 0xffe4b5, intensity: 4.8 },
    { x: -12, y: 8, z: 6, w: 10, h: 6, color: 0xffc778, intensity: 3.4 },
    { x: 0, y: 15, z: -10, w: 14, h: 5, color: 0x6c96ff, intensity: 2.3 },
    { sphere: true, x: -4.8, y: 2.5, z: 8, r: 1.2, color: 0xffb85c, intensity: 7.2 },
  ]);

  const envClay = bakeRig(0x302226, 0x1d120e, [
    { x: 0, y: 16, z: 8, w: 18, h: 10, color: 0xfff3e2, intensity: 3.8 },
    { x: -13, y: 6, z: 9, w: 9, h: 9, color: 0xffd1a6, intensity: 3.0 },
    { x: 13, y: 7, z: 8, w: 9, h: 9, color: 0xcce6ff, intensity: 2.4 },
    { sphere: true, x: -4, y: 2, z: 13, r: 1.5, color: 0xffa95c, intensity: 5.2 },
  ]);

  const envGlobe = bakeRig(0x0c182e, 0x1a0e08, [
    { x: -10, y: 11, z: 11, w: 6, h: 14, color: 0xd8ecff, intensity: 6.5 },
    { x: 11, y: 9, z: 10, w: 9, h: 7, color: 0xffcb80, intensity: 5.5 },
    { sphere: true, x: 6, y: -1, z: 13, r: 1.3, color: 0xff8c3b, intensity: 9.2 },
    { sphere: true, x: 9, y: 2, z: 11, r: 0.9, color: 0xffb95e, intensity: 8.5 },
    { sphere: true, x: -6, y: 14, z: -8, r: 2.0, color: 0x7eb6ff, intensity: 4.6 },
  ]);

  const envAurora = bakeRig(0x09162b, 0x050712, [
    { x: -9, y: 13, z: 8, w: 16, h: 5, color: 0x4effc8, intensity: 6.0 },
    { x: 10, y: 11, z: 7, w: 15, h: 5, color: 0xb678ff, intensity: 5.4 },
    { x: 0, y: 6, z: 14, w: 10, h: 4, color: 0xfff0cc, intensity: 4.8 },
    { sphere: true, x: -5, y: 8, z: 12, r: 1.0, color: 0xffffff, intensity: 10.5 },
    { sphere: true, x: 6, y: 4, z: 12, r: 1.0, color: 0x8cf6ff, intensity: 9.2 },
  ]);

  pmrem.dispose();
  return { envPaper, envClay, envGlobe, envAurora };
}

export function buildProceduralTextures(renderer) {
  const maxAniso = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy() || 4) : 4;
  const prepTex = (tex, repeatX = 1, repeatY = 1) => {
    tex.anisotropy = maxAniso;
    if (repeatX !== 1 || repeatY !== 1) {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
    }
    return tex;
  };

  // 1. 512x512 Cold-pressed 300gsm watercolour cotton paper (crisp under 0.56x macro zoom)
  const S = 512;
  const paperCanvas = makeCanvas(S, S);
  const pCtx = paperCanvas.getContext('2d');
  const pImg = pCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const n1 = fbm(x * 0.09, y * 0.09, 4);
      const fiber = valueNoise(x * 0.68, y * 0.16) * 0.32 + valueNoise(x * 0.16, y * 0.68) * 0.32;
      const dimple = Math.pow(valueNoise(x * 0.24, y * 0.24), 2.0) * 0.22;
      const v = Math.floor(THREE.MathUtils.clamp((n1 * 0.55 + fiber * 0.45 + dimple) * 255, 0, 255));
      const idx = (y * S + x) * 4;
      pImg.data[idx] = 244 + ((v - 128) >> 3);
      pImg.data[idx + 1] = 237 + ((v - 128) >> 3);
      pImg.data[idx + 2] = 223 + ((v - 128) >> 3);
      pImg.data[idx + 3] = 255;
    }
  }
  pCtx.putImageData(pImg, 0, 0);
  const paperTex = prepTex(new THREE.CanvasTexture(paperCanvas), 3.5, 3.5);

  // 2. 512x512 Polymer clay organic mound & fine pore bump map
  const clayCanvas = makeCanvas(S, S);
  const cCtx = clayCanvas.getContext('2d');
  const cImg = cCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const mound = fbm(x * 0.032, y * 0.032, 4);
      const ridge = Math.sin((x * 0.36 + y * 0.24) + mound * 7.2) * 0.5 + 0.5;
      const pore = hash2(x, y) * 0.12;
      const val = Math.floor(THREE.MathUtils.clamp((mound * 0.68 + ridge * 0.20 + pore) * 255, 0, 255));
      const idx = (y * S + x) * 4;
      cImg.data[idx] = val;
      cImg.data[idx + 1] = val;
      cImg.data[idx + 2] = val;
      cImg.data[idx + 3] = 255;
    }
  }
  cCtx.putImageData(cImg, 0, 0);
  const clayBump = prepTex(new THREE.CanvasTexture(clayCanvas), 2.5, 2.5);

  // 3. 512x512 Radial lathe-turned brushed antique brass map
  const brassCanvas = makeCanvas(S, S);
  const bCtx = brassCanvas.getContext('2d');
  const bImg = bCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const dx = x - 256;
      const dy = y - 256;
      const r = Math.hypot(dx, dy);
      const ang = Math.atan2(dy, dx);
      const groove = Math.sin(r * 2.1 + valueNoise(ang * 12, r * 0.08) * 1.8) * 0.5 + 0.5;
      const patina = fbm(x * 0.04, y * 0.04, 3);
      const val = Math.floor((groove * 0.52 + patina * 0.48) * 255);
      const idx = (y * S + x) * 4;
      bImg.data[idx] = val;
      bImg.data[idx + 1] = val;
      bImg.data[idx + 2] = val;
      bImg.data[idx + 3] = 255;
    }
  }
  bCtx.putImageData(bImg, 0, 0);
  const brassTex = prepTex(new THREE.CanvasTexture(brassCanvas), 1, 1);
  brassTex.wrapS = brassTex.wrapT = THREE.RepeatWrapping;

  // 4. 512x512 French-Polished Dark Walnut Woodgrain (for Act I study desk)
  const walCanvas = makeCanvas(S, S);
  const wCtx = walCanvas.getContext('2d');
  const wImg = wCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const warp = fbm(x * 0.014, y * 0.005, 4) * 14.0;
      const ring = Math.sin(x * 0.095 + warp) * 0.5 + 0.5;
      const vessel = valueNoise(x * 0.9, y * 0.08);
      const g = Math.pow(ring, 1.5) * 0.72 + vessel * 0.28;
      const idx = (y * S + x) * 4;
      wImg.data[idx] = Math.floor(22 + g * 28);
      wImg.data[idx + 1] = Math.floor(13 + g * 18);
      wImg.data[idx + 2] = Math.floor(10 + g * 12);
      wImg.data[idx + 3] = 255;
    }
  }
  wCtx.putImageData(wImg, 0, 0);
  const walnutTex = prepTex(new THREE.CanvasTexture(walCanvas), 4, 3);
  walnutTex.colorSpace = THREE.SRGBColorSpace;

  // 5. 512x512 Scottish Tartan Plaid Felt Rug Texture (for Act II 1F Parlor)
  const plaidCanvas = makeCanvas(512, 512);
  const plCtx = plaidCanvas.getContext('2d');
  plCtx.fillStyle = '#8b1f27';
  plCtx.fillRect(0, 0, 512, 512);
  plCtx.fillStyle = 'rgba(24, 72, 52, 0.72)';
  for (let i = 0; i < 512; i += 64) {
    plCtx.fillRect(i, 0, 28, 512);
    plCtx.fillRect(0, i, 512, 28);
  }
  plCtx.strokeStyle = 'rgba(242, 206, 126, 0.75)';
  plCtx.lineWidth = 3;
  for (let i = 32; i < 512; i += 64) {
    plCtx.beginPath();
    plCtx.moveTo(i, 0); plCtx.lineTo(i, 512);
    plCtx.moveTo(0, i); plCtx.lineTo(512, i);
    plCtx.stroke();
  }
  const plaidTex = prepTex(new THREE.CanvasTexture(plaidCanvas), 2, 2);
  plaidTex.colorSpace = THREE.SRGBColorSpace;

  // 6. 512x512 Dual-Depth Glacial Frost Veins (R = shallow crisp cracks, G = deep abyssal fractures)
  const iceCanvas = makeCanvas(512, 512);
  const iCtx = iceCanvas.getContext('2d');
  iCtx.fillStyle = '#000000';
  iCtx.fillRect(0, 0, 512, 512);
  const drawCrackNetwork = (color, width, count, segs) => {
    iCtx.strokeStyle = color;
    iCtx.lineCap = 'round';
    for (let c = 0; c < count; c++) {
      let cx = hash2(c, 1.7) * 512;
      let cy = hash2(c, 9.3) * 512;
      let ang = hash2(c, 4.1) * Math.PI * 2;
      iCtx.lineWidth = width;
      iCtx.beginPath();
      iCtx.moveTo(cx, cy);
      for (let s = 0; s < segs; s++) {
        ang += (hash2(c * 19 + s, s * 3.7) - 0.5) * 0.85;
        const len = 14 + hash2(s, c) * 24;
        cx += Math.cos(ang) * len;
        cy += Math.sin(ang) * len;
        iCtx.lineTo(cx, cy);
      }
      iCtx.stroke();
    }
  };
  iCtx.globalCompositeOperation = 'lighter';
  drawCrackNetwork('rgba(0, 220, 0, 0.65)', 3.2, 28, 10); // Deep G-channel fractures
  drawCrackNetwork('rgba(255, 40, 0, 0.85)', 1.3, 42, 12); // Shallow R-channel razor cracks
  const iceVeinTex = prepTex(new THREE.CanvasTexture(iceCanvas), 4, 4);

  // 7. 1024x256 Engraved Horologium Brass Plaque ("HOROLOGIUM NOCTIS · IV")
  const pqCanvas = makeCanvas(1024, 256);
  const pq = pqCanvas.getContext('2d');
  const pqGrad = pq.createLinearGradient(0, 0, 1024, 256);
  pqGrad.addColorStop(0, '#ecc678');
  pqGrad.addColorStop(0.5, '#f6dc9f');
  pqGrad.addColorStop(1, '#c89644');
  pq.fillStyle = pqGrad;
  pq.fillRect(0, 0, 1024, 256);
  pq.strokeStyle = '#3b260c';
  pq.lineWidth = 6;
  pq.strokeRect(20, 20, 984, 216);
  pq.lineWidth = 2.5;
  pq.strokeRect(32, 32, 960, 192);
  // Blued-steel watchmaker screw heads on left & right
  for (const sx of [78, 946]) {
    pq.fillStyle = '#233b6e';
    pq.beginPath();
    pq.arc(sx, 128, 20, 0, Math.PI * 2);
    pq.fill();
    pq.strokeStyle = '#9db8ef';
    pq.lineWidth = 4;
    pq.beginPath();
    pq.moveTo(sx - 14, 120);
    pq.lineTo(sx + 14, 136);
    pq.stroke();
  }
  pq.fillStyle = '#2b1a07';
  pq.textAlign = 'center';
  pq.font = '600 54px Georgia, "Times New Roman", serif';
  pq.fillText('HOROLOGIUM  NOCTIS', 512, 124);
  pq.font = '400 28px Georgia, "Times New Roman", serif';
  pq.fillText('AUTOMATON  ·  MMXXVI  ·  ACT III', 512, 178);
  const plaqueTex = prepTex(new THREE.CanvasTexture(pqCanvas), 1, 1);
  plaqueTex.colorSpace = THREE.SRGBColorSpace;

  // 8. Crisp 6-branch dendritic snowflake sprite
  const snowCanvas = makeCanvas(128, 128);
  const sCtx = snowCanvas.getContext('2d');
  sCtx.translate(64, 64);
  const sGrad = sCtx.createRadialGradient(0, 0, 2, 0, 0, 58);
  sGrad.addColorStop(0, 'rgba(255,255,255,1)');
  sGrad.addColorStop(0.55, 'rgba(245,250,255,0.88)');
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

  // 9. Diamond starlight / firefly glow sprite
  const glowCanvas = makeCanvas(128, 128);
  const gCtx = glowCanvas.getContext('2d');
  const gGrad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 62);
  gGrad.addColorStop(0, 'rgba(255,252,240,1)');
  gGrad.addColorStop(0.22, 'rgba(255,232,175,0.72)');
  gGrad.addColorStop(0.6, 'rgba(255,198,110,0.16)');
  gGrad.addColorStop(1, 'rgba(255,180,90,0)');
  gCtx.fillStyle = gGrad;
  gCtx.fillRect(0, 0, 128, 128);
  gCtx.fillStyle = 'rgba(255,252,240,0.88)';
  gCtx.beginPath();
  gCtx.moveTo(64, 6);
  gCtx.quadraticCurveTo(66, 60, 122, 64);
  gCtx.quadraticCurveTo(66, 68, 64, 122);
  gCtx.quadraticCurveTo(62, 68, 6, 64);
  gCtx.quadraticCurveTo(62, 60, 64, 6);
  gCtx.fill();
  const sparkTex = new THREE.CanvasTexture(glowCanvas);

  // 10. 1024x1024 High-Precision Gilded Celestial Volvelle (Astrolabe Star Disc)
  const volCanvas = makeCanvas(1024, 1024);
  const vCtx = volCanvas.getContext('2d');
  vCtx.translate(512, 512);
  const vBg = vCtx.createRadialGradient(0, 0, 24, 0, 0, 496);
  vBg.addColorStop(0, '#1c325e');
  vBg.addColorStop(0.65, '#0f1c3a');
  vBg.addColorStop(1, '#080e1f');
  vCtx.fillStyle = vBg;
  vCtx.beginPath();
  vCtx.arc(0, 0, 496, 0, Math.PI * 2);
  vCtx.fill();

  vCtx.strokeStyle = '#e7c67d';
  for (const [rad, lw] of [[476, 4.0], [452, 1.8], [392, 2.2], [296, 1.5], [164, 1.5]]) {
    vCtx.lineWidth = lw;
    vCtx.beginPath();
    vCtx.arc(0, 0, rad, 0, Math.PI * 2);
    vCtx.stroke();
  }
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const major = i % 6 === 0;
    const r0 = major ? 396 : 430;
    vCtx.lineWidth = major ? 3.0 : 1.3;
    vCtx.beginPath();
    vCtx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    vCtx.lineTo(Math.cos(a) * 452, Math.sin(a) * 452);
    vCtx.stroke();
  }
  // Ecliptic off-center astrolabe rete ring
  vCtx.lineWidth = 2.4;
  vCtx.beginPath();
  vCtx.arc(0, -56, 268, 0, Math.PI * 2);
  vCtx.stroke();

  vCtx.fillStyle = '#fff3cf';
  for (let i = 0; i < 95; i++) {
    const a = hash2(i, 3.1) * Math.PI * 2;
    const r = 56 + Math.sqrt(hash2(i, 7.7)) * 326;
    const sz = 1.8 + hash2(i, 13.3) * 4.5;
    vCtx.beginPath();
    vCtx.arc(Math.cos(a) * r, Math.sin(a) * r, sz, 0, Math.PI * 2);
    vCtx.fill();
  }
  // Crown North Star Polaris marker at 12 o'clock
  vCtx.fillStyle = '#ffe7a3';
  vCtx.beginPath();
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2 - Math.PI * 0.5;
    const r = k % 2 === 0 ? 48 : 16;
    const px = Math.cos(a) * r;
    const py = -336 + Math.sin(a) * r;
    if (k === 0) vCtx.moveTo(px, py);
    else vCtx.lineTo(px, py);
  }
  vCtx.closePath();
  vCtx.fill();
  const volvelleTex = prepTex(new THREE.CanvasTexture(volCanvas), 1, 1);
  volvelleTex.colorSpace = THREE.SRGBColorSpace;

  // 11. 512x512 Diagonal Peppermint Candy-Cane Stripe
  const candyCanvas = makeCanvas(512, 512);
  const cdCtx = candyCanvas.getContext('2d');
  cdCtx.fillStyle = '#fbf5ec';
  cdCtx.fillRect(0, 0, 512, 512);
  cdCtx.fillStyle = '#cc2936';
  for (let i = -512; i < 1024; i += 96) {
    cdCtx.beginPath();
    cdCtx.moveTo(i, 0);
    cdCtx.lineTo(i + 44, 0);
    cdCtx.lineTo(i + 44 - 512, 512);
    cdCtx.lineTo(i - 512, 512);
    cdCtx.closePath();
    cdCtx.fill();
  }
  // Subtle fine sugar pin-stripe
  cdCtx.fillStyle = '#368f6b';
  for (let i = -512; i < 1024; i += 96) {
    cdCtx.beginPath();
    cdCtx.moveTo(i + 54, 0);
    cdCtx.lineTo(i + 62, 0);
    cdCtx.lineTo(i + 62 - 512, 512);
    cdCtx.lineTo(i + 54 - 512, 512);
    cdCtx.closePath();
    cdCtx.fill();
  }
  const candyStripeTex = prepTex(new THREE.CanvasTexture(candyCanvas), 2, 2);
  candyStripeTex.colorSpace = THREE.SRGBColorSpace;

  return {
    paperTex,
    clayBump,
    brassTex,
    walnutTex,
    plaidTex,
    iceVeinTex,
    plaqueTex,
    snowflakeTex,
    sparkTex,
    volvelleTex,
    candyStripeTex,
  };
}

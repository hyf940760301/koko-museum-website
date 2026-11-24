// Fast procedural textures & polar overcast studio PMREM environment for Igloo Inc. replica
import * as THREE from '../vendor/three.module.js';

export function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

export function vnoise(x, y) {
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

export function fbm(x, y, oct = 4) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * vnoise(x * f, y * f);
    f *= 2.03;
    amp *= 0.5;
  }
  return v;
}

export function buildPolarEnvironment(renderer) {
  let cached = null;
  return () => {
    if (cached) return cached;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const s = new THREE.Scene();

    // Cool slate-silver polar sky dome (#a0a5b1 zenith -> #6c7382 horizon)
    const domeGeo = new THREE.SphereGeometry(32, 24, 16);
    const pos = domeGeo.attributes.position;
    const cols = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(0xcfd6e3);
    const cMid = new THREE.Color(0x9ca3b2);
    const cBot = new THREE.Color(0x3a404d);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 32;
      if (y >= 0) {
        tmp.copy(cMid).lerp(cTop, Math.pow(y, 0.75));
      } else {
        tmp.copy(cMid).lerp(cBot, Math.min(1, -y * 1.4));
      }
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

    // Subtle cool-ice & faint violet-blue rim reflectors (gives obsidian ice block its signature blue/violet sheen)
    const panels = [
      { x: -10, y: 14, z: 10, w: 14, h: 8, color: 0xf4f8ff, intensity: 4.6 },
      { x: 12, y: 8, z: 8, w: 10, h: 10, color: 0xaec8ff, intensity: 3.4 },
      { x: -8, y: -4, z: 12, w: 9, h: 6, color: 0x9b8cff, intensity: 2.2 },
      { x: 0, y: 18, z: -12, w: 18, h: 6, color: 0xe8f0ff, intensity: 3.8 },
    ];
    const meshes = [];
    for (const p of panels) {
      const g = new THREE.PlaneGeometry(p.w, p.h);
      const c = new THREE.Color(p.color).multiplyScalar(p.intensity);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, toneMapped: false }));
      m.position.set(p.x, p.y, p.z);
      m.lookAt(0, 0, 0);
      s.add(m);
      meshes.push(m);
    }

    const rt = pmrem.fromScene(s, 0.02, 0.1, 64);
    domeGeo.dispose();
    dome.material.dispose();
    for (const m of meshes) {
      m.geometry.dispose();
      m.material.dispose();
    }
    pmrem.dispose();
    cached = rt.texture;
    return cached;
  };
}

export function buildPolarTextures(renderer) {
  const maxAniso = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy() || 4) : 4;
  const S = 256;

  // 1. Rugged frozen stone / weathered ice block bump & roughness texture
  const stoneCanvas = document.createElement('canvas');
  stoneCanvas.width = S;
  stoneCanvas.height = S;
  const sCtx = stoneCanvas.getContext('2d');
  const sImg = sCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const crag = fbm(x * 0.055, y * 0.055, 4);
      const strata = vnoise(x * 0.18, y * 0.06) * 0.28;
      const grit = hash2(x, y) * 0.14;
      const v = Math.max(0, Math.min(255, Math.floor((crag * 0.65 + strata + grit) * 255)));
      const idx = (y * S + x) * 4;
      sImg.data[idx] = v;
      sImg.data[idx + 1] = v;
      sImg.data[idx + 2] = v;
      sImg.data[idx + 3] = 255;
    }
  }
  sCtx.putImageData(sImg, 0, 0);
  const stoneBumpTex = new THREE.CanvasTexture(stoneCanvas);
  stoneBumpTex.wrapS = stoneBumpTex.wrapT = THREE.RepeatWrapping;
  stoneBumpTex.repeat.set(2, 2);
  stoneBumpTex.anisotropy = maxAniso;

  // 2. Dense granular pebbled frost texture (for Abstract portal chamber & permafrost snow)
  const frostCanvas = document.createElement('canvas');
  frostCanvas.width = S;
  frostCanvas.height = S;
  const fCtx = frostCanvas.getContext('2d');
  const fImg = fCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const pebble = vnoise(x * 0.42, y * 0.42) * 0.55 + hash2(x * 1.3, y * 1.7) * 0.45;
      const swell = fbm(x * 0.04, y * 0.04, 3) * 0.35;
      const v = Math.max(0, Math.min(255, Math.floor((pebble * 0.72 + swell) * 255)));
      const idx = (y * S + x) * 4;
      fImg.data[idx] = v;
      fImg.data[idx + 1] = v;
      fImg.data[idx + 2] = v;
      fImg.data[idx + 3] = 255;
    }
  }
  fCtx.putImageData(fImg, 0, 0);
  const frostGrainTex = new THREE.CanvasTexture(frostCanvas);
  frostGrainTex.wrapS = frostGrainTex.wrapT = THREE.RepeatWrapping;
  frostGrainTex.repeat.set(5, 5);
  frostGrainTex.anisotropy = maxAniso;

  // 3. Soft radial snow/glow sprite texture for particles & volumetric portal
  const spCanvas = document.createElement('canvas');
  spCanvas.width = 64;
  spCanvas.height = 64;
  const spCtx = spCanvas.getContext('2d');
  const grad = spCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(236,244,255,0.75)');
  grad.addColorStop(1, 'rgba(236,244,255,0)');
  spCtx.fillStyle = grad;
  spCtx.fillRect(0, 0, 64, 64);
  const particleTex = new THREE.CanvasTexture(spCanvas);

  // 4. Crisp CAD vertex index number atlas (4x4 grid of numbers like "14", "27", "54", "83", "96")
  const numCanvas = document.createElement('canvas');
  numCanvas.width = 256;
  numCanvas.height = 256;
  const nCtx = numCanvas.getContext('2d');
  nCtx.clearRect(0, 0, 256, 256);
  nCtx.font = '600 20px ui-monospace, SFMono-Regular, Menlo, monospace';
  nCtx.textAlign = 'center';
  nCtx.textBaseline = 'middle';
  nCtx.fillStyle = '#ffffff';
  const labels = [
    '08', '14', '23', '31',
    '42', '54', '61', '68',
    '74', '83', '89', '96',
    '104', '118', '127', '142',
  ];
  for (let i = 0; i < 16; i++) {
    const cx = (i % 4) * 64 + 32;
    const cy = Math.floor(i / 4) * 64 + 32;
    nCtx.fillText(labels[i], cx, cy);
  }
  const numAtlasTex = new THREE.CanvasTexture(numCanvas);

  return { stoneBumpTex, frostGrainTex, particleTex, numAtlasTex };
}

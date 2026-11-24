// High-detail Procedural Normal Maps, Ice Caustics, Volumetric Smoke, Scroll-Cut DataTexture & Studio IBLs
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

// Tileable periodic value noise on [0, period) so normal/data textures wrap seamlessly!
export function pnoise(x, y, period) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const x0 = ((ix % period) + period) % period;
  const y0 = ((iy % period) + period) % period;
  const x1 = (x0 + 1) % period;
  const y1 = (y0 + 1) % period;
  const a = hash2(x0, y0);
  const b = hash2(x1, y0);
  const c = hash2(x0, y1);
  const d = hash2(x1, y1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export function fbm(x, y, oct = 4) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * vnoise(x * f, y * f);
    f *= 2.02;
    amp *= 0.5;
  }
  return v;
}

export function voronoi2(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  let d1 = 8.0;
  let d2 = 8.0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const rx = i + hash2(ix + i, iy + j) - fx;
      const ry = j + hash2(ix + i + 31.7, iy + j + 17.3) - fy;
      const d = Math.sqrt(rx * rx + ry * ry);
      if (d < d1) {
        d2 = d1;
        d1 = d;
      } else if (d < d2) {
        d2 = d;
      }
    }
  }
  return { d1, edge: d2 - d1 };
}

function heightFieldToNormalTexture(S, heightFn, strength = 3.2, repeat = 1, aniso = 4) {
  const h = new Float32Array(S * S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      h[y * S + x] = heightFn(x / S, y / S);
    }
  }
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    const ym = (y - 1 + S) % S;
    const yp = (y + 1) % S;
    for (let x = 0; x < S; x++) {
      const xm = (x - 1 + S) % S;
      const xp = (x + 1) % S;
      const dx = (h[y * S + xp] - h[y * S + xm]) * strength;
      const dy = (h[yp * S + x] - h[ym * S + x]) * strength;
      const inv = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const idx = (y * S + x) * 4;
      img.data[idx] = Math.floor((-dx * inv * 0.5 + 0.5) * 255);
      img.data[idx + 1] = Math.floor((-dy * inv * 0.5 + 0.5) * 255);
      img.data[idx + 2] = Math.floor((inv * 0.5 + 0.5) * 255);
      img.data[idx + 3] = Math.floor(Math.max(0, Math.min(1, h[y * S + x])) * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = aniso;
  return tex;
}

export function buildPolarEnvironments(renderer) {
  let pmrem = null;
  const cache = {};
  const ensurePmrem = () => {
    if (!pmrem) pmrem = new THREE.PMREMGenerator(renderer);
    return pmrem;
  };

  const bake = (topHex, midHex, botHex, cards) => {
    const s = new THREE.Scene();
    const g = new THREE.SphereGeometry(32, 24, 16);
    const p = g.attributes.position;
    const cols = new Float32Array(p.count * 3);
    const cT = new THREE.Color(topHex);
    const cM = new THREE.Color(midHex);
    const cB = new THREE.Color(botHex);
    const tmp = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i) / 32;
      if (y >= 0) tmp.copy(cM).lerp(cT, Math.pow(y, 0.8));
      else tmp.copy(cM).lerp(cB, Math.min(1, -y * 1.4));
      cols[i * 3] = tmp.r;
      cols[i * 3 + 1] = tmp.g;
      cols[i * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    const dome = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, toneMapped: false }));
    s.add(dome);

    const ms = [];
    for (const cd of cards) {
      const pg = new THREE.PlaneGeometry(cd.w, cd.h);
      const col = new THREE.Color(cd.color).multiplyScalar(cd.intensity);
      const m = new THREE.Mesh(pg, new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, toneMapped: false }));
      m.position.set(cd.x, cd.y, cd.z);
      m.lookAt(0, 0, 0);
      s.add(m);
      ms.push(m);
    }
    const rt = ensurePmrem().fromScene(s, 0.02, 0.1, 64);
    g.dispose();
    dome.material.dispose();
    ms.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
    return rt.texture;
  };

  return {
    getSurfaceEnv() {
      if (!cache.surface) {
        cache.surface = bake(0xd8dee9, 0xa2a8b5, 0x565d6b, [
          { x: -14, y: 16, z: 12, w: 18, h: 10, color: 0xffffff, intensity: 3.8 },
          { x: 14, y: 10, z: -8, w: 14, h: 9, color: 0xd0e2ff, intensity: 2.6 },
          { x: 0, y: 4, z: 16, w: 12, h: 6, color: 0xeef3fb, intensity: 2.2 },
        ]);
      }
      return cache.surface;
    },
    getVaultEnv() {
      if (!cache.vault) {
        cache.vault = bake(0x283449, 0x151c28, 0x080b12, [
          { x: -9, y: 13, z: 9, w: 10, h: 14, color: 0xeef6ff, intensity: 7.5 },
          { x: 10, y: 8, z: 8, w: 9, h: 12, color: 0x9ec5ff, intensity: 5.8 },
          { x: 0, y: -11, z: 7, w: 12, h: 8, color: 0x7aa2e8, intensity: 3.2 },
          { x: -4, y: 10, z: -11, w: 14, h: 6, color: 0xffffff, intensity: 6.4 },
        ]);
      }
      return cache.vault;
    },
  };
}

export function buildPolarTextures(renderer) {
  const maxAniso = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy() || 4) : 4;

  // 1. Tangent-Space Ice & Chiseled Glacier Normal Map (sharp Voronoi fracture + wind ripples)
  const iceNormalTex = heightFieldToNormalTexture(
    256,
    (u, v) => {
      const vor = voronoi2(u * 7.0, v * 7.0);
      const ridge = Math.min(1, vor.edge * 2.4);
      const fine = pnoise(u * 24, v * 24, 24) * 0.25 + pnoise(u * 48, v * 48, 48) * 0.12;
      return ridge * 0.65 + fine;
    },
    3.8,
    2,
    maxAniso
  );

  // 2. Rugged Frozen Rock & Wind-Carved Snow Sastrugi Normal Map
  const rockNormalTex = heightFieldToNormalTexture(
    256,
    (u, v) => {
      const strata = pnoise(u * 8, v * 16, 8) * 0.5 + pnoise(u * 24, v * 24, 24) * 0.3 + pnoise(u * 64, v * 64, 64) * 0.2;
      return strata;
    },
    3.4,
    4,
    maxAniso
  );

  // 3. Scroll Diagonal Ice-Cut & Frost Transition DataTexture (R: Voronoi ice shards, G: tech blocks, B: FBM slope)
  const S = 256;
  const scCanvas = document.createElement('canvas');
  scCanvas.width = S;
  scCanvas.height = S;
  const scCtx = scCanvas.getContext('2d');
  const scImg = scCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const u = x / S;
      const v = y / S;
      const vor = voronoi2(u * 9.0, v * 9.0);
      const shardVal = Math.max(0, Math.min(1, (1 - vor.d1 * 0.85) * 0.65 + fbm(u * 12, v * 12, 3) * 0.35));
      const techCell = hash2(Math.floor(u * 18), Math.floor(v * 12));
      const slopeNoise = fbm(u * 5.0 + 3.1, v * 5.0 + 7.4, 4);
      const idx = (y * S + x) * 4;
      scImg.data[idx] = Math.floor(shardVal * 255);
      scImg.data[idx + 1] = Math.floor(techCell * 255);
      scImg.data[idx + 2] = Math.floor(slopeNoise * 255);
      scImg.data[idx + 3] = 255;
    }
  }
  scCtx.putImageData(scImg, 0, 0);
  const scrollDataTex = new THREE.CanvasTexture(scCanvas);
  scrollDataTex.wrapS = scrollDataTex.wrapT = THREE.RepeatWrapping;

  // 4. Ice Caustics & Subsurface Shimmer Texture (for CubesScene & DetailScene)
  const caCanvas = document.createElement('canvas');
  caCanvas.width = S;
  caCanvas.height = S;
  const caCtx = caCanvas.getContext('2d');
  const caImg = caCtx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const u = x / S;
      const v = y / S;
      const v1 = voronoi2(u * 8.0, v * 8.0).edge;
      const v2 = voronoi2(u * 13.0 + 2.4, v * 13.0 - 1.7).edge;
      const caustic = Math.pow(Math.max(0, 1 - Math.min(v1, v2) * 3.2), 3.0);
      const c = Math.floor(Math.min(1, caustic) * 255);
      const idx = (y * S + x) * 4;
      caImg.data[idx] = c;
      caImg.data[idx + 1] = Math.min(255, Math.floor(c * 1.06));
      caImg.data[idx + 2] = 255;
      caImg.data[idx + 3] = c;
    }
  }
  caCtx.putImageData(caImg, 0, 0);
  const causticsTex = new THREE.CanvasTexture(caCanvas);
  causticsTex.wrapS = causticsTex.wrapT = THREE.RepeatWrapping;

  // 5. Soft Volumetric Smoke Puff & Snow Sprite Texture
  const smCanvas = document.createElement('canvas');
  smCanvas.width = 128;
  smCanvas.height = 128;
  const smCtx = smCanvas.getContext('2d');
  const smImg = smCtx.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const dx = (x - 64) / 64;
      const dy = (y - 64) / 64;
      const r = Math.hypot(dx, dy);
      const falloff = Math.max(0, 1 - r);
      const wisp = fbm(x * 0.06, y * 0.06, 4);
      const a = Math.pow(falloff, 1.85) * (0.45 + 0.55 * wisp);
      const idx = (y * 128 + x) * 4;
      smImg.data[idx] = 242;
      smImg.data[idx + 1] = 246;
      smImg.data[idx + 2] = 255;
      smImg.data[idx + 3] = Math.floor(Math.max(0, Math.min(1, a)) * 255);
    }
  }
  smCtx.putImageData(smImg, 0, 0);
  const smokeTex = new THREE.CanvasTexture(smCanvas);

  // 6. Out-of-Focus Cylinder / Backdrop Technical Typography Atlas (matches blurrytext_atlas.ktx2!)
  const btCanvas = document.createElement('canvas');
  btCanvas.width = 1024;
  btCanvas.height = 512;
  const btCtx = btCanvas.getContext('2d');
  btCtx.clearRect(0, 0, 1024, 512);
  btCtx.filter = 'blur(4.5px)';
  btCtx.fillStyle = 'rgba(186, 198, 218, 0.34)';
  btCtx.font = '600 44px "IBM Plex Mono", ui-monospace, monospace';
  const rows = [
    'IGLOO INC // CONSUMER CRYPTO REVOLUTION // ONCHAIN IP',
    'PORTFOLIO_CO_01 // PUDGY PENGUINS // 01.02.2020 // 0°C',
    'PORTFOLIO_CO_02 // OVERPASS IP // 06.01.2023 // -3°C',
    'COMMUNITY // ARTIFICIAL INTELLIGENCE // CRYPTOGRAPHY',
    '78.22°N 15.63°E // POLAR VAULT // SPECIMEN ARCHIVE',
  ];
  for (let i = 0; i < rows.length; i++) {
    btCtx.fillText(rows[i], 28, 86 + i * 94);
  }
  const blurryTextTex = new THREE.CanvasTexture(btCanvas);
  blurryTextTex.wrapS = THREE.RepeatWrapping;
  blurryTextTex.wrapT = THREE.ClampToEdgeWrapping;

  // 7. CAD Vertex Numbers Atlas (for Igloo ground & cage mesh indices)
  const numCanvas = document.createElement('canvas');
  numCanvas.width = 256;
  numCanvas.height = 256;
  const nCtx = numCanvas.getContext('2d');
  nCtx.font = '500 19px "IBM Plex Mono", ui-monospace, monospace';
  nCtx.textAlign = 'center';
  nCtx.textBaseline = 'middle';
  nCtx.fillStyle = '#ffffff';
  const nums = ['04', '12', '19', '27', '36', '48', '54', '63', '71', '83', '89', '96', '105', '114', '128', '137'];
  for (let i = 0; i < 16; i++) {
    nCtx.fillText(nums[i], (i % 4) * 64 + 32, Math.floor(i / 4) * 64 + 32);
  }
  const numAtlasTex = new THREE.CanvasTexture(numCanvas);

  // 8. 128x128 Blue-Noise Film Grain Texture
  const grCanvas = document.createElement('canvas');
  grCanvas.width = 128;
  grCanvas.height = 128;
  const grCtx = grCanvas.getContext('2d');
  const grImg = grCtx.createImageData(128, 128);
  for (let i = 0; i < 128 * 128; i++) {
    const g = Math.floor(hash2(i % 128, Math.floor(i / 128) * 1.37) * 255);
    grImg.data[i * 4] = g;
    grImg.data[i * 4 + 1] = g;
    grImg.data[i * 4 + 2] = g;
    grImg.data[i * 4 + 3] = 255;
  }
  grCtx.putImageData(grImg, 0, 0);
  const grainTex = new THREE.CanvasTexture(grCanvas);
  grainTex.wrapS = grainTex.wrapT = THREE.RepeatWrapping;

  return {
    iceNormalTex,
    rockNormalTex,
    scrollDataTex,
    causticsTex,
    smokeTex,
    blurryTextTex,
    numAtlasTex,
    grainTex,
  };
}

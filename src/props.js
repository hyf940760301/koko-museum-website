// The castle hall's furniture (step 8, ?castle=1 only), fetched after the hall is open:
//   the iron corona over the middle (tools/blender/props_castle.py) with twenty candles; its light stays
//     the analytic point of materials.js castleSky (a bake would only add the soft, shadowless glow
//     the point already gives from 6.4 m, for another light-map channel and a re-bake of everything);
//   four oak benches at r 6.4 (bays 3, 7, 13, 17) with velvet cushions;
//   brass stanchions and velvet ropes (catenaries) at r 11.2 before the nineteen altarpieces;
//   twenty banners on the columns between the windows, madder and woad in turn, each with the roundel
//     of the series beside it (drawn here from the tondo atlas: no download);
//   a millefleur tapestry over the door, woven here too; two kite shields (Poly Haven, CC0) on the
//     columns either side of the door; and the altarpieces' name plates turned to engraved brass.
// Copies are merged per material (no instancing, so the G-buffer override needs nothing new).
import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from '../vendor/three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from '../vendor/three/addons/utils/BufferGeometryUtils.js';
import { bayMatrix, K } from './rotunda.js';
import { castleMaterial } from './pbr.js';

const BASE = './assets/castle/props/';
const BENCH_BAYS = [3, 7, 13, 17], R_BENCH = 6.4, R_POST = 11.2, POST_S = 1.45;
const MADDER = '#7c2219', WOAD = '#29466e', GOLD = '#d9b25e';

// a geometry from the glTF, in world (hall) space, per material name
function pieces(root) {
  root.updateMatrixWorld(true); const out = {};
  root.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry.clone();   // (quantized attributes become float first: transforming them in place would clamp to [-1, 1])
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    for (const k of ['position', 'normal', 'uv']) { const a = g.attributes[k]; if (a && (a.normalized || a.isInterleavedBufferAttribute || !(a.array instanceof Float32Array))) {
      const f = new Float32Array(a.count*a.itemSize); for (let i = 0; i < a.count; i++) { const v = [a.getX(i), a.getY(i), a.getZ(i), a.getW(i)]; for (let c = 0; c < a.itemSize; c++) f[i*a.itemSize + c] = v[c]; }
      g.setAttribute(k, new THREE.BufferAttribute(f, a.itemSize)); } }
    g.applyMatrix4(o.matrixWorld);
    if (g.index && !(g.index.array instanceof Uint32Array)) g.setIndex(new THREE.BufferAttribute(Uint32Array.from(g.index.array), 1));
    const n = (o.material && o.material.name) || 'oak'; (out[n] = out[n] || []).push(g);
  });
  return out;
}
const copies = (geos, mats) => mergeGeometries(mats.flatMap((M) => geos.map((g) => g.clone().applyMatrix4(M))));

// ---------------------------------------------------------------- woven things, drawn on canvases
function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
const tex = (c, srgb = true) => { const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };
function weaveNormal() {   // a tiled tabby weave, as a tangent-space normal map (128 px = 16 threads)
  const N = 128, d = new Uint8Array(N*N*4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const tx = Math.floor(x/8), ty = Math.floor(y/8), over = (tx + ty) % 2 === 0;
    const u = (x % 8)/8 - 0.5, v = (y % 8)/8 - 0.5;
    const nx = over ? -Math.sin(u*Math.PI)*0.55 : 0, ny = over ? 0 : -Math.sin(v*Math.PI)*0.55;
    const i = (y*N + x)*4; d[i] = (nx*0.5 + 0.5)*255; d[i + 1] = (ny*0.5 + 0.5)*255; d[i + 2] = 255*Math.sqrt(Math.max(0, 1 - nx*nx - ny*ny))*0.5 + 128; d[i + 3] = 255;
  }
  const t = new THREE.DataTexture(d, N, N); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.NoColorSpace; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.needsUpdate = true;
  return t;
}
function roundel(x, atlas, i, cx, cy, r) {
  const S = 400, cols = 5;
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI*2); x.clip();
  x.drawImage(atlas.canvas, (i % cols)*S, Math.floor(i/cols)*S, S, S, cx - r, cy - r, 2*r, 2*r); x.restore();
  x.lineWidth = r*0.12; x.strokeStyle = GOLD; x.beginPath(); x.arc(cx, cy, r*1.02, 0, Math.PI*2); x.stroke();
}
// twenty banners in one 2048 x 1024 atlas, 10 x 2 cells of 204 x 512 (0.6 x 1.5 m)
function bannerAtlas(atlas, cellOf) {
  const W = 204, H = 512; const [c, x] = canvas(2048, 1024);
  for (let k = 0; k < 20; k++) {
    const ox = (k % 10)*W + 0.5, oy = Math.floor(k/10)*H; const field = k % 2 ? WOAD : MADDER;
    x.save(); x.translate(ox, oy);
    x.fillStyle = field; x.fillRect(0, 0, W, H);
    // a thread-worn sheen and a diaper of small gold lozenges
    const g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, 'rgba(0,0,0,.18)'); g.addColorStop(0.5, 'rgba(255,240,210,.06)'); g.addColorStop(1, 'rgba(0,0,0,.18)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(217,178,94,.35)';
    for (let yy = 190; yy < H - 70; yy += 34) for (let xx = 26 + ((yy/34) % 2)*17; xx < W - 20; xx += 34) { x.beginPath(); x.moveTo(xx, yy - 6); x.lineTo(xx + 5, yy); x.lineTo(xx, yy + 6); x.lineTo(xx - 5, yy); x.fill(); }
    // gold borders, the sleeve for the rod, the roundel of the series of this bay
    x.strokeStyle = GOLD; x.lineWidth = 7; x.strokeRect(10, 30, W - 20, H - 40); x.lineWidth = 2; x.strokeRect(20, 40, W - 40, H - 60);
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, 0, W, 22); x.fillStyle = GOLD; x.fillRect(0, 22, W, 4);
    const ci = cellOf(k); x.fillStyle = field; x.beginPath(); x.arc(W/2, 128, 70, 0, Math.PI*2); x.fill();
    if (ci !== null) roundel(x, atlas, ci, W/2, 128, 62);
    x.restore();
  }
  return tex(c);
}
// the millefleur over the door: madder ground, scattered flowers, Koko's roundel, border (2048 x 512)
function tapestry(atlas) {
  const [c, x] = canvas(2048, 512); let seed = 7; const rnd = () => (seed = (seed*16807) % 2147483647)/2147483647;
  x.fillStyle = '#5e1913'; x.fillRect(0, 0, 2048, 512);
  const flower = (px, py, s, col) => {
    x.strokeStyle = '#4c6a3a'; x.lineWidth = s*0.18; x.beginPath(); x.moveTo(px, py + s*2.2); x.quadraticCurveTo(px + s*0.4, py + s, px, py); x.stroke();
    x.fillStyle = '#5d7b45'; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(px + sd*s*0.55, py + s*1.4, s*0.55, s*0.2, sd*0.6, 0, Math.PI*2); x.fill(); }
    x.fillStyle = col; for (let i = 0; i < 5; i++) { const a = i/5*Math.PI*2; x.beginPath(); x.ellipse(px + Math.cos(a)*s*0.45, py + Math.sin(a)*s*0.45, s*0.42, s*0.28, a, 0, Math.PI*2); x.fill(); }
    x.fillStyle = '#e8c062'; x.beginPath(); x.arc(px, py, s*0.22, 0, Math.PI*2); x.fill();
  };
  const cols = ['#efe2c4', '#e3b04f', '#8fb0cf', '#d9785a', '#f3d9a8', '#b9cfe0'];
  for (let i = 0; i < 520; i++) { const px = 40 + rnd()*1968, py = 40 + rnd()*420; if (Math.abs(px - 1024) < 230 && Math.abs(py - 250) < 200) continue; flower(px, py, 9 + rnd()*9, cols[Math.floor(rnd()*cols.length)]); }
  // rabbits? no: Koko in her roundel, with two scrolls
  x.fillStyle = '#3d0f0b'; x.beginPath(); x.arc(1024, 250, 190, 0, Math.PI*2); x.fill();
  roundel(x, atlas, 0, 1024, 250, 170);
  x.font = '600 40px "Big Caslon", "Baskerville", "Times New Roman", serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD;
  try { x.letterSpacing = '14px'; } catch (e) { /* older engines */ }
  x.fillText('KOKO', 640, 250); x.fillText('MMXXVI', 1408, 250);
  // border: gold and woad bands, a running lozenge
  x.strokeStyle = GOLD; x.lineWidth = 10; x.strokeRect(14, 14, 2020, 484); x.strokeStyle = WOAD; x.lineWidth = 16; x.strokeRect(32, 32, 1984, 448);
  x.fillStyle = GOLD; for (let px = 50; px < 2000; px += 36) for (const py of [32, 480]) { x.beginPath(); x.moveTo(px, py - 6); x.lineTo(px + 6, py); x.lineTo(px, py + 6); x.lineTo(px - 6, py); x.fill(); }
  // fringe
  x.fillStyle = '#c9a259'; for (let px = 0; px < 2048; px += 6) x.fillRect(px, 500, 3, 12);
  return tex(c);
}
// a name plate turned to brass: the enamel and its gilt letters become a brass plate with the
// letters cut in and filled dark (the original canvas is the mask)
function brassPlate(src) {
  const w = src.width, h = src.height; const [c, x] = canvas(w, h); x.drawImage(src, 0, 0);
  const im = x.getImageData(0, 0, w, h), d = im.data;
  for (let i = 0; i < d.length; i += 4) {
    const t = Math.min(1, Math.max(0, (d[i] - 125)/90));   // the gilt (R ~ 230) against the enamel (R ~ 100)
    const yy = Math.floor(i/4/w)/h; const sh = 0.92 + 0.10*Math.sin(yy*Math.PI);
    d[i] = (205*sh)*(1 - t) + 52*t; d[i + 1] = (160*sh)*(1 - t) + 34*t; d[i + 2] = (92*sh)*(1 - t) + 18*t;
  }
  x.putImageData(im, 0, 0); return tex(c);
}

// a banner 0.6 x 1.5 with a swallowtail cut in the geometry (the G buffer sees no alpha) and soft
// folds; the top hangs at y = 0, x across, z out of the wall
function bannerGeometry(cell) {
  const nx = 8, ny = 18, W = 0.6, H = 1.5, notch = 0.22; const pos = [], uv = [], idx = [];
  for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) {
    const u = i/nx, v = j/ny; const xx = (u - 0.5)*W;
    const bottom = H - notch*(1 - Math.abs(2*u - 1));   // the tails reach H, the middle stops short
    const y = -v*bottom;
    const z = 0.035*Math.sin(u*Math.PI*3 + 0.6)*Math.pow(v, 0.8) + 0.02*v;
    pos.push(xx, y, z); uv.push(cell.x + u*cell.z, cell.y + cell.w - (y/-H)*cell.w);
  }
  const W1 = nx + 1;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const a = j*W1 + i; idx.push(a, a + W1, a + 1, a + 1, a + W1, a + W1 + 1); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  return g;
}
// a velvet rope between two posts: a catenary sagging 0.16 m, as a tube
function ropeGeometry(a, b) {
  const pts = []; for (let i = 0; i <= 16; i++) { const t = i/16; const p = a.clone().lerp(b, t); p.y -= 0.16*(1 - Math.pow(2*t - 1, 2)); pts.push(p); }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.017, 7, false);
}

export async function loadProps(ctx) {
  const { ktx, env, maps, atlas, series, flamesOut } = ctx;
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const kt = (n, srgb) => ktx.loadAsync(BASE + n + '.ktx2').then((t) => { t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; t.needsUpdate = true; return t; });
  const [props, shield, shd, shn, sha, trd, trn, tra] = await Promise.all([gl.loadAsync(BASE + 'props.glb'), gl.loadAsync(BASE + 'shield.glb'),
    kt('shield_diff', true), kt('shield_nor'), kt('shield_arm'), kt('shtrim_diff', true), kt('shtrim_nor'), kt('shtrim_arm')]);
  // the hall's oak and iron maps, as copies with the props' own uv scale (same GPU texture)
  const re = (t, rep = 1) => { const c = t.clone(); c.repeat.set(rep, rep); c.rotation = 0; c.offset.set(0, 0); c.needsUpdate = true; return c; };
  const M = {
    iron: castleMaterial('p-iron', { env, map: re(maps.id), normalMap: re(maps.inn), color: new THREE.Color(0.50, 0.45, 0.41), roughness: 0.48, metalness: 0.75, normal: 0.7, envK: 1.1 }),
    wax: castleMaterial('p-wax', { env, color: new THREE.Color(0.98, 0.88, 0.70), roughness: 0.5, envK: 0.25 }),
    oak: castleMaterial('p-oak', { env, map: re(maps.od), normalMap: re(maps.on), arm: re(maps.oa), color: new THREE.Color(0.80, 0.62, 0.48), roughness: 0.8, normal: 0.6, envK: 0.5 }),
    velvet: castleMaterial('p-velvet', { env, color: new THREE.Color(0.40, 0.065, 0.05), roughness: 0.95, envK: 0.12 }),
    brass: castleMaterial('p-brass', { env, color: new THREE.Color(0.95, 0.70, 0.36), roughness: 0.30, metalness: 1, envK: 2.4 }),
  };
  M.velvet.normalMap = weaveNormal(); M.velvet.normalMap.repeat.set(30, 30); M.velvet.normalScale.set(0.6, -0.6);
  const group = new THREE.Group(); group.name = 'castle-props'; const add = (g, m, name) => { const mesh = new THREE.Mesh(g, m); mesh.name = name; group.add(mesh); return mesh; };
  const P = {}; for (const n of ['chandelier', 'bench', 'post']) P[n] = pieces(props.scene.getObjectByName(n));

  // the corona, where it was built (the middle of the hall), and its candle flames for air.js
  for (const [m, gs] of Object.entries(P.chandelier)) add(mergeGeometries(gs), M[m] || M.iron, 'prop-chandelier-' + m);
  const cand = props.scene.getObjectByName('chandelier').userData.candles || [];
  flamesOut.push(...cand.map((p) => new THREE.Vector3(p[0], p[1], p[2])));

  // benches facing the walls (the bench is symmetric front to back)
  const benchM = BENCH_BAYS.map((k) => bayMatrix(k*K.BAY, R_BENCH));
  for (const [m, gs] of Object.entries(P.bench)) add(copies(gs, benchM), M[m] || M.oak, 'prop-bench-' + m);

  // stanchions and ropes before the altarpieces
  const postM = [], ropes = [];
  for (let k = 0; k < K.NB; k++) {
    if (k === K.door) continue; const th = k*K.BAY;
    const ends = [-1, 1].map((sd) => { const M4 = bayMatrix(th + sd*POST_S/R_POST, R_POST); postM.push(M4); return new THREE.Vector3(0, 0.86, 0).applyMatrix4(M4); });
    // the hooks face each other: pull the rope ends 0.04 inwards along the line
    const d = ends[1].clone().sub(ends[0]).normalize().multiplyScalar(0.04);
    ropes.push(ropeGeometry(ends[0].clone().add(d), ends[1].clone().sub(d)));
  }
  for (const [m, gs] of Object.entries(P.post)) add(copies(gs, postM), M[m] || M.brass, 'prop-posts');
  add(mergeGeometries(ropes), M.velvet, 'prop-ropes');

  // banners on the twenty columns (column k + 0.5 carries the roundel of bay k, or Koko's beside the door)
  const ba = bannerAtlas(atlas, (k) => { const s = series.find((x) => x.bay === k); return s ? s.index : (k === K.door ? 0 : null); });
  const bannerMat = castleMaterial('p-banner', { env, map: ba, color: new THREE.Color(1, 1, 1), roughness: 0.92, envK: 0.1 });
  bannerMat.side = THREE.DoubleSide; bannerMat.normalMap = M.velvet.normalMap.clone(); bannerMat.normalMap.repeat.set(1, 1); bannerMat.normalScale.set(0.35, -0.35);
  const bg = [], rods = [];
  for (let k = 0; k < K.NB; k++) {
    const cell = new THREE.Vector4((k % 10)/10, 1 - (Math.floor(k/10) + 1)/2, 1/10, 1/2);
    const Mb = bayMatrix((k + 0.5)*K.BAY, K.R - 0.36, 7.16);
    bg.push(bannerGeometry(cell).applyMatrix4(Mb));
    const rod = new THREE.CylinderGeometry(0.012, 0.012, 0.72, 8).rotateZ(Math.PI/2).applyMatrix4(Mb); rods.push(rod);
    const arm = new THREE.CylinderGeometry(0.01, 0.01, 0.22, 6).rotateX(Math.PI/2).translate(0, 0.0, -0.11).applyMatrix4(Mb); rods.push(arm);
    for (const sd of [-1, 1]) rods.push(new THREE.SphereGeometry(0.022, 8, 6).translate(sd*0.37, 0, 0).applyMatrix4(Mb));
  }
  add(mergeGeometries(bg), bannerMat, 'prop-banners');
  add(mergeGeometries(rods.map((g) => g.toNonIndexed())), M.iron, 'prop-banner-rods');

  // the tapestry over the door, on the curve of the wall, and its rod
  {
    const tw = 3.0, th = 0.72, y0 = 4.84; const g = new THREE.PlaneGeometry(tw, th, 24, 4); const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const s = p.getX(i), y = p.getY(i); const a = K.door*K.BAY + s/(K.R - 0.05); const r = K.R - 0.05 - 0.012*Math.sin((s/tw + 0.5)*Math.PI*8)*((th/2 - y)/th);
      p.setXYZ(i, r*Math.sin(a), y0 + th/2 + y, -r*Math.cos(a)); }
    g.computeVertexNormals();
    const tm = castleMaterial('p-tapestry', { env, map: tapestry(atlas), color: new THREE.Color(1, 1, 1), roughness: 0.95, envK: 0.08 });
    tm.normalMap = M.velvet.normalMap.clone(); tm.normalMap.repeat.set(60, 14); tm.normalScale.set(0.5, -0.5);
    add(g, tm, 'prop-tapestry');
  }

  // the two kite shields on the columns either side of the door, 3.85 m up, a little turned in; the
  // model's ARM maps carry no occlusion (R = 0), so only their roughness and metal are used
  {
    const sm = {
      body: castleMaterial('p-shield', { env, map: shd, normalMap: shn, arm: sha, aoK: 0, roughness: 1, normal: 1, envK: 0.4 }),
      trim: castleMaterial('p-shtrim', { env, map: trd, normalMap: trn, arm: tra, aoK: 0, metalMap: true, roughness: 1, metalness: 1, normal: 1, envK: 1.2 }),
    };
    const root = shield.scene; const box = new THREE.Box3().setFromObject(root); const size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
    const sc = 1.05/size.y; const S = pieces(root);
    const Ms = [-1, 1].map((sd) => bayMatrix((K.door + sd*0.5)*K.BAY, K.R - 0.16 - 0.06 - size.z*sc*0.5, 3.85).multiply(new THREE.Matrix4().makeRotationY(-sd*0.12)).multiply(new THREE.Matrix4().makeScale(sc, sc, sc)).multiply(new THREE.Matrix4().makeTranslation(-ctr.x, -ctr.y, -ctr.z)));
    for (const [m, gs] of Object.entries(S)) add(copies(gs, Ms), m.includes('body') ? sm.body : sm.trim, 'prop-shield-' + m);
  }

  // the name plates: brass
  const plateMat = (src) => castleMaterial('p-plate', { env, map: brassPlate(src), color: new THREE.Color(1, 1, 1), roughness: 0.35, metalness: 0.9, envK: 2.0 });
  return { group, materials: [...Object.values(M), bannerMat], plateMat };
}

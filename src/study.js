// The castle's studiolo (step 9, ?castle=1 only), fetched after the hall is open. Same room, same
// size and every hit volume where it was (src/studiolo.js keeps all the joinery, furniture and
// toys); what changes is what it is made of:
//   walls: oak linenfold panelling to the cap rail (0.45 m panels, the folds a normal map and an
//     occlusion map drawn here), limewash above it and in the lunettes (the hall's medieval_wall_01);
//   vault: limewashed webs on four sandstone transverse ribs; the skylight a stone ring with its
//     shaft and a leaded diamond lattice (the light model is unchanged);
//   floor: worn oak boards (Poly Haven wood_floor_worn) and a rug woven here, madder and woad with
//     Koko's roundel; two tapestries in the band above the panelling;
//   furniture: a Gothic cabinet and a commode either side of the entrance, a wooden lantern on the
//     commode (Poly Haven GothicCabinet_01, GothicCommode_01, wooden_lantern_01, CC0).
import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from '../vendor/three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from '../vendor/three/addons/utils/BufferGeometryUtils.js';
import { castleMaterial } from './pbr.js';
import { pieces, weaveNormal, roundel, MADDER, WOAD, GOLD } from './props.js';

const BASE = './assets/castle/study/';
const CAP = 2.30;   // top of the cap rail: oak below, limewash above

// ---------------------------------------------------------------- geometry helpers
// split a non-indexed geometry (position, normal, uv) by the plane y = y0: [below, above]
function clipY(geo, y0) {
  const A = ['position', 'normal', 'uv'].map((k) => geo.attributes[k]);
  const out = [[[], [], []], [[], [], []]];
  const vert = (i) => A.map((a) => (a.itemSize === 3 ? [a.getX(i), a.getY(i), a.getZ(i)] : [a.getX(i), a.getY(i)]));
  const lerp = (a, b, t) => a.map((v, k) => v.map((x, j) => x + (b[k][j] - x)*t));
  for (let i = 0; i < A[0].count; i += 3) {
    const v = [vert(i), vert(i + 1), vert(i + 2)];
    for (const side of [0, 1]) {
      const inside = (q) => (side ? q[0][1] >= y0 : q[0][1] <= y0); const poly = [];
      for (let k = 0; k < 3; k++) { const a = v[k], b = v[(k + 1)%3]; const ia = inside(a), ib = inside(b);
        if (ia) poly.push(a); if (ia !== ib) poly.push(lerp(a, b, (y0 - a[0][1])/(b[0][1] - a[0][1]))); }
      for (let k = 1; k + 1 < poly.length; k++) for (const q of [poly[0], poly[k], poly[k + 1]]) q.forEach((x, j) => out[side][j].push(...x));
    }
  }
  return out.map(([p, n, u]) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(u, 2)); return g; });
}
// a sandstone transverse rib under the elliptical vault (half axes hx, rise over hWall), at z
function ribGeometry(SD, z, w = 0.25, d = 0.11, N = 56) {
  const { hx, hWall, rise } = SD; const pos = [], nor = [], uv = []; let s = 0; const pts = [];
  for (let i = 0; i <= N; i++) { const ph = Math.PI*(1 - i/N); const P = new THREE.Vector2(hx*Math.cos(ph), hWall + rise*Math.sin(ph));
    const n = new THREE.Vector2(Math.cos(ph)/hx, Math.sin(ph)/rise).normalize(); if (i) s += P.distanceTo(pts[i - 1].P); pts.push({ P, n, s }); }
  const quad = (a, b, c, e, na, nb, ua, ub, uc, ue) => { for (const [p, q, t] of [[a, na, ua], [b, nb, ub], [c, nb, uc], [a, na, ua], [c, nb, uc], [e, na, ue]]) { pos.push(...p); nor.push(...q); uv.push(...t); } };
  for (let i = 0; i < N; i++) {
    const A = pts[i], B = pts[i + 1]; const ai = A.P.clone().addScaledVector(A.n, -d), bi = B.P.clone().addScaledVector(B.n, -d);
    const ao = A.P.clone().addScaledVector(A.n, 0.02), bo = B.P.clone().addScaledVector(B.n, 0.02);
    const T = 1/2.25;   // metres to the sandstone texture
    // intrados (faces the room: -n)
    quad([ai.x, ai.y, z + w/2], [bi.x, bi.y, z + w/2], [bi.x, bi.y, z - w/2], [ai.x, ai.y, z - w/2], [-A.n.x, -A.n.y, 0], [-B.n.x, -B.n.y, 0], [A.s*T, 0], [B.s*T, 0], [B.s*T, w*T], [A.s*T, w*T]);
    // the two faces
    for (const sd of [-1, 1]) { const zz = z + sd*w/2; const f = [0, 0, sd];
      const a = [ao.x, ao.y, zz], b = [bo.x, bo.y, zz], c = [bi.x, bi.y, zz], e = [ai.x, ai.y, zz];
      if (sd > 0) quad(a, b, c, e, f, f, [A.s*T, 0], [B.s*T, 0], [B.s*T, d*T], [A.s*T, d*T]); else quad(a, e, c, b, f, f, [A.s*T, 0], [A.s*T, d*T], [B.s*T, d*T], [B.s*T, 0]); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}
const inward = (g) => { const n = g.attributes.normal; for (let i = 0; i < n.count; i++) n.setXYZ(i, -n.getX(i), -n.getY(i), -n.getZ(i));
  const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } return g; };

// ---------------------------------------------------------------- drawn maps
// linenfold: one 0.45 m panel across, the whole panelling height (0-2.30 m) up; a sunk field with a
// fielded panel below the chair rail, folded linen above it; returns [normal map, occlusion map]
function linenfold() {
  const W = 128, H = 640, TW = 0.45, TH = CAP, dx = TW/W, dy = TH/H;
  const h = new Float32Array(W*H); const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a)/(b - a))); return t*t*(3 - 2*t); };
  const X0 = 0.042, X1 = TW - 0.042;
  const F = [[0.19, 0.755, 0], [0.945, 2.115, 1]];   // fields between skirting, chair rail and cap rail
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const x = (i + 0.5)*dx, y = (j + 0.5)*dy; let v = 0;
    for (const [y0, y1, fold] of F) {
      if (y < y0 || y > y1 || x < X0 || x > X1) continue;
      const d = Math.min(x - X0, X1 - x, y - y0, y1 - y);
      v = -0.007*ss(0, 0.014, d);                       // the field sinks behind a bevel
      if (!fold) v += 0.008*ss(0.022, 0.05, d);          // a fielded panel
      else {
        const t = (x - X0)/(X1 - X0), k = 2;               // two folds of linen, their ends scalloped
        const ridge = Math.pow(0.5 - 0.5*Math.cos(2*Math.PI*k*t), 0.7);
        const e = 0.035 + 0.035*Math.abs(Math.sin(Math.PI*k*t)) + 0.012*Math.abs(Math.sin(2*Math.PI*k*t));
        const end = ss(e - 0.02, e + 0.004, Math.min(y - y0, y1 - y));
        v += (0.004 + 0.014*ridge)*end*ss(0.012, 0.03, Math.min(x - X0, X1 - x));
      }
    }
    h[j*W + i] = v;
  }
  const nd = new Uint8Array(W*H*4), ad = new Uint8Array(W*H*4);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const g = (ii, jj) => h[Math.min(H - 1, Math.max(0, jj))*W + ((ii + W)%W)];
    const sx = (g(i + 1, j) - g(i - 1, j))/(2*dx), sy = (g(i, j + 1) - g(i, j - 1))/(2*dy);
    const l = Math.hypot(sx, sy, 1); const o = (j*W + i)*4;
    nd[o] = (-sx/l*0.5 + 0.5)*255; nd[o + 1] = (-sy/l*0.5 + 0.5)*255; nd[o + 2] = (1/l*0.5 + 0.5)*255; nd[o + 3] = 255;
    const a = 0.62 + 0.38*ss(-0.007, 0.006, g(i, j));   // the deep of the folds and the sunk edges hold less light
    ad[o] = ad[o + 1] = ad[o + 2] = a*255; ad[o + 3] = 255;
  }
  const mk = (d) => { const t = new THREE.DataTexture(d, W, H); t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping; t.colorSpace = THREE.NoColorSpace;
    t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter; t.anisotropy = 8; t.repeat.set(1/TW, 1/TH); t.needsUpdate = true; return t; };
  return [mk(nd), mk(ad)];
}
function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
const ctex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
// a millefleur hanging w x h px with Koko's roundel (atlas cell i) and two words either side
function hanging(atlas, W, H, i, words, seed = 11) {
  const [c, x] = canvas(W, H); let s = seed; const rnd = () => (s = (s*16807)%2147483647)/2147483647;
  x.fillStyle = i%2 ? '#22395c' : '#5e1913'; x.fillRect(0, 0, W, H);
  const R = H*0.36, cx = W/2, cy = H/2;
  const flower = (px, py, z, col) => {
    x.strokeStyle = '#4c6a3a'; x.lineWidth = z*0.18; x.beginPath(); x.moveTo(px, py + z*2.2); x.quadraticCurveTo(px + z*0.4, py + z, px, py); x.stroke();
    x.fillStyle = '#5d7b45'; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(px + sd*z*0.55, py + z*1.4, z*0.55, z*0.2, sd*0.6, 0, Math.PI*2); x.fill(); }
    x.fillStyle = col; for (let k = 0; k < 5; k++) { const a = k/5*Math.PI*2; x.beginPath(); x.ellipse(px + Math.cos(a)*z*0.45, py + Math.sin(a)*z*0.45, z*0.42, z*0.28, a, 0, Math.PI*2); x.fill(); }
    x.fillStyle = '#e8c062'; x.beginPath(); x.arc(px, py, z*0.22, 0, Math.PI*2); x.fill();
  };
  const cols = ['#efe2c4', '#e3b04f', '#8fb0cf', '#d9785a', '#f3d9a8', '#b9cfe0'];
  const n = Math.round(W*H/2000);
  for (let k = 0; k < n; k++) { const px = 40 + rnd()*(W - 80), py = 40 + rnd()*(H - 80); if (Math.hypot(px - cx, py - cy) < R*1.25) continue; flower(px, py, 9 + rnd()*9, cols[Math.floor(rnd()*cols.length)]); }
  x.fillStyle = 'rgba(20,8,6,.6)'; x.beginPath(); x.arc(cx, cy, R*1.12, 0, Math.PI*2); x.fill();
  roundel(x, atlas, i, cx, cy, R);
  if (words) { x.font = `600 ${Math.round(H*0.08)}px "Big Caslon", "Baskerville", "Times New Roman", serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD;
    try { x.letterSpacing = '12px'; } catch (e) { /* older engines */ }
    const xl = (cx - R*1.25)/2 + 12; x.fillText(words[0], xl, cy); x.fillText(words[1], W - xl, cy); }
  x.strokeStyle = GOLD; x.lineWidth = 10; x.strokeRect(14, 14, W - 28, H - 28); x.strokeStyle = i%2 ? MADDER : WOAD; x.lineWidth = 16; x.strokeRect(32, 32, W - 64, H - 64);
  x.fillStyle = GOLD; for (let px = 50; px < W - 40; px += 36) for (const py of [32, H - 32]) { x.beginPath(); x.moveTo(px, py - 6); x.lineTo(px + 6, py); x.lineTo(px, py + 6); x.lineTo(px - 6, py); x.fill(); }
  x.fillStyle = '#c9a259'; for (let px = 0; px < W; px += 6) x.fillRect(px, H - 12, 3, 12);
  return ctex(c);
}
// the rug: madder field, woad border with a running lozenge, a woad lozenge medallion with Koko
function rug(atlas, W = 1024, H = 1408) {
  const [c, x] = canvas(W, H); let s = 5; const rnd = () => (s = (s*16807)%2147483647)/2147483647;
  x.fillStyle = '#6a1c15'; x.fillRect(0, 0, W, H);
  // abrash: the dye lots drift across the field
  for (let y = 0; y < H; y += 8) { x.fillStyle = `rgba(${rnd() < 0.5 ? '40,10,6' : '140,50,30'},${0.03 + rnd()*0.05})`; x.fillRect(0, y, W, 8); }
  const B = 110;
  x.fillStyle = WOAD; x.fillRect(0, 0, W, B); x.fillRect(0, H - B, W, B); x.fillRect(0, 0, B, H); x.fillRect(W - B, 0, B, H);
  x.strokeStyle = GOLD; x.lineWidth = 8; x.strokeRect(B - 12, B - 12, W - 2*B + 24, H - 2*B + 24); x.strokeRect(18, 18, W - 36, H - 36);
  x.fillStyle = '#d9b25e';
  const loz = (px, py, r) => { x.beginPath(); x.moveTo(px, py - r); x.lineTo(px + r*0.7, py); x.lineTo(px, py + r); x.lineTo(px - r*0.7, py); x.closePath(); x.fill(); };
  for (let p = 60; p < W - 40; p += 64) { loz(p, B/2, 22); loz(p, H - B/2, 22); }
  for (let p = 60 + 64; p < H - 100; p += 64) { loz(B/2, p, 22); loz(W - B/2, p, 22); }
  // small stars over the field
  x.fillStyle = 'rgba(217,178,94,.55)'; for (let yy = B + 50; yy < H - B - 30; yy += 70) for (let xx = B + 50 + ((yy/70)%2)*35; xx < W - B - 30; xx += 70) { x.beginPath(); for (let k = 0; k < 8; k++) { const a = k/8*Math.PI*2, r = k%2 ? 5 : 13; x.lineTo(xx + Math.cos(a)*r, yy + Math.sin(a)*r); } x.fill(); }
  // the medallion
  const cx = W/2, cy = H/2, R = 330;
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(cx, cy - R - 16); x.lineTo(cx + R*0.85 + 14, cy); x.lineTo(cx, cy + R + 16); x.lineTo(cx - R*0.85 - 14, cy); x.closePath(); x.fill();
  x.fillStyle = WOAD; x.beginPath(); x.moveTo(cx, cy - R); x.lineTo(cx + R*0.85, cy); x.lineTo(cx, cy + R); x.lineTo(cx - R*0.85, cy); x.closePath(); x.fill();
  x.fillStyle = '#3d0f0b'; x.beginPath(); x.arc(cx, cy, 150, 0, Math.PI*2); x.fill();
  roundel(x, atlas, 0, cx, cy, 136);
  for (const [px, py] of [[B + 80, B + 80], [W - B - 80, B + 80], [B + 80, H - B - 80], [W - B - 80, H - B - 80]]) { x.fillStyle = WOAD; loz(px, py, 46); x.fillStyle = GOLD; loz(px, py, 20); }
  return ctex(c);
}

// ---------------------------------------------------------------- the room
export async function loadStudy(ctx) {
  const { ktx, env, maps, studio, atlas } = ctx; const SD = studio.SD, sh = studio.shell;
  const { hx, hz, hWall, rise } = SD; const top = hWall + rise;
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const kt = (n, srgb) => ktx.loadAsync(BASE + n + '.ktx2').then((t) => { t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.needsUpdate = true; return t; });
  const [cab, com, lan, fd, fn, fa, cd, cn, ca, md, mn, ma, ld, ln, la] = await Promise.all([gl.loadAsync(BASE + 'cabinet.glb'), gl.loadAsync(BASE + 'commode.glb'), gl.loadAsync(BASE + 'lantern.glb'),
    kt('floor_diff', true), kt('floor_nor'), kt('floor_arm'), kt('cabinet_diff', true), kt('cabinet_nor'), kt('cabinet_arm'), kt('commode_diff', true), kt('commode_nor'), kt('commode_arm'), kt('lantern_diff', true), kt('lantern_nor'), kt('lantern_arm')]);
  // the hall's maps, as copies at the study's own scale (same GPU texture)
  const re = (t, rep = 1, rot = 0) => { const c = t.clone(); c.repeat.set(rep, rep); c.rotation = rot; c.offset.set(0, 0); c.needsUpdate = true; return c; };
  const [lnN, lnA] = linenfold();
  const M = {
    wainscot: castleMaterial('s-oak', { env, map: re(maps.od, 0.9, Math.PI/2), color: new THREE.Color(0.86, 0.66, 0.50), roughness: 0.55, envK: 0.35 }),
    lime: castleMaterial('s-lime', { env, map: re(maps.md, 0.4), normalMap: re(maps.mn, 0.4), arm: re(maps.ma, 0.4), color: new THREE.Color(1.32, 1.28, 1.26), roughness: 1, normal: 0.22, aoK: 0.35, envK: 0.2, mapMean: [0.59, 0.444, 0.293], mapK: 0.05 }),
    stone: castleMaterial('s-stone', { env, map: re(maps.sd), normalMap: re(maps.sn), arm: re(maps.sa), color: new THREE.Color(1.50, 1.33, 1.06), roughness: 1, normal: 0.8, envK: 0.3, mapMean: [0.377, 0.289, 0.177], mapK: 0.85 }),
    floor: castleMaterial('s-floor', { env, map: re(fd, 0.5, Math.PI/2), normalMap: re(fn, 0.5, Math.PI/2), arm: re(fa, 0.5, Math.PI/2), color: new THREE.Color(0.98, 0.85, 0.72), roughness: 1, normal: 0.8, envK: 0.45 }),
    iron: castleMaterial('s-iron', { env, map: re(maps.id, 4), normalMap: re(maps.inn, 4), color: new THREE.Color(0.40, 0.36, 0.33), roughness: 0.5, metalness: 0.7, normal: 0.5, envK: 0.8 }),
    cabinet: castleMaterial('s-cabinet', { env, map: cd, normalMap: cn, arm: ca, metalMap: true, color: new THREE.Color(1.05, 0.92, 0.80), roughness: 1, metalness: 1, normal: 1, envK: 0.5 }),
    commode: castleMaterial('s-commode', { env, map: md, normalMap: mn, arm: ma, metalMap: true, color: new THREE.Color(1.05, 0.92, 0.80), roughness: 1, metalness: 1, normal: 1, envK: 0.5 }),
    lantern: castleMaterial('s-lantern', { env, map: ld, normalMap: ln, arm: la, metalMap: true, roughness: 1, metalness: 1, normal: 1, envK: 0.6 }),
    glass: castleMaterial('s-glass', { env, color: new THREE.Color(0.55, 0.45, 0.30), roughness: 0.15, envK: 1.2 }),
    rug: castleMaterial('s-rug', { env, map: rug(atlas), roughness: 0.95, envK: 0.06 }),
  };
  // linenfold: folds as normals, their hollows as occlusion; oak grain from the hall's veneer
  M.wainscot.side = M.lime.side = THREE.DoubleSide;   // the old shell's walls face either way (it drew both sides)
  M.wainscot.normalMap = lnN; M.wainscot.normalScale.set(1, 1); M.wainscot.aoMap = lnA; M.wainscot.aoMapIntensity = 1;
  const weave = weaveNormal(); M.rug.normalMap = weave.clone(); M.rug.normalMap.repeat.set(36, 50); M.rug.normalScale.set(0.5, -0.5);

  const group = new THREE.Group(); group.name = 'castle-study';
  const add = (g, m, name) => { const mesh = new THREE.Mesh(g, m); mesh.name = name; group.add(mesh); return mesh; };

  // walls: oak to the cap rail, limewash above; the lunettes and the vault webs limewash
  const [lo, hi] = clipY(sh.wall, CAP);
  add(lo, M.wainscot, 'study-wainscot');
  add(mergeGeometries([hi, sh.lun, sh.vault]), M.lime, 'study-lime');
  add(sh.floor, M.floor, 'study-floor');
  // four transverse ribs clear of the skylight, and the skylight in stone with its leaded lattice
  const ribs = [-2.85, -1.40, 1.40, 2.85].map((z) => ribGeometry(SD, z));
  // the ring follows the vault (a flat one would stand proud of it either side)
  const ring = new THREE.RingGeometry(SD.ocuR, SD.ocuR + 0.34, 64, 3).rotateX(Math.PI/2);
  { const uv = ring.attributes.uv, p = ring.attributes.position; for (let i = 0; i < uv.count; i++) { const x = p.getX(i); p.setY(i, Math.min(top - 0.05, hWall + rise*Math.sqrt(Math.max(0, 1 - (x/hx)**2)) - 0.03)); uv.setXY(i, x/2.25, p.getZ(i)/2.25); } ring.computeVertexNormals(); }
  const shaft = inward(new THREE.CylinderGeometry(SD.ocuR, SD.ocuR, 0.80, 48, 1, true)).translate(0, top - 0.05 + 0.40, 0);
  { const uv = shaft.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i)*2*Math.PI*SD.ocuR/2.25, uv.getY(i)*0.8/2.25); }
  const roll = new THREE.TorusGeometry(SD.ocuR + 0.005, 0.05, 10, 64).rotateX(Math.PI/2).translate(0, top - 0.06, 0);
  { const uv = roll.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i)*4.5/2.25, uv.getY(i)*0.3/2.25); }
  add(mergeGeometries([...ribs, ring.toNonIndexed(), shaft.toNonIndexed(), roll.toNonIndexed()]), M.stone, 'study-stone');
  { const bars = []; const r = SD.ocuR - 0.005, yy = top + 0.28, step = 0.17;
    for (const a of [Math.PI/4, -Math.PI/4]) for (let c = -r + step/2; c < r; c += step) { const L = 2*Math.sqrt(Math.max(0, r*r - c*c)); if (L < 0.05) continue;
      bars.push(new THREE.BoxGeometry(0.018, 0.022, L).rotateY(a).translate(Math.cos(a)*c, yy, -Math.sin(a)*c)); }
    bars.push(new THREE.TorusGeometry(r, 0.02, 6, 48).rotateX(Math.PI/2).translate(0, yy, 0));
    add(mergeGeometries(bars.map((g) => g.toNonIndexed())), M.iron, 'study-lattice'); }

  // the rug, and the two hangings with their rods: over the desk (right wall) and over the commode
  add(new THREE.PlaneGeometry(2.0, 2.75).rotateX(-Math.PI/2).translate(0.05, 0.004, 0.2), M.rug, 'study-rug');
  { const hang = [
      { w: 2.30, h: 0.58, M: new THREE.Matrix4().makeRotationY(-Math.PI/2).setPosition(hx - 0.035, 2.80, -0.52), tex: hanging(atlas, 2048, 516, 2, ['KOKO', 'STVDIVM'], 23) },
      { w: 1.50, h: 0.62, M: new THREE.Matrix4().makeRotationY(Math.PI).setPosition(-1.85, 2.76, hz - 0.035), tex: hanging(atlas, 1536, 636, 5, null, 41) },
    ];
    const rods = [];
    for (const t of hang) {
      const g = new THREE.PlaneGeometry(t.w, t.h, 24, 6); const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, 0.010*Math.sin((p.getX(i)/t.w + 0.5)*Math.PI*10)*((t.h/2 - p.getY(i))/t.h)); g.computeVertexNormals(); g.applyMatrix4(t.M);
      const m = castleMaterial('s-hanging', { env, map: t.tex, roughness: 0.95, envK: 0.06 }); m.normalMap = weave.clone(); m.normalMap.repeat.set(50*t.w/2.3, 14); m.normalScale.set(0.5, -0.5);
      add(g, m, 'study-hanging');
      rods.push(new THREE.CylinderGeometry(0.012, 0.012, t.w + 0.16, 10).rotateZ(Math.PI/2).translate(0, t.h/2 + 0.02, 0.02).applyMatrix4(t.M).toNonIndexed());
      for (const sd of [-1, 1]) rods.push(new THREE.SphereGeometry(0.022, 10, 8).translate(sd*(t.w/2 + 0.09), t.h/2 + 0.02, 0.02).applyMatrix4(t.M).toNonIndexed());
    }
    add(mergeGeometries(rods), M.iron, 'study-rods'); }

  // the furniture either side of the entrance, facing into the room
  const place = (gltf, scale, x, z, ry, mats, name, y = 0) => {
    const root = gltf.scene; root.traverse((o) => { if (/door/i.test(o.name)) o.quaternion.identity(); });   // the cabinet's doors come ajar: shut them
    const box = new THREE.Box3().setFromObject(root);
    const Mx = new THREE.Matrix4().makeTranslation(x, y, z).multiply(new THREE.Matrix4().makeRotationY(ry)).multiply(new THREE.Matrix4().makeScale(scale, scale, scale)).multiply(new THREE.Matrix4().makeTranslation(0, -box.min.y, 0));
    const P = pieces(root); let tris = 0;
    for (const [mn, gs] of Object.entries(P)) { const g = mergeGeometries(gs.map((q) => q.applyMatrix4(Mx))); tris += (g.index ? g.index.count : g.attributes.position.count)/3; add(g, mats(mn), name + '-' + mn); }
    return { box: box.clone().applyMatrix4(Mx), tris };
  };
  const cabB = place(cab, 0.9, 1.84, hz - 0.03 - 0.457*0.9, Math.PI, () => M.cabinet, 'study-cabinet');
  const comB = place(com, 1.0, -1.85, hz - 0.03 - 0.292, Math.PI, () => M.commode, 'study-commode');
  place(lan, 1.35, -1.62, comB.box.min.z + 0.30, Math.PI*0.85, (mn) => (/glass/i.test(mn) ? M.glass : M.lantern), 'study-lantern', comB.box.max.y);
  return { group, materials: Object.values(M) };
}

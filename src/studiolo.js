// The studiolo: a small inlaid study off the rotunda. On the far wall, a round cabinet
// door with nineteen recesses for the roundels you earn; when all are in, it opens on a
// tiny chapel kept for the statue to come. On the left, the proportion sheet; on the
// right, the codex of who Koko is.
import * as THREE from '../vendor/three/three.module.js';
import { Builder, PAL, surf, raisedPanel } from './rotunda.js';
import { texMaterial, LIGHT } from './materials.js';

const V3 = THREE.Vector3;
export const SO = new V3(80, 0, 0);          // where the room sits in the world
export const SD = { hx: 2.8, hz: 3.6, hWall: 3.3, rise: 1.2, door: { r: 1.2, y: 1.45 }, apseZ: -5.45, apseR: 1.75, ocuR: 0.70 };
const SERIF = '"Big Caslon", "Baskerville", "Hoefler Text", "Times New Roman", serif';
const SONG = '"Songti SC", "STSong", "Noto Serif CJK SC", "Noto Serif SC", "Source Han Serif SC", "SimSun", serif';
const SANG = '#9c4a33';
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
const ctex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lathe = (pts, seg = 36) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(Math.max(r, 1e-4), y)), seg);
// a box with eased edges, centred on the origin
function rbox(w, h, d, r = 0.01) {
  const a = w/2 - r, c = d/2 - r; const s = new THREE.Shape([new THREE.Vector2(-a, -c), new THREE.Vector2(a, -c), new THREE.Vector2(a, c), new THREE.Vector2(-a, c)]);
  return new THREE.ExtrudeGeometry(s, { depth: h - 2*r, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: 3, curveSegments: 1 }).rotateX(-Math.PI/2).translate(0, -(h/2 - r), 0);
}
// a moulding run along a wall: prof is [out from the wall, height]; n is the wall's normal into the room
function mould(b, prof, p, q, n, color, mode = 7) {
  const t = [-n[1], n[0]]; const dp = p[0]*t[0] + p[1]*t[1], dq = q[0]*t[0] + q[1]*t[1]; const a = dp < dq ? p : q; const len = Math.abs(dq - dp); if (len < 0.02) return;
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(prof.map(([d, y]) => new THREE.Vector2(d, y))), { depth: len, bevelEnabled: false });
  b.add(g, color, mode, new THREE.Matrix4().makeBasis(new V3(n[0], 0, n[1]), new V3(0, 1, 0), new V3(t[0], 0, t[1])).setPosition(a[0], 0, a[1]));
}
// a bound book lying flat, spine towards -x: w spine to fore-edge, h thick, d long
function tome(b, w, h, d, M, color) {
  b.add(new THREE.BoxGeometry(w, 0.005, d).translate(0, h/2 - 0.0025, 0), color, 0, M); b.add(new THREE.BoxGeometry(w, 0.005, d).translate(0, -h/2 + 0.0025, 0), color, 0, M);
  b.add(new THREE.BoxGeometry(0.006, h, d).translate(-w/2 + 0.003, 0, 0), color, 0, M);
  b.add(new THREE.BoxGeometry(w - 0.014, h - 0.010, d - 0.012).translate(0.003, 0, 0), 0xEFE5CF, 0, M);
  for (const s of [-1, 1]) b.add(new THREE.BoxGeometry(0.0016, h - 0.002, 0.007).translate(-w/2 - 0.0006, 0, s*d*0.30), PAL.gold, 5, M);
}

function quad(b, v, uv, color, mode = 0) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([...v[0], ...v[1], ...v[2], ...v[0], ...v[2], ...v[3]], 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute([...uv[0], ...uv[1], ...uv[2], ...uv[0], ...uv[2], ...uv[3]], 2));
  g.computeVertexNormals(); b.add(g, color, mode);
}
// a wall from a to b ([x, z]) seen from inside; uv is metres along and height
function wall(b, a, c, y0, y1, u0 = 0) {
  const L = Math.hypot(c[0] - a[0], c[1] - a[1]);
  quad(b, [[a[0], y0, a[1]], [c[0], y0, c[1]], [c[0], y1, c[1]], [a[0], y1, a[1]]], [[u0, y0], [u0 + L, y0], [u0 + L, y1], [u0, y1]], PAL.cream, 8);
}

function paper(x, w, h, tone = '#f1e7d1') {
  x.fillStyle = tone; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${150 + Math.random()*60 | 0},${120 + Math.random()*50 | 0},${80 + Math.random()*40 | 0},${Math.random()*0.05})`; x.beginPath(); x.arc(Math.random()*w, Math.random()*h, Math.random()*3 + 0.5, 0, 7); x.fill(); }
  const g = x.createRadialGradient(w/2, h/2, Math.min(w, h)*0.3, w/2, h/2, Math.max(w, h)*0.75); g.addColorStop(0, 'rgba(160,120,70,0)'); g.addColorStop(1, 'rgba(160,120,70,0.16)'); x.fillStyle = g; x.fillRect(0, 0, w, h);
}
// line breaking that keeps a Latin word whole and never starts a line with a closing mark
function wrap(x, text, px, py, maxW, lh) {
  const toks = text.match(/[A-Za-z0-9]+|\n|[\s\S]/g) || []; const NOHEAD = '，。、；：！？」』）》…—·', NOTAIL = '「『（《';
  const out = []; let line = '';
  for (const tk of toks) {
    if (tk === '\n') { out.push(line); line = ''; continue; }
    if (line && x.measureText(line + tk).width > maxW && !NOHEAD.includes(tk)) {
      let carry = ''; while (line && NOTAIL.includes(line[line.length - 1])) { carry = line[line.length - 1] + carry; line = line.slice(0, -1); }
      out.push(line.replace(/\s+$/, '')); line = carry; if (tk === ' ') continue;
    }
    line += tk;
  }
  if (line) out.push(line); out.forEach((l, i) => x.fillText(l, px, py + i*lh)); return py + out.length*lh;
}
function vine(x, x0, y0, y1) {
  x.strokeStyle = '#8eaa90'; x.lineWidth = 2.5; x.lineCap = 'round'; x.beginPath(); x.moveTo(x0, y0);
  const n = Math.round((y1 - y0)/70); for (let i = 0; i < n; i++) { const ya = y0 + i*70; x.bezierCurveTo(x0 + 16, ya + 20, x0 - 16, ya + 50, x0, ya + 70); } x.stroke();
  for (let i = 0; i < n; i++) { const ya = y0 + i*70 + 35, sd = i % 2 ? 1 : -1; x.fillStyle = i % 2 ? '#a9c3a0' : '#bfd2b4'; x.beginPath(); x.ellipse(x0 + sd*13, ya, 13, 6, sd*0.7, 0, 7); x.fill();
    if (i % 3 === 1) { x.fillStyle = '#eba56c'; x.beginPath(); x.arc(x0 - sd*12, ya + 8, 7, 0, 7); x.fill(); } }
}

// ---- the codex: three openings, written from the character bible
const PAGES = [
  { head: 'KOKO', sub: '血橙崽 · 人物设定书', init: 'K', body: 'Koko 是一只软软的潮玩崽：会轻轻跳舞，爱收集圆圆的小东西，看起来乖，偶尔有一点点神秘的小好奇。' },
  { head: 'ORIGO', sub: '从哪里来', init: '圆', body: '有人轻轻剥开一颗圆圆的果子，果皮掉进潮玩世界的软绒机。机子吐出一只崽，夹克还是暖暖的橙皮色，胸口留着圆圆的小贴。他不会哭，只会轻轻跳一下，然后说：「叫我 Koko。」' },
  { head: 'INDOLES', sub: '四个关键词', init: '软', list: [['软软开心', '无聊了就跳一小段，或盯着圆东西发呆。'], ['小小好奇', '安静地想摸一摸、看一看。'], ['认真玩耍', '跳歪了也不尴尬，会再来一次。'], ['慢热亲近', '熟了以后会歪头、举手，把圆贴纸给你看。']] },
  { head: 'STVDIA', sub: '喜欢做的事', init: '舞', list: [['轻轻跳舞', '节奏轻快，认真练，不追求炫技。'], ['收集圆东西', '贴纸、胸章、小球、果子。圆的最乖。'], ['开盒子', '打开看看里面是谁。'], ['发呆看云', '跳累了就站着，像玩具在休息。']] },
  { head: 'VERBA', sub: '常说的话', init: '话', quotes: ['Koko 来啦。', '今天跳一下下。', '圆圆的，给我。', '别碰钉钉。', '再来一次。', '晚安，橙子。'] },
  { head: 'FORMA', sub: '认得出来的样子', init: '形', list: [['脸', '黑椭圆实心眼，两颊橙点雀斑，没有嘴。'], ['发', '蓬松凌乱的黑色短发。'], ['耳', '右耳一颗银色小钉，左耳空。'], ['衣', '血橙夹克，黑高领，黑裤，永远赤脚。']], foot: '对朋友，叫「橙子」。' },
];
function pageTexture(pg, no, right) {
  const W = 760, H = 1040, K = 1.5; const [c, x] = mk(W*K, H*K); x.scale(K, K); paper(x, W, H);
  // the page darkens as it dips into the gutter
  { const g = x.createLinearGradient(right ? 0 : W, 0, right ? 90 : W - 90, 0); g.addColorStop(0, 'rgba(96,66,36,0.30)'); g.addColorStop(0.45, 'rgba(96,66,36,0.08)'); g.addColorStop(1, 'rgba(96,66,36,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H); }
  const mx = right ? 70 : 96, tw = W - 166;
  vine(x, right ? W - 44 : 44, 90, H - 110);
  x.strokeStyle = 'rgba(156,74,51,0.35)'; x.lineWidth = 1.5; x.strokeRect(right ? 44 : 70, 56, W - 114, H - 112);
  x.fillStyle = SANG; x.textBaseline = 'alphabetic'; x.textAlign = 'left';
  x.font = `500 58px ${SERIF}`; try { x.letterSpacing = '14px'; } catch (e) { /* older engines */ } x.fillText(pg.head, mx, 150);
  try { x.letterSpacing = '4px'; } catch (e) { /* older engines */ }
  x.font = `26px ${SONG}`; x.fillStyle = '#6f6557'; x.fillText(pg.sub, mx, 196);
  x.strokeStyle = '#cfae6a'; x.lineWidth = 2; x.beginPath(); x.moveTo(mx, 220); x.lineTo(mx + tw, 220); x.stroke();
  // illuminated initial
  const ix = mx, iy = 256, is = 150; const g = x.createLinearGradient(ix, iy, ix, iy + is); g.addColorStop(0, '#7fa9cf'); g.addColorStop(1, '#5f8cb6');
  x.fillStyle = g; x.fillRect(ix, iy, is, is); x.strokeStyle = '#d9b268'; x.lineWidth = 5; x.strokeRect(ix + 4, iy + 4, is - 8, is - 8);
  for (const [dx, dy] of [[18, 18], [is - 18, 18], [18, is - 18], [is - 18, is - 18]]) { x.fillStyle = '#eba56c'; x.beginPath(); x.arc(ix + dx, iy + dy, 7, 0, 7); x.fill(); }
  x.fillStyle = '#fbf3df'; x.textAlign = 'center'; x.font = /[A-Z]/.test(pg.init) ? `500 120px ${SERIF}` : `600 96px ${SONG}`; try { x.letterSpacing = '0px'; } catch (e) { /* older engines */ }
  x.fillText(pg.init, ix + is/2, iy + (/[A-Z]/.test(pg.init) ? 118 : 108)); x.textAlign = 'left';
  try { x.letterSpacing = '2px'; } catch (e) { /* older engines */ }
  x.fillStyle = '#4a4036'; let y = iy + is + 62; const mw = tw - 14;
  if (pg.body) { x.font = `33px ${SONG}`; y = wrap(x, pg.body, mx, y, mw, 58); }
  if (pg.list) for (const [k, v] of pg.list) { x.font = `600 34px ${SONG}`; x.fillStyle = SANG; x.fillText(k, mx, y); x.font = `29px ${SONG}`; x.fillStyle = '#4a4036'; y = wrap(x, v, mx, y + 48, mw, 46) + 30; }
  if (pg.quotes) { x.font = `36px ${SONG}`; pg.quotes.forEach((q) => { x.fillStyle = '#eba56c'; x.beginPath(); x.arc(mx + 10, y - 12, 8, 0, 7); x.fill(); x.fillStyle = '#4a4036'; x.fillText(`「${q}」`, mx + 34, y); y += 76; }); }
  if (pg.foot) { x.font = `italic 28px ${SONG}`; x.fillStyle = '#6f6557'; x.fillText(pg.foot, mx, H - 130); }
  x.font = `24px ${SERIF}`; x.fillStyle = '#8a7d6a'; x.textAlign = 'center'; x.fillText(String(no), W/2, H - 76);
  return ctex(c);
}

// the fitting photos redrawn in red chalk: the studio backdrop keyed out, nothing below the soles
function chalk(img, sole) {
  const iw = img.width, ih = img.height; const [t, tx] = mk(iw, ih); tx.drawImage(img, 0, 0); const d = tx.getImageData(0, 0, iw, ih); const p = d.data;
  for (let i = 0; i < p.length; i += 4) {
    const r = p[i]/255, g = p[i + 1]/255, b2 = p[i + 2]/255; const yy = (i/4/iw | 0);
    const key = Math.min(1, Math.max(0, (b2 - Math.max(r, g)*1.03)/0.035)); const L = Math.sqrt(0.2126*r + 0.7152*g + 0.0722*b2); const ink = Math.min(1, (1 - L)*1.05 + 0.08);
    p[i] = 236 - (236 - 140)*ink; p[i + 1] = 223 - (223 - 58)*ink; p[i + 2] = 198 - (198 - 38)*ink;
    p[i + 3] = 255*(1 - key)*(yy > sole + 4 ? 0 : 1)*Math.min(1, 0.55 + ink*0.6);
  }
  tx.putImageData(d, 0, 0); return t;
}
// ---- the proportion sheet, drawn from the front fitting photo
function vitruvianTexture(img) {
  const W = 1000, H = 1320; const [c, x] = mk(W, H); paper(x, W, H, '#ecdfc6');
  const side = 720, sx0 = (W - side)/2, sy0 = 250, cx = W/2, rC = 446, cy = sy0 + side - rC;
  x.strokeStyle = SANG; x.lineWidth = 2.2; x.globalAlpha = 0.8;
  x.strokeRect(sx0, sy0, side, side); x.beginPath(); x.arc(cx, cy, rC, 0, 7); x.stroke();
  x.lineWidth = 1; x.globalAlpha = 0.45; x.beginPath(); x.moveTo(cx, sy0 - 40); x.lineTo(cx, sy0 + side + 30); x.moveTo(sx0 - 40, sy0 + side*0.48); x.lineTo(sx0 + side + 40, sy0 + side*0.48); x.stroke();
  for (let i = 0; i <= 10; i++) { const yy = sy0 + side*i/10; x.beginPath(); x.moveTo(sx0 - (i % 5 ? 10 : 22), yy); x.lineTo(sx0, yy); x.stroke(); }
  x.globalAlpha = 1;
  if (img) { const iw = img.width, ih = img.height; const top = ih*213/1280, sole = ih*1092/1280; const sc = side/(sole - top); x.drawImage(chalk(img, sole), cx - iw*sc/2, sy0 - top*sc, iw*sc, ih*sc); }
  x.fillStyle = SANG; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
  x.font = `500 46px ${SERIF}`; try { x.letterSpacing = '12px'; } catch (e) { /* older engines */ } x.fillText('KOKO · DE PROPORTIONE', cx + 6, 120);
  try { x.letterSpacing = '2px'; } catch (e) { /* older engines */ }
  x.font = `italic 25px ${SERIF}`; x.fillText('rotunda optima sunt', cx, 164);
  x.textAlign = 'right'; x.font = `italic 25px ${SERIF}`; x.fillText('caput · XLVIII', sx0 + side - 14, sy0 + 34); x.fillText('corpus · LII', sx0 + side - 14, sy0 + side*0.48 + 34);
  x.font = `27px ${SONG}`; x.fillStyle = '#5b4a3c'; x.textAlign = 'center';
  x.fillText('头占全身四十八分，身五十二分。眼为实心竖椭圆，高为头高的一成三。', cx, sy0 + side + 96);
  x.fillText('两颊各三点雀斑。右耳一钉，左耳空。无嘴。永远赤脚。', cx, sy0 + side + 142);
  return ctex(c);
}
// ---- the same figure turned three ways, ruled across so the heights can be read off
function viewsTexture(img) {
  const W = 1560, H = 1000; const [c, x] = mk(W, H); paper(x, W, H, '#ecdfc6');
  const fh = 560, y0 = 232, y1 = y0 + fh, cx = W/2;
  x.fillStyle = SANG; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
  x.font = `500 46px ${SERIF}`; try { x.letterSpacing = '12px'; } catch (e) { /* older engines */ } x.fillText('KOKO · TRES ASPECTVS', cx + 6, 118);
  try { x.letterSpacing = '2px'; } catch (e) { /* older engines */ }
  x.font = `italic 25px ${SERIF}`; x.fillText('idem undique', cx, 162);
  let fw = 940;
  if (img) { const iw = img.width, ih = img.height; const top = ih*0.322, sole = ih*0.657; const sc = fh/(sole - top); fw = iw*sc; x.drawImage(chalk(img, sole), cx - fw/2, y0 - top*sc, fw, ih*sc); }
  x.strokeStyle = SANG; x.lineWidth = 1; x.globalAlpha = 0.5;
  for (const [yy, lab] of [[y0, 'vertex'], [y0 + fh*0.48, 'mentum'], [y1, 'planta']]) { x.beginPath(); x.moveTo(150, yy); x.lineTo(W - 150, yy); x.stroke(); x.globalAlpha = 0.9; x.font = `italic 23px ${SERIF}`; x.textAlign = 'left'; x.fillText(lab, W - 142, yy + 7); x.globalAlpha = 0.5; }
  for (let i = 0; i <= 10; i++) { const yy = y0 + fh*i/10; x.beginPath(); x.moveTo(150 - (i % 5 ? 10 : 22), yy); x.lineTo(150, yy); x.stroke(); }
  x.globalAlpha = 1; x.textAlign = 'center'; x.font = `500 30px ${SERIF}`;
  ['I', 'II', 'III'].forEach((n, i) => { const px = cx + (i - 1)*fw/3; x.fillText(n, px, y1 + 58); x.globalAlpha = 0.45; x.beginPath(); x.moveTo(px, y1 + 8); x.lineTo(px, y1 + 24); x.stroke(); x.globalAlpha = 1; });
  x.font = `27px ${SONG}`; x.fillStyle = '#5b4a3c'; x.fillText('同一只 Koko，转三个角度。蓬发、雀斑、耳上的钉、赤脚，从哪边看都在。', cx, y1 + 128);
  return ctex(c);
}
function plaqueTexture() {
  const [c, x] = mk(768, 256); const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#6b98bd'); g.addColorStop(1, '#5a87ae'); x.fillStyle = g; x.fillRect(0, 0, 768, 256);
  x.strokeStyle = '#e6c98c'; x.lineWidth = 5; x.strokeRect(14, 14, 740, 228);
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#f1dba6'; x.font = `500 50px ${SERIF}`; try { x.letterSpacing = '9px'; } catch (e) { /* older engines */ } x.fillText('HIC STABIT KOKO', 384 + 4, 102);
  x.font = `34px ${SONG}`; try { x.letterSpacing = '10px'; } catch (e) { /* older engines */ } x.fillStyle = '#f6ecd6'; x.fillText('真身将立于此', 384 + 5, 176);
  return ctex(c);
}

// the nineteen recesses: one in the middle, six round it, twelve round those
export function slotPositions() {
  const out = [[0, 0]]; const dx = 0.44, dy = 0.381;
  const ring1 = [[1, 0], [0.5, 1], [-0.5, 1], [-1, 0], [-0.5, -1], [0.5, -1]];
  const ring2 = [[2, 0], [1.5, 1], [1, 2], [0, 2], [-1, 2], [-1.5, 1], [-2, 0], [-1.5, -1], [-1, -2], [0, -2], [1, -2], [1.5, -1]];
  for (const [a, b] of [...ring1, ...ring2]) out.push([a*dx, b*dy]);
  return out;
}

// the triangles of the built room sorted for the castle: walls (mode 8), floor (9), vault (10), the two
// lunettes, and the skylight's cream ring, shaft and gilt rims; each part keeps position, normal and uv
function splitShell(g, { hz, hWall, top }) {
  const P = g.attributes.position.array, M = g.attributes.aMode.array, C = g.attributes.aCol.array, n = g.attributes.position.count;
  const lun = new THREE.Color(PAL.plaster);
  const kind = (i) => {
    const m = Math.round(M[i]); if (m === 8) return 'wall'; if (m === 9) return 'floor'; if (m === 10) return 'vault';
    const cx = (P[i*3] + P[i*3 + 3] + P[i*3 + 6])/3, cy = (P[i*3 + 1] + P[i*3 + 4] + P[i*3 + 7])/3, cz = (P[i*3 + 2] + P[i*3 + 5] + P[i*3 + 8])/3;
    if (m === 0 && cy > hWall - 1e-3 && Math.abs(Math.abs(cz) - hz) < 0.01 && Math.abs(C[i*3] - lun.r) < 1e-4 && Math.abs(C[i*3 + 2] - lun.b) < 1e-4) return 'lun';
    if ((m === 0 || m === 5) && cy > top - 0.12 && Math.hypot(cx, cz) < 1.08) return 'ocu';
    return 'rest';
  };
  const idx = { wall: [], floor: [], vault: [], lun: [], ocu: [], rest: [] };
  for (let i = 0; i < n; i += 3) idx[kind(i)].push(i);
  const take = (list, names) => { const o = new THREE.BufferGeometry();
    for (const a of names) { const src = g.attributes[a], k = src.itemSize, d = new Float32Array(list.length*3*k); let w = 0;
      for (const i of list) for (let j = 0; j < 3*k; j++) d[w++] = src.array[i*k + j]; o.setAttribute(a, new THREE.BufferAttribute(d, k)); }
    return o; };
  const ALL = ['position', 'normal', 'aCol', 'aMode', 'uv'], PNU = ['position', 'normal', 'uv'];
  return { rest: take(idx.rest, ALL), legacy: take([...idx.wall, ...idx.floor, ...idx.vault, ...idx.lun, ...idx.ocu], ALL),
    wall: take(idx.wall, PNU), floor: take(idx.floor, PNU), vault: take(idx.vault, PNU), lun: take(idx.lun, PNU) };
}

export function buildStudiolo(fresco, atlas, frontImg, turnImg, opts = {}) {
  const group = new THREE.Group(); group.position.copy(SO);
  const { hx, hz, hWall, rise } = SD; const b = new Builder();
  const vaultY = (x) => hWall + rise*Math.sqrt(Math.max(0, 1 - (x/hx)*(x/hx)));

  // ---- shell
  quad(b, [[-hx, 0, hz], [hx, 0, hz], [hx, 0, -hz], [-hx, 0, -hz]], [[-hx, hz], [hx, hz], [hx, -hz], [-hx, -hz]], PAL.cream, 9);
  wall(b, [-hx, hz], [-hx, -hz], 0, hWall, 0); wall(b, [hx, -hz], [hx, hz], 0, hWall, 0);
  // far wall with the round opening; uv = (x + hx, y) so the panels line up
  { const s = new THREE.Shape([new THREE.Vector2(-hx, 0), new THREE.Vector2(hx, 0), new THREE.Vector2(hx, hWall), new THREE.Vector2(-hx, hWall)]);
    const h = new THREE.Path(); h.absarc(0, SD.door.y, SD.door.r, 0, Math.PI*2, true); s.holes.push(h);
    const g = new THREE.ShapeGeometry(s, 48); const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) + hx);
    b.add(g.translate(0, 0, -hz), PAL.cream, 8); }
  // entrance wall with its door
  const ew = 0.8, eh = 2.16;
  wall(b, [hx, hz], [ew, hz], 0, hWall, 0); wall(b, [-ew, hz], [-hx, hz], 0, hWall, hx + ew); wall(b, [ew, hz], [-ew, hz], 2.30, hWall, hx - ew);
  quad(b, [[ew, 2.16, hz], [-ew, 2.16, hz], [-ew, 2.30, hz], [ew, 2.30, hz]], [[0, 2.16], [1.6, 2.16], [1.6, 2.30], [0, 2.30]], PAL.cream, 8);
  for (const sx of [-1, 1]) {
    const cx = sx*0.39, front = hz - 0.13, depth = 0.075;
    const stile = (x, w) => b.add(new THREE.BoxGeometry(w, eh, depth).translate(cx + x, eh/2, front + depth/2), PAL.woodDk, 7);
    stile(-0.325, 0.09); stile(0.325, 0.09);
    for (const [y, h, w] of [[eh - 0.055, 0.11, 0.56], [eh*0.46, 0.12, 0.56], [0.09, 0.16, 0.56]]) b.add(new THREE.BoxGeometry(w, h, depth).translate(cx, y, front + depth/2), PAL.wood, 7);
    b.add(new THREE.BoxGeometry(0.52, eh - 0.42, 0.018).translate(cx, eh/2, front + depth - 0.01), PAL.woodDk, 7);
    for (const [yc, h] of [[eh*0.72, 0.78], [eh*0.24, 0.62]]) {
      b.add(raisedPanel(0.48, h).rotateY(Math.PI).translate(cx, yc, front + 0.012), PAL.woodLt, 7);
    }
    const knob = new THREE.LatheGeometry([new THREE.Vector2(0.001, 0), new THREE.Vector2(0.046, 0), new THREE.Vector2(0.05, 0.008), new THREE.Vector2(0.016, 0.022), new THREE.Vector2(0.012, 0.04), new THREE.Vector2(0.026, 0.055), new THREE.Vector2(0.032, 0.078), new THREE.Vector2(0.012, 0.092)], 20);
    b.add(knob.rotateX(-Math.PI/2).translate(cx + sx*0.27, 1.05, front - 0.01), PAL.gold, 5);
    b.add(new THREE.BoxGeometry(0.11, eh + 0.1, 0.13).translate(sx*(ew + 0.03), eh/2 + 0.02, front + 0.04), PAL.woodDk, 7);
  }
  b.add(new THREE.BoxGeometry(2*ew + 0.28, 0.12, 0.14).translate(0, eh + 0.08, hz - 0.045), PAL.woodDk, 7);
  b.add(new THREE.BoxGeometry(2*ew + 0.1, eh + 0.2, 0.04).translate(0, eh/2 + 0.05, hz + 0.09), 0x6b5236, 0);
  // lunettes at both ends
  for (const z of [-hz, hz]) { const pts = [new THREE.Vector2(-hx, hWall)]; for (let i = 0; i <= 40; i++) { const xx = -hx + 2*hx*i/40; pts.push(new THREE.Vector2(xx, vaultY(xx))); } pts.push(new THREE.Vector2(hx, hWall));
    b.add(new THREE.ShapeGeometry(new THREE.Shape(pts)).translate(0, 0, z), PAL.plaster, 0); }
  b.add(new THREE.TorusGeometry(0.40, 0.035, 10, 48).translate(0, hWall + 0.52, -hz + 0.03), PAL.gold, 5);
  { const m = new THREE.Mesh(new THREE.CircleGeometry(0.385, 56), texMaterial(atlas.texture, 3, { cell: atlas.cell(0), glaze: 1, seed: 4.2, aspect: 1 })); m.position.set(0, hWall + 0.52, -hz + 0.032); group.add(m); }
  // vault with a round skylight
  { const nu = 56, nv = 72; const P = (u, v) => { const ph = Math.PI*(1 - u); return [hx*Math.cos(ph), hWall + rise*Math.sin(ph), -hz + 2*hz*v]; };
    const pos = [], uv = []; const rh = SD.ocuR + 0.06;
    for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
      const q = [P(i/nu, j/nv), P((i + 1)/nu, j/nv), P((i + 1)/nu, (j + 1)/nv), P(i/nu, (j + 1)/nv)];
      if (q.some((p) => Math.hypot(p[0], p[2]) < rh)) continue;
      const t = [[i/nu, j/nv], [(i + 1)/nu, j/nv], [(i + 1)/nu, (j + 1)/nv], [i/nu, (j + 1)/nv]].map(([a, c]) => [a*6.82, c*7.44]);
      for (const k of [0, 1, 2, 0, 2, 3]) { pos.push(...q[k]); uv.push(...t[k]); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals(); b.add(g, PAL.azure, 10);
    const top = hWall + rise;
    b.add(new THREE.RingGeometry(SD.ocuR, SD.ocuR + 0.30, 64).rotateX(Math.PI/2).translate(0, top - 0.055, 0), PAL.cream, 0);
    b.add(surf((u, v, t) => t.set(Math.cos(u*Math.PI*2)*SD.ocuR, top - 0.055 + v*0.75, Math.sin(u*Math.PI*2)*SD.ocuR), 64, 1), PAL.cream, 0);
    b.add(new THREE.TorusGeometry(SD.ocuR + 0.01, 0.035, 10, 64).rotateX(Math.PI/2).translate(0, top - 0.06, 0), PAL.gold, 5);
    b.add(new THREE.TorusGeometry(SD.ocuR + 0.30, 0.018, 8, 64).rotateX(Math.PI/2).translate(0, top - 0.06, 0), PAL.gold, 5); }

  // ---- the chapel behind the round door
  { const az = SD.apseZ, ar = SD.apseR, a0 = Math.asin(SD.door.r/ar); const AZ = 0xBFD9EA;
    b.add(surf((u, v, t) => { const a = a0 + u*(Math.PI*2 - 2*a0); return t.set(Math.sin(a)*ar, v*2.3, az + Math.cos(a)*ar); }, 64, 1), PAL.rose, 0);
    b.add(surf((u, v, t) => { const a = u*Math.PI*2, ph = v*Math.PI/2; return t.set(Math.sin(a)*ar*Math.cos(ph), 2.3 + ar*0.8*Math.sin(ph), az + Math.cos(a)*ar*Math.cos(ph)); }, 64, 16), AZ, 0);
    b.add(new THREE.CircleGeometry(ar, 64).rotateX(-Math.PI/2).translate(0, 0.002, az), PAL.cream, 0);
    b.add(new THREE.RingGeometry(0.80, 0.86, 64).rotateX(-Math.PI/2).translate(0, 0.004, az), PAL.gold, 5);
    b.add(surf((u, v, t) => t.set(Math.sin(u*Math.PI*2)*(ar - 0.01), 2.3, az + Math.cos(u*Math.PI*2)*(ar - 0.01)).add(new V3(0, v*0.05, 0)), 64, 1), PAL.gold, 5);
    const zn = az + Math.cos(a0)*ar;
    for (const sx of [-1, 1]) quad(b, [[sx*SD.door.r, 0, -hz], [sx*SD.door.r, 0, zn], [sx*SD.door.r, 3.0, zn], [sx*SD.door.r, 3.0, -hz]], [[0, 0], [1, 0], [1, 1], [0, 1]], PAL.soffit, 0);
    quad(b, [[-SD.door.r, 2.75, -hz], [SD.door.r, 2.75, -hz], [SD.door.r, 2.75, zn], [-SD.door.r, 2.75, zn]], [[0, 0], [1, 0], [1, 1], [0, 1]], PAL.soffit, 0);
    quad(b, [[-SD.door.r, 0.002, -hz], [SD.door.r, 0.002, -hz], [SD.door.r, 0.002, zn], [-SD.door.r, 0.002, zn]], [[0, 0], [1, 0], [1, 1], [0, 1]], PAL.cream, 0);
    // a low dado, a painted niche behind the pedestal, and gold stars in the little dome
    const onWall = (a, y, r, t = new V3()) => t.set(Math.sin(a)*r, y, az + Math.cos(a)*r);
    b.add(surf((u, v, t) => onWall(a0 + u*(Math.PI*2 - 2*a0), v*0.52, ar - 0.02, t), 64, 1), PAL.stoneLt, 0);
    b.add(surf((u, v, t) => onWall(a0 + u*(Math.PI*2 - 2*a0), 0.52 + v*0.035, ar - 0.03, t), 64, 1), PAL.gold, 5);
    const NW = 0.52, NY0 = 0.64, NY1 = 1.78;
    b.add(surf((u, v, t) => { const y = NY0 + v*(NY1 + NW - NY0 - 0.001); const w = y < NY1 ? NW : Math.sqrt(Math.max(NW*NW - (y - NY1)**2, 0)); return onWall(Math.PI + (u*2 - 1)*w/ar, y, ar - 0.02, t); }, 24, 40), 0x9FC3E0, 0);
    const np = []; for (let i = 0; i <= 8; i++) np.push(onWall(Math.PI - NW/ar, NY0 + (NY1 - NY0)*i/8, ar - 0.03));
    for (let i = 1; i < 24; i++) { const q = Math.PI*i/24; np.push(onWall(Math.PI - Math.cos(q)*NW/ar, NY1 + Math.sin(q)*NW, ar - 0.03)); }
    for (let i = 8; i >= 0; i--) np.push(onWall(Math.PI + NW/ar, NY0 + (NY1 - NY0)*i/8, ar - 0.03));
    b.add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(np, false, 'catmullrom', 0.1), 140, 0.020, 8), PAL.gold, 5);
    const star = (R, r) => { const s = new THREE.Shape(); for (let i = 0; i < 16; i++) { const q = i/16*Math.PI*2, rr = i % 2 ? r : R; s[i ? 'lineTo' : 'moveTo'](Math.cos(q)*rr, Math.sin(q)*rr); } s.closePath(); return new THREE.ShapeGeometry(s); };
    const C0 = new V3(0, 2.3, az), m4 = new THREE.Matrix4(), yUp = new V3(0, 1, 0);
    const pin = (p, R) => { m4.lookAt(C0, p, yUp).setPosition(p); b.add(star(R, R*0.36).applyMatrix4(m4), PAL.gold, 5); };
    [[0, 0.40, 0.11], [-0.58, 0.32, 0.08], [0.58, 0.32, 0.08], [-1.12, 0.46, 0.07], [1.12, 0.46, 0.07], [-0.34, 0.82, 0.07], [0.34, 0.82, 0.07], [0, 1.18, 0.06], [-0.86, 0.92, 0.055], [0.86, 0.92, 0.055]]
      .forEach(([da, ph, R]) => { const a = Math.PI + da; pin(new V3(Math.sin(a)*ar*Math.cos(ph), 2.3 + ar*0.8*Math.sin(ph), az + Math.cos(a)*ar*Math.cos(ph)).lerp(C0, 0.015), R); });
    [[-0.26, 1.98, 0.035], [0.24, 1.86, 0.03], [0, 2.12, 0.045], [-0.34, 1.32, 0.028], [0.36, 1.20, 0.03], [0.3, 0.86, 0.026], [-0.3, 0.9, 0.024]]
      .forEach(([dx, y, R]) => { const p = onWall(Math.PI + dx/ar, y, ar - 0.035); m4.lookAt(new V3(0, y, az), p, yUp).setPosition(p); b.add(star(R, R*0.36).applyMatrix4(m4), PAL.gold, 5); });
    // pedestal
    b.add(new THREE.CylinderGeometry(0.58, 0.62, 0.12, 48).translate(0, 0.06, az), PAL.stoneLt, 0);
    b.add(new THREE.CylinderGeometry(0.46, 0.46, 0.10, 48).translate(0, 0.17, az), PAL.stone, 0);
    b.add(new THREE.CylinderGeometry(0.30, 0.34, 0.74, 48).translate(0, 0.59, az), PAL.cream, 0);
    b.add(new THREE.CylinderGeometry(0.40, 0.32, 0.07, 48).translate(0, 0.995, az), PAL.stoneLt, 0);
    b.add(new THREE.TorusGeometry(0.40, 0.014, 8, 48).rotateX(Math.PI/2).translate(0, 1.03, az), PAL.gold, 5); }
  // ring round the opening
  b.add(new THREE.TorusGeometry(SD.door.r + 0.035, 0.07, 14, 72).translate(0, SD.door.y, -hz + 0.01), PAL.woodDk, 7);
  b.add(new THREE.TorusGeometry(SD.door.r + 0.125, 0.014, 8, 72).translate(0, SD.door.y, -hz + 0.02), PAL.gold, 5);

  // ---- joinery: skirting, chair rail, cap rail and cornice run round the room; a post stands in each corner
  const WAL = 0x8E6A48;
  { const skirt = [[0, 0], [0.034, 0], [0.034, 0.10], [0.022, 0.125], [0.012, 0.15], [0, 0.15]];
    const chair = [[0, 0.795], [0.018, 0.795], [0.042, 0.82], [0.046, 0.845], [0.042, 0.87], [0.018, 0.895], [0, 0.895]];
    const cap = [[0, 2.16], [0.02, 2.16], [0.03, 2.20], [0.058, 2.235], [0.062, 2.275], [0.03, 2.295], [0, 2.30]];
    const bead = [[0.058, 2.243], [0.070, 2.243], [0.070, 2.262], [0.058, 2.262]];
    const corn = [[0, hWall - 0.16], [0.025, hWall - 0.16], [0.04, hWall - 0.10], [0.10, hWall - 0.05], [0.11, hWall - 0.01], [0.11, hWall + 0.03], [0, hWall + 0.03]];
    const gilt = [[0.108, hWall + 0.03], [0.125, hWall + 0.03], [0.125, hWall + 0.055], [0, hWall + 0.055], [0, hWall + 0.03]];
    // each wall is cut where a door or a frame breaks it
    const run = (prof, col, mode, gaps = {}) => {
      const seg = (p, q, n, gs = []) => { const ax = p[0] === q[0] ? 1 : 0; const at2 = (v) => (ax ? [p[0], v] : [v, p[1]]); let lo = Math.min(p[ax], q[ax]); const hi = Math.max(p[ax], q[ax]);
        for (const [g0, g1] of gs) { mould(b, prof, at2(lo), at2(g0), n, col, mode); lo = g1; } mould(b, prof, at2(lo), at2(hi), n, col, mode); };
      seg([-hx, -hz], [-hx, hz], [1, 0], gaps.left); seg([hx, -hz], [hx, hz], [-1, 0], gaps.right);
      seg([-hx, -hz], [hx, -hz], [0, 1], gaps.far); seg([-hx, hz], [hx, hz], [0, -1], gaps.near);
    };
    run(skirt, WAL, 7, { far: [[-0.36, 0.36]], near: [[-0.87, 0.87]] });
    run(chair, PAL.woodDk, 7, { far: [[-1.22, 1.22]], near: [[-0.87, 0.87]] });
    run(cap, PAL.wood, 7, { far: [[-1.15, 1.15]], near: [[-0.91, 0.91]], left: [[-1.30, 0.10]] });
    run(bead, PAL.gold, 5, { far: [[-1.15, 1.15]], near: [[-0.91, 0.91]], left: [[-1.30, 0.10]] });
    run(corn, PAL.stoneLt, 0); run(gilt, PAL.gold, 5);
    for (let z = -hz + 0.22; z < hz - 0.2; z += 0.16) for (const sx of [-1, 1]) b.add(new THREE.BoxGeometry(0.05, 0.045, 0.07).translate(sx*(hx - 0.045), hWall - 0.185, z), PAL.stoneLt, 0);
    for (let xx = -hx + 0.24; xx < hx - 0.2; xx += 0.16) for (const sz of [-1, 1]) b.add(new THREE.BoxGeometry(0.07, 0.045, 0.05).translate(xx, hWall - 0.185, sz*(hz - 0.045)), PAL.stoneLt, 0);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const px = sx*(hx - 0.07), pz = sz*(hz - 0.07);
      b.add(new THREE.BoxGeometry(0.14, hWall - 0.16, 0.14).translate(px, (hWall - 0.16)/2, pz), PAL.woodDk, 7);
      b.add(new THREE.BoxGeometry(0.19, 0.18, 0.19).translate(px, 0.09, pz), WAL, 7);
      b.add(new THREE.BoxGeometry(0.18, 0.10, 0.18).translate(px, hWall - 0.21, pz), PAL.wood, 7);
      b.add(new THREE.BoxGeometry(0.186, 0.02, 0.186).translate(px, hWall - 0.275, pz), PAL.gold, 5); } }

  // ---- furniture: a writing desk with its lectern on the right, a chest bench on the left
  const DX = hx - 0.50, DZ = -0.52, DT = 0.925;   // desk centre, and the height of its top
  b.add(rbox(0.84, 0.045, 2.10, 0.012).translate(DX, DT - 0.0225, DZ), PAL.wood, 7);
  b.add(new THREE.BoxGeometry(0.74, 0.13, 1.96).translate(DX, DT - 0.11, DZ), PAL.woodDk, 7);
  for (const k of [-1, 0, 1]) { const z = DZ + k*0.64;
    b.add(new THREE.BoxGeometry(0.012, 0.085, 0.56).translate(DX - 0.374, DT - 0.11, z), PAL.woodLt, 7);
    b.add(new THREE.SphereGeometry(0.017, 14, 10).translate(DX - 0.392, DT - 0.11, z), PAL.gold, 5); }
  { const leg = [[0.036, 0], [0.046, 0.015], [0.046, 0.04], [0.028, 0.07], [0.024, 0.30], [0.040, 0.35], [0.046, 0.39], [0.040, 0.43], [0.026, 0.47], [0.024, 0.66], [0.040, 0.71], [0.044, 0.75], [0.044, 0.76]];
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.add(lathe(leg, 20).translate(DX + sx*0.31, 0, DZ + sz*0.92), PAL.wood, 7);
    for (const sx of [-1, 1]) b.add(new THREE.BoxGeometry(0.035, 0.04, 1.84).translate(DX + sx*0.31, 0.16, DZ), PAL.woodDk, 7);
    b.add(new THREE.BoxGeometry(0.62, 0.035, 0.04).translate(DX, 0.16, DZ), PAL.woodDk, 7); }
  // the lectern: a sloping board carried on two cheeks, so the book sits clear of the desk
  const tilt = 0.50, BKX = DX + 0.02, BKZ = DZ + 0.16, BKY = DT + 0.27*Math.sin(tilt) + 0.002;
  { const c = Math.cos(tilt), s = Math.sin(tilt); const x0 = BKX - 0.27*c, x1 = BKX + 0.31*c, y1 = BKY + 0.31*s - 0.003;
    const tri = new THREE.Shape([new THREE.Vector2(x0, DT), new THREE.Vector2(x1, DT), new THREE.Vector2(x1, y1)]);
    for (const sz of [-1, 1]) b.add(new THREE.ExtrudeGeometry(tri, { depth: 0.03, bevelEnabled: false }).translate(0, 0, BKZ + sz*0.38 - 0.015), PAL.woodDk, 7);
    b.add(new THREE.BoxGeometry(0.03, y1 - DT, 0.79).translate(x1 - 0.015, (y1 + DT)/2, BKZ), PAL.woodDk, 7); }
  // candlestick and candle
  const CX = DX + 0.16, CZ = DZ + 0.84;
  b.add(lathe([[0.001, 0], [0.075, 0], [0.08, 0.010], [0.05, 0.022], [0.02, 0.034], [0.014, 0.07], [0.028, 0.085], [0.014, 0.10], [0.012, 0.135], [0.036, 0.145], [0.042, 0.155], [0.024, 0.16], [0.001, 0.16]], 28).translate(CX, DT, CZ), PAL.gold, 5);
  b.add(new THREE.CylinderGeometry(0.016, 0.018, 0.17, 16).translate(CX, DT + 0.245, CZ), PAL.wax, 0);
  b.add(new THREE.CylinderGeometry(0.002, 0.002, 0.016, 6).translate(CX, DT + 0.337, CZ), 0x4a4036, 0);
  // inkwell and quill
  { const IX = DX + 0.20, IZ = DZ - 0.52;
    b.add(lathe([[0.001, 0], [0.05, 0], [0.058, 0.02], [0.052, 0.052], [0.03, 0.064], [0.03, 0.074], [0.037, 0.08], [0.026, 0.08], [0.026, 0.07], [0.001, 0.07]], 28).translate(IX, DT, IZ), 0x5F86AE, 12);
    const q0 = new V3(IX, DT + 0.07, IZ), q1 = new V3(IX + 0.07, DT + 0.36, IZ - 0.10); const d = q1.clone().sub(q0).normalize();
    b.add(new THREE.TubeGeometry(new THREE.LineCurve3(q0, q1), 1, 0.003, 6), 0xF4EBD6, 0);
    const X = new V3().crossVectors(d, new V3(-1, 0, 0)).normalize(), Z = new V3().crossVectors(X, d);
    const s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(0.034, 0.05, 0.022, 0.15); s.quadraticCurveTo(0.012, 0.20, 0, 0.215); s.quadraticCurveTo(-0.010, 0.19, -0.018, 0.14); s.quadraticCurveTo(-0.026, 0.05, 0, 0);
    b.add(new THREE.ShapeGeometry(s, 8), 0xF4EBD6, 0, new THREE.Matrix4().makeBasis(X, d, Z).setPosition(q0.clone().addScaledVector(d, 0.10))); }
  // a dish for round things
  const PX = DX - 0.14, PZ = DZ - 0.62;
  b.add(lathe([[0.001, 0.008], [0.06, 0.008], [0.065, 0], [0.085, 0], [0.15, 0.030], [0.158, 0.036], [0.152, 0.040], [0.09, 0.014], [0.001, 0.012]], 40).translate(PX, DT, PZ), 0xF1EADB, 12);
  b.add(new THREE.TorusGeometry(0.155, 0.004, 6, 48).rotateX(Math.PI/2).translate(PX, DT + 0.038, PZ), PAL.gold, 5);
  // three books and a tied roll at the far end of the desk
  { const at = (x, y, z, ry) => new THREE.Matrix4().makeRotationY(ry).setPosition(x, y, z); const sx = DX + 0.10, sz = DZ - 0.90;
    tome(b, 0.20, 0.036, 0.27, at(sx, DT + 0.018, sz, 0.06), 0xC98D7E); tome(b, 0.18, 0.030, 0.24, at(sx - 0.005, DT + 0.051, sz + 0.005, -0.16), 0x8FA98F); tome(b, 0.16, 0.028, 0.21, at(sx + 0.005, DT + 0.080, sz, 0.22), 0x6E8FB3);
    b.add(new THREE.CylinderGeometry(0.022, 0.022, 0.28, 20).rotateX(Math.PI/2).rotateY(0.35).translate(DX - 0.24, DT + 0.022, DZ - 0.93), 0xF1E7D1, 0);
    b.add(new THREE.TorusGeometry(0.023, 0.004, 6, 20).rotateY(0.35).translate(DX - 0.24, DT + 0.022, DZ - 0.93), 0xC8553D, 0); }
  // a turned stool with a velvet pad
  { const sx = DX - 0.84, sz = DZ + 0.22;
    b.add(lathe([[0.001, 0], [0.17, 0], [0.18, 0.02], [0.09, 0.05], [0.04, 0.09], [0.032, 0.20], [0.05, 0.25], [0.032, 0.30], [0.03, 0.38], [0.08, 0.42], [0.19, 0.44], [0.20, 0.46], [0.19, 0.475], [0.001, 0.475]], 36).translate(sx, 0, sz), PAL.wood, 7);
    b.add(lathe([[0.001, 0], [0.175, 0], [0.19, 0.02], [0.19, 0.045], [0.16, 0.07], [0.001, 0.08]], 36).translate(sx, 0.475, sz), 0xD9A79B, 11); }
  // the cupboard in the far corner: closed below, open shelves above
  const KZ = -2.66, KW = 1.24, S0 = 0.92, S1 = 1.331, S2 = 1.741;
  { const kx = hx - 0.17, fx = hx - 0.34, y1 = 2.14;
    b.add(new THREE.BoxGeometry(0.36, 0.08, KW + 0.04).translate(kx - 0.01, 0.04, KZ), WAL, 7);
    b.add(new THREE.BoxGeometry(0.34, 0.80, KW).translate(kx, 0.48, KZ), PAL.wood, 7);
    for (const s of [-1, 1]) { const z = KZ + s*KW/4;
      b.add(new THREE.BoxGeometry(0.012, 0.66, KW/2 - 0.07).translate(fx - 0.004, 0.48, z), PAL.woodLt, 7);
      b.add(new THREE.TorusGeometry(0.12, 0.008, 8, 40).rotateY(Math.PI/2).translate(fx - 0.011, 0.48, z), PAL.woodDk, 7);
      b.add(new THREE.TorusGeometry(0.075, 0.005, 8, 32).rotateY(Math.PI/2).translate(fx - 0.011, 0.48, z), PAL.gold, 5);
      b.add(new THREE.SphereGeometry(0.016, 12, 8).translate(fx - 0.018, 0.50, KZ + s*0.06), PAL.gold, 5); }
    b.add(rbox(0.39, 0.04, KW + 0.08, 0.008).translate(kx - 0.015, 0.90, KZ), PAL.woodDk, 7);
    b.add(new THREE.BoxGeometry(0.015, y1 - S0, KW).translate(hx - 0.012, (S0 + y1)/2, KZ), 0xA9C2D6, 0);
    for (const s of [-1, 1]) b.add(new THREE.BoxGeometry(0.28, y1 - S0, 0.03).translate(hx - 0.14, (S0 + y1)/2, KZ + s*(KW/2 - 0.015)), PAL.wood, 7);
    for (const y of [S1, S2]) b.add(new THREE.BoxGeometry(0.27, 0.022, KW - 0.06).translate(hx - 0.14, y - 0.011, KZ), PAL.wood, 7);
    b.add(rbox(0.33, 0.05, KW + 0.08, 0.008).translate(hx - 0.165, y1 + 0.025, KZ), PAL.woodDk, 7);
    b.add(new THREE.BoxGeometry(0.005, 0.012, KW + 0.08).translate(hx - 0.332, y1 + 0.025, KZ), PAL.gold, 5);
    // lowest shelf: a row of books standing, one leaning, and a jar
    const up = (x, y, z, lean = 0) => new THREE.Matrix4().makeRotationX(Math.PI/2 + lean).setPosition(x, y, z);
    let z = KZ - KW/2 + 0.07; const cols = [0xC98D7E, 0x6E8FB3, 0xE3C9A0, 0x8FA98F, 0xB9655A, 0x9DBAD3, 0xD9B268];
    [[0.045, 0.27], [0.034, 0.24], [0.05, 0.29], [0.04, 0.25], [0.034, 0.22], [0.046, 0.26], [0.038, 0.28]].forEach(([th, ht], i) => { tome(b, 0.19, th, ht, up(hx - 0.15, S0 + ht/2, z + th/2), cols[i]); z += th + 0.003; });
    tome(b, 0.19, 0.04, 0.25, up(hx - 0.15, S0 + 0.118, z + 0.055, -0.26), 0x5F7FA6);
    const jar = [[0.001, 0], [0.05, 0], [0.055, 0.012], [0.042, 0.05], [0.042, 0.13], [0.055, 0.17], [0.046, 0.19], [0.052, 0.20], [0.001, 0.20]];
    b.add(lathe(jar, 28).translate(hx - 0.15, S0, KZ + 0.36), 0xF1EADB, 12); b.add(new THREE.TorusGeometry(0.043, 0.006, 6, 28).rotateX(Math.PI/2).translate(hx - 0.15, S0 + 0.09, KZ + 0.36), 0x5F86AE, 12);
    b.add(lathe(jar, 28).scale(0.8, 0.8, 0.8).translate(hx - 0.14, S0, KZ + 0.49), 0xE8C0B3, 12);
    // middle shelf: round things in order of size, each on its ring
    [[0.085, 0xE8823C, -0.42], [0.07, 0xA9CDE2, -0.24], [0.058, 0xF1EADB, -0.09], [0.047, 0xE8C0B3, 0.03], [0.038, 0xB9CDB4, 0.13]].forEach(([r, c, dz]) => {
      b.add(new THREE.SphereGeometry(r, 28, 20).translate(hx - 0.15, S1 + r + 0.006, KZ + dz), c, 12); b.add(new THREE.TorusGeometry(r*0.55, 0.006, 6, 28).rotateX(Math.PI/2).translate(hx - 0.15, S1 + 0.006, KZ + dz), PAL.gold, 5); });
    const flat = (x, y, zz, ry) => new THREE.Matrix4().makeRotationY(ry).setPosition(x, y, zz);
    tome(b, 0.19, 0.034, 0.25, flat(hx - 0.15, S1 + 0.017, KZ + 0.40, 0.05), 0x8FA98F); tome(b, 0.17, 0.03, 0.22, flat(hx - 0.15, S1 + 0.049, KZ + 0.40, -0.12), 0xC98D7E);
    b.add(new THREE.SphereGeometry(0.034, 20, 14).translate(hx - 0.15, S1 + 0.098, KZ + 0.40), PAL.gold, 5);
    // top shelf: two jars and a lidded round box either side of the standing plate
    b.add(lathe(jar, 28).scale(0.9, 1.05, 0.9).translate(hx - 0.14, S2, KZ - 0.42), 0x9DBAD3, 12); b.add(lathe(jar, 28).scale(0.75, 0.8, 0.75).translate(hx - 0.15, S2, KZ - 0.29), 0xF1EADB, 12);
    b.add(new THREE.CylinderGeometry(0.075, 0.075, 0.07, 32).translate(hx - 0.15, S2 + 0.035, KZ + 0.40), 0xE8C0B3, 12); b.add(lathe([[0.001, 0], [0.079, 0], [0.079, 0.012], [0.03, 0.03], [0.001, 0.032]], 32).translate(hx - 0.15, S2 + 0.07, KZ + 0.40), 0xF1EADB, 12);
    b.add(new THREE.SphereGeometry(0.012, 12, 8).translate(hx - 0.15, S2 + 0.108, KZ + 0.40), PAL.gold, 5);
    b.add(new THREE.TorusGeometry(0.150, 0.008, 8, 48).rotateY(Math.PI/2).rotateZ(0.16).translate(hx - 0.075, S2 + 0.158, KZ), PAL.gold, 5); }
  // the armillary's stand and cradle, in the other far corner
  const AP = new V3(-hx + 0.64, 1.31, -hz + 0.72);
  b.add(lathe([[0.001, 0], [0.20, 0], [0.21, 0.02], [0.13, 0.05], [0.05, 0.09], [0.034, 0.32], [0.062, 0.38], [0.034, 0.44], [0.028, 0.84], [0.058, 0.90], [0.03, 0.96], [0.024, 1.00], [0.001, 1.00]], 32).translate(AP.x, 0, AP.z), PAL.woodDk, 7);
  b.add(new THREE.TorusGeometry(0.31, 0.012, 8, 48, Math.PI).rotateZ(Math.PI).rotateY(0.6).translate(AP.x, AP.y, AP.z), PAL.gold, 5);
  // chest bench with a velvet pad and two pillows
  const BX = -hx + 0.36, BZ = -0.6;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.add(lathe([[0.001, 0], [0.04, 0], [0.055, 0.03], [0.04, 0.06], [0.001, 0.06]], 16).translate(BX + sx*0.20, 0, BZ + sz*0.76), WAL, 7);
  b.add(new THREE.BoxGeometry(0.54, 0.03, 1.74).translate(BX, 0.075, BZ), PAL.woodDk, 7);
  b.add(new THREE.BoxGeometry(0.52, 0.34, 1.70).translate(BX, 0.25, BZ), PAL.wood, 7);
  b.add(rbox(0.57, 0.045, 1.78, 0.01).translate(BX, 0.442, BZ), PAL.woodDk, 7);
  for (const k of [-1, 0, 1]) { const z = BZ + k*0.55, fx = BX + 0.26;
    b.add(new THREE.BoxGeometry(0.01, 0.25, 0.46).translate(fx + 0.003, 0.25, z), PAL.woodLt, 7);
    b.add(new THREE.TorusGeometry(0.085, 0.007, 8, 32).rotateY(Math.PI/2).translate(fx + 0.010, 0.25, z), PAL.woodDk, 7);
    b.add(new THREE.SphereGeometry(0.014, 12, 8).translate(fx + 0.014, 0.25, z), PAL.gold, 5); }
  b.add(rbox(0.48, 0.09, 1.60, 0.035).translate(BX, 0.51, BZ), 0xD9A79B, 11);
  b.add(new THREE.SphereGeometry(0.17, 24, 16).scale(1, 0.42, 1).rotateZ(-0.95).translate(BX - 0.12, 0.69, BZ - 0.56), 0x9DBAD3, 11);
  b.add(new THREE.SphereGeometry(0.15, 24, 16).scale(1, 0.42, 1).rotateZ(-0.8).rotateY(0.25).translate(BX - 0.10, 0.67, BZ - 0.27), 0xF0E6D2, 11);
  // with the castle (?castle=1) the walls, floor, vault, lunettes and skylight go in a mesh of their own:
  // src/study.js re-clads them (oak, limewash, sandstone, worn boards) and hides this one once it is in
  let shell = null;
  if (opts.castle) { const sp = splitShell(b.build(), { hz, hWall, top: hWall + rise }); group.add(new THREE.Mesh(sp.rest, fresco)); shell = sp; shell.legacy = new THREE.Mesh(sp.legacy, fresco); group.add(shell.legacy); }
  else group.add(new THREE.Mesh(b.build(), fresco));

  // the round things in the dish are loose: a poke makes them hop
  const balls = [[0.00, 0.012, 0.046, 0xE8823C, 12], [0.078, -0.042, 0.036, 0xA9CDE2, 12], [-0.072, -0.046, 0.030, 0xE8C0B3, 12], [0.046, 0.078, 0.026, PAL.gold, 5], [-0.056, 0.072, 0.032, 0xB9CDB4, 12]].map(([ox, oz, r, c, m]) => {
    const g = new Builder(); g.add(new THREE.SphereGeometry(r, 28, 20), c, m); const mesh = new THREE.Mesh(g.build(), fresco); const y0 = DT + 0.013 + r; mesh.position.set(PX + ox, y0, PZ + oz); group.add(mesh);
    return { mesh, y0, y: 0, v: 0, wait: -1 }; });
  // the armillary: gilt rings round a small orange, turning slowly; a push sets it spinning
  const armil = new THREE.Group(); armil.position.copy(AP); armil.rotation.z = 0.41; group.add(armil); const spin = new THREE.Group(); armil.add(spin);
  { const g = new Builder(); const R = 0.27;
    g.add(new THREE.TorusGeometry(R, 0.008, 8, 72), PAL.gold, 5); g.add(new THREE.TorusGeometry(R, 0.008, 8, 72).rotateY(Math.PI/2), PAL.gold, 5);
    g.add(new THREE.TorusGeometry(R, 0.012, 8, 72).rotateX(Math.PI/2), PAL.gold, 5);
    for (const y of [-0.17, 0.17]) g.add(new THREE.TorusGeometry(Math.sqrt(R*R - y*y), 0.005, 6, 56).rotateX(Math.PI/2).translate(0, y, 0), PAL.gold, 5);
    g.add(new THREE.TorusGeometry(R - 0.012, 0.010, 6, 72).rotateX(Math.PI/2).rotateZ(-0.41), PAL.gold, 5);
    g.add(new THREE.CylinderGeometry(0.004, 0.004, 0.64, 8), PAL.gold, 5); g.add(new THREE.SphereGeometry(0.016, 12, 8).translate(0, 0.32, 0), PAL.gold, 5);
    g.add(new THREE.SphereGeometry(0.075, 32, 22), 0xE8823C, 12);
    g.add(new THREE.SphereGeometry(0.02, 12, 8).scale(1.6, 0.35, 0.8).rotateZ(0.5).translate(0.02, 0.078, 0), 0x8FA98F, 0);
    spin.add(new THREE.Mesh(g.build(), fresco)); }
  const toy = { spin: 0.18 };

  const hits = []; const proxy = (geo, name, parent = group) => { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ visible: false })); m.userData.hit = name; m.layers.set(2); parent.add(m); hits.push(m); return m; };

  // ---- the two sheets on the left wall, each in a gilt frame
  const framed = (w, h, fy, fz, tex, name) => { const fx = -hx + 0.035; const fb = new Builder();
    fb.add(new THREE.BoxGeometry(0.03, h + 0.16, w + 0.16), PAL.gold, 5);
    for (const [dy, dz, sy, sz] of [[h/2 + 0.04, 0, 0.08, w + 0.16], [-h/2 - 0.04, 0, 0.08, w + 0.16], [0, w/2 + 0.04, h + 0.16, 0.08], [0, -w/2 - 0.04, h + 0.16, 0.08]]) { fb.add(rbox(0.06, sy, sz, 0.012).translate(0.015, dy, dz), PAL.gold, 5); fb.add(new THREE.BoxGeometry(0.012, sy - 0.05, sz - 0.05).translate(0.047, dy, dz), PAL.woodDk, 7); }
    const fm = new THREE.Mesh(fb.build(), fresco); fm.position.set(fx, fy, fz); group.add(fm);
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(w, h), texMaterial(tex, 1, { aspect: w/h })); sheet.rotation.y = Math.PI/2; sheet.position.set(fx + 0.017, fy, fz); group.add(sheet);
    proxy(new THREE.PlaneGeometry(w + 0.3, h + 0.3).rotateY(Math.PI/2).translate(fx + 0.05, fy, fz), name); };
  framed(1.16, 1.53, 1.78, BZ, vitruvianTexture(frontImg), 'sheet');
  const VZ = 1.86, VY = 1.62; framed(1.30, 0.833, VY, VZ, viewsTexture(turnImg), 'views');
  proxy(new THREE.CylinderGeometry(0.19, 0.19, 0.16, 16).translate(PX, DT + 0.08, PZ), 'dish');
  proxy(new THREE.SphereGeometry(0.36, 12, 8).translate(AP.x, AP.y, AP.z), 'armil');
  // the plate on the top shelf carries one of the roundels
  { const m = new THREE.Mesh(new THREE.CircleGeometry(0.145, 48), texMaterial(atlas.texture, 3, { cell: atlas.cell(6), glaze: 1, seed: 7.7, aspect: 1 })); m.rotation.order = 'YXZ'; m.rotation.y = -Math.PI/2; m.rotation.x = -0.16; m.position.set(hx - 0.075, S2 + 0.158, KZ); group.add(m); }

  // ---- the codex on its slope
  // book frame: x up the slope (towards the wall), y out of the board, z along the desk; the reader stands at -x
  const book = new THREE.Group(); book.position.set(BKX, BKY, BKZ); book.rotation.z = tilt; group.add(book);
  const pw = 0.33, ph = 0.45, PY = 0.060;     // page size, and how high the paper sits at the spine
  const hump = (s) => 0.011*Math.sin(Math.PI*Math.pow(clamp01(s/pw), 0.62));   // an open book swells either side of its gutter
  const pages = PAGES.map((p, i) => pageTexture(p, i + 1, i % 2 === 1));
  { const sb = new Builder();
    sb.add(rbox(0.60, 0.03, 0.90, 0.006).translate(0.02, 0.015, 0), PAL.woodDk, 7);
    sb.add(rbox(0.035, 0.05, 0.90, 0.006).translate(-0.2625, 0.05, 0), PAL.wood, 7);
    sb.add(rbox(ph + 0.03, 0.014, 2*pw + 0.05, 0.004).translate(0, 0.037, 0), 0x5F7FA6, 0);
    for (const sz of [-1, 1]) { const pts = [new THREE.Vector2(0, 0.044), new THREE.Vector2(sz*pw, 0.044)]; for (let i = 24; i >= 0; i--) { const s = pw*i/24; pts.push(new THREE.Vector2(sz*s, PY + hump(s) - 0.0004)); }
      sb.add(new THREE.ExtrudeGeometry(new THREE.Shape(pts), { depth: ph - 0.004, bevelEnabled: false }), 0xEADFC8, 0, new THREE.Matrix4().makeBasis(new V3(0, 0, 1), new V3(0, 1, 0), new V3(-1, 0, 0)).setPosition(ph/2 - 0.002, 0, 0)); }
    sb.add(new THREE.BoxGeometry(0.10, 0.0012, 0.006).translate(-ph/2 + 0.02, PY + 0.0030, 0.004), 0xC8705D, 0);
    book.add(new THREE.Mesh(sb.build(), fresco)); }
  // a sheet of paper as a strip of quads from the spine outwards; it can be laid along any stage of a turn
  const NS = 32;
  const sheetGeo = (back) => { const g = new THREE.BufferGeometry(); const n = (NS + 1)*2;
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n*3), 3)); g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(n*3), 3)); g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n*2), 2));
    const ix = []; for (let i = 0; i < NS; i++) { const a = i*2, c = a + 1, b2 = a + 2, d = a + 3; if (back) ix.push(a, c, b2, b2, c, d); else ix.push(a, b2, c, b2, d, c); } g.setIndex(ix); g.userData.back = back; return g; };
  // q(s) says how far over each part of the sheet has gone: 0 lying on the right, 1 lying on the left
  const lay = (g, qOf, lift) => { const P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv; const back = g.userData.back, sg = back ? -1 : 1, ds = pw/NS; let z = 0, y = PY, pa = 0;
    for (let i = 0; i <= NS; i++) { const s = i*ds; const a0 = Math.atan((hump(s + 1e-3) - hump(s))/1e-3); const a = a0 + (Math.PI - 2*a0)*qOf(s);
      if (i) { const am = (a + pa)/2; z += Math.cos(am)*ds; y += Math.sin(am)*ds; } pa = a;
      for (let j = 0; j < 2; j++) { const k = i*2 + j; P.setXYZ(k, (j - 0.5)*ph, y + lift, z); N.setXYZ(k, 0, sg*Math.cos(a), -sg*Math.sin(a)); U.setXY(k, back ? 1 - s/pw : s/pw, j); } }
    P.needsUpdate = N.needsUpdate = U.needsUpdate = true; g.computeBoundingSphere(); };
  const pageMat = (t) => texMaterial(t, 1, { aspect: pw/ph, side: THREE.FrontSide });
  const gR = sheetGeo(false), gL = sheetGeo(true); lay(gR, () => 0, 0.0004); lay(gL, () => 1, 0.0004);
  const pgL = new THREE.Mesh(gL, pageMat(pages[0])); book.add(pgL);
  const pgR = new THREE.Mesh(gR, pageMat(pages[1])); book.add(pgR);
  // the turning leaf carries the right-hand page on its face and the next left-hand page on its back
  const gA = sheetGeo(false), gB = sheetGeo(true); const leaf = new THREE.Group(); book.add(leaf); leaf.visible = false;
  const lfA = new THREE.Mesh(gA, pageMat(pages[1])), lfB = new THREE.Mesh(gB, pageMat(pages[2])); lfA.frustumCulled = lfB.frustumCulled = false; leaf.add(lfA, lfB);
  proxy(new THREE.BoxGeometry(0.62, 0.3, 0.92).translate(0, 0.1, 0), 'codex', book);
  const ease = (v) => v*v*(3 - 2*v);
  const codex = { spread: 0, n: PAGES.length/2, t: 0, dir: 0, time: 1.15,
    setSpread(s) { this.spread = s; this.dir = 0; this.hold = false; leaf.visible = false; pgL.material.uniforms.map.value = pages[s*2]; pgR.material.uniforms.map.value = pages[s*2 + 1]; },
    flip(dir) { if (this.dir) return false; const to = this.spread + dir; if (to < 0 || to >= this.n) return false; this.dir = dir; this.t = 0; leaf.visible = true;
      if (dir > 0) { lfA.material.uniforms.map.value = pages[this.spread*2 + 1]; lfB.material.uniforms.map.value = pages[to*2]; pgR.material.uniforms.map.value = pages[to*2 + 1]; }
      else { lfA.material.uniforms.map.value = pages[to*2 + 1]; lfB.material.uniforms.map.value = pages[this.spread*2]; pgL.material.uniforms.map.value = pages[to*2]; }
      this.shape(); return true; },
    // the fore-edge is picked up first and the paper near the spine follows, so the leaf bows as it goes over
    shape() { const k = 0.55, e = this.t, fwd = this.dir > 0; const q = (s) => { const v = ease(clamp01(e*(1 + k) - k*(1 - s/pw))); return fwd ? v : 1 - v; }; lay(gA, q, 0.0014); lay(gB, q, 0.0014); },
    pose(dir, t) { this.dir = 0; if (!this.flip(dir)) return; this.t = t; this.hold = true; this.shape(); },
    update(dt) { if (!this.dir || this.hold) return; this.t = Math.min(1, this.t + dt/this.time); this.shape();
      if (this.t >= 1) this.setSpread(this.spread + this.dir); } };

  // ---- the round cabinet door
  const door = new THREE.Group(); door.position.set(-SD.door.r + 0.02, SD.door.y, -hz - 0.01); group.add(door);
  const leafD = new THREE.Group(); leafD.position.set(SD.door.r - 0.02, 0, 0); door.add(leafD);
  { const db = new Builder(); const rr = SD.door.r - 0.03;
    db.add(new THREE.CylinderGeometry(rr, rr, 0.08, 96).rotateX(Math.PI/2), PAL.wood, 7);
    db.add(new THREE.RingGeometry(rr - 0.075, rr - 0.045, 96).translate(0, 0, 0.0415), PAL.woodDk, 7);
    db.add(new THREE.RingGeometry(rr - 0.035, rr - 0.025, 96).translate(0, 0, 0.0415), PAL.gold, 5);
    for (const [sx, sy] of slotPositions()) { db.add(new THREE.CircleGeometry(0.172, 48).translate(sx, sy, 0.0418), 0x4C719C, 11); db.add(new THREE.TorusGeometry(0.180, 0.013, 8, 48).translate(sx, sy, 0.043), PAL.gold, 5); }
    for (const sy of [-0.55, 0.55]) db.add(new THREE.BoxGeometry(0.16, 0.05, 0.03).translate(-rr + 0.04, sy, 0.05), PAL.gold, 5);
    db.add(new THREE.SphereGeometry(0.04, 16, 12).translate(rr - 0.11, 0, 0.07), PAL.gold, 5);
    leafD.add(new THREE.Mesh(db.build(), fresco)); }
  const medals = slotPositions().map(([sx, sy], i) => { const m = new THREE.Mesh(new THREE.CircleGeometry(0.158, 48), texMaterial(atlas.texture, 3, { cell: atlas.cell(i), glaze: 1, seed: i + 1, aspect: 1 })); m.position.set(sx, sy, 0.047); m.visible = false; leafD.add(m); return m; });
  proxy(new THREE.CircleGeometry(SD.door.r, 32).translate(0, SD.door.y, -hz + 0.06), 'cabinet');
  proxy(new THREE.PlaneGeometry(2*ew, eh).rotateY(Math.PI).translate(0, eh/2, hz - 0.06), 'exit');

  // ---- what waits in the chapel: two slow gold rings and the plaque
  const rings = new THREE.Group(); rings.position.set(0, 1.62, SD.apseZ); group.add(rings);
  { const r1 = new Builder(); r1.add(new THREE.TorusGeometry(0.34, 0.016, 12, 72), PAL.gold, 5); const a = new THREE.Mesh(r1.build(), fresco); rings.add(a);
    const r2 = new Builder(); r2.add(new THREE.TorusGeometry(0.27, 0.012, 12, 72), PAL.gold, 5); const c = new THREE.Mesh(r2.build(), fresco); c.rotation.x = Math.PI/2; rings.add(c);
    const r3 = new Builder(); r3.add(new THREE.SphereGeometry(0.05, 20, 16), PAL.gold, 5); rings.add(new THREE.Mesh(r3.build(), fresco)); rings.userData = { a, c }; }
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.14), texMaterial(plaqueTexture(), 1, { aspect: 3 })); plaque.position.set(0, 0.62, SD.apseZ + 0.335); group.add(plaque);

  const W = (x, y, z) => new V3(x, y, z).add(SO);
  const state = { open: 0, openT: 0, t: 0 };
  const api = {
    group, hits, codex, medals, onBounce: null, shell, SD,
    ocu: W(0, hWall + rise + 0.35, 0), ocuR: SD.ocuR, pool: W(-1.05, 0, -1.25), flame: W(CX, DT + 0.365, CZ), lampB: W(0, 2.2, SD.apseZ + 0.3),
    shots: {
      home: { pivot: W(0, 1.52, 1.5), yaw: 0, pitch: 0.02, fov: 58 },
      cabinet: { pos: W(0, 1.50, 0.75), tgt: W(0, 1.47, -hz), fov: 46 },
      chapel: { pos: W(0.42, 1.50, -2.35), tgt: W(0, 1.30, SD.apseZ), fov: 50 },
      sheet: { pos: W(-0.35, 1.74, BZ), tgt: W(-hx, 1.78, BZ), fov: 44 },
      views: { pos: W(-0.75, VY, VZ), tgt: W(-hx, VY, VZ), fov: 44 },
      codex: (() => { const n = new V3(-Math.sin(tilt), Math.cos(tilt), 0); const c = new V3(BKX, BKY, BKZ).addScaledVector(n, 0.07);
        return { pos: c.clone().addScaledVector(n, 0.98).add(new V3(-0.07, 0, 0)).add(SO), tgt: c.clone().add(SO), fov: 36 }; })(),
    },
    setEarned(i, on) { if (medals[i]) medals[i].visible = !!on; },
    openDoor(on) { state.openT = on ? 1 : 0; },
    get doorOpen() { return state.open; },
    // the small things that answer a touch
    poke(what) {
      if (what === 'dish') balls.forEach((o, i) => { if (o.y < 0.004 && o.wait < 0) o.wait = i*0.075 + Math.random()*0.05; });
      else if (what === 'armil') toy.spin = Math.min(toy.spin + 5.5, 11);
    },
    update(dt, t) {
      codex.update(dt);
      state.open += (state.openT - state.open)*Math.min(1, dt*1.1); if (Math.abs(state.openT - state.open) < 1e-4) state.open = state.openT;
      const e = state.open*state.open*(3 - 2*state.open); door.rotation.y = -e*1.95;
      rings.rotation.y = t*0.22; rings.userData.a.rotation.x = Math.sin(t*0.31)*0.5; rings.userData.c.rotation.z = t*0.37; rings.position.y = 1.62 + Math.sin(t*0.6)*0.025;
      LIGHT.uLampB.value.w = e*1.25;
      toy.spin += (0.18 - toy.spin)*Math.min(1, dt*0.55); spin.rotation.y += toy.spin*dt;
      for (const o of balls) {
        if (o.wait >= 0) { o.wait -= dt; if (o.wait < 0) o.v = 1.25 + Math.random()*0.5; }
        if (o.y > 0 || o.v > 0) { o.v -= 7.5*dt; o.y += o.v*dt; o.mesh.rotation.x += dt*5; o.mesh.rotation.z += dt*3;
          if (o.y <= 0) { o.y = 0; if (o.v < -0.5) { o.v = -o.v*0.45; if (api.onBounce) api.onBounce(Math.min(1, o.v/0.8)); } else o.v = 0; } }
        o.mesh.position.y = o.y0 + o.y;
      }
    },
  };
  return api;
}

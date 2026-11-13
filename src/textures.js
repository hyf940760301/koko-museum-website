// Small pieces of ornament drawn on canvas: the frieze inscription, the glazed roundel,
// the shell lunette and the name plate.
import * as THREE from '../vendor/three/three.module.js';

const SERIF = '"Big Caslon", "Baskerville", "Hoefler Text", "Times New Roman", serif';
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
const tex = (c, srgb = true) => { const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };

export function friezeTexture() {
  const [c, x] = mk(4096, 160);
  x.fillStyle = '#000'; x.fillRect(0, 0, 4096, 160);
  x.fillStyle = '#fff'; x.textBaseline = 'middle'; x.textAlign = 'center';
  x.font = `500 88px ${SERIF}`; try { x.letterSpacing = '26px'; } catch (e) { /* older engines */ }
  x.fillText('ROTVNDA · OPTIMA · SVNT', 1024, 86, 1760);
  x.fillText('KOKO · MMXXVI', 3072, 86, 1760);
  for (const cx of [0, 2048, 4096]) { x.beginPath(); x.arc(cx, 80, 17, 0, Math.PI*2); x.fill(); x.fillStyle = '#000'; x.beginPath(); x.arc(cx, 80, 8, 0, Math.PI*2); x.fill(); x.fillStyle = '#fff'; }
  const t = tex(c, false); t.wrapS = THREE.RepeatWrapping; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter;
  return t;
}

// ---- glazed roundels: one emblem per series, white relief on a blue ground inside a garland
const W = '#fbf7ec', B = '#2f5f97', LB = 'rgba(96,140,186,0.55)', O = '#e8a05c', Y = '#efd58a', C = 256;
const disc = (r, cx, cy, rad, fill) => { if (fill) r.fillStyle = fill; r.beginPath(); r.arc(cx, cy, rad, 0, Math.PI*2); r.fill(); };
const ell = (r, cx, cy, rx, ry, fill, rot = 0) => { if (fill) r.fillStyle = fill; r.beginPath(); r.ellipse(cx, cy, rx, ry, rot, 0, Math.PI*2); r.fill(); };
const poly = (r, pts, fill) => { if (fill) r.fillStyle = fill; r.beginPath(); pts.forEach(([px, py], i) => (i ? r.lineTo(px, py) : r.moveTo(px, py))); r.closePath(); r.fill(); };
const line = (r, pts, col, w) => { r.strokeStyle = col; r.lineWidth = w; r.lineCap = 'round'; r.lineJoin = 'round'; r.beginPath(); pts.forEach(([px, py], i) => (i ? r.lineTo(px, py) : r.moveTo(px, py))); r.stroke(); };
const star = (r, cx, cy, R1, R2, n, fill, rot = -Math.PI/2) => { const pts = []; for (let i = 0; i < n*2; i++) { const a = rot + i*Math.PI/n, k = i % 2 ? R2 : R1; pts.push([cx + Math.cos(a)*k, cy + Math.sin(a)*k]); } poly(r, pts, fill); };
export const ICONS = {
  koko(r) {
    r.fillStyle = W; r.beginPath(); r.ellipse(C, 304, 106, 88, 0, 0, Math.PI*2); r.fill(); disc(r, 150, 312, 20); disc(r, 362, 312, 20);
    const tufts = [[256, 196, 112], [170, 226, 52], [342, 226, 52], [150, 268, 34], [362, 268, 34], [196, 150, 44], [256, 124, 46], [316, 150, 44], [224, 104, 26], [290, 100, 28], [178, 276, 30], [222, 268, 34], [268, 272, 34], [312, 266, 32], [344, 280, 26]];
    r.fillStyle = '#e6eef5'; for (const [hx, hy, hr] of tufts) disc(r, hx, hy, hr);
    r.strokeStyle = 'rgba(110,150,196,0.50)'; r.lineWidth = 2.6; r.lineCap = 'round';
    for (const [hx, hy, hr, a0, a1] of [[178, 276, 30, 0.2, 2.6], [222, 268, 34, 0.3, 2.7], [268, 272, 34, 0.4, 2.8], [312, 266, 32, 0.4, 2.8], [344, 280, 26, 0.5, 2.6], [196, 150, 44, 3.5, 5.0], [256, 124, 46, 3.9, 5.4], [316, 150, 44, 4.4, 5.9], [224, 104, 26, 3.4, 5.2], [290, 100, 28, 4.0, 5.9]]) { r.beginPath(); r.arc(hx, hy, hr - 1.5, a0, a1); r.stroke(); }
    ell(r, 220, 326, 11, 17, B); ell(r, 292, 326, 11, 17, B); disc(r, 223, 319, 3.4, W); disc(r, 295, 319, 3.4, W);
    for (const [fx, fy] of [[188, 350], [178, 361], [198, 362], [324, 350], [314, 362], [334, 361]]) disc(r, fx, fy, 4.0, O);
    disc(r, 366, 330, 5.5, '#c8d2da');
  },
  dream(r) { disc(r, 246, 276, 112, W); r.strokeStyle = LB; r.lineWidth = 7; r.lineCap = 'round'; r.beginPath(); r.arc(246, 276, 86, 3.5, 4.6); r.stroke(); disc(r, 290, 232, 12, '#dfe9f2'); disc(r, 374, 158, 32, W); disc(r, 146, 150, 18, W); disc(r, 392, 250, 11, Y); },
  cloud(r) { disc(r, 356, 166, 40, Y); for (let i = 0; i < 8; i++) { const a = i*Math.PI/4; line(r, [[356 + Math.cos(a)*52, 166 + Math.sin(a)*52], [356 + Math.cos(a)*66, 166 + Math.sin(a)*66]], Y, 8); }
    r.fillStyle = W; for (const [cx, cy, rr] of [[186, 306, 58], [250, 262, 78], [322, 296, 62], [256, 322, 62]]) disc(r, cx, cy, rr); r.fillRect(186, 306, 136, 58);
    r.strokeStyle = LB; r.lineWidth = 5; r.beginPath(); r.arc(250, 262, 60, 3.6, 4.9); r.stroke(); },
  cream(r) { poly(r, [[112, 262], [408, 150], [300, 378], [258, 300]], W); poly(r, [[258, 300], [408, 150], [236, 348]], '#dfe9f2'); line(r, [[258, 300], [408, 150]], LB, 4); line(r, [[150, 372], [196, 372]], W, 7); line(r, [[120, 340], [150, 340]], W, 7); },
  closeup(r) { line(r, [[250, 250], [262, 250]], W, 16); for (const cx of [186, 326]) { ell(r, cx, 262, 74, 60, W); ell(r, cx, 262, 54, 42, B); r.strokeStyle = 'rgba(255,255,255,0.55)'; r.lineWidth = 7; r.lineCap = 'round'; r.beginPath(); r.arc(cx, 262, 36, 3.6, 4.5); r.stroke(); } line(r, [[112, 250], [96, 224]], W, 14); line(r, [[400, 250], [416, 224]], W, 14); },
  campus(r) { r.fillStyle = W; r.beginPath(); r.arc(C, 262, 142, Math.PI, 0); r.closePath(); r.fill();
    r.globalCompositeOperation = 'destination-out'; for (const cx of [161, 256, 351]) disc(r, cx, 268, 46, '#000'); r.globalCompositeOperation = 'source-over';
    line(r, [[256, 124], [256, 104]], W, 10); line(r, [[256, 232], [256, 372]], W, 11); r.strokeStyle = W; r.lineWidth = 11; r.beginPath(); r.arc(236, 372, 20, 0, Math.PI); r.stroke();
    r.strokeStyle = LB; r.lineWidth = 4; for (const a of [-0.55, 0.55]) { r.beginPath(); r.moveTo(256, 122); r.quadraticCurveTo(256 + a*120, 160, 256 + a*174, 232); r.stroke(); } },
  amusement(r) { line(r, [[256, 250], [186, 398]], W, 12); line(r, [[256, 250], [326, 398]], W, 12); line(r, [[160, 398], [352, 398]], W, 12);
    r.strokeStyle = W; r.lineWidth = 12; r.beginPath(); r.arc(256, 250, 118, 0, Math.PI*2); r.stroke();
    for (let i = 0; i < 8; i++) { const a = i*Math.PI/4 + 0.39; line(r, [[256, 250], [256 + Math.cos(a)*118, 250 + Math.sin(a)*118]], W, 5); }
    for (let i = 0; i < 8; i++) { const a = i*Math.PI/4 + 0.39; disc(r, 256 + Math.cos(a)*118, 250 + Math.sin(a)*118, 19, [O, W, Y, W][i % 4]); } disc(r, 256, 250, 20, W); },
  sea(r) { const bx = 256, by = 372; for (let i = 0; i < 7; i++) { const a0 = Math.PI*(1.10 + i*0.80/7), a1 = Math.PI*(1.10 + (i + 1)*0.80/7), am = (a0 + a1)/2;
      r.fillStyle = i % 2 ? '#e9f0f5' : W; r.beginPath(); r.moveTo(bx, by); r.lineTo(bx + Math.cos(a0)*196, by + Math.sin(a0)*196); r.quadraticCurveTo(bx + Math.cos(am)*226, by + Math.sin(am)*226, bx + Math.cos(a1)*196, by + Math.sin(a1)*196); r.closePath(); r.fill();
      line(r, [[bx, by], [bx + Math.cos(a0)*196, by + Math.sin(a0)*196]], LB, 3.5); }
    poly(r, [[216, 372], [296, 372], [284, 396], [228, 396]], W); },
  sealetter(r) { r.fillStyle = W; r.beginPath(); r.roundRect(128, 178, 256, 176, 14); r.fill(); line(r, [[134, 186], [256, 286], [378, 186]], LB, 5); line(r, [[134, 346], [214, 268]], LB, 4); line(r, [[378, 346], [298, 268]], LB, 4); disc(r, 256, 292, 24, O); disc(r, 256, 292, 11, Y); },
  spaceout(r) { r.strokeStyle = W; r.lineWidth = 24; r.lineCap = 'round'; r.beginPath(); r.arc(256, 276, 112, Math.PI, 0); r.stroke(); for (const cx of [144, 368]) { r.fillStyle = W; r.beginPath(); r.roundRect(cx - 30, 262, 60, 104, 26); r.fill(); r.fillStyle = '#dfe9f2'; r.beginPath(); r.roundRect(cx - 14, 280, 28, 68, 13); r.fill(); }
    ell(r, 256, 340, 22, 11, O, -0.5); line(r, [[240, 350], [272, 330]], '#c9803f', 2.5); },
  starlight(r) { star(r, 256, 270, 138, 60, 5, W); r.strokeStyle = LB; r.lineWidth = 4; for (let i = 0; i < 5; i++) { const a = -Math.PI/2 + i*Math.PI*2/5; r.beginPath(); r.moveTo(256, 270); r.lineTo(256 + Math.cos(a)*120, 270 + Math.sin(a)*120); r.stroke(); } star(r, 386, 150, 26, 8, 4, Y); star(r, 132, 176, 18, 6, 4, Y); star(r, 150, 372, 13, 4, 4, W); },
  muertos(r) { for (let i = 0; i < 14; i++) { const a = i*Math.PI*2/14; ell(r, 256 + Math.cos(a)*92, 268 + Math.sin(a)*92, 46, 26, i % 2 ? '#f3ecd9' : W, a); } for (let i = 0; i < 10; i++) { const a = i*Math.PI*2/10 + 0.3; ell(r, 256 + Math.cos(a)*52, 268 + Math.sin(a)*52, 30, 18, Y, a); } disc(r, 256, 268, 34, O); disc(r, 256, 268, 14, '#c9803f'); },
  halloween(r) { line(r, [[256, 196], [268, 150]], '#bfd2b4', 16); ell(r, 190, 290, 66, 88, W); ell(r, 322, 290, 66, 88, W); ell(r, 256, 290, 70, 98, '#f3f7fa'); r.strokeStyle = LB; r.lineWidth = 4; r.beginPath(); r.ellipse(256, 290, 70, 98, 0, 0, Math.PI*2); r.stroke();
    poly(r, [[196, 258], [232, 258], [214, 228]], B); poly(r, [[280, 258], [316, 258], [298, 228]], B); poly(r, [[186, 306], [206, 322], [226, 306], [246, 322], [266, 306], [286, 322], [306, 306], [326, 322], [316, 344], [196, 344]], B); },
  monster(r) { for (const [cx, cy] of [[180, 190], [232, 158], [286, 158], [336, 190]]) poly(r, [[cx - 28, cy + 44], [cx, cy - 24], [cx + 28, cy + 44]], O); disc(r, 256, 286, 116, W); ell(r, 214, 262, 13, 20, B); ell(r, 298, 262, 13, 20, B);
    r.fillStyle = B; r.beginPath(); r.roundRect(178, 310, 156, 44, 20); r.fill(); for (let i = 0; i < 5; i++) poly(r, [[190 + i*28, 310], [218 + i*28, 310], [204 + i*28, 334]], W); },
  wizard(r) { r.fillStyle = W; r.beginPath(); r.moveTo(288, 108); r.quadraticCurveTo(250, 200, 344, 330); r.lineTo(168, 330); r.quadraticCurveTo(216, 230, 288, 108); r.fill(); ell(r, 256, 338, 156, 36, W); line(r, [[178, 318], [334, 318]], B, 12); star(r, 262, 250, 24, 9, 5, Y); star(r, 392, 190, 15, 5, 4, Y); },
  magician(r) { r.fillStyle = W; r.beginPath(); r.roundRect(176, 150, 150, 160, 10); r.fill(); ell(r, 251, 312, 132, 28, W); r.fillStyle = O; r.fillRect(176, 268, 150, 26); line(r, [[330, 384], [404, 262]], W, 13); line(r, [[396, 276], [404, 262]], Y, 13); star(r, 414, 220, 20, 7, 4, Y); },
  diner(r) { poly(r, [[170, 250], [336, 250], [314, 356], [192, 356]], W); r.strokeStyle = W; r.lineWidth = 16; r.beginPath(); r.arc(340, 296, 34, -1.2, 1.3); r.stroke(); ell(r, 253, 372, 126, 20, W); ell(r, 253, 252, 83, 14, '#d9a36a');
    r.strokeStyle = W; r.lineWidth = 9; r.lineCap = 'round'; for (const sx of [218, 262, 304]) { r.beginPath(); r.moveTo(sx, 216); r.bezierCurveTo(sx - 18, 190, sx + 18, 172, sx, 142); r.stroke(); } },
  snow(r) { for (let i = 0; i < 6; i++) { const a = i*Math.PI/3 + Math.PI/6; const dx = Math.cos(a), dy = Math.sin(a); line(r, [[256, 268], [256 + dx*136, 268 + dy*136]], W, 13);
      for (const k of [0.52, 0.78]) for (const sg of [-1, 1]) { const bx = 256 + dx*136*k, by = 268 + dy*136*k, a2 = a + sg*0.9; line(r, [[bx, by], [bx + Math.cos(a2)*34, by + Math.sin(a2)*34]], W, 10); } } disc(r, 256, 268, 22, W); disc(r, 256, 268, 9, '#bcd5ea'); },
  starry(r) { star(r, 226, 300, 104, 34, 4, W); star(r, 356, 190, 54, 18, 4, W); star(r, 150, 172, 30, 10, 4, Y); disc(r, 372, 340, 13, Y); disc(r, 312, 132, 7, W); disc(r, 128, 330, 8, W); },
};
function drawTondo(x, ox, oy, size, icon) {
  x.save(); x.translate(ox, oy); x.scale(size/512, size/512);
  x.fillStyle = '#f5f0e3'; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 30; i++) {
    const an = i/30*Math.PI*2; const r = 224;
    x.save(); x.translate(C + Math.cos(an)*r, C + Math.sin(an)*r); x.rotate(an + Math.PI/2 + (i % 2 ? 0.5 : -0.5));
    x.fillStyle = i % 2 ? '#a9c3a0' : '#bfd2b4'; x.beginPath(); x.ellipse(0, 0, 30, 12, 0, 0, Math.PI*2); x.fill(); x.restore();
  }
  for (let i = 0; i < 10; i++) { const an = (i + 0.5)/10*Math.PI*2; const r = 224; x.fillStyle = ['#efd58a', '#f0b98a', '#fbf7ee'][i % 3]; x.beginPath(); x.arc(C + Math.cos(an)*r, C + Math.sin(an)*r, 14, 0, Math.PI*2); x.fill(); }
  const g = x.createRadialGradient(200, 180, 20, C, C, 200); g.addColorStop(0, '#9cc6e6'); g.addColorStop(1, '#6e9fcc');
  x.fillStyle = g; x.beginPath(); x.arc(C, C, 190, 0, Math.PI*2); x.fill();
  x.strokeStyle = '#fbf7ee'; x.lineWidth = 7; x.beginPath(); x.arc(C, C, 191, 0, Math.PI*2); x.stroke();
  // relief on its own layer so it can carry a shadow and a little modelling
  const [rc, r] = mk(512, 512); r.lineJoin = 'round';
  r.save(); r.translate(C, C + 6); r.scale(0.86, 0.86); r.translate(-C, -C); icon(r); r.restore();
  r.globalCompositeOperation = 'source-atop';
  const sh = r.createLinearGradient(120, 80, 400, 400); sh.addColorStop(0, 'rgba(255,255,255,0.22)'); sh.addColorStop(1, 'rgba(110,150,195,0.20)');
  r.fillStyle = sh; r.fillRect(0, 0, 512, 512);
  x.shadowColor = 'rgba(35,70,115,0.45)'; x.shadowBlur = 14*size/512; x.shadowOffsetX = 6*size/512; x.shadowOffsetY = 9*size/512; x.drawImage(rc, 0, 0);
  x.restore();
}
// all the roundels on one sheet; cell(i) is the uv rectangle of the i-th
export function tondoAtlas(iconNames) {
  const S = 400, cols = 5, rows = 4; const [c, x] = mk(S*cols, S*rows);
  iconNames.forEach((n, i) => drawTondo(x, (i % cols)*S, Math.floor(i/cols)*S, S, ICONS[n] || ICONS.koko));
  const texture = tex(c);
  return { texture, canvas: c,
    cell: (i) => new THREE.Vector4((i % cols)/cols, 1 - (Math.floor(i/cols) + 1)/rows, 1/cols, 1/rows),
    dataURL: (i, px = 168) => { const [d, dx] = mk(px, px); dx.beginPath(); dx.arc(px/2, px/2, px/2, 0, Math.PI*2); dx.clip(); dx.drawImage(c, (i % cols)*S, Math.floor(i/cols)*S, S, S, 0, 0, px, px); return d.toDataURL('image/png'); } };
}

export function doorFriezeTexture(text = 'STVDIOLO') {
  const [c, x] = mk(1024, 128);
  x.fillStyle = '#efe8d8'; x.fillRect(0, 0, 1024, 128);
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `500 74px ${SERIF}`; try { x.letterSpacing = '30px'; } catch (e) { /* older engines */ }
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillText(text, 512 + 16, 69); x.fillStyle = '#9d9482'; x.fillText(text, 512 + 15, 67);
  x.fillStyle = '#cfae6a'; for (const cx of [86, 938]) { x.beginPath(); x.arc(cx, 64, 9, 0, Math.PI*2); x.fill(); }
  return tex(c);
}

// scallop shell for the lunette above the centre panel (drawn in the upper half)
export function lunetteTexture() {
  const [c, x] = mk(512, 512);
  x.fillStyle = '#8fb9d9'; x.fillRect(0, 0, 512, 512);
  const n = 11, r = 238, cx = 256, cy = 256;
  const dir = (a, k) => [cx + Math.cos(a)*k, cy - Math.sin(a)*k];
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI*i/n, a1 = Math.PI*(i + 1)/n, am = (a0 + a1)/2;
    const [x0, y0] = dir(a0, r*0.93), [x1, y1] = dir(a1, r*0.93), [xm, ym] = dir(am, r*1.06);
    x.beginPath(); x.moveTo(cx, cy); x.lineTo(x0, y0); x.quadraticCurveTo(xm, ym, x1, y1); x.closePath();
    const [gx, gy] = dir(am, r);
    const g = x.createLinearGradient(cx, cy, gx, gy); g.addColorStop(0, i % 2 ? '#f0d3c6' : '#f6ecdc'); g.addColorStop(1, i % 2 ? '#f7e6dc' : '#fdf8ee');
    x.fillStyle = g; x.fill(); x.strokeStyle = '#cfa862'; x.lineWidth = 2.5; x.stroke();
  }
  x.fillStyle = '#e3c07a'; x.beginPath(); x.arc(cx, cy, 40, Math.PI, 0); x.closePath(); x.fill();
  x.fillStyle = '#f6ecdc'; x.beginPath(); x.arc(cx, cy, 24, Math.PI, 0); x.closePath(); x.fill();
  return tex(c);
}

export function plateTexture(title = 'KOKO', sub = 'FORMA PRIMA · MMXXVI') {
  const [c, x] = mk(1024, 192);
  const g = x.createLinearGradient(0, 0, 0, 192); g.addColorStop(0, '#6b98bd'); g.addColorStop(1, '#5a87ae');
  x.fillStyle = g; x.fillRect(0, 0, 1024, 192);
  x.strokeStyle = '#e6c98c'; x.lineWidth = 4; x.strokeRect(12, 12, 1000, 168); x.lineWidth = 1.5; x.strokeRect(22, 22, 980, 148);
  x.fillStyle = '#f1dba6'; x.textAlign = 'center'; x.textBaseline = 'middle';
  let fs = 92, ls = 44;
  for (;;) { x.font = `500 ${fs}px ${SERIF}`; try { x.letterSpacing = ls + 'px'; } catch (e) { /* older engines */ } if (x.measureText(title).width <= 900 || fs <= 36) break; fs -= 4; ls = Math.max(8, Math.round(fs*0.30)); }
  x.fillText(title, 512 + ls/2, 82 + (92 - fs)*0.06);
  x.font = `500 24px ${SERIF}`; try { x.letterSpacing = '12px'; } catch (e) { /* older engines */ }
  x.fillStyle = '#f6ecd6'; x.fillText(sub, 512 + 6, 150);
  return tex(c);
}

// painted pilaster panel: a candelabrum of vines, leaves and oranges
export function grotesqueTexture() {
  const W = 200, H = 3040; const [c, x] = mk(W, H); const cx = W/2;
  x.fillStyle = '#e9ecdf'; x.fillRect(0, 0, W, H);
  x.strokeStyle = '#c9d4c4'; x.lineWidth = 3; x.strokeRect(9, 9, W - 18, H - 18);
  const stem = '#8eaa90', leafA = '#a9c3a0', leafB = '#bfd2b4', orange = '#eba56c', deep = '#e38a5e', blue = '#8fb9d9', gold = '#d9b268', cream = '#fbf7ee';
  const leaf = (px, py, rot, len, col) => { x.save(); x.translate(px, py); x.rotate(rot); x.fillStyle = col; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len*0.5, -len*0.36, len, 0); x.quadraticCurveTo(len*0.5, len*0.36, 0, 0); x.fill(); x.restore(); };
  const fruit = (px, py, rad, slice) => {
    x.fillStyle = orange; x.beginPath(); x.arc(px, py, rad, 0, Math.PI*2); x.fill();
    if (slice) {
      x.fillStyle = cream; x.beginPath(); x.arc(px, py, rad*0.80, 0, Math.PI*2); x.fill();
      x.fillStyle = deep; for (let i = 0; i < 8; i++) { const a = i/8*Math.PI*2; x.beginPath(); x.moveTo(px + Math.cos(a + 0.08)*rad*0.14, py + Math.sin(a + 0.08)*rad*0.14); x.arc(px, py, rad*0.70, a + 0.08, a + Math.PI/4 - 0.08); x.closePath(); x.fill(); }
    } else { x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(px - rad*0.3, py - rad*0.3, rad*0.32, 0, Math.PI*2); x.fill(); }
  };
  const n = 10, h = (H - 80)/n; x.lineCap = 'round';
  x.strokeStyle = stem; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, 46); x.lineTo(cx, H - 46); x.stroke();
  for (let i = 0; i < n; i++) {
    const y0 = 40 + i*h;
    for (const sd of [-1, 1]) {
      x.strokeStyle = stem; x.lineWidth = 2.6; x.beginPath(); x.moveTo(cx, y0 + h*0.90);
      x.bezierCurveTo(cx + sd*64, y0 + h*0.86, cx + sd*86, y0 + h*0.40, cx + sd*46, y0 + h*0.36);
      x.bezierCurveTo(cx + sd*14, y0 + h*0.34, cx + sd*12, y0 + h*0.56, cx + sd*40, y0 + h*0.555); x.stroke();
      leaf(cx + sd*30, y0 + h*0.875, sd > 0 ? -0.9 : Math.PI + 0.9, 30, leafA);
      leaf(cx + sd*60, y0 + h*0.73, sd > 0 ? 0.5 : Math.PI - 0.5, 26, leafB);
      leaf(cx + sd*70, y0 + h*0.52, sd > 0 ? -2.4 : Math.PI + 2.4, 28, leafA);
      leaf(cx + sd*50, y0 + h*0.36, sd > 0 ? -1.2 : Math.PI + 1.2, 24, leafB);
      fruit(cx + sd*42, y0 + h*0.50, 14, false);
      x.fillStyle = gold; x.beginPath(); x.arc(cx + sd*78, y0 + h*0.20, 3.5, 0, Math.PI*2); x.fill();
    }
    if (i % 2 === 0) fruit(cx, y0 + h*0.16, 19, true);
    else { x.fillStyle = blue; x.beginPath(); x.arc(cx, y0 + h*0.16, 15, 0, Math.PI*2); x.fill(); x.strokeStyle = gold; x.lineWidth = 3; x.stroke(); x.fillStyle = cream; x.beginPath(); x.arc(cx, y0 + h*0.16, 5, 0, Math.PI*2); x.fill(); }
    leaf(cx, y0 + h*0.03, -Math.PI/2 - 0.6, 26, leafA); leaf(cx, y0 + h*0.03, -Math.PI/2 + 0.6, 26, leafA);
  }
  return tex(c);
}

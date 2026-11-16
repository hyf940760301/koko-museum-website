// The rotunda: a round drum of twenty bays, each with a shallow arched niche,
// pilasters between them, an inscribed frieze and cornice, and a coffered dome
// open to the sky through an oculus.
import * as THREE from '../vendor/three/three.module.js';

const V3 = THREE.Vector3;
export const K = { R: 12, NB: 20, a: 1.5, ySill: 1.0, ySpring: 2.5, d: 0.55, yTop: 5.6, yFr: 6.2, yDome: 6.6, ro: 2.6, yTondo: 4.85, door: 10, dw: 1.0, dh: 3.2 };
K.BAY = (Math.PI*2)/K.NB;
K.W = K.R*K.BAY;
K.phiO = Math.asin(K.ro/K.R);
K.yOc = K.yDome + K.R*Math.cos(K.phiO);

export const PAL = {
  plaster: 0xF3ECDD, cream: 0xEFE8D8, stone: 0xB6C3B6, stoneLt: 0xD3DBCE, rose: 0xE8C0B3, soffit: 0xDDE4D6,
  gold: 0xD9B268, azure: 0xA9CDE2, wood: 0xCDAA78, woodDk: 0xB08A5E, woodLt: 0xE0C596, wax: 0xF4EBD6, shade: 0xD8C9AE,
};

export const cyl = (th, y, r, t = new V3()) => t.set(r*Math.sin(th), y, -r*Math.cos(th));
const lerp = (a, b, t) => a + (b - a)*t;

// local frame of a bay: x along the wall (to the right), y up, z into the room
export function bayMatrix(th, r = K.R, y = 0) {
  const T = new V3(Math.cos(th), 0, Math.sin(th)), Y = new V3(0, 1, 0), N = new V3(-Math.sin(th), 0, Math.cos(th));
  return new THREE.Matrix4().makeBasis(T, Y, N).setPosition(cyl(th, y, r));
}

export class Builder {
  constructor() { this.p = []; this.n = []; this.c = []; this.m = []; this.uv = []; }
  add(geo, color, mode = 0, matrix = null) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.normal) g.computeVertexNormals();
    if (matrix) g.applyMatrix4(matrix);
    const P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv; const col = new THREE.Color(color);
    for (let i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i)); this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      this.c.push(col.r, col.g, col.b); this.m.push(mode);
      if (U) this.uv.push(U.getX(i), U.getY(i)); else this.uv.push(0, 0);
    }
    g.dispose(); if (g !== geo) geo.dispose();
    return this;
  }
  box(M, w, h, d, x, y, z, color, mode = 0) { return this.add(new THREE.BoxGeometry(w, h, d).translate(x, y, z), color, mode, M); }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('aCol', new THREE.Float32BufferAttribute(this.c, 3)); g.setAttribute('aMode', new THREE.Float32BufferAttribute(this.m, 1));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    return g;
  }
}

// a smooth parametric sheet; fn(u, v, target) with u, v in 0..1
export function raisedPanel(w, h) {
  const s = new THREE.Shape([new THREE.Vector2(-w/2, -h/2), new THREE.Vector2(w/2, -h/2), new THREE.Vector2(w/2, h/2), new THREE.Vector2(-w/2, h/2)]);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.038, bevelSize: 0.062, bevelSegments: 4, curveSegments: 1 });
}
export function surf(fn, nu, nv) {
  const pos = new Float32Array((nu + 1)*(nv + 1)*3), uv = new Float32Array((nu + 1)*(nv + 1)*2); const t = new V3(); let k = 0, q = 0;
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) { fn(i/nu, j/nv, t); pos[k++] = t.x; pos[k++] = t.y; pos[k++] = t.z; uv[q++] = i/nu; uv[q++] = j/nv; }
  const idx = [];
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) { const a = j*(nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1; idx.push(a, b, d, a, d, c); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export function buildRotunda() {
  const b = new Builder();
  const { R, a, ySill, ySpring, d, yTop, BAY, W } = K;
  const hW = W/2;
  const ring = (r0, y0, r1, y1, color, mode = 0, nu = 160) => b.add(surf((u, v, t) => cyl(u*Math.PI*2, lerp(y0, y1, v), lerp(r0, r1, v), t), nu, 1), color, mode);

  for (let k = 0; k < K.NB; k++) {
    const th0 = k*BAY;
    const P = (s, y, r, t) => cyl(th0 + s/R, y, r, t);
    if (k === K.door) {
      // ---- the doorway to the studiolo: stone frame, inscribed frieze, pediment
      const { dw, dh } = K; const M = bayMatrix(th0);
      b.add(surf((u, v, t) => P(lerp(-hW, -dw, u), lerp(0, yTop, v), R, t), 6, 1), PAL.plaster, 1);
      b.add(surf((u, v, t) => P(lerp(dw, hW, u), lerp(0, yTop, v), R, t), 6, 1), PAL.plaster, 1);
      b.add(surf((u, v, t) => P(lerp(-dw, dw, u), lerp(dh, yTop, v), R, t), 6, 1), PAL.plaster, 1);
      for (const sx of [-1, 1]) {
        b.box(M, 0.22, dh, 0.16, sx*(dw + 0.11), dh/2, 0.04, PAL.stone);
        b.box(M, 0.10, dh - 0.3, 0.02, sx*(dw + 0.11), dh/2 + 0.1, 0.125, PAL.stoneLt);
        b.box(M, 0.30, 0.22, 0.22, sx*(dw + 0.11), 0.11, 0.05, PAL.stoneLt);
        b.add(new THREE.CylinderGeometry(0.04, 0.04, dh - 0.15, 14).translate(sx*(dw + 0.02), dh/2, 0.13), PAL.stoneLt, 0, M);
        b.add(new THREE.CylinderGeometry(0.012, 0.012, dh - 0.25, 10).translate(sx*(dw - 0.02), dh/2, 0.145), PAL.gold, 5, M);
      }
      // the passage: paneled walls, a beamed ceiling and a finished end, instead of a blank box
      const depth = 1.5;
      for (const sx of [-1, 1]) {
        b.add(new THREE.PlaneGeometry(depth, dh).rotateY(sx*Math.PI/2).translate(sx*dw, dh/2, -depth/2), PAL.cream, 0, M);
        b.box(M, 0.07, 0.18, depth - 0.06, sx*(dw - 0.035), 0.09, -depth/2, PAL.woodDk, 7);
        b.box(M, 0.055, 0.08, depth - 0.06, sx*(dw - 0.028), 1.08, -depth/2, PAL.wood, 7);
        b.add(new THREE.CylinderGeometry(0.016, 0.016, depth - 0.1, 10).rotateX(Math.PI/2).translate(sx*(dw - 0.03), dh - 0.06, -depth/2), PAL.gold, 5, M);
        for (let i = 0; i < 3; i++) {
          const z = -0.30 - i*0.42;
          b.box(M, 0.028, 1.55, 0.30, sx*(dw - 0.02), 2.10, z, PAL.woodLt, 7);
          b.box(M, 0.018, 1.35, 0.22, sx*(dw - 0.038), 2.10, z, PAL.cream, 0);
          b.add(new THREE.TorusGeometry(0.09, 0.008, 6, 24).rotateY(Math.PI/2).translate(sx*(dw - 0.05), 2.10, z), PAL.gold, 5, M);
        }
      }
      b.add(new THREE.PlaneGeometry(2*dw, depth).rotateX(Math.PI/2).translate(0, dh - 0.001, -depth/2), PAL.cream, 0, M);
      for (const z of [-0.38, -0.78, -1.18]) b.box(M, 2*dw - 0.12, 0.09, 0.07, 0, dh - 0.055, z, PAL.woodDk, 7);
      for (const x of [-0.52, 0.52]) b.box(M, 0.07, 0.09, depth - 0.16, x, dh - 0.055, -depth/2, PAL.woodDk, 7);
      b.add(new THREE.CylinderGeometry(0.014, 0.014, 2*dw - 0.08, 10).rotateZ(Math.PI/2).translate(0, dh - 0.02, -0.08), PAL.gold, 5, M);
      b.add(new THREE.PlaneGeometry(2*dw - 0.08, depth - 0.08).rotateX(-Math.PI/2).translate(0, 0.006, -depth/2), PAL.stone, 0, M);
      b.box(M, 2*dw + 0.16, 0.07, 0.14, 0, 0.035, -0.05, PAL.stoneLt);
      b.add(new THREE.PlaneGeometry(2*dw, dh).translate(0, dh/2, -depth + 0.012), PAL.rose, 0, M);
      for (const x of [-0.66, 0.66]) b.box(M, 0.08, dh - 0.28, 0.05, x, dh/2, -depth + 0.04, PAL.wood, 7);
      b.box(M, 2*dw, 0.10, 0.06, 0, 0.10, -depth + 0.04, PAL.woodDk, 7);
      b.box(M, 2*dw, 0.08, 0.06, 0, dh - 0.08, -depth + 0.04, PAL.wood, 7);
      b.add(new THREE.CircleGeometry(0.32, 32).translate(0, 1.85, -depth + 0.045), PAL.cream, 0, M);
      b.add(new THREE.TorusGeometry(0.32, 0.02, 8, 32).translate(0, 1.85, -depth + 0.05), PAL.gold, 5, M);
      b.box(M, 2*dw + 0.44, 0.22, 0.16, 0, dh + 0.11, 0.04, PAL.stone);
      b.box(M, 2*dw + 0.30, 0.03, 0.02, 0, dh + 0.11, 0.125, PAL.gold, 5);
      b.box(M, 2*dw + 0.44, 0.30, 0.10, 0, dh + 0.37, 0.03, PAL.cream);
      b.box(M, 2*dw + 0.60, 0.05, 0.19, 0, dh + 0.545, 0.075, PAL.stone);
      b.box(M, 2*dw + 0.72, 0.06, 0.25, 0, dh + 0.60, 0.085, PAL.stoneLt);
      const y0 = dh + 0.63, hp = dw + 0.36, ht = 0.54; const sl = Math.hypot(hp, ht), an = Math.atan2(ht, hp);
      const tri = new THREE.Shape([new THREE.Vector2(-hp, 0), new THREE.Vector2(hp, 0), new THREE.Vector2(0, ht)]);
      b.add(new THREE.ExtrudeGeometry(tri, { depth: 0.07, bevelEnabled: false }).translate(0, y0, 0), PAL.cream, 0, M);
      for (const sx of [-1, 1]) b.add(new THREE.BoxGeometry(sl + 0.08, 0.07, 0.24).translate(0, 0.035, 0).rotateZ(sx*an).translate(-sx*hp/2, y0 + ht/2, 0.09), PAL.stoneLt, 0, M);
      for (const sx of [-1, 1]) b.add(new THREE.BoxGeometry(sl + 0.02, 0.022, 0.26).translate(0, 0.081, 0).rotateZ(sx*an).translate(-sx*hp/2, y0 + ht/2, 0.09), PAL.gold, 5, M);
      b.add(new THREE.TorusGeometry(0.13, 0.022, 8, 40).translate(0, y0 + 0.20, 0.085), PAL.gold, 5, M);
      b.add(new THREE.CircleGeometry(0.12, 40).translate(0, y0 + 0.20, 0.075), PAL.azure, 0, M);
      b.add(new THREE.SphereGeometry(0.07, 18, 14).translate(0, y0 + ht + 0.16, 0.09), PAL.gold, 5, M);
      for (let i = 0; i < 9; i++) b.box(M, 0.2, 0.09, 0.1, (i - 4)*(W/9), 6.315, 0.15, PAL.stoneLt);
    } else {
      // ---- wall around the niche
      b.add(surf((u, v, t) => P(lerp(-hW, -a, u), lerp(0, yTop, v), R, t), 2, 1), PAL.plaster, 1);
      b.add(surf((u, v, t) => P(lerp(a, hW, u), lerp(0, yTop, v), R, t), 2, 1), PAL.plaster, 1);
      b.add(surf((u, v, t) => P(lerp(-a, a, u), lerp(0, ySill, v), R, t), 8, 1), PAL.plaster, 1);
      const arch = (u) => { const ph = Math.PI*u; return [-a*Math.cos(ph), ySpring + a*Math.sin(ph), -Math.cos(ph), Math.sin(ph)]; };
      b.add(surf((u, v, t) => { const [s, ya] = arch(u); return P(s, lerp(ya, yTop, v), R, t); }, 72, 1), PAL.plaster, 1);
      // ---- the niche: back, reveal, sill
      b.add(surf((u, v, t) => { const [s, ya] = arch(u); return P(s, lerp(ySill, ya, v), R + d, t); }, 72, 6), PAL.rose, 4);
      const rin = R - 0.04;
      const segs = [
        (u) => [-a, lerp(ySill, ySpring, u), -1, 0],
        arch,
        (u) => [a, lerp(ySpring, ySill, u), 1, 0],
      ];
      const mouldZ = (v) => {
        if (v < 0.22) return lerp(0.008, 0.046, v/0.22);
        if (v < 0.40) return lerp(0.046, 0.018, (v - 0.22)/0.18);
        if (v < 0.58) return lerp(0.018, 0.062, (v - 0.40)/0.18);
        if (v < 0.76) return lerp(0.062, 0.024, (v - 0.58)/0.18);
        return lerp(0.024, 0.006, (v - 0.76)/0.24);
      };
      segs.forEach((f, i) => {
        const nu = i === 1 ? 48 : 2;
        b.add(surf((u, v, t) => { const [s, y] = f(u); return P(s, y, lerp(rin, R + d, v), t); }, nu, 1), PAL.soffit, 0);
        // archivolt: a real cyma and bead, not a flat strip
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); const w = v*0.19; return P(s + nx*w, y + ny*w, rin - mouldZ(v), t); }, nu, 8), PAL.stoneLt, 0);
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); const w = 0.19; return P(s + nx*w, y + ny*w, lerp(rin - 0.006, R, v), t); }, nu, 1), PAL.stone, 0);
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); const w = 0.085 + v*0.028; return P(s + nx*w, y + ny*w, rin - 0.055 - Math.sin(v*Math.PI)*0.012, t); }, nu, 4), PAL.gold, 5);
      });
      b.add(surf((u, v, t) => P(lerp(-a, a, u), ySill, lerp(R, R + d, v), t), 8, 1), PAL.stoneLt, 0);

      // ---- stone furniture of the bay
      const M = bayMatrix(th0);
      b.box(M, 0.34, 0.16, 0.09, 0, ySpring + a - 0.02, 0.03, PAL.stoneLt);
      b.add(new THREE.SphereGeometry(0.045, 14, 10).scale(1, 1.3, 0.7).translate(0, ySpring + a + 0.08, 0.06), PAL.gold, 5, M);
      b.box(M, 2*a + 0.56, 0.09, 0.30, 0, ySill - 0.045, 0.15, PAL.stoneLt);
      b.box(M, 2*a + 0.44, 0.05, 0.24, 0, ySill - 0.115, 0.12, PAL.stone);
      b.add(new THREE.CylinderGeometry(0.02, 0.02, 2*a + 0.2, 12).rotateZ(Math.PI/2).translate(0, ySill + 0.025, 0.16), PAL.gold, 5, M);
      for (const sx of [-1, 1]) {
        b.box(M, 0.15, 0.24, 0.20, sx*1.15, ySill - 0.26, 0.10, PAL.stone);
        b.box(M, 0.24, 0.09, 0.10, sx*(a + 0.08), ySpring - 0.02, 0.03, PAL.stoneLt);
      }
      b.box(M, 0.22, 0.34, 0.11, 0, ySpring + a + 0.10, 0.035, PAL.stoneLt);
      b.add(new THREE.SphereGeometry(0.045, 16, 12).translate(0, ySpring + a + 0.10, 0.10), PAL.gold, 5, M);
      b.add(new THREE.TorusGeometry(0.47, 0.042, 10, 56).translate(0, K.yTondo, 0.02), PAL.stoneLt, 0, M);
      b.add(new THREE.TorusGeometry(0.535, 0.014, 6, 56).translate(0, K.yTondo, 0.012), PAL.gold, 5, M);
      for (let i = 0; i < 9; i++) b.box(M, 0.2, 0.09, 0.1, (i - 4)*(W/9), 6.315, 0.15, PAL.stoneLt);
    }

    // ---- pilaster: recessed ornamental field, round rolls, and a turned candle arm
    const Mp = bayMatrix(th0 + BAY/2);
    const roll = (x, y, h, r, z, color, mode = 0) => b.add(new THREE.CylinderGeometry(r, r, h, 14).translate(x, y, z), color, mode, Mp);
    const bar = (y, z, len, r, color, mode = 0) => b.add(new THREE.CylinderGeometry(r, r, len, 14).rotateZ(Math.PI/2).translate(0, y, z), color, mode, Mp);
    b.box(Mp, 0.68, 0.24, 0.26, 0, 0.12, 0.10, PAL.stone);
    bar(0.25, 0.16, 0.62, 0.035, PAL.stoneLt);
    b.box(Mp, 0.50, 0.08, 0.15, 0, 0.36, 0.09, PAL.stoneLt);
    bar(0.43, 0.145, 0.46, 0.016, PAL.gold, 5);
    b.box(Mp, 0.46, 4.15, 0.07, 0, 2.95, 0.045, PAL.stone);
    b.box(Mp, 0.28, 3.72, 0.025, 0, 3.15, 0.072, PAL.cream);
    for (const sx of [-1, 1]) {
      roll(sx*0.155, 3.15, 3.72, 0.013, 0.125, PAL.gold, 5);
      roll(sx*0.205, 3.05, 4.05, 0.032, 0.09, PAL.stoneLt);
      b.box(Mp, 0.045, 4.05, 0.09, sx*0.245, 3.05, 0.07, PAL.stone);
    }
    bar(5.22, 0.145, 0.50, 0.02, PAL.gold, 5);
    b.box(Mp, 0.52, 0.07, 0.15, 0, 5.30, 0.09, PAL.stoneLt);
    for (let i = -2; i <= 2; i++) b.add(new THREE.SphereGeometry(0.028, 10, 8).scale(1, 1.25, 0.75).translate(i*0.09, 5.40, 0.145), PAL.stoneLt, 0, Mp);
    b.box(Mp, 0.64, 0.08, 0.20, 0, 5.50, 0.11, PAL.stone);
    b.box(Mp, 0.70, 0.05, 0.24, 0, 5.565, 0.125, PAL.stoneLt);
    b.add(new THREE.CylinderGeometry(0.07, 0.07, 0.016, 20).rotateX(Math.PI/2).translate(0, 2.38, 0.125), PAL.gold, 5, Mp);
    b.add(new THREE.TorusGeometry(0.075, 0.012, 8, 24).translate(0, 2.38, 0.145), PAL.gold, 5, Mp);
    b.add(new THREE.TorusGeometry(0.16, 0.016, 8, 24, Math.PI).rotateZ(Math.PI).rotateY(-Math.PI/2).translate(0, 2.38, 0.18), PAL.gold, 5, Mp);
    b.add(new THREE.LatheGeometry([new THREE.Vector2(0.01, 0), new THREE.Vector2(0.07, 0.012), new THREE.Vector2(0.055, 0.03), new THREE.Vector2(0.022, 0.05), new THREE.Vector2(0.018, 0.09), new THREE.Vector2(0.04, 0.11), new THREE.Vector2(0.062, 0.135), new THREE.Vector2(0.04, 0.15)], 18).translate(0, 2.52, 0.34), PAL.gold, 5, Mp);
    b.add(new THREE.TorusGeometry(0.062, 0.012, 8, 22).rotateX(Math.PI/2).translate(0, 2.655, 0.34), PAL.gold, 5, Mp);
    b.add(new THREE.CylinderGeometry(0.016, 0.018, 0.16, 12).translate(0, 2.75, 0.34), PAL.wax, 0, Mp);
  }

  // ---- entablature
  ring(R + 0.02, 5.50, R - 0.05, 5.50, PAL.stoneLt); ring(R - 0.05, 5.50, R - 0.05, 5.60, PAL.stone); ring(R - 0.05, 5.60, R - 0.02, 5.60, PAL.stoneLt);
  ring(R - 0.02, 5.60, R - 0.02, 6.20, PAL.cream, 6);
  const prof = [[0.02, 6.20], [0.07, 6.20], [0.07, 6.26], [0.10, 6.26], [0.10, 6.36], [0.24, 6.36], [0.24, 6.46], [0.31, 6.50], [0.31, 6.56], [0.0, 6.60]];
  const pc = [PAL.stoneLt, PAL.stone, PAL.stoneLt, PAL.stoneLt, PAL.stoneLt, PAL.stone, PAL.gold, PAL.stoneLt, PAL.cream];
  for (let i = 0; i < prof.length - 1; i++) ring(R - prof[i][0], prof[i][1], R - prof[i + 1][0], prof[i + 1][1], pc[i], pc[i] === PAL.gold ? 5 : 0);
  for (let i = 0; i < 220; i++) {
    const th = i/220*Math.PI*2; const M = bayMatrix(th, R - 0.16, 6.29);
    b.box(M, 0.08, 0.12, 0.07, 0, 0, 0, i % 2 ? PAL.stoneLt : PAL.stone);
  }

  // ---- dome: the coffers are cut into the shell, the ribs stand proud of them
  const span = Math.PI/2 - K.phiO;
  b.add(surf((u, v, t) => {
    const ph = Math.PI/2 - v*span; const ang = u*Math.PI*2; const rs = Math.max(R*Math.sin(ph), 0.35);
    const fa = ((ang/K.BAY + 0.5) % 1) - 0.5; const cx = fa*K.BAY*rs; const halfW = 0.5*K.BAY*rs;
    const sv = (ph - K.phiO)/span; const rows = 5; const fv = ((sv*rows) % 1) - 0.5; const rowH = span*R/rows;
    const sd = Math.max(Math.abs(cx) - Math.max(halfW - 0.28, 0.05), Math.abs(fv*rowH) - Math.max(rowH*0.5 - 0.2, 0.05));
    const recess = sd < 0 ? 0.85*Math.min(1, -sd/0.55) : 0; const rr = R + recess;
    return cyl(ang, K.yDome + rr*Math.cos(ph), rr*Math.sin(ph), t);
  }, 220, 90), PAL.azure, 3);
  for (let k = 0; k < K.NB; k++) {
    const th = k*K.BAY;
    b.add(surf((u, v, t) => {
      const ph = K.phiO + u*span; const rr = Math.max((R - 0.06)*Math.sin(ph), 0.3);
      return cyl(th + (v - 0.5)*0.32/rr, K.yDome + (R - 0.08)*Math.cos(ph), rr, t);
    }, 36, 1), PAL.stoneLt, 0);
  }
  for (let i = 1; i <= 4; i++) {
    const ph = K.phiO + span*i/5; const rr = (R - 0.02)*Math.sin(ph); const yy = K.yDome + (R - 0.02)*Math.cos(ph);
    b.add(new THREE.TorusGeometry(rr, 0.09, 12, 140).rotateX(Math.PI/2).translate(0, yy, 0), PAL.stoneLt, 0);
    b.add(new THREE.TorusGeometry(rr, 0.018, 6, 140).rotateX(Math.PI/2).translate(0, yy - 0.03, 0), PAL.gold, 5);
  }
  ring(K.ro, K.yOc, K.ro, K.yOc + 1.0, PAL.cream, 0, 96);
  b.add(new THREE.TorusGeometry(K.ro + 0.02, 0.085, 12, 96).rotateX(Math.PI/2).translate(0, K.yOc - 0.02, 0), PAL.gold, 5);
  b.add(new THREE.TorusGeometry(K.ro + 0.22, 0.03, 8, 96).rotateX(Math.PI/2).translate(0, K.yOc - 0.075, 0), PAL.gold, 5);

  // ---- floor
  b.add(new THREE.CircleGeometry(R + 0.7, 128).rotateX(-Math.PI/2), PAL.cream, 2);
  return b.build();
}

// where the candle flames sit
export function sconcePoints() {
  const out = []; for (let k = 0; k < K.NB; k++) out.push(cyl((k + 0.5)*K.BAY, 2.80, K.R - 0.34));
  return out;
}

// the two leaves of the studiolo door, hinged on the jambs
export function buildDoorLeaves(material) {
  const { dw, dh } = K; const group = new THREE.Group(); group.applyMatrix4(bayMatrix(K.door*K.BAY));
  const leaf = (sx) => {
    const b = new Builder(); const w = dw - 0.008, cx = -sx*w/2;
    b.add(new THREE.BoxGeometry(w, dh - 0.02, 0.06).translate(cx, dh/2, 0), PAL.wood, 7);
    for (const [yc, h] of [[0.62, 0.84], [1.66, 1.00], [2.68, 0.80]]) {
      for (const sz of [1, -1]) {
        const panel = raisedPanel(w - 0.18, h - 0.1);
        if (sz < 0) panel.rotateY(Math.PI);
        b.add(panel.translate(cx, yc, sz*0.034), PAL.woodLt, 7);
      }
    }
    b.add(new THREE.SphereGeometry(0.038, 18, 14).translate(-sx*(w - 0.08), 1.52, 0.07), PAL.gold, 5);
    const pivot = new THREE.Group(); pivot.position.set(sx*dw, 0, -0.10); pivot.add(new THREE.Mesh(b.build(), material)); group.add(pivot); return pivot;
  };
  const L = leaf(-1), Rr = leaf(1);
  return { group, setOpen(o) { L.rotation.y = o*1.72; Rr.rotation.y = -o*1.72; } };
}

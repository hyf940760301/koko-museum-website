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
        b.add(new THREE.PlaneGeometry(1.5, dh).rotateY(Math.PI/2).translate(sx*dw, dh/2, -0.75), PAL.soffit, 0, M);
      }
      b.add(new THREE.PlaneGeometry(2*dw, 1.5).rotateX(Math.PI/2).translate(0, dh, -0.75), PAL.soffit, 0, M);
      b.add(new THREE.PlaneGeometry(2*dw, 1.5).rotateX(-Math.PI/2).translate(0, 0.003, -0.75), PAL.stoneLt, 0, M);
      b.add(new THREE.PlaneGeometry(2*dw, dh).translate(0, dh/2, -1.5), PAL.shade, 0, M);
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
      segs.forEach((f, i) => {
        const nu = i === 1 ? 72 : 2;
        b.add(surf((u, v, t) => { const [s, y] = f(u); return P(s, y, lerp(rin, R + d, v), t); }, nu, 1), PAL.soffit, 0);
        // archivolt: a flat stone band standing just proud of the plaster
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); return P(s + nx*v*0.16, y + ny*v*0.16, rin, t); }, nu, 1), PAL.stone, 0);
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); return P(s + nx*0.16, y + ny*0.16, lerp(rin, R, v), t); }, nu, 1), PAL.stone, 0);
        b.add(surf((u, v, t) => { const [s, y, nx, ny] = f(u); return P(s + nx*lerp(0.045, 0.06, v), y + ny*lerp(0.045, 0.06, v), rin - 0.006, t); }, nu, 1), PAL.gold, 5);
      });
      b.add(surf((u, v, t) => P(lerp(-a, a, u), ySill, lerp(R, R + d, v), t), 8, 1), PAL.stoneLt, 0);

      // ---- stone furniture of the bay
      const M = bayMatrix(th0);
      b.box(M, 2*a + 0.56, 0.09, 0.30, 0, ySill - 0.045, 0.15, PAL.stoneLt);
      b.box(M, 2*a + 0.44, 0.05, 0.24, 0, ySill - 0.115, 0.12, PAL.stone);
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

    // ---- pilaster on the bay boundary
    const Mp = bayMatrix(th0 + BAY/2);
    b.box(Mp, 0.62, 0.92, 0.17, 0, 0.46, 0.085, PAL.stone);
    b.box(Mp, 0.68, 0.08, 0.21, 0, 0.96, 0.105, PAL.stoneLt);
    b.box(Mp, 0.54, 0.10, 0.15, 0, 1.05, 0.075, PAL.stoneLt);
    b.box(Mp, 0.42, 4.2, 0.10, 0, 3.2, 0.05, PAL.stone);
    b.box(Mp, 0.25, 3.8, 0.014, 0, 3.2, 0.107, PAL.stoneLt);
    b.box(Mp, 0.50, 0.09, 0.14, 0, 5.345, 0.07, PAL.stoneLt);
    b.box(Mp, 0.58, 0.09, 0.18, 0, 5.435, 0.09, PAL.stone);
    b.box(Mp, 0.66, 0.07, 0.21, 0, 5.515, 0.105, PAL.stoneLt);
    b.add(new THREE.SphereGeometry(0.04, 14, 10).translate(0, 5.39, 0.15), PAL.gold, 5, Mp);
    // ---- a candle bracket on every pilaster
    b.add(new THREE.CylinderGeometry(0.062, 0.062, 0.016, 24).rotateX(Math.PI/2).translate(0, 2.60, 0.118), PAL.gold, 5, Mp);
    b.add(new THREE.SphereGeometry(0.026, 12, 10).translate(0, 2.60, 0.135), PAL.gold, 5, Mp);
    b.add(new THREE.TorusGeometry(0.105, 0.011, 8, 20, Math.PI).rotateZ(Math.PI).rotateY(-Math.PI/2).translate(0, 2.60, 0.235), PAL.gold, 5, Mp);
    b.add(new THREE.CylinderGeometry(0.052, 0.030, 0.022, 20).translate(0, 2.615, 0.34), PAL.gold, 5, Mp);
    b.add(new THREE.CylinderGeometry(0.017, 0.017, 0.15, 12).translate(0, 2.70, 0.34), PAL.wax, 0, Mp);
  }

  // ---- entablature
  ring(R + 0.02, 5.50, R - 0.05, 5.50, PAL.stoneLt); ring(R - 0.05, 5.50, R - 0.05, 5.60, PAL.stone); ring(R - 0.05, 5.60, R - 0.02, 5.60, PAL.stoneLt);
  ring(R - 0.02, 5.60, R - 0.02, 6.20, PAL.cream, 6);
  const prof = [[0.02, 6.20], [0.07, 6.20], [0.07, 6.26], [0.10, 6.26], [0.10, 6.36], [0.24, 6.36], [0.24, 6.46], [0.31, 6.50], [0.31, 6.56], [0.0, 6.60]];
  const pc = [PAL.stoneLt, PAL.stone, PAL.stoneLt, PAL.stoneLt, PAL.stoneLt, PAL.stone, PAL.gold, PAL.stoneLt, PAL.cream];
  for (let i = 0; i < prof.length - 1; i++) ring(R - prof[i][0], prof[i][1], R - prof[i + 1][0], prof[i + 1][1], pc[i], pc[i] === PAL.gold ? 5 : 0);

  // ---- dome, oculus
  const span = Math.PI/2 - K.phiO;
  b.add(surf((u, v, t) => { const ph = Math.PI/2 - v*span; return cyl(u*Math.PI*2, K.yDome + R*Math.cos(ph), R*Math.sin(ph), t); }, 120, 36), PAL.azure, 3);
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
      b.add(new THREE.BoxGeometry(w - 0.26, h, 0.026).translate(cx, yc, 0.036), PAL.woodDk, 7);
      b.add(new THREE.BoxGeometry(w - 0.40, h - 0.14, 0.016).translate(cx, yc, 0.052), PAL.woodLt, 7);
      b.add(new THREE.TorusGeometry(0.105, 0.012, 8, 32).translate(cx, yc, 0.060), PAL.gold, 5);
    }
    b.add(new THREE.SphereGeometry(0.042, 16, 12).translate(-sx*(w - 0.07), 1.52, 0.07), PAL.gold, 5);
    b.add(new THREE.CylinderGeometry(0.06, 0.06, 0.012, 20).rotateX(Math.PI/2).translate(-sx*(w - 0.07), 1.52, 0.036), PAL.gold, 5);
    const pivot = new THREE.Group(); pivot.position.set(sx*dw, 0, -0.10); pivot.add(new THREE.Mesh(b.build(), material)); group.add(pivot); return pivot;
  };
  const L = leaf(-1), Rr = leaf(1);
  return { group, setOpen(o) { L.rotation.y = o*1.72; Rr.rotation.y = -o*1.72; } };
}

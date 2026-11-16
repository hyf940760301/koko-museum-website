// A hinged altarpiece of three equal panels. Closed, the outer face shows a red-chalk
// study; opened, the three finished pictures. The left wing folds over the centre and
// the right wing folds over the left, so the stack closes flush.
import * as THREE from '../vendor/three/three.module.js';
import { Builder, PAL } from './rotunda.js';
import { texMaterial, setMap } from './materials.js';

// two panel formats: tall (9:16) and wide (3:4)
export function dims(wide) {
  const d = wide ? { hw: 0.45, hh: 0.60, rest: 0.47 } : { hw: 0.39, hh: 0.39*16/9, rest: 0.26 };
  d.fw = 0.07; d.t = 0.045; d.HW = d.hw + d.fw; d.HH = d.hh + d.fw; d.base = 0.252; d.originY = d.base + d.HH;
  return d;
}

const PROF = [[0, 0.004], [0.004, 0.016], [0.012, 0.021], [0.020, 0.016], [0.030, 0.014], [0.040, 0.022], [0.050, 0.034], [0.058, 0.040], [0.064, 0.040], [0.069, 0.034], [0.070, 0.0]];
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (t) => { t = clamp01(t); return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2; };
const lerp = (a, b, t) => a + (b - a)*t;

let BLANK = null;
const blank = () => { if (!BLANK) { BLANK = new THREE.DataTexture(new Uint8Array([214, 204, 186, 255]), 1, 1); BLANK.colorSpace = THREE.SRGBColorSpace; BLANK.needsUpdate = true; } return BLANK; };

function frameRect(b, hw, hh, prof) {
  const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < 4; i++) {
    const c0 = C[i], c1 = C[(i + 1) % 4]; const pos = [], idx = [];
    for (const [o, z] of prof) pos.push((hw + o)*c0[0], (hh + o)*c0[1], z, (hw + o)*c1[0], (hh + o)*c1[1], z);
    for (let k = 0; k < prof.length - 1; k++) { const a = 2*k, bb = a + 1, c = a + 2, d = a + 3; idx.push(a, bb, d, a, d, c); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    b.add(g, PAL.gold, 5);
  }
}
const GEO = new Map();
function panelGeo(D, wide) {
  const b = new Builder();
  b.add(new THREE.BoxGeometry(2*D.HW, 2*D.HH, D.t).translate(0, 0, -D.t/2 - 0.0005), PAL.gold, 5);
  frameRect(b, D.hw, D.hh, PROF);
  return b;
}
function wingGeo(D, wide) { const k = 'w' + wide; if (!GEO.has(k)) GEO.set(k, panelGeo(D, wide).build()); return GEO.get(k); }
function centreGeo(D, wide) {
  const k = 'c' + wide; if (GEO.has(k)) return GEO.get(k);
  const bc = panelGeo(D, wide); const yP = -D.HH - 0.012, rL = D.HW - 0.03, W2 = 2*D.HW;
  bc.add(new THREE.BoxGeometry(W2, 0.05, 0.07).translate(0, D.HH + 0.025, -0.012), PAL.gold, 5);
  bc.add(new THREE.TorusGeometry(rL, 0.028, 10, 40, Math.PI).translate(0, D.HH + 0.05, -0.012), PAL.gold, 5);
  bc.add(new THREE.SphereGeometry(0.05, 18, 14).translate(0, D.HH + 0.05 + rL + 0.06, -0.012), PAL.gold, 5);
  for (const sx of [-1, 1]) bc.add(new THREE.SphereGeometry(0.028, 12, 10).translate(sx*(rL + 0.012), D.HH + 0.085, -0.012), PAL.gold, 5);
  bc.add(new THREE.BoxGeometry(W2 + 0.14, 0.03, 0.34).translate(0, yP - 0.015, 0.09), PAL.gold, 5);
  bc.add(new THREE.BoxGeometry(W2 + 0.08, 0.17, 0.30).translate(0, yP - 0.115, 0.09), PAL.cream, 0);
  bc.add(new THREE.BoxGeometry(W2 + 0.18, 0.04, 0.37).translate(0, yP - 0.22, 0.09), PAL.gold, 5);
  bc.add(new THREE.CylinderGeometry(0.012, 0.012, 1.9*D.HH, 10).translate(-D.HW, 0, 0.04), PAL.gold, 5);
  bc.add(new THREE.CylinderGeometry(0.012, 0.012, 1.9*D.HH, 10).translate(D.HW, 0, 0.0825), PAL.gold, 5);
  GEO.set(k, bc.build()); return GEO.get(k);
}

export class Triptych {
  // opts: { wide, sketch, lunette, plate, seed, floor }
  constructor(fresco, opts = {}) {
    const wide = !!opts.wide; const D = this.D = dims(wide);
    this.group = new THREE.Group(); this.rest = D.rest; this.open = 0; this.peek = 0;
    const AR = D.hw/D.hh; const pg = new THREE.PlaneGeometry(2*D.hw, 2*D.hh);
    const pic = (kind, o = {}) => new THREE.Mesh(pg, texMaterial(o.map || blank(), kind, { aspect: AR, ...o }));
    const yP = -D.HH - 0.012, rL = D.HW - 0.03;

    this.group.add(new THREE.Mesh(centreGeo(D, wide), fresco));
    this.c = pic(0, { reveal: 0, seed: (opts.seed ?? 1) + 0.37, side: THREE.FrontSide }); this.c.position.z = 0.003; this.group.add(this.c);
    if (opts.lunette) { const m = new THREE.Mesh(new THREE.CircleGeometry(rL, 48, 0, Math.PI), texMaterial(opts.lunette, 1, { aspect: 1 })); m.position.set(0, D.HH + 0.05, -0.014); this.group.add(m); }
    if (opts.plate) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.80, 0.15), texMaterial(opts.plate, 1, { aspect: 0.80/0.15 })); m.position.set(0, yP - 0.115, 0.242); this.group.add(m); }

    const wing = (side, zPivot, back) => {
      const pivot = new THREE.Group(); pivot.position.set(side*D.HW, 0, zPivot);
      const w = new THREE.Group(); w.position.set(side*D.HW, 0, -zPivot); pivot.add(w);
      w.add(new THREE.Mesh(wingGeo(D, wide), fresco));
      const front = pic(0, { reveal: 0, seed: (opts.seed ?? 1) + (side < 0 ? 0.11 : 0.73), side: THREE.FrontSide }); front.position.z = 0.003; w.add(front);
      let bk = null;
      if (back) { bk = pic(2, { map: back, seed: opts.seed ?? 1, floor: opts.floor ?? 0.08, side: THREE.FrontSide }); bk.rotation.y = Math.PI; bk.position.z = -D.t - 0.003; w.add(bk); }
      this.group.add(pivot); return { pivot, front, back: bk };
    };
    const L = wing(-1, 0.04, null), R = wing(1, 0.0825, opts.sketch);
    this.pL = L.pivot; this.pR = R.pivot; this.l = L.front; this.r = R.front; this.sketch = R.back;
    this.panels = [this.l, this.c, this.r]; this.panels.forEach((m, i) => { m.userData.panel = i; });
    this.setOpen(0);
  }
  setPictures(l, c, r) { [l, c, r].forEach((t, i) => setMap(this.panels[i].material, t || blank())); }
  setPicture(i, tex, srgbDecode = false) { setMap(this.panels[i].material, tex || blank(), srgbDecode); }
  setReveal(i, v) { this.panels[i].material.uniforms.uReveal.value = v; }
  setOpen(o) {
    this.open = o;
    const e1 = ease(o*1.7), e2 = ease(o*1.7 - 0.7);
    this.pR.rotation.y = -(lerp(Math.PI, this.rest, e1) - this.peek*0.20*(1 - e1));
    this.pL.rotation.y = lerp(Math.PI, this.rest, e2);
    const vis = o > 0.004 || this.peek > 0.01; this.c.visible = vis; this.l.visible = vis; this.r.visible = vis;
    // the chalk study sits on the back of the last wing; once that wing faces us it is hidden,
    // otherwise its shader keeps running under the picture and the last reveal stutters
    if (this.sketch) this.sketch.visible = o < 0.42;
  }
  // where to stand to look at one panel square on: its centre and outward normal, in world space
  panelPose(i) {
    const m = this.panels[i]; m.updateWorldMatrix(true, false);
    const p = new THREE.Vector3().setFromMatrixPosition(m.matrixWorld); const n = new THREE.Vector3(0, 0, 1).transformDirection(m.matrixWorld);
    return { p, n, hw: this.D.hw, hh: this.D.hh };
  }
}

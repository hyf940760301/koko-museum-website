// pickBay hit test for all 20 bays (step-3 acceptance). pickBay in main.js is analytic (ray against
// the drum cylinder R, then the bay's angular window), so this re-runs its exact maths from
// several eye positions towards several points in each bay and reports the bay it returns.
//   node qa/pickbay_check.mjs
import { K, cyl } from '../src/rotunda.js';
import * as THREE from '../vendor/three/three.module.js';
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
function pick(o, d) {   // copied from main.js pickBay(), B[k] present for every exhibition bay
  const a = d.x*d.x + d.z*d.z; if (a < 1e-6) return null; const bq = 2*(o.x*d.x + o.z*d.z), c = o.x*o.x + o.z*o.z - K.R*K.R; const disc = bq*bq - 4*a*c; if (disc < 0) return null;
  const t = (-bq + Math.sqrt(disc))/(2*a); if (t <= 0) return null; const x = o.x + d.x*t, y = o.y + d.y*t, z = o.z + d.z*t;
  const th = Math.atan2(x, -z); const k = ((Math.round(th/K.BAY) % K.NB) + K.NB) % K.NB; const off = Math.abs(wrap(th - k*K.BAY))*K.R;
  if (k === K.door) return off < K.dw + 0.3 && y > 0 && y < K.dh + 0.9 ? k : null;
  return off < K.a + 0.12 && y > 0.85 && y < 5.4 ? k : null;
}
const eyes = [new THREE.Vector3(0, 1.62, 0), new THREE.Vector3(3, 1.62, 2), new THREE.Vector3(-4, 1.62, -1)];
let ok = 0, n = 0; const miss = [];
for (let k = 0; k < K.NB; k++) {
  const pts = k === K.door ? [[0, 1.6], [-0.8, 0.5], [0.8, 3.0]] : [[0, 2.6], [-1.2, 1.2], [1.2, 4.6]];   // [along the wall (m), height]
  for (const e of eyes) for (const [s, y] of pts) {
    const p = cyl(k*K.BAY + s/K.R, y, K.R); const d = p.clone().sub(e).normalize(); n++;
    const got = pick(e, d); if (got === k) ok++; else miss.push({ k, s, y, got });
  }
}
console.log(`pickBay: ${ok}/${n} rays hit their bay; bays ${K.NB} (door = ${K.door})`, miss.length ? miss : '');

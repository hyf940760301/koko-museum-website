// Tactile spring-damper physics & precision procedural geometry builders
import * as THREE from '../../vendor/three/three.module.js';

export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const steppedTime = (t, fps = 12) => Math.floor(t * fps) / fps;

// Second-order Hookean spring-damper for buttery, tactile micro-interactions
export class Spring1D {
  constructor(value = 0, stiffness = 170, damping = 18) {
    this.x = value;
    this.target = value;
    this.v = 0;
    this.k = stiffness;
    this.d = damping;
  }
  impulse(dv) {
    this.v += dv;
  }
  snap(val) {
    this.x = val;
    this.target = val;
    this.v = 0;
  }
  update(dt) {
    const h = Math.min(dt, 0.05);
    // 2 substeps for unconditional stability at high stiffness
    const sub = h * 0.5;
    for (let i = 0; i < 2; i++) {
      const a = -this.k * (this.x - this.target) - this.d * this.v;
      this.v += a * sub;
      this.x += this.v * sub;
    }
    return this.x;
  }
}

export class Spring2D {
  constructor(x = 0, y = 0, stiffness = 140, damping = 17) {
    this.sx = new Spring1D(x, stiffness, damping);
    this.sy = new Spring1D(y, stiffness, damping);
  }
  setTarget(x, y) {
    this.sx.target = x;
    this.sy.target = y;
  }
  impulse(vx, vy) {
    this.sx.impulse(vx);
    this.sy.impulse(vy);
  }
  update(dt) {
    this.sx.update(dt);
    this.sy.update(dt);
    return this;
  }
  get x() { return this.sx.x; }
  get y() { return this.sy.x; }
}

export class Spring3D {
  constructor(x = 0, y = 0, z = 0, stiffness = 120, damping = 16) {
    this.sx = new Spring1D(x, stiffness, damping);
    this.sy = new Spring1D(y, stiffness, damping);
    this.sz = new Spring1D(z, stiffness, damping);
  }
  setTarget(x, y, z) {
    this.sx.target = x;
    this.sy.target = y;
    this.sz.target = z;
  }
  snap(x, y, z) {
    this.sx.snap(x);
    this.sy.snap(y);
    this.sz.snap(z);
  }
  update(dt) {
    this.sx.update(dt);
    this.sy.update(dt);
    this.sz.update(dt);
    return this;
  }
  copyTo(vec3) {
    vec3.set(this.sx.x, this.sy.x, this.sz.x);
    return vec3;
  }
}

// Precision involute-like watchmaker brass gear with spoked cutouts and specular bevels
export function createGearGeometry({
  teeth = 24,
  outerRadius = 1.0,
  innerRadius = 0.84,
  thickness = 0.12,
  holeRadius = 0.2,
  spokes = 5,
  bevelSize = 0.018,
} = {}) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  const rRoot = innerRadius;
  const rPitch = (outerRadius + innerRadius) * 0.5;
  const rTip = outerRadius;

  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const p0 = a0;
    const p1 = a0 + step * 0.18;
    const p2 = a0 + step * 0.30;
    const p3 = a0 + step * 0.52;
    const p4 = a0 + step * 0.64;
    const p5 = a0 + step * 0.82;

    const pts = [
      [Math.cos(p0) * rRoot, Math.sin(p0) * rRoot],
      [Math.cos(p1) * rRoot, Math.sin(p1) * rRoot],
      [Math.cos(p2) * rPitch, Math.sin(p2) * rPitch],
      [Math.cos(p2 + step * 0.04) * rTip, Math.sin(p2 + step * 0.04) * rTip],
      [Math.cos(p3 - step * 0.04) * rTip, Math.sin(p3 - step * 0.04) * rTip],
      [Math.cos(p3) * rPitch, Math.sin(p3) * rPitch],
      [Math.cos(p4) * rRoot, Math.sin(p4) * rRoot],
      [Math.cos(p5) * rRoot, Math.sin(p5) * rRoot],
    ];
    if (i === 0) shape.moveTo(pts[0][0], pts[0][1]);
    for (let k = 1; k < pts.length; k++) shape.lineTo(pts[k][0], pts[k][1]);
  }
  shape.closePath();

  if (holeRadius > 0.01) {
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(centerHole);
  }

  // Ornamental watchmaker spoke windows
  const rimInner = innerRadius * 0.78;
  const hubOuter = Math.max(holeRadius * 1.65, innerRadius * 0.32);
  if (spokes >= 3 && rimInner - hubOuter > 0.12) {
    const sStep = (Math.PI * 2) / spokes;
    const pad = Math.min(0.14, sStep * 0.18);
    for (let s = 0; s < spokes; s++) {
      const sa0 = s * sStep + pad;
      const sa1 = (s + 1) * sStep - pad;
      if (sa1 - sa0 <= 0.08) continue;
      const win = new THREE.Path();
      win.moveTo(Math.cos(sa0) * hubOuter, Math.sin(sa0) * hubOuter);
      win.absarc(0, 0, hubOuter, sa0, sa1, false);
      win.lineTo(Math.cos(sa1) * rimInner, Math.sin(sa1) * rimInner);
      win.absarc(0, 0, rimInner, sa1, sa0, true);
      win.closePath();
      shape.holes.push(win);
    }
  }

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize,
    bevelThickness: bevelSize,
    curveSegments: 12,
  });
  geo.center();
  return geo;
}

// Multi-faceted 3D Bethlehem star / crystal star with crisp ridge facets
export function createFacetedStarGeometry({
  points = 8,
  outerRadius = 1.0,
  innerRadius = 0.38,
  depth = 0.34,
  minorScale = 0.72,
} = {}) {
  const positions = [];
  const uvs = [];
  const total = points * 2;
  const ring = [];
  for (let i = 0; i < total; i++) {
    const a = (i / total) * Math.PI * 2 - Math.PI * 0.5;
    let r = innerRadius;
    if (i % 2 === 0) {
      const tipIdx = i / 2;
      r = outerRadius * (tipIdx % 2 === 1 && points >= 6 ? minorScale : 1.0);
    }
    ring.push([Math.cos(a) * r, Math.sin(a) * r]);
  }

  const pushTri = (a, b, c) => {
    positions.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    uvs.push(
      a[0] * 0.5 + 0.5, a[1] * 0.5 + 0.5,
      b[0] * 0.5 + 0.5, b[1] * 0.5 + 0.5,
      c[0] * 0.5 + 0.5, c[1] * 0.5 + 0.5
    );
  };

  const frontApex = [0, 0, depth];
  const backApex = [0, 0, -depth];
  for (let i = 0; i < total; i++) {
    const p0 = [ring[i][0], ring[i][1], 0];
    const p1 = [ring[(i + 1) % total][0], ring[(i + 1) % total][1], 0];
    pushTri(frontApex, p0, p1);
    pushTri(backApex, p1, p0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  return geo;
}

// Bicone jewel / crystal prism with crown and pavilion facets
export function createCrystalPrismGeometry({
  sides = 6,
  radius = 0.25,
  height = 0.85,
  waist = 0.18,
} = {}) {
  const pts = [];
  const halfH = height * 0.5;
  const wH = height * waist;
  const positions = [];
  const ringTop = [];
  const ringBot = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    const a2 = ((i + 0.5) / sides) * Math.PI * 2;
    ringTop.push([Math.cos(a) * radius, wH, Math.sin(a) * radius]);
    ringBot.push([Math.cos(a2) * radius * 0.92, -wH, Math.sin(a2) * radius * 0.92]);
  }
  const apexT = [0, halfH, 0];
  const apexB = [0, -halfH, 0];
  const tri = (a, b, c) => {
    positions.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
  };
  for (let i = 0; i < sides; i++) {
    const ni = (i + 1) % sides;
    tri(apexT, ringTop[ni], ringTop[i]);
    tri(ringTop[i], ringTop[ni], ringBot[i]);
    tri(ringTop[ni], ringBot[ni], ringBot[i]);
    tri(apexB, ringBot[i], ringBot[ni]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

// Rounded bevel box via ExtrudeGeometry so blocks catch highlights on every edge
export function createRoundedBlockGeometry(w, h, d, radius = 0.04, bevel = 0.02) {
  const hw = Math.max(0.01, w * 0.5 - bevel);
  const hh = Math.max(0.01, h * 0.5 - bevel);
  const r = Math.min(radius, hw * 0.8, hh * 0.8);
  const s = new THREE.Shape();
  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(0.01, d - bevel * 2),
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 8,
  });
  geo.center();
  return geo;
}

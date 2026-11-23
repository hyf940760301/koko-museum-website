// Tactile spring-damper physics, zero-GC static geometry batcher, precision CAD geometry builders,
// volumetric shafts, candle flame shaders, and 4 bespoke micro-surface material injections.
import * as THREE from '../vendor/three.module.js';

export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const steppedTime = (t, fps = 12) => Math.floor(t * fps) / fps;

// Soft rubber-band boundary curve using tanh for organic zoom & drag limits
export function rubberBand(val, min, max, stiffness = 0.28) {
  if (val < min) {
    const over = min - val;
    return min - Math.tanh(over / Math.max(1e-4, stiffness)) * stiffness;
  }
  if (val > max) {
    const over = val - max;
    return max + Math.tanh(over / Math.max(1e-4, stiffness)) * stiffness;
  }
  return val;
}

// Second-order Hookean spring-damper for buttery, tactile micro-interactions (Zero-GC)
export class Spring1D {
  constructor(value = 0, stiffness = 170, damping = 18) {
    this.x = value;
    this.target = value;
    this.v = 0;
    this.k = stiffness;
    this.d = damping;
  }
  setParams(stiffness, damping) {
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
  snap(x, y) {
    this.sx.snap(x);
    this.sy.snap(y);
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
  impulse(vx, vy, vz) {
    this.sx.impulse(vx);
    this.sy.impulse(vy);
    this.sz.impulse(vz);
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

// ---------------- High-Speed Static Geometry Batcher (<45 DrawCalls/Act Budget) ----------------
// Merges an array of BufferGeometries (converting indexed to non-indexed when needed and guaranteeing
// consistent position + normal + uv attributes), disposing source geometries if disposeSources=true.
export function mergeGeometries(geos, disposeSources = true) {
  if (!geos || geos.length === 0) return new THREE.BufferGeometry();
  const expanded = [];
  let totalVerts = 0;

  for (let i = 0; i < geos.length; i++) {
    const src = geos[i];
    if (!src || !src.attributes.position) continue;
    const g = src.index ? src.toNonIndexed() : src;
    if (!g.attributes.normal) g.computeVertexNormals();
    expanded.push({ g, owned: g !== src, orig: src });
    totalVerts += g.attributes.position.count;
  }

  const posOut = new Float32Array(totalVerts * 3);
  const normOut = new Float32Array(totalVerts * 3);
  const uvOut = new Float32Array(totalVerts * 2);
  const hasColors = expanded.some((e) => !!e.g.attributes.color);
  const colOut = hasColors ? new Float32Array(totalVerts * 3) : null;

  let vOffset = 0;
  for (let i = 0; i < expanded.length; i++) {
    const { g, owned, orig } = expanded[i];
    const p = g.attributes.position;
    const n = g.attributes.normal;
    const u = g.attributes.uv;
    const c = g.attributes.color;
    const count = p.count;

    for (let k = 0; k < count; k++) {
      const i3 = (vOffset + k) * 3;
      const i2 = (vOffset + k) * 2;
      posOut[i3] = p.getX(k);
      posOut[i3 + 1] = p.getY(k);
      posOut[i3 + 2] = p.getZ(k);
      normOut[i3] = n ? n.getX(k) : 0;
      normOut[i3 + 1] = n ? n.getY(k) : 1;
      normOut[i3 + 2] = n ? n.getZ(k) : 0;
      if (u) {
        uvOut[i2] = u.getX(k);
        uvOut[i2 + 1] = u.getY(k);
      } else {
        // Tri-planar fallback UV so procedural bump maps never stretch or NaN
        uvOut[i2] = (posOut[i3] + posOut[i3 + 2]) * 0.5;
        uvOut[i2 + 1] = posOut[i3 + 1] * 0.5;
      }
      if (colOut) {
        colOut[i3] = c ? c.getX(k) : 1;
        colOut[i3 + 1] = c ? c.getY(k) : 1;
        colOut[i3 + 2] = c ? c.getZ(k) : 1;
      }
    }
    vOffset += count;
    if (owned) g.dispose();
    if (disposeSources && orig) orig.dispose();
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(posOut, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(normOut, 3));
  merged.setAttribute('uv', new THREE.BufferAttribute(uvOut, 2));
  if (colOut) merged.setAttribute('color', new THREE.BufferAttribute(colOut, 3));
  return merged;
}

export function paintGeo(geo, colorOrHex) {
  const col = colorOrHex instanceof THREE.Color ? colorOrHex : new THREE.Color(colorOrHex);
  const count = geo.attributes.position.count;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = col.r;
    arr[i * 3 + 1] = col.g;
    arr[i * 3 + 2] = col.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

// Collapses all untextured solid-color child Meshes under `container` into ONE single-draw-call
// vertex-colored Mesh using `sharedVertexMat` (skipping excluded nodes, textured maps & emissives).
export function collapseSolidMeshes(container, sharedVertexMat, excluded = [], allowMap = null) {
  const skip = new Set(excluded.filter(Boolean));
  container.updateMatrixWorld(true);
  const invRoot = container.matrixWorld.clone().invert();
  const targets = [];

  const walk = (node) => {
    if (!node || skip.has(node) || !node.visible) return;
    if (
      node !== container &&
      node.isMesh &&
      !node.isInstancedMesh &&
      !Array.isArray(node.material) &&
      !node.userData?.kind &&
      node.material?.color &&
      (node.material.metalness ?? 0) < 0.5 &&
      (!node.material.map || node.material.map === allowMap) &&
      !(node.material.emissiveIntensity > 0.05 && node.material.emissive?.getHex() > 0)
    ) {
      targets.push(node);
    }
    for (let i = 0; i < node.children.length; i++) walk(node.children[i]);
  };
  walk(container);
  if (targets.length < 2) return;

  const geos = [];
  let castShadow = false;
  let receiveShadow = false;
  for (const m of targets) {
    const g = m.geometry.clone();
    g.applyMatrix4(invRoot.clone().multiply(m.matrixWorld));
    paintGeo(g, m.material.color);
    geos.push(g);
    if (m.castShadow) castShadow = true;
    if (m.receiveShadow) receiveShadow = true;
    if (m.parent) m.parent.remove(m);
  }
  const merged = new THREE.Mesh(mergeGeometries(geos, true), sharedVertexMat);
  merged.castShadow = castShadow;
  merged.receiveShadow = receiveShadow;
  container.add(merged);
}

// Helper to bake transform into a geometry before passing into mergeGeometries
const _tmpMat4 = new THREE.Matrix4();
const _tmpQuat = new THREE.Quaternion();
const _tmpEuler = new THREE.Euler();
const _tmpPos = new THREE.Vector3();
const _tmpScale = new THREE.Vector3(1, 1, 1);

export function transformGeo(geo, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1 } = {}) {
  _tmpPos.set(x, y, z);
  _tmpEuler.set(rx, ry, rz);
  _tmpQuat.setFromEuler(_tmpEuler);
  _tmpScale.set(sx, sy, sz);
  _tmpMat4.compose(_tmpPos, _tmpQuat, _tmpScale);
  geo.applyMatrix4(_tmpMat4);
  return geo;
}

// Automatically coalesces static single-material child Meshes under `container` that share the same
// Material instance, while skipping any object (and its descendants) in `excluded` or carrying `userData.kind`.
export function batchStaticMeshes(container, excluded = []) {
  const skip = new Set(excluded.filter(Boolean));
  container.updateMatrixWorld(true);
  const invRoot = container.matrixWorld.clone().invert();
  const buckets = new Map();

  const walk = (node) => {
    if (!node || skip.has(node) || !node.visible) return;
    if (
      node !== container &&
      node.isMesh &&
      !node.isInstancedMesh &&
      !Array.isArray(node.material) &&
      !node.userData?.kind
    ) {
      let bucket = buckets.get(node.material);
      if (!bucket) {
        bucket = [];
        buckets.set(node.material, bucket);
      }
      bucket.push(node);
    }
    for (let i = 0; i < node.children.length; i++) {
      walk(node.children[i]);
    }
  };
  walk(container);

  for (const [mat, meshes] of buckets.entries()) {
    if (meshes.length < 2) continue;
    const geos = [];
    let castShadow = false;
    let receiveShadow = false;
    for (const m of meshes) {
      const relMat = invRoot.clone().multiply(m.matrixWorld);
      const g = m.geometry.clone();
      g.applyMatrix4(relMat);
      geos.push(g);
      if (m.castShadow) castShadow = true;
      if (m.receiveShadow) receiveShadow = true;
      if (m.parent) m.parent.remove(m);
    }
    const mergedMesh = new THREE.Mesh(mergeGeometries(geos, true), mat);
    mergedMesh.castShadow = castShadow;
    mergedMesh.receiveShadow = receiveShadow;
    container.add(mergedMesh);
  }
}

// ---------------- Precision CAD Procedural Geometry Builders ----------------

// 1. Involute watchmaker brass gear with spoked cutouts and specular bevels
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

// 2. Multi-faceted 3D Bethlehem star / crystal star with crisp ridge facets
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

// 3. Bicone jewel / crystal prism with sharp flat facets (non-indexed for razor-sharp facet normals)
export function createCrystalPrismGeometry({
  sides = 6,
  radius = 0.25,
  height = 0.85,
  waist = 0.18,
} = {}) {
  const halfH = height * 0.5;
  const wH = height * waist;
  const positions = [];
  const uvs = [];
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
    uvs.push(0.5, 1.0, 0.0, 0.5, 1.0, 0.5);
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
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  return geo;
}

// 4. Rounded bevel box via ExtrudeGeometry
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
    bevelSegments: 2,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 6,
  });
  geo.center();
  return geo;
}

// 5. Haute-Horlogerie Coin-Edge Fluted Bezel Ring (for Act III Horologium Plinth)
export function createCoinEdgeRingGeometry({
  radius = 2.15,
  height = 0.14,
  flutes = 96,
  fluteDepth = 0.026,
} = {}) {
  const shape = new THREE.Shape();
  const total = flutes * 2;
  for (let i = 0; i <= total; i++) {
    const a = (i / total) * Math.PI * 2;
    const r = radius - (i % 2 === 1 ? fluteDepth : 0);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius - fluteDepth - 0.12, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    steps: 1,
  });
  geo.rotateX(Math.PI * 0.5);
  geo.center();
  return geo;
}

// 6. Baroque Double-Strand Twisted Rope Brass Column (for Finale Carousel Pavilion)
export function createTwistedColumnGeometry({
  radius = 0.052,
  height = 3.05,
  turns = 5.5,
  tubularSegments = 96,
} = {}) {
  const parts = [];
  for (let strand = 0; strand < 2; strand++) {
    const pts = [];
    for (let i = 0; i <= 48; i++) {
      const u = i / 48;
      const ang = u * turns * Math.PI * 2 + strand * Math.PI;
      const offset = radius * 0.46;
      pts.push(new THREE.Vector3(Math.cos(ang) * offset, (u - 0.5) * height, Math.sin(ang) * offset));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    parts.push(new THREE.TubeGeometry(curve, tubularSegments, radius * 0.58, 10, false));
  }
  // Corinthian-inspired capital & base rings
  parts.push(transformGeo(new THREE.TorusGeometry(radius * 1.45, radius * 0.42, 10, 24), { y: height * 0.5 - 0.04, rx: Math.PI * 0.5 }));
  parts.push(transformGeo(new THREE.TorusGeometry(radius * 1.55, radius * 0.45, 10, 24), { y: -height * 0.5 + 0.04, rx: Math.PI * 0.5 }));
  return mergeGeometries(parts, true);
}

// 7. Hand-Piped Scalloped Shell Royal Icing Border along a 3D Polyline (for Act II Gingerbread Trim)
export function createPipedIcingGeometry(pStart, pEnd, { beads = 18, radius = 0.048 } = {}) {
  const parts = [];
  for (let i = 0; i < beads; i++) {
    const u = (i + 0.5) / beads;
    const x = lerp(pStart.x, pEnd.x, u);
    const y = lerp(pStart.y, pEnd.y, u);
    const z = lerp(pStart.z, pEnd.z, u);
    const puff = new THREE.SphereGeometry(radius, 10, 8);
    transformGeo(puff, { x, y, z, sx: 1.25, sy: 0.88, sz: 0.95, rz: (i % 2 === 0 ? 0.22 : -0.22) });
    parts.push(puff);
  }
  return mergeGeometries(parts, true);
}

// ---------------- Bespoke Volumetric & Micro-Surface Shader Materials ----------------

// Volumetric Tyndall God-Ray Light Cone (soft Fresnel edge fade + vertical falloff + drifting dust motes)
export function createVolumetricShaftMaterial({
  color = 0xffcf86,
  opacity = 0.16,
  power = 2.4,
} = {}) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uPower: { value: power },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vec4 mv = viewMatrix * wp;
        vNormalView = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uPower;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vWorldPos;

      void main() {
        float ndv = abs(dot(normalize(vNormalView), normalize(vViewDir)));
        float edgeSoft = pow(ndv, uPower);
        float verticalFade = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.18, vUv.y);
        float shimmer = 0.86 + 0.14 * sin(vWorldPos.y * 5.0 - uTime * 1.4 + vWorldPos.x * 3.2);
        float alpha = edgeSoft * verticalFade * uOpacity * shimmer;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `,
  });
}

// Dual-temperature flickering candle flame shader (cobalt-violet base + honey-amber tip)
export function createCandleFlameMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */`
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = clamp(uv.y, 0.0, 1.0);
        // Teardrop taper + gentle organic draft sway at tip
        float swayX = sin(uTime * 7.3 + h * 2.5) * 0.022 * h * h
                    + sin(uTime * 13.1) * 0.008 * h;
        float swayZ = cos(uTime * 5.9 + h * 2.0) * 0.016 * h * h;
        float stretch = 1.0 + sin(uTime * 11.4) * 0.06 * h;
        p.x += swayX;
        p.z += swayZ;
        p.y *= stretch;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        float h = clamp(vUv.y, 0.0, 1.0);
        vec3 blueCore = vec3(0.24, 0.45, 1.0);
        vec3 warmBody = vec3(1.0, 0.72, 0.22);
        vec3 hotCenter = vec3(1.0, 0.97, 0.86);
        vec3 col = mix(blueCore, warmBody, smoothstep(0.05, 0.36, h));
        col = mix(col, hotCenter, smoothstep(0.18, 0.52, h) * (1.0 - smoothstep(0.65, 0.98, h)));
        float fade = smoothstep(0.0, 0.14, h) * (1.0 - smoothstep(0.68, 1.0, h));
        gl_FragColor = vec4(col * 2.6 * fade, fade);
      }
    `,
  });
}

// 1. Cold-pressed 300gsm Watercolour Paper Subsurface Translucency Injection (Act I)
export function injectPaperSubsurface(material, {
  lightPos = new THREE.Vector3(0, 1.35, 0.35),
  lightColor = new THREE.Color(0xffa438),
  strength = 0.42,
} = {}) {
  material.userData.paperUniforms = {
    uSssPos: { value: lightPos },
    uSssColor: { value: lightColor },
    uSssStrength: { value: strength },
  };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, material.userData.paperUniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPaperWorldPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvPaperWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vPaperWorldPos;
        uniform vec3 uSssPos;
        uniform vec3 uSssColor;
        uniform float uSssStrength;`
      )
      .replace(
        '#include <opaque_fragment>',
        `vec3 toCandle = uSssPos - vPaperWorldPos;
        float distC = length(toCandle) + 1e-4;
        vec3 Lc = toCandle / distC;
        vec3 Vw = normalize(cameraPosition - vPaperWorldPos);
        // Warm wax-honey backscatter through thin paper fibers
        float backScatter = pow(clamp(dot(Vw, -Lc) * 0.65 + 0.35, 0.0, 1.0), 2.6);
        float atten = 1.0 / (1.0 + 0.22 * distC * distC);
        outgoingLight += diffuseColor.rgb * uSssColor * backScatter * atten * uSssStrength;
        #include <opaque_fragment>`
      );
  };
  material.customProgramCacheKey = () => 'paper-sss-v2';
  return material;
}

// 2. Dual-Scale Polymer Clay Thumbprint Ridges & Royal Icing Subsurface Injection (Act II)
export function injectClayMicrograin(material, {
  ridgeScale = 42.0,
  ridgeStrength = 0.055,
  icingScatter = 0.18,
} = {}) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRidgeScale = { value: ridgeScale };
    shader.uniforms.uRidgeStrength = { value: ridgeStrength };
    shader.uniforms.uIcingScatter = { value: icingScatter };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vClayLocalPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvClayLocalPos = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vClayLocalPos;
        uniform float uRidgeScale;
        uniform float uRidgeStrength;
        uniform float uIcingScatter;`
      )
      .replace(
        '#include <normal_fragment_maps>',
        `#include <normal_fragment_maps>
        // 0.4mm tactile sculptor fingerprint whorl ridges in object space (never stretches on bevels!)
        float whorl = sin((vClayLocalPos.x * 1.3 + vClayLocalPos.y * 0.9 + sin(vClayLocalPos.z * 6.0) * 0.25) * uRidgeScale);
        vec3 microPerturb = normalize(vec3(dFdx(whorl), dFdy(whorl), 1.0));
        normal = normalize(normal + (microPerturb - vec3(0.0, 0.0, 1.0)) * uRidgeStrength);`
      )
      .replace(
        '#include <opaque_fragment>',
        `float wrapRim = pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.2);
        outgoingLight += diffuseColor.rgb * vec3(1.0, 0.93, 0.85) * wrapRim * uIcingScatter;
        #include <opaque_fragment>`
      );
  };
  material.customProgramCacheKey = () => `clay-grain-${ridgeStrength.toFixed(3)}-${icingScatter.toFixed(2)}`;
  return material;
}

// 3. Lathe-Turned Tangential Anisotropic Brushed Brass & Tooth-Root Patina Injection (Act III & V)
export function injectAnisotropicBrass(material, {
  anisoStrength = 0.38,
  patinaStrength = 0.25,
} = {}) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uAnisoStrength = { value: anisoStrength };
    shader.uniforms.uPatinaStrength = { value: patinaStrength };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBrassTangent;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vec2 radDirV = normalize(position.xy + vec2(1e-5));
        vec3 tangLocalV = normalize(vec3(-radDirV.y, radDirV.x, 0.15));
        #ifdef USE_INSTANCING
          vBrassTangent = normalize(mat3(modelViewMatrix * instanceMatrix) * tangLocalV);
        #else
          vBrassTangent = normalize(normalMatrix * tangLocalV);
        #endif`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vBrassTangent;
        uniform float uAnisoStrength;
        uniform float uPatinaStrength;`
      )
      .replace(
        '#include <opaque_fragment>',
        `// Radial lathe-turned tangential anisotropy lobe (fan-shaped watchmaker sheen)
        vec3 tangView = normalize(vBrassTangent);
        vec3 Vdir = normalize(vViewPosition);
        vec3 keyDir = normalize(vec3(0.45, 0.72, 0.52));
        vec3 Hvec = normalize(Vdir + keyDir);
        float tDotH = dot(tangView, Hvec);
        float sinTH = sqrt(max(0.0, 1.0 - tDotH * tDotH));
        float anisoSpec = pow(sinTH, 26.0) * max(0.0, dot(normal, keyDir));
        outgoingLight += diffuseColor.rgb * vec3(1.25, 1.08, 0.78) * anisoSpec * uAnisoStrength;
        // Subtle antique bronze patina darkening in high-curvature crevices
        float curv = clamp(length(fwidth(normal)) * 1.6, 0.0, 1.0);
        outgoingLight *= mix(1.0, 1.0 - uPatinaStrength * 0.55, curv);
        #include <opaque_fragment>`
      );
  };
  material.customProgramCacheKey = () => `aniso-brass-${anisoStrength.toFixed(2)}`;
  return material;
}

// 4. Zero-Transmission-Overhead Spectral Dichroic Crystal Prism Material (Act IV & V)
// Replaces Three.js native `transmission` double-scene render with single-pass RGB chromatic
// dispersion over PostPipeline.refractRT + thin-film interference rainbow fire!
export function createDichroicPrismMaterial(refractTex, {
  tint = 0xdff9ff,
  emissive = 0x1e5678,
  emissiveIntensity = 0.42,
  dispersion = 0.028,
} = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      tRefract: { value: refractTex },
      uTint: { value: new THREE.Color(tint) },
      uEmissive: { value: new THREE.Color(emissive) },
      uEmissiveIntensity: { value: emissiveIntensity },
      uDispersion: { value: dispersion },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewNormal;
      varying vec4 vClipPos;
      void main() {
        vec4 localPos = vec4(position, 1.0);
        mat4 wm = modelMatrix;
        #ifdef USE_INSTANCING
          wm = modelMatrix * instanceMatrix;
        #endif
        vec4 wp = wm * localPos;
        vWorldPos = wp.xyz;
        mat3 nm = mat3(wm);
        vWorldNormal = normalize(nm * normal);
        vViewNormal = normalize(mat3(viewMatrix) * vWorldNormal);
        vClipPos = projectionMatrix * viewMatrix * wp;
        gl_Position = vClipPos;
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tRefract;
      uniform vec3 uTint;
      uniform vec3 uEmissive;
      uniform float uEmissiveIntensity;
      uniform float uDispersion;
      uniform float uTime;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewNormal;
      varying vec4 vClipPos;

      vec3 thinFilmSpectrum(float cosTheta, float shift) {
        float phase = (1.0 - cosTheta) * 5.2 + shift;
        return 0.55 + 0.45 * cos(phase + vec3(0.0, 2.094, 4.188));
      }

      void main() {
        vec3 N = normalize(vWorldNormal);
        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndv = clamp(abs(dot(N, V)), 0.0, 1.0);
        float fresnel = pow(1.0 - ndv, 3.2);

        vec2 screenUV = (vClipPos.xy / max(vClipPos.w, 1e-4)) * 0.5 + 0.5;
        vec2 bend = -vViewNormal.xy * (0.032 + (1.0 - ndv) * 0.045);

        // Spectral 3-wavelength dispersion sampling from refractRT
        float r = texture2D(tRefract, clamp(screenUV + bend * (1.0 - uDispersion * 5.0), vec2(0.002), vec2(0.998))).r;
        float g = texture2D(tRefract, clamp(screenUV + bend, vec2(0.002), vec2(0.998))).g;
        float b = texture2D(tRefract, clamp(screenUV + bend * (1.0 + uDispersion * 6.0), vec2(0.002), vec2(0.998))).b;
        vec3 refracted = vec3(r, g, b) * uTint;

        // Dichroic thin-film rainbow interference across crystal facets
        float facetShift = dot(N, vec3(0.6, 0.5, 0.6)) * 2.4 + uTime * 0.25;
        vec3 irid = thinFilmSpectrum(ndv, facetShift);

        // Razor-sharp diamond facet pinlight speculars
        vec3 R = reflect(-V, N);
        vec3 L1 = normalize(vec3(0.48, 0.76, 0.44));
        vec3 L2 = normalize(vec3(-0.62, 0.55, 0.56));
        float spec = pow(max(dot(R, L1), 0.0), 64.0) * 2.8
                   + pow(max(dot(R, L2), 0.0), 42.0) * 1.8;

        // Internal caustic sparkle
        float caustic = pow(max(0.0, sin(vWorldPos.y * 16.0 + ndv * 9.0 - uTime * 1.8)), 6.0) * 0.35;

        vec3 col = mix(refracted * 1.18, irid * 1.45, clamp(0.28 + fresnel * 0.68, 0.0, 1.0));
        col += uEmissive * uEmissiveIntensity;
        col += irid * caustic;
        col += vec3(0.94, 0.98, 1.0) * spec;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

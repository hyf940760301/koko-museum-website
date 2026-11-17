// The castle rebuild of the rotunda, behind ?castle=1.
// Step 1 proved the pipeline on bay 0 (Blender-built bevelled masonry, a baked light map, PBR stone
// with reflections of a real interior, AgX grading, posters that keep their own colour). Step 2
// packed it as KTX2 + meshopt (tools/pack_assets.sh). Step 3 rings the hall with it: the bay module
// of tools/blender/castle_kit.py on all 19 exhibition bays (merged into one mesh per material, each
// bay with its own texture offset so the stone does not repeat), the door module on bay 10 with
// oak leaves on the old hinges and STVDIOLO cut in its lintel, and the stone floor. Step 4 puts the
// upper module on all 20 bays: the clerestory with its splayed windows and leaded amber glass, the
// columns up to their capitals, the twenty ribs and limewashed webs of the vault, and the oak lantern
// ring at 12.2 m; the light comes in through those windows (materials.js castleLighting, light.js).
// Step 5 bakes the light maps inside the whole hall (tools/blender/bake_hall.py): AO, the twenty
// torches, the sky through windows and lantern, curvature; the floor has one too (two polar wedges).
// (Bays 9 and 11 beside the door were baked on their own as well: rendered against the generic map
// they differed by 0.33-0.37/255 on average, noise rather than shading, so they share the generic one.) The reflections come from two probes the hall
// renders of itself at load, by day and by night (captureProbes).
import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from '../vendor/three/addons/loaders/RGBELoader.js';
import { KTX2Loader } from '../vendor/three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from '../vendor/three/addons/libs/meshopt_decoder.module.js';
import { bayMatrix, K } from './rotunda.js';
import { LIGHT, cubeUVDefines } from './materials.js';
import { castleMaterial, PBR } from './pbr.js';

export { PBR };
// AgX puts mid-grey lower than the old curve: lift the grade so the room keeps its brightness
export const GRADE = { ev: 1.5, pow: 1.6, sat: 1.3 };

const BASE = './assets/castle/';
const TEX = [  // file, sRGB, repeat, rotation
  ['sandstone_diff', true], ['sandstone_nor', false], ['sandstone_arm', false],
  ['render_diff', true, 1.125], ['render_nor', false, 1.125], ['render_arm', false, 1.125],
  ['oak_diff', true, 1.23, Math.PI/2], ['oak_nor', false, 1.23, Math.PI/2], ['oak_arm', false, 1.23, Math.PI/2],
  ['iron_diff', true, 4], ['iron_nor', false, 4],
  // the floor: warm slabs (floor_tiles_08, 1.5 m a texture tile, uv in metres) and the herringbone walkway (uv in tiles)
  ['slab_diff', true, 1/1.5], ['slab_nor', false, 1/1.5], ['slab_arm', false, 1/1.5],
  ['herring_diff', true], ['herring_nor', false], ['herring_arm', false],
];
// light maps (tools/blender/bake_hall.py): the exhibition bay, the door bay, the upper module, the floor
const LMS = ['bay', 'door', 'upper', 'floor'];
// downloads the opening counts in its progress: three modules, their light maps, environment, textures
export const FILES = 4 + LMS.length + TEX.length;
// the hall for main.js ROOM: the sky comes through the lantern (its opening r 1.42 at 13.5 m)
export const HALL = { ocu: new THREE.Vector3(0, 13.4, 0), ocuR: 1.38 };
// the iron chandelier comes with the props (step 8); until then its light stays off
export const CHANDELIER = false;
// the castle lays its own floor (main.js then leaves the old one out of the drum)
export const FLOOR = true;

let ktx2 = null;
const ktxLoader = (renderer) => ktx2 || (ktx2 = new KTX2Loader().setTranscoderPath('./vendor/three/addons/libs/basis/').detectSupport(renderer));

// start every download at once (main.js calls this as the build begins, so it runs under the
// opening drawing); tick(promise) is the opening's progress counter
export function preload(renderer, tick = (p) => p) {
  const kl = ktxLoader(renderer);
  const tex = ([name, srgb, rep = 1, rot = 0]) => tick(kl.loadAsync(BASE + 'tex/' + name + '.ktx2')).then((t) => {
    // KTX2 is stored top row first and never flipped: the uv sets authored in Blender read true
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8; t.repeat.set(rep, rep); t.rotation = rot; t.needsUpdate = true; return t;
  });
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  return Promise.all([
    tick(gl.loadAsync(BASE + 'bay.glb')), tick(gl.loadAsync(BASE + 'door.glb')), tick(gl.loadAsync(BASE + 'upper.glb')),
    ...LMS.map((n) => tick(kl.loadAsync(BASE + 'lm/' + n + '_lm.ktx2'))),
    tick(new RGBELoader().loadAsync(BASE + 'env/chapel_512.hdr')),
    ...TEX.map(tex),
  ]).then(([bay, door, upper, ...rest]) => ({ bay, door, upper, lms: Object.fromEntries(LMS.map((n, i) => [n, rest[i]])), hdr: rest[LMS.length], maps: rest.slice(LMS.length + 1) }));
}

export async function loadEnv(renderer, assets) {
  const hdr = assets ? assets.hdr : await new RGBELoader().loadAsync(BASE + 'env/chapel_512.hdr');
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer); const rt = pm.fromEquirectangular(hdr); pm.dispose(); hdr.dispose();
  return rt.texture;
}

// what the castle keeps on the GPU, for the step reports (mip chain included)
const BPB = { 37808: 16, 36492: 16, 33779: 16, 33778: 16, 33777: 8, 33776: 8, 37496: 16, 37492: 8, 36196: 8 };  // bytes per 4x4 block
function texBytes(t) {
  let total = 0;
  for (const m of t.mipmaps || []) total += BPB[t.format] ? Math.ceil(m.width/4)*Math.ceil(m.height/4)*BPB[t.format] : m.width*m.height*4;
  return total;
}

// the meshes of a glTF module, by material name, as plain float geometry in the module frame
// (meshopt quantization undone, the node transform applied)
function modulePieces(root) {
  root.updateMatrixWorld(true); const out = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry; const n = g.attributes.position.count; const M = o.matrixWorld; const Nm = new THREE.Matrix3().getNormalMatrix(M);
    const f = (name, size, fn) => { const a = g.attributes[name]; if (!a) return null; const arr = new Float32Array(n*size); const v = new THREE.Vector3();
      for (let i = 0; i < n; i++) { if (size === 3) { v.set(a.getX(i), a.getY(i), a.getZ(i)); fn(v); arr.set([v.x, v.y, v.z], i*3); } else { arr[i*2] = a.getX(i); arr[i*2 + 1] = a.getY(i); } }
      return arr; };
    out.push({ name: (o.material && o.material.name) || 'stone', node: o.parent && o.parent.name, pos: f('position', 3, (v) => v.applyMatrix4(M)), nor: f('normal', 3, (v) => v.applyMatrix3(Nm).normalize()),
      uv: f('uv', 2), uv1: f('uv1', 2), index: g.index ? Array.from(g.index.array) : null, count: n });
  });
  return out;
}

// copies of one module round the ring, merged per material: one draw per material for the hall
function ringMerge(pieces, bays) {
  const byMat = {};
  for (const p of pieces) (byMat[p.name] = byMat[p.name] || []).push(p);
  const geos = {};
  for (const [mat, ps] of Object.entries(byMat)) {
    let nv = 0, ni = 0; for (const p of ps) { nv += p.count*bays.length; ni += (p.index ? p.index.length : p.count)*bays.length; }
    const pos = new Float32Array(nv*3), nor = new Float32Array(nv*3), uv = new Float32Array(nv*2), uv1 = new Float32Array(nv*2), idx = new Uint32Array(ni);
    let vo = 0, io = 0; const v = new THREE.Vector3();
    for (const k of bays) {
      const M = bayMatrix(k*K.BAY); const Nm = new THREE.Matrix3().getNormalMatrix(M);
      // each bay draws its stone from a different stretch of the texture (along the courses only,
      // so the beds of the ashlar stay level from bay to bay)
      const du = mat === 'glass' ? 0 : ((Math.sin(k*12.9898 + 4.1)*43758.5453) % 1 + 1) % 1;
      for (const p of ps) {
        for (let i = 0; i < p.count; i++) {
          v.fromArray(p.pos, i*3).applyMatrix4(M); v.toArray(pos, (vo + i)*3);
          v.fromArray(p.nor, i*3).applyMatrix3(Nm).normalize(); v.toArray(nor, (vo + i)*3);
          uv[(vo + i)*2] = p.uv[i*2] + du; uv[(vo + i)*2 + 1] = p.uv[i*2 + 1];
          if (p.uv1) { uv1[(vo + i)*2] = p.uv1[i*2]; uv1[(vo + i)*2 + 1] = p.uv1[i*2 + 1]; }
        }
        const src = p.index || Array.from({ length: p.count }, (_, i) => i);
        for (let i = 0; i < src.length; i++) idx[io + i] = src[i] + vo;
        vo += p.count; io += src.length;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2)); g.setIndex(new THREE.BufferAttribute(idx, 1));
    g.computeBoundingSphere(); geos[mat] = g;
  }
  return geos;
}

// STVDIOLO cut into the lintel and filled dark, on a strip that follows the curve of the wall
function inscription(mat) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 128; const x = c.getContext('2d');
  x.clearRect(0, 0, 1024, 128); x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = '600 86px "Cormorant Garamond", "Times New Roman", serif'; try { x.letterSpacing = '34px'; } catch (e) { /* older engines */ }
  x.fillStyle = '#fff'; x.fillText('STVDIOLO', 529, 68);
  for (const cx of [70, 954]) { x.beginPath(); x.arc(cx, 66, 8, 0, Math.PI*2); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  // the lintel is a straight stone (its face at d = -0.03 at the jambs, 0.072 inside R mid-span), so the letters lie flat on it
  const g = new THREE.PlaneGeometry(1.80, 0.225).applyMatrix4(bayMatrix(K.door*K.BAY, K.R - 0.076, K.dh + 0.18));
  mat.map = t; mat.side = THREE.DoubleSide; return new THREE.Mesh(g, mat);
}

// ---------------------------------------------------------------- the floor (step 5: baked, see
// pbr.js FLOOR_POLAR; without a bake it falls back to a vertex-colour darkening towards the wall)
const FL = { rose: 1.75, walk0: 9.4, walk1: 11.0, edge: K.R + 0.7, herring: 1.84 };
function annulus(r0, r1, nth, nr, uvf, aof) {
  const pos = [], uv = [], col = [], idx = [];
  for (let j = 0; j <= nr; j++) for (let i = 0; i <= nth; i++) {
    const r = r0 + (r1 - r0)*j/nr, th = i/nth*Math.PI*2; const x = r*Math.sin(th), z = -r*Math.cos(th);
    pos.push(x, 0, z); uv.push(...uvf(x, z, r, th)); const a = aof(r); col.push(a, a, a);
  }
  const W = nth + 1;
  for (let j = 0; j < nr; j++) for (let i = 0; i < nth; i++) { const a = j*W + i, b = a + 1, c = a + W, d = c + 1; idx.push(a, b, c, b, d, c); }   // counter-clockwise from above
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(pos.length/3).fill([0, 1, 0]).flat(), 3)); g.setIndex(idx);
  return g;
}
// a flat ribbon along a polyline of [x, z] points, width w, a hair above the floor
function ribbon(pts, w, out) {
  const base = out.pos.length/3;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[Math.min(i + 1, pts.length - 1)], o = pts[Math.max(i - 1, 0)];
    let tx = q[0] - o[0], tz = q[1] - o[1]; const l = Math.hypot(tx, tz) || 1; tx /= l; tz /= l;
    out.pos.push(p[0] - tz*w/2, 0.002, p[1] + tx*w/2, p[0] + tz*w/2, 0.002, p[1] - tx*w/2);
  }
  for (let i = 0; i < pts.length - 1; i++) { const a = base + i*2; out.idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
}
const circle = (r, n = 160) => Array.from({ length: n + 1 }, (_, i) => [r*Math.sin(i/n*Math.PI*2), -r*Math.cos(i/n*Math.PI*2)]);
function buildFloor(M, baked) {
  const g = new THREE.Group(); g.name = 'castle-floor';
  const ao = (r) => baked ? 1 : 1 - 0.30*THREE.MathUtils.smoothstep(r, K.R - 1.4, K.R) - 0.25*THREE.MathUtils.smoothstep(r, K.R, FL.edge);
  const flat = (x, z) => [x, z];
  // slabs inside and outside the walkway, the walkway itself in polar tiles (a whole number round the ring)
  const nAround = Math.round(Math.PI*(FL.walk0 + FL.walk1)/FL.herring);
  const parts = [
    [annulus(FL.rose, FL.walk0, 240, 16, flat, ao), M.slab],
    [annulus(FL.walk0, FL.walk1, 400, 4, (x, z, r, th) => [th/(Math.PI*2)*nAround, (r - FL.walk0)/FL.herring], ao), M.herring],
    [annulus(FL.walk1, FL.edge, 400, 8, flat, ao), M.slab],
    [annulus(0.0001, FL.rose, 96, 6, (x, z) => [x/2, z/2], () => 1), M.rose],
  ];
  for (const [geo, m] of parts) { m.vertexColors = true; const mesh = new THREE.Mesh(geo, m); mesh.name = m.name; g.add(mesh); }
  // the rose: brass rings, sixteen rays and eight pointed petals inlaid in the stone; brass lines edge the walkway
  const B = { pos: [], idx: [] };
  for (const [r, w] of [[1.72, 0.05], [1.56, 0.022], [0.40, 0.028], [0.16, 0.02], [FL.walk0, 0.035], [FL.walk1, 0.035]]) ribbon(circle(r, r > 5 ? 720 : 160), w, B);
  for (let i = 0; i < 16; i++) { const a = i/16*Math.PI*2 + Math.PI/16; ribbon([[0.40*Math.sin(a), -0.40*Math.cos(a)], [1.56*Math.sin(a), -1.56*Math.cos(a)]], 0.014, B); }
  for (let i = 0; i < 8; i++) for (const sd of [1, -1]) {
    const a0 = i/8*Math.PI*2; const pts = [];
    for (let k = 0; k <= 24; k++) { const t = k/24; const r = 0.40 + 1.16*t; const a = a0 + sd*Math.sin(Math.PI*t)*0.30*(1 - 0.35*t); pts.push([r*Math.sin(a), -r*Math.cos(a)]); }
    ribbon(pts, 0.022, B);
  }
  const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.Float32BufferAttribute(B.pos, 3)); bg.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(B.pos.length/3).fill([0, 1, 0]).flat(), 3)); bg.setIndex(B.idx);
  M.brass.polygonOffset = true; M.brass.polygonOffsetFactor = -2; M.brass.polygonOffsetUnits = -4;
  const brass = new THREE.Mesh(bg, M.brass); brass.name = 'castle-brass'; g.add(brass);
  return g;
}

// leaded amber glass: lit from behind by the sky, and by the sun when it stands outside this window;
// lead cames in a diamond lattice (uv in metres across the pane, from its sill)
function glassMaterial() {
  return new THREE.ShaderMaterial({ uniforms: { ...LIGHT },
    vertexShader: /* glsl */`varying vec2 vUv; varying vec3 vW; varying vec3 vN;
      void main(){ vUv = uv; vec4 w = modelMatrix*vec4(position, 1.); vW = w.xyz; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: /* glsl */`uniform vec3 uSunDir; uniform vec3 uSunCol; uniform vec3 uSkyCol; uniform float uWin; uniform vec3 uHazeCol; uniform float uHaze; uniform float uCandle; uniform vec3 uCandleCol;
      varying vec2 vUv; varying vec3 vW; varying vec3 vN;
      float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y)*p3.z); }
      void main(){
        vec2 q = vec2(vUv.x + vUv.y, vUv.y - vUv.x)*(.70711/.105);
        vec2 f = abs(fract(q) - .5); float d = .5 - max(f.x, f.y);
        float lead = 1. - smoothstep(.035, .075, d);
        float rim = 1. - smoothstep(.0, .028, min(.225 - abs(vUv.x), vUv.y));
        float cell = h12(floor(q) + 7.3);
        vec3 amber = mix(vec3(1.0, .60, .20), vec3(1.0, .74, .34), cell)*(.85 + .3*h12(floor(q*3.) + 1.7));
        float behind = max(dot(-vN, uSunDir), 0.);
        vec3 light = uSkyCol*.075 + uSunCol*uWin*(.35 + 1.6*pow(behind, 2.)) + uCandleCol*uCandle*.02;
        vec3 col = amber*light*(1. - max(lead, rim)*.94);
        col = mix(col, uHazeCol, 1. - exp(-length(cameraPosition - vW)*uHaze));
        gl_FragColor = vec4(col, 1.); }` });
}

export async function buildCastle(renderer, env, assets, opts = {}) {
  const { bay, door, upper, lms, maps } = assets || await preload(renderer);
  const [sd, sn, sa, md, mn, ma, od, on, oa, id, inn, fd, fn, fa, hd, hn, ha] = maps;
  // module light maps on uv1, three mip levels (deeper ones would blend in the bright outside faces);
  // the floor's is sampled by angle and radius in pbr.js (FLOOR_POLAR), level 0 only
  for (const [n, lm] of Object.entries(lms)) {
    lm.colorSpace = THREE.NoColorSpace; lm.channel = n === 'floor' ? 0 : 1; lm.wrapS = lm.wrapT = THREE.ClampToEdgeWrapping;
    lm.minFilter = n === 'floor' ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter; lm.needsUpdate = true;
  }
  const bayLm = lms.bay, doorLm = lms.door, upperLm = lms.upper;
  const mats = (lm) => {
    const common = { env, lm }; const sfx = lm ? '' : '';
    return {
      stone: castleMaterial('stone' + sfx, { ...common, map: sd, normalMap: sn, arm: sa, color: new THREE.Color(1.50, 1.33, 1.06), roughness: 1, normal: 1.0, envK: 0.35, mapMean: [0.377, 0.289, 0.177], mapK: 0.85, moss: 0.22 }),
      render: castleMaterial('render', { ...common, map: md, normalMap: mn, arm: ma, color: new THREE.Color(0.46, 0.17, 0.13), roughness: 1, normal: 0.45, envK: 0.30, mapMean: [0.59, 0.444, 0.293], mapK: 0.45 }),
      oak: castleMaterial('oak', { ...common, map: od, normalMap: on, arm: oa, color: new THREE.Color(0.78, 0.62, 0.50), roughness: 0.9, normal: 0.6, envK: 0.45 }),
      iron: castleMaterial('iron', { ...common, map: id, normalMap: inn, color: new THREE.Color(0.55, 0.50, 0.47), roughness: 0.55, metalness: 0.85, normal: 0.8, envK: 0.6 }),
      pitch: castleMaterial('pitch', { ...common, color: new THREE.Color(0.030, 0.024, 0.019), roughness: 0.62, metalness: 0, envK: 0.5 }),
      // limewash on the webs of the vault: the lime render, pulled almost to its mean and whitened
      lime: castleMaterial('lime', { ...common, map: md, normalMap: mn, arm: ma, color: new THREE.Color(1.45, 1.55, 1.62), roughness: 1, normal: 0.25, envK: 0.30, mapMean: [0.59, 0.444, 0.293], mapK: 0.14 }),
    };
  };
  const MB = mats(bayLm), MD = mats(doorLm), MU = mats(upperLm), ML = mats(null);
  const group = new THREE.Group(); group.name = 'castle';

  // 19 exhibition bays
  const bays = []; for (let k = 0; k < K.NB; k++) if (k !== K.door) bays.push(k);
  const ring = ringMerge(modulePieces(bay.scene), bays);
  for (const [name, g] of Object.entries(ring)) group.add(new THREE.Mesh(g, MB[name] || MB.stone));

  // the clerestory, vault and lantern over all 20 bays, and the window glass
  const uring = ringMerge(modulePieces(upper.scene), Array.from({ length: K.NB }, (_, k) => k));
  for (const [name, g] of Object.entries(uring)) {
    const mesh = new THREE.Mesh(g, name === 'glass' ? glassMaterial() : (MU[name] || MU.stone)); mesh.name = 'castle-upper-' + name; group.add(mesh);
  }

  // the door bay; its leaves go onto the hinges of rotunda.js (pivots keep the opening animation)
  const leaves = {};
  for (const n of ['leafL', 'leafR']) { const o = door.scene.getObjectByName(n); if (o) { o.removeFromParent(); leaves[n] = o; } }
  const dm = door.scene; dm.traverse((o) => { if (o.isMesh) o.material = MD[(o.material && o.material.name) || 'stone'] || MD.stone; });
  dm.applyMatrix4(bayMatrix(K.door*K.BAY)); group.add(dm);
  if (opts.doors && opts.doors.pivots) {
    opts.doors.pivots.forEach((pv, i) => {
      const lf = leaves[i === 0 ? 'leafL' : 'leafR']; if (!lf) return;
      pv.children.forEach((c) => { c.visible = false; });
      lf.traverse((o) => { if (o.isMesh) o.material = ML[(o.material && o.material.name) || 'oak'] || ML.oak; });
      pv.add(lf);   // the node keeps its dequantisation transform; the geometry is already in the hinge frame
    });
  }
  group.add(inscription(castleMaterial('inscr', { env, color: new THREE.Color(0.11, 0.075, 0.05), roughness: 0.8, envK: 0.2, alphaTest: 0.5 })));

  group.add(buildFloor({
    slab: castleMaterial('slab', { env, lm: lms.floor, polar: true, map: fd, normalMap: fn, arm: fa, color: new THREE.Color(1.55, 1.38, 1.12), roughness: 1, normal: 0.7, envK: 0.45, mapMean: [0.248, 0.183, 0.129], mapK: 0.75 }),
    herring: castleMaterial('herring', { env, lm: lms.floor, polar: true, map: hd, normalMap: hn, arm: ha, color: new THREE.Color(1.62, 1.40, 1.12), roughness: 0.5, normal: 0.6, envK: 0.8, mapMean: [0.229, 0.173, 0.109], mapK: 0.85 }),
    rose: castleMaterial('rose', { env, lm: lms.floor, polar: true, map: sd, normalMap: sn, arm: sa, color: new THREE.Color(1.50, 1.33, 1.06), roughness: 0.75, normal: 0.5, envK: 0.6, mapMean: [0.377, 0.289, 0.177], mapK: 0.85 }),
    brass: castleMaterial('brass', { env, color: new THREE.Color(0.95, 0.70, 0.36), roughness: 0.32, metalness: 1, envK: 2.4 }),   // the probe is the hall itself, dimmer than the chapel HDR
  }, true));

  const gpu = [...Object.values(lms), ...maps].map((t) => ({ format: t.format, w: t.image.width, h: t.image.height, levels: (t.mipmaps || []).length, bytes: texBytes(t) }));
  const lum = (v) => v.x*0.2126 + v.y*0.7152 + v.z*0.0722;
  let probe = null;   // { ambDay, ambNight } once captured
  const api = {
    group, gpu,
    // env strength follows the light of the hour: before the probes, the chapel HDR scaled by the
    // ambient; after, the day probe scaled by how much of the day's ambient there is, plus the night
    // probe (torch-lit) by how much torch light there is beyond what the day probe already holds
    update() {
      const amb = lum(LIGHT.uAmbUp.value), torch = LIGHT.uCandle.value;
      if (!probe) { PBR.uEnvK.value = Math.min(1.2, Math.max(0.12, amb/0.43)) + 0.25*torch; return; }
      const a = Math.min(1.5, Math.max(0, (amb - probe.ambNight)/(probe.ambDay - probe.ambNight)));
      PBR.uTorchK.value = 0.8;   // twenty torches and their bounce (the bake) against the two nearest of the old formula
      PBR.uEnvK.value = 1; PBR.uProbeA.value = a; PBR.uProbeB.value = Math.min(1, torch)*(1 - 0.85*Math.min(1, a));
    },
    // render the hall from its middle (1.6 m up) by day (12:30) and by night (22:00), pre-filter both,
    // and make them the reflections of every castle material and of the gilding
    captureProbes(renderer, scene, daylight, gilts = [], hide = []) {
      const t0 = performance.now();
      // 128 per face: each pre-filtered probe is then 384x512 half float (1.6 MB on the GPU); 256 would be 6.3 MB
      const rt = new THREE.WebGLCubeRenderTarget(128, { type: THREE.HalfFloatType });
      const cam = new THREE.CubeCamera(0.05, 80, rt); cam.position.set(0, 1.6, 0); cam.updateMatrixWorld(true);
      const pm = new THREE.PMREMGenerator(renderer);
      const keep = { hour: daylight.hour, mood: daylight.mood, moodK: daylight.moodK };
      const vis = hide.map((o) => o.visible); hide.forEach((o) => { o.visible = false; });
      const shot = (h) => { daylight.hour = h; daylight.mood = null; daylight.moodK = 0; daylight.snap(); api.update(); cam.update(renderer, scene); return { tex: pm.fromCubemap(rt.texture).texture, amb: lum(LIGHT.uAmbUp.value) }; };
      const day = shot(12.5), night = shot(22);
      Object.assign(daylight, keep); daylight.snap();
      hide.forEach((o, i) => { o.visible = vis[i]; });
      pm.dispose(); rt.dispose();
      group.traverse((o) => { if (o.isMesh && o.material && o.material.isMeshStandardMaterial && o.material.envMap) { o.material.envMap = day.tex; o.material.needsUpdate = true; } });
      for (const m of gilts) { if (!m) continue; m.uniforms.tEnv.value = day.tex; Object.assign(m.defines, cubeUVDefines(day.tex)); m.needsUpdate = true; }
      PBR.uEnvMapN.value = night.tex;
      probe = { ambDay: day.amb, ambNight: night.amb }; api.update();
      api.probeMs = performance.now() - t0;
      return { day: day.tex, night: night.tex };
    },
  };
  return api;
}

// Posters are told apart from the room by the alpha of the colour target: a finished poster
// writes 1 (and its true colour), everything else 0. Opaque materials get their alpha forced to
// zero by the blend state; glows and particles add colour but leave alpha alone.
export function alphaDiscipline(root) {
  const seen = new Set();
  root.traverse((o) => {
    const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    for (const m of ms) {
      if (seen.has(m)) continue; seen.add(m);
      if (m.uniforms && m.uniforms.uKind && m.uniforms.uKind.value === 0) continue;   // a poster
      if (m.transparent) {
        if (m.blending === THREE.AdditiveBlending) { m.blending = THREE.CustomBlending; m.blendSrc = THREE.SrcAlphaFactor; m.blendDst = THREE.OneFactor; m.blendEquation = THREE.AddEquation; }
        m.blendSrcAlpha = THREE.ZeroFactor; m.blendDstAlpha = THREE.OneFactor; m.blendEquationAlpha = THREE.AddEquation;
      } else {
        m.blending = THREE.CustomBlending; m.blendSrc = THREE.OneFactor; m.blendDst = THREE.ZeroFactor; m.blendEquation = THREE.AddEquation;
        m.blendSrcAlpha = THREE.ZeroFactor; m.blendDstAlpha = THREE.ZeroFactor; m.blendEquationAlpha = THREE.AddEquation;
      }
      m.needsUpdate = true;
    }
  });
}

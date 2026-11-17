// The castle rebuild of the rotunda, behind ?castle=1.
// Step 1 proved the pipeline on bay 0 (Blender-built bevelled masonry, a baked light map, PBR stone
// with reflections of a real interior, AgX grading, posters that keep their own colour). Step 2
// packed it as KTX2 + meshopt (tools/pack_assets.sh). Step 3 rings the hall with it: the bay module
// of tools/blender/castle_kit.py on all 19 exhibition bays (merged into one mesh per material, each
// bay with its own texture offset so the stone does not repeat), the door module on bay 10 with
// oak leaves on the old hinges and STVDIOLO cut in its lintel; the stone floor follows.
import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from '../vendor/three/addons/loaders/RGBELoader.js';
import { KTX2Loader } from '../vendor/three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from '../vendor/three/addons/libs/meshopt_decoder.module.js';
import { bayMatrix, K } from './rotunda.js';
import { LIGHT } from './materials.js';
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
];
// downloads the opening counts in its progress: two modules, their light maps, environment, textures
export const FILES = 5 + TEX.length;
// the castle lays its own floor (main.js then leaves the old one out of the drum)
export const FLOOR = false;

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
    tick(gl.loadAsync(BASE + 'bay.glb')), tick(gl.loadAsync(BASE + 'door.glb')),
    tick(kl.loadAsync(BASE + 'lm/bay_lm.ktx2')), tick(kl.loadAsync(BASE + 'lm/door_lm.ktx2')),
    tick(new RGBELoader().loadAsync(BASE + 'env/chapel_512.hdr')),
    ...TEX.map(tex),
  ]).then(([bay, door, bayLm, doorLm, hdr, ...maps]) => ({ bay, door, bayLm, doorLm, hdr, maps }));
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
      const du = ((Math.sin(k*12.9898 + 4.1)*43758.5453) % 1 + 1) % 1;
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

export async function buildCastle(renderer, env, assets, opts = {}) {
  const { bay, door, bayLm, doorLm, maps } = assets || await preload(renderer);
  const [sd, sn, sa, md, mn, ma, od, on, oa, id, inn] = maps;
  for (const lm of [bayLm, doorLm]) { lm.colorSpace = THREE.NoColorSpace; lm.channel = 1; lm.minFilter = THREE.LinearMipmapLinearFilter; lm.needsUpdate = true; }
  const mats = (lm) => {
    const common = { env, lm }; const sfx = lm ? '' : '';
    return {
      stone: castleMaterial('stone' + sfx, { ...common, map: sd, normalMap: sn, arm: sa, color: new THREE.Color(1.50, 1.33, 1.06), roughness: 1, normal: 1.0, envK: 0.35, mapMean: [0.377, 0.289, 0.177], mapK: 0.85, moss: 0.22 }),
      render: castleMaterial('render', { ...common, map: md, normalMap: mn, arm: ma, color: new THREE.Color(0.46, 0.17, 0.13), roughness: 1, normal: 0.45, envK: 0.30, mapMean: [0.59, 0.444, 0.293], mapK: 0.45 }),
      oak: castleMaterial('oak', { ...common, map: od, normalMap: on, arm: oa, color: new THREE.Color(0.78, 0.62, 0.50), roughness: 0.9, normal: 0.6, envK: 0.45 }),
      iron: castleMaterial('iron', { ...common, map: id, normalMap: inn, color: new THREE.Color(0.55, 0.50, 0.47), roughness: 0.55, metalness: 0.85, normal: 0.8, envK: 0.6 }),
      pitch: castleMaterial('pitch', { ...common, color: new THREE.Color(0.030, 0.024, 0.019), roughness: 0.62, metalness: 0, envK: 0.5 }),
    };
  };
  const MB = mats(bayLm), MD = mats(doorLm), ML = mats(null);
  const group = new THREE.Group(); group.name = 'castle';

  // 19 exhibition bays
  const bays = []; for (let k = 0; k < K.NB; k++) if (k !== K.door) bays.push(k);
  const ring = ringMerge(modulePieces(bay.scene), bays);
  for (const [name, g] of Object.entries(ring)) group.add(new THREE.Mesh(g, MB[name] || MB.stone));

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

  const gpu = [bayLm, doorLm, ...maps].map((t) => ({ format: t.format, w: t.image.width, h: t.image.height, levels: (t.mipmaps || []).length, bytes: texBytes(t) }));
  return {
    group, gpu,
    // env and torch strength follow the light of the hour
    update() {
      const a = LIGHT.uAmbUp.value; const amb = (a.x*0.2126 + a.y*0.7152 + a.z*0.0722)/0.43;
      PBR.uEnvK.value = Math.min(1.2, Math.max(0.12, amb)) + 0.25*LIGHT.uCandle.value;
    },
  };
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

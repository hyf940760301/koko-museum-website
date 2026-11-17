// The castle rebuild of the rotunda, behind ?castle=1. Step 1: bay 0 (the one facing you as you
// come in) and its two piers, with the new pipeline end to end: a Blender-built, bevelled bay
// (tools/blender/castle_bay.py), its baked light map (bake_bay.py), PBR stone with reflections of
// a real interior, AgX grading and posters that keep their own colour (post.js, materials.js).
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

// Step 2: everything the castle downloads comes out of tools/pack_assets.sh. Textures are KTX2
// (colour and ARM in ETC1S, normals and the light map in UASTC + zstd, mip chains built offline)
// and stay compressed on the GPU; the bay glb is meshopt-compressed.
const BASE = './assets/castle/';
const TEX = [  // file, sRGB, repeat, rotation
  ['sandstone_diff', true], ['sandstone_nor', false], ['sandstone_arm', false],
  ['render_diff', true, 1.125], ['render_nor', false, 1.125], ['render_arm', false, 1.125],
  ['oak_diff', true, 1.23, Math.PI/2], ['oak_nor', false, 1.23, Math.PI/2], ['oak_arm', false, 1.23, Math.PI/2],
  ['iron_diff', true, 4], ['iron_nor', false, 4],
];
// downloads the opening counts in its progress: glb, light map, environment and the textures
export const FILES = 3 + TEX.length;

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
    tick(gl.loadAsync(BASE + 'bay0.glb')),
    tick(kl.loadAsync(BASE + 'lm/bay0_lm.ktx2')),
    tick(new RGBELoader().loadAsync(BASE + 'env/chapel_512.hdr')),
    ...TEX.map(tex),
  ]).then(([gltf, lm, hdr, ...maps]) => ({ gltf, lm, hdr, maps }));
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

export async function buildCastle(renderer, env, assets) {
  const { gltf, lm, maps } = assets || await preload(renderer);
  const [sd, sn, sa, md, mn, ma, od, on, oa, id, inn] = maps;
  lm.colorSpace = THREE.NoColorSpace; lm.channel = 1; lm.minFilter = THREE.LinearMipmapLinearFilter; lm.needsUpdate = true;
  const common = { env, lm };
  const MAT = {
    stone: castleMaterial('stone', { ...common, map: sd, normalMap: sn, arm: sa, color: new THREE.Color(1.50, 1.33, 1.06), roughness: 1, normal: 1.0, envK: 0.35, mapMean: [0.377, 0.289, 0.177], mapK: 0.85, moss: 0.22 }),
    render: castleMaterial('render', { ...common, map: md, normalMap: mn, arm: ma, color: new THREE.Color(0.46, 0.17, 0.13), roughness: 1, normal: 0.45, envK: 0.30, mapMean: [0.59, 0.444, 0.293], mapK: 0.45 }),
    oak: castleMaterial('oak', { ...common, map: od, normalMap: on, arm: oa, color: new THREE.Color(0.78, 0.62, 0.50), roughness: 0.9, normal: 0.6, envK: 0.45 }),
    iron: castleMaterial('iron', { ...common, map: id, normalMap: inn, color: new THREE.Color(0.55, 0.50, 0.47), roughness: 0.55, metalness: 0.85, normal: 0.8, envK: 0.6 }),
    pitch: castleMaterial('pitch', { ...common, color: new THREE.Color(0.030, 0.024, 0.019), roughness: 0.62, metalness: 0, envK: 0.5 }),
  };
  const group = new THREE.Group(); group.name = 'castle';
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const name = (o.material && o.material.name) || 'stone';
    o.material = MAT[name] || MAT.stone;
  });
  const bay = gltf.scene; bay.applyMatrix4(bayMatrix(0)); group.add(bay);
  const gpu = [lm, ...maps].map((t) => ({ format: t.format, w: t.image.width, h: t.image.height, levels: (t.mipmaps || []).length, bytes: texBytes(t) }));
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

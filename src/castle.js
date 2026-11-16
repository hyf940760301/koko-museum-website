// The castle rebuild of the rotunda, behind ?castle=1. Step 1: bay 0 (the one facing you as you
// come in) and its two piers, with the new pipeline end to end: a Blender-built, bevelled bay
// (tools/blender/castle_bay.py), its baked light map (bake_bay.py), PBR stone with reflections of
// a real interior, AgX grading and posters that keep their own colour (post.js, materials.js).
import * as THREE from '../vendor/three/three.module.js';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from '../vendor/three/addons/loaders/RGBELoader.js';
import { bayMatrix, K } from './rotunda.js';
import { LIGHT } from './materials.js';
import { castleMaterial, PBR } from './pbr.js';

export { PBR };
// AgX puts mid-grey lower than the old curve: lift the grade so the room keeps its brightness
export const GRADE = { ev: 1.5, pow: 1.6, sat: 1.3 };

const BASE = './assets/castle/';
const tl = new THREE.TextureLoader();
// castle textures follow glTF: no vertical flip, so the uv sets authored in Blender read true
const tex = (name, srgb, rep = 1, rot = 0) => tl.loadAsync(BASE + 'tex/' + name).then((t) => {
  t.flipY = false; t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8; t.repeat.set(rep, rep); t.rotation = rot; t.needsUpdate = true; return t;
});

export async function loadEnv(renderer) {
  const hdr = await new RGBELoader().loadAsync(BASE + 'env/chapel_512.hdr');
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer); const rt = pm.fromEquirectangular(hdr); pm.dispose(); hdr.dispose();
  return rt.texture;
}

export async function buildCastle(renderer, env) {
  const [gltf, lm, sd, sn, sa, md, mn, ma, od, on, oa, id, inn] = await Promise.all([
    new GLTFLoader().loadAsync(BASE + 'bay0.glb'),
    tl.loadAsync(BASE + 'lm/bay0_lm.png'),
    tex('sandstone_diff.jpg', true), tex('sandstone_nor.jpg', false), tex('sandstone_arm.jpg', false),
    tex('render_diff.jpg', true, 1.125), tex('render_nor.jpg', false, 1.125), tex('render_arm.jpg', false, 1.125),
    tex('oak_diff.jpg', true, 1.23, Math.PI/2), tex('oak_nor.jpg', false, 1.23, Math.PI/2), tex('oak_arm.jpg', false, 1.23, Math.PI/2),
    tex('iron_diff.jpg', true, 4), tex('iron_nor.jpg', false, 4),
  ]);
  lm.flipY = false; lm.colorSpace = THREE.NoColorSpace; lm.channel = 1; lm.generateMipmaps = true; lm.minFilter = THREE.LinearMipmapLinearFilter; lm.needsUpdate = true;
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
  return {
    group,
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

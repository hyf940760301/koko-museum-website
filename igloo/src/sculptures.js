// High-precision procedural 3D character & emblem sculptures + 16k volumetric point-cloud samplers:
// 1. Pudgy Penguin high-poly organic vinyl-toy 3D sculpture (seamless pear-shaped body + heart-shaped white face mask + ribbed beanie + glossy eyes + sculpted beak & webbed feet)
// 2. Overpass architectural interlocked 3D overpass emblem sculpture
// 3. Mystery Vault Relic #03 ("???????????????")
// 4. 16,000-particle volumetric 3D point cloud targets for Scene 2 Entry ("/// Follow Us": Penguin / X / Medium)

import * as THREE from '../vendor/three.module.js';
import { fbm } from './noise_tex.js';

export function createPenguinSculpture({ envMap, detailMode = false }) {
  const root = new THREE.Group();

  // 1. Seamless high-poly pear-shaped penguin head+torso mesh (96x72 = 13,824 tris)
  // Using smooth analytical silhouette deformation + anti-aliased plumage shader for crisp heart-face & white belly!
  const bodyGeo = new THREE.SphereGeometry(0.68, 96, 72);
  const bPos = bodyGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < bPos.count; i++) {
    v.fromBufferAttribute(bPos, i);
    const ny = v.y / 0.68; // [-1, 1]
    // Chubby pear profile: wide lower belly, gentle neck waist around ny=0.22, round cute head above!
    const bellyWidth = 1.0 + 0.20 * Math.exp(-Math.pow((ny + 0.30) / 0.48, 2.0));
    const headRound = 0.06 * Math.exp(-Math.pow((ny - 0.58) / 0.36, 2.0));
    const neckPinch = -0.055 * Math.exp(-Math.pow((ny - 0.18) / 0.22, 2.0));
    const radScale = bellyWidth + headRound + neckPinch;
    v.x *= radScale * 1.03;
    v.z *= radScale * 0.96;
    v.y *= 1.18;
    // Slight forward tummy fullness & flat standing base
    if (v.z > 0) v.z *= 1.04;
    if (ny < -0.82) v.y = THREE.MathUtils.lerp(v.y, -0.76, (-ny - 0.82) * 2.1);
    bPos.setXYZ(i, v.x, v.y, v.z);
  }
  bodyGeo.computeVertexNormals();

  const plumageMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: detailMode ? 0.28 : 0.34,
    metalness: 0.06,
    envMap,
    envMapIntensity: detailMode ? 1.35 : 1.1,
  });

  plumageMat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocalP;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocalP = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocalP;')
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        // Classic Pudgy Penguin plumage: snow-white round belly + double-lobed white face mask, deep slate-navy hood & back!
        vec3 p = vLocalP;
        float frontMask = smoothstep(-0.08, 0.22, p.z);
        // White oval tummy patch
        vec2 bellyUv = vec2(p.x / 0.56, (p.y + 0.22) / 0.52);
        float belly = 1.0 - smoothstep(0.86, 0.94, length(bellyUv));
        // Cute double-cheek heart-shaped face patch with widow's peak between eyes
        vec2 leftCheek = vec2((p.x + 0.17) / 0.28, (p.y - 0.34) / 0.25);
        vec2 rightCheek = vec2((p.x - 0.17) / 0.28, (p.y - 0.34) / 0.25);
        float cheeks = 1.0 - smoothstep(0.88, 0.98, min(length(leftCheek), length(rightCheek)));
        float whitePatch = clamp(max(belly, cheeks) * frontMask, 0.0, 1.0);

        vec3 navyFeather = vec3(0.11, 0.16, 0.25);
        vec3 creamWhite = vec3(0.96, 0.97, 0.99);
        // Subtle rosy cheek blush
        float blush = exp(-pow(length(vec2(abs(p.x) - 0.27, p.y - 0.28)) / 0.095, 2.0)) * frontMask;
        vec3 baseCol = mix(navyFeather, creamWhite, whitePatch);
        baseCol = mix(baseCol, vec3(0.96, 0.62, 0.66), blush * 0.32);
        diffuseColor.rgb *= baseCol;`
      );
  };
  root.add(new THREE.Mesh(bodyGeo, plumageMat));

  // 2. Sculpted Flippers (left & right curved wings)
  const wingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.11, 0.16, 0.25),
    roughness: 0.34,
    metalness: 0.06,
    envMap,
    envMapIntensity: 1.1,
  });
  for (const side of [-1, 1]) {
    const wingGeo = new THREE.SphereGeometry(0.24, 36, 28);
    const wPos = wingGeo.attributes.position;
    for (let i = 0; i < wPos.count; i++) {
      let x = wPos.getX(i) * 0.36;
      let y = wPos.getY(i) * 1.68;
      let z = wPos.getZ(i) * 0.78;
      // Gentle inward curve & tapered wingtip
      const t = (y + 0.4) / 0.8;
      x += side * (1.0 - t) * 0.06;
      wPos.setXYZ(i, x, y, z);
    }
    wingGeo.computeVertexNormals();
    const wing = new THREE.Mesh(wingGeo, wingMat);
    wing.position.set(side * 0.68, -0.06, 0.02);
    wing.rotation.z = side * 0.34;
    wing.rotation.x = 0.12;
    root.add(wing);
  }

  // 3. Sculpted Plump Orange Beak (upper + lower mandible) & Webbed Feet
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf48c24,
    roughness: 0.30,
    metalness: 0.05,
    envMap,
    envMapIntensity: 1.2,
  });

  const upperBeakGeo = new THREE.SphereGeometry(0.16, 36, 24);
  upperBeakGeo.scale(1.18, 0.56, 1.05);
  const upperBeak = new THREE.Mesh(upperBeakGeo, orangeMat);
  upperBeak.position.set(0, 0.30, 0.63);
  upperBeak.rotation.x = 0.08;
  root.add(upperBeak);

  const lowerBeakGeo = new THREE.SphereGeometry(0.125, 28, 20);
  lowerBeakGeo.scale(1.02, 0.45, 0.88);
  const lowerBeak = new THREE.Mesh(lowerBeakGeo, orangeMat);
  lowerBeak.position.set(0, 0.255, 0.60);
  root.add(lowerBeak);

  // Cute 3-toed webbed feet peeking out under belly
  for (const side of [-1, 1]) {
    const footGroup = new THREE.Group();
    for (let toe = -1; toe <= 1; toe++) {
      const toeGeo = new THREE.SphereGeometry(0.095, 20, 16);
      toeGeo.scale(0.85, 0.46, 1.55);
      const toeMesh = new THREE.Mesh(toeGeo, orangeMat);
      toeMesh.position.set(toe * 0.075, 0, Math.abs(toe) * -0.025);
      toeMesh.rotation.y = toe * -0.18;
      footGroup.add(toeMesh);
    }
    footGroup.position.set(side * 0.28, -0.74, 0.26);
    footGroup.rotation.y = side * -0.18;
    root.add(footGroup);
  }

  // 4. Glossy Obsidian Eyes + Specular Catchlights
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x07090e,
    roughness: 0.04,
    metalness: 0.15,
    envMap,
    envMapIntensity: 2.0,
  });
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.072, 24, 20), eyeMat);
    eye.scale.set(0.95, 1.08, 0.68);
    eye.position.set(side * 0.205, 0.39, 0.595);
    root.add(eye);

    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 10), glintMat);
    glint.position.set(side * 0.205 - 0.02, 0.415, 0.642);
    root.add(glint);
  }

  // 5. Iconic Polar Knit Beanie Hat (ribbed cuff + knit dome + fluffy pom-pom)
  const knitMat = new THREE.MeshStandardMaterial({
    color: 0x4b87d8,
    roughness: 0.78,
    metalness: 0.02,
    envMap,
    envMapIntensity: 0.7,
  });
  const cuffGeo = new THREE.TorusGeometry(0.42, 0.095, 24, 64);
  const cPos = cuffGeo.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const x = cPos.getX(i);
    const y = cPos.getY(i);
    const z = cPos.getZ(i);
    const ang = Math.atan2(y, x);
    // Knit vertical ribbing!
    const rib = 1.0 + 0.035 * Math.sin(ang * 36.0);
    cPos.setXYZ(i, x * rib, y * rib, z * 1.15);
  }
  cuffGeo.computeVertexNormals();
  const cuff = new THREE.Mesh(cuffGeo, knitMat);
  cuff.rotation.x = Math.PI * 0.5 - 0.18;
  cuff.position.set(0, 0.69, -0.05);
  root.add(cuff);

  const capDome = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.52), knitMat);
  capDome.position.set(0, 0.68, -0.05);
  capDome.rotation.x = -0.18;
  root.add(capDome);

  const pom = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 24, 20),
    new THREE.MeshStandardMaterial({ color: 0xf4f7fc, roughness: 0.85 })
  );
  pom.position.set(0, 1.10, -0.13);
  root.add(pom);

  return root;
}

// Architectural 3D Overpass Emblem Sculpture (Interlocking Dual-Deck Highway Arches)
export function createOverpassSculpture({ envMap, detailMode = false }) {
  const root = new THREE.Group();

  const chromeMat = new THREE.MeshStandardMaterial({
    color: detailMode ? 0xdde7f5 : 0xcad6e8,
    roughness: 0.18,
    metalness: 0.78,
    envMap,
    envMapIntensity: detailMode ? 1.8 : 1.4,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x5ea6ff,
    emissive: new THREE.Color(0x1e58a8),
    emissiveIntensity: detailMode ? 0.85 : 0.45,
    roughness: 0.22,
    metalness: 0.55,
    envMap,
    envMapIntensity: 1.5,
  });

  // Two sweeping interlocked rectangular-beveled bridge ribbons crossing in 3D space!
  const buildRibbon = (curvePts, width, thick, mat) => {
    const curve = new THREE.CatmullRomCurve3(curvePts, true, 'catmullrom', 0.5);
    const shape = new THREE.Shape();
    const hw = width * 0.5;
    const ht = thick * 0.5;
    const r = Math.min(hw, ht) * 0.35;
    shape.moveTo(-hw + r, -ht);
    shape.lineTo(hw - r, -ht);
    shape.quadraticCurveTo(hw, -ht, hw, -ht + r);
    shape.lineTo(hw, ht - r);
    shape.quadraticCurveTo(hw, ht, hw - r, ht);
    shape.lineTo(-hw + r, ht);
    shape.quadraticCurveTo(-hw, ht, -hw, ht - r);
    shape.lineTo(-hw, -ht + r);
    shape.quadraticCurveTo(-hw, -ht, -hw + r, -ht);

    const geo = new THREE.ExtrudeGeometry(shape, {
      steps: 120,
      bevelEnabled: false,
      extrudePath: curve,
    });
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, mat);
  };

  // Outer stadium overpass loop
  const outerPts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    outerPts.push(
      new THREE.Vector3(
        Math.cos(a) * 0.72,
        Math.sin(a) * 0.46 + Math.sin(a * 2.0) * 0.12,
        Math.cos(a * 2.0) * 0.22
      )
    );
  }
  root.add(buildRibbon(outerPts, 0.22, 0.11, chromeMat));

  // Inner crossing overpass span (sweeps over & under the outer loop)
  const innerPts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    innerPts.push(
      new THREE.Vector3(
        Math.sin(a) * 0.44,
        Math.cos(a) * 0.70,
        -Math.cos(a * 2.0) * 0.26
      )
    );
  }
  root.add(buildRibbon(innerPts, 0.18, 0.095, accentMat));

  // Center luminous core node
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 2), accentMat);
  root.add(core);

  return root;
}

// Mystery Relic #03 ("???????????????") — Locked Classified Artifact inside -12° Deep Ice
export function createMysterySculpture({ envMap }) {
  const root = new THREE.Group();
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1e2636,
    emissive: new THREE.Color(0x142238),
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.82,
    envMap,
    envMapIntensity: 1.3,
  });

  // Twisted alien/classified monolith shard
  const geo = new THREE.IcosahedronGeometry(0.62, 4);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i) * 1.35;
    let z = pos.getZ(i);
    const twist = y * 1.4;
    const rx = x * Math.cos(twist) - z * Math.sin(twist);
    const rz = x * Math.sin(twist) + z * Math.cos(twist);
    const facet = 0.82 + fbm(rx * 3.2, y * 3.2 + rz * 3.2, 3) * 0.36;
    pos.setXYZ(i, rx * facet, y * 0.92, rz * facet);
  }
  geo.computeVertexNormals();
  root.add(new THREE.Mesh(geo, darkMat));

  // Containment lock rings
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x8ea4c8, wireframe: true, transparent: true, opacity: 0.35 });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.018, 8, 48), ringMat);
  r1.rotation.set(0.6, 0.4, 0);
  root.add(r1);
  return root;
}

// Sample 3 volumetric 16,000-particle point clouds for Scene 2 Entry ("/// Follow Us": LinkedIn Penguin / X / Medium)
export function createSocialPointClouds(count = 15000) {
  const target0 = new Float32Array(count * 3); // LinkedIn / Peaches Penguin volumetric cloud
  const target1 = new Float32Array(count * 3); // X / Twitter 3D crossed-beam emblem
  const target2 = new Float32Array(count * 3); // Medium 3D triple-ellipse emblem (● ◐ ❘)
  const seeds = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    seeds[i3] = Math.random();
    seeds[i3 + 1] = Math.random() * Math.PI * 2;
    seeds[i3 + 2] = 0.4 + Math.random() * 0.8;

    // ---- Target 0: Peaches / Igloo Penguin 3D Bust & Body Silhouette ----
    {
      const r = Math.random();
      let x = 0, y = 0, z = 0;
      if (r < 0.68) {
        // Pear-shaped torso + head shell & interior haze
        const u = Math.random() * Math.PI * 2;
        const cosP = Math.random() * 2 - 1;
        const sinP = Math.sqrt(Math.max(0, 1 - cosP * cosP));
        const shell = Math.pow(Math.random(), 0.22); // concentrated near surface like VDB density!
        const ny = cosP;
        const w = 1.0 + 0.22 * Math.exp(-Math.pow((ny + 0.3) / 0.48, 2));
        x = Math.cos(u) * sinP * 0.50 * w * shell;
        y = ny * 0.62 * shell - 0.02;
        z = Math.sin(u) * sinP * 0.46 * w * shell;
      } else if (r < 0.84) {
        // Flippers
        const side = i % 2 === 0 ? -1 : 1;
        const t = Math.random() * 2 - 1;
        x = side * (0.52 + Math.random() * 0.08);
        y = t * 0.30 - 0.05;
        z = (Math.random() - 0.5) * 0.16;
      } else if (r < 0.92) {
        // Beak + Beanie pom-pom
        if (i % 2 === 0) {
          x = (Math.random() - 0.5) * 0.22;
          y = 0.20 + (Math.random() - 0.5) * 0.09;
          z = 0.46 + Math.random() * 0.14;
        } else {
          const a = Math.random() * Math.PI * 2;
          x = Math.cos(a) * 0.34;
          y = 0.52 + (Math.random() - 0.5) * 0.08;
          z = Math.sin(a) * 0.34;
        }
      } else {
        // Feet
        const side = i % 2 === 0 ? -1 : 1;
        x = side * (0.20 + (Math.random() - 0.5) * 0.12);
        y = -0.58 + (Math.random() - 0.5) * 0.06;
        z = 0.18 + Math.random() * 0.18;
      }
      target0[i3] = x;
      target0[i3 + 1] = y;
      target0[i3 + 2] = z;
    }

    // ---- Target 1: Official X Logo (double-rail hollow diagonal + solid crossing diagonal) ----
    {
      const diag = i % 2 === 0;
      const t = (Math.random() - 0.5) * 1.18;
      let x, y;
      if (diag) {
        // Top-left to bottom-right double-outline rail
        const rail = (i % 4 < 2 ? -1 : 1) * 0.068 + (Math.random() - 0.5) * 0.028;
        x = t * 0.48 + rail;
        y = -t * 0.54;
      } else {
        // Bottom-left to top-right solid stroke
        const thick = (Math.random() - 0.5) * 0.095;
        x = t * 0.48 + thick;
        y = t * 0.54;
      }
      const z = (Math.random() - 0.5) * 0.16;
      target1[i3] = x;
      target1[i3 + 1] = y;
      target1[i3 + 2] = z;
    }

    // ---- Target 2: Official Medium Logo (Full Circle ● + Half Ellipse ◐ + Thin Ellipse ❘) ----
    {
      const p = Math.random();
      const a = Math.random() * Math.PI * 2;
      const rad = Math.pow(Math.random(), 0.32); // crisp silhouette edge + soft interior
      let x, y;
      if (p < 0.56) {
        // Left full circle
        x = -0.26 + Math.cos(a) * 0.31 * rad;
        y = Math.sin(a) * 0.31 * rad;
      } else if (p < 0.84) {
        // Middle vertical oval
        x = 0.22 + Math.cos(a) * 0.155 * rad;
        y = Math.sin(a) * 0.29 * rad;
      } else {
        // Right slender ellipse
        x = 0.48 + Math.cos(a) * 0.055 * rad;
        y = Math.sin(a) * 0.255 * rad;
      }
      const z = (Math.random() - 0.5) * 0.14;
      target2[i3] = x;
      target2[i3 + 1] = y;
      target2[i3 + 2] = z;
    }
  }

  return { count, target0, target1, target2, seeds };
}

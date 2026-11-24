// Subterranean Polar Vaults (Sections 1, 2, 3):
// - Vertical Frost Shaft connecting y = 0 down to y = -44
// - Chamber 1 (y = -13): OVERPASS IP — Faceted Obsidian-Ice Crystal Monolith with RGB chromatic refraction & glowing embedded "IP" emblem
// - Chamber 2 (y = -26): ABSTRACT — Pebbled frosted-ice wall illuminated by a dithered luminous energy portal ring & geometric star core
// - Chamber 3 (y = -39): PUDGY PENGUINS — 15,500-particle granular point-cloud penguin mascot on a concentric laboratory plinth beneath a top halo ring light

import * as THREE from '../vendor/three.module.js';
import { hash2 } from './noise_tex.js';

// Build a sharp, craggy, multi-faceted obsidian-ice crystal via Half-Space Planar Cuts
function createFacetedCrystalGeometry(radius = 1.65) {
  const geo = new THREE.IcosahedronGeometry(radius, 4);
  const pos = geo.attributes.position;

  // 18 deterministic cleavage planes to carve sharp natural mineral/ice facets
  const planes = [];
  for (let p = 0; p < 18; p++) {
    const theta = hash2(p, 1.3) * Math.PI * 2;
    const z = hash2(p, 7.9) * 1.8 - 0.9;
    const r = Math.sqrt(Math.max(0.01, 1 - z * z));
    const n = new THREE.Vector3(r * Math.cos(theta), z * 0.85, r * Math.sin(theta)).normalize();
    const dist = radius * (0.66 + hash2(p, 4.5) * 0.24);
    planes.push({ n, dist });
  }

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // Elongate slightly vertically & flatten front/back for heroic silhouette
    v.y *= 1.18;
    v.x *= 1.06;
    v.z *= 0.88;

    for (let p = 0; p < planes.length; p++) {
      const pl = planes[p];
      const dot = v.dot(pl.n);
      if (dot > pl.dist) {
        v.addScaledVector(pl.n, (pl.dist - dot) * 0.92);
      }
    }
    // Fine crystalline micro-ridge
    const crinkle = (Math.sin(v.x * 7.2 + v.y * 5.4) * Math.cos(v.z * 6.8)) * 0.025;
    v.addScaledVector(v.clone().normalize(), crinkle);
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  // Convert to non-indexed so flat-shaded / sharp facet normals catch crisp studio highlights!
  const flatGeo = geo.toNonIndexed();
  geo.dispose();
  flatGeo.computeVertexNormals();
  return flatGeo;
}

// Build glowing 3D "IP" emblem inside rounded-corner frame (matches settled_sec_1.png!)
function createIPEmblemGroup() {
  const g = new THREE.Group();
  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(2.4, 2.65, 3.0),
    toneMapped: false,
  });

  // Outer rounded-corner square frame
  const shape = new THREE.Shape();
  const s = 0.56;
  const r = 0.14;
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.quadraticCurveTo(s, -s, s, -s + r);
  shape.lineTo(s, s - r);
  shape.quadraticCurveTo(s, s, s - r, s);
  shape.lineTo(-s + r, s);
  shape.quadraticCurveTo(-s, s, -s, s - r);
  shape.lineTo(-s, -s + r);
  shape.quadraticCurveTo(-s, -s, -s + r, -s);

  const hole = new THREE.Path();
  const hs = 0.45;
  const hr = 0.09;
  hole.moveTo(-hs + hr, -hs);
  hole.lineTo(hs - hr, -hs);
  hole.quadraticCurveTo(hs, -hs, hs, -hs + hr);
  hole.lineTo(hs, hs - hr);
  hole.quadraticCurveTo(hs, hs, hs - hr, hs);
  hole.lineTo(-hs + hr, hs);
  hole.quadraticCurveTo(-hs, hs, -hs, hs - hr);
  hole.lineTo(-hs, -hs + hr);
  hole.quadraticCurveTo(-hs, -hs, -hs + hr, -hs);
  shape.holes.push(hole);

  const frameGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.10, bevelEnabled: false });
  frameGeo.center();
  g.add(new THREE.Mesh(frameGeo, glowMat));

  // Letter "I"
  const barI = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.52, 0.11), glowMat);
  barI.position.set(-0.19, 0, 0);
  g.add(barI);

  // Letter "P" (stem + rounded loop)
  const stemP = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.52, 0.11), glowMat);
  stemP.position.set(0.04, 0, 0);
  g.add(stemP);

  const pShape = new THREE.Shape();
  pShape.moveTo(0, -0.02);
  pShape.lineTo(0.20, -0.02);
  pShape.absarc(0.20, 0.12, 0.14, -Math.PI * 0.5, Math.PI * 0.5, false);
  pShape.lineTo(0, 0.26);
  pShape.closePath();
  const pHole = new THREE.Path();
  pHole.moveTo(0.06, 0.06);
  pHole.lineTo(0.18, 0.06);
  pHole.absarc(0.18, 0.12, 0.06, -Math.PI * 0.5, Math.PI * 0.5, false);
  pHole.lineTo(0.06, 0.18);
  pHole.closePath();
  pShape.holes.push(pHole);

  const pLoopGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.11, bevelEnabled: false });
  pLoopGeo.translate(0.04, 0, -0.055);
  g.add(new THREE.Mesh(pLoopGeo, glowMat));

  return g;
}

// Sample 15,500 points across a chubby Pudgy Penguin silhouette (head, plump belly, beak, flippers, feet, beanie/goggles)
function createPointCloudPenguinGeometry(count = 15500) {
  const parts = [
    // Plump pear-shaped body & belly
    { cx: 0, cy: -0.22, cz: 0, rx: 0.86, ry: 0.98, rz: 0.78, weight: 0.42, bright: 0.95 },
    // Lower chubby tummy bulge
    { cx: 0, cy: -0.45, cz: 0.12, rx: 0.76, ry: 0.68, rz: 0.68, weight: 0.14, bright: 1.08 },
    // Round head
    { cx: 0, cy: 0.76, cz: 0.02, rx: 0.68, ry: 0.62, rz: 0.64, weight: 0.24, bright: 1.0 },
    // Cute rounded beak
    { cx: 0, cy: 0.68, cz: 0.64, rx: 0.20, ry: 0.11, rz: 0.18, weight: 0.03, bright: 1.25 },
    // Left & Right eye socket highlights
    { cx: -0.24, cy: 0.82, cz: 0.56, rx: 0.08, ry: 0.09, rz: 0.06, weight: 0.015, bright: 1.45 },
    { cx: 0.24, cy: 0.82, cz: 0.56, rx: 0.08, ry: 0.09, rz: 0.06, weight: 0.015, bright: 1.45 },
    // Left & Right flippers (angled slightly outward)
    { cx: -0.88, cy: -0.14, cz: 0.02, rx: 0.16, ry: 0.54, rz: 0.28, rotZ: 0.34, weight: 0.05, bright: 0.90 },
    { cx: 0.88, cy: -0.14, cz: 0.02, rx: 0.16, ry: 0.54, rz: 0.28, rotZ: -0.34, weight: 0.05, bright: 0.90 },
    // Left & Right webbed feet
    { cx: -0.36, cy: -1.16, cz: 0.22, rx: 0.24, ry: 0.09, rz: 0.32, weight: 0.02, bright: 1.12 },
    { cx: 0.36, cy: -1.16, cz: 0.22, rx: 0.24, ry: 0.09, rz: 0.32, weight: 0.02, bright: 1.12 },
  ];

  // Normalize weights
  let totalW = 0;
  for (const p of parts) totalW += p.weight;

  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3); // x: brightness, y: phase, z: shell depth

  let idx = 0;
  for (let pi = 0; pi < parts.length; pi++) {
    const part = parts[pi];
    const partCount = pi === parts.length - 1 ? count - idx : Math.round((part.weight / totalW) * count);
    const cosR = Math.cos(part.rotZ || 0);
    const sinR = Math.sin(part.rotZ || 0);

    for (let k = 0; k < partCount && idx < count; k++, idx++) {
      // Fibonacci + jittered surface/subsurface shell distribution for dense granular point-cloud look!
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const cosPhi = 2 * v - 1;
      const sinPhi = Math.sqrt(Math.max(0, 1 - cosPhi * cosPhi));

      // Concentrate 82% of points near outer skin shell so silhouette is fuzzy yet sculptural
      const radial = 0.86 + Math.pow(Math.random(), 0.45) * 0.16;
      let lx = sinPhi * Math.cos(theta) * part.rx * radial;
      let ly = cosPhi * part.ry * radial;
      let lz = sinPhi * Math.sin(theta) * part.rz * radial;

      if (part.rotZ) {
        const rx = lx * cosR - ly * sinR;
        const ry = lx * sinR + ly * cosR;
        lx = rx;
        ly = ry;
      }

      const wx = part.cx + lx;
      const wy = part.cy + ly;
      const wz = part.cz + lz;

      positions[idx * 3] = wx;
      positions[idx * 3 + 1] = wy;
      positions[idx * 3 + 2] = wz;

      const invLen = 1 / Math.max(0.001, Math.hypot(lx, ly, lz));
      normals[idx * 3] = lx * invLen;
      normals[idx * 3 + 1] = ly * invLen;
      normals[idx * 3 + 2] = lz * invLen;

      // Brighter chest/face patch like a real penguin!
      const chestMask = (wz > 0.22 && wy < 0.45 && Math.abs(wx) < 0.56) ? 1.22 : 0.88;
      seeds[idx * 3] = part.bright * chestMask * (0.78 + Math.random() * 0.44);
      seeds[idx * 3 + 1] = Math.random() * 6.28318;
      seeds[idx * 3 + 2] = Math.random();
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
  return geo;
}

export function createRelicChambers({ envMap, textures, refractTex }) {
  const root = new THREE.Group();
  const transmissiveMeshes = [];

  // ============================================================================
  // 0. Vertical Subterranean Frost Wall Shaft (y = -2 down to y = -45)
  // ============================================================================
  const shaftGeo = new THREE.CylinderGeometry(8.5, 8.5, 46, 28, 16, true);
  const sPos = shaftGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const x = sPos.getX(i);
    const y = sPos.getY(i);
    const z = sPos.getZ(i);
    const n = (Math.sin(y * 0.8 + x * 0.5) * Math.cos(z * 0.6 - y * 0.4)) * 0.55;
    sPos.setXYZ(i, x + (x / 8.5) * n, y, z + (z / 8.5) * n);
  }
  shaftGeo.computeVertexNormals();
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0x7b8394,
    roughness: 0.85,
    metalness: 0.08,
    side: THREE.BackSide,
    bumpMap: textures.stoneBumpTex,
    bumpScale: 0.08,
  });
  const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
  shaftMesh.position.y = -24;
  root.add(shaftMesh);

  // ============================================================================
  // CHAMBER 1 (y = -13.0): OVERPASS IP — Obsidian-Ice Crystalline Monolith
  // ============================================================================
  const ch1 = new THREE.Group();
  ch1.position.set(0, -13.0, 0);
  root.add(ch1);

  const ipCore = createIPEmblemGroup();
  ch1.add(ipCore);

  const ipLight = new THREE.PointLight(0xdbeaff, 4.5, 8.0, 1.5);
  ch1.add(ipLight);

  const crystalGeo = createFacetedCrystalGeometry(1.68);
  const crystalUniforms = {
    tRefract: { value: refractTex },
    uRes: { value: new THREE.Vector2(1440, 900) },
    uTime: { value: 0 },
  };

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x3b4252,
    roughness: 0.14,
    metalness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMap,
    envMapIntensity: 2.1,
    bumpMap: textures.stoneBumpTex,
    bumpScale: 0.018,
  });

  crystalMat.onBeforeCompile = (shader) => {
    shader.uniforms.tRefract = crystalUniforms.tRefract;
    shader.uniforms.uRes = crystalUniforms.uRes;
    shader.uniforms.uTime = crystalUniforms.uTime;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vViewNormC;
        varying vec3 vLocalPosC;`
      )
      .replace(
        '#include <beginnormal_vertex>',
        `#include <beginnormal_vertex>
        vViewNormC = normalize(normalMatrix * objectNormal);`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vLocalPosC = position;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform sampler2D tRefract;
        uniform vec2 uRes;
        uniform float uTime;
        varying vec3 vViewNormC;
        varying vec3 vLocalPosC;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        vec2 scrUv = gl_FragCoord.xy / max(uRes, vec2(1.0));
        vec2 refrOff = vViewNormC.xy * 0.055;
        // RGB Chromatic Dispersion through thick faceted obsidian ice!
        float rCh = texture2D(tRefract, clamp(scrUv + refrOff * 0.88, 0.002, 0.998)).r;
        float gCh = texture2D(tRefract, clamp(scrUv + refrOff * 1.00, 0.002, 0.998)).g;
        float bCh = texture2D(tRefract, clamp(scrUv + refrOff * 1.14, 0.002, 0.998)).b;
        vec3 refrCol = vec3(rCh, gCh, bCh);

        // Subtle blue-violet dichromatic rim sheen (signature settled_sec_1.png look!)
        vec3 viewDirC = normalize(vViewPosition);
        float fres = pow(1.0 - abs(dot(normalize(normal), viewDirC)), 2.8);
        vec3 rimTint = mix(vec3(0.58, 0.74, 1.0), vec3(0.68, 0.56, 0.98), 0.5 + 0.5 * sin(vLocalPosC.y * 2.4 + uTime));

        // Blend dark smoky obsidian-ice absorption with bright refracted "IP" core!
        diffuseColor.rgb *= 0.36;
        totalEmissiveRadiance += refrCol * 0.92 + rimTint * fres * 0.68;`
      );
  };

  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  ch1.add(crystalMesh);
  transmissiveMeshes.push(crystalMesh);

  // Subtle wireframe cage around a subset of crystal edges
  const ch1AnchorsLocal = [
    new THREE.Vector3(-1.28, 0.95, 0.65),
    new THREE.Vector3(1.36, 0.62, 0.55),
    new THREE.Vector3(-1.15, -0.88, 0.72),
    new THREE.Vector3(1.22, -0.74, 0.68),
  ];
  const ch1AnchorsWorld = ch1AnchorsLocal.map(() => new THREE.Vector3());

  // ============================================================================
  // CHAMBER 2 (y = -26.0): ABSTRACT — Granular Frosted Wall & Luminous Portal Ring
  // ============================================================================
  const ch2 = new THREE.Group();
  ch2.position.set(0, -26.0, 0);
  root.add(ch2);

  // Curved pebbled frosted-ice backdrop wall that catches physical specular highlights from the central portal!
  const frostWallGeo = new THREE.PlaneGeometry(16, 11, 48, 32);
  const fwPos = frostWallGeo.attributes.position;
  for (let i = 0; i < fwPos.count; i++) {
    const x = fwPos.getX(i);
    const y = fwPos.getY(i);
    // Gentle concave dish so central light rakes across the pebbled surface
    const dish = (x * x + y * y) * 0.022;
    fwPos.setZ(i, dish - 2.1);
  }
  frostWallGeo.computeVertexNormals();
  const frostWallMat = new THREE.MeshStandardMaterial({
    color: 0x9aa6b8,
    roughness: 0.54,
    metalness: 0.16,
    bumpMap: textures.frostGrainTex,
    bumpScale: 0.095,
    envMap,
    envMapIntensity: 0.7,
  });
  const frostWall = new THREE.Mesh(frostWallGeo, frostWallMat);
  ch2.add(frostWall);

  const portalPointLight = new THREE.PointLight(0xe6f2ff, 8.5, 12.0, 1.4);
  portalPointLight.position.set(0, 0, 0.4);
  ch2.add(portalPointLight);

  // Luminous Dithered Energy Ring & Intense Core Shader (1:1 match for settled_sec_2.png!)
  const portalUniforms = {
    uTime: { value: 0 },
  };
  const portalPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 5.8),
    new THREE.ShaderMaterial({
      uniforms: portalUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv * 2.0 - 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        void main() {
          float r = length(vUv);
          float ang = atan(vUv.y, vUv.x);

          // Granular dithered jitter on radius (creates the signature fuzzy/stippled outer halo!)
          float grain = (hash12(gl_FragCoord.xy + fract(uTime * 0.37) * 91.0) - 0.5) * 0.055;
          float rd = r + grain;

          // Concentrated white-hot central core
          float core = exp(-r * r * 14.5) * 2.6;

          // Ethereal outer ice-blue luminous ring
          float ring = exp(-pow((rd - 0.52) / 0.145, 2.0)) * (1.15 + 0.18 * sin(ang * 3.0 - uTime * 1.6));

          // Crisp rotating geometric Abstract 3-arc / star filament inside
          float spoke = smoothstep(0.022, 0.0, abs(sin(ang * 1.5 + uTime * 0.45)) * r - 0.012) * smoothstep(0.46, 0.12, r) * 0.65;

          vec3 col = vec3(1.0) * core + vec3(0.82, 0.91, 1.0) * ring + vec3(0.95, 0.99, 1.0) * spoke;
          float alpha = clamp(core * 0.85 + ring * 0.92 + spoke, 0.0, 1.0) * smoothstep(0.98, 0.68, r);
          if (alpha < 0.005) discard;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  portalPlane.position.z = -0.35;
  ch2.add(portalPlane);

  const ch2AnchorsLocal = [
    new THREE.Vector3(-1.45, 0.85, -0.2),
    new THREE.Vector3(1.48, -0.65, -0.2),
  ];
  const ch2AnchorsWorld = ch2AnchorsLocal.map(() => new THREE.Vector3());

  // ============================================================================
  // CHAMBER 3 (y = -39.0): PUDGY PENGUINS — 15,500 Point-Cloud Laboratory Stage
  // ============================================================================
  const ch3 = new THREE.Group();
  ch3.position.set(0, -39.0, 0);
  root.add(ch3);

  // Top Overhead Luminous Ring Halo (matches settled_sec_3.png!)
  const haloRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.065, 16, 64),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 2.6, 2.75), toneMapped: false })
  );
  haloRing.rotation.x = Math.PI * 0.5;
  haloRing.position.set(0, 2.28, -0.15);
  ch3.add(haloRing);

  // Metallic Concentric Laboratory Floor Platform
  const stageFloor = new THREE.Mesh(
    new THREE.CircleGeometry(4.8, 48),
    new THREE.MeshStandardMaterial({
      color: 0x7c8494,
      roughness: 0.42,
      metalness: 0.55,
      bumpMap: textures.frostGrainTex,
      bumpScale: 0.02,
      envMap,
      envMapIntensity: 0.9,
    })
  );
  stageFloor.rotation.x = -Math.PI * 0.5;
  stageFloor.position.y = -1.26;
  ch3.add(stageFloor);

  // Concentric technical floor rings
  for (const rad of [1.15, 1.85, 2.65, 3.45]) {
    const ringLine = new THREE.Mesh(
      new THREE.RingGeometry(rad - 0.014, rad + 0.014, 64),
      new THREE.MeshBasicMaterial({ color: 0xeef4ff, transparent: true, opacity: 0.42, side: THREE.DoubleSide })
    );
    ringLine.rotation.x = -Math.PI * 0.5;
    ringLine.position.y = -1.252;
    ch3.add(ringLine);
  }

  // Glowing Rectangular Under-Light Plinth beneath the Penguin's feet (settled_sec_3.png signature focal element!)
  const underLightPad = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.46),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.7, 2.8, 2.95), toneMapped: false })
  );
  underLightPad.rotation.x = -Math.PI * 0.5;
  underLightPad.position.set(0, -1.245, 0.35);
  ch3.add(underLightPad);

  // 15,500-Particle Granular Point-Cloud Pudgy Penguin Mascot!
  const penguinGeo = createPointCloudPenguinGeometry(15500);
  const penguinUniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector3(99, 99, 99) },
    uMorph: { value: 0 }, // subtle scatter pulse when cycling variants with < > arrows
    uDpr: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2) },
  };

  const penguinMat = new THREE.ShaderMaterial({
    uniforms: penguinUniforms,
    vertexShader: `
      attribute vec3 aNormal;
      attribute vec3 aSeed;
      uniform float uTime;
      uniform vec3 uPointer;
      uniform float uMorph;
      uniform float uDpr;
      varying float vLum;
      varying float vAlpha;

      void main() {
        vec3 p = position;

        // Subtle granular quantum shimmer + breathing
        float breath = sin(uTime * 1.8 + aSeed.y + p.y * 2.2) * 0.016;
        p += aNormal * (breath + uMorph * (0.28 + aSeed.z * 0.45));

        // Swirl dispersion during < > carousel switch
        if (uMorph > 0.001) {
          float sw = uMorph * 1.6;
          float cs = cos(sw), sn = sin(sw);
          p.xz = mat2(cs, -sn, sn, cs) * p.xz;
        }

        // Interactive cursor magnetic ripple in local space
        vec3 diff = p - uPointer;
        float dist = length(diff);
        if (dist < 0.95) {
          float push = pow(1.0 - dist / 0.95, 2.0) * 0.22;
          p += normalize(diff + aNormal * 0.35) * push;
        }

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp((9.2 * uDpr * (0.75 + aSeed.z * 0.55)) / max(-mv.z, 1.2), 1.4, 5.2);

        // Top-halo + bottom-plinth dual rim illumination
        float topLight = smoothstep(-1.1, 1.1, p.y) * 0.35;
        float underGlow = smoothstep(-0.35, -1.22, p.y) * 0.65;
        vLum = aSeed.x * (0.82 + topLight + underGlow);
        vAlpha = 0.78;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vLum;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord * 2.0 - 1.0;
        float r2 = dot(c, c);
        if (r2 > 1.0) discard;
        float soft = 1.0 - smoothstep(0.35, 1.0, r2);
        vec3 col = vec3(0.93, 0.96, 1.0) * vLum;
        gl_FragColor = vec4(col, soft * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });

  const penguinPoints = new THREE.Points(penguinGeo, penguinMat);
  penguinPoints.position.set(0, -0.02, 0);
  ch3.add(penguinPoints);

  const penguinProxy = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 12, 10),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  ch3.add(penguinProxy);

  const ch3AnchorsLocal = [
    new THREE.Vector3(-0.92, 0.78, 0.3),
    new THREE.Vector3(0.95, -0.35, 0.3),
  ];
  const ch3AnchorsWorld = ch3AnchorsLocal.map(() => new THREE.Vector3());

  let morphPulse = 0;
  let penguinTargetYaw = 0;
  let penguinYaw = 0;

  function triggerPenguinVariant(dir = 1) {
    morphPulse = 1.0;
    penguinTargetYaw += dir * (Math.PI * 0.5);
  }

  function setPenguinHoverWorld(worldPt) {
    if (worldPt) {
      penguinUniforms.uPointer.value.copy(worldPt);
      penguinPoints.worldToLocal(penguinUniforms.uPointer.value);
    } else {
      penguinUniforms.uPointer.value.set(99, 99, 99);
    }
  }

  function setResolution(w, h, dpr) {
    crystalUniforms.uRes.value.set(w, h);
    penguinUniforms.uDpr.value = dpr;
  }

  function update(dt, time, pointerNDC) {
    crystalUniforms.uTime.value = time;
    portalUniforms.uTime.value = time;
    penguinUniforms.uTime.value = time;

    // Slow ethereal levitation & rotation of Chamber 1 Obsidian-Ice Crystal
    crystalMesh.rotation.y = time * 0.24 + pointerNDC.x * 0.28;
    crystalMesh.rotation.x = Math.sin(time * 0.5) * 0.08 - pointerNDC.y * 0.16;
    crystalMesh.position.y = Math.sin(time * 1.1) * 0.09;

    ipCore.rotation.y = crystalMesh.rotation.y * 0.45;
    ipCore.position.y = crystalMesh.position.y;

    // Chamber 2 subtle parallax
    portalPointLight.position.x = pointerNDC.x * 0.85;
    portalPointLight.position.y = pointerNDC.y * 0.55;

    // Chamber 3 Point-Cloud Penguin smooth turntable & morph decay
    morphPulse = Math.max(0, morphPulse - dt * 2.4);
    penguinUniforms.uMorph.value = Math.sin(morphPulse * Math.PI) * 0.42;
    penguinYaw += (penguinTargetYaw + Math.sin(time * 0.55) * 0.22 + pointerNDC.x * 0.35 - penguinYaw) * Math.min(1, dt * 6.0);
    penguinPoints.rotation.y = penguinYaw;

    // Update world-space telemetry anchor positions
    crystalMesh.updateMatrixWorld();
    for (let i = 0; i < ch1AnchorsLocal.length; i++) {
      ch1AnchorsWorld[i].copy(ch1AnchorsLocal[i]).applyMatrix4(crystalMesh.matrixWorld);
    }
    ch2.updateMatrixWorld();
    for (let i = 0; i < ch2AnchorsLocal.length; i++) {
      ch2AnchorsWorld[i].copy(ch2AnchorsLocal[i]).applyMatrix4(ch2.matrixWorld);
    }
    ch3.updateMatrixWorld();
    for (let i = 0; i < ch3AnchorsLocal.length; i++) {
      ch3AnchorsWorld[i].copy(ch3AnchorsLocal[i]).applyMatrix4(ch3.matrixWorld);
    }
  }

  return {
    root,
    transmissiveMeshes,
    penguinProxy,
    triggerPenguinVariant,
    setPenguinHoverWorld,
    setResolution,
    update,
    getAnchorsForSection: (secIdx) => {
      if (secIdx === 1) {
        return [
          { pos: ch1AnchorsWorld[0], code: 'OVP_IP // 01.A', sub: 'REFRACT_IOR 1.31' },
          { pos: ch1AnchorsWorld[1], code: 'LIC_NODE // 88.4', sub: 'ONCHAIN_RIGHTS' },
          { pos: ch1AnchorsWorld[2], code: 'CRYS_VTX // -13.2', sub: 'VERIFIED_ASSET' },
        ];
      }
      if (secIdx === 2) {
        return [
          { pos: ch2AnchorsWorld[0], code: 'ABS_L2 // ZK_RING', sub: 'THROUGHPUT 99.9%' },
          { pos: ch2AnchorsWorld[1], code: 'PORTAL // -26.0M', sub: 'CONSUMER_CHAIN' },
        ];
      }
      if (secIdx === 3) {
        return [
          { pos: ch3AnchorsWorld[0], code: 'PPG_8888 // CLOUD', sub: '15.5K_PARTICLES' },
          { pos: ch3AnchorsWorld[1], code: 'HUDDLE // GLOBAL', sub: 'IP_ECOSYSTEM' },
        ];
      }
      return [];
    },
  };
}

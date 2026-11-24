// Scene 2 — Vertical Shattered-Ring Dive & Subterranean Halo Chamber ("/// Follow Us"):
// - First half (progress 0.0 -> 0.52): Camera dives vertically down a glacial shaft through 3 rotating
//   shattered rock-ice rings + plasma forcefields + spiral smoke trails with a 180° barrel roll!
// - Second half (progress 0.53 -> 1.0): Camera levels out in the subterranean circular chamber beneath a
//   colossal glowing ceiling light-ring (roomring), ceiling/ground mist, and a 15,000-particle volumetric
//   3D point-cloud sculpture morphing smoothly between LinkedIn (Penguin), X, and Medium!

import * as THREE from '../vendor/three.module.js';
import { fbm, hash2 } from './noise_tex.js';
import { createSocialPointClouds } from './sculptures.js';

export const SOCIAL_CHANNELS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/company/igloo-incorporated',
    url: 'https://www.linkedin.com/company/igloo-incorporated',
  },
  {
    id: 'x',
    name: 'X / Twitter',
    handle: '@iglooinc',
    url: 'https://www.twitter.com/iglooinc',
  },
  {
    id: 'medium',
    name: 'Medium',
    handle: '@iglooinc',
    url: 'https://medium.com/@iglooinc',
  },
];

function buildShatteredRingGroup(textures, envMap, seed) {
  const group = new THREE.Group();

  // 22 chiseled floating rock-ice fragments arranged in a broken ring (radius ~1.75)
  const shardGeo = new THREE.IcosahedronGeometry(0.24, 2);
  const pos = shardGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) * 1.35;
    const y = pos.getY(i) * 0.65;
    const z = pos.getZ(i) * 0.95;
    const n = 0.78 + fbm(x * 4.0 + seed, y * 4.0 + z * 4.0, 2) * 0.48;
    pos.setXYZ(i, x * n, y * n, z * n);
  }
  shardGeo.computeVertexNormals();

  const shardMat = new THREE.MeshStandardMaterial({
    color: 0xbac6d8,
    roughness: 0.45,
    metalness: 0.18,
    normalMap: textures.rockNormalTex,
    envMap,
    envMapIntensity: 1.25,
  });

  const shardCount = 24;
  const inst = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < shardCount; i++) {
    const a = (i / shardCount) * Math.PI * 2 + hash2(i, seed) * 0.18;
    const r = 1.62 + (hash2(seed, i * 3.7) - 0.5) * 0.42;
    dummy.position.set(Math.cos(a) * r, (hash2(i * 2.1, seed) - 0.5) * 0.28, Math.sin(a) * r);
    dummy.rotation.set(hash2(i, 1.1) * 3.1, -a, hash2(i, 4.7) * 3.1);
    const s = 0.55 + hash2(i * 5.3, seed) * 0.95;
    dummy.scale.set(s * 1.2, s * 0.75, s);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  group.add(inst);

  // Glowing plasma forcefield annulus inside the shattered ring!
  const plasmaMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSeed: { value: seed },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv * 2.0 - 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uSeed;
      varying vec2 vUv;
      void main() {
        float r = length(vUv);
        float a = atan(vUv.y, vUv.x);
        float wave = sin(a * 6.0 + uTime * 2.4 + uSeed * 4.0) * 0.035 + cos(a * 11.0 - uTime * 1.8) * 0.02;
        float ring = exp(-pow((r - (0.72 + wave)) / 0.075, 2.0));
        float innerField = smoothstep(0.76, 0.22, r) * 0.14;
        vec3 col = mix(vec3(0.68, 0.84, 1.0), vec3(1.0), ring);
        float alpha = clamp(ring * 0.88 + innerField, 0.0, 1.0) * smoothstep(1.0, 0.82, r);
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(col * 1.45, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const plasmaMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 4.4), plasmaMat);
  plasmaMesh.rotation.x = -Math.PI * 0.5;
  group.add(plasmaMesh);

  return { group, plasmaMat };
}

export function createScene2Entry({ envMap, textures }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6d7585);
  scene.fog = new THREE.FogExp2(0x6d7585, 0.042);

  const camera = new THREE.PerspectiveCamera(28, 16 / 9, 0.15, 70);

  scene.add(new THREE.HemisphereLight(0xeef4fc, 0x383f4d, 1.35));
  const topSpot = new THREE.PointLight(0xffffff, 8.5, 22, 1.4);
  topSpot.position.set(0, -6.8, 0);
  scene.add(topSpot);

  // ---------------- 1. Vertical Glacial Shaft & 3 Shattered Energy Rings (y = 2.2, -1.5, -5.2) ----------------
  const shaftWall = new THREE.Mesh(
    new THREE.CylinderGeometry(4.8, 5.6, 15.0, 48, 24, true),
    new THREE.MeshStandardMaterial({
      color: 0x5c6474,
      roughness: 0.82,
      metalness: 0.08,
      normalMap: textures.rockNormalTex,
      side: THREE.BackSide,
    })
  );
  shaftWall.position.y = -0.5;
  scene.add(shaftWall);

  const rings = [];
  const ringYs = [2.1, -1.5, -5.1];
  for (let i = 0; i < 3; i++) {
    const r = buildShatteredRingGroup(textures, envMap, i + 1);
    r.group.position.y = ringYs[i];
    scene.add(r.group);
    rings.push(r);
  }

  // ---------------- 2. Subterranean Circular Halo Chamber (centered around y = -9.83) ----------------
  const FLOOR_Y = -11.05;
  const CHAMBER_CENTER_Y = -9.75;

  // Reflective dark glacial stone floor with luminous radial halo beneath the particle sculpture
  const floorMat = new THREE.ShaderMaterial({
    uniforms: {
      tRock: { value: textures.rockNormalTex },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldP;
      void main() {
        vUv = uv * 2.0 - 1.0;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldP = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform sampler2D tRock;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldP;
      void main() {
        float r = length(vUv) * 9.0;
        vec3 n = texture2D(tRock, vUv * 4.5).xyz * 2.0 - 1.0;
        // Reflection of the overhead ceiling ring light on wet dark slate!
        float ringRefl = exp(-pow((r - 2.35 + n.x * 0.14) / 0.42, 2.0)) * 0.55;
        float centerGlow = exp(-(r * r) / 5.5) * 0.36;
        vec3 base = mix(vec3(0.38, 0.42, 0.49), vec3(0.43, 0.46, 0.52), smoothstep(2.0, 8.5, r));
        vec3 col = base + vec3(0.88, 0.94, 1.0) * (ringRefl + centerGlow);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const floorMesh = new THREE.Mesh(new THREE.CircleGeometry(14, 64), floorMat);
  floorMesh.rotation.x = -Math.PI * 0.5;
  floorMesh.position.y = FLOOR_Y;
  scene.add(floorMesh);

  // Colossal Overhead Glowing Architectural Ring Light (roomring at y = -8.05)
  const roomRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.45, 0.085, 20, 96),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 2.5, 2.7), toneMapped: false })
  );
  roomRing.rotation.x = Math.PI * 0.5;
  roomRing.position.y = -8.05;
  scene.add(roomRing);

  // Outer blurry typographic cylinder wall around chamber
  const chamberTextWall = new THREE.Mesh(
    new THREE.CylinderGeometry(8.5, 8.5, 6.2, 48, 1, true),
    new THREE.MeshBasicMaterial({
      map: textures.blurryTextTex,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
    })
  );
  chamberTextWall.position.y = -9.4;
  scene.add(chamberTextWall);

  // Drifting ceiling & ground cold mist planes inside the chamber
  const mistCount = 18;
  const mistInst = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(4.2, 2.1),
    new THREE.MeshBasicMaterial({
      map: textures.smokeTex,
      color: 0xdce5f2,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    }),
    mistCount
  );
  scene.add(mistInst);

  // ---------------- 3. 15,000-Particle Morphing Volumetric 3D Social Sculpture ----------------
  const clouds = createSocialPointClouds(15000);
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(clouds.target0, 3));
  pGeo.setAttribute('aTarget0', new THREE.BufferAttribute(clouds.target0, 3));
  pGeo.setAttribute('aTarget1', new THREE.BufferAttribute(clouds.target1, 3));
  pGeo.setAttribute('aTarget2', new THREE.BufferAttribute(clouds.target2, 3));
  pGeo.setAttribute('aSeed', new THREE.BufferAttribute(clouds.seeds, 3));

  const particleUniforms = {
    uTime: { value: 0 },
    uWeights: { value: new THREE.Vector3(1, 0, 0) }, // x=LinkedIn, y=X, z=Medium
    uScatter: { value: 0 },
    uPointerLocal: { value: new THREE.Vector3(99, 99, 99) },
    uHoverGlow: { value: 0 },
  };

  const particleMat = new THREE.ShaderMaterial({
    uniforms: particleUniforms,
    vertexShader: `
      attribute vec3 aTarget0;
      attribute vec3 aTarget1;
      attribute vec3 aTarget2;
      attribute vec3 aSeed;

      uniform float uTime;
      uniform vec3 uWeights;
      uniform float uScatter;
      uniform vec3 uPointerLocal;
      uniform float uHoverGlow;

      varying float vAlpha;
      varying float vHighlight;

      void main() {
        vec3 p = aTarget0 * uWeights.x + aTarget1 * uWeights.y + aTarget2 * uWeights.z;

        // Swirl dispersion during morph transitions + subtle living VDB vapor drift
        float ang = uScatter * (3.2 + aSeed.x * 2.5);
        float cs = cos(ang);
        float sn = sin(ang);
        p.xz = mat2(cs, -sn, sn, cs) * p.xz;
        p += vec3(
          sin(uTime * 1.4 + aSeed.y) * (0.014 + uScatter * 0.28),
          cos(uTime * 1.1 + aSeed.x * 6.28) * (0.016 + uScatter * 0.22),
          sin(uTime * 1.3 + aSeed.z * 5.0) * (0.014 + uScatter * 0.28)
        );

        // Interactive cursor fluid-like repulsion ripple on the 3D point cloud!
        vec3 diff = p - uPointerLocal;
        float d = length(diff);
        float push = smoothstep(0.45, 0.0, d);
        p += normalize(diff + vec3(0.0001)) * push * 0.16;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp((13.5 * aSeed.z * (1.0 + push * 0.6)) / max(-mv.z, 0.8), 1.2, 5.2);
        vAlpha = (0.52 + 0.38 * aSeed.x) * (1.0 - uScatter * 0.25);
        vHighlight = push + uHoverGlow * 0.25;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vHighlight;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float soft = pow(1.0 - d * 2.0, 1.6);
        vec3 col = mix(vec3(0.88, 0.94, 1.0), vec3(1.0), clamp(vHighlight, 0.0, 1.0));
        gl_FragColor = vec4(col * (1.15 + vHighlight * 0.6), soft * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const socialCloud = new THREE.Points(pGeo, particleMat);
  socialCloud.position.set(0, CHAMBER_CENTER_Y, 0);
  socialCloud.scale.setScalar(1.18);
  scene.add(socialCloud);

  const cloudHitSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 16, 12),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  cloudHitSphere.position.copy(socialCloud.position);
  scene.add(cloudHitSphere);

  let activeChannel = 0;
  const targetWeights = new THREE.Vector3(1, 0, 0);
  let morphScatter = 0;
  let cloudHovered = false;
  const dummy = new THREE.Object3D();

  function setChannel(index) {
    const next = ((index % 3) + 3) % 3;
    if (next !== activeChannel) {
      activeChannel = next;
      morphScatter = 1.0;
    }
    targetWeights.set(
      activeChannel === 0 ? 1 : 0,
      activeChannel === 1 ? 1 : 0,
      activeChannel === 2 ? 1 : 0
    );
  }

  function setPointerRaycast(raycaster) {
    const hits = raycaster.intersectObject(cloudHitSphere, false);
    if (hits.length > 0) {
      const localPt = socialCloud.worldToLocal(hits[0].point.clone());
      particleUniforms.uPointerLocal.value.copy(localPt);
      cloudHovered = true;
      return true;
    }
    particleUniforms.uPointerLocal.value.set(99, 99, 99);
    cloudHovered = false;
    return false;
  }

  function update(dt, time, progress, pointerNDC) {
    particleUniforms.uTime.value = time;
    floorMat.uniforms.uTime.value = time;

    particleUniforms.uWeights.value.lerp(targetWeights, Math.min(1, dt * 6.5));
    morphScatter = Math.max(0, morphScatter - dt * 2.1);
    particleUniforms.uScatter.value = Math.sin(morphScatter * Math.PI) * 0.85;
    particleUniforms.uHoverGlow.value += ((cloudHovered ? 1 : 0) - particleUniforms.uHoverGlow.value) * Math.min(1, dt * 8);

    // Rotate the 3 shattered rings in alternating directions
    for (let i = 0; i < rings.length; i++) {
      rings[i].group.rotation.y = time * (i % 2 === 0 ? 0.38 : -0.44) + i * 1.2;
      rings[i].group.rotation.z = Math.sin(time * 0.6 + i) * 0.06;
      rings[i].plasmaMat.uniforms.uTime.value = time;
    }

    // Subtle rotation of social point cloud toward cursor
    socialCloud.rotation.y = Math.sin(time * 0.45) * 0.22 + pointerNDC.x * 0.32;
    socialCloud.rotation.x = -pointerNDC.y * 0.14;
    chamberTextWall.rotation.y = -time * 0.02;

    // ---- Two-Stage Camera Choreography (Vertical Ring Dive -> Subterranean Chamber) ----
    if (progress < 0.52) {
      // Stage A: Plunging straight down through the 3 shattered rings with a smooth barrel roll!
      const t = THREE.MathUtils.clamp(progress / 0.52, 0, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const camY = THREE.MathUtils.lerp(5.4, -9.83, ease);

      // Smoothly swing camera from looking straight down (0, -11, 0) to looking forward at (0, -9.75, 0) near bottom!
      const levelOut = THREE.MathUtils.smoothstep(t, 0.72, 1.0);
      const camZ = THREE.MathUtils.lerp(0.02, 2.35, levelOut);

      camera.fov = THREE.MathUtils.lerp(24, 30, ease);
      camera.position.set(pointerNDC.x * 0.22, camY, camZ);

      const rollAngle = (1.0 - levelOut) * (t * Math.PI);
      camera.up.set(Math.sin(rollAngle) * (1.0 - levelOut), Math.cos(rollAngle) * (1.0 - levelOut) + levelOut, 0).normalize();

      const lookY = THREE.MathUtils.lerp(camY - 6.0, CHAMBER_CENTER_Y, levelOut);
      camera.lookAt(0, lookY, 0);
    } else {
      // Stage B: Cruising gently backward inside the circular chamber facing the 15k particle sculpture!
      const t = THREE.MathUtils.clamp((progress - 0.52) / 0.48, 0, 1);
      camera.fov = 30;
      camera.up.set(0, 1, 0);
      const camZ = THREE.MathUtils.lerp(2.35, 3.65, t);
      camera.position.set(
        pointerNDC.x * 0.28,
        -9.80 + pointerNDC.y * 0.14,
        camZ
      );
      camera.lookAt(0, CHAMBER_CENTER_Y, 0);
    }
    camera.updateProjectionMatrix();

    // Update chamber ceiling & floor cold mist planes
    for (let i = 0; i < mistCount; i++) {
      const a = (i / mistCount) * Math.PI * 2 + time * 0.08 * (i % 2 === 0 ? 1 : -1);
      const rad = 1.6 + (i % 3) * 1.15;
      const isTop = i < 9;
      dummy.position.set(
        Math.cos(a) * rad,
        isTop ? -8.25 - (i % 3) * 0.15 : FLOOR_Y + 0.38 + (i % 2) * 0.18,
        Math.sin(a) * rad
      );
      dummy.quaternion.copy(camera.quaternion);
      dummy.scale.setScalar(1.0 + (i % 3) * 0.25);
      dummy.updateMatrix();
      mistInst.setMatrixAt(i, dummy.matrix);
    }
    mistInst.instanceMatrix.needsUpdate = true;
  }

  function resize(aspect) {
    camera.aspect = aspect;
    camera.zoom = Math.min(1, aspect * 1.18);
    camera.updateProjectionMatrix();
  }

  return {
    scene,
    camera,
    height: 5.2,
    initialScrollAutocenter: 0.74, // settles directly in front of the "/// Follow Us" particle chamber!
    finalScrollAutocenter: 0.78,
    getActiveChannel: () => activeChannel,
    isCloudHovered: () => cloudHovered,
    setChannel,
    setPointerRaycast,
    update,
    resize,
  };
}

// Scene 1 — Frozen Portfolio Cubes Gallery (1:1 architectural match to b3 CubesScene):
// - Camera: FOV 36°, vertical gallery descent across 3 colossal hand-chiseled glacial ice monoliths at y = [0, -5.75, -11.5]
//   01: PORTFOLIO_CO_01 — Pudgy Penguins (01/02/2020, TEMP 0°) -> High-poly 3D Penguin sculpture frozen inside refractive ice
//   02: PORTFOLIO_CO_02 — Overpass (06/01/2023, TEMP -3°) -> 3D interlocked Overpass architectural emblem
//   03: PORTFOLIO_CO_03 — ??????????????? (CLASSIFIED, TEMP -12°) -> Locked dark relic shard (hover shows disabled "???????????????")
// - Background: Out-of-focus giant typographic cylinder wall (blurrytext) + floating depth-of-field architectural shapes
// - Real two-pass screen-space 6-tap frosted ice refraction + RGB dispersion + animated internal caustics + ice normal map!

import * as THREE from '../vendor/three.module.js';
import { fbm, hash2 } from './noise_tex.js';
import {
  createPenguinSculpture,
  createOverpassSculpture,
  createMysterySculpture,
} from './sculptures.js';

export const PORTFOLIO_ITEMS = [
  {
    id: 'pudgy-penguins',
    code: 'PORTFOLIO_CO_01',
    name: 'Pudgy Penguins',
    date: '01/02/2020',
    temp: '0°',
    locked: false,
    summary:
      'Pudgy Penguins is a collection of 8,888 unique NFTs on the Ethereum blockchain, centered around cute and quirky penguin characters. Launched in July 2021, Pudgy Penguins has grown from a simple NFT project into a broader Web3 brand with physical toys in over 10,000 retail stores worldwide, digital experiences, and a passionate global community.',
    links: [
      { label: 'X', url: 'https://x.com/pudgypenguins' },
      { label: 'IG', url: 'https://www.instagram.com/pudgypenguins/' },
      { label: 'LI', url: 'https://www.linkedin.com/company/pudgy-penguins/' },
      { label: 'TK', url: 'https://www.tiktok.com/@pudgypenguins' },
    ],
    visitUrl: 'https://pudgypenguins.com/',
    visitLabel: 'pudgypenguins.com',
  },
  {
    id: 'overpass',
    code: 'PORTFOLIO_CO_02',
    name: 'Overpass',
    date: '06/01/2023',
    temp: '-3°',
    locked: false,
    summary:
      'OverpassIP is an intellectual property licensing platform built to bridge digital communities and mainstream consumer products. By streamlining on-chain IP rights, approvals, and royalty distribution, Overpass empowers Web3 holders and brands to collaborate at global retail scale.',
    links: [
      { label: 'X', url: 'https://x.com/overpassip' },
      { label: 'LI', url: 'https://www.linkedin.com/company/overpassip/' },
    ],
    visitUrl: 'https://www.overpassip.com/',
    visitLabel: 'overpassip.com',
  },
  {
    id: 'mystery',
    code: 'PORTFOLIO_CO_03',
    name: '???????????????',
    date: '??/??/2026',
    temp: '-12°',
    locked: true,
    summary: '',
    links: [],
    visitUrl: '',
    visitLabel: '',
  },
];

// Carve a high-resolution (20,480 tris) glacial ice block using planar cleavage cuts + chiseled ridges!
function buildChiseledIceGeometry(seed) {
  const geo = new THREE.IcosahedronGeometry(1.48, 5);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  // Generate 8 natural planar cleavage fracture planes around the block
  const planes = [
    // Front & back viewing faces (slightly angled flat window facets so the inner sculpture reads clearly!)
    { n: new THREE.Vector3(0.08 * (seed - 1), 0.05, 1).normalize(), d: 0.92 },
    { n: new THREE.Vector3(-0.06, -0.04, -1).normalize(), d: 0.90 },
    // Left / right / top / bottom chiseled faces
    { n: new THREE.Vector3(1, 0.14, 0.12).normalize(), d: 1.02 },
    { n: new THREE.Vector3(-1, -0.12, 0.18).normalize(), d: 1.00 },
    { n: new THREE.Vector3(0.12, 1, 0.08).normalize(), d: 1.24 },
    { n: new THREE.Vector3(-0.10, -1, 0.12).normalize(), d: 1.22 },
  ];
  for (let k = 0; k < 4; k++) {
    const a = hash2(seed * 13.7, k * 7.3) * Math.PI * 2;
    const b = (hash2(seed * 5.1, k * 19.9) - 0.5) * 1.6;
    planes.push({
      n: new THREE.Vector3(Math.cos(a) * Math.cos(b), Math.sin(b), Math.sin(a) * Math.cos(b)).normalize(),
      d: 1.06 + hash2(k, seed * 3.3) * 0.16,
    });
  }

  const edgeWearAttr = new Float32Array(pos.count);

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // Elongate slightly vertically like tall quarried glacier monoliths
    v.y *= 1.22;
    v.x *= 0.96;

    // Smooth-minimum planar beveling across all cleavage planes
    let nearPlaneCount = 0;
    for (let p = 0; p < planes.length; p++) {
      const pl = planes[p];
      const proj = v.dot(pl.n);
      if (proj > pl.d * 0.84) {
        const excess = proj - pl.d * 0.84;
        const clamped = Math.min(excess, 0.22) * 0.42;
        v.addScaledVector(pl.n, -(excess - clamped));
        nearPlaneCount += THREE.MathUtils.smoothstep(proj, pl.d * 0.78, pl.d * 0.96);
      }
    }

    // Add organic glacial melt ripples & chipped fracture concavities
    const macro = (fbm(v.x * 1.45 + seed * 11.0, v.y * 1.35 + v.z * 1.45, 4) - 0.48) * 0.16;
    const micro = (fbm(v.x * 4.2 - seed * 5.0, v.z * 4.2 + v.y * 3.8, 3) - 0.5) * 0.038;
    const dir = v.clone().normalize();
    v.addScaledVector(dir, macro + micro);

    pos.setXYZ(i, v.x, v.y, v.z);
    // High edgeWear where 2+ cleavage planes meet -> frosty white chipped ice edges!
    edgeWearAttr[i] = THREE.MathUtils.clamp((nearPlaneCount - 0.95) * 0.85, 0, 1);
  }

  geo.setAttribute('aEdgeFrost', new THREE.BufferAttribute(edgeWearAttr, 1));
  geo.computeVertexNormals();
  return geo;
}

function createIceShellMaterial({ backdropTex, textures, envMap }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      tBackdrop: { value: backdropTex },
      tNormal: { value: textures.iceNormalTex },
      tCaustics: { value: textures.causticsTex },
      tEnv: { value: envMap },
      uResolution: { value: new THREE.Vector2(1280, 800) },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uTint: { value: new THREE.Color(0xdbe8f8) },
    },
    vertexShader: `
      attribute float aEdgeFrost;
      varying vec3 vWorldPos;
      varying vec3 vWorldNorm;
      varying vec3 vLocalPos;
      varying float vEdgeFrost;
      void main() {
        vLocalPos = position;
        vEdgeFrost = aEdgeFrost;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vWorldNorm = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform sampler2D tBackdrop;
      uniform sampler2D tNormal;
      uniform sampler2D tCaustics;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform float uHover;
      uniform vec3 uTint;

      varying vec3 vWorldPos;
      varying vec3 vWorldNorm;
      varying vec3 vLocalPos;
      varying float vEdgeFrost;

      // Triplanar tangent-free ice surface micro-normal perturbation
      vec3 sampleTriplanarNormal(vec3 p, vec3 n) {
        vec3 blend = abs(n);
        blend = pow(blend, vec3(4.0));
        blend /= (blend.x + blend.y + blend.z + 0.0001);
        vec3 nx = texture2D(tNormal, p.yz * 0.55).xyz * 2.0 - 1.0;
        vec3 ny = texture2D(tNormal, p.xz * 0.55).xyz * 2.0 - 1.0;
        vec3 nz = texture2D(tNormal, p.xy * 0.55).xyz * 2.0 - 1.0;
        vec3 perturb = vec3(ny.x + nz.x, nx.y + nz.y, nx.x + ny.y) * 0.34;
        return normalize(n + perturb * (blend.x + blend.y + blend.z));
      }

      void main() {
        vec3 V = normalize(cameraPosition - vWorldPos);
        vec3 N = sampleTriplanarNormal(vLocalPos, normalize(vWorldNorm));

        vec2 screenUv = gl_FragCoord.xy / uResolution;
        float ndotv = clamp(dot(N, V), 0.0, 1.0);
        float fresnel = pow(1.0 - ndotv, 3.2);

        // Thicker frost near grazing angles & chipped edges; clearer window in center (especially on hover!)
        float windowClear = smoothstep(0.25, 0.82, ndotv) * (0.62 + uHover * 0.28);
        float frostRadius = mix(0.022, 0.0045, windowClear) + vEdgeFrost * 0.008;

        // Screen-space refraction offset with RGB chromatic dispersion
        vec2 refrOffset = -N.xy * (0.058 + (1.0 - ndotv) * 0.045);

        // 6-tap rotated Poisson disc frosted blur of the inner 3D sculpture & background!
        vec3 refracted = vec3(0.0);
        const float GOLDEN = 2.39996323;
        for (int i = 0; i < 6; i++) {
          float fi = float(i);
          float r = sqrt((fi + 0.5) / 6.0) * frostRadius;
          float a = fi * GOLDEN + vLocalPos.x * 3.1;
          vec2 jitter = vec2(cos(a), sin(a)) * r;
          vec2 uvR = clamp(screenUv + refrOffset * 0.92 + jitter, 0.002, 0.998);
          vec2 uvG = clamp(screenUv + refrOffset * 1.00 + jitter, 0.002, 0.998);
          vec2 uvB = clamp(screenUv + refrOffset * 1.09 + jitter, 0.002, 0.998);
          refracted.r += texture2D(tBackdrop, uvR).r;
          refracted.g += texture2D(tBackdrop, uvG).g;
          refracted.b += texture2D(tBackdrop, uvB).b;
        }
        refracted /= 6.0;

        // Volumetric glacial absorption & milky subsurface scattering
        vec3 iceBody = mix(refracted * uTint, vec3(0.76, 0.83, 0.92), (1.0 - windowClear) * 0.46 + vEdgeFrost * 0.28);

        // Internal animated water-ice caustics
        vec2 cUv1 = vLocalPos.xy * 0.42 + vec2(uTime * 0.018, -uTime * 0.014) + N.xy * 0.18;
        vec2 cUv2 = vLocalPos.zy * 0.38 - vec2(uTime * 0.012, uTime * 0.019) + N.zy * 0.18;
        float caust = (texture2D(tCaustics, cUv1).r + texture2D(tCaustics, cUv2).r) * 0.5;
        iceBody += vec3(0.72, 0.86, 1.0) * pow(caust, 1.8) * (0.28 + uHover * 0.34);

        // Crisp key & rim specular reflections on wet glacial facets
        vec3 L1 = normalize(vec3(-0.55, 0.75, 0.65));
        vec3 L2 = normalize(vec3(0.65, -0.35, 0.55));
        vec3 H1 = normalize(L1 + V);
        vec3 H2 = normalize(L2 + V);
        float spec1 = pow(max(dot(N, H1), 0.0), 72.0) * 0.95;
        float spec2 = pow(max(dot(N, H2), 0.0), 36.0) * 0.42;

        // Chipped white frosty ridges + Fresnel rim
        vec3 frostCol = vec3(0.92, 0.96, 1.0) * (fresnel * 0.72 + vEdgeFrost * 0.26 * (0.6 + 0.4 * max(dot(N, L1), 0.0)));
        vec3 finalCol = iceBody + frostCol + vec3(1.0) * (spec1 + spec2) + vec3(0.55, 0.76, 1.0) * uHover * 0.14;

        gl_FragColor = vec4(finalCol, 0.97);
      }
    `,
    transparent: true,
  });
}

export function createScene1Cubes({ renderer, envMap, textures }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8891a0);
  scene.fog = new THREE.FogExp2(0x8891a0, 0.036);

  // Exact camera from b3 CubesScene: FOV 36°, z = 5.35
  const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.2, 80);
  camera.position.set(0, 0, 5.35);

  scene.add(new THREE.HemisphereLight(0xf2f6fd, 0x4b5362, 1.45));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
  keyLight.position.set(-5, 8, 7);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xaad0ff, 1.15);
  rimLight.position.set(6, -3, -5);
  scene.add(rimLight);

  // Half-res backdrop FBO for two-pass frosted ice refraction!
  const backdropRT = new THREE.WebGLRenderTarget(640, 400, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    type: THREE.HalfFloatType,
    depthBuffer: true,
  });

  // ---------------- 1. Giant Out-of-Focus Cylindrical Typography Wall & Depth Shapes ----------------
  const cylWall = new THREE.Mesh(
    new THREE.CylinderGeometry(11.5, 11.5, 32, 48, 1, true),
    new THREE.MeshBasicMaterial({
      map: textures.blurryTextTex,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
  cylWall.position.y = -5.75;
  scene.add(cylWall);

  // Out-of-focus dark architectural monolith silhouettes floating in deep background (background_shapes.drc)
  const bgShapes = new THREE.Group();
  const shapeMat = new THREE.MeshBasicMaterial({ color: 0x6f7888, transparent: true, opacity: 0.42 });
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.6 + (i % 3) * 0.9, 2.8 + (i % 4) * 1.1, 0.8), shapeMat);
    const ang = (i / 14) * Math.PI * 2;
    m.position.set(Math.sin(ang) * 8.2, 2.5 - i * 1.45, -5.5 - Math.cos(ang) * 2.5);
    m.rotation.set(0.2 * i, 0.5 * i, 0.1 * i);
    bgShapes.add(m);
  }
  scene.add(bgShapes);

  // ---------------- 2. Three Frozen Portfolio Monoliths (y = 0, -5.75, -11.5) ----------------
  const SPACING_Y = 5.75;
  const cubeConfigs = [
    { x: -0.34, y: 0.0, tint: 0xdce9f9, buildInner: () => createPenguinSculpture({ envMap, detailMode: false }) },
    { x: 0.34, y: -SPACING_Y, tint: 0xd6e6fa, buildInner: () => createOverpassSculpture({ envMap, detailMode: false }) },
    { x: -0.28, y: -SPACING_Y * 2, tint: 0xc2d0e4, buildInner: () => createMysterySculpture({ envMap }) },
  ];

  const blocks = [];
  const hitMeshes = [];

  cubeConfigs.forEach((cfg, idx) => {
    const anchor = new THREE.Group();
    anchor.position.set(cfg.x, cfg.y, 0);
    scene.add(anchor);

    const innerSculpt = cfg.buildInner();
    if (idx === 0) innerSculpt.scale.setScalar(0.86);
    if (idx === 1) innerSculpt.scale.setScalar(0.95);
    if (idx === 2) innerSculpt.scale.setScalar(0.88);
    anchor.add(innerSculpt);

    const iceGeo = buildChiseledIceGeometry(idx + 1);
    const iceMat = createIceShellMaterial({ backdropTex: backdropRT.texture, textures, envMap });
    iceMat.uniforms.uTint.value.setHex(cfg.tint);
    const iceShell = new THREE.Mesh(iceGeo, iceMat);
    anchor.add(iceShell);

    // Subtle frosty mist halo behind each monolith
    const mistSprite = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 4.8),
      new THREE.MeshBasicMaterial({
        map: textures.smokeTex,
        color: 0xdce6f5,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
      })
    );
    mistSprite.position.z = -1.35;
    anchor.add(mistSprite);

    const hitBox = new THREE.Mesh(
      new THREE.SphereGeometry(1.62, 16, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.userData.cubeIndex = idx;
    anchor.add(hitBox);
    hitMeshes.push(hitBox);

    blocks.push({
      index: idx,
      item: PORTFOLIO_ITEMS[idx],
      anchor,
      innerSculpt,
      iceShell,
      iceMat,
      hover: 0,
      screenX: 0.5,
      screenY: 0.5,
      tempScreenX: 0.5,
      tempScreenY: 0.5,
      visibleFactor: 0,
    });
  });

  // Floating ice dust motes in gallery
  const dustCnt = 280;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCnt * 3);
  for (let i = 0; i < dustCnt; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 9.0;
    dustPos[i * 3 + 1] = 3.5 - Math.random() * 18.0;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5.0;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.032, transparent: true, opacity: 0.45, depthWrite: false })
    )
  );

  let hoveredIndex = -1;
  const projVec = new THREE.Vector3();

  function setPointerRaycast(raycaster) {
    const hits = raycaster.intersectObjects(hitMeshes, false);
    hoveredIndex = hits.length > 0 ? hits[0].object.userData.cubeIndex : -1;
    return hoveredIndex;
  }

  function update(dt, time, progress, pointerNDC) {
    // Camera descends smoothly from y = +0.65 through y = 0, -5.75, -11.5 down to -12.3!
    const camY = THREE.MathUtils.lerp(0.85, -12.35, progress);
    camera.position.set(
      pointerNDC.x * 0.28,
      camY + pointerNDC.y * 0.16,
      5.35
    );
    camera.lookAt(0, camY - 0.06, 0);
    camera.updateMatrixWorld();

    cylWall.rotation.y = time * 0.025 + progress * 0.8;

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const targetH = hoveredIndex === i ? 1.0 : 0.0;
      b.hover += (targetH - b.hover) * Math.min(1, dt * 8.5);

      // Gentle zero-G cryo-suspension bob & rotation + interactive cursor tilt!
      const bobY = Math.sin(time * 0.9 + i * 2.1) * 0.09;
      b.anchor.position.y = cubeConfigs[i].y + bobY;
      b.iceShell.rotation.y = Math.sin(time * 0.38 + i * 1.4) * 0.24 + pointerNDC.x * 0.18 * (0.4 + b.hover * 0.6);
      b.iceShell.rotation.x = Math.cos(time * 0.31 + i * 0.9) * 0.09 - pointerNDC.y * 0.12 * (0.4 + b.hover * 0.6);

      // Inner sculpture counter-rotates subtly inside the ice cavity
      b.innerSculpt.rotation.y = b.iceShell.rotation.y * 0.85 + (i === 1 ? time * 0.35 : Math.sin(time * 0.55) * 0.18);
      b.innerSculpt.rotation.x = b.iceShell.rotation.x * 0.6;

      b.iceMat.uniforms.uTime.value = time;
      b.iceMat.uniforms.uHover.value = b.hover;

      // Compute 2D screen anchor for the DOM plaque ("PORTFOLIO_CO_01 / Pudgy Penguins") and temperature ("0°")
      const labelSide = i % 2 === 0 ? 1.48 : -1.55;
      projVec.set(b.anchor.position.x + labelSide, b.anchor.position.y + 0.15, 0).project(camera);
      b.screenX = (projVec.x * 0.5 + 0.5);
      b.screenY = (-projVec.y * 0.5 + 0.5);

      projVec.set(b.anchor.position.x - 1.15, b.anchor.position.y - 1.38, 0.4).project(camera);
      b.tempScreenX = (projVec.x * 0.5 + 0.5);
      b.tempScreenY = (-projVec.y * 0.5 + 0.5);

      const distY = Math.abs(b.anchor.position.y - camY);
      b.visibleFactor = 1.0 - THREE.MathUtils.smoothstep(distY, 1.4, 3.8);
    }
  }

  // Custom two-pass render: first capture background + inner sculptures into backdropRT, then render refractive ice shells!
  function renderToTarget(targetRT) {
    for (let i = 0; i < blocks.length; i++) blocks[i].iceShell.visible = false;
    renderer.setRenderTarget(backdropRT);
    renderer.clear();
    renderer.render(scene, camera);

    const w = targetRT ? targetRT.width : renderer.domElement.width;
    const h = targetRT ? targetRT.height : renderer.domElement.height;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].iceShell.visible = true;
      blocks[i].iceMat.uniforms.uResolution.value.set(w, h);
    }

    renderer.setRenderTarget(targetRT);
    renderer.clear();
    renderer.render(scene, camera);
  }

  function resize(aspect, pixelW, pixelH) {
    camera.aspect = aspect;
    camera.zoom = Math.min(1, aspect * 1.15);
    camera.updateProjectionMatrix();
    backdropRT.setSize(Math.max(256, Math.floor(pixelW * 0.5)), Math.max(256, Math.floor(pixelH * 0.5)));
  }

  return {
    scene,
    camera,
    height: 3.1,
    initialScrollAutocenter: 0.065, // centers Cube 01
    finalScrollAutocenter: 0.935,   // centers Cube 03
    blocks,
    getHoveredIndex: () => hoveredIndex,
    setPointerRaycast,
    update,
    renderToTarget,
    resize,
  };
}

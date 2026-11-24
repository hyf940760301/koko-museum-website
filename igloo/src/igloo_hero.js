// Scene 0 — Surface Igloo & Polar Mountain Range (1:1 architectural match to F3 IglooScene):
// - Camera: FOV 30° telephoto at (-13.25, 2.5, 13.25) -> target (0, 1.0, 0), intro swoop from (-14, 21, 14)
// - High-poly sculpted Spherical Ashlar Igloo + Vaulted Entrance Tunnel (~16,000 tris continuous displaced stone-ice masonry)
// - Per-brick ID vertex displacement on cursor hover ("exploded" glowing crevices) + CAD geodesic cage + ground triangle patch
// - Ridged-multifractal polar mountain range + drifting ground blizzard smoke ribbons + snow particles

import * as THREE from '../vendor/three.module.js';
import { fbm, hash2 } from './noise_tex.js';

function ridgedFbm(x, y, oct = 5) {
  let sum = 0;
  let amp = 0.52;
  let freq = 1.0;
  let prev = 1.0;
  for (let i = 0; i < oct; i++) {
    const n = 1.0 - Math.abs(fbm(x * freq, y * freq, 2) * 2.0 - 1.0);
    const sharp = n * n;
    sum += sharp * amp * prev;
    prev = sharp;
    freq *= 2.12;
    amp *= 0.5;
  }
  return sum;
}

// Sculpt a high-resolution hemispherical dome or arch mesh into realistic chiseled masonry blocks with deep mortar grooves!
function buildSculptedIglooMesh(textures, envMap, sharedUniforms) {
  const R = 2.85;
  // Entrance tunnel faces toward (-0.52, 0, 0.85) — angled pleasingly to the front-right of camera at (-13.25, 2.5, 13.25)!
  const tunAngle = -0.42; // azimuth in XZ where atan2(x, z) = -0.42 -> faces (-sin(0.42), cos(0.42)) = (-0.41, 0.91)
  const tunDir = new THREE.Vector3(Math.sin(tunAngle), 0, Math.cos(tunAngle)).normalize();
  const tunRight = new THREE.Vector3(tunDir.z, 0, -tunDir.x);

  // 1. High-resolution Dome Shell (112 x 52 = 11,648 tris)
  const domeGeo = new THREE.SphereGeometry(R, 112, 52, 0, Math.PI * 2, 0, Math.PI * 0.51);
  // 2. High-resolution Protruding Vaulted Tunnel (56 x 32)
  const tunLen = 1.95;
  const tunRad = 1.08;
  const tunGeo = new THREE.CylinderGeometry(tunRad, tunRad * 1.04, tunLen, 56, 32, true, -Math.PI * 0.52, Math.PI * 1.04);
  tunGeo.rotateZ(Math.PI * 0.5);
  tunGeo.rotateY(tunAngle + Math.PI * 0.5);
  // Move tunnel forward along tunDir
  tunGeo.translate(tunDir.x * (R * 0.86 + tunLen * 0.32), 0.12, tunDir.z * (R * 0.86 + tunLen * 0.32));

  // Sculpt Dome vertices into staggered masonry courses
  const sculptDome = (geo, isTunnel) => {
    const nonIdx = geo.index ? geo : geo;
    const pos = nonIdx.attributes.position;
    const count = pos.count;
    const seamAttr = new Float32Array(count);
    const brickCenterAttr = new Float32Array(count * 3);
    const brickNormAttr = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const v = new THREE.Vector3();
    const nrm = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      v.fromBufferAttribute(pos, i);

      let row, col, bricksInRow, uBrick, vBrick, bSeed;
      if (!isTunnel) {
        const rXZ = Math.hypot(v.x, v.z);
        const phi = Math.atan2(Math.max(0, v.y), rXZ); // 0 at base -> pi/2 at crown
        let theta = Math.atan2(v.x, v.z); // [-pi, pi]
        if (theta < 0) theta += Math.PI * 2;

        // Cut clean arch doorway opening where tunnel joins dome!
        const dAng = Math.atan2(Math.sin(theta - (tunAngle + Math.PI * 2)), Math.cos(theta - (tunAngle + Math.PI * 2)));
        if (Math.abs(dAng) < 0.36 && v.y < 1.05) {
          // Pull doorway vertices slightly inward into dark portal throat
          v.multiplyScalar(0.84);
        }

        const courses = 9.0;
        const fRow = (1.0 - phi / (Math.PI * 0.51)) * courses;
        row = Math.floor(fRow);
        vBrick = fRow - row;

        const ringCircum = Math.max(1.8, 2 * Math.PI * Math.cos(phi) * R);
        bricksInRow = row === 0 ? 4 : Math.max(6, Math.round(ringCircum / 0.78));
        const stagger = (row % 2) * 0.5;
        const fCol = (theta / (Math.PI * 2)) * bricksInRow + stagger;
        col = Math.floor(fCol);
        uBrick = fCol - col;
        bSeed = hash2(row * 17.3, (col % bricksInRow) * 11.9);

        // Compute approximate center of this brick on the dome for rigid hover pop-out!
        const cPhi = (1.0 - (row + 0.5) / courses) * (Math.PI * 0.51);
        const cTheta = (((col + 0.5 - stagger) / bricksInRow) * Math.PI * 2);
        nrm.set(Math.cos(cPhi) * Math.sin(cTheta), Math.sin(cPhi), Math.cos(cPhi) * Math.cos(cTheta)).normalize();
        brickCenterAttr[i * 3] = nrm.x * R;
        brickCenterAttr[i * 3 + 1] = nrm.y * R;
        brickCenterAttr[i * 3 + 2] = nrm.z * R;
        brickNormAttr[i * 3] = nrm.x;
        brickNormAttr[i * 3 + 1] = nrm.y;
        brickNormAttr[i * 3 + 2] = nrm.z;
      } else {
        // Tunnel arch courses (5 rings along tunnel axis, 9 arch stones across)
        const relX = v.x - tunDir.x * (R * 0.82);
        const relZ = v.z - tunDir.z * (R * 0.82);
        const along = relX * tunDir.x + relZ * tunDir.z;
        const side = relX * tunRight.x + relZ * tunRight.z;
        const archA = Math.atan2(side, Math.max(0.05, v.y - 0.12));

        const fRow = THREE.MathUtils.clamp(along / tunLen, 0, 0.999) * 5.0;
        row = Math.floor(fRow);
        vBrick = fRow - row;

        const stagger = (row % 2) * 0.35;
        const fCol = ((archA + Math.PI * 0.55) / (Math.PI * 1.1)) * 8.0 + stagger;
        col = Math.floor(fCol);
        uBrick = fCol - col;
        bSeed = hash2(row + 50, col * 7.1);

        nrm.set(tunRight.x * Math.sin(archA), Math.cos(archA), tunRight.z * Math.sin(archA)).normalize();
        brickCenterAttr[i * 3] = v.x;
        brickCenterAttr[i * 3 + 1] = v.y;
        brickCenterAttr[i * 3 + 2] = v.z;
        brickNormAttr[i * 3] = nrm.x;
        brickNormAttr[i * 3 + 1] = nrm.y;
        brickNormAttr[i * 3 + 2] = nrm.z;
      }

      // Distance from mortar joint edge [0 at joint -> 0.5 at block center]
      const edgeU = Math.min(uBrick, 1.0 - uBrick);
      const edgeV = Math.min(vBrick, 1.0 - vBrick);
      const jointDist = Math.min(edgeU * 1.35, edgeV);

      // Deep chiseled mortar groove + pillowed organic rock-ice face
      const groove = THREE.MathUtils.smoothstep(jointDist, 0.018, 0.13);
      const rockMacro = (fbm(v.x * 1.9 + bSeed * 9.0, v.z * 1.9 + v.y * 1.9, 4) - 0.48) * 0.11;
      const pillow = Math.pow(groove, 0.55) * (0.12 + bSeed * 0.045) - (1.0 - groove) * 0.095;

      const outDir = isTunnel ? nrm : v.clone().normalize();
      v.addScaledVector(outDir, pillow + rockMacro * groove);
      if (!isTunnel) v.y = Math.max(-0.05, v.y);
      pos.setXYZ(i, v.x, v.y, v.z);

      // Seam glow weight: 1.0 inside deep mortar crevice, 0.0 on block face
      seamAttr[i] = 1.0 - THREE.MathUtils.smoothstep(jointDist, 0.012, 0.095);

      // Baked weathered charcoal-ice stone palette (matches igloo_color.ktx2 + snow dusting on top!)
      const snowTop = THREE.MathUtils.clamp((outDir.y - 0.25) * 0.85 + fbm(v.x * 2.2, v.z * 2.2, 3) * 0.35, 0, 1);
      const baseTone = 0.34 + bSeed * 0.11 + snowTop * 0.38;
      colors[i * 3] = baseTone * 0.94;
      colors[i * 3 + 1] = baseTone * 0.97;
      colors[i * 3 + 2] = Math.min(1.0, baseTone * 1.05);
    }

    nonIdx.setAttribute('aSeam', new THREE.BufferAttribute(seamAttr, 1));
    nonIdx.setAttribute('aBrickCenter', new THREE.BufferAttribute(brickCenterAttr, 3));
    nonIdx.setAttribute('aBrickNorm', new THREE.BufferAttribute(brickNormAttr, 3));
    nonIdx.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    nonIdx.computeVertexNormals();
    return nonIdx;
  };

  sculptDome(domeGeo, false);
  sculptDome(tunGeo, true);

  const iglooMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.66,
    metalness: 0.08,
    normalMap: textures.iceNormalTex,
    normalScale: new THREE.Vector2(0.85, 0.85),
    envMap,
    envMapIntensity: 1.15,
  });

  iglooMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = sharedUniforms.uTime;
    shader.uniforms.uHoverPos = sharedUniforms.uHoverPos;
    shader.uniforms.uHoverStrength = sharedUniforms.uHoverStrength;
    shader.uniforms.uConstruct = sharedUniforms.uConstruct;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute float aSeam;
        attribute vec3 aBrickCenter;
        attribute vec3 aBrickNorm;
        uniform vec3 uHoverPos;
        uniform float uHoverStrength;
        uniform float uConstruct;
        varying float vSeam;
        varying float vExplode;
        varying vec3 vWorldP;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vSeam = aSeam;
        float hDist = distance(aBrickCenter, uHoverPos);
        float hoverPush = pow(clamp(1.0 - hDist / 1.85, 0.0, 1.0), 2.0) * uHoverStrength;
        float introLift = pow(clamp(1.0 - uConstruct * 1.15, 0.0, 1.0), 2.0) * 0.45;
        vExplode = hoverPush + introLift;
        // Displace entire chiseled stone block outward along its masonry normal!
        transformed += aBrickNorm * (hoverPush * 0.34 + introLift * 0.55);
        vWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        uniform float uConstruct;
        varying float vSeam;
        varying float vExplode;
        varying vec3 vWorldP;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float scanY = mix(3.4, -0.6, clamp(uConstruct, 0.0, 1.0));
        float introBand = smoothstep(scanY - 0.9, scanY + 0.4, vWorldP.y) * (1.0 - smoothstep(0.86, 1.0, uConstruct));

        // Subtle living energy in deep mortar joints + intense white burst when hovered/exploded!
        float pulse = 0.85 + 0.15 * sin(uTime * 1.8 + vWorldP.x * 1.9 + vWorldP.z * 1.7);
        float jointGlow = vSeam * (0.72 * pulse + vExplode * 3.8 + introBand * 3.2);
        float blockGlow = vExplode * 0.55 + introBand * 1.8;

        totalEmissiveRadiance += vec3(0.95, 0.98, 1.0) * (jointGlow + blockGlow);`
      );
  };

  const group = new THREE.Group();
  group.add(new THREE.Mesh(domeGeo, iglooMat));
  group.add(new THREE.Mesh(tunGeo, iglooMat));

  // Inner luminous white hearth core + glowing tunnel portal throat
  const innerCore = new THREE.Mesh(
    new THREE.SphereGeometry(R * 0.84, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 2.3, 2.45), toneMapped: false })
  );
  group.add(innerCore);

  const portalMouth = new THREE.Mesh(
    new THREE.CircleGeometry(tunRad * 0.82, 28),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.7, 2.9), side: THREE.DoubleSide, toneMapped: false })
  );
  portalMouth.position.set(tunDir.x * (R * 0.98), 0.52, tunDir.z * (R * 0.98));
  portalMouth.lookAt(tunDir.x * 10, 0.55, tunDir.z * 10);
  group.add(portalMouth);

  // Architectural CAD Outer Geodesic Wireframe Cage (matches igloo_cage.drc!)
  const cageGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R * 1.055, 2));
  const cageMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, depthWrite: false });
  const cageLines = new THREE.LineSegments(cageGeo, cageMat);
  cageLines.position.y = 0.15;
  group.add(cageLines);

  return { group, cageMat, R, tunDir };
}

export function createScene0Igloo({ envMap, textures, onHoverClink }) {
  const scene = new THREE.Scene();
  const bgCol = new THREE.Color(0xa0a5b1);
  scene.background = bgCol;
  scene.fog = new THREE.FogExp2(0xa0a5b1, 0.022);

  // Exact camera from F3.cameraOptions(): FOV 30, basePosition (-13.25, 2.5, 13.25) -> (0, 1, 0)
  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.2, 160);

  const hemi = new THREE.HemisphereLight(0xf3f6fc, 0x5c6372, 1.45);
  scene.add(hemi);

  const sunDir = new THREE.DirectionalLight(0xffffff, 1.65);
  sunDir.position.set(-16, 18, 12);
  scene.add(sunDir);

  const fillDir = new THREE.DirectionalLight(0xd2dff2, 0.85);
  fillDir.position.set(14, 7, -14);
  scene.add(fillDir);

  const sharedUniforms = {
    uTime: { value: 0 },
    uHoverPos: { value: new THREE.Vector3(99, 99, 99) },
    uHoverStrength: { value: 0 },
    uConstruct: { value: 0 },
  };

  // ---------------- 1. Sculpted Igloo + Cage ----------------
  const iglooBuilt = buildSculptedIglooMesh(textures, envMap, sharedUniforms);
  scene.add(iglooBuilt.group);

  const hitCollider = new THREE.Mesh(
    new THREE.SphereGeometry(3.25, 20, 14),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitCollider.position.y = 0.8;
  scene.add(hitCollider);

  // ---------------- 2. Wind-Swept Permafrost Ground & Glowing Ice Patch ----------------
  const groundGeo = new THREE.PlaneGeometry(90, 90, 128, 128);
  groundGeo.rotateX(-Math.PI * 0.5);
  const gPos = groundGeo.attributes.position;
  const gCol = new Float32Array(gPos.count * 3);
  for (let i = 0; i < gPos.count; i++) {
    const x = gPos.getX(i);
    const z = gPos.getZ(i);
    const d = Math.hypot(x, z);

    // Raised flat rocky shelf under igloo + wind-carved snow sastrugi + rolling snow dunes
    const shelf = Math.exp(-(d * d) / 26.0) * 0.24;
    const sastrugi = (fbm(x * 0.28 + z * 0.12, z * 0.28, 4) - 0.48) * 0.68 * Math.min(1, d * 0.14);
    const swell = Math.sin(x * 0.09) * Math.cos(z * 0.08) * 0.45 * Math.min(1, d * 0.08);
    const y = shelf + sastrugi + swell - 0.12;
    gPos.setY(i, y);

    // Glowing snow-ice halo patch around the igloo base (matches ground_glow.ktx2!)
    const halo = Math.exp(-(d * d) / 22.0);
    const rockDark = fbm(x * 0.45, z * 0.45, 3);
    const lum = 0.56 + halo * 0.42 + rockDark * 0.16;
    gCol[i * 3] = Math.min(1.15, lum * 0.96);
    gCol[i * 3 + 1] = Math.min(1.18, lum * 0.99);
    gCol[i * 3 + 2] = Math.min(1.22, lum * 1.04);
  }
  groundGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3));
  groundGeo.computeVertexNormals();

  const groundMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.82,
    metalness: 0.05,
    normalMap: textures.rockNormalTex,
    normalScale: new THREE.Vector2(0.75, 0.75),
    envMap,
    envMapIntensity: 0.8,
  });
  scene.add(new THREE.Mesh(groundGeo, groundMat));

  // ---------------- 3. Distant Ridged-Multifractal Polar Mountain Range ----------------
  const mtnGeo = new THREE.PlaneGeometry(150, 150, 140, 140);
  mtnGeo.rotateX(-Math.PI * 0.5);
  const mPos = mtnGeo.attributes.position;
  const mCol = new Float32Array(mPos.count * 3);
  for (let i = 0; i < mPos.count; i++) {
    const x = mPos.getX(i);
    const z = mPos.getZ(i);
    const d = Math.hypot(x, z);
    const ringMask = THREE.MathUtils.smoothstep(d, 22.0, 56.0) * (1.0 - THREE.MathUtils.smoothstep(d, 68.0, 75.0));
    const peak = ridgedFbm(x * 0.045 + 4.2, z * 0.045 - 7.1, 5) * 19.5 * ringMask;
    mPos.setY(i, peak - 0.6);

    // Snow-capped ridges + exposed dark slate cliffs on steep faces
    const snowRatio = THREE.MathUtils.clamp(peak * 0.09 + fbm(x * 0.2, z * 0.2, 2) * 0.35, 0, 1);
    const c = THREE.MathUtils.lerp(0.36, 0.88, snowRatio);
    mCol[i * 3] = c * 0.95;
    mCol[i * 3 + 1] = c * 0.98;
    mCol[i * 3 + 2] = c * 1.05;
  }
  mtnGeo.setAttribute('color', new THREE.BufferAttribute(mCol, 3));
  mtnGeo.computeVertexNormals();
  scene.add(
    new THREE.Mesh(
      mtnGeo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.88,
        metalness: 0.04,
        envMap,
        envMapIntensity: 0.65,
      })
    )
  );

  // ---------------- 4. Ground CAD Triangle Patch & Vertex Number Indices ----------------
  const patchGeo = new THREE.RingGeometry(2.9, 12.5, 28, 5);
  patchGeo.rotateX(-Math.PI * 0.5);
  const pPos = patchGeo.attributes.position;
  const markers = [];
  for (let i = 0; i < pPos.count; i++) {
    let x = pPos.getX(i) + (hash2(i, 3.1) - 0.5) * 0.55;
    let z = pPos.getZ(i) + (hash2(i, 9.7) - 0.5) * 0.55;
    const d = Math.hypot(x, z);
    const y = Math.exp(-(d * d) / 26.0) * 0.24 + (fbm(x * 0.28 + z * 0.12, z * 0.28, 4) - 0.48) * 0.68 * Math.min(1, d * 0.14) - 0.06;
    pPos.setXYZ(i, x, y, z);
    if (d > 3.6 && d < 10.5 && hash2(i, 21.4) > 0.72 && markers.length < 22) {
      markers.push({ x, y: y + 0.14, z, cell: markers.length % 16 });
    }
  }
  const patchWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(patchGeo),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.20, depthWrite: false })
  );
  scene.add(patchWire);
  patchGeo.dispose();

  // Single-InstancedMesh Vertex Numbers (54, 83, 96...)
  const numPlane = new THREE.PlaneGeometry(0.38, 0.38);
  const cellUv = new Float32Array(markers.length * 2);
  for (let i = 0; i < markers.length; i++) {
    const c = markers[i].cell;
    cellUv[i * 2] = (c % 4) * 0.25;
    cellUv[i * 2 + 1] = 0.75 - Math.floor(c / 4) * 0.25;
  }
  numPlane.setAttribute('aCell', new THREE.InstancedBufferAttribute(cellUv, 2));
  const numInst = new THREE.InstancedMesh(
    numPlane,
    new THREE.ShaderMaterial({
      uniforms: { tAtlas: { value: textures.numAtlasTex }, uOpacity: { value: 0.62 } },
      vertexShader: `
        attribute vec2 aCell;
        varying vec2 vCellUv;
        void main() {
          vCellUv = uv * 0.25 + aCell;
          vec4 mv = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          mv.xy += position.xy;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D tAtlas;
        uniform float uOpacity;
        varying vec2 vCellUv;
        void main() {
          vec4 c = texture2D(tAtlas, vCellUv);
          if (c.a < 0.08) discard;
          gl_FragColor = vec4(vec3(1.0), c.a * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    }),
    markers.length
  );
  const dummy = new THREE.Object3D();
  markers.forEach((m, idx) => {
    dummy.position.set(m.x, m.y, m.z);
    dummy.updateMatrix();
    numInst.setMatrixAt(idx, dummy.matrix);
  });
  numInst.instanceMatrix.needsUpdate = true;
  scene.add(numInst);

  // ---------------- 5. Drifting Ground Blizzard Smoke Wisps & Snowflakes ----------------
  const smokeCount = 22;
  const smokePlane = new THREE.PlaneGeometry(6.5, 2.8);
  const smokeInst = new THREE.InstancedMesh(
    smokePlane,
    new THREE.MeshBasicMaterial({
      map: textures.smokeTex,
      color: 0xe6ebf5,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    }),
    smokeCount
  );
  const smokeData = [];
  for (let i = 0; i < smokeCount; i++) {
    smokeData.push({
      x: (Math.random() - 0.5) * 26,
      y: 0.45 + Math.random() * 1.4,
      z: (Math.random() - 0.5) * 22,
      speed: 0.7 + Math.random() * 0.9,
      scale: 0.8 + Math.random() * 0.9,
    });
  }
  scene.add(smokeInst);

  // Blowing snow particles
  const snowGeo = new THREE.BufferGeometry();
  const snowCnt = 600;
  const snowPos = new Float32Array(snowCnt * 3);
  const snowSeed = new Float32Array(snowCnt * 2);
  for (let i = 0; i < snowCnt; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 32;
    snowPos[i * 3 + 1] = Math.random() * 9.0;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 32;
    snowSeed[i * 2] = 0.5 + Math.random();
    snowSeed[i * 2 + 1] = Math.random() * 6.283;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
  snowGeo.setAttribute('aSeed', new THREE.BufferAttribute(snowSeed, 2));
  scene.add(
    new THREE.Points(
      snowGeo,
      new THREE.ShaderMaterial({
        uniforms: { uTime: sharedUniforms.uTime, tSprite: { value: textures.smokeTex } },
        vertexShader: `
          attribute vec2 aSeed;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            p.x = mod(p.x + uTime * 2.1 * aSeed.x + 16.0, 32.0) - 16.0;
            p.y = mod(p.y - uTime * 0.55 * aSeed.x, 9.0);
            p.z += sin(uTime + aSeed.y) * 0.35;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = clamp((24.0 * aSeed.x) / max(-mv.z, 1.0), 1.5, 5.5);
            vAlpha = smoothstep(28.0, 6.0, -mv.z) * 0.55;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform sampler2D tSprite;
          varying float vAlpha;
          void main() {
            vec4 c = texture2D(tSprite, gl_PointCoord);
            if (c.a < 0.05) discard;
            gl_FragColor = vec4(vec3(1.0), c.a * vAlpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      })
    )
  );

  // ---------------- Camera & Hover Update (Exact F3 Timeline Curve!) ----------------
  const introPos = new THREE.Vector3(-14, 21, 14);
  const introTarget = new THREE.Vector3(0, 0.5, 0);
  const tlPos = new THREE.Vector3();
  const tlTarget = new THREE.Vector3();
  const finalCamPos = new THREE.Vector3();
  const finalTarget = new THREE.Vector3();
  const hoverTargetPos = new THREE.Vector3(99, 99, 99);
  let hoverTargetStrength = 0;
  let lastClink = 0;

  function setPointerRaycast(raycaster, nowSec) {
    const hits = raycaster.intersectObject(hitCollider, false);
    if (hits.length > 0) {
      hoverTargetPos.copy(hits[0].point);
      hoverTargetStrength = 1.0;
      if (nowSec - lastClink > 0.16 && onHoverClink) {
        lastClink = nowSec;
        onHoverClink();
      }
      return true;
    }
    hoverTargetStrength = 0.0;
    return false;
  }

  function update(dt, time, progress, introWeight, pointerNDC) {
    sharedUniforms.uTime.value = time;
    sharedUniforms.uConstruct.value = introWeight;
    sharedUniforms.uHoverPos.value.lerp(hoverTargetPos, Math.min(1, dt * 12));
    sharedUniforms.uHoverStrength.value += (hoverTargetStrength - sharedUniforms.uHoverStrength.value) * Math.min(1, dt * 9);

    iglooBuilt.cageMat.opacity = THREE.MathUtils.lerp(0.55, 0.18, introWeight);

    // Exact F3.createTimeline() keyframe interpolation!
    // First half [0 -> 0.5]: camera descends from y = 11.5 (target y = 15) down to settled hero (-13.25, 2.5, 13.25) -> (0, 1, 0)
    // Second half [0.5 -> 1.0]: camera pulls back toward (-15.25, 2.5, 23.25)
    const p1 = THREE.MathUtils.clamp(progress / 0.5, 0, 1);
    const easeOut1 = 1 - Math.pow(1 - p1, 2.2);
    const p2 = THREE.MathUtils.clamp((progress - 0.35) / 0.65, 0, 1);
    const easeInOut2 = p2 < 0.5 ? 2 * p2 * p2 : 1 - Math.pow(-2 * p2 + 2, 2) / 2;

    tlPos.set(
      -13.25 - 2.0 * easeInOut2,
      THREE.MathUtils.lerp(11.5, 2.5, easeOut1),
      13.25 + 10.0 * easeInOut2
    );
    tlTarget.set(0, THREE.MathUtils.lerp(15.0, 1.0, easeOut1), 0);

    finalCamPos.lerpVectors(introPos, tlPos, introWeight);
    finalTarget.lerpVectors(introTarget, tlTarget, introWeight);

    // Subtle pointer displacement (0.07, 0.025) + polar breeze micro-shake
    finalCamPos.x += pointerNDC.x * 0.45 + Math.sin(time * 0.7) * 0.04;
    finalCamPos.y += pointerNDC.y * 0.22 + Math.cos(time * 0.55) * 0.03;

    camera.position.copy(finalCamPos);
    camera.lookAt(finalTarget);

    // Update ground blizzard smoke ribbons facing camera
    for (let i = 0; i < smokeCount; i++) {
      const s = smokeData[i];
      let x = ((s.x + time * s.speed + 13) % 26) - 13;
      dummy.position.set(x, s.y, s.z);
      dummy.quaternion.copy(camera.quaternion);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      smokeInst.setMatrixAt(i, dummy.matrix);
    }
    smokeInst.instanceMatrix.needsUpdate = true;
  }

  function resize(aspect) {
    camera.aspect = aspect;
    camera.zoom = Math.min(1, aspect * 1.25);
    camera.updateProjectionMatrix();
  }

  return {
    scene,
    camera,
    height: 2.35,
    initialScrollAutocenter: 0.495,
    finalScrollAutocenter: 0.495,
    setPointerRaycast,
    update,
    resize,
  };
}

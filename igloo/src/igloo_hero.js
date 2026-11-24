// Surface Scene (Section 0):
// - Hemispherical Igloo + Arched Entrance Tunnel built from ~188 beveled frozen-stone/ice blocks (1 InstancedMesh)
// - Luminous glowing mortar seams + CAD construct scan wave + interactive radial normal hover lift
// - Craggy windswept permafrost terrain + distant misty polar mountain ridge
// - Architectural CAD triangular wireframe mesh overlay + vertex numeric index markers + blowing snow particles

import * as THREE from '../vendor/three.module.js';
import { fbm, hash2 } from './noise_tex.js';

function createBeveledBlockGeometry(w, h, d, bevel = 0.038) {
  const geo = new THREE.BoxGeometry(w, h, d, 3, 3, 3);
  const pos = geo.attributes.position;
  // Store normalized local coordinates [-1, 1] in uv2 so fragment shader can render crisp glowing mortar seams!
  const localNorm = new Float32Array(pos.count * 3);
  const hw = w * 0.5;
  const hh = h * 0.5;
  const hd = d * 0.5;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    localNorm[i * 3] = x / hw;
    localNorm[i * 3 + 1] = y / hh;
    localNorm[i * 3 + 2] = z / hd;

    // Subtle organic corner chamfer + slight rock irregularity
    const ex = Math.max(0, Math.abs(x) - (hw - bevel)) / bevel;
    const ey = Math.max(0, Math.abs(y) - (hh - bevel)) / bevel;
    const ez = Math.max(0, Math.abs(z) - (hd - bevel)) / bevel;
    const corner = ex * ey + ey * ez + ez * ex;
    if (corner > 0) {
      const pull = Math.min(1, corner * 0.42) * bevel * 0.65;
      x -= Math.sign(x) * pull;
      y -= Math.sign(y) * pull;
      z -= Math.sign(z) * pull;
    }
    const n = (Math.sin(x * 19.3 + y * 13.7 + z * 23.1) * 0.5 + 0.5 - 0.5) * 0.012;
    pos.setXYZ(i, x + n, y + n * 0.7, z + n);
  }
  geo.setAttribute('aLocalBox', new THREE.BufferAttribute(localNorm, 3));
  geo.computeVertexNormals();
  return geo;
}

export function createIglooHeroScene({ envMap, textures, onBlockHoverSound }) {
  const group = new THREE.Group();

  // ---------------- Lighting ----------------
  const hemi = new THREE.HemisphereLight(0xeef3ff, 0x5c6474, 1.35);
  group.add(hemi);

  const keyDir = new THREE.DirectionalLight(0xf6f9ff, 1.55);
  keyDir.position.set(-7.5, 11.5, 6.5);
  group.add(keyDir);

  const rimLight = new THREE.DirectionalLight(0xdce8ff, 1.15);
  rimLight.position.set(6.5, 5.0, -8.5);
  group.add(rimLight);

  // Intense inner hearth/portal white energy light inside the igloo dome & tunnel!
  const innerCoreLight = new THREE.PointLight(0xffffff, 6.5, 9.5, 1.6);
  innerCoreLight.position.set(0.45, 0.75, 0.45);
  group.add(innerCoreLight);

  // ---------------- 1. Igloo Block Layout (Dome + Arched Entrance Tunnel) ----------------
  const R = 2.28;
  const tunnelAzimuth = 0.68; // ~39 deg facing front-right (matches igloo.inc isometric composition!)
  const tunnelDirX = Math.sin(tunnelAzimuth);
  const tunnelDirZ = Math.cos(tunnelAzimuth);

  const blocks = []; // { basePos, normal, quat, scale, displacement, velocity, phase }
  const dummy = new THREE.Object3D();
  const upVec = new THREE.Vector3(0, 1, 0);

  const ringCount = 8;
  for (let r = 0; r < ringCount; r++) {
    const phi = ((r + 0.52) / (ringCount + 0.35)) * (Math.PI * 0.47); // 0 = base, pi/2 = apex
    const y = Math.sin(phi) * R * 0.94;
    const ringRad = Math.cos(phi) * R;
    const circumference = 2 * Math.PI * ringRad;
    const blockArcLen = 0.56;
    const count = Math.max(4, Math.round(circumference / blockArcLen));
    const stagger = (r % 2) * (Math.PI / count);

    for (let j = 0; j < count; j++) {
      const theta = (j / count) * Math.PI * 2 + stagger;
      // Carve opening arch on lower 3 rings where entrance tunnel protrudes!
      let dAng = Math.atan2(Math.sin(theta - tunnelAzimuth), Math.cos(theta - tunnelAzimuth));
      if (r < 3 && Math.abs(dAng) < 0.36 - r * 0.045) continue;

      const nx = Math.cos(phi) * Math.sin(theta);
      const ny = Math.sin(phi);
      const nz = Math.cos(phi) * Math.cos(theta);

      const bx = nx * R;
      const bz = nz * R;

      const actualWidth = (circumference / count) * 0.965;
      const actualHeight = (R * (Math.PI * 0.48) / ringCount) * 0.955;
      const actualDepth = 0.36;

      dummy.position.set(bx, y + 0.16, bz);
      dummy.lookAt(bx + nx * 2, y + 0.16 + ny * 2, bz + nz * 2);

      blocks.push({
        basePos: dummy.position.clone(),
        normal: new THREE.Vector3(nx, ny, nz).normalize(),
        quat: dummy.quaternion.clone(),
        scale: new THREE.Vector3(actualWidth, actualHeight, actualDepth),
        disp: 0,
        vel: 0,
        seed: hash2(r * 13.1, j * 7.7),
      });
    }
  }

  // Capstone 4-quadrant crown blocks (creates the signature glowing cross seam at the top of the dome!)
  for (let q = 0; q < 4; q++) {
    const ang = q * (Math.PI * 0.5) + tunnelAzimuth;
    const cr = 0.24;
    const bx = Math.sin(ang) * cr;
    const bz = Math.cos(ang) * cr;
    dummy.position.set(bx, R * 0.95 + 0.14, bz);
    dummy.quaternion.setFromAxisAngle(upVec, ang);
    blocks.push({
      basePos: dummy.position.clone(),
      normal: new THREE.Vector3(Math.sin(ang) * 0.18, 0.98, Math.cos(ang) * 0.18).normalize(),
      quat: dummy.quaternion.clone(),
      scale: new THREE.Vector3(0.42, 0.24, 0.42),
      disp: 0,
      vel: 0,
      seed: 0.8 + q * 0.05,
    });
  }

  // Protruding Arched Entrance Tunnel (4 rings of vaulted blocks facing front-right)
  const perpX = Math.cos(tunnelAzimuth);
  const perpZ = -Math.sin(tunnelAzimuth);
  const tunnelRadius = 0.84;
  for (let tr = 0; tr < 4; tr++) {
    const distOut = R * 0.86 + tr * 0.36;
    const archBlocks = 7;
    for (let a = 0; a < archBlocks; a++) {
      const archAng = -Math.PI * 0.46 + (a / (archBlocks - 1)) * (Math.PI * 0.92);
      const localX = Math.sin(archAng) * tunnelRadius;
      const localY = Math.cos(archAng) * tunnelRadius * 0.92;

      const wx = tunnelDirX * distOut + perpX * localX;
      const wz = tunnelDirZ * distOut + perpZ * localX;
      const wy = localY + 0.14;

      const nx = perpX * Math.sin(archAng) + tunnelDirX * 0.12;
      const ny = Math.cos(archAng);
      const nz = perpZ * Math.sin(archAng) + tunnelDirZ * 0.12;

      dummy.position.set(wx, wy, wz);
      // Align block tangent to arch curve and tunnel axis
      const mRot = new THREE.Matrix4();
      const zAxis = new THREE.Vector3(tunnelDirX, 0, tunnelDirZ);
      const yAxis = new THREE.Vector3(perpX * Math.sin(archAng), Math.cos(archAng), perpZ * Math.sin(archAng)).normalize();
      const xAxis = new THREE.Vector3().crossVectors(yAxis, zAxis).normalize();
      mRot.makeBasis(xAxis, yAxis, zAxis);
      dummy.quaternion.setFromRotationMatrix(mRot);

      blocks.push({
        basePos: dummy.position.clone(),
        normal: new THREE.Vector3(nx, ny, nz).normalize(),
        quat: dummy.quaternion.clone(),
        scale: new THREE.Vector3(0.37, 0.25, 0.34),
        disp: 0,
        vel: 0,
        seed: hash2(tr + 40, a * 3.3),
      });
    }
  }

  const unitBlockGeo = createBeveledBlockGeometry(1, 1, 1, 0.08);
  const aGlowBoost = new Float32Array(blocks.length);
  const instGlowAttr = new THREE.InstancedBufferAttribute(aGlowBoost, 1);
  instGlowAttr.setUsage(THREE.DynamicDrawUsage);
  unitBlockGeo.setAttribute('aGlowBoost', instGlowAttr);

  const blockUniforms = {
    uTime: { value: 0 },
    uConstruct: { value: 0 }, // 0 = bright white construct energy -> 1 = dark frozen stone + glowing mortar seams
  };

  const blockMat = new THREE.MeshStandardMaterial({
    color: 0x5c6370,
    roughness: 0.68,
    metalness: 0.12,
    bumpMap: textures.stoneBumpTex,
    bumpScale: 0.045,
    envMap,
    envMapIntensity: 1.05,
  });

  blockMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = blockUniforms.uTime;
    shader.uniforms.uConstruct = blockUniforms.uConstruct;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute vec3 aLocalBox;
        attribute float aGlowBoost;
        varying vec3 vLocalBox;
        varying vec3 vWorldPosI;
        varying float vGlowBoost;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vLocalBox = aLocalBox;
        vGlowBoost = aGlowBoost;
        vec4 wpI = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          wpI = instanceMatrix * wpI;
        #endif
        wpI = modelMatrix * wpI;
        vWorldPosI = wpI.xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        uniform float uConstruct;
        varying vec3 vLocalBox;
        varying vec3 vWorldPosI;
        varying float vGlowBoost;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        // Distance to nearest block edge on each face -> creates glowing mortar crevices & wireframe edges!
        vec3 ab = abs(vLocalBox);
        float edge2nd = max(min(ab.x, ab.y), max(min(ab.y, ab.z), min(ab.z, ab.x)));
        float seamMask = smoothstep(0.80, 0.985, edge2nd);
        float fineWire = smoothstep(0.93, 0.995, edge2nd);

        // Construct intro scan wave from top apex downward
        float scanHeight = mix(3.2, -0.8, clamp(uConstruct, 0.0, 1.0));
        float constructGlow = smoothstep(scanHeight - 0.85, scanHeight + 0.55, vWorldPosI.y) * (1.0 - smoothstep(0.88, 1.0, uConstruct));

        // Warm-cool intense white interior bleed from dome crevices + tunnel mouth
        float innerDist = length(vWorldPosI - vec3(0.55, 0.65, 0.75));
        float portalBleed = smoothstep(3.4, 0.6, innerDist) * 0.65;

        float pulse = 0.88 + 0.12 * sin(uTime * 1.9 + vWorldPosI.x * 2.2 + vWorldPosI.z * 1.7);
        float seamIntensity = (seamMask * (1.35 + portalBleed) + fineWire * 1.45) * pulse;
        seamIntensity += vGlowBoost * (1.85 + seamMask * 2.2);
        seamIntensity += constructGlow * 3.4;

        // Darken face centers slightly when settled for crisp stone-block contrast against radiant white seams
        diffuseColor.rgb *= mix(1.25, 0.72 + 0.28 * vGlowBoost, clamp(uConstruct, 0.0, 1.0));
        totalEmissiveRadiance += vec3(0.94, 0.97, 1.0) * seamIntensity;`
      );
  };

  const iglooInst = new THREE.InstancedMesh(unitBlockGeo, blockMat, blocks.length);
  iglooInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    dummy.position.copy(b.basePos);
    dummy.quaternion.copy(b.quat);
    dummy.scale.copy(b.scale);
    dummy.updateMatrix();
    iglooInst.setMatrixAt(i, dummy.matrix);
  }
  iglooInst.instanceMatrix.needsUpdate = true;
  group.add(iglooInst);

  // Inner Glowing Core Dome & Entrance Volumetric Portal Glow (prevents seeing empty ground through block gaps)
  const coreShellGeo = new THREE.SphereGeometry(R * 0.87, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const coreShellMat = new THREE.ShaderMaterial({
    uniforms: { uTime: blockUniforms.uTime },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vPos;
      void main() {
        float g = 1.65 + 0.25 * sin(uTime * 2.1 + vPos.y * 3.0);
        gl_FragColor = vec4(vec3(0.95, 0.98, 1.0) * g, 1.0);
      }
    `,
    toneMapped: false,
  });
  const coreShell = new THREE.Mesh(coreShellGeo, coreShellMat);
  coreShell.position.y = 0.08;
  group.add(coreShell);

  // Glowing arch portal plane inside tunnel entrance
  const archPortal = new THREE.Mesh(
    new THREE.CircleGeometry(tunnelRadius * 0.76, 24),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.7, 2.85), toneMapped: false })
  );
  archPortal.position.set(tunnelDirX * (R * 1.15), 0.58, tunnelDirZ * (R * 1.15));
  archPortal.lookAt(tunnelDirX * 8, 0.7, tunnelDirZ * 8);
  group.add(archPortal);

  // Invisible proxy collider for fast 0-overhead pointer hover raycast
  const hitProxy = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.14, 20, 14),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitProxy.position.y = 0.5;
  group.add(hitProxy);

  // ---------------- 2. Rugged Frozen Permafrost Mound & Distant Polar Mountains ----------------
  const terrainGeo = new THREE.PlaneGeometry(56, 56, 96, 96);
  terrainGeo.rotateX(-Math.PI * 0.5);
  const tPos = terrainGeo.attributes.position;
  const tCol = new Float32Array(tPos.count * 3);
  for (let i = 0; i < tPos.count; i++) {
    const x = tPos.getX(i);
    const z = tPos.getZ(i);
    const d = Math.hypot(x, z);

    // Central raised rocky ice island + surrounding crater depression + distant jagged polar mountain ring
    const island = Math.exp(-(d * d) / 15.0) * 0.22;
    const crags = (fbm(x * 0.35 + 11.2, z * 0.35 - 4.7, 4) - 0.48) * 0.62 * Math.min(1, d * 0.22);
    const mountainRing = Math.max(0, Math.min(1, (d - 11.5) / 14.0));
    const ridge = Math.pow(fbm(x * 0.11 + 3.1, z * 0.11 + 8.4, 4), 1.65) * 8.2 * mountainRing * mountainRing;
    const h = island + crags + ridge - 0.08;
    tPos.setY(i, h);

    // Bright icy rim right around the igloo base + cool slate rock crevices
    const icePatch = Math.exp(-(d * d) / 12.5);
    const shade = 0.54 + 0.36 * icePatch + Math.min(0.22, Math.max(0, h * 0.06));
    tCol[i * 3] = shade * 0.95;
    tCol[i * 3 + 1] = shade * 0.98;
    tCol[i * 3 + 2] = Math.min(1.0, shade * 1.04);
  }
  terrainGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
  terrainGeo.computeVertexNormals();

  const terrainMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.84,
    metalness: 0.06,
    bumpMap: textures.frostGrainTex,
    bumpScale: 0.06,
    envMap,
    envMapIntensity: 0.75,
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  group.add(terrainMesh);

  // ---------------- 3. Architectural CAD Wireframe Grid & Vertex Index Markers ----------------
  const cadGeo = new THREE.PlaneGeometry(28, 28, 18, 18);
  cadGeo.rotateX(-Math.PI * 0.5);
  const cPos = cadGeo.attributes.position;
  const vertexMarkers = [];
  for (let i = 0; i < cPos.count; i++) {
    let x = cPos.getX(i);
    let z = cPos.getZ(i);
    // Jitter interior vertices into irregular architectural triangles like igloo.inc!
    const d = Math.hypot(x, z);
    if (d > 1.2 && d < 13.0) {
      x += (hash2(i, 2.1) - 0.5) * 0.78;
      z += (hash2(i, 8.7) - 0.5) * 0.78;
    }
    const island = Math.exp(-(d * d) / 15.0) * 0.22;
    const crags = (fbm(x * 0.35 + 11.2, z * 0.35 - 4.7, 4) - 0.48) * 0.62 * Math.min(1, d * 0.22);
    const y = island + crags + 0.035;
    cPos.setXYZ(i, x, y, z);

    if (d > 3.1 && d < 9.5 && hash2(i, 19.3) > 0.72 && vertexMarkers.length < 26) {
      vertexMarkers.push({ x, y: y + 0.12, z, cell: vertexMarkers.length % 16 });
    }
  }

  const wireGeo = new THREE.WireframeGeometry(cadGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const cadWire = new THREE.LineSegments(wireGeo, wireMat);
  group.add(cadWire);
  cadGeo.dispose();

  // Floating subtle sky geodesic wireframe dome (visible in igloo.inc's upper atmosphere!)
  const skyDomeWireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(19, 2));
  const skyDomeWire = new THREE.LineSegments(
    skyDomeWireGeo,
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.09, depthWrite: false })
  );
  skyDomeWire.position.y = 1.5;
  group.add(skyDomeWire);

  // Vertex numeric labels rendered in a single InstancedMesh draw call!
  const labelPlane = new THREE.PlaneGeometry(0.32, 0.32);
  const cellOffsets = new Float32Array(vertexMarkers.length * 2);
  for (let i = 0; i < vertexMarkers.length; i++) {
    const c = vertexMarkers[i].cell;
    cellOffsets[i * 2] = (c % 4) * 0.25;
    cellOffsets[i * 2 + 1] = 0.75 - Math.floor(c / 4) * 0.25;
  }
  labelPlane.setAttribute('aCellUv', new THREE.InstancedBufferAttribute(cellOffsets, 2));

  const markerMat = new THREE.ShaderMaterial({
    uniforms: {
      tAtlas: { value: textures.numAtlasTex },
      uOpacity: { value: 0.68 },
    },
    vertexShader: `
      attribute vec2 aCellUv;
      varying vec2 vUvCell;
      void main() {
        vUvCell = uv * 0.25 + aCellUv;
        vec4 mvCenter = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        mvCenter.xy += position.xy;
        gl_Position = projectionMatrix * mvCenter;
      }
    `,
    fragmentShader: `
      uniform sampler2D tAtlas;
      uniform float uOpacity;
      varying vec2 vUvCell;
      void main() {
        vec4 c = texture2D(tAtlas, vUvCell);
        if (c.a < 0.08) discard;
        gl_FragColor = vec4(vec3(1.0), c.a * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  });
  const markerInst = new THREE.InstancedMesh(labelPlane, markerMat, vertexMarkers.length);
  for (let i = 0; i < vertexMarkers.length; i++) {
    dummy.position.set(vertexMarkers[i].x, vertexMarkers[i].y, vertexMarkers[i].z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    markerInst.setMatrixAt(i, dummy.matrix);
  }
  markerInst.instanceMatrix.needsUpdate = true;
  group.add(markerInst);

  // ---------------- 4. Polar Blowing Snow & Data Dust Particles ----------------
  const snowCount = 520;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  const snowSeed = new Float32Array(snowCount * 2);
  for (let i = 0; i < snowCount; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 22;
    snowPos[i * 3 + 1] = Math.random() * 6.5;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 22;
    snowSeed[i * 2] = 0.4 + Math.random() * 0.9;
    snowSeed[i * 2 + 1] = Math.random() * 6.283;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
  snowGeo.setAttribute('aSeed', new THREE.BufferAttribute(snowSeed, 2));

  const snowMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: blockUniforms.uTime,
      tSprite: { value: textures.particleTex },
    },
    vertexShader: `
      attribute vec2 aSeed;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.x = mod(p.x + uTime * (1.35 * aSeed.x) + 11.0, 22.0) - 11.0;
        p.y = mod(p.y - uTime * (0.38 * aSeed.x) + sin(uTime + aSeed.y) * 0.18, 6.5);
        p.z += cos(uTime * 0.8 + aSeed.y) * 0.28;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp((16.0 * aSeed.x) / max(-mv.z, 1.0), 1.5, 6.0);
        vAlpha = smoothstep(16.0, 4.0, -mv.z) * 0.65;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D tSprite;
      varying float vAlpha;
      void main() {
        vec4 s = texture2D(tSprite, gl_PointCoord);
        if (s.a < 0.05) discard;
        gl_FragColor = vec4(vec3(1.0), s.a * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.Points(snowGeo, snowMat));

  // ---------------- 5. Interactive Hover Physics & 3D Telemetry Anchors ----------------
  const hoverWorldPoint = new THREE.Vector3(999, 999, 999);
  let hoverActive = false;
  let lastClinkTime = 0;

  // Pick 3 representative blocks on top-left, crown-right, and entrance arch for CAD callout leader lines
  const anchorIndices = [
    Math.min(blocks.length - 1, Math.floor(blocks.length * 0.34)),
    Math.min(blocks.length - 1, Math.floor(blocks.length * 0.58)),
    Math.min(blocks.length - 1, blocks.length - 10),
  ];
  const anchorWorldOut = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];

  function setHoverPoint(worldPt, nowSec) {
    if (worldPt) {
      hoverWorldPoint.copy(worldPt);
      hoverActive = true;
      if (nowSec - lastClinkTime > 0.14 && onBlockHoverSound) {
        lastClinkTime = nowSec;
        onBlockHoverSound();
      }
    } else {
      hoverActive = false;
    }
  }

  function update(dt, time, constructProgress) {
    blockUniforms.uTime.value = time;
    blockUniforms.uConstruct.value = constructProgress;
    wireMat.opacity = THREE.MathUtils.lerp(0.62, 0.22, constructProgress);
    markerMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.95, 0.58, constructProgress);

    let matrixDirty = false;
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      // Gentle idle polar breathing + interactive radial pointer displacement
      let targetDisp = Math.sin(time * 1.35 + b.seed * 12.0) * 0.012;
      if (hoverActive) {
        const dx = b.basePos.x - hoverWorldPoint.x;
        const dy = b.basePos.y - hoverWorldPoint.y;
        const dz = b.basePos.z - hoverWorldPoint.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.45) {
          const falloff = Math.pow(1 - dist / 1.45, 2.0);
          targetDisp += falloff * 0.24;
        }
      }
      // Construct assembly float-in offset during first 1.8 seconds
      if (constructProgress < 0.999) {
        const cOff = Math.max(0, 1 - constructProgress * 1.15 - b.seed * 0.15);
        targetDisp += cOff * cOff * 0.55;
      }

      const force = (targetDisp - b.disp) * 115 - b.vel * 14;
      b.vel += force * dt;
      const nextDisp = b.disp + b.vel * dt;
      if (Math.abs(nextDisp - b.disp) > 0.0002 || constructProgress < 0.999) {
        b.disp = nextDisp;
        dummy.position.copy(b.basePos).addScaledVector(b.normal, b.disp);
        dummy.quaternion.copy(b.quat);
        dummy.scale.copy(b.scale);
        dummy.updateMatrix();
        iglooInst.setMatrixAt(i, dummy.matrix);
        aGlowBoost[i] = Math.min(1.0, Math.max(0, (b.disp - 0.015) * 4.2));
        matrixDirty = true;
      }
    }

    if (matrixDirty) {
      iglooInst.instanceMatrix.needsUpdate = true;
      instGlowAttr.needsUpdate = true;
    }

    skyDomeWire.rotation.y = time * 0.018;

    for (let k = 0; k < 3; k++) {
      const b = blocks[anchorIndices[k]];
      anchorWorldOut[k]
        .copy(b.basePos)
        .addScaledVector(b.normal, b.disp + 0.16)
        .applyMatrix4(group.matrixWorld);
    }
  }

  return {
    group,
    hitProxy,
    setHoverPoint,
    update,
    getAnchors: () => [
      { pos: anchorWorldOut[0], code: 'BLK_04 // 7.6', sub: 'TEMP -18.4°C' },
      { pos: anchorWorldOut[1], code: 'CRWN_N // 12.7', sub: 'LUMEN 99.2%' },
      { pos: anchorWorldOut[2], code: 'ARCH_E // 8.5', sub: 'PORTAL_OPEN' },
    ],
  };
}

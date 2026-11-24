// DetailScene — Interactive Cryo-Holographic Inspection Chamber (1:1 match to N3 DetailScene):
// - Deep midnight polar abyss (#09121f) with overhead volumetric god-ray lightshaft + caustic floor pool
// - Real GPU ping-pong 2D damped wave / velocity fluid simulation (mouseSim 128x128 FBO) driven by cursor motion!
// - High-poly 3D Pudgy Penguin or Overpass sculpture rotating on left-center stage (-0.68, -0.06, 0)
//   surrounded by 7,500 glowing cryo-particles advected in real time by the 2D fluid wavefield!

import * as THREE from '../vendor/three.module.js';
import {
  createPenguinSculpture,
  createOverpassSculpture,
} from './sculptures.js';

export function createDetailScene({ renderer, envMap, textures }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x09121f);
  scene.fog = new THREE.FogExp2(0x09121f, 0.085);

  const camera = new THREE.PerspectiveCamera(35, 16 / 9, 0.1, 40);
  camera.position.set(0, 0.05, 3.35);

  scene.add(new THREE.HemisphereLight(0xd9ecff, 0x091426, 1.35));
  const keySpot = new THREE.SpotLight(0xeaf4ff, 6.5, 14, Math.PI * 0.26, 0.65, 1.2);
  keySpot.position.set(-0.7, 3.6, 2.2);
  keySpot.target.position.set(-0.68, -0.2, 0);
  scene.add(keySpot);
  scene.add(keySpot.target);

  const rimDir = new THREE.DirectionalLight(0x52a2ff, 1.85);
  rimDir.position.set(2.8, 1.2, -2.5);
  scene.add(rimDir);

  // ---------------- 1. GPU Ping-Pong 2D Fluid Ripple Simulation (mouseSim 128x128) ----------------
  const SIM_RES = 128;
  const rtOpts = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    type: THREE.HalfFloatType,
    depthBuffer: false,
  };
  let simA = new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, rtOpts);
  let simB = new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, rtOpts);

  const simScene = new THREE.Scene();
  const simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const simMat = new THREE.ShaderMaterial({
    uniforms: {
      tPrev: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uBrushActive: { value: 0 },
      uTexel: { value: 1.0 / SIM_RES },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tPrev;
      uniform vec2 uMouse;
      uniform vec2 uMouseVel;
      uniform float uBrushActive;
      uniform float uTexel;
      varying vec2 vUv;

      void main() {
        vec4 cur = texture2D(tPrev, vUv);
        vec4 nL = texture2D(tPrev, vUv - vec2(uTexel, 0.0));
        vec4 nR = texture2D(tPrev, vUv + vec2(uTexel, 0.0));
        vec4 nD = texture2D(tPrev, vUv - vec2(0.0, uTexel));
        vec4 nU = texture2D(tPrev, vUv + vec2(0.0, uTexel));

        // RG = advected 2D velocity field, B = wave height, A = previous height
        vec2 avgVel = (nL.xy + nR.xy + nD.xy + nU.xy) * 0.25;
        vec2 vel = mix(cur.xy, avgVel, 0.35) * 0.945;

        float laplacian = (nL.b + nR.b + nD.b + nU.b) * 0.5 - cur.a;
        float height = laplacian * 0.96;

        float d = distance(vUv, uMouse);
        float splat = exp(-(d * d) / 0.0045) * uBrushActive;
        vel += uMouseVel * splat * 1.8;
        height += length(uMouseVel) * splat * 2.4;

        gl_FragColor = vec4(clamp(vel, -1.5, 1.5), clamp(height, -1.5, 1.5), cur.b);
      }
    `,
    depthTest: false,
    depthWrite: false,
  });
  simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat));

  // ---------------- 2. Stage Group (offset to x = -0.68 on desktop so right UI panel breathes!) ----------------
  const stageRoot = new THREE.Group();
  stageRoot.position.set(-0.68, -0.06, 0);
  scene.add(stageRoot);

  const penguinModel = createPenguinSculpture({ envMap, detailMode: true });
  penguinModel.scale.setScalar(0.84);
  stageRoot.add(penguinModel);

  const overpassModel = createOverpassSculpture({ envMap, detailMode: true });
  overpassModel.scale.setScalar(0.92);
  overpassModel.visible = false;
  stageRoot.add(overpassModel);

  // Volumetric Tyndall Light Shaft Cone pouring from above
  const shaftMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, tSmoke: { value: textures.smokeTex } },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewP;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vViewP = -mv.xyz;
        vNormalV = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D tSmoke;
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewP;
      void main() {
        float edgeSoft = pow(abs(dot(normalize(vNormalV), normalize(vViewP))), 1.7);
        float verticalFade = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.18, vUv.y);
        float wisp = texture2D(tSmoke, vec2(vUv.x * 2.0 + uTime * 0.025, vUv.y - uTime * 0.04)).a;
        float alpha = edgeSoft * verticalFade * (0.09 + wisp * 0.08);
        gl_FragColor = vec4(vec3(0.58, 0.82, 1.0), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const lightShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 1.55, 4.4, 36, 1, true), shaftMat);
  lightShaft.position.set(0, 0.65, -0.15);
  lightShaft.rotation.z = -0.12;
  stageRoot.add(lightShaft);

  // Glowing Caustic Pool on Chamber Floor beneath the sculpture (lightplane)
  const floorPoolMat = new THREE.ShaderMaterial({
    uniforms: {
      tCaustics: { value: textures.causticsTex },
      tSim: { value: simA.texture },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tCaustics;
      uniform sampler2D tSim;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;
        vec4 sim = texture2D(tSim, vUv);
        vec2 cUv = vUv * 1.8 + vec2(uTime * 0.02, -uTime * 0.015) + sim.xy * 0.08;
        float caust = texture2D(tCaustics, cUv).r;
        float falloff = pow(1.0 - r, 2.2);
        vec3 col = mix(vec3(0.14, 0.34, 0.62), vec3(0.68, 0.88, 1.0), caust);
        gl_FragColor = vec4(col, falloff * (0.28 + caust * 0.36));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const floorPool = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), floorPoolMat);
  floorPool.rotation.x = -Math.PI * 0.5;
  floorPool.position.y = -0.96;
  stageRoot.add(floorPool);

  // ---------------- 3. 7,500 Fluid-Advected Holographic Cryo-Particles ----------------
  const pCnt = 7500;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCnt * 3);
  const pSeed = new Float32Array(pCnt * 3);
  for (let i = 0; i < pCnt; i++) {
    const a = Math.random() * Math.PI * 2;
    const rad = 0.45 + Math.pow(Math.random(), 0.7) * 1.45;
    pPos[i * 3] = Math.cos(a) * rad;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
    pPos[i * 3 + 2] = Math.sin(a) * rad * 0.85;
    pSeed[i * 3] = Math.random();
    pSeed[i * 3 + 1] = Math.random() * Math.PI * 2;
    pSeed[i * 3 + 2] = 0.4 + Math.random() * 0.9;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('aSeed', new THREE.BufferAttribute(pSeed, 3));

  const fieldParticleMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      tSim: { value: simA.texture },
    },
    vertexShader: `
      attribute vec3 aSeed;
      uniform float uTime;
      uniform sampler2D tSim;
      varying float vAlpha;
      varying float vEnergy;

      void main() {
        vec3 p = position;
        float orbit = uTime * (0.14 + aSeed.x * 0.12);
        float cs = cos(orbit);
        float sn = sin(orbit);
        p.xz = mat2(cs, -sn, sn, cs) * p.xz;
        p.y = mod(p.y + uTime * 0.12 * aSeed.z + 1.2, 2.4) - 1.2;

        vec4 wp = modelMatrix * vec4(p, 1.0);
        vec4 clip = projectionMatrix * viewMatrix * wp;
        vec2 screenUv = clip.xy / max(clip.w, 0.001) * 0.5 + 0.5;

        // Advect particles in real time using the 2D GPU mouseSim fluid wavefield!
        vec4 sim = texture2D(tSim, clamp(screenUv, 0.0, 1.0));
        wp.xy += sim.xy * 0.42;
        wp.z += sim.b * 0.25;

        vec4 mv = viewMatrix * wp;
        vEnergy = clamp(length(sim.xy) * 2.2 + abs(sim.b), 0.0, 1.0);
        gl_PointSize = clamp((14.0 * aSeed.z * (1.0 + vEnergy * 0.8)) / max(-mv.z, 0.8), 1.2, 5.5);
        vAlpha = smoothstep(1.2, 0.35, abs(p.y)) * (0.38 + 0.42 * aSeed.x);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vEnergy;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 1.7);
        vec3 col = mix(vec3(0.45, 0.78, 1.0), vec3(1.0), vEnergy);
        gl_FragColor = vec4(col * 1.35, glow * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  stageRoot.add(new THREE.Points(pGeo, fieldParticleMat));

  let activeProjectId = 'pudgy-penguins';
  let openProgress = 0;
  const lastMouseUv = new THREE.Vector2(0.5, 0.5);

  function setProject(projectId) {
    activeProjectId = projectId;
    penguinModel.visible = projectId === 'pudgy-penguins';
    overpassModel.visible = projectId === 'overpass';
  }

  function updateAndStepSim(dt, time, detailOpenWeight, pointerNDC) {
    openProgress = detailOpenWeight;
    const mouseUvX = pointerNDC.x * 0.5 + 0.5;
    const mouseUvY = pointerNDC.y * 0.5 + 0.5;
    const vx = (mouseUvX - lastMouseUv.x) * 14.0;
    const vy = (mouseUvY - lastMouseUv.y) * 14.0;
    lastMouseUv.set(mouseUvX, mouseUvY);

    // Step GPU 2D wavefluid simulation
    simMat.uniforms.tPrev.value = simA.texture;
    simMat.uniforms.uMouse.value.set(mouseUvX, mouseUvY);
    simMat.uniforms.uMouseVel.value.set(vx, vy);
    simMat.uniforms.uBrushActive.value = Math.hypot(vx, vy) > 0.002 ? 1.0 : 0.15;

    renderer.setRenderTarget(simB);
    renderer.render(simScene, simCam);
    const tmp = simA;
    simA = simB;
    simB = tmp;

    fieldParticleMat.uniforms.uTime.value = time;
    fieldParticleMat.uniforms.tSim.value = simA.texture;
    floorPoolMat.uniforms.uTime.value = time;
    floorPoolMat.uniforms.tSim.value = simA.texture;
    shaftMat.uniforms.uTime.value = time;

    // Camera push-in from z = 4.1 -> z = 2.95 on open (matches N3 DetailScene!)
    const zCam = THREE.MathUtils.lerp(4.1, 2.95, detailOpenWeight);
    camera.position.set(pointerNDC.x * 0.18, 0.04 + pointerNDC.y * 0.12, zCam);
    camera.lookAt(-0.22, -0.04, 0);

    // Gentle showcase three-quarter front pose oscillating toward viewer + cursor inspect tilt!
    if (activeProjectId === 'overpass') {
      overpassModel.rotation.y = time * 0.42 + pointerNDC.x * 0.48;
      overpassModel.rotation.x = -pointerNDC.y * 0.20 + Math.sin(time * 0.7) * 0.05;
      overpassModel.position.y = Math.sin(time * 1.1) * 0.045;
    } else {
      penguinModel.rotation.y = 0.22 + Math.sin(time * 0.68) * 0.34 + pointerNDC.x * 0.52;
      penguinModel.rotation.x = -pointerNDC.y * 0.16 + Math.sin(time * 0.7) * 0.03;
      penguinModel.position.y = Math.sin(time * 1.1) * 0.045;
    }
  }

  function resize(aspect) {
    camera.aspect = aspect;
    stageRoot.position.x = aspect < 1.05 ? 0.0 : -0.68;
    stageRoot.position.y = aspect < 1.05 ? 0.34 : -0.06;
    camera.updateProjectionMatrix();
  }

  return {
    scene,
    camera,
    getActiveProjectId: () => activeProjectId,
    setProject,
    updateAndStepSim,
    resize,
  };
}

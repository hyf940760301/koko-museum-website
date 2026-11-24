// Dual-FBO Glacial Fracture Compositor & Kawase Bloom Pipeline (1:1 architectural match to f3 Compositor):
// - Renders active Scene A (rtSceneA) and incoming Scene B / DetailScene (rtSceneB)
// - Diagonal Voronoi ice-fracture wipe with vertical parallax + 5-iteration spectral chromatic aberration (CA_ITERATIONS 5)
// - Radial frost crystallization transition when entering/exiting DetailScene (uDetailProgress)
// - Dual-level half/quarter-res Bloom + ACES tone mapping + animated blue-noise film grain
// - Includes Apple Silicon ANGLE WebGL2 FBO completeness safeguard!

import * as THREE from '../vendor/three.module.js';

const QUAD_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const THRESH_FRAG = /* glsl */ `
uniform sampler2D tInput;
uniform float uThreshold;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb;
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float soft = clamp((lum - uThreshold + 0.25) / 0.5, 0.0, 1.0);
  float contrib = max(soft * soft * 0.25, lum - uThreshold) / max(lum, 0.0001);
  gl_FragColor = vec4(c * clamp(contrib, 0.0, 3.5), 1.0);
}
`;

const BLUR_FRAG = /* glsl */ `
uniform sampler2D tInput;
uniform vec2 uTexel;
uniform float uRadius;
varying vec2 vUv;
void main() {
  vec2 o = uTexel * uRadius;
  vec3 sum = texture2D(tInput, vUv).rgb * 0.28;
  sum += texture2D(tInput, vUv + vec2( o.x,  o.y)).rgb * 0.18;
  sum += texture2D(tInput, vUv + vec2(-o.x,  o.y)).rgb * 0.18;
  sum += texture2D(tInput, vUv + vec2( o.x, -o.y)).rgb * 0.18;
  sum += texture2D(tInput, vUv + vec2(-o.x, -o.y)).rgb * 0.18;
  gl_FragColor = vec4(sum, 1.0);
}
`;

const COMPOSITE_FRAG = /* glsl */ `
uniform sampler2D tSceneA;
uniform sampler2D tSceneB;
uniform sampler2D tDetail;
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform sampler2D tScrollData;
uniform sampler2D tGrain;

uniform float uSplitProgress;   // 0 = pure SceneA, (0..1) = diagonal glacial fracture transition to SceneB!
uniform float uDetailProgress;  // 0 = scroll world, 1 = DetailScene inspection chamber
uniform float uBloomStrength;
uniform float uScrollVelocity;
uniform float uTime;
uniform vec2 uGrainScale;

varying vec2 vUv;

vec3 acesToneMap(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

// 5-iteration spectral chromatic aberration sampler along fracture/velocity vector (matches CA_ITERATIONS 5!)
vec3 sampleSpectralCA(sampler2D tex, vec2 uv, vec2 dir) {
  vec3 sum = vec3(0.0);
  vec3 weightSum = vec3(0.0);
  for (int i = 0; i < 5; i++) {
    float t = (float(i) / 4.0) - 0.5; // [-0.5, +0.5]
    vec3 w = vec3(1.0 - smoothstep(-0.5, 0.25, t), 1.0 - abs(t) * 1.6, smoothstep(-0.25, 0.5, t));
    w = max(w, vec3(0.05));
    vec2 sUv = clamp(uv + dir * t, 0.002, 0.998);
    sum += texture2D(tex, sUv).rgb * w;
    weightSum += w;
  }
  return sum / weightSum;
}

void main() {
  vec3 scrollData = texture2D(tScrollData, vec2(vUv.x * 1.35, vUv.y * 1.35)).rgb;

  vec3 worldHdr;
  if (uSplitProgress <= 0.001) {
    float velCA = clamp(abs(uScrollVelocity) * 0.012, 0.0, 0.014);
    if (velCA > 0.001) {
      worldHdr = sampleSpectralCA(tSceneA, vUv, vec2(0.0, velCA));
    } else {
      worldHdr = texture2D(tSceneA, vUv).rgb;
    }
  } else {
    // Diagonal fractured ice-sheet wipe from bottom to top as user scrolls down!
    // vUv.y = 0 at bottom, 1 at top -> incoming SceneB rises from bottom along jagged inclined ice seam!
    float slope = (vUv.x - 0.5) * 0.24 + (scrollData.r - 0.5) * 0.16 + (scrollData.b - 0.5) * 0.07;
    float seamLine = mix(-0.26, 1.26, uSplitProgress);
    float signedDist = (vUv.y + slope) - seamLine;

    // Fracture zone near signedDist == 0 gets strong ice refraction + 5-tap spectral CA + glowing ice lip!
    float crackBand = exp(-pow(signedDist / 0.065, 2.0));
    float sideMask = 1.0 - smoothstep(-0.018, 0.018, signedDist); // 1.0 below seam (SceneB), 0.0 above seam (SceneA)

    // Vertical parallax displacement on both scenes (matches parallaxY = 0.35!)
    vec2 uvA = clamp(vUv - vec2(0.0, uSplitProgress * 0.26) + (scrollData.rg - 0.5) * crackBand * 0.045, 0.002, 0.998);
    vec2 uvB = clamp(vUv + vec2(0.0, (1.0 - uSplitProgress) * 0.26) - (scrollData.rg - 0.5) * crackBand * 0.045, 0.002, 0.998);

    vec2 caDir = vec2(0.016, 0.022) * crackBand + vec2(0.0, clamp(abs(uScrollVelocity) * 0.01, 0.0, 0.012));
    vec3 colA = crackBand > 0.04 ? sampleSpectralCA(tSceneA, uvA, caDir) : texture2D(tSceneA, uvA).rgb;
    vec3 colB = crackBand > 0.04 ? sampleSpectralCA(tSceneB, uvB, caDir) : texture2D(tSceneB, uvB).rgb;

    worldHdr = mix(colA, colB, sideMask);
    // Crisp crystalline frost gleam right on the fracture edge
    worldHdr += vec3(0.88, 0.95, 1.0) * exp(-pow(signedDist / 0.014, 2.0)) * 0.42;
  }

  // Optional frost-crystallization portal transition into DetailScene (uDetailProgress 0 -> 1)
  if (uDetailProgress > 0.001) {
    vec2 centered = vUv - 0.5;
    float dist = length(centered * vec2(1.35, 1.0));
    float frostNoise = (scrollData.r * 0.65 + scrollData.b * 0.35) * 0.28;
    float portalEdge = mix(-0.15, 1.25, uDetailProgress);
    float dMask = 1.0 - smoothstep(portalEdge - 0.14, portalEdge + 0.08, dist + frostNoise);
    float frostRim = exp(-pow((dist + frostNoise - portalEdge) / 0.075, 2.0));

    vec2 detUv = clamp(vUv + centered * (1.0 - uDetailProgress) * 0.12, 0.002, 0.998);
    vec3 detailHdr = frostRim > 0.05
      ? sampleSpectralCA(tDetail, detUv, centered * frostRim * 0.04)
      : texture2D(tDetail, detUv).rgb;

    worldHdr = mix(worldHdr, detailHdr, dMask);
    worldHdr += vec3(0.75, 0.90, 1.0) * frostRim * 0.65 * sin(uDetailProgress * 3.14159);
  }

  // Add dual-octave soft Bloom
  vec3 bloom = texture2D(tBloom1, vUv).rgb * 0.65 + texture2D(tBloom2, vUv).rgb * 0.85;
  vec3 combined = worldHdr + bloom * uBloomStrength;

  // Subtle natural polar vignette
  float distSq = dot(vUv - 0.5, vUv - 0.5);
  combined *= 1.0 - distSq * 0.24;

  vec3 ldr = acesToneMap(combined);
  ldr = pow(ldr, vec3(1.0 / 2.2));

  // Animated organic film grain
  vec2 gUv = vUv * uGrainScale + vec2(fract(uTime * 11.73), fract(uTime * 7.31));
  float grain = texture2D(tGrain, gUv).r - 0.5;
  ldr += grain * 0.022;

  gl_FragColor = vec4(clamp(ldr, 0.0, 1.0), 1.0);
}
`;

export function createCompositorPipeline(renderer, { scrollDataTex, grainTex }) {
  const rtOpts = {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
  };

  let msaaSamples = renderer.capabilities.isWebGL2 ? Math.min(4, renderer.capabilities.maxSamples || 0) : 0;

  const makeSceneRT = () => {
    const rt = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, samples: msaaSamples });
    renderer.properties.get(rt).__useRenderToTexture = false;
    return rt;
  };

  let rtSceneA = makeSceneRT();
  let rtSceneB = makeSceneRT();
  let rtDetail = makeSceneRT();
  let msaaChecked = false;

  const rtHalfA = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer: false });
  const rtHalfB = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer: false });
  const rtQuarterA = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer: false });
  const rtQuarterB = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer: false });

  const fsGeo = new THREE.PlaneGeometry(2, 2);
  const fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const threshMat = new THREE.ShaderMaterial({
    uniforms: { tInput: { value: null }, uThreshold: { value: 1.08 } },
    vertexShader: QUAD_VERT,
    fragmentShader: THRESH_FRAG,
    depthTest: false,
    depthWrite: false,
  });

  const blurMat = new THREE.ShaderMaterial({
    uniforms: { tInput: { value: null }, uTexel: { value: new THREE.Vector2() }, uRadius: { value: 1.25 } },
    vertexShader: QUAD_VERT,
    fragmentShader: BLUR_FRAG,
    depthTest: false,
    depthWrite: false,
  });

  const compMat = new THREE.ShaderMaterial({
    uniforms: {
      tSceneA: { value: rtSceneA.texture },
      tSceneB: { value: rtSceneB.texture },
      tDetail: { value: rtDetail.texture },
      tBloom1: { value: rtHalfA.texture },
      tBloom2: { value: rtQuarterA.texture },
      tScrollData: { value: scrollDataTex },
      tGrain: { value: grainTex },
      uSplitProgress: { value: 0 },
      uDetailProgress: { value: 0 },
      uBloomStrength: { value: 0.34 },
      uScrollVelocity: { value: 0 },
      uTime: { value: 0 },
      uGrainScale: { value: new THREE.Vector2(10, 10) },
    },
    vertexShader: QUAD_VERT,
    fragmentShader: COMPOSITE_FRAG,
    depthTest: false,
    depthWrite: false,
  });

  const fsMesh = new THREE.Mesh(fsGeo, threshMat);
  const fsScene = new THREE.Scene();
  fsScene.add(fsMesh);

  let width = 1;
  let height = 1;

  function setSize(pixelW, pixelH) {
    width = Math.max(2, Math.floor(pixelW));
    height = Math.max(2, Math.floor(pixelH));

    [rtSceneA, rtSceneB, rtDetail].forEach((rt) => {
      rt.setSize(width, height);
      renderer.properties.get(rt).__useRenderToTexture = false;
    });

    const hw = Math.max(2, Math.floor(width * 0.5));
    const hh = Math.max(2, Math.floor(height * 0.5));
    rtHalfA.setSize(hw, hh);
    rtHalfB.setSize(hw, hh);

    const qw = Math.max(2, Math.floor(width * 0.25));
    const qh = Math.max(2, Math.floor(height * 0.25));
    rtQuarterA.setSize(qw, qh);
    rtQuarterB.setSize(qw, qh);

    compMat.uniforms.uGrainScale.value.set(width / 128, height / 128);
  }

  function renderSceneEntry(entry, targetRT) {
    if (entry.renderToTarget) {
      entry.renderToTarget(targetRT);
    } else {
      renderer.setRenderTarget(targetRT);
      renderer.clear();
      renderer.render(entry.scene, entry.camera);
    }

    if (!msaaChecked && msaaSamples > 0) {
      msaaChecked = true;
      const gl = renderer.getContext();
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        msaaSamples = 0;
        [rtSceneA, rtSceneB, rtDetail].forEach((rt) => rt.dispose());
        rtSceneA = makeSceneRT();
        rtSceneB = makeSceneRT();
        rtDetail = makeSceneRT();
        setSize(width, height);
        compMat.uniforms.tSceneA.value = rtSceneA.texture;
        compMat.uniforms.tSceneB.value = rtSceneB.texture;
        compMat.uniforms.tDetail.value = rtDetail.texture;
        renderSceneEntry(entry, targetRT === rtSceneA ? rtSceneA : targetRT === rtSceneB ? rtSceneB : rtDetail);
      }
    }
  }

  function compose({
    sceneA,
    sceneB,
    splitProgress,
    detailScene,
    detailProgress,
    scrollVelocity,
    time,
  }) {
    // 1. Render primary scroll scene A (unless completely inside DetailScene)
    if (detailProgress < 0.999) {
      renderSceneEntry(sceneA, rtSceneA);
      if (splitProgress > 0.001 && sceneB) {
        renderSceneEntry(sceneB, rtSceneB);
      }
    }

    // 2. Render DetailScene when opening or active
    if (detailProgress > 0.001 && detailScene) {
      renderSceneEntry(detailScene, rtDetail);
    }

    // 3. Extract Bloom from dominant visible buffer
    const primaryTex = detailProgress > 0.5 ? rtDetail.texture : splitProgress > 0.5 ? rtSceneB.texture : rtSceneA.texture;
    fsMesh.material = threshMat;
    threshMat.uniforms.tInput.value = primaryTex;
    renderer.setRenderTarget(rtHalfA);
    renderer.render(fsScene, fsCam);

    const hw = Math.max(2, Math.floor(width * 0.5));
    const hh = Math.max(2, Math.floor(height * 0.5));
    fsMesh.material = blurMat;
    blurMat.uniforms.uTexel.value.set(1 / hw, 1 / hh);
    blurMat.uniforms.uRadius.value = 1.25;
    blurMat.uniforms.tInput.value = rtHalfA.texture;
    renderer.setRenderTarget(rtHalfB);
    renderer.render(fsScene, fsCam);

    blurMat.uniforms.uRadius.value = 2.1;
    blurMat.uniforms.tInput.value = rtHalfB.texture;
    renderer.setRenderTarget(rtHalfA);
    renderer.render(fsScene, fsCam);

    const qw = Math.max(2, Math.floor(width * 0.25));
    const qh = Math.max(2, Math.floor(height * 0.25));
    blurMat.uniforms.uTexel.value.set(1 / qw, 1 / qh);
    blurMat.uniforms.uRadius.value = 1.5;
    blurMat.uniforms.tInput.value = rtHalfA.texture;
    renderer.setRenderTarget(rtQuarterA);
    renderer.render(fsScene, fsCam);

    blurMat.uniforms.uRadius.value = 2.6;
    blurMat.uniforms.tInput.value = rtQuarterA.texture;
    renderer.setRenderTarget(rtQuarterB);
    renderer.render(fsScene, fsCam);

    blurMat.uniforms.uRadius.value = 3.4;
    blurMat.uniforms.tInput.value = rtQuarterB.texture;
    renderer.setRenderTarget(rtQuarterA);
    renderer.render(fsScene, fsCam);

    // 4. Final full-screen glacial fracture & spectral CA composite
    compMat.uniforms.tSceneA.value = rtSceneA.texture;
    compMat.uniforms.tSceneB.value = rtSceneB.texture;
    compMat.uniforms.tDetail.value = rtDetail.texture;
    compMat.uniforms.uSplitProgress.value = splitProgress;
    compMat.uniforms.uDetailProgress.value = detailProgress;
    compMat.uniforms.uScrollVelocity.value = scrollVelocity;
    compMat.uniforms.uTime.value = time;

    fsMesh.material = compMat;
    renderer.setRenderTarget(null);
    renderer.render(fsScene, fsCam);
  }

  return { setSize, compose };
}

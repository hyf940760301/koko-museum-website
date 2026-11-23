// Leica 90mm Macro Physical Optics Post-Processing Pipeline (Zero Extra Geometry DrawCalls):
// 1. 4x MSAA HDR Scene RT + Hardware Blit-Resolved DepthTexture
// 2. Half-res Screen-Space GTAO / Contact Ambient Occlusion (normal reconstructed via dFdx/dFdy + bilateral blur)
// 3. True Linear View-Z Circle-of-Confusion Macro Depth-of-Field (coupled with CuratedMacroRig focus distance!)
// 4. Dual-octave soft bloom + starburst glare + 0.75px radial chromatic aberration + AgX filmic tonemap
import * as THREE from '../vendor/three.module.js';

const QUAD_VS = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Half-Res Screen-Space Horizon/Spiral Contact Ambient Occlusion (0 geometry redraws!)
const GTAO_FS = /* glsl */`
uniform sampler2D tDepth;
uniform vec2 uRes;
uniform float uNear;
uniform float uFar;
uniform float uFovTan;
uniform float uAspect;
uniform float uRadius;
varying vec2 vUv;

float readViewZ(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  float ndcZ = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / max(uFar + uNear - ndcZ * (uFar - uNear), 1e-4);
}

vec3 uvToViewPos(vec2 uv, float vz) {
  vec2 ndc = uv * 2.0 - 1.0;
  return vec3(ndc.x * uAspect * uFovTan * vz, ndc.y * uFovTan * vz, -vz);
}

float ignHash(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  float vz = readViewZ(vUv);
  // Skip background sky dome / extreme distance
  if (vz > uFar * 0.65) {
    gl_FragColor = vec4(1.0);
    return;
  }

  vec3 P = uvToViewPos(vUv, vz);
  // Reconstruct view-space surface normal via screen-space derivatives
  vec3 dPdx = dFdx(P);
  vec3 dPdy = dFdy(P);
  vec3 N = normalize(cross(dPdx, dPdy));

  float jitter = ignHash(gl_FragCoord.xy) * 6.2831853;
  float screenRad = clamp(uRadius / max(vz, 0.6), 0.004, 0.055);
  vec2 aspectFix = vec2(1.0 / max(uAspect, 0.1), 1.0);

  float occ = 0.0;
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float r = sqrt((fi + 0.5) / 12.0) * screenRad;
    float ang = fi * 2.3999632 + jitter;
    vec2 sUv = vUv + vec2(cos(ang), sin(ang)) * aspectFix * r;
    if (sUv.x < 0.002 || sUv.x > 0.998 || sUv.y < 0.002 || sUv.y > 0.998) continue;

    float svz = readViewZ(sUv);
    vec3 S = uvToViewPos(sUv, svz);
    vec3 diff = S - P;
    float dist = length(diff) + 1e-4;
    float ndotv = dot(N, diff / dist);

    // Smooth thickness range check so foreground silhouettes never cast dark halos onto distant walls
    float rangeCheck = smoothstep(uRadius * 1.65, uRadius * 0.25, dist);
    occ += smoothstep(0.06, 0.68, ndotv) * rangeCheck;
  }

  float ao = clamp(1.0 - (occ / 12.0) * 1.25, 0.28, 1.0);
  gl_FragColor = vec4(vec3(ao), clamp(vz / uFar, 0.0, 1.0));
}
`;

// Edge-preserving Depth-Aware Bilateral Blur for silky noise-free contact shadows
const AO_BLUR_FS = /* glsl */`
uniform sampler2D tAO;
uniform vec2 uTexel;
varying vec2 vUv;

void main() {
  vec4 center = texture2D(tAO, vUv);
  float cAo = center.r;
  float cDepth = center.a;
  if (cDepth > 0.64) {
    gl_FragColor = vec4(1.0);
    return;
  }
  float sum = cAo * 0.28;
  float wSum = 0.28;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      if (x == 0 && y == 0) continue;
      vec2 off = vec2(float(x), float(y)) * uTexel * 1.5;
      vec4 s = texture2D(tAO, vUv + off);
      float dz = abs(s.a - cDepth);
      float w = exp(-dz * 180.0) * 0.09;
      sum += s.r * w;
      wSum += w;
    }
  }
  gl_FragColor = vec4(vec3(sum / max(wSum, 1e-4)), cDepth);
}
`;

const BRIGHT_FS = /* glsl */`
uniform sampler2D tColor;
uniform vec2 uTexel;
uniform float uThreshold;
varying vec2 vUv;

void main() {
  vec3 sum = vec3(0.0);
  for (int y = 0; y < 2; y++) {
    for (int x = 0; x < 2; x++) {
      vec2 off = (vec2(float(x), float(y)) - 0.5) * 2.0 * uTexel;
      vec3 s = texture2D(tColor, vUv + off).rgb;
      float lum = dot(s, vec3(0.2126, 0.7152, 0.0722));
      float knee = uThreshold * 0.55;
      float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
      soft = (soft * soft) / (4.0 * knee + 1e-4);
      float contrib = max(soft, lum - uThreshold) / max(lum, 1e-4);
      sum += min(s * contrib, vec3(10.0));
    }
  }
  gl_FragColor = vec4(sum * 0.25, 1.0);
}
`;

const BLUR_FS = /* glsl */`
uniform sampler2D tSrc;
uniform vec2 uDir;
varying vec2 vUv;

void main() {
  vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270;
  c += (texture2D(tSrc, vUv + uDir * 1.3846153).rgb + texture2D(tSrc, vUv - uDir * 1.3846153).rgb) * 0.3162162;
  c += (texture2D(tSrc, vUv + uDir * 3.2307692).rgb + texture2D(tSrc, vUv - uDir * 3.2307692).rgb) * 0.0702703;
  gl_FragColor = vec4(c, 1.0);
}
`;

const FINAL_FS = /* glsl */`
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform sampler2D tAO;
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform vec2 uRes;
uniform float uNear;
uniform float uFar;
uniform float uFocusDist;
uniform float uAperture;
uniform float uAoStrength;
uniform float uTime;
uniform float uBloomStrength;
uniform float uStarburst;
uniform float uTransition;
uniform vec3 uTransTint;
varying vec2 vUv;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float linearizeDepth(float d) {
  float ndcZ = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / max(uFar + uNear - ndcZ * (uFar - uNear), 1e-4);
}

vec3 agxTonemap(vec3 col) {
  const mat3 agxIn = mat3(
    0.842479062253094, 0.0423282422610123, 0.0423756549057051,
    0.0784335999999992, 0.878468636469772, 0.0784336,
    0.0792237451477643, 0.0791661274605434, 0.879142973793104
  );
  const mat3 agxOut = mat3(
    1.19687900512017, -0.0528968517574562, -0.0529716355144438,
    -0.0980208811401368, 1.15190312990417, -0.0980434501171241,
    -0.0990297440797205, -0.0989611768448433, 1.15107367264116
  );
  vec3 v = max(agxIn * max(col, vec3(0.0)), vec3(1e-6));
  v = clamp(log2(v) * 0.06060606 + 0.75757575, 0.0, 1.0);
  vec3 x2 = v * v;
  vec3 x4 = x2 * x2;
  v = 15.5 * x4 * x2 - 40.14 * x4 * v + 31.96 * x4 - 6.868 * x2 * v + 0.4298 * x2 + 0.1191 * v - 0.00232;
  vec3 outCol = max(agxOut * v, vec3(0.0));
  return pow(outCol, vec3(1.0 / 2.2));
}

void main() {
  vec2 aspect = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
  vec2 texel = 1.0 / uRes;

  // True Physical Circle-of-Confusion (CoC) Macro Depth of Field!
  // Keeps tall church spires & North Star razor-sharp when in the focal zone,
  // while melting foreground/distant bokeh into creamy discs as you zoom closer.
  float viewZ = linearizeDepth(texture2D(tDepth, vUv).x);
  float focalPlane = max(1.2, uFocusDist);
  // Generous sharp depth-of-field sweet spot around focalPlane (+/- 22% of focal distance)
  float defocusDelta = max(0.0, abs(viewZ - focalPlane) - focalPlane * 0.22);
  // Closer macro focus = shallower DoF; sky dome (>45m) receives gentle atmospheric softness
  float macroScale = clamp(8.5 / focalPlane, 0.65, 2.1);
  float physCoC = clamp((defocusDelta / max(viewZ, 1.2)) * uAperture * macroScale * 5.2, 0.0, 6.2);
  float blurAmt = physCoC + uTransition * 18.0;

  // Subtle Leica 0.75px peripheral radial chromatic aberration
  vec2 fromCenter = vUv - 0.5;
  float edgeDist2 = dot(fromCenter, fromCenter);
  vec2 caShift = fromCenter * edgeDist2 * texel * 2.2;

  vec3 baseCol = vec3(0.0);
  if (blurAmt < 0.12) {
    float rCh = texture2D(tColor, clamp(vUv + caShift, vec2(0.001), vec2(0.999))).r;
    float gCh = texture2D(tColor, vUv).g;
    float bCh = texture2D(tColor, clamp(vUv - caShift, vec2(0.001), vec2(0.999))).b;
    baseCol = vec3(rCh, gCh, bCh);
  } else {
    float wSum = 0.0;
    float rBase = blurAmt * min(texel.x, texel.y) * 1.42;
    for (int i = 0; i < 12; i++) {
      float fi = float(i);
      float rad = sqrt((fi + 0.5) / 12.0) * rBase;
      float ang = fi * 2.3999632 + 0.4;
      // Slight cat's-eye optical compression near screen corners
      vec2 off = vec2(cos(ang), sin(ang) * aspect.x) * rad / aspect.x;
      vec2 sUv = clamp(vUv + off, vec2(0.002), vec2(0.998));
      vec3 samp = texture2D(tColor, sUv).rgb;
      float sZ = linearizeDepth(texture2D(tDepth, sUv).x);
      // Prevent sharp in-focus foreground objects from bleeding over background bokeh
      float leakGuard = (sZ < focalPlane * 0.82 && blurAmt < 6.5) ? smoothstep(0.0, 1.5, abs(sZ - focalPlane)) : 1.0;
      float l = dot(samp, vec3(0.2126, 0.7152, 0.0722));
      float w = (1.0 + smoothstep(0.65, 3.0, l) * (1.25 + uTransition * 4.5)) * mix(0.35, 1.0, leakGuard);
      baseCol += samp * w;
      wSum += w;
    }
    baseCol /= max(wSum, 1e-4);
  }

  // Apply Screen-Space Contact Ambient Occlusion (automatically exempted on emissive flames/stars!)
  float aoRaw = texture2D(tAO, vUv).r;
  float lumBase = dot(baseCol, vec3(0.2126, 0.7152, 0.0722));
  float emissiveExempt = smoothstep(0.55, 1.65, lumBase);
  float aoFactor = mix(mix(1.0, aoRaw, uAoStrength), 1.0, emissiveExempt);
  // Warm bounce tint in occluded crevices so shadows feel rich rather than muddy grey
  vec3 aoTint = mix(vec3(0.18, 0.11, 0.10), vec3(1.0), aoFactor);
  baseCol *= mix(vec3(aoFactor), aoTint, 0.25 * (1.0 - aoFactor));

  // Multi-scale bloom
  vec3 bloom = texture2D(tBloom1, vUv).rgb * 0.65 + texture2D(tBloom2, vUv).rgb * 0.85;

  // Diagonal 4-point starburst streaks
  if (uStarburst > 0.01) {
    vec3 glare = vec3(0.0);
    vec2 d1 = normalize(vec2(1.0, 0.58)) * texel * 5.5;
    vec2 d2 = normalize(vec2(-1.0, 0.58)) * texel * 5.5;
    for (int s = -3; s <= 3; s++) {
      float w = exp(-abs(float(s)) * 0.55);
      glare += texture2D(tBloom1, vUv + d1 * float(s)).rgb * w;
      glare += texture2D(tBloom1, vUv + d2 * float(s)).rgb * w;
    }
    bloom += glare * 0.095 * uStarburst;
  }

  vec3 hdr = baseCol + bloom * uBloomStrength;

  // Optical bokeh orbs during act transitions
  if (uTransition > 0.005) {
    vec2 p = (vUv - 0.5) * aspect;
    vec3 orbs = vec3(0.0);
    for (int k = 0; k < 18; k++) {
      float fk = float(k);
      vec2 center = vec2(
        sin(fk * 2.13 + uTime * 0.45) * 0.78,
        cos(fk * 1.71 - uTime * 0.35) * 0.46
      );
      float rad = mix(0.07, 0.22, fract(fk * 0.618034));
      float d = length(p - center);
      float disc = 1.0 - smoothstep(rad * 0.82, rad, d);
      float ring = smoothstep(rad * 0.55, rad * 0.92, d) * disc;
      vec3 orbCol = mix(vec3(1.0, 0.78, 0.42), uTransTint, fract(fk * 0.37));
      orbs += orbCol * (disc * 0.35 + ring * 0.55);
    }
    float veil = smoothstep(0.0, 0.88, uTransition);
    hdr = mix(hdr, hdr * 0.32 + orbs * 1.45 + uTransTint * 0.14, veil);
  }

  vec2 vc = (vUv - 0.5) * aspect;
  float vig = 1.0 - 0.16 * dot(vc, vc);
  hdr *= clamp(vig, 0.74, 1.0);

  vec3 srgb = agxTonemap(hdr);
  float grain = (hash12(gl_FragCoord.xy + fract(uTime) * 137.0) - 0.5) * (1.5 / 255.0);
  srgb = clamp(srgb + grain, 0.0, 1.0);

  gl_FragColor = vec4(srgb, 1.0);
}
`;

export class PostPipeline {
  constructor(renderer) {
    this.renderer = renderer;
    this.w = 1;
    this.h = 1;
    const half = THREE.HalfFloatType;

    // Hardware-resolved DepthTexture attached directly to 4x MSAA WebGL2 RenderTarget!
    const depthTex = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
    depthTex.format = THREE.DepthFormat;
    depthTex.minFilter = THREE.NearestFilter;
    depthTex.magFilter = THREE.NearestFilter;

    const maxSamples = Math.min(4, renderer.capabilities.maxSamples || 0);
    this.sceneRT = new THREE.WebGLRenderTarget(1, 1, {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: depthTex,
      samples: maxSamples,
    });
    // CRITICAL macOS Apple Silicon / ANGLE Metal fix:
    // WEBGL_multisampled_render_to_texture rejects DEPTH_ATTACHMENT in framebufferTexture2DMultisampleEXT.
    // Force standard WebGL2 renderbufferStorageMultisample + gl.blitFramebuffer resolve!
    renderer.properties.get(this.sceneRT).__useRenderToTexture = false;
    this._fboVerified = false;

    // Shared 0.5x snapshot texture for glass snowglobe & spectral dichroic prisms
    this.refractRT = new THREE.WebGLRenderTarget(1, 1, {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
    });

    const aoOpts = {
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    };
    this.aoRawRT = new THREE.WebGLRenderTarget(1, 1, aoOpts);
    this.aoBlurRT = new THREE.WebGLRenderTarget(1, 1, aoOpts);

    const bloomOpts = {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    };
    this.brightRT = new THREE.WebGLRenderTarget(1, 1, bloomOpts);
    this.blur1A = new THREE.WebGLRenderTarget(1, 1, bloomOpts);
    this.blur1B = new THREE.WebGLRenderTarget(1, 1, bloomOpts);
    this.blur2A = new THREE.WebGLRenderTarget(1, 1, bloomOpts);
    this.blur2B = new THREE.WebGLRenderTarget(1, 1, bloomOpts);

    this.orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    this.gtaoMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: GTAO_FS,
      uniforms: {
        tDepth: { value: depthTex },
        uRes: { value: new THREE.Vector2(1, 1) },
        uNear: { value: 0.1 },
        uFar: { value: 120 },
        uFovTan: { value: Math.tan((42 * Math.PI) / 360) },
        uAspect: { value: 1.0 },
        uRadius: { value: 0.34 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.aoBlurMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: AO_BLUR_FS,
      uniforms: {
        tAO: { value: null },
        uTexel: { value: new THREE.Vector2(1, 1) },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.brightMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: BRIGHT_FS,
      uniforms: {
        tColor: { value: null },
        uTexel: { value: new THREE.Vector2() },
        uThreshold: { value: 0.85 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: BLUR_FS,
      uniforms: {
        tSrc: { value: null },
        uDir: { value: new THREE.Vector2() },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.finalMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: FINAL_FS,
      uniforms: {
        tColor: { value: null },
        tDepth: { value: depthTex },
        tAO: { value: null },
        tBloom1: { value: null },
        tBloom2: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uNear: { value: 0.1 },
        uFar: { value: 120 },
        uFocusDist: { value: 8.5 },
        uAperture: { value: 0.55 },
        uAoStrength: { value: 0.78 },
        uTime: { value: 0 },
        uBloomStrength: { value: 0.48 },
        uStarburst: { value: 0.15 },
        uTransition: { value: 0 },
        uTransTint: { value: new THREE.Color(0xffb868) },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.quad = new THREE.Mesh(quadGeo, this.brightMat);
    this.quad.frustumCulled = false;
    this.quadScene = new THREE.Scene();
    this.quadScene.add(this.quad);
  }

  setSize(w, h) {
    if (w === this.w && h === this.h) return;
    this.w = w;
    this.h = h;
    this.sceneRT.setSize(w, h);
    this.renderer.properties.get(this.sceneRT).__useRenderToTexture = false;
    this._fboVerified = false;

    const w2 = Math.max(1, Math.floor(w * 0.5));
    const h2 = Math.max(1, Math.floor(h * 0.5));
    const w4 = Math.max(1, Math.floor(w * 0.25));
    const h4 = Math.max(1, Math.floor(h * 0.25));

    this.refractRT.setSize(w2, h2);
    this.aoRawRT.setSize(w2, h2);
    this.aoBlurRT.setSize(w2, h2);

    this.brightRT.setSize(w2, h2);
    this.blur1A.setSize(w2, h2);
    this.blur1B.setSize(w2, h2);
    this.blur2A.setSize(w4, h4);
    this.blur2B.setSize(w4, h4);

    this.gtaoMat.uniforms.uRes.value.set(w2, h2);
    this.aoBlurMat.uniforms.uTexel.value.set(1 / w2, 1 / h2);
    this.finalMat.uniforms.uRes.value.set(w, h);
  }

  captureRefractionPass(scene, camera, transmissiveMeshes) {
    if (!transmissiveMeshes || transmissiveMeshes.length === 0) return;
    const prevAuto = this.renderer.shadowMap.autoUpdate;
    this.renderer.shadowMap.autoUpdate = false;
    for (let i = 0; i < transmissiveMeshes.length; i++) transmissiveMeshes[i].visible = false;
    this.renderer.setRenderTarget(this.refractRT);
    this.renderer.clear();
    this.renderer.render(scene, camera);
    for (let i = 0; i < transmissiveMeshes.length; i++) transmissiveMeshes[i].visible = true;
    this.renderer.shadowMap.autoUpdate = prevAuto;
  }

  render(scene, camera, time, opts = {}) {
    const r = this.renderer;

    // Optional pre-scene reflection pass (e.g., Act IV Planar Mirror Black Ice)
    if (opts.onBeforeMainRender) {
      opts.onBeforeMainRender(r, camera);
    }

    // Optional single half-res refraction capture for thick glass / dichroic crystal acts
    if (opts.refractMeshes && opts.refractMeshes.length > 0) {
      this.captureRefractionPass(scene, camera, opts.refractMeshes);
    }

    this.renderer.properties.get(this.sceneRT).__useRenderToTexture = false;
    r.setRenderTarget(this.sceneRT);
    if (!this._fboVerified) {
      this._fboVerified = true;
      const gl = r.getContext();
      if (this.sceneRT.samples > 0 && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        this.sceneRT.samples = 0;
        this.sceneRT.dispose();
        r.setRenderTarget(this.sceneRT);
      }
    }
    r.clear();
    r.render(scene, camera);

    const w2 = Math.max(1, Math.floor(this.w * 0.5));
    const h2 = Math.max(1, Math.floor(this.h * 0.5));
    const w4 = Math.max(1, Math.floor(this.w * 0.25));
    const h4 = Math.max(1, Math.floor(this.h * 0.25));

    // Pass 1: Half-res GTAO from hardware-resolved DepthTexture (0 scene redraws!)
    const aoStrength = opts.aoStrength ?? 0.78;
    if (aoStrength > 0.01) {
      this.quad.material = this.gtaoMat;
      const gu = this.gtaoMat.uniforms;
      gu.uNear.value = camera.near;
      gu.uFar.value = camera.far;
      gu.uFovTan.value = Math.tan((camera.fov * Math.PI) / 360);
      gu.uAspect.value = camera.aspect;
      gu.uRadius.value = opts.aoRadius ?? 0.34;
      r.setRenderTarget(this.aoRawRT);
      r.render(this.quadScene, this.orthoCam);

      this.quad.material = this.aoBlurMat;
      this.aoBlurMat.uniforms.tAO.value = this.aoRawRT.texture;
      r.setRenderTarget(this.aoBlurRT);
      r.render(this.quadScene, this.orthoCam);
    }

    // Pass 2: Extract HDR highlights
    this.quad.material = this.brightMat;
    this.brightMat.uniforms.tColor.value = this.sceneRT.texture;
    this.brightMat.uniforms.uTexel.value.set(1 / this.w, 1 / this.h);
    this.brightMat.uniforms.uThreshold.value = opts.bloomThreshold ?? 0.82;
    r.setRenderTarget(this.brightRT);
    r.render(this.quadScene, this.orthoCam);

    // Pass 3: Dual-octave Gaussian Bloom
    this.quad.material = this.blurMat;
    this.blurMat.uniforms.tSrc.value = this.brightRT.texture;
    this.blurMat.uniforms.uDir.value.set(1 / w2, 0);
    r.setRenderTarget(this.blur1A);
    r.render(this.quadScene, this.orthoCam);

    this.blurMat.uniforms.tSrc.value = this.blur1A.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1 / h2);
    r.setRenderTarget(this.blur1B);
    r.render(this.quadScene, this.orthoCam);

    this.blurMat.uniforms.tSrc.value = this.blur1B.texture;
    this.blurMat.uniforms.uDir.value.set(1.5 / w4, 0);
    r.setRenderTarget(this.blur2A);
    r.render(this.quadScene, this.orthoCam);

    this.blurMat.uniforms.tSrc.value = this.blur2A.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1.5 / h4);
    r.setRenderTarget(this.blur2B);
    r.render(this.quadScene, this.orthoCam);

    // Pass 4: Final Optical Composite (CoC DoF + GTAO + Chromatic Aberration + Bokeh Wipe + AgX)
    this.quad.material = this.finalMat;
    const u = this.finalMat.uniforms;
    u.tColor.value = this.sceneRT.texture;
    u.tAO.value = this.aoBlurRT.texture;
    u.tBloom1.value = this.blur1B.texture;
    u.tBloom2.value = this.blur2B.texture;
    u.uNear.value = camera.near;
    u.uFar.value = camera.far;
    u.uFocusDist.value = opts.focusDist ?? 8.5;
    u.uAperture.value = opts.aperture ?? 0.52;
    u.uAoStrength.value = aoStrength;
    u.uTime.value = time;
    u.uBloomStrength.value = opts.bloomStrength ?? 0.48;
    u.uStarburst.value = opts.starburst ?? 0.15;
    u.uTransition.value = opts.transition ?? 0;
    if (opts.transTint) u.uTransTint.value.copy(opts.transTint);

    r.setRenderTarget(null);
    r.render(this.quadScene, this.orthoCam);
  }
}

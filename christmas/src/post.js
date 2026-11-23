// HDR half-float post-processing pipeline:
// 4x MSAA scene RT -> background snapshot for glass refraction -> multi-tap bloom & starburst glare
// -> macro tilt-shift + optical bokeh transition wipe -> AgX filmic tonemap & subtle film grain
import * as THREE from '../vendor/three.module.js';

const QUAD_VS = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
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
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform vec2 uRes;
uniform float uTime;
uniform float uBloomStrength;
uniform float uStarburst;
uniform float uTiltShift;
uniform float uTransition;
uniform vec3 uTransTint;
varying vec2 vUv;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// AgX-inspired hue-preserving filmic curve: keeps warm candlelight & cyan aurora rich without clipping white
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

  // Macro tilt-shift + optical defocus blur during act transitions
  float edgeY = smoothstep(0.26, 0.56, abs(vUv.y - 0.5));
  float blurAmt = edgeY * uTiltShift * 2.8 + uTransition * 18.0;

  vec3 baseCol = vec3(0.0);
  if (blurAmt < 0.08) {
    baseCol = texture2D(tColor, vUv).rgb;
  } else {
    // Golden-angle disc bokeh kernel (12 taps) for creamy lens defocus
    float wSum = 0.0;
    float rBase = blurAmt * min(texel.x, texel.y) * 1.4;
    for (int i = 0; i < 12; i++) {
      float fi = float(i);
      float rad = sqrt((fi + 0.5) / 12.0) * rBase;
      float ang = fi * 2.3999632 + 0.4;
      vec2 off = vec2(cos(ang), sin(ang) * aspect.x) * rad / aspect.x;
      vec3 samp = texture2D(tColor, clamp(vUv + off, vec2(0.002), vec2(0.998))).rgb;
      // Bokeh highlight boost so out-of-focus fairy lights bloom into warm discs
      float l = dot(samp, vec3(0.2126, 0.7152, 0.0722));
      float w = 1.0 + smoothstep(0.6, 3.0, l) * (1.2 + uTransition * 4.5);
      baseCol += samp * w;
      wSum += w;
    }
    baseCol /= wSum;
  }

  // Multi-scale bloom
  vec3 bloom = texture2D(tBloom1, vUv).rgb * 0.65 + texture2D(tBloom2, vUv).rgb * 0.85;

  // Diagonal 4-point starburst streaks (enhanced in Act IV Aurora Crystal & Finale)
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

  // Procedural floating golden bokeh orbs during optical act transition
  if (uTransition > 0.005) {
    vec2 p = (vUv - 0.5) * aspect;
    vec3 orbs = vec3(0.0);
    for (int k = 0; k < 18; k++) {
      float fk = float(k);
      vec2 seed = vec2(fk * 1.37 + 0.2, fk * 2.91 + 1.1);
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

  // Subtle museum vignette (never crushes the midtones)
  vec2 vc = (vUv - 0.5) * aspect;
  float vig = 1.0 - 0.18 * dot(vc, vc);
  hdr *= clamp(vig, 0.72, 1.0);

  vec3 srgb = agxTonemap(hdr);

  // Delicate film grain to banish sterile banding
  float grain = (hash12(gl_FragCoord.xy + fract(uTime) * 137.0) - 0.5) * (1.6 / 255.0);
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
    const opts = {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
    };

    const maxSamples = Math.min(4, renderer.capabilities.maxSamples || 0);
    this.sceneRT = new THREE.WebGLRenderTarget(1, 1, { ...opts, samples: maxSamples });
    // Non-MSAA snapshot texture for screen-space glass globe & crystal refraction
    this.refractRT = new THREE.WebGLRenderTarget(1, 1, {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });

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
        tBloom1: { value: null },
        tBloom2: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uBloomStrength: { value: 0.48 },
        uStarburst: { value: 0.15 },
        uTiltShift: { value: 0.55 },
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
    this.refractRT.setSize(Math.max(1, Math.floor(w * 0.5)), Math.max(1, Math.floor(h * 0.5)));

    const w2 = Math.max(1, Math.floor(w * 0.5));
    const h2 = Math.max(1, Math.floor(h * 0.5));
    const w4 = Math.max(1, Math.floor(w * 0.25));
    const h4 = Math.max(1, Math.floor(h * 0.25));

    this.brightRT.setSize(w2, h2);
    this.blur1A.setSize(w2, h2);
    this.blur1B.setSize(w2, h2);
    this.blur2A.setSize(w4, h4);
    this.blur2B.setSize(w4, h4);
    this.finalMat.uniforms.uRes.value.set(w, h);
  }

  // Optional two-pass refraction capture for acts with transmissive thick glass (Act III & IV)
  captureRefractionPass(scene, camera, transmissiveMeshes) {
    if (!transmissiveMeshes || transmissiveMeshes.length === 0) return;
    for (let i = 0; i < transmissiveMeshes.length; i++) transmissiveMeshes[i].visible = false;
    this.renderer.setRenderTarget(this.refractRT);
    this.renderer.clear();
    this.renderer.render(scene, camera);
    for (let i = 0; i < transmissiveMeshes.length; i++) transmissiveMeshes[i].visible = true;
  }

  render(scene, camera, time, opts = {}) {
    const r = this.renderer;
    if (opts.refractMeshes && opts.refractMeshes.length > 0) {
      this.captureRefractionPass(scene, camera, opts.refractMeshes);
    }

    r.setRenderTarget(this.sceneRT);
    r.clear();
    r.render(scene, camera);

    // Extract bright highlights
    this.quad.material = this.brightMat;
    this.brightMat.uniforms.tColor.value = this.sceneRT.texture;
    this.brightMat.uniforms.uTexel.value.set(1 / this.w, 1 / this.h);
    this.brightMat.uniforms.uThreshold.value = opts.bloomThreshold ?? 0.82;
    r.setRenderTarget(this.brightRT);
    r.render(this.quadScene, this.orthoCam);

    // Blur octave 1 (1/2 res)
    this.quad.material = this.blurMat;
    const w2 = Math.max(1, Math.floor(this.w * 0.5));
    const h2 = Math.max(1, Math.floor(this.h * 0.5));
    this.blurMat.uniforms.tSrc.value = this.brightRT.texture;
    this.blurMat.uniforms.uDir.value.set(1 / w2, 0);
    r.setRenderTarget(this.blur1A);
    r.render(this.quadScene, this.orthoCam);

    this.blurMat.uniforms.tSrc.value = this.blur1A.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1 / h2);
    r.setRenderTarget(this.blur1B);
    r.render(this.quadScene, this.orthoCam);

    // Blur octave 2 (1/4 res wide halo)
    const w4 = Math.max(1, Math.floor(this.w * 0.25));
    const h4 = Math.max(1, Math.floor(this.h * 0.25));
    this.blurMat.uniforms.tSrc.value = this.blur1B.texture;
    this.blurMat.uniforms.uDir.value.set(1.5 / w4, 0);
    r.setRenderTarget(this.blur2A);
    r.render(this.quadScene, this.orthoCam);

    this.blurMat.uniforms.tSrc.value = this.blur2A.texture;
    this.blurMat.uniforms.uDir.value.set(0, 1.5 / h4);
    r.setRenderTarget(this.blur2B);
    r.render(this.quadScene, this.orthoCam);

    // Composite to screen
    this.quad.material = this.finalMat;
    const u = this.finalMat.uniforms;
    u.tColor.value = this.sceneRT.texture;
    u.tBloom1.value = this.blur1B.texture;
    u.tBloom2.value = this.blur2B.texture;
    u.uTime.value = time;
    u.uBloomStrength.value = opts.bloomStrength ?? 0.48;
    u.uStarburst.value = opts.starburst ?? 0.15;
    u.uTiltShift.value = opts.tiltShift ?? 0.52;
    u.uTransition.value = opts.transition ?? 0;
    if (opts.transTint) u.uTransTint.value.copy(opts.transTint);

    r.setRenderTarget(null);
    r.render(this.quadScene, this.orthoCam);
  }
}

// Polar High-Key Post-Processing Pipeline for Igloo Inc. Replica:
// - 4x MSAA HDR Scene RT (with macOS Apple Silicon __useRenderToTexture=false & FBO fallback guard)
// - Optional 0.5x Refraction Snapshot for Chamber 1 Obsidian-Ice Monolith
// - Dual-octave Luminous White Bloom + Radial RGB Chromatic Aberration + Subtle Scanlines + Cinematic Film Grain

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
      vec3 c = texture2D(tColor, vUv + off).rgb;
      float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
      float knee = 0.45;
      float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
      soft = (soft * soft) / (4.0 * knee + 1e-4);
      float contrib = max(soft, lum - uThreshold) / max(lum, 1e-4);
      sum += min(c * contrib, vec3(8.0));
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
uniform float uChromatic;
varying vec2 vUv;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 filmicCoolTonemap(vec3 x) {
  // Preserves crisp cool-grey midtones (#a0a5b1) while softly rolling off intense white seam/portal highlights
  vec3 a = x * (x + 0.032);
  vec3 b = x * (0.96 * x + 0.42) + 0.09;
  return pow(clamp(a / b, 0.0, 1.0), vec3(1.0 / 2.2));
}

void main() {
  vec2 centered = vUv - 0.5;
  float edgeDist = dot(centered, centered);

  // Subtle radial RGB chromatic fringing toward screen corners (signature settled_sec_1.png aesthetic!)
  vec2 caShift = centered * (0.0028 + edgeDist * 0.009) * uChromatic;
  float r = texture2D(tColor, clamp(vUv + caShift, 0.001, 0.999)).r;
  float g = texture2D(tColor, vUv).g;
  float b = texture2D(tColor, clamp(vUv - caShift, 0.001, 0.999)).b;
  vec3 hdr = vec3(r, g, b);

  vec3 bloom = texture2D(tBloom1, vUv).rgb * 0.68 + texture2D(tBloom2, vUv).rgb * 0.54;
  hdr += bloom * uBloomStrength;

  // Soft polar atmospheric vignette
  float vig = 1.0 - edgeDist * 0.24;
  hdr *= clamp(vig, 0.78, 1.0);

  vec3 srgb = filmicCoolTonemap(hdr);

  // Faint horizontal telemetry scanline + fine tactile 35mm digital grain
  float scan = sin(gl_FragCoord.y * 1.570796) * 0.0055;
  float grain = (hash12(gl_FragCoord.xy + fract(uTime * 0.73) * 193.0) - 0.5) * (5.2 / 255.0);
  srgb = clamp(srgb + scan + grain, 0.0, 1.0);

  gl_FragColor = vec4(srgb, 1.0);
}
`;

export class PolarPostPipeline {
  constructor(renderer) {
    this.renderer = renderer;
    this.w = 1;
    this.h = 1;
    this._fboChecked = false;

    const half = THREE.HalfFloatType;
    const maxSamples = Math.min(4, renderer.capabilities.maxSamples || 0);

    this.sceneRT = new THREE.WebGLRenderTarget(1, 1, {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      samples: maxSamples,
    });
    renderer.properties.get(this.sceneRT).__useRenderToTexture = false;

    this.refractRT = new THREE.WebGLRenderTarget(1, 1, {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
    });

    const bOpts = {
      type: half,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    };
    this.brightRT = new THREE.WebGLRenderTarget(1, 1, bOpts);
    this.blur1A = new THREE.WebGLRenderTarget(1, 1, bOpts);
    this.blur1B = new THREE.WebGLRenderTarget(1, 1, bOpts);
    this.blur2A = new THREE.WebGLRenderTarget(1, 1, bOpts);
    this.blur2B = new THREE.WebGLRenderTarget(1, 1, bOpts);

    this.orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    this.brightMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: BRIGHT_FS,
      uniforms: {
        tColor: { value: null },
        uTexel: { value: new THREE.Vector2(1, 1) },
        uThreshold: { value: 0.92 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: BLUR_FS,
      uniforms: {
        tSrc: { value: null },
        uDir: { value: new THREE.Vector2(1, 1) },
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
        uBloomStrength: { value: 0.56 },
        uChromatic: { value: 1.0 },
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
    this._fboChecked = false;

    const w2 = Math.max(1, Math.floor(w * 0.5));
    const h2 = Math.max(1, Math.floor(h * 0.5));
    const w4 = Math.max(1, Math.floor(w * 0.25));
    const h4 = Math.max(1, Math.floor(h * 0.25));

    this.refractRT.setSize(w2, h2);
    this.brightRT.setSize(w2, h2);
    this.blur1A.setSize(w2, h2);
    this.blur1B.setSize(w2, h2);
    this.blur2A.setSize(w4, h4);
    this.blur2B.setSize(w4, h4);
    this.finalMat.uniforms.uRes.value.set(w, h);
  }

  render(scene, camera, time, opts = {}) {
    const r = this.renderer;

    if (opts.refractMeshes && opts.refractMeshes.length > 0 && opts.enableRefract) {
      for (const m of opts.refractMeshes) m.visible = false;
      r.setRenderTarget(this.refractRT);
      r.clear();
      r.render(scene, camera);
      for (const m of opts.refractMeshes) m.visible = true;
    }

    r.properties.get(this.sceneRT).__useRenderToTexture = false;
    r.setRenderTarget(this.sceneRT);
    if (!this._fboChecked) {
      this._fboChecked = true;
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

    this.quad.material = this.brightMat;
    this.brightMat.uniforms.tColor.value = this.sceneRT.texture;
    this.brightMat.uniforms.uTexel.value.set(1 / this.w, 1 / this.h);
    this.brightMat.uniforms.uThreshold.value = opts.bloomThreshold ?? 0.90;
    r.setRenderTarget(this.brightRT);
    r.render(this.quadScene, this.orthoCam);

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

    this.quad.material = this.finalMat;
    const u = this.finalMat.uniforms;
    u.tColor.value = this.sceneRT.texture;
    u.tBloom1.value = this.blur1B.texture;
    u.tBloom2.value = this.blur2B.texture;
    u.uTime.value = time;
    u.uBloomStrength.value = opts.bloomStrength ?? 0.56;
    u.uChromatic.value = opts.chromatic ?? 1.0;

    r.setRenderTarget(null);
    r.render(this.quadScene, this.orthoCam);
  }
}

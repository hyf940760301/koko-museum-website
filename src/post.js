// Frame pipeline: normals + depth -> colour (MSAA, linear, half float) -> ambient occlusion
// -> a soft glow -> grade. No vignette; values below the knee pass through untouched so
// the posters keep their own colour.
// The same pass can show the room as a red-chalk drawing on paper (uInk) and let the
// colour soak back in like a wash (uWash): that is how the museum opens and changes rooms.
import * as THREE from '../vendor/three/three.module.js';
import { gMaterial } from './materials.js';

const FS_VS = /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`;

const AO_FS = /* glsl */`
uniform sampler2D tG; uniform mat4 uProj; uniform vec2 uTan; uniform float uRad; varying vec2 vUv;
float ign(vec2 p){ return fract(52.9829189*fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main(){
  vec4 g = texture2D(tG, vUv); float d = g.a;
  if (d <= 0.) { gl_FragColor = vec4(1.); return; }
  vec3 N = normalize(g.xyz); vec3 P = vec3((vUv*2. - 1.)*uTan*d, -d);
  float n0 = ign(gl_FragCoord.xy); float rot = n0*6.2831853; float occ = 0.;
  const int NS = 16;
  for (int i = 0; i < NS; i++) {
    float fi = float(i);
    float yy = 1. - 2.*(fi + .5)/float(NS); float rr = sqrt(max(0., 1. - yy*yy)); float ph = fi*2.399963 + rot;
    vec3 v = vec3(rr*cos(ph), yy, rr*sin(ph)); if (dot(v, N) < 0.) v = -v; v = normalize(v + N*.35);
    float sc = fract(fi*.6180339 + n0); sc = mix(.10, 1., sc*sc);
    vec3 S = P + v*uRad*sc;
    vec4 c = uProj*vec4(S, 1.); vec2 suv = c.xy/c.w*.5 + .5;
    float sd = texture2D(tG, suv).a; if (sd <= 0.) sd = 1e4;
    float rc = smoothstep(0., 1., uRad/max(abs(d - sd), 1e-3));
    occ += step(sd, -S.z - .025)*rc;
  }
  gl_FragColor = vec4(vec3(1. - occ/float(NS)), 1.);
}`;

const BRIGHT_FS = /* glsl */`
uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
void main(){ vec3 c = vec3(0.);
  for (int y = 0; y < 2; y++) for (int x = 0; x < 2; x++) c += max(texture2D(tColor, vUv + (vec2(float(x), float(y)) - .5)*2.*uTexel).rgb - .92, 0.);
  gl_FragColor = vec4(min(c*.25, vec3(6.)), 1.); }`;

const BLUR_FS = /* glsl */`
uniform sampler2D tSrc; uniform vec2 uDir; varying vec2 vUv;
void main(){ vec3 c = texture2D(tSrc, vUv).rgb*.2270270;
  c += (texture2D(tSrc, vUv + uDir*1.3846).rgb + texture2D(tSrc, vUv - uDir*1.3846).rgb)*.3162162;
  c += (texture2D(tSrc, vUv + uDir*3.2308).rgb + texture2D(tSrc, vUv - uDir*3.2308).rgb)*.0702703;
  gl_FragColor = vec4(c, 1.); }`;

const FINAL_FS = /* glsl */`
uniform sampler2D tColor; uniform sampler2D tAO; uniform sampler2D tBloom; uniform sampler2D tG; uniform vec2 uTexel; uniform float uBloom; uniform float uAo;
uniform float uInk; uniform float uWash; uniform float uAspect; uniform float uFade; uniform vec2 uFocus;
varying vec2 vUv;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f); return mix(mix(hash12(i), hash12(i + vec2(1., 0.)), f.x), mix(hash12(i + vec2(0., 1.)), hash12(i + vec2(1., 1.)), f.x), f.y); }
float fb(vec2 p){ float a = .5, s = 0.; for (int i = 0; i < 4; i++){ s += a*vn(p); p = p*2.03 + 11.7; a *= .5; } return s; }
vec3 shoulder(vec3 x){ const float k = .84; vec3 h = k + (1. - k)*(1. - exp(-(x - k)/.55)); return mix(x, h, step(k, x)); }
float dep(vec2 uv){ float d = texture2D(tG, uv).a; return d <= 0. ? 70. : d; }
void main(){
  vec3 c = texture2D(tColor, vUv).rgb;
  vec4 g0 = texture2D(tG, vUv); float d0 = g0.a; float ao = 0., ws = 0.;
  for (int y = 0; y < 4; y++) for (int x = 0; x < 4; x++) {
    vec2 o = (vec2(float(x), float(y)) - 1.5)*uTexel*2.;
    float dd = texture2D(tG, vUv + o).a; float w = 1./(1. + abs(dd - d0)*30.);
    ao += texture2D(tAO, vUv + o).r*w; ws += w;
  }
  ao = mix(1., pow(ao/ws, 1.5), uAo);
  // occlusion falls off warm, the way shadow does on tinted plaster
  c *= mix(vec3(.46, .37, .34), vec3(1.), ao);
  c += texture2D(tBloom, vUv).rgb*uBloom;
  c = shoulder(c);
  c = pow(max(c, 0.), vec3(1./2.2));
  if (uWash < .999) {
    vec2 p = (vUv - uFocus)*vec2(uAspect, 1.); float r = length(p);
    float n = fb(vUv*vec2(uAspect, 1.)*3.4 + 3.), n2 = fb(vUv*vec2(uAspect, 1.)*9. + 20.);
    vec3 paper = vec3(.937, .902, .824)*(.972 + .056*n2);
    // the drawing: contours where depth or facing breaks, a little hatching in the shade
    vec2 t = uTexel*1.3;
    float dc = dep(vUv); float lap = abs(dep(vUv + vec2(t.x, 0.)) + dep(vUv - vec2(t.x, 0.)) - 2.*dc) + abs(dep(vUv + vec2(0., t.y)) + dep(vUv - vec2(0., t.y)) - 2.*dc);
    float ed = smoothstep(.012, .05, lap/dc);
    vec3 nx = texture2D(tG, vUv + vec2(t.x, 0.)).xyz, ny = texture2D(tG, vUv + vec2(0., t.y)).xyz;
    float en = smoothstep(.30, .85, length(g0.xyz - nx) + length(g0.xyz - ny))*step(.001, d0);
    float edge = max(ed, en*.8);
    vec3 k0 = texture2D(tColor, vUv).rgb, kx = texture2D(tColor, vUv + vec2(t.x, 0.)).rgb, ky = texture2D(tColor, vUv + vec2(0., t.y)).rgb;
    float kd = (length(kx - k0) + length(ky - k0))/(dot(k0, vec3(.3333)) + .12);
    edge = max(edge, smoothstep(.07, .26, kd)*.55);
    float L = dot(c, vec3(.2126, .7152, .0722));
    float shade = (1. - smoothstep(.35, .86, L))*.55 + (1. - ao)*.9;
    float hatch = smoothstep(.30, .70, sin((gl_FragCoord.x + gl_FragCoord.y)*.85)*.5 + .5)*smoothstep(.10, .55, shade) + smoothstep(.35, .75, sin((gl_FragCoord.x - gl_FragCoord.y)*.85)*.5 + .5)*smoothstep(.5, .95, shade)*.7;
    float ink = clamp(edge*.92 + hatch*.26, 0., 1.)*(.80 + .4*vn(gl_FragCoord.xy*.35));
    float drawn = smoothstep(0., .22, uInk*1.75 - r*.85 - n*.35);
    vec3 sk = mix(paper, vec3(.60, .26, .17), ink*drawn*.86);
    float w = smoothstep(0., .30, uWash*1.9 - r*.80 - (1. - n)*.55);
    float band = smoothstep(0., .45, w)*(1. - smoothstep(.45, 1., w));
    c = mix(sk, c, w); c *= 1. - .10*band; c = mix(c, c*vec3(1.02, .97, .92), band*.6);
  }
  c += (hash12(gl_FragCoord.xy) - .5)*.014;
  c = mix(vec3(.937, .902, .824), c, uFade);
  gl_FragColor = vec4(c, 1.);
}`;

export class Post {
  constructor(renderer) {
    this.r = renderer;
    const o = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
    this.g = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    this.color = new THREE.WebGLRenderTarget(4, 4, { ...o, samples: 4 });
    this.ao = new THREE.WebGLRenderTarget(4, 4, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false });
    this.bA = new THREE.WebGLRenderTarget(4, 4, { ...o, depthBuffer: false }); this.bB = new THREE.WebGLRenderTarget(4, 4, { ...o, depthBuffer: false });
    this.gMat = gMaterial();
    const sm = (fs, uniforms) => new THREE.ShaderMaterial({ vertexShader: FS_VS, fragmentShader: fs, uniforms, depthTest: false, depthWrite: false });
    this.aoMat = sm(AO_FS, { tG: { value: this.g.texture }, uProj: { value: new THREE.Matrix4() }, uTan: { value: new THREE.Vector2() }, uRad: { value: 0.75 } });
    this.brightMat = sm(BRIGHT_FS, { tColor: { value: this.color.texture }, uTexel: { value: new THREE.Vector2() } });
    this.blurMat = sm(BLUR_FS, { tSrc: { value: null }, uDir: { value: new THREE.Vector2() } });
    this.finalMat = sm(FINAL_FS, { tColor: { value: this.color.texture }, tAO: { value: this.ao.texture }, tBloom: { value: this.bA.texture }, tG: { value: this.g.texture }, uTexel: { value: new THREE.Vector2() },
      uBloom: { value: 0.36 }, uAo: { value: 1.0 }, uInk: { value: 1 }, uWash: { value: 1 }, uAspect: { value: 1 }, uFade: { value: 1 }, uFocus: { value: new THREE.Vector2(0.5, 0.5) } });
    this.u = this.finalMat.uniforms;
    this.fsScene = new THREE.Scene(); this.fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.finalMat); this.quad.frustumCulled = false; this.fsScene.add(this.quad);
    this.bg = new THREE.Color(0.9, 0.88, 0.84);
  }
  setSize(w, h) {
    w = Math.max(8, Math.round(w)); h = Math.max(8, Math.round(h));
    if (w === this.w && h === this.h) return; this.w = w; this.h = h;
    this.g.setSize(w, h); this.color.setSize(w, h); this.ao.setSize(Math.max(4, w >> 1), Math.max(4, h >> 1));
    this.qw = Math.max(2, w >> 2); this.qh = Math.max(2, h >> 2); this.bA.setSize(this.qw, this.qh); this.bB.setSize(this.qw, this.qh);
    this.brightMat.uniforms.uTexel.value.set(1/w, 1/h); this.u.uTexel.value.set(1/w, 1/h); this.u.uAspect.value = w/h;
  }
  pass(mat, target) { this.quad.material = mat; this.r.setRenderTarget(target); this.r.render(this.fsScene, this.fsCam); }
  render(scene, camera) {
    const r = this.r;
    camera.layers.set(0); scene.overrideMaterial = this.gMat;
    r.setRenderTarget(this.g); r.setClearColor(0x000000, 0); r.clear(); r.render(scene, camera);
    scene.overrideMaterial = null; camera.layers.enableAll();
    r.setRenderTarget(this.color); r.setClearColor(this.bg, 1); r.clear(); r.render(scene, camera);
    const a = this.aoMat.uniforms; a.uProj.value.copy(camera.projectionMatrix);
    const tn = Math.tan(camera.fov*Math.PI/360); a.uTan.value.set(tn*camera.aspect, tn);
    this.pass(this.aoMat, this.ao);
    this.pass(this.brightMat, this.bA);
    const b = this.blurMat.uniforms;
    for (const s of [1, 2.2, 4.5]) {
      b.tSrc.value = this.bA.texture; b.uDir.value.set(s/this.qw, 0); this.pass(this.blurMat, this.bB);
      b.tSrc.value = this.bB.texture; b.uDir.value.set(0, s/this.qh); this.pass(this.blurMat, this.bA);
    }
    this.pass(this.finalMat, null);
  }
}

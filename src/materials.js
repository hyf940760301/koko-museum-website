// Shared light rig and the hand-painted materials of the museum.
// Everything is lit analytically: sun and sky both enter through the oculus of the room
// you are in, the pool of light on the floor bounces warm light back up, candles take
// over at night, and the rest is soft ambient.
import * as THREE from '../vendor/three/three.module.js';

const V3 = THREE.Vector3;
export const NOISE = /* glsl */`
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float hash13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3, p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
float vnoise(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(mix(hash13(i), hash13(i+vec3(1,0,0)), f.x), mix(hash13(i+vec3(0,1,0)), hash13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i+vec3(0,0,1)), hash13(i+vec3(1,0,1)), f.x), mix(hash13(i+vec3(0,1,1)), hash13(i+vec3(1,1,1)), f.x), f.y), f.z); }
float fbm(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 5; i++){ s += a*vnoise(p); p = p*2.03 + vec3(17.1, 3.7, 9.2); a *= .5; } return s; }
`;

export const LIGHT = {
  uSunDir: { value: new V3(0, 1, 0) }, uOcu: { value: new V3() }, uOcuR: { value: 2.5 },
  uSunCol: { value: new V3(1.75, 1.42, 0.98) }, uSkyCol: { value: new V3(6.2, 7.1, 8.3) },
  uAmbUp: { value: new V3(0.40, 0.43, 0.48) }, uAmbDn: { value: new V3(0.47, 0.43, 0.38) },
  uPool: { value: new V3() }, uPoolCol: { value: new V3(1.20, 0.88, 0.56) },
  uHazeCol: { value: new V3(0.93, 0.92, 0.90) }, uHaze: { value: 0.003 }, uTime: { value: 0 },
  uCandle: { value: 0 }, uCandleCol: { value: new V3(1.25, 0.70, 0.30) }, uRoom: { value: 0 },
  uLampA: { value: new THREE.Vector4(0, 0, 0, 0) }, uLampB: { value: new THREE.Vector4(0, 0, 0, 0) },
  uOpenA: { value: new Float32Array(20) }, uWideA: { value: new Float32Array(20).fill(0.46) },
  // castle only (castleLighting below): sun through the clerestory, sky through it, the chandelier
  uWin: { value: 1 }, uWinSky: { value: 1 }, uChand: { value: 0 },
};

export const LIGHTING = /* glsl */`
uniform vec3 uSunDir; uniform vec3 uOcu; uniform float uOcuR;
uniform vec3 uSunCol; uniform vec3 uSkyCol; uniform vec3 uAmbUp; uniform vec3 uAmbDn; uniform vec3 uPool; uniform vec3 uPoolCol;
uniform vec3 uHazeCol; uniform float uHaze; uniform float uTime;
uniform float uCandle; uniform vec3 uCandleCol; uniform float uRoom; uniform vec4 uLampA; uniform vec4 uLampB;
float sunVis(vec3 P){
  float t = (uOcu.y - P.y)/uSunDir.y;
  vec3 Q = P + uSunDir*t;
  float d = length(Q.xz - uOcu.xz);
  float pen = 0.06 + 0.014*t;
  return (1. - smoothstep(uOcuR - pen, uOcuR + pen, d))*step(0., t);
}
float pointLight(vec3 P, vec3 N, vec3 S, float fall){
  vec3 L = S - P; float d2 = dot(L, L); L *= inversesqrt(d2);
  return max(dot(N, L)*.65 + .35, 0.)/(1. + d2*fall);
}
vec3 irradiance(vec3 P, vec3 N){
  vec3 E = mix(uAmbDn, uAmbUp, N.y*.5 + .5);
  vec3 Lo = uOcu - P; float d2 = dot(Lo, Lo); Lo *= inversesqrt(d2);
  float area = 3.14159*uOcuR*uOcuR;
  float small = step(.5, uRoom);
  E += uSkyCol*max(dot(N, Lo)*.6 + .4, 0.)*max(Lo.y, 0.)*area/(d2 + area)*mix(1., .60, small);
  E += uSunCol*max(dot(N, uSunDir), 0.)*sunVis(P)*.80;
  vec3 Lp = uPool - P; float dp2 = dot(Lp, Lp); Lp *= inversesqrt(dp2);
  E += uPoolCol*max(dot(N, Lp)*.72 + .28, 0.)/(1. + dp2*0.045)*mix(1., .46, small)*.32;
  if (uRoom < .5) {
    if (uCandle > .003) {
      // a candle on every pilaster of the rotunda: the two nearest matter
      float ang = atan(P.x, -P.z); float a0 = (floor(ang/0.314159265) + .5)*0.314159265;
      float a1 = a0 + sign(ang - a0)*0.314159265;
      float c = pointLight(P, N, vec3(sin(a0)*11.66, 2.80, -cos(a0)*11.66), 1.1) + pointLight(P, N, vec3(sin(a1)*11.66, 2.80, -cos(a1)*11.66), 1.1);
      E += uCandleCol*uCandle*(c*1.55 + .030 + .035*smoothstep(4., 12., length(P.xz)));
    }
  } else {
    E += uCandleCol*uLampA.w*pointLight(P, N, uLampA.xyz, .55);
    E += vec3(1.25, 1.02, .70)*uLampB.w*pointLight(P, N, uLampB.xyz, .5);
  }
  return E;
}
`;

const WORLD_VS = /* glsl */`
attribute vec3 aCol; attribute float aMode;
varying vec3 vW; varying vec3 vO; varying vec3 vN; varying vec3 vCol; varying float vMode; varying vec2 vUv;
void main(){
  vec4 w = modelMatrix*vec4(position, 1.); vW = w.xyz; vO = position; vN = mat3(modelMatrix)*normal;
  vCol = aCol; vMode = aMode; vUv = uv;
  gl_Position = projectionMatrix*viewMatrix*w;
}`;

const FRESCO_FS = /* glsl */`
uniform sampler2D tFrieze; uniform sampler2D tWood; uniform sampler2D tWoodN; uniform sampler2D tPlaster; uniform sampler2D tPlasterN; uniform sampler2D tMarble; uniform sampler2D tMarbleN; uniform sampler2D tFloor; uniform sampler2D tFloorN; uniform float uOpenA[20]; uniform float uWideA[20];
varying vec3 vW; varying vec3 vO; varying vec3 vN; varying vec3 vCol; varying float vMode; varying vec2 vUv;
const float PI = 3.14159265; const float R = 12.; const float BAY = 0.314159265;
${NOISE}
${LIGHTING}
vec3 lin(float r, float g, float b){ return pow(vec3(r, g, b), vec3(2.2)); }
vec3 srgbTex(sampler2D t, vec2 uv){ return pow(texture2D(t, uv).rgb, vec3(2.2)); }
vec3 surfTex(sampler2D t, vec3 p, vec3 n){
  vec3 w = max(abs(n), vec3(1e-3)); w /= dot(w, vec3(1.));
  return srgbTex(t, p.yz)*w.x + srgbTex(t, p.xz)*w.y + srgbTex(t, p.xy)*w.z;
}
vec3 grain(vec3 c, vec3 p, float k){
  float g = fbm(vec3(p.x*2.4, p.y*.35, p.z*2.4) + k);
  float line = sin(p.y*70. + g*4.)*.5 + .5;
  return c*(.94 + .08*g)*(.97 + .04*line);
}
void main(){
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  vec3 alb = vCol; float gold = 0.; float gloss = 0.; float mott = 1.; float occ = 1.; float sheen = 0.; float glaze = 0.; float carve = .5;
  float px = length(fwidth(vW)) + 1e-5;
  float ang = atan(vW.x, -vW.z); float y = vW.y;
  float bi = floor(ang/BAY + .5); float s = (ang - bi*BAY)*R;
  int mode = int(vMode + .5);
  vec3 stone = lin(.725, .775, .725); vec3 cream = lin(.945, .92, .865);

  if (mode == 1) {
    // the drum wall: baseboard, faux-marble dado, rail, then plain intonaco
    if (y < 1.0) {
      alb = cream;
      vec2 q = abs(vec2(s, y - .545)) - vec2(1.50, .29);
      float dp = max(q.x, q.y);
      float inP = (1. - smoothstep(-px, px, dp))*step(abs(bi), 9.5);
      vec3 marb = mod(bi, 2.) < .5 ? lin(.70, .80, .71) : lin(.91, .76, .71);
      float v = fbm(vec3(s*1.1 + bi*7., y*1.4, bi*3.) + 1.6*fbm(vec3(s*.7, y*.9, bi)));
      float vein = smoothstep(.045, 0., abs(v - .5));
      marb = mix(marb, marb*1.10 + .04, vein*.7)*(.90 + .2*v);
      alb = mix(alb, marb, inP);
      alb *= 1. - .14*smoothstep(.022 + px, .022, abs(dp - .03))*step(abs(bi), 9.5);
      float band = max(1. - smoothstep(.15 - px, .15 + px, y), smoothstep(.925 - px, .925 + px, y));
      alb = mix(alb, stone, band);
      mott = .5;
    }
  } else if (mode == 2) {
    // the floor: a rosette, then rings of rhombi laid on crossing spirals
    float r = length(vW.xz);
    vec3 rose = lin(.915, .77, .72), sage = lin(.74, .81, .73), azur = lin(.71, .83, .90), ochre = lin(.89, .78, .58);
    float w = px*1.2; vec3 c = cream;
    if (r < 1.75) {
      float t = ang/(2.*PI)*16.; float f = fract(t); float tri = abs(f - .5)*2.;
      float rho = mix(.52, 1., tri)*1.66;
      float inS = 1. - smoothstep(-w, w, r - rho);
      c = mix(sage, f < .5 ? rose : cream, inS);
      c = mix(c, ochre, 1. - smoothstep(.36 - w, .36 + w, r));
      c = mix(c, cream, 1. - smoothstep(.20 - w, .20 + w, r));
    } else if (r < 2.0) {
      c = mix(cream, ochre, smoothstep(.035 + w, .035, abs(r - 1.875)));
    } else if (r < 10.6) {
      float n = 52.; float k = n/(2.*PI);
      float tj = ang*k; float ri = log(r/2.)*k;
      float u = tj + ri, v2 = tj - ri;
      float iu = floor(u), iv = floor(v2); vec2 f = vec2(fract(u), fract(v2));
      float lw = k/r*px*1.5;
      float rg = iu - iv; float odd = mod(rg, 2.);
      float tsel = mod(floor(rg*.5), 3.);
      vec3 tint = tsel < .5 ? rose : (tsel < 1.5 ? sage : azur);
      c = mix(cream, tint, odd);
      float e = min(min(f.x, 1. - f.x), min(f.y, 1. - f.y));
      c = mix(c, cream*.84, (1. - smoothstep(.018, .018 + lw, e))*.8);
      c = mix(mix(cream, (rose + sage + azur)/3., .5), c, smoothstep(.55, .15, lw));
    } else if (r < 10.95) { c = sage; }
    else { c = mix(cream, rose, smoothstep(.05 + w, .05, abs(r - 11.4))); }
    alb = c; gloss = 1.; mott = .45;
  } else if (mode == 3) {
    vec3 dv = vW - vec3(0., 6.6, 0.);
    float phi = acos(clamp(dv.y/length(dv), -1., 1.));
    float phiO = 0.2185; float span = 1.5708 - phiO;
    float v = clamp((phi - phiO)/span, 0., 1.);
    float rs = R*sin(phi);
    float fa = fract(ang/BAY + .5) - .5;
    float cx = fa*BAY*rs; float halfW = .5*BAY*rs;
    float rows = 5.; float fv = fract(v*rows) - .5; float rowH = span*R/rows; float cy = fv*rowH;
    alb = mix(lin(.82, .90, .96), lin(.68, .81, .91), smoothstep(0., 1., v));
    float hx = halfW - .28, hy = rowH*.5 - .2;
    float well = smoothstep(.02, -.4, max(abs(cx) - hx, abs(cy) - hy));
    occ *= mix(1., .62, well);
    float ss = min(halfW, rowH)*.34;
    float rr = length(vec2(cx, cy)); float an = atan(cy, cx);
    float sr = ss*(.34 + .66*pow(abs(cos(an*4.)), 2.2));
    if (rr < sr) { gold = 2.; alb = lin(.90, .76, .46); }
    mott = .15;
  } else if (mode == 4) {
    // niche back: antique rose with a faint damask
    vec2 p = vec2(s, y)*vec2(3.0, 2.2); float row = floor(p.y); p.x += .5*mod(row, 2.);
    vec2 f = fract(p) - .5; float og = length(f*vec2(1., .82));
    alb *= 1. + .04*smoothstep(.035 + px*3., .035, abs(og - .33)) + .035*smoothstep(.10, .07, og);
    // the arch keeps the top of the niche in soft shade; the altarpiece leaves its own
    float dTop = y > 2.5 ? 1.5 - length(vec2(s, y - 2.5)) : 1.5 - abs(s);
    occ = 1. - .30*smoothstep(1.0, 0., dTop)*smoothstep(1.6, 3.4, y) - .12*smoothstep(.5, 0., 1.5 - abs(s));
    int ki = int(mod(bi + 20., 20.) + .5); if (ki > 19) ki = 0;
    float hw = uWideA[ki]; float hh = hw > .49 ? .67 : .763;
    float wd = mix(1., 2.9, uOpenA[ki]);
    vec2 q = abs(vec2(s, y - (1.252 + hh))) - vec2(hw*wd - .08, hh - .06);
    float sd = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - .08;
    sd = min(sd, length(vec2(s, y - (1.302 + 2.*hh))) - hw);
    occ *= 1. - .30*smoothstep(.30, -.06, sd);
  } else if (mode == 5) {
    gold = 1.;
  } else if (mode == 6) {
    // frieze: a carved inscription running round the room
    float u = ang/(2.*PI)*5.; float vv = (y - 5.6)/.6;
    float m = texture2D(tFrieze, vec2(u, vv)).r; float m2 = texture2D(tFrieze, vec2(u, vv + .05)).r;
    alb *= 1. - .40*m; alb += .06*clamp(m2 - m, 0., 1.);
    alb = mix(alb, lin(.86, .72, .46), smoothstep(.012 + px, .012, abs(y - 5.66)) + smoothstep(.012 + px, .012, abs(y - 6.14)));
  } else if (mode == 7) {
    vec3 nabs = abs(N);
    vec2 uv = (nabs.z > nabs.x && nabs.z > nabs.y) ? vO.xy : (nabs.x > nabs.y ? vO.zy : vO.xz);
    uv *= 1.35;
    alb = srgbTex(tWood, uv);
    vec3 wn = texture2D(tWoodN, uv).xyz*2. - 1.;
    vec3 T = dFdx(vO), Bn = dFdy(vO);
    N = normalize(normalize(T)*wn.x + normalize(Bn)*wn.y + N*wn.z);
    mott = 0.; sheen = .85;
  } else if (mode == 8) {
    // studiolo panelling in inlaid wood; vUv is metres along the wall and height
    float u = vUv.x, h = vUv.y;
    vec3 maple = lin(.93, .85, .69), honey = lin(.84, .69, .48), walnut = lin(.58, .43, .30), sage = lin(.66, .74, .64);
    float w = px*1.2; vec3 c = honey;
    if (h < .14) { c = walnut; }
    else if (h < .80) {
      // tumbling blocks along the dado
      vec2 p = vec2(u, h - .14)/.11; vec2 a = vec2(1., 1.7320508), hf = a*.5;
      vec2 ga = mod(p, a) - hf, gb = mod(p - hf, a) - hf; vec2 g = dot(ga, ga) < dot(gb, gb) ? ga : gb;
      float sec = floor(mod(atan(g.y, g.x) - PI/6. + 2.*PI, 2.*PI)/(2.*PI/3.));
      c = sec < .5 ? maple : (sec < 1.5 ? honey : walnut);
      vec2 fd = sec < .5 ? vec2(1., 0.) : (sec < 1.5 ? vec2(-.5, .866) : vec2(-.5, -.866));
      carve = .35 + .55*dot(normalize(g + 1e-4), fd);
    }
    else if (h < .90) { c = mix(walnut, lin(.86, .72, .46), smoothstep(.012 + w, .012, abs(h - .85))); }
    else if (h < 2.16) {
      float pw = .80; float pi = floor(u/pw); float x = (fract(u/pw) - .5)*pw; float yy = h - 1.53;
      vec2 q = abs(vec2(x, yy)) - vec2(pw*.5 - .075, .555);
      float dp = max(q.x, q.y);
      c = mix(honey, maple, 1. - smoothstep(-w, w, dp));
      c = mix(c, walnut, smoothstep(.007 + w, .007, abs(dp + .03)));
      c = mix(c, walnut, smoothstep(.004 + w, .004, abs(dp - .03))*.7);
      carve = mix(.25, .9, 1. - smoothstep(-.02, .0, dp));
      carve = mix(carve, .02, smoothstep(.018, 0., abs(dp + .03)));
      float kind = mod(pi, 3.); float r = length(vec2(x, yy)); float an = atan(yy, x);
      if (kind < .5) {
        // mazzocchio: a faceted ring, the favourite puzzle of the inlayers
        float ring = abs(r - .20);
        if (ring < .055) { float fc = floor(an/(2.*PI)*16. + .5); float lit = mod(fc, 2.); float inn = step(r, .20);
          c = mix(mix(walnut, honey, lit), mix(honey, lin(.97, .92, .80), lit), inn);           c = mix(c, sage, .25*inn*(1. - lit));
          carve = mix(.2, 1., smoothstep(.05, .012, ring)); }
        c = mix(c, walnut, smoothstep(.004 + w, .004, abs(ring - .055))*.8);
        carve = mix(carve, .08, smoothstep(.012, 0., abs(ring - .055)));
      } else if (kind < 1.5) {
        // a round window of lattice
        if (r < .24) { vec2 d = vec2(x + yy, x - yy)/.085; vec2 f = abs(fract(d) - .5); float bar = smoothstep(.22, .42, max(f.x, f.y));
          c = mix(mix(lin(.52, .62, .66), lin(.70, .80, .84), .5 + .5*yy/.24), honey, bar);
          carve = mix(.12, 1., bar); }
        c = mix(c, walnut, smoothstep(.006 + w, .006, abs(r - .24)));
        c = mix(c, lin(.86, .72, .46), smoothstep(.004 + w, .004, abs(r - .265)));
      } else {
        // a sixteen-point rose, the floor of the rotunda in small
        float t = an/(2.*PI)*16.; float f = fract(t); float rho = mix(.50, 1., abs(f - .5)*2.)*.25;
        float inS = 1. - smoothstep(-w, w, r - rho);
        c = mix(c, f < .5 ? sage : walnut, inS);
        c = mix(c, maple, 1. - smoothstep(.055 - w, .055 + w, r));
        c = mix(c, walnut, smoothstep(.004 + w, .004, abs(r - .275))*.8);
        carve = mix(carve, .95, inS); carve = mix(carve, .15, smoothstep(.02, 0., abs(r - rho)));
      }
    }
    else if (h < 2.30) { c = mix(walnut, honey, smoothstep(2.20, 2.215, h)*(1. - smoothstep(2.265, 2.28, h))); c = mix(c, lin(.86, .72, .46), smoothstep(.008 + w, .008, abs(h - 2.24))); }
    else {
      // above the panelling: a painted frieze of festoons, leaf and fruit, hung from gilt studs
      vec3 ground = lin(.955, .90, .86); c = ground;
      c = mix(c, lin(.90, .74, .68), 1. - smoothstep(2.36 - w, 2.36 + w, h));
      c = mix(c, lin(.86, .72, .46), smoothstep(.006 + w, .006, abs(h - 2.385)));
      float x = (fract(u/.8) - .5)*.8; float k = x/.4; float yc = 3.02 - .23*(1. - k*k);
      float dg = abs(h - yc) + .010*sin(x*110.) ;
      float lf = 1. - smoothstep(.034 - w, .034 + w, dg);
      c = mix(c, mix(lin(.55, .68, .55), lin(.72, .81, .68), .5 + .5*sin(x*150. + h*60.)), lf);
      float fi = floor(k*4. + .5); float fx = fi*.1; float kk = fx/.4; float fy = 3.02 - .23*(1. - kk*kk);
      float df = length(vec2(x - fx, h - fy));
      vec3 fc = mod(fi + 8., 2.) < .5 ? lin(.94, .64, .38) : lin(.92, .76, .70);
      float fr = (1. - smoothstep(.034 - w, .034 + w, df))*step(abs(fi), 3.5);
      c = mix(c, fc*(1. + .12*smoothstep(.03, .0, length(vec2(x - fx + .010, h - fy - .012)))), fr);
      // ribbon tails
      float xr = abs(abs(x) - .4); float tail = (1. - smoothstep(.010 - w, .010 + w, abs(xr - (3.02 - h)*.22 - .012)))*step(2.78, h)*step(h, 3.02);
      c = mix(c, lin(.86, .58, .52), tail*.9);
      float dp = length(vec2(abs(x) - .4, h - 3.03));
      if (dp < .042) { gold = 2.; c = lin(.88, .73, .45); }
      c = mix(c, lin(.86, .72, .46), smoothstep(.005 + w, .005, abs(h - 3.20)));
    }
    if (h < 2.30) { alb = grain(c, vec3(u*.6, h, 0.), floor(u/.8)*3.1); alb *= .78 + .36*dot(srgbTex(tWood, vec2(u, h)*2.4), vec3(.3, .59, .11)); mott = 0.; sheen = .6; } else { alb = c; mott = .7; }
  } else if (mode == 9) {
    // studiolo floor: rose and cream tiles on the diagonal, a sage border
    vec2 p = vUv; float w = px*1.2; float bd = max(abs(p.x) - 2.30, abs(p.y) - 3.00);
    vec2 d = vec2(p.x + p.y, p.x - p.y)/.62; vec2 ci = floor(d); vec2 f = fract(d);
    vec3 rose = lin(.90, .74, .68), sage = lin(.72, .80, .72);
    vec3 c = mod(ci.x + ci.y, 2.) < .5 ? rose : cream;
    float e = min(min(f.x, 1. - f.x), min(f.y, 1. - f.y)); c = mix(c, cream*.82, (1. - smoothstep(.012, .012 + px*3., e))*.7);
    // a sixteen-point rose in the middle of the room, kin to the one under the dome
    vec2 mc = p - vec2(0., .25); float mr = length(mc);
    if (mr < 1.10) {
      vec3 ochre = lin(.89, .78, .58);
      float f2 = fract(atan(mc.y, mc.x)/(2.*PI)*16.); float rho = mix(.52, 1., abs(f2 - .5)*2.)*.84;
      vec3 m = mix(sage, f2 < .5 ? rose : cream, 1. - smoothstep(-w, w, mr - rho));
      m = mix(m, ochre, 1. - smoothstep(.21 - w, .21 + w, mr)); m = mix(m, cream, 1. - smoothstep(.12 - w, .12 + w, mr));
      m = mix(m, cream, smoothstep(.88 - w, .88 + w, mr)); m = mix(m, ochre, smoothstep(.020 + w, .020, abs(mr - .95))); m = mix(m, sage, smoothstep(.030 + w, .030, abs(mr - 1.05)));
      c = m;
    }
    c = mix(c, sage, smoothstep(-w, w, bd)); c = mix(c, cream, smoothstep(-w, w, bd - .16));
    alb = c; gloss = .6; mott = .45;
  } else if (mode == 10) {
    // studiolo vault: small azure coffers, each with a star
    vec2 p = vUv/.62; vec2 f = fract(p) - .5; float d = max(abs(f.x), abs(f.y));
    vec3 dcream = lin(.955, .935, .885); vec3 field = lin(.70, .84, .93);
    float inC = 1. - smoothstep(.40 - px, .40 + px, d); float inner = 1. - smoothstep(.34 - px, .34 + px, d);
    alb = mix(dcream, mix(dcream, field, .45)*(f.y > 0. ? 1.04 : .90), inC); alb = mix(alb, field, inner);
    float rr = length(f); float an = atan(f.y, f.x); float sr = .16*(.34 + .66*pow(abs(cos(an*4.)), 2.2));
    if (rr < sr && inner > .5) { gold = 2.; alb = lin(.88, .73, .45); }
    mott = .6;
  } else if (mode == 11) {
    // dark blue velvet of the cabinet roundels
    alb *= .85 + .3*vnoise(vO*90.); mott = 0.;
  } else if (mode == 12) {
    // glazed earthenware and glass: colour under a clear coat
    gloss = 1.; mott = 0.; sheen = .8; glaze = 1.;
  }

  vec2 uvPl = mode == 3 ? vec2(ang*4.5, y*.55) : vec2(s*1.15, y*1.15);
  vec2 uvMa = mode == 2 ? vW.xz*.45 : vec2(s, y)*.42;
  vec3 pPl = srgbTex(tPlaster, uvPl); vec3 nPl = texture2D(tPlasterN, uvPl).xyz*2. - 1.;
  vec3 pMa = srgbTex(tMarble, uvMa); vec3 nMa = texture2D(tMarbleN, uvMa).xyz*2. - 1.;
  vec3 pFl = srgbTex(tFloor, vW.xz*.38); vec3 nFl = texture2D(tFloorN, vW.xz*.38).xyz*2. - 1.;
  if (mode <= 3 && gold < .5) {
    float usePl = (mode == 3 || (mode == 1 && y >= 1.)) ? 1. : 0.;
    float useFl = mode == 2 ? 1. : 0.;
    vec3 tex = mix(mix(pMa, pPl, usePl), pFl, useFl);
    vec3 wn = mix(mix(nMa, nPl, usePl), nFl, useFl);
    float show = mode == 2 ? .34 : (mode == 3 ? .22 : (mode == 1 && y >= 1. ? .5 : .62));
    float kn = mode == 3 ? 1.35 : (mode == 2 ? .55 : 1.15);
    alb = mix(alb, tex, show);
    vec3 T = dFdx(vW), Bn = dFdy(vW);
    N = normalize(normalize(T)*wn.x*kn + normalize(Bn)*wn.y*kn + N*wn.z);
  }

  if (gold < .5 && mott > 0.) {
    float m1 = fbm(vW*.75), m2 = vnoise(vW*13.);
    alb *= mix(1., (.92 + .16*m1)*(.975 + .05*m2), mott);
    alb = mix(alb, alb*vec3(1.03, 1., .965), m1*mott);
  }
  vec3 E = irradiance(vW, N)*occ;
  if (int(vMode + .5) == 8) {
    vec3 T = dFdx(vW), Bn = dFdy(vW);
    N = normalize(cross(T + N*dFdx(carve)*.11, Bn + N*dFdy(carve)*.11));
    E = irradiance(vW, N)*occ*mix(.8, 1., smoothstep(0., .25, carve));
  }
  vec3 col = alb*E;
  if (gold > 1.5) {
    // gold leaf laid on the painted vault
    vec3 Rf = reflect(-V, N);
    float sp = pow(max(dot(Rf, normalize(uOcu - vW)), 0.), 20.);
    float e = dot(E, vec3(.3333));
    col = alb*(.9 + .2*vnoise(vW*60.))*(E*.62 + .50*smoothstep(0., .8, e) + .22*uCandle) + alb*sp*1.3*smoothstep(0., .6, e);
  } else if (gold > .5) {
    // water gilding: it shows the room back, dark low down and bright from above
    vec3 Ng = normalize(N + (vec3(vnoise(vW*160.), vnoise(vW*160. + 7.3), vnoise(vW*160. + 13.1)) - .5)*.11);
    vec3 Rf = reflect(-V, Ng);
    float b = mix(.36, 1.18, smoothstep(-.55, .50, Rf.y));
    b *= 1. - .22*exp(-Rf.y*Rf.y*30.);
    float fr = pow(1. - max(dot(Ng, V), 0.), 3.);
    float sp = pow(max(dot(Rf, normalize(uOcu - vW)), 0.), 48.);
    vec3 leaf = lin(.96, .74, .40);
    float e = dot(E, vec3(.3333));
    col = leaf*b*(.55*smoothstep(0., .5, e) + .62*e)*(1. + .5*fr) + vec3(1.6, 1.35, .95)*sp*smoothstep(.1, .7, e) + leaf*.35*fr*e;
  }
  if (sheen > 0.) { float fr = pow(1. - max(dot(N, V), 0.), 4.); col += (uAmbUp + uSkyCol*.02)*fr*.12*sheen; }
  if (gloss > 0.) {
    vec3 Rf = reflect(-V, N);
    float F = .03 + .55*pow(1. - max(dot(N, V), 0.), 4.);
    float t = (uOcu.y - vW.y)/max(Rf.y, 1e-3); vec3 Q = vW + Rf*t;
    float m = 1. - smoothstep(uOcuR - .5, uOcuR + .5, length(Q.xz - uOcu.xz));
    col += (uSkyCol*.26*m + uAmbUp*.30)*F*gloss;
  }
  if (glaze > 0.) {
    vec3 Rf = reflect(-V, N); float e = dot(E, vec3(.3333));
    col += vec3(1.)*pow(max(dot(Rf, normalize(uOcu - vW)), 0.), 70.)*.85*smoothstep(.05, .6, e);
    vec3 Lc = uLampA.xyz - vW; col += vec3(1., .78, .46)*pow(max(dot(Rf, normalize(Lc)), 0.), 36.)*.9*uLampA.w/(1. + dot(Lc, Lc)*2.);
  }
  float dist = length(cameraPosition - vW);
  col = mix(col, uHazeCol, 1. - exp(-dist*uHaze));
  gl_FragColor = vec4(col, 1.);
}`;

const TEX_FS = /* glsl */`
uniform sampler2D map; uniform float uKind; uniform vec2 uTexel; uniform float uSeed; uniform float uFloor; uniform vec2 uCrop;
uniform float uReveal; uniform float uRevealMode; uniform float uSrgb; uniform vec4 uCell; uniform float uGlaze; uniform float uFade;
varying vec3 vW; varying vec3 vN; varying vec2 vUv;
${NOISE}
${LIGHTING}
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
vec3 pic(vec2 uv){ vec3 t = texture2D(map, uv).rgb; return uSrgb > .5 ? pow(t, vec3(2.2)) : t; }
float tone(vec2 uv){
  vec3 t = texture2D(map, uv).rgb; float L = sqrt(lum(t));
  float key = smoothstep(0., .035, t.b - max(t.r, t.g)*1.03)*smoothstep(.02, .07, lum(t));
  return mix(1. - L, (1. - L)*.10, key);
}
float lt(vec2 uv){ return sqrt(lum(texture2D(map, uv).rgb)); }
float revealMask(vec2 p){
  float n = vnoise(vec3(p*vec2(3.2, 4.4), uSeed));
  float cover;
  if (uRevealMode < .5) {
    float field = p.x*.22 + (1. - p.y)*.55 + (n - .5)*.28;
    cover = smoothstep(field - .12, field + .08, uReveal*1.55 - .08);
  } else if (uRevealMode < 1.5) {
    cover = 0.;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 c = mix(vec2(.22), vec2(.78), vec2(hash12(vec2(uSeed*1.7, fi + 1.3)), hash12(vec2(uSeed + 2.2, fi + 5.1))));
      float rad = mix(.62, .82, hash12(vec2(fi + 9., uSeed)));
      float d = length((p - c)*vec2(.85, 1.05));
      float grow = uReveal*1.65 - fi*.035;
      cover = max(cover, 1. - smoothstep(grow - .18, grow + .12, d/rad));
    }
  } else if (uRevealMode < 2.5) {
    vec2 dir = normalize(vec2(.85, -.45)); vec2 side = vec2(-dir.y, dir.x);
    float along = dot(p, dir); float across = dot(p, side); cover = 0.;
    for (int i = 0; i < 8; i++) {
      float fi = float(i);
      float y0 = hash12(vec2(uSeed, fi));
      float w = mix(.10, .15, hash12(vec2(fi, uSeed + 2.)));
      float head = uReveal*1.8 - hash12(vec2(fi + 4., uSeed))*.18;
      float band = 1. - smoothstep(w*.3, w*1.25, abs(across - (y0 - .5)*.8));
      cover = max(cover, band*smoothstep(-.06, .14, head - along));
    }
  } else {
    float r = length((p - vec2(.48, .62))*vec2(.82, 1.02));
    float edge = uReveal*1.65;
    cover = 1. - smoothstep(edge - .26, edge + .04, r + (n - .5)*.1);
  }
  // finish the last unfinished patch before the shader swaps to the plain picture,
  // otherwise that panel pops on the final frame
  return mix(cover, 1., smoothstep(.8, .96, uReveal));
}
void main(){
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  vec3 E = irradiance(vW, N);
  vec2 uv = vec2((vUv.x - .5)*uCrop.x + .5, (vUv.y - .5)*uCrop.y + .5);
  vec3 col; float hz = 1.;
  if (uKind < .5) {
    // finished posters keep their own colour; the room only breathes on them
    vec3 t = pic(uv); float k = clamp(lum(E)/.84, .42, 1.06);
    col = t*mix(1., k, .55); hz = .4;
    if (uReveal < .999) {
      vec3 ground = vec3(.80, .75, .66);
      if (uReveal < .004) col = ground*E;
      else {
        // one sample only: extra taps here used to stall the panel that finishes last
        float l0 = lum(t);
        float draw = smoothstep(.02, .32, uReveal);
        float contour = draw < .97 ? smoothstep(.008, .08, length(vec2(dFdx(l0), dFdy(l0)))) : 0.;
        float sweep = vUv.x*.25 + (1. - vUv.y)*.75;
        float drawn = smoothstep(sweep - .08, sweep + .08, draw*1.2 - .04);
        ground *= .94 + .08*vnoise(vec3(vUv*vec2(4., 6.), uSeed + 3.));
        vec3 sino = mix(ground, vec3(.45, .16, .09), clamp(contour*.85 + (1. - l0)*.20, 0., 1.)*drawn*.9)*E;
        float mask = uRevealMode < 0. ? smoothstep(0., 1., uReveal) : revealMask(vUv);
        float front = mask*(1. - smoothstep(.15, .55, mask))*step(0., uRevealMode);
        col = mix(sino, col, mask);
        col *= 1. - .035*front;
        col += vec3(1., .86, .62)*front*.03;
      }
    }
    col *= uFade;
  } else if (uKind < 1.5) {
    col = texture2D(map, uv).rgb*E;
  } else if (uKind < 2.5) {
    // red-chalk study on toned paper, drawn from the fitting photo
    vec2 e = uTexel*1.5;
    float c = tone(uv);
    float gx = tone(uv + vec2(e.x, 0.)) - tone(uv - vec2(e.x, 0.));
    float gy = tone(uv + vec2(0., e.y)) - tone(uv - vec2(0., e.y));
    float edge = smoothstep(.05, .32, length(vec2(gx, gy)));
    float shade = smoothstep(.22, .95, c);
    float per = fwidth(vUv.y)*560./6.2832; float hf = 1. - smoothstep(.16, .42, per);
    float h1 = mix(.5, smoothstep(.30, .70, sin((vUv.x*.5625 + vUv.y)*560.)*.5 + .5), hf);
    float h2 = mix(.5, smoothstep(.35, .75, sin((vUv.x*.5625 - vUv.y)*560.)*.5 + .5), hf);
    float hatch = h1*smoothstep(.12, .55, shade)*.55 + h2*smoothstep(.55, .92, shade)*.45;
    float ink = shade*.50 + hatch*.50 + edge*.75;
    ink *= .78 + .44*vnoise(vec3(vUv*vec2(150., 266.), uSeed));
    ink *= smoothstep(uFloor - .04, uFloor + .03, vUv.y);
    vec2 bd = min(vUv, 1. - vUv); ink *= smoothstep(.0, .05, min(bd.x*1.78, bd.y));
    vec3 paper = vec3(.80, .73, .60)*(.95 + .10*fbm(vec3(vUv*vec2(4., 7.), uSeed)));
    col = mix(paper, vec3(.40, .12, .07), clamp(ink, 0., 1.)*.88);
    col *= E;
  } else {
    // a glazed roundel: plain bisque until it has been earned
    vec3 t = texture2D(map, uCell.xy + vUv*uCell.zw).rgb; float L = lum(t);
    vec3 bis = mix(vec3(.66, .62, .55), vec3(.90, .87, .80), smoothstep(.08, .75, L));
    float r = length(vUv - .5)*2.; float an = atan(vUv.y - .5, vUv.x - .5);
    float front = uGlaze*1.5 - .15 - r*.6 - (an/6.2832 + .5)*.35 - (fbm(vec3(vUv*6., uSeed)) - .5)*.2;
    float m = smoothstep(0., .08, front);
    vec3 V = normalize(cameraPosition - vW); vec3 Rf = reflect(-V, normalize(N + vec3(vUv - .5, 0.)*.5));
    float sp = pow(max(dot(Rf, normalize(uOcu - vW)), 0.), 30.);
    col = mix(bis, t, m)*E + m*(sp*.5 + .03) + vec3(1.2, 1.0, .7)*m*(1. - smoothstep(.0, .22, front))*.7;
  }
  float dist = length(cameraPosition - vW);
  col = mix(col, uHazeCol, (1. - exp(-dist*uHaze))*hz);
  gl_FragColor = vec4(col, 1.);
}`;

export function frescoMaterial(tFrieze, maps, opts = {}) {
  const uniforms = { ...LIGHT, tFrieze: { value: tFrieze }, tWood: { value: maps.wood }, tWoodN: { value: maps.woodN }, tPlaster: { value: maps.plaster }, tPlasterN: { value: maps.plasterN }, tMarble: { value: maps.marble }, tMarbleN: { value: maps.marbleN }, tFloor: { value: maps.floor }, tFloorN: { value: maps.floorN } };
  if (opts.gold) return goldFresco(uniforms, opts.gold);
  return new THREE.ShaderMaterial({ vertexShader: WORLD_VS, fragmentShader: CASTLE ? castleLighting(FRESCO_FS) : FRESCO_FS, side: THREE.DoubleSide, uniforms });
}

// ---------------------------------------------------------------- castle variants (?castle=1 only)
// They are built from the shaders above by replacement, so the site without the flag runs the
// exact same programs as before.
let CASTLE = false;
export function setCastle(on) { CASTLE = !!on; }

// The castle hall has no oculus over the room: the sun comes in through the twenty clerestory
// windows (sunVisWin: follow the sun from P to the cylinder r = 12.45 half way through the wall,
// then ask whether it lands in a window's glass, 0.45 x 1.2 m at 6.10 - 7.30, penumbra 0.03 + 0.01 t),
// the sky through those windows and through the lantern at the top (uOcu is the lantern there),
// (the window sky through amber glass), and the chandelier is a point light at the middle, 6.4 m up. The studiolo (uRoom 1) keeps its oculus.
const SUNVIS_OLD = LIGHTING.slice(LIGHTING.indexOf('float sunVis(vec3 P){'), LIGHTING.indexOf('float pointLight('));
const SKY_OLD = '  E += uSkyCol*max(dot(N, Lo)*.6 + .4, 0.)*max(Lo.y, 0.)*area/(d2 + area)*mix(1., .60, small);\n';
const SUNVIS_CASTLE = SUNVIS_OLD.replace('float sunVis(vec3 P){', 'float sunVisOcu(vec3 P){') + /* glsl */`uniform float uWin; uniform float uWinSky; uniform float uChand;
float sunVisWin(vec3 P){
  vec3 D = uSunDir; float a = dot(D.xz, D.xz); if (a < 1e-5 || D.y <= 0.) return 0.;
  float b = dot(P.xz, D.xz), c = dot(P.xz, P.xz) - 12.45*12.45; float disc = b*b - a*c; if (disc < 0.) return 0.;
  float t = (-b + sqrt(disc))/a; if (t < 0.) return 0.;
  vec3 Q = P + D*t; float ang = atan(Q.x, -Q.z); float k = floor(ang/.314159265 + .5); float off = abs(ang - k*.314159265)*12.45;
  float pen = .03 + .01*t; float hy = Q.y > 7.075 ? .225*sqrt(max(0., 1. - pow((Q.y - 7.075)/.225, 2.))) : .225;
  return (1. - smoothstep(hy - pen, hy + pen, off))*smoothstep(6.10 - pen, 6.10 + pen, Q.y)*(1. - smoothstep(7.30 - pen, 7.30 + pen, Q.y));
}
float sunVis(vec3 P){ return uRoom < .5 ? sunVisWin(P)*uWin*1.8 : sunVisOcu(P); }   // a small aperture: the pools are bright where they land
`;
const CASTLE_SKY = /* glsl */`vec3 castleSky(vec3 P, vec3 N){
  // the ring of windows as a soft band of sky light: the nearest ones strongly, across the hall faintly
  float r = length(P.xz); vec2 h = r > .01 ? P.xz/r : vec2(0., -1.);
  vec3 Wn = vec3(h.x*12., 6.7, h.y*12.) - P, Wf = vec3(-h.x*12., 6.7, -h.y*12.) - P;
  float dn = dot(Wn, Wn); vec3 Ln = Wn*inversesqrt(dn), Lf = normalize(Wf);
  float s = max(dot(N, Ln)*.6 + .4, 0.)*2.2/(1. + dn*.06) + max(dot(N, Lf)*.6 + .4, 0.)*.12 + .05;
  vec3 E = uSkyCol*uWinSky*s*.022*vec3(1.05, .82, .58);   // through amber glass
  if (uChand > .003) E += uCandleCol*uChand*pointLight(P, N, vec3(0., 6.4, 0.), .08)*1.2;
  return E;
}
`;
export function castleLighting(src) {
  if (!src.includes(SUNVIS_OLD) || !src.includes(SKY_OLD)) throw new Error('LIGHTING moved');
  return src.replace(SUNVIS_OLD, SUNVIS_CASTLE).replace('vec3 irradiance(vec3 P, vec3 N){', CASTLE_SKY + 'vec3 irradiance(vec3 P, vec3 N){')
    .replace(SKY_OLD, SKY_OLD + '  if (uRoom < .5) E += castleSky(P, N);\n');
}
// defines three adds for its own materials sampling a PMREM target (WebGLPrograms, r160)
export function cubeUVDefines(tex) {
  const h = tex.image.height; const maxMip = Math.log2(h) - 2; const texelH = 1/h; const texelW = 1/(3*Math.max(Math.pow(2, maxMip), 7*16));
  return { ENVMAP_TYPE_CUBE_UV: '', CUBEUV_TEXEL_WIDTH: texelW, CUBEUV_TEXEL_HEIGHT: texelH, CUBEUV_MAX_MIP: maxMip.toFixed(1) };
}
// water gilding that reflects a real interior instead of a painted gradient
function goldFresco(uniforms, gold) {
  let fs = castleLighting(FRESCO_FS);
  fs = fs.replace('vec3 lin(float r, float g, float b)', 'uniform sampler2D tEnv; uniform float uEnvK;\n#include <cube_uv_reflection_fragment>\nvec3 lin(float r, float g, float b)');
  const old = 'col = leaf*b*(.55*smoothstep(0., .5, e) + .62*e)*(1. + .5*fr) + vec3(1.6, 1.35, .95)*sp*smoothstep(.1, .7, e) + leaf*.35*fr*e;';
  if (!fs.includes(old)) throw new Error('gold shader moved');
  fs = fs.replace(old, `{
      vec3 envS = textureCubeUV(tEnv, Rf, .22).rgb*uEnvK; vec3 envD = textureCubeUV(tEnv, Ng, .9).rgb*uEnvK;
      float F = .55 + .45*fr;
      col = leaf*envS*1.55*F*mix(.75, 1.15, smoothstep(-.4, .5, Rf.y)) + leaf*(E*.20 + envD*.25) + vec3(1.6, 1.35, .95)*sp*smoothstep(.1, .7, e)*.9 + leaf*uCandleCol*uCandle*.10;
    }`);
  const u = { ...uniforms, tEnv: { value: gold.env }, uEnvK: gold.uEnvK };
  return new THREE.ShaderMaterial({ vertexShader: WORLD_VS, fragmentShader: fs, side: THREE.DoubleSide, uniforms: u, defines: cubeUVDefines(gold.env) });
}
// finished posters: their own colour, no light, no haze, and alpha 1 so post.js leaves them ungraded
let CASTLE_TEX = null;
function castleTexFS() {
  if (CASTLE_TEX) return CASTLE_TEX;
  let fs = castleLighting(TEX_FS);
  const r = (a, b) => { if (!fs.includes(a)) throw new Error('poster shader moved: ' + a.slice(0, 40)); fs = fs.replace(a, b); };
  // the exact sRGB curve both ways, so a finished poster comes back out as the file it was
  r('return uSrgb > .5 ? pow(t, vec3(2.2)) : t;', 'return uSrgb > .5 ? mix(t/12.92, pow((t + .055)/1.055, vec3(2.4)), step(.04045, t)) : t;');
  r('vec3 col; float hz = 1.;', 'vec3 col; float hz = 1.; float pm = 0.;');
  r('col = t*mix(1., k, .55); hz = .4;', 'col = t; hz = 0.; pm = 1.;');
  r('col = mix(sino, col, mask);', 'col = mix(sino, col, mask); pm = mask;');
  r('if (uReveal < .004) col = ground*E;', 'if (uReveal < .004) { col = ground*E; pm = 0.; }');
  r('gl_FragColor = vec4(col, 1.);', 'gl_FragColor = vec4(col, pm);');
  return (CASTLE_TEX = fs);
}

export function cropFor(map, want) {
  const img = map && map.image; const w = img ? (img.videoWidth || img.width) : 0, h = img ? (img.videoHeight || img.height) : 0;
  const ar = w && h ? w/h : want; return new THREE.Vector2(Math.min(1, want/ar), Math.min(1, ar/want));
}

// kind: 0 finished poster, 1 painted surface lit by the room, 2 red-chalk study, 3 glazed roundel
export function texMaterial(map, kind = 0, opts = {}) {
  const img = map && map.image; const want = opts.aspect ?? (img ? img.width/img.height : 0.5625);
  const m = new THREE.ShaderMaterial({ vertexShader: WORLD_VS, fragmentShader: CASTLE ? castleTexFS() : TEX_FS, side: opts.side ?? THREE.DoubleSide,
    uniforms: { ...LIGHT, map: { value: map }, uKind: { value: kind }, uTexel: { value: new THREE.Vector2(1/(img?.width || 720), 1/(img?.height || 1280)) },
      uSeed: { value: opts.seed ?? 1 }, uFloor: { value: opts.floor ?? 0 }, uCrop: { value: cropFor(map, want) },
      uReveal: { value: opts.reveal ?? 1 }, uRevealMode: { value: opts.revealMode ?? 0 }, uSrgb: { value: 0 }, uCell: { value: opts.cell ?? new THREE.Vector4(0, 0, 1, 1) }, uGlaze: { value: opts.glaze ?? 1 }, uFade: { value: 1 } } });
  m.userData.aspect = want;
  return m;
}
export function setMap(mat, map, srgbDecode = false) {
  const img = map.image; const u = mat.uniforms; u.map.value = map; u.uSrgb.value = srgbDecode ? 1 : 0;
  u.uTexel.value.set(1/((img && (img.videoWidth || img.width)) || 720), 1/((img && (img.videoHeight || img.height)) || 1280));
  u.uCrop.value.copy(cropFor(map, mat.userData.aspect));
}

// view-space normal + linear depth, for the ambient occlusion and drawing passes
export function gMaterial() {
  return new THREE.ShaderMaterial({ side: THREE.DoubleSide,
    vertexShader: /* glsl */`varying vec3 vN; varying float vZ; void main(){ vec4 mv = modelViewMatrix*vec4(position, 1.); vN = normalMatrix*normal; vZ = -mv.z; gl_Position = projectionMatrix*mv; }`,
    fragmentShader: /* glsl */`varying vec3 vN; varying float vZ; void main(){ vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n; gl_FragColor = vec4(n, vZ); }` });
}

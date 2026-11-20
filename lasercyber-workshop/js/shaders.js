const NOISE = `
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++) { s += a*vnoise(p); p = p*2.03 + vec2(17.1, 9.2); a *= 0.5; }
  return s;
}
`;

const SEG = `
float segDist(vec2 p, vec2 a, vec2 b){
  vec2 pa = p-a, ba = b-a;
  float h = clamp(dot(pa, ba)/max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba*h);
}
`;

export const VS_QUAD = `#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p*2.0-1.0, 0.0, 1.0);
}`;

// Static surface, drawn once per layout. uMode 0: rust albedo (sqrt-encoded) + rust thickness.
// uMode 1: rust normal xy, brushed-steel streak, low-frequency blotch.
export const FS_BAKE = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform vec2 uRes; uniform float uMm; uniform int uMode;
${NOISE}
float thickness(vec2 p){
  float big = fbm(p*0.012);
  float mid = fbm(p*0.06 + big*2.0);
  float fine = fbm(p*0.33);
  float blister = smoothstep(0.52, 0.74, fbm(p*0.15 + 5.0));
  float grit = vnoise(p*1.6)*0.6 + vnoise(p*3.3 + 11.0)*0.4;
  return clamp(mid*0.56 + fine*0.30 + grit*0.14 + blister*0.22, 0.0, 1.0);
}
void main(){
  vec2 px = vUv*uRes;
  vec2 p = px*uMm;
  float h = thickness(p);
  if (uMode == 0) {
    float big = fbm(p*0.012);
    float mid = fbm(p*0.06 + big*2.0);
    float fine = fbm(p*0.33);
    vec3 dark = vec3(0.022, 0.010, 0.006);
    vec3 brown = vec3(0.085, 0.028, 0.011);
    vec3 orange = vec3(0.215, 0.062, 0.014);
    vec3 ochre = vec3(0.300, 0.130, 0.032);
    vec3 scale = vec3(0.022, 0.026, 0.034);
    vec3 col = mix(brown, orange, smoothstep(0.32, 0.68, mid));
    col = mix(col, ochre, smoothstep(0.55, 0.85, fine)*0.45*smoothstep(0.40, 0.62, big));
    col = mix(col, dark, smoothstep(0.56, 0.26, fbm(p*0.03 + 31.0))*0.85);
    col = mix(col, scale, smoothstep(0.60, 0.78, fbm(p*0.02 + 77.0))*0.75);
    col *= 0.45 + 1.0*h;
    float pit = smoothstep(0.30, 0.12, vnoise(p*2.1 + 50.0));
    col *= 1.0 - 0.55*pit;
    col = mix(vec3(dot(col, vec3(0.3, 0.6, 0.1))), col, 0.88);
    col *= 0.86 + 0.28*hash(px);
    o = vec4(sqrt(col), h);
  } else {
    float e = 0.35;
    vec2 n = vec2(thickness(p-vec2(e,0)) - thickness(p+vec2(e,0)), thickness(p-vec2(0,e)) - thickness(p+vec2(0,e)))*3.0;
    float streak = fbm(vec2(px.x*0.0035, px.y*0.8))*0.60 + vnoise(vec2(px.x*0.018 + 40.0, px.y*1.9))*0.40;
    float scr = vnoise(vec2(px.x*0.0012 + 9.0, px.y*0.33 + px.x*0.004));
    streak = clamp(streak + smoothstep(0.90, 0.97, scr)*0.35 - smoothstep(0.08, 0.02, scr)*0.3, 0.0, 1.0);
    float blotch = fbm(p*0.008 + 3.0);
    o = vec4(clamp(n*0.5+0.5, 0.0, 1.0), streak, blotch);
  }
}`;

// Plate state: r = how much rust has been removed, g = residual heat.
export const FS_SIM = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uPrev;
uniform vec2 uRes, uA, uB;
uniform float uRadius, uOn, uDecay, uSub, uHeat;
${SEG}
void main(){
  vec4 s = texture(uPrev, vUv);
  float d = segDist(vUv*uRes, uA, uB);
  float b = uOn*smoothstep(uRadius, uRadius*0.5, d);
  float clean = s.r + (1.0-s.r)*b;
  float heat = max(max(s.g*uDecay - uSub, 0.0), b*uHeat);
  o = vec4(clean, heat, 0.0, 1.0);
}`;

export const FS_COPY = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uTex;
void main(){ o = texture(uTex, vUv); }`;

export const FS_PLATE = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uState, uRust, uDetail, uText;
uniform vec2 uRes, uLight, uBeamA, uBeamB;
uniform float uLightH, uLightI, uHot, uAim, uTime, uPx;
${SEG}
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
void main(){
  vec2 px = vUv*uRes;
  vec4 st = texture(uState, vUv);
  vec4 rs = texture(uRust, vUv);
  vec4 dt = texture(uDetail, vUv);
  vec4 tx = texture(uText, vUv);
  float heat = st.g;
  // Thick rust lets go last, which gives the cleaned edge its flaky outline.
  float c = smoothstep(0.44, 0.58, st.r + (0.5 - rs.a)*0.62);
  float e = tx.r;

  vec2 gc = vec2(dFdx(c), dFdy(c))*uPx;
  vec2 ge = vec2(dFdx(tx.g), dFdy(tx.g))*uPx;
  vec2 nRust = (dt.rg*2.0-1.0)*1.5;
  vec2 nMetal = vec2(0.0, (dt.b-0.5)*0.20) + ge*7.0;
  vec3 N = normalize(vec3(mix(nRust, nMetal, c) + gc*3.5, 1.0));

  vec3 Lv = vec3(uLight - px, uLightH);
  float att = uLightH*uLightH/dot(Lv, Lv);
  vec3 L = normalize(Lv);
  vec3 K = normalize(vec3(-0.30, 0.50, 0.80));
  float ndl = max(dot(N, L), 0.0), ndk = max(dot(N, K), 0.0);
  vec3 lightCol = mix(vec3(1.0, 0.97, 0.93), vec3(1.0, 0.88, 0.70), uHot);
  float li = uLightI*att;

  vec3 rust = rs.rgb*rs.rgb*(0.10 + 0.62*ndk + lightCol*ndl*li*2.6);

  // Brushed steel: grooves run along x, so highlights smear along y.
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  vec2 d1 = H.xy/H.z - N.xy/N.z;
  float streak = dt.b;
  float grain = 0.45 + 1.1*streak;
  float aniso = exp(-(d1.x*d1.x/0.006 + d1.y*d1.y/1.1));
  float soft = exp(-dot(d1, d1)/0.16);
  // A fixed softbox reflection so the steel reads as steel before the beam gets there.
  float band = (vUv.x*0.82 + vUv.y*0.38 - 0.34 + N.y*0.6)/0.30;
  float box = exp(-band*band);
  vec3 F0 = vec3(0.56, 0.58, 0.62);
  vec3 metal = F0*(0.035 + 0.05*dt.a + 0.03*vUv.y)*grain;
  metal += F0*vec3(0.92, 0.96, 1.0)*box*0.17*grain;
  metal += F0*lightCol*(aniso*sqrt(att)*grain*0.85 + soft*0.30*att)*uLightI;
  metal *= mix(vec3(1.0), vec3(1.0, 0.93, 0.84), rs.a*0.35);
  vec3 etched = vec3(0.006) + vec3(0.03)*ndl*li + F0*0.02*box;
  metal = mix(metal, etched, e*0.95);

  vec3 col = mix(rust, metal, c);
  float rim = 4.0*c*(1.0-c);
  col *= 1.0 - 0.75*rim;

  vec3 ember = vec3(1.0, 0.30, 0.05)*pow(heat, 1.6)*1.1 + vec3(1.0, 0.75, 0.40)*pow(heat, 6.0)*1.4;
  col += ember*(0.06*(1.0-c) + 0.05*c + 1.7*rim)*(0.5 + rs.a);
  col += e*c*vec3(1.0, 0.36, 0.06)*pow(heat, 0.9)*1.3;

  float sd = segDist(px, uBeamA, uBeamB);
  float w = 1.15*uPx, g = 15.0*uPx;
  float core = exp(-sd*sd/(w*w));
  float halo = 1.0/(1.0 + sd*sd/(g*g));
  float fl = 0.8 + 0.4*hash(vec2(uTime*61.0, 3.0));
  col += uHot*fl*(core*vec3(7.0, 7.0, 7.6) + halo*halo*vec3(1.1, 0.52, 0.18));
  col += uAim*(1.0-uHot)*(core*vec3(3.2, 0.08, 0.05) + halo*halo*halo*vec3(0.5, 0.02, 0.01));

  vec2 q = (vUv-0.5)*1.3;
  col *= 1.0 - 0.5*dot(q, q);
  col = pow(aces(col*1.5), vec3(1.0/2.2));
  col += (hash(px + uTime) - 0.5)/255.0;
  o = vec4(col, 1.0);
}`;

export const VS_SPARK = `#version 300 es
layout(location=0) in vec3 aPos;
uniform vec2 uRes;
out float vA;
void main(){
  vA = aPos.z;
  gl_Position = vec4(aPos.xy/uRes*2.0-1.0, 0.0, 1.0);
}`;

export const FS_SPARK = `#version 300 es
precision mediump float;
in float vA; out vec4 o;
void main(){ o = vec4(vec3(1.0, 0.62, 0.24)*vA + vec3(0.5)*vA*vA*vA, 1.0); }`;

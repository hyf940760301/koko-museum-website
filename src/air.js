// What fills a room: the sky seen through its oculus, the shaft of sun, dust in it,
// candle flames, and whatever weather the open altarpiece has let in.
// Everything here follows the shared light rig, so it serves whichever room is lit.
import * as THREE from '../vendor/three/three.module.js';
import { NOISE, LIGHT, LIGHTING, castleLighting } from './materials.js';

const V3 = THREE.Vector3;
export const AIR = {
  uSkyTop: { value: new V3(0.40, 0.64, 0.97) }, uSkyHor: { value: new V3(0.80, 0.90, 1.0) }, uSkyGain: { value: 1.5 },
  uCloud: { value: 0.9 }, uStars: { value: 0 }, uBeam: { value: 1 }, uPx: { value: 800 }, uCenter: { value: new V3() },
};
const PREMUL = { transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendEquation: THREE.AddEquation };

const WEATHER = {
  rain:     { shape: 1, n: 3000, speed: 9.5, sway: 0.03, size: 0.20, alpha: 0.40, add: 0, cols: [[0.80, 0.86, 0.95]] },
  snow:     { shape: 0, n: 2200, speed: 0.55, sway: 0.5, size: 0.055, alpha: 0.92, add: 0, cols: [[1, 1, 1], [0.92, 0.96, 1]] },
  petals:   { shape: 2, n: 720, speed: 0.50, sway: 0.8, size: 0.12, alpha: 1, add: 0, cols: [[0.96, 0.60, 0.10], [0.98, 0.76, 0.20], [0.93, 0.44, 0.10]] },
  leaves:   { shape: 2, n: 520, speed: 0.62, sway: 1.0, size: 0.16, alpha: 1, add: 0, cols: [[0.86, 0.45, 0.16], [0.78, 0.30, 0.14], [0.93, 0.68, 0.25]] },
  bubbles:  { shape: 3, n: 260, speed: -0.20, sway: 0.5, size: 0.24, alpha: 0.75, add: 0.2, cols: [[1, 1, 1], [1, 0.92, 0.96], [0.90, 0.96, 1]] },
  confetti: { shape: 5, n: 820, speed: 0.72, sway: 0.7, size: 0.08, alpha: 1, add: 0, cols: [[0.96, 0.62, 0.66], [0.62, 0.80, 0.93], [0.97, 0.85, 0.50], [0.66, 0.86, 0.72]] },
  sparks:   { shape: 4, n: 620, speed: 0.12, sway: 0.4, size: 0.13, alpha: 1, add: 1, cols: [[1.5, 1.15, 0.6], [1.4, 1.3, 1.0]] },
  glint:    { shape: 4, n: 380, speed: 0.08, sway: 0.5, size: 0.11, alpha: 1, add: 1, cols: [[1.5, 1.3, 0.95], [1.3, 1.4, 1.5]] },
  fluff:    { shape: 0, n: 110, speed: 0.10, sway: 0.9, size: 1.1, alpha: 0.20, add: 0, cols: [[1, 1, 1]] },
};

// opts.castle: the castle hall (?castle=1) - the sky sits over its lantern (uOcu), there is no
// shaft from an oculus (window shafts are step 7), and the dust hangs in the whole hall, showing
// where the clerestory sun catches it.
export function buildAir(opts = {}) {
  const group = new THREE.Group();
  const shared = { ...LIGHT, ...AIR };

  // ---- sky
  const sky = new THREE.Mesh(new THREE.CircleGeometry(1, 64).rotateX(Math.PI/2), new THREE.ShaderMaterial({ side: THREE.DoubleSide, uniforms: shared,
    vertexShader: /* glsl */`varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: /* glsl */`uniform float uTime; uniform vec3 uSkyTop; uniform vec3 uSkyHor; uniform float uSkyGain; uniform float uCloud; uniform float uStars; uniform vec3 uSunCol; varying vec3 vW; ${NOISE}
      void main(){ vec3 d = normalize(vW - cameraPosition); float up = clamp(d.y, 0., 1.);
        vec3 sky = mix(uSkyHor, uSkyTop, pow(up, .8))*uSkyGain;
        vec2 uv = d.xz/max(d.y, .05)*2.2 + vec2(uTime*.01, 0.);
        float c = fbm(vec3(uv*1.2, 3.))*.72 + fbm(vec3(uv*3.3 + 5., 7.))*.28;
        vec3 cl = mix(uSkyHor*1.35 + .12, vec3(1.) , .35)*uSkyGain*1.25;
        sky = mix(sky, cl, smoothstep(.46, .70, c)*.9*uCloud);
        if (uStars > .01) { vec2 g = d.xz/max(d.y, .05)*26.; vec2 id = floor(g); vec2 f = fract(g) - .5; float h = hash12(id);
          vec2 o = (vec2(hash12(id + 3.1), hash12(id + 7.7)) - .5)*.7; float s = smoothstep(.10, .0, length(f - o))*step(.72, h);
          s *= .6 + .4*sin(uTime*(1. + h*3.) + h*40.); sky += vec3(1.3, 1.25, 1.1)*s*uStars*(1. - smoothstep(.46, .70, c)*uCloud)*1.6; }
        gl_FragColor = vec4(sky, 1.); }` }));
  sky.layers.set(1); group.add(sky);

  // ---- the shaft: a sheared column from the oculus down to its pool on the floor
  const bg = new THREE.PlaneGeometry(1, 1, 64, 24); bg.translate(0.5, 0.5, 0);
  const beam = new THREE.Mesh(bg, new THREE.ShaderMaterial({ side: THREE.DoubleSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: shared,
    vertexShader: /* glsl */`uniform vec3 uOcu; uniform float uOcuR; uniform vec3 uSunDir; varying vec3 vW; varying vec3 vN; varying vec2 vUv;
      void main(){ float a = position.x*6.2831853; float y = uOcu.y*(1. - position.y); float k = (y - uOcu.y)/uSunDir.y;
        vN = vec3(cos(a), 0., sin(a)); vW = uOcu + uSunDir*k + vN*uOcuR; vW.y = y; vUv = position.xy; gl_Position = projectionMatrix*viewMatrix*vec4(vW, 1.); }`,
    fragmentShader: /* glsl */`uniform float uTime; uniform vec3 uSunCol; uniform vec3 uOcu; uniform float uBeam; uniform float uRoom; varying vec3 vW; varying vec3 vN; varying vec2 vUv; ${NOISE}
      void main(){ vec3 V = normalize(cameraPosition - vW); float f = pow(abs(dot(normalize(vN), V)), 1.7);
        float streak = .72 + .56*fbm(vec3(cos(vUv.x*6.2832)*2.4, sin(vUv.x*6.2832)*2.4, vUv.y*1.2 + uTime*.02));
        float h = smoothstep(0., .13, vW.y/uOcu.y)*mix(1., .55, smoothstep(.22, .95, vW.y/uOcu.y));
        gl_FragColor = vec4(uSunCol*.085*f*streak*h*uBeam*mix(1., .45, step(.5, uRoom)), 1.); }` }));
  beam.layers.set(1); beam.renderOrder = 5; beam.frustumCulled = false; group.add(beam);
  if (opts.castle) beam.visible = false;

  // ---- the castle's window beams: the sun-side clerestory windows (up to 5 of the 20) each throw a
  // slanted prism of light: the window's glass (0.45 x 1.2 m, centre 6.70 m, on r = 12.45 like
  // sunVisWin) pulled along the sun. Each box is drawn by its back faces only, additive, with the
  // depth test off: the fragment marches the part of its own eye ray inside the box, stopped by the
  // scene's depth from the G buffer (so columns in front hide it), and lights two layers of drifting
  // dust in it. It fades towards the floor, nothing beyond r = 11.95 (inside the wall) counts, and
  // the strength is the preset's beam x the window sun (uWin), so overcast and night stay quiet.
  const NB = 5; const BU = { uBeamTh: { value: new Float32Array(NB) }, uBeamW: { value: new Float32Array(NB) }, uBeamL: { value: 20 }, tDepth: { value: null }, uBeamK: { value: Number(new URLSearchParams(location.search).get('beamk')) || 1 } };   // ?beamk= for tuning
  let beams = null;
  if (opts.castle) {
    const corner = [], idx = [], ind = [];
    for (let b = 0; b < NB; b++) {
      const o = b*8;
      for (let k = 0; k < 8; k++) { corner.push(k & 1 ? 1 : -1, k & 2 ? 1 : -1, k & 4 ? 1 : 0); idx.push(b); }
      // 12 triangles of the box: faces x-, x+, y-, y+, z0, z1
      [[0, 2, 6, 4], [1, 5, 7, 3], [0, 4, 5, 1], [2, 3, 7, 6], [0, 1, 3, 2], [4, 6, 7, 5]].forEach(([a, b2, c, d]) => ind.push(o + a, o + b2, o + c, o + a, o + c, o + d));
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(corner, 3)); g.setAttribute('aI', new THREE.Float32BufferAttribute(idx, 1)); g.setIndex(ind);
    beams = new THREE.Mesh(g, new THREE.ShaderMaterial({ side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, uniforms: { ...shared, ...BU },
      vertexShader: /* glsl */`attribute float aI; uniform vec3 uSunDir; uniform float uBeamTh[${NB}]; uniform float uBeamW[${NB}]; uniform float uBeamL;
        varying vec3 vW; flat varying float vTh; flat varying float vWt;
        void main(){ int i = int(aI + .5); float th = uBeamTh[i]; vTh = th; vWt = uBeamW[i];
          vec3 T = vec3(cos(th), 0., sin(th)), C = vec3(12.45*sin(th), 6.70, -12.45*cos(th));
          vW = C + position.x*.40*T + vec3(0., position.y*.78, 0.) - position.z*uBeamL*uSunDir;
          gl_Position = vWt > .002 ? projectionMatrix*viewMatrix*vec4(vW, 1.) : vec4(0., 0., 2., 1.); }`,
      fragmentShader: /* glsl */`uniform float uTime; uniform vec3 uSunCol; uniform vec3 uSunDir; uniform float uBeam; uniform float uWin; uniform float uBeamL; uniform float uBeamK; uniform sampler2D tDepth;
        varying vec3 vW; flat varying float vTh; flat varying float vWt; ${NOISE}
        void main(){
          vec3 D = uSunDir, T = vec3(cos(vTh), 0., sin(vTh)), C = vec3(12.45*sin(vTh), 6.70, -12.45*cos(vTh));
          mat3 Mi = inverse(mat3(T, vec3(0., 1., 0.), -D));
          vec3 O = cameraPosition, ray = vW - O; float sB = length(ray); vec3 V = ray/sB;
          vec3 q0 = Mi*(O - C), dq = Mi*V;
          vec3 lo = vec3(-.40, -.78, 0.), hi = vec3(.40, .78, uBeamL);
          vec3 t1 = (lo - q0)/dq, t2 = (hi - q0)/dq; vec3 tn = min(t1, t2), tf = max(t1, t2);
          float tEn = max(max(tn.x, tn.y), tn.z), tEx = min(min(tf.x, tf.y), tf.z);
          if (abs(sB - tEx) > abs(sB - tEn)) discard;   // the far face only: one fragment per box per pixel, also from inside it
          float s0 = max(tEn, 0.), s1 = tEx;
          float dz = texture2D(tDepth, gl_FragCoord.xy/vec2(textureSize(tDepth, 0))).a;
          float k = -(viewMatrix*vec4(V, 0.)).z; if (dz > 0. && k > 1e-4) s1 = min(s1, dz/k);
          if (s1 <= s0) discard;
          float I = 0., ds = (s1 - s0)/10.;
          for (int j = 0; j < 10; j++) {
            float s = s0 + (float(j) + .5)*ds; vec3 P = O + V*s, q = q0 + dq*s;
            if (P.y < 0. || dot(P.xz, P.xz) > 11.95*11.95) continue;
            // the window's shape at this depth: 0.45 wide, 6.10 - 7.30 with its round head, softening with distance
            float pen = .03 + .012*q.z, y = 6.70 + q.y;
            float hy = y > 7.075 ? .225*sqrt(max(0., 1. - pow((y - 7.075)/.225, 2.))) : .225;
            float m = (1. - smoothstep(hy - pen, hy + pen, abs(q.x)))*smoothstep(6.10 - pen, 6.10 + pen, y)*(1. - smoothstep(7.30 - pen, 7.30 + pen, y));
            // two layers of dust, drifting slowly
            float d1 = vnoise(P*1.1 + vec3(uTime*.035, uTime*.012, 0.)), d2 = vnoise(P*3.7 + vec3(0., -uTime*.05, uTime*.02));
            float dust = .45 + .75*d1*d1 + .35*d2;
            I += m*dust*mix(.25, 1., smoothstep(0., 3.2, P.y));
          }
          I *= ds;
          float phase = 1. + 1.6*pow(max(dot(V, D), 0.), 5.);   // brighter looking up towards the window
          vec3 col = uSunCol*vec3(1.0, .80, .55)*I*phase*uBeam*uWin*vWt*.13*uBeamK;
          gl_FragColor = vec4(col, 1.); }` }));
    beams.layers.set(1); beams.renderOrder = 4; beams.frustumCulled = false; group.add(beams);
  }
  const BAYA = Math.PI/10;
  const aimBeams = () => {
    const D = LIGHT.uSunDir.value; const h = Math.hypot(D.x, D.z); const th0 = Math.atan2(D.x, -D.z), k0 = Math.round(th0/BAYA);
    BU.uBeamL.value = Math.min(6.7/Math.max(D.y, 0.05) + 1.5, 30);
    const on = LIGHT.uRoom.value < 0.5 && D.y > 0.02 && h > 0.05 && LIGHT.uWin.value*AIR.uBeam.value > 0.01;
    for (let j = 0; j < NB; j++) { const th = (k0 + j - 2)*BAYA; BU.uBeamTh.value[j] = th; const dA = Math.abs(th - th0); BU.uBeamW.value[j] = on ? Math.max(0, 1 - dA/0.75)**1.5 : 0; }
    beams.visible = on;
  };

  // ---- dust
  const N = 900; const pos = new Float32Array(N*3), rnd = new Float32Array(N*4);
  let seed = 9173; const rand = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; };
  for (let i = 0; i < N*3; i++) pos[i] = rand(); for (let i = 0; i < N*4; i++) rnd[i] = rand();
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); dg.setAttribute('aR', new THREE.BufferAttribute(rnd, 4));
  const dust = new THREE.Points(dg, new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: shared,
    vertexShader: opts.castle ? /* glsl */`attribute vec4 aR; uniform float uPx; varying float vA; ${castleLighting(LIGHTING)}
      void main(){ float t = uTime*(.05 + .08*aR.x); float a = position.x*6.2831853, q = sqrt(position.z)*10.8;
        vec3 p = vec3(cos(a)*q, .3 + position.y*7.2, sin(a)*q);
        p += vec3(sin(t*1.3 + aR.y*40.), sin(t + aR.z*40.)*.7, cos(t*1.1 + aR.w*40.))*.35; p.y += sin(uTime*.03 + aR.x*6.283)*.4;
        vec4 mv = viewMatrix*vec4(p, 1.); gl_Position = projectionMatrix*mv;
        float s = mix(.010, .028, aR.z*aR.z); gl_PointSize = max(1.5, s*uPx/-mv.z);
        vA = (sunVis(p)*2.2 + .02)*(.4 + .6*aR.w)*smoothstep(.3, 1.5, -mv.z); }` : /* glsl */`attribute vec4 aR; uniform float uPx; varying float vA; ${LIGHTING}
      void main(){ float t = uTime*(.05 + .08*aR.x); float top = min(uOcu.y, 10.); float y = position.y*top; float k = (y - uOcu.y)/uSunDir.y; vec3 p;
        if (aR.y < .72) { float a = position.x*6.2831853, q = sqrt(position.z)*uOcuR*1.15; p = uOcu + uSunDir*k + vec3(cos(a), 0., sin(a))*q; p.y = y; }
        else { p = vec3(uPool.x + (position.x - .5)*uOcuR*5.5, y*.7, uPool.z + (position.z - .5)*uOcuR*5.); }
        p += vec3(sin(t*1.3 + aR.y*40.), sin(t + aR.z*40.)*.7, cos(t*1.1 + aR.w*40.))*.14*uOcuR; p.y += sin(uTime*.03 + aR.x*6.283)*.4;
        vec4 mv = viewMatrix*vec4(p, 1.); gl_Position = projectionMatrix*mv;
        float s = mix(.010, .028, aR.z*aR.z); gl_PointSize = max(1.5, s*uPx/-mv.z);
        vA = (sunVis(p)*1.0 + .05)*(.4 + .6*aR.w)*smoothstep(.3, 1.5, -mv.z); }`,
    fragmentShader: /* glsl */`uniform vec3 uSunCol; uniform float uBeam; varying float vA;
      void main(){ vec2 q = gl_PointCoord - .5; float d = dot(q, q)*4.; float a = exp(-d*5.)*vA; gl_FragColor = vec4(uSunCol*.34*a*uBeam, 1.); }` }));
  dust.layers.set(1); dust.frustumCulled = false; dust.renderOrder = 6; group.add(dust);

  // ---- weather
  const WN = 3000; const wp = new Float32Array(WN*3), wr = new Float32Array(WN*4);
  for (let i = 0; i < WN*3; i++) wp[i] = rand(); for (let i = 0; i < WN*4; i++) wr[i] = rand();
  const wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.BufferAttribute(wp, 3)); wg.setAttribute('aR', new THREE.BufferAttribute(wr, 4));
  const wu = { ...shared, uShape: { value: 0 }, uAmount: { value: 0 }, uSpeed: { value: 1 }, uSway: { value: 0.5 }, uSize: { value: 0.05 }, uAlpha: { value: 1 }, uAdd: { value: 0 },
    uCols: { value: [new V3(1, 1, 1), new V3(1, 1, 1), new V3(1, 1, 1), new V3(1, 1, 1)] }, uNCol: { value: 1 } };
  const weather = new THREE.Points(wg, new THREE.ShaderMaterial({ ...PREMUL, uniforms: wu,
    vertexShader: /* glsl */`attribute vec4 aR; uniform float uPx; uniform float uTime; uniform float uSpeed; uniform float uSway; uniform float uSize; uniform float uShape; uniform float uAmount;
      uniform vec3 uCols[4]; uniform float uNCol; uniform vec3 uCenter;
      varying vec4 vC; varying float vRot; varying float vFlip;
      void main(){ float H = 7.5; float S = 9.;
        float fall = uTime*uSpeed*(.7 + .6*aR.x) + position.y*H; float y = H - mod(fall, H);
        vec2 cxz = cameraPosition.xz; vec2 rel = mod(position.xz*S - cxz + S*.5, S) - S*.5;
        vec3 p = vec3(cxz.x + rel.x, y, cxz.y + rel.y);
        float t = uTime*(.35 + .5*aR.y);
        p.x += sin(t + aR.z*40.)*uSway*(.4 + aR.w); p.z += cos(t*.8 + aR.x*40.)*uSway*(.4 + aR.w);
        vec4 mv = viewMatrix*vec4(p, 1.); gl_Position = projectionMatrix*mv;
        float s = uSize*(.6 + .8*aR.z); gl_PointSize = max(1.5, s*uPx/-mv.z);
        float fade = smoothstep(0., .5, y)*smoothstep(H, H - 2.5, y)*smoothstep(.8, 2.4, -mv.z);
        fade *= step(aR.w, uAmount*1.001)*smoothstep(0., .25, uAmount);
        fade *= (1. - smoothstep(10.9, 11.6, length(p.xz - uCenter.xz)))*(1. - smoothstep(S*.5 - 1.2, S*.5, max(abs(rel.x), abs(rel.y))));
        if (uShape > 3.5 && uShape < 4.5) fade *= .35 + .65*pow(.5 + .5*sin(uTime*(1.5 + 3.*aR.y) + aR.x*60.), 3.);
        int ci = int(mod(floor(aR.y*97.), uNCol)); vC = vec4(uCols[ci], fade);
        vRot = aR.z*6.28 + uTime*(aR.x - .5)*2.4; vFlip = .35 + .65*abs(sin(uTime*(1. + aR.w*2.) + aR.y*30.)); }`,
    fragmentShader: /* glsl */`uniform float uShape; uniform float uAlpha; uniform float uAdd; uniform vec3 uAmbUp; uniform vec3 uSkyCol; uniform float uCandle; varying vec4 vC; varying float vRot; varying float vFlip;
      void main(){ vec2 q = gl_PointCoord - .5; float a = 0.; float c = cos(vRot), s = sin(vRot); vec2 r = vec2(c*q.x - s*q.y, s*q.x + c*q.y);
        if (uShape < .5) a = exp(-dot(q, q)*18.);
        else if (uShape < 1.5) a = smoothstep(.035, .0, abs(q.x))*smoothstep(.5, .15, abs(q.y));
        else if (uShape < 2.5) { vec2 e = r*vec2(1., 1./vFlip); a = 1. - smoothstep(.40, .46, length(e*vec2(1., 2.1)) + abs(e.x)*.35); }
        else if (uShape < 3.5) { float d = length(q)*2.; a = smoothstep(1., .92, d)*(.10 + .9*smoothstep(.70, .98, d)) + smoothstep(.16, .0, length(q - vec2(-.16, -.18)))*.8; }
        else if (uShape < 4.5) { float d = pow(abs(r.x), .55) + pow(abs(r.y), .55); a = smoothstep(.78, .25, d); a += exp(-dot(q, q)*60.); }
        else { vec2 e = abs(r*vec2(1., 1./vFlip)); a = step(e.x, .30)*step(e.y, .18); }
        float lit = clamp(dot(uAmbUp, vec3(.5)) + dot(uSkyCol, vec3(.03)) + uCandle*.35, .18, 1.05);
        a = clamp(a, 0., 1.)*vC.a*uAlpha; vec3 col = vC.rgb*mix(lit, 1., uAdd);
        gl_FragColor = vec4(col*a, a*(1. - uAdd)); }` }));
  weather.layers.set(1); weather.frustumCulled = false; weather.renderOrder = 7; weather.visible = false; group.add(weather);
  const wState = { kind: null, want: null, amount: 0 };
  const applyKind = (k) => { const w = WEATHER[k]; if (!w) return; wu.uShape.value = w.shape; wu.uSpeed.value = w.speed; wu.uSway.value = w.sway; wu.uSize.value = w.size; wu.uAlpha.value = w.alpha; wu.uAdd.value = w.add;
    w.cols.forEach((c, i) => wu.uCols.value[i].set(...c)); wu.uNCol.value = w.cols.length; wg.setDrawRange(0, w.n); };

  // ---- candle flames
  const flames = new THREE.Points(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ ...PREMUL, uniforms: { ...shared, uLit: { value: 0 } },
    vertexShader: /* glsl */`attribute float aS; attribute float aK; uniform float uPx; uniform float uTime; varying float vS; varying float vK;
      void main(){ vec4 mv = viewMatrix*vec4(position, 1.); gl_Position = projectionMatrix*mv; gl_PointSize = max(2., .42*(aK > .5 ? .5 : 1.)*uPx/-mv.z); vS = aS; vK = aK; }`,
    fragmentShader: /* glsl */`uniform float uTime; uniform float uCandle; uniform float uLit; uniform float uChand; varying float vS; varying float vK; ${NOISE}
      void main(){ vec2 q = (gl_PointCoord - .5)*vec2(1., -1.); float fl = vnoise(vec3(uTime*6., vS*10., 0.));
        vec2 f = q*vec2(11., 5.2) - vec2((fl - .5)*.5*(q.y + .1)*6., -.25);
        float body = smoothstep(1., .25, length(vec2(f.x*(1. + max(f.y, 0.)*1.3), f.y)));
        float glow = exp(-dot(q, q)*26.)*.20*(.8 + .4*fl);
        vec3 col = vec3(1.9, 1.25, .45)*body*(1.1 + .4*fl) + vec3(1.2, .62, .22)*glow;
        float k = vK > .5 ? uChand : max(max(uCandle, 0.), uLit); gl_FragColor = vec4(col*k, 0.); }` }));   // vK: a candle of the castle's chandelier
  flames.layers.set(1); flames.frustumCulled = false; flames.renderOrder = 8; group.add(flames);

  return {
    group, sky, flames,
    // tell the air which oculus it serves
    place(skyLift = 0.5) { const o = LIGHT.uOcu.value; sky.position.set(o.x, o.y + skyLift, o.z); sky.scale.setScalar(LIGHT.uOcuR.value/0.96 + 0.12); },
    // points, and which of them are the castle chandelier's candles (kinds[i] = 1: smaller, lit by uChand)
    setFlames(points, kinds = null) { const p = new Float32Array(points.length*3), s = new Float32Array(points.length), kk = new Float32Array(points.length); points.forEach((v, i) => { p[i*3] = v.x; p[i*3 + 1] = v.y; p[i*3 + 2] = v.z; s[i] = (i*0.618) % 1; kk[i] = kinds ? kinds[i] : 0; });
      flames.geometry.dispose(); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('aS', new THREE.BufferAttribute(s, 1)); g.setAttribute('aK', new THREE.BufferAttribute(kk, 1)); flames.geometry = g; },
    setViewport(hPx, fovDeg) { AIR.uPx.value = hPx/(2*Math.tan(fovDeg*Math.PI/360)); },
    setWeather(kind) { wState.want = WEATHER[kind] ? kind : null; },
    setDepth(tex) { BU.tDepth.value = tex; },
    update(dt) {
      if (beams) aimBeams();
      if (wState.kind !== wState.want) { wState.amount -= dt*1.2; if (wState.amount <= 0) { wState.amount = 0; wState.kind = wState.want; applyKind(wState.kind); } }
      else if (wState.kind) wState.amount = Math.min(1, wState.amount + dt*0.5);
      wu.uAmount.value = wState.amount; weather.visible = wState.amount > 0.001 && !!wState.kind;
    },
    snapWeather() { wState.kind = wState.want; applyKind(wState.kind); wState.amount = wState.kind ? 1 : 0; wu.uAmount.value = wState.amount; weather.visible = !!wState.kind; },
  };
}

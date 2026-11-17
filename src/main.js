// KOKO · MVSEVM
// A round hall of nineteen hinged altarpieces and, through the door opposite, a study.
//   ?capture=1   deterministic stills: await window.__set({...})
//   ?skip=1      go straight in, without the prologue
//   ?all=1       as if every roundel had been earned (nothing is saved)
import * as THREE from '../vendor/three/three.module.js';
import { buildRotunda, bayMatrix, K, cyl, sconcePoints, buildDoorLeaves } from './rotunda.js';
import { frescoMaterial, texMaterial, LIGHT, setCastle } from './materials.js';
import { Triptych } from './triptych.js';
import { buildAir, AIR } from './air.js';
import { Post } from './post.js';
import { friezeTexture, lunetteTexture, plateTexture, grotesqueTexture, tondoAtlas, doorFriezeTexture } from './textures.js';
import { SERIES, byBay, asset } from './series.js';
import { buildStudiolo, SO } from './studiolo.js';
import { Daylight } from './light.js';
import { Sound } from './audio.js';
import { buildPrologue } from './prologue.js';
import { buildUI, CN } from './ui.js';

const V3 = THREE.Vector3;
const Q = new URLSearchParams(location.search);
const CAPTURE = Q.has('capture'), ALL = Q.has('all'), SKIP = Q.has('skip') || CAPTURE;
// ?castle=1: the warm castle rework (src/castle.js): stone bays round the hall and the castle door. Without it nothing below changes.
const CASTLE = Q.has('castle'); let castle = null;
const FIXED = Q.has('fixed');   // qa/bench.mjs: hold full sharpness so frame times compare like for like
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const easeIO = (t) => (t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const body = document.body;

// ---------------------------------------------------------------- what is remembered between visits
const KEY = 'koko-museum-v1';
const store = { d: { earned: [], seen: {}, muted: false, visits: 0 },
  load() { try { Object.assign(this.d, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* private mode */ } this.d.earned ||= []; this.d.seen ||= {}; },
  save() { if (ALL || CAPTURE) return; try { localStorage.setItem(KEY, JSON.stringify(this.d)); } catch (e) { /* private mode */ } } };
store.load();
const earned = new Set(ALL ? SERIES.map((s) => s.id) : CAPTURE ? [] : store.d.earned.filter((id) => SERIES.some((s) => s.id === id)));
const seenAll = ALL || CAPTURE;
const isSeen = (s, idx) => seenAll || (store.d.seen[s.id] || []).includes(String(idx));

// ---------------------------------------------------------------- renderer
const canvas = document.getElementById('c');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: CAPTURE }); }
catch (e) { body.classList.add('nogl'); throw e; }
if (!renderer.capabilities.isWebGL2) { body.classList.add('nogl'); throw new Error('webgl2'); }
renderer.outputColorSpace = THREE.LinearSRGBColorSpace; renderer.toneMapping = THREE.NoToneMapping;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.08, 140);
const post = new Post(renderer);
const daylight = new Daylight();
const sound = new Sound(!!store.d.muted);

// ---------------------------------------------------------------- state
const S = { phase: 'loading', room: 'rotunda', mode: 'look', bay: 0, panel: 1, shot: null, video: null, walk: null, busy: false, skip: false,
  yaw: 0, pitch: 0.07, yawT: 0, pitchT: 0.07, vyaw: 0, hover: null, hoverPanel: null, hoverHit: null, ringHover: null, doorT: 0, door: 0, timeMode: 0, hinted: {} };
const B = new Array(K.NB).fill(null);       // one entry per bay that holds an altarpiece
const ROOM = { rotunda: { id: 0, ocu: new V3(0, K.yOc + 0.5, 0), ocuR: K.ro*0.96, centre: new V3(), radius: 12.6 }, studio: null };
const EYE = 1.62, FWD = 3.4, REVEAL = REDUCED ? 0.8 : 3.8;
let ui = null, air = null, studio = null, doors = null, atlas = null, rot = null, T = 0;

// ---------------------------------------------------------------- small clockwork: tweens and waits that run on the frame clock
const tweens = [], waiters = [];
const tween = (dur, fn, ease = easeIO) => new Promise((res) => tweens.push({ t: 0, dur: Math.max(1e-3, REDUCED ? dur*0.35 : dur), fn, ease, res }));
const wait = (s) => tween(s, () => {});
const until = (cond) => new Promise((res) => waiters.push([cond, res]));
function runClock(dt) {
  for (let i = tweens.length - 1; i >= 0; i--) { const w = tweens[i]; w.t = S.skip ? w.dur : Math.min(w.dur, w.t + dt); w.fn(w.ease(w.t/w.dur)); if (w.t >= w.dur) { tweens.splice(i, 1); w.res(); } }
  for (let i = waiters.length - 1; i >= 0; i--) if (waiters[i][0]()) { const [, res] = waiters.splice(i, 1)[0]; res(); }
}

// ---------------------------------------------------------------- textures
const loader = new THREE.TextureLoader(); const cache = new Map();
const tex = (url) => { if (!cache.has(url)) cache.set(url, loader.loadAsync(url).then((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; })); return cache.get(url); };
const image = (url) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
// the fitting photo at half size is plenty for the chalk study on a closed altarpiece
function studyTexture(img) { const c = document.createElement('canvas'); c.width = Math.round(img.width/2); c.height = Math.round(img.height/2); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
const loadOne = (url) => tex(url).catch(() => { cache.delete(url); return null; });
function loadPics(b) {
  if (!b.picsP) {
    const wantQ = b.s.sets.flat().includes('q');
    const jobs = b.s.titles.map((_, i) => loadOne(asset(b.s, `p${i + 1}.jpg`)));
    if (wantQ) jobs.push(loadOne(asset(b.s, 'q.jpg')));
    b.picsP = Promise.all(jobs).then((a) => { b.qFull = wantQ ? a.pop() : null; b.pics = a; return b; });
  }
  return b.picsP;
}
function applySet(b, n, instant = false) {
  b.set = n; b.revClock = 0;
  const done = instant ? 1 : 0;
  b.s.sets[n].forEach((idx, i) => { b.tri.setPicture(i, idx === 'q' ? b.qFull : b.pics[idx]); b.rev[i] = done; b.tri.setReveal(i, done); });
  b.applied = true;
}
const restOpen = (b) => (b.k === 0 ? 1 : 0);

// ---------------------------------------------------------------- build
async function build(progress) {
  // ?castle=1: its downloads start now and count in the opening's progress (castle.js preload)
  const castleMod = CASTLE ? await import('./castle.js') : null;
  let done = 0; const total = SERIES.length + 5 + (castleMod ? castleMod.FILES : 0); const tickP = (p) => p.then((v) => { progress(++done/total); return v; });
  const castleP = castleMod ? castleMod.preload(renderer, tickP) : null;
  // the castle hall: the sky comes through the lantern of the vault, the sun through the clerestory
  if (CASTLE) { Object.assign(ROOM.rotunda, castleMod.HALL); daylight.castle = { chandelier: castleMod.CHANDELIER }; }
  const [qs, front, turn] = await Promise.all([Promise.all(SERIES.map((s) => tickP(image(asset(s, 'q.jpg'))))), tickP(image('./assets/study/front.jpg')), tickP(image('./assets/study/turnaround.jpg')),
    ...['p1.jpg', 'p2.jpg', 'p3.jpg'].map((f) => tickP(tex(asset(SERIES[0], f))))]);

  const repeat = (t, srgb) => { t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t; };
  const ph = (name) => loader.loadAsync('./assets/tex/ph/' + name);
  const [wood, woodN, plaster, plasterN, marble, marbleN, floor, floorN] = await Promise.all([ph('oak_diff.jpg'), ph('oak_nor.jpg'), ph('stucco_diff.jpg'), ph('stucco_nor.jpg'), ph('marble_diff.jpg'), ph('marble_nor.jpg'), ph('terrazzo_diff.jpg'), ph('terrazzo_nor.jpg')]);
  let env = null, castleAssets = null;
  if (CASTLE) { castleAssets = await castleP; setCastle(true); env = await castleMod.loadEnv(renderer, castleAssets); }
  const fresco = frescoMaterial(friezeTexture(), { wood: repeat(wood, false), woodN: repeat(woodN, false), plaster: repeat(plaster, false), plasterN: repeat(plasterN, false), marble: repeat(marble, false), marbleN: repeat(marbleN, false), floor: repeat(floor, false), floorN: repeat(floorN, false) });
  rot = new THREE.Group(); scene.add(rot);
  rot.add(new THREE.Mesh(CASTLE ? buildRotunda({ skip: Array.from({ length: K.NB }, (_, k) => k), noFloor: castleMod.FLOOR, noUpper: true }) : buildRotunda(), fresco));
  // castle bays: the gilding reflects the room's light instead of a painted gradient
  const gilt = CASTLE ? frescoMaterial(fresco.uniforms.tFrieze.value, { wood: fresco.uniforms.tWood.value, woodN: fresco.uniforms.tWoodN.value, plaster: fresco.uniforms.tPlaster.value, plasterN: fresco.uniforms.tPlasterN.value, marble: fresco.uniforms.tMarble.value, marbleN: fresco.uniforms.tMarbleN.value, floor: fresco.uniforms.tFloor.value, floorN: fresco.uniforms.tFloorN.value }, { gold: { env, uEnvK: castleMod.PBR.uEnvK } }) : null;
  atlas = tondoAtlas(SERIES.map((s) => s.id));
  const lunette = lunetteTexture(); const tondoGeo = new THREE.CircleGeometry(0.45, 56);
  const grotMat = texMaterial(grotesqueTexture(), 1, { aspect: 0.25/3.8 }); const grotGeo = new THREE.PlaneGeometry(0.25, 3.8);
  for (let k = 0; k < K.NB; k++) {
    const th = k*K.BAY;
    if (!CASTLE) { const gp = new THREE.Mesh(grotGeo, grotMat); gp.applyMatrix4(bayMatrix(th + K.BAY/2, K.R - 0.1155, 3.2)); rot.add(gp); }
    const s = byBay(k); if (!s) continue;
    const got = earned.has(s.id);
    const tondo = new THREE.Mesh(tondoGeo, texMaterial(atlas.texture, 3, { cell: atlas.cell(s.index), glaze: got ? 1 : 0, seed: k + 1.3, aspect: 1 }));
    tondo.applyMatrix4(bayMatrix(th, K.R - 0.022, K.yTondo)); rot.add(tondo);
    const tri = new Triptych(CASTLE ? gilt : fresco, { wide: !!s.wide, sketch: studyTexture(qs[s.index]), lunette, plate: plateTexture(s.latin, `N° ${s.no} · MMXXVI`), seed: k + 1, floor: 0.07 });
    tri.panels.forEach((m, i) => { m.material.uniforms.uRevealMode.value = REDUCED ? -1 : (s.mood.light === 'night' ? 3 : (s.index * 3 + i) % 4); });
    tri.group.applyMatrix4(bayMatrix(th, K.R + 0.40, K.ySill + tri.D.originY)); rot.add(tri.group);
    LIGHT.uWideA.value[k] = tri.D.HW;
    B[k] = { s, k, tri, tondo, open: 0, openT: 0, peek: 0, glaze: got ? 1 : 0, glazeT: got ? 1 : 0, set: 0, rev: [0, 0, 0], dim: [1, 1, 1], revClock: 0, applied: false, pics: null, qFull: null, picsP: null, drawn: [-1, -1], armReveal: false };
  }
  // the door to the study, with its name cut over the lintel
  doors = buildDoorLeaves(fresco); rot.add(doors.group);
  const fz = new THREE.Mesh(new THREE.PlaneGeometry(2*K.dw + 0.36, 0.25), texMaterial(doorFriezeTexture('STVDIOLO'), 1, { aspect: (2*K.dw + 0.36)/0.25 }));
  fz.applyMatrix4(bayMatrix(K.door*K.BAY, K.R - 0.083, K.dh + 0.37)); if (!CASTLE) rot.add(fz);   // the castle cuts it into the lintel

  studio = buildStudiolo(fresco, atlas, front, turn); studio.onBounce = () => sound.play('tock'); studio.group.visible = false; scene.add(studio.group);
  ROOM.studio = { id: 1, ocu: studio.ocu, ocuR: studio.ocuR, centre: SO.clone(), pool: studio.pool };
  SERIES.forEach((s) => studio.setEarned(s.index, earned.has(s.id)));

  air = buildAir(CASTLE ? { castle: true } : undefined); scene.add(air.group);
  if (CASTLE) { castle = await castleMod.buildCastle(renderer, env, castleAssets, { doors }); if (CAPTURE || Q.has('bench')) window.__castle = castle; rot.add(castle.group); castleMod.alphaDiscipline(scene); const gq = Q.has('grade') ? Q.get('grade').split(',').map(Number) : []; post.castle({ ev: gq[0] ?? castleMod.GRADE.ev, pow: gq[1] || castleMod.GRADE.pow, sat: gq[2] || castleMod.GRADE.sat }); }
  // the first altarpiece is ready before anyone walks in
  const b0 = B[0]; await loadPics(b0);
  const shown = isSeen(b0.s, 0) || SKIP;
  applySet(b0, 0, shown);
  if (shown) { b0.open = b0.openT = 1; b0.armReveal = true; }
  enterRoom('rotunda');
}

function enterRoom(name) {
  S.room = name; const r = ROOM[name]; rot.visible = name === 'rotunda'; studio.group.visible = name === 'studio';
  daylight.setRoom(r); air.place(0.5); air.setWeather(null); air.snapWeather();
  if (name === 'rotunda') { air.setFlames(sconcePoints()); air.flames.material.uniforms.uLit.value = 0; }
  else { air.setFlames([studio.flame]); air.flames.material.uniforms.uLit.value = 0.9; LIGHT.uLampA.value.set(studio.flame.x, studio.flame.y, studio.flame.z, LIGHT.uLampA.value.w); LIGHT.uLampB.value.set(studio.lampB.x, studio.lampB.y, studio.lampB.z, LIGHT.uLampB.value.w); }
  S.mode = 'look'; S.shot = null; S.hover = S.hoverPanel = S.hoverHit = null; S.yaw = S.yawT = 0; S.pitch = S.pitchT = name === 'rotunda' ? restPitch() : 0.02; S.vyaw = 0;
  daylight.snap();
}

// ---------------------------------------------------------------- roundels
function markSeen(b) {
  const list = (store.d.seen[b.s.id] ||= []); let ch = false;
  for (const idx of b.s.sets[b.set]) if (!list.includes(String(idx))) { list.push(String(idx)); ch = true; }
  if (ch) store.save();
}
function earn(s, quiet = false) {
  if (earned.has(s.id)) return; earned.add(s.id); const b = B[s.bay];
  b.glazeT = 1; studio.setEarned(s.index, true);
  if (!ALL && !CAPTURE) { store.d.earned = [...earned]; store.save(); }
  if (quiet) { b.glaze = 1; b.tondo.material.uniforms.uGlaze.value = 1; return; }
  sound.play('medal'); ui.count(earned.size, true); ui.ringState(facing(), gotBays());
  ui.toast({ img: atlas.dataURL(s.index), title: '得圆章一枚', text: `${s.name} · 第 ${earned.size} 枚，共十九枚` });
  if (earned.size === SERIES.length) { setTimeout(() => { sound.play('all'); ui.toast({ title: '十九枚圆章齐了', text: '书房里那扇圆门，可以打开了' }, 6500); }, 2600); }
  syncUI();
}
const gotBays = () => new Set(SERIES.filter((s) => earned.has(s.id)).map((s) => s.bay));

// ---------------------------------------------------------------- moving about the rotunda
const wrap = (a) => { a %= Math.PI*2; if (a > Math.PI) a -= Math.PI*2; if (a < -Math.PI) a += Math.PI*2; return a; };
const facing = () => ((Math.round((S.mode === 'look' ? S.yawT : S.bay*K.BAY)/K.BAY) % K.NB) + K.NB) % K.NB;
function faceBay(k, snap = false) { S.yawT = S.yaw + wrap(k*K.BAY - S.yaw); S.pitchT = restPitch(); S.vyaw = 0; if (snap) { S.yaw = S.yawT; S.pitch = S.pitchT; } }
function stepBay(k, dir) { do { k = (k + dir + K.NB) % K.NB; } while (!B[k]); return k; }
function closeBay(b) { if (!b) return; if (b.openT > restOpen(b) && b.open > 0.3) sound.play('close'); b.openT = restOpen(b); }

function focus(k) {
  const b = B[k]; if (!b || S.busy) return;
  if (S.video) stopVideo();
  if (S.mode !== 'look' && S.bay !== k) closeBay(B[S.bay]);
  S.mode = 'focus'; S.bay = k; S.panel = 1; S.hover = null; faceBay(k); rig.rate = 0.5; sound.play('step');
  loadPics(b).then(() => {
    if (S.room !== 'rotunda' || S.mode === 'look' || S.bay !== k) return;
    if (b.open < 0.02) applySet(b, 0);
    if (b.open < 0.5) sound.play('open'); b.openT = 1; syncUI();
  });
  if (!S.hinted.focus) { S.hinted.focus = true; ui.hint('画屏打开以后，再点其中一张，可以正对着细看', 8000); } else ui.hint(null);
  syncUI();
}
function inspect(i) { const b = B[S.bay]; if (!b || b.open < 0.6) return; S.mode = 'inspect'; S.panel = clamp(i, 0, 2); rig.rate = 0.5; ui.hint(null); syncUI(); }
function toLook() { if (S.video) stopVideo(); closeBay(B[S.bay]); S.mode = 'look'; S.hover = null; rig.rate = 0.5; syncUI(); }
function back() {
  if (ui.closeSheet()) return true;
  if (S.busy) return false;
  if (S.room === 'rotunda') { if (S.mode === 'inspect') { if (S.video) stopVideo(); S.mode = 'focus'; rig.rate = 0.5; syncUI(); return true; } if (S.mode === 'focus') { toLook(); return true; } return false; }
  if (S.mode === 'shot') { if (S.shot === 'chapel') S.shot = 'cabinet'; else { S.mode = 'look'; S.shot = null; } rig.rate = 0.5; syncUI(); return true; }
  return false;
}
async function swapSet() {
  const b = B[S.bay]; if (!b || b.s.sets.length < 2 || b.swapping || b.open < 0.9) return; if (S.mode === 'inspect') back();
  b.swapping = true; b.openT = 0; sound.play('close'); await until(() => b.open < 0.012);
  applySet(b, (b.set + 1) % b.s.sets.length);
  if (S.room === 'rotunda' && S.mode !== 'look' && S.bay === b.k) { b.openT = 1; sound.play('open'); } else b.openT = restOpen(b);
  b.swapping = false; syncUI();
}
async function playVideo() {
  const b = B[S.bay]; if (!b || !b.s.video || S.video || b.open < 0.9) return;
  const v = document.createElement('video'); v.src = asset(b.s, 'v.mp4'); v.playsInline = true; v.preload = 'auto'; v.muted = sound.muted; v.setAttribute('playsinline', '');
  const st = S.video = { v, b, tex: null }; S.mode = 'inspect'; S.panel = 1; rig.rate = 0.5; sound.setDuck(true); syncUI();
  v.play().catch(() => {});
  await new Promise((res) => { v.addEventListener('loadeddata', res, { once: true }); v.addEventListener('error', res, { once: true }); });
  if (S.video !== st) return; if (v.error || !v.videoWidth) { stopVideo(); ui.toast({ title: '短片暂时放不出来', text: '可以稍后再试' }); return; }
  st.tex = new THREE.VideoTexture(v); st.tex.anisotropy = 4; b.tri.setPicture(1, st.tex, true); b.tri.setReveal(1, 1);
  v.addEventListener('ended', () => { if (S.video === st) { stopVideo(); S.mode = 'focus'; rig.rate = 0.5; syncUI(); } });
}
function stopVideo() {
  const st = S.video; if (!st) return; S.video = null; st.v.pause(); st.v.removeAttribute('src'); st.v.load(); sound.setDuck(false);
  const idx = st.b.s.sets[st.b.set][1]; st.b.tri.setPicture(1, idx === 'q' ? st.b.qFull : st.b.pics[idx]); st.b.tri.setReveal(1, st.b.rev[1]); if (st.tex) st.tex.dispose();
}

// ---------------------------------------------------------------- between the rooms: the colour drains to a drawing, and soaks back in
async function goStudio() {
  if (S.busy || S.room !== 'rotunda') return; if (S.mode !== 'look') toLook();
  S.busy = true; S.mode = 'walk'; S.ringHover = null; ui.hint(null); ui.tag(null); ui.cursor(null); syncUI(); const th = K.door*K.BAY;
  S.walk = { pos: cyl(th, EYE, 6.4), tgt: cyl(th, 1.75, K.R + 1), fov: 50 }; rig.rate = 0.5; S.doorT = 1; sound.play('door');
  await wait(1.5); sound.play('wash');
  await tween(1.1, (e) => { post.u.uWash.value = 1 - e; S.walk.pos.copy(cyl(th, EYE, 6.4 + 2.2*e)); });
  enterRoom('studio'); S.walk = null; S.doorT = 0; S.door = 0; snapRig();
  const h = studio.shots.home; rig.pos.set(h.pivot.x, h.pivot.y, h.pivot.z + 1.3); S.mode = 'look'; syncUI();
  await tween(1.6, (e) => { post.u.uWash.value = e; });
  post.u.uWash.value = 1; S.busy = false; syncUI();
  if (earned.size === SERIES.length && studio.doorOpen < 0.5) { await wait(0.6); studio.openDoor(true); sound.play('door'); ui.hint('圆门开了。点圆物柜，往里看', 9000); }
  else if (!S.hinted.studio) { S.hinted.studio = true; ui.hint('点手稿、手抄本或圆物柜走近看　·　身后的门回圆厅', 9000); }
}
async function goRotunda(thenBay = null) {
  if (S.busy || S.room !== 'studio') return;
  S.busy = true; S.mode = 'walk'; S.shot = null; ui.hint(null); ui.tag(null); ui.cursor(null); syncUI();
  const h = studio.shots.home; S.walk = { pos: new V3(h.pivot.x, 1.55, h.pivot.z + 0.9), tgt: new V3(h.pivot.x, 1.3, h.pivot.z + 6), fov: 52 }; rig.rate = 0.5; sound.play('door');
  await wait(0.9); sound.play('wash');
  await tween(1.0, (e) => { post.u.uWash.value = 1 - e; });
  enterRoom('rotunda'); S.walk = null; if (thenBay != null) faceBay(thenBay, true); snapRig(); S.mode = 'look'; syncUI();
  await tween(1.6, (e) => { post.u.uWash.value = e; });
  post.u.uWash.value = 1; S.busy = false; syncUI();
  if (thenBay != null) focus(thenBay);
}
function shot(name) { S.mode = 'shot'; S.shot = name; S.hoverHit = null; rig.rate = 0.5; sound.play('step'); ui.hint(null); syncUI(); }
function flip(dir) { if (studio.codex.flip(dir)) { sound.play('page'); setTimeout(syncUI, 1250); } }

// ---------------------------------------------------------------- camera
const rig = { pos: new V3(0, EYE, -FWD), quat: new THREE.Quaternion(), fov: 55, rate: 3 };
const G = { pos: new V3(), tgt: new V3(), fov: 55, quat: new THREE.Quaternion() };
const par = { x: 0, y: 0 }; const ptr = { x: 0, y: 0, cx: 0, cy: 0, mouse: false, inside: false, down: null };
const _m = new THREE.Matrix4(), _d = new V3(), _n = new V3(), _t = new V3(), _c = new V3(), UP = new V3(0, 1, 0);
const restPitch = () => (innerWidth/innerHeight < 0.8 ? 0.24 : 0.07);
const lookFov = (asp) => 2*Math.atan(Math.tan(27.5*Math.PI/180)*clamp(1.3/asp, 1, 1.62))*180/Math.PI;
function goal() {
  const asp = camera.aspect, port = asp < 0.82, W = innerWidth;
  if (S.walk) { G.pos.copy(S.walk.pos); G.tgt.copy(S.walk.tgt); G.fov = S.walk.fov; return; }
  const look = (pivotX, pivotY, pivotZ, backOff, far, fov) => {
    const yaw = S.yaw + par.x*0.05, pitch = S.pitch - par.y*0.03 + Math.sin(T*0.21)*0.004; const cp = Math.cos(pitch);
    _d.set(Math.sin(yaw)*cp, Math.sin(pitch), -Math.cos(yaw)*cp);
    G.pos.set(pivotX - Math.sin(yaw)*backOff, pivotY, pivotZ + Math.cos(yaw)*backOff); G.tgt.copy(G.pos).addScaledVector(_d, far); G.fov = fov;
  };
  if (S.room === 'rotunda') {
    const b = B[S.bay];
    if (S.mode === 'look' || !b) { const u = clamp((S.pitch - 0.2)/0.75, 0, 1); look(0, EYE, 0, -FWD + (FWD + 1.2)*u*u*(3 - 2*u), 8, lookFov(asp)); return; }
    const th = b.k*K.BAY; _n.set(-Math.sin(th), 0, Math.cos(th)); _t.set(Math.cos(th), 0, Math.sin(th));
    if (S.mode === 'focus') {
      const D = b.tri.D; cyl(th, K.ySill + D.originY + (D.HW - 0.12)/2, K.R + 0.40, _c);
      const wide = 2*D.HW*(1 + 2*Math.cos(D.rest)), tall = 2*D.HH + D.HW + 0.40;
      const fov = port ? 50 : 40, tv = Math.tan(fov*Math.PI/360);
      const wv = port ? 0.94 : clamp((W - 470)/W, 0.4, 0.8), hv = port ? 0.47 : 0.82, fx = port ? 0 : clamp(205/W, 0, 0.2), fy = port ? 0.165 : 0.01;
      const d = clamp(Math.max(tall*0.5/(tv*hv), wide*0.5*1.16/(tv*asp*wv)), 2.6, 13.5);
      G.tgt.copy(_c).addScaledVector(_t, -fx*2*d*tv*asp).addScaledVector(UP, -fy*2*d*tv);
      G.pos.copy(G.tgt).addScaledVector(_n, d).addScaledVector(_t, par.x*0.10).addScaledVector(UP, -par.y*0.05); G.fov = fov; return;
    }
    const P = b.tri.panelPose(S.panel); const fov = port ? 46 : 36, tv = Math.tan(fov*Math.PI/360);
    const d = Math.max(P.hh/(tv*0.78), P.hw*1.05/(tv*asp));
    G.tgt.copy(P.p).addScaledVector(UP, -0.022*2*d*tv); G.pos.copy(G.tgt).addScaledVector(P.n, d).addScaledVector(_t, par.x*0.04).addScaledVector(UP, -par.y*0.025); G.fov = fov; return;
  }
  const h = studio.shots.home;
  if (S.mode !== 'shot') { look(h.pivot.x, h.pivot.y, h.pivot.z, 0.75, 4, lookFov(asp) + 3); return; }
  const s = studio.shots[S.shot]; const fit = { cabinet: 2.75, chapel: 1.9, sheet: 1.55, views: 1.62, codex: 0.78 }[S.shot];
  const fov = s.fov + (port ? 8 : 0), tv = Math.tan(fov*Math.PI/360); _d.copy(s.pos).sub(s.tgt); const d0 = _d.length(); _d.normalize();
  const d = Math.max(d0, fit*0.5*1.06/(tv*asp*(port ? 0.96 : 0.9)));
  _t.crossVectors(UP, _d).normalize(); const fx = port ? 0 : clamp(120/W, 0, 0.1), fy = port ? 0.14 : 0;
  G.tgt.copy(s.tgt).addScaledVector(_t, -fx*2*d*tv*asp).addScaledVector(UP, -fy*2*d*tv);
  G.pos.copy(G.tgt).addScaledVector(_d, d).addScaledVector(_t, par.x*0.05).addScaledVector(UP, -par.y*0.03); G.fov = fov;
}
function goalQuat() { _m.lookAt(G.pos, G.tgt, UP); G.quat.setFromRotationMatrix(_m); }
function snapRig() { goal(); goalQuat(); rig.pos.copy(G.pos); rig.quat.copy(G.quat); rig.fov = G.fov; }
function moveRig(dt) {
  goal(); goalQuat();
  const want = S.walk ? 1.5 : S.mode === 'look' ? 9 : 3.3; rig.rate += (want - rig.rate)*Math.min(1, dt*1.7);
  const k = 1 - Math.exp(-dt*rig.rate);
  rig.pos.lerp(G.pos, k); rig.quat.slerp(G.quat, k); rig.fov += (G.fov - rig.fov)*k;
  camera.position.copy(rig.pos); camera.quaternion.copy(rig.quat);
  if (Math.abs(camera.fov - rig.fov) > 1e-3) { camera.fov = rig.fov; camera.updateProjectionMatrix(); }
  camera.updateMatrixWorld(true);
}

// ---------------------------------------------------------------- picking
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pickBay() {
  ndc.set(ptr.x, ptr.y); ray.setFromCamera(ndc, camera); const o = ray.ray.origin, d = ray.ray.direction;
  const a = d.x*d.x + d.z*d.z; if (a < 1e-6) return null; const bq = 2*(o.x*d.x + o.z*d.z), c = o.x*o.x + o.z*o.z - K.R*K.R; const disc = bq*bq - 4*a*c; if (disc < 0) return null;
  const t = (-bq + Math.sqrt(disc))/(2*a); if (t <= 0) return null; const x = o.x + d.x*t, y = o.y + d.y*t, z = o.z + d.z*t;
  const th = Math.atan2(x, -z); const k = ((Math.round(th/K.BAY) % K.NB) + K.NB) % K.NB; const off = Math.abs(wrap(th - k*K.BAY))*K.R;
  if (k === K.door) return off < K.dw + 0.3 && y > 0 && y < K.dh + 0.9 ? k : null;
  return B[k] && off < K.a + 0.12 && y > 0.85 && y < 5.4 ? k : null;
}
function pickPanel() { const b = B[S.bay]; if (!b || b.open < 0.85) return null; ndc.set(ptr.x, ptr.y); ray.layers.set(0); ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(b.tri.panels, false)[0]; return h ? h.object.userData.panel : null; }
function pickStudio() { ndc.set(ptr.x, ptr.y); ray.layers.set(2); ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(studio.hits, false)[0]; ray.layers.set(0); return h ? h.object.userData.hit : null; }
const HITS = { cabinet: ['圆物柜', 'ROTVNDA'], sheet: ['比例手稿', 'DE PROPORTIONE'], views: ['三面图', 'TRES ASPECTVS'], codex: ['人设手抄本', 'CODEX'], exit: ['回圆厅', 'ROTVNDA'], dish: ['圆圆的小东西', '碰一下'], armil: ['浑天仪', '拨一下'] };
const TOYS = { dish: 1, armil: 1 };
const bayTag = (k) => { if (k === K.door) return '<i>→</i>书房<span>STVDIOLO</span>'; const s = B[k].s; return `<i>${s.no}</i>${s.name}<span>${s.latin}</span>${earned.has(s.id) ? '<em>◉</em>' : ''}`; };
function hover() {
  if (S.phase !== 'live' || S.busy || ui.sheetOpen || !ptr.inside || ptr.down) { if (!ptr.down) { S.hover = S.hoverPanel = S.hoverHit = null; } return; }
  if (!ptr.mouse) return;
  S.hover = S.hoverPanel = S.hoverHit = null; let cur = null, tag = null;
  if (S.room === 'rotunda') {
    if (S.mode === 'look') { S.hover = pickBay(); cur = S.hover != null ? 'point' : 'grab'; if (S.hover != null) { tag = bayTag(S.hover); if (B[S.hover]) loadPics(B[S.hover]); } }
    else if (S.mode === 'focus') { S.hoverPanel = pickPanel(); if (S.hoverPanel != null) cur = 'zoom'; else { const k = pickBay(); if (k != null && k !== S.bay) { cur = 'point'; tag = bayTag(k); } else cur = 'out'; } }
    else cur = S.video ? null : 'out';
  } else if (S.mode === 'look') { S.hoverHit = pickStudio(); cur = S.hoverHit ? 'point' : 'grab'; if (S.hoverHit) tag = `${HITS[S.hoverHit][0]}<span>${HITS[S.hoverHit][1]}</span>`; }
  else if (S.shot === 'codex') { cur = pickStudio() === 'codex' ? 'point' : 'out'; }
  else if (S.shot === 'cabinet') { cur = pickStudio() === 'cabinet' && studio.doorOpen > 0.5 ? 'zoom' : 'out'; }
  else cur = 'out';
  ui.cursor(cur); ui.tag(tag, ptr.cx, ptr.cy);
}
function click() {
  if (S.phase === 'intro') { S.skip = true; return; }
  if (S.phase !== 'live' || S.busy) return;
  if (S.room === 'rotunda') {
    if (S.mode === 'look') { const k = pickBay(); if (k === K.door) goStudio(); else if (k != null) focus(k); }
    else if (S.mode === 'focus') { const i = pickPanel(); if (i != null) inspect(i); else { const k = pickBay(); if (k === K.door) goStudio(); else if (k != null && k !== S.bay) focus(k); else back(); } }
    else if (S.video) { const v = S.video.v; if (v.paused) v.play().catch(() => {}); else v.pause(); }
    else back();
  } else if (S.mode === 'look') { const h = pickStudio(); if (h === 'exit') goRotunda(); else if (TOYS[h]) { studio.poke(h); sound.play(h === 'armil' ? 'whirl' : 'tick'); } else if (h) shot(h); }
  else { const h = pickStudio();
    if (S.shot === 'codex' && h === 'codex') flip(ptr.x < 0 ? -1 : 1);
    else if (S.shot === 'cabinet' && h === 'cabinet' && studio.doorOpen > 0.5) shot('chapel');
    else back(); }
  ui.tag(null); hover();
}

// ---------------------------------------------------------------- input
function setPtr(e) { ptr.cx = e.clientX; ptr.cy = e.clientY; ptr.x = e.clientX/innerWidth*2 - 1; ptr.y = -(e.clientY/innerHeight*2 - 1); ptr.mouse = e.pointerType === 'mouse'; ptr.inside = true; }
function bindInput() {
  canvas.addEventListener('pointerdown', (e) => { if (e.button > 0) return; setPtr(e); ptr.down = { x: e.clientX, y: e.clientY, t: performance.now(), yaw: S.yawT, pitch: S.pitchT, moved: 0, lx: e.clientX, lt: performance.now(), id: e.pointerId }; S.vyaw = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* fine */ } if (!ptr.mouse) ui.tag(null); });
  canvas.addEventListener('pointermove', (e) => {
    setPtr(e); const d = ptr.down; if (!d) { hover(); return; } if (e.pointerId !== d.id) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y; d.moved = Math.max(d.moved, Math.hypot(dx, dy));
    if (S.phase === 'live' && !S.busy && S.mode === 'look' && d.moved > 4) {
      const k = camera.fov*Math.PI/180/innerHeight; S.yawT = d.yaw - dx*k; S.pitchT = clamp(d.pitch + dy*k, S.room === 'rotunda' ? -0.3 : -0.55, 1.22);
      const now = performance.now(); if (now > d.lt) { const v = -(e.clientX - d.lx)*k/((now - d.lt)/1000); S.vyaw += (v - S.vyaw)*0.5; d.lx = e.clientX; d.lt = now; }
      ui.cursor('drag'); ui.tag(null); S.hover = null;
      if (!S.hinted.drag) { S.hinted.drag = true; ui.hint(null); }
    }
  });
  const up = (e) => {
    const d = ptr.down; if (!d || e.pointerId !== d.id) return; ptr.down = null; setPtr(e);
    const dx = e.clientX - d.x, dy = e.clientY - d.y, dt = performance.now() - d.t;
    if (performance.now() - d.lt > 90) S.vyaw = 0; S.vyaw = clamp(S.vyaw, -2.4, 2.4);
    if (e.type === 'pointercancel') return;
    if (d.moved < 7 && dt < 600) click();
    else if (S.phase === 'live' && !S.busy && Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy)*1.4) {
      const dir = dx < 0 ? 1 : -1;
      if (S.room === 'rotunda' && S.mode === 'focus') focus(stepBay(S.bay, dir));
      else if (S.room === 'rotunda' && S.mode === 'inspect' && !S.video) inspect((S.panel + dir + 3) % 3);
      else if (S.room === 'studio' && S.shot === 'codex') flip(dir);
    }
    if (ptr.mouse) hover(); else ptr.inside = false;
  };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('pointerleave', () => { ptr.inside = false; if (!ptr.down) { S.hover = S.hoverPanel = S.hoverHit = null; ui.tag(null); ui.cursor(null); } });
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); if (S.phase !== 'live' || S.busy || S.mode !== 'look') return; const dl = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY; S.yawT += clamp(dl, -120, 120)*0.0016; S.vyaw = 0; }, { passive: false });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (S.phase === 'intro') { if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') S.skip = true; return; }
    if (S.phase !== 'live') return;
    if (e.code === 'Escape') { back(); return; }
    if (ui.sheetOpen || (e.target.closest?.('button') && (e.code === 'Enter' || e.code === 'Space'))) return;
    const dir = e.code === 'ArrowRight' || e.code === 'KeyD' ? 1 : e.code === 'ArrowLeft' || e.code === 'KeyA' ? -1 : 0;
    if (e.code === 'KeyM') { act('sound'); return; }
    if (S.busy) return;
    if (S.room === 'rotunda') {
      if (S.mode === 'look') {
        if (dir) { S.yawT = (Math.round(S.yawT/K.BAY) + dir)*K.BAY; S.pitchT = restPitch(); S.vyaw = 0; }
        else if (e.code === 'ArrowUp' || e.code === 'KeyW') S.pitchT = clamp(S.pitchT + 0.3, -0.3, 1.22);
        else if (e.code === 'ArrowDown' || e.code === 'KeyS') S.pitchT = clamp(S.pitchT - 0.3, -0.3, 1.22);
        else if (e.code === 'Enter' || e.code === 'Space') { const k = facing(); if (k === K.door) goStudio(); else focus(k); e.preventDefault(); }
      } else if (S.mode === 'focus') { if (dir) focus(stepBay(S.bay, dir)); else if (e.code === 'Enter' || e.code === 'Space') { inspect(1); e.preventDefault(); } }
      else if (dir && !S.video) inspect((S.panel + dir + 3) % 3);
    } else if (S.mode === 'look') { if (dir) { S.yawT += dir*0.5; S.vyaw = 0; } }
    else if (S.shot === 'codex' && dir) flip(dir);
  });
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { sound.pause(document.hidden); if (S.video) { if (document.hidden) S.video.v.pause(); } });
}

// ---------------------------------------------------------------- what the chrome is asked to do, and what it shows
const TIMES = [[null, '此刻'], [7.4, '清晨'], [12.5, '正午'], [17.8, '黄昏'], [22, '夜里']];
function act(name, v) {
  if (S.phase !== 'live') return;
  if (name === 'sound') { const m = !sound.muted; sound.setMuted(m); store.d.muted = m; store.save(); ui.sound(m); if (S.video) S.video.v.muted = m; return; }
  if (name === 'time') { S.timeMode = (S.timeMode + 1) % TIMES.length; daylight.hour = TIMES[S.timeMode][0]; ui.time(TIMES[S.timeMode][1]); sound.play('tick'); return; }
  if (name === 'catalog') { ui.tag(null); ui.catalog(SERIES.map((s) => ({ bay: s.bay, no: s.no, name: s.name, latin: s.latin, got: earned.has(s.id), img: atlas.dataURL(s.index) })), earned.size); return; }
  if (name === 'help') { ui.tag(null); ui.help(); return; }
  if (name === 'ringhover') { S.ringHover = v ? v.bay : null; if (v) ui.tag(bayTag(v.bay), v.x, v.y - 4); else ui.tag(null); return; }
  if (S.busy) return;
  if (name === 'home') { if (S.room === 'studio') goRotunda(); else { if (S.mode !== 'look') toLook(); faceBay(0); } return; }
  if (name === 'study') { goStudio(); return; }
  if (name === 'goto') { if (v === K.door) { if (S.room === 'rotunda') goStudio(); } else if (S.room === 'studio') goRotunda(v); else focus(v); return; }
  if (name === 'back') { back(); return; }
  if (S.room === 'rotunda') {
    if (name === 'prev' || name === 'next') focus(stepBay(S.bay, name === 'next' ? 1 : -1));
    else if (name === 'panel') inspect(Number(v));
    else if (name === 'pprev' || name === 'pnext') inspect((S.panel + (name === 'pnext' ? 1 : -1) + 3) % 3);
    else if (name === 'set') swapSet();
    else if (name === 'video') playVideo();
  } else if (name === 'page') flip(Number(v));
  else if (name === 'chapel') shot('chapel');
}
const picTitle = (s, idx) => (idx === 'q' ? '定妆照' : s.titles[idx]);
function syncUI() {
  if (!ui) return;
  ui.mode(S.mode, S.room); ui.count(earned.size); ui.ringState(facing(), gotBays());
  let card = null, bar = null;
  if (S.room === 'rotunda' && (S.mode === 'focus' || S.mode === 'inspect')) {
    const b = B[S.bay], s = b.s, set = s.sets[b.set];
    if (S.mode === 'focus') card = ui.seriesCard({ no: s.no, latin: s.latin, name: s.name, line: s.line, say: s.say, got: earned.has(s.id), seal: atlas.dataURL(s.index),
      setName: s.sets.length > 1 ? (s.setNames ? s.setNames[b.set] : `第${CN[b.set]}屏`) : '', plates: set.map((idx, i) => ({ i, label: CN[i], title: picTitle(s, idx) })),
      setBtn: s.sets.length > 1 ? (b.set === 0 ? `再开一屏${s.setNames ? ' · ' + s.setNames[1] : ''}` : `回到第一屏${s.setNames ? ' · ' + s.setNames[0] : ''}`) : '', video: !!s.video });
    else bar = ui.inspectBar(S.video ? { video: true, name: s.name } : { label: CN[S.panel], title: picTitle(s, set[S.panel]), k: S.panel + 1, n: 3 });
  } else if (S.room === 'studio' && S.mode === 'shot') card = ui.studyCard(S.shot, { n: earned.size, page: studio.codex.spread + (studio.codex.dir || 0), pages: studio.codex.n });
  ui.card(card); ui.bar(bar);
}

// ---------------------------------------------------------------- frame
let lastFacing = -1, nightOn = null;
function step(dt) {
  runClock(dt);
  // turning
  if (S.mode === 'look' && !ptr.down && Math.abs(S.vyaw) > 0.002) { S.yawT += S.vyaw*dt; S.vyaw *= Math.exp(-dt*2.6); }
  const kq = 1 - Math.exp(-dt*(ptr.down ? 16 : 6)); S.yaw += (S.yawT - S.yaw)*kq; S.pitch += (S.pitchT - S.pitch)*kq;
  const px = ptr.mouse && ptr.inside && !REDUCED ? ptr.x : 0, py = ptr.mouse && ptr.inside && !REDUCED ? ptr.y : 0; par.x += (px - par.x)*Math.min(1, dt*2.2); par.y += (py - par.y)*Math.min(1, dt*2.2);

  // the altarpieces
  const inRot = S.room === 'rotunda'; const fb = inRot && S.mode !== 'look' && S.mode !== 'walk' ? B[S.bay] : null;
  if (inRot) for (let k = 0; k < K.NB; k++) {
    const b = B[k]; if (!b) continue;
    b.open += clamp(b.openT - b.open, -dt/1.45, dt/1.9);
    const pk = (S.mode === 'look' && (S.hover === k || S.ringHover === k) && b.openT < 0.5) ? 1 : 0; b.peek += (pk - b.peek)*Math.min(1, dt*5); if (b.peek < 0.002 && !pk) b.peek = 0;
    if (b.open !== b.drawn[0] || b.peek !== b.drawn[1]) { b.tri.peek = b.peek; b.tri.setOpen(b.open); b.drawn[0] = b.open; b.drawn[1] = b.peek; LIGHT.uOpenA.value[k] = Math.min(1, b.open*1.7); }
    if (b.glaze !== b.glazeT) { b.glaze = Math.min(b.glazeT, b.glaze + dt/2.6); b.tondo.material.uniforms.uGlaze.value = b.glaze; }
    // every unfolding starts the picture again; a seen picture no longer skips the drawing
    if (b.openT > 0.5 && b.open < 0.2 && !b.armReveal) {
      b.armReveal = true; b.revClock = 0;
      for (let i = 0; i < 3; i++) { b.rev[i] = 0; if (!(S.video && i === 1 && S.video.b === b)) b.tri.setReveal(i, 0); }
    }
    if (b.open < 0.02 && b.openT < 0.5) b.armReveal = false;
    // the painting comes up: underdrawing first, then colour, a patch at a time
    if (b.applied && b.open > 0.62 && b.openT > 0.5 && (b === fb || k === 0) && S.phase === 'live') {
      // clock follows real time, so a slow frame does not leave the last panel stepping in lumps
      b.revClock += Math.min(dt, 0.05); const lag = [0.2, 0, 0.4]; let all = true;
      for (let i = 0; i < 3; i++) {
        if (b.rev[i] < 1) {
          if (b.revClock > lag[i]) {
            const u = Math.min(1, (b.revClock - lag[i])/REVEAL);
            if (u !== b.rev[i]) { b.rev[i] = u; if (!(S.video && i === 1 && S.video.b === b)) b.tri.setReveal(i, u); }
          }
          if (b.rev[i] < 1) all = false;
        }
      }
      if (all && !b.swapping) { if (!b.marked || b.marked !== b.set + 1) { b.marked = b.set + 1; markSeen(b); } if (!CAPTURE && !earned.has(b.s.id) && b.revClock > 1.2) earn(b.s); }
    }
    for (let i = 0; i < 3; i++) { const want = b === fb && S.mode === 'inspect' && i !== S.panel ? 0.26 : 1; if (b.dim[i] !== want) { b.dim[i] += (want - b.dim[i])*Math.min(1, dt*3); if (Math.abs(want - b.dim[i]) < 0.004) b.dim[i] = want; b.tri.panels[i].material.uniforms.uFade.value = b.dim[i]; } }
    // let go of what a closed altarpiece no longer shows
    if (b.open <= 0 && b.applied && k !== 0 && b !== fb) { b.applied = false; b.marked = 0; if (b.pics) b.pics.forEach((t) => { if (t) t.dispose(); }); b.pics = b.qFull = b.picsP = null; }
  }
  S.door += (S.doorT + (S.mode === 'look' && S.hover === K.door ? 0.14 : 0) - S.door)*Math.min(1, dt*1.6); if (inRot) doors.setOpen(clamp(S.door, 0, 1));

  // the room takes on the weather of whatever is open
  const moodOn = !!fb && fb.open > 0.3 && fb.openT > 0.5;
  if (moodOn) daylight.mood = fb.s.mood.light;
  daylight.update(dt, moodOn); if (daylight.cur) post.u.uExposure.value = CASTLE ? daylight.exposure() : daylight.cur.ev;
  air.setWeather(moodOn ? fb.s.mood.weather : null); air.update(dt);
  sound.scene(moodOn && !S.video ? fb.s.music : null, moodOn && !S.video ? fb.s.amb : null); sound.update(dt);
  if (!inRot) studio.update(dt, T);
  if (castle) castle.update(dt, T);

  moveRig(dt);
  const f = facing(); if (f !== lastFacing && ui) { lastFacing = f; ui.ringState(f, gotBays()); }
  const night = LIGHT.uAmbUp.value.x + LIGHT.uAmbUp.value.y + LIGHT.uAmbUp.value.z < 0.80; if (night !== nightOn && ui) { nightOn = night; ui.night(night); }
}
function render() { LIGHT.uTime.value = T; AIR.uPx.value = post.h/(2*Math.tan(camera.fov*Math.PI/360)); post.render(scene, camera); }

// ---------------------------------------------------------------- size and adaptive sharpness
const SC = [1, 0.85, 0.7, 0.56]; let lvl = 0, accT = 0, accN = 0, good = 0, lockUp = 0, lockMs = 15000;
function resize() {
  const w = innerWidth, h = innerHeight; const dpr = CAPTURE ? (Number(Q.get('dpr')) || 1) : Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); camera.aspect = w/h; camera.updateProjectionMatrix();
  const scale = S.phase === 'intro' ? Math.min(SC[lvl], 0.72) : SC[lvl];
  post.setSize(w*dpr*scale, h*dpr*scale); post.u.uBloom.value = w < 800 || S.phase === 'intro' ? 0.06 : 0.10;
}
function adapt(raw) {
  if (S.phase !== 'live' || CAPTURE || FIXED) return; accT += raw; if (++accN < 45) return; const avg = accT/accN; accT = 0; accN = 0; const now = performance.now();
  if (avg > 1/43 && lvl < SC.length - 1) { lvl++; good = 0; lockUp = now + lockMs; lockMs = Math.min(120000, lockMs*2); resize(); }
  else if (avg < 1/56 && lvl > 0 && now > lockUp) { if (++good >= 5) { lvl--; good = 0; lockUp = now + lockMs; resize(); } } else good = 0;
}

// ---------------------------------------------------------------- the way in
async function enter(prologue) {
  sound.unlock(); S.phase = 'intro'; body.classList.add('entered'); resize();
  post.u.uInk.value = 0; post.u.uWash.value = 0; post.u.uFade.value = 1;
  S.walk = { pos: new V3(0, 1.72, 9.2), tgt: new V3(0, 2.7, -12), fov: 48 }; snapRig();
  if (prologue) prologue.leave(REDUCED ? 500 : 1700);
  await wait(0.5);
  const dolly = tween(6.6, (e) => { if (S.walk) S.walk.pos.z = 9.2 - 5.6*e; }, easeOut);
  await tween(2.7, (e) => { post.u.uInk.value = e; }, (t) => t);
  sound.play('wash');
  await tween(3.3, (e) => { post.u.uWash.value = e; }, (t) => t);
  post.u.uWash.value = 1; post.u.uInk.value = 1; S.phase = 'live'; resize();
  S.walk = null; rig.rate = 0.35; S.skip = false; body.classList.add('live'); syncUI();
  store.d.visits = (store.d.visits || 0) + 1; store.save();
  const b0 = B[0]; if (b0.openT < 1) { await wait(0.5); b0.openT = 1; sound.play('open'); }
  dolly.then(() => {});
  ui.hint(ptrCoarse() ? '按住拖动，转着看　·　点一组画屏走近' : '按住拖动环视　·　点一组画屏走近　·　对面的门通往书房', 11000);
}
const ptrCoarse = () => matchMedia('(pointer: coarse)').matches;

async function main() {
  resize();
  const prologue = SKIP ? null : buildPrologue(document.getElementById('prologue'), { quick: (store.d.visits || 0) > 0 });
  if (SKIP) document.getElementById('prologue').remove();
  await build((p) => prologue && prologue.progress(p));
  ui = buildUI({ act });
  ui.ring([K.door, ...Array.from({ length: 9 }, (_, i) => 11 + i), ...Array.from({ length: 10 }, (_, i) => i)].map((k) => (k === K.door ? { bay: k, door: true, label: '书房' } : { bay: k, label: B[k].s.name })));
  ui.sound(sound.muted); ui.time(TIMES[0][1]); syncUI(); bindInput(); resize(); snapRig();
  step(0); render();     // compile the shaders once, before the drawing begins to move
  if (CAPTURE) { capture(); return; }
  let loopOn = false;
  if (Q.has('bench')) window.__bench = { get lvl() { return SC[lvl]; }, get phase() { return S.phase; } };
  const startLoop = () => {
    if (loopOn) return; loopOn = true; let last = performance.now();
    const tick = (now) => {
      requestAnimationFrame(tick); const raw = (now - last)/1000; last = now;
      if (document.hidden || S.phase === 'ready') return;
      const dt = Math.min(raw, 1/20); T += dt; adapt(raw); step(dt); render();
    };
    requestAnimationFrame(tick);
  };
  S.phase = 'ready';
  if (SKIP) { startLoop(); post.u.uInk.value = 1; post.u.uWash.value = 1; S.phase = 'live'; body.classList.add('entered', 'live'); addEventListener('pointerdown', () => sound.unlock(), { once: true }); syncUI(); }
  else { await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))); prologue.play(); prologue.ready(() => { startLoop(); enter(prologue); }); }
  body.classList.add('ready');
}

// ---------------------------------------------------------------- stills
function capture() {
  S.phase = 'live'; body.classList.add('capture', 'ready');
  // where a picture panel of the bay in view lands on screen, and which image it shows (qa/deltae.py)
  window.__panelInfo = (i) => {
    const b = B[S.bay]; if (!b) return null; const m = b.tri.panels[i]; m.updateWorldMatrix(true, false);
    const g = m.geometry; if (!g.boundingBox) g.computeBoundingBox(); const bb = g.boundingBox;
    const rect = [[bb.min.x, bb.min.y], [bb.max.x, bb.min.y], [bb.max.x, bb.max.y], [bb.min.x, bb.max.y]].map(([x, y]) => { const p = new V3(x, y, 0).applyMatrix4(m.matrixWorld).project(camera); return [(p.x*0.5 + 0.5)*innerWidth, (0.5 - p.y*0.5)*innerHeight]; });
    const u = m.material.uniforms; const img = u.map && u.map.value && u.map.value.image;
    return { bay: S.bay, rect, crop: u.uCrop ? u.uCrop.value.toArray() : null, src: img ? (img.currentSrc || img.src || null) : null, fade: u.uFade ? u.uFade.value : 1, reveal: u.uReveal ? u.uReveal.value : 1 };
  };
  window.__set = async (o = {}) => {
    if (o.hour !== undefined) daylight.hour = o.hour;
    if (o.room && o.room !== S.room) enterRoom(o.room);
    if (o.earned !== undefined) SERIES.slice(0, o.earned).forEach((s) => earn(s, true));
    if (S.room === 'rotunda') {
      if (o.focus === null) toLook();
      else if (o.focus !== undefined) { focus(o.focus); await loadPics(B[o.focus]); await Promise.resolve(); if (o.set) applySet(B[o.focus], o.set); if (o.inspect !== undefined) { B[o.focus].open = 1; inspect(o.inspect); } else S.mode = 'focus'; }
      if (o.hover !== undefined) { S.hover = o.hover; ptr.inside = false; }
    } else {
      if (o.shot !== undefined) { S.mode = o.shot ? 'shot' : 'look'; S.shot = o.shot || null; }
      if (o.page !== undefined) studio.codex.setSpread(o.page);
      if (o.flip) studio.codex.pose(o.flip[0], o.flip[1]);
      if (o.door !== undefined) studio.openDoor(!!o.door);
    }
    if (o.yaw !== undefined) S.yaw = S.yawT = o.yaw; if (o.pitch !== undefined) S.pitch = S.pitchT = o.pitch;
    T = o.t ?? 20; resize(); syncUI();
    const hov = S.hover; for (let i = 0; i < 360; i++) { S.hover = hov; step(1/30); }
    const b = B[o.bay ?? S.bay];
    if (o.open !== undefined && b) { b.open = o.open; b.tri.setOpen(o.open); LIGHT.uOpenA.value[b.k] = Math.min(1, o.open*1.7); }
    if (o.reveal !== undefined && b) for (let i = 0; i < 3; i++) b.tri.setReveal(i, o.reveal);
    if (o.portal !== undefined && doors) { S.door = S.doorT = o.portal; doors.setOpen(o.portal); }
    if (o.glaze !== undefined) for (const x of B) if (x) x.tondo.material.uniforms.uGlaze.value = o.glaze;
    if (o.mood) { daylight.mood = o.mood; daylight.moodK = 1; daylight.snap(); }
    if (o.weather !== undefined) { air.setWeather(o.weather); air.snapWeather(); }
    post.u.uInk.value = o.ink ?? 1; post.u.uWash.value = o.wash ?? 1; post.u.uFade.value = o.fade ?? 1;
    if (o.walk) { S.walk = { pos: new V3(...o.walk.pos), tgt: new V3(...o.walk.tgt), fov: o.walk.fov || 50 }; }
    snapRig(); S.walk = null; camera.position.copy(rig.pos); camera.quaternion.copy(rig.quat); camera.fov = rig.fov; camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
    body.classList.toggle('showui', !!o.ui); body.classList.toggle('live', !!o.ui);
    render(); return true;
  };
  window.__set({}).then(() => { window.__ready = true; });
}

main().catch((e) => { console.error(e); window.__error = String((e && e.stack) || e); const p = document.querySelector('#prologue .enter span'); if (p) p.textContent = '没能打开，请刷新再试'; const fine = document.querySelector('#prologue .fine'); if (fine) fine.textContent = (e && e.message) || String(e); });

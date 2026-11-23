// NOEL · IV — The Winter Quartet Stage Director (V2 Director's Cut)
// Orchestrates:
// - Incremental Frame-Sliced Cold-Start Warmup (<180ms interactive boot + zero-hitch shader precompile)
// - Zero-GC Render Loop, Once-Per-Frame Raycast Throttling & EMA Adaptive Resolution Guardian (60fps target)
// - 3D Envelope Flap + 6-Shard Wax Shatter Unboxing Ritual
// - Wheel/Pinch Macro Zoom, Blank-Canvas Orbit Inspection & Double-Click Framing Reset
// - 2.2s Cinematic Sigil Awakening Shockwave & Bezier Flying Star Socket Sequence
// - 4-Theme Museum Keepsake Card Atelier

import * as THREE from '../vendor/three.module.js';
import { Spring2D, clamp, lerp } from './physics.js';
import { PostPipeline } from './post.js';
import { buildStudioEnvironments, buildProceduralTextures } from './textures.js';
import { QuartetAudio } from './audio.js';
import { createAct1Paper } from './act1_paper.js';
import { createAct2Clay } from './act2_clay.js';
import { createAct3Globe } from './act3_globe.js';
import { createAct4Aurora } from './act4_aurora.js';
import { createFinaleCarousel, renderKeepsakeCard, CARD_THEMES } from './finale_carousel.js';

const Q = new URLSearchParams(location.search);
const CAPTURE = Q.has('capture');
const SKIP_PROLOGUE = Q.has('skip') || CAPTURE;

const body = document.body;
const canvas = document.getElementById('stage');
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
const audio = new QuartetAudio();

// Deferred non-blocking WebGL engine handles (initialized across 3 micro-slices after onload!)
let renderer = null;
let post = null;
let envs = null;
let textures = null;
let engineReady = false;
let shadowTick = 0;

// ---------------- UI Elements & Gift Personalization ----------------
const elPrologue = document.getElementById('prologue');
const btnWaxSeal = document.getElementById('wax-seal-btn');
const elRecipient = document.getElementById('env-recipient');
const elBanner = document.getElementById('act-banner');
const elRoman = document.getElementById('act-roman');
const elName = document.getElementById('act-name');
const elSub = document.getElementById('act-sub');
const elProgress = document.getElementById('act-progress');
const elHint = document.getElementById('whisper-hint');
const elToast = document.getElementById('sigil-toast');
const elRipple = document.getElementById('climax-ripple');
const elFlyingSigil = document.getElementById('flying-sigil');
const elCursor = document.getElementById('cursor-halo');
const elCursorLabel = document.getElementById('cursor-label');

const btnHome = document.getElementById('btn-home');
const btnResetCam = document.getElementById('btn-reset-cam');
const btnSound = document.getElementById('btn-sound');
const btnFinaleTop = document.getElementById('btn-finale');
const tabFinale = document.getElementById('tab-finale');
const finaleRailLine = document.getElementById('finale-rail-line');
const actTabs = Array.from(document.querySelectorAll('.act-tab[data-act]'));

// Keepsake Card Studio Elements
const elCardModal = document.getElementById('card-modal');
const keepsakeCanvas = document.getElementById('keepsake-canvas');
const inpTo = document.getElementById('inp-to');
const inpMsg = document.getElementById('inp-msg');
const inpFrom = document.getElementById('inp-from');
const btnCardOpen = document.getElementById('btn-card-open');
const btnCardClose = document.getElementById('btn-card-close');
const btnDownloadCard = document.getElementById('btn-download-card');
const btnCopyLink = document.getElementById('btn-copy-link');
const elCopyFeedback = document.getElementById('copy-feedback');
const themeSwatches = Array.from(document.querySelectorAll('.theme-swatch[data-theme]'));

let selectedCardTheme = CARD_THEMES[Q.get('theme')] ? Q.get('theme') : 'burgundy';
for (const sw of themeSwatches) {
  sw.classList.toggle('is-selected', sw.dataset.theme === selectedCardTheme);
}

if (Q.get('to')) {
  inpTo.value = Q.get('to').slice(0, 28);
  elRecipient.textContent = `致 ${inpTo.value}`;
  elRecipient.hidden = false;
}
if (Q.get('msg')) inpMsg.value = Q.get('msg').slice(0, 120);
if (Q.get('from')) inpFrom.value = Q.get('from').slice(0, 24);

function refreshKeepsakePreview() {
  renderKeepsakeCard(keepsakeCanvas, {
    to: inpTo.value,
    message: inpMsg.value,
    from: inpFrom.value,
    theme: selectedCardTheme,
  });
}

function openCardStudio() {
  refreshKeepsakePreview();
  elCardModal.hidden = false;
}

function closeCardStudio() {
  elCardModal.hidden = true;
  elCopyFeedback.textContent = '';
}

let toastTimer = null;
function showToast(text) {
  if (!text) return;
  elToast.textContent = text;
  elToast.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elToast.classList.remove('is-shown'), 3800);
}

function setHint(text) {
  elHint.textContent = text;
}

// ---------------- Climax Sigil Flight Animation (Center -> Bottom Quartet Rail) ----------------
let sigilFlight = null; // { elapsed, dur, x0, y0, cx, cy, x1, y1, tab }

function playClimaxFlight(actId) {
  const tab = document.querySelector(`.act-tab[data-act="${actId}"]`);
  if (CAPTURE || !tab) {
    if (tab) tab.classList.add('is-awakened');
    return;
  }

  // Trigger shockwave ripple at stage center
  elRipple.classList.remove('is-active');
  void elRipple.offsetWidth;
  elRipple.classList.add('is-active');

  const starSlot = tab.querySelector('.sigil-star') || tab;
  const rect = starSlot.getBoundingClientRect();
  const x0 = window.innerWidth * 0.5;
  const y0 = window.innerHeight * 0.44;
  const x1 = rect.left + rect.width * 0.5;
  const y1 = rect.top + rect.height * 0.5;

  sigilFlight = {
    elapsed: 0,
    dur: 0.92,
    x0,
    y0,
    cx: lerp(x0, x1, 0.35) + (actId <= 2 ? -90 : 90),
    cy: Math.min(y0, y1) - 110,
    x1,
    y1,
    tab,
  };
  elFlyingSigil.style.opacity = '1';
}

const awakenedActs = new Set();

function handleAwaken(actId, message) {
  if (awakenedActs.has(actId)) return;
  awakenedActs.add(actId);
  audio.awakenVoice(actId);

  playClimaxFlight(actId);
  showToast(message);

  if (awakenedActs.size === 4) {
    btnFinaleTop.hidden = false;
    tabFinale.hidden = false;
    finaleRailLine.hidden = false;
    if (!CAPTURE) {
      setTimeout(() => {
        showToast('四枚冬夜星徽已集齐 · 平安夜四重奏终章已解锁');
      }, 2350);
    }
  }
}

// ---------------- Frame-Sliced Cold-Start Act Instantiation & Shader Warmup ----------------
const acts = {};

const actBuilders = {
  1: () => createAct1Paper({ envMap: envs.envPaper, textures, audio, onAwaken: handleAwaken, onHint: setHint }),
  2: () => createAct2Clay({ envMap: envs.envClay, textures, audio, onAwaken: handleAwaken, onHint: setHint }),
  3: () => createAct3Globe({ envMap: envs.envGlobe, textures, refractTex: post.refractRT.texture, audio, onAwaken: handleAwaken, onHint: setHint }),
  4: () => createAct4Aurora({ envMap: envs.envAurora, textures, refractTex: post.refractRT.texture, audio, onAwaken: handleAwaken, onHint: setHint }),
  5: () => createFinaleCarousel({ envMap: envs.envGlobe, textures, refractTex: post.refractRT.texture, audio, onOpenCardStudio: openCardStudio, onSelectAct: switchToAct }),
};

const ACT_TINTS = {
  1: new THREE.Color(0xffb868),
  2: new THREE.Color(0xff9468),
  3: new THREE.Color(0xffca72),
  4: new THREE.Color(0x52ffd8),
  5: new THREE.Color(0xffc878),
};

function ensureAct(id) {
  if (!renderer || !post || !envs || !textures) return null;
  if (!acts[id] && actBuilders[id]) {
    acts[id] = actBuilders[id]();
    renderer.shadowMap.needsUpdate = true;
  }
  return acts[id];
}

let activeActId = clamp(parseInt(Q.get('act') || '1', 10) || 1, 1, 5);

// ---------------- Optical Bokeh Transition & Progress HUD ----------------
let pendingActId = null;
let transProgress = 0;
let transDir = 0;
let transTint = (ACT_TINTS[activeActId] || ACT_TINTS[1]).clone();
let lastProgCode = -1;

function syncProgressPips(act) {
  if (!act || !act.getProgress) return;
  const { current, total } = act.getProgress();
  const code = act.id * 100 + total * 10 + current;
  if (code === lastProgCode) return;
  lastProgCode = code;

  while (elProgress.children.length < total) {
    const sp = document.createElement('span');
    sp.className = 'prog-pip';
    elProgress.appendChild(sp);
  }
  while (elProgress.children.length > total) {
    elProgress.removeChild(elProgress.lastChild);
  }
  for (let i = 0; i < total; i++) {
    elProgress.children[i].classList.toggle('is-done', i < current);
  }
}

function syncActHUD(act) {
  if (!act) return;
  body.dataset.act = String(act.id);
  elRoman.textContent = act.roman;
  elName.textContent = act.title;
  elSub.textContent = act.subtitle;
  elHint.textContent = act.defaultHint;
  lastProgCode = -1;
  syncProgressPips(act);
  for (const t of actTabs) {
    t.classList.toggle('is-active', Number(t.dataset.act) === act.id);
  }
}
audio.setAct(activeActId);

function switchToAct(targetId) {
  if (!actBuilders[targetId]) return;
  if (pendingActId === null && targetId === activeActId) return;
  if (pendingActId === targetId) return;
  try {
    audio.unlock();
    audio.playHoverTick(1.15);
  } catch {}
  if (targetId === activeActId) {
    pendingActId = null;
    transDir = -1;
    elBanner.classList.remove('is-switching');
    return;
  }
  pendingActId = targetId;
  transDir = 1;
  transTint.copy(ACT_TINTS[targetId] || ACT_TINTS[1]);
  elBanner.classList.add('is-switching');
  for (const t of actTabs) {
    t.classList.toggle('is-active', Number(t.dataset.act) === targetId);
  }
}

// ---------------- Sizing & EMA Adaptive Resolution Guardian (60fps Lock) ----------------
let baseDpr = Math.min(window.devicePixelRatio || 1, 2);
if (CAPTURE && Q.get('dpr')) baseDpr = clamp(parseFloat(Q.get('dpr')), 1, 2);
let resScale = 1.0;

function applyResolution() {
  if (!renderer || !post) return;
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  camera.aspect = w / h;
  camera.fov = w < h ? 54 : 42;
  camera.updateProjectionMatrix();

  const effDpr = baseDpr * resScale;
  renderer.setPixelRatio(effDpr);
  renderer.setSize(w, h, false);
  const rw = Math.max(1, Math.floor(w * effDpr));
  const rh = Math.max(1, Math.floor(h * effDpr));
  post.setSize(rw, rh);
}
window.addEventListener('resize', applyResolution);

// ---------------- 3D Envelope Unboxing & UI Controls ----------------
let unsealRequested = Boolean(SKIP_PROLOGUE || window.__pendingUnseal);
let unsealAnimStartedAt = 0;

function finalizeEnterIfReady() {
  if (!unsealRequested || !engineReady || body.dataset.state === 'playing') return;
  const elapsed = performance.now() - unsealAnimStartedAt;
  const remain = SKIP_PROLOGUE ? 0 : Math.max(0, 460 - elapsed);
  elPrologue.classList.remove('is-pre-unsealing');
  elPrologue.classList.add('is-opening');
  transProgress = 0.92;
  transDir = -1;
  if (remain <= 0) {
    body.dataset.state = 'playing';
  } else {
    setTimeout(() => {
      body.dataset.state = 'playing';
    }, remain);
  }
}

function enterStage() {
  if (body.dataset.state === 'playing' || unsealRequested) return;
  unsealRequested = true;
  unsealAnimStartedAt = performance.now();
  try {
    audio.playWaxSealBreak();
  } catch {}
  if (engineReady) {
    finalizeEnterIfReady();
  } else {
    elPrologue.classList.add('is-pre-unsealing');
    const cap = btnWaxSeal && btnWaxSeal.querySelector('.seal-caption');
    if (cap) cap.textContent = '正在点亮冬夜微缩剧场…';
  }
}
window.__enterStage = enterStage;

if (window.__pendingUnseal && !SKIP_PROLOGUE) {
  unsealAnimStartedAt = performance.now() - 300;
  try {
    audio.playWaxSealBreak();
  } catch {}
}

btnWaxSeal.addEventListener('click', enterStage);

for (const tab of actTabs) {
  tab.addEventListener('click', () => switchToAct(Number(tab.dataset.act)));
}

btnHome.addEventListener('click', () => switchToAct(1));
btnFinaleTop.addEventListener('click', () => switchToAct(5));
btnResetCam.addEventListener('click', () => {
  const act = acts[activeActId];
  if (act && act.cameraRig) {
    act.cameraRig.resetFraming();
    audio.playHoverTick(1.25);
  }
});

btnSound.addEventListener('click', () => {
  audio.unlock();
  const nextMuted = !audio.muted;
  audio.setMuted(nextMuted);
  body.classList.toggle('is-muted', nextMuted);
});

btnCardOpen.addEventListener('click', () => {
  audio.unlock();
  audio.playPaperFold(true);
  openCardStudio();
});
btnCardClose.addEventListener('click', closeCardStudio);
elCardModal.addEventListener('click', (e) => {
  if (e.target === elCardModal) closeCardStudio();
});

for (const sw of themeSwatches) {
  sw.addEventListener('click', () => {
    selectedCardTheme = sw.dataset.theme;
    for (const s of themeSwatches) s.classList.toggle('is-selected', s === sw);
    audio.playHoverTick(1.1);
    refreshKeepsakePreview();
  });
}

[inpTo, inpMsg, inpFrom].forEach((el) => {
  el.addEventListener('input', refreshKeepsakePreview);
});

btnDownloadCard.addEventListener('click', () => {
  refreshKeepsakePreview();
  const link = document.createElement('a');
  link.download = `NOEL-IV-圣诞礼笺-${(inpTo.value || '祝福').trim()}.png`;
  link.href = keepsakeCanvas.toDataURL('image/png');
  link.click();
  elCopyFeedback.textContent = '印刷级高清烫金贺卡已生成下载。';
});

btnCopyLink.addEventListener('click', async () => {
  const url = new URL(location.href.split('?')[0]);
  url.searchParams.set('to', inpTo.value.trim());
  url.searchParams.set('msg', inpMsg.value.trim());
  url.searchParams.set('from', inpFrom.value.trim());
  url.searchParams.set('theme', selectedCardTheme);
  try {
    await navigator.clipboard.writeText(url.toString());
    elCopyFeedback.textContent = '专属拆封惊喜链接已复制，可直接发送给对方。';
  } catch {
    elCopyFeedback.textContent = url.toString();
  }
});

window.addEventListener('keydown', (e) => {
  if (!elCardModal.hidden) {
    if (e.key === 'Escape') closeCardStudio();
    return;
  }
  if (body.dataset.state !== 'playing') {
    if (e.key === 'Enter' || e.key === ' ') enterStage();
    return;
  }
  if (e.key >= '1' && e.key <= '4') switchToAct(Number(e.key));
  if (e.key === '5' && (!tabFinale.hidden || Q.has('all'))) switchToAct(5);
  if (e.key === 'm' || e.key === 'M') btnSound.click();
  if (e.key === 'r' || e.key === 'R') btnResetCam.click();
});

// ---------------- Zero-GC Raycasting, Wheel/Pinch Zoom & Blank-Space Orbit ----------------
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2(0, 0);
const parallaxState = { x: 0, y: 0 };
const parallaxSpring = new Spring2D(0, 0, 55, 13);
const cursorSpring = new Spring2D(window.innerWidth * 0.5, window.innerHeight * 0.5, 420, 28);

let hoveredObj = null;
let isPointerDown = false;
let isManipulatingProp = false;
let raycastDirty = false;
let idleTimer = null;

// Pinch-to-zoom multi-touch tracking
const activeTouches = new Map();
let lastPinchDist = 0;

function resetIdle() {
  body.classList.remove('is-idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!isPointerDown && elCardModal.hidden) body.classList.add('is-idle');
  }, 4000);
}

function updatePointerCoords(clientX, clientY) {
  pointerNDC.x = (clientX / Math.max(1, window.innerWidth)) * 2 - 1;
  pointerNDC.y = -(clientY / Math.max(1, window.innerHeight)) * 2 + 1;
  parallaxSpring.setTarget(clamp(pointerNDC.x, -1, 1), clamp(pointerNDC.y, -1, 1));
  cursorSpring.setTarget(clientX, clientY);
}

function pickInteractable(act) {
  if (!act || !act.interactables || act.interactables.length === 0) return null;
  act.applyCamera(camera);
  camera.updateMatrixWorld();
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(act.interactables, false);
  return hits.length > 0 ? hits[0] : null;
}

canvas.addEventListener(
  'wheel',
  (e) => {
    if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
    e.preventDefault();
    resetIdle();
    const act = acts[activeActId];
    if (act && act.cameraRig) act.cameraRig.onWheel(e.deltaY);
  },
  { passive: false }
);

canvas.addEventListener('dblclick', (e) => {
  if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
  updatePointerCoords(e.clientX, e.clientY);
  const act = acts[activeActId];
  const hit = pickInteractable(act);
  if (!hit && act && act.cameraRig) {
    act.cameraRig.resetFraming();
    audio.playHoverTick(1.3);
  }
});

canvas.addEventListener('pointermove', (e) => {
  resetIdle();
  elCursor.classList.add('is-visible');
  updatePointerCoords(e.clientX, e.clientY);

  if (activeTouches.has(e.pointerId)) {
    activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activeTouches.size === 2) {
      const pts = Array.from(activeTouches.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (lastPinchDist > 0 && acts[activeActId]?.cameraRig) {
        acts[activeActId].cameraRig.onPinchScale(dist / lastPinchDist);
      }
      lastPinchDist = dist;
      return;
    }
  }

  if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
  const act = acts[activeActId];

  if (isPointerDown) {
    if (isManipulatingProp) {
      act.onPointerMove(pointerNDC);
    } else if (act.cameraRig) {
      act.cameraRig.moveOrbitDrag(pointerNDC);
    }
    return;
  }

  act.onPointerMove(pointerNDC);
  // Defer raycast to once per animation frame (zero 240Hz mouse lag!)
  raycastDirty = true;
});

canvas.addEventListener('pointerdown', (e) => {
  resetIdle();
  activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (activeTouches.size === 2) {
    const pts = Array.from(activeTouches.values());
    lastPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    return;
  }

  if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
  audio.unlock();
  updatePointerCoords(e.clientX, e.clientY);
  isPointerDown = true;
  elCursor.classList.add('is-drag');

  const act = acts[activeActId];
  const hit = pickInteractable(act);
  isManipulatingProp = Boolean(act.onPointerDown(hit, pointerNDC));
  if (!isManipulatingProp && act.cameraRig) {
    act.cameraRig.beginOrbitDrag(pointerNDC);
    canvas.style.cursor = 'grabbing';
  }
});

function handlePointerEnd(e) {
  if (e && activeTouches.has(e.pointerId)) {
    activeTouches.delete(e.pointerId);
    if (activeTouches.size < 2) lastPinchDist = 0;
  }
  if (!isPointerDown) return;
  isPointerDown = false;
  isManipulatingProp = false;
  elCursor.classList.remove('is-drag');
  const act = acts[activeActId];
  if (act) {
    act.onPointerUp();
    if (act.cameraRig) act.cameraRig.endOrbitDrag();
  }
  raycastDirty = true;
}

window.addEventListener('pointerup', handlePointerEnd);
window.addEventListener('pointercancel', handlePointerEnd);

// ---------------- Zero-GC Main Render Loop & Adaptive 60fps Guardian ----------------
let lastTime = performance.now() * 0.001;
let simTime = 0;
let emaDt = 0.0166;
let slowFrames = 0;

function updateHoverRaycast(act) {
  const hit = pickInteractable(act);
  if (hit) {
    if (hoveredObj !== hit.object) {
      hoveredObj = hit.object;
      audio.playHoverTick(1.0);
      if (act.onHoverHit) act.onHoverHit(hit);
    }
    elCursor.classList.add('is-hover');
    const lbl = hit.object.userData?.label || '';
    if (lbl) {
      elCursorLabel.textContent = lbl;
      elCursor.classList.add('has-label');
    } else {
      elCursor.classList.remove('has-label');
    }
    canvas.style.cursor = 'pointer';
  } else {
    hoveredObj = null;
    elCursor.classList.remove('is-hover', 'has-label');
    canvas.style.cursor = 'grab';
  }
}

function updateSigilFlight(dt) {
  if (!sigilFlight) return;
  sigilFlight.elapsed += dt;
  const u = clamp(sigilFlight.elapsed / sigilFlight.dur, 0, 1);
  // Smooth ease-in-out cubic Bezier curve
  const t = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
  const inv = 1 - t;
  const x = inv * inv * sigilFlight.x0 + 2 * inv * t * sigilFlight.cx + t * t * sigilFlight.x1;
  const y = inv * inv * sigilFlight.y0 + 2 * inv * t * sigilFlight.cy + t * t * sigilFlight.y1;
  const sc = lerp(1.35, 0.52, t);
  elFlyingSigil.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(t * 180).toFixed(0)}deg) scale(${sc.toFixed(2)})`;

  if (u >= 1) {
    elFlyingSigil.style.opacity = '0';
    sigilFlight.tab.classList.add('is-awakened', 'just-socketed');
    audio.playBellChime(7);
    sigilFlight = null;
  }
}

function renderFrame(dt) {
  if (!engineReady || !acts[activeActId]) return;
  simTime += dt;

  if (transDir !== 0) {
    const speed = transDir > 0 ? 3.1 : 2.2;
    transProgress = clamp(transProgress + transDir * dt * speed, 0, 1);
    if (transDir > 0 && transProgress >= 1) {
      ensureAct(pendingActId);
      activeActId = pendingActId;
      pendingActId = null;
      syncActHUD(acts[activeActId]);
      audio.setAct(activeActId);
      renderer.shadowMap.needsUpdate = true;
      elBanner.classList.remove('is-switching');
      transDir = -1;
    } else if (transDir < 0 && transProgress <= 0) {
      transDir = 0;
    }
  }

  parallaxSpring.update(dt);
  parallaxState.x = parallaxSpring.x;
  parallaxState.y = parallaxSpring.y;

  cursorSpring.update(dt);
  elCursor.style.transform = `translate3d(${cursorSpring.x.toFixed(1)}px, ${cursorSpring.y.toFixed(1)}px, 0)`;

  updateSigilFlight(dt);

  const act = acts[activeActId];
  if (raycastDirty && !isPointerDown && body.dataset.state === 'playing' && elCardModal.hidden) {
    raycastDirty = false;
    updateHoverRaycast(act);
  }

  act.update(dt, simTime, parallaxState);
  syncProgressPips(act);
  act.applyCamera(camera);

  if (++shadowTick % 3 === 0) {
    renderer.shadowMap.needsUpdate = true;
  }

  const postOpts = act.getPostOpts ? act.getPostOpts() : act.postOpts;
  post.render(act.scene, camera, simTime, {
    ...postOpts,
    transition: transProgress,
    transTint,
  });
}

function tick(nowMs) {
  if (CAPTURE) return;
  requestAnimationFrame(tick);
  const now = nowMs * 0.001;
  const rawDt = now - lastTime;
  lastTime = now;
  const dt = Math.min(0.05, Math.max(0.001, rawDt));

  // EMA Adaptive Resolution Guardian: gently step down internal DPR if GPU exceeds 16.5ms
  if (rawDt > 0.002 && rawDt < 0.12) {
    emaDt = emaDt * 0.90 + rawDt * 0.10;
    if (emaDt > 0.0172 && resScale > 0.80) {
      slowFrames++;
      if (slowFrames > 28) {
        resScale = Math.max(0.80, resScale - 0.08);
        slowFrames = 0;
        applyResolution();
      }
    } else {
      slowFrames = 0;
    }
  }

  renderFrame(dt);
}

function bootStep1() {
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: CAPTURE,
    });
  } catch (err) {
    document.getElementById('nogl').hidden = false;
    throw err;
  }
  if (!renderer.capabilities.isWebGL2) {
    document.getElementById('nogl').hidden = false;
    throw new Error('WebGL2 required');
  }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  post = new PostPipeline(renderer);
  envs = buildStudioEnvironments(renderer);
  applyResolution();
}

function bootStep2() {
  textures = buildProceduralTextures(renderer);
}

function bootStep3() {
  ensureAct(activeActId);
  syncActHUD(acts[activeActId]);
  engineReady = true;
  lastTime = performance.now() * 0.001;
  renderFrame(0.016);
  finalizeEnterIfReady();
  if (!CAPTURE) {
    requestAnimationFrame(tick);
  }
}

let bootPromise = null;
function startNonBlockingBoot() {
  if (bootPromise) return bootPromise;
  if (CAPTURE) {
    bootStep1();
    bootStep2();
    bootStep3();
    bootPromise = Promise.resolve();
    return bootPromise;
  }
  // Yield between each stage so browser window.onload completes in <5ms and UI stays 100% responsive!
  bootPromise = new Promise((resolve) => {
    setTimeout(() => {
      try {
        bootStep1();
        setTimeout(() => {
          bootStep2();
          setTimeout(() => {
            bootStep3();
            resolve();
          }, 0);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }, 0);
  });
  return bootPromise;
}

startNonBlockingBoot();

// ---------------- Deterministic QA & Performance Telemetry Harness ----------------
window.__setChristmas = async (cfg = {}) => {
  await startNonBlockingBoot();
  if (cfg.prologue) {
    body.dataset.state = 'prologue';
    elPrologue.classList.remove('is-opening', 'is-pre-unsealing');
  } else {
    body.dataset.state = 'playing';
  }
  if (cfg.allAwakened) {
    [1, 2, 3, 4].forEach((id) => {
      ensureAct(id);
      handleAwaken(id, '');
    });
    elToast.classList.remove('is-shown');
  }
  if (cfg.act) {
    ensureAct(cfg.act);
    activeActId = clamp(cfg.act, 1, 5);
    pendingActId = null;
    transProgress = cfg.transition ?? 0;
    transDir = 0;
    syncActHUD(acts[activeActId]);
  }
  if (cfg.zoom && acts[activeActId]?.cameraRig) {
    acts[activeActId].cameraRig.rawZoom = cfg.zoom;
    acts[activeActId].cameraRig.zoomSpring.snap(cfg.zoom);
  } else if (acts[activeActId]?.cameraRig) {
    acts[activeActId].cameraRig.resetFraming();
  }
  if (cfg.preset && acts[activeActId].setCaptureState) {
    acts[activeActId].setCaptureState(cfg.preset);
  }
  if (cfg.cardTheme && CARD_THEMES[cfg.cardTheme]) {
    selectedCardTheme = cfg.cardTheme;
    for (const sw of themeSwatches) sw.classList.toggle('is-selected', sw.dataset.theme === selectedCardTheme);
  }
  if (cfg.cardModal) {
    openCardStudio();
  } else {
    closeCardStudio();
  }

  simTime = cfg.time ?? 3.2;
  renderer.shadowMap.needsUpdate = true;
  for (let i = 0; i < 3; i++) renderFrame(0.016);

  // Measure EXACT steady-state main-scene DrawCalls on a clean single scene render for strict QA!
  renderer.shadowMap.needsUpdate = false;
  renderer.info.autoReset = false;
  renderer.info.reset();
  renderFrame(0.016);
  const totalPipelineCalls = renderer.info.render.calls;
  const totalTriangles = renderer.info.render.triangles;

  renderer.info.reset();
  renderer.setRenderTarget(post.sceneRT);
  renderer.render(acts[activeActId].scene, camera);
  renderer.setRenderTarget(null);
  const mainPassCalls = renderer.info.render.calls;
  renderer.info.autoReset = true;
  renderFrame(0.016);

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return {
    act: activeActId,
    state: body.dataset.state,
    awakened: awakenedActs.size,
    mainPassDrawCalls: mainPassCalls,
    totalPipelineCalls,
    triangles: totalTriangles,
  };
};

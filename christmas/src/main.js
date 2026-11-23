// NOEL · IV — The Winter Quartet Stage Director
// Orchestrates Prologue wax-seal unboxing, HDR Bokeh transitions across Acts I–IV & Finale V,
// magnetic cursor micro-anticipation, dynamic 4-voice waltz mixing, and bespoke keepsake card studio.

import * as THREE from '../../vendor/three/three.module.js';
import { Spring2D, clamp } from './physics.js';
import { PostPipeline } from './post.js';
import { buildStudioEnvironments, buildProceduralTextures } from './textures.js';
import { QuartetAudio } from './audio.js';
import { createAct1Paper } from './act1_paper.js';
import { createAct2Clay } from './act2_clay.js';
import { createAct3Globe } from './act3_globe.js';
import { createAct4Aurora } from './act4_aurora.js';
import { createFinaleCarousel, renderKeepsakeCard } from './finale_carousel.js';

const Q = new URLSearchParams(location.search);
const CAPTURE = Q.has('capture');
const SKIP_PROLOGUE = Q.has('skip') || CAPTURE;

const body = document.body;
const canvas = document.getElementById('stage');

// ---------------- WebGL2 Renderer & HDR Post Pipeline ----------------
let renderer;
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

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
const post = new PostPipeline(renderer);
const audio = new QuartetAudio();

// Bake procedural textures & 4 bespoke HDR studio IBL environments
const envs = buildStudioEnvironments(renderer);
const textures = buildProceduralTextures();

// ---------------- UI Elements & URL Gift Personalization ----------------
const elPrologue = document.getElementById('prologue');
const btnWaxSeal = document.getElementById('wax-seal-btn');
const elRecipient = document.getElementById('env-recipient');
const elBanner = document.getElementById('act-banner');
const elRoman = document.getElementById('act-roman');
const elName = document.getElementById('act-name');
const elSub = document.getElementById('act-sub');
const elHint = document.getElementById('whisper-hint');
const elToast = document.getElementById('sigil-toast');
const elCursor = document.getElementById('cursor-halo');
const elCursorLabel = document.getElementById('cursor-label');

const btnHome = document.getElementById('btn-home');
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
  elToast.textContent = text;
  elToast.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elToast.classList.remove('is-shown'), 3600);
}

function setHint(text) {
  elHint.textContent = text;
}

// ---------------- Instantiate All Four Acts + Finale Carousel ----------------
const awakenedActs = new Set();

function handleAwaken(actId, message) {
  if (awakenedActs.has(actId)) return;
  awakenedActs.add(actId);
  audio.awakenVoice(actId);

  const tab = document.querySelector(`.act-tab[data-act="${actId}"]`);
  if (tab) tab.classList.add('is-awakened');
  showToast(message);

  if (awakenedActs.size === 4) {
    btnFinaleTop.hidden = false;
    tabFinale.hidden = false;
    finaleRailLine.hidden = false;
    setTimeout(() => {
      showToast('四枚冬夜星徽已集齐 · 平安夜四重奏终章已解锁');
    }, 2200);
  }
}

const acts = {
  1: createAct1Paper({
    envMap: envs.envPaper,
    textures,
    audio,
    onAwaken: handleAwaken,
    onHint: setHint,
  }),
  2: createAct2Clay({
    envMap: envs.envClay,
    textures,
    audio,
    onAwaken: handleAwaken,
    onHint: setHint,
  }),
  3: createAct3Globe({
    envMap: envs.envGlobe,
    textures,
    refractTex: post.refractRT.texture,
    audio,
    onAwaken: handleAwaken,
    onHint: setHint,
  }),
  4: createAct4Aurora({
    envMap: envs.envAurora,
    textures,
    audio,
    onAwaken: handleAwaken,
    onHint: setHint,
  }),
  5: createFinaleCarousel({
    envMap: envs.envGlobe,
    textures,
    audio,
    onOpenCardStudio: openCardStudio,
  }),
};

// ---------------- Optical Bokeh Transition State Machine ----------------
let activeActId = clamp(parseInt(Q.get('act') || '1', 10) || 1, 1, 5);
let pendingActId = null;
let transProgress = 0; // 0 = crisp, 1 = peak bokeh morph
let transDir = 0;      // 1 = blurring out, -1 = focusing in
let transTint = acts[activeActId].transTint.clone();

function syncActHUD(act) {
  body.dataset.act = String(act.id);
  elRoman.textContent = act.roman;
  elName.textContent = act.title;
  elSub.textContent = act.subtitle;
  elHint.textContent = act.defaultHint;
  for (const t of actTabs) {
    t.classList.toggle('is-active', Number(t.dataset.act) === act.id);
  }
}
syncActHUD(acts[activeActId]);
audio.setAct(activeActId);

function switchToAct(targetId) {
  if (!acts[targetId]) return;
  if (pendingActId === null && targetId === activeActId) return;
  if (pendingActId === targetId) return;
  audio.unlock();
  audio.playHoverTick(1.15);
  if (targetId === activeActId) {
    pendingActId = null;
    transDir = -1;
    elBanner.classList.remove('is-switching');
    return;
  }
  pendingActId = targetId;
  transDir = 1;
  transTint.copy(acts[targetId].transTint);
  elBanner.classList.add('is-switching');
  for (const t of actTabs) {
    t.classList.toggle('is-active', Number(t.dataset.act) === targetId);
  }
}

// ---------------- Sizing & Adaptive DPR ----------------
let dpr = Math.min(window.devicePixelRatio || 1, 2);
if (CAPTURE && Q.get('dpr')) dpr = clamp(parseFloat(Q.get('dpr')), 1, 2);

function resize() {
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  camera.aspect = w / h;
  // Slightly widen FOV on portrait mobile screens so miniatures never crop horizontally
  camera.fov = w < h ? 54 : 42;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  const rw = Math.max(1, Math.floor(w * dpr));
  const rh = Math.max(1, Math.floor(h * dpr));
  post.setSize(rw, rh);
}
window.addEventListener('resize', resize);
resize();

// ---------------- Prologue Unboxing & UI Events ----------------
function enterStage() {
  if (body.dataset.state === 'playing') return;
  elPrologue.classList.add('is-opening');
  audio.playWaxSealBreak();
  // Opening bokeh reveal
  transProgress = 0.92;
  transDir = -1;
  setTimeout(() => {
    body.dataset.state = 'playing';
  }, 320);
}

if (SKIP_PROLOGUE) {
  body.dataset.state = 'playing';
}

btnWaxSeal.addEventListener('click', enterStage);

for (const tab of actTabs) {
  tab.addEventListener('click', () => {
    const id = Number(tab.dataset.act);
    switchToAct(id);
  });
}

btnHome.addEventListener('click', () => switchToAct(1));
btnFinaleTop.addEventListener('click', () => switchToAct(5));

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

[inpTo, inpMsg, inpFrom].forEach((el) => {
  el.addEventListener('input', refreshKeepsakePreview);
});

btnDownloadCard.addEventListener('click', () => {
  refreshKeepsakePreview();
  const link = document.createElement('a');
  link.download = `NOEL-IV-圣诞礼笺-${(inpTo.value || '祝福').trim()}.png`;
  link.href = keepsakeCanvas.toDataURL('image/png');
  link.click();
  elCopyFeedback.textContent = '高清烫金贺卡已生成下载。';
});

btnCopyLink.addEventListener('click', async () => {
  const url = new URL(location.href.split('?')[0]);
  url.searchParams.set('to', inpTo.value.trim());
  url.searchParams.set('msg', inpMsg.value.trim());
  url.searchParams.set('from', inpFrom.value.trim());
  try {
    await navigator.clipboard.writeText(url.toString());
    elCopyFeedback.textContent = '专属拆封惊喜链接已复制，可直接发送给对方。';
  } catch {
    elCopyFeedback.textContent = url.toString();
  }
});

// Keyboard shortcuts (1–5 acts, Esc close modal, M mute)
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
});

// ---------------- Raycasting, Curated Parallax & Magnetic Cursor ----------------
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2(0, 0);
const parallaxSpring = new Spring2D(0, 0, 55, 13);
const cursorSpring = new Spring2D(window.innerWidth * 0.5, window.innerHeight * 0.5, 420, 28);

let hoveredObj = null;
let isPointerDown = false;
let idleTimer = null;

function resetIdle() {
  body.classList.remove('is-idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!isPointerDown && elCardModal.hidden) body.classList.add('is-idle');
  }, 3800);
}

function updatePointerCoords(clientX, clientY) {
  pointerNDC.x = (clientX / Math.max(1, window.innerWidth)) * 2 - 1;
  pointerNDC.y = -(clientY / Math.max(1, window.innerHeight)) * 2 + 1;
  parallaxSpring.setTarget(clamp(pointerNDC.x, -1, 1), clamp(pointerNDC.y, -1, 1));
  cursorSpring.setTarget(clientX, clientY);
}

function pickInteractable(act) {
  if (!act.interactables || act.interactables.length === 0) return null;
  act.applyCamera(camera);
  camera.updateMatrixWorld();
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(act.interactables, false);
  return hits.length > 0 ? hits[0] : null;
}

canvas.addEventListener('pointermove', (e) => {
  resetIdle();
  elCursor.classList.add('is-visible');
  updatePointerCoords(e.clientX, e.clientY);

  if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
  const act = acts[activeActId];

  if (isPointerDown) {
    act.onPointerMove(pointerNDC);
    return;
  }

  act.onPointerMove(pointerNDC);
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
    canvas.style.cursor = 'default';
  }
});

canvas.addEventListener('pointerdown', (e) => {
  resetIdle();
  if (body.dataset.state !== 'playing' || !elCardModal.hidden) return;
  audio.unlock();
  updatePointerCoords(e.clientX, e.clientY);
  isPointerDown = true;
  elCursor.classList.add('is-drag');

  const act = acts[activeActId];
  const hit = pickInteractable(act);
  act.onPointerDown(hit, pointerNDC);
});

window.addEventListener('pointerup', () => {
  if (!isPointerDown) return;
  isPointerDown = false;
  elCursor.classList.remove('is-drag');
  acts[activeActId].onPointerUp();
});

// ---------------- Main Render Loop ----------------
let lastTime = performance.now() * 0.001;
let simTime = 0;

function renderFrame(dt) {
  simTime += dt;

  // Optical bokeh transition progression
  if (transDir !== 0) {
    const speed = transDir > 0 ? 3.1 : 2.2;
    transProgress = clamp(transProgress + transDir * dt * speed, 0, 1);
    if (transDir > 0 && transProgress >= 1) {
      activeActId = pendingActId;
      pendingActId = null;
      syncActHUD(acts[activeActId]);
      audio.setAct(activeActId);
      elBanner.classList.remove('is-switching');
      transDir = -1;
    } else if (transDir < 0 && transProgress <= 0) {
      transDir = 0;
    }
  }

  parallaxSpring.update(dt);
  cursorSpring.update(dt);
  elCursor.style.transform = `translate3d(${cursorSpring.x.toFixed(1)}px, ${cursorSpring.y.toFixed(1)}px, 0)`;

  const act = acts[activeActId];
  act.update(dt, simTime, { x: parallaxSpring.x, y: parallaxSpring.y });
  act.applyCamera(camera);

  post.render(act.scene, camera, simTime, {
    ...act.postOpts,
    transition: transProgress,
    transTint,
  });
}

function tick(nowMs) {
  if (CAPTURE) return;
  requestAnimationFrame(tick);
  const now = nowMs * 0.001;
  const dt = Math.min(0.05, Math.max(0.001, now - lastTime));
  lastTime = now;
  renderFrame(dt);
}

if (!CAPTURE) {
  requestAnimationFrame(tick);
} else {
  renderFrame(0.016);
}

// ---------------- Deterministic QA Capture Harness ----------------
window.__setChristmas = async (cfg = {}) => {
  if (cfg.prologue) {
    body.dataset.state = 'prologue';
    elPrologue.classList.remove('is-opening');
  } else {
    body.dataset.state = 'playing';
  }
  if (cfg.allAwakened) {
    [1, 2, 3, 4].forEach((id) => handleAwaken(id, ''));
    elToast.classList.remove('is-shown');
  }
  if (cfg.act) {
    activeActId = clamp(cfg.act, 1, 5);
    pendingActId = null;
    transProgress = cfg.transition ?? 0;
    transDir = 0;
    syncActHUD(acts[activeActId]);
  }
  if (cfg.preset && acts[activeActId].setCaptureState) {
    acts[activeActId].setCaptureState(cfg.preset);
  }
  if (cfg.cardModal) {
    openCardStudio();
  } else {
    closeCardStudio();
  }
  simTime = cfg.time ?? 3.2;
  for (let i = 0; i < 4; i++) renderFrame(0.016);
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return { act: activeActId, state: body.dataset.state, awakened: awakenedActs.size };
};

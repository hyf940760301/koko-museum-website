// Igloo, Inc. — Clean-Room High-Poly WebGL2 Experience (1:1 Architectural & Interactive Parity)
// - Non-blocking micro-sliced boot (< 5ms top-level module execution) with ASCII preloader
// - Infinite modulo 3-scene scroll controller (Scene0: Igloo -> Scene1: Cubes -> Scene2: Entry -> wraps seamlessly back to Scene0!)
// - Diagonal Voronoi ice-fracture dual-FBO transitions + 1.4s gentle auto-center settle
// - Interactive click-to-explore frost portal into DetailScene (2D GPU mouseSim fluid particle chamber)

import * as THREE from '../vendor/three.module.js';
import { buildPolarTextures, buildPolarEnvironments } from './noise_tex.js';
import { createScene0Igloo } from './igloo_hero.js';
import { createScene1Cubes, PORTFOLIO_ITEMS } from './scene_cubes.js';
import { createScene2Entry, SOCIAL_CHANNELS } from './scene_entry.js';
import { createDetailScene } from './scene_detail.js';
import { createCompositorPipeline } from './post.js';
import { createPolarAudio } from './audio.js';

const ASCII_FRAMES = [
  '--===+++==',
  '---===+++=',
  '=----===++',
  '+=----===+',
  '++=----===',
  '+++=----==',
  '==+++=----',
  '===+++=---',
];

const loaderEl = document.getElementById('loader');
const loaderAsciiEl = document.getElementById('loader-ascii');
let asciiIdx = 0;
const asciiTimer = setInterval(() => {
  asciiIdx = (asciiIdx + 1) % ASCII_FRAMES.length;
  if (loaderAsciiEl) loaderAsciiEl.textContent = ASCII_FRAMES[asciiIdx];
}, 85);

function nextTurn() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function bootExperience() {
  await nextTurn();

  const canvas = document.getElementById('webgl-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: 'high-performance',
    stencil: false,
    depth: false,
  });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.autoClear = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const audio = createPolarAudio();
  const textures = buildPolarTextures(renderer);
  await nextTurn();

  const envs = buildPolarEnvironments(renderer);
  const surfaceEnv = envs.getSurfaceEnv();
  const vaultEnv = envs.getVaultEnv();
  await nextTurn();

  // Build the 3 infinite-loop scroll scenes + 1 interactive DetailScene
  const scene0 = createScene0Igloo({
    envMap: surfaceEnv,
    textures,
    onHoverClink: () => audio.playIceClink(1.0),
  });
  await nextTurn();

  const scene1 = createScene1Cubes({
    renderer,
    envMap: vaultEnv,
    textures,
  });
  await nextTurn();

  const scene2 = createScene2Entry({
    envMap: vaultEnv,
    textures,
  });
  await nextTurn();

  const detailScene = createDetailScene({
    renderer,
    envMap: vaultEnv,
    textures,
  });
  await nextTurn();

  const compositor = createCompositorPipeline(renderer, {
    scrollDataTex: textures.scrollDataTex,
    grainTex: textures.grainTex,
  });

  const scrollScenes = [scene0, scene1, scene2];
  // Cumulative virtual scroll offsets: Scene0 [0..2.35], Scene1 [2.35..5.45], Scene2 [5.45..10.65] -> wraps to 0!
  const TRANSITION_SPAN = 0.68;
  const sceneStarts = [];
  let totalScrollHeight = 0;
  for (let i = 0; i < scrollScenes.length; i++) {
    sceneStarts.push(totalScrollHeight);
    totalScrollHeight += scrollScenes[i].height;
  }

  // Start settled at Scene 0's hero autocenter (0.495 * 2.35 = 1.163) so the Igloo & mountains frame identically to igloo.inc!
  const HERO_HOME_SCROLL = scene0.height * scene0.initialScrollAutocenter;

  const state = {
    virtualScroll: HERO_HOME_SCROLL,
    targetScroll: HERO_HOME_SCROLL,
    scrollVelocity: 0,
    lastWheelTime: performance.now(),
    introElapsed: 0,
    introDuration: 2.3,
    inDetail: false,
    detailTarget: 0,
    detailProgress: 0,
    pointerNDC: new THREE.Vector2(0, 0),
    smoothPointer: new THREE.Vector2(0, 0),
    clientX: window.innerWidth * 0.5,
    clientY: window.innerHeight * 0.5,
    pointerMoved: false,
    qaOverride: false,
  };

  // ---------------- DOM References ----------------
  const logoBtn = document.getElementById('logo-btn');
  const copyrightBlock = document.getElementById('copyright-block');
  const audioBtn = document.getElementById('audio-btn');
  const audioLabel = document.getElementById('audio-label');
  const soundBars = document.getElementById('sound-bars');
  const detailCloseBtn = document.getElementById('detail-close-btn');

  const scene0Overlay = document.getElementById('scene0-overlay');
  const manifestoBlock = document.getElementById('manifesto-block');
  const scrollPrompt = document.getElementById('scroll-prompt');

  const scene1Overlay = document.getElementById('scene1-overlay');
  const cubePlaques = [0, 1, 2].map((i) => document.getElementById(`cube-label-${i}`));
  const cubeTemps = [0, 1, 2].map((i) => document.getElementById(`cube-temp-${i}`));
  const cursorPrompt = document.getElementById('cursor-prompt');
  const cursorPromptText = document.getElementById('cursor-prompt-text');

  const scene2Overlay = document.getElementById('scene2-overlay');
  const socialPrevBtn = document.getElementById('social-prev');
  const socialNextBtn = document.getElementById('social-next');
  const socialActiveLink = document.getElementById('social-active-link');
  const socialActiveName = document.getElementById('social-active-name');
  const socialTabs = Array.from(document.querySelectorAll('.social-tab'));

  const detailOverlay = document.getElementById('detail-overlay');
  const detailCode = document.getElementById('detail-code');
  const detailTitle = document.getElementById('detail-title');
  const detailSummary = document.getElementById('detail-summary');
  const detailLinks = document.getElementById('detail-links');
  const detailVisit = document.getElementById('detail-visit');
  const detailVisitLabel = document.getElementById('detail-visit-label');

  // ---------------- Sizing ----------------
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  function handleResize() {
    vw = Math.max(1, window.innerWidth);
    vh = Math.max(1, window.innerHeight);
    renderer.setSize(vw, vh, false);
    const dpr = renderer.getPixelRatio();
    const pw = Math.floor(vw * dpr);
    const ph = Math.floor(vh * dpr);
    const aspect = vw / vh;
    scene0.resize(aspect);
    scene1.resize(aspect, pw, ph);
    scene2.resize(aspect);
    detailScene.resize(aspect);
    compositor.setSize(pw, ph);
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // ---------------- DetailScene Open / Close ----------------
  function openPortfolioDetail(index) {
    const item = PORTFOLIO_ITEMS[index];
    if (!item || item.locked) {
      audio.playUiBeep(320);
      return;
    }
    audio.playPortalWhoosh();
    detailScene.setProject(item.id);
    detailCode.textContent = item.code;
    detailTitle.textContent = item.name;
    detailSummary.textContent = item.summary;
    detailLinks.innerHTML = '';
    item.links.forEach((lnk) => {
      const a = document.createElement('a');
      a.className = 'detail-social-chip';
      a.href = lnk.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = lnk.label;
      detailLinks.appendChild(a);
    });
    detailVisit.href = item.visitUrl;
    detailVisitLabel.textContent = item.visitLabel;

    state.inDetail = true;
    state.detailTarget = 1;
    cursorPrompt.classList.add('hidden');
    detailCloseBtn.classList.remove('hidden');
  }

  function closePortfolioDetail() {
    if (!state.inDetail) return;
    audio.playPortalWhoosh();
    state.inDetail = false;
    state.detailTarget = 0;
    detailCloseBtn.classList.add('hidden');
    detailOverlay.classList.add('hidden');
  }

  detailCloseBtn.addEventListener('click', closePortfolioDetail);
  cubePlaques.forEach((el, idx) => {
    el.addEventListener('click', () => openPortfolioDetail(idx));
  });

  // ---------------- Social Switcher (Scene 2 Entry) ----------------
  function syncSocialUI(idx) {
    const ch = SOCIAL_CHANNELS[idx];
    socialActiveName.textContent = ch.name;
    socialActiveLink.href = ch.url;
    socialTabs.forEach((btn, i) => btn.classList.toggle('is-active', i === idx));
  }

  socialPrevBtn.addEventListener('click', () => {
    audio.playUiBeep(980);
    scene2.setChannel(scene2.getActiveChannel() - 1);
    syncSocialUI(scene2.getActiveChannel());
  });

  socialNextBtn.addEventListener('click', () => {
    audio.playUiBeep(1180);
    scene2.setChannel(scene2.getActiveChannel() + 1);
    syncSocialUI(scene2.getActiveChannel());
  });

  socialTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.ch) || 0;
      audio.playUiBeep(1080);
      scene2.setChannel(idx);
      syncSocialUI(scene2.getActiveChannel());
    });
  });

  // ---------------- Header & Audio Controls ----------------
  audioBtn.addEventListener('click', () => {
    const isMuted = audio.toggleMute();
    audioBtn.setAttribute('aria-pressed', String(!isMuted));
    audioLabel.textContent = isMuted ? 'Sound Off' : 'Sound On';
    soundBars.classList.toggle('is-playing', !isMuted);
    if (!isMuted) audio.playUiBeep(1320);
  });

  logoBtn.addEventListener('click', () => {
    if (state.inDetail) closePortfolioDetail();
    // Smoothly scroll to nearest modulo multiple of HERO_HOME_SCROLL
    const loops = Math.round((state.targetScroll - HERO_HOME_SCROLL) / totalScrollHeight);
    state.targetScroll = loops * totalScrollHeight + HERO_HOME_SCROLL;
    state.lastWheelTime = performance.now();
  });

  // ---------------- Wheel, Touch & Keyboard Infinite Scroll ----------------
  window.addEventListener(
    'wheel',
    (e) => {
      if (state.inDetail) return;
      e.preventDefault();
      state.qaOverride = false;
      const dy = THREE.MathUtils.clamp(e.deltaY, -160, 160);
      state.targetScroll += dy * 0.0032;
      state.lastWheelTime = performance.now();
    },
    { passive: false }
  );

  let touchY = null;
  window.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) touchY = e.touches[0].clientY;
    },
    { passive: true }
  );
  window.addEventListener(
    'touchmove',
    (e) => {
      if (touchY === null || e.touches.length !== 1 || state.inDetail) return;
      const y = e.touches[0].clientY;
      const dy = touchY - y;
      touchY = y;
      state.qaOverride = false;
      state.targetScroll += dy * 0.0065;
      state.lastWheelTime = performance.now();
    },
    { passive: true }
  );
  window.addEventListener('touchend', () => {
    touchY = null;
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.inDetail) {
      closePortfolioDetail();
      return;
    }
    if (state.inDetail) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      state.targetScroll += 0.65;
      state.lastWheelTime = performance.now();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      state.targetScroll -= 0.65;
      state.lastWheelTime = performance.now();
    }
  });

  // ---------------- Pointer Raycasting & Click ----------------
  const raycaster = new THREE.Raycaster();
  window.addEventListener('pointermove', (e) => {
    state.clientX = e.clientX;
    state.clientY = e.clientY;
    state.pointerNDC.x = (e.clientX / vw) * 2 - 1;
    state.pointerNDC.y = -(e.clientY / vh) * 2 + 1;
    state.pointerMoved = true;
  });

  canvas.addEventListener('click', () => {
    if (state.inDetail || state.detailProgress > 0.1) return;
    const wrapped = ((state.virtualScroll % totalScrollHeight) + totalScrollHeight) % totalScrollHeight;
    if (wrapped >= sceneStarts[1] - 0.3 && wrapped < sceneStarts[2] - 0.2) {
      const hoveredCube = scene1.getHoveredIndex();
      if (hoveredCube >= 0) {
        openPortfolioDetail(hoveredCube);
      }
    } else if (wrapped >= sceneStarts[2]) {
      if (scene2.isCloudHovered()) {
        const ch = SOCIAL_CHANNELS[scene2.getActiveChannel()];
        window.open(ch.url, '_blank', 'noopener,noreferrer');
      }
    }
  });

  // ---------------- Compute Active Scene A, Incoming Scene B & Split Progress ----------------
  function resolveScrollState(rawScroll) {
    const wrapped = ((rawScroll % totalScrollHeight) + totalScrollHeight) % totalScrollHeight;
    let idxA = 0;
    for (let i = scrollScenes.length - 1; i >= 0; i--) {
      if (wrapped >= sceneStarts[i]) {
        idxA = i;
        break;
      }
    }
    const idxB = (idxA + 1) % scrollScenes.length;
    const scA = scrollScenes[idxA];
    const scB = scrollScenes[idxB];
    const localPos = wrapped - sceneStarts[idxA]; // [0 .. scA.height]
    const activeSpan = scA.height - TRANSITION_SPAN;

    let progressA = 0;
    let progressB = 0;
    let splitProgress = 0;

    if (localPos <= activeSpan) {
      // Pure Scene A (normalize localPos over scA.height so camera keeps moving smoothly into transition!)
      progressA = localPos / scA.height;
      splitProgress = 0;
    } else {
      // Diagonal fracture transition zone [activeSpan .. scA.height]
      progressA = localPos / scA.height;
      splitProgress = THREE.MathUtils.clamp((localPos - activeSpan) / TRANSITION_SPAN, 0, 1);
      // Pre-advance Scene B slightly during wipe so it enters with living motion!
      progressB = splitProgress * 0.12;
      if (idxB === 0) {
        // When wrapping from Scene 2 back to Scene 0, land gracefully near Scene 0's hero view!
        progressB = THREE.MathUtils.lerp(0.18, scB.initialScrollAutocenter, splitProgress);
      }
    }

    return { idxA, idxB, scA, scB, progressA, progressB, splitProgress, wrapped, localPos };
  }

  // Gentle auto-center settle after 1.4s of idle wheel (matches jF.autoCenter!)
  const SNAP_POINTS = [
    HERO_HOME_SCROLL,                          // Scene 0 Igloo settled hero
    sceneStarts[1] + 0.16,                     // Scene 1 Cube 01 (Pudgy Penguins)
    sceneStarts[1] + 1.24,                     // Scene 1 Cube 02 (Overpass)
    sceneStarts[1] + 2.30,                     // Scene 1 Cube 03 (Mystery)
    sceneStarts[2] + scene2.height * 0.74,     // Scene 2 Subterranean Halo Chamber ("/// Follow Us")
  ];

  function applyIdleAutoCenter(nowMs, dt) {
    if (state.qaOverride || state.inDetail || nowMs - state.lastWheelTime < 1400) return;
    const loops = Math.floor(state.targetScroll / totalScrollHeight);
    const wrapped = state.targetScroll - loops * totalScrollHeight;
    let bestSnap = wrapped;
    let minDiff = Infinity;
    for (let i = 0; i < SNAP_POINTS.length; i++) {
      const sp = SNAP_POINTS[i];
      const diff = Math.abs(wrapped - sp);
      if (diff < minDiff) {
        minDiff = diff;
        bestSnap = sp;
      }
    }
    // Only nudge gently if close to a transition seam or cube center
    if (minDiff < 0.42) {
      const goal = loops * totalScrollHeight + bestSnap;
      state.targetScroll += (goal - state.targetScroll) * Math.min(1, dt * 2.2);
    }
  }

  // ---------------- Deterministic QA Inspection Hook ----------------
  window.__setIglooState = (opts = {}) => {
    state.qaOverride = true;
    state.introElapsed = state.introDuration + 1;
    if (typeof opts.virtualScroll === 'number') {
      state.virtualScroll = opts.virtualScroll;
      state.targetScroll = opts.virtualScroll;
    }
    if (typeof opts.scene === 'number') {
      const sIdx = ((opts.scene % 3) + 3) % 3;
      const p = typeof opts.progress === 'number' ? opts.progress : 0.5;
      const val = sceneStarts[sIdx] + scrollScenes[sIdx].height * p;
      state.virtualScroll = val;
      state.targetScroll = val;
    }
    if (typeof opts.socialChannel === 'number') {
      scene2.setChannel(opts.socialChannel);
      syncSocialUI(scene2.getActiveChannel());
    }
    if (typeof opts.detailProject === 'number') {
      if (opts.detailProject >= 0) {
        openPortfolioDetail(opts.detailProject);
        state.detailProgress = 1.0;
        state.detailTarget = 1.0;
      } else {
        closePortfolioDetail();
        state.detailProgress = 0.0;
        state.detailTarget = 0.0;
      }
    }
  };
  window.__iglooMeta = { sceneStarts, totalScrollHeight, HERO_HOME_SCROLL };

  // Dismiss ASCII preloader smoothly once boot finishes!
  clearInterval(asciiTimer);
  if (loaderEl) loaderEl.classList.add('is-done');
  document.body.dataset.ready = '1';

  // ---------------- Main Render Loop ----------------
  let prevTime = performance.now();

  function tick(now) {
    requestAnimationFrame(tick);

    const dt = Math.min(0.05, Math.max(0.001, (now - prevTime) * 0.001));
    prevTime = now;
    const elapsed = now * 0.001;

    state.introElapsed += dt;
    const introRaw = THREE.MathUtils.clamp(state.introElapsed / state.introDuration, 0, 1);
    const introWeight = 1 - Math.pow(1 - introRaw, 3);

    applyIdleAutoCenter(now, dt);

    const prevScroll = state.virtualScroll;
    state.virtualScroll += (state.targetScroll - state.virtualScroll) * Math.min(1, dt * 8.0);
    state.scrollVelocity = (state.virtualScroll - prevScroll) / Math.max(dt, 0.008);

    state.detailProgress += (state.detailTarget - state.detailProgress) * Math.min(1, dt * 5.2);
    state.smoothPointer.lerp(state.pointerNDC, Math.min(1, dt * 8.5));

    const resolved = resolveScrollState(state.virtualScroll);

    // Raycast against active scene (only when user has moved pointer!)
    if (!state.inDetail && state.detailProgress < 0.2 && state.pointerMoved) {
      if (resolved.idxA === 0 && state.pointerMoved) {
        raycaster.setFromCamera(state.pointerNDC, scene0.camera);
        const hitIgloo = scene0.setPointerRaycast(raycaster, elapsed);
        canvas.style.cursor = hitIgloo ? 'pointer' : 'default';
        cursorPrompt.classList.add('hidden');
      } else if (resolved.idxA === 1 || (resolved.idxB === 1 && resolved.splitProgress > 0.5)) {
        raycaster.setFromCamera(state.pointerNDC, scene1.camera);
        const hIdx = scene1.setPointerRaycast(raycaster);
        if (hIdx >= 0) {
          const item = PORTFOLIO_ITEMS[hIdx];
          canvas.style.cursor = item.locked ? 'not-allowed' : 'pointer';
          cursorPromptText.textContent = item.locked ? '???????????????' : 'Click to explore';
          cursorPrompt.classList.remove('hidden');
          cursorPrompt.style.transform = `translate3d(${Math.round(state.clientX + 18)}px, ${Math.round(state.clientY - 14)}px, 0)`;
        } else {
          canvas.style.cursor = 'default';
          cursorPrompt.classList.add('hidden');
        }
      } else if (resolved.idxA === 2) {
        raycaster.setFromCamera(state.pointerNDC, scene2.camera);
        const hitCloud = scene2.setPointerRaycast(raycaster);
        canvas.style.cursor = hitCloud ? 'pointer' : 'default';
        cursorPrompt.classList.add('hidden');
      }
    } else {
      canvas.style.cursor = 'default';
      cursorPrompt.classList.add('hidden');
    }

    // Update visible scenes
    if (state.detailProgress < 0.999) {
      if (resolved.idxA === 0) scene0.update(dt, elapsed, resolved.progressA, introWeight, state.smoothPointer);
      else if (resolved.idxA === 1) scene1.update(dt, elapsed, resolved.progressA, state.smoothPointer);
      else scene2.update(dt, elapsed, resolved.progressA, state.smoothPointer);

      if (resolved.splitProgress > 0.001) {
        if (resolved.idxB === 0) scene0.update(dt, elapsed, resolved.progressB, 1.0, state.smoothPointer);
        else if (resolved.idxB === 1) scene1.update(dt, elapsed, resolved.progressB, state.smoothPointer);
        else scene2.update(dt, elapsed, resolved.progressB, state.smoothPointer);
      }
    }

    if (state.detailProgress > 0.001) {
      detailScene.updateAndStepSim(dt, elapsed, state.detailProgress, state.smoothPointer);
    }

    // Update Minimalist UI Overlays cleanly based on active scene & detail state
    const showWorldUI = state.detailProgress < 0.35;
    detailOverlay.classList.toggle('hidden', state.detailProgress < 0.55);

    // Scene 0 UI (Manifesto + Copyright + Scroll down prompt)
    const onScene0 = showWorldUI && ((resolved.idxA === 0 && resolved.splitProgress < 0.45) || (resolved.idxB === 0 && resolved.splitProgress > 0.65));
    scene0Overlay.classList.toggle('hidden', !onScene0);
    if (copyrightBlock) copyrightBlock.style.opacity = onScene0 ? '1' : '0';
    if (onScene0) {
      const p0 = resolved.idxA === 0 ? resolved.progressA : resolved.progressB;
      const manifestoVis = THREE.MathUtils.smoothstep(p0, 0.22, 0.45) * (1.0 - THREE.MathUtils.smoothstep(p0, 0.72, 0.90));
      manifestoBlock.style.opacity = String(manifestoVis.toFixed(3));
      scrollPrompt.style.opacity = p0 > 0.64 ? '0' : '1';
    }

    // Scene 1 UI (3D-Anchored Portfolio Plaques & Temperatures)
    const onScene1 = showWorldUI && ((resolved.idxA === 1 && resolved.splitProgress < 0.55) || (resolved.idxB === 1 && resolved.splitProgress > 0.55));
    scene1Overlay.classList.toggle('hidden', !onScene1);
    if (onScene1) {
      for (let i = 0; i < scene1.blocks.length; i++) {
        const b = scene1.blocks[i];
        const px = Math.round(b.screenX * vw);
        const py = Math.round(b.screenY * vh);
        const shiftX = i % 2 === 1 ? '-100%' : '0%';
        cubePlaques[i].style.transform = `translate3d(${px}px, ${py}px, 0) translate(${shiftX}, -50%)`;
        cubePlaques[i].style.opacity = String(b.visibleFactor.toFixed(3));

        const tx = Math.round(b.tempScreenX * vw);
        const ty = Math.round(b.tempScreenY * vh);
        cubeTemps[i].style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        cubeTemps[i].style.opacity = String((b.visibleFactor * 0.85).toFixed(3));
      }
    }

    // Scene 2 UI ("/// Follow Us" switcher appears once camera levels out inside subterranean chamber!)
    const onScene2Chamber = showWorldUI && resolved.idxA === 2 && resolved.progressA > 0.54 && resolved.splitProgress < 0.35;
    scene2Overlay.classList.toggle('hidden', !onScene2Chamber);

    audio.update(resolved.idxA, state.scrollVelocity, state.inDetail);

    // Final Dual-FBO Fracture + Detail Frost + Kawase Bloom Composite
    compositor.compose({
      sceneA: resolved.scA,
      sceneB: resolved.scB,
      splitProgress: resolved.splitProgress,
      detailScene,
      detailProgress: state.detailProgress,
      scrollVelocity: state.scrollVelocity,
      time: elapsed,
    });
  }

  requestAnimationFrame(tick);
}

bootExperience();

// Igloo Inc. 1:1 Clean-Room Polar WebGL Director
// - Non-blocking micro-sliced boot (<60ms window.onload, smooth ASCII preloader -> CAD Construct wave)
// - Continuous spring-damped vertical scroll rig descending from Igloo Surface (y=0) through 3 Subterranean Relic Vaults (y=-13, -26, -39) to Manifesto (s=4)
// - Real-time 3D-to-2D SVG leader lines & floating CAD telemetry callout boxes
// - Monospace text-scramble decoding effects, portfolio dossier inspector & procedural polar audio

import * as THREE from '../vendor/three.module.js';
import { buildPolarEnvironment, buildPolarTextures } from './noise_tex.js';
import { createIglooHeroScene } from './igloo_hero.js';
import { createRelicChambers } from './relic_chambers.js';
import { PolarPostPipeline } from './post.js';
import { PolarAudio } from './audio.js';

const Q = new URLSearchParams(location.search);
const CAPTURE = Q.has('capture');

const SECTIONS = [
  {
    id: 0,
    watermark: 'IGLOO_CONSTRUCT',
    prompt: 'SCROLL TO DESCEND INTO THE IGLOO',
    camPos: new THREE.Vector3(4.35, 3.55, 6.25),
    lookAt: new THREE.Vector3(0.15, 0.72, 0.15),
    fov: 38,
    fogColor: 0xa0a5b1,
    fogDensity: 0.048,
  },
  {
    id: 1,
    code: 'VAULT_01 // LICENSING_INFRA',
    title: 'OVERPASS IP',
    tagline: 'MODULAR ONCHAIN INTELLECTUAL PROPERTY LICENSING INFRASTRUCTURE',
    watermark: 'OVERPASS_IP',
    prompt: 'CLICK SPEC OR SCROLL FOR ABSTRACT',
    camPos: new THREE.Vector3(0.0, -12.85, 5.15),
    lookAt: new THREE.Vector3(0.0, -13.0, 0.0),
    fov: 38,
    fogColor: 0x9299a8,
    fogDensity: 0.062,
    dossier: {
      code: 'SPEC_SHEET // 01 · OVERPASS_IP',
      title: 'OVERPASS IP',
      lead: 'Verifiable onchain intellectual property licensing built to turn community-held digital characters into global retail franchises.',
      metrics: [
        { k: 'ARCHITECTURE', v: 'MODULAR_ONCHAIN' },
        { k: 'RETAIL_DOORS', v: '10,000+' },
        { k: 'SETTLEMENT', v: 'REALTIME_ROYALTY' },
      ],
      body: 'OverpassIP bridges Web3 native communities and mainstream consumer brands. Holders submit, verify, and license character rights directly through transparent smart-contract registries with automated royalty routing.',
      linkLabel: 'EXPLORE OVERPASS ECOSYSTEM ↗',
      url: 'https://www.igloo.inc',
    },
  },
  {
    id: 2,
    code: 'VAULT_02 // CONSUMER_L2',
    title: 'ABSTRACT',
    tagline: 'THE CONSUMER CRYPTO BLOCKCHAIN POWERED BY ZK CRYPTOGRAPHY & CULTURE',
    watermark: 'ABSTRACT_L2',
    prompt: 'SCROLL DOWN TO PUDGY PENGUINS LAB',
    camPos: new THREE.Vector3(0.0, -25.95, 5.35),
    lookAt: new THREE.Vector3(0.0, -26.0, -0.35),
    fov: 40,
    fogColor: 0x9aa4b5,
    fogDensity: 0.052,
    dossier: {
      code: 'SPEC_SHEET // 02 · ABSTRACT_CHAIN',
      title: 'ABSTRACT',
      lead: 'A consumer-first Ethereum Layer-2 engineered from the ground up for seamless onboarding, culture, and mass distribution.',
      metrics: [
        { k: 'PROOFS', v: 'ZK_STACK_VALIDITY' },
        { k: 'WALLET_UX', v: 'NATIVE_AA_PASSKEY' },
        { k: 'LATENCY', v: 'SUB_SECOND' },
      ],
      body: 'Abstract eliminates seed phrases and gas friction via native account abstraction while anchoring security to Ethereum through zero-knowledge validity proofs—powering the next generation of consumer apps.',
      linkLabel: 'DISCOVER ABSTRACT CHAIN ↗',
      url: 'https://www.igloo.inc',
    },
  },
  {
    id: 3,
    code: 'VAULT_03 // GLOBAL_IP',
    title: 'PUDGY PENGUINS',
    tagline: 'THE FACE OF CRYPTO — ONBOARDING MILLIONS THROUGH TOYS, CONTENT & PUDGY WORLD',
    watermark: 'PUDGY_HUDDLE',
    prompt: 'USE < > ARROWS TO SPIN POINT-CLOUD · SCROLL FOR MANIFESTO',
    camPos: new THREE.Vector3(0.0, -38.75, 4.95),
    lookAt: new THREE.Vector3(0.0, -39.05, 0.0),
    fov: 38,
    fogColor: 0x8d95a5,
    fogDensity: 0.058,
    dossier: {
      code: 'SPEC_SHEET // 03 · PUDGY_PENGUINS',
      title: 'PUDGY PENGUINS',
      lead: 'Born as 8,888 genesis collectibles and scaled into a household global character brand spanning physical retail, animation, and open-world gaming.',
      metrics: [
        { k: 'GENESIS_SUPPLY', v: '8,888_UNITS' },
        { k: 'SOCIAL_VIEWS', v: '50B+_IMPRESSIONS' },
        { k: 'TOYS_SOLD', v: '1.5M+_UNITS' },
      ],
      body: 'From Walmart and Target shelves worldwide into Pudgy World on Abstract, Pudgy Penguins pioneers a new consumer flywheel where physical joy seamlessly unlocks digital ownership.',
      linkLabel: 'VISIT PUDGY PENGUINS ↗',
      url: 'https://www.igloo.inc',
    },
  },
  {
    id: 4,
    watermark: 'IGLOO_MANIFESTO',
    prompt: 'END OF POLAR SHAFT // SCROLL UP TO ASCEND',
    camPos: new THREE.Vector3(0.0, -42.5, 4.2),
    lookAt: new THREE.Vector3(0.0, -43.5, 0.0),
    fov: 40,
    fogColor: 0x828999,
    fogDensity: 0.075,
  },
];

// ---------------- DOM Elements ----------------
const body = document.body;
const canvas = document.getElementById('stage');
const elWatermark = document.getElementById('bg-watermark');
const svgLeader = document.getElementById('leader-svg');
const elCalloutLayer = document.getElementById('callout-layer');

const btnLogo = document.getElementById('btn-logo');
const btnManifesto = document.getElementById('btn-manifesto');
const btnAudio = document.getElementById('btn-audio');
const elCipher1 = document.getElementById('cipher-line-1');
const elCipher2 = document.getElementById('cipher-line-2');

const elChamberIdx = document.getElementById('chamber-index');
const elChamberTitle = document.getElementById('chamber-title');
const elChamberTag = document.getElementById('chamber-tagline');
const btnOpenDossier = document.getElementById('btn-open-dossier');
const btnPrevChamber = document.getElementById('btn-prev-chamber');
const btnNextChamber = document.getElementById('btn-next-chamber');

const elDepthReadout = document.getElementById('depth-readout');
const bitSegs = Array.from(document.querySelectorAll('#bit-segments i'));
const sectorPills = Array.from(document.querySelectorAll('.sector-pill[data-sec]'));
const elPromptLabel = document.getElementById('prompt-label');

const elDossierModal = document.getElementById('dossier-modal');
const btnDossierClose = document.getElementById('btn-dossier-close');
const elDossierCode = document.getElementById('dossier-code');
const elDossierTitle = document.getElementById('dossier-title');
const elDossierLead = document.getElementById('dossier-lead');
const elDossierMetrics = document.getElementById('dossier-metrics');
const elDossierBody = document.getElementById('dossier-body');
const elDossierLink = document.getElementById('dossier-ext-link');
const elDossierLinkLbl = document.getElementById('dossier-link-label');

const elManifesto = document.getElementById('manifesto-overlay');
const btnManifestoClose = document.getElementById('btn-manifesto-close');

// ---------------- Text Scramble Utility ----------------
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_+#=-';
function scrambleText(el, finalStr, durationMs = 340) {
  if (!el) return;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / durationMs);
    const settled = Math.floor(t * finalStr.length);
    let out = finalStr.slice(0, settled);
    for (let i = settled; i < finalStr.length; i++) {
      out += finalStr[i] === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---------------- Audio & Scroll Timeline State ----------------
const audio = new PolarAudio();
let scrollTarget = Math.max(0, Math.min(4, parseFloat(Q.get('sec') || '0') || 0));
let scrollPos = scrollTarget;
let scrollVel = 0;
let activeSection = Math.round(scrollPos);
let constructProgress = CAPTURE ? 1.0 : 0.0;

function syncSectionHUD(secIdx) {
  activeSection = secIdx;
  body.dataset.section = String(secIdx);
  const meta = SECTIONS[secIdx] || SECTIONS[0];

  elWatermark.textContent = meta.watermark;
  scrambleText(elPromptLabel, meta.prompt, 320);

  for (const pill of sectorPills) {
    pill.classList.toggle('is-active', Number(pill.dataset.sec) === secIdx);
  }

  if (meta.title) {
    elChamberIdx.textContent = meta.code;
    scrambleText(elChamberTitle, meta.title, 360);
    elChamberTag.textContent = meta.tagline;
  }

  if (secIdx === 4 && !CAPTURE) {
    elManifesto.hidden = false;
  } else if (secIdx < 4 && !manualManifestoOpen) {
    elManifesto.hidden = true;
  }
}

let manualManifestoOpen = false;

function jumpToSection(secIdx) {
  const clamped = Math.max(0, Math.min(4, secIdx));
  scrollTarget = clamped;
  manualManifestoOpen = clamped === 4;
  if (clamped < 4) elManifesto.hidden = true;
  syncSectionHUD(clamped);
  audio.unlock();
  audio.playChamberSonar(clamped);
}

// ---------------- Event Listeners (Bound at <2ms on startup!) ----------------
for (const pill of sectorPills) {
  pill.addEventListener('click', () => jumpToSection(Number(pill.dataset.sec)));
  pill.addEventListener('pointerenter', () => audio.playDataTick(1.15));
}

btnLogo.addEventListener('click', () => jumpToSection(0));

btnManifesto.addEventListener('click', () => {
  audio.unlock();
  audio.playDataTick(1.2);
  manualManifestoOpen = !elManifesto.hidden ? false : true;
  elManifesto.hidden = !manualManifestoOpen;
});

btnManifestoClose.addEventListener('click', () => {
  manualManifestoOpen = false;
  elManifesto.hidden = true;
  if (scrollTarget > 3.4) scrollTarget = 3.0;
});

btnAudio.addEventListener('click', () => {
  audio.unlock();
  const nextMuted = !audio.muted;
  audio.setMuted(nextMuted);
  body.classList.toggle('is-muted', nextMuted);
});

function openDossierForSection(secIdx) {
  const meta = SECTIONS[secIdx];
  if (!meta || !meta.dossier) return;
  const d = meta.dossier;
  elDossierCode.textContent = d.code;
  elDossierTitle.textContent = d.title;
  elDossierLead.textContent = d.lead;
  elDossierBody.textContent = d.body;
  elDossierLink.href = d.url;
  elDossierLinkLbl.textContent = d.linkLabel;
  elDossierMetrics.innerHTML = d.metrics
    .map((m) => `<div class="metric-cell"><span>${m.k}</span><b>${m.v}</b></div>`)
    .join('');
  elDossierModal.hidden = false;
  audio.unlock();
  audio.playDataTick(0.95);
}

btnOpenDossier.addEventListener('click', () => openDossierForSection(Math.round(scrollTarget) || activeSection));
btnDossierClose.addEventListener('click', () => {
  elDossierModal.hidden = true;
});
elDossierModal.addEventListener('click', (e) => {
  if (e.target === elDossierModal) elDossierModal.hidden = true;
});

let chambersRef = null;
btnPrevChamber.addEventListener('click', () => {
  audio.unlock();
  if (activeSection === 3 && chambersRef) {
    chambersRef.triggerPenguinVariant(-1);
    audio.playIceClink();
  } else {
    jumpToSection(Math.max(0, activeSection - 1));
  }
});

btnNextChamber.addEventListener('click', () => {
  audio.unlock();
  if (activeSection === 3 && chambersRef) {
    chambersRef.triggerPenguinVariant(1);
    audio.playIceClink();
  } else {
    jumpToSection(Math.min(4, activeSection + 1));
  }
});

// Wheel & Touch Vertical Scroll Navigation
window.addEventListener(
  'wheel',
  (e) => {
    if (!elDossierModal.hidden) return;
    e.preventDefault();
    audio.unlock();
    const delta = Math.max(-160, Math.min(160, e.deltaY));
    scrollTarget = Math.max(0, Math.min(4, scrollTarget + delta * 0.0026));
    if (scrollTarget < 3.6 && manualManifestoOpen) {
      manualManifestoOpen = false;
      elManifesto.hidden = true;
    }
  },
  { passive: false }
);

let touchLastY = null;
window.addEventListener('pointerdown', (e) => {
  audio.unlock();
  touchLastY = e.clientY;
});
window.addEventListener('pointermove', (e) => {
  pointerNDC.x = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
  pointerNDC.y = -(e.clientY / Math.max(1, window.innerHeight)) * 2 + 1;
  raycastDirty = true;

  if (e.pointerType === 'touch' && touchLastY !== null && elDossierModal.hidden) {
    const dy = touchLastY - e.clientY;
    touchLastY = e.clientY;
    scrollTarget = Math.max(0, Math.min(4, scrollTarget + dy * 0.006));
  }
});
window.addEventListener('pointerup', () => {
  touchLastY = null;
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    elDossierModal.hidden = true;
    manualManifestoOpen = false;
    elManifesto.hidden = true;
  } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    jumpToSection(activeSection + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    jumpToSection(activeSection - 1);
  }
});

// ---------------- Dynamic SVG Leader Lines Pool ----------------
const MAX_CALLOUTS = 4;
const calloutPool = [];
for (let i = 0; i < MAX_CALLOUTS; i++) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('class', i % 2 === 1 ? 'leader-path is-dashed' : 'leader-path');
  svgLeader.appendChild(path);

  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('class', 'leader-dot');
  dot.setAttribute('r', '2.4');
  svgLeader.appendChild(dot);

  const tag = document.createElement('div');
  tag.className = 'callout-tag';
  tag.innerHTML = '<b></b><span></span>';
  elCalloutLayer.appendChild(tag);

  calloutPool.push({
    path,
    dot,
    tag,
    bEl: tag.querySelector('b'),
    sEl: tag.querySelector('span'),
  });
}

const projVec = new THREE.Vector3();
function updateScreenCallouts(anchors, camera) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < MAX_CALLOUTS; i++) {
    const slot = calloutPool[i];
    const a = anchors[i];
    if (!a || !elManifesto.hidden || !elDossierModal.hidden) {
      slot.path.style.display = 'none';
      slot.dot.style.display = 'none';
      slot.tag.style.opacity = '0';
      continue;
    }

    projVec.copy(a.pos).project(camera);
    if (projVec.z > 1 || projVec.z < -1) {
      slot.path.style.display = 'none';
      slot.dot.style.display = 'none';
      slot.tag.style.opacity = '0';
      continue;
    }

    const sx = (projVec.x * 0.5 + 0.5) * w;
    const sy = (-projVec.y * 0.5 + 0.5) * h;
    const side = sx >= w * 0.5 ? 1 : -1;
    const elbowX = sx + side * 38;
    const elbowY = sy - 26;
    const endX = elbowX + side * 58;

    slot.path.style.display = '';
    slot.dot.style.display = '';
    slot.dot.setAttribute('cx', sx.toFixed(1));
    slot.dot.setAttribute('cy', sy.toFixed(1));
    slot.path.setAttribute('d', `M${sx.toFixed(1)},${sy.toFixed(1)} L${elbowX.toFixed(1)},${elbowY.toFixed(1)} L${endX.toFixed(1)},${elbowY.toFixed(1)}`);

    slot.bEl.textContent = a.code;
    slot.sEl.textContent = a.sub;
    const tagX = side > 0 ? endX + 6 : endX - 134;
    slot.tag.style.transform = `translate3d(${Math.round(tagX)}px, ${Math.round(elbowY - 14)}px, 0)`;
    slot.tag.style.opacity = '1';
  }
}

// ---------------- Non-Blocking 3-Step WebGL2 Engine Initialization ----------------
const scene = new THREE.Scene();
const fogColor = new THREE.Color(0xa0a5b1);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(0xa0a5b1, 0.048);

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2(0, 0);
const pointerSmooth = new THREE.Vector2(0, 0);
let raycastDirty = false;

let renderer = null;
let post = null;
let getEnvMap = null;
let textures = null;
let heroScene = null;
let engineReady = false;

let baseDpr = Math.min(window.devicePixelRatio || 1, 2);
let resScale = 1.0;

function applyResolution() {
  if (!renderer || !post) return;
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  const effDpr = baseDpr * resScale;
  renderer.setPixelRatio(effDpr);
  renderer.setSize(w, h, false);
  const rw = Math.max(1, Math.floor(w * effDpr));
  const rh = Math.max(1, Math.floor(h * effDpr));
  post.setSize(rw, rh);
  if (chambersRef) chambersRef.setResolution(rw, rh, effDpr);
}
window.addEventListener('resize', applyResolution);

function bootStep1() {
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: CAPTURE,
    });
  } catch (e) {
    document.getElementById('nogl').hidden = false;
    throw e;
  }
  if (!renderer.capabilities.isWebGL2) {
    document.getElementById('nogl').hidden = false;
    throw new Error('WebGL2 required');
  }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  post = new PolarPostPipeline(renderer);
  getEnvMap = buildPolarEnvironment(renderer);
  applyResolution();
}

function bootStep2() {
  textures = buildPolarTextures(renderer);
}

function bootStep3() {
  const envMap = getEnvMap();
  heroScene = createIglooHeroScene({
    envMap,
    textures,
    onBlockHoverSound: () => audio.playIceClink(),
  });
  scene.add(heroScene.group);

  chambersRef = createRelicChambers({
    envMap,
    textures,
    refractTex: post.refractRT.texture,
  });
  scene.add(chambersRef.root);
  applyResolution();

  syncSectionHUD(Math.round(scrollPos));
  engineReady = true;

  // Dismiss ASCII loader cleanly and start CAD construct wave!
  if (window.__asciiTimer) clearInterval(window.__asciiTimer);
  body.dataset.ready = '1';

  lastTime = performance.now() * 0.001;
  renderFrame(0.016);
  if (!CAPTURE) requestAnimationFrame(tick);
}

const camTargetTmp = new THREE.Vector3();
const lookTargetTmp = new THREE.Vector3();
const cTmpA = new THREE.Color();
const cTmpB = new THREE.Color();

let simTime = 0;
let lastTime = performance.now() * 0.001;
let emaDt = 0.0166;
let slowFrames = 0;
let cipherTimer = 0;

function renderFrame(dt) {
  if (!engineReady) return;
  simTime += dt;

  // Advance CAD Construct intro scan wave smoothly over first 2.1 seconds
  if (constructProgress < 1.0) {
    constructProgress = Math.min(1.0, constructProgress + dt * 0.52);
  }

  // Spring-damped continuous vertical scroll physics
  const sForce = (scrollTarget - scrollPos) * 28.0 - scrollVel * 9.5;
  scrollVel += sForce * dt;
  scrollPos += scrollVel * dt;
  if (Math.abs(scrollTarget - scrollPos) < 0.0005 && Math.abs(scrollVel) < 0.0005) {
    scrollPos = scrollTarget;
    scrollVel = 0;
  }

  const nearestSec = Math.max(0, Math.min(4, Math.round(scrollPos)));
  if (nearestSec !== activeSection) {
    syncSectionHUD(nearestSec);
  }

  // Update Bottom-Left Altitude/Depth & 12-Bit Progress Segments
  const normScroll = Math.max(0, Math.min(1, scrollPos / 4));
  const altMeters = 4.2 - normScroll * 46.7;
  elDepthReadout.textContent = `ALT // ${altMeters >= 0 ? '+' : ''}${altMeters.toFixed(1)}M`;
  const litCount = Math.max(1, Math.round(normScroll * bitSegs.length));
  for (let i = 0; i < bitSegs.length; i++) {
    bitSegs[i].classList.toggle('is-lit', i < litCount);
  }
  audio.updateScrollDepth(normScroll);

  // Periodic encrypted telemetry ticker in top-right box
  cipherTimer += dt;
  if (cipherTimer > 0.45 && !CAPTURE) {
    cipherTimer = 0;
    const hex = Math.floor((0.1 + Math.abs(Math.sin(simTime * 3.7)) * 0.89) * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    elCipher1.textContent = `SYS.0${nearestSec} // 0x8F${hex}`;
    elCipher2.textContent = `SYNC_RATE: ${(99.82 + Math.sin(simTime) * 0.14).toFixed(2)}% [OK]`;
  }

  pointerSmooth.lerp(pointerNDC, Math.min(1, dt * 8.0));

  // Interpolate Camera Position, LookAt, FOV & Atmospheric Fog between keyframes
  const idxA = Math.min(3, Math.max(0, Math.floor(scrollPos)));
  const idxB = idxA + 1;
  const frac = THREE.MathUtils.smoothstep(scrollPos - idxA, 0, 1);
  const secA = SECTIONS[idxA];
  const secB = SECTIONS[idxB];

  camTargetTmp.lerpVectors(secA.camPos, secB.camPos, frac);
  lookTargetTmp.lerpVectors(secA.lookAt, secB.lookAt, frac);

  // Subtle isometric mouse parallax
  camTargetTmp.x += pointerSmooth.x * 0.36;
  camTargetTmp.y += pointerSmooth.y * 0.22;

  camera.position.copy(camTargetTmp);
  camera.lookAt(lookTargetTmp);

  const nextFov = THREE.MathUtils.lerp(secA.fov, secB.fov, frac);
  if (Math.abs(camera.fov - nextFov) > 0.02) {
    camera.fov = nextFov;
    camera.updateProjectionMatrix();
  }

  cTmpA.setHex(secA.fogColor);
  cTmpB.setHex(secB.fogColor);
  fogColor.copy(cTmpA).lerp(cTmpB, frac);
  scene.fog.color.copy(fogColor);
  scene.fog.density = THREE.MathUtils.lerp(secA.fogDensity, secB.fogDensity, frac);

  // Once-per-frame throttled interactive raycast (Surface Igloo Blocks OR Chamber 3 Penguin Point-Cloud)
  if (raycastDirty) {
    raycastDirty = false;
    camera.updateMatrixWorld();
    raycaster.setFromCamera(pointerNDC, camera);

    if (scrollPos < 0.65) {
      const hits = raycaster.intersectObject(heroScene.hitProxy, false);
      heroScene.setHoverPoint(hits.length > 0 ? hits[0].point : null, simTime);
      chambersRef.setPenguinHoverWorld(null);
    } else if (scrollPos > 2.4 && scrollPos < 3.6) {
      heroScene.setHoverPoint(null, simTime);
      const pHits = raycaster.intersectObject(chambersRef.penguinProxy, false);
      chambersRef.setPenguinHoverWorld(pHits.length > 0 ? pHits[0].point : null);
    } else {
      heroScene.setHoverPoint(null, simTime);
      chambersRef.setPenguinHoverWorld(null);
    }
  }

  // Cull invisible distant groups so GPU stays locked at 60fps with minimal DrawCalls!
  heroScene.group.visible = scrollPos < 1.15;
  chambersRef.root.visible = scrollPos > 0.15;

  if (heroScene.group.visible) {
    heroScene.update(dt, simTime, constructProgress);
  }
  if (chambersRef.root.visible) {
    chambersRef.update(dt, simTime, pointerSmooth);
  }

  // Project 3D Telemetry Anchors onto 2D SVG Leader Lines
  camera.updateMatrixWorld();
  const activeAnchors =
    nearestSec === 0
      ? heroScene.getAnchors()
      : chambersRef.getAnchorsForSection(nearestSec);
  updateScreenCallouts(activeAnchors, camera);

  // Only run refraction capture pass when Chamber 1 (OverpassIP Crystal) is visible!
  const enableRefract = scrollPos > 0.35 && scrollPos < 1.75;
  post.render(scene, camera, simTime, {
    refractMeshes: chambersRef.transmissiveMeshes,
    enableRefract,
    bloomThreshold: nearestSec === 0 ? 0.92 : 0.86,
    bloomStrength: nearestSec === 0 ? 0.58 : 0.62,
    chromatic: nearestSec === 1 ? 1.35 : 0.95,
  });
}

function tick(nowMs) {
  if (CAPTURE) return;
  requestAnimationFrame(tick);
  const now = nowMs * 0.001;
  const rawDt = now - lastTime;
  lastTime = now;
  const dt = Math.min(0.05, Math.max(0.001, rawDt));

  // EMA 60fps Adaptive Resolution Guardian
  if (rawDt > 0.002 && rawDt < 0.12) {
    emaDt = emaDt * 0.9 + rawDt * 0.1;
    if (emaDt > 0.0175 && resScale > 0.78) {
      slowFrames++;
      if (slowFrames > 28) {
        resScale = Math.max(0.78, resScale - 0.08);
        slowFrames = 0;
        applyResolution();
      }
    } else {
      slowFrames = 0;
    }
  }

  renderFrame(dt);
}

let bootPromise = null;
function startBoot() {
  if (bootPromise) return bootPromise;
  if (CAPTURE) {
    bootStep1();
    bootStep2();
    bootStep3();
    bootPromise = Promise.resolve();
    return bootPromise;
  }
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
      } catch (err) {
        console.error(err);
      }
    }, 0);
  });
  return bootPromise;
}

startBoot();

// Deterministic QA & Visual Inspection Hook
window.__setIglooState = async (cfg = {}) => {
  await startBoot();
  if (typeof cfg.construct === 'number') constructProgress = cfg.construct;
  else constructProgress = 1.0;

  if (typeof cfg.scroll === 'number') {
    scrollTarget = cfg.scroll;
    scrollPos = cfg.scroll;
    scrollVel = 0;
    syncSectionHUD(Math.round(scrollPos));
  }
  if (cfg.dossier) {
    openDossierForSection(Math.round(scrollPos));
  } else {
    elDossierModal.hidden = true;
  }
  if (cfg.manifesto) {
    manualManifestoOpen = true;
    elManifesto.hidden = false;
  } else if (Math.round(scrollPos) < 4) {
    manualManifestoOpen = false;
    elManifesto.hidden = true;
  }

  if (cfg.hoverHero) {
    heroScene.setHoverPoint(new THREE.Vector3(1.1, 1.35, 1.4), 3.0);
  }

  simTime = cfg.time ?? 4.2;
  for (let i = 0; i < 4; i++) renderFrame(0.016);

  renderer.info.autoReset = false;
  renderer.info.reset();
  renderFrame(0.016);
  const calls = renderer.info.render.calls;
  const tris = renderer.info.render.triangles;
  renderer.info.autoReset = true;
  return { calls, tris, section: activeSection };
};

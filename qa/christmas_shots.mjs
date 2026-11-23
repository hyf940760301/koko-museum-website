// Strict Headless Chrome Visual, Performance (<45 DrawCalls/Act) & Direct-Manipulation QA Harness
// Usage:
//   node qa/christmas_shots.mjs --out /opt/cursor/artifacts/xmas_v2
//   node qa/christmas_shots.mjs --live 1

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(here, '..');
const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > 0 ? process.argv[i + 1] : d;
};
const outPrefix = arg('out', '/tmp/xmas_v2');
const liveSmoke = process.argv.includes('--live');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
  const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
  let rel = cleanUrl.endsWith('/') ? cleanUrl + 'index.html' : cleanUrl;
  const full = path.resolve(rootDir, '.' + rel);
  if (!full.startsWith(rootDir) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(full).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const httpPort = server.address().port;
const debugPort = 9400 + Math.floor(Math.random() * 400);

const chrome = spawn(
  process.env.CHROME || 'google-chrome',
  [
    '--headless=new',
    '--no-sandbox',
    '--no-first-run',
    `--remote-debugging-port=${debugPort}`,
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=/tmp/xmas-chrome-${debugPort}`,
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cleanup = (code) => {
  try { chrome.kill('SIGKILL'); } catch {}
  try { server.close(); } catch {}
  process.exit(code);
};

let target;
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    target = list.find((t) => t.type === 'page');
    if (target) break;
  } catch {}
  await sleep(150);
}
if (!target) {
  console.error('Failed to connect to headless Chrome');
  cleanup(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));

let seq = 0;
const pending = new Map();
const errors = [];

ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
  } else if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
    const txt = msg.params.args.map((a) => a.value ?? a.description).join(' ');
    if (msg.params.type === 'error' || txt.includes('THREE.WebGLProgram')) {
      errors.push(`[${msg.params.type}] ${txt}`);
    }
  }
});

const cdp = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

await cdp('Page.enable');
await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

if (liveSmoke) {
  const liveUrl = `http://127.0.0.1:${httpPort}/christmas/?to=%E6%98%9F%E8%BE%B0%E6%97%85%E4%BA%BA&theme=aurora`;
  await cdp('Page.navigate', { url: liveUrl });
  await sleep(1600);
  const simRes = await cdp('Runtime.evaluate', {
    expression: `(async () => {
      const t0 = performance.now();
      // Click wax seal -> 6-shard shatter + 3D flap fold!
      document.getElementById('wax-seal-btn').click();
      const openingClass = document.getElementById('prologue').classList.contains('is-opening');
      await new Promise(r => setTimeout(r, 850));

      // Dispatch wheel zoom in & reset camera button
      const stage = document.getElementById('stage');
      stage.dispatchEvent(new WheelEvent('wheel', { deltaY: -360, bubbles: true, cancelable: true }));
      await new Promise(r => setTimeout(r, 250));
      document.getElementById('btn-reset-cam').click();

      // Cycle acts 2 -> 3 -> 4
      for (const actId of ['2', '3', '4']) {
        document.querySelector('.act-tab[data-act="' + actId + '"]').click();
        await new Promise(r => setTimeout(r, 850));
      }

      // Open Card Atelier & test all 4 paper theme swatches
      document.getElementById('btn-card-open').click();
      await new Promise(r => setTimeout(r, 200));
      const swatches = document.querySelectorAll('.theme-swatch[data-theme]');
      for (const sw of swatches) {
        sw.click();
        await new Promise(r => setTimeout(r, 80));
      }
      const modalOpen = !document.getElementById('card-modal').hidden;
      document.getElementById('btn-card-close').click();

      return {
        state: document.body.dataset.state,
        act: document.body.dataset.act,
        openingClass,
        modalOpen,
        pipsCount: document.querySelectorAll('#act-progress .prog-pip').length,
        swatchCount: swatches.length,
        recipient: document.getElementById('env-recipient').textContent,
        elapsedMs: Math.round(performance.now() - t0),
      };
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  console.log('Live V2 smoke result:', JSON.stringify(simRes.result.value), 'errors:', errors.length);
  if (errors.length) {
    console.error('Errors:', errors);
    cleanup(1);
  }
  cleanup(0);
}

const capUrl = `http://127.0.0.1:${httpPort}/christmas/?capture=1&dpr=1`;
await cdp('Page.navigate', { url: capUrl });

for (let i = 0; i < 80; i++) {
  const ready = await cdp('Runtime.evaluate', {
    expression: 'typeof window.__setChristmas === "function"',
    returnByValue: true,
  });
  if (ready.result.value) break;
  await sleep(150);
}

const SHOTS = [
  { name: 'prologue', cfg: { prologue: true, act: 1, preset: 'climax' } },
  { name: 'act1_paper', cfg: { prologue: false, act: 1, preset: 'climax' } },
  { name: 'act1_macro', cfg: { prologue: false, act: 1, preset: 'climax', zoom: 0.60 } },
  { name: 'act2_clay', cfg: { prologue: false, act: 2, preset: 'climax' } },
  { name: 'act2_macro', cfg: { prologue: false, act: 2, preset: 'climax', zoom: 0.60 } },
  { name: 'act3_globe', cfg: { prologue: false, act: 3, preset: 'climax' } },
  { name: 'act3_macro', cfg: { prologue: false, act: 3, preset: 'climax', zoom: 0.62 } },
  { name: 'act4_aurora', cfg: { prologue: false, act: 4, preset: 'climax' } },
  { name: 'act5_finale', cfg: { prologue: false, allAwakened: true, act: 5, preset: 'climax' } },
  { name: 'keepsake_aurora', cfg: { prologue: false, allAwakened: true, act: 5, cardModal: true, cardTheme: 'aurora' } },
];

fs.mkdirSync(path.dirname(outPrefix), { recursive: true });

for (const s of SHOTS) {
  const r = await cdp('Runtime.evaluate', {
    expression: `window.__setChristmas(${JSON.stringify(s.cfg)})`,
    awaitPromise: true,
    returnByValue: true,
  });
  const telemetry = r.result.value;
  await sleep(120);
  const shot = await cdp('Page.captureScreenshot', { format: 'png' });
  const file = `${outPrefix}_${s.name}.png`;
  fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log('Saved', file, JSON.stringify(telemetry));

  // Enforce strict <45 main-pass DrawCall budget on every single act!
  if (telemetry.mainPassDrawCalls > 45) {
    errors.push(`DrawCall budget exceeded on ${s.name}: ${telemetry.mainPassDrawCalls} > 45`);
  }
}

if (errors.length > 0) {
  console.error('Strict QA errors encountered:', errors);
  cleanup(1);
}
console.log('All V2 Director Cut shots & <45 DrawCall budgets verified cleanly with 0 errors!');
cleanup(0);

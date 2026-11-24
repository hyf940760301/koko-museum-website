import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outDir = '/opt/cursor/artifacts';
fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = cleanUrl.endsWith('/') ? cleanUrl + 'index.html' : cleanUrl;
  const full = path.resolve(rootDir, '.' + rel);
  if (!full.startsWith(rootDir) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const dbg = 9684;

const chrome = spawn(
  'google-chrome',
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    `--remote-debugging-port=${dbg}`,
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--window-size=1440,900',
    `--user-data-dir=/tmp/igloo-qa-${dbg}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40; i++) {
  try {
    const l = await (await fetch(`http://127.0.0.1:${dbg}/json/list`)).json();
    target = l.find((t) => t.type === 'page');
    if (target) break;
  } catch {}
  await sleep(150);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));

let id = 0;
const pend = new Map();
const errors = [];
let loadEventMs = -1;
let navStart = 0;

ws.addEventListener('message', ({ data }) => {
  const m = JSON.parse(data);
  if (m.id && pend.has(m.id)) {
    const p = pend.get(m.id);
    pend.delete(m.id);
    m.error ? p.reject(m.error) : p.resolve(m.result);
  } else if (m.method === 'Page.loadEventFired') {
    loadEventMs = Date.now() - navStart;
  } else if (m.method === 'Runtime.exceptionThrown') {
    errors.push(m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text);
  } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    errors.push(m.params.args.map((a) => a.value || a.description).join(' '));
  }
});

const cdp = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pend.set(++id, { resolve, reject });
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

navStart = Date.now();
await cdp('Page.navigate', { url: `http://127.0.0.1:${port}/igloo/` });
for (let w = 0; w < 50; w++) {
  await sleep(250);
  const rdy = await cdp('Runtime.evaluate', { expression: 'document.body.dataset.ready', returnByValue: true });
  if (rdy.result.value === '1') break;
}

// Verify UI purity (no invented pills, exact Manifesto text, interactive plaque click + social switcher)
const uiAudit = await cdp('Runtime.evaluate', {
  expression: `(async () => {
    const hasOldPills = !!document.querySelector('.sector-pill');
    const manifesto = document.querySelector('.manifesto-copy')?.textContent?.trim();
    document.getElementById('cube-label-0').click();
    await new Promise(r => setTimeout(r, 120));
    const detailTitle = document.getElementById('detail-title')?.textContent;
    document.getElementById('detail-close-btn').click();
    await new Promise(r => setTimeout(r, 120));
    return { ready: document.body.dataset.ready, hasOldPills, manifesto, detailTitle };
  })()`,
  awaitPromise: true,
  returnByValue: true,
});
console.log('UI & Interaction Audit:', uiAudit.result.value, 'loadEventMs:', loadEventMs);

const shots = [
  // 1. Scene 0: Settled Polar Surface Igloo + Mountains + Manifesto
  { name: 'igloo_v2_01_surface_hero.png', cfg: { scene: 0, progress: 0.495, detailProject: -1 } },
  // 2. Diagonal Glacial Fracture Transition (Scene 0 -> Scene 1)
  { name: 'igloo_v2_02_fracture_wipe.png', cfg: { scene: 0, progress: 0.86, detailProject: -1 } },
  // 3. Scene 1: Cube 01 — Pudgy Penguins frozen inside refractive glacial monolith
  { name: 'igloo_v2_03_cube01_penguin.png', cfg: { scene: 1, progress: 0.06, detailProject: -1 } },
  // 4. Scene 1: Cube 02 — Overpass frozen inside refractive glacial monolith
  { name: 'igloo_v2_04_cube02_overpass.png', cfg: { scene: 1, progress: 0.44, detailProject: -1 } },
  // 5. Scene 2: Vertical Shattered-Ring Dive Tunnel
  { name: 'igloo_v2_05_ring_dive.png', cfg: { scene: 2, progress: 0.22, detailProject: -1 } },
  // 6. Scene 2: Subterranean Halo Chamber ("/// Follow Us" 15k Particle Sculpture)
  { name: 'igloo_v2_06_follow_chamber.png', cfg: { scene: 2, progress: 0.74, socialChannel: 0, detailProject: -1 } },
  // 7. DetailScene: Cryo-Holographic Inspection Chamber (Pudgy Penguins + GPU mouseSim particles)
  { name: 'igloo_v2_07_detail_penguin.png', cfg: { detailProject: 0 } },
];

for (const s of shots) {
  await cdp('Runtime.evaluate', {
    expression: `window.__setIglooState(${JSON.stringify(s.cfg)})`,
    returnByValue: true,
  });
  await sleep(260);
  const png = await cdp('Page.captureScreenshot', { format: 'png' });
  const dst = path.join(outDir, s.name);
  fs.writeFileSync(dst, Buffer.from(png.data, 'base64'));
  console.log('Captured:', dst);
}

console.log('Total console/runtime errors:', errors.length, errors);
chrome.kill('SIGKILL');
server.close();
process.exit(errors.length ? 1 : 0);

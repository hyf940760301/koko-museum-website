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
const dbg = 9682;

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

// 1. Live non-blocking startup & interaction smoke test
navStart = Date.now();
await cdp('Page.navigate', { url: `http://127.0.0.1:${port}/igloo/` });
for (let w = 0; w < 45; w++) {
  await sleep(350);
  const rdy = await cdp('Runtime.evaluate', { expression: 'document.body.dataset.ready', returnByValue: true });
  if (rdy.result.value === '1') break;
}

const liveCheck = await cdp('Runtime.evaluate', {
  expression: `(async () => {
    document.querySelector('.sector-pill[data-sec="1"]').click();
    await new Promise(r => setTimeout(r, 150));
    document.getElementById('btn-open-dossier').click();
    const dossierOpen = !document.getElementById('dossier-modal').hidden;
    document.getElementById('btn-dossier-close').click();
    document.getElementById('btn-manifesto').click();
    const maniOpen = !document.getElementById('manifesto-overlay').hidden;
    document.getElementById('btn-manifesto-close').click();
    return { ready: document.body.dataset.ready, dossierOpen, maniOpen };
  })()`,
  awaitPromise: true,
  returnByValue: true,
});
console.log('Live Smoke:', liveCheck.result.value, 'loadEventMs:', loadEventMs);

// 2. Deterministic High-Fidelity Visual Captures across all 5 states
await cdp('Page.navigate', { url: `http://127.0.0.1:${port}/igloo/?capture=1` });
await sleep(800);

const shots = [
  { name: 'igloo_01_surface_hero.png', cfg: { scroll: 0, construct: 1.0, hoverHero: true, time: 4.5 } },
  { name: 'igloo_02_overpass_crystal.png', cfg: { scroll: 1, construct: 1.0, time: 5.2 } },
  { name: 'igloo_03_abstract_portal.png', cfg: { scroll: 2, construct: 1.0, time: 6.0 } },
  { name: 'igloo_04_pudgy_pointcloud.png', cfg: { scroll: 3, construct: 1.0, time: 7.4 } },
  { name: 'igloo_05_manifesto_dossier.png', cfg: { scroll: 1, construct: 1.0, dossier: true, time: 5.2 } },
];

for (const s of shots) {
  const res = await cdp('Runtime.evaluate', {
    expression: `window.__setIglooState(${JSON.stringify(s.cfg)})`,
    awaitPromise: true,
    returnByValue: true,
  });
  await sleep(120);
  const png = await cdp('Page.captureScreenshot', { format: 'png' });
  const dst = path.join(outDir, s.name);
  fs.writeFileSync(dst, Buffer.from(png.data, 'base64'));
  console.log('Captured:', s.name, res.result.value);
}

console.log('Total console/runtime errors:', errors.length, errors);
chrome.kill('SIGKILL');
server.close();
process.exit(errors.length ? 1 : 0);

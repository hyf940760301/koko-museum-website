// Stills of ocean/index.html through headless Chrome (WebGPU on SwiftShader), no dependencies.
//   node qa/ocean_shot.mjs --out /tmp/shot.png --query "shot=1&photo=24&w=960&h=540&tier=1"
// Live page in a headed Chrome (needs a display): screenshot and HUD text after N seconds, optional keys first.
//   node qa/ocean_shot.mjs --live 8 --keys "Digit2,KeyC" --out /tmp/live.png
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const out = arg('out', '/tmp/ocean_shot.png');
const query = arg('query', 'shot=1&photo=16&w=960&h=540&tier=1');
const timeout = +arg('timeout', 900) * 1000;
const live = +arg('live', 0);
const keys = arg('keys', '');
const port = 9300 + Math.floor(Math.random() * 500);
const url = process.env.SHOT_URL || 'file://' + path.resolve(here, '../ocean/index.html') + (live ? (process.argv.includes('--query') ? '?' + query : '') : '?' + query);

const chrome = spawn(process.env.CHROME || 'google-chrome', [
  ...(live && !process.argv.includes('--headless') ? [] : ['--headless=new']), '--no-sandbox', '--no-first-run', `--remote-debugging-port=${port}`,
  ...(process.env.CHROME_FLAGS || '--enable-unsafe-webgpu --enable-features=Vulkan --use-angle=swiftshader --use-webgpu-adapter=swiftshader --disable-gpu-sandbox').split(' '),
  `--user-data-dir=/tmp/ocean-chrome-${port}`, '--window-size=1280,800', 'about:blank',
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const quit = code => { chrome.kill('SIGKILL'); process.exit(code); };

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); } catch {}
}
if (!target) { console.error('chrome did not start'); quit(1); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let seq = 0; const pending = new Map();
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result || m); pending.delete(m.id); }
  else if (m.method === 'Runtime.consoleAPICalled') console.log('[page]', m.params.args.map(a => a.value ?? a.description).join(' '));
  else if (m.method === 'Runtime.exceptionThrown') console.log('[exception]', m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
});
const send = (method, params = {}) => new Promise(r => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const evalJs = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result?.value;

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url });
const t0 = Date.now();
if (live) {
  // the gate only listens once the bakes are done
  for (let i = 0; i < 240 && (await evalJs('window.__state')) !== 'running'; i++) await sleep(250);
  await sleep(500);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 400, y: 300, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 400, y: 300, button: 'left', clickCount: 1 });
  for (const code of keys.split(',').filter(Boolean)) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', code, key: code });
    await sleep(Math.max(300, live * 250));
    await send('Input.dispatchKeyEvent', { type: 'keyUp', code, key: code });
  }
  await sleep(live * 1000);
  console.log('probe:', await evalJs(arg('probe', '""')));
  console.log('state:', await evalJs('window.__state'), '| error:', await evalJs('window.__error || ""'), '| hud:', await evalJs('document.getElementById("stat").textContent'));
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log('wrote', out);
  quit(0);
}
for (;;) {
  await sleep(500);
  const st = await evalJs('window.__state || ""');
  if (st === 'done') break;
  if (st === 'error') { console.error('page reported error:', await evalJs('window.__error')); quit(2); }
  if (Date.now() - t0 > timeout) { console.error('timeout; state =', st, await evalJs('window.__progress || ""')); quit(3); }
}
const data = await evalJs('window.__shot');
fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
console.log('wrote', out, 'in', ((Date.now() - t0) / 1000).toFixed(1) + 's', await evalJs('window.__info || ""'));
quit(0);

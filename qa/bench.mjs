// Frame-time bench on the live page (no ?capture): a fixed 20 s look-around path.
//   node qa/bench.mjs [--dpr 2] [--size 1440x900] [--seconds 20] [--query "castle=1"] [--uncapped 1] [--fixed 1] [--runs 1]
// --fixed 1 holds the adaptive sharpness at 1.0, so a loaded machine still compares like for like
// --uncapped 1 starts Chrome with vsync and the frame-rate limit off, so the numbers are real
// frame cost instead of a 60 Hz ceiling. Prints one JSON line per run.
import { createRequire } from 'module';
const require = createRequire('/Users/huyifan/Desktop/DeepSeek Harness/tools/voc-crawler/package.json');
const { chromium } = require('playwright');

const args = process.argv.slice(2); const opt = { dpr: '2', size: '1440x900', seconds: '20', query: '', uncapped: '0', fixed: '0', runs: '1', port: '8951' };
for (let i = 0; i < args.length; i++) { const k = args[i].replace(/^--/, ''); opt[k] = args[++i]; }
const [w, h] = opt.size.split('x').map(Number); const secs = Number(opt.seconds);
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const flags = ['--use-angle=metal', '--enable-webgl', '--ignore-gpu-blocklist'];
if (opt.uncapped === '1') flags.push('--disable-gpu-vsync', '--disable-frame-rate-limit');
for (let run = 0; run < Number(opt.runs); run++) {
  const browser = await chromium.launch({ headless: true, executablePath: exe, args: flags });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: Number(opt.dpr) });
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(`http://127.0.0.1:${opt.port}/?skip=1&bench=1${opt.fixed === '1' ? '&fixed=1' : ''}${opt.query ? '&' + opt.query : ''}`);
  await page.waitForFunction(() => document.body.classList.contains('live'), null, { timeout: 90000 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => { window.__ft = []; let last = performance.now(); const f = (now) => { window.__ft.push(now - last); last = now; if (!window.__stop) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const t0 = Date.now(); let i = 0; const lv = [];
  while (Date.now() - t0 < secs*1000) {
    const half = (Date.now() - t0) < secs*500;
    await page.keyboard.press(half ? 'ArrowRight' : 'ArrowLeft'); i++;
    await page.waitForTimeout(1250);
    lv.push(await page.evaluate(() => (window.__bench ? window.__bench.lvl : null)));
  }
  const ft = await page.evaluate(() => { window.__stop = true; return window.__ft.slice(2); });
  const s = [...ft].sort((a, b) => a - b); const avg = ft.reduce((a, b) => a + b, 0)/ft.length;
  const p95 = s[Math.floor(s.length*0.95)], p50 = s[Math.floor(s.length*0.5)];
  console.log(JSON.stringify({ query: opt.query, dpr: opt.dpr, uncapped: opt.uncapped === '1', frames: ft.length, avgMs: +avg.toFixed(3), p50Ms: +p50.toFixed(3), p95Ms: +p95.toFixed(3), fps: +(1000/avg).toFixed(1), levels: [...new Set(lv)], errors: errs.slice(0, 5) }));
  await browser.close();
}

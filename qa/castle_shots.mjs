// Fixed cameras for the castle work, through the ?capture interface.
//   node qa/castle_shots.mjs [--size 1440x900] [--dpr 2] [--query "castle=1"] [--out qa/out/after] [--only C01,C07] [--set castle|base]
// --dpr is passed to the page as ?dpr= (capture mode only); omit it to shoot exactly what the
// unchanged site renders (that is how the flag-off identity is checked against HEAD).
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire('/Users/huyifan/Desktop/DeepSeek Harness/tools/voc-crawler/package.json');
const { chromium } = require('playwright');

export const CAMS = {
  C01: { hour: 12.5, yaw: 0, pitch: 0.07 },
  C02: { hour: 17.8, yaw: 0, pitch: 0.07 },
  C03: { hour: 22, yaw: 0, pitch: 0.07 },
  C04: { hour: 12.5, walk: { pos: [0.6, 1.8, -9.6], tgt: [1.85, 2.6, -11.8], fov: 40 } },
  C05: { hour: 12.5, walk: { pos: [0, 3.2, -9.8], tgt: [0, 4.0, -12.2], fov: 38 } },
  C06: { hour: 12.5, focus: 0, open: 1, reveal: 1 },
  C07: { hour: 12.5, focus: 0, inspect: 1, reveal: 1 },
  C08: { hour: 22, focus: 0, inspect: 1, reveal: 1, mood: 'snow' },
};
// extra stills for the flag-off identity check (the rest of the site must not move a pixel)
export const EXTRA = {
  E01: { hour: 12.5, yaw: 1.2, pitch: 0.07 },
  E02: { hour: 17.8, yaw: 3.1416, pitch: 0.07 },
  E03: { hour: 12.5, yaw: 0.4, pitch: 1.1 },
  E04: { hour: 12.5, room: 'studio' },
};
// poster colour checks at more hours: the centre panel of bay 0, inspected
export const DE = {
  D07: { hour: 7.4, focus: 0, inspect: 1, reveal: 1 },
  D12: { hour: 12.5, focus: 0, inspect: 1, reveal: 1 },
  D17: { hour: 17.8, focus: 0, inspect: 1, reveal: 1 },
  D22: { hour: 22, focus: 0, inspect: 1, reveal: 1 },
  DNI: { hour: 12.5, focus: 0, inspect: 1, reveal: 1, mood: 'night' },
  DOV: { hour: 12.5, focus: 0, inspect: 1, reveal: 1, mood: 'overcast' },
  DSN: { hour: 22, focus: 0, inspect: 1, reveal: 1, mood: 'snow' },
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2); const opt = { size: '1440x900', dpr: '', query: '', out: path.join(here, 'out', 'shots'), only: '', set: 'castle', port: '8951' };
  for (let i = 0; i < args.length; i++) { const k = args[i].replace(/^--/, ''); opt[k] = args[++i]; }
  const out = path.resolve(opt.out); fs.mkdirSync(out, { recursive: true });
  const [w, h] = opt.size.split('x').map(Number);
  const sets = { castle: CAMS, base: { ...CAMS, ...EXTRA }, de: DE, all: { ...CAMS, ...EXTRA, ...DE } };
  let jobs = Object.entries(sets[opt.set] || CAMS); if (opt.only) { const o = opt.only.split(','); jobs = jobs.filter(([n]) => o.includes(n)); }
  const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
  const launch = () => chromium.launch({ headless: true, executablePath: exe, args: ['--use-angle=metal', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const q = ['capture=1', opt.dpr ? `dpr=${opt.dpr}` : '', opt.query].filter(Boolean).join('&');
  const meta = {};
  const logs = [];
  // a fresh browser and page per camera: every still starts from the same state, and a GPU
  // process lost on a busy machine costs one retry instead of the rest of the set
  for (const [name, o] of jobs) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const browser = await launch(); let ok = false;
      try {
        const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: Number(opt.dpr) || 1 });
        page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
        page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
        await page.goto(`http://127.0.0.1:${opt.port}/?${q}`);
        await page.waitForFunction('window.__ready === true || window.__error', null, { timeout: 90000 });
        const err = await page.evaluate('window.__error || null'); if (err) { console.log('PAGE ERROR:', err); }
        const t0 = Date.now();
        await page.evaluate((opt) => window.__set(opt), o);
        // a second pass lets lazily loaded textures land, then renders again
        await page.waitForTimeout(400); await page.evaluate((opt) => window.__set(opt), o);
        await page.screenshot({ path: path.join(out, `${name}.png`) });
        if (o.inspect !== undefined) meta[name] = await page.evaluate((i) => (window.__panelInfo ? window.__panelInfo(i) : null), o.inspect);
        console.log(name, `${Date.now() - t0}ms`); ok = true;
      } catch (e) { console.log(name, 'FAILED', e.message.split('\n')[0], attempt < 2 ? '(retrying)' : ''); }
      await browser.close().catch(() => {});
      if (ok) break;
    }
  }
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ query: q, size: opt.size, cams: Object.fromEntries(jobs), panels: meta }, null, 1));
  if (logs.length) console.log([...new Set(logs)].slice(0, 30).join('\n'));
}

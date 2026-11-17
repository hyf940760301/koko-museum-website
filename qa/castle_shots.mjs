// Fixed cameras for the castle work, through the ?capture interface.
//   node qa/castle_shots.mjs [--size 1440x900] [--dpr 2] [--query "castle=1"] [--out qa/out/after] [--only C01,C07] [--set castle|base|de|hall|vault]
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

// step 3 (whole hall): three cameras at four hours (H<cam>_<hour>), plus a bay pair and the door up close
const HCAM = {
  H1: { walk: { pos: [0, 1.7, 8.6], tgt: [0, 2.7, -12], fov: 72 } },     // across the hall to bay 0
  H2: { walk: { pos: [0, 1.7, 1.5], tgt: [0, 2.3, 12], fov: 58 } },      // the door (bay 10)
  H3: { walk: { pos: [0, 7.2, 7.0], tgt: [0, 0, -3.5], fov: 66 } },      // down onto the floor
};
export const HALL = {};
for (const [c, o] of Object.entries(HCAM)) for (const h of [7.4, 12.5, 17.8, 22]) HALL[`${c}_${String(Math.floor(h)).padStart(2, '0')}`] = { hour: h, ...o };
HALL.H4 = { hour: 12.5, walk: { pos: [2.6, 1.7, -3.6], tgt: [7.4, 2.6, -9.6], fov: 52 } };   // bays 1-3 along the wall
HALL.H5 = { hour: 17.8, walk: { pos: [0.4, 1.65, 7.6], tgt: [0, 2.2, 12], fov: 46 } };       // the doorway, close
HALL.H6 = { hour: 17.8, walk: { pos: [0.4, 1.65, 7.6], tgt: [0, 2.2, 12], fov: 46 }, portal: 1 };  // ... opened
HALL.H7 = { hour: 12.5, walk: { pos: [0, 1.7, 3.0], tgt: [0, 0, -0.2], fov: 50 } };          // the stone rose
HALL.H8 = { hour: 12.5, walk: { pos: [0.5, 1.7, -7.0], tgt: [1.4, 0, -10.4], fov: 52 } };    // the herringbone walkway

// step 4 (vault and window light): looking up, the clerestory close, the eight presets, and the sun
// pools moving over the floor through the day
const P_CAM = { walk: { pos: [0, 1.7, 8.6], tgt: [0, 4.6, -12], fov: 76 } };
export const VAULT = {
  V1: { hour: 12.5, walk: { pos: [0, 1.7, 0.3], tgt: [0, 12, -2.2], fov: 80 } },        // straight up into the vault
  V2: { hour: 17.8, walk: { pos: [0, 1.7, 7.5], tgt: [0, 9.5, -7.5], fov: 72 } },       // up across the hall
  V3: { hour: 12.5, walk: { pos: [0.3, 4.6, -6.2], tgt: [0, 6.7, -12], fov: 48 } },     // a clerestory window close
  P_night: { hour: 2, ...P_CAM }, P_dawn: { hour: 6.8, ...P_CAM }, P_day: { hour: 9.5, ...P_CAM }, P_noon: { hour: 12.5, ...P_CAM },
  P_golden: { hour: 17.6, ...P_CAM }, P_dusk: { hour: 19.2, ...P_CAM }, P_overcast: { hour: 12.5, mood: 'overcast', ...P_CAM }, P_snow: { hour: 12.5, mood: 'snow', ...P_CAM },
};
VAULT.X1 = { hour: 12.5, walk: { pos: [0, 3.2, -1.5], tgt: [0, 0, -7.8], fov: 60 } };   // the noon pool close
// step 5 (bake): a column base on the floor by day and by night, and the bay beside the door
const A_COL = { pos: [0.4, 1.1, -8.6], tgt: [1.83, 0.25, -11.56], fov: 50 };
const A_DOOR = { pos: [2.39, 1.6, 6.58], tgt: [2.61, 1.5, 11.30], fov: 62 };
Object.assign(VAULT, { A1: { hour: 12.5, walk: A_COL }, A2: { hour: 22, walk: A_COL }, A3: { hour: 12.5, walk: A_DOOR }, A4: { hour: 22, walk: A_DOOR } });
for (const h of [7.4, 9, 10.5, 12.5, 14, 15.5, 17, 17.8]) VAULT[`S_${String(h).replace('.', '_')}`] = { hour: h, walk: { pos: [0, 9.5, 9.0], tgt: [0, 0, -2.0], fov: 74 } };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2); const opt = { size: '1440x900', dpr: '', query: '', out: path.join(here, 'out', 'shots'), only: '', set: 'castle', port: '8951' };
  for (let i = 0; i < args.length; i++) { const k = args[i].replace(/^--/, ''); opt[k] = args[++i]; }
  const out = path.resolve(opt.out); fs.mkdirSync(out, { recursive: true });
  const [w, h] = opt.size.split('x').map(Number);
  const sets = { castle: CAMS, base: { ...CAMS, ...EXTRA }, de: DE, hall: HALL, vault: VAULT, all: { ...CAMS, ...EXTRA, ...DE } };
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

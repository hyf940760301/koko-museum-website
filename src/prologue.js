// The prologue: a sheet of paper on which the museum is drawn before your eyes - compass
// circle, square, then the round temple inside them. Pressing the door walks into it.
const S = (t, d) => `style="--t:${t}s;--d:${d}s"`;
const line = (x1, y1, x2, y2, t, d = 0.7, c = 'd') => `<line class="${c}" pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${S(t, d)}/>`;
const path = (p, t, d = 1, c = 'd') => `<path class="${c}" pathLength="1" d="${p}" ${S(t, d)}/>`;

function drawing() {
  let s = '';
  // construction: circle, square, axes, diagonals
  s += `<circle class="d k" pathLength="1" cx="500" cy="500" r="250" transform="rotate(-90 500 500)" ${S(0.2, 2.0)}/>`;
  s += path('M250 250H750V750H250Z', 1.0, 1.8, 'd k');
  s += line(500, 190, 500, 815, 1.9, 0.9, 'd k thin') + line(205, 500, 795, 500, 2.1, 0.9, 'd k thin');
  s += line(250, 250, 750, 750, 2.3, 0.9, 'd k faint') + line(750, 250, 250, 750, 2.4, 0.9, 'd k faint');
  for (let i = 0; i < 24; i++) { const a = i/24*Math.PI*2, c = Math.cos(a), n = Math.sin(a); s += `<line class="f k thin" x1="${(500 + c*244).toFixed(1)}" y1="${(500 + n*244).toFixed(1)}" x2="${(500 + c*256).toFixed(1)}" y2="${(500 + n*256).toFixed(1)}" ${S(1.6 + i*0.03, 0.5)}/>`; }
  // ground and steps
  s += line(120, 780, 880, 780, 2.7, 0.9) + line(185, 780, 185, 765, 2.9, 0.2) + line(815, 780, 815, 765, 2.9, 0.2) + line(185, 765, 815, 765, 2.9, 0.7) + line(215, 750, 785, 750, 3.0, 0.7) + line(200, 765, 200, 750, 3.0, 0.2) + line(800, 765, 800, 750, 3.0, 0.2);
  // columns
  [262, 338, 414, 586, 662, 738].forEach((x, i) => { const t = 3.2 + i*0.11;
    s += path(`M${x - 11} 740V480M${x + 11} 740V480`, t, 0.8) + path(`M${x - 16} 750V740H${x + 16}V750M${x - 16} 470V480H${x + 16}V470`, t + 0.3, 0.5);
    s += path(`M${x - 4} 735V486M${x + 4} 735V486`, t + 0.4, 0.7, 'd faint'); });
  // entablature and cornice
  s += path('M240 470H760V440H240Z', 3.9, 1.1) + path('M232 440V432H768V440', 4.1, 0.8) + line(240, 448, 760, 448, 4.3, 0.7, 'd faint');
  // dome: the top of the compass circle
  s += path('M259.4 432A250 250 0 0 1 740.6 432', 4.4, 1.6, 'd bold');
  s += path('M500 250Q404 300 372 432', 5.1, 0.8, 'd faint') + path('M500 250Q596 300 628 432', 5.15, 0.8, 'd faint') + path('M500 250Q458 310 452 432', 5.2, 0.8, 'd faint') + path('M500 250Q542 310 548 432', 5.25, 0.8, 'd faint') + path('M500 250Q330 290 300 432', 5.3, 0.8, 'd faint') + path('M500 250Q670 290 700 432', 5.35, 0.8, 'd faint');
  s += path('M486 250V228H514V250', 5.5, 0.5) + `<circle class="d" pathLength="1" cx="500" cy="216" r="10" ${S(5.7, 0.5)}/>`;
  // niches between the columns
  [300, 376, 624, 700].forEach((x, i) => { s += path(`M${x - 17} 750V588A17 17 0 0 1 ${x + 17} 588V750`, 5.5 + i*0.08, 0.7, 'd thin'); });
  // the door
  s += path('M455 750V600A45 45 0 0 1 545 600V750', 5.8, 1.0, 'd bold') + path('M443 750V600A57 57 0 0 1 557 600V750', 6.0, 1.0);
  s += `<path class="f door" d="M455 750V600A45 45 0 0 1 545 600V750Z" ${S(6.6, 1.2)}/>`;
  // lettering and notes
  s += `<text class="f cap" x="500" y="463" text-anchor="middle" ${S(5.0, 1)}>K O K O</text>`;
  s += `<text class="f note" x="150" y="330" ${S(6.3, 1)}>oculus</text>` + path('M196 322Q330 250 478 220', 6.3, 0.9, 'd thin');
  s += `<text class="f note" x="820" y="640" ${S(6.6, 1)}>ianua</text>` + path('M815 634Q690 650 562 668', 6.6, 0.9, 'd thin');
  s += `<text class="f note" x="128" y="610" ${S(6.9, 1)}>arcus · XX</text>`;
  s += `<text class="f note" x="500" y="845" text-anchor="middle" ${S(7.0, 1)}>rotunda optima sunt</text>`;
  // a small Koko in the margin
  s += `<g class="f" ${S(7.0, 1.2)}><circle class="ln" cx="868" cy="322" r="40"/>`
    + `<path class="hair" d="M828 316q-10-30 12-40q0-22 26-18q12-18 34-6q22-8 26 14q20 8 10 34q-10-14-24-8q-10-14-26-6q-16-12-28 4q-16-4-30 26z"/>`
    + `<ellipse class="ink" cx="855" cy="330" rx="4.6" ry="7.4"/><ellipse class="ink" cx="881" cy="330" rx="4.6" ry="7.4"/>`
    + [[845, 345], [851, 348], [857, 345], [879, 345], [885, 348], [891, 345]].map(([x, y]) => `<circle class="ink" cx="${x}" cy="${y}" r="1.5"/>`).join('')
    + `<circle class="ln" cx="827" cy="330" r="3"/><text class="note" x="868" y="392" text-anchor="middle">Koko</text></g>`;
  return s;
}

// the castle (step 10): the same construction - circle, square, axes, diagonals, the 24 ticks - and in
// it a round tower in section and elevation: battered base, twelve ashlar courses, a round-arched door
// with its voussoirs, two tall windows, ten merlons over a row of small corbel arches, and inside the
// section the rib vault and the lantern on top. Same classes, same pacing (about 8.2 s).
function castleDrawing() {
  let s = '';
  s += `<circle class="d k" pathLength="1" cx="500" cy="500" r="250" transform="rotate(-90 500 500)" ${S(0.2, 2.0)}/>`;
  s += path('M250 250H750V750H250Z', 1.0, 1.8, 'd k');
  s += line(500, 190, 500, 815, 1.9, 0.9, 'd k thin') + line(205, 500, 795, 500, 2.1, 0.9, 'd k thin');
  s += line(250, 250, 750, 750, 2.3, 0.9, 'd k faint') + line(750, 250, 250, 750, 2.4, 0.9, 'd k faint');
  for (let i = 0; i < 24; i++) { const a = i/24*Math.PI*2, c = Math.cos(a), n = Math.sin(a); s += `<line class="f k thin" x1="${(500 + c*244).toFixed(1)}" y1="${(500 + n*244).toFixed(1)}" x2="${(500 + c*256).toFixed(1)}" y2="${(500 + n*256).toFixed(1)}" ${S(1.6 + i*0.03, 0.5)}/>`; }
  // ground, the battered base and the two faces of the tower
  s += line(120, 780, 880, 780, 2.7, 0.9);
  s += path('M296 720L272 780M704 720L728 780', 2.95, 0.5) + line(296, 720, 704, 720, 3.05, 0.7);
  s += path('M296 720V404M704 720V404', 3.2, 0.9, 'd bold');
  // twelve courses of ashlar, broken where the door and the windows are
  const W = [[380, 15], [620, 15]], wy0 = 476, wy1 = 566;
  const gaps = (y) => [...(y > 538 ? [[438, 562]] : []), ...W.filter(() => y > wy0 - 18 && y < wy1 + 4).map(([x, r]) => [x - r - 8, x + r + 8])].sort((a, b) => a[0] - b[0]);
  for (let k = 1; k <= 12; k++) {
    const y = 720 - k*24.5; let x = 296, d = '';
    for (const [g0, g1] of gaps(y)) { if (g0 > x) d += `M${x} ${y.toFixed(1)}H${g0}`; x = Math.max(x, g1); }
    if (x < 704) d += `M${x} ${y.toFixed(1)}H704`;
    s += path(d, 3.5 + k*0.06, 0.6, 'd thin faint');
    // a few vertical joints, staggered course to course
    let j = ''; for (let xx = 330 + (k%2)*28; xx < 690; xx += 56) { if (gaps(y - 12).some(([g0, g1]) => xx > g0 - 4 && xx < g1 + 4)) continue; j += `M${xx} ${y.toFixed(1)}V${(y + 24.5).toFixed(1)}`; }
    if (k > 1) s += path(j, 3.6 + k*0.06, 0.4, 'd thin faint');
  }
  // corbel arches, the parapet and its ten merlons
  let ca = ''; for (let i = 0; i < 11; i++) { const x0 = 292 + i*38.7, x1 = x0 + 38.7; ca += `M${x0.toFixed(1)} 404Q${((x0 + x1)/2).toFixed(1)} 382 ${x1.toFixed(1)} 404`; }
  s += path(ca, 3.9, 0.8, 'd thin') + path('M284 404H716M284 404V378H716V404', 4.0, 0.9);
  let mer = ''; for (let i = 0; i < 10; i++) { const x0 = 284 + i*44.9; mer += `M${x0.toFixed(1)} 378V350H${(x0 + 26).toFixed(1)}V378`; }
  s += path(mer, 4.2, 0.9);
  // the section: inner face of the wall, the rib vault, the lantern through the roof
  s += path('M326 718V500M674 718V500', 4.4, 0.7, 'd faint');
  s += path('M326 500Q500 340 674 500', 4.6, 1.4, 'd bold');
  s += path('M500 420Q420 432 372 500', 5.0, 0.8, 'd faint') + path('M500 420Q580 432 628 500', 5.05, 0.8, 'd faint') + path('M500 420Q462 446 450 500', 5.1, 0.8, 'd faint') + path('M500 420Q538 446 550 500', 5.15, 0.8, 'd faint') + path('M500 420V404', 5.2, 0.3, 'd faint');
  s += path('M474 344V296H526V344M470 296H530', 5.4, 0.6) + path('M478 296Q500 262 522 296', 5.55, 0.5) + `<circle class="d" pathLength="1" cx="500" cy="254" r="8" ${S(5.7, 0.5)}/>`;
  s += path('M486 344V306H514V344', 5.6, 0.4, 'd thin');
  // two tall windows
  for (const [x, r] of W) s += path(`M${x - r} ${wy1}V${wy0 + r}A${r} ${r} 0 0 1 ${x + r} ${wy0 + r}V${wy1}Z`, 5.5 + (x > 500 ? 0.1 : 0), 0.7, 'd thin');
  // the door, its voussoirs and keystone
  s += path('M455 750V600A45 45 0 0 1 545 600V750', 5.8, 1.0, 'd bold') + path('M443 750V600A57 57 0 0 1 557 600V750', 6.0, 1.0);
  let vs = ''; for (let i = 0; i <= 8; i++) { const a = Math.PI*i/8, c = Math.cos(a), n = Math.sin(a); vs += `M${(500 + c*57).toFixed(1)} ${(600 - n*57).toFixed(1)}L${(500 + c*76).toFixed(1)} ${(600 - n*76).toFixed(1)}`; }
  s += path(vs + 'M443 600H424M557 600H576', 6.1, 0.6, 'd thin');
  s += `<path class="f door" d="M455 750V600A45 45 0 0 1 545 600V750Z" ${S(6.6, 1.2)}/>`;
  // lettering and notes
  s += `<text class="f cap" x="500" y="456" text-anchor="middle" ${S(5.0, 1)}>K O K O</text>`;
  s += `<text class="f note" x="150" y="330" ${S(6.3, 1)}>lanterna</text>` + path('M214 322Q340 268 468 304', 6.3, 0.9, 'd thin');
  s += `<text class="f note" x="820" y="640" ${S(6.6, 1)}>porta</text>` + path('M815 634Q690 650 562 668', 6.6, 0.9, 'd thin');
  s += `<text class="f note" x="128" y="610" ${S(6.9, 1)}>arcus · XX</text>`;
  s += `<text class="f note" x="500" y="845" text-anchor="middle" ${S(7.0, 1)}>turris rotunda · MMXXVI</text>`;
  return s;
}
const MARGIN_KOKO = () => `<g class="f" ${S(7.0, 1.2)}><circle class="ln" cx="868" cy="322" r="40"/>`
    + `<path class="hair" d="M828 316q-10-30 12-40q0-22 26-18q12-18 34-6q22-8 26 14q20 8 10 34q-10-14-24-8q-10-14-26-6q-16-12-28 4q-16-4-30 26z"/>`
    + `<ellipse class="ink" cx="855" cy="330" rx="4.6" ry="7.4"/><ellipse class="ink" cx="881" cy="330" rx="4.6" ry="7.4"/>`
    + [[845, 345], [851, 348], [857, 345], [879, 345], [885, 348], [891, 345]].map(([x, y]) => `<circle class="ink" cx="${x}" cy="${y}" r="1.5"/>`).join('')
    + `<circle class="ln" cx="827" cy="330" r="3"/><text class="note" x="868" y="392" text-anchor="middle">Koko</text></g>`;

export function buildPrologue(root, { quick = false, castle = false } = {}) {
  root.innerHTML = `
    <div class="sheet">
      <svg viewBox="80 170 840 700" role="img" aria-label="${castle ? '一座圆塔城堡的手稿：圆、方，以及画在其中的美术馆' : '一座圆形小神庙的手稿：圆、方，以及画在其中的美术馆'}">${castle ? castleDrawing() + MARGIN_KOKO() : drawing()}</svg>
      <div class="title">
        <h1>KOKO</h1>
        <p class="sub">MVSEVM · MMXXVI</p>
        <p class="zh">一座为 Koko 画的小美术馆</p>
        <button type="button" class="enter" disabled><span>正在备展</span></button>
        <p class="fine">入馆后有很轻的配乐，右上角可以随时关掉</p>
      </div>
    </div>`;
  if (quick) root.classList.add('quick');
  const btn = root.querySelector('.enter'), svg = root.querySelector('svg'), sheet = root.querySelector('.sheet');
  let enter = null;
  btn.addEventListener('click', () => { if (!btn.disabled && enter) { btn.disabled = true; enter(); } });
  return {
    progress(p) { if (btn.disabled && !root.classList.contains('ok')) btn.firstElementChild.textContent = p < 1 ? `正在备展 · ${Math.round(p*100)}` : '正在备展'; },
    play() { requestAnimationFrame(() => root.classList.add('go')); },
    ready(cb) { enter = cb; root.classList.add('ok'); btn.disabled = false; btn.firstElementChild.textContent = '入　馆'; },
    fail(msg) { btn.firstElementChild.textContent = msg; },
    // walk into the door: the sheet swells about the doorway and thins away
    leave(ms = 1700) {
      const r = svg.getBoundingClientRect(), b = sheet.getBoundingClientRect(); const k = Math.min(r.width/840, r.height/700);
      const ox = r.left + r.width/2 + (500 - 500)*k - b.left, oy = r.top + r.height/2 + (672 - 520)*k - b.top;
      sheet.style.transformOrigin = `${ox}px ${oy}px`; root.style.setProperty('--leave', `${ms}ms`); root.classList.add('leave');
      return new Promise((res) => setTimeout(() => { root.remove(); res(); }, ms + 60));
    },
  };
}

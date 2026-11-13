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

export function buildPrologue(root, { quick = false } = {}) {
  root.innerHTML = `
    <div class="sheet">
      <svg viewBox="80 170 840 700" role="img" aria-label="一座圆形小神庙的手稿：圆、方，以及画在其中的美术馆">${drawing()}</svg>
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
  requestAnimationFrame(() => root.classList.add('go'));
  let enter = null;
  btn.addEventListener('click', () => { if (!btn.disabled && enter) { btn.disabled = true; enter(); } });
  return {
    progress(p) { if (btn.disabled && !root.classList.contains('ok')) btn.firstElementChild.textContent = p < 1 ? `正在备展 · ${Math.round(p*100)}` : '正在备展'; },
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

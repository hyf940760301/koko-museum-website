// Everything that is not the room: the wordmark, the tools, labels, the card beside an
// open altarpiece, the index of roundels. Plain DOM over the canvas; the room tells it
// what to show, and it reports back what was pressed.
import { K } from './rotunda.js';

const $ = (s) => document.querySelector(s);
export const CN = ['一', '二', '三', '四', '五', '六'];

export function buildUI(H) {
  const body = document.body;
  const el = { card: $('#card'), bar: $('#bar'), tag: $('#tag'), hint: $('#hint'), ring: $('#ring'), toast: $('#toast'), count: $('#t-count'), medals: $('#t-medals'),
    sound: $('#t-sound'), timeL: $('#t-time-l'), catalog: $('#catalog'), grid: $('#cat-grid'), sum: $('#cat-sum'), help: $('#help') };
  let cardHtml = null, barHtml = null, hintTimer = 0, toastTimer = 0, toastQ = [], toastBusy = false, sheet = null;

  // ---- tools
  $('#brand').addEventListener('click', () => H.act('home'));
  el.sound.addEventListener('click', () => H.act('sound'));
  $('#t-time').addEventListener('click', () => H.act('time'));
  el.medals.addEventListener('click', () => H.act('catalog'));
  $('#t-help').addEventListener('click', () => H.act('help'));
  $('#cat-study').addEventListener('click', () => { api.closeSheet(); H.act('study'); });
  for (const w of [el.catalog, el.help]) w.addEventListener('click', (e) => { if (e.target === w || e.target.closest('[data-close]')) api.closeSheet(); });
  const deleg = (root) => root.addEventListener('click', (e) => { const b = e.target.closest('[data-act]'); if (b) { e.stopPropagation(); H.act(b.dataset.act, b.dataset.v); } });
  deleg(el.card); deleg(el.bar);
  el.grid.addEventListener('click', (e) => { const b = e.target.closest('[data-bay]'); if (b) { api.closeSheet(); H.act('goto', Number(b.dataset.bay)); } });
  el.ring.addEventListener('click', (e) => { const b = e.target.closest('[data-bay]'); if (b) H.act('goto', Number(b.dataset.bay)); });
  el.ring.addEventListener('pointerover', (e) => { const b = e.target.closest('[data-bay]'); if (b) { const r = b.getBoundingClientRect(); H.act('ringhover', { bay: Number(b.dataset.bay), x: r.left + r.width/2, y: r.top }); } });
  el.ring.addEventListener('pointerleave', () => H.act('ringhover', null));

  const showSheet = (w) => { if (sheet && sheet !== w) { sheet.classList.remove('on'); sheet.hidden = true; } sheet = w; w.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('on'))); const x = w.querySelector('.x'); if (x) x.focus({ preventScroll: true }); };
  const nextToast = () => {
    if (toastBusy || !toastQ.length) return; toastBusy = true; const [t, ms] = toastQ.shift();
    el.toast.className = t.img ? '' : 'plain'; el.toast.innerHTML = `${t.img ? `<img src="${t.img}" alt="">` : ''}<div><b>${t.title}</b>${t.text ? `<span>${t.text}</span>` : ''}</div>`;
    requestAnimationFrame(() => el.toast.classList.add('on'));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.toast.classList.remove('on'); setTimeout(() => { toastBusy = false; nextToast(); }, 700); }, ms);
  };

  const api = {
    mode(mode, room) { body.dataset.mode = mode; body.dataset.room = room; },
    cursor(kind) { for (const k of ['point', 'zoom', 'out', 'grab', 'drag']) body.classList.toggle('cur-' + k, k === kind); },
    night(on) { body.classList.toggle('night', !!on); },
    tag(html, x, y) {
      if (!html) { el.tag.classList.remove('on'); return; }
      if (el.tag.dataset.h !== html) { el.tag.innerHTML = html; el.tag.dataset.h = html; }
      const w = el.tag.offsetWidth, h = el.tag.offsetHeight; const tx = Math.min(innerWidth - w - 10, Math.max(10, x - w/2)), ty = y - h - 22 < 64 ? y + 26 : y - h - 22;
      el.tag.style.transform = `translate(${Math.round(tx)}px, ${Math.round(ty)}px)`; el.tag.classList.add('on');
    },
    hint(text, ms = 7000) { clearTimeout(hintTimer); if (!text) { el.hint.classList.remove('on'); return; } el.hint.textContent = text; el.hint.classList.add('on'); if (ms) hintTimer = setTimeout(() => el.hint.classList.remove('on'), ms); },
    card(html) { if (html === cardHtml) return; cardHtml = html; if (html) { el.card.innerHTML = html; el.card.classList.add('on'); } else el.card.classList.remove('on'); },
    bar(html) { if (html === barHtml) return; barHtml = html; if (html) { el.bar.innerHTML = html; el.bar.classList.add('on'); } else el.bar.classList.remove('on'); },
    toast(t, ms = 4200) { toastQ.push([t, ms]); nextToast(); },
    count(n, bump) { el.count.textContent = `${n} / 19`; if (bump) { el.medals.classList.remove('bump'); void el.medals.offsetWidth; el.medals.classList.add('bump'); } },
    sound(muted) { el.sound.classList.toggle('off', !!muted); el.sound.setAttribute('aria-pressed', String(!muted)); },
    time(label) { el.timeL.textContent = label; },
    // the row of marks at the foot: the door, then the bays as they come round to the right
    ring(items) { el.ring.innerHTML = items.map((it) => `<button type="button" data-bay="${it.bay}" class="${it.door ? 'door' : ''}" aria-label="${it.label}"></button>`).join(''); },
    ringState(at, got) { for (const b of el.ring.children) { const k = Number(b.dataset.bay); b.classList.toggle('at', k === at); b.classList.toggle('got', got.has(k)); } },
    catalog(items, n) {
      el.sum.textContent = `已得 ${n} / 19`;
      el.grid.innerHTML = items.map((it) => `<button type="button" data-bay="${it.bay}" class="${it.got ? '' : 'no'}"><img src="${it.img}" alt=""><i>${it.no}</i><b>${it.name}</b><span>${it.latin}</span></button>`).join('');
      showSheet(el.catalog);
    },
    help() { showSheet(el.help); },
    closeSheet() { if (!sheet) return false; const w = sheet; sheet = null; w.classList.remove('on'); setTimeout(() => { if (sheet !== w) w.hidden = true; }, 460); return true; },
    get sheetOpen() { return !!sheet; },

    // ---- what the card says
    seriesCard(d) {
      return `<img class="seal ${d.got ? '' : 'no'}" src="${d.seal}" alt="${d.got ? '圆章已得' : '圆章未得'}">
        <p class="eyebrow">N° ${d.no}<i></i>${d.latin}</p>
        <h2>${d.name}${d.setName ? `<small>${d.setName}</small>` : ''}</h2>
        <p class="line">${d.line}</p>${d.say ? `<p class="say">「${d.say}」</p>` : ''}
        <ol class="plates">${d.plates.map((p) => `<li><button type="button" data-act="panel" data-v="${p.i}"><b>${p.label}</b>${p.title}<em>细看</em></button></li>`).join('')}</ol>
        ${d.setBtn || d.video ? `<div class="acts">${d.setBtn ? `<button type="button" data-act="set">${d.setBtn}</button>` : ''}${d.video ? `<button type="button" data-act="video"><svg viewBox="0 0 10 10"><path d="M1.5 0.6L9 5 1.5 9.4z"/></svg>看短片</button>` : ''}</div>` : ''}
        <div class="nav"><button type="button" data-act="prev">‹ 上一组</button><button type="button" class="mid" data-act="back">回圆厅</button><button type="button" data-act="next">下一组 ›</button></div>`;
    },
    studyCard(kind, d = {}) {
      const nav = (extra = '') => `<div class="nav">${extra || '<span></span>'}<button type="button" class="mid" data-act="back">${kind === 'chapel' ? '退回圆物柜' : '回书房中央'}</button><span></span></div>`;
      if (kind === 'cabinet') return `<p class="eyebrow">ROTVNDA<i></i>XIX</p><h2>圆物柜</h2>
        <p class="body">Koko 爱收集圆圆的小东西。你在圆厅里每看完一组画屏，这里就多一枚圆章。</p>
        <div class="meter"><i style="width:${(d.n/19*100).toFixed(1)}%"></i></div>
        <p class="small">${d.n >= 19 ? '十九枚齐了，圆门已经打开。' : `已得 ${d.n} 枚，还差 ${19 - d.n} 枚。集齐十九枚，这扇圆门会打开。`}</p>
        ${d.n >= 19 ? '<div class="acts"><button type="button" data-act="chapel">往门里看</button></div>' : ''}${nav()}`;
      if (kind === 'chapel') return `<p class="eyebrow">HIC STABIT KOKO</p><h2>留给真身的位置</h2>
        <p class="body">这座小龛现在是空的。等 Koko 的立体真身做好，会站在这只基座上。</p><p class="small">谢谢你把十九组都看完了。</p>${nav()}`;
      if (kind === 'sheet') return `<p class="eyebrow">DE PROPORTIONE</p><h2>比例手稿</h2>
        <p class="body">头占全身四十八分，身五十二分。眼睛是实心的竖椭圆，两颊各三点雀斑，右耳一颗银钉，没有嘴，永远赤脚。</p>
        <p class="small">无论换哪一身衣服，这些地方都不变。</p>${nav()}`;
      if (kind === 'views') return `<p class="eyebrow">TRES ASPECTVS</p><h2>三面图</h2>
        <p class="body">同一只 Koko，转了三个角度。蓬松的黑发、两颊的雀斑、耳上的银钉、一双赤脚，从哪边看都在。</p>
        <p class="small">做立体真身的时候，就照这张来。</p>${nav()}`;
      return `<p class="eyebrow">CODEX<i></i>KOKO</p><h2>人设手抄本</h2>
        <div class="pager"><button type="button" data-act="page" data-v="-1" ${d.page <= 0 ? 'disabled' : ''} aria-label="上一页">‹</button><span>${d.page + 1} / ${d.pages}</span><button type="button" data-act="page" data-v="1" ${d.page >= d.pages - 1 ? 'disabled' : ''} aria-label="下一页">›</button></div>
        <p class="small">点书页的左右两侧，也可以翻页。</p>${nav()}`;
    },
    inspectBar(d) {
      if (d.video) return `<span class="t"><i>短片</i>${d.name}</span><i class="sep"></i><button type="button" data-act="back" aria-label="关上短片">×</button>`;
      return `<button type="button" data-act="pprev" aria-label="上一张">‹</button><span class="t"><i>${d.label}</i>${d.title}<span>${d.k} / ${d.n}</span></span><button type="button" data-act="pnext" aria-label="下一张">›</button><i class="sep"></i><button type="button" data-act="back" aria-label="退回整组">×</button>`;
    },
  };
  return api;
}
export const DOOR = K.door;

import { createProgram, createTexture, createTarget, destroyTarget, bindTex } from './gl.js';
import { VS_QUAD, FS_BAKE, FS_SIM, FS_COPY, FS_PLATE, VS_SPARK, FS_SPARK } from './shaders.js';
import { rasterizeEngraving } from './engrave.js';
import { Sparks } from './sparks.js';

// The plate is the C1's 600 mm work area across the long side of the viewport, so the beam's
// 100 mm cleaning width is drawn to scale.
const PLATE_MM = 600;
const BEAM_MM = 100;
const GRID_W = 64;
const GRID_H = 36;
const HEAT_DECAY = 2.4;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

class LcWorkshop extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    this.stage = this.querySelector('.lc-stage');
    this.act = this.querySelector('.lc-act') || this;
    if (!this.stage) return;

    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'lc-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    const gl = this.canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;
    this.gl = gl;
    this.stage.prepend(this.canvas);

    this.quality = 1;
    this.grid = new Uint8Array(GRID_W * GRID_H);
    this.gridCount = 0;
    this.stamps = [];
    this.pointer = { x: 0, y: 0, dx: 0, dy: 1, present: false, has: false, lastMove: -1e9 };
    this.light = null;
    this.hot = 0;
    this.auto = { s: 0, target: 0, active: false, x: 0, y: 0, dx: 1, dy: 0 };
    this.intro = null;
    this.interacted = false;
    this.progress = 0;
    this.awakeUntil = 0;
    this.heatUntil = 0;
    this.running = false;
    this.visible = true;
    this.frames = 0;
    this.ema = 16;
    this.slow = 0;

    this.hudPct = this.querySelector('[data-lc-pct]');
    this.hudBar = this.querySelector('[data-lc-bar]');
    this.dim = this.querySelector('.lc-dim');

    try {
      this._initGL();
    } catch (err) {
      console.warn(err);
      this.canvas.remove();
      return;
    }
    this._layout();
    this._bind();
    this.classList.add('lc-live');
    this._wake();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { this._engrave(); this._wake(); });
    }
    if (this.reduced) this._revealStatic();
    else this.introTimer = setTimeout(() => this._startIntro(), 1500);
  }

  disconnectedCallback() {
    clearTimeout(this.introTimer);
    cancelAnimationFrame(this.raf);
    this.running = false;
    this.abort?.abort();
    this.ro?.disconnect();
    this.io?.disconnect();
  }

  _initGL() {
    const gl = this.gl;
    this.floatState = !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
    this.pBake = createProgram(gl, VS_QUAD, FS_BAKE);
    this.pSim = createProgram(gl, VS_QUAD, FS_SIM);
    this.pCopy = createProgram(gl, VS_QUAD, FS_COPY);
    this.pPlate = createProgram(gl, VS_QUAD, FS_PLATE);
    this.pSpark = createProgram(gl, VS_SPARK, FS_SPARK);
    this.quadVao = gl.createVertexArray();
    this.sparks = new Sparks(gl);
    this.textTex = createTexture(gl, 0, 0);
    this.state = null;
    this.rust = null;
    this.detail = null;
    gl.disable(gl.DEPTH_TEST);
  }

  _stateOpts() {
    const gl = this.gl;
    return this.floatState ? { internal: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT } : {};
  }

  _quad() {
    const gl = this.gl;
    gl.bindVertexArray(this.quadVao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  _layout() {
    const gl = this.gl;
    const box = this.stage.getBoundingClientRect();
    if (box.width < 2 || box.height < 2) return;
    const prev = this.size;
    const scale = Math.min(window.devicePixelRatio || 1, 2) * this.quality;
    const w = Math.max(2, Math.round(box.width * scale));
    const h = Math.max(2, Math.round(box.height * scale));
    this.size = { cssW: box.width, cssH: box.height, w, h, scale };
    this.canvas.width = w;
    this.canvas.height = h;
    this.beamHalf = (Math.max(w, h) * BEAM_MM) / PLATE_MM / 2;

    if (prev) {
      // Keep positions meaningful across a resize.
      const sx = w / prev.w, sy = h / prev.h;
      for (const o of [this.pointer, this.light, this.beam, this.auto]) {
        if (o) { o.x *= sx; o.y *= sy; }
      }
      this.intro = null;
      this.sparks.count = 0;
    }

    const bake = Math.min(1, 2048 / Math.max(w, h));
    const bw = Math.round(w * bake), bh = Math.round(h * bake);
    destroyTarget(gl, this.rust);
    destroyTarget(gl, this.detail);
    this.rust = createTarget(gl, bw, bh);
    this.detail = createTarget(gl, bw, bh);
    gl.useProgram(this.pBake.prog);
    gl.uniform2f(this.pBake.u.uRes, w, h);
    gl.uniform1f(this.pBake.u.uMm, PLATE_MM / Math.max(w, h));
    gl.viewport(0, 0, bw, bh);
    for (const [mode, target] of [[0, this.rust], [1, this.detail]]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.uniform1i(this.pBake.u.uMode, mode);
      this._quad();
    }

    // The state texture follows the CSS size only, so quality changes never lose progress.
    const k = Math.min(1, 1024 / Math.max(box.width, box.height));
    const sw = Math.max(2, Math.round(box.width * k)), sh = Math.max(2, Math.round(box.height * k));
    if (!this.state || this.state[0].w !== sw || this.state[0].h !== sh) {
      const next = [createTarget(gl, sw, sh, this._stateOpts()), createTarget(gl, sw, sh, this._stateOpts())];
      if (this.state) {
        gl.useProgram(this.pCopy.prog);
        gl.bindFramebuffer(gl.FRAMEBUFFER, next[0].fbo);
        gl.viewport(0, 0, sw, sh);
        bindTex(gl, 0, this.state[0].tex, this.pCopy.u.uTex);
        this._quad();
        destroyTarget(gl, this.state[0]);
        destroyTarget(gl, this.state[1]);
      }
      this.state = next;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this._buildAutoPath();
    this._engrave();
  }

  _engrave() {
    if (!this.size) return;
    const gl = this.gl;
    this.textCanvas = rasterizeEngraving(this.stage, this.size.scale, this.textCanvas);
    gl.bindTexture(gl.TEXTURE_2D, this.textTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  }

  // A serpentine raster over the whole plate; scrolling drives the beam along it so the act
  // completes for visitors who never touch it.
  _buildAutoPath() {
    const { w, h } = this.size;
    const r = this.beamHalf;
    const rows = Math.max(1, Math.ceil(h / (r * 1.5)));
    const pts = [];
    for (let i = 0; i < rows; i++) {
      const y = h - ((i + 0.5) * h) / rows;
      const a = -r * 0.3, b = w + r * 0.3;
      if (i % 2 === 0) pts.push([a, y], [b, y]);
      else pts.push([b, y], [a, y]);
    }
    const len = [0];
    for (let i = 1; i < pts.length; i++) {
      len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    const frac = this.autoPath ? this.auto.s / this.autoPath.total : 0;
    this.autoPath = { pts, len, total: len[len.length - 1] };
    this.auto.s = frac * this.autoPath.total;
  }

  _pathPoint(s) {
    const { pts, len } = this.autoPath;
    let i = 1;
    while (i < len.length - 1 && len[i] < s) i++;
    const t = clamp((s - len[i - 1]) / Math.max(1e-6, len[i] - len[i - 1]), 0, 1);
    return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t, i];
  }

  _bind() {
    this.abort = new AbortController();
    const opt = { signal: this.abort.signal, passive: true };
    const st = this.stage;

    const toPx = (cx, cy) => {
      const b = st.getBoundingClientRect();
      const k = this.size.w / b.width;
      return [(cx - b.left) * k, (b.height - (cy - b.top)) * k];
    };
    const move = (cx, cy, fresh) => {
      const [x, y] = toPx(cx, cy);
      const p = this.pointer;
      const now = performance.now();
      const joined = p.has && !fresh && now - p.lastMove < 250;
      if (joined) {
        const vx = x - p.x, vy = y - p.y, l = Math.hypot(vx, vy);
        if (l > 0.5) {
          const dx = p.dx * 0.6 + (vx / l) * 0.4, dy = p.dy * 0.6 + (vy / l) * 0.4;
          const dl = Math.hypot(dx, dy) || 1;
          p.dx = dx / dl; p.dy = dy / dl;
        }
        this._stamp(p.x, p.y, x, y, 1, true);
      } else if (fresh) {
        this._stamp(x, y, x, y, 1, true);
      }
      p.x = x; p.y = y; p.has = true; p.present = true; p.lastMove = now;
      if (joined || fresh) this._interact();
      this._wake();
    };

    st.addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') move(e.clientX, e.clientY, false); }, opt);
    st.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') { this.pointer.present = false; this._wake(); } }, opt);
    st.addEventListener('touchstart', (e) => { const t = e.touches[0]; move(t.clientX, t.clientY, true); }, opt);
    st.addEventListener('touchmove', (e) => { const t = e.touches[0]; move(t.clientX, t.clientY, false); }, opt);
    const end = () => { this.pointer.present = false; this._wake(); };
    st.addEventListener('touchend', end, opt);
    st.addEventListener('touchcancel', end, opt);

    const onScroll = () => {
      const b = this.act.getBoundingClientRect();
      const span = b.height - window.innerHeight;
      this.progress = span > 0 ? clamp(-b.top / span, 0, 1) : 0;
      this.auto.target = clamp((this.progress - 0.1) / 0.8, 0, 1);
      if (this.auto.target * this.autoPath.total > this.auto.s + 1) this._wake();
    };
    window.addEventListener('scroll', onScroll, opt);
    onScroll();

    let timer = 0;
    this.ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const b = st.getBoundingClientRect();
        if (Math.abs(b.width - this.size.cssW) > 0.5 || Math.abs(b.height - this.size.cssH) > 0.5) {
          this._layout();
          onScroll();
          this._wake();
        }
      }, 120);
    });
    this.ro.observe(st);

    this.io = new IntersectionObserver((entries) => {
      this.visible = entries[0].isIntersecting;
      if (this.visible) this._wake();
    });
    this.io.observe(st);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this._wake(); }, opt);

    this.canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.running = false; cancelAnimationFrame(this.raf); }, { signal: this.abort.signal });
    this.canvas.addEventListener('webglcontextrestored', () => {
      this._initGL();
      this.size = null;
      this.grid.fill(0);
      this.gridCount = 0;
      this._layout();
      this._hud();
      this._wake();
    }, opt);
  }

  _interact() {
    if (this.interacted) return;
    this.interacted = true;
    clearTimeout(this.introTimer);
    this.intro = null;
    this.classList.add('lc-touched');
  }

  _wake(ms = 3200) {
    this.awakeUntil = Math.max(this.awakeUntil, performance.now() + ms);
    if (!this.running && this.visible && !document.hidden && this.size) {
      this.running = true;
      this.last = performance.now();
      this.raf = requestAnimationFrame((t) => this._frame(t));
    }
  }

  _stamp(ax, ay, bx, by, heat, sparks) {
    const fresh = this._mark(ax, ay, bx, by);
    this.stamps.push([ax, ay, bx, by, heat]);
    if (sparks && fresh && !this.reduced) this._spray(ax, ay, bx, by);
    this.heatUntil = performance.now() + 3200;
  }

  // Mirrors the swept capsule on a coarse CPU grid: gives the progress figure without a readback
  // and tells us whether this stroke touched any rust that was still there.
  _mark(ax, ay, bx, by) {
    const { w, h } = this.size;
    const r = this.beamHalf * 0.82;
    const cw = w / GRID_W, ch = h / GRID_H;
    const x0 = clamp(Math.floor((Math.min(ax, bx) - r) / cw), 0, GRID_W - 1);
    const x1 = clamp(Math.floor((Math.max(ax, bx) + r) / cw), 0, GRID_W - 1);
    const y0 = clamp(Math.floor((Math.min(ay, by) - r) / ch), 0, GRID_H - 1);
    const y1 = clamp(Math.floor((Math.max(ay, by) + r) / ch), 0, GRID_H - 1);
    const vx = bx - ax, vy = by - ay, vv = vx * vx + vy * vy;
    let fresh = 0;
    for (let gy = y0; gy <= y1; gy++) {
      for (let gx = x0; gx <= x1; gx++) {
        const i = gy * GRID_W + gx;
        if (this.grid[i]) continue;
        const px = (gx + 0.5) * cw - ax, py = (gy + 0.5) * ch - ay;
        const t = vv > 1e-6 ? clamp((px * vx + py * vy) / vv, 0, 1) : 0;
        if (Math.hypot(px - vx * t, py - vy * t) <= r) { this.grid[i] = 1; fresh++; }
      }
    }
    if (fresh) {
      this.gridCount += fresh;
      this._hud();
    }
    return fresh;
  }

  _hud() {
    const pct = Math.min(100, Math.round((this.gridCount / this.grid.length) * 100 / 0.985));
    if (pct === this.shownPct) return;
    this.shownPct = pct;
    if (this.hudPct) this.hudPct.textContent = String(pct).padStart(3, '0');
    if (this.hudBar) this.hudBar.style.transform = `scaleX(${pct / 100})`;
    this.classList.toggle('lc-done', pct >= 100);
  }

  _spray(ax, ay, bx, by) {
    const len = Math.hypot(bx - ax, by - ay);
    const s = this.size.scale;
    const n = Math.min(18, 3 + Math.floor(len / (5 * s)));
    let dx = bx - ax, dy = by - ay;
    const l = Math.hypot(dx, dy) || 1;
    dx /= l; dy /= l;
    for (let i = 0; i < n; i++) {
      const along = Math.random();
      const across = (Math.random() * 2 - 1) * this.beamHalf * 0.9;
      const x = ax + (bx - ax) * along - dy * across;
      const y = ay + (by - ay) * along + dx * across;
      const ang = Math.random() * Math.PI * 2;
      const sp = (90 + Math.random() * Math.random() * 620) * s;
      this.sparks.emit(x, y, Math.cos(ang) * sp + dx * 120 * s, Math.sin(ang) * sp + dy * 120 * s, 0.18 + Math.random() * 0.5);
    }
  }

  _startIntro() {
    if (this.interacted || this.progress > 0.04 || !this.size) return;
    const title = this.querySelector('.lc-title');
    const { w, h, scale } = this.size;
    let y = h * 0.55, x1 = w * 0.5;
    if (title) {
      const sb = this.stage.getBoundingClientRect(), tb = title.getBoundingClientRect();
      y = h - (tb.top - sb.top + tb.height * 0.5) * scale;
      x1 = (tb.left - sb.left + Math.min(tb.width, sb.width * 0.9) * 0.56) * scale;
    }
    const x0 = -this.beamHalf * 1.2;
    this.intro = { t: 0, dur: 1.25, x0, x1, y, amp: this.beamHalf * 0.22, px: x0, py: y };
    this._wake();
  }

  _revealStatic() {
    const { w, h } = this.size;
    const r = this.beamHalf * 1.4;
    for (let y = h - r * 0.5; y > -r; y -= r) this._stamp(-r, y, w + r, y, 0, false);
  }

  _frame(t) {
    const gl = this.gl;
    const now = performance.now();
    if (!this.visible || document.hidden || gl.isContextLost()) { this.running = false; return; }
    const raw = t - this.last;
    const dt = Math.min(0.05, Math.max(0.001, raw / 1000));
    this.last = t;
    if (this.relayout) { this.relayout = false; this._layout(); }
    const { w, h, scale } = this.size;
    const p = this.pointer;
    let busy = false;

    // Scroll-driven raster.
    const a = this.auto;
    const goal = a.target * this.autoPath.total;
    a.active = false;
    if (goal > a.s + 0.5) {
      const speed = this.reduced ? 1e9 : this.autoPath.total / 2.0;
      const step = Math.min(goal - a.s, speed * dt, (goal - a.s) * (1 - Math.exp(-dt * 7)) + 3 * scale);
      let s = a.s;
      const end = a.s + step;
      while (s < end - 1e-3) {
        const [x, y, seg] = this._pathPoint(s + 1e-3);
        const next = Math.min(end, this.autoPath.len[seg]);
        const [ex, ey] = this._pathPoint(next);
        const horizontal = Math.abs(ey - y) < 0.5;
        this._stamp(x, y, ex, ey, this.reduced ? 0 : 1, horizontal);
        if (horizontal && Math.abs(ex - x) > 0.5) a.dx = Math.sign(ex - x);
        a.x = ex; a.y = ey;
        s = next;
      }
      a.s = end;
      a.active = !this.reduced;
      busy = true;
    }

    // Opening stroke, so the first screen never sits fully rusted.
    const intro = this.intro;
    if (intro) {
      intro.t = Math.min(1, intro.t + dt / intro.dur);
      const e = 1 - Math.pow(1 - intro.t, 3);
      const x = intro.x0 + (intro.x1 - intro.x0) * e;
      const y = intro.y + Math.sin(e * 5.2) * intro.amp;
      this._stamp(intro.px, intro.py, x, y, 1, true);
      intro.px = x; intro.py = y;
      if (intro.t >= 1) this.intro = null;
      busy = true;
    }

    // Which beam is shown: the visitor's, else whichever automatic one is running. With neither,
    // the last beam stays where it was while it fades.
    const userHot = now - p.lastMove < 140;
    const beam = this.beam || (this.beam = { x: w * 0.3, y: h * 0.72, dx: 1, dy: 0 });
    let aim = 0, hotTarget = 0;
    if (userHot || (p.present && !a.active && !intro)) {
      beam.x = p.x; beam.y = p.y; beam.dx = p.dx; beam.dy = p.dy; aim = 1; hotTarget = userHot ? 1 : 0;
    } else if (a.active) {
      beam.x = a.x; beam.y = a.y; beam.dx = a.dx; beam.dy = 0; aim = 1; hotTarget = 1;
    } else if (intro) {
      beam.x = intro.px; beam.y = intro.py; beam.dx = 1; beam.dy = 0; aim = 1; hotTarget = 1;
    }
    const bx = beam.x, by = beam.y, dx = beam.dx, dy = beam.dy;
    this.hot += (hotTarget - this.hot) * (1 - Math.exp(-dt * (hotTarget ? 40 : 9)));
    if (this.hot > 0.01) busy = true;

    const lt = aim ? [bx, by] : [w * 0.3, h * 0.72];
    if (!this.light) this.light = { x: lt[0], y: lt[1] };
    const lk = 1 - Math.exp(-dt * 9);
    this.light.x += (lt[0] - this.light.x) * lk;
    this.light.y += (lt[1] - this.light.y) * lk;
    if (Math.hypot(lt[0] - this.light.x, lt[1] - this.light.y) > 0.5) busy = true;

    this.sparks.update(dt);
    if (this.sparks.count) busy = true;

    // Plate state.
    const heatAlive = now < this.heatUntil;
    if (this.stamps.length || heatAlive) {
      if (!this.stamps.length) this.stamps.push(null);
      gl.useProgram(this.pSim.prog);
      const u = this.pSim.u;
      gl.viewport(0, 0, this.state[0].w, this.state[0].h);
      gl.uniform2f(u.uRes, w, h);
      // The falloff's midpoint, where rust actually lets go, lands on the beam's half-width.
      gl.uniform1f(u.uRadius, this.beamHalf * 1.3);
      this.stamps.forEach((sgm, i) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.state[1].fbo);
        bindTex(gl, 0, this.state[0].tex, u.uPrev);
        gl.uniform1f(u.uDecay, i === 0 ? Math.exp(-dt * HEAT_DECAY) : 1);
        gl.uniform1f(u.uSub, i === 0 ? dt * 0.12 : 0);
        if (sgm) {
          gl.uniform2f(u.uA, sgm[0], sgm[1]);
          gl.uniform2f(u.uB, sgm[2], sgm[3]);
          gl.uniform1f(u.uHeat, sgm[4]);
          gl.uniform1f(u.uOn, 1);
        } else {
          gl.uniform1f(u.uOn, 0);
        }
        this._quad();
        this.state.reverse();
      });
      this.stamps.length = 0;
      if (heatAlive) busy = true;
    }

    // Plate.
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, w, h);
    gl.useProgram(this.pPlate.prog);
    const u = this.pPlate.u;
    bindTex(gl, 0, this.state[0].tex, u.uState);
    bindTex(gl, 1, this.rust.tex, u.uRust);
    bindTex(gl, 2, this.detail.tex, u.uDetail);
    bindTex(gl, 3, this.textTex, u.uText);
    gl.uniform2f(u.uRes, w, h);
    gl.uniform2f(u.uLight, this.light.x, this.light.y);
    gl.uniform1f(u.uLightH, Math.max(w, h) * 0.2);
    gl.uniform1f(u.uLightI, 0.75 + 0.9 * this.hot);
    gl.uniform2f(u.uBeamA, bx + dy * this.beamHalf, by - dx * this.beamHalf);
    gl.uniform2f(u.uBeamB, bx - dy * this.beamHalf, by + dx * this.beamHalf);
    gl.uniform1f(u.uHot, this.hot);
    gl.uniform1f(u.uAim, aim);
    gl.uniform1f(u.uTime, (t / 1000) % 1000);
    gl.uniform1f(u.uPx, scale);
    this._quad();
    this.sparks.draw(this.pSpark, w, h, 0.9 * scale);

    if (this.dim) {
      const show = this.hot > 0.4;
      this.dim.classList.toggle('is-on', show);
      if (show) {
        const up = dx < 0 ? -1 : 1;
        const ex = bx - dy * this.beamHalf * up, ey = by + dx * this.beamHalf * up;
        this.dim.style.transform = `translate(${(ex / scale + 12).toFixed(1)}px, ${((h - ey) / scale - 22).toFixed(1)}px)`;
      }
    }

    this._adapt(raw);

    if (busy) this._wake(600);
    if (now < this.awakeUntil) this.raf = requestAnimationFrame((tt) => this._frame(tt));
    else this.running = false;
  }

  // Drop render resolution when frames run long for a sustained stretch.
  _adapt(raw) {
    if (raw > 200) return;
    this.frames++;
    this.ema += (raw - this.ema) * 0.08;
    if (this.frames < 40 || this.hasAttribute('lock-quality')) return;
    this.slow = this.ema > 24 ? this.slow + 1 : 0;
    if (this.slow > 45 && this.quality > 0.5) {
      this.quality = Math.max(0.5, this.quality * 0.8);
      this.slow = 0;
      this.frames = 0;
      this.ema = 16;
      // Resizing clears the canvas, so it happens at the top of the next frame, never after a draw.
      this.relayout = true;
      this._wake(400);
    }
  }
}

if (!customElements.get('lc-workshop')) customElements.define('lc-workshop', LcWorkshop);

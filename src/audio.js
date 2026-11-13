// Sound: a barely-there room tone, the score of whichever altarpiece is open, rain where
// it rains, and a few soft made sounds (wood, glaze, paper). Nothing plays until the
// visitor has pressed the door, and one switch silences all of it.
const TRACKS = { cute: './assets/audio/cute.m4a', campus: './assets/audio/campus.m4a', sea: './assets/audio/sea.m4a', rain: './assets/audio/rain.m4a' };

class Loop {
  constructor(url, peak) { this.url = url; this.peak = peak; this.el = null; this.v = 0; this.want = 0; }
  ensure() { if (this.el) return; const a = new Audio(this.url); a.loop = true; a.preload = 'auto'; a.volume = 0; this.el = a; }
  update(dt, master) {
    if (!this.el && this.want <= 0) return;
    this.v += (this.want - this.v)*Math.min(1, dt*(this.want > this.v ? 0.9 : 1.6)); if (Math.abs(this.want - this.v) < 0.002) this.v = this.want;
    if (this.el) {
      this.el.volume = Math.min(1, Math.max(0, this.v*this.peak*master));
      if (this.v > 0.003 && this.el.paused) this.el.play().catch(() => {});
      if (this.v <= 0.003 && !this.el.paused) this.el.pause();
    }
  }
}

export class Sound {
  constructor(muted = false) {
    this.muted = muted; this.ctx = null; this.master = 0; this.duck = 1; this.duckT = 1; this.live = false;
    this.loops = { cute: new Loop(TRACKS.cute, 0.42), campus: new Loop(TRACKS.campus, 0.42), sea: new Loop(TRACKS.sea, 0.42), rain: new Loop(TRACKS.rain, 0.30) };
  }
  // must be called from a user gesture
  unlock() {
    if (this.live) return; this.live = true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      const ctx = this.ctx = new AC(); this.out = ctx.createGain(); this.out.gain.value = this.muted ? 0 : 1; this.out.connect(ctx.destination);
      // room tone: brown noise under a low filter, breathing very slowly
      const len = ctx.sampleRate*4; const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0); let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random()*2 - 1; last = (last + 0.02*w)/1.02; d[i] = last*3.2; }
      const fadeN = 2000; for (let i = 0; i < fadeN; i++) { const k = i/fadeN; d[i] *= k; d[len - 1 - i] *= k; }
      this.noise = buf;
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 320;
      this.tone = ctx.createGain(); this.tone.gain.value = 0; src.connect(lp); lp.connect(this.tone); this.tone.connect(this.out); src.start();
      this.tone.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
    } catch (e) { this.ctx = null; }
  }
  setMuted(m) { this.muted = m; if (this.ctx) { this.out.gain.cancelScheduledValues(this.ctx.currentTime); this.out.gain.linearRampToValueAtTime(m ? 0 : 1, this.ctx.currentTime + 0.25); if (!m && this.ctx.state === 'suspended') this.ctx.resume(); } }
  // which score and which ambience should be heard (either may be null)
  scene(music, amb) { for (const k of ['cute', 'campus', 'sea']) { const on = k === music; if (on) this.loops[k].ensure(); this.loops[k].want = on ? 1 : 0; } if (amb === 'rain') this.loops.rain.ensure(); this.loops.rain.want = amb === 'rain' ? 1 : 0; }
  setDuck(on) { this.duckT = on ? 0 : 1; }
  update(dt) {
    if (!this.live) return;
    this.master += ((this.muted ? 0 : 1) - this.master)*Math.min(1, dt*4); this.duck += (this.duckT - this.duck)*Math.min(1, dt*2.5);
    for (const k in this.loops) this.loops[k].update(dt, this.master*this.duck);
  }
  pause(p) { if (!this.ctx) return; if (p) this.ctx.suspend(); else if (!this.muted) this.ctx.resume(); for (const k in this.loops) { const l = this.loops[k]; if (l.el && p) l.el.pause(); } }

  // ---- made sounds
  _env(g, t, a, peak, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  _sine(f, t, a, peak, d, type = 'sine') { const c = this.ctx; const o = c.createOscillator(); o.type = type; o.frequency.value = f; const g = c.createGain(); this._env(g, t, a, peak, d); o.connect(g); g.connect(this.out); o.start(t); o.stop(t + a + d + 0.05); return o; }
  _hiss(t, a, peak, d, f0, f1, q = 0.8, type = 'bandpass') { const c = this.ctx; const s = c.createBufferSource(); s.buffer = this.noise; s.loop = true; s.playbackRate.value = 6; const f = c.createBiquadFilter(); f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + a + d);
    const g = c.createGain(); this._env(g, t, a, peak, d); s.connect(f); f.connect(g); g.connect(this.out); s.start(t, Math.random()*3); s.stop(t + a + d + 0.05); }
  play(kind) {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return; const t = this.ctx.currentTime + 0.01;
    if (kind === 'open') { this._hiss(t, 0.25, 0.10, 0.9, 500, 1400, 0.6); this._sine(74, t + 0.05, 0.02, 0.10, 0.5); this._sine(82, t + 0.95, 0.02, 0.07, 0.45); }
    else if (kind === 'close') { this._hiss(t, 0.15, 0.08, 0.7, 1200, 420, 0.6); this._sine(70, t + 0.75, 0.01, 0.12, 0.4); }
    else if (kind === 'medal') { [[1318.5, 0, 0.09], [1975.5, 0.02, 0.05], [2637, 0.04, 0.03], [1760, 0.34, 0.07], [2637, 0.36, 0.035]].forEach(([f, dl, p]) => this._sine(f, t + dl, 0.006, p, 1.9)); }
    else if (kind === 'page') { this._hiss(t, 0.12, 0.07, 0.42, 1800, 5200, 0.5); }
    else if (kind === 'step') { this._sine(96, t, 0.008, 0.07, 0.22); this._hiss(t, 0.01, 0.03, 0.12, 900, 500, 1); }
    else if (kind === 'wash') { this._hiss(t, 0.9, 0.06, 1.8, 600, 2600, 0.4); }
    else if (kind === 'door') { this._hiss(t, 0.3, 0.09, 1.1, 300, 900, 0.7); this._sine(62, t + 0.1, 0.03, 0.12, 0.9); }
    else if (kind === 'tock') { this._sine(880 + Math.random()*240, t, 0.003, 0.05, 0.16); }
    else if (kind === 'whirl') { this._hiss(t, 0.05, 0.05, 0.9, 2400, 900, 0.5); this._sine(1175, t, 0.004, 0.02, 0.5); }
    else if (kind === 'tick') { this._sine(1568, t, 0.004, 0.025, 0.25); }
    else if (kind === 'all') { [659.3, 784, 987.8, 1318.5, 1568, 1975.5].forEach((f, i) => this._sine(f, t + i*0.16, 0.008, 0.07, 2.4)); }
  }
}

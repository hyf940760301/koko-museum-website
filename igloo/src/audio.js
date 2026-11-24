// Zero-asset Procedural Polar Soundscape & Telemetry Foley Synthesizer for Igloo Inc. Replica
// - Arctic howling wind LFO filter bed (morphs into deep subterranean ice-cavern drone on scroll!)
// - Crystalline ice-block hover clink
// - Digital HUD scramble tick & chamber sonar chime

export class PolarAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.windFilter = null;
    this.windGain = null;
    this.subDroneGain = null;
    this.muted = false;
    this.started = false;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.65;
      this.master.connect(this.ctx.destination);

      // 3-second seamless pink noise buffer for howling polar wind
      const len = this.ctx.sampleRate * 3;
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + w * 0.029;
        b1 = 0.985 * b1 + w * 0.032;
        b2 = 0.950 * b2 + w * 0.048;
        const env = Math.min(1, i / 1600, (len - i) / 1600);
        d[i] = (b0 + b1 + b2 + w * 0.14) * 0.58 * env;
      }

      const windSrc = this.ctx.createBufferSource();
      windSrc.buffer = buf;
      windSrc.loop = true;

      this.windFilter = this.ctx.createBiquadFilter();
      this.windFilter.type = 'bandpass';
      this.windFilter.frequency.value = 460;
      this.windFilter.Q.value = 3.6;

      // Slow polar gust LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.13;
      lfoGain.gain.value = 190;
      lfo.connect(lfoGain);
      lfoGain.connect(this.windFilter.frequency);
      lfo.start();

      this.windGain = this.ctx.createGain();
      this.windGain.gain.value = 0.042;
      windSrc.connect(this.windFilter);
      this.windFilter.connect(this.windGain);
      this.windGain.connect(this.master);
      windSrc.start();

      // Subterranean crystalline drone (fades in underground)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc2.type = 'triangle';
      droneOsc1.frequency.value = 65.41; // C2
      droneOsc2.frequency.value = 98.00; // G2
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 210;
      this.subDroneGain = this.ctx.createGain();
      this.subDroneGain.gain.value = 0.001;
      droneOsc1.connect(lp);
      droneOsc2.connect(lp);
      lp.connect(this.subDroneGain);
      this.subDroneGain.connect(this.master);
      droneOsc1.start();
      droneOsc2.start();

      this.started = true;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.65, this.ctx.currentTime, 0.08);
    }
  }

  updateScrollDepth(normScroll) {
    if (!this.ctx || !this.started) return;
    const now = this.ctx.currentTime;
    // Surface: brisk whistling wind; Underground: muffled deep sub-glacier resonance
    const windFreq = 480 - normScroll * 270;
    const windVol = 0.045 * (1 - normScroll * 0.55);
    const droneVol = 0.004 + normScroll * 0.038;
    this.windFilter.frequency.setTargetAtTime(windFreq, now, 0.18);
    this.windGain.gain.setTargetAtTime(windVol, now, 0.18);
    this.subDroneGain.gain.setTargetAtTime(droneVol, now, 0.22);
  }

  playIceClink() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const base = 1650 + Math.random() * 950;
    o.type = 'sine';
    o2.type = 'triangle';
    o.frequency.setValueAtTime(base, t);
    o.frequency.exponentialRampToValueAtTime(base * 1.18, t + 0.045);
    o2.frequency.setValueAtTime(base * 2.42, t);

    g.gain.setValueAtTime(0.032, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.085);
    o.connect(g);
    o2.connect(g);
    g.connect(this.master);
    o.start(t);
    o2.start(t);
    o.stop(t + 0.09);
    o2.stop(t + 0.09);
  }

  playDataTick(pitch = 1.0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(1920 * pitch, t);
    g.gain.setValueAtTime(0.012, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.024);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.028);
  }

  playChamberSonar(idx = 1) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const notes = [261.63, 329.63, 392.00, 523.25];
    const freq = notes[idx % notes.length];
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.065, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.68);
  }
}

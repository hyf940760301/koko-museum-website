// Synthesized Four-Voice Winter Waltz Quartet, Spatial Ambience Beds & Tactile Foley Engine
// Zero external audio files. Features:
// - 84 BPM 3/4 quantized 4-voice waltz (Celesta/Harp, Marimba/Sleighbells, Swiss Music-Box, Glass Harmonica)
// - 4 Bespoke Spatial Ambience Room-Tones with 1.2s crossfades:
//   Act I: Warm study air & subtle candlewick crackle
//   Act II: Cozy fireplace hearth rumble & crackling wood pops
//   Act III: 6Hz precision watchmaker escapement balance-wheel pulse
//   Act IV: Polar glacial singing wind LFO sweep & crystal shimmer

const MIDI_TO_HZ = (m) => 440 * Math.pow(2, (m - 69) / 12);

const CHORDS = [
  [53, 57, 60, 64], // Fmaj7
  [52, 55, 60, 64], // C/E
  [50, 53, 57, 60], // Dm7
  [45, 52, 57, 60], // Am7
  [46, 53, 57, 62], // Bbmaj7
  [45, 53, 57, 60], // F/A
  [43, 50, 55, 58], // Gm7
  [48, 55, 58, 64], // C7
];

const MELODY = [
  77, 0, 76,   79, 0, 72,   74, 0, 72,   69, 0, 72,
  74, 76, 77,  81, 0, 77,   76, 0, 74,   72, 0, 0,
];

export class QuartetAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.reverb = null;
    this.muted = false;
    this.running = false;
    this.activeAct = 1;
    this.awakened = new Set();
    this.finaleMode = false;

    this.bpm = 84;
    this.beatDur = 60 / this.bpm;
    this.nextBeatTime = 0;
    this.beatIndex = 0;
    this.timerId = null;
    this.noiseBuf = null;
    this.ambienceBeds = null;
    this.nextMicroAmbTime = 0;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();

      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.72;

      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 3.5;
      comp.attack.value = 0.01;
      comp.release.value = 0.25;

      this.reverb = this.ctx.createConvolver();
      this.reverb.buffer = this._buildHallIR(1.9, 2.6);
      const revGain = this.ctx.createGain();
      revGain.gain.value = 0.35;

      this.dryBus = this.ctx.createGain();
      this.dryBus.gain.value = 0.85;

      this.dryBus.connect(comp);
      this.reverb.connect(revGain);
      revGain.connect(comp);
      comp.connect(this.master);
      this.master.connect(this.ctx.destination);

      // Shared pink/warm noise buffer (3s loopable)
      const len = this.ctx.sampleRate * 3;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + w * 0.029;
        b1 = 0.985 * b1 + w * 0.032;
        b2 = 0.950 * b2 + w * 0.048;
        // Crossfade endpoints slightly so looping is seamless
        const env = Math.min(1, i / 1200, (len - i) / 1200);
        d[i] = (b0 + b1 + b2 + w * 0.16) * 0.65 * env;
      }

      this._initAmbienceBeds();
      this._applyAmbienceCrossfade();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.running && this.ctx) {
      this.running = true;
      this.nextBeatTime = this.ctx.currentTime + 0.12;
      this.nextMicroAmbTime = this.ctx.currentTime + 0.20;
      this.timerId = setInterval(() => this._schedule(), 85);
    }
  }

  _initAmbienceBeds() {
    if (!this.ctx || !this.noiseBuf) return;
    const makeBed = (filterType, freq, Q, targetGain, withLfo = false) => {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      src.loop = true;
      const flt = this.ctx.createBiquadFilter();
      flt.type = filterType;
      flt.frequency.value = freq;
      flt.Q.value = Q;
      const g = this.ctx.createGain();
      g.gain.value = 0.0001;
      src.connect(flt);
      flt.connect(g);
      g.connect(this.dryBus);

      if (withLfo) {
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.14; // slow polar wind breath
        lfoGain.gain.value = 260;
        lfo.connect(lfoGain);
        lfoGain.connect(flt.frequency);
        lfo.start();
      }
      src.start(0, Math.random() * 1.5);
      return { gain: g, maxGain: targetGain };
    };

    this.ambienceBeds = {
      1: makeBed('lowpass', 280, 0.8, 0.018, false),   // Act I: Quiet warm study air
      2: makeBed('lowpass', 195, 1.2, 0.028, false),   // Act II: Cozy hearth warm rumble
      3: makeBed('bandpass', 920, 2.2, 0.009, false),  // Act III: Velvet horology room tone
      4: makeBed('bandpass', 580, 4.8, 0.022, true),   // Act IV: Singing polar aurora wind
      5: makeBed('lowpass', 340, 0.9, 0.016, false),   // Finale V: Warm pavilion hall air
    };
  }

  _applyAmbienceCrossfade() {
    if (!this.ambienceBeds || !this.ctx) return;
    const now = this.ctx.currentTime;
    for (let id = 1; id <= 5; id++) {
      const bed = this.ambienceBeds[id];
      const target = id === this.activeAct ? bed.maxGain : 0.0001;
      bed.gain.gain.setTargetAtTime(target, now, 0.42); // ~1.2s smooth 95% crossfade!
    }
  }

  _buildHallIR(seconds, decay) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const ir = this.ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = ir.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const env = Math.pow(1 - t, decay);
        const w = Math.random() * 2 - 1;
        const damp = 0.22 + 0.55 * (1 - t);
        lp = lp + damp * (w - lp);
        data[i] = lp * env * 0.5;
      }
    }
    return ir;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.72, this.ctx.currentTime, 0.08);
    }
  }

  setAct(actNum) {
    this.activeAct = actNum;
    this.finaleMode = actNum === 5;
    this._applyAmbienceCrossfade();
  }

  awakenVoice(actNum) {
    this.awakened.add(actNum);
  }

  _voiceLevel(actNum) {
    if (this.finaleMode) return 0.88;
    if (this.activeAct === actNum) return 0.92;
    if (this.awakened.has(actNum)) return 0.42;
    return 0.0;
  }

  _schedule() {
    if (!this.ctx || !this.running) return;
    const now = this.ctx.currentTime;
    while (this.nextBeatTime < now + 0.26) {
      this._playBeat(this.beatIndex, this.nextBeatTime);
      this.nextBeatTime += this.beatDur;
      this.beatIndex = (this.beatIndex + 1) % 24;
    }

    // Schedule delicate act-specific micro-ambience events (escapement ticks / hearth crackles)
    while (this.nextMicroAmbTime < now + 0.24) {
      this._scheduleMicroAmbience(this.nextMicroAmbTime);
      this.nextMicroAmbTime += 1 / 6; // 6Hz watchmaker escapement grid (166.7ms)
    }
  }

  _scheduleMicroAmbience(t) {
    if (this.muted) return;
    if (this.activeAct === 3) {
      // Delicate 6Hz Swiss pocket-watch escapement tick-tock!
      this._escapementTick(t, (Math.round(t * 6) % 2 === 0) ? 4200 : 3650, 0.0085);
    } else if (this.activeAct === 2 && Math.random() < 0.22) {
      // Warm random fireplace wood-ember crackle pop!
      this._hearthCrackle(t, 0.018 + Math.random() * 0.018);
    } else if (this.activeAct === 1 && Math.random() < 0.07) {
      // Very subtle candlewick sputter
      this._hearthCrackle(t, 0.008);
    }
  }

  _escapementTick(t, freq, amp) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(amp, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    o.connect(g);
    g.connect(this.dryBus);
    o.start(t);
    o.stop(t + 0.015);
  }

  _hearthCrackle(t, amp) {
    if (!this.noiseBuf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1400 + Math.random() * 1600;
    bp.Q.value = 4.5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(amp, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.dryBus);
    src.start(t, Math.random() * 2.0, 0.032);
  }

  _playBeat(beatIdx, t) {
    const bar = Math.floor(beatIdx / 3);
    const beatInBar = beatIdx % 3;
    const chord = CHORDS[bar];

    const v1 = this._voiceLevel(1);
    if (v1 > 0.01) {
      const note = chord[beatInBar === 0 ? 1 : beatInBar === 1 ? 2 : 3] + 12;
      this._celestaPluck(MIDI_TO_HZ(note), t, 0.095 * v1, 1.15);
    }

    const v2 = this._voiceLevel(2);
    if (v2 > 0.01) {
      if (beatInBar === 0) {
        this._marimbaTone(MIDI_TO_HZ(chord[0]), t, 0.14 * v2);
      } else {
        this._marimbaTone(MIDI_TO_HZ(chord[beatInBar] + 12), t, 0.06 * v2);
        this._sleighShimmer(t, 0.022 * v2);
      }
    }

    const v3 = this._voiceLevel(3);
    if (v3 > 0.01) {
      const mNote = MELODY[beatIdx];
      if (mNote > 0) {
        this._musicBoxTine(MIDI_TO_HZ(mNote), t, 0.105 * v3);
      }
    }

    const v4 = this._voiceLevel(4);
    if (v4 > 0.01 && beatInBar === 0) {
      this._glassPad(MIDI_TO_HZ(chord[2] + 12), t, 0.055 * v4, this.beatDur * 2.9);
      this._glassPad(MIDI_TO_HZ(chord[3] + 12), t + 0.04, 0.045 * v4, this.beatDur * 2.9);
    }
  }

  _celestaPluck(freq, t, amp, dur) {
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o1.type = 'sine';
    o2.type = 'triangle';
    o1.frequency.value = freq;
    o2.frequency.value = freq * 2.0;

    const g2 = this.ctx.createGain();
    g2.gain.value = 0.18;

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    o1.connect(g);
    o2.connect(g2);
    g2.connect(g);
    g.connect(this.dryBus);
    g.connect(this.reverb);
    o1.start(t);
    o2.start(t);
    o1.stop(t + dur + 0.03);
    o2.stop(t + dur + 0.03);
  }

  _marimbaTone(freq, t, amp) {
    const o = this.ctx.createOscillator();
    const oHarm = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const gH = this.ctx.createGain();
    o.type = 'sine';
    oHarm.type = 'sine';
    o.frequency.value = freq;
    oHarm.frequency.value = freq * 3.98;
    gH.gain.setValueAtTime(amp * 0.25, t);
    gH.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

    o.connect(g);
    oHarm.connect(gH);
    gH.connect(this.dryBus);
    g.connect(this.dryBus);
    g.connect(this.reverb);
    o.start(t);
    oHarm.start(t);
    o.stop(t + 0.58);
    oHarm.stop(t + 0.12);
  }

  _sleighShimmer(t, amp) {
    if (!this.noiseBuf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 6400;
    bp.Q.value = 9.0;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.reverb);
    src.start(t, Math.random() * 1.2, 0.16);
  }

  _musicBoxTine(freq, t, amp) {
    const o = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const gO = this.ctx.createGain();
    o.type = 'sine';
    overtone.type = 'sine';
    o.frequency.value = freq;
    overtone.frequency.value = freq * 5.41;

    gO.gain.setValueAtTime(amp * 0.22, t);
    gO.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.45);

    o.connect(g);
    overtone.connect(gO);
    gO.connect(this.dryBus);
    g.connect(this.dryBus);
    g.connect(this.reverb);
    o.start(t);
    overtone.start(t);
    o.stop(t + 1.5);
    overtone.stop(t + 0.07);
  }

  _glassPad(freq, t, amp, dur) {
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o1.type = 'sine';
    o2.type = 'sine';
    o1.frequency.value = freq;
    o2.frequency.value = freq * 1.003;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(amp, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o1.connect(g);
    o2.connect(g);
    g.connect(this.reverb);
    o1.start(t);
    o2.start(t);
    o1.stop(t + dur + 0.05);
    o2.stop(t + dur + 0.05);
  }

  // ---------------- Tactile Micro-Interaction Foley ----------------
  playWaxSealBreak() {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    if (this.noiseBuf) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1950;
      bp.Q.value = 2.8;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.24, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      src.connect(bp);
      bp.connect(g);
      g.connect(this.dryBus);
      src.start(t, 0.2, 0.14);
    }
    [65, 69, 72, 76, 81].forEach((m, idx) => {
      this._musicBoxTine(MIDI_TO_HZ(m), t + 0.06 + idx * 0.065, 0.088);
    });
  }

  playHoverTick(pitch = 1.0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 1320 * pitch;
    g.gain.setValueAtTime(0.018, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
    o.connect(g);
    g.connect(this.dryBus);
    o.start(t);
    o.stop(t + 0.04);
  }

  playPaperFold(open = true) {
    this.unlock();
    if (!this.ctx || this.muted || !this.noiseBuf) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(open ? 780 : 620, t);
    bp.frequency.linearRampToValueAtTime(open ? 1450 : 480, t + 0.16);
    bp.Q.value = 1.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.11, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.19);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.dryBus);
    src.start(t, Math.random(), 0.22);
    this._celestaPluck(MIDI_TO_HZ(open ? 77 : 72), t + 0.02, 0.06, 0.7);
  }

  playClayPop(step = 0) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    const base = 280 + (step % 6) * 45;
    o.frequency.setValueAtTime(base, t);
    o.frequency.exponentialRampToValueAtTime(base * 2.15, t + 0.075);
    g.gain.setValueAtTime(0.14, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.09);
    o.connect(g);
    g.connect(this.dryBus);
    o.start(t);
    o.stop(t + 0.1);
  }

  playBellChime(scaleIdx = 0) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const scale = [65, 67, 69, 72, 74, 77, 81, 84];
    const m = scale[scaleIdx % scale.length];
    this._musicBoxTine(MIDI_TO_HZ(m), this.ctx.currentTime, 0.12);
  }

  playRatchetClick(intensity = 1.0) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(920 + Math.random() * 180, t);
    o.frequency.exponentialRampToValueAtTime(320, t + 0.026);
    g.gain.setValueAtTime(0.08 * intensity, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.03);
    o.connect(g);
    g.connect(this.dryBus);
    o.start(t);
    o.stop(t + 0.035);
  }

  playSnowWhoosh(strength = 0.6) {
    if (!this.ctx || this.muted || !this.noiseBuf) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'bandpass';
    lp.frequency.setValueAtTime(520, t);
    lp.frequency.linearRampToValueAtTime(1200, t + 0.18);
    lp.Q.value = 1.4;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.07 * strength, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.42);
    src.connect(lp);
    lp.connect(g);
    g.connect(this.reverb);
    src.start(t, Math.random(), 0.45);
  }

  playCrystalHarmonica(idx = 0) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const notes = [69, 72, 74, 76, 77, 81, 84, 88];
    const freq = MIDI_TO_HZ(notes[idx % notes.length]);
    const t = this.ctx.currentTime;
    this._glassPad(freq, t, 0.09, 1.8);
    this._celestaPluck(freq * 2, t, 0.045, 0.9);
  }

  playSigilAwaken() {
    this.unlock();
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const gliss = [65, 69, 72, 76, 77, 81, 84, 88, 93];
    gliss.forEach((m, i) => {
      this._musicBoxTine(MIDI_TO_HZ(m), t + i * 0.055, 0.095);
    });
    this._glassPad(MIDI_TO_HZ(77), t + 0.15, 0.08, 2.8);
  }
}

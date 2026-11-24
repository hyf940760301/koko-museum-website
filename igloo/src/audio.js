// Procedural Web Audio soundscape matching Igloo Inc.'s polar & subterranean acoustic cues:
// - Surface blizzard wind & igloo harmonic hum
// - Crystalline stone-ice block hover clink (igloo_Blocks)
// - Fracture portal whoosh between scenes & into DetailScene
// - High-frequency UI telemetry beep & particle morph shimmer

export function createPolarAudio() {
  let ctx = null;
  let master = null;
  let windFilter = null;
  let windGain = null;
  let subOsc = null;
  let subGain = null;
  let muted = true;
  let unlocked = false;

  function ensureContext() {
    if (ctx) return true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    ctx = new AudioCtx();

    master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    // Filtered pink-noise arctic wind
    const len = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.96300 * b1 + w * 0.2965164;
      b2 = 0.57000 * b2 + w * 1.0526913;
      data[i] = (b0 + b1 + b2 + w * 0.1848) * 0.06;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;

    windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 340;
    windFilter.Q.value = 2.4;

    windGain = ctx.createGain();
    windGain.gain.value = 0.35;
    noise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    noise.start();

    // Deep vault resonance drone
    subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 65.41; // C2
    subGain = ctx.createGain();
    subGain.gain.value = 0.08;
    subOsc.connect(subGain);
    subGain.connect(master);
    subOsc.start();

    unlocked = true;
    return true;
  }

  function toggleMute() {
    if (!ensureContext()) return true;
    if (ctx.state === 'suspended') ctx.resume();
    muted = !muted;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(muted ? 0.0 : 0.42, now, 0.22);
    return muted;
  }

  function playIceClink(pitchScale = 1.0) {
    if (muted || !unlocked || !ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime((1680 + Math.random() * 720) * pitchScale, now);
    osc.frequency.exponentialRampToValueAtTime(640 * pitchScale, now + 0.11);
    g.gain.setValueAtTime(0.065, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  function playUiBeep(freq = 1240) {
    if (muted || !unlocked || !ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.045, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  function playPortalWhoosh() {
    if (muted || !unlocked || !ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(48, now + 0.55);
    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  function update(sceneIndex, scrollSpeed, inDetail) {
    if (!unlocked || muted || !ctx) return;
    const now = ctx.currentTime;
    const isSurface = sceneIndex === 0 && !inDetail;
    const targetFreq = isSurface ? 360 + Math.min(480, Math.abs(scrollSpeed) * 900) : 165;
    windFilter.frequency.setTargetAtTime(targetFreq, now, 0.15);
    windGain.gain.setTargetAtTime(isSurface ? 0.36 : 0.12, now, 0.2);
    subGain.gain.setTargetAtTime(inDetail ? 0.18 : isSurface ? 0.06 : 0.15, now, 0.25);
  }

  return {
    toggleMute,
    playIceClink,
    playUiBeep,
    playPortalWhoosh,
    update,
    isMuted: () => muted,
  };
}

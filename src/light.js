// The light of the day. The room follows the visitor's own clock: morning sun, noon,
// a gold late afternoon, dusk, then moon and candles. An open altarpiece can borrow
// the room for its own weather (rain, snow, night...) and gives it back on closing.
import { LIGHT } from './materials.js';
import { AIR } from './air.js';

const KEYS = ['sun', 'sky', 'up', 'dn', 'pool', 'haze', 'top', 'hor'];
export const PRESET = {
  night:    { sun: [0.30, 0.38, 0.60], sky: [0.55, 0.70, 1.10], up: [0.085, 0.10, 0.15], dn: [0.10, 0.095, 0.11], pool: [0.10, 0.13, 0.22], haze: [0.10, 0.12, 0.19], top: [0.015, 0.03, 0.09], hor: [0.05, 0.08, 0.18], gain: 1.0, cloud: 0.35, stars: 1, candle: 1, beam: 0.55, hz: 0.004, ev: 0, torch: 1.0, chand: 1.0, win: 0.15, el: 30, cev: 0.1, csky: 1.0, camb: 0.8, gsat: 0.85, gcon: 1.04, gwarm: -0.30 },
  dawn:     { sun: [1.55, 1.02, 0.80], sky: [4.6, 4.4, 5.0], up: [0.36, 0.36, 0.42], dn: [0.44, 0.38, 0.35], pool: [1.05, 0.66, 0.50], haze: [0.95, 0.90, 0.88], top: [0.50, 0.62, 0.92], hor: [1.0, 0.80, 0.74], gain: 1.35, cloud: 0.8, stars: 0, candle: 0.22, beam: 1.1, hz: 0.004, ev: -0.15, torch: 0.35, chand: 0.2, win: 0.9, el: 8, cev: -0.1, csky: 0.9, camb: 0.9, gsat: 1.00, gcon: 1.00, gwarm: 0.15 },
  day:      { sun: [1.75, 1.42, 0.98], sky: [6.2, 7.1, 8.3], up: [0.40, 0.43, 0.48], dn: [0.47, 0.43, 0.38], pool: [1.20, 0.88, 0.56], haze: [0.93, 0.92, 0.90], top: [0.40, 0.64, 0.97], hor: [0.80, 0.90, 1.0], gain: 1.5, cloud: 0.9, stars: 0, candle: 0, beam: 1, hz: 0.003, ev: -0.35, torch: 0.15, chand: 0, win: 1.0, el: 35, cev: -0.35, csky: 1.2, camb: 1.0, gsat: 1.00, gcon: 1.00, gwarm: 0.10 },
  noon:     { sun: [1.80, 1.52, 1.12], sky: [6.6, 7.4, 8.4], up: [0.42, 0.45, 0.50], dn: [0.48, 0.45, 0.40], pool: [1.20, 0.94, 0.66], haze: [0.94, 0.94, 0.93], top: [0.34, 0.60, 0.98], hor: [0.76, 0.88, 1.0], gain: 1.55, cloud: 1, stars: 0, candle: 0, beam: 0.9, hz: 0.003, ev: -0.45, torch: 0.15, chand: 0, win: 0.9, el: 55, cev: -0.25, csky: 1.2, camb: 1.0, gsat: 0.80, gcon: 1.10, gwarm: -0.30 },
  golden:   { sun: [2.05, 1.25, 0.62], sky: [5.0, 4.6, 4.6], up: [0.38, 0.37, 0.40], dn: [0.50, 0.42, 0.34], pool: [1.35, 0.80, 0.42], haze: [0.96, 0.91, 0.84], top: [0.42, 0.58, 0.90], hor: [1.05, 0.80, 0.58], gain: 1.4, cloud: 0.85, stars: 0, candle: 0.10, beam: 1.25, hz: 0.004, ev: -0.25, torch: 0.3, chand: 0.25, win: 1.3, el: 12, cev: -0.2, csky: 0.9, camb: 0.95, gsat: 1.03, gcon: 1.05, gwarm: 0.22 },
  dusk:     { sun: [0.95, 0.55, 0.50], sky: [2.4, 2.1, 3.0], up: [0.22, 0.22, 0.30], dn: [0.30, 0.25, 0.25], pool: [0.60, 0.34, 0.30], haze: [0.62, 0.55, 0.62], top: [0.20, 0.22, 0.48], hor: [0.95, 0.55, 0.50], gain: 1.1, cloud: 0.7, stars: 0.35, candle: 0.75, beam: 0.8, hz: 0.004, ev: -0.10, torch: 0.8, chand: 0.7, win: 0.5, el: 3, cev: -0.05, csky: 0.7, camb: 0.85, gsat: 0.94, gcon: 1.00, gwarm: 0.02 },
  overcast: { sun: [0.35, 0.36, 0.38], sky: [5.0, 5.4, 5.9], up: [0.42, 0.44, 0.47], dn: [0.42, 0.41, 0.40], pool: [0.35, 0.36, 0.38], haze: [0.88, 0.90, 0.92], top: [0.62, 0.68, 0.74], hor: [0.80, 0.84, 0.88], gain: 1.3, cloud: 1, stars: 0, candle: 0.22, beam: 0.22, hz: 0.006, ev: -0.10, torch: 0.45, chand: 0.3, win: 0.2, el: 35, cev: -0.70, csky: 1.6, camb: 1.1, gsat: 0.82, gcon: 0.92, gwarm: 0.00 },
  snow:     { sun: [0.90, 0.95, 1.05], sky: [6.6, 7.2, 8.0], up: [0.48, 0.51, 0.56], dn: [0.50, 0.50, 0.52], pool: [0.80, 0.85, 0.95], haze: [0.95, 0.96, 0.98], top: [0.78, 0.84, 0.92], hor: [0.95, 0.97, 1.0], gain: 1.45, cloud: 1, stars: 0, candle: 0, beam: 0.5, hz: 0.006, ev: -0.45, torch: 0.4, chand: 0.3, win: 0.35, el: 35, cev: -0.25, csky: 1.8, camb: 1.15, gsat: 0.80, gcon: 0.95, gwarm: -0.35 },
};
// torch, chand, win, el, cev, csky (baked sky light), camb (ambient on baked surfaces), gsat / gcon / gwarm (the preset's grade: saturation, contrast, white balance): the castle hall only (?castle=1); the old rotunda never reads them
const NUM = ['gain', 'cloud', 'stars', 'candle', 'beam', 'hz', 'ev', 'torch', 'chand', 'win', 'el', 'cev', 'csky', 'camb', 'gsat', 'gcon', 'gwarm'];
const mix = (a, b, t) => { const o = {}; for (const k of KEYS) o[k] = a[k].map((v, i) => v + (b[k][i] - v)*t); for (const k of NUM) o[k] = a[k] + (b[k] - a[k])*t; return o; };
const sm = (t) => { t = Math.min(1, Math.max(0, t)); return t*t*(3 - 2*t); };
const STOPS = [[0, 'night'], [5, 'night'], [6.8, 'dawn'], [9.5, 'day'], [11.5, 'noon'], [14, 'noon'], [15.5, 'day'], [17.6, 'golden'], [19.2, 'dusk'], [20.8, 'night'], [24, 'night']];

export function hourState(h) {
  h = ((h % 24) + 24) % 24; let i = 0; while (i < STOPS.length - 2 && h >= STOPS[i + 1][0]) i++;
  const [h0, a] = STOPS[i], [h1, b] = STOPS[i + 1]; const s = mix(PRESET[a], PRESET[b], sm((h - h0)/(h1 - h0)));
  // where the sun (or the moon) lands on the floor, as an angle round the room and a distance from its middle
  const dayT = Math.min(1, Math.max(0, (h - 6)/13)); const isDay = h > 5.5 && h < 19.6;
  let ang = -80 + 160*dayT; if (Math.abs(ang) < 22) ang = ang < 0 ? -22 : 22;
  s.ang = isDay ? ang*Math.PI/180 : 2.5; s.rad = isDay ? 0.74 - 0.20*Math.sin(Math.PI*dayT) : 0.58;
  return s;
}
export const localHour = () => { const d = new Date(); return d.getHours() + d.getMinutes()/60; };
export const dayPart = (h) => (h < 5 || h >= 20.5 ? '夜' : h < 9 ? '晨' : h < 16.5 ? '昼' : h < 19 ? '暮' : '昏');

export class Daylight {
  constructor() { this.cur = null; this.mood = null; this.moodK = 0; this.hour = null; this.room = null; this.castle = null; }
  // room: { ocu, ocuR, radius } - radius is how far the pool may wander from the middle
  setRoom(room) { this.room = room; LIGHT.uOcu.value.copy(room.ocu); LIGHT.uOcuR.value = room.ocuR; LIGHT.uRoom.value = room.id; AIR.uCenter.value.copy(room.centre); this.snap(); }
  target() {
    const h = this.hour ?? localHour(); let s = hourState(h);
    if (this.moodK > 0.001 && this.mood && PRESET[this.mood]) { const m = mix(s, PRESET[this.mood], this.moodK*0.9); m.ang = s.ang; m.rad = s.rad; s = m; }
    return s;
  }
  apply(s) {
    const L = LIGHT, r = this.room;
    L.uSunCol.value.fromArray(s.sun); L.uSkyCol.value.fromArray(s.sky); L.uAmbUp.value.fromArray(s.up); L.uAmbDn.value.fromArray(s.dn); L.uPoolCol.value.fromArray(s.pool); L.uHazeCol.value.fromArray(s.haze);
    L.uHaze.value = s.hz; L.uCandle.value = s.candle; L.uLampA.value.w = r.id ? 0.35 + s.candle*1.2 : 0;
    AIR.uSkyTop.value.fromArray(s.top); AIR.uSkyHor.value.fromArray(s.hor); AIR.uSkyGain.value = s.gain; AIR.uCloud.value = s.cloud; AIR.uStars.value = s.stars; AIR.uBeam.value = s.beam;
    if (this.castle && r.id === 0) { this.applyCastle(s); return; }
    if (r.pool) L.uPool.value.set(r.pool.x, 0.3, r.pool.z);
    else L.uPool.value.set(r.centre.x + Math.sin(s.ang)*s.rad*r.radius, 0.3, r.centre.z - Math.cos(s.ang)*s.rad*r.radius);
    L.uSunDir.value.copy(L.uOcu.value).sub({ x: L.uPool.value.x, y: 0, z: L.uPool.value.z }).normalize();
  }
  // the castle hall (?castle=1): the sun (or moon) is a real direction and comes in through the
  // clerestory; the pool of bounced light sits where the shaft of the window nearest the sun lands
  applyCastle(s) {
    const L = LIGHT, h = ((this.hour ?? localHour()) % 24 + 24) % 24;
    const dayT = Math.min(1, Math.max(0, (h - 6)/13)); const isDay = h > 5.5 && h < 19.6;
    const az = (isDay ? -80 + 160*dayT : 160)*Math.PI/180, el = Math.max(1, s.el)*Math.PI/180;
    L.uSunDir.value.set(Math.sin(az)*Math.cos(el), Math.sin(el), -Math.cos(az)*Math.cos(el));
    // sun to moon: let the window light die away round the change instead of jumping
    const swap = Math.min(1, Math.abs(h - 19.6)/0.5, Math.abs(h - 5.5)/0.5);
    L.uWin.value = s.win*swap; L.uCSky.value = s.csky; L.uCAmb.value = s.camb; L.uChand.value = this.castle.chandelier ? s.chand : 0; L.uCandle.value = s.torch;
    const kw = Math.round(az/(Math.PI/10))*(Math.PI/10); const D = L.uSunDir.value;
    const wx = Math.sin(kw)*12.45, wz = -Math.cos(kw)*12.45, wy = 6.7; let t = wy/D.y;
    let px = wx - D.x*t, pz = wz - D.z*t;
    if (Math.hypot(px, pz) > 10.5) {   // a low sun crosses the hall: the light lands on the far wall
      const a = D.x*D.x + D.z*D.z, b = -(wx*D.x + wz*D.z), c = wx*wx + wz*wz - 10.5*10.5; t = (-b + Math.sqrt(Math.max(0, b*b - a*c)))/a;
      px = wx - D.x*t; pz = wz - D.z*t;
    }
    L.uPool.value.set(px, Math.max(0.3, wy - D.y*t), pz);
  }
  exposure() { const c = this.cur; return c ? (this.castle && this.room && this.room.id === 0 ? c.cev : c.ev) : 0; }
  snap() { this.cur = this.target(); this.apply(this.cur); }
  update(dt, moodOn) {
    this.moodK += ((moodOn ? 1 : 0) - this.moodK)*Math.min(1, dt*0.9);
    const t = this.target(); if (!this.cur) this.cur = t;
    const k = Math.min(1, dt*1.4); const c = this.cur;
    for (const key of KEYS) for (let i = 0; i < 3; i++) c[key][i] += (t[key][i] - c[key][i])*k;
    for (const key of NUM) c[key] += (t[key] - c[key])*k;
    let da = t.ang - c.ang; while (da > Math.PI) da -= Math.PI*2; while (da < -Math.PI) da += Math.PI*2; c.ang += da*Math.min(1, dt*0.8); c.rad += (t.rad - c.rad)*Math.min(1, dt*0.8);
    this.apply(c);
  }
}

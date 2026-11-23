// CuratedMacroRig: Unified Leica-Macro Spherical Spring Camera Controller (Zero-GC)
// Combines curated hover parallax, 0.56x–1.18x soft rubber-band wheel/pinch zoom with automatic
// DoF focus-plane tracking, blank-canvas orbit inspection (+/-32 deg azimuth, -10..+22 deg polar
// with gentle settle-back), double-click framing reset, and 2.2s climax awakening close-ups!

import * as THREE from '../vendor/three.module.js';
import { Spring1D, Spring3D, clamp, rubberBand } from './physics.js';

const DEG = Math.PI / 180;
const _lookTarget = new THREE.Vector3();
const _offset = new THREE.Vector3();

export class CuratedMacroRig {
  constructor(basePos, baseLook, {
    parallaxX = 0.72,
    parallaxY = 0.42,
    minZoom = 0.56,
    maxZoom = 1.18,
    maxAzimuthDeg = 32,
    minPolarDeg = -10,
    maxPolarDeg = 22,
  } = {}) {
    this.baseLook = baseLook.clone();
    _offset.copy(basePos).sub(baseLook);
    this.baseDist = _offset.length();
    this.baseAzimuth = Math.atan2(_offset.x, _offset.z);
    this.basePolar = Math.asin(clamp(_offset.y / Math.max(this.baseDist, 1e-4), -0.98, 0.98));

    this.parallaxX = parallaxX;
    this.parallaxY = parallaxY;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.maxAzimuth = maxAzimuthDeg * DEG;
    this.minPolar = minPolarDeg * DEG;
    this.maxPolar = maxPolarDeg * DEG;

    // User zoom & blank-space orbit inspection state
    this.rawZoom = 1.0;
    this.zoomSpring = new Spring1D(1.0, 95, 16);

    this.userAzimuth = 0;
    this.userPolar = 0;
    this.azimuthSpring = new Spring1D(0, 82, 15);
    this.polarSpring = new Spring1D(0, 82, 15);
    this.orbitHoldTimer = 0;
    this.isOrbitDragging = false;
    this.lastOrbitPtr = { x: 0, y: 0 };

    // Focus/climax temporary close-up target offset
    this.focusLookOffset = new THREE.Vector3();
    this.focusZoomFactor = 1.0;
    this.focusTimer = 0;

    // Final smoothed camera position & lookAt springs (Zero-GC output)
    this.posSpring = new Spring3D(basePos.x, basePos.y, basePos.z, 78, 15);
    this.lookSpring = new Spring3D(baseLook.x, baseLook.y, baseLook.z, 86, 16);
    this.currentFocusDist = this.baseDist;
  }

  // Trigger a temporary macro close-up (used on mechanism inspection or 2.2s Sigil Awakening Climax)
  focusOn(lookDeltaX, lookDeltaY, lookDeltaZ, zoomMul = 0.78, duration = 1.65) {
    this.focusLookOffset.set(lookDeltaX, lookDeltaY, lookDeltaZ);
    this.focusZoomFactor = zoomMul;
    this.focusTimer = duration;
  }

  onWheel(deltaY) {
    const step = clamp(deltaY * 0.00085, -0.14, 0.14);
    this.rawZoom = clamp(this.rawZoom + step, this.minZoom - 0.08, this.maxZoom + 0.08);
    const soft = rubberBand(this.rawZoom, this.minZoom, this.maxZoom, 0.06);
    this.zoomSpring.target = soft;
  }

  onPinchScale(scaleRatio) {
    if (scaleRatio <= 0) return;
    this.rawZoom = clamp(this.rawZoom / scaleRatio, this.minZoom - 0.06, this.maxZoom + 0.06);
    this.zoomSpring.target = rubberBand(this.rawZoom, this.minZoom, this.maxZoom, 0.06);
  }

  beginOrbitDrag(pointerNDC) {
    this.isOrbitDragging = true;
    this.lastOrbitPtr.x = pointerNDC.x;
    this.lastOrbitPtr.y = pointerNDC.y;
    this.orbitHoldTimer = 2.0;
  }

  moveOrbitDrag(pointerNDC) {
    if (!this.isOrbitDragging) return false;
    const dx = pointerNDC.x - this.lastOrbitPtr.x;
    const dy = pointerNDC.y - this.lastOrbitPtr.y;
    this.lastOrbitPtr.x = pointerNDC.x;
    this.lastOrbitPtr.y = pointerNDC.y;

    this.userAzimuth = rubberBand(
      this.userAzimuth - dx * 1.45,
      -this.maxAzimuth,
      this.maxAzimuth,
      0.10
    );
    this.userPolar = rubberBand(
      this.userPolar - dy * 1.05,
      this.minPolar,
      this.maxPolar,
      0.08
    );
    this.azimuthSpring.target = this.userAzimuth;
    this.polarSpring.target = this.userPolar;
    this.orbitHoldTimer = 2.0;
    return true;
  }

  endOrbitDrag() {
    this.isOrbitDragging = false;
    // Settle gently back inside hard bounds if stretched into rubber-band zone
    this.userAzimuth = clamp(this.userAzimuth, -this.maxAzimuth, this.maxAzimuth);
    this.userPolar = clamp(this.userPolar, this.minPolar, this.maxPolar);
    this.azimuthSpring.target = this.userAzimuth;
    this.polarSpring.target = this.userPolar;
  }

  resetFraming() {
    this.rawZoom = 1.0;
    this.zoomSpring.target = 1.0;
    this.userAzimuth = 0;
    this.userPolar = 0;
    this.azimuthSpring.target = 0;
    this.polarSpring.target = 0;
    this.focusTimer = 0;
    this.focusLookOffset.set(0, 0, 0);
    this.focusZoomFactor = 1.0;
  }

  update(dt, parallax) {
    // Settle rawZoom back from rubber-band overscroll
    if (this.rawZoom < this.minZoom) {
      this.rawZoom += (this.minZoom - this.rawZoom) * Math.min(1, dt * 10);
      this.zoomSpring.target = this.rawZoom;
    } else if (this.rawZoom > this.maxZoom) {
      this.rawZoom += (this.maxZoom - this.rawZoom) * Math.min(1, dt * 10);
      this.zoomSpring.target = this.rawZoom;
    }

    // Gentle breath-like return to curated center after 2.0s of idle orbit viewing
    if (!this.isOrbitDragging) {
      if (this.orbitHoldTimer > 0) {
        this.orbitHoldTimer -= dt;
      } else {
        const decay = Math.exp(-dt * 1.35);
        this.userAzimuth *= decay;
        this.userPolar *= decay;
        this.azimuthSpring.target = this.userAzimuth;
        this.polarSpring.target = this.userPolar;
      }
    }

    if (this.focusTimer > 0) {
      this.focusTimer -= dt;
      if (this.focusTimer <= 0) {
        this.focusLookOffset.set(0, 0, 0);
        this.focusZoomFactor = 1.0;
      }
    }

    const zFactor = this.zoomSpring.update(dt) * (this.focusTimer > 0 ? this.focusZoomFactor : 1.0);
    const az = this.baseAzimuth + this.azimuthSpring.update(dt) + parallax.x * 0.085 * this.parallaxX;
    const pol = clamp(
      this.basePolar + this.polarSpring.update(dt) + parallax.y * 0.062 * this.parallaxY,
      -0.35,
      1.28
    );

    const dist = this.baseDist * zFactor;
    const lx = this.baseLook.x + this.focusLookOffset.x + parallax.x * 0.16 * this.parallaxX;
    const ly = this.baseLook.y + this.focusLookOffset.y + parallax.y * 0.12 * this.parallaxY;
    const lz = this.baseLook.z + this.focusLookOffset.z;

    const cosP = Math.cos(pol);
    const px = lx + Math.sin(az) * cosP * dist;
    const py = ly + Math.sin(pol) * dist;
    const pz = lz + Math.cos(az) * cosP * dist;

    this.posSpring.setTarget(px, py, pz);
    this.lookSpring.setTarget(lx, ly, lz);
    this.posSpring.update(dt);
    this.lookSpring.update(dt);

    const dx = this.posSpring.sx.x - this.lookSpring.sx.x;
    const dy = this.posSpring.sy.x - this.lookSpring.sy.x;
    const dz = this.posSpring.sz.x - this.lookSpring.sz.x;
    this.currentFocusDist = Math.hypot(dx, dy, dz);
  }

  apply(camera) {
    this.posSpring.copyTo(camera.position);
    this.lookSpring.copyTo(_lookTarget);
    camera.lookAt(_lookTarget);
  }

  getFocusDistance() {
    return this.currentFocusDist;
  }
}

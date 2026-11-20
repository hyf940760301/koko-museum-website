// Short additive streaks thrown off where the beam meets rust.
const STRIDE = 6; // x, y, vx, vy, life, ttl
const VERTS = 6; // one quad per spark

export class Sparks {
  constructor(gl, max = 480) {
    this.gl = gl;
    this.max = max;
    this.count = 0;
    this.p = new Float32Array(max * STRIDE);
    this.verts = new Float32Array(max * VERTS * 3); // x, y, alpha
    this.vao = gl.createVertexArray();
    this.buf = gl.createBuffer();
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    gl.bufferData(gl.ARRAY_BUFFER, this.verts.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
  }

  emit(x, y, vx, vy, ttl) {
    if (this.count >= this.max) return;
    const i = this.count++ * STRIDE;
    const p = this.p;
    p[i] = x; p[i + 1] = y; p[i + 2] = vx; p[i + 3] = vy; p[i + 4] = ttl; p[i + 5] = ttl;
  }

  update(dt) {
    const p = this.p;
    const drag = Math.exp(-dt * 3.2);
    let n = this.count;
    for (let k = 0; k < n; k++) {
      const i = k * STRIDE;
      p[i + 4] -= dt;
      if (p[i + 4] <= 0) {
        n--;
        p.copyWithin(i, n * STRIDE, n * STRIDE + STRIDE);
        k--;
        continue;
      }
      p[i] += p[i + 2] * dt;
      p[i + 1] += p[i + 3] * dt;
      p[i + 2] *= drag;
      p[i + 3] *= drag;
    }
    this.count = n;
  }

  draw(program, w, h, halfWidth) {
    if (!this.count) return;
    const gl = this.gl;
    const p = this.p;
    const v = this.verts;
    let o = 0;
    for (let k = 0; k < this.count; k++) {
      const i = k * STRIDE;
      const a = Math.min(1, (p[i + 4] / p[i + 5]) * 1.7);
      const vx = p[i + 2], vy = p[i + 3];
      const sp = Math.hypot(vx, vy) || 1;
      const nx = (-vy / sp) * halfWidth, ny = (vx / sp) * halfWidth;
      const hx = p[i], hy = p[i + 1];
      const tx = hx - vx * 0.04, ty = hy - vy * 0.04;
      v[o++] = hx + nx; v[o++] = hy + ny; v[o++] = a;
      v[o++] = hx - nx; v[o++] = hy - ny; v[o++] = a;
      v[o++] = tx; v[o++] = ty; v[o++] = 0;
      v[o++] = hx + nx; v[o++] = hy + ny; v[o++] = a;
      v[o++] = hx - nx; v[o++] = hy - ny; v[o++] = a;
      v[o++] = hx + vx * 0.004; v[o++] = hy + vy * 0.004; v[o++] = a;
    }
    gl.useProgram(program.prog);
    gl.uniform2f(program.u.uRes, w, h);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, v, 0, o);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.TRIANGLES, 0, o / 3);
    gl.disable(gl.BLEND);
    gl.bindVertexArray(null);
  }
}

// Draws the stage's real DOM copy into a canvas, glyph by glyph at its laid-out position, so the
// plate shader can engrave it into the steel. Red holds the crisp glyphs, green a blurred copy
// used for the bevel.
export function rasterizeEngraving(stage, scale, target) {
  const box = stage.getBoundingClientRect();
  const canvas = target || document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(box.width * scale));
  canvas.height = Math.max(1, Math.round(box.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glyphs = [];
  const range = document.createRange();
  for (const el of stage.querySelectorAll('[data-lc-engrave]')) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const cs = getComputedStyle(node.parentElement);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const font = `${cs.fontStyle} ${cs.fontWeight} ${parseFloat(cs.fontSize) * scale}px ${cs.fontFamily}`;
      const upper = cs.textTransform === 'uppercase';
      ctx.font = font;
      const m = ctx.measureText('Hg');
      const ascent = m.fontBoundingBoxAscent || parseFloat(cs.fontSize) * scale * 0.8;
      const text = node.data;
      for (let i = 0; i < text.length; ) {
        const cp = text.codePointAt(i);
        const len = cp > 0xffff ? 2 : 1;
        const ch = text.substr(i, len);
        if (ch.trim()) {
          range.setStart(node, i);
          range.setEnd(node, i + len);
          const r = range.getClientRects()[0];
          if (r && r.width > 0) {
            glyphs.push({
              font,
              // Bevel width follows the type size so small labels stay legible.
              blur: Math.min(3.5, Math.max(0.7, parseFloat(cs.fontSize) * 0.035)) * scale,
              ch: upper ? ch.toUpperCase() : ch,
              x: (r.left - box.left) * scale,
              y: (r.top - box.top) * scale + ascent,
            });
          }
        }
        i += len;
      }
    }
  }

  const draw = (bevel) => {
    let font = '';
    for (const g of glyphs) {
      if (g.font !== font) ctx.font = font = g.font;
      if (bevel) ctx.shadowBlur = g.blur;
      ctx.fillText(g.ch, g.x, g.y);
    }
  };
  ctx.textBaseline = 'alphabetic';
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#f00';
  draw(false);
  ctx.shadowColor = '#0f0';
  ctx.fillStyle = '#000';
  draw(true);
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  return canvas;
}

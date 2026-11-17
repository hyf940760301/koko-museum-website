# The castle's final look as a 32^3 LUT, unrolled to 1024x32 (column = b*32 + r, row = g, top row g = 0),
# applied by src/post.js after AgX on the display-referred colour (posters bypass it).
#   python3 tools/make_lut.py            -> assets/castle/lut.png
# Warm and rich, never grey: a filmic S around the middle (more depth than AgX alone), deeper blacks
# held just off zero, colour pushed in the mid tones (not in what is already saturated), shadows a
# touch warm, highlights kept clean.
import numpy as np
from PIL import Image
N = 32
g = np.linspace(0, 1, N)
B, G, R = np.meshgrid(g, g, g, indexing='ij')          # [b, g, r]
c = np.stack([R, G, B], -1)
Y = lambda c: c @ np.array([.2126, .7152, .0722])
# 1. contrast: S curve with fixed ends, slope 1.22 at 0.5
k = 0.22; c = c - k*np.sin(2*np.pi*c)/(2*np.pi)
# 2. black floor: lift the very bottom a hair so shadows keep detail, without greying the mids
c = 0.006 + c*(1 - 0.006)
# 3. colour: chroma x1.08 in the mid tones, tapering where the colour is already strong
y = Y(c)[..., None]; ch = c - y; sat = np.abs(ch).max(-1, keepdims=True)
boost = 1 + 0.08*(1 - np.clip(sat/0.45, 0, 1))*np.clip(1 - np.abs(y - .45)/.55, 0, 1)
c = y + ch*boost
# 4. warmth: shadows toward amber, highlights a little cream (luminance kept)
ws = np.clip(1 - y/0.45, 0, 1); wh = np.clip((y - 0.6)/0.4, 0, 1)
tint = 1 + ws*np.array([.025, .004, -.032]) + wh*np.array([.012, .004, -.016])
c = c*tint; c = c*(y/np.maximum(Y(c)[..., None], 1e-5))
c = np.clip(c, 0, 1)
img = np.zeros((N, N*N, 3))
for b in range(N): img[:, b*N:(b + 1)*N] = c[b]          # rows = g, columns = r
Image.fromarray(np.round(img*255).astype(np.uint8)).save('assets/castle/lut.png', optimize=True)
print('lut written', img.shape)

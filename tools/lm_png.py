# _src/castle/<name>_lm.npy (tools/blender/bake_hall.py: float16 RGBA, row 0 at the bottom as Blender
# stores it) -> _src/castle/<name>_lm.png (8-bit RGBA, top row first) for tools/pack_assets.sh.
#   python3 tools/lm_png.py bay bay9 bay11 door upper floor
# In the lower modules a sky value above 0.12 of the open sky can only be a face that looks outside
# (the backs of the shell, the passage beyond the shut door): those texels are set to no sky, so they
# do not bleed into the faces round them in the mip levels.
import sys, numpy as np
from PIL import Image
SKYMAX = 0.25
for n in sys.argv[1:]:
    a = np.load(f'_src/castle/{n}_lm.npy').astype(np.float32)[::-1].copy()
    out = 0
    if n.startswith('bay') or n == 'door':
        m = a[..., 2]**2*SKYMAX > 0.12; out = int(m.sum()); a[..., 2][m] = 0
    Image.fromarray(np.round(np.clip(a, 0, 1)*255).astype(np.uint8)).save(f'_src/castle/{n}_lm.png')
    print(n, a.shape, 'channel means', [round(float(a[..., c].mean()), 3) for c in range(4)], 'outside texels cleared', out)

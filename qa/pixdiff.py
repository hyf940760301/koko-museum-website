# Pixel comparison of two shot folders: max channel difference and changed-pixel count per file.
#   python3 qa/pixdiff.py qa/out/head_dpr1 qa/out/new_dpr1
import sys, os
import numpy as np
from PIL import Image
a, b = sys.argv[1], sys.argv[2]; worst = 0
for f in sorted(os.listdir(a)):
    if not f.endswith('.png') or not os.path.exists(os.path.join(b, f)): continue
    x = np.asarray(Image.open(os.path.join(a, f)).convert('RGB')).astype(int); y = np.asarray(Image.open(os.path.join(b, f)).convert('RGB')).astype(int)
    if x.shape != y.shape: print(f, 'size differs', x.shape, y.shape); worst = 999; continue
    d = np.abs(x - y).max(2); print(f'{f:10s} max {d.max():3d}  changed px {int((d > 0).sum())}')
    if not f.startswith('E04'): worst = max(worst, int(d.max()))
print('MAX (E04 studio noise excluded):', worst)

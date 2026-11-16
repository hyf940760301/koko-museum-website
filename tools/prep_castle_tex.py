# Runtime copies of the castle textures: re-encoded (and where it does not show, scaled down)
# so step 1 stays inside its 10 MB download budget.  python3 tools/prep_castle_tex.py SRC OUT
import sys, os
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
JOBS = [  # source, runtime name, size, jpeg quality
  ('sandstone_blocks_08_diff_2k.jpg', 'sandstone_diff.jpg', 2048, 86),
  ('sandstone_blocks_08_nor_gl_2k.jpg', 'sandstone_nor.jpg', 2048, 88),
  ('sandstone_blocks_08_arm_2k.jpg', 'sandstone_arm.jpg', 1024, 88),
  ('medieval_wall_01_diff_2k.jpg', 'render_diff.jpg', 1536, 84),
  ('medieval_wall_01_nor_gl_2k.jpg', 'render_nor.jpg', 1536, 84),
  ('medieval_wall_01_arm_2k.jpg', 'render_arm.jpg', 1024, 86),
  ('oak_veneer_01_diff_1k.jpg', 'oak_diff.jpg', 1024, 86),
  ('oak_veneer_01_nor_gl_1k.jpg', 'oak_nor.jpg', 1024, 86),
  ('oak_veneer_01_arm_1k.jpg', 'oak_arm.jpg', 512, 86),
  ('metal_plate_02_diff_1k.jpg', 'iron_diff.jpg', 512, 86),
  ('metal_plate_02_nor_gl_1k.jpg', 'iron_nor.jpg', 512, 86),
]
os.makedirs(out, exist_ok=True)
for s, d, size, q in JOBS:
    im = Image.open(os.path.join(src, s)).convert('RGB')
    if im.width != size: im = im.resize((size, size), Image.LANCZOS)
    im.save(os.path.join(out, d), quality=q, optimize=True, progressive=False, subsampling=0 if 'nor' in d else 2)
    print(d, os.path.getsize(os.path.join(out, d))//1024, 'KB')

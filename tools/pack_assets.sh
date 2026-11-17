#!/usr/bin/env bash
# Step 2 asset pipeline: Poly Haven sources and the Blender output (both in _src/, not committed)
# become what the castle downloads.
#   bash tools/pack_assets.sh [OUT]          (OUT defaults to assets/castle)
# - colour and normal maps: KTX2 / UASTC + RDO + zstd. (The plan had colour in ETC1S; measured on
#   the step-1 stills it shifts the stone green, -0.4/+0.3/-0.6 RGB, and roughly doubles the error.)
# - ARM maps: KTX2 / ETC1S, no measurable difference against UASTC at a fifth of the size
# - light map: UASTC + zstd without RDO (data, it feeds the AO and torch light)
# - every texture carries a full mip chain built offline, transfer function set explicitly
# - bay glb: meshopt (EXT_meshopt_compression + quantization), precision kept above what shows
# The Blender output lives in _src/castle/: castle_kit.py writes bay.glb, door.glb and upper.glb,
# bake_hall.py the light maps as .npy and tools/lm_png.py turns them into PNGs (commands at the top).
# Needs ktx (KTX-Software 4.4, ~/.local/bin), gltf-transform (npm), python3 + Pillow.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=${1:-assets/castle}
SRC=_src/polyhaven; RAW=_src/castle; WORK=_src/ktx_work
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"
command -v ktx >/dev/null || { echo "ktx missing (KTX-Software 4.4)"; exit 1; }
command -v gltf-transform >/dev/null || { echo "gltf-transform missing (npm i -g @gltf-transform/cli)"; exit 1; }
mkdir -p "$WORK" "$OUT/tex" "$OUT/lm"

# 1. sources resized to the runtime size (lossless PNG, so the only loss is the GPU codec)
python3 - "$SRC" "$WORK" <<'PY'
import sys, os
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
JOBS = [  # source, runtime name, size: colour up to 2K, normal and ARM at most 1K (download budget);
        # the two floor colours at 1.5K: 2K with mips is 4.1 MB each (busy texture), 1.5K is 2.2 MB and
        # still above 800 px per metre on the floor
  ('sandstone_blocks_08_diff_2k.jpg', 'sandstone_diff', 2048), ('sandstone_blocks_08_nor_gl_2k.jpg', 'sandstone_nor', 1024), ('sandstone_blocks_08_arm_2k.jpg', 'sandstone_arm', 1024),
  ('medieval_wall_01_diff_2k.jpg', 'render_diff', 1536), ('medieval_wall_01_nor_gl_2k.jpg', 'render_nor', 1024), ('medieval_wall_01_arm_2k.jpg', 'render_arm', 1024),
  ('oak_veneer_01_diff_1k.jpg', 'oak_diff', 1024), ('oak_veneer_01_nor_gl_1k.jpg', 'oak_nor', 1024), ('oak_veneer_01_arm_1k.jpg', 'oak_arm', 512),
  ('metal_plate_02_diff_1k.jpg', 'iron_diff', 512), ('metal_plate_02_nor_gl_1k.jpg', 'iron_nor', 512),
  ('floor_tiles_08_diff_2k.jpg', 'slab_diff', 1536), ('floor_tiles_08_nor_gl_1k.jpg', 'slab_nor', 1024), ('floor_tiles_08_arm_1k.jpg', 'slab_arm', 1024),
  ('herringbone_brick_02_diff_2k.jpg', 'herring_diff', 1536), ('herringbone_brick_02_nor_gl_1k.jpg', 'herring_nor', 1024), ('herringbone_brick_02_arm_1k.jpg', 'herring_arm', 1024),
]
for s, d, size in JOBS:
    p = os.path.join(out, d + '.png')
    if os.path.exists(p) and os.path.getmtime(p) > os.path.getmtime(os.path.join(src, s)): continue
    im = Image.open(os.path.join(src, s)).convert('RGB')
    if im.width != size: im = im.resize((size, size), Image.LANCZOS)
    im.save(p)
PY

# 2. textures (ktx create, KTX-Software 4.4)
MIP="--generate-mipmap --mipmap-wrap wrap"
ETC1S="--encode basis-lz --clevel 5 --qlevel 255"
UASTC="--encode uastc --uastc-quality 3 --zstd 19"
RDO="--uastc-rdo --uastc-rdo-l 1.0"   # rate-distortion pass: about -35% after zstd, error stays near plain UASTC
for f in "$WORK"/*.png; do
  n=$(basename "$f" .png)
  [ "$OUT/tex/$n.ktx2" -nt "$f" ] && [ -z "${FORCE:-}" ] && continue   # up to date (FORCE=1 re-encodes)
  case "$n" in
    *_diff) ktx create --format R8G8B8_SRGB --assign-tf srgb --assign-primaries bt709 $UASTC $RDO $MIP "$f" "$OUT/tex/$n.ktx2" ;;
    *_arm)  ktx create --format R8G8B8_UNORM --assign-tf linear --assign-primaries none $ETC1S $MIP "$f" "$OUT/tex/$n.ktx2" ;;
    *_nor)  ktx create --format R8G8B8_UNORM --assign-tf linear --assign-primaries none --normalize $UASTC $RDO $MIP "$f" "$OUT/tex/$n.ktx2" ;;
  esac
done
# light maps (tools/blender/bake_hall.py, then tools/lm_png.py): R = AO, G = torches, B = sky through
# windows and lantern, A = curvature; data, so linear. Modules keep three mip levels (deeper ones would
# blend neighbouring uv islands), the floor (sampled by angle and radius) only its full size
for m in bay door upper floor; do   # (bake_hall.py can also bake bay9 / bay11; not shipped, see castle.js)
  [ "$OUT/lm/${m}_lm.ktx2" -nt "$RAW/${m}_lm.png" ] && [ -z "${FORCE:-}" ] && continue
  if [ "$m" = floor ]; then LV="--levels 1"; else LV="--generate-mipmap --mipmap-wrap clamp --levels 3"; fi
  ktx create --format R8G8B8A8_UNORM --assign-tf linear --assign-primaries none $UASTC $LV "$RAW/${m}_lm.png" "$OUT/lm/${m}_lm.ktx2"
done

# 3. geometry: the kit modules (tools/blender/castle_kit.py)
for m in bay door upper; do
  gltf-transform meshopt "$RAW/$m.glb" "$OUT/$m.glb" --level medium --quantize-position 16 --quantize-normal 12 --quantize-texcoord 16 >/dev/null
done
ls -l "$OUT"/tex/*.ktx2 "$OUT"/lm/*.ktx2 "$OUT"/*.glb | awk '{printf "%8.1f KB  %s\n", $5/1024, $9}'

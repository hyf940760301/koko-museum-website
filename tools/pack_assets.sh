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
# The Blender output lives in _src/castle/ (castle_bay.py writes bay0.glb, bake_bay.py bay0_lm.png);
# the step-1 copies can be restored with git show 72fec79:assets/castle/bay0.glb (and lm/bay0_lm.png).
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
JOBS = [  # source, runtime name, size: colour up to 2K, normal and ARM at most 1K (download budget)
  ('sandstone_blocks_08_diff_2k.jpg', 'sandstone_diff', 2048), ('sandstone_blocks_08_nor_gl_2k.jpg', 'sandstone_nor', 1024), ('sandstone_blocks_08_arm_2k.jpg', 'sandstone_arm', 1024),
  ('medieval_wall_01_diff_2k.jpg', 'render_diff', 1536), ('medieval_wall_01_nor_gl_2k.jpg', 'render_nor', 1024), ('medieval_wall_01_arm_2k.jpg', 'render_arm', 1024),
  ('oak_veneer_01_diff_1k.jpg', 'oak_diff', 1024), ('oak_veneer_01_nor_gl_1k.jpg', 'oak_nor', 1024), ('oak_veneer_01_arm_1k.jpg', 'oak_arm', 512),
  ('metal_plate_02_diff_1k.jpg', 'iron_diff', 512), ('metal_plate_02_nor_gl_1k.jpg', 'iron_nor', 512),
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
  case "$n" in
    *_diff) ktx create --format R8G8B8_SRGB --assign-tf srgb --assign-primaries bt709 $UASTC $RDO $MIP "$f" "$OUT/tex/$n.ktx2" ;;
    *_arm)  ktx create --format R8G8B8_UNORM --assign-tf linear --assign-primaries none $ETC1S $MIP "$f" "$OUT/tex/$n.ktx2" ;;
    *_nor)  ktx create --format R8G8B8_UNORM --assign-tf linear --assign-primaries none --normalize $UASTC $RDO $MIP "$f" "$OUT/tex/$n.ktx2" ;;
  esac
done
# light map: R = AO, G = torch light; data, so linear, clamped at the edges
ktx create --format R8G8B8_UNORM --assign-tf linear --assign-primaries none $UASTC --generate-mipmap --mipmap-wrap clamp "$RAW/bay0_lm.png" "$OUT/lm/bay0_lm.ktx2"

# 3. geometry
gltf-transform meshopt "$RAW/bay0.glb" "$OUT/bay0.glb" --level medium --quantize-position 16 --quantize-normal 12 --quantize-texcoord 16 >/dev/null
ls -l "$OUT"/tex/*.ktx2 "$OUT"/lm/*.ktx2 "$OUT"/bay0.glb | awk '{printf "%8.1f KB  %s\n", $5/1024, $9}'

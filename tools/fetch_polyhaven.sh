#!/bin/bash
# Fetch the CC0 Poly Haven sources of the castle work into _src/polyhaven/ (not committed),
# and the environment map into assets/castle/env/. The runtime textures are packed by
# tools/pack_assets.sh (KTX2), after the Blender bay and its bake are in _src/castle/.
#   bash tools/fetch_polyhaven.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=_src/polyhaven; mkdir -p "$SRC" assets/castle/env
B=https://dl.polyhaven.org/file/ph-assets
get() { [ -s "$SRC/$(basename "$1")" ] || curl -fsSL -o "$SRC/$(basename "$1")" "$B/$1"; }
for a in sandstone_blocks_08 medieval_wall_01; do for m in diff nor_gl arm; do get "Textures/jpg/2k/$a/${a}_${m}_2k.jpg"; done; done
# the floor (step 3): colour at 2K, normal and ARM at 1K
for a in floor_tiles_08 herringbone_brick_02; do get "Textures/jpg/2k/$a/${a}_diff_2k.jpg"; for m in nor_gl arm; do get "Textures/jpg/1k/$a/${a}_${m}_1k.jpg"; done; done
for a in metal_plate_02 oak_veneer_01; do for m in diff nor_gl arm; do get "Textures/jpg/1k/$a/${a}_${m}_1k.jpg"; done; done
get "HDRIs/hdr/1k/sepulchral_chapel_rotunda_1k.hdr"
# the studiolo (step 9): three Poly Haven models at 1K and the worn oak floor
for a in GothicCabinet_01 GothicCommode_01 wooden_lantern_01; do
  curl -fsSL "https://api.polyhaven.com/files/$a" | python3 -c "
import json, sys
g = json.load(sys.stdin)['gltf']['1k']['gltf']; print(g['url'], '${a}_1k.gltf')
for rel, v in g['include'].items(): print(v['url'], rel)" | while read -r url rel; do
    p="$SRC/$a/$rel"; mkdir -p "$(dirname "$p")"; [ -s "$p" ] || curl -fsSL -o "$p" "$url"; done
done
curl -fsSL "https://api.polyhaven.com/files/wood_floor_worn" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for m, k in [('Diffuse', 'diff'), ('nor_gl', 'nor_gl'), ('arm', 'arm')]: print(d[m]['1k']['jpg']['url'], k)" | while read -r url k; do
  p="$SRC/wood_floor_worn_${k}_1k.jpg"; [ -s "$p" ] || curl -fsSL -o "$p" "$url"; done
# the environment only feeds blurred reflections: 512 x 256 is plenty
blender -b --factory-startup --python-expr "
import bpy
im = bpy.data.images.load('$PWD/$SRC/sepulchral_chapel_rotunda_1k.hdr'); im.scale(512, 256)
im.filepath_raw = '$PWD/assets/castle/env/chapel_512.hdr'; im.file_format = 'HDR'; im.save()
" >/dev/null
du -sh assets/castle/env

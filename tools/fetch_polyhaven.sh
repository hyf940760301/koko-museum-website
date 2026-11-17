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
for a in metal_plate_02 oak_veneer_01; do for m in diff nor_gl arm; do get "Textures/jpg/1k/$a/${a}_${m}_1k.jpg"; done; done
get "HDRIs/hdr/1k/sepulchral_chapel_rotunda_1k.hdr"
# the environment only feeds blurred reflections: 512 x 256 is plenty
blender -b --factory-startup --python-expr "
import bpy
im = bpy.data.images.load('$PWD/$SRC/sepulchral_chapel_rotunda_1k.hdr'); im.scale(512, 256)
im.filepath_raw = '$PWD/assets/castle/env/chapel_512.hdr'; im.file_format = 'HDR'; im.save()
" >/dev/null
du -sh assets/castle/env

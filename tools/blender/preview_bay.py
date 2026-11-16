# quick solid-shaded previews of a built bay (not part of the build)
#   blender -b /tmp/kmbay0.blend -P tools/blender/preview_bay.py -- /tmp/out_prefix
import bpy, sys, math
from mathutils import Vector
out = sys.argv[sys.argv.index('--') + 1]
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.display.shading.light = 'STUDIO'; sc.display.shading.color_type = 'MATERIAL'
sc.display.shading.show_cavity = True; sc.display.shading.cavity_type = 'BOTH'
sc.display.shading.show_shadows = True
sc.render.resolution_x, sc.render.resolution_y = 1200, 750
def t2b(p): return Vector((p[0], -(p[2] + 12), p[1]))
cams = {'hall': ((0, 1.62, -3.4), (0, 2.7, -12), 50), 'pier': ((0.6, 1.8, -9.6), (1.85, 2.6, -11.8), 40), 'key': ((0, 3.2, -9.8), (0, 4.0, -12.2), 38), 'side': ((-2.6, 2.4, -8.6), (0.2, 2.2, -12), 45)}
cd = bpy.data.cameras.new('c'); co = bpy.data.objects.new('c', cd); sc.collection.objects.link(co); sc.camera = co
for n, (p, t, fov) in cams.items():
    co.location = t2b(p); d = t2b(t) - t2b(p); co.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    cd.angle_y = math.radians(fov); cd.sensor_fit = 'VERTICAL'
    sc.render.filepath = f'{out}_{n}.png'; bpy.ops.render.render(write_still=True)

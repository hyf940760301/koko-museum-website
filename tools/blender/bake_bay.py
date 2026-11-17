# Bake the light map of a castle bay with Cycles (GPU / Metal on the Mac).
#   blender -b --factory-startup -P tools/blender/bake_bay.py -- --in _src/castle/bay.glb  --out _src/castle/bay_lm.png
#   blender -b --factory-startup -P tools/blender/bake_bay.py -- --in _src/castle/door.glb --out _src/castle/door_lm.png
#   blender -b --factory-startup -P tools/blender/bake_bay.py -- --in _src/castle/upper.glb --nb _src/castle/upper.glb --extra _src/castle/bay.glb --out _src/castle/upper_lm.png
# (bay and door take --extra _src/castle/upper.glb: the clerestory and vault over them)
# Step 3: the module is baked between two real neighbours (bay.glb turned one bay either way), so
# the occlusion and the torch light across the bay edges (each module carries only its right
# column and torch) read as they do in the ring. Door leaves are left out of the bake.
# R = ambient occlusion (1.5 m), G = irradiance from the bay's two torches / 4 (so 1.0 in the
# texture is 4x the candle-formula unit used by LIGHTING in src/materials.js). The floor is a
# plain proxy; --extra modules (the storey above or below) are stood in at this bay and both
# neighbours, so the occlusion reads right where the modules meet. Glass and door leaves are left out.
import bpy, sys, math, argparse, time
import numpy as np
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument('--in', dest='inp', default='_src/castle/bay.glb')
ap.add_argument('--nb', default='_src/castle/bay.glb')
ap.add_argument('--out', default='_src/castle/bay_lm.png')
ap.add_argument('--extra', action='append', default=[])
ap.add_argument('--size', type=int, default=1024)
ap.add_argument('--samples', type=int, default=256)
ap.add_argument('--tsamples', type=int, default=512)
args = ap.parse_args(argv)
R = 12.0; BAY = 2*math.pi/20; FLAME_R, FLAME_Y = R - 0.34, 2.80
t0 = time.time()

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e: print('BAKE no GPU:', e)
sc.cycles.use_denoising = False
sc.render.bake.margin = 6; sc.render.bake.margin_type = 'EXTEND'

bpy.ops.import_scene.gltf(filepath=args.inp)
for o in [o for o in bpy.context.scene.objects if o.type == 'MESH' and (o.name.startswith('leaf') or o.name.startswith('glass'))]: bpy.data.objects.remove(o, do_unlink=True)
bay = [o for o in bpy.context.scene.objects if o.type == 'MESH'][0]
me = bay.data
print('BAKE uv layers', [u.name for u in me.uv_layers])
me.uv_layers.active = me.uv_layers[1]

def t2b(x, y, z): return Vector((x, -(z + R), y))     # three world -> blender bay frame
def cylw(th, y, r): return t2b(r*math.sin(th), y, -r*math.cos(th))

grey = bpy.data.materials.new('grey'); grey.use_nodes = True
bs = grey.node_tree.nodes['Principled BSDF']; bs.inputs['Base Color'].default_value = (0.42, 0.36, 0.28, 1); bs.inputs['Roughness'].default_value = 1.0

def sheet(name, fn, nu, nv):
    vs, fs = [], []
    for j in range(nv + 1):
        for i in range(nu + 1): vs.append(fn(i/nu, j/nv))
    for j in range(nv):
        for i in range(nu): a = j*(nu + 1) + i; fs.append((a, a + 1, a + nu + 2, a + nu + 1))
    m = bpy.data.meshes.new(name); m.from_pydata(vs, [], fs); m.materials.append(grey)
    o = bpy.data.objects.new(name, m); sc.collection.objects.link(o); return o
# floor, the neighbouring old walls, the frieze band and the cornice soffit over it
sheet('floor', lambda u, v: t2b(-8 + 16*u, 0.0, -14 + 10*v), 4, 4)
# the two neighbouring modules, turned about the drum axis (blender (0, -R)); +s is -z rotation
from mathutils import Matrix
for path, sx in [(args.nb, -1), (args.nb, 1)] + [(e, k) for e in args.extra for k in (-1, 0, 1)]:
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    rot = Matrix.Translation((0, -R, 0)) @ Matrix.Rotation(-sx*BAY, 4, 'Z') @ Matrix.Translation((0, R, 0))
    for o in set(bpy.data.objects) - before:
        if o.parent is None: o.matrix_world = rot @ o.matrix_world
        if o.type == 'MESH':
            if o.name.startswith('glass') or o.name.startswith('leaf'): bpy.data.objects.remove(o, do_unlink=True); continue
            o.data.materials.clear(); o.data.materials.append(grey)

img = bpy.data.images.new('lm_bake', args.size, args.size, float_buffer=True, alpha=False)
img.colorspace_settings.name = 'Non-Color'
for slot in bay.material_slots:
    m = slot.material; m.use_nodes = True; nt = m.node_tree
    for n in list(nt.nodes):
        if n.type == 'BSDF_PRINCIPLED': n.inputs['Base Color'].default_value = (0.42, 0.36, 0.28, 1); n.inputs['Roughness'].default_value = 1.0; n.inputs['Metallic'].default_value = 0.0
        if n.type == 'TEX_IMAGE': nt.nodes.remove(n)
    tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = img; nt.nodes.active = tn
bpy.ops.object.select_all(action='DESELECT'); bay.select_set(True); bpy.context.view_layer.objects.active = bay

world = bpy.data.worlds.new('w'); sc.world = world; world.use_nodes = True
bg = world.node_tree.nodes['Background']; bg.inputs['Strength'].default_value = 1.0; bg.inputs['Color'].default_value = (1, 1, 1, 1)
world.light_settings.distance = 1.5

def read():
    a = np.empty(args.size*args.size*4, dtype=np.float32); img.pixels.foreach_get(a); return a.reshape(args.size, args.size, 4)

# ---- ambient occlusion
sc.cycles.samples = args.samples
bpy.ops.object.bake(type='AO', margin=6)
ao = read()[..., 0].copy()
print(f'BAKE ao done {time.time() - t0:.1f}s mean={ao.mean():.3f}')

# ---- torches: direct + one-bounce diffuse light, world off
bg.inputs['Strength'].default_value = 0.0
lights = []
for sx in (-1, 1):
    ld = bpy.data.lights.new(f't{sx}', 'POINT'); ld.energy = 100.0; ld.shadow_soft_size = 0.035
    lo = bpy.data.objects.new(f't{sx}', ld); sc.collection.objects.link(lo); lo.location = cylw(sx*BAY/2, FLAME_Y + 0.02, FLAME_R); lights.append(lo)
sc.cycles.samples = args.tsamples
sc.render.bake.use_pass_direct = True; sc.render.bake.use_pass_indirect = True; sc.render.bake.use_pass_color = False
bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT', 'INDIRECT'}, margin=6)
tl = read()[..., 0].copy()
print(f'BAKE torch done {time.time() - t0:.1f}s max={tl.max():.3f}')

# ---- calibrate: what the same light gives a surface 1 m away, square on
for o in [o for o in sc.objects if o.type == 'MESH']: o.hide_render = True
for lo in lights: lo.hide_render = True
cal = sheet('cal', lambda u, v: Vector((200 + u - 0.5, 0.0, v - 0.5)), 1, 1)
cal.hide_render = False
cal.data.uv_layers.new(name='uv')
cm = bpy.data.materials.new('cal'); cm.use_nodes = True; cal.data.materials.clear(); cal.data.materials.append(cm)
cimg = bpy.data.images.new('cal', 16, 16, float_buffer=True, alpha=False); cimg.colorspace_settings.name = 'Non-Color'
tn = cm.node_tree.nodes.new('ShaderNodeTexImage'); tn.image = cimg; cm.node_tree.nodes.active = tn
ld = bpy.data.lights.new('cl', 'POINT'); ld.energy = 100.0; ld.shadow_soft_size = 0.001
lo = bpy.data.objects.new('cl', ld); sc.collection.objects.link(lo); lo.location = Vector((200, -1.0, 0.0))
if cal.data.polygons[0].normal.y > 0: lo.location.y = 1.0
bpy.ops.object.select_all(action='DESELECT'); cal.select_set(True); bpy.context.view_layer.objects.active = cal
sc.cycles.samples = 64
bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT'}, margin=0)
ca = np.empty(16*16*4, dtype=np.float32); cimg.pixels.foreach_get(ca); v1 = float(np.median(ca.reshape(16, 16, 4)[6:10, 6:10, 0]))
print(f'BAKE calibration value at 1 m: {v1:.4f}')

# physical inverse-square, scaled so 2 m reads like the old candle formula (1.55/(1 + 1.1 d^2))
K = 1.55/(1 + 1.1*4.0)*4.0
torch = tl/max(v1, 1e-6)*K
# soften the hot spot right behind the flame instead of clipping it
torch = 3.2*np.tanh(torch/3.2)
out = np.zeros((args.size, args.size, 4), dtype=np.float32)
out[..., 0] = np.clip(ao, 0, 1); out[..., 1] = np.clip(torch/4.0, 0, 1); out[..., 3] = 1
o = bpy.data.images.new('lm_out', args.size, args.size, float_buffer=False, alpha=False)
o.colorspace_settings.name = 'Non-Color'
o.pixels.foreach_set(out.ravel())
import os; os.makedirs(os.path.dirname(args.out) or '.', exist_ok=True)
o.filepath_raw = args.out; o.file_format = 'PNG'; o.save()
print(f'BAKE wrote {args.out} in {time.time() - t0:.1f}s; torch max {torch.max():.2f}, ao mean {ao.mean():.3f}')

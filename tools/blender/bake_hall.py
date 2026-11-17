# Step 5: bake the castle light maps with Cycles inside the whole hall (Metal GPU on the Mac).
#   blender -b --factory-startup -P tools/blender/bake_hall.py -- [--only bay,door,...] [--size 1024]
# Reads _src/castle/{bay,door,upper}.glb (castle_kit.py) and writes _src/castle/<target>_lm.npy,
# float16 RGBA, which tools/lm_png.py turns into the PNGs tools/pack_assets.sh encodes:
#   R = ambient occlusion (1.5 m), as before
#   G = irradiance from all twenty torches, direct + one bounce, /4 (1.0 = 4x the candle-formula unit
#       of LIGHTING in src/materials.js; calibrated against the same point light 1 m from a surface)
#   B = sky light through the twenty clerestory windows and the lantern, direct + bounces, under a
#       uniform white sky of radiance 1 (light portals on every opening), stored sqrt(E/SKYMAX)
#   A = curvature from Cycles pointiness (0.5 flat, above convex), for the wear in step 6
# Unlike bake_bay.py (one module between proxies) the targets sit in the real ring: 19 bays, the
# door bay (leaves shut), 20 upper modules and the floor, so the occlusion, the torch light from
# across the hall and the light through the windows are all the hall's own. Targets:
#   bay (bay 0, the generic exhibition bay), bay9 and bay11 (either side of the door), door (bay 10),
#   upper (the clerestory / vault module over bay 0), floor (two polar wedges: the generic bay and the
#   door bay; u = 0.5*(local angle/BAY + 0.5) (+0.5 for the door wedge), v = r/FLOOR_R in Blender).
import bpy, sys, math, argparse, time, os
import numpy as np
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument('--src', default='_src/castle')
ap.add_argument('--only', default='bay,bay9,bay11,door,upper,floor')
ap.add_argument('--size', type=int, default=1024)
ap.add_argument('--ao', type=int, default=256)
ap.add_argument('--torch', type=int, default=512)
ap.add_argument('--sky', type=int, default=768)
args = ap.parse_args(argv)
R = 12.0; NB = 20; BAY = 2*math.pi/NB; DOOR = 10; FLAME_R, FLAME_Y = R - 0.34, 2.82; FLOOR_R = R + 0.7
SKYMAX = 0.25
t0 = time.time()
def log(*a): print(f'BAKE {time.time() - t0:7.1f}s', *a, flush=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e: log('no GPU:', e)
sc.cycles.use_denoising = False
sc.cycles.max_bounces = 4; sc.cycles.diffuse_bounces = 3
sc.render.bake.margin = 6; sc.render.bake.margin_type = 'EXTEND'

grey = (0.42, 0.36, 0.28, 1); lime = (0.66, 0.60, 0.50, 1)
def mat_setup(m):
    m.use_nodes = True; nt = m.node_tree
    for n in list(nt.nodes):
        if n.type == 'TEX_IMAGE': nt.nodes.remove(n)
    for n in nt.nodes:
        if n.type == 'BSDF_PRINCIPLED':
            n.inputs['Base Color'].default_value = lime if m.name.startswith('lime') else grey
            n.inputs['Roughness'].default_value = 1.0; n.inputs['Metallic'].default_value = 0.0
            for k in ('Specular IOR Level', 'Specular'):
                if k in n.inputs: n.inputs[k].default_value = 0.0
    tn = nt.nodes.new('ShaderNodeTexImage'); tn.name = 'lm'; nt.nodes.active = tn
    return tn

def load(path):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    new = [o for o in bpy.data.objects if o not in before]
    meshes = []
    for o in new:
        if o.type == 'MESH':
            mw = o.matrix_world.copy(); o.parent = None; o.matrix_world = mw; meshes.append(o)
    for o in new:
        if o.type != 'MESH': bpy.data.objects.remove(o, do_unlink=True)
    return meshes

def bay_matrix(k): return Matrix.Rotation(-k*BAY, 4, 'Z') @ Matrix.Translation((0, R, 0))
def place(objs, k):
    out = []
    for o in objs:
        c = o.copy(); sc.collection.objects.link(c); c.matrix_world = bay_matrix(k) @ o.matrix_world; out.append(c)
    return out

mods = {m: load(os.path.join(args.src, m + '.glb')) for m in ('bay', 'door', 'upper')}
for ms in mods.values():
    for o in ms:
        for s in o.material_slots:
            if s.material and 'lm' not in s.material.node_tree.nodes if s.material and s.material.use_nodes else True: pass
mats = set()
for ms in mods.values():
    for o in ms:
        for s in o.material_slots:
            if s.material: mats.add(s.material)
for m in mats: mat_setup(m)
main = {m: [o for o in ms if not (o.name.startswith('leaf') or o.name.startswith('glass'))][0] for m, ms in mods.items()}
log('modules', {m: (o.name, len(o.data.polygons), [u.name for u in o.data.uv_layers]) for m, o in main.items()})

hall = {}   # (module, k) -> main object copy
portals = []
for k in range(NB):
    m = 'door' if k == DOOR else 'bay'
    cs = place(mods[m], k)
    for c, o in zip(cs, mods[m]):
        if o is main[m]: hall[(m, k)] = c
    cs = place(mods['upper'], k)
    for c, o in zip(cs, mods['upper']):
        if o is main['upper']: hall[('upper', k)] = c
        elif o.name.startswith('glass'):
            # a light portal just outside the pane, facing into the hall, then the pane goes (open window)
            P = np.array([c.matrix_world @ v.co for v in c.data.vertices])
            ctr = Vector(P.mean(0)); out = Vector((ctr.x, ctr.y, 0)).normalized()
            tan = Vector((0, 0, 1)).cross(out)
            w = float((P @ np.array(tan)).max() - (P @ np.array(tan)).min()); h = float(P[:, 2].max() - P[:, 2].min())
            ld = bpy.data.lights.new(f'portal{k}', 'AREA'); ld.shape = 'RECTANGLE'; ld.size = w + 0.08; ld.size_y = h + 0.08
            try: ld.cycles.is_portal = True
            except Exception: ld.is_portal = True
            lo = bpy.data.objects.new(f'portal{k}', ld); sc.collection.objects.link(lo)
            lo.matrix_world = Matrix.Translation(ctr + out*0.05) @ Matrix((tan, Vector((0, 0, 1)), out)).transposed().to_4x4()
            portals.append(lo)
            bpy.data.objects.remove(c, do_unlink=True)
for ms in mods.values():
    for o in ms: bpy.data.objects.remove(o, do_unlink=True)
ld = bpy.data.lights.new('portalL', 'AREA'); ld.shape = 'SQUARE'; ld.size = 3.0
try: ld.cycles.is_portal = True
except Exception: ld.is_portal = True
lo = bpy.data.objects.new('portalL', ld); sc.collection.objects.link(lo); lo.location = (0, 0, 13.66); portals.append(lo)   # local -Z (down) into the hall
log('hall placed', len(hall), 'portals', len(portals), 'glass w,h', round(w, 3), round(h, 3))

# the floor: twenty wedges; 0 and the door wedge are the bake target (polar uv), the rest occlude
def wedges(ks, nth, nr, uv):
    vs, fs, uvs = [], [], []
    for k in ks:
        base = len(vs)
        for j in range(nr + 1):
            r = FLOOR_R*(j/nr)**1.0
            for i in range(nth + 1):
                a = (i/nth - 0.5)*BAY; th = k*BAY + a
                vs.append((r*math.sin(th), r*math.cos(th), 0.0))
                uvs.append((0.5*(i/nth) + (0.5 if k == DOOR else 0.0), j/nr))
        for j in range(nr):
            for i in range(nth):
                a = base + j*(nth + 1) + i; fs.append((a, a + 1, a + nth + 2, a + nth + 1))
    me = bpy.data.meshes.new('floor'); me.from_pydata(vs, [], fs)
    if uv:
        ul = me.uv_layers.new(name='uv')
        for p in me.polygons:
            for li in p.loop_indices: ul.data[li].uv = uvs[me.loops[li].vertex_index]
    for p in me.polygons: p.use_smooth = False
    me.update()
    if any(p.normal.z < 0 for p in me.polygons[:1]): me.flip_normals()
    fm = bpy.data.materials.new('floor'); fm.use_nodes = True; me.materials.append(fm)
    o = bpy.data.objects.new('floor', me); sc.collection.objects.link(o); return o, fm
floor_t, fmat = wedges([0, DOOR], 32, 192, True); mat_setup(fmat)
floor_o, fo = wedges([k for k in range(NB) if k not in (0, DOOR)], 8, 24, False); mat_setup(fo)

torches = []
for k in range(NB):
    th = (k + 0.5)*BAY
    l = bpy.data.lights.new(f'torch{k}', 'POINT'); l.energy = 100.0; l.shadow_soft_size = 0.035
    o = bpy.data.objects.new(f'torch{k}', l); sc.collection.objects.link(o); o.location = (FLAME_R*math.sin(th), FLAME_R*math.cos(th), FLAME_Y); torches.append(o)

world = bpy.data.worlds.new('w'); sc.world = world; world.use_nodes = True
bg = world.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (1, 1, 1, 1)
world.light_settings.distance = 1.5

N = args.size
def new_img(name, n=N): i = bpy.data.images.new(name, n, n, float_buffer=True, alpha=False); i.colorspace_settings.name = 'Non-Color'; return i
def read(img, n=N): a = np.empty(n*n*4, dtype=np.float32); img.pixels.foreach_get(a); return a.reshape(n, n, 4)
def select(o): bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
def lights(torch_on):
    for o in torches: o.hide_render = not torch_on
def target_img(o, img):
    for s in o.material_slots: s.material.node_tree.nodes['lm'].image = img; s.material.node_tree.nodes.active = s.material.node_tree.nodes['lm']

# ---- calibration: the torch light 1 m square-on from a surface, alone (as bake_bay.py)
hidden = [o for o in sc.objects if o.type == 'MESH']
for o in hidden: o.hide_render = True
lights(False)
cm_ = bpy.data.meshes.new('cal'); cm_.from_pydata([(200 - .5, 0, -.5), (200 + .5, 0, -.5), (200 + .5, 0, .5), (200 - .5, 0, .5)], [], [(0, 1, 2, 3)]); cm_.uv_layers.new(name='uv')
cal = bpy.data.objects.new('cal', cm_); sc.collection.objects.link(cal)
cmat = bpy.data.materials.new('cal'); cm_.materials.append(cmat); mat_setup(cmat)
cimg = new_img('cal', 16); cmat.node_tree.nodes['lm'].image = cimg
l = bpy.data.lights.new('cl', 'POINT'); l.energy = 100.0; l.shadow_soft_size = 0.001
clo = bpy.data.objects.new('cl', l); sc.collection.objects.link(clo); clo.location = (200, -1.0 if cm_.polygons[0].normal.y < 0 else 1.0, 0)
bg.inputs['Strength'].default_value = 0.0
for p in portals: p.hide_render = True
select(cal); sc.cycles.samples = 64
bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT'}, margin=0)
v1 = float(np.median(read(cimg, 16)[6:10, 6:10, 0])); log(f'calibration at 1 m: {v1:.4f}')
bpy.data.objects.remove(cal, do_unlink=True); bpy.data.objects.remove(clo, do_unlink=True)
for o in hidden: o.hide_render = False
for p in portals: p.hide_render = False
K = 1.55/(1 + 1.1*4.0)*4.0   # 2 m from a torch reads like the old candle formula

TG = {'bay': hall[('bay', 0)], 'bay9': hall[('bay', 9)], 'bay11': hall[('bay', 11)], 'door': hall[('door', DOOR)], 'upper': hall[('upper', 0)], 'floor': floor_t}
for name in args.only.split(','):
    o = TG[name]
    if name != 'floor': o.data.uv_layers.active = o.data.uv_layers[1]
    img = new_img('lm_' + name); target_img(o, img); select(o)
    # AO
    bg.inputs['Strength'].default_value = 1.0; lights(False); sc.cycles.samples = args.ao
    bpy.ops.object.bake(type='AO', margin=6); ao = read(img)[..., 0].copy()
    # torches
    bg.inputs['Strength'].default_value = 0.0; lights(True); sc.cycles.samples = args.torch
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT', 'INDIRECT'}, margin=6); tl = read(img)[..., 0].copy()
    # sky through the windows and the lantern
    bg.inputs['Strength'].default_value = 1.0; lights(False); sc.cycles.samples = args.sky
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT', 'INDIRECT'}, margin=6); sky = read(img)[..., 0].copy()
    # curvature on a welded copy (pointiness needs connected faces)
    curv = np.full((N, N), 0.5, dtype=np.float32)
    if name != 'floor':
        d = o.copy(); d.data = o.data.copy(); sc.collection.objects.link(d)
        import bmesh
        bm = bmesh.new(); bm.from_mesh(d.data); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4); bm.to_mesh(d.data); bm.free()
        em = bpy.data.materials.new('curv'); em.use_nodes = True; nt = em.node_tree
        for n in list(nt.nodes): nt.nodes.remove(n)
        geo = nt.nodes.new('ShaderNodeNewGeometry'); mr = nt.nodes.new('ShaderNodeMapRange'); emi = nt.nodes.new('ShaderNodeEmission'); outn = nt.nodes.new('ShaderNodeOutputMaterial')
        mr.inputs['From Min'].default_value = 0.35; mr.inputs['From Max'].default_value = 0.65
        nt.links.new(geo.outputs['Pointiness'], mr.inputs['Value']); nt.links.new(mr.outputs['Result'], emi.inputs['Color']); nt.links.new(emi.outputs['Emission'], outn.inputs['Surface'])
        tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = img; nt.nodes.active = tn
        d.data.materials.clear(); d.data.materials.append(em); d.data.uv_layers.active = d.data.uv_layers[1]
        o.hide_render = True; select(d); sc.cycles.samples = 4
        bpy.ops.object.bake(type='EMIT', margin=6); curv = read(img)[..., 0].copy()
        bpy.data.objects.remove(d, do_unlink=True); o.hide_render = False
    torch = tl/max(v1, 1e-6)*K; torch = 3.2*np.tanh(torch/3.2)
    out = np.stack([np.clip(ao, 0, 1), np.clip(torch/4, 0, 1), np.sqrt(np.clip(sky/SKYMAX, 0, 1)), np.clip(curv, 0, 1)], -1)
    np.save(os.path.join(args.src, name + '_lm.npy'), out.astype(np.float16))
    q = lambda a: ' '.join(f'{x:.3f}' for x in np.percentile(a, [5, 50, 95, 99.5]))
    log(f'{name}: ao mean {ao.mean():.3f} | torch p5/50/95/99.5 {q(torch)} | sky {q(sky)} | curv {q(curv)}')
log('done')

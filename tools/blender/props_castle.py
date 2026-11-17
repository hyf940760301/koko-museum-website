# Koko museum - the castle hall's furniture (step 8), built parametrically.
#   blender -b --factory-startup -P tools/blender/props_castle.py -- --out _src/castle/props.glb
# Objects (each in its own frame, three.js axes: y up; castle.js places the copies):
#   chandelier  the iron corona over the middle of the hall: a hoop 4.4 m across at 6.4 m with a rolled
#               rim, a crown of trefoil cresting, 20 drip pans with wax candles, three chains up to the
#               oak ring of the lantern (r 1.6 at 12.2 m). Origin at the hall's centre on the floor.
#   bench       an oak trestle bench, 2.4 x 0.45 x 0.45, wedged stretcher, velvet cushion. Origin on the
#               floor under its middle, long side along x, the sitter faces +z.
#   post        a brass stanchion 0.95 m high for the velvet rope (the rope is a catenary in castle.js).
# Materials by name: iron, wax, oak, velvet, brass. uv in metres / tile (castle.js clones the textures
# with repeat 1): oak and iron one tile per 1.2 m / 0.5 m, grain of the oak along the longest side.
import bpy, bmesh, math, sys, argparse
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ap = argparse.ArgumentParser(); ap.add_argument('--out', default='_src/castle/props.glb'); args = ap.parse_args(argv)
bpy.ops.wm.read_factory_settings(use_empty=True)
MATS = ['iron', 'wax', 'oak', 'velvet', 'brass']
TILE = {'iron': 0.5, 'wax': 0.3, 'oak': 1.2, 'velvet': 0.4, 'brass': 0.3}
B = lambda x, y, z: Vector((x, -z, y))           # three (x, y, z) -> blender

class Mesh:
    def __init__(self): self.bm = bmesh.new(); self.uvl = self.bm.loops.layers.uv.new('UVMap')
    def face(self, vs, mat):
        f = self.bm.faces.new(vs); f.material_index = MATS.index(mat); return f
    def box(self, c, size, mat, rot=None):
        """axis box, centre c and size (three axes); rot: Matrix (3x3, three axes)"""
        hx, hy, hz = size[0]/2, size[1]/2, size[2]/2; R = rot or Matrix.Identity(3)
        P = [Vector(c) + R @ Vector((sx*hx, sy*hy, sz*hz)) for sx in (-1, 1) for sy in (-1, 1) for sz in (-1, 1)]
        V = [self.bm.verts.new(B(*p)) for p in P]
        for q in ((0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)):
            self.face([V[i] for i in q], mat)
    def lathe(self, prof, mat, seg=16, c=(0, 0, 0), axis=None, cap=True):
        """profile [(r, y)] turned round the local y axis; axis: Matrix 3x3 orienting local -> three"""
        R = axis or Matrix.Identity(3); C = Vector(c); rings = []
        for r, y in prof:
            rings.append([self.bm.verts.new(B(*(C + R @ Vector((r*math.cos(2*math.pi*k/seg), y, r*math.sin(2*math.pi*k/seg)))))) for k in range(seg)])
        for i in range(len(rings) - 1):
            for k in range(seg):
                a, b = rings[i][k], rings[i][(k + 1) % seg]; cc, d = rings[i + 1][(k + 1) % seg], rings[i + 1][k]
                if (a.co - d.co).length < 1e-6: self.face([a, b, cc], mat) if (b.co - cc.co).length > 1e-6 else None
                else: self.face([a, b, cc, d], mat)
        if cap:
            for rg in (rings[0], rings[-1]):
                if (rg[0].co - rg[1].co).length > 1e-6: self.face(rg, mat)
    def torus(self, c, R0, r, mat, seg=24, sseg=6, rot=None):
        M = rot or Matrix.Identity(3); C = Vector(c); rings = []
        for i in range(seg):
            a = 2*math.pi*i/seg; d = Vector((math.cos(a), 0, math.sin(a)))
            rings.append([self.bm.verts.new(B(*(C + M @ (d*(R0 + r*math.cos(2*math.pi*k/sseg)) + Vector((0, r*math.sin(2*math.pi*k/sseg), 0)))))) for k in range(sseg)])
        for i in range(seg):
            for k in range(sseg):
                self.face([rings[i][k], rings[(i + 1) % seg][k], rings[(i + 1) % seg][(k + 1) % sseg], rings[i][(k + 1) % sseg]], mat)
    def finish(self, name, bevel=0.0):
        bm = self.bm; bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
        ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
        for n in MATS:
            m = bpy.data.materials.get(n) or bpy.data.materials.new(n); me.materials.append(m)
        bpy.context.view_layer.objects.active = ob
        if bevel > 0:
            bv = ob.modifiers.new('bevel', 'BEVEL'); bv.width = bevel; bv.segments = 2; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(30)
        wn = ob.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True
        for m in list(ob.modifiers):
            with bpy.context.temp_override(object=ob, active_object=ob): bpy.ops.object.modifier_apply(modifier=m.name)
        # box uv in metres per material tile, after the bevel; the grain (u) along the longest axis of the object
        me = ob.data; uvl = me.uv_layers.new(name='UVMap') if not me.uv_layers else me.uv_layers[0]
        dims = ob.dimensions; long_ax = max(range(3), key=lambda i: dims[i])
        for p in me.polygons:
            n = p.normal; ax = max(range(3), key=lambda i: abs(n[i])); t = TILE[MATS[p.material_index]]
            others = [i for i in range(3) if i != ax]
            if long_ax in others: others = [long_ax] + [i for i in others if i != long_ax]
            for li in p.loop_indices:
                co = me.vertices[me.loops[li].vertex_index].co
                uvl.data[li].uv = (co[others[0]]/t, co[others[1]]/t)
        tris = sum(len(p.vertices) - 2 for p in me.polygons); print(f'PROPS {name} tris={tris}')
        return ob

def rotY(a): return Matrix.Rotation(a, 3, 'Y')
def rotZ(a): return Matrix.Rotation(a, 3, 'Z')
def rotX(a): return Matrix.Rotation(a, 3, 'X')

# ------------------------------------------------------------------ the corona
ch = Mesh(); RC, YC = 2.2, 6.4
# the hoop: a band 0.16 tall, 0.025 thick, rolled rims top and bottom (lathe of a closed section)
band = [(RC - 0.013, -0.08), (RC + 0.013, -0.08), (RC + 0.013, 0.08), (RC - 0.013, 0.08), (RC - 0.013, -0.08)]
ch.lathe(band, 'iron', seg=96, c=(0, YC, 0), cap=False)
for y in (-0.085, 0.085): ch.torus((0, YC + y, 0), RC, 0.022, 'iron', seg=96, sseg=6)
# pierced look: square bosses round the band, and a cresting of 40 trefoils standing on the top rim
for i in range(40):
    a = 2*math.pi*i/40; d = Vector((math.sin(a), 0, -math.cos(a))); R = rotY(-a)
    ch.box(Vector((0, YC, 0)) + d*(RC + 0.02), (0.05, 0.05, 0.02), 'iron', R)
    base = Vector((0, YC + 0.11, 0)) + d*RC
    ch.box(base + Vector((0, 0.06, 0)), (0.016, 0.12, 0.012), 'iron', R)
    for k, (ox, oy) in enumerate(((0, 0.14), (-0.03, 0.11), (0.03, 0.11))):
        p = base + Vector((0, oy, 0)) + (R @ Vector((ox, 0, 0)))
        ch.lathe([(0, -0.02), (0.018, -0.008), (0.018, 0.008), (0, 0.02)], 'iron', seg=6, c=p, axis=R @ rotX(math.pi/2), cap=False)
# 20 drip pans on brackets outside the hoop, a socket and a candle on each
CANDLES = []
for i in range(20):
    a = 2*math.pi*(i + 0.5)/20; d = Vector((math.sin(a), 0, -math.cos(a))); R = rotY(-a)
    pc = Vector((0, YC + 0.10, 0)) + d*(RC + 0.13)
    ch.box(Vector((0, YC + 0.05, 0)) + d*(RC + 0.07), (0.018, 0.018, 0.14), 'iron', R)
    ch.lathe([(0.0, -0.012), (0.075, -0.004), (0.085, 0.012), (0.078, 0.014), (0.068, 0.0), (0.0, 0.0)], 'iron', seg=16, c=pc, cap=False)
    ch.lathe([(0.025, 0.0), (0.025, 0.05), (0.03, 0.055)], 'iron', seg=12, c=pc, cap=False)
    h = 0.24 + 0.08*((i*7) % 5)/4    # burnt to different lengths
    ch.lathe([(0.0, 0.0), (0.022, 0.0), (0.022, h - 0.02), (0.018, h), (0.006, h + 0.004), (0.0, h + 0.004)], 'wax', seg=12, c=pc + Vector((0, 0.01, 0)), cap=False)
    ch.lathe([(0.0015, 0.0), (0.0015, 0.018)], 'iron', seg=4, c=pc + Vector((0, 0.014 + h, 0)), cap=True)   # wick
    CANDLES.append(tuple(pc + Vector((0, 0.01 + h + 0.05, 0))))
# three chains of oval links up to the lantern ring, each from a hanger on the hoop
for j in range(3):
    a = 2*math.pi*j/3 + math.pi/3; d0 = Vector((math.sin(a), 0, -math.cos(a)))
    p0 = Vector((0, YC + 0.2, 0)) + d0*RC; p1 = Vector((0, 12.15, 0)) + d0*1.62
    ch.box(Vector((0, YC + 0.14, 0)) + d0*RC, (0.07, 0.14, 0.03), 'iron', rotY(-a))
    L = (p1 - p0).length; t = (p1 - p0).normalized(); n = int(L/0.085)
    tilt = math.atan2(math.hypot(t.x, t.z), t.y)
    for k in range(n):
        c = p0 + t*(k + 0.5)*(L/n)
        R = rotY(-a) @ rotX(tilt) @ rotY(math.pi/2*(k % 2))
        # an oval link: a torus squashed along the chain
        rings = []; seg, sseg = 8, 4
        for s in range(seg):
            u = 2*math.pi*s/seg; ctr = Vector((0.022*math.cos(u), 0.048*math.sin(u), 0))
            nrm = Vector((math.cos(u)*0.048, math.sin(u)*0.022, 0)).normalized()
            rings.append([ch.bm.verts.new(B(*(c + R @ (ctr + nrm*0.007*math.cos(2*math.pi*q/sseg) + Vector((0, 0, 0.007*math.sin(2*math.pi*q/sseg))))))) for q in range(sseg)])
        for s in range(seg):
            for q in range(sseg): ch.face([rings[s][q], rings[(s + 1) % seg][q], rings[(s + 1) % seg][(q + 1) % sseg], rings[s][(q + 1) % sseg]], 'iron')
chand = ch.finish('chandelier')
chand['candles'] = [list(p) for p in CANDLES]

# ------------------------------------------------------------------ the bench
bn = Mesh(); L2, H = 1.2, 0.45
bn.box((0, H - 0.035, 0), (2.4, 0.07, 0.42), 'oak')                       # the seat
for sx in (-1, 1):
    x = sx*0.92
    # trestle leg: a slab 0.06 thick, splayed foot, with an arch cut (as two posts and a lintel)
    bn.box((x, H - 0.085, 0), (0.07, 0.03, 0.38), 'oak')                  # cleat under the seat
    for sz in (-1, 1): bn.box((x, 0.19, sz*0.13), (0.06, 0.32, 0.09), 'oak', rotX(-sz*0.10))
    bn.box((x, 0.03, 0), (0.08, 0.06, 0.44), 'oak')                       # foot
    bn.box((x, 0.30, 0), (0.06, 0.07, 0.36), 'oak')                       # lintel over the arch
    bn.box((x + sx*0.07, 0.18, 0), (0.06, 0.04, 0.035), 'oak')           # wedge through the tenon
bn.box((0, 0.18, 0), (2.0, 0.07, 0.05), 'oak')                            # the stretcher
bn.box((0, H + 0.025, 0), (2.24, 0.05, 0.36), 'velvet')                   # the cushion
bench = bn.finish('bench', bevel=0.008)

# ------------------------------------------------------------------ the stanchion
po = Mesh()
po.lathe([(0, 0), (0.15, 0), (0.15, 0.012), (0.13, 0.03), (0.06, 0.06), (0.032, 0.085), (0.024, 0.11), (0.022, 0.80),
          (0.032, 0.82), (0.024, 0.84), (0.022, 0.88), (0.04, 0.91), (0.045, 0.935), (0.035, 0.96), (0.012, 0.975), (0, 0.98)], 'brass', seg=20, cap=False)
po.torus((0, 0.86, 0), 0.034, 0.006, 'brass', seg=16, sseg=6, rot=rotX(math.pi/2) @ rotZ(0))
post = po.finish('post')

bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=args.out, export_format='GLB', use_selection=True, export_apply=True, export_texcoords=True, export_normals=True,
                          export_materials='EXPORT', export_yup=True, export_image_format='NONE', export_extras=True)
print('PROPS wrote', args.out)

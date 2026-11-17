# Koko museum - the castle kit of the rotunda, built parametrically (step 3; was castle_bay.py).
#   blender -b --factory-startup -P tools/blender/castle_kit.py -- --module bay  --out _src/castle/bay.glb
#   blender -b --factory-startup -P tools/blender/castle_kit.py -- --module door --out _src/castle/door.glb
# module bay:  one exhibition bay (19 of them round the hall): ashlar wall, niche with voussoir arch,
#              oak shelf, roundel frame, plinth, string course, the ashlar band up to the cornice,
#              and ONE engaged column with its torch on the bay's right edge (+s), so the ring of
#              modules gives exactly 20 columns.
# module door: bay 10, the way to the studiolo: a 2.0 x 3.2 doorway through the 0.9 m wall with
#              quoined jambs, a lintel under a round-headed tympanum and its voussoir ring, a stone
#              passage 1.5 m deep, and the two oak leaves (planks, iron straps) as separate objects
#              leafL / leafR in the hinge frame of rotunda.js buildDoorLeaves.
# Everything is modelled in the bay's own frame (three.js bayMatrix: x along the wall, y up,
# z into the room, wall face at z = 0 for s = 0). Parts are laid out "unrolled" in (s, y, d):
# s = arc length along the wall, y = height, d = depth behind the wall face (negative = into
# the room), then bent onto the drum of radius R, so every joint follows the real curve.
# The numbers are the K constants of src/rotunda.js; nothing here may move a pick target.
import bpy, bmesh, math, random, sys, argparse
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument('--bay', type=int, default=0)
ap.add_argument('--module', default='bay', choices=['bay', 'door'])
ap.add_argument('--out', default='')
ap.add_argument('--blend', default='')
args = ap.parse_args(argv)
MODULE = args.module
if not args.out: args.out = f'_src/castle/{MODULE}.glb'
SIDES = (1,)                     # columns per module: the right one only (the left is the neighbour's)

R = 12.0; NB = 20; BAY = 2*math.pi/NB; A = 1.5; Y_SILL = 1.0; Y_SPRING = 2.5; DEPTH = 0.55
HW = R*BAY/2                     # 1.885: half the wall of one bay
TILE = 2.25                      # one texture repeat of the ashlar, metres
RING_IN, RING_OUT = A, A + 0.30  # voussoir ring
PROJ = 0.04                      # how far the ring stands proud of the wall
COL_R = 0.16                     # engaged column
FLAME_R, FLAME_Y = R - 0.34, 2.80  # air.js candle points, kept
BEVEL = 0.012
rng = random.Random(1000 + args.bay + (500 if MODULE == 'door' else 0))
DW, DH = 1.0, 3.2                 # doorway half width and height (K.dw, K.dh)
D_RING_IN, D_RING_OUT = DW, DW + 0.30
PASSAGE = 1.5                     # depth of the passage behind the wall face (as rotunda.js)

bpy.ops.wm.read_factory_settings(use_empty=True)

# ------------------------------------------------------------------ coordinates
def bend(s, y, d):
    """unrolled (s, y, d) -> blender coords of the bay frame"""
    th = s/R; r = R + d
    X, Z = r*math.sin(th), -r*math.cos(th) + R    # three bay-local
    return Vector((X, -Z, y))

def from_local3(p):
    """three bay-local (x, y, z) -> blender"""
    return Vector((p[0], -p[2], p[1]))

MATS = ['stone', 'render', 'oak', 'iron', 'pitch']

class Part:
    """vertices are kept unrolled until the end, with uvs per loop"""
    def __init__(self, open_sheet=False):
        self.v = []; self.f = []; self.g = 0; self.key = {}; self.open = open_sheet  # f: (indices, mat, uvs)
    def group(self): self.g += 1
    def vert(self, p):
        k = (self.g, round(p[0], 6), round(p[1], 6), round(p[2], 6))
        if k not in self.key: self.v.append(tuple(p)); self.key[k] = len(self.v) - 1
        return self.key[k]
    def face(self, idx, mat, uvs):
        self.f.append((list(idx), MATS.index(mat), [tuple(u) for u in uvs]))

def uv_plane(p, axis, off):
    s, y, d = p
    if axis == 'd': return ((s + off[0])/TILE, (y + off[1])/TILE)
    if axis == 'y': return ((s + off[0])/TILE, (d + off[1])/TILE)
    return ((d + off[0])/TILE, (y + off[1])/TILE)

def quad(part, pts, mat, axis, off=(0, 0)):
    ids = [part.vert(p) for p in pts]
    part.face(ids, mat, [uv_plane(p, axis, off) for p in pts])

def prism(part, poly, d0, d1, mat, off=(0, 0), nsub=1, caps=True, swap=False):
    """extrude a convex (s, y) polygon (counter-clockwise seen from the room) from d0 (front) to d1;
    swap turns the texture a quarter on the front and back (oak grain up a vertical plank)"""
    sw = (lambda t: (t[1], t[0])) if swap else (lambda t: t)
    part.group(); n = len(poly)
    # front face, subdivided as a fan of strips for the bend
    front = [(s, y, d0) for (s, y) in poly]; back = [(s, y, d1) for (s, y) in poly]
    if caps:
        ids = [part.vert(p) for p in front]
        part.face(ids, mat, [sw(uv_plane(p, 'd', off)) for p in front])
        ids = [part.vert(p) for p in reversed(back)]
        part.face(ids, mat, [sw(uv_plane(p, 'd', off)) for p in reversed(back)])
    acc = 0.0
    for i in range(n):
        a, b = poly[i], poly[(i + 1) % n]
        L = math.dist(a, b)
        for k in range(nsub):
            t0, t1 = k/nsub, (k + 1)/nsub
            pa = (a[0] + (b[0] - a[0])*t0, a[1] + (b[1] - a[1])*t0)
            pb = (a[0] + (b[0] - a[0])*t1, a[1] + (b[1] - a[1])*t1)
            pts = [(pa[0], pa[1], d0), (pa[0], pa[1], d1), (pb[0], pb[1], d1), (pb[0], pb[1], d0)]
            u0 = (acc + L*t0 + off[0])/TILE; u1 = (acc + L*t1 + off[0])/TILE
            uvs = [(u0, (d0 + off[1])/TILE), (u0, (d1 + off[1])/TILE), (u1, (d1 + off[1])/TILE), (u1, (d0 + off[1])/TILE)]
            ids = [part.vert(p) for p in pts]; part.face(ids, mat, uvs)
        acc += L

def profile_s(part, prof, s0, s1, ns, mat, off=(0, 0), caps=True):
    """sweep a closed (y, d) outline along s (the last point joins the first, along the wall)"""
    part.group(); prof = list(prof) + [prof[0]]
    acc = [0.0]
    for i in range(1, len(prof)): acc.append(acc[-1] + math.dist(prof[i - 1], prof[i]))
    for j in range(ns):
        sa = s0 + (s1 - s0)*j/ns; sb = s0 + (s1 - s0)*(j + 1)/ns
        for i in range(len(prof) - 1):
            (ya, da), (yb, db) = prof[i], prof[i + 1]
            pts = [(sa, ya, da), (sb, ya, da), (sb, yb, db), (sa, yb, db)]
            uvs = [((sa + off[0])/TILE, (acc[i] + off[1])/TILE), ((sb + off[0])/TILE, (acc[i] + off[1])/TILE),
                   ((sb + off[0])/TILE, (acc[i + 1] + off[1])/TILE), ((sa + off[0])/TILE, (acc[i + 1] + off[1])/TILE)]
            ids = [part.vert(p) for p in pts]; part.face(ids, mat, uvs)
    if caps:
        for s, rev in ((s0, False), (s1, True)):
            pts = [(s, y, d) for (y, d) in prof[:-1]]
            if rev: pts = list(reversed(pts))
            ids = [part.vert(p) for p in pts]; part.face(ids, mat, [uv_plane(p, 's', off) for p in pts])

def build_mesh(name, part, extra=None):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new(bend(*p)) for p in part.v]
    uvl = bm.loops.layers.uv.new('UVMap')
    for idx, mat, uvs in part.f:
        try: f = bm.faces.new([vs[i] for i in idx])
        except ValueError: continue
        f.material_index = mat
        for loop, uv in zip(f.loops, uvs): loop[uvl].uv = uv
    if part.f:
        if part.open:
            # open sheets face the room: the drum axis is at blender (0, -R, y)
            bm.normal_update()   # fresh faces carry no normal until asked
            for f in bm.faces:
                c = f.calc_center_median(); out = Vector((0, -R, c.z)) - c
                if f.normal.dot(out) < 0: f.normal_flip()
        else:
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if extra: extra(bm, uvl)
    for f in bm.faces: f.smooth = True
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    for m in MATS: me.materials.append(mat_of(m))
    return ob

_mats = {}
def mat_of(n):
    if n not in _mats:
        m = bpy.data.materials.new(n); m.use_nodes = True
        col = {'stone': (0.58, 0.45, 0.30, 1), 'render': (0.26, 0.07, 0.04, 1), 'oak': (0.19, 0.09, 0.035, 1), 'iron': (0.026, 0.022, 0.02, 1), 'pitch': (0.012, 0.009, 0.007, 1)}[n]
        bsdf = m.node_tree.nodes.get('Principled BSDF'); bsdf.inputs['Base Color'].default_value = col
        bsdf.inputs['Roughness'].default_value = 0.85
        _mats[n] = m
    return _mats[n]

# ------------------------------------------------------------------ masonry (bevelled)
M = Part()
yTop = 5.60
def ring_top(s, r=RING_OUT): return Y_SPRING + math.sqrt(max(0.0, r*r - s*s))

if MODULE == 'bay':
    # 1. ashlar wall face, cut round the arch ring; 30 strips bend it onto the drum
    WALL = Part(open_sheet=True)
    knots = sorted(set([-HW, HW, -RING_OUT, RING_OUT] + [(-HW + 2*HW*i/24) for i in range(25)]))
    knots = [k for k in knots if all(abs(k - j) > 0.02 or k == j for j in (-RING_OUT, RING_OUT))]
    for sa, sb in zip(knots[:-1], knots[1:]):
        if sb <= -RING_OUT + 1e-6 or sa >= RING_OUT - 1e-6:
            quad(WALL, [(sa, 0.38, 0), (sa, yTop, 0), (sb, yTop, 0), (sb, 0.38, 0)], 'stone', 'd')
        else:
            quad(WALL, [(sa, 0.38, 0), (sa, Y_SILL, 0), (sb, Y_SILL, 0), (sb, 0.38, 0)], 'stone', 'd')
            quad(WALL, [(sa, ring_top(sa) - 0.01, 0), (sa, yTop, 0), (sb, yTop, 0), (sb, ring_top(sb) - 0.01, 0)], 'stone', 'd')
    wall = build_mesh('wall', WALL)

    # 2. chamfered plinth 0 - 0.40, standing 0.10 proud; stops at the column bases
    profile_s(M, [(0.0, 0.0), (0.0, -0.10), (0.30, -0.10), (0.40, 0.0)], -HW, HW, 20, 'stone', off=(0.37, 0.11))
    # 4. sill course under the shelf, and two corbels
    profile_s(M, [(0.80, 0.0), (0.80, -0.05), (0.86, -0.07), (0.92, -0.07), (0.92, 0.10)], -1.72, 1.72, 18, 'stone', off=(0.61, 1.7))
    for sx in (-1, 1):
        c = sx*1.15
        prism(M, [(c - 0.075, 0.70), (c + 0.075, 0.70), (c + 0.075, 0.92), (c - 0.075, 0.92)], -0.16, 0.02, 'stone', off=(rng.random()*2, rng.random()*2))

    # 5. jambs: three courses each side, through the wall to the niche back, and an impost
    courses = [(Y_SILL, 1.52), (1.52, 2.02), (2.02, Y_SPRING - 0.10)]
    for sx in (-1, 1):
        for (y0, y1) in courses:
            a, b = sorted((sx*RING_IN, sx*RING_OUT))
            prism(M, [(a, y0), (b, y0), (b, y1), (a, y1)], -PROJ, DEPTH + 0.06, 'stone', off=(rng.random()*2, rng.random()*2))
        a, b = sorted((sx*(RING_IN - 0.06), sx*(RING_OUT + 0.03)))
        # impost: a block with a chamfered underside, read as the springing of the arch
        prism(M, [(a, Y_SPRING - 0.10), (b, Y_SPRING - 0.10), (b, Y_SPRING), (a, Y_SPRING)], -PROJ - 0.05, DEPTH + 0.06, 'stone', off=(rng.random()*2, rng.random()*2))

    # 6. eighteen voussoirs and a keystone, each its own stone
    NV = 19
    for i in range(NV):
        p0, p1 = math.pi*(1 - i/NV), math.pi*(1 - (i + 1)/NV)
        key = i == NV//2
        ro = RING_OUT + (0.03 if key else 0.0)
        pts = [(RING_IN*math.cos(p0), Y_SPRING + RING_IN*math.sin(p0)), (RING_IN*math.cos(p1), Y_SPRING + RING_IN*math.sin(p1)),
               (ro*math.cos(p1), Y_SPRING + ro*math.sin(p1)), (ro*math.cos(p0), Y_SPRING + ro*math.sin(p0))]
        if key:  # the keystone widens towards the top and stands further out
            cx = 0.0; pts[2] = (pts[2][0] + 0.025, pts[2][1]); pts[3] = (pts[3][0] - 0.025, pts[3][1])
        # counter-clockwise seen from the room (-d): order the quad
        cs = sum(x for x, _ in pts)/4; cy = sum(y for _, y in pts)/4
        pts.sort(key=lambda q: math.atan2(q[1] - cy, q[0] - cs))
        prism(M, pts, -(PROJ + (0.035 if key else 0.0)), DEPTH + 0.06, 'stone', off=(rng.random()*2, rng.random()*2))

    # 7. quatrefoil stone frame for the roundel (y 4.85): a band with four lobes on the diagonals
    def frame_out(a):
        r = 0.50
        for k in range(4):
            b = math.pi/4 + k*math.pi/2; Dc, rho = 0.43, 0.17
            sd = Dc*math.sin(a - b); disc = rho*rho - sd*sd
            if disc > 0: r = max(r, Dc*math.cos(a - b) + math.sqrt(disc))
        return r
    NF = 80; r_in = 0.442; yc = 4.85
    M.group()
    for j in range(NF):
        a0, a1 = 2*math.pi*j/NF, 2*math.pi*(j + 1)/NF
        o0, o1 = frame_out(a0), frame_out(a1)
        P = lambda r, a: (r*math.cos(a), yc + r*math.sin(a))
        # front ring (two bands: a raised inner roll and the flat field) - all as faces in (s, y, d)
        i0, i1, m0, m1, e0, e1 = P(r_in, a0), P(r_in, a1), P(r_in + 0.05, a0), P(r_in + 0.05, a1), P(o0, a0), P(o1, a1)
        quad(M, [(i0[0], i0[1], -0.070), (i1[0], i1[1], -0.070), (m1[0], m1[1], -0.070), (m0[0], m0[1], -0.070)], 'stone', 'd', off=(0.3, 0.9))
        quad(M, [(m0[0], m0[1], -0.070), (m1[0], m1[1], -0.070), (m1[0], m1[1], -0.052), (m0[0], m0[1], -0.052)], 'stone', 'd', off=(0.3, 0.9))
        quad(M, [(m0[0], m0[1], -0.052), (m1[0], m1[1], -0.052), (e1[0], e1[1], -0.052), (e0[0], e0[1], -0.052)], 'stone', 'd', off=(0.3, 0.9))
        quad(M, [(e0[0], e0[1], -0.052), (e1[0], e1[1], -0.052), (e1[0], e1[1], 0.0), (e0[0], e0[1], 0.0)], 'stone', 'd', off=(0.3, 0.9))
        quad(M, [(i1[0], i1[1], -0.070), (i0[0], i0[1], -0.070), (i0[0], i0[1], 0.0), (i1[0], i1[1], 0.0)], 'stone', 'd', off=(0.3, 0.9))
        quad(M, [(e0[0], e0[1], 0.0), (e1[0], e1[1], 0.0), (i1[0], i1[1], 0.0), (i0[0], i0[1], 0.0)], 'stone', 'd', off=(0.3, 0.9))


# 3. string course 5.60 - 5.78, 0.12 proud, chamfered underneath
profile_s(M, [(5.54, 0.0), (5.62, -0.12), (5.78, -0.12), (5.78, -0.015)], -HW, HW, 20, 'stone', off=(1.13, 0.52))

# 3b. the ashlar band over the string course, up to the cornice (5.78 - 6.20), standing 0.04 in
#     front of the old frieze it hides; the clerestory windows come with the vault in step 4
BAND = Part(open_sheet=True)
for i in range(24):
    sa, sb = -HW + 2*HW*i/24, -HW + 2*HW*(i + 1)/24
    quad(BAND, [(sa, 5.70, -0.04), (sa, 6.21, -0.04), (sb, 6.21, -0.04), (sb, 5.70, -0.04)], 'stone', 'd', off=(0.0, 0.0))
band = build_mesh('band', BAND)

# ------------------------------------------------------------------ module door (bay 10)
def d_ring_top(s, r=D_RING_OUT): return DH + math.sqrt(max(0.0, r*r - s*s))
passage = None
if MODULE == 'door':
    # 1. ashlar wall face, cut round the doorway and its arch ring
    WALL = Part(open_sheet=True)
    knots = sorted(set([-HW, HW, -D_RING_OUT, D_RING_OUT] + [(-HW + 2*HW*i/24) for i in range(25)]))
    knots = [k for k in knots if all(abs(k - j) > 0.02 or k == j for j in (-D_RING_OUT, D_RING_OUT))]
    for sa, sb in zip(knots[:-1], knots[1:]):
        if sb <= -D_RING_OUT + 1e-6 or sa >= D_RING_OUT - 1e-6:
            quad(WALL, [(sa, 0.38, 0), (sa, yTop, 0), (sb, yTop, 0), (sb, 0.38, 0)], 'stone', 'd')
        else:
            quad(WALL, [(sa, d_ring_top(sa) - 0.01, 0), (sa, yTop, 0), (sb, yTop, 0), (sb, d_ring_top(sb) - 0.01, 0)], 'stone', 'd')
    wall = build_mesh('wall', WALL)
    # 2. plinth either side of the doorway, stopping at the jambs
    for s0, s1 in ((-HW, -1.45), (1.45, HW)):
        profile_s(M, [(0.0, 0.0), (0.0, -0.10), (0.30, -0.10), (0.40, 0.0)], s0, s1, 8, 'stone', off=(0.37, 0.11))
    # 3. quoined jambs through the whole wall: long and short stones by turns
    courses = [(0.0, 0.64), (0.64, 1.28), (1.28, 1.92), (1.92, 2.56), (2.56, DH)]
    for sx in (-1, 1):
        for i, (y0, y1) in enumerate(courses):
            a, b = sorted((sx*D_RING_IN, sx*(D_RING_OUT + (0.15 if i % 2 == 0 else 0.0))))
            prism(M, [(a, y0), (b, y0), (b, y1), (a, y1)], -0.04, 0.90, 'stone', off=(rng.random()*2, rng.random()*2))
    # 4. the lintel (it carries the STVDIOLO inscription, added in three) and the tympanum over it
    prism(M, [(-DW, DH), (DW, DH), (DW, DH + 0.36), (-DW, DH + 0.36)], -0.03, 0.30, 'stone', off=(0.7, 0.3))
    tymp = [(DW*math.cos(math.pi*i/24), DH + DW*math.sin(math.pi*i/24)) for i in range(25)]
    tymp = [(x, y) for (x, y) in tymp if y >= DH + 0.36 - 1e-6]
    y0 = DH + 0.36; x0 = math.sqrt(max(0.0, DW*DW - 0.36*0.36))
    tymp = [(x0, y0)] + [p for p in tymp if abs(p[1] - y0) > 1e-4] + [(-x0, y0)]
    prism(M, tymp, 0.05, 0.30, 'stone', off=(1.3, 0.8))
    # 5. the voussoir ring of the arch: fourteen stones and a keystone
    NV = 15
    for i in range(NV):
        p0, p1 = math.pi*(1 - i/NV), math.pi*(1 - (i + 1)/NV)
        key = i == NV//2
        ro = D_RING_OUT + (0.04 if key else 0.0)
        pts = [(D_RING_IN*math.cos(p0), DH + D_RING_IN*math.sin(p0)), (D_RING_IN*math.cos(p1), DH + D_RING_IN*math.sin(p1)),
               (ro*math.cos(p1), DH + ro*math.sin(p1)), (ro*math.cos(p0), DH + ro*math.sin(p0))]
        if key: pts[2] = (pts[2][0] + 0.03, pts[2][1]); pts[3] = (pts[3][0] - 0.03, pts[3][1])
        cs = sum(x for x, _ in pts)/4; cy = sum(y for _, y in pts)/4
        pts.sort(key=lambda q: math.atan2(q[1] - cy, q[0] - cs))
        prism(M, pts, -(0.04 + (0.035 if key else 0.0)), 0.30, 'stone', off=(rng.random()*2, rng.random()*2))
    # 6. the passage: stone side walls, flagged floor, an oak ceiling on three beams, an oak end wall
    PS = Part()
    for sx in (-1, 1):
        a, b = sorted((sx*DW, sx*(DW + 0.25)))
        for j, (y0, y1) in enumerate([(0.0, 0.8), (0.8, 1.6), (1.6, 2.4), (2.4, DH)]):
            prism(PS, [(a, y0), (b, y0), (b, y1), (a, y1)], 0.90, PASSAGE + 0.05, 'stone', off=(rng.random()*2, rng.random()*2))
    prism(PS, [(-DW - 0.05, -0.06), (DW + 0.05, -0.06), (DW + 0.05, 0.004), (-DW - 0.05, 0.004)], -0.02, PASSAGE + 0.05, 'stone', off=(0.2, 0.4))
    prism(PS, [(-DW - 0.05, DH), (DW + 0.05, DH), (DW + 0.05, DH + 0.06), (-DW - 0.05, DH + 0.06)], 0.28, PASSAGE + 0.05, 'oak', off=(0.0, 0.0))
    for dz in (0.55, 0.95, 1.35):
        prism(PS, [(-DW, DH - 0.10), (DW, DH - 0.10), (DW, DH), (-DW, DH)], dz - 0.05, dz + 0.05, 'oak', off=(rng.random(), 0.0))
    for k in range(6):
        x0 = -DW + 2*DW*k/6; x1 = -DW + 2*DW*(k + 1)/6 - 0.006
        prism(PS, [(x0, 0.004), (x1, 0.004), (x1, DH), (x0, DH)], PASSAGE - 0.04, PASSAGE + 0.02, 'oak', off=(rng.random(), 0.0), swap=True)
    passage = build_mesh('passage', PS)
    back = shelf = None

# ------------------------------------------------------------------ the two oak leaves, each in its hinge frame (rotunda.js
# buildDoorLeaves: pivot at x = sx*dw, z = -0.10; the leaf runs from the hinge towards the middle)
def build_leaves():
    W_ = DW - 0.008; H_ = DH - 0.02
    for name, sx in (('leafL', -1), ('leafR', 1)):
        me_ = bpy.data.meshes.new(name); bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
        place = lambda x, y, z: from_local3((x, y, z))
        x_of = lambda t: -sx*W_*t   # t = 0 at the hinge, 1 at the meeting stile
        for k in range(5):           # five vertical planks with a hair of a gap
            xa, xb = sorted((x_of(k/5) - sx*0.002, x_of((k + 1)/5) + sx*0.002))
            box(bm, uvl, place, xa, xb, 0.01, 0.01 + H_, -0.03, 0.03, 'oak', off=rng.random(), swap=True)   # grain up the plank
        for y in (0.42, 2.72):       # strap hinges on both faces, with rivets on the room side
            for zf in (1, -1):
                xa, xb = sorted((x_of(0.0) + sx*0.01, x_of(0.86)))
                z0, z1 = sorted((zf*0.030, zf*0.036))
                box(bm, uvl, place, xa, xb, y - 0.035, y + 0.035, z0, z1, 'iron')
            for t in (0.12, 0.32, 0.52, 0.72):
                box(bm, uvl, place, x_of(t) - 0.009, x_of(t) + 0.009, y - 0.009, y + 0.009, 0.036, 0.044, 'iron')
        xm = x_of(0.88)             # a ring pull: plate and a square ring
        box(bm, uvl, place, xm - 0.05, xm + 0.05, 1.42, 1.62, 0.030, 0.038, 'iron')
        for (xa, xb, ya, yb) in ((-0.055, 0.055, 1.33, 1.35), (-0.055, -0.04, 1.33, 1.47), (0.04, 0.055, 1.33, 1.47)):
            box(bm, uvl, place, xm + xa, xm + xb, ya, yb, 0.040, 0.056, 'iron')
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
        for f in bm.faces: f.smooth = False
        bm.to_mesh(me_); bm.free()
        ob = bpy.data.objects.new(name, me_); bpy.context.collection.objects.link(ob)
        for m in MATS: me_.materials.append(mat_of(m))


masonry = build_mesh('masonry', M)

if MODULE == 'bay':

    # ------------------------------------------------------------------ the niche back: lime render, curved like the drum
    NB_ = Part(open_sheet=True); ns, nv = 24, 16
    for i in range(ns):
        sa, sb = -A + 2*A*i/ns, -A + 2*A*(i + 1)/ns
        for j in range(nv):
            ya0 = Y_SILL + (ring_top(sa, A) - Y_SILL)*j/nv; ya1 = Y_SILL + (ring_top(sa, A) - Y_SILL)*(j + 1)/nv
            yb0 = Y_SILL + (ring_top(sb, A) - Y_SILL)*j/nv; yb1 = Y_SILL + (ring_top(sb, A) - Y_SILL)*(j + 1)/nv
            quad(NB_, [(sa, ya0, DEPTH), (sb, yb0, DEPTH), (sb, yb1, DEPTH), (sa, ya1, DEPTH)], 'render', 'd', off=(0.0, 0.0))
    back = build_mesh('nicheback', NB_)

    # ------------------------------------------------------------------ oak shelf the altarpiece stands on
    SH = Part()
    profile_s(SH, [(0.92, DEPTH + 0.02), (0.92, -0.085), (0.935, -0.10), (0.985, -0.10), (1.0, -0.085), (1.0, DEPTH + 0.02)], -1.65, 1.65, 18, 'oak', off=(0.2, 0.0))
    shelf = build_mesh('shelf', SH)


# ------------------------------------------------------------------ engaged columns with base and cushion capital (built round, then placed)
def frame_at(sx):
    th = sx*BAY/2
    T = Vector((math.cos(th), 0, math.sin(th))); N = Vector((-math.sin(th), 0, math.cos(th)))
    O = Vector((R*math.sin(th), 0, -R*math.cos(th) + R))
    def place(x, y, z):  # column frame: x along the wall, y up, z into the room
        p = O + T*x + N*z; p.y = y
        return from_local3(p)
    return place

def orient(f, centre):
    f.normal_update()   # a fresh bmesh face has no normal yet
    if f.normal.dot(f.calc_center_median() - centre) < 0: f.normal_flip()

def set_uv(f, uvl, uvs):
    for loop, uv in zip(f.loops, uvs): loop[uvl].uv = uv

BOXF = [((0, 1, 3, 2), 'x'), ((4, 6, 7, 5), 'x'), ((0, 4, 5, 1), 'y'), ((2, 3, 7, 6), 'y'), ((0, 2, 6, 4), 'z'), ((1, 5, 7, 3), 'z')]
def box(bm, uvl, place, x0, x1, y0, y1, z0, z1, mat, off=0.0, swap=False):
    loc = [(x, y, z) for x in (x0, x1) for y in (y0, y1) for z in (z0, z1)]
    v = [bm.verts.new(place(*q)) for q in loc]; c = place((x0 + x1)/2, (y0 + y1)/2, (z0 + z1)/2)
    where = {vv: q for vv, q in zip(v, loc)}
    for fi, ax in BOXF:
        f = bm.faces.new([v[i] for i in fi]); f.material_index = MATS.index(mat); orient(f, c)
        uv = {'x': lambda q: (q[2], q[1]), 'y': lambda q: (q[0], q[2]), 'z': lambda q: (q[0], q[1])}[ax]
        uvs = [((uv(where[l.vert])[0] + off)/TILE, (uv(where[l.vert])[1] + off)/TILE) for l in f.loops]
        set_uv(f, uvl, [(b, a) for (a, b) in uvs] if swap else uvs)

def column(bm, uvl, sx):
    place = frame_at(sx)
    seg = 18; a0, a1 = -math.pi*0.62, math.pi*0.62   # the front of the drum and a little round the sides
    o = rng.random()*2
    def ring_pt(r, a, y): return place(r*math.sin(a), y, r*math.cos(a))
    def lathe(prof, mat, shape=None):
        """prof: [(t_or_r, y)]; shape(a, j) -> (x, z) overrides the circle"""
        rows = []
        for j, (r, y) in enumerate(prof):
            row = []
            for k in range(seg + 1):
                a = a0 + (a1 - a0)*k/seg
                x, z = shape(a, j) if shape else (r*math.sin(a), r*math.cos(a))
                row.append(bm.verts.new(place(x, y, z)))
            rows.append(row)
        acc = [0.0]
        for i in range(1, len(prof)): acc.append(acc[-1] + abs(prof[i][1] - prof[i - 1][1]) + abs(prof[i][0] - prof[i - 1][0]))
        for i in range(len(rows) - 1):
            for k in range(seg):
                f = bm.faces.new([rows[i][k], rows[i][k + 1], rows[i + 1][k + 1], rows[i + 1][k]]); f.material_index = MATS.index(mat)
                orient(f, place(0, (prof[i][1] + prof[i + 1][1])/2, 0))
                ua = ((a0 + (a1 - a0)*k/seg)*COL_R + o)/TILE; ub = ((a0 + (a1 - a0)*(k + 1)/seg)*COL_R + o)/TILE
                va, vb = (acc[i] + prof[0][1] + o)/TILE, (acc[i + 1] + prof[0][1] + o)/TILE
                set_uv(f, uvl, [(ua, va), (ub, va), (ub, vb), (ua, vb)][:len(f.loops)])
    # square plinth, a fat torus, a scotia and a small roll: a Romanesque attic base
    box(bm, uvl, place, -0.23, 0.23, 0.0, 0.22, -0.06, 0.25, 'stone', o)
    lathe([(0.205, 0.22), (0.214, 0.235), (0.216, 0.258), (0.21, 0.28), (0.19, 0.296), (0.176, 0.31), (0.172, 0.34), (0.18, 0.355), (0.181, 0.372), (0.172, 0.39), (COL_R, 0.40)], 'stone')
    lathe([(COL_R, 0.40), (COL_R, 2.0), (COL_R, 3.6), (COL_R, 5.34)], 'stone')
    lathe([(COL_R, 5.34), (0.171, 5.35), (0.176, 5.365), (0.171, 5.38), (COL_R, 5.39)], 'stone')
    # cushion capital: the round shaft swells into a square block
    nr = 7; prof = [(0, 5.39 + 0.13*math.sin(j/nr*math.pi/2)) for j in range(nr + 1)]
    def cushion(a, j):
        t = (j/nr)**0.8; cx, cz = math.sin(a), math.cos(a); k = 0.205/max(abs(cx), abs(cz), 1e-6)
        return ((1 - t)*COL_R*cx + t*k*cx, (1 - t)*COL_R*cz + t*k*cz)
    lathe(prof, 'stone', shape=cushion)
    box(bm, uvl, place, -0.212, 0.212, 5.52, 5.60, -0.05, 0.212, 'stone', o + 0.3)

def columns(bm, uvl):
    for sx in SIDES: column(bm, uvl, sx)
cols = build_mesh('columns', Part(), extra=columns)

# ------------------------------------------------------------------ iron torch brackets and the torches (not bevelled)
def fittings(bm, uvl):
    for sx in SIDES:
        place = frame_at(sx)
        zc = R - FLAME_R  # 0.34: the flame stands this far from the wall plane, as the candles did
        def tube(pts, r, mat, seg=10, cap=True):
            """a circle swept through column-frame points; r may be a function of 0..1"""
            rings = []; cen = []
            for i, p in enumerate(pts):
                a = Vector(pts[max(0, i - 1)]); b = Vector(pts[min(len(pts) - 1, i + 1)]); t = (b - a).normalized()
                up = Vector((0, 0, 1)) if abs(t.z) < 0.9 else Vector((1, 0, 0)); u = t.cross(up).normalized(); v = t.cross(u)
                rr = r(i/(len(pts) - 1)) if callable(r) else r
                rings.append([bm.verts.new(place(*(Vector(p) + (u*math.cos(2*math.pi*k/seg) + v*math.sin(2*math.pi*k/seg))*rr))) for k in range(seg)])
                cen.append(place(*p))
            for i in range(len(rings) - 1):
                for k in range(seg):
                    f = bm.faces.new([rings[i][k], rings[i][(k + 1) % seg], rings[i + 1][(k + 1) % seg], rings[i + 1][k]]); f.material_index = MATS.index(mat)
                    orient(f, (cen[i] + cen[i + 1])/2)
                    set_uv(f, uvl, [(k/seg*0.15, i*0.04), ((k + 1)/seg*0.15, i*0.04), ((k + 1)/seg*0.15, (i + 1)*0.04), (k/seg*0.15, (i + 1)*0.04)])
            if cap:
                for rg, c, nb in ((rings[0], cen[0], cen[1]), (rings[-1], cen[-1], cen[-2])):
                    f = bm.faces.new(rg); f.material_index = MATS.index(mat); f.normal_update()
                    if f.normal.dot(c - nb) < 0: f.normal_flip()
                    set_uv(f, uvl, [(0.5, 0.5)]*len(f.loops))
        def bar(p0, p1, w, h, mat):
            p0, p1 = Vector(p0), Vector(p1); t = (p1 - p0).normalized()
            up = Vector((0, 1, 0)) if abs(t.y) < 0.9 else Vector((1, 0, 0)); u = t.cross(up).normalized()*w/2; v = t.cross(u).normalized()*h/2
            c = [p + du + dv for p in (p0, p1) for du in (u, -u) for dv in (v, -v)]
            vs = [bm.verts.new(place(*q)) for q in c]; cc = place(*((p0 + p1)/2))
            for fi, _ in BOXF:
                f = bm.faces.new([vs[i] for i in fi]); f.material_index = MATS.index(mat); orient(f, cc)
                set_uv(f, uvl, [(0, 0), (0.04, 0), (0.04, 0.2), (0, 0.2)])
        zf = COL_R + 0.004
        # back plate on the column, the arm and its brace, two collar rings, a drip cup
        bar((0, 2.16, zf), (0, 2.54, zf), 0.075, 0.014, 'iron')
        bar((0, 2.44, zf), (0, 2.44, zc - 0.036), 0.022, 0.016, 'iron')
        bar((0, 2.20, zf), (0, 2.29, zc - 0.036), 0.018, 0.014, 'iron')
        for y in (2.44, 2.29):
            ring = [(math.cos(2*math.pi*k/24)*0.036, y, zc + math.sin(2*math.pi*k/24)*0.036) for k in range(25)]
            tube(ring, 0.0075, 'iron', seg=8, cap=False)
        tube([(0, 2.235, zc), (0, 2.25, zc), (0, 2.272, zc)], lambda t: 0.012 + 0.026*t, 'iron', seg=16)
        for y in (2.175, 2.52):
            tube([(0, y - 0.004, zf + 0.007), (0, y + 0.004, zf + 0.007)], 0.009, 'iron', seg=8)   # rivet heads
        # the torch: a tapered oak shaft and a head of pitch-soaked wrappings
        tube([(0, 2.06, zc), (0, 2.30, zc), (0, 2.61, zc)], lambda t: 0.015 + 0.008*t, 'oak', seg=12)
        rads = [0.026, 0.033, 0.034, 0.029, 0.035, 0.030, 0.033, 0.022]
        tube([(0, y, zc) for y in (2.60, 2.615, 2.65, 2.66, 2.69, 2.70, 2.73, 2.762)], lambda t: rads[min(7, int(round(t*7)))], 'pitch', seg=14)

fit = build_mesh('fittings', Part(), extra=fittings)

# ------------------------------------------------------------------ bevel the stone and oak, weighted normals, then one object
def finish(ob, width):
    bpy.context.view_layer.objects.active = ob
    if width > 0:
        bv = ob.modifiers.new('bevel', 'BEVEL'); bv.width = width; bv.segments = 2; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(30)
        bv.harden_normals = False; bv.miter_outer = 'MITER_ARC'
    wn = ob.modifiers.new('wn', 'WEIGHTED_NORMAL'); wn.keep_sharp = True; wn.mode = 'FACE_AREA_WITH_ANGLE'
    for m in list(ob.modifiers):
        with bpy.context.temp_override(object=ob, active_object=ob): bpy.ops.object.modifier_apply(modifier=m.name)

PARTS = [(masonry, BEVEL), (cols, BEVEL), (wall, 0.0), (band, 0.0), (fit, 0.0)] + ([(shelf, 0.010), (back, 0.0)] if MODULE == 'bay' else [(passage, 0.006)])
for ob, w in PARTS:
    finish(ob, w)

bpy.ops.object.select_all(action='DESELECT')
for ob, _ in PARTS: ob.select_set(True)
bpy.context.view_layer.objects.active = masonry
bpy.ops.object.join()
bay = bpy.context.view_layer.objects.active; bay.name = MODULE

# ------------------------------------------------------------------ second uv set for the 1024 light map
me = bay.data
lm = me.uv_layers.new(name='LM'); me.uv_layers.active = lm
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.004, area_weight=0.0, correct_aspect=True, scale_to_bounds=False)
bpy.ops.uv.pack_islands(margin=0.004, rotate=True)
bpy.ops.object.mode_set(mode='OBJECT')
me.uv_layers.active = me.uv_layers['UVMap']
me.uv_layers['UVMap'].active_render = True

tris = sum(len(p.vertices) - 2 for p in me.polygons)
print(f'CASTLE_KIT {MODULE} tris={tris} verts={len(me.vertices)}')
if MODULE == 'door': build_leaves()
if args.blend: bpy.ops.wm.save_as_mainfile(filepath=args.blend)
if MODULE == 'door':
    for o in bpy.data.objects:
        if o.name.startswith('leaf'): o.select_set(True)
bpy.ops.export_scene.gltf(filepath=args.out, export_format='GLB', use_selection=True, export_apply=True, export_texcoords=True, export_normals=True,
                          export_materials='EXPORT', export_yup=True, export_image_format='NONE')
print('CASTLE_KIT wrote', args.out)

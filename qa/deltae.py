# Poster colour fidelity: CIEDE2000 between what a finished panel shows on screen and its image file.
#   python3 qa/deltae.py qa/out/after [C07 C08 D07 ...]
# For each shot with panel info (castle_shots.mjs writes it for inspected panels), the panel quad is
# warped back to a rectangle, the file is cropped the way the shader crops it (uCrop) and resized
# to match, both get a light blur (sampling, not colour), and the central 80% is compared.
import sys, os, json, io, urllib.request
import numpy as np
from PIL import Image, ImageFilter

def srgb_to_lab(rgb):
    c = rgb/255.0; c = np.where(c <= 0.04045, c/12.92, ((c + 0.055)/1.055)**2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = c @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > (6/29)**3, np.cbrt(xyz), xyz/(3*(6/29)**2) + 4/29)
    return np.stack([116*f[..., 1] - 16, 500*(f[..., 0] - f[..., 1]), 200*(f[..., 1] - f[..., 2])], -1)

def de2000(l1, l2):
    L1, a1, b1 = l1[..., 0], l1[..., 1], l1[..., 2]; L2, a2, b2 = l2[..., 0], l2[..., 1], l2[..., 2]
    C1 = np.hypot(a1, b1); C2 = np.hypot(a2, b2); Cb = (C1 + C2)/2
    G = 0.5*(1 - np.sqrt(Cb**7/(Cb**7 + 25**7)))
    a1p, a2p = (1 + G)*a1, (1 + G)*a2; C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360; h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp = L2 - L1; dCp = C2p - C1p
    dh = h2p - h1p; dh = np.where(dh > 180, dh - 360, np.where(dh < -180, dh + 360, dh)); dh = np.where(C1p*C2p == 0, 0, dh)
    dHp = 2*np.sqrt(C1p*C2p)*np.sin(np.radians(dh/2))
    Lbp = (L1 + L2)/2; Cbp = (C1p + C2p)/2
    hs = h1p + h2p; hbp = np.where(np.abs(h1p - h2p) > 180, np.where(hs < 360, hs + 360, hs - 360)/2, hs/2); hbp = np.where(C1p*C2p == 0, hs, hbp)
    T = 1 - 0.17*np.cos(np.radians(hbp - 30)) + 0.24*np.cos(np.radians(2*hbp)) + 0.32*np.cos(np.radians(3*hbp + 6)) - 0.20*np.cos(np.radians(4*hbp - 63))
    dth = 30*np.exp(-((hbp - 275)/25)**2); Rc = 2*np.sqrt(Cbp**7/(Cbp**7 + 25**7))
    Sl = 1 + 0.015*(Lbp - 50)**2/np.sqrt(20 + (Lbp - 50)**2); Sc = 1 + 0.045*Cbp; Sh = 1 + 0.015*Cbp*T; Rt = -np.sin(np.radians(2*dth))*Rc
    return np.sqrt((dLp/Sl)**2 + (dCp/Sc)**2 + (dHp/Sh)**2 + Rt*(dCp/Sc)*(dHp/Sh))

def persp_coeffs(dst, src):
    # coefficients mapping output (dst) points to input (src) points, for Image.transform
    A = []; B = []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u*x, -u*y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v*x, -v*y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()

def measure(shot_png, info, base, scale):
    shot = Image.open(shot_png).convert('RGB')
    url = info['src'];
    if url.startswith('/') or not url.startswith('http'): url = base.rstrip('/') + '/' + url.lstrip('./')
    src = Image.open(io.BytesIO(urllib.request.urlopen(url).read())).convert('RGB')
    cx, cy = info['crop']; W, H = src.size
    crop = src.crop((round((0.5 - cx/2)*W), round((0.5 - cy/2)*H), round((0.5 + cx/2)*W), round((0.5 + cy/2)*H)))
    # quad corners on screen: bottom-left, bottom-right, top-right, top-left of the panel
    q = [(x*scale, y*scale) for x, y in info['rect']]
    w = int(round(np.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]))); h = int(round(np.hypot(q[3][0] - q[0][0], q[3][1] - q[0][1])))
    flat = shot.transform((w, h), Image.PERSPECTIVE, persp_coeffs([(0, h), (w, h), (w, 0), (0, 0)], q), Image.BICUBIC)
    ref = crop.resize((w, h), Image.LANCZOS)
    blur = ImageFilter.GaussianBlur(1.2*max(1, scale))
    a = np.asarray(flat.filter(blur), float); b = np.asarray(ref.filter(blur), float)
    m = (slice(int(h*0.1), int(h*0.9)), slice(int(w*0.1), int(w*0.9)))
    d = de2000(srgb_to_lab(b[m]), srgb_to_lab(a[m]))
    return float(d.mean()), float(np.percentile(d, 95)), (w, h), flat, ref

if __name__ == '__main__':
    out = sys.argv[1]; meta = json.load(open(os.path.join(out, 'meta.json')))
    names = sys.argv[2:] or sorted(meta['panels'])
    dpr = 1
    for kv in meta['query'].split('&'):
        if kv.startswith('dpr='): dpr = float(kv[4:])
    res = {}
    for n in names:
        info = meta['panels'].get(n)
        if not info: print(n, 'no panel info'); continue
        mean, p95, size, flat, ref = measure(os.path.join(out, n + '.png'), info, 'http://127.0.0.1:8951/', dpr)
        res[n] = {'mean': round(mean, 3), 'p95': round(p95, 3), 'px': size}
        flat.save(os.path.join(out, n + '_panel.png')); 
        print(f'{n}: dE00 mean {mean:.2f}  p95 {p95:.2f}  ({size[0]}x{size[1]} px)  {"PASS" if mean < 2 and p95 < 3 else "FAIL"}')
    json.dump(res, open(os.path.join(out, 'deltae.json'), 'w'), indent=1)

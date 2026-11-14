#!/usr/bin/env python3
"""Registered layers of the FOSSIL dragon for the compare figure: a PROTOTYPE recomputation in numpy.

Not computed by FOSSIL: the production figure would come from a FOSSIL program through its own figure pipeline
(scripts/mesh2svg.py). The look (plate, sepia facets, light, shade law, teal-cream-ember field map) is lifted from it.

body: flat-shaded facets, painter-sorted, side view from -y (u = x to the right, v = z up, depth w = -y).
twin: the plane y = Y_CUT; on a NU x NV grid of square cells over the whole frame, the 3-D signed distance to the
      surface at the cell centres (exact point-triangle distance, sign from the generalized winding number).
Writes img/dragon-body.svg, img/dragon-twin.svg and data/dragon-checks.json.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
from contourpy import contour_generator

ROOT = Path(__file__).resolve().parent / "work"  # git-ignored: data/ in, img/ out (README.md)
W, H, PAD = 640, 420, 18
NU, NV = 96, 63
PLATE, EDGE, BODY, CREAM, TEAL, EMBER = "#1b1714", "#120f0d", "#c9a27a", "#efe0c4", "#2f8f9d", "#d9480f"
LIGHT = np.array([-0.45, 0.55, 0.70])  # view space (right, up, towards the viewer), as mesh2svg.py
PHI_SCALE = 2.0  # colour = tanh(phi / PHI_SCALE)
LEVELS = (-1.5, -0.75, 0.75, 1.5, 3.0, 4.5, 6.0, 7.5)
NQ = 20  # colour steps per sign
FIELD_SHADE = 0.30 + 0.70 * LIGHT[2] / float(np.linalg.norm(LIGHT))


def hexrgb(c: str) -> np.ndarray:
    return np.array([int(c[i:i + 2], 16) for i in (1, 3, 5)], float)


def rgbhex(c) -> str:
    return "#" + "".join(f"{int(round(min(255.0, max(0.0, v)))):02x}" for v in c)


def f1(v: float) -> str:
    s = f"{v:.1f}"
    return "0" if s in ("0.0", "-0.0") else s.rstrip("0").rstrip(".")


def load_stl(path: Path) -> np.ndarray:
    raw = path.read_bytes()
    n = int.from_bytes(raw[80:84], "little")
    assert len(raw) == 84 + 50 * n
    rec = np.frombuffer(raw, dtype=np.dtype([("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")]), count=n, offset=84)
    return rec["v"].astype(np.float64)


def point_tri_dist(p: np.ndarray, tri: np.ndarray, chunk: int = 256) -> np.ndarray:
    """Exact unsigned distance from every point p (n, 3) to the triangle soup tri (m, 3, 3): Ericson's regions."""
    a, b, c = tri[:, 0][None], tri[:, 1][None], tri[:, 2][None]
    ab, ac = b - a, c - a
    out = np.empty(len(p))
    for s in range(0, len(p), chunk):
        q = p[s:s + chunk, None, :]
        ap = q - a
        d1, d2 = (ab * ap).sum(-1), (ac * ap).sum(-1)
        bp = q - b
        d3, d4 = (ab * bp).sum(-1), (ac * bp).sum(-1)
        cp = q - c
        d5, d6 = (ab * cp).sum(-1), (ac * cp).sum(-1)
        vc, vb, va = d1 * d4 - d3 * d2, d5 * d2 - d1 * d6, d3 * d6 - d5 * d4
        with np.errstate(divide="ignore", invalid="ignore"):
            den = va + vb + vc
            v, w = vb / den, vc / den
            cl = a + ab * v[..., None] + ac * w[..., None]  # interior
            t = d1 / (d1 - d3)
            cl = np.where(((vc <= 0) & (d1 >= 0) & (d3 <= 0))[..., None], a + ab * t[..., None], cl)
            t = d2 / (d2 - d6)
            cl = np.where(((vb <= 0) & (d2 >= 0) & (d6 <= 0))[..., None], a + ac * t[..., None], cl)
            t = (d4 - d3) / ((d4 - d3) + (d5 - d6))
            cl = np.where(((va <= 0) & (d4 - d3 >= 0) & (d5 - d6 >= 0))[..., None], b + (c - b) * t[..., None], cl)
        cl = np.where(((d1 <= 0) & (d2 <= 0))[..., None], a, cl)
        cl = np.where(((d3 >= 0) & (d4 <= d3))[..., None], b, cl)
        cl = np.where(((d6 >= 0) & (d5 <= d6))[..., None], c, cl)
        out[s:s + chunk] = np.sqrt(((q - cl) ** 2).sum(-1)).min(1)
    return out


def winding(p: np.ndarray, tri: np.ndarray, chunk: int = 256) -> np.ndarray:
    """Generalized winding number of the soup at every point (van Oosterom and Strackee solid angles)."""
    out = np.empty(len(p))
    for s in range(0, len(p), chunk):
        r = tri[None] - p[s:s + chunk, None, None, :]  # (n, m, 3, 3)
        ln = np.linalg.norm(r, axis=-1)
        a, b, c = r[:, :, 0], r[:, :, 1], r[:, :, 2]
        num = (a * np.cross(b, c)).sum(-1)
        den = (ln.prod(-1) + (a * b).sum(-1) * ln[:, :, 2] + (b * c).sum(-1) * ln[:, :, 0]
               + (c * a).sum(-1) * ln[:, :, 1])
        out[s:s + chunk] = (2.0 * np.arctan2(num, den)).sum(1) / (4.0 * np.pi)
    return out


def section(tri: np.ndarray, axis: int, w0: float) -> np.ndarray:
    """Segments (k, 2, 3) where the triangles cross the plane x[axis] = w0 (w0 hits no vertex exactly here)."""
    s = tri[:, :, axis] - w0
    assert not np.any(s == 0.0)
    segs = []
    for t, st in zip(tri[(s.min(1) < 0) & (s.max(1) > 0)], s[(s.min(1) < 0) & (s.max(1) > 0)], strict=True):
        pts = [t[i] + (t[j] - t[i]) * (st[i] / (st[i] - st[j])) for i, j in ((0, 1), (1, 2), (2, 0)) if st[i] * st[j] < 0]
        segs.append(pts)
    return np.array(segs)


def main() -> int:
    tri = load_stl(ROOT / "data" / "dragon.stl")
    lo, hi = tri.reshape(-1, 3).min(0), tri.reshape(-1, 3).max(0)
    y_cut = 0.5 * (lo[1] + hi[1])  # the bounding-box mid plane: the richest of the candidates scanned (see report)
    # view: camera azimuth -90, elevation 0 in mesh2svg terms: right = +x, up = +z, towards the viewer = -y
    scale = min((W - 2 * PAD) / (hi[0] - lo[0]), (H - 2 * PAD) / (hi[2] - lo[2]))
    ox = (W - scale * (hi[0] - lo[0])) / 2 - scale * lo[0]
    oy = (H + scale * (hi[2] - lo[2])) / 2 + scale * lo[2]

    def px(x, z):
        return ox + scale * np.asarray(x), oy - scale * np.asarray(z)

    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" '
            f'aria-label="{{}}"><rect width="{W}" height="{H}" rx="10" fill="{PLATE}"/>'
            f'<clipPath id="card"><rect width="{W}" height="{H}" rx="10"/></clipPath><g clip-path="url(#card)">')

    # ------------------------------------------------------------------------------------------------ body
    n = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
    nn = np.linalg.norm(n, axis=1)
    keep = nn > 0
    nv = np.stack([n[:, 0], n[:, 2], -n[:, 1]], 1)[keep] / nn[keep, None]  # (right, up, towards viewer)
    shade = 0.30 + 0.70 * np.abs(nv @ (LIGHT / np.linalg.norm(LIGHT)))
    t = tri[keep]
    depth = -t[:, :, 1].mean(1)
    front = nv[:, 2] > 0  # closed, outward-oriented surface: the facets facing away are hidden (checked in verify)
    base = hexrgb(BODY)
    paths = {"all": [], "front": []}
    for k in np.argsort(depth, kind="stable"):
        X, Y = px(t[k, :, 0], t[k, :, 2])
        d = "M" + "L".join(f"{f1(a)} {f1(b)}" for a, b in zip(X, Y, strict=True)) + "Z"
        s = f'<path d="{d}" fill="{rgbhex(base * shade[k])}"/>'
        paths["all"].append(s)
        if front[k]:
            paths["front"].append(s)
    grp = f'<g stroke="{EDGE}" stroke-opacity="0.35" stroke-width="0.4" stroke-linejoin="round">'
    out = ROOT / "img"
    out.mkdir(exist_ok=True)
    label = f"dragon.stl, {len(tri)} facets, seen from the side"
    (out / "dragon-body.svg").write_text(head.format(label) + grp + "".join(paths["front"]) + "</g></g></svg>\n")
    (ROOT / "data" / "dragon-body-all.svg").write_text(head.format(label) + grp + "".join(paths["all"]) + "</g></g></svg>\n")

    # ------------------------------------------------------------------------------------------------ twin
    cell = W / NU
    assert abs(cell * NV - H) < 1e-9
    h = cell / scale  # cell size in model units
    uc = (np.arange(NU) + 0.5) * cell
    vc = (np.arange(NV) + 0.5) * cell
    xc, zc = (uc - ox) / scale, (oy - vc) / scale
    P = np.stack([np.repeat(xc[None], NV, 0), np.full((NV, NU), y_cut), np.repeat(zc[:, None], NU, 1)], -1).reshape(-1, 3)
    dist = point_tri_dist(P, tri)
    wn = winding(P, tri)
    phi = np.where(wn > 0.5, -dist, dist).reshape(NV, NU)
    wn = wn.reshape(NV, NU)
    segs = section(tri, 1, y_cut)
    np.save(ROOT / 'data' / 'dragon-phi.npy', phi)  # rows from the top of the frame, for verify_images.py

    # colour: tanh(phi / PHI_SCALE) in 2 NQ + 1 steps, teal (inside) - cream - ember (outside), as mesh2svg 'field'
    q = np.round(np.tanh(phi / PHI_SCALE) * NQ).astype(int)
    cream, teal, ember = hexrgb(CREAM), hexrgb(TEAL), hexrgb(EMBER)
    runs: dict[int, list[str]] = {}
    for j in range(NV):
        i = 0
        while i < NU:
            k = i
            while k + 1 < NU and q[j, k + 1] == q[j, i]:
                k += 1
            runs.setdefault(int(q[j, i]), []).append(f"M{f1(i * cell)} {f1(j * cell)}h{f1((k - i + 1) * cell)}v{f1(cell)}h{f1(-(k - i + 1) * cell)}Z")
            i = k + 1
    body = []
    for lev in sorted(runs):
        v = lev / NQ
        # mesh2svg shades field quads like facets: seen face on, 0.30 + 0.70 * light_z
        col = rgbhex((cream + (teal - cream) * -v if v < 0 else cream + (ember - cream) * v) * FIELD_SHADE)
        body.append(f'<path d="{"".join(runs[lev])}" fill="{col}" stroke="{col}" stroke-width="0.3"/>')
    grid = "".join(f"M{f1(i * cell)} 0V{H}" for i in range(1, NU)) + "".join(f"M0 {f1(j * cell)}H{W}" for j in range(1, NV))
    body.append(f'<path d="{grid}" fill="none" stroke="{PLATE}" stroke-opacity="0.22" stroke-width="0.5"/>')
    cg = contour_generator(x=uc, y=vc, z=phi)
    iso = []
    for lev in LEVELS:
        for line in cg.lines(lev):
            iso.append("M" + "L".join(f"{f1(a)} {f1(b)}" for a, b in line))
    body.append(f'<path d="{"".join(iso)}" fill="none" stroke="{PLATE}" stroke-opacity="0.5" stroke-width="0.8" stroke-linejoin="round"/>')
    sx, sy = px(segs[:, :, 0], segs[:, :, 2])
    cur = "".join(f"M{f1(sx[k, 0])} {f1(sy[k, 0])}L{f1(sx[k, 1])} {f1(sy[k, 1])}" for k in range(len(segs)))
    body.append(f'<path d="{cur}" fill="none" stroke="{PLATE}" stroke-width="2" stroke-linecap="round"/>')
    label = f"signed distance to the dragon on the plane y = {y_cut:.3f}, {NU} by {NV} cells"
    (out / "dragon-twin.svg").write_text(head.format(label) + "".join(body) + "</g></svg>\n")

    # ---------------------------------------------------------------------------------------------- checks
    lam = np.array([0.1, 0.5, 0.9])
    on = (segs[:, None, 0] * (1 - lam[None, :, None]) + segs[:, None, 1] * lam[None, :, None]).reshape(-1, 3)
    d_on = point_tri_dist(on, tri)
    nrm = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
    vol6 = (tri[:, 0] * nrm).sum(1)
    cen = ((tri.sum(1) / 4.0) * vol6[:, None]).sum(0) / vol6.sum()  # volume centroid
    cen_p = np.array([cen[0], y_cut, cen[2]])
    ic, jc = int((ox + scale * cen[0]) // cell), int((oy - scale * cen[2]) // cell)
    patch = phi[jc - 1:jc + 2, ic - 1:ic + 2]
    off = np.minimum(np.abs(wn), np.abs(wn - 1.0))
    checks = {
        "facets": int(len(tri)), "bbox_lo": lo.tolist(), "bbox_hi": hi.tolist(), "y_cut": float(y_cut),
        "px_per_unit": float(scale), "cell_px": cell, "cell_model": float(h), "grid": [NU, NV],
        "section_segments": int(len(segs)), "section_samples": int(len(on)), "max_abs_d_on_section": float(d_on.max()),
        "volume": float(vol6.sum() / 6.0), "centroid": cen.tolist(),
        "winding_at_centroid_on_plane": float(winding(cen_p[None], tri)[0]),
        "phi_at_centroid_on_plane": float(-point_tri_dist(cen_p[None], tri)[0]),
        "phi_3x3_cells_at_centroid": patch.tolist(), "phi_3x3_all_negative": bool((patch < 0).all()),
        "phi_corners": [float(phi[0, 0]), float(phi[0, -1]), float(phi[-1, 0]), float(phi[-1, -1])],
        "winding_corners": [float(wn[0, 0]), float(wn[0, -1]), float(wn[-1, 0]), float(wn[-1, -1])],
        "winding_min": float(wn.min()), "winding_max": float(wn.max()),
        "winding_frac_within_0.05": float((off < 0.05).mean()), "winding_worst_offset": float(off.max()),
        "cells_inside": int((phi < 0).sum()), "phi_min": float(phi.min()), "phi_max": float(phi.max()),
        "facets_drawn_front": int(front.sum()), "iso_levels": list(LEVELS), "phi_scale": PHI_SCALE,
    }
    (ROOT / "data" / "dragon-checks.json").write_text(json.dumps(checks, indent=1))
    print(json.dumps(checks, indent=1))
    for f in ("dragon-body.svg", "dragon-twin.svg"):
        print(f, (out / f).stat().st_size)
    return 0


if __name__ == "__main__":
    sys.exit(main())

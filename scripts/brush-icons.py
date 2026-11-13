#!/usr/bin/env python3
"""Sumi brush icons for the home page's "more" links (src/lib/icons.ts is generated from this file).

Each stroke is a cubic Bezier centreline turned into a filled outline whose width follows a brush profile: a press at
the entry, a slowly thinning body, a tapered exit, plus a few dry-brush hairs past the tail. Seeded, so the output is
reproducible: `python3 scripts/brush-icons.py > src/lib/icons.ts`.
"""
import math
import random

VIEW = 64


def bez(p, t):
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = p
    u = 1 - t
    return (u**3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t**3 * x3,
            u**3 * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t**3 * y3)


def line(a, b, bow=0.0):
    """A straight stroke from a to b, bowed sideways by `bow` (fraction of its length)."""
    (ax, ay), (bx, by) = a, b
    dx, dy = bx - ax, by - ay
    nx, ny = -dy, dx
    return [a, (ax + dx / 3 + nx * bow, ay + dy / 3 + ny * bow), (ax + 2 * dx / 3 + nx * bow, ay + 2 * dy / 3 + ny * bow), b]


def profile(t, press, tail):
    if t < 0.12:
        return press + (1 - press) * (t / 0.12) ** 0.5 + 0.15 * math.sin(math.pi * t / 0.12)
    body = 1 - 0.18 * (t - 0.12)
    if t > 1 - tail:
        return body * max(0.04, (1 - t) / tail) ** 0.8
    return body


def stroke(p, w, rng, press=0.85, tail=0.3, hairs=2, n=40):
    pts = [bez(p, i / n) for i in range(n + 1)]
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        t = i / n
        a, b = pts[max(0, i - 1)], pts[min(n, i + 1)]
        tx, ty = b[0] - a[0], b[1] - a[1]
        L = math.hypot(tx, ty) or 1
        nx, ny = -ty / L, tx / L
        h = w / 2 * profile(t, press, tail) * (1 + rng.uniform(-0.07, 0.07))
        left.append((x + nx * h, y + ny * h))
        right.append((x - nx * h, y - ny * h))
    out = [poly(left + right[::-1])]
    # dry-brush hairs: thin tapered slivers continuing the tail, fanned slightly
    x, y = pts[-1]
    tx, ty = pts[-1][0] - pts[-4][0], pts[-1][1] - pts[-4][1]
    L = math.hypot(tx, ty) or 1
    tx, ty = tx / L, ty / L
    for k in range(hairs):
        off = (k - (hairs - 1) / 2) * w * 0.32
        sx, sy = pts[-6][0] - ty * off, pts[-6][1] + tx * off
        ln = w * rng.uniform(0.9, 1.6)
        ex, ey = x + tx * ln - ty * off * 1.3, y + ty * ln + tx * off * 1.3
        hw = w * 0.07
        out.append(poly([(sx - ty * hw, sy + tx * hw), (ex, ey), (sx + ty * hw, sy - tx * hw)]))
    return out


def poly(ps):
    # One winding direction for every outline: an icon is a single path under the nonzero fill rule, and where two
    # outlines of opposite winding overlap (a dot on a stem) the overlap would cancel into a hole.
    area = sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(ps, ps[1:] + ps[:1]))
    if area < 0:
        ps = ps[::-1]
    return 'M' + 'L'.join(f'{x:.2f} {y:.2f}' for x, y in ps) + 'Z'


def grid(step=8):
    return ''.join(f'M{v} 4V60M4 {v}H60' for v in range(8, VIEW, step))


def icons():
    rng = random.Random(7)
    S = {}
    # adaptive grid: the square, one refinement, a second one in the top-right quadrant
    S['grid'] = [
        *stroke(line((12, 12), (52, 12), -0.02), 5.2, rng),
        *stroke(line((52, 11), (52, 52), 0.015), 5.2, rng),
        *stroke(line((52, 52), (12, 52), -0.015), 5.2, rng),
        *stroke(line((12, 52), (12, 12), 0.02), 5.2, rng, hairs=1),
        *stroke(line((32, 12), (32, 52), 0.02), 3.4, rng, hairs=1),
        *stroke(line((12, 32), (52, 32), -0.02), 3.4, rng, hairs=1),
        *stroke(line((42, 13), (42, 31), 0.03), 2.2, rng, hairs=0, tail=0.4),
        *stroke(line((33, 22), (51, 22), -0.03), 2.2, rng, hairs=0, tail=0.4),
    ]
    # curly braces
    S['braces'] = [
        *stroke([(27, 8), (17, 8), (21, 26), (19, 29)], 5.0, rng, hairs=0, tail=0.05),
        *stroke([(19, 28), (17, 31), (13, 32), (10, 32)], 4.0, rng, press=1.0, hairs=0, tail=0.6),
        *stroke([(11, 32), (15, 33), (18, 34), (19, 37)], 4.0, rng, press=0.3, hairs=0, tail=0.02),
        *stroke([(19, 36), (21, 40), (16, 56), (27, 56)], 5.0, rng, press=0.9, hairs=2),
        *stroke([(37, 8), (47, 8), (43, 26), (45, 29)], 5.0, rng, hairs=0, tail=0.05),
        *stroke([(45, 28), (47, 31), (51, 32), (54, 32)], 4.0, rng, press=1.0, hairs=0, tail=0.6),
        *stroke([(53, 32), (49, 33), (46, 34), (45, 37)], 4.0, rng, press=0.3, hairs=0, tail=0.02),
        *stroke([(45, 36), (43, 40), (48, 56), (37, 56)], 5.0, rng, press=0.9, hairs=2),
    ]
    # hanging scroll (kakejiku): cord, top rod, mounting edges, two vertical text strokes, heavy bottom roller
    S['scroll'] = [
        *stroke(line((24, 12), (32, 4), 0.0), 1.6, rng, hairs=0, tail=0.2),
        *stroke(line((32, 4), (40, 12), 0.0), 1.6, rng, hairs=0, tail=0.2),
        *stroke(line((12, 13), (52, 13), -0.03), 4.2, rng, hairs=1),
        *stroke(line((17, 15), (17, 51), 0.01), 1.8, rng, hairs=0, tail=0.15),
        *stroke(line((47, 15), (47, 51), -0.01), 1.8, rng, hairs=0, tail=0.15),
        *stroke(line((36, 20), (36, 44), 0.03), 3.6, rng, hairs=1, tail=0.4),
        *stroke(line((28, 20), (28, 36), -0.03), 3.6, rng, hairs=1, tail=0.4),
        *stroke(line((9, 54), (55, 54), 0.02), 6.0, rng, hairs=2),
    ]
    # --- small icons (links and facts; drawn bolder, they show at 18-24 px) ---
    def dot(x, y, w=9.0):
        # a press of the brush: a horizontal dab about as long as it is wide, so it reads round, not as a sliver
        return stroke(line((x - 0.42 * w, y + 0.6), (x + 0.42 * w, y - 0.6)), w, rng, press=1.0, tail=0.35, hairs=0, n=16)

    # envelope: the body, then the flap
    S['mail'] = [
        *stroke(line((9, 17), (55, 17), -0.02), 5.0, rng, hairs=0, tail=0.15),
        *stroke(line((55, 16), (55, 48), 0.02), 5.0, rng, hairs=0, tail=0.15),
        *stroke(line((55, 48), (9, 48), -0.015), 5.0, rng, hairs=2, tail=0.3),
        *stroke(line((9, 48), (9, 17), 0.02), 5.0, rng, hairs=0, tail=0.15),
        *stroke([(11, 19), (20, 26), (26, 32), (32, 35)], 4.0, rng, hairs=0, tail=0.1),
        *stroke([(32, 35), (38, 32), (44, 26), (54, 19)], 4.0, rng, press=0.6, hairs=1),
    ]
    # ORCID's identifier, written: i, then D
    S['orcid'] = [
        *dot(16, 13, 8.5),
        *stroke(line((16, 24), (16, 54), 0.02), 6.0, rng, hairs=1, tail=0.25),
        *stroke(line((29, 11), (29, 54), -0.01), 6.0, rng, hairs=0, tail=0.1),
        *stroke([(29, 11), (62, 6), (62, 60), (29, 53)], 5.0, rng, press=0.6, hairs=2),
    ]
    # git branch: the trunk with its two commits, and a branch curving off to a third
    S['branch'] = [
        *stroke(line((20, 16), (20, 48), 0.02), 4.2, rng, hairs=0, tail=0.15),
        *dot(20, 11, 12), *dot(20, 53, 12), *dot(45, 14, 12),
        *stroke([(45, 21), (45, 34), (24, 30), (21, 44)], 3.8, rng, hairs=1, tail=0.35),
    ]
    # seedling (status: active, growing): a stem, two leaves opening from its top, each painted thin-thick-thin
    S['sprout'] = [
        *stroke([(31, 60), (33, 50), (30, 42), (32, 30)], 5.0, rng, press=1.0, hairs=0, tail=0.2),
        *stroke([(31, 33), (25, 22), (15, 16), (5, 18)], 9.0, rng, press=0.12, hairs=1, tail=0.6),
        *stroke([(33, 29), (37, 15), (47, 7), (60, 6)], 10.0, rng, press=0.12, hairs=1, tail=0.6),
        *stroke(line((14, 61), (50, 61), -0.02), 3.0, rng, hairs=2, tail=0.4),
    ]
    # key (licence: permission to use)
    S['key'] = [
        *stroke([(18, 21), (5, 21), (5, 43), (18, 43)], 5.0, rng, hairs=0, tail=0.1),
        *stroke([(18, 43), (31, 43), (31, 21), (17, 21)], 5.0, rng, press=0.7, hairs=0, tail=0.2),
        *stroke(line((30, 32), (60, 32), -0.02), 5.0, rng, hairs=1, tail=0.25),
        *stroke(line((48, 33), (48, 45), 0.02), 4.4, rng, hairs=0, tail=0.3),
        *stroke(line((56, 33), (56, 42), 0.02), 4.0, rng, hairs=0, tail=0.3),
    ]
    # open book (documentation): spine, the pages' top and bottom edges, the outer edges
    S['book'] = [
        *stroke(line((32, 16), (32, 54), 0.0), 4.0, rng, hairs=0, tail=0.15),
        *stroke([(31, 17), (24, 9), (13, 9), (4, 14)], 4.6, rng, hairs=0, tail=0.15),
        *stroke([(33, 17), (40, 9), (51, 9), (60, 14)], 4.6, rng, hairs=0, tail=0.15),
        *stroke(line((4, 13), (4, 50), 0.01), 4.0, rng, hairs=0, tail=0.1),
        *stroke(line((60, 13), (60, 50), -0.01), 4.0, rng, hairs=0, tail=0.1),
        *stroke([(4, 50), (14, 45), (25, 46), (32, 55)], 5.0, rng, hairs=0, tail=0.1),
        *stroke([(32, 55), (39, 46), (50, 45), (60, 50)], 5.0, rng, press=0.7, hairs=2),
    ]
    # foundation (built on): three courses, the widest at the bottom
    S['stack'] = [
        *stroke(line((20, 20), (44, 20), -0.03), 6.0, rng, hairs=1, tail=0.3),
        *stroke(line((13, 34), (51, 34), 0.02), 7.0, rng, hairs=1, tail=0.3),
        *stroke(line((6, 49), (58, 49), -0.02), 8.0, rng, hairs=2, tail=0.3),
    ]
    return S


if __name__ == '__main__':
    S = icons()
    print('// Generated by scripts/brush-icons.py: do not edit by hand.')
    print('// Sumi brush icons (viewBox 0 0 64 64): `ink` is one filled path drawn in currentColor, `grid` the faint tile.')
    print(f"export const iconGrid = '{grid()}';")
    print('export const icons = {')
    for k, v in S.items():
        print(f"  {k}: '{''.join(v)}',")
    print('} as const;')
    print('export type IconName = keyof typeof icons;')

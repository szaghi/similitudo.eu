// Generated geometry for the site's mark: a 2:1-balanced quadtree refined where the ink is, and a tapered stroke.
// The same code draws the live hero (canvas, client side) and the still frames (SVG, build time), so the animated and
// the static marks are one geometry (BRAND rule: the mesh is finest where the ink is). Units are CSS pixels.

export type Pt = [number, number];

export interface Polyline {
  pts: Pt[];
  cum: number[]; // cumulative arc length at each vertex
  len: number;
}

export function polyline(pts: Pt[]): Polyline {
  const cum = [0];
  for (let k = 1; k < pts.length; k++) {
    cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  }
  return { pts, cum, len: cum[cum.length - 1] };
}

/** Point and unit normal at arc-length fraction t in [0, 1]. */
export function at(pl: Polyline, t: number): { p: Pt; n: Pt } {
  const target = Math.min(Math.max(t, 0), 1) * pl.len;
  let k = 1;
  while (k < pl.pts.length - 1 && pl.cum[k] < target) k++;
  const [a, b] = [pl.pts[k - 1], pl.pts[k]];
  const seg = pl.cum[k] - pl.cum[k - 1] || 1;
  const f = (target - pl.cum[k - 1]) / seg;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dl = Math.hypot(dx, dy) || 1;
  return { p: [a[0] + f * dx, a[1] + f * dy], n: [-dy / dl, dx / dl] };
}

/** Distance from p to the polyline and the arc-length fraction of the nearest point. */
export function nearest(p: Pt, pl: Polyline): { d: number; t: number } {
  let best = Infinity;
  let bestS = 0;
  for (let k = 1; k < pl.pts.length; k++) {
    const [ax, ay] = pl.pts[k - 1];
    const [bx, by] = pl.pts[k];
    const dx = bx - ax;
    const dy = by - ay;
    const l2 = dx * dx + dy * dy || 1;
    const u = Math.min(1, Math.max(0, ((p[0] - ax) * dx + (p[1] - ay) * dy) / l2));
    const d = Math.hypot(p[0] - (ax + u * dx), p[1] - (ay + u * dy));
    if (d < best) {
      best = d;
      bestS = pl.cum[k - 1] + u * Math.sqrt(l2);
    }
  }
  return { d: best, t: pl.len ? bestS / pl.len : 0 };
}

export interface QNode {
  l: number; // level, 0 = base block
  i: number;
  j: number;
  x: number;
  y: number;
  s: number; // edge length
  t: number; // arc-length fraction of the nearest ink: drives the reveal order
}

export interface Mesh {
  w: number;
  h: number;
  h0: number;
  internal: QNode[]; // split nodes: each one draws its cross
  leaves: number; // leaf blocks inside the domain
  maxLevelUsed: number;
}

export interface MeshOptions {
  w: number;
  h: number;
  h0: number; // base block size
  maxLevel: number;
  ink: Polyline;
  halfWidth: (t: number) => number; // ink half width at t
  k: number; // refine a node when the ink edge lies within k node sizes of its centre
  near?: (p: Pt) => { d: number; t: number }; // analytic distance to the ink, if cheaper than the polyline search
}

/**
 * Quadtree refined on the ink, then 2:1 balanced (a face neighbour is never more than one level finer), like an
 * AMR grid. The criterion scales with the node size, so the mesh is finest where the ink is.
 *
 * Cost: the live hero rebuilds this every frame, so nodes are keyed by a number (not a string) and the balance runs on a
 * worklist. A leaf can only become too coarse when it is created, or when a same-level face neighbour gains a split
 * child; so those are the only nodes (re)checked, instead of sweeping the whole tree until nothing changes. Both reach
 * the same tree: every refinement either way is forced, and the minimal 2:1-balanced refinement is unique.
 */
export function buildMesh(o: MeshOptions): Mesh {
  const nodes = new Map<number, QNode & { d: number }>();
  const split = new Set<number>();
  const B = 65536; // index stride: i, j < 2^16 per level (a 100 px block at level 5 → 200 000 px), keys stay < 2^53
  const key = (l: number, i: number, j: number) => (l * B + j) * B + i;

  const make = (l: number, i: number, j: number) => {
    const s = o.h0 / 2 ** l;
    const x = i * s;
    const y = j * s;
    if (x >= o.w || y >= o.h) return null;
    const c = o.near ? o.near([x + s / 2, y + s / 2]) : nearest([x + s / 2, y + s / 2], o.ink);
    const node = { l, i, j, x, y, s, t: c.t, d: c.d };
    nodes.set(key(l, i, j), node);
    return node;
  };

  const KIDS = [[0, 0], [1, 0], [0, 1], [1, 1]];
  const FACES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const refine = (n: QNode) => {
    split.add(key(n.l, n.i, n.j));
    const kids: (QNode & { d: number })[] = [];
    for (const [di, dj] of KIDS) {
      const c = make(n.l + 1, 2 * n.i + di, 2 * n.j + dj);
      if (c) kids.push(c);
    }
    return kids;
  };

  const queue: (QNode & { d: number })[] = [];
  const nx = Math.ceil(o.w / o.h0);
  const ny = Math.ceil(o.h / o.h0);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) queue.push(make(0, i, j)!);
  while (queue.length) {
    const n = queue.pop()!;
    if (n.l < o.maxLevel && n.d - o.halfWidth(n.t) < o.k * n.s) queue.push(...refine(n));
  }

  // 2:1 balance: a leaf whose face neighbour (same level) has a split child must split too.
  const tooCoarse = (n: QNode) =>
    FACES.some(([di, dj]) => {
      const ni = n.i + di;
      const nj = n.j + dj;
      if (ni < 0 || nj < 0 || !split.has(key(n.l, ni, nj))) return false;
      return KIDS.some(([a, b]) => split.has(key(n.l + 1, 2 * ni + a, 2 * nj + b)));
    });
  const work: QNode[] = [];
  for (const n of nodes.values()) if (!split.has(key(n.l, n.i, n.j))) work.push(n);
  while (work.length) {
    const n = work.pop()!;
    if (n.l >= o.maxLevel || split.has(key(n.l, n.i, n.j)) || !tooCoarse(n)) continue;
    work.push(...refine(n)); // the new leaves may be too coarse themselves
    if (n.l > 0) {
      // n's parent now has a split child: the parent's face neighbours may have become too coarse
      const pi = n.i >> 1;
      const pj = n.j >> 1;
      for (const [di, dj] of FACES) {
        const q = nodes.get(key(n.l - 1, pi + di, pj + dj));
        if (q) work.push(q);
      }
    }
  }

  const internal: QNode[] = [];
  let maxLevelUsed = 0;
  for (const n of nodes.values()) {
    if (split.has(key(n.l, n.i, n.j))) internal.push(n);
    if (n.l > maxLevelUsed) maxLevelUsed = n.l;
  }
  return { w: o.w, h: o.h, h0: o.h0, internal, leaves: nodes.size - split.size, maxLevelUsed };
}

/** Ensō: an open circle from angle a0, sweeping `sweep` radians (the blast front). */
export function enso(cx: number, cy: number, r: number, a0: number, sweep: number, n = 120): Polyline {
  const pts: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const a = a0 + (sweep * k) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return polyline(pts);
}

/** Exact distance to the ensō arc (O(1) per point, so a full-screen mesh can be rebuilt every frame). */
export function ensoNear(cx: number, cy: number, r: number, a0: number, sweep: number) {
  const TAU = 2 * Math.PI;
  const e0: Pt = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
  const e1: Pt = [cx + r * Math.cos(a0 + sweep), cy + r * Math.sin(a0 + sweep)];
  return (p: Pt) => {
    const rel = (((Math.atan2(p[1] - cy, p[0] - cx) - a0) % TAU) + TAU) % TAU;
    if (rel <= sweep) return { d: Math.abs(Math.hypot(p[0] - cx, p[1] - cy) - r), t: rel / sweep };
    const d0 = Math.hypot(p[0] - e0[0], p[1] - e0[1]);
    const d1 = Math.hypot(p[0] - e1[0], p[1] - e1[1]);
    return d0 < d1 ? { d: d0, t: 0 } : { d: d1, t: 1 };
  };
}

/** Closed outline of a tapered stroke along pl with full width width(t). */
export function taper(pl: Polyline, width: (t: number) => number, n = 220): Pt[] {
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const { p, n: nn } = at(pl, t);
    const h = width(t) / 2;
    left.push([p[0] + nn[0] * h, p[1] + nn[1] * h]);
    right.push([p[0] - nn[0] * h, p[1] - nn[1] * h]);
  }
  return [...left, ...right.reverse()];
}

const f1 = (v: number) => Math.round(v * 10) / 10;

export function polyPath(poly: Pt[]): string {
  return 'M' + poly.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ') + 'Z';
}

/** SVG path of the crosses of a set of split nodes (crisp hairlines). */
export function crossPath(nodes: QNode[]): string {
  return nodes
    .map((n) => {
      const cx = f1(n.x + n.s / 2);
      const cy = f1(n.y + n.s / 2);
      return `M${f1(n.x)},${cy}H${f1(n.x + n.s)}M${cx},${f1(n.y)}V${f1(n.y + n.s)}`;
    })
    .join('');
}

/** Thousands separator as a thin space, as in the readouts (`1 844`). */
export const thin = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

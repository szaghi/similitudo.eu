// The site's gesture: a cylindrical blast front (Sedov–Taylor, r ∝ t^½) drawn as an ensō, with the quadtree refined on
// it. One law for the live hero (canvas) and the still frames (SVG), so both are the same geometry.
import { buildMesh, enso, ensoNear, type Mesh, type Polyline } from './amr';

export interface FrontSpec {
  w: number;
  h: number;
  cx: number;
  cy: number;
  rmin: number;
  rmax: number;
  wmax: number; // stroke width of the young (strong) front
  h0: number;
  maxLevel: number;
}

export interface Front {
  ink: Polyline;
  width: (s: number) => number;
  mesh: Mesh;
  r: number;
}

/** Front at phase u in (0, 1]; `turn` rotates the ensō's gap slowly (seconds of animation). */
export function front(f: FrontSpec, u: number, turn = 0): Front {
  const r = f.rmin + (f.rmax - f.rmin) * Math.sqrt(u); // r ∝ t^½
  const strength = 1 - 0.55 * u; // the front weakens as it expands
  const a0 = -1.9 + 0.05 * turn;
  const sweep = 5.6;
  const ink = enso(f.cx, f.cy, r, a0, sweep, 160);
  const wmax = f.wmax * strength;
  const width = (s: number) => wmax * Math.pow(Math.sin(Math.PI * Math.min(Math.max(s, 0.003), 0.997)), 0.4) * (1 - 0.45 * s);
  const mesh = buildMesh({ w: f.w, h: f.h, h0: f.h0, maxLevel: f.maxLevel, ink, halfWidth: (s) => width(s) / 2, k: 1.0, near: ensoNear(f.cx, f.cy, r, a0, sweep) });
  return { ink, width, mesh, r };
}

/** Hero placement: right of centre on wide screens; on phones, in the free band between wordmark and nav. */
export function heroSpec(w: number, h: number, band?: { top: number; bottom: number }): FrontSpec {
  const wide = w >= 768;
  if (wide) {
    const rmax = Math.min(0.3 * h, 0.19 * w);
    return { w, h, cx: 0.75 * w, cy: 0.5 * h, rmin: 0.12 * rmax, rmax, wmax: 0.085 * rmax, h0: 100, maxLevel: 5 };
  }
  const top = band?.top ?? 0.2 * h;
  const bottom = band?.bottom ?? 0.5 * h;
  const rmax = Math.max(40, Math.min(0.46 * (bottom - top), 0.34 * w));
  return { w, h, cx: w - rmax - 0.08 * w, cy: (top + bottom) / 2, rmin: 0.12 * rmax, rmax, wmax: 0.09 * rmax, h0: 80, maxLevel: 5 };
}

export const STILL_U = 0.6; // the final frame: where the hero's single play ends, and the still on other pages

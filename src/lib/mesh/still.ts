// Still frame of the blast front as SVG paths, computed at build time (same law as the live hero).
import { crossPath, polyPath, taper, thin } from './amr';
import { front, STILL_U, type FrontSpec } from './front';

export interface Still {
  w: number;
  h: number;
  base: string; // level-0 block edges
  levels: { d: string; level: number }[]; // refinement crosses per level
  ink: string;
  stats: Stats;
}

/** What the readout reports: the deepest level drawn, the leaf count, the time. */
export interface Stats { max: number; leaves: number; u: number }

export function still(spec: FrontSpec, u = STILL_U): Still {
  const fr = front(spec, u);
  let base = '';
  for (let x = spec.h0; x < spec.w; x += spec.h0) base += `M${x},0V${spec.h}`;
  for (let y = spec.h0; y < spec.h; y += spec.h0) base += `M0,${y}H${spec.w}`;
  const levels = Array.from({ length: spec.maxLevel + 1 }, (_, l) => fr.mesh.internal.filter((n) => n.l === l))
    .filter((g) => g.length)
    .map((g) => ({ d: crossPath(g), level: g[0].l }));
  return { w: spec.w, h: spec.h, base, levels, ink: polyPath(taper(fr.ink, fr.width)), stats: { max: fr.mesh.maxLevelUsed, leaves: fr.mesh.leaves, u } };
}

/** The readout printed under the mark: the counts of the mesh actually drawn, in the template of the page's language
 *  (`readout` in src/i18n/<lang>.ts; not imported here, this module also runs in the browser). */
export const readout = (tpl: string, lang: string, s: Stats) =>
  tpl
    .replace('{max}', String(s.max))
    .replace('{leaves}', thin(s.leaves))
    .replace('{t}', s.u.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

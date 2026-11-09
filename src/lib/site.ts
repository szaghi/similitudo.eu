// Site-wide copy and navigation, shared by the hero, the header and the pages.
export const nav = [
  { href: '/capabilities/', label: 'Capabilities' },
  { href: '/codes/', label: 'Codes' },
  { href: '/people/', label: 'People' },
  { href: '/contact/', label: 'Contact' },
  // Parked until they have real content (docs/TODO.md): Projects, Publications.
];

/** Forwarded by Cloudflare Email Routing (receive only). */
export const email = 'contact@similitudo.eu';

export const lead =
  'Numerical methods and GPU-accelerated simulation software for research projects: adaptive grids, compressible flows, magnetohydrodynamics and plasmas, from a laptop to GPU clusters.';

// Partner profile: shown in the footer, not on the home page, until it is backed by projects (docs/TODO.md).
export const partner =
  'similitudo joins research projects as the partner for numerical methods and high-performance simulation: designing the schemes, writing the solvers, porting them to GPUs and verifying the results.';

/** Two-digit index label: 0 → "01". */
export const pad = (k: number) => String(k + 1).padStart(2, '0');

export const isCurrent = (path: string, href: string) => path === href || path.startsWith(href);

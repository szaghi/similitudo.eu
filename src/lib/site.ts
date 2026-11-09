// Site-wide copy and navigation, shared by the hero, the header and the pages.
export const nav = [
  { href: '/capabilities/', label: 'Capabilities' },
  { href: '/codes/', label: 'Codes' },
  { href: '/people/', label: 'People' },
  { href: '/contact/', label: 'Contact' },
  // Parked until it has real content (docs/TODO.md): Projects.
];

/** Forwarded by Cloudflare Email Routing (receive only). */
export const email = 'contact@similitudo.eu';

// Hero headline. Alternatives considered (2026-11-09): "Simulation software for fluids and plasmas, from the laptop to
// the GPU cluster." · "Adaptive grids. GPU speed. Research-grade simulation." · "High-order schemes on adaptive grids,
// built for GPUs and for research." · "We turn the equations of fluids and plasmas into fast, scalable simulations."
export const lead = 'Fluids and plasmas, simulated on adaptive grids at GPU speed.';

/** Meta description: the longer, plain statement of what the site is about. */
export const description =
  'Numerical methods and GPU-accelerated simulation software for research projects: adaptive grids, compressible flows, magnetohydrodynamics and plasmas, from a laptop to GPU clusters.';

// Partner profile: shown in the footer, not on the home page, until it is backed by projects (docs/TODO.md).
export const partner =
  'similitudo joins research projects as the partner for numerical methods and high-performance simulation: designing the schemes, writing the solvers, porting them to GPUs and verifying the results.';

/** Two-digit index label: 0 → "01". */
export const pad = (k: number) => String(k + 1).padStart(2, '0');

export const isCurrent = (path: string, href: string) => path === href || path.startsWith(href);

// Site-wide copy and navigation, shared by the hero, the header and the pages.
export const nav = [
  { href: '/expertise/', label: 'Expertise' },
  { href: '/codes/', label: 'Codes' },
  { href: '/about/', label: 'About me' },
  { href: '/contact/', label: 'Contact' },
  // Parked until it has real content (docs/TODO.md): Projects.
];

/** Forwarded by Cloudflare Email Routing (receive only). */
export const email = 'contact@similitudo.eu';

// Hero headline. Alternatives considered (2026-11-09): "Simulation software for fluids and plasmas, from the laptop to
// the GPU cluster." · "Adaptive grids. GPU speed. Research-grade simulation." · "High-order schemes on adaptive grids,
// built for GPUs and for research." · "We turn the equations of fluids and plasmas into fast, scalable simulations."
// Two lines on purpose: the break before "on adaptive grids" is part of the headline (2026-11-10).
export const lead = ['Fluids and plasmas, numerically simulated', 'on adaptive grids at GPU speed.'];

/** Meta description: the longer, plain statement of what the site is about. */
export const description =
  'Numerical methods and GPU-accelerated simulation software by Stefano Zaghi: adaptive grids, compressible flows, magnetohydrodynamics and plasmas, from a laptop to GPU clusters.';

/** Hero byline under the wordmark: whose portfolio this is. */
export const byline = { name: 'Stefano Zaghi', role: 'research scientist at CNR-IAC' };

// About: shown in the footer of every page. The site is a personal portfolio (since 2026-11-13; the startup-placeholder
// copy is archived in docs/startup-archive.md): similitudo is the name of the owner's work, not a company.
export const about =
  'similitudo is the name of my work on numerical methods and high-performance simulation: designing the schemes, writing the solvers, porting them to GPUs and verifying the results.';

/** Two-digit index label: 0 → "01". */
export const pad = (k: number) => String(k + 1).padStart(2, '0');

export const isCurrent = (path: string, href: string) => path === href || path.startsWith(href);

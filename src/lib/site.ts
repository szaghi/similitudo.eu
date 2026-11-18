// Site-wide navigation and constants. The words (labels, headline, byline, ...) are in the dictionaries, src/i18n/.
import type { Dict } from '../i18n/en';

export const nav: { href: string; key: keyof Dict['nav'] }[] = [
  { href: '/expertise/', key: 'expertise' },
  { href: '/codes/', key: 'code' },
  { href: '/about/', key: 'about' },
  { href: '/contact/', key: 'contact' },
  // Parked until it has real content (docs/TODO.md): Projects.
];

/** Forwarded by Cloudflare Email Routing (receive only). */
export const email = 'contact@similitudo.eu';

// Hero headline alternatives considered (2026-11-09), English: "Simulation software for fluids and plasmas, from the
// laptop to the GPU cluster." · "Adaptive grids. GPU speed. Research-grade simulation." · "High-order schemes on
// adaptive grids, built for GPUs and for research." · "We turn the equations of fluids and plasmas into fast, scalable
// simulations." The chosen one is `lead` in src/i18n/en.ts; the line break is part of it (2026-11-10).

/** Two-digit index label: 0 → "01". */
export const pad = (k: number) => String(k + 1).padStart(2, '0');

/** Is `href` the section of `path`? Both without their language prefix. */
export const isCurrent = (path: string, href: string) => path === href || path.startsWith(href);

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages: served at the root, so no `base`.
  site: 'https://similitudo.eu',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Pages renamed when the site became a personal portfolio (2026-11-13, docs/startup-archive.md): the old URLs keep
  // working. GitHub Pages has no server redirects, so Astro writes a meta-refresh page at each old path.
  redirects: {
    '/capabilities': '/expertise/',
    '/people': '/about/',
    '/people/publications': '/about/publications/',
  },
});

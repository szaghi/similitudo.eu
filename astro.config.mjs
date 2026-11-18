// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages: served at the root, so no `base`.
  site: 'https://similitudo.eu',
  trailingSlash: 'ignore',
  // Languages (src/i18n/index.ts): English at the root, the others under /it/, /fr/, /es/, /de/. The routing is the
  // pages' own ([...lang]); the sitemap only needs the map to write the hreflang alternates of every URL.
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it', fr: 'fr', es: 'es', de: 'de' } } })],
  // Pages renamed when the site became a personal portfolio (2026-11-13, docs/startup-archive.md): the old URLs keep
  // working. GitHub Pages has no server redirects, so Astro writes a meta-refresh page at each old path.
  redirects: {
    '/capabilities': '/expertise/',
    '/people': '/about/',
    '/people/publications': '/about/publications/',
  },
});

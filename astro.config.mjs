// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages: served at the root, so no `base`.
  site: 'https://similitudo.eu',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});

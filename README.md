# similitudo.eu

Sources of the [similitudo.eu](https://similitudo.eu) website: the brand front of similitudo, numerical methods and
GPU-accelerated simulation software for research projects.

- **Generator:** [Astro](https://astro.build) 7, static output.
- **Hosting:** GitHub Pages, built and deployed by GitHub Actions on every push to `main`
  (`.github/workflows/deploy.yml`); the site is public, the repository private.
- **Domain / DNS:** Cloudflare. `public/CNAME` holds the custom domain.
- **Identity:** the sumi family (ADAM, FLUME, PRISM): tokens in `src/styles/global.css`, source of truth
  `~/fortran/adam/docs/BRAND.md`. similitudo's mark is the shared seal (`src/components/Seal.astro`).

## Develop

```bash
npm install
npm run dev       # http://localhost:4321, draft entries included
npm run build     # production build into dist/, drafts excluded
npm run preview   # serve dist/
```

## Content

| What | Where | Format |
|---|---|---|
| Codes | `src/content/codes/*.md` | frontmatter + body |
| Projects | `src/content/projects/*.md` | frontmatter + body |
| People | `src/content/people/*.md` | frontmatter + body |
| Publications | `src/data/publications.yaml` | one keyed entry each |

Schemas live in `src/content.config.ts`; a missing or malformed field fails the build. Set `draft: true` to keep an
entry out of production while still seeing it in `npm run dev`. Search for `TODO` to find unfinished copy.

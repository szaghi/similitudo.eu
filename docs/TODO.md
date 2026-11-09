# similitudo.eu: TODO

Pages and copy that are parked until they have real content. The rule: the site shows only what is true and complete
today. An empty page ("in preparation", "(00)") advertises a gap instead of filling it.

## Parked pages

Each parked page keeps its file with a leading underscore (Astro does not route `_`-prefixed pages, so it is out of the
build and the sitemap). The collections, schemas and components stay. **To restore:** rename the file without the
underscore, add the entry back to `nav` in `src/lib/site.ts`, and, where noted, put the home section back.

| Page | File | Bring back when | Also restore |
|---|---|---|---|
| Projects | `src/pages/_projects.astro` | at least two real entries in `src/content/projects/` (`draft: false`) | home section `04 — Projects` (`<ProjectRows projects={…} dense />`, newest three, link to `/projects/`) in `src/pages/index.astro` |
| Publications | `src/pages/_publications.astro` | real entries in `src/data/publications.yaml` | — |
| Contact | `src/pages/_contact.astro` | an address exists (Cloudflare Email Routing is active: forward e.g. `contact@similitudo.eu`; never add `v=spf1 -all`) | footer call "Preparing a proposal? → Get in touch" in `src/components/Footer.astro` (see git history, commit c66ac12) |

## Copy

- **Partner profile** (`partner` in `src/lib/site.ts`, home `01`): refine to two or three sentences on the role
  similitudo plays in a proposal.
- **Capabilities** (`src/data/capabilities.ts`): phrase each as a work-package role; add `evidence` where it exists.
  "Verification and validation" has none yet, so none is shown.
- **People** (`src/content/people/stefano-zaghi.md`): short bio (background, research focus, codes, funded projects),
  confirm the title, ORCID, CV PDF in `public/cv/`.
- **Codes** (`src/content/codes/*.md`): what each code brings to a project (scale reached, validation, a figure).

## Placeholders to replace or delete

- `src/content/projects/example.md` and the `example-placeholder` entry in `src/data/publications.yaml` (both
  `draft: true`, never built).

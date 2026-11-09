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

## Copy

- **Partner profile** (`partner` in `src/lib/site.ts`): shown low-key in the footer of every page, not on the home
  page, until projects back it. Bring it back to the home page with the Projects section; refine it to two or three
  sentences on the role similitudo plays in a proposal.
- **Capabilities** (`src/data/capabilities.ts`): phrase each as a work-package role; add `evidence` where it exists.
  "Verification and validation" has none yet, so none is shown.
- **People** (`src/content/people/stefano-zaghi.md`): bio written (sources: the CV `.tex` files, ORCID, CNR
  IRIS). Still to do: confirm the title, CV PDF in `public/cv/`, update the ORCID record (it still says CNR-INSEAN).
- **Codes** (`src/content/codes/*.md`): what each code brings to a project (scale reached, validation, a figure).

## Mail

- `contact@similitudo.eu` is on the site (footer, Contact page). Cloudflare Email Routing only *receives*: replying
  from that address needs Gmail "Send mail as" through an SMTP relay. A DMARC record (`_dmarc`, start with `p=none`)
  is not set yet.

## Placeholders to replace or delete

- `src/content/projects/example.md` and the `example-placeholder` entry in `src/data/publications.yaml` (both
  `draft: true`, never built).

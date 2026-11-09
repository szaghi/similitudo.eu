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

## Copy

- **Partner profile** (`partner` in `src/lib/site.ts`): shown low-key in the footer of every page, not on the home
  page, until projects back it. Bring it back to the home page with the Projects section; refine it to two or three
  sentences on the role similitudo plays in a proposal.
- **Capabilities** (`src/data/capabilities.ts`): phrased as assignable tasks, each linked to the documentation
  (ADAM landing page for generic items, the FLUME / PRISM starting pages for theirs) (2026-11-09).
  Refine the wording as projects come in.
- **People** (`src/content/people/stefano-zaghi.md`): bio written (sources: the CV `.tex` files, ORCID, CNR
  IRIS). Still to do: confirm the title, CV PDF in `public/cv/`, update the ORCID record (it still says CNR-INSEAN).
- **Codes** (`src/content/codes/*.md`): figure, verified numbers and paper added (2026-11-09). Gaps: no clean
  FLUME or PRISM performance figure yet (FLUME's speedup matrix is still `TBD`); no FLUME or PRISM paper; the figures
  are 720 px wide (soft on high-DPI screens): re-render larger posters from the existing runs when convenient.
- `contact@similitudo.eu` is on the site (footer, Contact page). Cloudflare Email Routing only *receives*: replying
  from that address needs Gmail "Send mail as" through an SMTP relay. A DMARC record (`_dmarc`, start with `p=none`)
  is not set yet.

## Publications

- `src/data/publications.yaml` was generated on 2026-11-09 from the CV's `publications.bib` (journal, chapter and
  conference entries), DOIs completed from ORCID and checked at doi.org. Edit it by hand from now on. The NATO chapter
  (`broglia-2016-incol`) has no link: its DOI in the bib, `10.14339/STO-TR-AVT-183`, does not resolve; fix it in the
  bib too.

## Placeholders to replace or delete

- `src/content/projects/example.md` (`draft: true`, never built).

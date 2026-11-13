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

- **Portfolio, not startup** (2026-11-13): the site speaks in the first person as Stefano Zaghi's portfolio; the
  startup-placeholder copy and how to bring it back are in `docs/startup-archive.md`. If similitudo becomes a
  registered business, also add the legal notice and the VAT number Italian law then requires.
- **About** (`about` in `src/lib/site.ts`, footer of every page): similitudo is the name of the owner's work, never a
  company or consortium partner.
- **Expertise** (`src/data/capabilities.ts`, page `/expertise/`): one line per area on what the work is, each linked to
  the documentation (ADAM landing page for generic items, the FLUME / PRISM starting pages for theirs).
- **About me** (`src/content/people/stefano-zaghi.md`, page `/about/`): first-person bio (sources: the CV `.tex` files,
  ORCID, CNR IRIS). Still to do: CV PDF in `public/cv/`, update the ORCID record (it still says CNR-INSEAN).
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

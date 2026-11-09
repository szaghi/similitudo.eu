# Look lab brief: sumi × architecture

Agreed 2026-11-09. This brief is the starting point of the look-lab session: read it, do not re-derive it.

## Context

- The site is live at https://similitudo.eu (Astro 7, GitHub Pages via Actions, Cloudflare DNS, all records DNS-only).
  The current look is the plain sumi scaffold (washi / silver ink, Shippori Mincho wordmark, seal), so it is a placeholder.
- **Audience:** research and industrial partners (consortium coordinators) assembling proposals. They skim before
  deadlines: the mood can be bold, body text must stay legible.
- **Content to design for**, not only a hero: Capabilities, Codes (ADAM, FLUME, PRISM, later libraries), Projects
  (the key page), Publications, People (CV minor), Contact. Xall and related codes are out of scope.
- **Taste references** (template demos on formgong.com, fictional studios):
  - https://quell.formgong.com/: full-bleed atmospheric photo, giant *extended* grotesk (Archivo, wide axis) split
    across opposite corners, one hairline rule carrying a 5-column nav, near-monochrome.
  - https://lattice.formgong.com/: flat charcoal with a faint construction grid, thin uppercase Montserrat, numbered
    mono labels (IBM Plex Mono, `01.`), symmetric layout, one `<canvas>` point-cloud object with its parameters
    printed underneath (`points 1700 · rot 0.09 rad · blob 0.04`).
  - Re-screenshot them with the headless shell in `~/.cache/ms-playwright/chromium_headless_shell-1208/`
    (`--virtual-time-budget=8000 --window-size=1440,900 --screenshot=...`).
- Peer sites in the field (CFD/HPC SMEs in EU projects) were judged visually dated: they are a content benchmark only.

## The concept

**Structure against gesture.** A rigid grid that refines where the gesture is: that is adaptive mesh refinement,
and it is already the sumi brand rule (`~/fortran/adam/docs/BRAND.md`: "the mesh is finest where the ink is"). The
lineage is real: sumi-e → *ma* (meaningful empty space) → modern Japanese architecture (Ando's concrete and light,
SANAA's white volumes). The modernisation is a shift of emphasis: the brushed mesh becomes crisp construction lines,
washi becomes flat plaster.

## Blend rules

**Main rule: architecture is the system, sumi is the accent (about 80/20).** Per screen: at most *one* ink stroke and
*one* seal. Equal-strength mixing produces neither style.

| | From architecture (the system) | From sumi (the accent) |
|---|---|---|
| Ground | Flat plaster off-white, cooler than washi; dark mode in sumi charcoal (the Lattice ground) | — |
| Structure | The AMR quadtree as crisp hairline construction lines, visible on the page | The grid refines under the stroke |
| Type | Extended grotesk display (Archivo, `wdth` 112–125), Inter body, mono for numbered labels and readouts | — |
| Layout | Asymmetric, huge type anchored to edges, hairline rules, numbered project indexes | *Ma*: emptiness is deliberate |
| Gesture | — | One ink stroke per view (a shock front, a flow line): the only organic line |
| Colour | Monochrome | The vermilion seal: the only colour on the site |

**Dropped:** paper texture; amber in dark mode (the seal stays vermilion in both themes); Shippori Mincho except as an
optional wordmark (variant B3 only).

**Protection against "Japanese theme" kitsch** for a Latin-named EU brand: the 80/20 rule. A seal and an ink stroke read
as "ink and stamp", which is universal.

## Seed tokens (starting points: tune them, and check contrast)

| Token | B1 Plaster (light) | B2 Charcoal (dark) |
|---|---|---|
| ground | `#ecebe6` | `#1b1b1a` |
| ground-alt | `#e3e1db` | `#151514` |
| ink / text-1 | `#151515` | `#e6e4de` |
| text-2 | `#55534e` | `#a19e97` |
| hairline / grid | `#c8c5bd` | `#2f2e2b` |
| seal | `#c73e1d` | `#d9472a` |
| link | darker than the seal on plaster (≥ 4.5:1) | lighter vermilion (≥ 4.5:1) |

Contrast: body text ≥ 4.5:1, large display ≥ 3:1, the seal as a graphic ≥ 3:1. Lattice's thin grey-on-charcoal text is
the counter-example: keep the mood, not the contrast.

Fonts, self-hosted via Fontsource (no Google Fonts requests: GDPR):
`@fontsource-variable/archivo` (has `wdth.css`, width axis 62–125), `@fontsource-variable/inter` (already installed),
`@fontsource/ibm-plex-mono` (or another mono), `@fontsource/shippori-mincho` (already installed, B3 only).
Fun fact: the ADAM brand v2 package (`~/fortran/adam-brand-2026-11-07`) already used Archivo 800 for its wordmark.

## The hero

Plaster (or charcoal) ground, crisp quadtree, one stroke crossing it while the grid refines underneath, the seal stamped
last, `similitudo` huge in extended type anchored to a corner, a mono readout of *real* parameters underneath (e.g.
`levels 7 · blocks 1 844 · CFL 0.4`). Rules: `prefers-reduced-motion` shows the final frame; the text never waits for
the animation; the animation is generated geometry (quadtree + tapered stroke), consistent with the static marks.

Alternative hero material (Quell-like full-bleed): existing FLUME runs in `~/fortran/adam/docs/public/` and its
`gallery/`, e.g. `forward-facing-step-{light,dark}.{png,webm,mp4}`, `orszag-tang-{light,dark}.*`, `flume/blast.png`.
Use existing images and videos only: **the GPU is reserved for ADAM tests**, so do not run simulations for imagery.

## The lab

Three positions along the slider, each with a **home page** and a **project index page** (numbered rows with hairline
rules: `01 · FLUME · Compressible MHD · 2026`), in light, dark and phone width (390 px):

- **B1 "Plaster":** light ground, crisp grid, extended grotesk, one stroke, seal. The architectural end.
- **B2 "Charcoal":** sumi-charcoal ground, a live quadtree `<canvas>` with a parameter readout (Lattice-like), seal.
- **B3 "Ink":** the control. Mincho wordmark, warmer paper, a larger brushed stroke; closest to the current site.

Implementation:
- Lab pages live in the real site, so they use the real content, fonts and components, but are **never published**:
  `src/pages/lab/[variant].astro` (and `lab/[variant]/projects.astro`) whose `getStaticPaths()` returns `[]` when
  `import.meta.env.PROD`, so nothing reaches the production build. Check `dist/` after `npm run build`.
- Each variant is a token set (a scoped CSS file or a `data-look` attribute) plus its hero and layout components.
- Deliverable: a **local** comparison sheet (an HTML page or a PNG montage of the screenshots) that Stefano opens in a
  browser. **No claude.ai Artifacts.**
- Iterate by recombination ("B1's hero with B2's palette"); the winner becomes `src/styles/global.css` and the real
  components. The lab folder is deleted afterwards.

## Open points (not blocking the lab)

- **Family consistency:** the ADAM, FLUME and PRISM docs keep the warm sumi palette with an amber accent in dark mode.
  Either they follow the parent later, or they differ on purpose and the seal ties them together.
- Contact address: Email Routing is already active on Cloudflare (MX and SPF records present; never add `v=spf1 -all`).
- Content TODOs in the scaffold (bio, project entries, capability evidence).

## Working rules

Trunk only (`main`), no branches; never commit or push (Stefano does); no claude.ai Artifacts; fonts self-hosted;
mobile without horizontal page scroll; reduced-motion safe.

## Outcome (2026-11-09)

- Four looks were built and compared (B1 Plaster, B2 Charcoal, B3 Ink, then B4 = B1 + B2). **B4 was picked and
  promoted**; the lab (`src/lab/`, its routes, the screenshots) was deleted afterwards.
- B4: B1's system (extended Archivo wordmark top-left with the seal, the nav on a hairline datum, numbered indexes,
  plaster / charcoal) with B2's live object as the hero ground: a cylindrical blast front (r ∝ t^½) drawn as an ensō,
  the quadtree refining on it and coarsening behind it, the readout printing the mesh actually drawn.
- The hero **plays once** (3.2 s), holds the final frame (t = 0.60, the same frame as the still marks on inner pages)
  and replays when the pointer reaches the ring. Reason: a looping, expanding ring reads as a loading spinner, and it
  costs CPU for as long as the hero is visible.
- B3 (Mincho, washi, brushed stroke) was rejected as closest to the "Japanese theme" risk; Shippori Mincho was
  uninstalled. Amber is gone from the parent site; the seal is vermilion in both themes.
- **Lesson:** a `getStaticPaths()` that returns `[]` in production does *not* keep a page out of the build: Vite still
  bundles the page module and emits its CSS and fonts into `dist/_astro/`. A dev-only page needs routes injected by an
  integration only when `command === 'dev'` (`injectRoute` in `astro:config:setup`).
- **Not used:** the FLUME gallery media (720 px, colour-mapped frames) cannot carry a full-bleed hero; that would
  need new greyscale renders at about 2880 px from existing outputs.

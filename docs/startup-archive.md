# similitudo.eu: the startup placeholder, archived

From 2026-11-09 to 2026-11-13 the site stood in for a future startup: similitudo presented as a partner that research
projects hire for numerical methods and simulation. On 2026-11-13 it became Stefano Zaghi's personal portfolio, in the
first person, until the company exists. This file records what the placeholder said and how to bring it back.

## The snapshot

The last startup-placeholder commit is `ccdd8da` (`feat: give matisse its logo`). Tag it once (signed, from a terminal):

```sh
git tag -s startup-placeholder ccdd8da -m "similitudo.eu as startup placeholder, before the portfolio switch"
git push origin startup-placeholder
```

`git show startup-placeholder:<path>` then returns any file as it was. Do not restore by checking the tag out: codes and
logos added since would be lost. Re-apply the copy below on top of the current `main`.

## What changed

| Where | Startup placeholder | Portfolio |
|---|---|---|
| Nav (`src/lib/site.ts`) | Capabilities `/capabilities/` · Codes · People `/people/` · Contact | Expertise `/expertise/` · Codes · About me `/about/` · Contact |
| Pages | `src/pages/capabilities.astro`, `people.astro`, `people/publications.astro` | `expertise.astro`, `about.astro`, `about/publications.astro`; old URLs redirect (`astro.config.mjs`) |
| Meta description (`description`) | "…simulation software for research projects: adaptive grids, …" | "…simulation software by Stefano Zaghi: adaptive grids, …" |
| Footer About (`partner` → `about`) | "similitudo is the name under which Stefano Zaghi works with research projects on numerical methods and high-performance simulation: …" | "similitudo is the name of my work on numerical methods and high-performance simulation: …" |
| Hero | wordmark, headline | wordmark, byline "by Stefano Zaghi, research scientist at CNR-IAC" (`byline`), headline |
| Home | "01 — Capabilities", "All capabilities", link `/people/publications/` | "01 — Expertise", "Details and documentation", link `/about/publications/` |
| Capabilities / Expertise page | description "What Stefano Zaghi brings to a research project."; lead "Tasks a research project can assign, each with the documentation behind it." | description "What Stefano Zaghi works on: …"; lead "What I work on, each area with the documentation behind it." |
| Task lines (`src/data/capabilities.ts`) | "Adaptive-grid infrastructure for a project solver" · "A verification work package a project can cite" · "Maintainable, tested Fortran for the codes of a project" · "The literature review of a work package, kept current through the project" | "Adaptive-grid infrastructure for solvers" · "Evidence that a solver is right, on CPU and GPU" · "Maintainable, tested Fortran that other projects reuse" · "Literature reviews that stay current" (the other five unchanged) |
| People / About me page | title "People"; description "Stefano Zaghi, the person behind similitudo."; role "Lead scientist and developer" | title "About me"; role "Research scientist" |
| Bio (`src/content/people/stefano-zaghi.md`) | third person ("Stefano Zaghi is a research scientist …") | first person ("I am a research scientist …") |
| Publications page | crumb "People / Stefano Zaghi"; lead "Stefano Zaghi: journal articles, …" | crumb "About me / Publications"; lead "My journal articles, …" |
| Contact | description "Get in touch about a research project."; lead "Preparing a proposal and looking for a partner in numerical methods and simulation? Write to us." | description "How to reach Stefano Zaghi."; lead "A question about one of the codes, or an idea for a collaboration? Write to me." |
| Codes lead | "Open-source simulation codes by Stefano Zaghi and co-authors, …" | "Open-source simulation codes I write with co-authors, …" |
| Privacy | "This site is run by Stefano Zaghi."; "a personal inbox … It is used only to reply to you" | "I, Stefano Zaghi, run this site."; "my personal inbox … I use it only to reply to you" |
| JSON-LD Person `url` (`src/layouts/Base.astro`) | `/people/` | `/about/` |

Unchanged on purpose: the identity (wordmark, seal, ensō hero), `contact@similitudo.eu`, the code pages, the parked
Projects page (`src/pages/_projects.astro`, whose copy "Research projects similitudo takes part in" is startup copy:
rewrite it in either voice before un-parking), and the internal names (`capabilities.ts`, `CapabilityRows`, the
`people` collection).

## Bringing the startup back

1. Re-apply the left column above (`git show startup-placeholder:<path>` for the exact text); decide whether the hero
   byline stays (a founder's name under the brand is common).
2. Keep the redirects, pointing the other way if the URLs change back, so links shared in the portfolio period work.
3. If the company is registered: legal notice and VAT number (`docs/TODO.md`), JSON-LD `Organization` instead of a
   `Person` publisher.

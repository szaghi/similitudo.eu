---
name: FoBiS
tagline: Build, test, verify, lint and release modern Fortran, one repository or many, with AI assistance that cites a source for every claim.
kind: tool
order: 4
status: active
license: GPLv3
repo: https://github.com/szaghi/FoBiS
docs: https://szaghi.github.io/FoBiS/
methods:
  - Module, use and include dependencies parsed from the sources, compiled in order, incrementally, in parallel
  - fobos files for build modes, profiles, feature flags and rules, in place of makefiles
  - Dependencies fetched from GitHub at a tag, branch, commit or semver range, and locked
  - Test runner, doctests in documentation comments, coverage with a CI threshold
  - Numerical results compared with references within tolerances, across compilers and revisions
  - A linter that sees the build, OpenMP, OpenACC and MPI defects included
  - Many repositories managed as one, a dashboard, checks downstream, the release train
  - AI assistance on a local model, build and crash explanations, answers, tests, reviews, commits, merges, each claim citing its sources
  - An MCP server giving any AI agent the same tools
parallelism:
  - Parallel compilation in dependency order
  - Cases, tests and benchmarks submitted through Slurm
figures:
  - src: /codes/fobis/build.png
    width: 800
    height: 650
    alt: "A terminal session: a project tree with nested modules and an include, then fobis build with no fobos file compiling it in dependency order"
    caption: "A first build: a project of nested modules and an include, no makefile and no fobos file; fobis build reads the sources and compiles them in dependency order."
    source: https://szaghi.github.io/FoBiS/tutorial/first-steps/01-first-build
    animated: true
  - src: /codes/fobis/ecosystem.png
    dark: /codes/fobis/ecosystem-dark.png
    width: 1200
    height: 630
    alt: "The fobis ecosystem dashboard: three projects with their branch, tree, upstream, version, unreleased changes, CI, drift and stale pins, the release order and the dependency graph"
    caption: "Many repositories as one: the ecosystem dashboard of three projects, with unreleased changes, stale pins, the release order and the dependency graph."
    source: https://szaghi.github.io/FoBiS/cookbook/ecosystem
---

**FoBiS** (Fortran Building System; the Python package is FoBiS.py, the command `fobis`) builds modern Fortran
projects with no makefile: it parses every source for modules, uses and includes, and compiles in dependency order,
incrementally and in parallel. A short INI-style `fobos` file names the modes, profiles and rules. Around the build it
fetches and locks dependencies from GitHub, runs tests, doctests and coverage, compares numerical results with
references, lints with the defines of the build, and manages many repositories as one.

Its AI assistance works on facts. FoBiS knows every source, the module graph, the build modes and the history; a
deterministic step answers first, and often no model is needed. When one is, it runs on your machine by default and
sees a context FoBiS assembles: every claim must cite a numbered source, and FoBiS drops those that cite nothing it
gave. A generated test is kept only when it builds, runs and checks something, and nothing is written without
`--apply`. An MCP server gives any agent the same tools.

Every Fortran code on this site is built with it, in its CI too. Outside them, Eawag's Simstrat lake model builds with FoBiS.

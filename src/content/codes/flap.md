---
name: FLAP
tagline: Command lines for Fortran programs, described once, parsed, checked and documented.
kind: general
order: 13
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/FLAP
docs: https://szaghi.github.io/FLAP/
logo: /codes/flap
methods:
  - Options, positionals, flags, counters, lists and KEY=VALUE maps, typed for every kind
  - Validation declared with the definition, ranges, choices, paths, exclusive sets
  - Errors with suggestions and a named code for each
  - git-style commands with their own options and help
  - Values from the command line, the environment, INI files and defaults, with their source reported
  - Help, man page, Markdown and bash, zsh, fish and PowerShell completions generated
  - JSON description, validate-only and dry-run modes for scripts and AI agents
figures:
  - src: /codes/flap/quickstart.svg
    width: 769
    height: 595
    alt: "A terminal session of a FLAP program: its help, some runs, a typo and an out-of-range value"
    caption: "The quick start, a real session: the help, a few runs, a typo answered with a suggestion and a value out of its range, all written by FLAP from the definitions."
    source: https://szaghi.github.io/FLAP/#quick-start
    animated: true
    hold: 28
  - src: /codes/flap/agents.svg
    width: 677
    height: 519
    alt: "A terminal session of a FLAP program answering another program: its JSON description, a rejected command line, a JSON error, an exit status and a dry run"
    caption: "Called by other programs: the same definitions give a JSON description, a rejected command line answered by a JSON error and an exit status, and a dry run."
    source: https://szaghi.github.io/FLAP/manual/tutorial/10-agents
    animated: true
    hold: 28
---

**FLAP** (*F*ortran command *L*ine *A*rguments *P*arser) is a pure Fortran 2018 library: a program describes its command
line once, and FLAP parses it, reads the environment and the configuration files, checks every value, and writes the
help, the errors, the man page and the shell completions. From three options to git-style commands, with a handful of
calls. The same definitions tell scripts and AI agents how to call the program: a JSON description, a validate-only
mode, a dry run, and JSON errors with exit statuses.

In the open since 2014.

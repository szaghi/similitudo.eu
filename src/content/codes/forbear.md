---
name: forbear
tagline: Progress bars for long-running Fortran programs, on a terminal or in a batch log.
kind: general
order: 21
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/forbear
docs: https://szaghi.github.io/forbear/
logo: /codes/forbear
methods:
  - One object, three calls, initialize, start, update
  - Layout templates with fields of your own, a solver residual for one
  - ETA, speed, count and a closing summary
  - Lines printed above the running bar, suspend and resume
  - Nested bars, open-ended loops, early exits
  - Plain lines in a batch log, no carriage returns or escape codes
  - Colours, 24-bit RGB, Unicode partial blocks, spinners, themes
figures:
  - src: /codes/forbear/run.png
    width: 1100
    height: 330
    alt: "A pretend CFD run: a mesh bar, then nested time-step and Newton bars, with checkpoints printed above, a residual and the ETA, and a closing summary"
    caption: "A pretend CFD run: a mesh bar, then the solver's bar with checkpoints printed above it, the residual and the ETA, and a closing summary; every frame drawn by forbear."
    source: https://szaghi.github.io/forbear/
    animated: true
---

**forbear** (*For*tran progress *b(e)ar*; the `e` is mute) is a pure Fortran 2008 library of progress bars, spinners,
ETA and messages for long-running programs: one object, three calls. On a terminal the bar animates in place, with
lines printed above it and fields of your own, such as the residual of a solver. In the log of a batch job it writes a
plain line every 10 %, with no carriage returns or escape codes.

It draws its colours with FACE.

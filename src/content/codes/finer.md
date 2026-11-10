---
name: FiNeR
tagline: INI configuration files read and written from Fortran.
kind: general
order: 12
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/FiNeR
docs: https://szaghi.github.io/FiNeR/
methods:
  - INI parsed from a file or from a string, no schema
  - Continuation lines and inline comments
  - Values of any PENF kind, scalars and arrays, integer, real, logical, character
  - INI generated in code, added, deleted, saved or printed
  - Sections and options queried, counted and looped over
  - Configurable separators and comment characters
---

**FiNeR** (*F*ortran *IN*I Pars*eR* and generator) is a pure Fortran 2003+ library for INI configuration files: one
`file_ini` type parses a file or a string with no schema, returns options as values of any kind, scalars or arrays,
and builds, edits and saves INI files from code. Sections and options can be queried, counted and looped over.

ADAM, FLUME and PRISM read their input files with FiNeR.

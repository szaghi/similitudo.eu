---
name: MORTIF
tagline: Morton (Z-order) encoding of 2D and 3D integer indexes, in pure Fortran.
kind: library
order: 8
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/MORTIF
docs: https://szaghi.github.io/MORTIF/
logo: /codes/mortif
methods:
  - Two 32-bit indexes to one 64-bit Morton code and back (morton2D, demorton2D)
  - Three indexes to one 64-bit code and back, up to 21 bits per axis (morton3D, demorton3D)
  - Exact round trip, bit for bit
  - Significant bits per axis chosen at the call
  - Elemental, on scalars or whole arrays; no range checks, allocations or system calls
---

**MORTIF** (*MOR*ton *I*ndexer, Z-order, *F*ortran) is a small pure Fortran 2003+ library that interleaves the bits of
two or three integer indexes into one 64-bit Morton code, and back. Along the Z-order curve, cells close in space get
close codes: the ordering an adaptive tree needs to store its blocks, find their neighbours and split them among
processes.

ADAM orders the blocks of its AMR tree with MORTIF.

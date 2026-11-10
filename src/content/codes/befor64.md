---
name: BeFoR64
tagline: Base64 encoding and decoding of any Fortran intrinsic type.
kind: general
order: 13
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/BeFoR64
docs: https://szaghi.github.io/BeFoR64/
methods:
  - Integers, reals (16 bytes optional), characters, unlimited polymorphic
  - Scalars and rank-1 arrays, encoded and decoded symmetrically
  - Mixed-kind arrays packed into one byte stream
  - Pure Fortran 2003+, no C
---

**BeFoR64** (*B*ase64 *e*ncoding/decoding *Fo*r Fortran) is a small pure Fortran 2003+ library that encodes and decodes
any intrinsic type, scalar or array, to and from Base64 strings, including unlimited polymorphic variables and arrays of
different kinds packed into one stream. Its API is three procedures: `b64_init`, `b64_encode`, `b64_decode`.

VTKFortran writes its inline binary VTK format with it, and StringiFor's Base64 methods call it. Outside these codes, the
easifem finite-element library uses it.

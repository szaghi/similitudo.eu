---
name: PENF
tagline: Portable kind parameters for Fortran, and the conversions between numbers and strings.
kind: general
order: 13
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/PENF
docs: https://szaghi.github.io/PENF/
methods:
  - Integer kinds of 1 to 8 bytes, real kinds of 4, 8 and 16 bytes
  - Numbers to strings and back, zero-padded and binary forms
  - Format strings and representable limits for every kind
  - Bit and byte sizes, endianness detection
  - Pure Fortran 2003+, no C, no other dependency
---

**PENF** (*P*ortability *E*nvironment for *F*ortran) is a small pure Fortran 2003+ library of portable, named kind
parameters (`I1P` to `I8P`, `R4P` to `R16P`) with what goes with them: format strings, representable limits, bit and
byte sizes, endianness, and the conversions between numbers and strings in both directions.

It is the base layer of the other libraries here: VTKFortran, MOTIOn, FOSSIL, StringiFor and BeFoR64 are written on its
kinds, and so is ADAM. Outside these codes, the FPL parameter-list library uses it.

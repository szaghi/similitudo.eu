---
name: FUNDAL
tagline: One Fortran API for GPU programming over OpenACC and OpenMP offloading, plus a CPU mode, chosen at compile time.
kind: library
order: 6
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/FUNDAL
docs: https://szaghi.github.io/FUNDAL/
methods:
  - Structured and unstructured device memory
  - Allocate-and-copy, transposed copies
  - Portable kernel macros (one loop, OpenACC and OpenMP directives)
  - Allocation registry (leak and double-free detection)
parallelism:
  - OpenACC
  - OpenMP offloading
  - Compile-time CPU mode
  - MPI multi-device (one device per rank)
---

**FUNDAL** (*F*ortran *UN*ified *D*evice *A*cceleration *L*ibrary) is a pure Fortran library that gives one API for
device memory and kernels over OpenACC and OpenMP offloading, plus a CPU mode: the backend is chosen by a macro at
compile time, and the same `dev_*` calls and the same kernel source build for each. It refuses a silent fallback to
the host when a device is required, and keeps a registry of allocations that catches double frees and reports leaks.

ADAM's GPU backend manages device memory through FUNDAL: that is how ADAM, FLUME and PRISM run on NVIDIA GPUs
(OpenACC, nvfortran) and AMD GPUs (OpenMP offloading, amdflang) from one source.

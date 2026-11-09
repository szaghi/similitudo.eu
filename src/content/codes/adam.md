---
name: ADAM
tagline: A physics-agnostic Fortran SDK for adaptive grids, and its solvers, from a laptop to GPU clusters.
kind: sdk
order: 1
status: active
license: MIT / LGPLv3
repo: https://github.com/szaghi/adam
docs: https://szaghi.github.io/adam/
logo: /codes/adam
methods:
  - Block-structured AMR (Morton-ordered octree/quadtree)
  - Immersed boundaries
  - WENO reconstruction
  - Runge-Kutta integration
  - FLAIL elliptic solvers
  - Parallel I/O
parallelism:
  - MPI
  - OpenMP
  - OpenACC (nvfortran)
  - OpenMP offloading (amdflang)
---

**ADAM** (*A*ccelerated fluid *D*ynamics on *A*daptive *M*esh refinement grids) is a modern Fortran library for
block-structured adaptive grids, with a CPU backend (MPI, OpenMP) and a GPU backend (OpenACC with nvfortran, or OpenMP
offloading with amdflang). Solvers are built on it by supplying their equations.

<!-- TODO: what ADAM brings to a research project: scale reached, validation evidence, a showcase figure. -->

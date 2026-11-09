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
figure:
  src: /codes/adam/figure.png
  dark: /codes/adam/figure-dark.png
  width: 720
  height: 262
  alt: Density of a Mach 3 flow over a forward-facing step, on adaptive quadtree blocks
  caption: "Woodward–Colella Mach 3 step, density to t = 4 on a forest of three quadtree realms, base spacing 1/80 with static refined boxes; the inter-realm seams dashed. Run with FLUME on ADAM."
  source: https://szaghi.github.io/adam/
evidence:
  - kind: performance
    test: "Strong scaling, shock–sphere with immersed boundary, up to 7008 blocks (about 3.6 M cells), V100 GPUs of Marconi100 (CINECA)"
    result: "close to ideal up to 8 GPUs (superlinear); efficiency close to 90% at 16 GPUs; below 60% at 32 GPUs"
    source: https://doi.org/10.1016/j.compfluid.2023.106040
  - kind: performance
    test: "FLAIL multigrid Poisson solve, 3.9 M AMR cells, periodic (medooza)"
    result: "0.33 s on one A30 GPU, 0.12 s on four; 1.6 s on a 16-rank CPU node (different coarse-level solvers)"
    source: https://szaghi.github.io/adam/developer/flail
papers:
  - cite: "S. Zaghi, F. Salvadore, A. Di Mascio, G. Rossi. Efficient GPU parallelization of adaptive mesh refinement technique for high-order compressible solver with immersed boundary. Computers and Fluids 266 (2023) 106040."
    doi: 10.1016/j.compfluid.2023.106040
---

**ADAM** (*A*ccelerated fluid *D*ynamics on *A*daptive *M*esh refinement grids) is a modern Fortran library for
block-structured adaptive grids, with a CPU backend (MPI, OpenMP) and a GPU backend (OpenACC with nvfortran, or OpenMP
offloading with amdflang). Solvers are built on it by supplying their equations.

<!-- TODO: what ADAM brings to a research project: scale reached, validation evidence, a showcase figure. -->

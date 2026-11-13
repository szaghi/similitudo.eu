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
figures:
  - src: /codes/adam/figure.png
    dark: /codes/adam/figure-dark.png
    width: 720
    height: 262
    alt: Density of a Mach 3 flow over a forward-facing step, on adaptive quadtree blocks
    caption: "Woodward–Colella Mach 3 step, density to t = 4 on a forest of three quadtree realms, base spacing 1/80 with static refined boxes; the inter-realm seams dashed. Run with FLUME on ADAM."
    animated: true
    source: https://szaghi.github.io/adam/
  - src: /codes/adam/sbli.png
    dark: /codes/adam/sbli-dark.png
    width: 1174
    height: 185
    alt: Numerical schlieren of an oblique shock striking a turbulent boundary layer and reflecting from it
    caption: "Shock/boundary-layer interaction at Mach 2.28: an oblique shock of 8° deflection strikes a turbulent boundary layer (momentum-thickness Reynolds number about 5000, the IUSTI experiment) and reflects; numerical schlieren of the mid-span plane. Wall-modelled, 1200 × 144 × 72 cells on 4 A30 GPUs; interaction length 3.15 δ₀, against 3.22–3.30 in the DNS. Run with FLUME on ADAM."
    source: https://szaghi.github.io/adam/applications/flume/verification/streams/sbli
  - src: /codes/adam/seams.png
    width: 782
    height: 384
    alt: Two density error maps of a vortex crossing a refined quadrant; on the left the error concentrates on the quadrant's edges, on the right it does not
    caption: "High order across the refinement seams: an isentropic vortex crosses a static 2:1 refined quadrant (white outline); density error at 128 base cells per side, log10 from −7.5 (dark) to −3 (yellow), CPU. Left, the default seam operators (mean restriction, tricubic fill, reflux): the error gathers on the seams, max 1.3·10⁻³, L1 order 2.0. Right, the 6-point lagrange6 restriction with the quintic fill: only the vortex's own error is left, max 3.9·10⁻⁴, L1 order 6.1. Run with FLUME on ADAM."
    source: https://szaghi.github.io/adam/applications/flume/verification/seams/order-across-seams
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

**ADAM** (*A*ccelerated fluid *D*ynamics on *A*daptive *M*esh refinement grids) is a modern Fortran SDK for
block-structured adaptive grids. It is physics-agnostic: the grid, its refinement and balancing, the reconstruction and
time integration, the elliptic solvers and the I/O know nothing of the equations, which each solver supplies. FLUME
(compressible flows and MHD) and PRISM (Maxwell and particle-in-cell) are its solvers. The same source runs from a laptop
to GPU clusters: a CPU backend (MPI, OpenMP) and a GPU backend (OpenACC with nvfortran, or OpenMP offloading with
amdflang), chosen at compile time.

<!-- TODO: what ADAM brings to a research project: scale reached, validation evidence, a showcase figure. -->

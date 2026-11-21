---
name: ELISHA
tagline: FFT and AMR multigrid Poisson solvers in modern Fortran, two solvers behind one facade, on every rank and GPU.
kind: library
order: 13
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/ELISHA
docs: https://szaghi.github.io/ELISHA/
logo: /codes/elisha
methods:
  - A direct FFT solver on uniform block lattices, exact for the discrete Laplacian to round-off
  - Periodic, Dirichlet and Neumann faces by odd and even extensions; isolated by Hockney–Eastwood with the lattice Green's function
  - Flexible conjugate gradients preconditioned by a symmetric multigrid V-cycle on 2:1-balanced octrees of blocks, the FFT solver at its root
  - Free space on the AMR path by the James step; inhomogeneous boundary values
  - One facade that picks the path for the mesh, spectral on one level, hierarchical on 2:1 AMR
  - 36 named status codes, the same on every rank; the library never stops the program
parallelism:
  - Any MPI communicator, or none (the serial build)
  - FFTW on the host; cuFFT and OpenACC on NVIDIA GPUs, the caller's arrays on the device if wanted, bitwise the same
  - gfortran, nvfortran and ifx; double precision
figures:
  - src: /codes/elisha/embers.png
    dark: /codes/elisha/embers-dark.png
    width: 720
    height: 720
    alt: Two Gaussian masses orbiting in free space on an adaptive mesh that refines around them at every step
    caption: "Two embers turning in free space, the plane z = 1/2 of each step: every step builds a new mesh refined around them, a new setup on it and one isolated hierarchical solve. The FCG takes 14 or 15 iterations whatever the mesh under the embers."
    source: https://szaghi.github.io/ELISHA/tutorial/08-embers
    animated: true
  - src: /codes/elisha/iterates.png
    dark: /codes/elisha/iterates-dark.png
    width: 720
    height: 432
    alt: The error of each FCG iterate on an AMR mesh, ELISHA's symmetric V-cycle against ADAM's
    caption: "The error of the k-th FCG iterate on a 2:1 AMR mesh, against the converged potential: preconditioned by ELISHA's symmetric V-cycle the solve converges in 12 iterations, by ADAM's in 19."
    source: https://szaghi.github.io/ELISHA/tutorial/06-iterations
    animated: true
---

**ELISHA** (*E*lliptic *L*aplacian *I*nversion, *S*pectral and *H*ierarchical *A*lgorithms) is a modern Fortran
library of Poisson solvers for block-structured meshes. The caller describes its blocks and hands over a
communicator; ELISHA solves with a direct FFT on a uniform lattice, or with multigrid-preconditioned conjugate
gradients on a 2:1 AMR octree, and returns the potential with its ghost cells filled. Elisha took up Elijah's mantle;
ELISHA took up FLAIL's, the elliptic solver of ADAM.

ELISHA is bitwise equal to ADAM's solver on 1 to 3 ranks, with gfortran, nvfortran and ifx and on an A30, except for
the one defect it fixes: ADAM's V-cycle is not symmetric at the 2:1 seams, which conjugate gradients assume, and on
one verification case it stalled. The symmetric V-cycle cuts the multigrid's solve time by 24 to 30% on 1 to 64 CPU
ranks. On an A30, still bitwise equal to ADAM's GPU code, its stencil level operators take 17 to 37% less time. Every
number in its documentation is printed by a program that CI compiles and runs.

---
name: GIDEON
tagline: Finite-difference and finite-volume stencil operators in modern Fortran, one pure kernel each, exact to order N, on every CPU and GPU.
kind: library
order: 11
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/GIDEON
docs: https://szaghi.github.io/GIDEON/
logo: /codes/gideon
methods:
  - FD centred face values and node derivatives of order 1 to 6
  - FV centred face values, face derivatives (1 to 5) and cell-average derivatives (1 to 6)
  - FV upwind operators on right- or left-side stencils of 1 to 9 cells, each left kernel the bitwise mirror of its right twin
  - Conversion between cell averages and point values
  - 3-D gradient, divergence, curl and Laplacian, FD and FV, orders 2 to 10
  - Coefficients derived in exact rational arithmetic, compiled in as constants; run-time order dispatchers on top
parallelism:
  - Pure kernels called from inside your loops
  - OpenACC (!$acc routine seq) and OpenMP offloading (!$omp declare target)
  - gfortran, nvfortran and ifx; single, double and quadruple precision
figures:
  - src: /codes/gideon/advection.png
    dark: /codes/gideon/advection-dark.png
    width: 720
    height: 320
    alt: A wave packet advected over two periods with three of GIDEON's first-derivative kernels, against the exact solution
    caption: "A wave packet advected for two periods on 128 cells, every frame computed by GIDEON's kernels: the second-order centred derivative lags and leaves a train of waves behind, the fourth-order one nearly keeps up, the two-cell upwind one damps the packet."
    source: https://szaghi.github.io/GIDEON/verification/spectral
    animated: true
  - src: /codes/gideon/spectral-centred.png
    dark: /codes/gideon/spectral-centred-dark.png
    width: 1184
    height: 510
    alt: Modified wavenumber of the centred first and second derivatives, orders 2 to 10, against the exact one
    caption: "Modified wavenumber of the centred first and second derivatives, orders 2 to 10: a wider row resolves more of the band, never all of it. The imaginary parts are zero: the centred kernels do not dissipate."
    source: https://szaghi.github.io/GIDEON/verification/spectral
---

**GIDEON** (*G*enerated *I*nterpolations and *D*erivatives, *E*xact to *O*rder *N*) is a modern Fortran library of
finite-difference and finite-volume stencil operators. Each operator and order is one `pure`, device-callable kernel
whose row is a compile-time constant, derived in exact rational arithmetic from what it must compute and its order
measured at 100 digits: nothing to set up, nothing to copy to the device.

GIDEON was extracted from the FD and FV operators of ADAM. It is bitwise equal to ADAM where ADAM is right, and fixes
the defects an audit of ADAM's rows found where it is not. Its kernels take 0.17–0.82 of the time of ADAM's, on an
RTX 4070 and on one CPU core. That GPU runs FP64 at 1/64 of its FP32 rate, so the ratio on a data-centre GPU will
differ. Eleven verification programs double as the test suite, from the order of every kernel observed in quadruple
precision to the mirrors, the spectral properties and the equivalence with ADAM, and a mutation run catches every
planted defect.

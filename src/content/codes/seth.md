---
name: SETH
tagline: WENO and TENO reconstruction and interpolation in modern Fortran, one pure kernel per scheme, on every CPU and GPU.
kind: library
order: 10
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/SETH
docs: https://szaghi.github.io/SETH/
logo: /codes/seth
methods:
  - WENO-JS of order 1, 3, 5, 7 and 9; WENO-Z of order 3, 5, 7 and 9
  - TENO5, TENO6, TENO6-opt and NENO6
  - Reconstruction from cell averages and interpolation from point values, optionally with the weights ratios
  - Coefficients derived in exact rational arithmetic, compiled in as constants
  - Positivity-preserving flux limiter for the Euler equations, 1-D to 3-D (Hu, Adams and Shu, 2013)
parallelism:
  - Pure kernels called from inside your loops
  - OpenACC (!$acc routine seq) and OpenMP offloading (!$omp declare target)
  - gfortran, nvfortran and ifx
figures:
  - src: /codes/seth/shu-osher.png
    dark: /codes/seth/shu-osher-dark.png
    width: 720
    height: 320
    alt: Density of the Shu–Osher shock and entropy-wave interaction, WENO5-JS against TENO6
    caption: "Shu–Osher shock / entropy-wave interaction: density to t = 1.8 on 400 cells, WENO5-JS and TENO6. TENO6 resolves the compressed waves behind the shock that WENO5-JS flattens."
    source: https://szaghi.github.io/SETH/verification/shocks/shu-osher
    animated: true
  - src: /codes/seth/convergence.png
    dark: /codes/seth/convergence-dark.png
    width: 758
    height: 473
    alt: Whole-domain error of every SETH scheme against the number of cells, on a log-log plot
    caption: "Convergence over the whole domain, critical points included (Henrick's field, N = 20 to 640): WENO-Z (p = 2) and TENO keep their order, WENO-JS drops to its critical-point rate."
    source: https://szaghi.github.io/SETH/verification/accuracy/convergence
---

**SETH** (*S*moothness-weighted *E*NO, *T*ENO and *H*ybrids) is a modern Fortran library for high-order
non-oscillatory reconstruction and interpolation. Each scheme is one `pure`, device-callable kernel with its
coefficients as compile-time constants: nothing to set up, nothing to copy to the device, no dynamic dispatch where
the cells are swept. It is the successor of WenOOF, whose run-time polymorphism in the inner loops was too slow.

SETH was extracted from the WENO machinery of ADAM, and its WENO-JS kernels are bitwise equal to ADAM's. On an
RTX 4070 its WENO-5 and WENO-7 kernels run 1.26–1.31× faster than ADAM's. That GPU runs FP64 at 1/64 of its FP32 rate,
which favours the kernel that issues fewer instructions, so the margin on a data-centre GPU will differ. Twenty-six
verification programs double as the test suite, from orders at critical points to Sod, Shu–Osher and the blast wave,
and a mutation run catches 25 of 25 planted defects.

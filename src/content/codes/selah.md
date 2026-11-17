---
name: SELAH
tagline: Runge–Kutta and splitting time integrators in modern Fortran, driven one stage at a time, on every CPU and GPU.
kind: library
order: 12
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/SELAH
docs: https://szaghi.github.io/SELAH/
logo: /codes/selah
methods:
  - Runge–Kutta schemes Euler, SSP(2,2), SSP(3,3), SSP(5,4), SSP(10,4), RK4, LSRK(3,3) and LSRK(5,4)
  - Splittings Strang, Yoshida (order 4), Blanes–Moan S6 and S10
  - Butcher form and the low-storage two-register, Williamson 2N and Ketcheson forms, equal to round-off
  - A stepper driven stage by stage around the caller's ghost fill and residual, with the stage weights for flux registers
  - Order conditions checked in quadruple precision; SSP coefficients computed, never typed in
parallelism:
  - Kernels over block-structured fields with ghost cells, in two layouts, masked or not
  - One source for the host, OpenMP and OpenACC
  - gfortran, nvfortran and ifx; double and single precision
figures:
  - src: /codes/selah/splitting-phase.png
    dark: /codes/selah/splitting-phase-dark.png
    width: 720
    height: 360
    alt: Phase portrait of the harmonic oscillator, the Strang splitting against rk4
    caption: "The harmonic oscillator, Δt = 0.6, 400 steps: the Strang splitting stays on a closed curve near the exact circle; rk4 spirals inwards."
    source: https://szaghi.github.io/SELAH/verification/properties/splitting-energy
    animated: true
  - src: /codes/selah/stability.png
    dark: /codes/selah/stability-dark.png
    width: 929
    height: 463
    alt: Linear stability boundaries of SELAH's Runge–Kutta schemes in the complex plane
    caption: "The boundary |R(z)| = 1 of every Runge–Kutta scheme, computed from the library's own tableaux. Left: the SSP schemes, SSP(10,4)'s region the largest by far. Right: rk4 and the low-storage 2N schemes."
    source: https://szaghi.github.io/SELAH/verification/accuracy/stability
---

**SELAH** (*S*tage-wise *E*volution *L*ibrary for *A*ccelerators and *H*PC) is a modern Fortran library of
time-evolution operators for block-structured field solvers. The caller drives the stepper one stage at a time: it
fills the ghost cells and writes the residual, SELAH builds the stage states and the update over the caller's arrays,
with no dynamic dispatch where the cells are swept. *Selah* marks a pause in the Psalms; the stage boundaries are
those pauses, where the solver exchanges ghosts, fills AMR seams and refluxes. It is the successor of FOODIE.

SELAH was carved from the time-integration kernels of ADAM's GPU backend. Kernel by kernel it matches them to within 3% on an
NVIDIA A30; a whole SSP(5,4) step through the stepper costs 0.548 of ADAM FLUME's, because it passes over the field
28 times instead of 53. Twenty-one verification programs double as the test suite, from order conditions and stability
regions to strong stability and the long-time energy of the splittings, and a mutation run catches 28 of 28 planted
defects.

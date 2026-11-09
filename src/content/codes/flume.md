---
name: FLUME
tagline: Compressible Euler and ideal MHD on adaptive grids, with gravity, cooling and sink particles.
kind: solver
parent: adam
order: 2
status: active
license: MIT / LGPLv3
repo: https://github.com/szaghi/adam
docs: https://szaghi.github.io/adam/applications/flume/
logo: /codes/flume
physics:
  - Compressible Euler
  - Ideal MHD
  - Dissipative terms
  - Gravity and self-gravity
  - Radiative cooling
  - Sink particles
figures:
  - src: /codes/flume/figure.png
    dark: /codes/flume/figure-dark.png
    width: 720
    height: 742
    alt: Density of the Orszag–Tang MHD vortex on adaptive blocks
    caption: "Orszag–Tang vortex, ideal MHD with GLM cleaning: density to t = 0.5 on 128², the blocks outlined. FLUME case MV-12."
    source: https://szaghi.github.io/adam/applications/flume/
    animated: true
  - src: /codes/flume/rayleigh-taylor.png
    dark: /codes/flume/rayleigh-taylor-dark.png
    width: 720
    height: 380
    alt: Density of a single-mode Rayleigh–Taylor instability, hydrodynamics and MHD side by side
    caption: "Rayleigh–Taylor single mode under constant gravity, density to t = 5 on 128²: hydrodynamics (left), where the spikes roll up through secondary Kelvin–Helmholtz instabilities, and MHD with a horizontal field at half the critical value of the mode (right). FLUME case GV-4."
    source: https://szaghi.github.io/adam/applications/flume/verification/gravity/rayleigh-taylor
    animated: true
evidence:
  - kind: verification
    test: "Isentropic vortex, Euler, WENO (split), 128 → 256 cells"
    result: "observed order 5.79 (bound 4.5)"
    source: https://szaghi.github.io/adam/applications/flume/verification/euler/isentropic-vortex
  - kind: verification
    test: "MHD linear waves (MV-5), every wave family, 16 → 32 cells"
    result: "observed order 4.96–4.97 (bound 4.7)"
    source: https://szaghi.github.io/adam/applications/flume/verification/mhd/order-of-accuracy
  - kind: verification
    test: "Viscous shear waves, 4th-order dissipative fluxes, 32 / 64 / 128 cells"
    result: "observed order +3.99, +4.00; identical on CPU and GPU to the printed digits"
    source: https://szaghi.github.io/adam/applications/flume/verification/dissipative/viscous-waves
---

**FLUME** solves the compressible Euler and ideal MHD equations, with dissipative terms, gravity, self-gravity,
cooling and sink particles, on ADAM's adaptive grids.

<!-- TODO: target applications and verification evidence. -->

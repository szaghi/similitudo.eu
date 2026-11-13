---
name: FLUME
tagline: Compressible Euler, Navier–Stokes and ideal MHD on ADAM's adaptive grids, with gravity, self-gravity, sinks and turbulence models, on CPUs and GPUs.
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
  - Navier–Stokes (viscosity, heat conduction)
  - Ideal MHD (GLM / EGLM cleaning, Ohmic resistivity)
  - Gravity and self-gravity
  - Radiative cooling
  - Sink particles
  - Turbulence (LES) and wall models
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
  - src: /codes/flume/orszag-tang-fields.png
    width: 879
    height: 432
    alt: Density and pressure of the Orszag–Tang vortex, two square maps side by side
    caption: "Orszag–Tang vortex at t = 0.5 on 128²: density (left, 0.09 to 0.49) and pressure (right, 0.03 to 0.51). The solution keeps its 180° rotational symmetry to 1.3·10⁻⁹ and conserves mass, momentum, energy and field to 10⁻¹⁴, with the positivity floors off. FLUME case MV-12."
    source: https://szaghi.github.io/adam/applications/flume/verification/mhd/orszag-tang
  - src: /codes/flume/rotor-fields.png
    width: 876
    height: 430
    alt: Density and magnetic pressure of the MHD rotor, two square maps side by side
    caption: "MHD rotor (Balsara & Spicer 1999): a dense disc spinning in a magnetised gas launches torsional Alfvén waves that brake it. Density (left, up to about 12) and magnetic pressure |B|²/2 (right, up to about 2.6) at t = 0.15 on 256²; symmetric under the 180° rotation with B → −B to 1.8·10⁻⁹, positivity floors off. FLUME case MV-13."
    source: https://szaghi.github.io/adam/applications/flume/verification/mhd/rotor
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

**FLUME** (*F*luid *L*aboratory for *U*nsteady *M*ultiphysics at *E*xascale) solves the compressible Euler,
Navier–Stokes and ideal MHD equations on ADAM's adaptive grids, on CPUs and GPUs from the same source.

**Gases:** ideal, isothermal and barotropic equations of state; optically thin radiative cooling; viscosity (constant, power law or Sutherland) and heat conduction, with no-slip and isothermal walls.

**MHD:** cell-centred field with mixed GLM or energy-consistent EGLM cleaning, Ohmic resistivity, HLLD fluxes and a positivity limiter for very low plasma β.

**Gravity:** external, with a well-balanced mode; self-gravity, periodic or isolated, solved by ADAM's FLAIL multigrid every stage; sink particles on the finest level.

**Turbulence:** Vreman, WALE and Sigma subgrid models, equilibrium and inverse-transformation wall models, digital-filter inflow and non-reflecting faces.

**Numerics:** WENO flux splitting (orders 3 to 9), WENO reconstruction with LLF, HLL, HLLC or HLLD fluxes, and a hybrid central/WENO scheme for turbulence; refinement at start-up and during the run, conservative reflux across the 2:1 seams, restarts across regrids.

<!-- TODO: target applications and verification evidence. -->

---
name: PRISM
tagline: Maxwell equations with particle-in-cell plasmas on adaptive grids.
kind: solver
parent: adam
order: 3
status: active
license: MIT / LGPLv3
repo: https://github.com/szaghi/adam
docs: https://szaghi.github.io/adam/applications/prism/
logo: /codes/prism
physics:
  - Maxwell equations
  - Particle-in-cell plasmas
figure:
  src: /codes/prism/figure.png
  dark: /codes/prism/figure-dark.png
  width: 720
  height: 258
  alt: A Gaussian electromagnetic pulse leaving the box through three kinds of boundary
  caption: "A Gaussian pulse in vacuum meets the x faces of the box. Left to right: PEC, first-order Silver–Müller, Silver–Müller with a classic PML (outlined). PRISM tutorials 2 and 3."
  source: https://szaghi.github.io/adam/applications/prism/
evidence:
  - kind: verification
    test: "Slice convergence, 16 → 32 cells, CPU and GPU"
    result: "observed order 1.98 on both (bound 1.8)"
    source: https://szaghi.github.io/adam/applications/prism/verification/slices
  - kind: verification
    test: "Particle-in-cell: Fresnel slab against the exact cold slab"
    result: "agreement to 3.3 / 3.3 / 6.2 %, second order in Δx"
    source: https://szaghi.github.io/adam/applications/prism/verification/pic
  - kind: verification
    test: "Travelling wave on a uniform grid, 192 steps"
    result: "total energy drift 1.2·10⁻⁶; div D and div B at round-off (0, 0)"
    source: https://szaghi.github.io/adam/applications/prism/verification/uniform-grid
---

**PRISM** solves the Maxwell equations with particle-in-cell plasmas, on ADAM's adaptive grids.

<!-- TODO: target applications (e.g. plasma thrusters) and verification evidence. -->

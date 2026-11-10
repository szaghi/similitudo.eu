---
name: VecFor
tagline: Vector algebra for Fortran, written as you write the maths, on the CPU or inside a GPU kernel.
kind: library
order: 8
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/VecFor
docs: https://szaghi.github.io/VecFor/
logo: /codes/vecfor
methods:
  - Operators as in the maths (a + b, 2 * a, .dot., .cross., .paral., .ortho., .matrix.)
  - Lengths, unit vectors, angles accurate near 0 and 180 degrees, products accurate under cancellation
  - Face normals and areas, volumes by the divergence theorem, signed tetrahedron volumes
  - Distances from lines and planes, projections, barycentric coordinates, closest points
  - Rotations about any axis and mirrors across any plane, as calls or matrices
  - Single, double and quadruple precision
parallelism:
  - Elemental, whole arrays in one call
  - OpenACC, device-callable routines inside kernels
figures:
  - src: /codes/vecfor/tetrahedron.svg
    width: 640
    height: 480
    alt: A tetrahedron with its outward unit normals, a point q outside it and its foot on the slanted face
    caption: "The tetrahedron of the tutorial: outward face normals, a point and its foot on the slanted face, computed by VecFor."
    source: https://szaghi.github.io/VecFor/
  - src: /codes/vecfor/grid.svg
    width: 560
    height: 420
    alt: The points of a grid that lie inside a tetrahedron
    caption: "Many vectors at once: the 64 000 points of a 40 × 40 × 40 grid tested against a tetrahedron with one elemental call per face, the 10 660 inside counted to estimate its volume."
    source: https://szaghi.github.io/VecFor/manual/tutorial/08-arrays
---

**VecFor** (*Vec*tor algebra for *For*tran) is a pure Fortran 2008 library with one vector type for three-dimensional
Cartesian space, used as you write the maths: `a + b`, `2 * a`, `a .dot. b`, `a .cross. b`. Lengths, angles, face
normals, distances, projections, rotations and mirrors, in single, double or quadruple precision. The operators are
elemental, so one call works on a whole array, and a device-callable API, the `_dev` routines, runs them inside OpenACC
kernels.

FOSSIL is built on VecFor; outside these codes, the MOHID Lagrangian model uses it.

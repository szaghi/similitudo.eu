---
name: FOSSIL
tagline: Geometry for simulation codes, in pure Fortran, on the CPU or bit-exact on the GPU.
kind: library
order: 5
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/FOSSIL
docs: https://szaghi.github.io/FOSSIL/
logo: /codes/fossil
methods:
  - STL input and output, repair of dirty meshes
  - Exact booleans, decimation, remeshing, alpha wrapping, marching cubes
  - Certified deviation and Hausdorff distance, mass properties, thickness, curvature
  - Signed distance on a SAH BVH, fast winding number, level sets
  - Immersed-boundary queries and AMR tagging
  - Exact cut cells and cut-cell solver support
  - Curvilinear blocks, overset assembly, body-fitted grids
  - Moving bodies, swept volumes, collision detection
parallelism:
  - CPU (gfortran, ifx, nvfortran)
  - OpenACC on the GPU, bit for bit equal to the CPU
figures:
  - src: /codes/fossil/dragon-deviation.svg
    width: 640
    height: 420
    alt: The dragon decimated again and again, each level coloured by its certified deviation from the original
    caption: "Geometry analysis: the dragon decimated again and again to half of its facets, 3294 to 572, each level coloured by its deviation from the original and captioned with its certified bounds, from 0.13 to 1.9."
    source: https://szaghi.github.io/FOSSIL/guide/advanced/surface-deviation
    animated: true
  - src: /codes/fossil/collision.svg
    width: 720
    height: 420
    alt: A square sliding into a wall, drawn at each conservative-advancement iterate up to its time of impact
    caption: "Collision detection: a square sliding along a floor into a wall over one step, drawn at each conservative-advancement iterate up to its time of impact; the plain bound (top) creeps in 25 steps, the directional bound (bottom) reaches the same contact in 5."
    source: https://szaghi.github.io/FOSSIL/guide/advanced/collision
    animated: true
  - src: /codes/fossil/overset.svg
    width: 720
    height: 440
    alt: An O-grid around a cylinder crossing a Cartesian background, its holes, receptors and orphans recomputed every frame
    caption: "Overset assembly: an O-grid of 32 × 12 cells around a unit cylinder crossing a Cartesian background of 60 × 32; per frame, the background holes (red), the background receptors around them (teal), the O-grid's outer receptors (yellow) and the orphans where it leaves the background (ember)."
    source: https://szaghi.github.io/FOSSIL/guide/advanced/overset
    animated: true
  - src: /codes/fossil/naca-distance.svg
    width: 704
    height: 394
    alt: Iso-distance contours around a NACA 0012 section pitching and translating
    caption: "Signed distance: iso-distance contours from 0.05 to 0.6 around a NACA 0012 section pitching and translating, every frame computed by FOSSIL with the pose passed to the query instead of rebuilding the tree."
    source: https://szaghi.github.io/FOSSIL/manual/tutorial/04-distance
    animated: true
---

**FOSSIL** (*FO*rtran *S*urfaces, *S*olids, *I*mmersed boundaries and *L*evel sets) is the geometry layer a simulation
code needs, in pure Fortran 2003+ with no C: surfaces and 2-D curves read, repaired, processed and measured; signed
distances and level sets; immersed-boundary queries and AMR tagging; exact cut cells and their solver support;
curvilinear blocks and overset assembly; body-fitted grids; moving bodies and collision detection.

The GPU code path shares its OpenACC kernels with the CPU one, and its distances, queries and tagging equal the CPU
results bit for bit.

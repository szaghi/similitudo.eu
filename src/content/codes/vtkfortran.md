---
name: VTKFortran
tagline: VTK files from pure Fortran, written and read back, from one rank or many.
kind: library
order: 6
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/VTKFortran
docs: https://szaghi.github.io/VTKFortran/
methods:
  - Image, rectilinear, structured and unstructured grids (polyhedra included), polygonal data
  - ASCII, base64 binary, raw binary appended, zlib compression
  - Parallel pieces with their header, ghost cells marked as ParaView expects
  - Time series (.pvd) valid after every step, multi-block assemblies (.vtm)
  - Field data (time, cycle, metadata), all kinds, ranks 1 to 4
  - Arrays beyond 2 GiB, 64-bit connectivity
  - Every file read back, array by array
parallelism:
  - Thread and process safe (OpenMP, MPI)
figures:
  - src: /codes/vtkfortran/torus.png
    width: 800
    height: 480
    alt: A torus written as a structured grid, coloured by its temperature, rendered by ParaView
    caption: "The quick start: a torus of 48 × 24 × 3 points written as a structured grid with a temperature and a velocity field, in raw binary, then opened in ParaView."
    source: https://szaghi.github.io/VTKFortran/#quick-start
  - src: /codes/vtkfortran/heat.png
    width: 720
    height: 432
    alt: The temperature on the middle plane of a cube, raised as a surface, two peaks merging and decaying
    caption: "A time series: the heat solver of the tutorial writes a rectilinear grid every 2 steps, listed in a .pvd collection; ParaView plays it, two hot blobs merging while the cube cools down."
    source: https://szaghi.github.io/VTKFortran/manual/tutorial/04-time-series
    animated: true
---

**VTKFortran** is a pure Fortran 2008 library that writes the VTK XML formats ParaView and VisIt read, with no VTK to
install: image, rectilinear, structured and unstructured grids, polygonal data, parallel pieces, multi-block assemblies
and time series, in ASCII, binary, raw or zlib compressed. Every file it writes, and the same files written by VTK, it
reads back. Each file keeps its own state, so OpenMP threads and MPI ranks write theirs concurrently.

ADAM writes its VTK output through VTKFortran.

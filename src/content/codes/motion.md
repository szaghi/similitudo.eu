---
name: MOTIOn
tagline: HDF5 data with XDMF metadata from MPI codes, in one Fortran API.
kind: library
order: 12
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/MOTIOn
docs: https://szaghi.github.io/MOTIOn/
methods:
  - One object for the HDF5 data file and its XDMF descriptor
  - Uniform Cartesian, Cartesian and curvilinear blocks
  - Scalars, vectors, tensors and matrices, all kinds, saved and loaded
  - Low-level HDF5 datasets and XDMF grids and topologies when needed
parallelism:
  - MPI (one HDF5 file per rank, one XDMF descriptor gathered on the master)
---

**MOTIOn** (*M*odular HPC *O*ptimized *T*oolkit for *IO* in Fortran) is a pure Fortran 2003+ library for HDF5 output
with XDMF metadata in MPI codes, which ParaView and VisIt open as one dataset. Each rank writes its own blocks to its own
HDF5 file; the master gathers the description of all of them into a single XDMF file, with no rank checks in the calling
code. One `save_block_field` call covers every field shape and kind, and `load_block_field` reads it back.

FLUME and PRISM write their HDF5/XDMF output through MOTIOn.

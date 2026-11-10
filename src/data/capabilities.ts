// Capabilities, phrased as the task a coordinator can assign in a work package. Each links to the documentation
// (GitHub Pages), which follows the codebase: generic capabilities to the ADAM landing page, application-specific ones
// to the FLUME or PRISM starting page, the GPU layer to FUNDAL's, geometry to FOSSIL's, visualisation output to MOTIOn's and VTKFortran's. Measured numbers live on the code pages, next to their source.
const ADAM = 'https://szaghi.github.io/adam/';
const FLUME = `${ADAM}applications/flume/`;
const PRISM = `${ADAM}applications/prism/`;
const FUNDAL = 'https://szaghi.github.io/FUNDAL/';
const FOSSIL = 'https://szaghi.github.io/FOSSIL/';
const VTKFORTRAN = 'https://szaghi.github.io/VTKFortran/';
const MOTION = 'https://szaghi.github.io/MOTIOn/';

export interface Capability {
  title: string;
  task: string; // what a coordinator assigns
  text: string;
  evidence: { label: string; url: string }[]; // the docs that back it, one link per code
}

export const capabilities: Capability[] = [
  {
    title: 'Adaptive mesh refinement',
    task: 'Adaptive-grid infrastructure for a project solver',
    text: 'Block-structured octree/quadtree AMR with Morton ordering, 2:1 balancing, load balancing and parallel I/O, on CPUs and GPUs.',
    evidence: [{ label: 'ADAM docs', url: ADAM }],
  },
  {
    title: 'GPU acceleration',
    task: 'Porting and scaling solvers on GPU clusters',
    text: 'A programming-model-agnostic device layer, FUNDAL: one Fortran API and one kernel source for OpenACC (NVIDIA GPUs) and OpenMP offloading (AMD GPUs), plus a CPU mode, chosen at compile time; MPI across nodes, one device per rank.',
    evidence: [{ label: 'FUNDAL docs', url: FUNDAL }],
  },
  {
    title: 'Compressible flows and MHD',
    task: 'High-order compressible and MHD simulation',
    text: 'Euler and ideal MHD with WENO schemes, dissipative terms, gravity, self-gravity, cooling and sink particles. Observed fifth-order convergence on smooth problems.',
    evidence: [{ label: 'FLUME docs', url: FLUME }],
  },
  {
    title: 'Electromagnetics and plasmas',
    task: 'Maxwell and particle-in-cell modelling',
    text: 'Maxwell equations coupled with particle-in-cell plasmas, with PEC, Silver–Müller and PML boundaries; second-order convergence verified on CPU and GPU.',
    evidence: [{ label: 'PRISM docs', url: PRISM }],
  },
  {
    title: 'Complex geometries',
    task: 'Flows around complex bodies without body-fitted meshes',
    text: 'Immersed boundaries on adaptive grids, running on GPUs.',
    evidence: [{ label: 'ADAM docs', url: ADAM }],
  },
  {
    title: 'Geometry for simulation',
    task: 'The geometry pipeline of a solver, from CAD surfaces to the grid',
    text: 'Surfaces read, repaired and measured with certified bounds; signed distances and level sets; immersed-boundary queries, AMR tagging and exact cut cells; overset assembly and body-fitted grids; moving bodies and collision detection; on the CPU or bit for bit on the GPU.',
    evidence: [{ label: 'FOSSIL docs', url: FOSSIL }],
  },
  {
    title: 'Output for visualisation',
    task: 'Simulation output that ParaView and VisIt open directly',
    text: 'Two pure Fortran libraries. MOTIOn: HDF5 data with XDMF metadata from MPI codes, one file per rank and one descriptor gathered on the master. VTKFortran: VTK files of every grid type, parallel pieces with ghost cells, multi-block assemblies, time series that stay valid if a run crashes, compressed binary, arrays beyond 2 GiB. Both read their files back.',
    evidence: [
      { label: 'MOTIOn docs', url: MOTION },
      { label: 'VTKFortran docs', url: VTKFORTRAN },
    ],
  },
  {
    title: 'Verification and validation',
    task: 'A verification work package a project can cite',
    text: 'Convergence studies with observed-order bounds, and the same tests run on CPU and GPU against reference outputs.',
    evidence: [{ label: 'ADAM docs', url: ADAM }],
  },
];

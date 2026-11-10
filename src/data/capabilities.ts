// Capabilities, phrased as the task a coordinator can assign in a work package. Each links to the documentation
// (GitHub Pages), which follows the codebase: generic capabilities to the ADAM landing page, application-specific ones
// to the FLUME or PRISM starting page, the GPU layer to FUNDAL's, geometry to ADAM's, FOSSIL's and VecFor's, visualisation output to MOTIOn's, VTKFortran's and foresight's;
// software engineering to the general-purpose libraries on the Codes page (each linking its own docs) and to FoBiS's,
// the state of the art to mosaic's. Measured numbers live on the code pages, next to their source.
const ADAM = 'https://szaghi.github.io/adam/';
const FLUME = `${ADAM}applications/flume/`;
const PRISM = `${ADAM}applications/prism/`;
const FUNDAL = 'https://szaghi.github.io/FUNDAL/';
const FOSSIL = 'https://szaghi.github.io/FOSSIL/';
const VECFOR = 'https://szaghi.github.io/VecFor/';
const VTKFORTRAN = 'https://szaghi.github.io/VTKFortran/';
const MOTION = 'https://szaghi.github.io/MOTIOn/';
const FORESIGHT = 'https://szaghi.github.io/foresight/';
const FOBIS = 'https://szaghi.github.io/FoBiS/';
const MOSAIC = 'https://szaghi.github.io/mosaic/';

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
    task: 'Flows around complex bodies, and the geometry pipeline from CAD surfaces to the grid',
    text: 'Immersed boundaries on adaptive grids, running on GPUs, in ADAM. The geometry a solver needs, in FOSSIL: surfaces read, repaired and measured with certified bounds; signed distances and level sets; immersed-boundary queries, AMR tagging and exact cut cells; overset assembly and body-fitted grids; moving bodies and collision detection; on the CPU or bit for bit on the GPU, on top of VecFor, vector algebra callable inside GPU kernels.',
    evidence: [
      { label: 'ADAM docs', url: ADAM },
      { label: 'FOSSIL docs', url: FOSSIL },
      { label: 'VecFor docs', url: VECFOR },
    ],
  },
  {
    title: 'Output for visualisation',
    task: 'Simulation output for ParaView and VisIt, and runs watched live',
    text: 'Three Fortran libraries. MOTIOn: HDF5 data with XDMF metadata from MPI codes, one file per rank and one descriptor gathered on the master. VTKFortran: VTK files of every grid type, parallel pieces with ghost cells, multi-block assemblies, time series that stay valid if a run crashes, compressed binary, arrays beyond 2 GiB; both read their files back. foresight: gnuplot-like plots of the logs as interactive HTML, SVG or text, re-rendered while the job runs.',
    evidence: [
      { label: 'MOTIOn docs', url: MOTION },
      { label: 'VTKFortran docs', url: VTKFORTRAN },
      { label: 'foresight docs', url: FORESIGHT },
    ],
  },
  {
    title: 'Verification and validation',
    task: 'A verification work package a project can cite',
    text: 'Convergence studies with observed-order bounds, and the same tests run on CPU and GPU against reference outputs.',
    evidence: [{ label: 'ADAM docs', url: ADAM }],
  },
  {
    title: 'Modern Fortran engineering',
    task: 'Maintainable, tested Fortran for the codes of a project',
    text: 'Fortran libraries designed for reuse, documented and tested in CI with coverage; seven general-purpose ones, several used by other open-source projects: PENF (portable kinds), FACE (terminal colours), BeFoR64 (Base64), StringiFor (strings), FiNeR (INI files), FLAP (command lines), forbear (progress bars). All built and tested with FoBiS, a Fortran build system used beyond these codes.',
    evidence: [
      { label: 'General-purpose libraries', url: '/codes/#general' },
      { label: 'FoBiS docs', url: FOBIS },
    ],
  },
  {
    title: 'State of the art',
    task: 'The literature review of a work package, kept current through the project',
    text: 'The literature searched across 22 scientific databases at once and merged by DOI, kept in a local library with the PDFs one is entitled to read; ranked, summarised and compared by a language model whose statements cite the papers; citation maps of the field, and saved searches that report only the new papers. With mosaic.',
    evidence: [{ label: 'mosaic docs', url: MOSAIC }],
  },
];

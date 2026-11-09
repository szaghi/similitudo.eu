// Capabilities, phrased as the task a coordinator can assign in a work package. Each links to the documentation
// (GitHub Pages), which follows the codebase: generic capabilities to the ADAM landing page, application-specific ones
// to the FLUME or PRISM starting page. Measured numbers live on the code pages, next to their source.
const ADAM = 'https://szaghi.github.io/adam/';
const FLUME = `${ADAM}applications/flume/`;
const PRISM = `${ADAM}applications/prism/`;

export interface Capability {
  title: string;
  task: string; // what a coordinator assigns
  text: string;
  evidence?: { label: string; url: string };
}

export const capabilities: Capability[] = [
  {
    title: 'Adaptive mesh refinement',
    task: 'Adaptive-grid infrastructure for a project solver',
    text: 'Block-structured octree/quadtree AMR with Morton ordering, 2:1 balancing, load balancing and parallel I/O, on CPUs and GPUs.',
    evidence: { label: 'ADAM docs', url: ADAM },
  },
  {
    title: 'GPU acceleration',
    task: 'Porting and scaling solvers on GPU clusters',
    text: 'OpenACC (nvfortran) and OpenMP offloading (amdflang), MPI across nodes.',
    evidence: { label: 'ADAM docs', url: ADAM },
  },
  {
    title: 'Compressible flows and MHD',
    task: 'High-order compressible and MHD simulation',
    text: 'Euler and ideal MHD with WENO schemes, dissipative terms, gravity, self-gravity, cooling and sink particles. Observed fifth-order convergence on smooth problems.',
    evidence: { label: 'FLUME docs', url: FLUME },
  },
  {
    title: 'Electromagnetics and plasmas',
    task: 'Maxwell and particle-in-cell modelling',
    text: 'Maxwell equations coupled with particle-in-cell plasmas, with PEC, Silver–Müller and PML boundaries; second-order convergence verified on CPU and GPU.',
    evidence: { label: 'PRISM docs', url: PRISM },
  },
  {
    title: 'Complex geometries',
    task: 'Flows around complex bodies without body-fitted meshes',
    text: 'Immersed boundaries on adaptive grids, running on GPUs.',
    evidence: { label: 'ADAM docs', url: ADAM },
  },
  {
    title: 'Verification and validation',
    task: 'A verification work package a project can cite',
    text: 'Convergence studies with observed-order bounds, and the same tests run on CPU and GPU against reference outputs.',
    evidence: { label: 'ADAM docs', url: ADAM },
  },
];

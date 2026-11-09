// Capabilities, phrased as the task a coordinator can assign in a work package, each backed by evidence a reviewer can
// open. Claims are limited to what the linked source states (checked 2026-11-09). `evidence` is optional: shown only
// where it exists.
const ADAM_PAPER = 'https://doi.org/10.1016/j.compfluid.2023.106040';
const DOCS = 'https://szaghi.github.io/adam/';

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
    evidence: { label: 'ADAM · Computers & Fluids 2023', url: ADAM_PAPER },
  },
  {
    title: 'GPU acceleration',
    task: 'Porting and scaling solvers on GPU clusters',
    text: 'OpenACC (nvfortran) and OpenMP offloading (amdflang), MPI across nodes. Measured: about 90% strong-scaling efficiency on 16 V100 GPUs.',
    evidence: { label: 'ADAM · Computers & Fluids 2023', url: ADAM_PAPER },
  },
  {
    title: 'Compressible flows and MHD',
    task: 'High-order compressible and MHD simulation',
    text: 'Euler and ideal MHD with WENO schemes, dissipative terms, gravity, self-gravity, cooling and sink particles. Observed fifth-order convergence on smooth problems.',
    evidence: { label: 'FLUME · verification', url: `${DOCS}applications/flume/verification/` },
  },
  {
    title: 'Electromagnetics and plasmas',
    task: 'Maxwell and particle-in-cell modelling',
    text: 'Maxwell equations coupled with particle-in-cell plasmas, with PEC, Silver–Müller and PML boundaries; second-order convergence verified on CPU and GPU.',
    evidence: { label: 'PRISM · verification', url: `${DOCS}applications/prism/verification/` },
  },
  {
    title: 'Complex geometries',
    task: 'Flows around complex bodies without body-fitted meshes',
    text: 'Immersed boundaries on adaptive grids, running on GPUs.',
    evidence: { label: 'ADAM · Computers & Fluids 2023', url: ADAM_PAPER },
  },
  {
    title: 'Verification and validation',
    task: 'A verification work package a project can cite',
    text: 'Convergence studies with observed-order bounds, and the same tests run on CPU and GPU against reference outputs.',
    evidence: { label: 'FLUME · verification', url: `${DOCS}applications/flume/verification/` },
  },
];

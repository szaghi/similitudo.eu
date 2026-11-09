// TODO: refine. Each capability should read as a work-package role a coordinator can assign, backed by evidence.
export const capabilities = [
  { title: 'Adaptive mesh refinement', text: 'Block-structured octree/quadtree AMR with Morton ordering, load balancing and parallel I/O.', evidence: 'ADAM' },
  { title: 'GPU acceleration', text: 'Solvers that run on GPU clusters through OpenACC (nvfortran) and OpenMP offloading (amdflang), with MPI across nodes.', evidence: 'ADAM' },
  { title: 'Compressible flows and MHD', text: 'Compressible Euler and ideal MHD with dissipative terms, gravity, self-gravity, cooling and sink particles.', evidence: 'FLUME' },
  { title: 'Electromagnetics and plasmas', text: 'Maxwell equations coupled with particle-in-cell plasmas.', evidence: 'PRISM' },
  { title: 'Complex geometries', text: 'Immersed boundaries on adaptive grids.', evidence: 'ADAM' },
  { title: 'Verification and validation', text: 'Convergence studies, verification suites and validation campaigns that a project can cite.', evidence: 'TODO' },
];

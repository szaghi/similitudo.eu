// Expertise (the /expertise/ page; until 2026-11-13 "Capabilities", phrased as tasks a project coordinator assigns:
// see docs/startup-archive.md). Each area links to the documentation
// (GitHub Pages), which follows the codebase: generic capabilities to the ADAM landing page (and MORTIF's for the Morton ordering), application-specific ones
// to the FLUME or PRISM starting page, the GPU layer to FUNDAL's, geometry to ADAM's, FOSSIL's and VecFor's, visualisation output to MOTIOn's, VTKFortran's and foresight's;
// software engineering to the general-purpose libraries on the Codes page (each linking its own docs) and to FoBiS's,
// the state of the art to mosaic's. Measured numbers live on the code pages, next to their source.
const ADAM = 'https://szaghi.github.io/adam/';
const MORTIF = 'https://szaghi.github.io/MORTIF/';
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

import type { Dict } from '../i18n/en';

// The words of each area (title, task, text) are in the dictionaries (src/i18n/<lang>.ts, `capabilities`), by id.
// `anchor` is the area's #fragment on /expertise/, the same in every language (links to it must not break).
export interface Capability {
  id: keyof Dict['capabilities'];
  anchor: string;
  // the docs that back it, one link per code; a `group` link points to a section of /codes/ instead
  evidence: ({ code: string; url: string } | { group: keyof Dict['kinds']['groups']; url: string })[];
}

export const capabilities: Capability[] = [
  { id: 'amr', anchor: 'adaptive-mesh-refinement', evidence: [{ code: 'ADAM', url: ADAM }, { code: 'MORTIF', url: MORTIF }] },
  { id: 'gpu', anchor: 'gpu-acceleration', evidence: [{ code: 'FUNDAL', url: FUNDAL }] },
  { id: 'mhd', anchor: 'compressible-flows-and-mhd', evidence: [{ code: 'FLUME', url: FLUME }] },
  { id: 'plasma', anchor: 'electromagnetics-and-plasmas', evidence: [{ code: 'PRISM', url: PRISM }] },
  {
    id: 'geometry',
    anchor: 'complex-geometries',
    evidence: [{ code: 'ADAM', url: ADAM }, { code: 'FOSSIL', url: FOSSIL }, { code: 'VecFor', url: VECFOR }],
  },
  {
    id: 'output',
    anchor: 'output-for-visualisation',
    evidence: [{ code: 'MOTIOn', url: MOTION }, { code: 'VTKFortran', url: VTKFORTRAN }, { code: 'foresight', url: FORESIGHT }],
  },
  { id: 'verification', anchor: 'verification-and-validation', evidence: [{ code: 'ADAM', url: ADAM }] },
  { id: 'fortran', anchor: 'modern-fortran-engineering', evidence: [{ group: 'general', url: '/codes/#general' }, { code: 'FoBiS', url: FOBIS }] },
  { id: 'literature', anchor: 'state-of-the-art', evidence: [{ code: 'mosaic', url: MOSAIC }] },
];

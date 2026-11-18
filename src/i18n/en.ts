// English copy: the reference dictionary. Every other language (it.ts, fr.ts, es.ts, de.ts) has exactly these keys,
// checked at build time by src/i18n/index.ts. Strings marked "HTML" are inserted with set:html: keep their tags.
// Placeholders in braces ({email}, {mailto}, {max}, ...) are filled in by the code; keep them as they are.
export const en = {
  site: {
    // Meta description: the longer, plain statement of what the site is about.
    description:
      'Numerical methods and GPU-accelerated simulation software by Stefano Zaghi: adaptive grids, compressible flows, magnetohydrodynamics and plasmas, from a laptop to GPU clusters.',
    ogAlt: 'similitudo: a blast front drawn as an ink circle over an adaptive grid',
    skip: 'Skip to content',
    home: 'similitudo, home',
    jobTitle: 'Research scientist',
  },
  nav: {
    expertise: 'Expertise',
    code: 'Code',
    about: 'About me',
    contact: 'Contact',
    main: 'Main',
    mainMenu: 'Main (menu)',
    menu: 'Menu',
    close: 'Close',
  },
  // Hero headline: two lines on purpose (the break holds from 768 px up, each line kept on one line there).
  lead: ['Fluids and plasmas, numerically simulated', 'on adaptive grids at GPU speed.'],
  /** Hero byline under the wordmark: "by <name>, <role>". */
  byline: { by: 'by', role: 'research scientist at CNR-IAC' },
  /** The mesh readout under the hero. {max}: deepest level; {leaves}: leaf count; {t}: time. */
  readout: 'quadtree · levels 0–{max} · {leaves} leaf blocks · front r ∝ t^½ · t {t}',
  footer: {
    label: 'About',
    // similitudo is the name of the owner's work, not a company (docs/startup-archive.md).
    about:
      'similitudo is the name of my work on numerical methods and high-performance simulation: designing the schemes, writing the solvers, porting them to GPUs and verifying the results.',
    privacy: 'Privacy',
  },
  ui: {
    theme: 'Switch light or dark theme',
    themeTitle: 'Switch theme',
    language: 'Language',
    pause: 'pause',
    play: 'play',
    source: 'Source',
    logo: (name: string) => `${name} logo`,
    noLogo: (name: string) => `${name} (no logo yet)`,
  },
  home: {
    expertise: 'Expertise',
    inside: 'Under the surface',
    code: 'Code',
    publications: 'Selected publications',
    moreExpertise: 'Details and documentation',
    moreCode: 'All code',
    morePublications: 'All publications',
  },
  /** Code kinds: short (home grid), long (rows on /codes/), group titles (/codes/ sections). */
  kinds: {
    short: { sdk: 'sdk', solver: 'solver', tool: 'tool', library: 'library', general: 'general-purpose' },
    long: { sdk: 'sdk', solver: 'solver', tool: 'tool', library: 'library', general: 'general-purpose library' },
    groups: { sdk: 'Development kits', solver: 'Solvers', tool: 'Tools', library: 'Scientific libraries', general: 'General-purpose libraries' },
  },
  codes: {
    title: 'Code',
    description: 'Open-source simulation codes by Stefano Zaghi and co-authors, the Fortran libraries under them and the tools around them.',
    lead: 'Open-source simulation codes I write with co-authors, the Fortran libraries under them and the tools around them.',
    builtOn: (name: string) => `built on ${name}`,
  },
  code: {
    overview: 'Overview',
    gallery: 'Gallery',
    verification: 'Verification',
    performance: 'Performance',
    paper: 'Reference paper',
    paperFrom: (name: string) => `Reference paper (${name} platform)`,
    facts: 'Facts',
    builtOn: 'Built on',
    status: 'Status',
    licence: 'Licence',
    docs: 'Documentation',
    source: 'Source',
    physics: 'Physics',
    methods: 'Methods',
    parallelism: 'Parallelism',
    sourceLink: 'source',
    statuses: { active: 'active', maintained: 'maintained', archived: 'archived' },
  },
  expertise: {
    title: 'Expertise',
    description: 'What Stefano Zaghi works on: adaptive grids, GPU computing, compressible flows, MHD and plasmas, geometry, verification and Fortran engineering.',
    lead: 'What I work on, each area with the documentation behind it.',
    docs: (code: string) => `${code} docs`,
  },
  /** One entry per area of src/data/capabilities.ts, by id. */
  capabilities: {
    amr: {
      title: 'Adaptive mesh refinement',
      task: 'Adaptive-grid infrastructure for solvers',
      text: 'Block-structured octree/quadtree AMR with Morton ordering (MORTIF), 2:1 balancing, load balancing and parallel I/O, on CPUs and GPUs.',
    },
    gpu: {
      title: 'GPU acceleration',
      task: 'Porting and scaling solvers on GPU clusters',
      text: 'A programming-model-agnostic device layer, FUNDAL: one Fortran API and one kernel source for OpenACC (NVIDIA GPUs) and OpenMP offloading (AMD GPUs), plus a CPU mode, chosen at compile time; MPI across nodes, one device per rank.',
    },
    mhd: {
      title: 'Compressible flows and MHD',
      task: 'High-order compressible and MHD simulation',
      text: 'Euler and ideal MHD with WENO schemes, dissipative terms, gravity, self-gravity, cooling and sink particles. Observed fifth-order convergence on smooth problems.',
    },
    plasma: {
      title: 'Electromagnetics and plasmas',
      task: 'Maxwell and particle-in-cell modelling',
      text: 'Maxwell equations coupled with particle-in-cell plasmas, with PEC, Silver–Müller and PML boundaries; second-order convergence verified on CPU and GPU.',
    },
    geometry: {
      title: 'Complex geometries',
      task: 'Flows around complex bodies, and the geometry pipeline from CAD surfaces to the grid',
      text: 'Immersed boundaries on adaptive grids, running on GPUs, in ADAM. The geometry a solver needs, in FOSSIL: surfaces read, repaired and measured with certified bounds; signed distances and level sets; immersed-boundary queries, AMR tagging and exact cut cells; overset assembly and body-fitted grids; moving bodies and collision detection; on the CPU or bit for bit on the GPU, on top of VecFor, vector algebra callable inside GPU kernels.',
    },
    output: {
      title: 'Output for visualisation',
      task: 'Simulation output for ParaView and VisIt, and runs watched live',
      text: 'Three Fortran libraries. MOTIOn: HDF5 data with XDMF metadata from MPI codes, one file per rank and one descriptor gathered on the master. VTKFortran: VTK files of every grid type, parallel pieces with ghost cells, multi-block assemblies, time series that stay valid if a run crashes, compressed binary, arrays beyond 2 GiB; both read their files back. foresight: gnuplot-like plots of the logs as interactive HTML, SVG or text, re-rendered while the job runs.',
    },
    verification: {
      title: 'Verification and validation',
      task: 'Evidence that a solver is right, on CPU and GPU',
      text: 'Convergence studies with observed-order bounds, and the same tests run on CPU and GPU against reference outputs.',
    },
    fortran: {
      title: 'Modern Fortran engineering',
      task: 'Maintainable, tested Fortran that other projects reuse',
      text: 'Fortran libraries designed for reuse, documented and tested in CI with coverage; eight general-purpose ones, several used by other open-source projects: PENF (portable kinds), FACE (terminal colours), BeFoR64 (Base64), StringiFor (strings), FiNeR (INI files), FLAP (command lines), forbear (progress bars), figure (GUIs and plots). All built and tested with FoBiS, a Fortran build system used beyond these codes.',
    },
    literature: {
      title: 'State of the art',
      task: 'Literature reviews that stay current',
      text: 'The literature searched across 22 scientific databases at once and merged by DOI, kept in a local library with the PDFs one is entitled to read; ranked, summarised and compared by a language model whose statements cite the papers; citation maps of the field, and saved searches that report only the new papers. With mosaic.',
    },
  },
  about: {
    title: 'About me',
    description: 'Stefano Zaghi, research scientist in numerical methods and high-performance simulation, the person behind similitudo.',
    // HTML. A satire of misread publish-or-perish, aimed at myself (never at colleagues).
    intro: [
      'Thrilled and humbled to announce that this week, once again, I have not revolutionised science. No paradigm shift, no breakthrough for humanity, no award from a committee of close friends.',
      'My actual title is <em>Chief Yak Shaver and Accidental Research Scientist</em>: I set out to simulate fluids, and to do it properly I first had to write a build system, a command-line parser, a string library, a few file-format writers and a great deal of other plumbing that nobody announces. The fluids did get simulated, on GPUs, in the end. I publish when there is a result, and once per result: a ruinous strategy for a publication count.',
    ],
    publications: 'Selected publications',
    allPublications: (n: number) => `All publications (${n})`,
    cv: 'CV (PDF)',
  },
  publications: {
    title: 'Publications',
    description: 'Publications of Stefano Zaghi: journal articles, book chapters and conference papers.',
    lead: 'My journal articles, book chapters and conference papers, newest first.',
    groups: { journal: 'Journal articles', chapter: 'Book chapters', conference: 'Conference papers' },
  },
  contact: {
    title: 'Contact',
    description: 'How to reach Stefano Zaghi.',
    lead: 'A question about one of the codes, or an idea for a collaboration? Write to me.',
    email: 'Email',
  },
  privacy: {
    title: 'Privacy',
    description: 'What this site does, and does not do, with your data.',
    lead: 'Short version: this site sets no cookies, runs no analytics and tracks nobody.',
    // HTML paragraphs per section. {mailto}: the address as a mail link; {email}: the address as text.
    // Every statement must stay true: re-check it when hosting, analytics, embeds or mail change.
    sections: [
      {
        label: 'Who',
        paras: ['I, Stefano Zaghi, run this site. For anything about your data, write to me at {mailto}.'],
      },
      {
        label: 'This site',
        paras: [
          'No cookies, no analytics, no tracking, no advertising, no third-party embeds. Fonts, images and videos are served from this site itself, so visiting it sends no request to anyone else.',
          'If you use the light/dark switch, your browser remembers the choice in its local storage (key <code>theme</code>). It stays on your device and is never sent anywhere; clearing your browser data removes it.',
        ],
      },
      {
        label: 'Hosting',
        paras: [
          'The site is a set of static files hosted by GitHub Pages (GitHub, Inc.). Like any web server, GitHub receives your IP address with each request and may log it for security and operations, under the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy statement</a>. The domain\'s DNS is managed by Cloudflare; page requests do not pass through Cloudflare.',
        ],
      },
      {
        label: 'Email',
        paras: [
          'Mail sent to {email} is forwarded by Cloudflare Email Routing to my personal inbox (<a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>). I use it only to reply to you, never share it, and delete it on request.',
        ],
      },
      {
        label: 'Your rights',
        paras: [
          'Under the GDPR you can ask what data about you is held, and have it corrected or deleted: write to the address above. Links to other sites (GitHub, ORCID, doi.org, the code documentation) lead to services with their own policies.',
        ],
      },
    ],
    updated: 'Last updated 13 November 2026.',
  },
  notFound: {
    title: 'Page not found',
    heading: 'Not found',
    lead: 'This page does not exist, or has moved.',
    back: 'Back to the home page',
  },
};

export type Dict = typeof en;

// Abruzzese of Pescara (abr): a self-ironic version for Italian friends. Only the words worth saying in dialect are here;
// every other key comes from it.ts (src/i18n/index.ts). Spelling: the common informal one (final vowels written -e,
// nghe = con, gna = come, ’n/nen for the negation; essere as the perfect auxiliary, as Abruzzese does: so’ fatte).
// The code `abr` is a deliberate misuse: ISO 639-3 files Abruzzese under `nap`, and `abr` is Abron (Ghana). Chosen
// because /abr/ reads right to an Italian, /nap/ does not.
// DRAFT: to be corrected by a native speaker from Pescara.
import type { DialectDict } from './index';

export const abr: DialectDict = {
  site: { skip: 'Jame a lu sode', home: 'similitudo, a la case' },
  nav: { expertise: 'Mestìre', code: 'Còdece', about: 'Chi so’ ji', contact: 'Scriveme', close: 'Chiude' },
  lead: ['Fluide e plasme, simulate nghe li numere,', 'sopre a griglie adattive, a tutta GPU.'],
  byline: { by: 'de', role: 'ricercatore a lu CNR-IAC' },
  footer: {
    label: 'Chi è',
    about:
      'similitudo è lu nome de la fatije mé sopre a li metode numèreche e a li cunte che camminene: penzà li schème, scrive li solutore, purtàrle sopre a la GPU e cuntrullà che li cunte quàdrene.',
  },
  home: {
    expertise: 'Mestìre',
    inside: 'Chelle che ce sta sotte',
    code: 'Còdece',
    publications: 'Li cose stampate',
    moreExpertise: 'Tutte li dettaje',
    moreCode: 'Tutte lu còdece',
    morePublications: 'Tutte li pubblicaziune',
  },
  codes: {
    title: 'Còdece',
    lead: 'Còdece de simulazione open source che scrive nghe li coautore mé, li libbrerie Fortran che je stanne sotte e li strumende che je gire attorne.',
  },
  expertise: { title: 'Mestìre', lead: 'Chelle che facce, ogne cose nghe la documentazione che la regge.' },
  about: {
    title: 'Chi so’ ji',
    intro: [
      'Tutte cundende e onorate, v’annunzie che pure ’sta settimane, n’atra vote, nen so’ revoluziunate la scienze. Nijende cagne de paradigme, nijende scoperte pe’ l’umanità, nijende premie da ’na commissione de amice strette.',
      'Lu titele mé vere è <em>Chief Yak Shaver and Accidental Research Scientist</em>: vuleve simulà li fluide, e pe’ farle gna se deve so’ duvute prima scrive nu sisteme de build, nu parser de la riga de comande, ’na libbrerie de stringhe, cacche writer de furmate e ’na muntagne d’atra fatije da idrauliche che nisciune annunzie. A la fine li fluide li so’ simulate pe’ davvere, sopre a la GPU. Pubbliche quanne ce sta nu resultate, e ’na vota sole pe’ resultate: ’na strateggie che manne a fonne lu cunte de li pubblicaziune.',
    ],
    publications: 'Li cose stampate',
  },
  contact: {
    title: 'Scriveme',
    lead: '’Na dumanne sopre a nu còdece, o n’idee pe’ fatijà ’nzieme? Scriveme, che nen mozzeche.',
  },
  notFound: {
    title: 'Pagine perse',
    heading: 'Nen ce sta',
    lead: '’Sta pagine nen ce sta, o se n’è jite a magnà li arrustelle.',
    back: 'Torne a la case',
  },
};

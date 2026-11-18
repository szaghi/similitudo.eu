// Sicilian of Palermo (scn): a self-ironic version for Italian friends. Only the words worth saying in dialect are here;
// every other key comes from it.ts (src/i18n/index.ts). Spelling: the common literary one (dd, gghi, ô/dâ/dû for the
// articulated prepositions).
// DRAFT: to be corrected by a native speaker from Palermo.
import type { DialectDict } from './index';

export const scn: DialectDict = {
  site: { skip: 'Arrivamu ô puntu', home: 'similitudo, a casa' },
  nav: { expertise: 'Mistieri', code: 'Còdici', about: 'Cu sugnu', contact: 'Scrivimi', close: 'Chiùi' },
  lead: ['Fluidi e plasmi, simulati cu i nùmmari,', 'su gradigghi adattivi, a tutta GPU.'],
  byline: { by: 'di', role: 'ricircaturi ô CNR-IAC' },
  footer: {
    label: 'Cu è',
    about:
      'similitudo è u nomu dû me travagghiu supra i mètudi numèrici e i cunti ca cùrrinu: nvintari i schemi, scrìviri i solutori, purtàlli supra a GPU e cuntrullari ca i cunti tòrnanu.',
  },
  home: {
    expertise: 'Mistieri',
    inside: 'Chiddu ca c’è sutta',
    code: 'Còdici',
    publications: 'Cosi stampati',
    moreExpertise: 'Tutti i dittagghi',
    moreCode: 'Tuttu u còdici',
    morePublications: 'Tutti i pubblicazzioni',
  },
  codes: {
    title: 'Còdici',
    lead: 'Còdici di simulazzioni open source ca scrivu cu autri, i librerìi Fortran ca ci stannu sutta e i strumenti ca ci gìranu attornu.',
  },
  expertise: { title: 'Mistieri', lead: 'Chiddu ca fazzu, ogni cosa cu a so documentazzioni.' },
  about: {
    title: 'Cu sugnu',
    intro: [
      'Cuntentu e tuttu umili, v’annunziu ca puru sta simana, n’àutra vota, nun haiu rivuluziunatu a scienza. Nenti canciu di paradigma, nenti scuperta pi l’umanità, nenti premiu di na cummissioni d’amici stritti.',
      'U me tìtulu veru è <em>Chief Yak Shaver and Accidental Research Scientist</em>: vulìa simulari i fluidi, e pi fàllu comu si devi appi a scrìviri prima un sistema di build, un parser dâ riga di cumannu, na librerìa di stringhi, quarchi writer di furmati e na muntagna d’àutri tubbi ca nuddu annunzia. A la fini i fluidi foru simulati, supra a GPU. Pubblicu quannu haiu un risurtatu, e na vota sula pi risurtatu: na strategia ca manna a funnu u cuntu dî pubblicazzioni.',
    ],
    publications: 'Cosi stampati',
  },
  contact: {
    title: 'Scrivimi',
    lead: 'Na dumanna supra un còdici, o n’idea pi travagghiari nzèmmula? Scrivimi, ca nun mùzzicu.',
  },
  notFound: {
    title: 'Pàggina persa',
    heading: 'Nun c’è',
    lead: 'Sta pàggina nun c’è, o si nni ìu a Mondello.',
    back: 'Torna a casa',
  },
};

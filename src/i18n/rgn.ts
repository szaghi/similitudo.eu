// Romagnol of Rimini (rgn): a self-ironic version for Italian friends. Only the words worth saying in dialect are here;
// every other key comes from it.ts (src/i18n/index.ts).
// DRAFT, and a weak one: written Romagnol is scarce and its spellings compete. To be corrected by native speakers.
import type { DialectDict } from './index';

export const rgn: DialectDict = {
  site: { skip: 'Vèn a e’ sòd', home: 'similitudo, a ca' },
  nav: { expertise: 'Mistìr', code: 'Còdiz', about: 'Chi ch’a sò', contact: 'Scrivum', close: 'Sèra' },
  lead: ['I fluid e i plasma, simulè a nòmar,', 'sora gradèli adativ, a tòta GPU.'],
  byline: { by: 'ad', role: 'ricercatór a e’ CNR-IAC' },
  footer: {
    label: 'Chi ch’l’è',
    about:
      'similitudo l’è e’ nòm de mi lavór sora i metud numerich e i cont ch’i còr: invantè i schema, scrìv i solutur, purtèi sora al GPU e cuntrulè che i cont i tòrna.',
  },
  ui: { language: 'Lèngva' },
  home: {
    expertise: 'Mistìr',
    inside: 'Cs’u j è sòta',
    code: 'Còdiz',
    publications: 'Ròba stampèda',
    moreExpertise: 'Tòt i detài',
    moreCode: 'Tòt e’ còdiz',
    morePublications: 'Tòt al pubblicaziòn',
  },
  codes: {
    title: 'Còdiz',
    lead: 'Còdiz ad simulaziòn open source ch’a scriv sa d’atri, al librerì Fortran ch’a j sta sòta e i strumént ch’i j zira datònda.',
  },
  expertise: { title: 'Mistìr', lead: 'Quel ch’a fëgh, ogni ròba sa la su documentaziòn.' },
  about: {
    title: 'Chi ch’a sò',
    intro: [
      'Cuntent e tòt umil, a v’cumunich che ènca sta smana a n’ò miga rivoluziunè la sienza. Gnint cambi ad paradigma, gnint scuperta pr’e’ gènar umèn, gnint premi da una cumision d’amigh.',
      'E’ mi titul vèr l’è <em>Chief Yak Shaver and Accidental Research Scientist</em>: a vleva simulè i fluid, e par fèl ben a j ò duvù prèma scrìv un sistéma ad build, un parser dla riga ad cumand, una libreria ad stringhi, du-tre writer ad furmèt e una masa d’atri tub che inciòn u n’anuncia. Ma la fèn i fluid j è stè simulè, sora al GPU. A pubblich quand ch’a j ò un risultèt, e una vôlta sola par risultèt: una strategia da pataca, pr’e’ cont dal pubblicaziòn.',
    ],
    publications: 'Ròba stampèda',
  },
  contact: {
    title: 'Scrivum',
    lead: 'Una dmanda s’un còdiz, o un’idea par lavurè insen? Scrivum, ch’a n’mord miga.',
  },
  notFound: {
    title: 'Pagina pérsa',
    heading: 'U n’gn’è',
    lead: 'Sta pagina la n’gn’è, o l’è andèda a fè un gir a la marina.',
    back: 'Torna a ca',
  },
};

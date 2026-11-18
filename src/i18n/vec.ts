// Venetian of Venice (vec): a self-ironic version for Italian friends. Only the words worth saying in dialect are here;
// every other key comes from it.ts (src/i18n/index.ts). Spelling: the popular one of Venice (xe, ghe, no ł).
// DRAFT: to be corrected by native speakers.
import type { DialectDict } from './index';

export const vec: DialectDict = {
  site: { skip: 'Va al sodo', home: 'similitudo, a casa' },
  nav: { expertise: 'Mestier', code: 'Còdese', about: 'Chi che son', contact: 'Scrìveme', close: 'Sara' },
  lead: ['Fluidi e plasmi, simulài coi numeri,', 'su gradèle adatative, a tuta GPU.'],
  byline: { by: 'de', role: 'ricercador al CNR-IAC' },
  footer: {
    label: 'Chi che xe',
    about:
      'similitudo xe el nome del me laoro sui metodi numerici e sui conti che core: inventar i schemi, scrìvar i solutori, portarli su GPU e controlar che i conti torna.',
  },
  ui: { language: 'Lengua' },
  home: {
    expertise: 'Mestier',
    inside: 'Cossa ghe xe soto',
    code: 'Còdese',
    publications: 'Robe stampàe',
    moreExpertise: 'Tuti i detagli',
    moreCode: 'Tuto el còdese',
    morePublications: 'Tute le publicassion',
  },
  codes: {
    title: 'Còdese',
    lead: 'Còdesi de simulassion open source che scrivo co altri, le librerie Fortran che ghe sta soto e i strumenti che ghe gira intorno.',
  },
  expertise: { title: 'Mestier', lead: 'Quel che fasso, ogni roba co la so documentassion.' },
  about: {
    title: 'Chi che son',
    intro: [
      'Contento come na Pasqua e tuto modesto, ve fasso saver che anca sta setimana no go rivoluzionà la siensa. Gnente cambio de paradigma, gnente scoperta par l’umanità, gnente premio da na comission de amissi stretti.',
      'El me titolo vero xe <em>Chief Yak Shaver and Accidental Research Scientist</em>: volevo simular i fluidi, e par farlo come che se deve go dovesto prima scrìvar un sistema de build, un parser de la riga de comando, na libreria de stringhe, qualche writer de formati e na montagna de altri tubi che nissun anuncia. Ala fine i fluidi i xe stai simulài, su GPU. Publico quando che go un risultato, e na volta sola par risultato: na strategia che manda in malora el conto de le publicassion.',
    ],
    publications: 'Robe stampàe',
  },
  contact: {
    title: 'Scrìveme',
    lead: 'Na domanda su un còdese, o un’idea par laorar insieme? Scrìveme, no sta farte problemi.',
  },
  notFound: {
    title: 'Pagina persa',
    heading: 'No ghe xe',
    lead: 'Sta pagina no ghe xe, o la xe ’ndada in giro par cale.',
    back: 'Torna a casa',
  },
};

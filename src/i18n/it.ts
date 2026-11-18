// Italian copy. Same keys as en.ts (checked at build time); see the notes there.
import type { Dict } from './en';

export const it: Dict = {
  site: {
    description:
      'Metodi numerici e software di simulazione accelerato su GPU di Stefano Zaghi: griglie adattive, flussi comprimibili, magnetoidrodinamica e plasmi, dal portatile ai cluster di GPU.',
    ogAlt: "similitudo: il fronte di un'esplosione tracciato come un cerchio d'inchiostro su una griglia adattiva",
    skip: 'Vai al contenuto',
    home: 'similitudo, pagina iniziale',
    jobTitle: 'Ricercatore',
  },
  nav: {
    expertise: 'Competenze',
    code: 'Codice',
    about: 'Chi sono',
    contact: 'Contatti',
    main: 'Principale',
    mainMenu: 'Principale (menu)',
    menu: 'Menu',
    close: 'Chiudi',
  },
  lead: ['Fluidi e plasmi, simulati numericamente', 'su griglie adattive a velocità GPU.'],
  byline: { by: 'di', role: 'ricercatore al CNR-IAC' },
  readout: 'quadtree · livelli 0–{max} · {leaves} blocchi foglia · fronte r ∝ t^½ · t {t}',
  footer: {
    label: 'Informazioni',
    about:
      'similitudo è il nome del mio lavoro sui metodi numerici e sulla simulazione ad alte prestazioni: progettare gli schemi numerici, scrivere i solutori, portarli su GPU e verificarne i risultati.',
    privacy: 'Privacy',
  },
  ui: {
    theme: 'Passa al tema chiaro o scuro',
    themeTitle: 'Cambia tema',
    language: 'Lingua',
    pause: 'pausa',
    play: 'riproduci',
    source: 'Sorgente',
    logo: (name: string) => `logo di ${name}`,
    noLogo: (name: string) => `${name} (logo non ancora disponibile)`,
  },
  home: {
    expertise: 'Competenze',
    inside: 'Sotto la superficie',
    code: 'Codice',
    publications: 'Pubblicazioni scelte',
    moreExpertise: 'Dettagli e documentazione',
    moreCode: 'Tutto il codice',
    morePublications: 'Tutte le pubblicazioni',
  },
  kinds: {
    short: { sdk: 'sdk', solver: 'solutore', tool: 'strumento', library: 'libreria', general: 'uso generale' },
    long: { sdk: 'sdk', solver: 'solutore', tool: 'strumento', library: 'libreria', general: 'libreria di uso generale' },
    groups: { sdk: 'Kit di sviluppo', solver: 'Solutori', tool: 'Strumenti', library: 'Librerie scientifiche', general: 'Librerie di uso generale' },
  },
  codes: {
    title: 'Codice',
    description: 'Codici di simulazione open source di Stefano Zaghi e dei suoi coautori, le librerie Fortran su cui poggiano e gli strumenti che li accompagnano.',
    lead: 'Codici di simulazione open source che scrivo con i miei coautori, le librerie Fortran su cui poggiano e gli strumenti che li accompagnano.',
    builtOn: (name: string) => `basato su ${name}`,
  },
  code: {
    overview: 'Panoramica',
    gallery: 'Galleria',
    verification: 'Verifica',
    performance: 'Prestazioni',
    paper: 'Articolo di riferimento',
    paperFrom: (name: string) => `Articolo di riferimento (piattaforma ${name})`,
    facts: 'Scheda',
    builtOn: 'Basato su',
    status: 'Stato',
    licence: 'Licenza',
    docs: 'Documentazione',
    source: 'Sorgente',
    physics: 'Fisica',
    methods: 'Metodi',
    parallelism: 'Parallelismo',
    sourceLink: 'sorgente',
    statuses: { active: 'attivo', maintained: 'mantenuto', archived: 'archiviato' },
  },
  expertise: {
    title: 'Competenze',
    description: 'Di cosa si occupa Stefano Zaghi: griglie adattive, calcolo su GPU, flussi comprimibili, MHD e plasmi, geometria, verifica e ingegneria del software in Fortran.',
    lead: 'Di cosa mi occupo, ogni area con la documentazione che la sostiene.',
    docs: (code: string) => `documentazione ${code}`,
  },
  capabilities: {
    amr: {
      title: 'Raffinamento adattivo della griglia',
      task: 'Infrastruttura a griglie adattive per i solutori',
      text: 'AMR a blocchi strutturati su octree/quadtree con ordinamento di Morton (MORTIF), bilanciamento 2:1, bilanciamento del carico e I/O parallelo, su CPU e GPU.',
    },
    gpu: {
      title: 'Accelerazione su GPU',
      task: 'Porting e scalabilità dei solutori su cluster di GPU',
      text: "Uno strato di accesso ai dispositivi indipendente dal modello di programmazione, FUNDAL: un'unica API Fortran e un unico sorgente dei kernel per OpenACC (GPU NVIDIA) e OpenMP offloading (GPU AMD), più una modalità CPU, scelti in fase di compilazione; MPI tra i nodi, un dispositivo per rank.",
    },
    mhd: {
      title: 'Flussi comprimibili e MHD',
      task: 'Simulazione comprimibile e MHD ad alto ordine',
      text: 'Euler e MHD ideale con schemi WENO, termini dissipativi, gravità, autogravità, raffreddamento e particelle sink. Convergenza osservata del quinto ordine su problemi regolari.',
    },
    plasma: {
      title: 'Elettromagnetismo e plasmi',
      task: 'Modellistica Maxwell e particle-in-cell',
      text: 'Equazioni di Maxwell accoppiate a plasmi particle-in-cell, con condizioni al contorno PEC, Silver–Müller e PML; convergenza del secondo ordine verificata su CPU e GPU.',
    },
    geometry: {
      title: 'Geometrie complesse',
      task: 'Flussi attorno a corpi complessi, e la pipeline geometrica dalle superfici CAD alla griglia',
      text: 'Contorni immersi su griglie adattive, eseguiti su GPU, in ADAM. La geometria di cui ha bisogno un solutore, in FOSSIL: superfici lette, riparate e misurate con limiti certificati; distanze con segno e level set; interrogazioni per i contorni immersi, marcatura AMR e celle tagliate esatte; assemblaggio overset e griglie body-fitted; corpi in movimento e rilevamento delle collisioni; su CPU o bit per bit su GPU, poggiando su VecFor, algebra vettoriale richiamabile dentro i kernel GPU.',
    },
    output: {
      title: 'Output per la visualizzazione',
      task: 'Output delle simulazioni per ParaView e VisIt, e simulazioni seguite in tempo reale',
      text: 'Tre librerie Fortran. MOTIOn: dati HDF5 con metadati XDMF da codici MPI, un file per rank e un descrittore raccolto sul master. VTKFortran: file VTK di ogni tipo di griglia, pezzi paralleli con celle fantasma, assemblaggi multi-blocco, serie temporali che restano valide anche se la simulazione va in crash, binario compresso, array oltre 2 GiB; entrambe rileggono i propri file. foresight: grafici in stile gnuplot dei log come HTML interattivo, SVG o testo, ridisegnati mentre il job è in esecuzione.',
    },
    verification: {
      title: 'Verifica e validazione',
      task: 'Prove che un solutore è corretto, su CPU e GPU',
      text: "Studi di convergenza con soglie sull'ordine osservato, e gli stessi test eseguiti su CPU e GPU confrontati con output di riferimento.",
    },
    fortran: {
      title: 'Ingegneria del software in Fortran moderno',
      task: 'Fortran manutenibile e testato, riusato da altri progetti',
      text: 'Librerie Fortran progettate per il riuso, documentate e testate in CI con misura della copertura; otto di uso generale, diverse delle quali usate da altri progetti open source: PENF (kind portabili), FACE (colori nel terminale), BeFoR64 (Base64), StringiFor (stringhe), FiNeR (file INI), FLAP (riga di comando), forbear (barre di avanzamento), figure (GUI e grafici). Tutte compilate e testate con FoBiS, un build system per Fortran usato anche al di fuori di questi codici.',
    },
    literature: {
      title: "Stato dell'arte",
      task: 'Rassegne bibliografiche che restano aggiornate',
      text: 'La letteratura cercata in 22 banche dati scientifiche contemporaneamente e unificata per DOI, conservata in una libreria locale con i PDF che si ha il diritto di leggere; ordinata per pertinenza, riassunta e confrontata da un modello linguistico le cui affermazioni citano gli articoli; mappe delle citazioni del settore, e ricerche salvate che segnalano solo gli articoli nuovi. Con mosaic.',
    },
  },
  about: {
    title: 'Chi sono',
    description: 'Stefano Zaghi, ricercatore in metodi numerici e simulazione ad alte prestazioni, la persona dietro similitudo.',
    intro: [
      "Entusiasta e onorato di annunciare che questa settimana, ancora una volta, non ho rivoluzionato la scienza. Nessun cambio di paradigma, nessuna svolta per l'umanità, nessun premio da una commissione di amici stretti.",
      'Il mio vero titolo è <em>Chief Yak Shaver and Accidental Research Scientist</em>: volevo simulare fluidi, e per farlo come si deve ho dovuto prima scrivere un build system, un parser della riga di comando, una libreria di stringhe, qualche writer di formati di file e moltissimo altro lavoro da idraulico che nessuno annuncia. Alla fine i fluidi li ho simulati davvero, su GPU. Pubblico quando c\'è un risultato, e una sola volta per risultato: una strategia rovinosa per il numero di pubblicazioni.',
    ],
    publications: 'Pubblicazioni scelte',
    allPublications: (n: number) => `Tutte le pubblicazioni (${n})`,
    cv: 'CV (PDF)',
  },
  publications: {
    title: 'Pubblicazioni',
    description: 'Pubblicazioni di Stefano Zaghi: articoli su rivista, capitoli di libro e contributi a congresso.',
    lead: 'I miei articoli su rivista, capitoli di libro e contributi a congresso, dal più recente.',
    groups: { journal: 'Articoli su rivista', chapter: 'Capitoli di libro', conference: 'Contributi a congresso' },
  },
  contact: {
    title: 'Contatti',
    description: 'Come contattare Stefano Zaghi.',
    lead: "Una domanda su uno dei codici, o un'idea per una collaborazione? Scrivimi.",
    email: 'Email',
  },
  privacy: {
    title: 'Privacy',
    description: 'Cosa fa questo sito con i tuoi dati, e cosa non fa.',
    lead: 'In breve: questo sito non imposta cookie, non usa strumenti di analisi e non traccia nessuno.',
    sections: [
      {
        label: 'Chi',
        paras: ['Io, Stefano Zaghi, gestisco questo sito. Per qualsiasi questione sui tuoi dati, scrivimi a {mailto}.'],
      },
      {
        label: 'Questo sito',
        paras: [
          'Nessun cookie, nessuno strumento di analisi, nessun tracciamento, nessuna pubblicità, nessun contenuto incorporato di terze parti. Font, immagini e video sono serviti da questo stesso sito, quindi visitarlo non invia alcuna richiesta a nessun altro.',
          'Se usi il selettore chiaro/scuro, il tuo browser ricorda la scelta nella sua memoria locale (chiave <code>theme</code>). Resta sul tuo dispositivo e non viene mai inviata da nessuna parte; cancellando i dati del browser la rimuovi.',
        ],
      },
      {
        label: 'Hosting',
        paras: [
          'Il sito è un insieme di file statici ospitati da GitHub Pages (GitHub, Inc.). Come qualsiasi server web, GitHub riceve il tuo indirizzo IP a ogni richiesta e può registrarlo per finalità di sicurezza e di gestione operativa, secondo l\'<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">informativa sulla privacy di GitHub</a>. Il DNS del dominio è gestito da Cloudflare; le richieste delle pagine non passano attraverso Cloudflare.',
        ],
      },
      {
        label: 'Email',
        paras: [
          'La posta inviata a {email} viene inoltrata da Cloudflare Email Routing alla mia casella personale (<a href="https://www.cloudflare.com/privacypolicy/">informativa sulla privacy di Cloudflare</a>). La uso solo per risponderti, non la condivido mai e la cancello su richiesta.',
        ],
      },
      {
        label: 'I tuoi diritti',
        paras: [
          'In base al GDPR puoi chiedere quali dati che ti riguardano sono conservati, e ottenerne la rettifica o la cancellazione: scrivi all\'indirizzo qui sopra. I link ad altri siti (GitHub, ORCID, doi.org, la documentazione dei codici) portano a servizi con le proprie informative.',
        ],
      },
    ],
    updated: 'Ultimo aggiornamento: 13 novembre 2026.',
  },
  notFound: {
    title: 'Pagina non trovata',
    heading: 'Non trovata',
    lead: 'Questa pagina non esiste, o è stata spostata.',
    back: 'Torna alla pagina iniziale',
  },
};

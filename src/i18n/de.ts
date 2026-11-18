// German copy. Same keys as en.ts (checked at build time); see the notes there.
import type { Dict } from './en';
export const de: Dict = {
  site: {
    description:
      'Numerische Verfahren und GPU-beschleunigte Simulationssoftware von Stefano Zaghi: adaptive Gitter, kompressible Strömungen, Magnetohydrodynamik und Plasmen, vom Laptop bis zum GPU-Cluster.',
    ogAlt: 'similitudo: die Front einer Explosionswelle als Tuschekreis über einem adaptiven Gitter',
    skip: 'Zum Inhalt springen',
    home: 'similitudo, Startseite',
    jobTitle: 'Forscher',
  },
  nav: {
    expertise: 'Kompetenzen',
    code: 'Code',
    about: 'Über mich',
    contact: 'Kontakt',
    main: 'Hauptmenü',
    mainMenu: 'Hauptmenü (Menü)',
    menu: 'Menü',
    close: 'Schließen',
  },
  lead: ['Fluide und Plasmen, numerisch simuliert', 'auf adaptiven Gittern im GPU-Tempo.'],
  byline: { by: 'von', role: 'Forscher am CNR-IAC' },
  readout: 'Quadtree · Ebenen 0–{max} · {leaves} Blattblöcke · Front r ∝ t^½ · t {t}',
  footer: {
    label: 'Über',
    about:
      'similitudo ist der Name meiner Arbeit an numerischen Verfahren und Hochleistungssimulation: die Schemata entwerfen, die Löser schreiben, sie auf GPUs portieren und die Ergebnisse verifizieren.',
    privacy: 'Datenschutz',
  },
  ui: {
    theme: 'Zwischen hellem und dunklem Design wechseln',
    themeTitle: 'Design wechseln',
    language: 'Sprache',
    pause: 'Pause',
    play: 'Wiedergabe',
    source: 'Quelle',
    logo: (name: string) => `${name}-Logo`,
    noLogo: (name: string) => `${name} (noch kein Logo)`,
  },
  home: {
    expertise: 'Kompetenzen',
    inside: 'Unter der Oberfläche',
    code: 'Code',
    publications: 'Ausgewählte Publikationen',
    moreExpertise: 'Details und Dokumentation',
    moreCode: 'Alle Codes',
    morePublications: 'Alle Publikationen',
  },
  kinds: {
    short: { sdk: 'SDK', solver: 'Löser', tool: 'Werkzeug', library: 'Bibliothek', general: 'universell' },
    long: { sdk: 'SDK', solver: 'Löser', tool: 'Werkzeug', library: 'Bibliothek', general: 'universelle Bibliothek' },
    groups: { sdk: 'Entwicklungskits', solver: 'Löser', tool: 'Werkzeuge', library: 'Wissenschaftliche Bibliotheken', general: 'Universelle Bibliotheken' },
  },
  codes: {
    title: 'Code',
    description: 'Open-Source-Simulationscodes von Stefano Zaghi und Koautoren, die Fortran-Bibliotheken, auf denen sie aufbauen, und die Werkzeuge rund um sie.',
    lead: 'Open-Source-Simulationscodes, die ich mit Koautoren schreibe, die Fortran-Bibliotheken, auf denen sie aufbauen, und die Werkzeuge rund um sie.',
    builtOn: (name: string) => `basiert auf ${name}`,
  },
  code: {
    overview: 'Überblick',
    gallery: 'Galerie',
    verification: 'Verifikation',
    performance: 'Performance',
    paper: 'Referenzartikel',
    paperFrom: (name: string) => `Referenzartikel (${name}-Plattform)`,
    facts: 'Steckbrief',
    builtOn: 'Basiert auf',
    status: 'Status',
    licence: 'Lizenz',
    docs: 'Dokumentation',
    source: 'Quellcode',
    physics: 'Physik',
    methods: 'Methoden',
    parallelism: 'Parallelisierung',
    sourceLink: 'Quellcode',
    statuses: { active: 'aktiv', maintained: 'gepflegt', archived: 'archiviert' },
  },
  expertise: {
    title: 'Kompetenzen',
    description: 'Woran Stefano Zaghi arbeitet: adaptive Gitter, GPU-Computing, kompressible Strömungen, MHD und Plasmen, Geometrie, Verifikation und Fortran-Engineering.',
    lead: 'Woran ich arbeite, jedes Gebiet mit der Dokumentation dahinter.',
    docs: (code: string) => `${code}-Dokumentation`,
  },
  capabilities: {
    amr: {
      title: 'Adaptive Gitterverfeinerung',
      task: 'Infrastruktur für adaptive Gitter in Lösern',
      text: 'Blockstrukturierte Octree/Quadtree-AMR mit Morton-Ordnung (MORTIF), 2:1-Balancierung, Lastverteilung und paralleler I/O, auf CPUs und GPUs.',
    },
    gpu: {
      title: 'GPU-Beschleunigung',
      task: 'Löser auf GPU-Cluster portieren und skalieren',
      text: 'Eine vom Programmiermodell unabhängige Device-Schicht, FUNDAL: eine Fortran-API und ein Kernel-Quelltext für OpenACC (NVIDIA-GPUs) und OpenMP-Offloading (AMD-GPUs), dazu ein CPU-Modus, beim Kompilieren gewählt; MPI über Knoten hinweg, ein Device pro Rank.',
    },
    mhd: {
      title: 'Kompressible Strömungen und MHD',
      task: 'Kompressible und MHD-Simulation hoher Ordnung',
      text: 'Euler und ideale MHD mit WENO-Verfahren, dissipativen Termen, Gravitation, Eigengravitation, Kühlung und Sink-Partikeln. Beobachtete Konvergenz fünfter Ordnung bei glatten Problemen.',
    },
    plasma: {
      title: 'Elektromagnetik und Plasmen',
      task: 'Maxwell- und Particle-in-Cell-Modellierung',
      text: 'Maxwell-Gleichungen gekoppelt mit Particle-in-Cell-Plasmen, mit PEC-, Silver–Müller- und PML-Rändern; Konvergenz zweiter Ordnung auf CPU und GPU verifiziert.',
    },
    geometry: {
      title: 'Komplexe Geometrien',
      task: 'Strömungen um komplexe Körper, und die Geometrie-Pipeline von CAD-Oberflächen bis zum Gitter',
      text: 'Immersed Boundaries auf adaptiven Gittern, auf GPUs, in ADAM. Die Geometrie, die ein Löser braucht, in FOSSIL: Oberflächen eingelesen, repariert und vermessen, mit zertifizierten Schranken; vorzeichenbehaftete Abstände und Level-Sets; Immersed-Boundary-Abfragen, AMR-Markierung und exakte Cut-Cells; Overset-Assemblierung und körperangepasste Gitter; bewegte Körper und Kollisionserkennung; auf der CPU oder bitgenau auf der GPU, auf Basis von VecFor, Vektoralgebra, die innerhalb von GPU-Kernels aufrufbar ist.',
    },
    output: {
      title: 'Ausgabe für die Visualisierung',
      task: 'Simulationsausgabe für ParaView und VisIt, und Läufe live verfolgt',
      text: 'Drei Fortran-Bibliotheken. MOTIOn: HDF5-Daten mit XDMF-Metadaten aus MPI-Codes, eine Datei pro Rank und ein auf dem Master gesammelter Deskriptor. VTKFortran: VTK-Dateien jedes Gittertyps, parallele Teilstücke mit Geisterzellen, Multi-Block-Verbünde, Zeitreihen, die auch nach einem Absturz des Laufs gültig bleiben, komprimierte Binärdaten, Arrays über 2 GiB; beide lesen ihre Dateien auch wieder ein. foresight: gnuplot-artige Plots der Logs als interaktives HTML, SVG oder Text, neu gezeichnet, während der Job läuft.',
    },
    verification: {
      title: 'Verifikation und Validierung',
      task: 'Belege, dass ein Löser richtig rechnet, auf CPU und GPU',
      text: 'Konvergenzstudien mit Schranken für die beobachtete Ordnung, und dieselben Tests auf CPU und GPU gegen Referenzausgaben.',
    },
    fortran: {
      title: 'Modernes Fortran-Engineering',
      task: 'Wartbares, getestetes Fortran, das andere Projekte wiederverwenden',
      text: 'Fortran-Bibliotheken, auf Wiederverwendung ausgelegt, dokumentiert und in der CI mit Coverage getestet; acht davon universell einsetzbar, mehrere in anderen Open-Source-Projekten im Einsatz: PENF (portable Kinds), FACE (Terminalfarben), BeFoR64 (Base64), StringiFor (Strings), FiNeR (INI-Dateien), FLAP (Kommandozeilen), forbear (Fortschrittsbalken), figure (GUIs und Plots). Alle mit FoBiS gebaut und getestet, einem Fortran-Build-System, das auch über diese Codes hinaus genutzt wird.',
    },
    literature: {
      title: 'Stand der Forschung',
      task: 'Literaturrecherchen, die aktuell bleiben',
      text: 'Die Literatur in 22 wissenschaftlichen Datenbanken zugleich durchsucht und über die DOI zusammengeführt, in einer lokalen Bibliothek gehalten, mit den PDFs, die man lesen darf; gerankt, zusammengefasst und verglichen von einem Sprachmodell, dessen Aussagen die Artikel zitieren; Zitationskarten des Fachgebiets und gespeicherte Suchen, die nur die neuen Artikel melden. Mit mosaic.',
    },
  },
  about: {
    title: 'Über mich',
    description: 'Stefano Zaghi, Forscher für numerische Verfahren und Hochleistungssimulation, die Person hinter similitudo.',
    intro: [
      'Mit großer Freude und tiefer Demut gebe ich bekannt, dass ich auch diese Woche die Wissenschaft wieder nicht revolutioniert habe. Kein Paradigmenwechsel, kein Durchbruch für die Menschheit, kein Preis von einem Komitee enger Freunde.',
      'Mein eigentlicher Titel lautet <em>Chief Yak Shaver and Accidental Research Scientist</em>: Ich wollte Fluide simulieren, und um es richtig zu machen, musste ich zuerst ein Build-System schreiben, einen Kommandozeilen-Parser, eine String-Bibliothek, ein paar Writer für Dateiformate und jede Menge weiterer Klempnerarbeit, die niemand verkündet. Die Fluide wurden am Ende tatsächlich simuliert, auf GPUs. Ich publiziere, wenn es ein Ergebnis gibt, und einmal pro Ergebnis: eine ruinöse Strategie für die Publikationszahl.',
    ],
    publications: 'Ausgewählte Publikationen',
    allPublications: (n: number) => `Alle Publikationen (${n})`,
    cv: 'Lebenslauf (PDF)',
  },
  publications: {
    title: 'Publikationen',
    description: 'Publikationen von Stefano Zaghi: Zeitschriftenartikel, Buchkapitel und Konferenzbeiträge.',
    lead: 'Meine Zeitschriftenartikel, Buchkapitel und Konferenzbeiträge, die neuesten zuerst.',
    groups: { journal: 'Zeitschriftenartikel', chapter: 'Buchkapitel', conference: 'Konferenzbeiträge' },
  },
  contact: {
    title: 'Kontakt',
    description: 'So erreichen Sie Stefano Zaghi.',
    lead: 'Eine Frage zu einem der Codes oder eine Idee für eine Zusammenarbeit? Schreiben Sie mir.',
    email: 'E-Mail',
  },
  privacy: {
    title: 'Datenschutz',
    description: 'Was diese Website mit Ihren Daten tut und was nicht.',
    lead: 'Kurz gesagt: Diese Website setzt keine Cookies, nutzt keine Analysedienste und verfolgt niemanden.',
    sections: [
      {
        label: 'Verantwortlich',
        paras: ['Ich, Stefano Zaghi, betreibe diese Website. Für alle Fragen zu Ihren Daten schreiben Sie mir an {mailto}.'],
      },
      {
        label: 'Diese Website',
        paras: [
          'Keine Cookies, keine Analysedienste, kein Tracking, keine Werbung, keine eingebetteten Inhalte Dritter. Schriften, Bilder und Videos werden von dieser Website selbst ausgeliefert; ein Besuch sendet daher keine Anfrage an Dritte.',
          'Wenn Sie den Hell/Dunkel-Schalter verwenden, speichert Ihr Browser die Wahl in seinem lokalen Speicher (Schlüssel <code>theme</code>). Sie bleibt auf Ihrem Gerät und wird nirgendwohin gesendet; wenn Sie Ihre Browserdaten löschen, wird sie entfernt.',
        ],
      },
      {
        label: 'Hosting',
        paras: [
          'Die Website besteht aus statischen Dateien, die von GitHub Pages (GitHub, Inc.) gehostet werden. Wie jeder Webserver erhält GitHub bei jeder Anfrage Ihre IP-Adresse und kann sie zu Sicherheits- und Betriebszwecken protokollieren, gemäß der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">Datenschutzerklärung von GitHub</a>. Das DNS der Domain wird von Cloudflare verwaltet; Seitenanfragen laufen nicht über Cloudflare.',
        ],
      },
      {
        label: 'E-Mail',
        paras: [
          'An {email} gesendete E-Mails werden von Cloudflare Email Routing an mein persönliches Postfach weitergeleitet (<a href="https://www.cloudflare.com/privacypolicy/">Datenschutzrichtlinie von Cloudflare</a>). Ich verwende sie nur, um Ihnen zu antworten, gebe sie nie weiter und lösche sie auf Anfrage.',
        ],
      },
      {
        label: 'Ihre Rechte',
        paras: [
          'Nach der DSGVO können Sie Auskunft darüber verlangen, welche Daten über Sie gespeichert sind, und sie berichtigen oder löschen lassen: Schreiben Sie an die oben genannte Adresse. Links zu anderen Websites (GitHub, ORCID, doi.org, die Dokumentation der Codes) führen zu Diensten mit eigenen Datenschutzbestimmungen.',
        ],
      },
    ],
    updated: 'Zuletzt aktualisiert am 13. November 2026.',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    heading: 'Nicht gefunden',
    lead: 'Diese Seite existiert nicht oder wurde verschoben.',
    back: 'Zurück zur Startseite',
  },
};

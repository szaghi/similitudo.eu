// French copy. Same keys as en.ts (checked at build time); see the notes there.
import type { Dict } from './en';
export const fr: Dict = {
  site: {
    description:
      "Méthodes numériques et logiciels de simulation accélérés sur GPU, par Stefano Zaghi : maillages adaptatifs, écoulements compressibles, magnétohydrodynamique et plasmas, de l'ordinateur portable aux clusters GPU.",
    ogAlt: "similitudo : un front d'onde de souffle dessiné comme un cercle à l'encre sur un maillage adaptatif",
    skip: 'Aller au contenu',
    home: 'similitudo, accueil',
    jobTitle: 'Chercheur',
  },
  nav: {
    expertise: 'Expertise',
    code: 'Code',
    about: 'À propos',
    contact: 'Contact',
    main: 'Principal',
    mainMenu: 'Menu principal',
    menu: 'Menu',
    close: 'Fermer',
  },
  lead: ['Fluides et plasmas simulés numériquement', 'sur maillages adaptatifs, sur GPU.'],
  byline: { by: 'par', role: 'chercheur au CNR-IAC' },
  readout: 'quadtree · niveaux 0–{max} · {leaves} blocs feuilles · front r ∝ t^½ · t {t}',
  footer: {
    label: 'À propos',
    about:
      'similitudo est le nom de mon travail sur les méthodes numériques et la simulation haute performance : concevoir les schémas, écrire les solveurs, les porter sur GPU et vérifier les résultats.',
    privacy: 'Confidentialité',
  },
  ui: {
    theme: 'Basculer entre thème clair et thème sombre',
    themeTitle: 'Changer de thème',
    language: 'Langue',
    pause: 'pause',
    play: 'lecture',
    source: 'Source',
    logo: (name: string) => `Logo de ${name}`,
    noLogo: (name: string) => `${name} (pas encore de logo)`,
  },
  home: {
    expertise: 'Expertise',
    inside: 'Sous la surface',
    code: 'Code',
    publications: 'Publications choisies',
    moreExpertise: 'Détails et documentation',
    moreCode: 'Tout le code',
    morePublications: 'Toutes les publications',
  },
  kinds: {
    short: { sdk: 'sdk', solver: 'solveur', tool: 'outil', library: 'bibliothèque', general: 'généraliste' },
    long: { sdk: 'sdk', solver: 'solveur', tool: 'outil', library: 'bibliothèque', general: 'bibliothèque généraliste' },
    groups: {
      sdk: 'Kits de développement',
      solver: 'Solveurs',
      tool: 'Outils',
      library: 'Bibliothèques scientifiques',
      general: 'Bibliothèques généralistes',
    },
  },
  codes: {
    title: 'Code',
    description:
      'Codes de simulation open source de Stefano Zaghi et de ses coauteurs, les bibliothèques Fortran sur lesquelles ils reposent et les outils qui les entourent.',
    lead: "Les codes de simulation open source que j'écris avec des coauteurs, les bibliothèques Fortran sur lesquelles ils reposent et les outils qui les entourent.",
    builtOn: (name: string) => `bâti sur ${name}`,
  },
  code: {
    overview: 'Présentation',
    gallery: 'Galerie',
    verification: 'Vérification',
    performance: 'Performances',
    paper: 'Article de référence',
    paperFrom: (name: string) => `Article de référence (plateforme ${name})`,
    facts: 'Fiche',
    builtOn: 'Bâti sur',
    status: 'Statut',
    licence: 'Licence',
    docs: 'Documentation',
    source: 'Source',
    physics: 'Physique',
    methods: 'Méthodes',
    parallelism: 'Parallélisme',
    sourceLink: 'source',
    statuses: { active: 'actif', maintained: 'maintenu', archived: 'archivé' },
  },
  expertise: {
    title: 'Expertise',
    description:
      'Les domaines de travail de Stefano Zaghi : maillages adaptatifs, calcul sur GPU, écoulements compressibles, MHD et plasmas, géométrie, vérification et ingénierie Fortran.',
    lead: "Ce sur quoi je travaille, chaque domaine avec la documentation qui l'accompagne.",
    docs: (code: string) => `documentation ${code}`,
  },
  capabilities: {
    amr: {
      title: 'Raffinement de maillage adaptatif',
      task: 'Infrastructure de maillage adaptatif pour les solveurs',
      text: 'AMR structurée par blocs en octree/quadtree avec ordonnancement de Morton (MORTIF), équilibrage 2:1, équilibrage de charge et E/S parallèles, sur CPU et GPU.',
    },
    gpu: {
      title: 'Accélération GPU',
      task: "Portage et passage à l'échelle de solveurs sur clusters GPU",
      text: "Une couche d'accès à l'accélérateur indépendante du modèle de programmation, FUNDAL : une seule API Fortran et un seul code source des noyaux pour OpenACC (GPU NVIDIA) et l'offloading OpenMP (GPU AMD), plus un mode CPU, choisis à la compilation ; MPI entre les nœuds, un accélérateur par rang.",
    },
    mhd: {
      title: 'Écoulements compressibles et MHD',
      task: "Simulation compressible et MHD d'ordre élevé",
      text: "Euler et MHD idéale avec des schémas WENO, termes dissipatifs, gravité, autogravité, refroidissement et particules puits. Convergence d'ordre cinq observée sur des problèmes réguliers.",
    },
    plasma: {
      title: 'Électromagnétisme et plasmas',
      task: 'Modélisation Maxwell et particle-in-cell',
      text: "Équations de Maxwell couplées à des plasmas particle-in-cell, avec des frontières PEC, Silver–Müller et PML ; convergence d'ordre deux vérifiée sur CPU et GPU.",
    },
    geometry: {
      title: 'Géométries complexes',
      task: "Écoulements autour de corps complexes, et la chaîne géométrique des surfaces CAO jusqu'au maillage",
      text: "Frontières immergées sur maillages adaptatifs, sur GPU, dans ADAM. La géométrie dont un solveur a besoin, dans FOSSIL : surfaces lues, réparées et mesurées avec des bornes certifiées ; distances signées et level sets ; requêtes de frontières immergées, marquage AMR et cellules coupées exactes ; assemblage chimère et maillages ajustés au corps ; corps mobiles et détection de collisions ; sur CPU ou, au bit près, sur GPU, le tout bâti sur VecFor, une algèbre vectorielle appelable dans les noyaux GPU.",
    },
    output: {
      title: 'Sorties pour la visualisation',
      task: 'Sorties de simulation pour ParaView et VisIt, et calculs suivis en direct',
      text: "Trois bibliothèques Fortran. MOTIOn : données HDF5 avec métadonnées XDMF depuis des codes MPI, un fichier par rang et un descripteur rassemblé sur le maître. VTKFortran : fichiers VTK de tous les types de maillage, pièces parallèles avec cellules fantômes, assemblages multiblocs, séries temporelles qui restent valides si un calcul plante, binaire compressé, tableaux au-delà de 2 GiB ; toutes deux relisent leurs fichiers. foresight : tracés à la gnuplot des journaux, en HTML interactif, SVG ou texte, redessinés pendant l'exécution du job.",
    },
    verification: {
      title: 'Vérification et validation',
      task: "La preuve qu'un solveur est juste, sur CPU et GPU",
      text: "Études de convergence avec des bornes sur l'ordre observé, et les mêmes tests exécutés sur CPU et GPU, comparés à des sorties de référence.",
    },
    fortran: {
      title: 'Ingénierie Fortran moderne',
      task: "Du Fortran maintenable et testé, que d'autres projets réutilisent",
      text: "Des bibliothèques Fortran conçues pour être réutilisées, documentées et testées en CI avec mesure de couverture ; huit généralistes, dont plusieurs utilisées par d'autres projets open source : PENF (kinds portables), FACE (couleurs de terminal), BeFoR64 (Base64), StringiFor (chaînes de caractères), FiNeR (fichiers INI), FLAP (lignes de commande), forbear (barres de progression), figure (interfaces graphiques et tracés). Toutes compilées et testées avec FoBiS, un système de build Fortran utilisé au-delà de ces codes.",
    },
    literature: {
      title: "État de l'art",
      task: 'Des revues de littérature qui restent à jour',
      text: "La littérature interrogée dans 22 bases de données scientifiques à la fois et fusionnée par DOI, conservée dans une bibliothèque locale avec les PDF que l'on a le droit de lire ; classée, résumée et comparée par un modèle de langage dont les affirmations citent les articles ; cartes de citations du domaine, et recherches enregistrées qui ne signalent que les nouveaux articles. Avec mosaic.",
    },
  },
  about: {
    title: 'À propos',
    description:
      'Stefano Zaghi, chercheur en méthodes numériques et en simulation haute performance, la personne derrière similitudo.',
    intro: [
      "Ravi et humblement honoré d'annoncer que, cette semaine encore, je n'ai pas révolutionné la science. Aucun changement de paradigme, aucune percée pour l'humanité, aucun prix décerné par un comité d'amis proches.",
      "Mon véritable titre est <em>Chief Yak Shaver and Accidental Research Scientist</em> : je voulais simuler des fluides et, pour le faire correctement, j'ai d'abord dû écrire un système de build, un analyseur de ligne de commande, une bibliothèque de chaînes de caractères, quelques modules d'écriture de formats de fichiers et une foule d'autres travaux de plomberie que personne n'annonce. Les fluides ont bien fini par être simulés, sur GPU. Je publie quand il y a un résultat, et une fois par résultat : une stratégie ruineuse pour un nombre de publications.",
    ],
    publications: 'Publications choisies',
    allPublications: (n: number) => `Toutes les publications (${n})`,
    cv: 'CV (PDF)',
  },
  publications: {
    title: 'Publications',
    description:
      "Publications de Stefano Zaghi : articles de revues, chapitres d'ouvrages et communications de conférences.",
    lead: "Mes articles de revues, chapitres d'ouvrages et communications de conférences, du plus récent au plus ancien.",
    groups: {
      journal: 'Articles de revues',
      chapter: "Chapitres d'ouvrages",
      conference: 'Communications de conférences',
    },
  },
  contact: {
    title: 'Contact',
    description: 'Comment joindre Stefano Zaghi.',
    lead: "Une question sur l'un des codes, ou une idée de collaboration ? Écrivez-moi.",
    email: 'E-mail',
  },
  privacy: {
    title: 'Confidentialité',
    description: 'Ce que ce site fait, et ne fait pas, de vos données.',
    lead: "En bref : ce site ne dépose aucun cookie, n'effectue aucune mesure d'audience et ne piste personne.",
    sections: [
      {
        label: 'Qui',
        paras: [
          "C'est moi, Stefano Zaghi, qui gère ce site. Pour toute question concernant vos données, écrivez-moi à {mailto}.",
        ],
      },
      {
        label: 'Ce site',
        paras: [
          "Aucun cookie, aucune mesure d'audience, aucun pistage, aucune publicité, aucun contenu tiers intégré. Les polices, les images et les vidéos sont servies par ce site lui-même : le visiter n'envoie aucune requête à qui que ce soit d'autre.",
          "Si vous utilisez le sélecteur clair/sombre, votre navigateur mémorise votre choix dans son stockage local (clé <code>theme</code>). Il reste sur votre appareil et n'est jamais envoyé nulle part ; effacer les données de votre navigateur le supprime.",
        ],
      },
      {
        label: 'Hébergement',
        paras: [
          `Le site est un ensemble de fichiers statiques hébergés par GitHub Pages (GitHub, Inc.). Comme tout serveur web, GitHub reçoit votre adresse IP à chaque requête et peut l'enregistrer à des fins de sécurité et d'exploitation, dans le cadre de la <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">déclaration de confidentialité de GitHub</a>. Le DNS du domaine est géré par Cloudflare ; les requêtes de pages ne passent pas par Cloudflare.`,
        ],
      },
      {
        label: 'E-mail',
        paras: [
          `Le courrier envoyé à {email} est transféré par Cloudflare Email Routing vers ma boîte de réception personnelle (<a href="https://www.cloudflare.com/privacypolicy/">politique de confidentialité de Cloudflare</a>). Je ne l'utilise que pour vous répondre, ne le communique jamais à personne et le supprime sur demande.`,
        ],
      },
      {
        label: 'Vos droits',
        paras: [
          "En vertu du RGPD, vous pouvez demander quelles données vous concernant sont conservées, et les faire rectifier ou effacer : écrivez à l'adresse ci-dessus. Les liens vers d'autres sites (GitHub, ORCID, doi.org, la documentation des codes) mènent à des services qui ont leurs propres politiques.",
        ],
      },
    ],
    updated: 'Dernière mise à jour : 13 novembre 2026.',
  },
  notFound: {
    title: 'Page introuvable',
    heading: 'Introuvable',
    lead: "Cette page n'existe pas, ou a été déplacée.",
    back: "Retour à la page d'accueil",
  },
};

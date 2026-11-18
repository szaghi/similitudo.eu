// Spanish copy. Same keys as en.ts (checked at build time); see the notes there.
import type { Dict } from './en';
export const es: Dict = {
  site: {
    description:
      'Métodos numéricos y software de simulación acelerado por GPU de Stefano Zaghi: mallas adaptativas, flujos compresibles, magnetohidrodinámica y plasmas, desde un portátil hasta clústeres de GPU.',
    ogAlt: 'similitudo: un frente de onda expansiva dibujado como un círculo de tinta sobre una malla adaptativa',
    skip: 'Saltar al contenido',
    home: 'similitudo, inicio',
    jobTitle: 'Investigador',
  },
  nav: {
    expertise: 'Competencias',
    code: 'Código',
    about: 'Sobre mí',
    contact: 'Contacto',
    main: 'Principal',
    mainMenu: 'Principal (menú)',
    menu: 'Menú',
    close: 'Cerrar',
  },
  lead: ['Fluidos y plasmas en mallas adaptativas,', 'simulados a velocidad de GPU.'],
  byline: { by: 'por', role: 'investigador del CNR-IAC' },
  readout: 'quadtree · niveles 0–{max} · {leaves} bloques hoja · frente r ∝ t^½ · t {t}',
  footer: {
    label: 'Acerca de',
    about:
      'similitudo es el nombre de mi trabajo en métodos numéricos y simulación de alto rendimiento: diseñar los esquemas, escribir los solvers, portarlos a GPU y verificar los resultados.',
    privacy: 'Privacidad',
  },
  ui: {
    theme: 'Cambiar entre tema claro y oscuro',
    themeTitle: 'Cambiar tema',
    language: 'Idioma',
    pause: 'pausa',
    play: 'reproducir',
    source: 'Código fuente',
    logo: (name: string) => `logotipo de ${name}`,
    noLogo: (name: string) => `${name} (aún sin logotipo)`,
  },
  home: {
    expertise: 'Competencias',
    inside: 'Bajo la superficie',
    code: 'Código',
    publications: 'Publicaciones seleccionadas',
    moreExpertise: 'Detalles y documentación',
    moreCode: 'Todo el código',
    morePublications: 'Todas las publicaciones',
  },
  kinds: {
    short: { sdk: 'sdk', solver: 'solver', tool: 'herramienta', library: 'biblioteca', general: 'uso general' },
    long: { sdk: 'sdk', solver: 'solver', tool: 'herramienta', library: 'biblioteca', general: 'biblioteca de uso general' },
    groups: { sdk: 'Kits de desarrollo', solver: 'Solvers', tool: 'Herramientas', library: 'Bibliotecas científicas', general: 'Bibliotecas de uso general' },
  },
  codes: {
    title: 'Código',
    description: 'Códigos de simulación de código abierto de Stefano Zaghi y coautores, las bibliotecas Fortran sobre las que se construyen y las herramientas que los acompañan.',
    lead: 'Códigos de simulación de código abierto que escribo con coautores, las bibliotecas Fortran sobre las que se construyen y las herramientas que los acompañan.',
    builtOn: (name: string) => `basado en ${name}`,
  },
  code: {
    overview: 'Descripción general',
    gallery: 'Galería',
    verification: 'Verificación',
    performance: 'Rendimiento',
    paper: 'Artículo de referencia',
    paperFrom: (name: string) => `Artículo de referencia (plataforma ${name})`,
    facts: 'Datos',
    builtOn: 'Basado en',
    status: 'Estado',
    licence: 'Licencia',
    docs: 'Documentación',
    source: 'Código fuente',
    physics: 'Física',
    methods: 'Métodos',
    parallelism: 'Paralelismo',
    sourceLink: 'código fuente',
    statuses: { active: 'activo', maintained: 'mantenido', archived: 'archivado' },
  },
  expertise: {
    title: 'Competencias',
    description: 'En qué trabaja Stefano Zaghi: mallas adaptativas, computación en GPU, flujos compresibles, MHD y plasmas, geometría, verificación e ingeniería en Fortran.',
    lead: 'En qué trabajo, cada área con la documentación que la respalda.',
    docs: (code: string) => `documentación de ${code}`,
  },
  capabilities: {
    amr: {
      title: 'Refinamiento adaptativo de malla',
      task: 'Infraestructura de mallas adaptativas para solvers',
      text: 'AMR estructurado por bloques sobre octree/quadtree con ordenación de Morton (MORTIF), equilibrado 2:1, balanceo de carga y E/S paralela, en CPU y GPU.',
    },
    gpu: {
      title: 'Aceleración en GPU',
      task: 'Portar y escalar solvers en clústeres de GPU',
      text: 'Una capa de dispositivo independiente del modelo de programación, FUNDAL: una sola API Fortran y un solo código fuente de kernel para OpenACC (GPU NVIDIA) y OpenMP offloading (GPU AMD), más un modo CPU, elegidos en tiempo de compilación; MPI entre nodos, un dispositivo por proceso.',
    },
    mhd: {
      title: 'Flujos compresibles y MHD',
      task: 'Simulación compresible y MHD de alto orden',
      text: 'Euler y MHD ideal con esquemas WENO, términos disipativos, gravedad, autogravedad, enfriamiento y partículas sumidero. Convergencia de quinto orden observada en problemas suaves.',
    },
    plasma: {
      title: 'Electromagnetismo y plasmas',
      task: 'Modelado de Maxwell y de partículas en celda',
      text: 'Ecuaciones de Maxwell acopladas con plasmas de partículas en celda, con contornos PEC, Silver–Müller y PML; convergencia de segundo orden verificada en CPU y GPU.',
    },
    geometry: {
      title: 'Geometrías complejas',
      task: 'Flujos alrededor de cuerpos complejos, y el pipeline geométrico de las superficies CAD a la malla',
      text: 'Fronteras inmersas en mallas adaptativas, en GPU, en ADAM. La geometría que necesita un solver, en FOSSIL: superficies leídas, reparadas y medidas con cotas certificadas; distancias con signo y conjuntos de nivel; consultas de frontera inmersa, marcado para AMR y celdas cortadas exactas; ensamblado de mallas solapadas y mallas adaptadas al cuerpo; cuerpos en movimiento y detección de colisiones; en la CPU o bit a bit en la GPU, sobre VecFor, álgebra vectorial invocable dentro de kernels de GPU.',
    },
    output: {
      title: 'Salida para visualización',
      task: 'Salida de simulación para ParaView y VisIt, y ejecuciones seguidas en directo',
      text: 'Tres bibliotecas Fortran. MOTIOn: datos HDF5 con metadatos XDMF desde códigos MPI, un archivo por proceso y un descriptor reunido en el proceso maestro. VTKFortran: archivos VTK de todos los tipos de malla, piezas paralelas con celdas fantasma, ensamblados multibloque, series temporales que siguen siendo válidas si la ejecución se interrumpe, binario comprimido, arrays de más de 2 GiB; ambas releen sus propios archivos. foresight: gráficas al estilo de gnuplot a partir de los logs, en HTML interactivo, SVG o texto, regeneradas mientras el trabajo se ejecuta.',
    },
    verification: {
      title: 'Verificación y validación',
      task: 'Demostrar que un solver es correcto, en CPU y GPU',
      text: 'Estudios de convergencia con cotas sobre el orden observado, y las mismas pruebas ejecutadas en CPU y GPU frente a salidas de referencia.',
    },
    fortran: {
      title: 'Ingeniería en Fortran moderno',
      task: 'Fortran mantenible y probado que otros proyectos reutilizan',
      text: 'Bibliotecas Fortran diseñadas para reutilizarse, documentadas y probadas en CI con cobertura; ocho de uso general, varias de ellas usadas por otros proyectos de código abierto: PENF (kinds portables), FACE (colores de terminal), BeFoR64 (Base64), StringiFor (cadenas), FiNeR (archivos INI), FLAP (líneas de comandos), forbear (barras de progreso), figure (interfaces gráficas y gráficas). Todas compiladas y probadas con FoBiS, un sistema de compilación para Fortran que se usa más allá de estos códigos.',
    },
    literature: {
      title: 'Estado del arte',
      task: 'Revisiones bibliográficas que se mantienen al día',
      text: 'La literatura buscada en 22 bases de datos científicas a la vez y fusionada por DOI, guardada en una biblioteca local con los PDF que uno tiene derecho a leer; ordenada, resumida y comparada por un modelo de lenguaje cuyas afirmaciones citan los artículos; mapas de citas del campo, y búsquedas guardadas que solo informan de los artículos nuevos. Con mosaic.',
    },
  },
  about: {
    title: 'Sobre mí',
    description: 'Stefano Zaghi, investigador en métodos numéricos y simulación de alto rendimiento, la persona detrás de similitudo.',
    intro: [
      'Con enorme emoción y humildad anuncio que esta semana, una vez más, no he revolucionado la ciencia. Ningún cambio de paradigma, ningún avance para la humanidad, ningún premio de un comité de amigos íntimos.',
      'Mi verdadero cargo es <em>Chief Yak Shaver and Accidental Research Scientist</em>: me propuse simular fluidos y, para hacerlo como es debido, antes tuve que escribir un sistema de compilación, un analizador de línea de comandos, una biblioteca de cadenas, unos cuantos escritores de formatos de archivo y muchísima otra fontanería que nadie anuncia. Al final los fluidos sí se simularon, y en GPU. Publico cuando hay un resultado, y una sola vez por resultado: una estrategia ruinosa para el número de publicaciones.',
    ],
    publications: 'Publicaciones seleccionadas',
    allPublications: (n: number) => `Todas las publicaciones (${n})`,
    cv: 'CV (PDF)',
  },
  publications: {
    title: 'Publicaciones',
    description: 'Publicaciones de Stefano Zaghi: artículos en revistas, capítulos de libro y comunicaciones en congresos.',
    lead: 'Mis artículos en revistas, capítulos de libro y comunicaciones en congresos, de los más recientes a los más antiguos.',
    groups: { journal: 'Artículos en revistas', chapter: 'Capítulos de libro', conference: 'Comunicaciones en congresos' },
  },
  contact: {
    title: 'Contacto',
    description: 'Cómo contactar con Stefano Zaghi.',
    lead: '¿Una pregunta sobre alguno de los códigos, o una idea para colaborar? Escríbeme.',
    email: 'Correo electrónico',
  },
  privacy: {
    title: 'Privacidad',
    description: 'Lo que este sitio hace, y no hace, con tus datos.',
    lead: 'En resumen: este sitio no instala cookies, no usa analítica y no rastrea a nadie.',
    sections: [
      {
        label: 'Quién',
        paras: ['Yo, Stefano Zaghi, gestiono este sitio. Para cualquier cuestión sobre tus datos, escríbeme a {mailto}.'],
      },
      {
        label: 'Este sitio',
        paras: [
          'Sin cookies, sin analítica, sin rastreo, sin publicidad, sin contenidos incrustados de terceros. Las fuentes, las imágenes y los vídeos se sirven desde este mismo sitio, así que visitarlo no envía ninguna solicitud a nadie más.',
          'Si usas el selector de tema claro/oscuro, tu navegador recuerda la elección en su almacenamiento local (clave <code>theme</code>). Se queda en tu dispositivo y nunca se envía a ninguna parte; al borrar los datos del navegador se elimina.',
        ],
      },
      {
        label: 'Alojamiento',
        paras: [
          'El sitio es un conjunto de archivos estáticos alojados en GitHub Pages (GitHub, Inc.). Como cualquier servidor web, GitHub recibe tu dirección IP con cada solicitud y puede registrarla con fines de seguridad y operación, conforme a la <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">declaración de privacidad de GitHub</a>. El DNS del dominio lo gestiona Cloudflare; las solicitudes de páginas no pasan por Cloudflare.',
        ],
      },
      {
        label: 'Correo electrónico',
        paras: [
          'Cloudflare Email Routing reenvía el correo enviado a {email} a mi buzón personal (<a href="https://www.cloudflare.com/privacypolicy/">política de privacidad de Cloudflare</a>). Lo uso solo para responderte, nunca lo comparto y lo borro si lo solicitas.',
        ],
      },
      {
        label: 'Tus derechos',
        paras: [
          'En virtud del RGPD puedes preguntar qué datos sobre ti se conservan y pedir que se rectifiquen o se supriman: escribe a la dirección indicada arriba. Los enlaces a otros sitios (GitHub, ORCID, doi.org, la documentación de los códigos) llevan a servicios con sus propias políticas.',
        ],
      },
    ],
    updated: 'Última actualización: 13 de noviembre de 2026.',
  },
  notFound: {
    title: 'Página no encontrada',
    heading: 'No encontrada',
    lead: 'Esta página no existe o se ha movido.',
    back: 'Volver a la página de inicio',
  },
};

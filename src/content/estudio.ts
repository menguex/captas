/** Estudio — red creativa: unión de profesionales por proyecto */

export const estudioHero = {
  kicker: "Estudio",
  titleLead: "No es un local.",
  titleAccent: "Es tu squad creativo online.",
  body: "Un director de proyecto, los especialistas que hagan falta y una sola voz en cada entrega. Tú hablas con Captas; nosotros coordinamos UX, foto, cine, web y marca.",
  hubHint: "Gira el anillo o toca un craft para ver qué aporta cada uno.",
  onlineTag: "100% remoto · Chile → mundo",
} as const;

/** Tres ideas — entender Captas en segundos */
export const estudioQuickGuide = [
  {
    id: "brief",
    step: "01",
    title: "Un solo brief",
    text: "Cuéntanos el reto. Definimos objetivo, plazos y qué crafts activar — sin repetir la historia cinco veces.",
  },
  {
    id: "squad",
    step: "02",
    title: "Armamos el squad",
    text: "Entran solo UX, motion, foto, cine, web o marca si tu proyecto lo necesita. Un director lleva el hilo.",
  },
  {
    id: "entrega",
    step: "03",
    title: "Entregas alineadas",
    text: "Todo sale con el mismo estándar visual y narrativo. Listo para lanzar, medir y escalar.",
  },
] as const;

export const estudioCompare = {
  kicker: "Por qué un squad",
  title: "Menos fricción.",
  titleAccent: "Más claridad.",
  without: {
    label: "Proveedores sueltos",
    items: [
      "Briefs repetidos en cada agencia",
      "Estilos que no calzan entre piezas",
      "Tú haces de project manager",
      "Plazos que se pisan",
    ],
  },
  with: {
    label: "Captas · un squad",
    items: [
      "Un contacto · un director de proyecto",
      "Misma voz en web, foto y motion",
      "Coordinamos producción por ti",
      "Roadmap claro etapa por etapa",
    ],
  },
} as const;

export const estudioSections = [
  { id: "squad", label: "Squad interactivo" },
  { id: "guia", label: "En 3 pasos" },
  { id: "por-que", label: "Por qué Captas" },
  { id: "como", label: "Cómo trabajamos" },
  { id: "quien", label: "Quién entra" },
] as const;

export const estudioUnion = {
  headline: "Varios profesionales.",
  headlineAccent: "Un proyecto armado.",
  subline: "Solo activamos el craft que tu reto necesita — nada de relleno.",
  crafts: [
    "Director",
    "UX/UI",
    "Motion",
    "Foto",
    "Cine",
    "Web",
    "Marca",
    "Estrategia",
  ],
  result: "1 proyecto · 1 voz",
} as const;

export type EstudioOrbitNode = {
  id: string;
  label: string;
  angle: number;
  pillarId?:
    | "ux-ui"
    | "fotografia"
    | "diseno-web"
    | "video-cinematografico"
    | "branding";
  tagline: string;
};

export const estudioOrbitNodes: EstudioOrbitNode[] = [
  { id: "ux", label: "UX/UI", angle: 0, pillarId: "ux-ui", tagline: "Experiencia, flujos y pantallas" },
  { id: "motion", label: "Motion", angle: 60, pillarId: "video-cinematografico", tagline: "Animación con intención" },
  { id: "foto", label: "Foto", angle: 120, pillarId: "fotografia", tagline: "Imagen editorial y producto" },
  { id: "cine", label: "Cine", angle: 180, pillarId: "video-cinematografico", tagline: "Piezas con lenguaje cinematográfico" },
  { id: "web", label: "Web", angle: 240, pillarId: "diseno-web", tagline: "Sitios rápidos y conversión" },
  { id: "marca", label: "Marca", angle: 300, pillarId: "branding", tagline: "Sistema visual y narrativa" },
];

export const estudioModel = [
  {
    id: "escucha",
    step: "01",
    title: "Escuchamos el reto",
    hook: "Brief claro, sin humo",
    text: "Negocio, audiencia, plazos y éxito medible. Definimos qué debe resolver el proyecto antes de diseñar una sola pantalla.",
    emoji: "◎",
  },
  {
    id: "equipo",
    step: "02",
    title: "Armamos el squad",
    hook: "Las piezas justas",
    text: "Sumamos solo los profesionales que el alcance exige. Un director orquesta; especialistas ejecutan en paralelo.",
    emoji: "◆",
  },
  {
    id: "craft",
    step: "03",
    title: "Producimos con craft",
    hook: "Un solo estándar",
    text: "UX, rodaje, motion y desarrollo avanzan juntos. Revisiones cortas, decisiones alineadas, cero silos.",
    emoji: "✦",
  },
  {
    id: "lanzamiento",
    step: "04",
    title: "Lanzamos contigo",
    hook: "Listo para el mundo",
    text: "Entregamos, medimos y afinamos. Tu marca sale coherente en cada canal — digital primero.",
    emoji: "→",
  },
] as const;

export const estudioCollective = [
  {
    id: "director",
    name: "Dirección Captas",
    role: "UX · Motion · Estrategia",
    bio: "Orquesta el proyecto, define la experiencia y cuida que cada entrega empuje el mismo objetivo.",
    adds: "Hilo director único",
  },
  {
    id: "produccion",
    name: "Producción",
    role: "Foto · Video · Post",
    bio: "Rodaje, luz y post con look cinematográfico — en terreno cuando hace falta, siempre con visión de marca.",
    adds: "Craft en imagen y cine",
  },
  {
    id: "red",
    name: "Red senior",
    role: "Branding · Dev · Estrategia",
    bio: "Colaboradores de confianza que entran al squad según el proyecto. Misma voz, mismo nivel.",
    adds: "Escala sin perder calidad",
  },
] as const;

export const estudioTerritory = {
  kicker: "Origen · sensibilidad",
  line: "Raíz en el Limarí. Alcance sin fronteras.",
  text: "La luz del valle y el criterio global no se excluyen: trabajamos remoto con marcas en Chile y exportación.",
} as const;

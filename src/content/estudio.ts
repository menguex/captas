/** Estudio — red creativa online, no espacio físico */

export const estudioHero = {
  kicker: "Estudio",
  titleLead: "No es un lugar.",
  titleAccent: "Es la unión correcta de talento.",
  body: "Armamos equipos a medida — UX, motion, foto, cine, web y marca — con un solo director de proyecto y un estándar de craft. Online, sin fricción entre proveedores.",
  onlineTag: "100% remoto · Chile → mundo",
} as const;

export const estudioOrbitNodes = [
  { id: "ux", label: "UX/UI", angle: 0 },
  { id: "motion", label: "Motion", angle: 60 },
  { id: "foto", label: "Foto", angle: 120 },
  { id: "cine", label: "Cine", angle: 180 },
  { id: "web", label: "Web", angle: 240 },
  { id: "marca", label: "Marca", angle: 300 },
] as const;

export const estudioModel = [
  {
    id: "escucha",
    title: "Escuchamos el reto",
    hook: "Brief claro, sin humo",
    text: "Entendemos negocio, audiencia y plazos. Definimos qué tiene que resolver la experiencia — no solo cómo se ve.",
  },
  {
    id: "equipo",
    title: "Armamos el equipo",
    hook: "Las piezas justas",
    text: "Activamos solo los craft que tu proyecto necesita. Un hilo director, varios especialistas, cero silos.",
  },
  {
    id: "craft",
    title: "Producimos con craft",
    hook: "Un solo estándar",
    text: "Diseño, rodaje, motion y desarrollo avanzan en paralelo con revisiones cortas y decisiones alineadas.",
  },
  {
    id: "lanzamiento",
    title: "Lanzamos contigo",
    hook: "Listo para el mundo",
    text: "Entregamos, medimos y afinamos. Tu marca sale coherente en cada canal — digital primero.",
  },
] as const;

export const estudioCollective = [
  {
    id: "director",
    name: "Dirección Captas",
    role: "UX · Motion · Estrategia",
    bio: "Orquesta el proyecto, define la experiencia y cuida que cada entrega empuje el mismo objetivo.",
  },
  {
    id: "produccion",
    name: "Producción",
    role: "Foto · Video · Post",
    bio: "Rodaje, luz y post con look cinematográfico — en terreno cuando hace falta, siempre con visión de marca.",
  },
  {
    id: "red",
    name: "Red senior",
    role: "Branding · Dev · Estrategia",
    bio: "Colaboradores de confianza que se suman al squad según el alcance. Misma voz, mismo nivel.",
  },
] as const;

export const estudioTerritory = {
  kicker: "Origen · sensibilidad",
  line: "Raíz en el Limarí. Alcance sin fronteras.",
  text: "La luz del valle y el criterio global no se excluyen: trabajamos remoto con marcas en Chile y exportación.",
} as const;

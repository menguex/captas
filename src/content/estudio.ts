/** Estudio — narrativa en 3 pasos */

export const estudioHero = {
  kicker: "Estudio",
  index: "002",
  label: "Red creativa",
  titleLead: "Tu squad creativo,",
  titleAccent: "en 3 pasos.",
  body: "Un director, los crafts que hagan falta y una sola voz en cada entrega.",
  ctaPrimary: "Ver el proceso",
  ctaSecondary: "Armar mi proyecto",
  onlineTag: "100% remoto",
  onlineTagDetail: "Chile → mundo",
} as const;

export const estudioJourneyIntro = {
  kicker: "El proceso",
  title: "Claro desde el primer scroll.",
  description:
    "Tres capítulos — brief, squad y entrega. Toca un paso o baja en orden; en móvil, desliza las pestañas.",
} as const;

export type EstudioJourneyStep = {
  id: string;
  step: string;
  kicker: string;
  hook: string;
  title: string;
  titleAccent: string;
  body: string;
  chips?: readonly string[];
};

export const estudioJourney: readonly EstudioJourneyStep[] = [
  {
    id: "brief",
    step: "01",
    kicker: "Paso 1",
    hook: "Una conversación, un hilo",
    title: "Un solo brief.",
    titleAccent: "Cero vueltas.",
    body: "Definimos objetivo, plazos y qué crafts activar. Tú cuentas el reto una vez; nosotros llevamos la coordinación.",
  },
  {
    id: "squad",
    step: "02",
    kicker: "Paso 2",
    hook: "Solo lo que el proyecto pide",
    title: "Armamos el squad.",
    titleAccent: "Sin relleno.",
    body: "UX, foto, cine, web o marca entran si aportan al alcance. Un director de Captas orquesta; tú no haces de project manager.",
    chips: ["UX/UI", "Motion", "Foto", "Cine", "Web", "Marca"],
  },
  {
    id: "entrega",
    step: "03",
    kicker: "Paso 3",
    hook: "Misma voz, listo para medir",
    title: "Entregas alineadas.",
    titleAccent: "Listas para lanzar.",
    body: "Web, imagen y motion con el mismo estándar. Medimos, afinamos y escalamos — con raíz en el Limarí y alcance global.",
  },
] as const;

export const estudioFinale = {
  kicker: "Siguiente paso",
  title: "¿Armamos tu squad?",
  body: "Cuéntanos el reto. En una llamada definimos alcance, plazos y el craft que más impacta ahora.",
  cta: "Armar mi proyecto",
  secondary: "Ver servicios",
} as const;

export const estudioPrinciples = [
  { label: "1 contacto", detail: "Hablas con Captas" },
  { label: "1 director", detail: "Un hilo en todo" },
  { label: "6 crafts", detail: "Activos a medida" },
] as const;

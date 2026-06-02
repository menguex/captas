/** Estudio — recorrido guiado en 3 pasos */

export const estudioHero = {
  kicker: "Estudio",
  title: "Tu squad creativo, en 3 pasos.",
  body: "Sin agencias sueltas ni briefs repetidos. Desliza y te mostramos cómo trabajamos contigo.",
  scrollHint: "Desliza para empezar",
  onlineTag: "100% remoto · Chile → mundo",
} as const;

export type EstudioJourneyStep = {
  id: string;
  step: string;
  kicker: string;
  title: string;
  titleAccent: string;
  body: string;
  /** Chips opcionales (paso 2) */
  chips?: readonly string[];
};

export const estudioJourney: readonly EstudioJourneyStep[] = [
  {
    id: "brief",
    step: "01",
    kicker: "Paso 1",
    title: "Un solo brief.",
    titleAccent: "Cero vueltas.",
    body: "Cuéntanos el reto: negocio, plazos y qué quieres lograr. Definimos objetivo y qué crafts activar — una sola conversación, un solo hilo.",
  },
  {
    id: "squad",
    step: "02",
    kicker: "Paso 2",
    title: "Armamos el squad.",
    titleAccent: "Solo lo necesario.",
    body: "Entra UX, foto, cine, web o marca si tu proyecto lo pide. Un director de Captas coordina; tú no haces de project manager.",
    chips: ["UX/UI", "Motion", "Foto", "Cine", "Web", "Marca"],
  },
  {
    id: "entrega",
    step: "03",
    kicker: "Paso 3",
    title: "Entregas alineadas.",
    titleAccent: "Listas para lanzar.",
    body: "Misma voz en cada pieza — web, imagen y motion. Medimos, afinamos y escalamos. Raíz en el Limarí, alcance sin fronteras.",
  },
] as const;

export const estudioFinale = {
  line: "¿Listo para armar tu proyecto?",
  cta: "Armar mi proyecto",
  secondary: "Ver servicios",
} as const;

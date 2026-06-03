/** Manifiesto — momento de conversión en home */

export type ManifestoStage = {
  id: string;
  verb: string;
  pillar: string;
  caption: string;
};

export const manifestoStages: readonly ManifestoStage[] = [
  {
    id: "feel",
    verb: "se siente.",
    pillar: "Branding",
    caption: "Identidad · tacto · voz",
  },
  {
    id: "move",
    verb: "se mueve.",
    pillar: "Motion",
    caption: "Cine · ritmo · gesto",
  },
  {
    id: "interface",
    verb: "piensa en interfaz.",
    pillar: "UX/UI",
    caption: "Flujos · pantallas · craft digital",
  },
  {
    id: "ai",
    verb: "evoluciona con IA.",
    pillar: "Sistemas",
    caption: "Prototipos · datos · producto vivo",
  },
  {
    id: "remember",
    verb: "se recuerda.",
    pillar: "Legado",
    caption: "Memoria · territorio · tiempo",
  },
] as const;

export const manifestoContent = {
  kicker: "Manifiesto",
  issue: "001",
  prelude:
    "No hacemos publicidad. Unimos estrategia, diseño, interfaz, motion e inteligencia — con un solo director creativo y un solo criterio.",
  lines: ["Construimos cómo", "una marca"],
  /** Fallback cuando prefers-reduced-motion */
  closingReduced:
    "se siente, se mueve, piensa en interfaz, evoluciona con IA y se recuerda.",
  bridge:
    "Si buscas un equipo que piense la marca de punta a punta — del concepto al pixel, al frame y al sistema — este es el momento de hablar.",
  proof: "Un director creativo · Un hilo de principio a fin",
  signoff: "Captas · Limarí, Chile",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Ver trabajo real",
  craftsLabel: "Lo que activamos",
  disciplines: ["UX/UI", "Motion", "Branding", "IA & sistemas"] as const,
  stageIntervalMs: 4200,
} as const;

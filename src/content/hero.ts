/** Copy y datos del hero (home) */

export const heroContent = {
  kicker: "Agencia creativa · Limarí, Chile",
  status: "Disponible · proyectos 2026",
  statement: "Full-service · un director · un hilo",
  lines: [
    {
      id: "line-1",
      lead: "Marcas que se ",
      accent: "elevan.",
      gradient: "from-[#0056d6] via-accent to-[#0ea5e9]",
    },
    {
      id: "line-2",
      lead: "Experiencias que ",
      accent: "perduran.",
      gradient: "from-[#5b61ff] via-[#5c5478] to-accent-deep",
    },
  ],
  subline:
    "UX/UI, motion, foto y cine en una sola dirección creativa — para competir en Chile y en exportación.",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Ver portafolio",
  scrollLabel: "Scroll · explora casos",
  crafts: ["UX/UI", "Motion", "Branding", "Foto", "Cine", "Web"] as const,
  metrics: [
    { value: "120+", label: "Proyectos" },
    { value: "8", label: "Años" },
    { value: "92%", label: "Recomiendan" },
  ],
  scrollRail: {
    kicker: "Selected work",
    hint: "El scroll mueve el carril",
    cta: "Todo el trabajo",
    counterLabel: "Caso",
  },
} as const;

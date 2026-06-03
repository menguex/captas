/** Copy y datos del hero (home) */

export const heroContent = {
  kicker: "Agencia creativa · Limarí, Chile",
  status: "Disponible · proyectos Q2",
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
    "UX/UI, motion, fotografía, cine y branding en un solo hilo — craft premium para Chile y exportación.",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Ver trabajo",
  scrollLabel: "Scroll para explorar",
  crafts: ["UX/UI", "Motion", "Branding", "Foto", "Cine", "Web"] as const,
  metrics: [
    { value: "120+", label: "Experiencias" },
    { value: "8", label: "Años de craft" },
    { value: "92%", label: "Recomiendan" },
  ],
  scrollRail: {
    kicker: "Trabajo seleccionado",
    hint: "Arrastra con el scroll",
    cta: "Ver portafolio",
  },
} as const;

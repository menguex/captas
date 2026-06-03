/** Copy del hero — mensaje de agencia de diseño (sin portfolio) */

export const heroContent = {
  index: "001",
  kicker: "Estudio de diseño · Limarí, Chile",
  headline: "Captamos lo esencial.",
  headlineAccent: "Lo convertimos en experiencia.",
  tagline:
    "Agencia de diseño y experiencia con dirección creativa única — del concepto al pixel, del frame al sistema.",
  statement:
    "Diseñamos marcas que se sienten claras, se mueven con propósito y se recuerdan sin insistir.",
  pillars: [
    { label: "01", title: "Estrategia visual", text: "Concepto antes del primer pixel." },
    { label: "02", title: "Craft", text: "Sistemas coherentes en cada touchpoint." },
    { label: "03", title: "Emoción", text: "Motion y narrativa que comunican valor." },
  ],
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Nuestra forma de pensar",
  scrollLabel: "Scroll",
  disciplines: ["Branding", "UX/UI", "Foto", "Cine", "Web", "Motion"] as const,
  metrics: [
    { value: "8+", label: "Años de estudio" },
    { value: "1", label: "Director creativo" },
    { value: "Limarí", label: "Territorio" },
  ],
  backgroundImage: "/images/hero/dji-0068.jpg",
} as const;

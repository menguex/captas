/** Copy del hero — mensaje de agencia de diseño (sin portfolio) */

export const heroContent = {
  index: "001",
  kicker: "Estudio de diseño · Limarí, Chile",
  headline: "Captamos lo esencial.",
  headlineLine2: "Lo convertimos en",
  headlineAccentWord: "experiencia.",
  tagline:
    "Dirección creativa que vende: marca, interfaz, motion y contenido con un solo criterio — del brief al resultado.",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Nuestra forma de pensar",
  scrollLabel: "Scroll",
  disciplines: ["Branding", "UX/UI", "Foto", "Cine", "Web", "Motion"] as const,
  metrics: [
    { value: "8+", label: "Años de estudio" },
    { value: "1", label: "Director creativo" },
    { value: "Limarí", label: "Territorio" },
  ],
  /** Reel comercial — energía retail / lifestyle (Mixkit, uso libre) */
  backgroundVideo: "/videos/hero/commercial-energy.mp4",
  backgroundPoster: "/images/hero/commercial-energy-poster.jpg",
  backgroundPosition: "center 42%",
} as const;

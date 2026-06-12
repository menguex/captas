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
  /** Diseñador en estación creativa — 1080p, cámara estable (Mixkit 50602, uso libre) */
  backgroundVideo: "/videos/hero/hero-design-reel.mp4",
  backgroundPoster: "/images/hero/hero-design-reel-poster.jpg",
  backgroundPosition: "center 42%",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "11",
} as const;

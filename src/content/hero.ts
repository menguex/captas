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
  /** Negocio premium — quiet luxury, cámara estable (Mixkit 4868, uso libre) */
  backgroundVideo: "/videos/hero/hero-apple-business.mp4",
  backgroundPoster: "/images/hero/hero-apple-business-poster.jpg",
  backgroundPosition: "center 38%",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "8",
} as const;

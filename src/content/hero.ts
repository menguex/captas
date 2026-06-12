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
  /** Equipo revisando proyectos y métricas — 4K, distinto al footer/método (Pexels, uso libre) */
  backgroundVideo: "/videos/hero/hero-enterprise-projects-4k.mp4",
  backgroundPoster: "/images/hero/hero-enterprise-projects-poster.jpg",
  backgroundPosition: "center 42%",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "5",
} as const;

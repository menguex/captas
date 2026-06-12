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
  /** Reunión ejecutiva — cámara fija, gestos y diálogo (Mixkit 4872, uso libre) */
  backgroundVideo: "/videos/hero/hero-stable-boardroom.mp4",
  backgroundPoster: "/images/hero/hero-stable-boardroom-poster.jpg",
  backgroundPosition: "center 36%",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "7",
} as const;

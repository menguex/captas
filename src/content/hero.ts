/** Copy del hero — mensaje de agencia de diseño (sin portfolio) */

export const heroContent = {
  index: "001",
  kicker: "Estudio de diseño · Limarí, Chile",
  headline: "Captamos lo esencial.",
  headlineLine2: "Lo convertimos en",
  headlineAccentWord: "experiencia.",
  tagline:
    "Soluciones creativas a medida: marca, interfaz, motion y contenido con un solo criterio — del reto al resultado.",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Nuestra forma de pensar",
  scrollLabel: "Scroll",
  disciplines: ["Branding", "UX/UI", "Foto", "Cine", "Web", "Motion"] as const,
  metrics: [
    { value: "8+", label: "Años de estudio" },
    { value: "1", label: "Director creativo" },
    { value: "Limarí", label: "Territorio" },
  ],
  /**
   * Túnel abstracto en loop — motion/design (Pixabay #301542, tunnelmotions).
   * Licencia: Pixabay Content License.
   */
  backgroundVideo: "/videos/hero/hero-tunnel-loop.mp4",
  backgroundPoster: "/images/hero/hero-tunnel-loop-poster.jpg",
  backgroundPosition: "center center",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "15",
} as const;

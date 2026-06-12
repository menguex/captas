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
   * Criterio hero: estudio creativo (pantallas, craft, producción).
   * Evitar: parejas, cafés íntimos, lifestyle, reuniones genéricas de 2 personas.
   */
  backgroundVideo: "/videos/hero/hero-creative-desk.mp4",
  backgroundPoster: "/images/hero/hero-creative-desk-poster.jpg",
  /** Encuadre en monitor y mesa de trabajo, no rostros */
  backgroundPosition: "58% 42%",
  /** Rompe caché del navegador cuando cambia el reel */
  backgroundMediaVersion: "14",
} as const;

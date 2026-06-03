/** Manifiesto editorial — home */
export const manifestoContent = {
  kicker: "Manifiesto",
  issue: "001",
  prelude: "No solo diseñamos interfaces —",
  lines: ["Construimos la forma", "en que una marca"],
  closing: "se siente, se mueve y se recuerda.",
  /** Palabras con acento de marca en el cierre */
  closingAccent: ["se mueve"],
  /** Filas tipográficas — desplazamiento horizontal ligado al scroll */
  scrollRows: [
    { text: "Construimos", from: "6vw", to: "-44vw", tone: "solid" as const },
    { text: "la forma", from: "-40vw", to: "8vw", tone: "muted" as const },
    { text: "en que una marca", from: "5vw", to: "-36vw", tone: "outline" as const },
    {
      text: "se siente, se mueve y se recuerda.",
      from: "-46vw",
      to: "10vw",
      tone: "accent" as const,
      accentPhrase: "se mueve",
    },
  ],
  scrollHint: "Desliza para leer",
  signoff: "Captas · Limarí, Chile",
  footnote: "Cómo pensamos cada proyecto · antes del primer pixel",
  disciplines: ["UX/UI", "Motion", "Branding", "Territorio"] as const,
  poster:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
};

export type RecognitionItem = {
  year: string;
  title: string;
  context: string;
  category: "Award" | "Press" | "Selection" | "Talk";
};

export const recognition: RecognitionItem[] = [
  {
    year: "2025",
    title: "Site of the Day",
    context: "CSS Design Awards — Valle Limarí",
    category: "Award",
  },
  {
    year: "2025",
    title: "Best Regional Studio",
    context: "Behance Featured — Latin America",
    category: "Selection",
  },
  {
    year: "2024",
    title: "Honorable Mention",
    context: "Awwwards — Cooperativa Sol",
    category: "Award",
  },
  {
    year: "2024",
    title: "Creative Spotlight",
    context: "Domestika Featured — Documental Ovalle",
    category: "Press",
  },
  {
    year: "2024",
    title: "Diseño Chileno Hoy",
    context: "Charla invitada — Universidad de La Serena",
    category: "Talk",
  },
  {
    year: "2023",
    title: "Mejor Identidad Regional",
    context: "Premios Chile Diseño — Mesa del Valle",
    category: "Award",
  },
];

export const pressLogos = [
  "La Tercera",
  "Diseño Chileno",
  "Behance Featured",
  "CSS Awards",
  "Awwwards",
  "Domestika",
] as const;

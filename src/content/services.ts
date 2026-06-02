import { pillarThemes, type PillarTheme } from "@/lib/brand-palette";

export type { PillarTheme };

export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  pillar: string;
  theme: PillarTheme;
};

export const services: Service[] = [
  {
    id: "ux-ui",
    number: "01",
    title: "Experiencia UX/UI",
    short: "Interfaces que convierten y elevan tu marca.",
    description:
      "Diseñamos experiencias digitales centradas en el usuario: research, arquitectura, prototipos y UI systems que guían, retienen y promueven el valor de tu negocio en cada interacción.",
    deliverables: [
      "Research y arquitectura de información",
      "Wireframes y prototipos interactivos",
      "Design systems y UI kits",
      "Testing y optimización de conversión",
    ],
    pillar: "Experiencia",
    theme: pillarThemes["ux-ui"],
  },
  {
    id: "fotografia",
    number: "02",
    title: "Fotografía",
    short: "Luz, territorio y verdad visual.",
    description:
      "Retratos de marca, producto y territorio con look cinematográfico. Cada frame cuenta una historia y eleva la percepción de valor de tu negocio.",
    deliverables: [
      "Sesiones de marca y producto",
      "Fotografía editorial y lifestyle",
      "Retoque y color grading",
      "Banco de imágenes para campañas",
    ],
    pillar: "Fotografía",
    theme: pillarThemes.fotografia,
  },
  {
    id: "diseno-web",
    number: "03",
    title: "Diseño Web",
    short: "Sitios con alma de película.",
    description:
      "Desarrollamos webs de alto craft con motion, performance y SEO. Desde landing pages hasta plataformas complejas — siempre mobile-first, siempre rápidas.",
    deliverables: [
      "Diseño y desarrollo Next.js",
      "Motion y microinteracciones",
      "E-commerce y CMS",
      "Optimización Lighthouse 90+",
    ],
    pillar: "Digital",
    theme: pillarThemes["diseno-web"],
  },
  {
    id: "video-cinematografico",
    number: "04",
    title: "Video Cinematográfico",
    short: "Tu marca, en 24 fps.",
    description:
      "Producción audiovisual con sensibilidad de cine. Spots, documentales de marca, contenido para redes y piezas institucionales filmadas en el Limarí y más allá.",
    deliverables: [
      "Concepto y guion creativo",
      "Rodaje con equipo FX30/RED",
      "Edición, color y sound design",
      "Adaptaciones para social y web",
    ],
    pillar: "Cine",
    theme: pillarThemes["video-cinematografico"],
  },
  {
    id: "branding",
    number: "05",
    title: "Imagen de Marca & Branding",
    short: "Identidad que perdura.",
    description:
      "Estrategia de marca, naming, identidad visual y voz. Construimos sistemas completos que funcionan en papelería, packaging, digital y entorno físico.",
    deliverables: [
      "Estrategia y posicionamiento",
      "Identidad visual y manual de marca",
      "Tipografía, color y sistema gráfico",
      "Aplicaciones y lanzamiento",
    ],
    pillar: "Marca",
    theme: pillarThemes.branding,
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

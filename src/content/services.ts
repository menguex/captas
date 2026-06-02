import { serviceUiTheme, type PillarTheme } from "@/lib/brand-palette";

export type { PillarTheme };

export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  pillar: string;
  /** Imagen editorial (Unsplash) */
  image: string;
  imageAlt: string;
  theme: PillarTheme;
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

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
    image: img("photo-1558655146-9f40138edfeb"),
    imageAlt: "Espacio de trabajo de diseño UX con pantallas y bocetos",
    theme: serviceUiTheme,
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
    image: img("photo-1492691527719-9d1e07e534b4"),
    imageAlt: "Fotografía editorial de paisaje y luz dorada en territorio",
    theme: serviceUiTheme,
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
    image: img("photo-1460925895917-afdab827c52f"),
    imageAlt: "Pantalla con interfaz web y métricas en escritorio minimal",
    theme: serviceUiTheme,
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
    image: img("photo-1478720568477-152d9b164e26"),
    imageAlt: "Proyección cinematográfica con luz dramática",
    theme: serviceUiTheme,
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
    image: img("photo-1561070791-2526d30994b5"),
    imageAlt: "Materiales de marca y papelería premium sobre mesa",
    theme: serviceUiTheme,
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

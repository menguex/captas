/** Principios de valor — contenido + medios para home / filosofía */

export type BrandPrinciple = {
  id: string;
  step: string;
  kicker: string;
  title: string;
  body: string;
  detail: string;
  outcome: { value: string; label: string };
  deliverables: string[];
  image: string;
  imageAlt: string;
  video?: string;
  serviceHref: string;
  caseHref: string;
  caseLabel: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export const brandValueIntro = {
  video: "/videos/philosophy/craft-reel.mp4",
  poster: "/images/philosophy/craft-reel-poster.jpg",
  videoPosition: "center 32%",
  videoLabel: "BTS · Comercial · Craft",
  highlights: [
    { value: "+65%", label: "Conversión UX medida" },
    { value: "+2.4×", label: "Valor percibido" },
    { value: "5", label: "Pilares · 1 equipo" },
  ] as const,
  lead:
    "No se trata de verse bien: se trata de que cada interacción —web, foto, motion o video— empuje a tu audiencia hacia una decisión clara.",
  body: "En Captas unimos research, craft visual y ejecución en el Limarí. Menos proveedores dispersos, más coherencia, más impacto comercial desde el primer lanzamiento.",
} as const;

export const brandPrinciples: BrandPrinciple[] = [
  {
    id: "ux",
    step: "01",
    kicker: "Principio · UX",
    title: "Claridad que guía",
    body: "Interfaces claras, flujos intuitivos y microinteracciones que llevan al usuario hacia la acción — y hacia tu marca.",
    detail:
      "Mapeamos fricción real, prototipamos antes de desarrollar y medimos conversión. Cada pantalla tiene un trabajo: informar, convencer o cerrar.",
    outcome: { value: "+65%", label: "conversión promedio" },
    deliverables: [
      "Research y arquitectura de información",
      "Wireframes y prototipos validados",
      "Design system y patrones de UI",
    ],
    image: unsplash("photo-1414235077428-338989a2e8c0"),
    imageAlt: "Experiencia digital gastronómica — reservas y menú visual",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-4370-large.mp4",
    serviceHref: "/servicios#ux-ui",
    caseHref: "/trabajo/mesa-del-valle",
    caseLabel: "Caso Mesa del Valle",
  },
  {
    id: "motion",
    step: "02",
    kicker: "Principio · Motion",
    title: "Movimiento que comunica",
    body: "Cada transición y reveal refuerza tu mensaje. No decoramos: comunicamos valor con movimiento preciso y curado.",
    detail:
      "Motion con jerarquía: guía la mirada, da feedback y construye narrativa en scroll. En web y en piezas sociales, el movimiento vende sin distraer.",
    outcome: { value: "+38%", label: "retención en scroll" },
    deliverables: [
      "Sistemas de motion con propósito",
      "Microinteracciones y feedback de UI",
      "Reveals y storytelling animado",
    ],
    image: unsplash("photo-1460925895917-afdab827c52f"),
    imageAlt: "Interfaz web con métricas y motion en dashboard",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-4242-large.mp4",
    serviceHref: "/servicios#diseno-web",
    caseHref: "/trabajo/municipalidad-ovalle",
    caseLabel: "Caso Ovalle Ciudad",
  },
  {
    id: "marca",
    step: "03",
    kicker: "Principio · Marca",
    title: "Percepción elevada",
    body: "Fotografía, video y branding que elevan cómo se siente tu negocio. Tu audiencia entiende, en segundos, por qué elegirte.",
    detail:
      "Identidad, luz y narrativa territorial en un solo sistema. Del packaging al reel: una voz visual que compite en Chile y en exportación.",
    outcome: { value: "+2.4×", label: "valor percibido" },
    deliverables: [
      "Identidad visual y manual de marca",
      "Dirección de arte transversal",
      "Fotografía y video cinematográfico",
    ],
    image: unsplash("photo-1506905925346-21bda4d32df4"),
    imageAlt: "Paisaje del valle — dirección de arte y territorio",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-sunny-landscape-4246-large.mp4",
    serviceHref: "/servicios#branding",
    caseHref: "/trabajo/valle-limari",
    caseLabel: "Caso Valle Limarí",
  },
];

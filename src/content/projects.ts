export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  result: string;
  excerpt: string;
  description: string;
  challenge: string;
  approach: string;
  services: string[];
  tags: string[];
  image: string;
  gallery: string[];
  video?: string;
  featured: boolean;
  align: "left" | "right";
};

export const projectFilters = [
  { id: "all", label: "Todos" },
  { id: "ux", label: "UX/UI" },
  { id: "branding", label: "Branding" },
  { id: "video", label: "Video" },
  { id: "foto", label: "Fotografía" },
  { id: "web", label: "Web" },
] as const;

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

export const projects: Project[] = [
  {
    slug: "valle-limari",
    title: "Valle Limarí",
    client: "Corporación Turística Limarí",
    category: "Branding · Video · Web",
    year: "2025",
    result: "+340% engagement · 2.1M impresiones orgánicas",
    excerpt:
      "Reposicionamos un territorio entero como destino premium con identidad, cine y web inmersiva.",
    description:
      "El valle tenía paisaje de sobra pero voz dispersa. Unificamos narrativa, identidad visual y plataforma digital en una sola experiencia que convierte curiosidad en visita.",
    challenge:
      "Competir con destinos consolidados sin presupuesto de mega-campaña. Necesitaban una historia visual que vendiera sola.",
    approach:
      "Documental aéreo al amanecer, sistema de marca tierra-oro, web con scroll cinematográfico y contenido modular para municipios, operadores y prensa.",
    services: ["Branding", "Video cinematográfico", "Diseño web", "Fotografía"],
    tags: ["branding", "video", "web", "foto"],
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=85",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-sunny-landscape-4246-large.mp4",
    featured: true,
    align: "left",
  },
  {
    slug: "cooperativa-sol",
    title: "Cooperativa Sol",
    client: "Cooperativa Agrícola del Limarí",
    category: "Fotografía · Branding · Packaging",
    year: "2025",
    result: "Línea exportación lanzada · +28% ticket promedio B2B",
    excerpt:
      "Del campo chileno a góndolas internacionales con identidad que transmite origen y calidad.",
    description:
      "La cooperativa producía excelente fruta pero su imagen no reflejaba el valor real del producto. Creamos un sistema visual que eleva percepción en ferias, packaging y catálogo digital.",
    challenge:
      "Diferenciarse en exportación sin perder autenticidad local. El packaging debía funcionar en retail premium europeo.",
    approach:
      "Sesión en terreno con productores reales, paleta cálida derivada del valle, tipografía sans limpia y fotografía macro de producto con luz natural.",
    services: ["Fotografía", "Branding", "Packaging"],
    tags: ["branding", "foto"],
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=1200&q=85",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=85",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-basket-full-of-vegetables-4076-large.mp4",
    featured: true,
    align: "right",
  },
  {
    slug: "mesa-del-valle",
    title: "Mesa del Valle",
    client: "Grupo Gastronómico Mesa",
    category: "UX/UI · Fotografía · Web",
    year: "2024",
    result: "+65% reservas online · 4.9★ experiencia mobile",
    excerpt:
      "Un restaurante con alma local convertido en experiencia digital que se siente como sentarse en la mesa.",
    description:
      "Rediseñamos cada touchpoint digital: reservas sin fricción, menú visual, fotografía gastronómica y motion que evoca calidez del local.",
    challenge:
      "Alta competencia gastronómica y dependencia de WhatsApp para reservas. Necesitaban conversión directa y marca memorable.",
    approach:
      "Research con comensales, flujo de reserva en 3 pasos, sesión food styling y web mobile-first con microinteracciones que imitan la experiencia del salón.",
    services: ["UX/UI", "Diseño web", "Fotografía"],
    tags: ["ux", "web", "foto"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-4370-large.mp4",
    featured: true,
    align: "left",
  },
  {
    slug: "municipalidad-ovalle",
    title: "Ovalle Ciudad",
    client: "Municipalidad de Ovalle",
    category: "Video · Branding · Web",
    year: "2024",
    result: "2M+ views · +180% tráfico portal ciudadano",
    excerpt:
      "Nueva voz visual para una ciudad: documental, identidad cívica y plataforma accesible.",
    description:
      "Transformamos la comunicación institucional de lo burocrático a lo aspiracional. Un documental de 12 minutos, identidad unificada y portal web que la gente realmente usa.",
    challenge:
      "Reputación institucional desgastada y plataformas digitales obsoletas. Comunicar progreso sin parecer campaña política.",
    approach:
      "Rodaje documental con vecinos reales, voz visual sobria y web con arquitectura clara para trámites, turismo y cultura local.",
    services: ["Video cinematográfico", "Branding", "Diseño web"],
    tags: ["video", "branding", "web"],
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-4242-large.mp4",
    featured: true,
    align: "right",
  },
  {
    slug: "atelier-luz",
    title: "Atelier Luz",
    client: "Atelier Luz Arquitectura",
    category: "Branding · Fotografía",
    year: "2024",
    result: "Pipeline comercial +40% · seleccionado en ArchDaily local",
    excerpt: "Identidad minimalista para un estudio que piensa en luz, espacio y silencio.",
    description:
      "Naming, identidad, papelería y sesión fotográfica de obras. Cada pieza refleja la filosofía del estudio: menos ruido, más intención.",
    challenge:
      "Estudio boutique compitiendo con firmas grandes. Necesitaban verse premium sin parecer inaccesibles.",
    approach:
      "Sistema tipográfico sans, fotografía de obra con luz natural y manual de marca que el equipo aplica sin diseñador in-house.",
    services: ["Branding", "Fotografía"],
    tags: ["branding", "foto"],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=85",
    ],
    featured: false,
    align: "left",
  },
  {
    slug: "vina-montes",
    title: "Viña Montes Altos",
    client: "Viña Montes Altos",
    category: "Video · Branding",
    year: "2023",
    result: "Spot cosecha · sold-out preventa en 72h",
    excerpt: "Video cinematográfico y campaña visual para una cosecha que se agotó en días.",
    description:
      "Rodaje al amanecer en viñedos del Limarí, color grading cálido y piezas adaptadas para redes, retail y pantallas en punto de venta.",
    challenge:
      "Lanzar cosecha limitada con storytelling emocional en mercado saturado de vinos premium genéricos.",
    approach:
      "Narrativa del amanecer en el valle, close-ups de uva y tierra, identidad de campaña coherente en botella, web y social.",
    services: ["Video cinematográfico", "Branding"],
    tags: ["video", "branding"],
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-pouring-red-wine-from-a-bottle-3166-large.mp4",
    featured: false,
    align: "right",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function filterProjects(filter: ProjectFilterId) {
  if (filter === "all") return projects;
  return projects.filter((p) => p.tags.includes(filter));
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

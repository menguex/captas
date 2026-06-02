import { clientBrandThemes } from "@/lib/brand-palette";

export const processSteps = [
  {
    number: "01",
    title: "Descubrir",
    subtitle: "Research & estrategia",
    text: "Escuchamos tu marca, mapeamos audiencia y definimos qué experiencia necesitas para destacar y convertir.",
  },
  {
    number: "02",
    title: "Diseñar",
    subtitle: "UX · Identidad · Motion",
    text: "Prototipos, sistemas visuales y dirección de arte. Cada decisión responde a un objetivo de negocio claro.",
  },
  {
    number: "03",
    title: "Producir",
    subtitle: "Foto · Video · Web",
    text: "Ejecución con craft de estudio: rodaje cinematográfico, sesiones fotográficas y desarrollo web de alto rendimiento.",
  },
  {
    number: "04",
    title: "Lanzar",
    subtitle: "Deploy & optimización",
    text: "Publicamos, medimos y afinamos. Tu marca sale al mundo lista para generar valor desde el día uno.",
  },
] as const;

export const marqueeItems = [
  "UX/UI",
  "Motion Design",
  "Branding",
  "Fotografía",
  "Video Cinematográfico",
  "Diseño Web",
  "Estrategia de Marca",
  "Contenido Social",
  "Limarí · Chile",
  "Global Craft",
] as const;

export const testimonials = [
  {
    quote:
      "Captas entendió nuestra marca mejor que nosotros. La web y el video cambiaron por completo cómo nos perciben en exportación.",
    author: "María González",
    role: "Directora Comercial",
    company: "Cooperativa Sol",
    initials: "MG",
    service: "Branding · Web · Video",
    sector: "Agroexportación",
    brand: clientBrandThemes.agro,
  },
  {
    quote:
      "El rediseño UX duplicó nuestras reservas online. Cada detalle del sitio se siente pensado para el comensal.",
    author: "Tomás Rojas",
    role: "Fundador",
    company: "Mesa del Valle",
    initials: "TR",
    service: "UX/UI · Web",
    sector: "Gastronomía",
    brand: clientBrandThemes.gastro,
  },
  {
    quote:
      "Profesionales, rápidos y con un ojo cinematográfico que no encontramos en Santiago. El Limarí tiene talento de verdad.",
    author: "Carolina Muñoz",
    role: "Jefa de Comunicaciones",
    company: "Municipalidad de Ovalle",
    initials: "CM",
    service: "Video · Branding",
    sector: "Institucional",
    brand: clientBrandThemes.institucional,
  },
] as const;

export const clientPartners = [
  "Cooperativa Sol",
  "Mesa del Valle",
  "Municipalidad de Ovalle",
  "Valle Limarí",
  "Viñedos del Norte",
  "Turismo Coquimbo",
  "Exportadora del Valle",
  "Café Limarí",
] as const;

export const team = [
  {
    name: "Osvaldo Vega",
    role: "Director Creativo · UX & Motion",
    bio: "Diseña experiencias digitales y dirige motion con enfoque en conversión y percepción de marca.",
  },
  {
    name: "Captas Studio",
    role: "Producción · Foto · Video",
    bio: "Equipo de rodaje, fotografía y postproducción con look cinematográfico y equipamiento profesional.",
  },
  {
    name: "Red de Craft",
    role: "Estrategia · Branding · Dev",
    bio: "Colaboradores senior en estrategia de marca, identidad visual y desarrollo web de alto rendimiento.",
  },
] as const;

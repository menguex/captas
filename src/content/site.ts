export const site = {
  name: "Captas",
  tagline: "Experiencias que elevan marcas. Motion que las hace inolvidables.",
  description:
    "Agencia UX/UI y creativa en el Limarí. Diseñamos experiencias, motion y contenido visual que promueven y dan valor real a tu marca.",
  email: "hola@captas.cl",
  phone: "+56900000000",
  location: "Ovalle, Región de Coquimbo",
  region: "Limarí, Chile",
  instagram: "https://instagram.com/captas.cl",
  whatsapp: "https://wa.me/56900000000",
  contacto: "/contacto",
} as const;

export const stats = [
  { value: 120, suffix: "+", label: "Experiencias diseñadas" },
  { value: 8, suffix: "", label: "Años elevando marcas" },
  { value: 45, suffix: "+", label: "Marcas con más valor" },
  { value: 92, suffix: "%", label: "Clientes que recomiendan" },
] as const;

export const brandValues = [
  {
    id: "ux",
    title: "UX que convierte",
    short: "Claridad que guía",
    text: "Interfaces claras, flujos intuitivos y microinteracciones que guían al usuario hacia la acción — y hacia tu marca.",
  },
  {
    id: "motion",
    title: "Motion con propósito",
    short: "Movimiento que comunica",
    text: "Cada transición y reveal refuerza tu mensaje. No decoramos: comunicamos valor con movimiento preciso.",
  },
  {
    id: "marca",
    title: "Marca que se siente premium",
    short: "Percepción elevada",
    text: "Fotografía, video y branding que elevan la percepción de tu negocio. Tu audiencia entiende por qué elegirte.",
  },
] as const;

export const socialLinks = [
  { href: "https://instagram.com/captas.cl", label: "Instagram" },
  { href: "mailto:hola@captas.cl", label: "Email" },
  { href: "/contacto", label: "Conversemos" },
] as const;

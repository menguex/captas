/** Planes retainer mensual — home */

export type PlanServicio = {
  incluido: boolean;
  texto: string;
};

export type PlanRetainer = {
  id: string;
  nombre: string;
  tagline: string;
  precio: number;
  total6m: number;
  featured: boolean;
  activacion: number;
  servicios: PlanServicio[];
};

export const planesRetainerHeader = {
  kicker: "Retainer mensual · Compromiso 6 meses",
  titleLine1: "Tu marca,",
  titleLine2: "en manos de un equipo completo.",
  body: "Un valor fijo mensual con identidad, contenido, web y video — el squad que necesitas, sin armar proveedores uno a uno.",
  highlights: [
    { value: "6", label: "Meses mín." },
    { value: "4", label: "Planes" },
    { value: "1", label: "Equipo · 1 factura" },
  ],
} as const;

export const planesRetainer: PlanRetainer[] = [
  {
    id: "semilla",
    nombre: "Semilla",
    tagline: "Emprendimientos y marcas nuevas",
    precio: 390_000,
    total6m: 2_340_000,
    featured: false,
    activacion: 150_000,
    servicios: [
      { incluido: true, texto: "Diseño de logo + paleta" },
      { incluido: true, texto: "Manual de marca básico" },
      { incluido: true, texto: "8 posts redes sociales / mes" },
      { incluido: true, texto: "1 sesión de fotos / mes" },
      { incluido: true, texto: "Calendario editorial" },
      { incluido: false, texto: "Videos" },
      { incluido: false, texto: "Sitio web" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "marca",
    nombre: "Marca",
    tagline: "Pymes que ya operan",
    precio: 690_000,
    total6m: 4_140_000,
    featured: false,
    activacion: 150_000,
    servicios: [
      { incluido: true, texto: "Identidad visual completa" },
      { incluido: true, texto: "16 posts redes sociales / mes" },
      { incluido: true, texto: "2 sesiones de fotos / mes" },
      { incluido: true, texto: "2 reels / mes (Sony FX30)" },
      { incluido: true, texto: "Landing page incluida" },
      { incluido: true, texto: "Informe mensual" },
      { incluido: false, texto: "Sitio web completo" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "presencia",
    nombre: "Presencia",
    tagline: "Marcas que quieren crecer",
    precio: 990_000,
    total6m: 5_940_000,
    featured: true,
    activacion: 200_000,
    servicios: [
      { incluido: true, texto: "Identidad visual completa" },
      { incluido: true, texto: "20 posts redes sociales / mes" },
      { incluido: true, texto: "Sesiones de fotos ilimitadas" },
      { incluido: true, texto: "4 reels + 1 video largo / mes" },
      { incluido: true, texto: "Sitio web completo (hasta 5 págs)" },
      { incluido: true, texto: "Gestión pauta Meta / Google" },
      { incluido: true, texto: "Informe quincenal" },
      { incluido: true, texto: "Reunión estratégica mensual" },
    ],
  },
  {
    id: "territorio",
    nombre: "Territorio",
    tagline: "Empresas medianas y proyectos",
    precio: 1_490_000,
    total6m: 8_940_000,
    featured: false,
    activacion: 250_000,
    servicios: [
      { incluido: true, texto: "Todo lo de Presencia" },
      { incluido: true, texto: "Estrategia de contenido anual" },
      { incluido: true, texto: "Producción audiovisual premium" },
      { incluido: true, texto: "Web avanzada + e-commerce" },
      { incluido: true, texto: "Gestión de pauta con presupuesto" },
      { incluido: true, texto: "Account manager dedicado" },
      { incluido: true, texto: "Reportes semanales" },
      { incluido: true, texto: "2 reuniones estratégicas / mes" },
    ],
  },
];

export const planesRetainerPills = [
  { icon: "✓", label: "Precio fijo mensual" },
  { icon: "↺", label: "Renovación automática" },
  { icon: "◎", label: "Producción en Coquimbo" },
  { icon: "✉", label: "Factura incluida" },
  { icon: "◉", label: "Video Sony FX30" },
] as const;

export const planesRetainerAddons = [
  "Pauta Meta Ads desde $150.000",
  "Video institucional desde $290.000",
  "Sesión extra de fotos $80.000",
  "E-mail marketing desde $120.000",
  "Fotografía de producto $150.000",
  "Sitio web adicional desde $490.000",
] as const;

export function formatPrecioCLP(n: number) {
  return `$${n.toLocaleString("es-CL")}`;
}

export function planMailtoSubject(nombre: string) {
  return encodeURIComponent(`Retainer Captas — Plan ${nombre}`);
}

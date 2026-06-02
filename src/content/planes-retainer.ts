/** Planes retainer mensual — home (contrato mínimo 6 meses) */

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
  kicker: "Retainer mensual · Contrato mínimo 6 meses",
  titleLine1: "Tu marca,",
  titleLine2: "en manos de un equipo completo.",
  body: "Desde contenido mensual fijo hasta logo y web incluidos. Un precio claro, un squad creativo, seis meses para construir presencia de verdad.",
  highlights: [
    { value: "6", label: "Meses mín." },
    { value: "350", label: "Desde · miles CLP" },
    { value: "1", label: "Equipo · 1 factura" },
  ],
} as const;

export const planesRetainer: PlanRetainer[] = [
  {
    id: "esencial",
    nombre: "Esencial",
    tagline: "Arranque con ritmo de publicación",
    precio: 350_000,
    total6m: 2_100_000,
    featured: false,
    activacion: 100_000,
    servicios: [
      { incluido: true, texto: "12 diseños de post / mes" },
      { incluido: true, texto: "2 videos / mes (reels o piezas cortas)" },
      { incluido: true, texto: "1 sesión de fotos / mes" },
      { incluido: true, texto: "Calendario editorial mensual" },
      { incluido: true, texto: "Ajustes de copy en piezas" },
      { incluido: false, texto: "Logo e identidad visual" },
      { incluido: false, texto: "Sitio web" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "contenido",
    nombre: "Contenido",
    tagline: "Más volumen y consistencia",
    precio: 450_000,
    total6m: 2_700_000,
    featured: false,
    activacion: 120_000,
    servicios: [
      { incluido: true, texto: "16 diseños de post / mes" },
      { incluido: true, texto: "3 videos / mes (Sony FX30)" },
      { incluido: true, texto: "2 sesiones de fotos / mes" },
      { incluido: true, texto: "Calendario + guión de piezas" },
      { incluido: true, texto: "Informe mensual de desempeño" },
      { incluido: false, texto: "Logo e identidad visual" },
      { incluido: false, texto: "Sitio web" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "marca",
    nombre: "Marca",
    tagline: "Contenido + sistema visual",
    precio: 550_000,
    total6m: 3_300_000,
    featured: false,
    activacion: 150_000,
    servicios: [
      { incluido: true, texto: "18 diseños de post / mes" },
      { incluido: true, texto: "4 videos / mes" },
      { incluido: true, texto: "2 sesiones de fotos / mes" },
      { incluido: true, texto: "Logo + paleta + tipografías" },
      { incluido: true, texto: "Manual de marca básico" },
      { incluido: true, texto: "Landing de campaña (1 página)" },
      { incluido: false, texto: "Sitio web completo" },
      { incluido: false, texto: "Pauta digital" },
    ],
  },
  {
    id: "completo",
    nombre: "Completo",
    tagline: "Logo, web y contenido integrado",
    precio: 650_000,
    total6m: 3_900_000,
    featured: true,
    activacion: 150_000,
    servicios: [
      { incluido: true, texto: "20 diseños de post / mes" },
      { incluido: true, texto: "4 videos + 1 pieza larga / mes" },
      { incluido: true, texto: "2 sesiones de fotos / mes" },
      { incluido: true, texto: "Logo + identidad visual completa" },
      { incluido: true, texto: "Sitio web (hasta 5 páginas)" },
      { incluido: true, texto: "Calendario y reunión mensual" },
      { incluido: true, texto: "Informe quincenal" },
      { incluido: false, texto: "Pauta digital (add-on)" },
    ],
  },
];

export const planesRetainerPills = [
  { icon: "✓", label: "Desde $350.000 / mes" },
  { icon: "6", label: "Meses mínimo de contrato" },
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
] as const;

export function formatPrecioCLP(n: number) {
  return `$${n.toLocaleString("es-CL")}`;
}

export function planMailtoSubject(nombre: string) {
  return encodeURIComponent(`Retainer Captas — Plan ${nombre}`);
}

export type PillarTheme = {
  border: string;
  fill: string;
  glow: string;
  /** Color principal — para acentos visuales (lineas, halos, bg de pills) */
  accent: string;
  /** Color saturado/oscuro — para texto sobre superficies claras (mejor contraste AA) */
  accentInk: string;
  soft: string;
};

export type ClientBrandTheme = {
  border: string;
  fill: string;
  glow: string;
  accent: string;
};

/** Paleta core Captas — Finder blue */
export const captasBrand = {
  accent: "#007aff",
  accentDeep: "#0056d6",
  accentMuted: "#004fc4",
  sky: "#64d2ff",
  skySoft: "#a8d8ff",
  ink: "#070b12",
  bone: "#eef4fc",
  indigo: "#5856d6",
} as const;

/** 5 pilares — identidad masculina, alto contraste, matices distintos */
export const pillarThemes: Record<string, PillarTheme> = {
  "ux-ui": {
    border: "linear-gradient(135deg, #4d9fff 0%, #0052cc 50%, #002d73 100%)",
    fill: "linear-gradient(145deg, rgba(0,82,204,0.14), rgba(0,45,115,0.07), rgba(255,255,255,0.95))",
    glow: "rgba(0,82,204,0.3)",
    accent: "#0052cc",
    accentInk: "#003a99",
    soft: "rgba(0,82,204,0.14)",
  },
  fotografia: {
    border: "linear-gradient(135deg, #e8b923 0%, #b8860b 48%, #6b4e0a 100%)",
    fill: "linear-gradient(145deg, rgba(232,185,35,0.16), rgba(107,78,10,0.08), rgba(255,255,255,0.95))",
    glow: "rgba(184,134,11,0.28)",
    accent: "#b8860b",
    accentInk: "#6b4e0a",
    soft: "rgba(184,134,11,0.14)",
  },
  "diseno-web": {
    border: "linear-gradient(135deg, #2dd4bf 0%, #0d9488 50%, #115e59 100%)",
    fill: "linear-gradient(145deg, rgba(13,148,136,0.14), rgba(17,94,89,0.08), rgba(255,255,255,0.95))",
    glow: "rgba(13,148,136,0.26)",
    accent: "#0d9488",
    accentInk: "#0a6f66",
    soft: "rgba(13,148,136,0.14)",
  },
  "video-cinematografico": {
    border: "linear-gradient(135deg, #f87171 0%, #991b1b 45%, #450a0a 100%)",
    fill: "linear-gradient(145deg, rgba(153,27,27,0.14), rgba(69,10,10,0.08), rgba(255,255,255,0.95))",
    glow: "rgba(153,27,27,0.28)",
    accent: "#991b1b",
    accentInk: "#7f1d1d",
    soft: "rgba(153,27,27,0.14)",
  },
  branding: {
    border: "linear-gradient(135deg, #818cf8 0%, #4338ca 52%, #312e81 100%)",
    fill: "linear-gradient(145deg, rgba(67,56,202,0.14), rgba(49,46,129,0.08), rgba(255,255,255,0.95))",
    glow: "rgba(67,56,202,0.26)",
    accent: "#4338ca",
    accentInk: "#312e81",
    soft: "rgba(67,56,202,0.14)",
  },
};

/** Clientes — tonos masculinos por sector, marco con carácter propio */
export const clientBrandThemes = {
  agro: {
    border: "linear-gradient(135deg, #4ade80 0%, #15803d 55%, #14532d 100%)",
    fill: "linear-gradient(145deg, rgba(21,128,61,0.18), rgba(20,83,45,0.12), transparent)",
    glow: "rgba(21,128,61,0.32)",
    accent: "#15803d",
  },
  gastro: {
    border: "linear-gradient(135deg, #fb923c 0%, #c2410c 50%, #7c2d12 100%)",
    fill: "linear-gradient(145deg, rgba(194,65,12,0.18), rgba(124,45,18,0.12), transparent)",
    glow: "rgba(194,65,12,0.3)",
    accent: "#c2410c",
  },
  institucional: {
    border: "linear-gradient(135deg, #60a5fa 0%, #1e40af 55%, #0f172a 100%)",
    fill: "linear-gradient(145deg, rgba(30,64,175,0.18), rgba(15,23,42,0.14), transparent)",
    glow: "rgba(30,64,175,0.32)",
    accent: "#1e40af",
  },
} as const satisfies Record<string, ClientBrandTheme>;

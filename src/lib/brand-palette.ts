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

/** Paleta core Captas — azul marca (icono índigo → cian) */
export const captasBrand = {
  brandIndigo: "#5b61ff",
  brandCyan: "#0ea5e9",
  gradient: "linear-gradient(135deg, #5b61ff 0%, #0ea5e9 100%)",
  accent: "#007aff",
  accentDeep: "#0056d6",
  accentMuted: "#4d9fff",
  sky: "#0ea5e9",
  skySoft: "#64d2ff",
  ink: "#0f1218",
  bone: "#eae8e4",
  terra: "#9a7b52",
  terraDeep: "#6f5538",
  violet: "#5c5478",
} as const;

/** UI de servicios — un solo acento, sin arcoíris por pilar */
export const serviceUiTheme: PillarTheme = {
  border: "linear-gradient(135deg, #64d2ff 0%, #007aff 52%, #0056d6 100%)",
  fill: "#ffffff",
  glow: "rgba(0, 122, 255, 0.18)",
  accent: "#007aff",
  accentInk: "#0056d6",
  soft: "rgba(0, 122, 255, 0.1)",
};

/** 5 pilares — matices distintos (portfolio / casos) */
export const pillarThemes: Record<string, PillarTheme> = {
  "ux-ui": {
    border: "linear-gradient(135deg, #64d2ff 0%, #007aff 52%, #0056d6 100%)",
    fill: "linear-gradient(145deg, rgba(0,122,255,0.1), rgba(0,86,214,0.05), rgba(255,255,255,0.96))",
    glow: "rgba(0, 122, 255, 0.22)",
    accent: "#007aff",
    accentInk: "#0056d6",
    soft: "rgba(0, 122, 255, 0.1)",
  },
  fotografia: {
    border: "linear-gradient(135deg, #c4a574 0%, #9a7b52 50%, #6f5538 100%)",
    fill: "linear-gradient(145deg, rgba(154,123,82,0.14), rgba(111,85,56,0.07), rgba(255,255,255,0.96))",
    glow: "rgba(154, 123, 82, 0.22)",
    accent: "#9a7b52",
    accentInk: "#6f5538",
    soft: "rgba(154, 123, 82, 0.12)",
  },
  "diseno-web": {
    border: "linear-gradient(135deg, #7a9e8e 0%, #4d7264 50%, #364f45 100%)",
    fill: "linear-gradient(145deg, rgba(77,114,100,0.12), rgba(54,79,69,0.06), rgba(255,255,255,0.96))",
    glow: "rgba(77, 114, 100, 0.2)",
    accent: "#4d7264",
    accentInk: "#364f45",
    soft: "rgba(77, 114, 100, 0.11)",
  },
  "video-cinematografico": {
    border: "linear-gradient(135deg, #a67a7a 0%, #6b4444 48%, #452c2c 100%)",
    fill: "linear-gradient(145deg, rgba(107,68,68,0.12), rgba(69,44,44,0.06), rgba(255,255,255,0.96))",
    glow: "rgba(107, 68, 68, 0.2)",
    accent: "#6b4444",
    accentInk: "#452c2c",
    soft: "rgba(107, 68, 68, 0.11)",
  },
  branding: {
    border: "linear-gradient(135deg, #8b85a6 0%, #5c5478 52%, #3f3a52 100%)",
    fill: "linear-gradient(145deg, rgba(92,84,120,0.12), rgba(63,58,82,0.06), rgba(255,255,255,0.96))",
    glow: "rgba(92, 84, 120, 0.2)",
    accent: "#5c5478",
    accentInk: "#3f3a52",
    soft: "rgba(92, 84, 120, 0.11)",
  },
};

/** Clientes — tonos por sector, alineados a la paleta */
export const clientBrandThemes = {
  agro: {
    border: "linear-gradient(135deg, #8fb896 0%, #4d7264 55%, #364f45 100%)",
    fill: "linear-gradient(145deg, rgba(77,114,100,0.16), rgba(54,79,69,0.1), transparent)",
    glow: "rgba(77, 114, 100, 0.24)",
    accent: "#4d7264",
  },
  gastro: {
    border: "linear-gradient(135deg, #c4a574 0%, #9a7b52 50%, #6f5538 100%)",
    fill: "linear-gradient(145deg, rgba(154,123,82,0.16), rgba(111,85,56,0.1), transparent)",
    glow: "rgba(154, 123, 82, 0.22)",
    accent: "#9a7b52",
  },
  institucional: {
    border: "linear-gradient(135deg, #64d2ff 0%, #007aff 55%, #0056d6 100%)",
    fill: "linear-gradient(145deg, rgba(0,122,255,0.14), rgba(0,86,214,0.1), transparent)",
    glow: "rgba(0, 122, 255, 0.22)",
    accent: "#007aff",
  },
} as const satisfies Record<string, ClientBrandTheme>;

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

/** Paleta core Captas — editorial, cine, calidez territorial */
export const captasBrand = {
  accent: "#3d556c",
  accentDeep: "#283d4f",
  accentMuted: "#4a6278",
  sky: "#7d92a8",
  skySoft: "#a8b8c9",
  ink: "#0f1218",
  bone: "#eae8e4",
  terra: "#9a7b52",
  terraDeep: "#6f5538",
  indigo: "#5c5478",
} as const;

/** 5 pilares — matices distintos, saturación contenida */
export const pillarThemes: Record<string, PillarTheme> = {
  "ux-ui": {
    border: "linear-gradient(135deg, #8fa3b8 0%, #3d556c 52%, #283d4f 100%)",
    fill: "linear-gradient(145deg, rgba(61,85,108,0.12), rgba(40,61,79,0.06), rgba(255,255,255,0.96))",
    glow: "rgba(61, 85, 108, 0.22)",
    accent: "#3d556c",
    accentInk: "#283d4f",
    soft: "rgba(61, 85, 108, 0.11)",
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
    border: "linear-gradient(135deg, #8fa3b8 0%, #3d556c 55%, #283d4f 100%)",
    fill: "linear-gradient(145deg, rgba(61,85,108,0.16), rgba(40,61,79,0.12), transparent)",
    glow: "rgba(61, 85, 108, 0.22)",
    accent: "#3d556c",
  },
} as const satisfies Record<string, ClientBrandTheme>;

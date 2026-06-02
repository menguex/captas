/** Motion tokens — página Estudio */

export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 32 };
export const springSmooth = { type: "spring" as const, stiffness: 260, damping: 28 };
export const springSpotlight = { type: "spring" as const, stiffness: 90, damping: 18 };

export const SQUAD_CYCLE_MS = 2800;
export const PIPELINE_STEP_MS = 4200;

export const easeStudio = [0.22, 1, 0.36, 1] as const;

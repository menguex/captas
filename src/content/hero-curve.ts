/**
 * Geometría del corte hero (claro) → manifiesto (ink).
 * curveAmount debe ser ~100–130 con viewBox ~200; valores altos (400) aplastan el arco.
 */
export const heroCurveCut = {
  curveAmount: 112,
  strokeOffset: 4,
  textBaseY: 38,
  viewBoxHeight: 204,
  fill: "#0f1218",
  edge: "rgba(234, 232, 228, 0.24)",
} as const;

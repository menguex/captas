/** Utilidades scroll — recorrido Estudio */

export function stepLocalProgress(
  globalProgress: number,
  stepIndex: number,
  stepCount: number
): number {
  const t = globalProgress * stepCount;
  return Math.max(0, Math.min(1, t - stepIndex));
}

export function layerOpacity(globalProgress: number, stepIndex: number, stepCount: number): number {
  const t = globalProgress * stepCount;
  const dist = Math.abs(t - stepIndex - 0.5) * 2;
  return Math.max(0, Math.min(1, 1 - dist));
}

export function layerKenBurns(globalProgress: number, stepIndex: number, stepCount: number) {
  const t = globalProgress * stepCount - stepIndex;
  const scale = 1.06 + Math.min(1, Math.max(0, t + 0.15)) * 0.12;
  const y = `${-2 + t * -6}%`;
  return { scale, y };
}

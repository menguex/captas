import { heroPosterSrc } from "@/lib/hero-media";

/** URLs críticas — primera pantalla (poster + icono; el video carga en el hero) */
export const PRELOAD_ASSETS = [
  "/brand/captas-icon.png",
  heroPosterSrc(),
] as const;

/** Duración fija del intro — la barra recorre 0→100% en este tiempo */
export const INTRO_DURATION_MS = 1800;

export type PreloadUpdate = {
  progress: number;
  stageLabel: string;
};

const STAGES: { at: number; label: string }[] = [
  { at: 0, label: "Iniciando estudio" },
  { at: 0.18, label: "Tipografías" },
  { at: 0.38, label: "Identidad visual" },
  { at: 0.58, label: "Primer frame" },
  { at: 0.78, label: "Experiencia visual" },
  { at: 0.94, label: "Listo" },
];

function stageForProgress(t: number): string {
  let label = STAGES[0].label;
  for (const stage of STAGES) {
    if (t >= stage.at) label = stage.label;
  }
  return label;
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => resolve();
    const timeout = window.setTimeout(done, 8000);
    img.onload = () => {
      window.clearTimeout(timeout);
      done();
    };
    img.onerror = () => {
      window.clearTimeout(timeout);
      done();
    };
    img.src = src;
  });
}

/** Dispara precarga de assets en segundo plano (no bloquea el tiempo del intro). */
function warmCriticalAssets(): void {
  const fontReady =
    typeof document !== "undefined" && document.fonts?.ready
      ? document.fonts.ready
      : Promise.resolve();

  void Promise.all([fontReady, ...PRELOAD_ASSETS.map(loadImage)]);
}

/**
 * Barra horizontal 0→100% en INTRO_DURATION_MS; assets se calientan en paralelo.
 */
export function runAppPreload(onUpdate: (update: PreloadUpdate) => void): Promise<void> {
  warmCriticalAssets();

  const start = performance.now();

  return new Promise((resolve) => {
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / INTRO_DURATION_MS);
      const progress = Math.round(t * 100);

      onUpdate({
        progress,
        stageLabel: stageForProgress(t),
      });

      if (t >= 1) {
        onUpdate({ progress: 100, stageLabel: "Listo" });
        resolve();
        return;
      }

      requestAnimationFrame(tick);
    };

    onUpdate({ progress: 0, stageLabel: STAGES[0].label });
    requestAnimationFrame(tick);
  });
}

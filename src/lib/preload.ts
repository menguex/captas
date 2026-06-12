import { heroContent } from "@/content/hero";

/** URLs críticas — primera pantalla (home + shell) */
export const PRELOAD_ASSETS = [
  "/brand/captas-icon.png",
  heroContent.backgroundPoster,
] as const;

export const PRELOAD_VIDEO = heroContent.backgroundVideo;

const MIN_INTRO_MS = 1500;
const MAX_INTRO_MS = 10000;
const VIDEO_TIMEOUT_MS = 11000;

export type PreloadUpdate = {
  progress: number;
  stageLabel: string;
};

type ProgressTracker = {
  setTarget: (value: number, stageLabel?: string) => void;
  finish: () => Promise<void>;
  dispose: () => void;
};

function createProgressTracker(onUpdate: (update: PreloadUpdate) => void): ProgressTracker {
  let target = 0;
  let displayed = 0;
  let stageLabel = "Iniciando estudio";
  let raf = 0;
  let disposed = false;

  const emit = () => {
    onUpdate({
      progress: Math.min(100, Math.round(displayed)),
      stageLabel,
    });
  };

  const tick = () => {
    if (disposed) return;
    const delta = target - displayed;
    displayed += delta * (delta > 8 ? 0.14 : 0.09);
    if (Math.abs(delta) < 0.35) displayed = target;
    emit();
    if (displayed < 100 || target < 100) {
      raf = requestAnimationFrame(tick);
    }
  };

  const ensureTick = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(tick);
  };

  return {
    setTarget(value, label) {
      target = Math.min(100, Math.max(target, value));
      if (label) stageLabel = label;
      ensureTick();
    },
    async finish() {
      this.setTarget(100, "Listo");
      await new Promise<void>((resolve) => {
        const wait = () => {
          if (displayed >= 99.5) {
            displayed = 100;
            emit();
            resolve();
            return;
          }
          raf = requestAnimationFrame(wait);
        };
        wait();
      });
    },
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  };
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => resolve();
    const timeout = window.setTimeout(done, 6000);
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

function loadVideo(
  src: string,
  onMilestone: (fraction: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve();
    };

    const timeout = window.setTimeout(done, VIDEO_TIMEOUT_MS);

    video.addEventListener(
      "loadedmetadata",
      () => {
        onMilestone(0.35);
      },
      { once: true }
    );
    video.addEventListener(
      "loadeddata",
      () => {
        onMilestone(0.62);
      },
      { once: true }
    );
    video.addEventListener(
      "canplay",
      () => {
        onMilestone(0.88);
        done();
      },
      { once: true }
    );
    video.addEventListener("error", done, { once: true });

    video.src = src;
    video.load();
  });
}

/**
 * Precarga fuentes, marca, poster y video hero con progreso suave por etapas.
 */
export async function runAppPreload(onUpdate: (update: PreloadUpdate) => void): Promise<void> {
  const start = performance.now();
  const tracker = createProgressTracker(onUpdate);

  tracker.setTarget(6, "Iniciando estudio");

  const fontReady =
    typeof document !== "undefined" && document.fonts?.ready
      ? document.fonts.ready.then(() => {
          tracker.setTarget(22, "Tipografías");
        })
      : Promise.resolve().then(() => tracker.setTarget(22, "Tipografías"));

  tracker.setTarget(12, "Marca");

  const brandReady = loadImage(PRELOAD_ASSETS[0]).then(() => {
    tracker.setTarget(28, "Identidad visual");
  });

  const posterReady = loadImage(PRELOAD_ASSETS[1]).then(() => {
    tracker.setTarget(38, "Primer frame");
  });

  const videoReady = loadVideo(PRELOAD_VIDEO, (fraction) => {
    const base = 38;
    const span = 46;
    tracker.setTarget(base + span * fraction, "Reel del estudio");
  }).then(() => {
    tracker.setTarget(86, "Reel del estudio");
  });

  const domReady =
    typeof document !== "undefined" && document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          if (typeof window === "undefined") {
            resolve();
            return;
          }
          window.addEventListener("load", () => resolve(), { once: true });
        });

  const allReady = Promise.all([fontReady, brandReady, posterReady, videoReady, domReady]);

  const maxWait = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MAX_INTRO_MS);
  });

  await Promise.race([allReady, maxWait]);
  tracker.setTarget(92, "Afinando experiencia");

  const elapsed = performance.now() - start;
  if (elapsed < MIN_INTRO_MS) {
    const remaining = MIN_INTRO_MS - elapsed;
    const steps = 8;
    const stepMs = remaining / steps;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, stepMs));
      tracker.setTarget(92 + (6 * i) / steps, "Afinando experiencia");
    }
  }

  await tracker.finish();
  tracker.dispose();
}

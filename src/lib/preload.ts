/** URLs críticas para la primera pantalla (home + shell) */
export const PRELOAD_ASSETS = ["/brand/captas-icon.png"] as const;

export const PRELOAD_VIDEO = "/videos/hero/design-studio.mp4";

const MIN_INTRO_MS = 1400;

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
  });
}

function loadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    const done = () => resolve();
    video.addEventListener("canplaythrough", done, { once: true });
    video.addEventListener("error", done, { once: true });
    video.src = src;
    video.load();
  });
}

/**
 * Precarga fuentes, video hero e icono; respeta un mínimo de tiempo de intro.
 */
export async function runAppPreload(onProgress: (pct: number) => void): Promise<void> {
  const start = performance.now();
  let imageDone = false;
  let videoDone = false;

  const bump = () => {
    const steps = (imageDone ? 1 : 0) + (videoDone ? 1 : 0);
    onProgress(Math.min(72, Math.round((steps / 2) * 72)));
  };

  onProgress(4);

  const fontReady =
    typeof document !== "undefined" && document.fonts?.ready
      ? document.fonts.ready
      : Promise.resolve();

  const imageReady = Promise.all(
    PRELOAD_ASSETS.map((src) =>
      loadImage(src).then(() => {
        imageDone = true;
        bump();
      })
    )
  );

  const videoReady = loadVideo(PRELOAD_VIDEO).then(() => {
    videoDone = true;
    bump();
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

  await Promise.all([imageReady, videoReady, fontReady, domReady]);
  onProgress(88);

  const elapsed = performance.now() - start;
  if (elapsed < MIN_INTRO_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTRO_MS - elapsed));
  }

  onProgress(100);
}

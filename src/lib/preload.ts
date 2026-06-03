/** URLs críticas para la primera pantalla (home + shell) */
export const PRELOAD_ASSETS = [
  "/brand/captas-icon.png",
  "/images/hero/dji-0068.jpg",
] as const;

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

/**
 * Precarga fuentes, imágenes clave y respeta un mínimo de tiempo de intro.
 * @param onProgress 0–100
 */
export async function runAppPreload(onProgress: (pct: number) => void): Promise<void> {
  const start = performance.now();
  const assets = [...PRELOAD_ASSETS];
  let loaded = 0;

  const bump = () => {
    loaded += 1;
    const assetPct = Math.round((loaded / assets.length) * 72);
    onProgress(Math.min(72, assetPct));
  };

  onProgress(4);

  const fontReady =
    typeof document !== "undefined" && document.fonts?.ready
      ? document.fonts.ready
      : Promise.resolve();

  const imagesReady = Promise.all(assets.map((src) => loadImage(src).then(bump)));

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

  await Promise.all([imagesReady, fontReady, domReady]);
  onProgress(88);

  const elapsed = performance.now() - start;
  if (elapsed < MIN_INTRO_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTRO_MS - elapsed));
  }

  onProgress(100);
}

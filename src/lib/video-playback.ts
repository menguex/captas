/** Reproducción fiable de video mudo en loop (hero y fondos). */
export function playMutedLoop(video: HTMLVideoElement): void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;

  const attempt = () => {
    if (video.paused) {
      void video.play().catch(() => {
        /* El navegador puede bloquear hasta gesto o fin del intro */
      });
    }
  };

  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    attempt();
    return;
  }

  video.addEventListener("canplay", attempt, { once: true });
}

export function pauseVideo(video: HTMLVideoElement | null): void {
  if (!video) return;
  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    /* ignore */
  }
}

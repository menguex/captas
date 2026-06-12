"use client";

import Image from "next/image";
import { methodValueMedia } from "@/content/method-value";
import { useLazyAutoplayVideo } from "@/hooks/useLazyAutoplayVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProcessStatsBackground() {
  const reduced = useReducedMotion();
  const { containerRef, videoRef, active } = useLazyAutoplayVideo(!reduced);

  return (
    <div ref={containerRef} className="process-stats-background" aria-hidden>
      <Image
        src={methodValueMedia.poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="process-stats-background__poster"
        style={{ objectPosition: methodValueMedia.videoPosition }}
      />
      {!reduced && (
        <video
          ref={videoRef}
          className="process-stats-background__video"
          style={{ objectPosition: methodValueMedia.videoPosition }}
          src={active ? methodValueMedia.video : undefined}
          poster={methodValueMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      <div className="process-stats-background__scrim" />
    </div>
  );
}

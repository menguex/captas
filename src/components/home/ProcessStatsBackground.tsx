"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { methodValueMedia } from "@/content/method-value";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProcessStatsBackground() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      video.play().catch(() => {
        /* autoplay bloqueado */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, [reduced]);

  return (
    <div className="process-stats-background" aria-hidden>
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
          src={methodValueMedia.video}
          poster={methodValueMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
      <div className="process-stats-background__scrim" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { heroContent } from "@/content/hero";

type HeroBackgroundMediaProps = {
  className?: string;
  /** Solo fondo cinematográfico estático (prefers-reduced-motion) */
  reduced?: boolean;
};

export function HeroBackgroundMedia({
  className = "",
  reduced = false,
}: HeroBackgroundMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      video.play().catch(() => {
        /* autoplay bloqueado — el placeholder oscuro cubre */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className={`hero-background-media hero-background-media--static ${className}`.trim()}
        aria-hidden
      >
        <div className="hero-background-canvas" />
      </div>
    );
  }

  return (
    <div className={`hero-background-media ${className}`.trim()} aria-hidden>
      <div className="hero-background-canvas" />
      <video
        ref={videoRef}
        className="hero-background-video"
        style={{ objectPosition: heroContent.backgroundPosition }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroContent.backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { heroContent } from "@/content/hero";
import { INTRO_EVENT } from "@/hooks/useIntroReady";
import { heroPosterSrc, heroVideoSrc } from "@/lib/hero-media";

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
  const videoSrc = heroVideoSrc();
  const posterSrc = heroPosterSrc();

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    if (video.getAttribute("src") !== videoSrc) {
      video.setAttribute("src", videoSrc);
      video.load();
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay bloqueado — reintenta al terminar intro o al volver a la pestaña */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    window.addEventListener(INTRO_EVENT, play);
    const onVisible = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("canplay", play);
      window.removeEventListener(INTRO_EVENT, play);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [reduced, videoSrc]);

  if (reduced) {
    return (
      <div
        className={`hero-background-media hero-background-media--static ${className}`.trim()}
        aria-hidden
      >
        <div className="hero-background-canvas" />
        <Image
          src={posterSrc}
          alt=""
          fill
          className="hero-background-poster"
          style={{ objectPosition: heroContent.backgroundPosition }}
          sizes="100vw"
          priority
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className={`hero-background-media hero-background-media--live ${className}`.trim()} aria-hidden>
      <div className="hero-background-canvas" />
      <div className="hero-video-stage absolute inset-0 overflow-hidden">
        <video
          key={videoSrc}
          ref={videoRef}
          className="hero-background-video"
          style={{ objectPosition: heroContent.backgroundPosition }}
          poster={posterSrc}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-video-edge-glow" />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
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
        <Image
          src={heroContent.backgroundPoster}
          alt=""
          fill
          className="hero-background-poster"
          style={{ objectPosition: heroContent.backgroundPosition }}
          sizes="100vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`hero-background-media hero-background-media--live ${className}`.trim()} aria-hidden>
      <div className="hero-background-canvas" />
      <div className="hero-video-stage absolute inset-0 overflow-hidden">
        <div className="hero-video-ken-burns absolute inset-[-4%]">
          <video
            ref={videoRef}
            className="hero-background-video"
            style={{ objectPosition: heroContent.backgroundPosition }}
            poster={heroContent.backgroundPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={heroContent.backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-video-edge-glow" />
        <div className="hero-video-shine" />
      </div>
    </div>
  );
}

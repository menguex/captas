"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroContent } from "@/content/hero";

type HeroBackgroundMediaProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Solo imagen (prefers-reduced-motion) */
  reduced?: boolean;
};

export function HeroBackgroundMedia({
  className = "",
  style,
  reduced = false,
}: HeroBackgroundMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video
        .play()
        .then(() => setVideoReady(true))
        .catch(() => setVideoReady(false));
    };

    if (video.readyState >= 2) tryPlay();
    else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      return () => video.removeEventListener("loadeddata", tryPlay);
    }
  }, [reduced]);

  const mediaStyle = {
    objectPosition: heroContent.backgroundPosition,
    ...style,
  };

  return (
    <div className={`hero-background-media ${className}`.trim()}>
      <Image
        src={heroContent.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`hero-background-poster object-cover saturate-[0.85] contrast-[1.05] transition-opacity duration-700 ${
          !reduced && videoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{ objectPosition: heroContent.backgroundPosition }}
      />

      {!reduced && (
        <video
          ref={videoRef}
          className={`hero-background-video absolute inset-0 h-full w-full object-cover saturate-[0.85] contrast-[1.05] transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          style={mediaStyle}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroContent.backgroundImage}
          aria-hidden
        >
          <source src={heroContent.backgroundVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

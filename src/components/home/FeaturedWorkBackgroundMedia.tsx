"use client";

import Image from "next/image";
import { featuredWorkMedia } from "@/content/featured-work-media";
import { useLazyAutoplayVideo } from "@/hooks/useLazyAutoplayVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FeaturedWorkBackgroundMedia() {
  const reduced = useReducedMotion();
  const { containerRef, videoRef, active } = useLazyAutoplayVideo(!reduced);
  const poster = `${featuredWorkMedia.poster}?v=${featuredWorkMedia.mediaVersion}`;
  const video = `${featuredWorkMedia.video}?v=${featuredWorkMedia.mediaVersion}`;

  return (
    <div ref={containerRef} className="featured-work-background-media" aria-hidden>
      <Image
        src={poster}
        alt=""
        fill
        sizes="100vw"
        className="featured-work-background-media__poster"
        style={{ objectPosition: featuredWorkMedia.videoPosition }}
        unoptimized
      />
      {!reduced && active ? (
        <video
          ref={videoRef}
          className="featured-work-background-media__video"
          style={{ objectPosition: featuredWorkMedia.videoPosition }}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : null}
      <div className="featured-work-background-media__scrim" />
    </div>
  );
}

"use client";

import Image from "next/image";
import { footerMedia } from "@/content/footer";
import { useLazyAutoplayVideo } from "@/hooks/useLazyAutoplayVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FooterBackgroundMedia() {
  const reduced = useReducedMotion();
  const { containerRef, videoRef, active } = useLazyAutoplayVideo(!reduced);

  return (
    <div ref={containerRef} className="footer-background-media" aria-hidden>
      <Image
        src={footerMedia.poster}
        alt=""
        fill
        sizes="100vw"
        className="footer-background-media__poster"
        style={{ objectPosition: footerMedia.videoPosition }}
        priority={false}
      />
      {!reduced && (
        <video
          ref={videoRef}
          className="footer-background-media__video"
          style={{ objectPosition: footerMedia.videoPosition }}
          src={active ? footerMedia.video : undefined}
          poster={footerMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      <div className="footer-background-media__scrim" />
    </div>
  );
}

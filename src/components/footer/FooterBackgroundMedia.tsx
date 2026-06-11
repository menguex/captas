"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { footerMedia } from "@/content/footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FooterBackgroundMedia() {
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
    <div className="footer-background-media" aria-hidden>
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
          src={footerMedia.video}
          poster={footerMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
      <div className="footer-background-media__scrim" />
    </div>
  );
}

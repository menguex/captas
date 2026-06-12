"use client";

import { useEffect, useRef, useState } from "react";
import { pauseVideo, playMutedLoop } from "@/lib/video-playback";

type LazyVideoOptions = {
  /** Margen antes de activar (px) */
  rootMargin?: string;
  /** Pausar al salir del viewport */
  pauseWhenHidden?: boolean;
};

/** Carga y reproduce video solo cuando entra al viewport. */
export function useLazyAutoplayVideo(
  enabled: boolean,
  { rootMargin = "280px 0px", pauseWhenHidden = true }: LazyVideoOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          const video = videoRef.current;
          if (video) playMutedLoop(video);
        } else if (pauseWhenHidden) {
          setActive(false);
          pauseVideo(videoRef.current);
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled, pauseWhenHidden, rootMargin]);

  useEffect(() => {
    if (!enabled || !active) return;
    const video = videoRef.current;
    if (!video) return;
    playMutedLoop(video);
  }, [enabled, active]);

  return { containerRef, videoRef, active };
}

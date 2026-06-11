"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

type UseScrollScrubVideoOptions = {
  enabled?: boolean;
  /** Evita seeks excesivos mientras el usuario hace scroll rápido */
  threshold?: number;
};

/**
 * Vincula el currentTime de un <video> al progreso de scroll (0–1).
 */
export function useScrollScrubVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  progress: MotionValue<number>,
  { enabled = true, threshold = 0.04 }: UseScrollScrubVideoOptions = {}
) {
  const durationRef = useRef(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const onMeta = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        durationRef.current = video.duration;
        readyRef.current = true;
        video.pause();
      }
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [videoRef, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = progress.on("change", (value) => {
      const video = videoRef.current;
      if (!video || !readyRef.current) return;

      const duration = durationRef.current || video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const clamped = Math.min(1, Math.max(0, value));
      const target = clamped * duration;

      if (Math.abs(video.currentTime - target) > threshold) {
        try {
          video.currentTime = target;
        } catch {
          /* seek en curso */
        }
      }
    });

    return unsubscribe;
  }, [progress, videoRef, enabled, threshold]);
}

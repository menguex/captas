"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { stepLocalProgress } from "@/lib/estudio-scroll";

type UseScrollScrubVideoOptions = {
  scrollProgress: MotionValue<number>;
  stepIndex: number;
  stepCount: number;
  enabled: boolean;
  trim?: { start: number; end?: number };
};

export function useScrollScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    scrollProgress,
    stepIndex,
    stepCount,
    enabled,
    trim,
  }: UseScrollScrubVideoOptions
) {
  const durationRef = useRef(0);
  const trimStart = trim?.start ?? 0;
  const trimEndRef = useRef<number | null>(trim?.end ?? null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !enabled) return;

    const onMeta = () => {
      durationRef.current = el.duration;
      const end = trim?.end ?? el.duration;
      trimEndRef.current = Math.min(end, el.duration);
      el.pause();
      el.currentTime = trimStart;
    };

    el.addEventListener("loadedmetadata", onMeta);
    if (el.readyState >= 1) onMeta();

    return () => el.removeEventListener("loadedmetadata", onMeta);
  }, [enabled, trim?.end, trimStart, videoRef]);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (!enabled) return;
    const el = videoRef.current;
    const duration = durationRef.current;
    const trimEnd = trimEndRef.current;
    if (!el || !duration || trimEnd === null) return;

    const local = stepLocalProgress(v, stepIndex, stepCount);
    const span = Math.max(0.01, trimEnd - trimStart);
    const target = trimStart + local * span;

    if (local > 0.02 && local < 0.98) {
      if (Math.abs(el.currentTime - target) > 0.05) {
        try {
          el.currentTime = target;
        } catch {
          /* seek while loading */
        }
      }
    }
  });
}

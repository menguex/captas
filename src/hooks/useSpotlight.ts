"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Spotlight hook — agrega un efecto sutil de luz que sigue el cursor.
 * Setea CSS vars --mx y --my (en %) sobre el elemento.
 * Úsalo con: background: radial-gradient(circle at var(--mx) var(--my), ...)
 */
export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--mx", `${x}%`);
      ref.current.style.setProperty("--my", `${y}%`);
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `50%`);
    ref.current.style.setProperty("--my", `50%`);
  }, []);

  return { ref, onMove, onLeave };
}

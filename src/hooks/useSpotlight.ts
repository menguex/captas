"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Spotlight — luz sutil que sigue el cursor.
 * Setea CSS vars --mx y --my (en %) sobre el elemento que recibe el evento.
 */
export function useSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const apply = useCallback(
    (el: HTMLElement, clientX: number, clientY: number) => {
      if (reduced) return;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    },
    [reduced]
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      apply(e.currentTarget, e.clientX, e.clientY);
    },
    [apply]
  );

  const onLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mx", "50%");
    e.currentTarget.style.setProperty("--my", "42%");
  }, []);

  return { ref, onMove, onLeave };
}

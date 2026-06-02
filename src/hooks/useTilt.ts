"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TiltOptions = {
  max?: number;
  scale?: number;
};

export function useTilt({ max = 6, scale = 1.02 }: TiltOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;

      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [max, reduced, scale]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  return { ref, onMove, onLeave };
}

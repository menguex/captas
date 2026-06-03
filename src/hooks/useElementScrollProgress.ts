"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useLenis } from "@/providers/LenisProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Progreso 0→1 mientras el elemento recorre el viewport.
 * Compatible con Lenis (useScroll de Motion suele no sincronizar bien).
 */
export function useElementScrollProgress(
  ref: RefObject<HTMLElement | null>,
  enabled = true
): MotionValue<number> {
  const raw = useMotionValue(0);
  const progress = useSpring(raw, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.0008,
  });
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) {
      raw.set(0);
      return;
    }

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const scrollY = lenis?.scroll ?? window.scrollY;
      const start = el.offsetTop;
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, (scrollY - start) / range));
      raw.set(p);
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    if (lenis) {
      lenis.on("scroll", update);
      return () => {
        lenis.off("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, lenis, reduced, ref, raw]);

  return progress;
}

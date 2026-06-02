"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (reduced) {
      window.scrollTo(0, 0);
      return;
    }

    let instance: Lenis | null = null;
    let rafId = 0;
    let cancelled = false;
    let scrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null =
      null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      scrollTrigger = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      instance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.92,
      });

      if (cancelled) {
        instance.destroy();
        return;
      }

      instance.scrollTo(0, { immediate: true });
      setLenis(instance);

      instance.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        instance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      instance?.destroy();
      setLenis(null);
      scrollTrigger?.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

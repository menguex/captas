"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/providers/LenisProvider";

export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    let cancelled = false;
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    const scrollTop = async () => {
      if (hash.length > 1) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -96, immediate: false });
          } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      if (cancelled) return;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    };

    void scrollTop();

    return () => {
      cancelled = true;
    };
  }, [pathname, lenis]);

  return null;
}

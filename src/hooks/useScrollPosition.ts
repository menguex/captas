"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/providers/LenisProvider";

export function useScrollPosition() {
  const lenis = useLenis();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (lenis) {
      setScrollY(lenis.scroll);

      const onScroll = ({ scroll }: { scroll: number }) => {
        setScrollY(scroll);
      };

      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  return scrollY;
}

"use client";

import type { ReactNode } from "react";
import { HeroBackgroundMedia } from "@/components/home/HeroBackgroundMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroScrollZoomProps = {
  children: ReactNode;
  chrome?: ReactNode;
  mesh: ReactNode;
  spotlight: ReactNode;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
};

/** Hero fijo — sin zoom al scroll (evita recortes que parecen lifestyle/pareja). */
export function HeroScrollZoom({
  children,
  chrome,
  mesh,
  spotlight,
  onMouseMove,
  onMouseLeave,
}: HeroScrollZoomProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      data-hero
      className="hero-editorial hero-with-spotlight relative z-[1] flex min-h-[100dvh] items-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <HeroBackgroundMedia reduced={reduced} className="absolute inset-0 h-full w-full" />
        <div className="hero-scrim absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] opacity-50">{mesh}</div>

      {spotlight}

      <div className="relative z-10 flex w-full items-center justify-center px-gutter">{children}</div>

      {chrome ? (
        <div className="pointer-events-none absolute inset-0 z-20 [&_*]:pointer-events-auto">{chrome}</div>
      ) : null}
    </section>
  );
}

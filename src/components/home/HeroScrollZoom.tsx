"use client";

import { useRef, type ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { HeroBackgroundMedia } from "@/components/home/HeroBackgroundMedia";
import { useElementScrollProgress } from "@/hooks/useElementScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroScrollZoomProps = {
  children: ReactNode;
  chrome?: ReactNode;
  mesh: ReactNode;
  spotlight: ReactNode;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
};

export function HeroScrollZoom({
  children,
  chrome,
  mesh,
  spotlight,
  onMouseMove,
  onMouseLeave,
}: HeroScrollZoomProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const progress = useElementScrollProgress(containerRef, !reduced);

  const imageScale = useTransform(progress, [0, 1], [1, 1.06]);
  const imageOpacity = useTransform(progress, [0, 0.6, 1], [1, 0.95, 0.5]);
  const imageBlur = useTransform(progress, [0, 0.35, 1], ["blur(0px)", "blur(0px)", "blur(6px)"]);
  const scrimBoost = useTransform(progress, [0, 1], [0.82, 1.08]);
  const contentY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const contentScale = useTransform(progress, [0, 1], [1, 0.92]);
  const contentOpacity = useTransform(progress, [0, 0.52, 0.78], [1, 1, 0]);
  const meshOpacity = useTransform(progress, [0, 0.9, 1], [0.32, 0.18, 0]);

  if (reduced) {
    return (
      <section
        ref={containerRef}
        id="hero"
        data-hero
        className="hero-editorial hero-with-spotlight relative z-[1] flex min-h-[100dvh] items-center overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <HeroBackgroundMedia reduced className="absolute inset-0" />
          <div className="hero-scrim absolute inset-0" />
        </div>
        {mesh}
        {spotlight}
        <div className="relative z-10 w-full">{children}</div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      data-hero
      className="hero-scroll-zoom hero-editorial hero-with-spotlight relative z-[1] h-[min(155vh,1320px)]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="sticky top-0 h-[100dvh] min-h-[28rem] overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 origin-center"
          style={{ scale: imageScale, opacity: imageOpacity, filter: imageBlur }}
          aria-hidden
        >
          <HeroBackgroundMedia className="absolute inset-0 h-full w-full" />
        </motion.div>

        <motion.div
          className="hero-scrim pointer-events-none absolute inset-0 z-[1]"
          style={{ opacity: scrimBoost }}
          aria-hidden
        />

        <motion.div className="absolute inset-0 z-[2] opacity-80" style={{ opacity: meshOpacity }}>
          {mesh}
        </motion.div>

        {spotlight}

        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-center px-gutter"
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        >
          {children}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-28 z-[15] flex justify-center md:bottom-32"
          aria-hidden
        >
          <div className="hero-scroll-progress flex w-full max-w-xs flex-col items-center gap-2">
            <span className="font-heading text-[0.75rem] font-medium tracking-[-0.02em] text-bone/50">
              Scroll
            </span>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
              <motion.span
                className="hero-scroll-progress-fill block h-full w-full origin-left rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-sky"
                style={{ scaleX: progress }}
              />
            </div>
          </div>
        </motion.div>

        {chrome ? (
          <div className="pointer-events-none absolute inset-0 z-20 [&_*]:pointer-events-auto">
            {chrome}
          </div>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-ink via-ink/85 to-transparent md:h-32"
        aria-hidden
      />
    </section>
  );
}

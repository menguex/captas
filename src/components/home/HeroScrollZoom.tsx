"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroScrollZoomProps = {
  children: ReactNode;
  /** Elementos fijos en el sticky (p. ej. indicador de scroll) */
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const imageScale = useTransform(progress, [0, 1], [1, 1.28]);
  const imageOpacity = useTransform(progress, [0, 0.55, 1], [0.38, 0.22, 0]);
  const imageBlur = useTransform(progress, [0, 1], ["blur(0px)", "blur(16px)"]);
  const overlayOpacity = useTransform(progress, [0, 1], [0.45, 0.92]);
  const contentY = useTransform(progress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(progress, [0, 0.72, 1], [1, 1, 0]);
  const meshOpacity = useTransform(progress, [0, 0.85, 1], [1, 0.6, 0]);

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
          <Image
            src={heroContent.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-28"
          />
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
      className="hero-scroll-zoom hero-editorial hero-with-spotlight relative z-[1] h-[min(200vh,1800px)]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="sticky top-0 h-[100dvh] min-h-[28rem] overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 origin-center will-change-transform"
          style={{ scale: imageScale, opacity: imageOpacity, filter: imageBlur }}
          aria-hidden
        >
          <Image
            src={heroContent.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/30 via-ink/55 to-ink"
          style={{ opacity: overlayOpacity }}
          aria-hidden
        />

        <motion.div className="absolute inset-0 z-[2]" style={{ opacity: meshOpacity }}>
          {mesh}
        </motion.div>

        {spotlight}

        <motion.div
          className="relative z-10 flex h-full w-full items-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {children}
        </motion.div>

        {chrome ? <div className="pointer-events-none absolute inset-0 z-20 [&_*]:pointer-events-auto">{chrome}</div> : null}
      </div>
    </section>
  );
}

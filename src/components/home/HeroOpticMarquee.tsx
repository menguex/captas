"use client";

import { useCallback, useMemo, type RefObject } from "react";
import { motion } from "framer-motion";
import { CurvedLoop } from "@/components/motion/CurvedLoop";
import { heroMarqueeSegments } from "@/content/hero-marquee";
import { captasBrand } from "@/lib/brand-palette";

const ease = [0.16, 1, 0.3, 1] as const;

const HERO_MARQUEE_TONES = {
  primary: captasBrand.accentDeep,
  secondary: "rgba(69, 64, 56, 0.68)",
  separator: "rgba(0, 122, 255, 0.38)",
  shelf: "#f0eeea",
  stroke: "rgba(0, 122, 255, 0.22)",
} as const;

type HeroOpticMarqueeProps = {
  active: boolean;
  scrollScrubRef: RefObject<HTMLElement | null>;
};

export function HeroOpticMarquee({ active, scrollScrubRef }: HeroOpticMarqueeProps) {
  const tones = useMemo(() => HERO_MARQUEE_TONES, []);

  const segmentColor = useCallback(
    (seg: (typeof heroMarqueeSegments)[number]) =>
      seg.tone === "primary" ? tones.primary : tones.secondary,
    [tones]
  );

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.88, duration: 0.9, ease }}
      aria-label="Servicios: UX/UI, Motion, Branding, Foto, Cine, Web"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-24 bg-gradient-to-b from-transparent to-[var(--c-hero-bg)]"
        aria-hidden
      />
      <CurvedLoop
        segments={heroMarqueeSegments}
        segmentColor={segmentColor}
        separatorColor={tones.separator}
        curveAmount={380}
        direction="left"
        scrollDriven
        scrollScrubRef={scrollScrubRef}
        scrubLoops={2.6}
        scrubSmoothing={1.2}
        interactive={false}
        curveStroke
        curveStrokeColor={tones.stroke}
        curveShelfFill={tones.shelf}
        curveTextOnCut
        containerClassName="min-h-[clamp(8rem,20vw,13rem)]"
        svgClassName="text-[clamp(2.85rem,7.8vw,6.25rem)] font-heading font-semibold tracking-[0.02em]"
        className="font-heading"
      />
    </motion.div>
  );
}

"use client";

import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CurvedLoop } from "@/components/motion/CurvedLoop";
import { heroMarqueeSegments } from "@/content/hero-marquee";
import { captasBrand } from "@/lib/brand-palette";

const ease = [0.16, 1, 0.3, 1] as const;

/** Marquee tones locked to light hero */
const HERO_MARQUEE_TONES = {
  primary: captasBrand.accentDeep,
  secondary: "rgba(69, 64, 56, 0.72)",
  separator: "rgba(0, 122, 255, 0.32)",
} as const;

type HeroOpticMarqueeProps = {
  active: boolean;
};

export function HeroOpticMarquee({ active }: HeroOpticMarqueeProps) {
  const tones = useMemo(() => HERO_MARQUEE_TONES, []);

  const segmentColor = useCallback(
    (seg: (typeof heroMarqueeSegments)[number]) =>
      seg.tone === "primary" ? tones.primary : tones.secondary,
    [tones]
  );

  return (
    <motion.div
      className="relative z-20 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.82, duration: 0.8, ease }}
      aria-label="Servicios: UX/UI, Motion, Branding, Foto, Cine, Web"
    >
      <CurvedLoop
        segments={heroMarqueeSegments}
        segmentColor={segmentColor}
        separatorColor={tones.separator}
        speed={3.1}
        curveAmount={400}
        direction="left"
        interactive
        containerClassName="min-h-[clamp(7.5rem,18vw,12rem)]"
        svgClassName="text-[clamp(2.75rem,7.5vw,6rem)] font-heading tracking-[0.04em]"
        className="font-heading"
      />
    </motion.div>
  );
}

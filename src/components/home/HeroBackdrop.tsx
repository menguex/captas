"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroBackdropProps = {
  active: boolean;
  scrollYProgress: MotionValue<number>;
};

export function HeroBackdrop({ active, scrollYProgress }: HeroBackdropProps) {
  const reduced = useReducedMotion();
  const motionOn = active && !reduced;

  const ringScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.45], [0.38, 0.18]);

  return (
    <div className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-spotlight absolute inset-0" />
      <div className="hero-aurora-mesh absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-[0.35]" />

      <motion.div
        className="hero-aurora-blob hero-aurora-blob--indigo absolute left-[6%] top-[6%] h-[min(480px,65vw)] w-[min(480px,65vw)]"
        animate={motionOn ? { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-aurora-blob hero-aurora-blob--cyan absolute -right-[8%] top-[18%] h-[min(360px,48vw)] w-[min(360px,48vw)]"
        animate={motionOn ? { x: [0, -20, 0], y: [0, 14, 0] } : {}}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="hero-aurora-blob hero-aurora-blob--terra absolute bottom-[38%] left-[28%] h-[min(240px,34vw)] w-[min(240px,34vw)]"
        animate={motionOn ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
        <motion.div className="hero-optic-ring hero-optic-ring--outer" style={{ scale: ringScale }} />
        <motion.div className="hero-optic-ring hero-optic-ring--inner" style={{ scale: ringScale }} />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--c-hero-bg)] via-[var(--c-hero-bg)]/80 to-transparent" />
      <motion.div className="absolute inset-0 mesh-grid" style={{ opacity: meshOpacity }} />
    </div>
  );
}

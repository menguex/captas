"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroBackdropProps = {
  active: boolean;
};

export function HeroBackdrop({ active }: HeroBackdropProps) {
  const reduced = useReducedMotion();
  const motionOn = active && !reduced;

  return (
    <div className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-spotlight absolute inset-0" />
      <div className="hero-aurora-mesh absolute inset-0" />

      <motion.div
        className="hero-aurora-blob hero-aurora-blob--indigo absolute left-[8%] top-[12%] h-[min(520px,70vw)] w-[min(520px,70vw)]"
        animate={motionOn ? { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-aurora-blob hero-aurora-blob--cyan absolute -right-[6%] top-[28%] h-[min(380px,52vw)] w-[min(380px,52vw)]"
        animate={motionOn ? { x: [0, -20, 0], y: [0, 14, 0] } : {}}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="hero-aurora-blob hero-aurora-blob--terra absolute bottom-[22%] left-[32%] h-[min(280px,38vw)] w-[min(280px,38vw)]"
        animate={motionOn ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      <div className="hero-optic-ring hero-optic-ring--outer absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />
      <div className="hero-optic-ring hero-optic-ring--inner absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--c-hero-bg)] to-transparent" />
      <div className="absolute inset-0 mesh-grid opacity-[0.38]" />
    </div>
  );
}

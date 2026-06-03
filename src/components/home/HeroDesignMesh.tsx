"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroDesignMeshProps = {
  active: boolean;
};

export function HeroDesignMesh({ active }: HeroDesignMeshProps) {
  const reduced = useReducedMotion();
  const motionOn = active && !reduced;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-editorial-vignette absolute inset-0" />
      <div className="hero-editorial-grid absolute inset-0 opacity-35" />

      <motion.div
        className="hero-editorial-orb hero-editorial-orb--a absolute -left-[10%] top-[5%] h-[55vh] w-[55vh]"
        animate={motionOn ? { x: [0, 30, 0], y: [0, -20, 0] } : {}}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-editorial-orb hero-editorial-orb--b absolute -right-[15%] bottom-[10%] h-[45vh] w-[45vh]"
        animate={motionOn ? { x: [0, -24, 0], y: [0, 16, 0] } : {}}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-[8%] top-[18%] hidden h-24 w-px bg-gradient-to-b from-accent/50 to-transparent lg:block" />
      <div className="absolute bottom-[22%] right-[12%] hidden h-32 w-px bg-gradient-to-t from-sky/40 to-transparent lg:block" />
    </div>
  );
}

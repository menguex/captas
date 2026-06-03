"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ManifestoSectionBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="manifesto-section-bg pointer-events-none absolute inset-0" aria-hidden>
      <div className="manifesto-section-bg-base" />
      <div className="manifesto-section-bg-grid" />
      <div className="manifesto-section-bg-mesh" />

      <motion.div
        className="manifesto-section-bg-orb manifesto-section-bg-orb--indigo"
        animate={reduced ? {} : { x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="manifesto-section-bg-orb manifesto-section-bg-orb--cyan"
        animate={reduced ? {} : { x: [0, -20, 0], y: [0, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        className="manifesto-section-bg-orb manifesto-section-bg-orb--accent"
        animate={reduced ? {} : { scale: [1, 1.06, 1], opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="manifesto-section-bg-spotlight" />
      <div className="manifesto-section-bg-vignette" />
      <div className="manifesto-section-bg-fade manifesto-section-bg-fade--top" />
      <div className="manifesto-section-bg-fade manifesto-section-bg-fade--bottom" />

      <svg
        className="manifesto-section-bg-blueprint absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="msb-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(91,97,255,0)" />
            <stop offset="20%" stopColor="rgba(91,97,255,0.22)" />
            <stop offset="50%" stopColor="rgba(14,165,233,0.18)" />
            <stop offset="80%" stopColor="rgba(91,97,255,0.22)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0)" />
          </linearGradient>
        </defs>

        <line x1="0" y1="120" x2="1440" y2="120" stroke="url(#msb-line)" strokeWidth="1" />
        <line x1="0" y1="680" x2="1440" y2="680" stroke="url(#msb-line)" strokeWidth="1" opacity="0.7" />
        <line x1="480" y1="0" x2="480" y2="800" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="960" y1="0" x2="960" y2="800" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        <circle cx="720" cy="400" r="220" stroke="rgba(91,97,255,0.08)" strokeWidth="1" />
        <circle
          cx="720"
          cy="400"
          r="280"
          stroke="rgba(14,165,233,0.06)"
          strokeWidth="1"
          strokeDasharray="4 12"
        />

        <path
          d="M 0 400 Q 360 320 720 400 T 1440 400"
          stroke="rgba(100,210,255,0.12)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

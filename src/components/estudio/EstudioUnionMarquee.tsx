"use client";

import { motion } from "framer-motion";
import { estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

function MarqueeChunk() {
  return (
    <span className="inline-flex shrink-0 items-center gap-6 md:gap-8">
      {estudioUnion.crafts.map((craft) => (
        <span key={craft} className="inline-flex items-center gap-6 md:gap-8">
          <span>{craft}</span>
          <span className="text-accent/60">+</span>
        </span>
      ))}
      <span className="text-accent/80">→</span>
      <span className="rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-shimmer-dark shadow-[0_0_20px_rgba(var(--c-accent-rgb),0.2)]">
        {estudioUnion.result}
      </span>
      <span className="mx-4 text-bone/20">·</span>
    </span>
  );
}

export function EstudioUnionMarquee() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="relative mt-16 overflow-hidden border-y border-line py-5 md:mt-20"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: easeOut }}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink from-5% via-transparent via-50% to-ink to-95%" />
      {reduced ? (
        <p className="site-container text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-on-ink-muted">
          {estudioUnion.crafts.join(" + ")} → {estudioUnion.result}
        </p>
      ) : (
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center whitespace-nowrap px-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-ink-muted md:text-[0.72rem]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            <MarqueeChunk />
            <MarqueeChunk />
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}

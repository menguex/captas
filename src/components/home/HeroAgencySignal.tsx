"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

type HeroAgencySignalProps = {
  active: boolean;
};

export function HeroAgencySignal({ active }: HeroAgencySignalProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pt-4">
      <motion.blockquote
        className="hero-agency-quote relative border-l border-accent/35 pl-6"
        initial={active ? { opacity: 0, x: 20 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease }}
      >
        <p className="font-heading text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-snug tracking-[-0.03em] text-bone/88">
          {heroContent.statement}
        </p>
      </motion.blockquote>

      <ul className="mt-10 space-y-0" role="list">
        {heroContent.pillars.map((pillar, i) => (
          <motion.li
            key={pillar.label}
            className="hero-agency-pillar group border-t border-white/10 py-5 first:border-t-0 lg:first:border-t lg:first:pt-0"
            initial={active ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 + i * 0.08, duration: 0.75, ease }}
          >
            <div className="flex items-start gap-5">
              <span className="font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.2em] text-accent/80">
                {pillar.label}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-h3 font-semibold tracking-tight text-bone">
                  {pillar.title}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-bone/55 transition-colors group-hover:text-bone/72">
                  {pillar.text}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      {!reduced ? (
        <motion.div
          className="hero-agency-orbit pointer-events-none absolute -right-4 top-8 hidden h-28 w-28 lg:block xl:-right-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <svg viewBox="0 0 100 100" className="h-full w-full text-bone/20">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.35"
              strokeDasharray="4 6"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.5rem] uppercase tracking-[0.28em] text-accent/70">
            Captas
          </span>
        </motion.div>
      ) : null}
    </div>
  );
}

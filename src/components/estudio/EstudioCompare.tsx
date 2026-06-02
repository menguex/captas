"use client";

import { motion } from "framer-motion";
import { estudioCompare } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, staggerContainer, viewportOnce } from "@/lib/motion";

export function EstudioCompare() {
  const reduced = useReducedMotion();
  const { without, with: withCaptas } = estudioCompare;

  return (
    <section
      id="por-que"
      className="scroll-mt-28 mt-14 md:mt-20"
      aria-labelledby="compare-heading"
    >
      <motion.header
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">
          {estudioCompare.kicker}
        </p>
        <h2
          id="compare-heading"
          className="mt-2 font-heading text-h3 tracking-tight text-bone md:text-h2"
        >
          {estudioCompare.title}{" "}
          <span className="text-shimmer-dark">{estudioCompare.titleAccent}</span>
        </h2>
      </motion.header>

      <motion.div
        className="mt-8 grid gap-4 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.article
          variants={{
            hidden: { opacity: 0, x: -16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
          }}
          className="rounded-box-lg border border-bone/10 bg-white/[0.03] p-5 md:p-6"
        >
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-on-ink-subtle">
            {without.label}
          </p>
          <ul className="mt-4 space-y-3" role="list">
            {without.items.map((line) => (
              <li key={line} className="flex gap-3 text-small leading-snug text-on-ink-muted">
                <span className="mt-0.5 shrink-0 font-mono text-terra" aria-hidden>
                  —
                </span>
                {line}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          variants={{
            hidden: { opacity: 0, x: 16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut, delay: 0.08 } },
          }}
          className="relative overflow-hidden rounded-box-lg border border-accent/30 bg-gradient-to-br from-accent/12 via-ink-soft to-ink-soft p-5 shadow-[0_16px_48px_rgba(0,122,255,0.12)] md:p-6"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent"
            aria-hidden
          />
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-sky">
            {withCaptas.label}
          </p>
          <ul className="mt-4 space-y-3" role="list">
            {withCaptas.items.map((line) => (
              <li key={line} className="flex gap-3 text-small leading-snug text-bone">
                <span className="mt-0.5 shrink-0 font-mono text-sky" aria-hidden>
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </motion.article>
      </motion.div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { estudioModel, estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const STEP_MS = 5500;

export function EstudioHowItWorks() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = estudioModel[active];

  const goTo = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % estudioModel.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <section
      className="mt-20 md:mt-28"
      aria-label="Cómo armamos tu proyecto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="max-w-2xl"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
          Cómo armamos el proyecto
        </p>
        <h2 className="mt-2 font-heading text-h2 tracking-tight text-bone md:text-h1">
          {estudioUnion.headline}{" "}
          <span className="text-shimmer-dark">{estudioUnion.headlineAccent}</span>
        </h2>
        <p className="mt-3 text-body text-on-ink-muted">{estudioUnion.subline}</p>
      </motion.div>

      <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {estudioModel.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded-box-lg border px-4 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky ${
              active === i
                ? "border-accent/45 bg-accent/15"
                : "border-line bg-ink-soft/80 hover:border-accent/25"
            }`}
            whileHover={reduced ? undefined : { y: -3 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <span className="font-mono text-[0.58rem] tabular-nums tracking-[0.2em] text-sky">
              {s.step}
            </span>
            <span className="mt-2 block font-heading text-small leading-snug text-bone">
              {s.title}
            </span>
            {active === i && !reduced && !paused ? (
              <motion.span
                key={`progress-${active}`}
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </motion.button>
        ))}
      </div>

      <div className="gloss-card relative mt-4 overflow-hidden rounded-box-lg border border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(91,97,255,0.18),transparent_50%)]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            className="relative grid gap-8 p-6 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:items-end md:p-10"
            initial={reduced ? false : { opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={reduced ? undefined : { opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, x: -32, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <div className="relative">
              <span
                className="pointer-events-none absolute -left-2 top-0 font-heading text-[clamp(4rem,12vw,7rem)] font-semibold leading-none tracking-tighter text-bone/[0.06]"
                aria-hidden
              >
                {step.step}
              </span>
              <p className="relative font-mono text-kicker uppercase tracking-[0.18em] text-terra">
                {step.hook}
              </p>
              <h3 className="relative mt-3 font-heading text-h2 leading-tight text-bone md:text-[clamp(1.75rem,3vw,2.5rem)]">
                {step.title}
              </h3>
            </div>
            <p className="text-lead leading-relaxed text-bone/90">{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

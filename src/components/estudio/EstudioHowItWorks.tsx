"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { estudioModel } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";

const STEP_MS = 5000;

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
  }, [reduced, paused, active]);

  return (
    <section
      className="mt-20 md:mt-28"
      aria-label="Cómo funciona el estudio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
            Cómo armamos el estudio
          </p>
          <h2 className="mt-2 font-heading text-h2 tracking-tight text-bone md:text-h1">
            Tu reto, nuestro squad.
          </h2>
        </div>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-on-ink-muted">
          {paused ? "Pausado" : "Auto"} · elige una fase
        </p>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {estudioModel.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${
              active === i
                ? "border-accent/50 bg-accent/20 text-bone"
                : "border-line bg-ink-soft text-on-ink-muted hover:border-accent/30"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="relative mt-6 overflow-hidden rounded-box-lg border border-line bg-ink-soft">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(91,97,255,0.12),transparent_55%)]" />

        {!reduced && !paused ? (
          <motion.div
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
            key={`progress-${active}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: STEP_MS / 1000, ease: "linear" }}
          />
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            className="relative grid gap-8 p-6 md:grid-cols-[1fr_1.4fr] md:items-center md:p-10"
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <div>
              <motion.span
                className="inline-block h-1 w-10 rounded-full bg-terra"
                initial={reduced ? false : { width: 0 }}
                animate={reduced ? undefined : { width: 40 }}
                transition={{ duration: 0.5, ease: easeOut }}
              />
              <p className="mt-4 font-mono text-kicker uppercase tracking-[0.18em] text-terra">
                {step.hook}
              </p>
              <h3 className="mt-3 font-heading text-h2 leading-tight text-bone">
                {step.title}
              </h3>
            </div>
            <p className="text-lead leading-relaxed text-on-ink-muted">{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

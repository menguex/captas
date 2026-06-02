"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { estudioModel, estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PIPELINE_STEP_MS, springSnappy, springSmooth } from "@/lib/estudio-motion";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioPipeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = estudioModel[active];

  const goTo = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % estudioModel.length);
    }, PIPELINE_STEP_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <section
      className="mt-14 md:mt-20"
      aria-label="Pipeline del proyecto"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.header
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sky">
            Cómo armamos el proyecto
          </p>
          <h2 className="mt-1 font-heading text-h3 tracking-tight text-bone md:text-h2">
            {estudioUnion.headline}{" "}
            <span className="text-shimmer-dark">{estudioUnion.headlineAccent}</span>
          </h2>
        </div>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-on-ink-muted">
          {paused ? "Pausa" : "Auto"}
        </span>
      </motion.header>

      <div className="gloss-card relative mt-5 overflow-hidden rounded-box-lg border border-line bg-ink-soft/80">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />

        <div className="relative flex">
          {estudioModel.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`relative flex-1 border-r border-line/50 px-2 py-3 text-center outline-none transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky sm:px-3 sm:py-4 ${
                  isActive ? "text-bone" : "text-on-ink-muted hover:text-bone/80"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="pipeline-tab"
                    className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
                    transition={springSnappy}
                  />
                ) : null}
                {isActive && !reduced && !paused ? (
                  <motion.span
                    key={`fill-${active}`}
                    className="absolute inset-x-1 bottom-0 h-0.5 origin-left rounded-full bg-white/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: PIPELINE_STEP_MS / 1000, ease: "linear" }}
                  />
                ) : null}
                <span className="relative block font-mono text-[0.55rem] tabular-nums tracking-[0.18em] text-sky">
                  {s.step}
                </span>
                <span className="relative mt-1 hidden font-heading text-[0.65rem] leading-tight sm:block">
                  {s.title.split(" ").slice(-1)[0]}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            className="border-t border-line/60 px-4 py-4 sm:px-6 sm:py-5"
            initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={springSmooth}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-terra">
                  {step.hook}
                </p>
                <h3 className="mt-1 font-heading text-h3 leading-tight text-bone">{step.title}</h3>
              </div>
              <p className="max-w-md text-small leading-relaxed text-on-ink-muted sm:text-body">
                {step.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { estudioModel, estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PIPELINE_STEP_MS, springSmooth } from "@/lib/estudio-motion";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioPipeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = estudioModel[active];
  const progress = (active + 1) / estudioModel.length;

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
      id="como"
      className="scroll-mt-28 mt-14 md:mt-20"
      aria-label="Cómo armamos tu proyecto"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.header
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div>
          <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
            Cómo trabajamos
          </p>
          <h2 className="mt-2 font-heading text-h3 tracking-tight text-bone md:text-h2">
            {estudioUnion.headline}{" "}
            <span className="text-shimmer-dark">{estudioUnion.headlineAccent}</span>
          </h2>
          <p className="mt-2 max-w-md text-small text-on-ink-muted">{estudioUnion.subline}</p>
        </div>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-on-ink-muted">
          {paused ? "Pausado · elige una etapa" : "Auto · toca para explorar"}
        </p>
      </motion.header>

      <div className="gloss-card relative mt-6 overflow-hidden rounded-box-lg border border-line bg-ink-soft/85 md:mt-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />

        <div className="border-b border-line/50 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-sky">
              Etapa {active + 1} de {estudioModel.length}
            </p>
            <p className="font-mono text-[0.58rem] tabular-nums text-on-ink-muted">
              {Math.round(progress * 100)}%
            </p>
          </div>
          <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }}
            />
            {!reduced && !paused ? (
              <motion.span
                key={`step-fill-${active}`}
                className="absolute inset-y-0 left-0 origin-left rounded-full bg-white/25"
                initial={{ width: `${((active) / estudioModel.length) * 100}%` }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: PIPELINE_STEP_MS / 1000, ease: "linear" }}
                aria-hidden
              />
            ) : null}
          </div>
        </div>

        <div
          className="flex gap-2 overflow-x-auto border-b border-line/50 p-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:gap-0 sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Etapas del proyecto"
        >
          {estudioModel.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(i)}
                className={`relative flex min-w-[9.5rem] shrink-0 flex-col items-start rounded-xl border px-3 py-3 text-left outline-none transition-colors sm:min-w-0 sm:rounded-none sm:border-0 sm:border-r sm:border-line/50 sm:px-4 sm:py-4 last:sm:border-r-0 focus-visible:ring-2 focus-visible:ring-sky ${
                  isActive
                    ? "border-accent/35 bg-accent/10 text-bone"
                    : "border-bone/10 bg-white/[0.02] text-on-ink-muted hover:border-bone/20 hover:text-bone/90"
                }`}
              >
                <span className="flex w-full items-center gap-2">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm ${
                      isActive
                        ? "border-accent/40 bg-accent/15 text-sky"
                        : "border-bone/10 bg-ink/50 text-on-ink-subtle"
                    }`}
                    aria-hidden
                  >
                    {s.emoji}
                  </span>
                  <span className="font-mono text-[0.55rem] tabular-nums tracking-[0.14em] text-sky">
                    {s.step}
                  </span>
                </span>
                <span className="mt-2 font-heading text-[0.72rem] leading-snug sm:text-small">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            role="tabpanel"
            className="px-4 py-5 sm:px-8 sm:py-7"
            initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={springSmooth}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div className="max-w-md">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-terra">
                  {step.hook}
                </p>
                <h3 className="mt-2 font-heading text-h2 leading-tight tracking-tight text-bone">
                  {step.title}
                </h3>
              </div>
              <p className="max-w-lg text-body leading-relaxed text-on-ink-muted lg:pt-1">
                {step.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

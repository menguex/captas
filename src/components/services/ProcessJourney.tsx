"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { processSteps } from "@/content/process";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const STEP_MS = 5500;
const ease = easeOut;

type ProcessJourneyProps = {
  className?: string;
  /** Sin cabecera propia — para usar con SectionHeader externo (home) */
  embedded?: boolean;
};

export function ProcessJourney({ className = "", embedded = false }: ProcessJourneyProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = processSteps[active];

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (reduced || !inView || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % processSteps.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [reduced, inView, paused, active]);

  const progress = (active + 1) / processSteps.length;

  return (
    <motion.section
      ref={ref}
      className={`mt-16 overflow-hidden rounded-box-lg border border-line-dark bg-bone text-ink ${className}`}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Cómo trabajamos contigo"
    >
      {!embedded ? (
        <div className="border-b border-line-dark bg-white/70 px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-kicker uppercase tracking-[0.2em] text-accent">
                Método · 4 etapas
              </p>
              <h2 className="mt-2 font-heading text-h2 tracking-tight text-ink">
                Cómo trabajamos contigo
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[0.62rem] uppercase tracking-[0.18em] text-clay">
              {paused ? "Pausado" : "Auto"} · Toca una etapa
            </p>
          </div>

          <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-line-dark/80">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: reduced ? 0 : 0.55, ease }}
            />
          </div>
        </div>
      ) : (
        <div className="border-b border-line-dark bg-white/50 px-6 py-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-clay">
              {paused ? "Exploración pausada" : "Recorre las 4 etapas"} · Clic para cambiar
            </p>
            <div className="relative h-1 min-w-[8rem] flex-1 overflow-hidden rounded-full bg-line-dark/80 md:max-w-xs">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.55, ease }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop: step rail */}
      <div
        className="hidden gap-2 p-4 md:grid md:grid-cols-4 md:p-5"
        role="tablist"
        aria-label="Etapas del proceso"
      >
        {processSteps.map((s, i) => (
          <ProcessStepTab
            key={s.number}
            step={s}
            active={active === i}
            onSelect={() => goTo(i)}
            reduced={reduced}
          />
        ))}
      </div>

      {/* Mobile: horizontal snap */}
      <div
        className="flex gap-3 overflow-x-auto p-4 scrollbar-hide md:hidden"
        role="tablist"
        aria-label="Etapas del proceso"
      >
        {processSteps.map((s, i) => (
          <ProcessStepTab
            key={s.number}
            step={s}
            active={active === i}
            compact
            onSelect={() => goTo(i)}
            reduced={reduced}
          />
        ))}
      </div>

      {/* Active step — panel experiencia */}
      <div className="relative border-t border-line-dark bg-gradient-to-br from-white via-bone to-accent/[0.04] px-6 py-8 md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mesh-grid"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step.number}
            role="tabpanel"
            initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease }}
            className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12"
          >
            <motion.div
              className="flex flex-col items-start"
              initial={reduced ? false : { scale: 0.92 }}
              animate={reduced ? undefined : { scale: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.05 }}
            >
              <span className="font-mono text-[clamp(3.5rem,10vw,5.5rem)] font-medium tabular-nums leading-none text-accent/25">
                {step.number}
              </span>
              <motion.span
                className="mt-2 h-1 rounded-full bg-terra"
                initial={reduced ? false : { width: 0 }}
                animate={reduced ? undefined : { width: 48 }}
                transition={{ duration: 0.6, ease, delay: 0.15 }}
              />
            </motion.div>

            <div>
              <p className="font-mono text-kicker uppercase tracking-[0.22em] text-terra">
                {step.subtitle}
              </p>
              <h3 className="mt-3 font-heading text-h1 leading-[1.05] tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lead leading-relaxed text-clay">
                {step.text}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {processSteps.map((s, i) => (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir a etapa ${s.number}: ${s.title}`}
                    aria-current={active === i ? "step" : undefined}
                    className={`h-2 rounded-full transition-all duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      active === i ? "w-8 bg-accent" : "w-2 bg-accent/25 hover:bg-accent/45"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function ProcessStepTab({
  step,
  active,
  compact,
  onSelect,
  reduced,
}: {
  step: (typeof processSteps)[number];
  active: boolean;
  compact?: boolean;
  onSelect: () => void;
  reduced: boolean;
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      layout={reduced ? false : !compact}
      transition={{ duration: 0.35, ease }}
      className={`relative shrink-0 overflow-hidden rounded-box-lg border text-left transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        compact ? "min-w-[11.5rem] px-4 py-3.5" : "px-4 py-4"
      } ${
        active
          ? "border-accent bg-white shadow-[0_10px_36px_rgba(61,85,108,0.12)]"
          : "border-line-dark/80 bg-white/60 hover:border-accent/25 hover:bg-white"
      }`}
    >
      {active && !reduced ? (
        <motion.span
          layoutId="process-step-glow"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span className="relative flex items-baseline gap-2">
        <span
          className={`font-mono text-kicker tabular-nums uppercase tracking-[0.2em] ${
            active ? "text-accent" : "text-clay"
          }`}
        >
          {step.number}
        </span>
        <span
          className={`font-heading tracking-tight ${compact ? "text-body" : "text-h3"} ${
            active ? "text-ink" : "text-clay"
          }`}
        >
          {step.title}
        </span>
      </span>
      {!compact ? (
        <span className="relative mt-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-clay">
          {step.subtitle}
        </span>
      ) : null}
    </motion.button>
  );
}

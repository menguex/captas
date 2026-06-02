"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JourneyBackdrop, JourneyStepMedia } from "@/components/estudio/JourneyBackdrop";
import { estudioFinale, estudioJourney } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";

const ease = easeOut;
const STEP_COUNT = estudioJourney.length;

function StepIndicator({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progreso del recorrido">
      {estudioJourney.map((s, i) => (
        <li key={s.id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-[0.7rem] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-sky ${
              active === i
                ? "scale-110 bg-accent text-white shadow-[0_0_24px_rgba(0,122,255,0.45)]"
                : active > i
                  ? "border border-accent/40 bg-accent/15 text-sky"
                  : "border border-bone/20 bg-white/[0.04] text-on-ink-muted hover:border-bone/35"
            }`}
            aria-current={active === i ? "step" : undefined}
            aria-label={`${s.kicker}: ${s.title}`}
          >
            {i + 1}
          </button>
          {i < STEP_COUNT - 1 ? (
            <span
              className={`h-px w-6 transition-colors sm:w-8 ${
                active > i ? "bg-accent/55" : "bg-line/50"
              }`}
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function StepPanel({ index }: { index: number }) {
  const step = estudioJourney[index];

  return (
    <motion.div
      key={step.id}
      role="tabpanel"
      className="site-container relative flex min-h-0 flex-col justify-center px-gutter py-12 md:py-16"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease }}
    >
      <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">{step.kicker}</p>
      <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bone drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
        {step.title}{" "}
        <span className="text-shimmer-dark">{step.titleAccent}</span>
      </h2>
      <p className="mt-6 max-w-lg text-lead leading-relaxed text-on-ink-muted drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]">
        {step.body}
      </p>

      {step.chips ? (
        <motion.ul
          className="mt-10 flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          {step.chips.map((chip) => (
            <motion.li
              key={chip}
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
              }}
            >
              <span className="inline-flex rounded-full border border-bone/20 bg-ink/40 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone backdrop-blur-md">
                {chip}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}

      {index === STEP_COUNT - 1 ? (
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease }}
        >
          <MagneticButton href="/contacto">{estudioFinale.cta}</MagneticButton>
          <Link
            href="/servicios"
            className="font-mono text-kicker uppercase tracking-[0.16em] text-on-ink-muted transition-colors hover:text-sky"
          >
            {estudioFinale.secondary} →
          </Link>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export function EstudioScrollJourney() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const idx = Math.min(STEP_COUNT - 1, Math.floor(v * STEP_COUNT * 0.999));
    setActive(idx);
  });

  const scrollToStep = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const stepHeight = el.offsetHeight / STEP_COUNT;
    const top = el.offsetTop + i * stepHeight + 2;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(i);
  };

  if (reduced) {
    return (
      <section id="recorrido" className="scroll-mt-28">
        {estudioJourney.map((step, i) => (
          <article
            key={step.id}
            id={step.id}
            className="relative border-t border-line/60 py-14 md:py-20"
          >
            <div className="site-container px-gutter">
              <JourneyStepMedia stepIndex={i} />
              <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">{step.kicker}</p>
              <h2 className="mt-4 max-w-2xl font-heading text-h2 font-semibold tracking-tight text-bone">
                {step.title} <span className="text-shimmer-dark">{step.titleAccent}</span>
              </h2>
              <p className="mt-4 max-w-lg text-body leading-relaxed text-on-ink-muted">{step.body}</p>
              {step.chips ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {step.chips.map((chip) => (
                    <li key={chip}>
                      <span className="inline-flex rounded-full border border-bone/15 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-on-ink-muted">
                        {chip}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {i === STEP_COUNT - 1 ? (
                <div className="mt-8 flex flex-wrap gap-4">
                  <MagneticButton href="/contacto">{estudioFinale.cta}</MagneticButton>
                  <Link
                    href="/servicios"
                    className="font-mono text-kicker uppercase tracking-[0.16em] text-on-ink-muted hover:text-sky"
                  >
                    {estudioFinale.secondary} →
                  </Link>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section id="recorrido" className="scroll-mt-28" aria-label="Cómo funciona Captas en tres pasos">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${STEP_COUNT * 100}vh` }}
      >
        <div className="sticky top-0 z-10 h-[100dvh] overflow-hidden">
          <JourneyBackdrop scrollProgress={scrollYProgress} active={active} />

          <div className="relative z-20 flex h-full flex-col">
            <div className="site-container flex shrink-0 items-center justify-between gap-4 border-b border-bone/10 bg-ink/30 px-gutter py-4 backdrop-blur-md">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-on-ink-subtle">
                {estudioJourney[active].kicker} · {estudioJourney[active].step}
              </p>
              <StepIndicator active={active} onSelect={scrollToStep} />
            </div>

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait">
                <StepPanel index={active} />
              </AnimatePresence>
            </div>

            <div className="site-container shrink-0 px-gutter pb-8">
              <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-on-ink-subtle">
                {active < STEP_COUNT - 1
                  ? "Sigue deslizando · el video avanza contigo"
                  : estudioFinale.line}
              </p>
              <motion.div
                className="mx-auto mt-3 h-1 max-w-xs overflow-hidden rounded-full bg-white/[0.08]"
                aria-hidden
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-sky"
                  animate={{ width: `${((active + 1) / STEP_COUNT) * 100}%` }}
                  transition={{ duration: 0.4, ease }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {estudioJourney.map((s, i) => (
          <div
            key={s.id}
            data-step-marker
            className="absolute left-0 w-full"
            style={{ top: `${(i / STEP_COUNT) * 100}%`, height: `${100 / STEP_COUNT}%` }}
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
}

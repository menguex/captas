"use client";

import { motion } from "framer-motion";
import { estudioQuickGuide } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const card = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: easeOut },
  }),
};

export function EstudioQuickGuide() {
  const reduced = useReducedMotion();

  return (
    <section id="guia" className="scroll-mt-28" aria-labelledby="guia-heading">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">En 3 pasos</p>
        <h2
          id="guia-heading"
          className="mt-2 max-w-lg font-heading text-h3 tracking-tight text-bone md:text-h2"
        >
          Así funciona Captas,{" "}
          <span className="text-gradient-terra">sin complicarte.</span>
        </h2>
      </motion.div>

      <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
        {estudioQuickGuide.map((item, i) => (
          <motion.li
            key={item.id}
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="gloss-card group relative overflow-hidden rounded-box-lg border border-line bg-ink-soft/90 p-5 transition-colors duration-300 hover:border-accent/25 md:p-6"
          >
            <span
              className="pointer-events-none absolute -right-2 -top-4 font-heading text-[5rem] font-semibold leading-none text-white/[0.04] transition-colors group-hover:text-accent/[0.07]"
              aria-hidden
            >
              {item.step}
            </span>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-sky/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden
            />
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/35 bg-accent/12 font-mono text-[0.65rem] tabular-nums text-sky">
              {item.step}
            </span>
            <h3 className="mt-4 font-heading text-small font-medium text-bone md:text-body">
              {item.title}
            </h3>
            <p className="mt-2 text-small leading-relaxed text-on-ink-muted">{item.text}</p>
            {i < estudioQuickGuide.length - 1 ? (
              <span
                className="pointer-events-none absolute -bottom-4 right-6 hidden font-mono text-2xl text-accent/40 md:block"
                aria-hidden
              >
                →
              </span>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

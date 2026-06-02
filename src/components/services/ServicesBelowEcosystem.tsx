"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { serviciosBelow } from "@/content/servicios-page";
import { fadeUp, staggerContainer, viewportOnce, easeOut } from "@/lib/motion";

/** Debajo del explorador — mínimo, llamativo, sin repetir el ecosistema */
export function ServicesBelowEcosystem() {
  const { method, stats, quote, cta } = serviciosBelow;

  return (
    <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
      {/* Método — una franja */}
      <motion.section
        className="overflow-hidden rounded-box-lg border border-line-dark/80 bg-white/90 px-5 py-6 shadow-[0_8px_32px_rgba(15,18,24,0.06)] md:px-8 md:py-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.75, ease: easeOut }}
        aria-label="Método de trabajo"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.2em] text-accent">
              {method.kicker}
            </p>
            <p className="mt-1 font-heading text-h3 tracking-tight text-ink">{method.line}</p>
          </div>
          <Link
            href="/contacto"
            className="hidden font-mono text-kicker uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80 sm:inline-flex"
          >
            Empezar →
          </Link>
        </div>

        <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2">
          {method.steps.map((step, i) => (
            <li
              key={step.id}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line-dark/70 bg-bone/50 px-3 py-2 sm:min-w-[9rem]"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-[0.55rem] font-medium text-accent-deep"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-small leading-tight text-ink">
                  {step.title}
                </span>
                <span className="block truncate font-mono text-[0.55rem] uppercase tracking-[0.1em] text-on-light-subtle">
                  {step.subtitle}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* Prueba social — stats + quote */}
      <motion.div
        className="grid gap-4 lg:grid-cols-[1fr_1.2fr] lg:items-stretch"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.ul
          variants={fadeUp}
          className="grid grid-cols-3 gap-px overflow-hidden rounded-box-lg border border-line-dark/80 bg-line-dark"
          role="list"
        >
          {stats.map((s) => (
            <li key={s.label} className="bg-white px-3 py-4 text-center sm:px-4">
              <p className="font-heading text-h2 tabular-nums leading-none text-accent">{s.value}</p>
              <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-on-light-muted">
                {s.label}
              </p>
            </li>
          ))}
        </motion.ul>

        <motion.blockquote
          variants={fadeUp}
          className="flex flex-col justify-center rounded-box-lg border border-line-dark/80 bg-gradient-to-br from-white to-accent/[0.04] px-5 py-5 md:px-6"
        >
          <p className="font-heading text-[clamp(1rem,2.2vw,1.25rem)] leading-snug tracking-tight text-ink">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-light-muted">
            {quote.author} · {quote.company}
          </footer>
        </motion.blockquote>
      </motion.div>

      {/* CTA único — sin duplicar el panel integral del ecosistema */}
      <motion.div
        className="flex flex-col items-center justify-between gap-4 rounded-box-lg border border-accent/25 bg-accent/[0.07] px-6 py-6 text-center sm:flex-row sm:text-left md:px-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="font-heading text-h3 tracking-tight text-ink">{cta.line}</p>
        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          <Link href="/contacto" className="gloss-button inline-flex justify-center">
            {cta.primary}
          </Link>
          <Link
            href="/trabajo"
            className="inline-flex items-center justify-center rounded-full border border-line-dark bg-white px-5 py-3 font-sans text-body font-medium text-ink transition-colors hover:border-accent/35 hover:text-accent"
          >
            {cta.secondary} →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

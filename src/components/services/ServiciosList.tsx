"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { processSteps, testimonials } from "@/content/process";
import { stats } from "@/content/site";
import { PillarExplorer } from "./PillarExplorer";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function ServiciosList() {
  const featuredQuote = testimonials[0];

  return (
    <>
      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.slice(0, 4).map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="rounded-box-lg border border-line-dark bg-white/70 px-5 py-4 backdrop-blur-sm"
          >
            <p className="font-heading text-h3 text-accent">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="mt-1 text-small text-clay">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <PillarExplorer className="mt-14" autoPlay={false} />

      <motion.div
        className="mt-16 overflow-hidden rounded-box-lg border border-line-dark bg-white/60"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="border-b border-line-dark bg-white/80 px-6 py-4 font-mono text-kicker uppercase tracking-[0.16em] text-clay">
          Cómo trabajamos contigo
        </p>
        <div className="grid gap-px bg-line-dark md:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.number} className="bg-bone px-5 py-6 md:px-6 md:py-7">
              <span className="font-mono text-kicker tabular-nums text-accent">
                {step.number}
              </span>
              <p className="mt-3 font-heading text-body text-ink">{step.title}</p>
              <p className="mt-2 text-small leading-relaxed text-clay">{step.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.blockquote
        className="mt-16 rounded-box-lg border border-line-dark bg-gradient-to-br from-white via-white to-accent/[0.06] p-8 md:p-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.18em] text-clay">
          Lo que dicen las marcas
        </p>
        <p className="mt-5 font-heading text-h3 leading-snug text-ink">
          &ldquo;{featuredQuote.quote}&rdquo;
        </p>
        <footer className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-body text-ink">{featuredQuote.author}</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-clay">
            {featuredQuote.role} · {featuredQuote.company}
          </span>
        </footer>
      </motion.blockquote>

      <motion.div
        className="mt-14 flex flex-col items-center justify-center gap-6 rounded-box-lg border border-accent/20 bg-accent/[0.06] px-8 py-10 text-center sm:flex-row sm:text-left"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex-1">
          <p className="font-mono text-kicker uppercase tracking-[0.16em] text-accent">
            ¿Listo para elevar tu marca?
          </p>
          <p className="mt-2 font-heading text-h3 text-ink">
            Cuéntanos tu proyecto y armamos una propuesta a medida.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/contacto" className="gloss-button inline-flex items-center justify-center">
            Solicitar propuesta
          </Link>
          <Link
            href="/trabajo"
            className="inline-flex items-center justify-center rounded-full border border-line-dark bg-white/90 px-6 py-3 font-sans text-body font-medium text-clay transition-colors hover:border-accent/30 hover:text-accent"
          >
            Ver casos →
          </Link>
        </div>
      </motion.div>
    </>
  );
}

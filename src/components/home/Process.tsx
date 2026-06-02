"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/content/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-bone py-section text-ink">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          kicker="Método · Cómo trabajamos"
          title={
            <>
              Un proceso claro.{" "}
              <span className="text-accent">Resultados que elevan tu marca.</span>
            </>
          }
          description="Cuatro etapas conectadas — del primer descubrimiento al lanzamiento — diseñadas para que cada decisión tenga propósito."
        />

        <motion.div
          className="mt-16 grid gap-px overflow-hidden rounded-box-lg border border-line-dark bg-line-dark md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {processSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="group relative bg-bone p-8 transition-colors duration-base hover:bg-bone-dim md:p-10"
            >
              <span className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em] text-terra">
                {step.number}
              </span>
              <h3 className="mt-6 font-heading text-h3 leading-tight tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-clay">
                {step.subtitle}
              </p>
              <p className="mt-5 text-body leading-relaxed text-clay/95">
                {step.text}
              </p>
              <span className="mt-8 inline-block h-px w-0 bg-terra transition-all duration-base group-hover:w-full" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

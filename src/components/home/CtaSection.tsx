"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { site } from "@/content/site";
import { viewportOnce, easeOut } from "@/lib/motion";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-section">
      {/* Layered ambient atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 gloss-ambient" />
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.12]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(0,122,255,0.15)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full blur-[100px]"
        style={{ backgroundColor: "rgba(100,210,255,0.1)" }}
      />

      <div className="site-container relative">
        {/* Editorial kicker with hairline */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="h-px bg-gradient-to-r from-transparent to-accent/50"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOut }}
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
            Conversemos · 010
          </p>
          <motion.span
            className="h-px bg-gradient-to-l from-transparent to-accent/50"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOut }}
            aria-hidden
          />
        </motion.div>

        {/* The big closing statement */}
        <motion.h2
          className="mx-auto mt-12 max-w-4xl text-center font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-bone"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          Hagamos que tu marca se sienta{" "}
          <span className="italic text-sky">irresistible.</span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-center text-lead leading-relaxed text-pretty text-bone/78"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.85, ease: easeOut }}
        >
          Cuéntanos tu proyecto en una llamada de 30 minutos. Salimos con una
          propuesta de dirección creativa y plazos realistas.
        </motion.p>

        {/* Email as massive editorial link */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.9, ease: easeOut }}
        >
          <a
            href={`mailto:${site.email}`}
            className="group relative inline-block font-heading text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.035em] text-bone transition-colors hover:text-sky"
          >
            {site.email}
            <span
              className="mt-3 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-sky to-accent transition-transform duration-slow ease-out group-hover:scale-x-100"
              aria-hidden
            />
          </a>
        </motion.div>

        {/* CTA actions */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.45, duration: 0.8, ease: easeOut }}
        >
          <MagneticButton href="/contacto">Iniciar proyecto</MagneticButton>
          <MagneticButton href={site.whatsapp} external>
            WhatsApp directo
          </MagneticButton>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-kicker uppercase tracking-[0.22em] text-bone/65 transition-colors hover:text-sky"
          >
            @captas.cl →
          </a>
        </motion.div>

        {/* Editorial meta line at the bottom */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-y-3 border-t border-line pt-8 text-center font-mono text-small uppercase tracking-[0.22em] text-on-ink-subtle sm:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p>Respuesta en &lt; 1h hábil</p>
          <p>{site.location}</p>
          <p>Trabajamos remoto · global</p>
        </motion.div>
      </div>
    </section>
  );
}

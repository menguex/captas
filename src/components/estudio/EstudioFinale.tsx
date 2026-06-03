"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { estudioFinale } from "@/content/estudio";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioFinale() {
  return (
    <section
      className="relative overflow-hidden border-t border-line/50 py-section"
      aria-labelledby="estudio-finale-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/estudio/azul.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%] opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(91,97,255,0.15),transparent_55%)]" />
      </div>

      <div className="site-container relative px-gutter">
        <motion.div
          className="gloss-card mx-auto max-w-2xl rounded-box-lg border border-line/80 bg-ink-soft/90 p-8 text-center backdrop-blur-md md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">
            {estudioFinale.kicker}
          </p>
          <h2
            id="estudio-finale-heading"
            className="mt-3 font-heading text-h2 font-semibold tracking-tight text-bone md:text-h1"
          >
            {estudioFinale.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-body leading-relaxed text-on-ink-muted">
            {estudioFinale.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contacto">{estudioFinale.cta}</MagneticButton>
            <Link
              href="/servicios"
              className="font-mono text-kicker uppercase tracking-[0.16em] text-on-ink-muted transition-colors hover:text-sky"
            >
              {estudioFinale.secondary} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

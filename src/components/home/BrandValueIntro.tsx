"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { brandValueIntro } from "@/content/brand-value";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StatGroup } from "@/components/ui/ProList";
import { easeOut, viewportOnce } from "@/lib/motion";

export function BrandValueIntro() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="brand-value-intro mx-auto max-w-3xl rounded-box-lg border border-line-dark/70 bg-white/92 p-6 shadow-[0_16px_48px_rgba(15,18,24,0.08)] backdrop-blur-md md:p-10"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <p className="text-lead font-medium leading-relaxed text-ink">{brandValueIntro.lead}</p>
      <p className="mt-4 text-body leading-relaxed text-on-light-muted">{brandValueIntro.body}</p>

      <StatGroup stats={brandValueIntro.highlights} className="mt-8 !justify-start" />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/trabajo" className="gloss-button inline-flex items-center justify-center gap-2">
          Ver casos de estudio
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark bg-white px-6 py-3 font-sans text-body font-medium text-ink transition-colors hover:border-accent/35 hover:text-accent"
        >
          Iniciar proyecto
        </Link>
        <Link
          href="/servicios"
          className="inline-flex items-center justify-center font-mono text-kicker uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
        >
          Explorar servicios →
        </Link>
      </div>
    </motion.div>
  );
}

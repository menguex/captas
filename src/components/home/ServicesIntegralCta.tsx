"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/content/services";
import { easeOut, viewportOnce } from "@/lib/motion";

/** CTA integral — cierre de sección servicios */
export function ServicesIntegralCta() {
  const accentImage = services[0].image;

  return (
    <motion.div
      className="relative mt-14 overflow-hidden rounded-box-lg border border-line-dark/70 md:mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="relative min-h-[220px] md:min-h-[200px]">
        <Image
          src={accentImage}
          alt=""
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/90 to-ink/82" aria-hidden />
      </div>

      <div className="relative px-6 py-8 text-center md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:px-10 md:py-10">
        <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
          Proyecto integral
        </p>
        <p className="mx-auto mt-3 max-w-lg font-heading text-h3 leading-snug text-bone md:text-h2">
          ¿Necesitas varios pilares? Un solo roadmap, equipo y estándar de craft.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link href="/servicios" className="gloss-button inline-flex items-center gap-2">
            Ver servicios completos
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-bone/25 bg-bone/10 px-5 py-2.5 font-mono text-small font-medium uppercase tracking-[0.16em] text-bone backdrop-blur-sm transition-colors hover:border-bone/40 hover:bg-bone/20"
          >
            Conversemos
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

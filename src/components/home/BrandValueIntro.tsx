"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { brandValueIntro } from "@/content/brand-value";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

export function BrandValueIntro() {
  const reduced = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_1fr] lg:items-stretch lg:gap-10"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.85, ease: easeOut }}
    >
      <div
        ref={mediaRef}
        className="relative min-h-[min(280px,50vh)] overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_16px_48px_rgba(15,18,24,0.12)] lg:min-h-[420px]"
      >
        <Image
          src={brandValueIntro.poster}
          alt="Territorio Limarí — dirección de arte Captas"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority
        />
        {brandValueIntro.video && inView && !reduced ? (
          <video
            src={brandValueIntro.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10"
          aria-hidden
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-bone/25 bg-ink/45 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md">
          Craft · Limarí · Cine
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-lead font-medium leading-relaxed text-ink">{brandValueIntro.lead}</p>
        <p className="mt-4 text-body leading-relaxed text-clay">{brandValueIntro.body}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {brandValueIntro.highlights.map((h) => (
            <li
              key={h.label}
              className="rounded-box-lg border border-line-dark bg-white/80 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p className="font-heading text-h2 tabular-nums text-accent">{h.value}</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-clay">
                {h.label}
              </p>
            </li>
          ))}
        </ul>

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
      </div>
    </motion.div>
  );
}

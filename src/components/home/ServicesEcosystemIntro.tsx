"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPillarIcon } from "@/components/icons";
import { services } from "@/content/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  easeOut,
  serviceOverlayItem,
  serviceOverlayStagger,
  viewportOnce,
} from "@/lib/motion";

const ROTATE_MS = 6000;

type ServicesEcosystemIntroProps = {
  showHeader?: boolean;
};

export function ServicesEcosystemIntro({ showHeader = true }: ServicesEcosystemIntroProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = services[active];

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, active]);

  const goTo = useCallback((index: number) => setActive(index), []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {showHeader ? (
        <SectionHeader
          theme="light"
          kicker="Servicios · 5 pilares"
          title={
            <>
              Un ecosistema creativo para{" "}
              <span className="bg-gradient-to-r from-accent-deep via-accent to-sky bg-clip-text text-transparent">
                elevar tu marca.
              </span>
            </>
          }
          description="Explora cada disciplina — foto, UX, web, cine y marca — en un solo equipo con estándar de craft."
        />
      ) : null}

      <motion.div
        className={`relative overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_20px_64px_rgba(15,18,24,0.12)] ${showHeader ? "mt-12 md:mt-16" : "mt-10"}`}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div className="relative min-h-[min(480px,70vh)] md:min-h-[min(520px,72vh)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={reduced ? false : { opacity: 0, scale: 1.04 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/15"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`detail-${current.id}`}
              className="relative flex min-h-[inherit] flex-col justify-end"
              variants={reduced ? undefined : serviceOverlayStagger}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <div className="border-t border-bone/15 bg-ink/90 p-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/82 md:p-8 lg:p-10">
                <span
                  className="pointer-events-none absolute right-4 top-2 font-heading text-[clamp(4rem,12vw,7rem)] leading-none text-bone/[0.06] md:right-8"
                  aria-hidden
                >
                  {current.number}
                </span>

                <motion.div
                  variants={reduced ? undefined : serviceOverlayItem}
                  className="relative flex flex-wrap items-center gap-3"
                >
                  {(() => {
                    const Icon = getPillarIcon(current.id);
                    return Icon ? (
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-bone/25 bg-bone/10 text-bone">
                        <Icon size={22} />
                      </span>
                    ) : null;
                  })()}
                  <span className="rounded-full border border-bone/25 bg-ink/50 px-3 py-1 font-mono text-kicker uppercase tracking-[0.2em] text-bone">
                    Pilar {current.number} · {current.pillar}
                  </span>
                </motion.div>

                <motion.div variants={reduced ? undefined : serviceOverlayItem} className="relative mt-5">
                  <h3 className="font-heading text-h2 leading-tight tracking-tight text-bone md:text-h1">
                    {current.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lead font-medium leading-relaxed text-bone">
                    {current.short}
                  </p>
                  <p className="mt-3 max-w-2xl text-body leading-relaxed text-on-ink-muted">
                    {current.description}
                  </p>
                </motion.div>

                <motion.ul
                  variants={reduced ? undefined : serviceOverlayItem}
                  className="relative mt-6 grid gap-2 sm:grid-cols-2"
                >
                  {current.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 rounded-xl border border-bone/15 bg-ink/55 px-3 py-2 text-small leading-snug text-on-ink-muted"
                    >
                      <span
                        className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bone text-[0.55rem] font-bold text-accent-deep"
                        aria-hidden
                      >
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={reduced ? undefined : serviceOverlayItem}
                  className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                >
                  <Link
                    href={`/servicios#${current.id}`}
                    className="gloss-button inline-flex items-center justify-center gap-2"
                  >
                    Ver pilar completo
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href={`/contacto?servicio=${current.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/30 bg-bone/10 px-6 py-3 font-mono text-kicker uppercase tracking-[0.14em] text-bone transition-colors hover:border-bone/50 hover:bg-bone/20"
                  >
                    Solicitar propuesta
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="grid grid-cols-5 gap-px border-t border-line-dark/50 bg-line-dark/30"
          role="tablist"
          aria-label="Pilares del ecosistema creativo"
        >
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${s.pillar}: ${s.title}`}
                onClick={() => goTo(i)}
                className={`group relative aspect-[5/4] overflow-hidden outline-none transition-opacity duration-base focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:aspect-[4/3] ${
                  isActive ? "opacity-100" : "opacity-65 hover:opacity-90"
                }`}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="20vw"
                  className={`object-cover transition-transform duration-slow ${
                    isActive ? "scale-100" : "scale-105 group-hover:scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-colors duration-base ${
                    isActive
                      ? "bg-accent/25 ring-2 ring-inset ring-bone/40"
                      : "bg-ink/35 group-hover:bg-ink/20"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-1 py-2 text-center">
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-bone/80 sm:text-[0.55rem]">
                    {s.number}
                  </span>
                  <span className="mt-0.5 block truncate px-1 font-heading text-[0.62rem] leading-tight text-bone sm:text-small">
                    {s.pillar}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <p className="mx-auto mt-6 max-w-lg text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-clay">
        {paused ? "Exploración pausada" : "Cambia de pilar"} · Clic en una miniatura o espera el recorrido automático
      </p>
    </div>
  );
}

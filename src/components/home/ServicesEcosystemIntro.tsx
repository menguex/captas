"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPillarIcon } from "@/components/icons";
import { services } from "@/content/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, serviceOverlayStagger, serviceOverlayItem, viewportOnce } from "@/lib/motion";

const ROTATE_MS = 5000;

type ServicesEcosystemIntroProps = {
  /** En /servicios el título va en la página */
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
          description="Cinco disciplinas, un solo equipo — integradas para que cada touchpoint se sienta coherente, premium y listo para convertir."
        />
      ) : null}

      {/* Vista principal — foto activa + panel */}
      <motion.div
        className={`relative overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_20px_64px_rgba(15,18,24,0.12)] ${showHeader ? "mt-12 md:mt-16" : "mt-10"}`}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div className="relative min-h-[min(340px,52vh)] md:min-h-[min(420px,58vh)]">
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,transparent_0%,rgba(15,18,24,0.4)_100%)]"
            aria-hidden
          />

          <motion.div
            className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-10"
            variants={reduced ? undefined : serviceOverlayStagger}
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "visible"}
            key={`panel-${current.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="max-w-2xl"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {(() => {
                    const Icon = getPillarIcon(current.id);
                    return Icon ? (
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-bone/25 bg-bone/10 text-bone backdrop-blur-md">
                        <Icon size={22} />
                      </span>
                    ) : null;
                  })()}
                  <span className="rounded-full border border-bone/25 bg-ink/45 px-3 py-1 font-mono text-kicker uppercase tracking-[0.2em] text-bone backdrop-blur-md">
                    Pilar {current.number} · {current.pillar}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-h2 leading-tight tracking-tight text-bone md:text-h1">
                  {current.title}
                </h3>
                <p className="mt-3 text-lead font-medium leading-relaxed text-bone/90">
                  {current.short}
                </p>
                <Link
                  href={`/servicios#${current.id}`}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.18em] text-sky-soft transition-colors hover:text-bone"
                >
                  Explorar {current.pillar}
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Miniaturas — los 5 pilares con imagen */}
        <div
          className="grid grid-cols-5 gap-px border-t border-line-dark/50 bg-line-dark/30"
          role="tablist"
          aria-label="Pilares del ecosistema creativo"
        >
          {services.map((s, i) => {
            const Icon = getPillarIcon(s.id);
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
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-95"
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
                      : "bg-ink/30 group-hover:bg-ink/15"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-1.5 py-2 text-center sm:px-2">
                  <span className="flex flex-col items-center gap-0.5">
                    {Icon ? (
                      <span className="hidden text-bone sm:inline">
                        <Icon size={14} />
                      </span>
                    ) : null}
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-bone/80 sm:text-[0.55rem]">
                      {s.number}
                    </span>
                    <span className="truncate font-heading text-[0.62rem] leading-tight text-bone sm:text-small">
                      {s.pillar}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Pills — acceso rápido */}
      <motion.div
        className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2"
        variants={reduced ? undefined : serviceOverlayStagger}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={viewportOnce}
      >
        {services.map((s, i) => (
          <motion.div key={s.id} variants={reduced ? undefined : serviceOverlayItem}>
            <Link
              href={`/servicios#${s.id}`}
              onMouseEnter={() => goTo(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active === i
                  ? "border-accent bg-accent text-bone shadow-[0_4px_20px_rgba(61,85,108,0.22)]"
                  : "border-line-dark bg-white/90 text-clay hover:border-accent/30 hover:text-accent"
              }`}
            >
              <span className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image src={s.image} alt="" fill sizes="24px" className="object-cover" />
              </span>
              {s.pillar}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Project } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  easeOut,
  serviceOverlayItem,
  serviceOverlayStagger,
  viewportOnce,
} from "@/lib/motion";

const ROTATE_MS = 6500;

type FeaturedWorkShowcaseProps = {
  projects: Project[];
  onOpenCase: (project: Project, index: number) => void;
};

export function FeaturedWorkShowcase({ projects, onOpenCase }: FeaturedWorkShowcaseProps) {
  const reduced = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = projects[active] ?? projects[0];

  useEffect(() => {
    if (!projects.length || reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % projects.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [projects.length, reduced, paused]);

  const goTo = useCallback((index: number) => setActive(index), []);

  if (!current) return null;

  const total = projects.length;
  const counter = `${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      className="featured-work-showcase mt-14 md:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="featured-work-stage relative overflow-hidden rounded-box-lg border border-line shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div
          ref={mediaRef}
          className="relative min-h-[min(460px,72vh)] md:min-h-[min(520px,75vh)]"
        >
          {!reduced && !paused && (
            <div className="featured-work-progress absolute inset-x-0 top-0 z-20 h-[3px] bg-white/10" aria-hidden>
              <motion.div
                key={active}
                className="featured-work-progress-fill h-full origin-left bg-gradient-to-r from-[#5b61ff] via-accent to-sky"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              className="absolute inset-0"
              initial={reduced ? false : { opacity: 0, scale: 1.05 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              {current.video && inView && !reduced ? (
                <video
                  src={current.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-hidden
                />
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[#080a0f]" />
            <div className="absolute inset-x-0 top-0 h-16 bg-[#080a0f]/35" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${current.slug}`}
              className="relative flex min-h-[inherit] flex-col justify-end"
              variants={reduced ? undefined : serviceOverlayStagger}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <div
                id="featured-work-panel"
                role="tabpanel"
                aria-labelledby={`featured-work-tab-${current.slug}`}
                className="featured-work-panel border-t border-bone/10 bg-ink/92 p-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/85 md:p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:p-10"
              >
                <div className="relative">
                  <span
                    className="pointer-events-none absolute -top-2 right-0 font-heading text-[clamp(3.5rem,10vw,6rem)] leading-none text-bone/[0.06]"
                    aria-hidden
                  >
                    {String(active + 1).padStart(2, "0")}
                  </span>

                  <motion.div
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <span className="featured-work-category-pill rounded-full border border-bone/20 bg-ink/50 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-sky">
                      {current.category}
                    </span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-on-ink-muted">
                      {current.year} · {current.client}
                    </span>
                  </motion.div>

                  <motion.h3
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-4 font-heading text-h1 leading-[1.05] tracking-tight text-bone"
                  >
                    {current.title}
                  </motion.h3>

                  <motion.p
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-3 max-w-2xl text-lead font-medium leading-relaxed text-bone"
                  >
                    {current.excerpt}
                  </motion.p>

                  <motion.p
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-3 max-w-2xl text-body leading-relaxed text-on-ink-muted"
                  >
                    {current.description}
                  </motion.p>

                  <motion.div
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-5 inline-flex flex-wrap gap-2"
                  >
                    {current.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-bone/15 bg-ink/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-on-ink-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-5 font-mono text-small uppercase tracking-[0.14em] text-sky"
                  >
                    {current.result}
                  </motion.p>
                </div>

                <motion.div
                  variants={reduced ? undefined : serviceOverlayItem}
                  className="mt-8 flex flex-col gap-3 lg:mt-0 lg:min-w-[220px]"
                >
                  <button
                    type="button"
                    onClick={() => onOpenCase(current, active)}
                    className="gloss-button gloss-button-prose w-full justify-center"
                  >
                    Ver caso completo
                  </button>
                  <Link
                    href={`/trabajo/${current.slug}`}
                    className="featured-work-secondary-cta inline-flex w-full items-center justify-center gap-2 rounded-full border border-bone/25 bg-bone/10 px-6 py-3 text-body font-medium text-bone transition-colors hover:border-bone/40 hover:bg-bone/15"
                  >
                    Abrir proyecto
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="featured-work-filmstrip border-t border-line/80 bg-ink/70 p-3 md:p-4">
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4"
            role="tablist"
            aria-label="Casos destacados"
          >
            {projects.map((p, i) => {
              const isActive = active === i;
              return (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  id={`featured-work-tab-${p.slug}`}
                  aria-selected={isActive}
                  aria-controls="featured-work-panel"
                  onClick={() => goTo(i)}
                  className={`featured-work-thumb group text-left outline-none transition-[transform,opacity] duration-base focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                    isActive ? "featured-work-thumb--active" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line/80 bg-ink/40">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 45vw, 20vw"
                      className="object-cover transition-transform duration-slow group-hover:scale-[1.04]"
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 h-[58%] transition-colors ${
                        isActive ? "bg-[#080a0f]/92" : "bg-[#080a0f]/88 group-hover:bg-[#080a0f]/82"
                      }`}
                    />
                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-sky/80"
                        aria-hidden
                      />
                    )}
                    {isActive && (
                      <span
                        className="absolute left-2.5 top-2.5 h-2 w-2 rounded-full bg-sky shadow-[0_0_12px_rgba(100,210,255,0.8)]"
                        aria-hidden
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-sky/90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block font-heading text-[0.9rem] font-semibold leading-snug tracking-[-0.02em] text-bone line-clamp-2">
                        {p.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.72rem] leading-snug text-on-ink-muted">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="featured-work-toolbar mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-small font-medium tabular-nums text-bone">{counter}</span>
          <span className="hidden text-on-ink-subtle sm:inline" aria-hidden>
            ·
          </span>
          <span className="text-small text-on-ink-muted">{current.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-full border border-line/80 bg-ink/50 px-3.5 py-1.5 text-small font-medium text-on-ink-muted transition-colors hover:border-sky/35 hover:text-bone"
              aria-pressed={paused}
            >
              {paused ? "Reanudar rotación" : "Pausar rotación"}
            </button>
          )}
          <p className="text-small text-on-ink-muted">
            Selecciona un caso para ver el detalle
          </p>
        </div>
      </div>
    </div>
  );
}

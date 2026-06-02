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
  }, [projects.length, reduced, paused, active]);

  const goTo = useCallback((index: number) => setActive(index), []);

  if (!current) return null;

  return (
    <div
      className="mt-14 md:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-box-lg border border-line shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div
          ref={mediaRef}
          className="relative min-h-[min(460px,72vh)] md:min-h-[min(520px,75vh)]"
        >
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

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${current.slug}`}
              className="relative flex min-h-[inherit] flex-col justify-end"
              variants={reduced ? undefined : serviceOverlayStagger}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <div className="border-t border-bone/10 bg-ink/92 p-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/85 md:p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:p-10">
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
                    <span className="rounded-full border border-bone/20 bg-ink/50 px-3 py-1 font-mono text-kicker uppercase tracking-[0.18em] text-sky-soft">
                      {current.category}
                    </span>
                    <span className="font-mono text-kicker uppercase tracking-[0.18em] text-on-ink-subtle">
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
                    className="mt-3 max-w-2xl text-lead font-medium leading-relaxed text-bone/95"
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
                        className="rounded-full border border-bone/15 bg-ink/50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-on-ink-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-5 font-mono text-small uppercase tracking-[0.16em] text-sky-soft"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-bone/25 bg-bone/10 px-6 py-3 font-mono text-kicker uppercase tracking-[0.14em] text-bone transition-colors hover:border-bone/40 hover:bg-bone/15"
                  >
                    Abrir proyecto
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4"
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
                aria-selected={isActive}
                onClick={() => goTo(i)}
                className={`group relative aspect-[16/10] overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-slow group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 transition-colors ${
                    isActive ? "bg-sky/20 ring-2 ring-inset ring-bone/30" : "bg-ink/40"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-3">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-bone/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block truncate font-heading text-small text-bone">
                    {p.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <p className="mx-auto mt-5 max-w-md text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-ink-subtle">
        {paused ? "Pausado" : "Auto"} · Selecciona un caso o abre el detalle completo
      </p>
    </div>
  );
}

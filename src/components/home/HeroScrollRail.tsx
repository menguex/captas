"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { heroContent } from "@/content/hero";
import { projects } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const featured = projects.filter((p) => p.featured);
const SCRUB_START = 0.08;
const SCRUB_END = 0.94;

type HeroScrollRailProps = {
  scrollYProgress: MotionValue<number>;
  active: boolean;
};

function HeroScrollCard({
  project,
  index,
  isActive,
  reduced,
}: {
  project: (typeof featured)[number];
  index: number;
  isActive: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="shrink-0"
      animate={
        reduced
          ? { scale: 1, opacity: 1, y: 0 }
          : {
              scale: isActive ? 1.05 : 0.94,
              opacity: isActive ? 1 : 0.72,
              y: isActive ? 0 : 8,
            }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/trabajo/${project.slug}`}
        className="hero-scroll-card group relative block w-[min(78vw,300px)] overflow-hidden rounded-box-lg border border-[rgba(20,24,30,0.12)] bg-white/70 shadow-[0_16px_48px_rgba(0,122,255,0.1)] transition-[border-color,box-shadow] duration-500 hover:border-accent/35 hover:shadow-[0_24px_56px_rgba(0,122,255,0.18)] md:w-[340px]"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 78vw, 340px"
            priority={index < 2}
          />
          {project.video && !reduced ? (
            <video
              src={project.video}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,18,24,0.9)] via-[rgba(15,18,24,0.25)] to-[rgba(15,18,24,0.05)]" />
          <div className="hero-scroll-card-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.result ? (
            <span className="absolute right-4 top-4 max-w-[10rem] text-right font-mono text-[0.5rem] uppercase leading-snug tracking-[0.1em] text-white/60">
              {project.result.split("·")[0]?.trim()}
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky-soft">
            {project.category}
          </p>
          <p className="mt-1.5 font-heading text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold leading-tight tracking-tight text-white">
            {project.title}
          </p>
          <p className="mt-2 line-clamp-2 text-small leading-snug text-white/78">
            {project.excerpt}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55 transition-colors group-hover:text-sky-soft">
            Ver caso
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function HeroScrollRail({ scrollYProgress, active }: HeroScrollRailProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const x = useTransform(scrollYProgress, [SCRUB_START, SCRUB_END], [0, -maxShift]);
  const progressWidth = useTransform(scrollYProgress, [SCRUB_START, SCRUB_END], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (featured.length <= 1) {
      setActiveIndex(0);
      return;
    }
    const t = Math.max(0, Math.min(1, (v - SCRUB_START) / (SCRUB_END - SCRUB_START)));
    const idx = Math.round(t * (featured.length - 1));
    setActiveIndex(idx);
  });

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const overflow = track.scrollWidth - viewport.clientWidth;
      setMaxShift(Math.max(0, overflow + 24));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  const activeProject = featured[activeIndex];

  return (
    <motion.div
      className="hero-scroll-rail relative z-20 w-full shrink-0"
      initial={{ opacity: 0, y: 32 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Portafolio destacado — desplazamiento horizontal con scroll"
    >
      <div className="hero-scroll-rail-header flex flex-wrap items-end justify-between gap-4 border-t border-accent/15 bg-white/30 px-gutter py-4 backdrop-blur-xl md:px-[var(--s-gutter)]">
        <div className="text-left">
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-accent">
            {heroContent.scrollRail.kicker}
          </p>
          <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--c-on-light-subtle)]">
            {heroContent.scrollRail.hint}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {activeProject ? (
            <p className="hidden text-right font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--c-hero-text-muted)] sm:block">
              <span className="text-[var(--c-on-light-subtle)]">{heroContent.scrollRail.counterLabel} </span>
              <span className="tabular-nums text-accent">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-[var(--c-on-light-subtle)]"> / {String(featured.length).padStart(2, "0")}</span>
              <span className="mt-0.5 block font-heading text-small normal-case tracking-normal text-[var(--c-hero-text)]">
                {activeProject.title}
              </span>
            </p>
          ) : null}
          <Link
            href="/trabajo"
            className="hero-rail-cta rounded-full border border-accent/20 bg-white/50 px-4 py-2 font-mono text-kicker uppercase tracking-[0.16em] text-[var(--c-hero-text-muted)] backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
          >
            {heroContent.scrollRail.cta} →
          </Link>
        </div>
      </div>

      <div ref={viewportRef} className="hero-scroll-rail-viewport overflow-hidden bg-white/15">
        <motion.div
          ref={trackRef}
          className="hero-scroll-rail-track flex w-max items-end gap-4 px-gutter py-5 will-change-transform md:gap-6 md:px-[var(--s-gutter)] md:py-6"
          style={reduced ? undefined : { x }}
        >
          {featured.map((project, i) => (
            <HeroScrollCard
              key={project.slug}
              project={project}
              index={i}
              isActive={activeIndex === i}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>

      <div className="hero-scroll-rail-footer border-t border-accent/10 bg-white/25 px-gutter py-4 backdrop-blur-md md:px-[var(--s-gutter)]">
        <div className="flex items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-accent/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
              style={{ width: reduced ? "100%" : progressWidth }}
              aria-hidden
            />
          </div>
          <span className="font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.14em] text-accent">
            {String(activeIndex + 1).padStart(2, "0")}/{String(featured.length).padStart(2, "0")}
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-start" role="list">
          {heroContent.crafts.map((craft) => (
            <li key={craft}>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[var(--c-on-light-subtle)]">
                {craft}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

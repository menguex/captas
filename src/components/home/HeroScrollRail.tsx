"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent } from "@/content/hero";
import { projects } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const featured = projects.filter((p) => p.featured);

type HeroScrollRailProps = {
  sectionRef: RefObject<HTMLElement | null>;
  active: boolean;
};

export function HeroScrollRail({ sectionRef, active }: HeroScrollRailProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.12, 0.92], [0, -maxShift]);
  const progressWidth = useTransform(scrollYProgress, [0.12, 0.92], ["0%", "100%"]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const overflow = track.scrollWidth - viewport.clientWidth;
      setMaxShift(Math.max(0, overflow));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <motion.div
      className="hero-scroll-rail relative z-20 w-full shrink-0 border-t border-accent/12 bg-white/25 backdrop-blur-xl"
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.75, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Portafolio destacado — desplazamiento horizontal con scroll"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 px-gutter py-4 md:px-[var(--s-gutter)]">
        <div>
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-accent">
            {heroContent.scrollRail.kicker}
          </p>
          <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--c-on-light-subtle)]">
            {heroContent.scrollRail.hint}
          </p>
        </div>
        <Link
          href="/trabajo"
          className="font-mono text-kicker uppercase tracking-[0.18em] text-[var(--c-hero-text-muted)] transition-colors hover:text-accent"
        >
          {heroContent.scrollRail.cta} →
        </Link>
      </div>

      <div ref={viewportRef} className="hero-scroll-rail-viewport overflow-hidden">
        <motion.div
          ref={trackRef}
          className="hero-scroll-rail-track flex w-max gap-4 px-gutter pb-5 will-change-transform md:gap-5 md:px-[var(--s-gutter)] md:pb-6"
          style={reduced ? undefined : { x }}
        >
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/trabajo/${project.slug}`}
              className="hero-scroll-card group relative w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-box-lg border border-[rgba(20,24,30,0.1)] bg-white/60 shadow-[0_12px_40px_rgba(0,122,255,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-accent/30 hover:shadow-[0_20px_50px_rgba(0,122,255,0.14)] md:w-[320px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 72vw, 320px"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,24,30,0.82)] via-[rgba(20,24,30,0.2)] to-transparent" />
                <span className="absolute left-4 top-4 font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.14em] text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky-soft">
                  {project.category}
                </p>
                <p className="mt-1.5 font-heading text-h3 font-semibold leading-tight tracking-tight text-white">
                  {project.title}
                </p>
                <p className="mt-2 line-clamp-2 text-small leading-snug text-white/75">
                  {project.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="px-gutter pb-4 md:px-[var(--s-gutter)] md:pb-5">
        <div className="h-px overflow-hidden rounded-full bg-accent/10">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9]"
            style={{ width: reduced ? "100%" : progressWidth }}
            aria-hidden
          />
        </div>
        <ul className="mt-3 flex flex-wrap gap-2" role="list" aria-hidden>
          {heroContent.crafts.map((craft) => (
            <li key={craft}>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-[var(--c-on-light-subtle)]">
                {craft}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroScrollRail } from "@/components/home/HeroScrollRail";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useLenis } from "@/providers/LenisProvider";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroLine({
  children,
  delay,
  active,
}: {
  children: ReactNode;
  delay: number;
  active: boolean;
}) {
  return (
    <div className="overflow-hidden py-0.5 md:py-1">
      <motion.div
        initial={active ? { y: "108%", opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function AccentWord({
  text,
  active,
  delay,
  gradient,
}: {
  text: string;
  active: boolean;
  delay: number;
  gradient: string;
}) {
  return (
    <span className="relative inline-block">
      <span className={`hero-accent-word bg-gradient-to-r bg-clip-text text-transparent ${gradient}`}>
        {text}
      </span>
      <motion.span
        className={`absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r ${gradient} opacity-80`}
        initial={{ width: 0, scaleX: 0 }}
        animate={active ? { width: "100%", scaleX: 1 } : { width: 0, scaleX: 0 }}
        transition={{ duration: 0.75, delay: delay + 0.35, ease }}
        style={{ transformOrigin: "left center" }}
        aria-hidden
      />
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { onMove, onLeave } = useSpotlight();
  const reduced = useReducedMotion();
  const introReady = useIntroReady();
  const lenis = useLenis();
  const active = reduced || introReady;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.42], [0, reduced ? 0 : -56]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, reduced ? 1 : 0.12]);
  const edgeProgress = scrollYProgress;

  const scrollToManifesto = () => {
    scrollToId("manifiesto", lenis);
  };

  return (
    <section
      ref={heroRef}
      data-hero
      className="hero-scroll-stage hero-with-spotlight relative z-[1]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="sticky top-0 flex min-h-[100dvh] flex-col overflow-hidden">
        <HeroBackdrop active={active} scrollYProgress={scrollYProgress} />

        <motion.div
          className="hero-edge-progress pointer-events-none absolute right-3 top-1/2 z-30 hidden h-28 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-accent/10 md:right-6 lg:block"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#5b61ff] via-accent to-[#0ea5e9]"
            style={{ scaleY: edgeProgress }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-1 flex-col justify-center px-gutter pt-[clamp(4.75rem,10vh,6rem)] lg:pt-[clamp(5rem,11vh,6.5rem)]"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="site-container w-full">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center lg:mx-0 lg:max-w-3xl lg:items-start lg:text-left">
              <motion.div
                className="hero-glass-chip flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                initial={active ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-accent">
                  {heroContent.status}
                </span>
                <span className="hidden h-3 w-px bg-accent/25 sm:block" aria-hidden />
                <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--c-on-light-subtle)] sm:inline">
                  {heroContent.statement}
                </span>
              </motion.div>

              <motion.div
                className="mt-4 flex items-center gap-3 md:mt-5 lg:justify-start"
                initial={active ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease }}
              >
                <motion.span
                  className="h-px bg-gradient-to-r from-transparent to-accent lg:from-accent/30"
                  initial={{ width: 0 }}
                  animate={active ? { width: 56 } : { width: 0 }}
                  transition={{ duration: 0.85, delay: 0.12, ease }}
                  aria-hidden
                />
                <p className="hero-kicker font-mono text-kicker uppercase tracking-[0.24em]">
                  {heroContent.kicker}
                </p>
              </motion.div>

              <div className="hero-headline-frame relative mt-5 w-full md:mt-6">
                <div className="hero-headline-glow pointer-events-none absolute inset-0" aria-hidden />
                <h1 className="hero-headline relative font-heading text-[clamp(2.5rem,6.8vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-balance [text-wrap:balance]">
                  {heroContent.lines.map((line, i) => (
                    <HeroLine key={line.id} delay={0.18 + i * 0.14} active={active}>
                      <span className="block">
                        {line.lead}
                        <AccentWord
                          text={line.accent}
                          active={active}
                          delay={0.18 + i * 0.14}
                          gradient={line.gradient}
                        />
                      </span>
                    </HeroLine>
                  ))}
                </h1>
              </div>

              <motion.p
                className="hero-text-muted mt-5 max-w-lg text-lead font-medium leading-relaxed text-pretty md:mt-6"
                initial={active ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.85, ease }}
              >
                {heroContent.subline}
              </motion.p>

              <motion.dl
                className="mt-6 grid w-full max-w-md grid-cols-3 gap-3 border-y border-accent/10 py-5 lg:max-w-lg"
                initial={active ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.75, ease }}
              >
                {heroContent.metrics.map((m) => (
                  <div key={m.label} className="text-center lg:text-left">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-heading text-h3 font-semibold tracking-tight text-[var(--c-hero-text)]">
                      {m.value}
                    </dd>
                    <dd className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[var(--c-on-light-subtle)]">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div
                className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start md:mt-8"
                initial={active ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 0.8, ease }}
              >
                <MagneticButton href="/contacto">{heroContent.ctaPrimary}</MagneticButton>
                <Link
                  href="/trabajo"
                  className="hero-text-subtle inline-flex items-center gap-2 rounded-full border border-[rgba(20,24,30,0.12)] bg-white/45 px-5 py-3 font-mono text-kicker uppercase tracking-[0.2em] backdrop-blur-sm transition-colors hover:border-accent/35 hover:text-accent"
                >
                  {heroContent.ctaSecondary}
                  <motion.span
                    animate={active && !reduced ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <HeroScrollRail scrollYProgress={scrollYProgress} active={active} />

        <motion.button
          type="button"
          className="relative z-10 mx-auto mb-3 flex items-center gap-3 px-gutter md:mb-4 lg:mr-[var(--s-gutter)] lg:ml-auto"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToManifesto}
          aria-label="Ir al manifiesto"
        >
          <span className="hero-scroll-ring flex h-10 w-6 items-start justify-center rounded-full border border-accent/25 p-1.5">
            <motion.span
              className="block h-2 w-1 rounded-full bg-accent"
              animate={active && !reduced ? { y: [0, 8, 0], opacity: [1, 0.35, 1] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </span>
          <span className="hero-text-subtle font-mono text-[0.62rem] uppercase tracking-[0.24em] transition-colors hover:text-accent">
            {heroContent.scrollLabel}
          </span>
        </motion.button>
      </div>
    </section>
  );
}

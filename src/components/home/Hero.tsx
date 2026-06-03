"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SplitText } from "@/components/motion/SplitText";
import { HeroDesignMesh } from "@/components/home/HeroDesignMesh";
import { HeroAgencySignal } from "@/components/home/HeroAgencySignal";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useLenis } from "@/providers/LenisProvider";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMove, onLeave } = useSpotlight();
  const reduced = useReducedMotion();
  const introReady = useIntroReady();
  const lenis = useLenis();
  const active = reduced || introReady;

  const scrollToManifesto = () => {
    scrollToId("manifiesto", lenis);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-hero
      className="hero-editorial hero-with-spotlight relative z-[1] flex min-h-[100dvh] items-center overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={heroContent.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
      </div>

      <HeroDesignMesh active={active} />
      <div className="hero-editorial-spotlight pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div className="site-container relative z-10 flex w-full flex-col px-gutter py-[clamp(6rem,14vh,8rem)] lg:py-[clamp(5.5rem,12vh,7rem)]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              className="flex items-center gap-3"
              initial={active ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.2em] text-accent">
                {heroContent.index}
              </span>
              <span className="h-px w-8 bg-accent/40" aria-hidden />
              <span className="font-mono text-kicker uppercase tracking-[0.22em] text-bone/55">
                {heroContent.kicker}
              </span>
            </motion.div>

            <h1 className="mt-6 font-heading font-extrabold leading-[0.9] tracking-[-0.045em] text-bone">
              <SplitText
                as="span"
                text={heroContent.headline}
                className="block text-[clamp(2.5rem,6.2vw,4.75rem)]"
                align="start"
                playOnMount
                active={active}
                delay={0.12}
              />
              <span className="mt-1 block overflow-hidden">
                <motion.span
                  className="hero-editorial-accent block text-[clamp(2.5rem,6.2vw,4.75rem)]"
                  initial={active ? { y: "100%" } : false}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.45, duration: 0.9, ease }}
                >
                  {heroContent.headlineAccent}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="mt-7 max-w-xl text-lead font-light leading-relaxed text-bone/80"
              initial={active ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.85, ease }}
            >
              {heroContent.tagline}
            </motion.p>

            <motion.ul
              className="mt-7 flex flex-wrap gap-2"
              role="list"
              initial={active ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.7, ease }}
            >
              {heroContent.disciplines.map((d) => (
                <li key={d}>
                  <span className="hero-discipline-pill font-mono text-[0.55rem] uppercase tracking-[0.14em] text-bone/55">
                    {d}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={active ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
            >
              <MagneticButton href="/contacto">{heroContent.ctaPrimary}</MagneticButton>
              <button
                type="button"
                onClick={scrollToManifesto}
                className="inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-sky-soft"
              >
                {heroContent.ctaSecondary}
                <span aria-hidden>↓</span>
              </button>
            </motion.div>

            <motion.dl
              className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
              initial={active ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.75, ease }}
            >
              {heroContent.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-heading text-h3 font-semibold tracking-tight text-bone">
                    {m.value}
                  </dd>
                  <dd className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-bone/45">
                    {m.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="lg:col-span-5 xl:col-span-6">
            <HeroAgencySignal active={active} />
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        className="hero-editorial-scroll absolute bottom-6 right-[var(--s-gutter)] z-10 flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/45 transition-colors hover:text-sky-soft lg:bottom-8"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={scrollToManifesto}
        aria-label="Ir al manifiesto"
      >
        <span className="hidden sm:inline">{heroContent.scrollLabel}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15">
          <motion.span
            className="block h-2 w-2 rounded-full bg-accent"
            animate={active && !reduced ? { y: [0, 6, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </span>
      </motion.button>
    </section>
  );
}

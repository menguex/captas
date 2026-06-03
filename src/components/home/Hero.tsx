"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroPixelCanvas } from "@/components/home/HeroPixelCanvas";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useLenis } from "@/providers/LenisProvider";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const introReady = useIntroReady();
  const lenis = useLenis();
  const active = reduced || introReady;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(mx, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(my, { stiffness: 60, damping: 20 });

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(-px * 36);
    my.set(-py * 28);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const onSectionClick = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    window.dispatchEvent(
      new CustomEvent("hero-pixel-spark", {
        detail: { x: e.clientX, y: e.clientY },
      })
    );
  };

  const scrollToManifesto = () => {
    scrollToId("manifiesto", lenis);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-hero
      className="hero-type1 relative z-[1] flex h-[100dvh] min-h-[32rem] max-h-[1200px] cursor-crosshair items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onSectionClick}
    >
      <div className="hero-type1-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={heroContent.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="hero-type1-overlay pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <HeroPixelCanvas />

      <motion.div
        className="hero-type1-content relative z-[3] w-[90%] max-w-4xl px-gutter text-center"
        style={{ x: parallaxX, y: parallaxY }}
        initial={active ? { opacity: 0, y: 48 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.35, ease }}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.28em] text-sky-soft">
          {heroContent.subtitle}
        </p>

        <h1 className="hero-type1-title mt-4 font-heading text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
          {heroContent.title}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lead font-light leading-relaxed text-bone/85">
          {heroContent.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/contacto">{heroContent.ctaPrimary}</MagneticButton>
          <Link
            href="/trabajo"
            className="inline-flex items-center gap-2 rounded-full border border-bone/25 bg-white/10 px-6 py-3 font-mono text-kicker uppercase tracking-[0.2em] text-bone/90 backdrop-blur-sm transition-colors hover:border-sky/50 hover:text-sky-soft"
          >
            {heroContent.ctaSecondary}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {!reduced ? (
          <p className="mt-6 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-bone/45">
            {heroContent.pixelHint}
          </p>
        ) : null}
      </motion.div>

      <motion.button
        type="button"
        className="hero-type1-scroll absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 text-bone/60 transition-colors hover:text-sky-soft"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1, y: [0, 8, 0] } : {}}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          scrollToManifesto();
        }}
        aria-label="Ir al manifiesto"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.22em]">
          {heroContent.scrollLabel}
        </span>
      </motion.button>
    </section>
  );
}

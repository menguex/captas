"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SplitText } from "@/components/motion/SplitText";
import { HeroDesignMesh } from "@/components/home/HeroDesignMesh";
import { HeroScrollZoom } from "@/components/home/HeroScrollZoom";
import { CraftChips } from "@/components/ui/CraftChips";
import { heroContent } from "@/content/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useLenis } from "@/providers/LenisProvider";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

const accentClass =
  "bg-gradient-to-r from-[#7dd3fc] via-[#5b61ff] to-[#38bdf8] bg-clip-text text-transparent";

export function Hero() {
  const { onMove, onLeave } = useSpotlight();
  const reduced = useReducedMotion();
  const introReady = useIntroReady();
  const lenis = useLenis();
  const active = reduced || introReady;

  const scrollToManifesto = () => {
    scrollToId("manifiesto", lenis);
  };

  return (
    <HeroScrollZoom
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      mesh={<HeroDesignMesh active={active} />}
      spotlight={
        <div
          className="hero-editorial-spotlight pointer-events-none absolute inset-0 z-[3]"
          aria-hidden
        />
      }
      chrome={
        <motion.button
          type="button"
          className="hero-editorial-scroll absolute bottom-6 right-[var(--s-gutter)] flex items-center gap-3 font-heading text-[0.75rem] font-medium tracking-[-0.02em] text-bone/55 transition-colors hover:text-sky-soft lg:bottom-8"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToManifesto}
          aria-label="Ir al manifiesto"
        >
          <span className="hidden sm:inline">{heroContent.scrollLabel}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-md">
            <motion.span
              className="block h-2 w-2 rounded-full bg-accent"
              animate={active && !reduced ? { y: [0, 6, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </span>
        </motion.button>
      }
    >
      <div className="hero-content-shell w-full py-[clamp(5.5rem,12vh,7rem)]">
        <div className="hero-center mx-auto flex max-w-4xl flex-col items-center text-center lg:max-w-5xl">
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={active ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="font-mono text-[0.58rem] tabular-nums uppercase tracking-[0.18em] text-sky-soft">
              {heroContent.index}
            </span>
            <span className="h-px w-8 bg-white/25" aria-hidden />
            <span className="font-heading text-[0.8rem] font-medium tracking-[-0.02em] text-bone/75 md:text-body">
              {heroContent.kicker}
            </span>
          </motion.div>

          <h1 className="hero-title-stack mt-8 font-heading font-extrabold leading-[0.9] tracking-[-0.048em]">
            <SplitText
              as="span"
              text={heroContent.headline}
              className="hero-title-line block text-[clamp(2.75rem,8vw,5.25rem)] text-bone"
              align="center"
              playOnMount
              active={active}
              delay={0.12}
            />
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="hero-title-line block text-[clamp(2.75rem,8vw,5.25rem)] text-bone"
                initial={active ? { y: "100%" } : false}
                animate={{ y: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease }}
              >
                {heroContent.headlineLine2}{" "}
                <span className={`${accentClass} hero-title-accent`}>
                  {heroContent.headlineAccentWord}
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-2xl text-lead font-light leading-relaxed text-bone/90"
            initial={active ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease }}
          >
            {heroContent.tagline}
          </motion.p>

          <motion.div
            className="mt-9"
            initial={active ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
          >
            <CraftChips items={heroContent.disciplines} theme="dark" variant="hero" />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={active ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8, ease }}
          >
            <MagneticButton href="/contacto">{heroContent.ctaPrimary}</MagneticButton>
            <button
              type="button"
              onClick={scrollToManifesto}
              className="inline-flex items-center gap-2 font-heading text-body font-medium text-bone/80 transition-colors hover:text-sky-soft"
            >
              {heroContent.ctaSecondary}
              <span aria-hidden>↓</span>
            </button>
          </motion.div>

          <motion.dl
            className="hero-metrics mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8 md:gap-6"
            initial={active ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.75, ease }}
          >
            {heroContent.metrics.map((m) => (
              <div key={m.label} className="hero-metrics-item rounded-box-lg bg-black/20 px-3 py-4 backdrop-blur-sm md:px-4">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-heading text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-none tracking-tight text-bone">
                  {m.value}
                </dd>
                <dd className="mt-2 font-heading text-[0.8rem] font-medium leading-snug tracking-[-0.01em] text-bone/65 md:text-[0.85rem]">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </HeroScrollZoom>
  );
}

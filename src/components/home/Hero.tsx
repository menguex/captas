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
          className="hero-editorial-scroll absolute bottom-6 right-[var(--s-gutter)] flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/45 transition-colors hover:text-sky-soft lg:bottom-8"
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
      }
    >
      <div className="site-container w-full px-gutter py-[clamp(5.5rem,12vh,7rem)]">
        <div className="hero-center mx-auto flex max-w-4xl flex-col items-center text-center lg:max-w-5xl">
          <motion.div
            className="flex items-center justify-center gap-3"
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

          <h1 className="mt-8 font-heading font-extrabold leading-[0.88] tracking-[-0.048em] text-bone">
            <SplitText
              as="span"
              text={heroContent.headline}
              className="block text-[clamp(2.75rem,8vw,5.5rem)]"
              align="center"
              playOnMount
              active={active}
              delay={0.12}
            />
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="hero-editorial-accent block text-[clamp(2.75rem,8vw,5.5rem)]"
                initial={active ? { y: "100%" } : false}
                animate={{ y: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease }}
              >
                {heroContent.headlineAccent}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-2xl text-lead font-light leading-relaxed text-bone/82"
            initial={active ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease }}
          >
            {heroContent.tagline}
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl font-heading text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-bone/55"
            initial={active ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            {heroContent.statement}
          </motion.p>

            <motion.div
              className="mt-8"
              initial={active ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.7, ease }}
            >
              <CraftChips items={heroContent.disciplines} theme="dark" />
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
              className="inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-sky-soft"
            >
              {heroContent.ctaSecondary}
              <span aria-hidden>↓</span>
            </button>
          </motion.div>

          <motion.dl
            className="mt-12 grid w-full max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
            initial={active ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.75, ease }}
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
      </div>
    </HeroScrollZoom>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroOpticMarquee } from "@/components/home/HeroOpticMarquee";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useLenis } from "@/providers/LenisProvider";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

const headline = [
  { lead: "Marcas que se ", accent: "elevan.", hue: "from-sky via-accent to-[#0052cc]" },
  { lead: "Experiencias que ", accent: "perduran.", hue: "from-[#4338ca] via-accent to-sky" },
] as const;

function HeroLine({
  children,
  delay,
  active,
}: {
  children: React.ReactNode;
  delay: number;
  active: boolean;
}) {
  return (
    <div className="overflow-hidden py-0.5 md:py-1">
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease }}
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
      <span
        className={`bg-gradient-to-r bg-clip-text font-extrabold text-transparent ${gradient}`}
      >
        {text}
      </span>
      <motion.span
        className={`absolute -bottom-1 left-0 h-1 rounded-full bg-gradient-to-r ${gradient} blur-[0.2px]`}
        initial={{ width: 0, opacity: 0 }}
        animate={active ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: delay + 0.4, ease }}
        aria-hidden
      />
      <motion.span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent opacity-0 ${gradient}`}
        animate={active ? { opacity: [0, 0.5, 0] } : {}}
        transition={{ duration: 2.4, delay: delay + 0.8, repeat: Infinity, repeatDelay: 4 }}
        aria-hidden
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const introReady = useIntroReady();
  const lenis = useLenis();
  const active = reduced || introReady;

  const scrollToManifesto = () => {
    scrollToId("manifiesto", lenis);
  };

  return (
    <section
      data-hero
      className="relative z-[1] flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden pb-20 pt-[clamp(5.5rem,12vh,7.5rem)] text-center md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.45]" aria-hidden />

      {/* Ambient orbs — tonos de los 5 pilares, tuned for light surface */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute left-1/2 top-[8%] h-[min(420px,55vw)] w-[min(420px,55vw)] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,82,204,0.12) 0%, rgba(0,122,255,0.05) 40%, transparent 70%)",
          }}
          animate={active ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-[12%] top-[32%] h-[min(240px,32vw)] w-[min(240px,32vw)] rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(184,134,11,0.08)" }}
          animate={active ? { x: [0, 28, 0], y: [0, -18, 0] } : {}}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[10%] bottom-[18%] h-[min(200px,28vw)] w-[min(200px,28vw)] rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(13,148,136,0.08)" }}
          animate={active ? { x: [0, -24, 0], y: [0, 14, 0] } : {}}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-[15%] top-[22%] h-[min(160px,22vw)] w-[min(160px,22vw)] rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(153,27,27,0.06)" }}
          animate={active ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 site-container flex w-full max-w-5xl flex-col items-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <motion.span
            className="h-px bg-gradient-to-r from-transparent to-accent"
            initial={{ width: 0 }}
            animate={active ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            aria-hidden
          />
          <p className="hero-kicker font-mono text-kicker uppercase tracking-[0.24em]">
            Agencia creativa · Limarí, Chile
          </p>
          <motion.span
            className="h-px bg-gradient-to-l from-transparent to-accent"
            initial={{ width: 0 }}
            animate={active ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            aria-hidden
          />
        </motion.div>

        <h1 className="hero-headline mt-8 w-full font-heading text-hero font-extrabold leading-[0.92] tracking-[-0.05em] text-balance [text-wrap:balance] [filter:drop-shadow(0_18px_36px_rgba(0,0,0,0.10))] md:mt-10">
          {headline.map((line, i) => (
            <HeroLine key={line.accent} delay={0.2 + i * 0.16} active={active}>
              <span className="block">
                {line.lead}
                <AccentWord
                  text={line.accent}
                  active={active}
                  delay={0.2 + i * 0.16}
                  gradient={line.hue}
                />
              </span>
            </HeroLine>
          ))}
        </h1>

        <motion.p
          className="hero-text-muted mt-8 max-w-2xl text-lead font-semibold leading-relaxed text-pretty"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.85, ease }}
        >
          UX/UI, motion, fotografía, video cinematográfico y branding — integrados
          para que tu marca se sienta premium y convierta.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.68, duration: 0.8, ease }}
        >
          <MagneticButton href="/contacto">Iniciar proyecto</MagneticButton>
          <Link
            href="/trabajo"
            className="hero-text-subtle inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.22em] transition-colors hover:text-accent"
          >
            Ver trabajo
            <motion.span
              animate={active ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <HeroOpticMarquee active={active} />

      <motion.button
        type="button"
        className="relative z-10 mt-14 flex flex-col items-center gap-2 md:mt-16"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        onClick={scrollToManifesto}
        aria-label="Ir al manifiesto"
      >
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-accent/60 to-transparent"
          animate={active && !reduced ? { scaleY: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <span className="hero-text-subtle font-mono text-[0.62rem] uppercase tracking-[0.24em] transition-colors hover:text-accent">
          Explorar
        </span>
      </motion.button>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden
      />
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { estudioHero } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";

const ease = easeOut;

export function EstudioHero() {
  const reduced = useReducedMotion();

  const scrollToJourney = () => {
    document.getElementById("recorrido")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative min-h-[min(88vh,820px)] overflow-hidden">
      {/* Atmósfera — preview visual del recorrido */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/estudio/azul.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] opacity-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/88 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_15%,rgba(91,97,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(0,122,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.1]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="site-container relative flex min-h-[inherit] flex-col items-center justify-center px-gutter pb-16 pt-8 text-center md:pb-20">
        {/* Meta editorial */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-sky">
            {estudioHero.kicker}
          </span>
          <span className="hidden h-px w-8 bg-bone/20 sm:block" aria-hidden />
          <span className="font-mono text-[0.58rem] tabular-nums tracking-[0.18em] text-on-ink-subtle">
            {estudioHero.index} · {estudioHero.label}
          </span>
        </motion.div>

        <h1 className="mt-8 max-w-3xl font-heading">
          <SplitText
            as="span"
            text={estudioHero.titleLead}
            className="block text-[clamp(2.35rem,6.2vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-bone drop-shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            delay={0.06}
          />
          <motion.span
            className="mt-1 block text-[clamp(2.35rem,6.2vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease }}
          >
            <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
          </motion.span>
        </h1>

        <motion.div
          className="mx-auto mt-7 max-w-lg space-y-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease }}
        >
          <p className="text-lead font-medium leading-snug text-bone/90">{estudioHero.bodyLead}</p>
          <p className="text-body leading-relaxed text-on-ink-muted">{estudioHero.body}</p>
        </motion.div>

        {/* Preview 01 · 02 · 03 */}
        <motion.ol
          className="mt-10 flex items-center gap-0"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
          }}
          aria-label="Pasos del recorrido"
        >
          {estudioHero.stepsPreview.map((step, i) => (
            <li key={step.num} className="flex items-center">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="flex flex-col items-center gap-1.5 rounded-full border border-bone/15 bg-ink/50 px-5 py-3 backdrop-blur-md"
              >
                <span className="font-mono text-[0.65rem] tabular-nums text-sky">{step.num}</span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-bone">
                  {step.label}
                </span>
              </motion.span>
              {i < estudioHero.stepsPreview.length - 1 ? (
                <span
                  className="mx-2 hidden h-px w-10 bg-gradient-to-r from-accent/40 via-sky/30 to-accent/40 sm:block"
                  aria-hidden
                />
              ) : null}
            </li>
          ))}
        </motion.ol>

        <motion.button
          type="button"
          onClick={scrollToJourney}
          className="group mt-12 flex flex-col items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          aria-label={`${estudioHero.scrollHint} — ir al recorrido`}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-bone/20 bg-white/[0.06] px-5 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md transition-colors group-hover:border-sky/40 group-hover:bg-accent/10">
            <span className="relative flex h-2 w-2" aria-hidden>
              {!reduced ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky/50" />
              ) : null}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            {estudioHero.scrollHint}
          </span>
          <motion.span
            className="flex flex-col items-center gap-1 text-on-ink-subtle"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <span className="block h-8 w-px bg-gradient-to-b from-sky/70 to-transparent" />
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-sky/80">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="rounded-full border border-bone/12 bg-ink/40 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-on-ink-muted backdrop-blur-sm">
            {estudioHero.onlineTag}
          </span>
          <span className="rounded-full border border-bone/12 bg-ink/40 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-on-ink-muted backdrop-blur-sm">
            {estudioHero.onlineTagDetail}
          </span>
        </motion.div>
      </div>
    </header>
  );
}

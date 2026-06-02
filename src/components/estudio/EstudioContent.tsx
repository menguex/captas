"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { EstudioScrollJourney } from "@/components/estudio/EstudioScrollJourney";
import { estudioHero } from "@/content/estudio";
import { easeOut } from "@/lib/motion";

const ease = easeOut;

export function EstudioContent() {
  return (
    <>
      <header className="site-container relative flex min-h-[min(72vh,640px)] flex-col items-center justify-center px-gutter pb-12 pt-6 text-center md:min-h-[min(68vh,580px)]">
        <motion.span
          className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-sky"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {estudioHero.kicker}
        </motion.span>

        <h1 className="mt-4 max-w-2xl font-heading">
          <SplitText
            as="span"
            text={estudioHero.title}
            className="block text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bone"
            delay={0.08}
          />
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-md text-lead leading-relaxed text-on-ink-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease }}
        >
          {estudioHero.body}
        </motion.p>

        <motion.span
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-bone/15 bg-white/[0.04] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-on-ink-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky" />
          </span>
          {estudioHero.scrollHint}
        </motion.span>

        <motion.span
          className="mt-8 block font-mono text-[0.56rem] uppercase tracking-[0.14em] text-on-ink-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {estudioHero.onlineTag}
        </motion.span>
      </header>

      <EstudioScrollJourney />
    </>
  );
}

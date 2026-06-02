"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EstudioSquadHub } from "@/components/estudio/EstudioSquadHub";
import { EstudioPipeline } from "@/components/estudio/EstudioPipeline";
import { EstudioCollective } from "@/components/estudio/EstudioCollective";
import { estudioHero, estudioTerritory, estudioUnion } from "@/content/estudio";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioContent() {
  return (
    <>
      <div className="site-container relative">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:items-center">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <motion.div
              className="flex items-center justify-center gap-4 lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <span className="h-px w-8 bg-accent/40" aria-hidden />
              <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
                {estudioHero.kicker}
              </p>
            </motion.div>

            <SplitText
              as="h1"
              text={estudioHero.titleLead}
              className="mt-6 font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-bone"
              delay={0.04}
            />

            <motion.p
              className="mt-2 font-heading text-[clamp(1.65rem,4.5vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.036em]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.28, duration: 0.75, ease: easeOut }}
            >
              <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
            </motion.p>

            <motion.p
              className="mx-auto mt-4 max-w-md text-body leading-relaxed text-on-ink-muted lg:mx-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, duration: 0.65, ease: easeOut }}
            >
              {estudioHero.body}
            </motion.p>

            <motion.div
              className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.48 }}
            >
              <span className="rounded-full border border-bone/15 bg-white/[0.06] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky">
                {estudioHero.onlineTag}
              </span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-bone">
                {estudioUnion.result}
              </span>
            </motion.div>
          </div>

          <EstudioSquadHub />
        </div>
      </div>

      <div className="site-container relative">
        <EstudioPipeline />
        <EstudioCollective />

        <motion.section
          className="gloss-card glass-panel relative mt-14 overflow-hidden rounded-box-lg border border-line p-5 md:mt-20 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra/50 to-transparent"
            aria-hidden
          />
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-terra">
            {estudioTerritory.kicker}
          </p>
          <p className="mt-2 font-heading text-h3 text-bone md:text-h2">{estudioTerritory.line}</p>
          <p className="mt-3 max-w-2xl text-small leading-relaxed text-on-ink-muted md:text-body">
            {estudioTerritory.text}
          </p>
        </motion.section>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
        >
          <MagneticButton href="/contacto">Armar mi proyecto</MagneticButton>
          <Link
            href="/servicios"
            className="font-mono text-kicker uppercase tracking-[0.18em] text-on-ink-muted transition-colors hover:text-sky"
          >
            Ver servicios →
          </Link>
        </motion.div>
      </div>
    </>
  );
}

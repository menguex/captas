"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EstudioOrbit } from "@/components/estudio/EstudioOrbit";
import { EstudioUnionMarquee } from "@/components/estudio/EstudioUnionMarquee";
import { EstudioHowItWorks } from "@/components/estudio/EstudioHowItWorks";
import { EstudioCollective } from "@/components/estudio/EstudioCollective";
import { estudioHero, estudioTerritory, estudioUnion } from "@/content/estudio";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioContent() {
  return (
    <>
      <div className="site-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <motion.div
              className="flex items-center justify-center gap-4 lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <span
                className="h-px w-10 bg-gradient-to-r from-transparent to-accent/50 lg:from-accent/50 lg:to-transparent"
                aria-hidden
              />
              <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
                {estudioHero.kicker}
              </p>
            </motion.div>

            <SplitText
              as="h1"
              text={estudioHero.titleLead}
              className="mt-8 font-heading text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-bone"
              delay={0.05}
            />

            <motion.p
              className="mt-3 font-heading text-[clamp(1.85rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.038em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.35, duration: 0.85, ease: easeOut }}
            >
              <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-lg text-lead leading-relaxed text-on-ink-muted lg:mx-0"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
            >
              {estudioHero.body}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.55, duration: 0.6, ease: easeOut }}
            >
              <span className="inline-flex rounded-full border border-bone/15 bg-white/[0.06] px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-sky">
                {estudioHero.onlineTag}
              </span>
              <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone">
                {estudioUnion.result}
              </span>
            </motion.div>
          </div>

          <EstudioOrbit />
        </div>
      </div>

      <EstudioUnionMarquee />

      <div className="site-container relative">
        <EstudioHowItWorks />
        <EstudioCollective />

        <motion.section
          className="gloss-card glass-panel relative mt-20 overflow-hidden rounded-box-lg border border-line p-6 md:mt-28 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra/50 to-transparent"
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.18em] text-terra">
            {estudioTerritory.kicker}
          </p>
          <p className="mt-3 font-heading text-h2 text-bone md:text-h1">{estudioTerritory.line}</p>
          <p className="mt-4 max-w-2xl text-body leading-relaxed text-on-ink-muted">
            {estudioTerritory.text}
          </p>
        </motion.section>

        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
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

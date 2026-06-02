"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EstudioOrbit } from "@/components/estudio/EstudioOrbit";
import { EstudioHowItWorks } from "@/components/estudio/EstudioHowItWorks";
import { EstudioCollective } from "@/components/estudio/EstudioCollective";
import { estudioHero, estudioTerritory } from "@/content/estudio";
import { easeOut, viewportOnce } from "@/lib/motion";

export function EstudioContent() {
  return (
    <>
      <div className="site-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/50" aria-hidden />
            <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
              {estudioHero.kicker}
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/50" aria-hidden />
          </motion.div>

          <SplitText
            as="h1"
            text={estudioHero.titleLead}
            className="mt-8 font-heading text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-bone"
            delay={0.05}
          />

          <motion.p
            className="mt-3 font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.038em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.35, duration: 0.85, ease: easeOut }}
          >
            <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
          </motion.p>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-lead leading-relaxed text-on-ink-muted"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
          >
            {estudioHero.body}
          </motion.p>

          <motion.span
            className="mt-5 inline-flex rounded-full border border-bone/15 bg-white/[0.06] px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-sky"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.5, ease: easeOut }}
          >
            {estudioHero.onlineTag}
          </motion.span>
        </div>

        <div className="mt-14 md:mt-20">
          <EstudioOrbit />
        </div>
      </div>

      <div className="site-container relative">
        <EstudioHowItWorks />
        <EstudioCollective />

        <motion.section
          className="mt-20 overflow-hidden rounded-box-lg border border-line bg-gradient-to-br from-ink-soft via-ink-soft to-accent/[0.08] p-6 md:mt-28 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
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

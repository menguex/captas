"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EstudioSquadHub } from "@/components/estudio/EstudioSquadHub";
import { EstudioSectionNav } from "@/components/estudio/EstudioSectionNav";
import { EstudioQuickGuide } from "@/components/estudio/EstudioQuickGuide";
import { EstudioCompare } from "@/components/estudio/EstudioCompare";
import { EstudioPipeline } from "@/components/estudio/EstudioPipeline";
import { EstudioCollective } from "@/components/estudio/EstudioCollective";
import {
  estudioHero,
  estudioSpec,
  estudioTerritory,
} from "@/content/estudio";
import { easeOut, viewportOnce } from "@/lib/motion";

const ease = easeOut;

export function EstudioContent() {
  return (
    <>
      <div className="site-container relative">
        {/* Meta editorial */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-sky">
              {estudioHero.kicker}
            </span>
            <span className="font-mono text-[0.62rem] tabular-nums tracking-[0.18em] text-on-ink-subtle">
              {estudioSpec.index} · {estudioSpec.label}
            </span>
          </div>
          <span className="rounded-full border border-bone/15 bg-white/[0.04] px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-on-ink-muted">
            {estudioHero.onlineTag}
          </span>
        </motion.div>

        {/* Hero — una columna, sin visual raro a la derecha */}
        <section className="mx-auto mt-10 max-w-3xl text-center lg:mt-14">
          <h1 className="font-heading">
            <SplitText
              as="span"
              text={estudioHero.titleLead}
              className="block text-[clamp(2.35rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-bone"
              delay={0.05}
            />
            <motion.span
              className="mt-1 block text-[clamp(2.35rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.32, duration: 0.8, ease }}
            >
              <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-7 max-w-xl text-lead leading-relaxed text-on-ink-muted"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.46, duration: 0.7, ease }}
          >
            {estudioHero.body}
          </motion.p>

          <motion.dl
            className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-box-lg border border-line/70 bg-line/40 text-left sm:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
            }}
          >
            {estudioSpec.rows.map((row) => (
              <motion.div
                key={row.k}
                className="bg-ink-soft/95 px-4 py-3.5"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
              >
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-on-ink-subtle">
                  {row.k}
                </dt>
                <dd className="mt-1 font-heading text-small font-medium text-bone">{row.v}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.85, duration: 0.65, ease }}
          >
            <MagneticButton href="/contacto">Armar mi proyecto</MagneticButton>
            <Link
              href="/servicios"
              className="group inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.16em] text-on-ink-muted transition-colors hover:text-sky"
            >
              Ver servicios
              <span className="transition-transform duration-base group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
        </section>

        {/* Squad deck — ancho completo bajo el hero */}
        <div className="mt-14 lg:mt-16">
          <motion.p
            className="mb-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.2em] text-on-ink-subtle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
          >
            {estudioSpec.figCaption}
          </motion.p>
          <EstudioSquadHub />

          <motion.dl
            className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-box-lg border border-line/70 bg-line/40"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {estudioSpec.metrics.map((m) => (
              <motion.div
                key={m.label}
                className="bg-ink-soft/90 px-3 py-4 text-center"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
              >
                <dd className="font-heading text-h3 font-semibold tabular-nums text-bone">
                  {m.value}
                </dd>
                <dt className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-on-ink-subtle">
                  {m.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <EstudioSectionNav />

      <div className="site-container relative space-y-0">
        <EstudioQuickGuide />
        <EstudioCompare />
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
            className="font-mono text-kicker uppercase tracking-[0.16em] text-on-ink-muted transition-colors hover:text-sky"
          >
            Ver servicios →
          </Link>
        </motion.div>
      </div>
    </>
  );
}

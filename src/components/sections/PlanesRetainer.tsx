"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import {
  planesRetainer,
  planesRetainerAddons,
  planesRetainerHeader,
  planesRetainerPills,
  formatPrecioCLP,
  planMailtoSubject,
  type PlanRetainer,
} from "@/content/planes-retainer";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, staggerContainer, viewportOnce } from "@/lib/motion";

const cardReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function PlanesRetainerHeader() {
  const reduced = useReducedMotion();

  return (
    <motion.header
      className="border-b border-line-dark/50 pb-10 md:pb-12"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: easeOut }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            className="hidden h-px w-10 bg-gradient-to-r from-terra/70 to-accent/40 sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: easeOut }}
            style={{ transformOrigin: "left" }}
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.24em] text-terra-deep">
            {planesRetainerHeader.kicker}
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-line-dark/60 bg-white/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-on-light-subtle">
          Precio fijo · CLP
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <h2
            id="planes-heading"
            className="text-left font-heading font-semibold leading-[1.02] tracking-tighter text-ink"
          >
            <SplitText
              as="span"
              text={planesRetainerHeader.titleLine1}
              align="start"
              className="block text-[clamp(2.25rem,5.5vw,4.5rem)]"
              delay={0.04}
            />
            <motion.span
              className="mt-1 block text-[clamp(2rem,5vw,4rem)]"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.32, duration: 0.8, ease: easeOut }}
            >
              <span className="text-gradient-terra">{planesRetainerHeader.titleLine2}</span>
            </motion.span>
          </h2>
        </div>

        <div className="lg:col-span-5">
          <motion.p
            className="text-left text-lead font-medium leading-relaxed text-on-light-muted"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.7, ease: easeOut }}
          >
            {planesRetainerHeader.body}
          </motion.p>

          <dl className="mt-6 grid grid-cols-3 gap-2">
            {planesRetainerHeader.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="rounded-box border border-line-dark/55 bg-white/90 px-3 py-3 text-center shadow-[0_8px_24px_rgba(15,18,24,0.04)]"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.48 + i * 0.06, duration: 0.55, ease: easeOut }}
              >
                <dt className="font-heading text-h3 tabular-nums leading-none text-ink">{h.value}</dt>
                <dd className="mt-1 font-mono text-[0.55rem] uppercase leading-snug tracking-[0.1em] text-on-light-subtle">
                  {h.label}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </motion.header>
  );
}

function PlanCard({ plan }: { plan: PlanRetainer }) {
  const featured = plan.featured;
  const mailto = `mailto:${site.email}?subject=${planMailtoSubject(plan.nombre)}`;

  return (
    <article
      className={`flex h-full flex-col rounded-box-lg border p-6 md:p-7 ${
        featured
          ? "border-transparent bg-ink text-bone shadow-[0_28px_72px_rgba(0,0,0,0.32)]"
          : "border-line-dark bg-white shadow-[0_12px_40px_rgba(15,18,24,0.06)]"
      }`}
    >
      {featured ? (
        <span className="mb-4 inline-flex w-fit rounded-full bg-terra px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-bone">
          El más elegido
        </span>
      ) : null}

      <h3 className={`font-heading text-h3 font-semibold ${featured ? "text-bone" : "text-ink"}`}>
        {plan.nombre}
      </h3>
      <p
        className={`mt-1 text-small leading-snug ${
          featured ? "text-on-ink-muted" : "text-on-light-muted"
        }`}
      >
        {plan.tagline}
      </p>

      <p
        className={`mt-5 font-heading text-[2rem] font-semibold leading-none tabular-nums tracking-tight ${
          featured ? "text-bone" : "text-ink"
        }`}
      >
        {formatPrecioCLP(plan.precio)}
        <span
          className={`ml-1 text-small font-normal ${
            featured ? "text-on-ink-muted" : "text-on-light-subtle"
          }`}
        >
          /mes
        </span>
      </p>
      <p
        className={`mt-2 font-mono text-[0.65rem] leading-relaxed ${
          featured ? "text-on-ink-muted" : "text-on-light-subtle"
        }`}
      >
        + {formatPrecioCLP(plan.activacion)} activación · contrato 6 meses · total{" "}
        {formatPrecioCLP(plan.total6m)}
      </p>

      <div className={`my-5 h-px ${featured ? "bg-line" : "bg-line-dark/50"}`} aria-hidden />

      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.servicios.map((s) => (
          <li
            key={s.texto}
            className={`flex gap-2.5 text-small leading-snug ${
              s.incluido
                ? featured
                  ? "text-bone"
                  : "text-ink"
                : featured
                  ? "text-on-ink-subtle"
                  : "text-on-light-subtle"
            }`}
          >
            <span
              className={`shrink-0 font-mono font-medium ${
                s.incluido ? "text-terra" : featured ? "text-on-ink-subtle" : "text-on-light-subtle"
              }`}
              aria-hidden
            >
              {s.incluido ? "✓" : "—"}
            </span>
            <span>{s.texto}</span>
          </li>
        ))}
      </ul>

      <a
        href={mailto}
        className={`mt-6 inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-center font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] transition-colors ${
          featured
            ? "border-terra bg-terra text-bone hover:bg-terra-deep"
            : "border-ink bg-transparent text-ink hover:bg-ink hover:text-bone"
        }`}
        aria-label={`Cotizar plan retainer ${plan.nombre}`}
      >
        Cotizar este plan →
      </a>
    </article>
  );
}

type PlanesRetainerProps = {
  /** En /servicios: separador superior sin repetir padding del bloque anterior */
  afterEcosystem?: boolean;
};

export function PlanesRetainer({ afterEcosystem = false }: PlanesRetainerProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="planes"
      className={`relative overflow-hidden bg-bone py-section text-ink scroll-mt-24 ${
        afterEcosystem ? "border-t border-line-dark/45" : ""
      }`}
      aria-labelledby="planes-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_15%_0%,rgba(154,123,82,0.09),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_20%,rgba(var(--c-accent-rgb),0.07),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.06]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra/35 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <PlanesRetainerHeader />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:mt-12 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {planesRetainer.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardReveal}
              whileHover={reduced || plan.featured ? undefined : { y: -4 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className={plan.featured ? "sm:col-span-2 xl:col-span-1" : undefined}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1, duration: 0.55, ease: easeOut }}
        >
          {planesRetainerPills.map((pill) => (
            <li
              key={pill.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-dark/55 bg-white/90 px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-on-light-muted"
            >
              <span className="text-terra-deep" aria-hidden>
                {pill.icon}
              </span>
              {pill.label}
            </li>
          ))}
        </motion.ul>

        <motion.aside
          className="mt-6 rounded-box-lg border border-line-dark/40 bg-white/70 p-5 md:p-6"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.08, duration: 0.6, ease: easeOut }}
        >
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-terra-deep">
            Servicios adicionales
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {planesRetainerAddons.map((item) => (
              <li key={item} className="flex gap-2 text-small text-on-light-muted">
                <span className="shrink-0 font-mono font-medium text-terra-deep" aria-hidden>
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}

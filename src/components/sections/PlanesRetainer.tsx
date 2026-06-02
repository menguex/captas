"use client";

import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

function PlanCard({ plan }: { plan: PlanRetainer }) {
  const featured = plan.featured;
  const mailto = `mailto:${site.email}?subject=${planMailtoSubject(plan.nombre)}`;

  return (
    <article
      className={`flex h-full flex-col rounded-box-lg border p-6 md:p-7 ${
        featured
          ? "border-transparent bg-ink text-bone shadow-[0_24px_64px_rgba(0,0,0,0.28)]"
          : "border-line-dark/80 bg-white"
      }`}
    >
      {featured ? (
        <span className="mb-4 inline-flex w-fit rounded-full bg-terra px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone">
          El más elegido
        </span>
      ) : null}

      <h3 className={`font-heading text-h3 font-medium ${featured ? "text-bone" : "text-ink"}`}>
        {plan.nombre}
      </h3>
      <p className={`mt-1 text-small ${featured ? "text-bone/70" : "text-fog"}`}>{plan.tagline}</p>

      <p className={`mt-5 font-heading text-[2rem] leading-none tabular-nums ${featured ? "text-bone" : "text-ink"}`}>
        {formatPrecioCLP(plan.precio)}
        <span className={`ml-1 text-small font-normal ${featured ? "text-bone/60" : "text-fog"}`}>
          /mes
        </span>
      </p>
      <p className={`mt-2 font-mono text-[0.65rem] ${featured ? "text-bone/55" : "text-fog"}`}>
        * + {formatPrecioCLP(plan.activacion)} activación única · 6 meses{" "}
        {formatPrecioCLP(plan.total6m)}
      </p>

      <div
        className={`my-5 h-px ${featured ? "bg-bone/15" : "bg-line-dark/60"}`}
        aria-hidden
      />

      <ul className="flex flex-1 flex-col gap-2">
        {plan.servicios.map((s) => (
          <li
            key={s.texto}
            className={`flex gap-2 text-small leading-snug ${
              s.incluido
                ? featured
                  ? "text-bone"
                  : "text-ink"
                : featured
                  ? "text-bone/35"
                  : "text-fog/60"
            }`}
          >
            <span
              className={`shrink-0 font-mono ${s.incluido ? "text-terra" : featured ? "text-bone/40" : "text-fog"}`}
              aria-hidden
            >
              {s.incluido ? "✓" : "—"}
            </span>
            <span className={s.incluido ? "" : "opacity-40"}>{s.texto}</span>
          </li>
        ))}
      </ul>

      <a
        href={mailto}
        className={`mt-6 inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
          featured
            ? "border-terra bg-terra text-bone hover:bg-terra-deep"
            : "border-ink text-ink hover:bg-ink hover:text-bone"
        }`}
        aria-label={`Cotizar plan retainer ${plan.nombre}`}
      >
        Cotizar este plan →
      </a>
    </article>
  );
}

export function PlanesRetainer() {
  const reduced = useReducedMotion();

  return (
    <section
      id="planes"
      className="relative overflow-hidden bg-bone py-section text-ink"
      aria-labelledby="planes-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terra/30 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <motion.header
          className="mx-auto max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-terra">
            {planesRetainerHeader.kicker}
          </p>
          <h2
            id="planes-heading"
            className="mt-4 font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-ink"
          >
            {planesRetainerHeader.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[32rem] text-lead leading-relaxed text-fog">
            {planesRetainerHeader.body}
          </p>
        </motion.header>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
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
              transition={{ duration: 0.2 }}
              className={plan.featured ? "sm:col-span-2 xl:col-span-1" : undefined}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
        >
          {planesRetainerPills.map((pill) => (
            <li
              key={pill.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-dark/50 bg-ink/[0.04] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-on-light-muted"
            >
              <span className="text-terra" aria-hidden>
                {pill.icon}
              </span>
              {pill.label}
            </li>
          ))}
        </motion.ul>

        <motion.aside
          className="mt-8 rounded-box-lg bg-ink/[0.04] p-5 md:p-6"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1, duration: 0.65, ease: easeOut }}
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-terra">
            Servicios adicionales
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {planesRetainerAddons.map((item) => (
              <li key={item} className="flex gap-2 text-small text-fog">
                <span className="shrink-0 font-mono text-terra" aria-hidden>
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

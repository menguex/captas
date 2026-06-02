"use client";

import { motion } from "framer-motion";
import { estudioCollective } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { springSnappy } from "@/lib/estudio-motion";
import { easeOut, viewportOnce } from "@/lib/motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: easeOut },
  }),
};

export function EstudioCollective() {
  const reduced = useReducedMotion();

  return (
    <section id="quien" className="scroll-mt-28 mt-14 md:mt-20" aria-labelledby="collective-heading">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.65, ease: easeOut }}
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">Quién entra</p>
          <h2
            id="collective-heading"
            className="mt-2 max-w-lg font-heading text-h3 tracking-tight text-bone md:text-h2"
          >
            Tres capas,{" "}
            <span className="text-shimmer-dark">un solo proyecto.</span>
          </h2>
          <p className="mt-2 max-w-md text-small text-on-ink-muted">
            Dirección, producción y red senior — activamos solo lo que tu reto necesita.
          </p>
        </div>
        <motion.span
          className="inline-flex w-fit rounded-full border border-accent/35 bg-accent/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky"
          animate={reduced ? undefined : { boxShadow: ["0 0 0 rgba(0,122,255,0)", "0 0 20px rgba(0,122,255,0.25)", "0 0 0 rgba(0,122,255,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          Tu proyecto
        </motion.span>
      </motion.div>

      <ul className="mt-6 grid gap-3 md:grid-cols-3">
        {estudioCollective.map((member, i) => (
          <motion.li
            key={member.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={reduced ? undefined : { y: -4 }}
            transition={springSnappy}
            className="gloss-card group relative overflow-hidden rounded-box-lg border border-line bg-ink-soft/90 p-5"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-[0.58rem] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-terra">
                {member.adds}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-small font-medium text-bone">{member.name}</h3>
            <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-sky">
              {member.role}
            </p>
            <p className="mt-2 text-small leading-relaxed text-on-ink-muted">{member.bio}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { estudioCollective } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, fadeUpBlur, staggerContainer, viewportOnce } from "@/lib/motion";

export function EstudioCollective() {
  const reduced = useReducedMotion();

  return (
    <section className="mt-20 md:mt-28" aria-labelledby="collective-heading">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">La unión</p>
        <h2
          id="collective-heading"
          className="mt-2 max-w-2xl font-heading text-h2 tracking-tight text-bone md:text-h1"
        >
          Profesionales que se activan{" "}
          <span className="text-shimmer-dark">cuando el proyecto lo exige.</span>
        </h2>
      </motion.div>

      <div className="relative mt-12 hidden md:block" aria-hidden>
        <div className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-ink px-5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-sky shadow-[0_0_32px_rgba(var(--c-accent-rgb),0.3)]"
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Tu proyecto
        </motion.div>
      </div>

      <motion.ul
        className="relative mt-10 grid gap-4 md:grid-cols-3 md:gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {estudioCollective.map((member, i) => (
          <motion.li
            key={member.id}
            variants={fadeUpBlur}
            whileHover={reduced ? undefined : { y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="gloss-card group relative overflow-hidden rounded-box-lg border border-line bg-ink-soft/90 p-6 md:p-7"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15 blur-3xl transition-opacity group-hover:opacity-100 opacity-50"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-accent/35 bg-gradient-to-br from-[#5b61ff]/25 to-[#0ea5e9]/15 font-mono text-kicker text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="relative mt-5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-terra">
              {member.adds}
            </p>
            <h3 className="relative mt-2 font-heading text-h3 text-bone">{member.name}</h3>
            <p className="relative mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-sky">
              {member.role}
            </p>
            <p className="relative mt-3 text-body leading-relaxed text-on-ink-muted">
              {member.bio}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

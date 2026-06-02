"use client";

import { motion } from "framer-motion";
import { estudioCollective } from "@/content/estudio";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function EstudioCollective() {
  return (
    <section className="mt-20 md:mt-28" aria-labelledby="collective-heading">
      <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
        La unión
      </p>
      <h2
        id="collective-heading"
        className="mt-2 max-w-xl font-heading text-h2 tracking-tight text-bone md:text-h1"
      >
        Profesionales que se conectan cuando tu proyecto lo pide.
      </h2>

      <motion.ul
        className="mt-10 grid gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {estudioCollective.map((member, i) => (
          <motion.li
            key={member.id}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-box-lg border border-line bg-ink-soft p-6 md:p-7"
          >
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60"
              aria-hidden
            />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-gradient-to-br from-[#5b61ff]/20 to-[#0ea5e9]/10 font-mono text-kicker text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative mt-5 font-heading text-h3 text-bone">{member.name}</h3>
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

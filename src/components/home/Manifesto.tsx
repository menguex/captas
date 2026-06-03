"use client";

import { motion } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { ManifestoScrollStage } from "@/components/home/ManifestoScrollStage";
import { SectionBridge } from "@/components/ui/SectionBridge";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="home-section-manifesto relative -mt-px overflow-hidden bg-ink text-bone"
      aria-labelledby="manifesto-heading"
    >
      <SectionBridge variant="dark-continue" />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,97,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.08]" />
      </div>

      <div className="site-container relative pt-12 md:pt-16">
        <motion.header
          className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <div className="flex items-center gap-4">
            <motion.span
              className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#5b61ff]/60 sm:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOut }}
              style={{ transformOrigin: "left" }}
              aria-hidden
            />
            <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
              {manifestoContent.kicker}
            </p>
            <span
              className="rounded-full border border-bone/15 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[0.58rem] tabular-nums tracking-[0.14em] text-on-ink-muted"
              aria-label={`Edición ${manifestoContent.issue}`}
            >
              {manifestoContent.issue}
            </span>
          </div>
          <CaptasLockup tone="on-dark" label="Filosofía" />
        </motion.header>

        <ManifestoScrollStage />

        <div className="relative pb-section">
          <motion.ul
            className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-2 pt-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
            role="list"
          >
            {manifestoContent.disciplines.map((d, i) => (
              <li key={d} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="text-on-ink-subtle" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="rounded-full border border-bone/12 bg-white/[0.05] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-on-ink-muted">
                  {d}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.footer
            className="mx-auto mt-12 flex max-w-sm items-center gap-4 md:mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.15, duration: 0.65 }}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/25" aria-hidden />
            <p className="font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-muted">
              {manifestoContent.signoff}
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/25" aria-hidden />
          </motion.footer>

          <motion.p
            className="mx-auto mt-10 max-w-md text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-ink-muted md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {manifestoContent.footnote}
          </motion.p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5b61ff]/30 to-transparent"
        aria-hidden
      />
    </section>
  );
}

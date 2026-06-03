"use client";

import { motion } from "framer-motion";
import { ManifestoStatement } from "@/components/home/ManifestoStatement";
import { SectionBridge } from "@/components/ui/SectionBridge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="home-section-manifesto relative -mt-px overflow-hidden bg-ink py-section text-bone"
      aria-labelledby="manifesto-title"
    >
      <SectionBridge variant="dark-continue" />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(91,97,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(0,122,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.06]" />
      </div>

      <div className="site-container relative">
        <SectionHeader
          theme="dark"
          kicker={`${manifestoContent.kicker} · ${manifestoContent.issue}`}
          title="La marca no se decora. Se diseña para sentirse."
          description="Un manifiesto breve: qué creemos antes de abrir Figma, la cámara o el código."
          titleId="manifesto-section-title"
          compact
        />

        <ManifestoStatement />

        <motion.ul
          className="mx-auto mt-14 flex max-w-lg flex-wrap items-center justify-center gap-2 md:mt-16"
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

        <motion.p
          className="mx-auto mt-10 max-w-md text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-ink-muted md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {manifestoContent.footnote}
        </motion.p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5b61ff]/30 to-transparent"
        aria-hidden
      />
    </section>
  );
}

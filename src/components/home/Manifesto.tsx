"use client";

import { motion } from "framer-motion";
import { ManifestoStatement } from "@/components/home/ManifestoStatement";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CraftChips } from "@/components/ui/CraftChips";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="home-section-manifesto relative z-[2] overflow-hidden bg-ink py-section text-bone"
      aria-labelledby="manifesto-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,97,255,0.16),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,122,255,0.08),transparent_48%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.07]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="site-container relative z-[1]">
        <SectionHeader
          theme="dark"
          kicker={`${manifestoContent.kicker} · ${manifestoContent.issue}`}
          title="La marca no se decora. Se diseña para sentirse."
          description="Un manifiesto breve: qué creemos antes de abrir Figma, la cámara o el código."
          titleId="manifesto-section-title"
          compact
        />

        <ManifestoStatement />

        <motion.div
          className="mx-auto mt-14 max-w-3xl md:mt-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
        >
          <CraftChips items={manifestoContent.disciplines} theme="dark" />
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-lg text-center text-body leading-relaxed text-bone/55 md:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {manifestoContent.footnote}
        </motion.p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#5b61ff]/30 to-transparent"
        aria-hidden
      />
    </section>
  );
}

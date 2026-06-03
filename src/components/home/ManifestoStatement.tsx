"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ManifestoEditorialHeader } from "@/components/home/ManifestoEditorialHeader";
import { ManifestoHeadlineStage } from "@/components/home/ManifestoHeadlineStage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CraftChips } from "@/components/ui/CraftChips";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

export function ManifestoStatement() {
  return (
    <div className="manifesto-editorial mx-auto max-w-5xl px-gutter">
      <ManifestoEditorialHeader
        kicker={manifestoContent.kicker}
        issue={manifestoContent.issue}
      />

      <motion.p
        className="mx-auto mt-10 max-w-2xl text-center text-lead font-light leading-relaxed text-bone/78 md:mt-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 0.08, duration: 0.8, ease: easeOut }}
      >
        {manifestoContent.prelude}
      </motion.p>

      <ManifestoHeadlineStage />

      <motion.p
        className="mx-auto mt-10 max-w-2xl text-center text-[clamp(1.05rem,2.1vw,1.25rem)] font-light leading-relaxed text-bone/72 md:mt-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 0.28, duration: 0.75, ease: easeOut }}
      >
        {manifestoContent.bridge}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 md:mt-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 0.36, duration: 0.7, ease: easeOut }}
      >
        <MagneticButton href="/contacto">{manifestoContent.ctaPrimary}</MagneticButton>
        <Link
          href="/trabajo"
          className="inline-flex items-center gap-2 font-heading text-body font-medium text-bone/75 transition-colors hover:text-sky-soft"
        >
          {manifestoContent.ctaSecondary}
          <span aria-hidden>→</span>
        </Link>
      </motion.div>

      <motion.div
        className="manifesto-editorial-footer relative mt-14 pt-12 md:mt-16 md:pt-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.2, duration: 0.75, ease: easeOut }}
      >
        <div
          className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden
        />
        <p className="text-center font-heading text-body font-medium text-bone/65">
          {manifestoContent.craftsLabel}
        </p>
        <div className="mt-5 flex justify-center">
          <CraftChips items={manifestoContent.disciplines} theme="dark" />
        </div>
        <p className="mt-8 text-center font-heading text-[0.95rem] font-medium tracking-[-0.02em] text-bone/55">
          {manifestoContent.proof}
        </p>
        <p className="mt-3 text-center font-heading text-[0.95rem] tracking-[-0.02em] text-on-ink-muted">
          {manifestoContent.signoff}
        </p>
      </motion.div>
    </div>
  );
}

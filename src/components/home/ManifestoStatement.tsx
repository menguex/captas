"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ManifestoHeadlineStage } from "@/components/home/ManifestoHeadlineStage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CraftChips } from "@/components/ui/CraftChips";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

export function ManifestoStatement() {
  return (
    <div className="manifesto-pro mx-auto max-w-5xl px-gutter">
      <motion.div
        className="manifesto-pro-panel relative overflow-hidden rounded-box-lg border border-white/10 bg-white/[0.03] px-6 py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-12 md:py-16 lg:px-16 lg:py-20"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />

        <p className="font-heading text-kicker font-medium uppercase tracking-[0.2em] text-sky md:text-[0.72rem]">
          {manifestoContent.kicker} · {manifestoContent.issue}
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-lead font-light leading-relaxed text-bone/78 md:mt-8">
          {manifestoContent.prelude}
        </p>

        <ManifestoHeadlineStage />

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-[clamp(1.05rem,2.1vw,1.25rem)] font-light leading-relaxed text-bone/72 md:mt-12"
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

        <div className="mt-12 border-t border-white/10 pt-10 md:mt-14 md:pt-12">
          <p className="font-heading text-body font-medium text-bone/65">
            {manifestoContent.craftsLabel}
          </p>
          <div className="mt-5">
            <CraftChips items={manifestoContent.disciplines} theme="dark" />
          </div>
          <p className="mt-8 font-heading text-[0.95rem] font-medium tracking-[-0.02em] text-bone/55">
            {manifestoContent.proof}
          </p>
          <p className="mt-3 font-heading text-[0.95rem] tracking-[-0.02em] text-on-ink-muted">
            {manifestoContent.signoff}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

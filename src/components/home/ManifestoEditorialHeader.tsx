"use client";

import { motion } from "framer-motion";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

type ManifestoEditorialHeaderProps = {
  kicker: string;
  issue: string;
};

export function ManifestoEditorialHeader({ kicker, issue }: ManifestoEditorialHeaderProps) {
  return (
    <motion.header
      className="manifesto-editorial-header relative mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.85, ease: easeOut }}
    >
      <div className="manifesto-editorial-header-ornament pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="absolute left-0 top-1/2 h-px w-[min(28vw,10rem)] -translate-y-1/2"
          viewBox="0 0 160 2"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="1" x2="160" y2="1" stroke="url(#manifesto-header-line-l)" strokeWidth="1" />
          <defs>
            <linearGradient id="manifesto-header-line-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(91,97,255,0)" />
              <stop offset="100%" stopColor="rgba(91,97,255,0.55)" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute right-0 top-1/2 h-px w-[min(28vw,10rem)] -translate-y-1/2"
          viewBox="0 0 160 2"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="1" x2="160" y2="1" stroke="url(#manifesto-header-line-r)" strokeWidth="1" />
          <defs>
            <linearGradient id="manifesto-header-line-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(14,165,233,0.55)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0)" />
            </linearGradient>
          </defs>
        </svg>

        <span className="manifesto-header-cross absolute left-[12%] top-1/2 hidden h-3 w-3 -translate-y-1/2 md:block">
          <svg viewBox="0 0 12 12" className="h-full w-full text-white/25">
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <span className="manifesto-header-cross absolute right-[12%] top-1/2 hidden h-3 w-3 -translate-y-1/2 md:block">
          <svg viewBox="0 0 12 12" className="h-full w-full text-white/25">
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </div>

      <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <div className="manifesto-issue-badge relative flex items-center gap-3">
          <svg
            className="manifesto-issue-frame absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] text-white/15"
            viewBox="0 0 80 48"
            fill="none"
            aria-hidden
          >
            <path d="M4 12V4h8M76 12V4h-8M76 36v8h-8M4 36v8h8" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="relative font-mono text-[clamp(2.5rem,6vw,3.75rem)] font-medium tabular-nums leading-none tracking-[-0.04em] text-bone/90">
            {issue}
          </span>
        </div>

        <div className="relative flex flex-col items-center sm:items-start">
          <span className="font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-semibold uppercase tracking-[0.12em] text-bone">
            {kicker}
          </span>
          <span className="mt-1 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sky-soft/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,122,255,0.6)]" />
            {manifestoContent.headerTag}
          </span>
        </div>

        <svg
          className="manifesto-header-mark hidden h-10 w-10 shrink-0 text-white/20 sm:block"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden
        >
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <path
            d="M20 8v24M8 20h24"
            stroke="url(#manifesto-mark-grad)"
            strokeWidth="1"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="manifesto-mark-grad" x1="8" y1="8" x2="32" y2="32">
              <stop stopColor="#5b61ff" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.header>
  );
}

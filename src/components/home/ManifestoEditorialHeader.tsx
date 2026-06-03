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
      className="manifesto-editorial-header manifesto-editorial-header--horizontal relative mx-auto w-full max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.85, ease: easeOut }}
    >
      <div className="manifesto-editorial-header-ornament pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="manifesto-header-rail absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          viewBox="0 0 1200 2"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="1" x2="1200" y2="1" stroke="url(#manifesto-header-rail)" strokeWidth="1" />
          <defs>
            <linearGradient id="manifesto-header-rail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(91,97,255,0)" />
              <stop offset="18%" stopColor="rgba(91,97,255,0.35)" />
              <stop offset="50%" stopColor="rgba(14,165,233,0.2)" />
              <stop offset="82%" stopColor="rgba(91,97,255,0.35)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0)" />
            </linearGradient>
          </defs>
        </svg>

        <span className="manifesto-header-cross absolute left-[4%] top-1/2 hidden h-3 w-3 -translate-y-1/2 lg:block">
          <svg viewBox="0 0 12 12" className="h-full w-full text-white/25">
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <span className="manifesto-header-cross absolute right-[4%] top-1/2 hidden h-3 w-3 -translate-y-1/2 lg:block">
          <svg viewBox="0 0 12 12" className="h-full w-full text-white/25">
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </div>

      <div className="manifesto-editorial-header-row relative flex flex-wrap items-center justify-center gap-x-3 gap-y-3 px-2 py-2 sm:gap-x-5 sm:px-4 md:flex-nowrap md:justify-between md:gap-x-6 lg:gap-x-8">
        <div className="manifesto-issue-badge relative flex shrink-0 items-center">
          <svg
            className="manifesto-issue-frame manifesto-issue-frame--wide absolute -inset-x-4 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2rem)] text-white/15"
            viewBox="0 0 96 40"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M4 10V4h10M92 10V4H82M92 30v6H82M4 30v6h10" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="relative font-mono text-[clamp(1.75rem,4vw,2.75rem)] font-medium tabular-nums leading-none tracking-[-0.04em] text-bone/90">
            {issue}
          </span>
        </div>

        <span
          className="hidden font-mono text-[0.7rem] text-bone/35 sm:inline"
          aria-hidden
        >
          ·
        </span>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-center md:gap-x-5">
          <span className="whitespace-nowrap font-heading text-[clamp(1.25rem,3.2vw,2rem)] font-semibold uppercase tracking-[0.14em] text-bone md:tracking-[0.16em]">
            {kicker}
          </span>

          <span className="font-mono text-[0.65rem] text-bone/30" aria-hidden>
            ·
          </span>

          <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.18em] text-sky-soft/85 md:text-[0.65rem]">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(0,122,255,0.6)]" />
            {manifestoContent.headerTag}
          </span>
        </div>

        <svg
          className="manifesto-header-mark hidden h-9 w-9 shrink-0 text-white/20 md:block lg:h-10 lg:w-10"
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

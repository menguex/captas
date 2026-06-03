"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { manifestoContent } from "@/content/manifesto";
import { easeOut, viewportOnce } from "@/lib/motion";

const accentClass =
  "bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent";

function ClosingLine() {
  const phrase = manifestoContent.closingAccent;
  const idx = manifestoContent.closing.indexOf(phrase);
  if (idx === -1) {
    return (
      <span className="text-bone">{manifestoContent.closing}</span>
    );
  }

  return (
    <>
      <span className="text-bone">{manifestoContent.closing.slice(0, idx)}</span>
      <span className={accentClass}>{phrase}</span>
      <span className="text-bone">{manifestoContent.closing.slice(idx + phrase.length)}</span>
    </>
  );
}

export function ManifestoStatement() {
  return (
    <div
      id="manifesto-heading"
      className="manifesto-statement relative mx-auto max-w-4xl px-gutter text-center lg:max-w-5xl"
      aria-labelledby="manifesto-title"
    >
      <motion.p
        className="font-mono text-kicker uppercase tracking-[0.24em] text-sky"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        {manifestoContent.label}
      </motion.p>

      <motion.p
        className="mx-auto mt-6 max-w-lg font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-ink-muted md:mt-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
      >
        {manifestoContent.prelude}
      </motion.p>

      <blockquote className="mt-10 md:mt-12">
        {manifestoContent.lines.map((line, i) => (
          <div key={line} className={i > 0 ? "mt-1 md:mt-2" : ""}>
            <SplitText
              as="p"
              text={line}
              className="font-heading text-[clamp(2.25rem,6.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bone"
              delay={0.12 + i * 0.1}
            />
          </div>
        ))}

        <motion.p
          id="manifesto-title"
          className="mt-2 font-heading text-[clamp(2.35rem,7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:mt-3"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewportOnce}
          transition={{ delay: 0.38, duration: 0.95, ease: easeOut }}
        >
          <ClosingLine />
        </motion.p>
      </blockquote>

      <motion.div
        className="mx-auto mt-10 flex max-w-md items-center gap-4 md:mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.55, duration: 0.7, ease: easeOut }}
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/25" aria-hidden />
        <p className="font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-muted">
          {manifestoContent.signoff}
        </p>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/25" aria-hidden />
      </motion.div>

      <motion.span
        className="pointer-events-none absolute -left-[4%] top-1/2 hidden font-heading text-[clamp(6rem,18vw,14rem)] font-bold leading-none tracking-[-0.06em] text-bone/[0.04] lg:block"
        aria-hidden
      >
        001
      </motion.span>
    </div>
  );
}

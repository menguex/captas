"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { SplitText } from "@/components/motion/SplitText";
import { manifestoContent } from "@/content/manifesto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

function ClosingLine({ text, accentPhrase }: { text: string; accentPhrase: string }) {
  const idx = text.indexOf(accentPhrase);
  const accentClass =
    "bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent";

  if (idx === -1) {
    return (
      <p className="font-heading text-[clamp(2.25rem,5.8vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-bone">
        {text}
      </p>
    );
  }

  return (
    <p className="font-heading text-[clamp(2.25rem,5.8vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
      <span className="text-bone">{text.slice(0, idx)}</span>
      <span className={accentClass}>{accentPhrase}</span>
      <span className="text-bone">{text.slice(idx + accentPhrase.length)}</span>
    </p>
  );
}

export function Manifesto() {
  const reduced = useReducedMotion();

  return (
    <section
      id="manifiesto"
      className="relative overflow-hidden bg-ink py-section text-bone"
      aria-labelledby="manifesto-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={manifestoContent.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,97,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.1]" />
      </div>

      <div className="site-container relative">
        {/* Header editorial */}
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

        <div className="mx-auto mt-12 max-w-4xl md:mt-16 lg:mt-20">
          <blockquote className="relative text-center">
            <motion.p
              className="mx-auto max-w-md font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-ink-muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.08, duration: 0.65, ease: easeOut }}
            >
              {manifestoContent.prelude}
            </motion.p>

            <div id="manifesto-heading" className="mt-8 space-y-1 md:mt-10 md:space-y-2">
              {manifestoContent.lines.map((line, i) => (
                <div key={line}>
                  <SplitText
                    as="p"
                    text={line}
                    className="font-heading text-[clamp(2.1rem,5.4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.038em] text-bone"
                    delay={0.15 + i * 0.1}
                  />
                </div>
              ))}

              <motion.div
                className="relative pt-1 md:pt-2"
                initial={{ opacity: 0, y: 20, filter: reduced ? "none" : "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={viewportOnce}
                transition={{ delay: 0.45, duration: 0.9, ease: easeOut }}
              >
                <ClosingLine
                  text={manifestoContent.closing}
                  accentPhrase={manifestoContent.closingAccent[0]}
                />
                <motion.span
                  className="pointer-events-none absolute -bottom-1 left-[10%] right-[10%] mx-auto h-[2px] max-w-md rounded-full bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.75, duration: 0.8, ease: easeOut }}
                  aria-hidden
                />
              </motion.div>
            </div>

            {/* Disciplinas — puente hacia servicios */}
            <motion.ul
              className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-2 md:mt-12"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.65, duration: 0.7, ease: easeOut }}
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
              transition={{ delay: 0.8, duration: 0.65 }}
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/25" aria-hidden />
              <p className="font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-muted">
                {manifestoContent.signoff}
              </p>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/25" aria-hidden />
            </motion.footer>
          </blockquote>
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-md text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-ink-muted md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.9, duration: 0.6 }}
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

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { manifestoContent } from "@/content/manifesto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SplitText } from "@/components/motion/SplitText";

const accentClass =
  "bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent";

type ScrollRowConfig = (typeof manifestoContent.scrollRows)[number];

function ClosingStaticLine() {
  const phrase = manifestoContent.closingAccent[0];
  const idx = manifestoContent.closing.indexOf(phrase);
  if (idx === -1) {
    return <span className="text-bone">{manifestoContent.closing}</span>;
  }
  return (
    <>
      <span className="text-bone">{manifestoContent.closing.slice(0, idx)}</span>
      <span className={accentClass}>{phrase}</span>
      <span className="text-bone">{manifestoContent.closing.slice(idx + phrase.length)}</span>
    </>
  );
}

function ScrollRowText({ row }: { row: ScrollRowConfig }) {
  const phrase =
    "accentPhrase" in row && typeof row.accentPhrase === "string" ? row.accentPhrase : null;
  if (!phrase) return <>{row.text}</>;

  const idx = row.text.indexOf(phrase);
  if (idx === -1) return <>{row.text}</>;

  return (
    <>
      <span className="text-bone/75">{row.text.slice(0, idx)}</span>
      <span className={accentClass}>{phrase}</span>
      <span className="text-bone">{row.text.slice(idx + phrase.length)}</span>
    </>
  );
}

function ManifestoScrollRow({
  row,
  progress,
  index,
}: {
  row: ScrollRowConfig;
  progress: MotionValue<number>;
  index: number;
}) {
  const x = useTransform(progress, [0, 1], [row.from, row.to]);
  const opacity = useTransform(
    progress,
    [0, 0.08 + index * 0.06, 0.72 + index * 0.04, 1],
    [0, 1, 1, 0.35]
  );

  const toneClass =
    row.tone === "outline"
      ? "manifesto-scroll-row--outline text-bone/25"
      : row.tone === "muted"
        ? "text-bone/45"
        : row.tone === "accent"
          ? "text-bone"
          : "text-bone";

  return (
    <motion.div
      className="manifesto-scroll-row relative flex w-max items-center will-change-transform"
      style={{ x, opacity }}
    >
      <p
        className={`font-heading text-[clamp(2.75rem,11.5vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.04em] whitespace-nowrap ${toneClass}`}
      >
        <ScrollRowText row={row} />
      </p>
    </motion.div>
  );
}

function ManifestoStaticQuote() {
  return (
    <div className="space-y-1 md:space-y-2">
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
      <p className="font-heading text-[clamp(2.25rem,5.8vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance pt-1 md:pt-2">
        <ClosingStaticLine />
      </p>
    </div>
  );
}

export function ManifestoScrollStage() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 26,
    mass: 0.55,
  });

  const preludeOpacity = useTransform(progress, [0, 0.12, 0.35], [1, 1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 0.6, 0]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <div className="mx-auto mt-8 max-w-4xl text-center md:mt-10">
        <p className="mx-auto max-w-md font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-ink-muted">
          {manifestoContent.prelude}
        </p>
        <div id="manifesto-heading" className="mt-8">
          <ManifestoStaticQuote />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="manifesto-scroll-track relative mt-10 md:mt-12"
      aria-labelledby="manifesto-heading"
    >
      <div className="sticky top-0 z-[1] flex h-[100dvh] min-h-[28rem] flex-col justify-center overflow-hidden">
        <motion.p
          className="pointer-events-none absolute inset-x-0 top-[clamp(5rem,14vh,7rem)] z-10 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-ink-muted"
          style={{ opacity: preludeOpacity }}
        >
          {manifestoContent.prelude}
        </motion.p>

        <div
          id="manifesto-heading"
          className="relative flex flex-col justify-center gap-[clamp(0.35rem,2vh,1.25rem)] py-16"
        >
          {manifestoContent.scrollRows.map((row, i) => (
            <ManifestoScrollRow key={row.text} row={row} progress={progress} index={i} />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-[var(--s-gutter)] bottom-[clamp(4.5rem,12vh,6.5rem)] flex flex-col items-center gap-3"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-on-ink-muted">
            {manifestoContent.scrollHint}
          </span>
          <div className="h-px w-24 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full origin-left bg-gradient-to-r from-accent to-sky"
              style={{ scaleX: barScale }}
            />
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-ink to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-ink to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}

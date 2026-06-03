"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ManifestoStagePreview } from "@/components/home/ManifestoStagePreview";
import {
  manifestoContent,
  manifestoStages,
  type ManifestoStage,
} from "@/content/manifesto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const accentClass =
  "bg-gradient-to-r from-[#7dd3fc] via-[#5b61ff] to-[#38bdf8] bg-clip-text text-transparent";

type ManifestoHeadlineStageProps = {
  titleId?: string;
};

export function ManifestoHeadlineStage({ titleId = "manifesto-section-title" }: ManifestoHeadlineStageProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = manifestoStages[activeIndex] ?? manifestoStages[0];

  const goTo = useCallback((index: number) => {
    setActiveIndex(index % manifestoStages.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % manifestoStages.length);
    }, manifestoContent.stageIntervalMs);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return (
      <blockquote className="manifesto-pro-quote mx-auto mt-10 max-w-4xl md:mt-12">
        <h2
          id={titleId}
          className="font-heading font-semibold leading-[1.02] tracking-[-0.045em] text-bone"
        >
          <span className="block text-[clamp(2.35rem,6.8vw,4.5rem)]">
            {manifestoContent.lines[0]}
          </span>
          <span className="mt-1 block text-[clamp(2.35rem,6.8vw,4.5rem)] md:mt-2">
            {manifestoContent.lines[1]}
          </span>
          <span className={`mt-2 block text-[clamp(2.35rem,6.8vw,4.5rem)] md:mt-3 ${accentClass}`}>
            {manifestoContent.closingReduced}
          </span>
        </h2>
      </blockquote>
    );
  }

  return (
    <div className="manifesto-headline-stage mx-auto mt-10 max-w-4xl md:mt-12">
      <blockquote className="manifesto-pro-quote">
        <h2
          id={titleId}
          className="font-heading font-semibold leading-[1.02] tracking-[-0.045em] text-bone"
        >
          <motion.span
            className="block text-[clamp(2.35rem,6.8vw,4.5rem)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {manifestoContent.lines[0]}
          </motion.span>
          <motion.span
            className="mt-1 block text-[clamp(2.35rem,6.8vw,4.5rem)] md:mt-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.06, duration: 0.8, ease: easeOut }}
          >
            {manifestoContent.lines[1]}
          </motion.span>

          <span
            className="relative mt-2 block min-h-[1.15em] text-[clamp(2.5rem,7.5vw,5.25rem)] md:mt-3"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={stage.id}
                className={`manifesto-stage-verb inline-block ${accentClass}`}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: easeOut }}
              >
                {stage.verb}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
      </blockquote>

      <div
        className="manifesto-stage-tabs mt-8 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Capas de la marca"
      >
        {manifestoStages.map((s, i) => (
          <StageTab
            key={s.id}
            stage={s}
            index={i}
            isActive={i === activeIndex}
            onSelect={() => goTo(i)}
          />
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <AnimatePresence mode="wait">
          <ManifestoStagePreview key={stage.id} stage={stage} />
        </AnimatePresence>
      </div>
    </div>
  );
}

function StageTab({
  stage,
  index,
  isActive,
  onSelect,
}: {
  stage: ManifestoStage;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`manifesto-stage-${stage.id}`}
      id={`manifesto-tab-${stage.id}`}
      onClick={onSelect}
      className={`manifesto-stage-tab rounded-full border px-3.5 py-2 font-heading text-[0.78rem] font-medium tracking-[-0.02em] transition-colors md:text-[0.82rem] ${
        isActive
          ? "border-accent/50 bg-accent/15 text-bone"
          : "border-white/12 bg-white/[0.04] text-bone/55 hover:border-white/22 hover:text-bone/80"
      }`}
    >
      <span className="font-mono text-[0.58rem] tabular-nums text-sky-soft/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="ml-2">{stage.pillar}</span>
    </button>
  );
}

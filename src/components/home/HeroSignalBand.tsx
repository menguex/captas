"use client";

import { heroContent } from "@/content/hero";
import { heroMarqueeSegments } from "@/content/hero-marquee";

const signalItems = [
  heroContent.signalPrefix,
  ...heroMarqueeSegments.map((s) => s.label),
] as const;

function Band({ reverse }: { reverse?: boolean }) {
  const row = [...signalItems, ...signalItems, ...signalItems];
  return (
    <div
      className={`hero-optic-marquee-row ${reverse ? "hero-optic-marquee-row--reverse" : ""}`}
      aria-hidden
    >
      {row.map((label, i) => (
        <span
          key={`${label}-${i}`}
          className="mx-6 inline-flex shrink-0 items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[rgba(20,24,30,0.42)]"
        >
          <span className="text-accent/70">{label}</span>
          <span className="h-1 w-1 rounded-full bg-accent/35" />
        </span>
      ))}
    </div>
  );
}

type HeroSignalBandProps = {
  active: boolean;
};

export function HeroSignalBand({ active }: HeroSignalBandProps) {
  return (
    <div
      className={`relative z-[15] w-full overflow-hidden border-y border-accent/10 bg-white/30 py-2.5 backdrop-blur-md transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <Band />
      <Band reverse />
    </div>
  );
}

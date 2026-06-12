"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroDisciplinesMarqueeProps = {
  items: readonly string[];
};

function DisciplineChip({ label }: { label: string }) {
  return (
    <span className="hero-discipline-chip inline-flex shrink-0 items-center rounded-full border border-white/20 bg-black/35 px-5 py-2.5 font-heading text-[0.9rem] font-medium leading-none tracking-[-0.02em] text-bone/94 shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-md md:px-6 md:py-3 md:text-[0.95rem]">
      {label}
    </span>
  );
}

function MarqueeSeparator() {
  return (
    <span
      className="hero-discipline-separator mx-1 inline-block h-1 w-1 shrink-0 rounded-full bg-sky-soft/70 md:mx-2"
      aria-hidden
    />
  );
}

export function HeroDisciplinesMarquee({ items }: HeroDisciplinesMarqueeProps) {
  const reduced = useReducedMotion();
  const loop = [...items, ...items];

  if (reduced) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4" role="list">
        {items.map((item) => (
          <li key={item}>
            <DisciplineChip label={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="hero-disciplines-marquee relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2.5rem,8vw,5rem)] bg-gradient-to-r from-[#080a0f] via-[#080a0f]/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(2.5rem,8vw,5rem)] bg-gradient-to-l from-[#080a0f] via-[#080a0f]/80 to-transparent"
        aria-hidden
      />

      <div className="hero-disciplines-marquee-track flex w-max items-center gap-4 py-1 md:gap-5">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-4 md:gap-5">
            <DisciplineChip label={item} />
            <MarqueeSeparator />
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { ManifestoSectionBackground } from "@/components/home/ManifestoSectionBackground";
import { ManifestoStatement } from "@/components/home/ManifestoStatement";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="manifesto-section home-section-manifesto relative z-[2] overflow-hidden py-[clamp(5rem,12vh,8.5rem)] text-bone"
      aria-labelledby="manifesto-section-title"
    >
      <ManifestoSectionBackground />

      <div className="site-container relative z-[1]">
        <ManifestoStatement />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-[#5b61ff]/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}

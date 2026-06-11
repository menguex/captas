"use client";

import { HomeSectionBackdrop } from "@/components/ui/HomeSectionBackdrop";
import { ManifestoStatement } from "@/components/home/ManifestoStatement";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="manifesto-section home-section-manifesto relative z-[2] -mt-[clamp(3rem,8vh,5rem)] overflow-hidden py-[clamp(4rem,9vh,7rem)] text-bone"
      aria-labelledby="manifesto-section-title"
    >
      <HomeSectionBackdrop variant="manifesto" />

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

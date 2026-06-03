"use client";

import { ManifestoDesignField } from "@/components/home/ManifestoDesignField";
import { ManifestoStatement } from "@/components/home/ManifestoStatement";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="manifesto-section home-section-manifesto relative z-[2] overflow-hidden bg-ink py-[clamp(5rem,12vh,8.5rem)] text-bone"
      aria-labelledby="manifesto-section-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(91,97,255,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,122,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.05]" />
      </div>

      <ManifestoDesignField />

      <div className="site-container relative z-[1]">
        <ManifestoStatement />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#5b61ff]/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}

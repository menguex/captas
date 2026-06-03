"use client";

import { ManifestoStatement } from "@/components/home/ManifestoStatement";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="home-section-manifesto relative z-[2] overflow-hidden bg-ink py-[clamp(4.5rem,11vh,7.5rem)] text-bone"
      aria-labelledby="manifesto-section-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,97,255,0.2),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,122,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.06]" />
      </div>

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

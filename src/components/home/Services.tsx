"use client";

import { ServicesEcosystemIntro } from "@/components/home/ServicesEcosystemIntro";
import { ServicesIntegralCta } from "@/components/home/ServicesIntegralCta";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-bone py-section text-ink"
      aria-labelledby="servicios-heading"
    >
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(var(--c-accent-rgb),0.1),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <ServicesEcosystemIntro />
        <ServicesIntegralCta />
      </div>
    </section>
  );
}

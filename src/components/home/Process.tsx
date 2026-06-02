"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessJourney } from "@/components/services/ProcessJourney";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-bone py-section text-ink">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          kicker="Método · Cómo trabajamos"
          title={
            <>
              Un proceso claro.{" "}
              <span className="text-accent">Resultados que elevan tu marca.</span>
            </>
          }
          description="Cuatro etapas conectadas — del primer descubrimiento al lanzamiento — diseñadas para que cada decisión tenga propósito."
        />

        <ProcessJourney embedded className="mt-14 md:mt-16" />
      </div>
    </section>
  );
}

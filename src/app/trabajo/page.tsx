import type { Metadata } from "next";
import { Suspense } from "react";
import { TrabajoGrid } from "@/components/trabajo/TrabajoGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Trabajo — Captas",
  description:
    "Portafolio Captas: UX/UI, branding, fotografía, video cinematográfico y diseño web para marcas del Limarí y Chile.",
};

export default function TrabajoPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-32">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.14]"
        aria-hidden
      />
      <div className="site-container relative">
        <SectionHeader
          as="h1"
          theme="dark"
          kicker="Portafolio"
          title={
            <>
              Trabajo que eleva marcas y{" "}
              <span className="text-sky">genera resultados</span>
            </>
          }
          description="Casos reales donde UX, motion, imagen y video convirtieron percepción en valor de negocio."
        />

        <Suspense fallback={<div className="mt-12 h-40 animate-pulse rounded-box-lg bg-line/20" />}>
          <TrabajoGrid />
        </Suspense>
      </div>
    </div>
  );
}

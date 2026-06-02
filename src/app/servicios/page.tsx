import type { Metadata } from "next";
import { ServiciosList } from "@/components/services/ServiciosList";
import { ServicePillarNav } from "@/components/services/ServicePillarNav";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Servicios — Captas",
  description:
    "UX/UI, fotografía, diseño web, video cinematográfico e imagen de marca. Servicios creativos full-service en Captas.",
};

export default function ServiciosPage() {
  return (
    <div className="relative overflow-hidden bg-bone pb-section pt-32 text-ink">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 gloss-ambient opacity-25"
        aria-hidden
      />

      <div className="relative site-container">
        <SectionHeader
          as="h1"
          theme="light"
          kicker="Servicios"
          title="Todo lo que tu marca necesita, con un solo estándar de craft"
          description="Desde la primera conversación estratégica hasta el último frame editado — un solo equipo, un solo estándar de craft en cada pilar."
        />

        <ServicePillarNav />
        <ServiciosList />
      </div>
    </div>
  );
}

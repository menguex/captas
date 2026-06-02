import type { Metadata } from "next";
import { PlanesRetainer } from "@/components/sections/PlanesRetainer";
import { ServicesBelowEcosystem } from "@/components/services/ServicesBelowEcosystem";
import { ServicesEcosystemIntro } from "@/components/home/ServicesEcosystemIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ecosystemIntro } from "@/content/ecosystem";

export const metadata: Metadata = {
  title: "Servicios — Captas",
  description:
    "UX/UI, fotografía, diseño web, video cinematográfico e imagen de marca. Planes retainer desde $350.000/mes — contrato mínimo 6 meses.",
};

export default function ServiciosPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-bone pb-16 pt-32 text-ink md:pb-20">
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
            kicker={ecosystemIntro.kicker}
            title={
              <>
                {ecosystemIntro.titleLead}{" "}
                <span className="bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent">
                  {ecosystemIntro.titleAccent}
                </span>
              </>
            }
            description={ecosystemIntro.description}
          />

          <ServicesEcosystemIntro showHeader={false} />
          <ServicesBelowEcosystem />
        </div>
      </div>

      <PlanesRetainer afterEcosystem />
    </>
  );
}

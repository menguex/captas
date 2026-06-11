"use client";

import { ServicesEcosystemIntro } from "@/components/home/ServicesEcosystemIntro";
import { HomeSectionBackdrop } from "@/components/ui/HomeSectionBackdrop";

export function Services() {
  return (
    <section
      id="servicios"
      className="home-section-light relative overflow-hidden bg-bone py-section text-ink"
      aria-labelledby="servicios-heading"
    >
      <HomeSectionBackdrop variant="light-accent" />

      <div className="site-container relative z-[1]">
        <ServicesEcosystemIntro />
      </div>
    </section>
  );
}

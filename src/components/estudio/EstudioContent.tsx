"use client";

import { EstudioFinale } from "@/components/estudio/EstudioFinale";
import { EstudioHero } from "@/components/estudio/EstudioHero";
import { EstudioJourney } from "@/components/estudio/EstudioJourney";

export function EstudioContent() {
  return (
    <>
      <EstudioHero />
      <EstudioJourney />
      <EstudioFinale />
    </>
  );
}

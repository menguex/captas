"use client";

import { motion } from "framer-motion";
import { services } from "@/content/services";
import { PillarCard } from "@/components/services/PillarCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, viewportOnce } from "@/lib/motion";

/** Detalle estático por pilar — anclas para ServicePillarNav */
export function ServicesPillarGrid() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="pilares-detalle-heading">
      <SectionHeader
        theme="light"
        compact
        kicker="Profundidad"
        title={
          <>
            Cada disciplina,{" "}
            <span className="text-accent">con entregables claros.</span>
          </>
        }
        description="Explora arriba el ecosistema en vivo — aquí el detalle de craft, alcance y contacto por pilar."
      />

      <motion.div
        className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 md:mt-12 md:grid-cols-12 md:gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {services.map((service) => (
          <PillarCard
            key={service.id}
            service={service}
            anchorId={service.id}
            variant="bento"
          />
        ))}
      </motion.div>
    </section>
  );
}

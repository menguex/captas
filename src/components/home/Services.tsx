"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesEcosystemIntro } from "@/components/home/ServicesEcosystemIntro";
import { ServicesIntegralCta } from "@/components/home/ServicesIntegralCta";
import { services } from "@/content/services";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-bone py-section text-ink"
      aria-labelledby="servicios-heading"
    >
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(61,85,108,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <ServicesEcosystemIntro />

        <motion.div
          className="mt-14 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-6 text-center font-mono text-kicker uppercase tracking-[0.2em] text-clay">
            Profundiza en cada pilar
          </p>
          <motion.div
            className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={i === 0}
                index={i}
              />
            ))}
          </motion.div>
        </motion.div>

        <ServicesIntegralCta />
      </div>
    </section>
  );
}

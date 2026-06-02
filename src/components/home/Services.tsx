"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/content/services";
import { easeOut, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section className="relative overflow-hidden bg-bone py-section text-ink">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(61,85,108,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          kicker="Servicios · 5 pilares"
          title={
            <>
              Un ecosistema creativo para{" "}
              <span className="text-accent">elevar tu marca.</span>
            </>
          }
          description="Cinco disciplinas, un solo equipo — integradas para que cada touchpoint se sienta coherente y premium."
        />

        {/* Ecosystem strip */}
        <motion.div
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {services.map((s, i) => (
            <span key={s.id} className="flex items-center gap-2">
              <Link
                href={`/servicios#${s.id}`}
                className="rounded-full px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: s.theme.soft,
                  color: s.theme.accentInk,
                }}
              >
                {s.pillar}
              </Link>
              {i < services.length - 1 ? (
                <span className="hidden text-clay/50 sm:inline" aria-hidden>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              featured={i === 0}
              index={i}
            />
          ))}
        </div>

        <motion.div
          className="mt-14 overflow-hidden rounded-box-lg border border-line-dark bg-gradient-to-br from-white via-white to-accent/[0.05] p-6 text-center md:mt-16 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="font-mono text-kicker uppercase tracking-[0.2em] text-accent">
            Proyecto integral
          </p>
          <p className="mx-auto mt-3 max-w-lg font-heading text-h3 leading-snug text-ink">
            ¿Necesitas varios pilares? Los combinamos en un solo roadmap, equipo y estándar de craft.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link href="/servicios" className="gloss-button inline-flex items-center gap-2">
              Ver servicios completos
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contacto"
              className="font-mono text-small font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
            >
              Conversemos →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

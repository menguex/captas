"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/content/services";
import { easeOut, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section className="relative overflow-hidden bg-bone py-section text-ink">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,122,255,0.08),transparent_55%)]"
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
          description="Cinco pilares integrados — explora cada uno, descubre qué entregamos y elige cómo avanzar."
        />

        <motion.div
          className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {services.map((service, i) => {
            const isFeatured = i === 0;
            const span = isFeatured ? "lg:col-span-2" : "";

            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75, ease: easeOut },
                  },
                }}
                className={`group relative overflow-hidden rounded-box-lg p-px transition-shadow duration-base hover:shadow-[0_24px_60px_rgba(0,82,204,0.12)] ${span}`}
                style={{ background: service.theme.border }}
              >
                <Link
                  href={`/servicios#${service.id}`}
                  className="relative block h-full rounded-box-lg bg-white p-7 md:p-8"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-8 font-heading text-[clamp(5rem,12vw,8rem)] leading-none opacity-[0.08]"
                    style={{ color: service.theme.accent }}
                    aria-hidden
                  >
                    {service.number}
                  </div>
                  <div
                    className="pointer-events-none absolute -left-12 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full blur-3xl opacity-0 transition-opacity duration-slow group-hover:opacity-100"
                    style={{ backgroundColor: service.theme.soft }}
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em]"
                        style={{ color: service.theme.accentInk }}
                      >
                        / {service.number}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em]"
                        style={{
                          backgroundColor: service.theme.soft,
                          color: service.theme.accentInk,
                        }}
                      >
                        {service.pillar}
                      </span>
                    </div>

                    <h3 className="mt-7 font-heading text-h3 leading-tight tracking-tight text-ink md:text-h2">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-lead leading-relaxed text-clay">
                      {service.short}
                    </p>

                    {isFeatured ? (
                      <p className="mt-4 max-w-xl text-body leading-relaxed text-clay">
                        {service.description}
                      </p>
                    ) : null}

                    <ul className="mt-7 space-y-2 border-t border-line-dark pt-5">
                      {service.deliverables.slice(0, isFeatured ? 4 : 3).map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 text-small text-clay"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: service.theme.accent }}
                            aria-hidden
                          />
                          <span className="leading-snug">{d}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between pt-7">
                      <span
                        className="font-mono text-kicker uppercase tracking-[0.18em] transition-colors duration-base"
                        style={{ color: service.theme.accentInk }}
                      >
                        Ver pilar
                      </span>
                      <span
                        className="font-mono text-h3 transition-transform duration-base group-hover:translate-x-1"
                        style={{ color: service.theme.accentInk }}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-5 md:mt-14 md:flex-row md:gap-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-white/95 px-6 py-3.5 font-sans text-body font-medium text-ink shadow-[0_8px_24px_rgba(0,122,255,0.08)] transition-[border-color,box-shadow,color] duration-base hover:border-accent hover:text-accent hover:shadow-[0_12px_32px_rgba(0,122,255,0.14)]"
          >
            Ver servicios completos
            <span className="text-accent" aria-hidden>
              →
            </span>
          </Link>
          <Link
            href="/contacto"
            className="font-mono text-small font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-base hover:text-accent"
          >
            ¿Proyecto integral? Conversemos →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

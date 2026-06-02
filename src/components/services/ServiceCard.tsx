"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/content/services";
import { PillarIconBadge } from "@/components/services/PillarIconBadge";
import { easeOut } from "@/lib/motion";

type ServiceCardProps = {
  service: Service;
  featured?: boolean;
  index?: number;
};

export function ServiceCard({ service, featured = false, index = 0 }: ServiceCardProps) {
  const { theme } = service;
  const deliverableCount = featured ? 4 : 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: easeOut }}
      className={`group relative overflow-hidden rounded-box-lg p-px transition-shadow duration-base hover:shadow-[0_24px_60px_rgba(61,85,108,0.16)] ${
        featured ? "lg:col-span-2" : ""
      }`}
      style={{ background: theme.border }}
    >
      <Link
        href={`/servicios#${service.id}`}
        className={`relative block h-full rounded-box-lg bg-white transition-colors duration-base group-hover:bg-white ${
          featured ? "p-7 md:p-9 lg:p-10" : "p-6 md:p-7"
        }`}
      >
        <div
          className="pointer-events-none absolute -right-4 -top-6 font-heading text-[clamp(4.5rem,11vw,7.5rem)] leading-none opacity-[0.07]"
          style={{ color: theme.accent }}
          aria-hidden
        >
          {service.number}
        </div>
        <div
          className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full blur-3xl opacity-0 transition-opacity duration-slow group-hover:opacity-100"
          style={{ backgroundColor: theme.soft }}
          aria-hidden
        />

        <div
          className={`relative flex h-full ${featured ? "flex-col gap-6 lg:flex-row lg:items-start lg:gap-10" : "flex-col"}`}
        >
          <div className={featured ? "shrink-0" : ""}>
            <PillarIconBadge
              serviceId={service.id}
              theme={theme}
              size={featured ? "lg" : "md"}
              featured={featured}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em]"
                style={{ color: theme.accentInk }}
              >
                / {service.number}
              </span>
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em]"
                style={{
                  backgroundColor: theme.soft,
                  color: theme.accentInk,
                }}
              >
                {service.pillar}
              </span>
            </div>

            <h3
              className={`mt-4 font-heading leading-tight tracking-tight text-ink ${
                featured ? "text-h2 md:text-h1" : "text-h3"
              }`}
            >
              {service.title}
            </h3>

            <p className={`mt-2 leading-relaxed text-clay ${featured ? "text-lead" : "text-body"}`}>
              {service.short}
            </p>

            {featured ? (
              <p className="mt-3 max-w-xl text-body leading-relaxed text-clay">{service.description}</p>
            ) : null}

            <ul className={`space-y-2 border-t border-line-dark ${featured ? "mt-6 pt-5" : "mt-5 pt-4"}`}>
              {service.deliverables.slice(0, deliverableCount).map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-small text-clay">
                  <span
                    className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold text-white"
                    style={{ background: theme.accent }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="leading-snug">{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <span
                className="font-mono text-kicker font-medium uppercase tracking-[0.18em]"
                style={{ color: theme.accentInk }}
              >
                Explorar pilar
              </span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-base group-hover:translate-x-0.5"
                style={{
                  borderColor: `${theme.accent}33`,
                  backgroundColor: theme.soft,
                  color: theme.accentInk,
                }}
                aria-hidden
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

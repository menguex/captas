"use client";

import Image from "next/image";
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

function ServiceCardImage({
  service,
  featured,
  priority,
}: {
  service: Service;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-ink/5 ${
        featured ? "aspect-[16/9] lg:aspect-auto lg:min-h-[320px]" : "aspect-[16/10]"
      }`}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-slow group-hover:scale-[1.03]"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-ink/5 lg:bg-gradient-to-r lg:from-ink/40 lg:via-ink/10 lg:to-transparent"
        aria-hidden
      />
      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-ink/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md">
        {service.pillar}
      </span>
    </div>
  );
}

export function ServiceCard({ service, featured = false, index = 0 }: ServiceCardProps) {
  const deliverableCount = featured ? 4 : 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: easeOut }}
      className={`group relative overflow-hidden rounded-box-lg border border-line-dark bg-white shadow-[0_4px_24px_rgba(15,18,24,0.06)] transition-shadow duration-base hover:shadow-[0_20px_56px_rgba(15,18,24,0.12)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link
        href={`/servicios#${service.id}`}
        className={`relative block h-full ${featured ? "grid lg:grid-cols-2" : "flex flex-col"}`}
      >
        <ServiceCardImage service={service} featured={featured} priority={index === 0} />

        <div
          className={`relative flex flex-col ${
            featured ? "p-7 md:p-9 lg:p-10" : "p-6 md:p-7"
          }`}
        >
          <div
            className="pointer-events-none absolute -right-2 -top-4 font-heading text-[clamp(3.5rem,9vw,6rem)] leading-none text-accent/[0.06]"
            aria-hidden
          >
            {service.number}
          </div>

          <div className="relative flex items-start gap-4">
            <PillarIconBadge serviceId={service.id} size={featured ? "lg" : "md"} />
            <div className="min-w-0 flex-1 pt-1">
              <span className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em] text-accent">
                / {service.number}
              </span>
              <h3
                className={`mt-2 font-heading leading-tight tracking-tight text-ink ${
                  featured ? "text-h2 md:text-h1" : "text-h3"
                }`}
              >
                {service.title}
              </h3>
            </div>
          </div>

          <p className={`relative mt-3 leading-relaxed text-clay ${featured ? "text-lead" : "text-body"}`}>
            {service.short}
          </p>

          {featured ? (
            <p className="relative mt-3 max-w-xl text-body leading-relaxed text-clay">
              {service.description}
            </p>
          ) : null}

          <ul className={`relative space-y-2 border-t border-line-dark ${featured ? "mt-6 pt-5" : "mt-5 pt-4"}`}>
            {service.deliverables.slice(0, deliverableCount).map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-small text-clay">
                <span
                  className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-[0.55rem] font-bold text-bone"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="leading-snug">{d}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="font-mono text-kicker font-medium uppercase tracking-[0.18em] text-accent">
              Explorar pilar
            </span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark bg-bone text-accent transition-all duration-base group-hover:border-accent/30 group-hover:bg-accent/10"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

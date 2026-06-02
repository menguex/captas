"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/content/services";
import { PillarIconBadge } from "@/components/services/PillarIconBadge";
import { ServicePhotoBackdrop } from "@/components/services/ServicePhotoBackdrop";
import { easeOut } from "@/lib/motion";

type ServiceCardProps = {
  service: Service;
  featured?: boolean;
  index?: number;
};

export function ServiceCard({ service, featured = false, index = 0 }: ServiceCardProps) {
  const deliverableCount = featured ? 4 : 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: easeOut }}
      className={`group relative overflow-hidden rounded-box-lg border border-line-dark/80 shadow-[0_8px_40px_rgba(15,18,24,0.18)] transition-shadow duration-base hover:shadow-[0_24px_64px_rgba(15,18,24,0.28)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link href={`/servicios#${service.id}`} className="relative block h-full">
        <ServicePhotoBackdrop
          service={service}
          priority={index === 0}
          minHeightClass={
            featured ? "min-h-[min(520px,78vh)]" : "min-h-[min(400px,65vh)]"
          }
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        >
          <div
            className={`flex h-full flex-col justify-end ${
              featured ? "p-7 md:p-9 lg:p-10" : "p-6 md:p-7"
            }`}
          >
            <span className="absolute left-5 top-5 rounded-full border border-bone/25 bg-ink/35 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md md:left-7 md:top-7">
              {service.pillar}
            </span>

            <div
              className="pointer-events-none absolute right-3 top-2 font-heading text-[clamp(4rem,12vw,7rem)] leading-none text-bone/[0.08]"
              aria-hidden
            >
              {service.number}
            </div>

            <div className="relative flex items-start gap-4">
              <PillarIconBadge serviceId={service.id} size={featured ? "lg" : "md"} onDark />
              <div className="min-w-0 flex-1 pt-1">
                <span className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em] text-sky-soft">
                  / {service.number}
                </span>
                <h3
                  className={`mt-2 font-heading leading-tight tracking-tight text-bone ${
                    featured ? "text-h2 md:text-h1" : "text-h3"
                  }`}
                >
                  {service.title}
                </h3>
              </div>
            </div>

            <p
              className={`relative mt-3 max-w-2xl leading-relaxed text-bone/85 ${
                featured ? "text-lead" : "text-body"
              }`}
            >
              {service.short}
            </p>

            {featured ? (
              <p className="relative mt-3 max-w-2xl text-body leading-relaxed text-bone/75">
                {service.description}
              </p>
            ) : null}

            <ul
              className={`relative space-y-2 border-t border-bone/15 ${
                featured ? "mt-6 pt-5" : "mt-5 pt-4"
              }`}
            >
              {service.deliverables.slice(0, deliverableCount).map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-small text-bone/80">
                  <span
                    className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bone/90 text-[0.55rem] font-bold text-accent"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="leading-snug">{d}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex items-center justify-between gap-4 pt-6">
              <span className="font-mono text-kicker font-medium uppercase tracking-[0.18em] text-sky-soft">
                Explorar pilar
              </span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-bone/10 text-bone backdrop-blur-sm transition-all duration-base group-hover:border-bone/40 group-hover:bg-bone/20"
                aria-hidden
              >
                →
              </span>
            </div>
          </div>
        </ServicePhotoBackdrop>
      </Link>
    </motion.article>
  );
}

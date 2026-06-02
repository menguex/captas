"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/content/services";
import { PillarIconBadge } from "@/components/services/PillarIconBadge";
import { getPillarIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  easeOut,
  serviceOverlayItem,
  serviceOverlayStagger,
  viewportOnce,
} from "@/lib/motion";

type ServiceOverlayContentProps = {
  service: Service;
  variant: "card" | "card-featured" | "panel";
  animateKey?: string;
  onPage?: boolean;
  /** view = al entrar en viewport (cards); mount = al cambiar pilar (panel) */
  motionTrigger?: "view" | "mount";
};

export function ServiceOverlayContent({
  service,
  variant,
  animateKey,
  onPage = false,
  motionTrigger = "mount",
}: ServiceOverlayContentProps) {
  const reduced = useReducedMotion();
  const Icon = variant === "panel" ? getPillarIcon(service.id) : null;
  const featured = variant === "card-featured";
  const isPanel = variant === "panel";
  const deliverableCount = featured ? 4 : isPanel ? service.deliverables.length : 3;

  const motionProps = reduced
    ? {}
    : motionTrigger === "view"
      ? {
          variants: serviceOverlayStagger,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: viewportOnce,
        }
      : {
          variants: serviceOverlayStagger,
          initial: "hidden" as const,
          animate: "visible" as const,
        };

  return (
    <motion.div
      key={animateKey ?? service.id}
      {...motionProps}
      className={`relative mt-auto w-full border-t border-bone/15 bg-ink/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/82 ${
        isPanel ? "rounded-b-box-lg p-6 md:p-8 lg:p-10" : featured ? "rounded-b-box-lg p-7 md:p-9 lg:p-10" : "rounded-b-box-lg p-6 md:p-7"
      }`}
    >
      <span
        className="pointer-events-none absolute right-4 top-3 font-heading leading-none text-bone/[0.07] md:right-6"
        style={{ fontSize: isPanel ? "clamp(5rem, 16vw, 10rem)" : "clamp(3.5rem, 11vw, 6.5rem)" }}
        aria-hidden
      >
        {service.number}
      </span>

      <motion.div variants={reduced ? undefined : serviceOverlayItem} className="relative flex flex-wrap items-center gap-3">
        {isPanel && Icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bone/30 bg-bone/15 text-bone shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
            <Icon size={24} />
          </span>
        ) : (
          <PillarIconBadge
            serviceId={service.id}
            size={featured || isPanel ? "lg" : "md"}
            onDark
            featured={featured}
          />
        )}
        <span className="rounded-full border border-bone/25 bg-ink/50 px-3 py-1 font-mono text-kicker uppercase tracking-[0.2em] text-bone backdrop-blur-md">
          {isPanel ? `Pilar ${service.number} · ${service.pillar}` : service.pillar}
        </span>
      </motion.div>

      <motion.div
        variants={reduced ? undefined : serviceOverlayItem}
        className={isPanel ? "relative mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12" : "relative mt-5"}
      >
        <div>
          {!isPanel ? (
            <span className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em] text-sky-soft">
              / {service.number}
            </span>
          ) : null}

          <h3
            className={`font-heading leading-tight tracking-tight text-bone ${
              isPanel ? "text-h1 text-balance" : featured ? "mt-2 text-h2 md:text-h1" : "mt-2 text-h3"
            }`}
          >
            {service.title}
          </h3>

          <p
            className={`mt-3 max-w-2xl font-medium leading-relaxed text-bone ${
              featured || isPanel ? "text-lead" : "text-body"
            }`}
          >
            {service.short}
          </p>

          {(featured || isPanel) && (
            <p className="mt-3 max-w-2xl text-body leading-relaxed text-on-ink-muted">
              {service.description}
            </p>
          )}

          <ul
            className={`grid gap-2 ${isPanel ? "mt-8 sm:grid-cols-2" : `mt-5 space-y-2 border-t border-bone/20 pt-4 ${featured ? "sm:grid-cols-2 sm:gap-x-4" : ""}`}`}
          >
            {service.deliverables.slice(0, deliverableCount).map((d) => (
              <motion.li
                key={d}
                variants={reduced ? undefined : serviceOverlayItem}
                className="flex items-start gap-2.5 rounded-xl border border-bone/15 bg-ink/55 px-3 py-2.5 text-small leading-relaxed text-on-ink-muted backdrop-blur-sm"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bone text-[0.6rem] font-bold text-accent-deep"
                  aria-hidden
                >
                  ✓
                </span>
                {d}
              </motion.li>
            ))}
          </ul>
        </div>

        {isPanel ? (
          <motion.div
            variants={reduced ? undefined : serviceOverlayItem}
            className="flex flex-col gap-3 lg:min-w-[220px]"
          >
            <Link
              href={`/contacto?servicio=${service.id}`}
              className="gloss-button inline-flex items-center justify-center px-6 py-3.5 text-center"
            >
              Solicitar propuesta
            </Link>
            <Link
              href={onPage ? "/trabajo" : "/servicios"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/30 bg-bone/10 px-6 py-3 font-sans text-body font-medium text-bone backdrop-blur-sm transition-colors duration-base hover:border-bone/50 hover:bg-bone/20"
            >
              {onPage ? "Ver casos de estudio" : "Todos los servicios"}
              <motion.span
                aria-hidden
                className="inline-block"
                whileHover={reduced ? undefined : { x: 4 }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                →
              </motion.span>
            </Link>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-on-ink-subtle">
              Integrable con otros pilares
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={reduced ? undefined : serviceOverlayItem}
            className="mt-6 flex items-center justify-between gap-4 border-t border-bone/20 pt-5"
          >
            <span className="font-mono text-kicker font-medium uppercase tracking-[0.18em] text-sky-soft">
              Explorar pilar
            </span>
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/30 bg-bone/15 text-bone backdrop-blur-sm"
              aria-hidden
              whileHover={reduced ? undefined : { scale: 1.06, x: 2 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

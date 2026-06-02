"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PillarTheme, Service } from "@/content/services";
import { fadeUp } from "@/lib/motion";
import { ProList } from "@/components/ui/ProList";
import { PillarIconBadge } from "./PillarIconBadge";

const bentoSpans: Record<Service["id"], string> = {
  "ux-ui": "md:col-span-7 md:row-span-2",
  fotografia: "md:col-span-5",
  "diseno-web": "md:col-span-4",
  "video-cinematografico": "md:col-span-4",
  branding: "md:col-span-4",
};

type PillarCardProps = {
  service: Service;
  reducedMotion?: boolean;
  variant?: "bento" | "detail";
  anchorId?: string;
};

function PillarFrame({
  theme,
  featured,
  className = "",
  children,
}: {
  theme: PillarTheme;
  featured?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-box-lg p-px transition-shadow duration-base ${className}`}
      style={{
        background: theme.border,
        boxShadow: featured ? `0 16px 48px ${theme.glow}` : undefined,
      }}
    >
      <div
        className="relative h-full overflow-hidden rounded-box-lg backdrop-blur-sm"
        style={{ background: theme.fill }}
      >
        {children}
      </div>
    </div>
  );
}

export function PillarCard({
  service,
  reducedMotion = false,
  variant = "bento",
  anchorId,
}: PillarCardProps) {
  const { theme } = service;
  const isFeatured = service.id === "ux-ui" && variant === "bento";
  const span = variant === "bento" ? bentoSpans[service.id] : "";

  return (
    <motion.article
      id={anchorId}
      variants={fadeUp}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
      }
      className={`group relative scroll-mt-28 ${span}`}
    >
      <PillarFrame theme={theme} featured={isFeatured} className="h-full">
        <div
          className={`relative flex h-full flex-col p-6 md:p-8 ${
            isFeatured ? "md:min-h-[26rem]" : ""
          }`}
        >
          {isFeatured && (
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
              style={{ backgroundColor: theme.soft }}
              aria-hidden
            />
          )}

          <span
            className="pointer-events-none absolute -bottom-4 -right-2 select-none font-heading text-[clamp(5rem,12vw,8rem)] leading-none transition-colors duration-base"
            style={{ color: `${theme.accent}12` }}
            aria-hidden
          >
            {service.number}
          </span>

          <div
            className="absolute inset-x-0 top-0 h-px opacity-80"
            style={{ background: theme.border }}
            aria-hidden
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <PillarIconBadge
              serviceId={service.id}
              size={isFeatured ? "lg" : "md"}
              featured={isFeatured}
            />
            <span
              className="rounded-full border bg-white/80 px-2.5 py-1 font-mono text-kicker tabular-nums text-on-light-muted"
              style={{ borderColor: `${theme.accent}33` }}
            >
              {service.number}
            </span>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h3
              className={`font-heading text-ink transition-colors ${
                isFeatured ? "text-h2" : "text-h3"
              }`}
              style={{ color: undefined }}
            >
              <span className="group-hover:opacity-90" style={{ color: "inherit" }}>
                {service.title}
              </span>
            </h3>
            <span
              className="rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]"
              style={{ backgroundColor: theme.soft, color: theme.accent }}
            >
              {service.pillar}
            </span>
          </div>

          <p
            className={`relative z-10 mt-4 font-medium leading-snug text-ink/85 ${
              isFeatured ? "text-lead" : "text-body"
            }`}
          >
            {service.short}
          </p>

          <p
            className={`relative z-10 mt-3 text-body leading-relaxed text-on-light-muted ${
              isFeatured || variant === "detail"
                ? "block"
                : "line-clamp-3 md:line-clamp-4"
            }`}
          >
            {service.description}
          </p>

          <div className="relative z-10 mt-auto pt-6">
            <ProList
              tone="light"
              variant="inline"
              items={service.deliverables}
              className="[&_li]:border-accent/15 [&_li]:text-on-light-muted"
            />
          </div>

          <Link
            href={`/contacto?servicio=${service.id}`}
            className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-sans text-body font-medium transition-[border-color,background-color] hover:opacity-90"
            style={{
              borderColor: `${theme.accent}44`,
              backgroundColor: theme.soft,
              color: theme.accent,
            }}
          >
            Consultar este servicio
            <span
              aria-hidden
              className="transition-transform duration-fast group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </PillarFrame>
    </motion.article>
  );
}

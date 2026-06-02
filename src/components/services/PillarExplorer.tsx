"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { services, type Service } from "@/content/services";
import { getPillarIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AUTO_MS = 8000;
const ease = [0.16, 1, 0.3, 1] as const;

type PillarExplorerProps = {
  className?: string;
  autoPlay?: boolean;
  variant?: "page" | "embed";
};

export function PillarExplorer({
  className = "",
  autoPlay = true,
  variant = "embed",
}: PillarExplorerProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const service = services[active];

  const goTo = useCallback((index: number) => {
    setActive(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % services.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (reduced || !autoPlay || paused) return;

    const tick = 40;
    const id = setInterval(() => {
      setProgress((p) => {
        const n = p + tick / AUTO_MS;
        if (n >= 1) {
          setActive((i) => (i + 1) % services.length);
          return 0;
        }
        return n;
      });
    }, tick);

    return () => clearInterval(id);
  }, [reduced, autoPlay, paused, active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + services.length) % services.length);
        setProgress(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide lg:hidden"
        role="tablist"
        aria-label="Pilares de servicio"
      >
        {services.map((s, i) => (
          <PillarTab key={s.id} service={s} active={active === i} compact onSelect={() => goTo(i)} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-6">
        <nav
          className="hidden flex-col gap-1.5 lg:flex"
          role="tablist"
          aria-label="Pilares de servicio"
        >
          {services.map((s, i) => (
            <PillarTab
              key={s.id}
              service={s}
              active={active === i}
              progress={active === i && autoPlay && !reduced && !paused ? progress : undefined}
              onSelect={() => goTo(i)}
            />
          ))}

          <p className="mt-4 px-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-clay">
            ↑ ↓ para navegar
          </p>
        </nav>

        <div className="relative min-h-[min(420px,70vh)]">
          <AnimatePresence mode="wait">
            <PillarPanel key={service.id} service={service} variant={variant} />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${s.pillar} — ${s.title}`}
            aria-current={active === i ? "true" : undefined}
            className={`h-2 overflow-hidden rounded-full transition-all duration-base ${
              active === i ? "w-10 bg-accent" : "w-4 bg-accent/25 hover:bg-accent/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PillarTab({
  service,
  active,
  compact,
  progress,
  onSelect,
}: {
  service: Service;
  active: boolean;
  compact?: boolean;
  progress?: number;
  onSelect: () => void;
}) {
  const Icon = getPillarIcon(service.id);

  if (compact) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={onSelect}
        className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-base ${
          active
            ? "border-accent bg-accent text-bone shadow-[0_4px_20px_rgba(61,85,108,0.2)]"
            : "border-line-dark bg-white/90 text-clay"
        }`}
      >
        <span className="flex items-center gap-2">
          {Icon ? <Icon size={14} /> : null}
          {service.pillar}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`relative w-full overflow-hidden rounded-box-lg border text-left transition-all duration-base ${
        active
          ? "scale-[1.02] border-accent bg-white shadow-[0_8px_32px_rgba(15,18,24,0.1)]"
          : "border-line-dark bg-white/85 opacity-80 hover:border-accent/25 hover:opacity-100"
      }`}
    >
      <span className="relative flex items-center gap-3 px-4 py-3.5">
        {Icon ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-dark bg-bone text-accent">
            <Icon size={20} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="font-mono text-[0.62rem] tabular-nums uppercase tracking-[0.2em] text-accent">
              {service.number}
            </span>
            <span className={`truncate font-heading text-body tracking-tight ${active ? "text-ink" : "text-clay"}`}>
              {service.pillar}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-small leading-snug text-clay">{service.short}</span>
        </span>
        {progress !== undefined && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/5">
            <motion.span
              className="block h-full origin-left bg-accent"
              style={{ scaleX: progress }}
            />
          </span>
        )}
      </span>
    </button>
  );
}

function PillarPanel({
  service,
  variant,
}: {
  service: Service;
  variant: "page" | "embed";
}) {
  const Icon = getPillarIcon(service.id);
  const onPage = variant === "page";

  return (
    <motion.article
      id={service.id}
      role="tabpanel"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease }}
      className="scroll-mt-28 overflow-hidden rounded-box-lg border border-line-dark bg-white shadow-[0_20px_60px_rgba(15,18,24,0.1)]"
    >
      <div className="grid lg:grid-cols-[1fr_minmax(0,42%)]">
        <div className="relative min-h-[220px] lg:col-start-2 lg:row-start-1 lg:min-h-[420px]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-ink/25 lg:to-ink/55"
            aria-hidden
          />
          <span className="absolute bottom-4 left-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone/90 lg:hidden">
            {service.pillar}
          </span>
        </div>

        <div className="relative p-6 md:p-8 lg:col-start-1 lg:row-start-1 lg:p-10">
          <div
            className="pointer-events-none absolute -right-4 -top-6 font-heading text-[clamp(5rem,14vw,9rem)] leading-none text-accent/[0.06]"
            aria-hidden
          >
            {service.number}
          </div>

          <div className="relative flex flex-wrap items-center gap-3">
            {Icon ? (
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-dark bg-bone text-accent">
                <Icon size={24} />
              </span>
            ) : null}
            <span className="rounded-full border border-line-dark bg-bone px-3 py-1 font-mono text-kicker uppercase tracking-[0.22em] text-accent">
              Pilar {service.number} · {service.pillar}
            </span>
          </div>

          <h3 className="relative mt-6 font-heading text-h1 leading-[1.06] tracking-tight text-balance text-ink">
            {service.title}
          </h3>
          <p className="relative mt-5 max-w-xl text-lead font-medium leading-relaxed text-ink">
            {service.short}
          </p>
          <p className="relative mt-4 max-w-2xl text-body leading-relaxed text-clay">
            {service.description}
          </p>

          <ul className="relative mt-8 grid gap-2 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2.5 rounded-xl border border-line-dark bg-bone/50 px-3.5 py-2.5 text-small leading-relaxed text-clay"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-[0.6rem] text-bone"
                  aria-hidden
                >
                  ✓
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:max-w-xs">
            <Link
              href={`/contacto?servicio=${service.id}`}
              className="gloss-button inline-flex items-center justify-center px-6 py-3.5 text-center"
            >
              Solicitar propuesta
            </Link>
            <Link
              href={onPage ? "/trabajo" : "/servicios"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark bg-white px-6 py-3 font-sans text-body font-medium text-clay transition-colors duration-base hover:border-accent/35 hover:text-accent"
            >
              {onPage ? "Ver casos de estudio" : "Todos los servicios"}
              <span aria-hidden>→</span>
            </Link>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-clay">
              Integrable con otros pilares
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

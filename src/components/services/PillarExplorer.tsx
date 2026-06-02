"use client";

import { useCallback, useEffect, useState } from "react";
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
  /** En la página /servicios: CTAs y enlaces adaptados */
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
      {/* Mobile selector */}
      <div
        className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide lg:hidden"
        role="tablist"
        aria-label="Pilares de servicio"
      >
        {services.map((s, i) => (
          <PillarTab
            key={s.id}
            service={s}
            index={i}
            active={active === i}
            compact
            onSelect={() => goTo(i)}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-6">
        {/* Desktop rail */}
        <nav
          className="hidden flex-col gap-1.5 lg:flex"
          role="tablist"
          aria-label="Pilares de servicio"
        >
          {services.map((s, i) => (
            <PillarTab
              key={s.id}
              service={s}
              index={i}
              active={active === i}
              progress={active === i && autoPlay && !reduced && !paused ? progress : undefined}
              onSelect={() => goTo(i)}
            />
          ))}

          <p className="mt-4 px-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-clay">
            ↑ ↓ para navegar
          </p>
        </nav>

        {/* Featured panel */}
        <div className="relative min-h-[min(420px,70vh)]">
          <AnimatePresence mode="wait">
            <PillarPanel key={service.id} service={service} variant={variant} />
          </AnimatePresence>
        </div>
      </div>

      {/* Mini map — los 5 de un vistazo */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${s.pillar} — ${s.title}`}
            aria-current={active === i ? "true" : undefined}
            className="group relative h-2 overflow-hidden rounded-full transition-all duration-base"
            style={{
              width: active === i ? 40 : 16,
              background: active === i ? s.theme.border : `${s.theme.accent}33`,
            }}
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
  index?: number;
  active: boolean;
  compact?: boolean;
  progress?: number;
  onSelect: () => void;
}) {
  const Icon = getPillarIcon(service.id);
  const { theme } = service;

  if (compact) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={onSelect}
        className="shrink-0 rounded-full p-px transition-shadow duration-base"
        style={{
          background: active ? theme.border : "rgba(7,11,18,0.12)",
          boxShadow: active ? `0 4px 20px ${theme.glow}` : undefined,
        }}
      >
        <span
          className={`flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] ${
            active ? "bg-white text-ink" : "bg-white/90 text-clay"
          }`}
        >
          {Icon ? <Icon size={14} style={{ color: theme.accent }} /> : null}
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
      className={`relative w-full overflow-hidden rounded-box-lg p-px text-left transition-all duration-base ${
        active ? "scale-[1.02]" : "opacity-75 hover:opacity-100"
      }`}
      style={{
        background: active ? theme.border : "rgba(7,11,18,0.08)",
        boxShadow: active ? `0 8px 32px ${theme.glow}` : undefined,
      }}
    >
      <span
        className={`relative flex items-center gap-3 rounded-box-lg px-4 py-3.5 ${
          active ? "bg-white" : "bg-white/85"
        }`}
      >
        {Icon ? (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: theme.soft, color: theme.accent }}
          >
            <Icon size={20} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span
              className="font-mono text-[0.62rem] tabular-nums uppercase tracking-[0.2em]"
              style={{ color: theme.accent }}
            >
              {service.number}
            </span>
            <span
              className={`truncate font-heading text-body tracking-tight ${active ? "text-ink" : "text-clay"}`}
            >
              {service.pillar}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-small leading-snug text-clay">
            {service.short}
          </span>
        </span>
        {progress !== undefined && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/5">
            <motion.span
              className="block h-full origin-left"
              style={{ scaleX: progress, background: theme.border }}
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
  const { theme } = service;
  const onPage = variant === "page";

  return (
    <motion.article
      id={service.id}
      role="tabpanel"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease }}
      className="scroll-mt-28 rounded-box-lg p-px shadow-[0_20px_60px_rgba(61,85,108,0.14)]"
      style={{ background: theme.border }}
    >
      <div
        className="relative overflow-hidden rounded-box-lg"
        style={{ background: theme.fill }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-10 font-heading text-[clamp(6rem,18vw,11rem)] leading-none"
          style={{ color: `${theme.accent}10` }}
          aria-hidden
        >
          {service.number}
        </div>
        <div
          className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: theme.soft }}
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {Icon ? (
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  style={{ background: theme.border, color: "#fff" }}
                >
                  <Icon size={28} />
                </span>
              ) : null}
              <span
                className="rounded-full px-3 py-1 font-mono text-kicker uppercase tracking-[0.22em]"
                style={{ backgroundColor: theme.soft, color: theme.accent }}
              >
                Pilar {service.number} · {service.pillar}
              </span>
            </div>

            <h3 className="mt-6 font-heading text-h1 leading-[1.06] tracking-tight text-balance text-ink">
              {service.title}
            </h3>
            <p className="mt-5 max-w-xl text-lead font-medium leading-relaxed text-ink">
              {service.short}
            </p>
            <p className="mt-4 max-w-2xl text-body leading-relaxed text-clay">
              {service.description}
            </p>

            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2.5 rounded-xl border bg-white/80 px-3.5 py-2.5 text-small leading-relaxed text-clay"
                  style={{ borderColor: `${theme.accent}22` }}
                >
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] text-white"
                    style={{ background: theme.accent }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-end gap-3 lg:min-w-[210px]">
            <Link
              href={`/contacto?servicio=${service.id}`}
              className="gloss-button inline-flex items-center justify-center px-6 py-3.5 text-center"
            >
              Solicitar propuesta
            </Link>
            <Link
              href={onPage ? "/trabajo" : "/servicios"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark bg-white/90 px-6 py-3 font-sans text-body font-medium text-clay transition-colors duration-base hover:border-accent/35 hover:text-accent"
            >
              {onPage ? "Ver casos de estudio" : "Todos los servicios"}
              <span aria-hidden>→</span>
            </Link>
            <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-clay lg:text-left">
              Integrable con otros pilares
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

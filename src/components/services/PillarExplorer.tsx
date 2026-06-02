"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServicePhotoBackdrop } from "@/components/services/ServicePhotoBackdrop";
import { ServiceOverlayContent } from "@/components/services/ServiceOverlayContent";
import { services, type Service } from "@/content/services";
import { getPillarIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, servicePanelReveal } from "@/lib/motion";

const AUTO_MS = 8000;

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
  const onPage = variant === "page";

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
          <PillarTab key={s.id} service={s} active={active === i} compact onSelect={() => goTo(i)} reduced={reduced} />
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
              reduced={reduced}
            />
          ))}

          <p className="mt-4 px-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-clay">
            ↑ ↓ para navegar
          </p>
        </nav>

        <div className="relative min-h-[min(480px,75vh)]">
          <AnimatePresence mode="wait">
            <PillarPanel
              key={service.id}
              service={service}
              onPage={onPage}
              reduced={reduced}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Indicador de pilar">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${s.pillar} — ${s.title}`}
            aria-current={active === i ? "true" : undefined}
            className={`h-2 overflow-hidden rounded-full transition-all duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active === i ? "w-10 bg-accent" : "w-4 bg-accent/30 hover:bg-accent/50"
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
  reduced,
}: {
  service: Service;
  active: boolean;
  compact?: boolean;
  progress?: number;
  onSelect: () => void;
  reduced: boolean;
}) {
  const Icon = getPillarIcon(service.id);

  if (compact) {
    return (
      <motion.button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={onSelect}
        layout={reduced ? false : true}
        transition={{ duration: 0.35, ease: easeOut }}
        className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          active
            ? "border-accent bg-accent text-bone shadow-[0_4px_20px_rgba(61,85,108,0.25)]"
            : "border-line-dark bg-white text-clay hover:border-accent/30"
        }`}
      >
        <span className="flex items-center gap-2">
          {Icon ? <Icon size={14} /> : null}
          {service.pillar}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      layout={reduced ? false : true}
      transition={{ duration: 0.4, ease: easeOut }}
      className={`relative w-full overflow-hidden rounded-box-lg border text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "border-accent bg-white shadow-[0_10px_36px_rgba(15,18,24,0.12)]"
          : "border-line-dark bg-white/90 opacity-85 hover:border-accent/25 hover:opacity-100"
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
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/8">
            <motion.span
              className="block h-full origin-left bg-accent"
              style={{ scaleX: progress }}
            />
          </span>
        )}
      </span>
    </motion.button>
  );
}

function PillarPanel({
  service,
  onPage,
  reduced,
}: {
  service: Service;
  onPage: boolean;
  reduced: boolean;
}) {
  return (
    <motion.article
      id={service.id}
      role="tabpanel"
      variants={reduced ? undefined : servicePanelReveal}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "visible"}
      exit={reduced ? undefined : "exit"}
      transition={{ duration: 0.45, ease: easeOut }}
      className="scroll-mt-28 overflow-hidden rounded-box-lg border border-line-dark/60 shadow-[0_24px_72px_rgba(15,18,24,0.2)]"
    >
      <ServicePhotoBackdrop
        service={service}
        imageKey={service.id}
        minHeightClass="min-h-[min(560px,82vh)]"
        sizes="(max-width: 1024px) 100vw, 70vw"
      >
        <ServiceOverlayContent
          service={service}
          variant="panel"
          animateKey={service.id}
          onPage={onPage}
        />
      </ServicePhotoBackdrop>
    </motion.article>
  );
}

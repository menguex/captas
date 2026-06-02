"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { getPillarIcon } from "@/components/icons";
import { estudioOrbitNodes, estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SQUAD_CYCLE_MS } from "@/lib/estudio-motion";
import { easeOut, viewportOnce } from "@/lib/motion";

function CraftTicker() {
  const reduced = useReducedMotion();
  const items = [...estudioUnion.crafts, "→", estudioUnion.result];

  if (reduced) {
    return (
      <p className="truncate text-center font-mono text-[0.58rem] uppercase tracking-[0.16em] text-on-ink-muted">
        {estudioUnion.crafts.join(" · ")} → {estudioUnion.result}
      </p>
    );
  }

  return (
    <div className="relative h-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-soft to-transparent" />
      <motion.div
        className="flex w-max items-center gap-5 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.18em] text-on-ink-muted"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="inline-flex items-center gap-5">
            {items.map((item, i) =>
              item === estudioUnion.result ? (
                <span
                  key={`${dup}-${i}`}
                  className="rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-sky"
                >
                  {item}
                </span>
              ) : item === "→" ? (
                <span key={`${dup}-${i}`} className="text-accent/50">
                  →
                </span>
              ) : (
                <span key={`${dup}-${i}`}>{item}</span>
              )
            )}
            <span className="text-bone/15">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function EstudioSquadHub() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeNode = estudioOrbitNodes[activeIndex];

  const select = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % estudioOrbitNodes.length);
    }, SQUAD_CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <motion.div
      id="squad"
      className="scroll-mt-28"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: easeOut }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-label="Crafts del squad — selecciona para ver el aporte de cada uno"
    >
      <div className="gloss-card relative overflow-hidden rounded-box-lg border border-line bg-ink-soft/95 shadow-[0_32px_100px_rgba(0,0,0,0.4)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
          aria-hidden
        />

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Director + detalle activo */}
          <div className="border-b border-line/60 p-6 md:p-8 lg:border-b-0 lg:border-r lg:border-line/60">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-sky">
              Un director · un hilo
            </p>
            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="rounded-full border border-bone/15 bg-ink/80 px-5 py-4 backdrop-blur-md">
                <CaptasLockup tone="on-dark" label="Proyecto" />
              </div>
              <div className="hidden h-12 w-px bg-line/70 sm:block" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                  className="min-w-0 flex-1"
                >
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-on-ink-subtle">
                    + {activeNode.label}
                  </p>
                  <p className="mt-1 font-heading text-h3 font-medium tracking-tight text-bone md:text-h2">
                    {activeNode.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 border-t border-line/50 pt-5">
              <CraftTicker />
            </div>
          </div>

          {/* Grid de crafts */}
          <div className="p-5 md:p-6">
            <p className="mb-4 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-on-ink-subtle">
              Activa solo lo que tu proyecto necesita
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
              {estudioOrbitNodes.map((node, i) => {
                const on = activeIndex === i;
                const Icon = node.pillarId ? getPillarIcon(node.pillarId) : null;
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      className={`group relative flex w-full flex-col items-start gap-2 rounded-box border px-3.5 py-3.5 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-sky ${
                        on
                          ? "border-sky/50 bg-accent/20 shadow-[0_0_32px_rgba(0,122,255,0.18)]"
                          : "border-bone/10 bg-white/[0.03] hover:border-bone/25 hover:bg-white/[0.06]"
                      }`}
                      aria-pressed={on}
                      aria-label={`${node.label}: ${node.tagline}`}
                    >
                      {on ? (
                        <motion.span
                          layoutId="estudio-craft-glow"
                          className="pointer-events-none absolute inset-0 rounded-box bg-gradient-to-br from-accent/15 to-transparent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${
                          on
                            ? "border-sky/40 bg-accent/25 text-sky"
                            : "border-bone/15 bg-ink/60 text-on-ink-muted group-hover:text-bone"
                        }`}
                      >
                        {Icon ? <Icon size={16} /> : null}
                      </span>
                      <span
                        className={`relative font-mono text-[0.62rem] uppercase tracking-[0.12em] ${
                          on ? "text-bone" : "text-on-ink-muted"
                        }`}
                      >
                        {node.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.14em] text-on-ink-muted lg:text-left">
              {paused ? "Pausado" : "Recorre los crafts"} · {estudioOrbitNodes.length} disciplinas ·
              coordinadas por Captas
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

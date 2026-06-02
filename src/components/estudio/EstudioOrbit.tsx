"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { getPillarIcon } from "@/components/icons";
import { estudioOrbitNodes } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 148;
const OUTER_R = RADIUS + 22;
const CYCLE_MS = 3200;

function polar(angleDeg: number, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function EstudioOrbit() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeNode = estudioOrbitNodes[activeIndex];
  const activePos = polar(activeNode.angle);

  const setActiveById = useCallback((id: string) => {
    const i = estudioOrbitNodes.findIndex((n) => n.id === id);
    if (i >= 0) setActiveIndex(i);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % estudioOrbitNodes.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(100%,32rem)] lg:max-w-none"
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: easeOut }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Red creativa — profesionales conectados a tu proyecto"
    >
      <div className="relative aspect-square w-full">
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(91,97,255,0.2),transparent_65%)]"
          aria-hidden
        />
        {!reduced ? (
          <motion.div
            className="pointer-events-none absolute inset-[12%] rounded-full border border-accent/20"
            animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        ) : null}

        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="estudio-orbit-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5b61ff" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <filter id="estudio-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            animate={reduced || paused ? undefined : { rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 10"
            />
          </motion.g>

          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            animate={reduced || paused ? undefined : { rotate: -360 }}
            transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={OUTER_R}
              fill="none"
              stroke="rgba(0,122,255,0.15)"
              strokeWidth="1"
              strokeDasharray="2 14"
            />
          </motion.g>

          {estudioOrbitNodes.map((node, i) => {
            const { x, y } = polar(node.angle);
            const isActive = activeNode.id === node.id;
            return (
              <motion.line
                key={node.id}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={isActive ? "url(#estudio-orbit-active)" : "rgba(0,122,255,0.22)"}
                strokeWidth={isActive ? 2.5 : 1}
                filter={isActive ? "url(#estudio-glow)" : undefined}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.7, ease: easeOut }}
                animate={
                  isActive && !reduced
                    ? { opacity: [0.7, 1, 0.7] }
                    : { opacity: 1 }
                }
              />
            );
          })}

          <AnimatePresence>
            {!reduced && !paused ? (
              <motion.circle
                key={activeNode.id}
                r={5}
                fill="#0ea5e9"
                filter="url(#estudio-glow)"
                initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                animate={{
                  cx: [CENTER, activePos.x, CENTER],
                  cy: [CENTER, activePos.y, CENTER],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </AnimatePresence>
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="gloss-card flex flex-col items-center gap-2 rounded-full border border-bone/20 bg-ink/80 px-6 py-5 backdrop-blur-xl"
            animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <CaptasLockup tone="on-dark" label="Hilo director" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeNode.id}
                className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                + {activeNode.label}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {estudioOrbitNodes.map((node, i) => {
          const { x, y } = polar(node.angle);
          const isActive = activeNode.id === node.id;
          const Icon = node.pillarId ? getPillarIcon(node.pillarId) : null;

          return (
            <motion.button
              key={node.id}
              type="button"
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
              onFocus={() => setActiveById(node.id)}
              onMouseEnter={() => setActiveById(node.id)}
              onClick={() => setActiveById(node.id)}
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{
                delay: 0.15 + i * 0.06,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              animate={
                isActive
                  ? { scale: 1.14, y: -2 }
                  : { scale: 1, y: 0 }
              }
            >
              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] backdrop-blur-md transition-shadow ${
                  isActive
                    ? "border-sky/60 bg-accent/35 text-bone shadow-[0_0_28px_rgba(var(--c-accent-rgb),0.45)]"
                    : "border-bone/20 bg-ink/80 text-on-ink-muted"
                }`}
              >
                {Icon ? (
                  <Icon size={14} className={isActive ? "text-sky" : "text-on-ink-muted"} />
                ) : null}
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          className="gloss-card glass-panel relative mt-8 overflow-hidden rounded-box-lg border border-line px-5 py-4 text-center md:px-6"
          initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            aria-hidden
          />
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-sky">
            Se suma al proyecto
          </p>
          <p className="mt-1 font-heading text-h3 text-bone">{activeNode.label}</p>
          <p className="mt-1 text-small text-on-ink-muted">{activeNode.tagline}</p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-on-ink-muted">
        {paused ? "Squad en pausa" : "Rotación automática"} · toca un craft
      </p>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { estudioOrbitNodes } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 118;

function polar(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

export function EstudioOrbit() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(100%,22rem)]"
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeOut }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setActive(null);
      }}
      aria-label="Red creativa Captas — disciplinas conectadas"
    >
      <div className="relative aspect-square w-full">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            animate={reduced || paused ? undefined : { rotate: 360 }}
            transition={
              reduced
                ? undefined
                : { duration: 56, repeat: Infinity, ease: "linear" }
            }
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
          </motion.g>

          {estudioOrbitNodes.map((node, i) => {
            const { x, y } = polar(node.angle);
            const isActive = active === node.id;
            return (
              <motion.line
                key={node.id}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={isActive ? "url(#orbit-active)" : "rgba(0,122,255,0.28)"}
                strokeWidth={isActive ? 2 : 1}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={
                  reduced ? undefined : { pathLength: 1, opacity: 1 }
                }
                viewport={viewportOnce}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.65, ease: easeOut }}
              />
            );
          })}
          <defs>
            <linearGradient id="orbit-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5b61ff" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <CaptasLockup tone="on-dark" label="Hilo director" />
        </div>

        {estudioOrbitNodes.map((node, i) => {
          const { x, y } = polar(node.angle);
          const isActive = active === node.id;
          const left = `${(x / SIZE) * 100}%`;
          const top = `${(y / SIZE) * 100}%`;

          return (
            <motion.button
              key={node.id}
              type="button"
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              style={{ left, top }}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
              onMouseEnter={() => setActive(node.id)}
              onClick={() => setActive(node.id)}
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.22 + i * 0.07, duration: 0.45, ease: easeOut }}
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
            >
              <span
                className={`block rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] backdrop-blur-md transition-shadow ${
                  isActive
                    ? "border-sky/50 bg-accent/30 text-bone shadow-[0_0_20px_rgba(var(--c-accent-rgb),0.4)]"
                    : "border-bone/20 bg-ink/75 text-on-ink-muted"
                }`}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-on-ink-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.45 }}
      >
        {paused ? "Red en pausa" : "Pasa el cursor"} · un director, varios craft
      </motion.p>
    </motion.div>
  );
}

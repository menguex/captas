"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { getPillarIcon } from "@/components/icons";
import { estudioOrbitNodes, estudioUnion } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  SQUAD_CYCLE_MS,
  springSnappy,
  springSpotlight,
  springSmooth,
} from "@/lib/estudio-motion";
import { easeOut, viewportOnce } from "@/lib/motion";

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 124;
const CIRC = 2 * Math.PI * RADIUS;

function polar(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

function Ticker() {
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink-soft to-transparent" />
      <motion.div
        className="flex w-max items-center gap-5 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.18em] text-on-ink-muted"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
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
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  const activeNode = estudioOrbitNodes[activeIndex];
  const activePos = polar(activeNode.angle);

  const select = useCallback(
    (index: number) => {
      setActiveIndex(index);
      progress.set(0);
    },
    [progress]
  );

  useMotionValueEvent(progress, "change", (v) => {
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(CIRC * (1 - v));
    }
  });

  useEffect(() => {
    if (reduced || paused) return;
    let cancelled = false;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: SQUAD_CYCLE_MS / 1000,
      ease: "linear",
      onComplete: () => {
        if (!cancelled) {
          setActiveIndex((i) => (i + 1) % estudioOrbitNodes.length);
        }
      },
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [activeIndex, reduced, paused, progress]);

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".squad-ring-idle", {
        rotate: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(".squad-ring-idle", {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <LayoutGroup id="estudio-squad">
      <motion.div
        ref={rootRef}
        className="relative mx-auto w-full max-w-[min(100%,24rem)] lg:max-w-[26rem]"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.75, ease: easeOut }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        aria-label="Squad creativo — profesionales unidos en tu proyecto"
      >
        <div className="gloss-card relative overflow-hidden rounded-box-lg border border-line bg-ink-soft/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            aria-hidden
          />

          <div className="relative mx-auto aspect-square w-full max-w-[280px]">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="squad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5b61ff" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="squad-glow">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g className="squad-ring-idle" style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}>
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS + 14}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="2 12"
                />
              </g>

              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <circle
                ref={ringRef}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="url(#squad-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={{ filter: "url(#squad-glow)" }}
              />

              {estudioOrbitNodes.map((node) => {
                const { x, y } = polar(node.angle);
                const on = activeNode.id === node.id;
                return (
                  <motion.line
                    key={node.id}
                    x1={CENTER}
                    y1={CENTER}
                    x2={x}
                    y2={y}
                    stroke={on ? "url(#squad-grad)" : "rgba(0,122,255,0.18)"}
                    strokeWidth={on ? 2 : 1}
                    animate={{ opacity: on ? 1 : 0.45 }}
                    transition={{ duration: 0.25 }}
                  />
                );
              })}

              {!reduced && !paused ? (
                <circle r="4" fill="#0ea5e9" filter="url(#squad-glow)">
                  <animateMotion
                    key={activeNode.id}
                    dur="1.1s"
                    repeatCount="indefinite"
                    path={`M ${CENTER},${CENTER} L ${activePos.x},${activePos.y}`}
                  />
                </circle>
              ) : null}
            </svg>

            {!reduced ? (
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{ rotate: activeNode.angle }}
                transition={springSpotlight}
                aria-hidden
              >
                <div
                  className="absolute left-1/2 top-1/2 h-[52%] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-sky/80 via-accent/40 to-transparent"
                  style={{ transform: "translateX(-50%)" }}
                />
              </motion.div>
            ) : null}

            <div className="absolute left-1/2 top-1/2 z-10 w-[min(72%,11rem)] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="flex flex-col items-center rounded-full border border-bone/15 bg-ink/90 px-4 py-3.5 text-center backdrop-blur-xl"
                layout
                transition={springSmooth}
              >
                <CaptasLockup tone="on-dark" label="Proyecto" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeNode.id}
                    className="mt-1.5 block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-sky"
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{ duration: 0.22 }}
                  >
                    + {activeNode.label}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            {estudioOrbitNodes.map((node, i) => {
              const { x, y } = polar(node.angle);
              const on = activeNode.id === node.id;
              const Icon = node.pillarId ? getPillarIcon(node.pillarId) : null;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-sky"
                  style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                  animate={{ scale: on ? 1.12 : 1 }}
                  transition={springSnappy}
                  aria-pressed={on}
                  aria-label={`${node.label}: ${node.tagline}`}
                >
                  {on ? (
                    <motion.span
                      layoutId="squad-node-glow"
                      className="absolute inset-[-6px] rounded-full bg-accent/25 blur-md"
                      transition={springSnappy}
                    />
                  ) : null}
                  <span
                    className={`relative flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] backdrop-blur-md ${
                      on
                        ? "border-sky/55 bg-accent/40 text-bone shadow-[0_0_20px_rgba(var(--c-accent-rgb),0.4)]"
                        : "border-bone/15 bg-ink/85 text-on-ink-muted"
                    }`}
                  >
                    {Icon ? <Icon size={12} className={on ? "text-sky" : ""} /> : null}
                    <span className="hidden sm:inline">{node.label}</span>
                    <span className="sm:hidden">{node.label.slice(0, 3)}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              className="relative mt-3 border-t border-line/60 pt-3 text-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: easeOut }}
            >
              <p className="font-heading text-small font-medium text-bone">{activeNode.tagline}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 border-t border-line/40 pt-3">
            <Ticker />
          </div>
        </div>

        <p className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.14em] text-on-ink-muted">
          {paused ? "Pausa" : "Auto"} · {estudioOrbitNodes.length} crafts · un director
        </p>
      </motion.div>
    </LayoutGroup>
  );
}

"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { dispatchIntroComplete } from "@/hooks/useIntroReady";
import { runAppPreload } from "@/lib/preload";

const VISITED_KEY = "captas-visited";
const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

const ease = [0.16, 1, 0.3, 1] as const;
const easeOut = [0.76, 0, 0.24, 1] as const;

function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function hideStaticPreload() {
  const shell = document.getElementById("captas-preload");
  if (shell) shell.style.display = "none";
}

function markAppReady() {
  document.body.classList.remove("captas-loading");
  document.body.classList.add("captas-ready");
  hideStaticPreload();
  dispatchIntroComplete();
}

export function IntroLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("Iniciando estudio");
  const finishedRef = useRef(false);
  const preloadStartedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(VISITED_KEY, "1");
    } catch {
      /* sessionStorage blocked */
    }
    markAppReady();
    setVisible(false);
    document.body.style.overflow = "";
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
    resetScroll();

    let visited = false;
    try {
      visited = !!sessionStorage.getItem(VISITED_KEY);
    } catch {
      visited = false;
    }

    if (visited || reduced) {
      markAppReady();
      return;
    }

    hideStaticPreload();
    setVisible(true);
    document.body.classList.add("captas-loading");
    document.body.style.overflow = "hidden";

    if (preloadStartedRef.current) return;
    preloadStartedRef.current = true;

    let cancelled = false;

    runAppPreload((update) => {
      if (cancelled) return;
      setProgress(update.progress);
      setStageLabel(update.stageLabel);
    })
      .then(() => {
        if (!cancelled) finish();
      })
      .catch(() => {
        if (!cancelled) finish();
      });

    const safety = window.setTimeout(finish, 10500);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [reduced, finish]);

  if (!mounted) return null;

  const ringOffset = RING_C * (1 - progress / 100);

  return (
    <AnimatePresence
      onExitComplete={() => {
        resetScroll();
        document.body.style.overflow = "";
        dispatchIntroComplete();
      }}
    >
      {visible && (
        <motion.div
          className="intro-loader fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.72, ease }}
          aria-busy="true"
          aria-label="Cargando Captas"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-5 z-20 rounded-full border border-bone/20 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-on-ink-muted transition-colors hover:border-sky/40 hover:text-sky"
          >
            Saltar
          </button>

          <div className="pointer-events-none absolute inset-0 intro-loader__ambient" aria-hidden />
          <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.07]" aria-hidden />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.75, ease: easeOut }}
          >
            <div className="relative flex h-[8.75rem] w-[8.75rem] items-center justify-center">
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 120 120"
                aria-hidden
              >
                <defs>
                  <linearGradient id="intro-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b61ff" />
                    <stop offset="50%" stopColor="#007aff" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r={RING_R}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={RING_R}
                  fill="none"
                  stroke="url(#intro-ring-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={ringOffset}
                  className="intro-loader__ring-glow"
                />
              </svg>

              <motion.div
                className="relative z-10 overflow-hidden rounded-full shadow-[0_0_40px_rgba(0,122,255,0.35)] ring-1 ring-white/15"
                initial={{ scale: 0.72, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.85, ease, delay: 0.08 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,210,255,0.35),transparent_55%)]"
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
                <Image
                  src="/brand/captas-icon.png"
                  alt=""
                  width={72}
                  height={72}
                  className="relative block h-[4.5rem] w-[4.5rem]"
                  priority
                />
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7, ease }}
            >
              <p className="font-heading text-[clamp(2.35rem,9vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] text-bone">
                CAPTAS
                <span className="intro-loader-dot">.</span>
              </p>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-on-ink-muted">
                Agencia creativa · Limarí
              </p>
            </motion.div>

            <motion.div
              className="mt-9 w-[min(14rem,78vw)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.55, ease }}
            >
              <div className="flex items-center justify-between gap-3 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-on-ink-subtle">
                <span className="truncate">{stageLabel}</span>
                <span className="shrink-0 tabular-nums text-sky/90">{progress}%</span>
              </div>
              <div className="mt-2.5 h-px overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="intro-loader__bar h-full origin-left rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] shadow-[0_0_14px_rgba(var(--c-accent-rgb),0.45)]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

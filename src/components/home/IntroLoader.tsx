"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { dispatchIntroComplete } from "@/hooks/useIntroReady";
import { INTRO_DURATION_MS, runAppPreload } from "@/lib/preload";

const VISITED_KEY = "captas-visited";

const ease = [0.16, 1, 0.3, 1] as const;
const easeOut = [0.76, 0, 0.24, 1] as const;

function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function markAppReady() {
  document.body.classList.remove("captas-loading");
  document.body.classList.add("captas-ready");
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

    const safety = window.setTimeout(finish, INTRO_DURATION_MS + 800);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [reduced, finish]);

  if (!mounted) return null;

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
          className="intro-loader fixed inset-0 z-[10000] flex flex-col overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
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

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <CaptasLogo as="p" size="loader" withMark gradient />
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-on-ink-muted">
                Agencia creativa · Limarí
              </p>
            </motion.div>
          </div>

          <motion.div
            className="intro-loader__bar-shell relative z-10 px-6 pb-10 md:px-10 md:pb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            <div className="mx-auto w-full max-w-xl">
              <div className="flex items-center justify-between gap-4 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-on-ink-subtle">
                <span className="truncate">{stageLabel}</span>
                <span className="shrink-0 tabular-nums text-sky/90">{progress}%</span>
              </div>
              <div className="intro-loader__bar-track mt-3" aria-hidden>
                <motion.div
                  className="intro-loader__bar-fill"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

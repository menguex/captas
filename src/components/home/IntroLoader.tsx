"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { dispatchIntroComplete } from "@/hooks/useIntroReady";

const VISITED_KEY = "captas-visited";

function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function markAppReady() {
  document.body.classList.add("captas-ready");
  dispatchIntroComplete();
}

export function IntroLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionStorage.setItem(VISITED_KEY, "1");
    markAppReady();
    setVisible(false);
  };

  useEffect(() => {
    setMounted(true);
    resetScroll();

    const visited = sessionStorage.getItem(VISITED_KEY);
    if (visited || reduced) {
      markAppReady();
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 28);

    const safety = setTimeout(finish, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (!visible || progress < 100) return;
    const timer = setTimeout(finish, 300);
    return () => clearTimeout(timer);
  }, [progress, visible]);

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
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-busy="true"
          aria-label="Cargando Captas"
        >
          <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-90" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(61,85,108,0.26),transparent_65%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-bone"
          >
            <CaptasLogo as="p" size="md" withMark />
          </motion.div>

          <motion.div
            className="relative mt-10 w-[min(12rem,52vw)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <div className="h-px overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent via-sky to-accent shadow-[0_0_12px_var(--c-accent-glow)] transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center font-mono text-kicker tabular-nums text-sky">
              {progress.toString().padStart(3, "0")}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

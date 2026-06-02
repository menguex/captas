"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTRO_EVENT = "captas-intro-complete";

export function useIntroReady() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }

    const visited = sessionStorage.getItem("captas-visited");
    if (visited) {
      const timer = window.setTimeout(() => setReady(true), 80);
      return () => window.clearTimeout(timer);
    }

    const onComplete = () => setReady(true);
    window.addEventListener(INTRO_EVENT, onComplete);
    return () => window.removeEventListener(INTRO_EVENT, onComplete);
  }, [reduced]);

  return ready;
}

export function dispatchIntroComplete() {
  window.dispatchEvent(new CustomEvent(INTRO_EVENT));
}

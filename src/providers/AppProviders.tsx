"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { LenisProvider } from "./LenisProvider";
import { IntroLoader } from "@/components/home/IntroLoader";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false }
);

const FloatingCta = dynamic(
  () => import("@/components/ui/FloatingCta").then((m) => m.FloatingCta),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("captas-visited")) {
        document.body.classList.add("captas-ready");
        document.body.classList.remove("captas-loading");
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LenisProvider>
      <ScrollToTop />
      <IntroLoader />
      <ScrollProgress />
      <FloatingCta />
      {children}
    </LenisProvider>
  );
}

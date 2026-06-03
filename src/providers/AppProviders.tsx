"use client";

import { useEffect } from "react";
import { LenisProvider } from "./LenisProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { IntroLoader } from "@/components/home/IntroLoader";
import { FloatingCta } from "@/components/ui/FloatingCta";

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
    <ThemeProvider>
      <LenisProvider>
        <ScrollToTop />
        <IntroLoader />
        <ScrollProgress />
        <FloatingCta />
        {children}
      </LenisProvider>
    </ThemeProvider>
  );
}

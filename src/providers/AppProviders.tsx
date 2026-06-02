"use client";

import { useEffect } from "react";
import { LenisProvider } from "./LenisProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { IntroLoader } from "@/components/home/IntroLoader";
import { FloatingCta } from "@/components/ui/FloatingCta";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const visited = sessionStorage.getItem("captas-visited");
    if (visited) {
      document.body.classList.add("captas-ready");
    }
  }, []);

  return (
    <ThemeProvider>
      <LenisProvider>
        <ScrollToTop />
        <IntroLoader />
        <ScrollProgress />
        <CustomCursor />
        <FloatingCta />
        {children}
      </LenisProvider>
    </ThemeProvider>
  );
}

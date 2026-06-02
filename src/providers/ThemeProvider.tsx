"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { themeColor } from "@/lib/theme";

type ThemeContextValue = {
  theme: "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme() {
  document.documentElement.setAttribute("data-theme", "dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor.dark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme();
  }, []);

  const value = useMemo(() => ({ theme: "dark" as const }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

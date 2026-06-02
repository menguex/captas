export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "captas-theme";

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? getPreferredTheme();
}

export const themeColor: Record<Theme, string> = {
  dark: "#070b12",
  light: "#f5f9ff",
};

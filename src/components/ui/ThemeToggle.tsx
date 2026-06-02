"use client";

import { useTheme } from "@/providers/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
  variant?: "header" | "menu";
};

export function ThemeToggle({ className = "", variant = "header" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const base =
    variant === "header"
      ? "theme-toggle-btn flex h-10 w-10 items-center justify-center rounded-full transition-all duration-base"
      : "theme-toggle-btn flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-base";

  const menuStyles =
    variant === "menu"
      ? "border-accent/35 bg-accent/10 text-sky hover:border-sky/55 hover:bg-accent/18"
      : "";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${base} ${menuStyles} ${className}`}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? (
        <SunIcon className="h-[1.125rem] w-[1.125rem]" />
      ) : (
        <MoonIcon className="h-[1.125rem] w-[1.125rem]" />
      )}
      <span className="sr-only">{isDark ? "Modo oscuro activo" : "Modo claro activo"}</span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  );
}

"use client";

import { motion } from "framer-motion";
import { viewportOnce, easeOut } from "@/lib/motion";

type SectionHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  theme?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
  compact?: boolean;
  children?: React.ReactNode;
};

export function SectionHeader({
  kicker,
  title,
  description,
  theme = "dark",
  className = "",
  as: Tag = "h2",
  compact = false,
  children,
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <motion.header
      className={`mx-auto max-w-3xl text-center ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.span
          className={`h-px w-12 ${isDark ? "bg-accent/55" : "bg-accent/45"}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
          style={{ transformOrigin: "center" }}
          aria-hidden
        />
        <p
          className={`font-mono text-kicker uppercase tracking-[0.24em] ${
            isDark ? "text-sky" : "text-accent-deep"
          }`}
        >
          {kicker}
        </p>
      </div>

      <Tag
        className={`font-heading text-balance leading-[1.08] ${
          compact ? "mt-4 text-h3 md:text-h2" : "mt-6 text-h2"
        } ${isDark ? "text-bone" : "text-ink"}`}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={`mx-auto mt-5 max-w-2xl text-lead leading-relaxed text-pretty ${
            isDark ? "text-on-ink-muted" : "text-clay"
          }`}
        >
          {description}
        </p>
      ) : null}

      {children ? (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {children}
        </div>
      ) : null}
    </motion.header>
  );
}

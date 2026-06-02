import type { ReactNode } from "react";

type ProListTone = "light" | "dark";

type ProListProps = {
  items: readonly string[];
  tone?: ProListTone;
  /** check = tarjeta con ✓ · dot = viñeta · inline = pills */
  variant?: "check" | "dot" | "inline";
  title?: string;
  className?: string;
  columns?: 1 | 2;
  limit?: number;
  moreLabel?: string;
};

const toneStyles = {
  light: {
    title: "text-on-light-muted",
    checkItem:
      "border-line-dark/80 bg-white/90 text-on-light-muted",
    checkMark: "bg-accent text-bone",
    dotItem: "text-on-light-muted",
    dot: "bg-accent",
    more: "border-line-dark text-accent-deep",
    pill: "border-line-dark/80 bg-white text-on-light-muted",
  },
  dark: {
    title: "text-on-ink-muted",
    checkItem:
      "border-bone/15 bg-ink/55 text-on-ink-muted backdrop-blur-sm",
    checkMark: "bg-bone text-accent-deep",
    dotItem: "text-on-ink-muted",
    dot: "bg-sky",
    more: "border-bone/20 text-sky",
    pill: "border-bone/15 bg-ink/55 text-on-ink-muted",
  },
} as const;

export function ProList({
  items,
  tone = "light",
  variant = "check",
  title,
  className = "",
  columns = 1,
  limit,
  moreLabel,
}: ProListProps) {
  const t = toneStyles[tone];
  const visible = limit != null ? items.slice(0, limit) : items;
  const rest = limit != null && items.length > limit ? items.length - limit : 0;

  if (variant === "inline") {
    return (
      <ul className={`flex flex-wrap gap-2 ${className}`} role="list">
        {visible.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-3 py-1.5 text-[0.75rem] leading-snug md:text-small ${t.pill}`}
          >
            {item}
          </li>
        ))}
        {rest > 0 ? (
          <li
            className={`rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] ${t.more}`}
          >
            {moreLabel ?? `+${rest} más`}
          </li>
        ) : null}
      </ul>
    );
  }

  const gridClass =
    columns === 2 ? "grid gap-2 sm:grid-cols-2" : variant === "dot" ? "space-y-2.5" : "grid gap-2";

  return (
    <div className={className}>
      {title ? (
        <p
          className={`mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${t.title}`}
        >
          {title}
        </p>
      ) : null}
      <ul className={gridClass} role="list">
        {visible.map((item) =>
          variant === "dot" ? (
            <li key={item} className={`flex items-start gap-2.5 text-small leading-relaxed ${t.dotItem}`}>
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} aria-hidden />
              {item}
            </li>
          ) : (
            <li
              key={item}
              className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-small leading-relaxed ${t.checkItem}`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold ${t.checkMark}`}
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export type ProStep = {
  number: string;
  title: string;
  text: string;
};

type ProStepListProps = {
  steps: readonly ProStep[];
  tone?: ProListTone;
  className?: string;
  title?: string;
};

/** Lista numerada editorial — contacto, procesos laterales */
export function ProStepList({ steps, tone = "dark", className = "", title }: ProStepListProps) {
  const isDark = tone === "dark";

  return (
    <div className={className}>
      {title ? (
        <p
          className={`font-mono text-kicker uppercase tracking-[0.16em] ${
            isDark ? "text-on-ink-muted" : "text-on-light-muted"
          }`}
        >
          {title}
        </p>
      ) : null}
      <ol className={`${title ? "mt-6" : ""} space-y-5`}>
        {steps.map((step) => (
          <li key={step.number} className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-1">
            <span
              className={`font-mono text-kicker tabular-nums leading-none tracking-[0.12em] ${
                isDark ? "text-sky" : "text-accent-deep"
              }`}
            >
              {step.number}
            </span>
            <div className="min-w-0">
              <p
                className={`font-heading text-body leading-snug tracking-tight ${
                  isDark ? "text-bone" : "text-ink"
                }`}
              >
                {step.title}
              </p>
              <p
                className={`mt-1.5 text-small leading-relaxed ${
                  isDark ? "text-on-ink-muted" : "text-on-light-muted"
                }`}
              >
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

type StatGroupProps = {
  stats: readonly { value: string; label: string }[];
  className?: string;
};

/** Métricas en fila — highlights de sección */
export function StatGroup({ stats, className = "" }: StatGroupProps) {
  return (
    <ul
      className={`flex flex-wrap items-stretch justify-center gap-3 sm:gap-4 ${className}`}
      role="list"
    >
      {stats.map((h) => (
        <li
          key={h.label}
          className="min-w-[5.5rem] rounded-box-lg border border-line-dark/80 bg-white/95 px-4 py-3 text-center shadow-[0_8px_24px_rgba(15,18,24,0.06)]"
        >
          <p className="font-heading text-h3 tabular-nums leading-none tracking-tight text-accent">
            {h.value}
          </p>
          <p className="mt-1.5 font-mono text-[0.6rem] uppercase leading-snug tracking-[0.14em] text-on-light-muted">
            {h.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

type ProEnumTitleProps = {
  children: ReactNode;
  tone?: ProListTone;
  className?: string;
};

export function ProEnumTitle({ children, tone = "light", className = "" }: ProEnumTitleProps) {
  return (
    <p
      className={`font-mono text-[0.62rem] uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-on-ink-muted" : "text-on-light-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}

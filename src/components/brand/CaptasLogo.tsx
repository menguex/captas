import Image from "next/image";

type CaptasLogoProps = {
  className?: string;
  shimmer?: boolean;
  as?: "span" | "h1" | "p";
  size?: "sm" | "md" | "xl";
  /** Muestra el icono circular de marca junto al wordmark */
  withMark?: boolean;
};

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-[clamp(2.5rem,8vw,5rem)]",
  xl: "text-[clamp(2.5rem,12vw,9rem)] leading-[0.9] tracking-tighter",
};

const markSizes = {
  sm: 28,
  md: 48,
  xl: 80,
} as const;

export function CaptasLogo({
  className = "",
  shimmer = false,
  as: Tag = "span",
  size = "sm",
  withMark = false,
}: CaptasLogoProps) {
  const gradientClass = shimmer ? "text-shimmer" : "";
  const markPx = markSizes[size];

  const wordmark = (
    <>
      CAPTAS
      <span className="text-captas-brand-gradient" aria-hidden>
        .
      </span>
    </>
  );

  return (
    <Tag
      className={`inline-flex items-center gap-2.5 md:gap-3 ${className}`.trim()}
      aria-label="Captas"
    >
      {withMark ? (
        <span
          className="relative shrink-0 overflow-hidden rounded-full shadow-[0_4px_16px_rgba(var(--c-accent-rgb),0.28)] ring-1 ring-black/5"
          aria-hidden
        >
          <Image
            src="/brand/captas-icon.png"
            alt=""
            width={markPx}
            height={markPx}
            className="block h-auto w-auto"
            priority={size !== "xl"}
          />
        </span>
      ) : null}
      <span
        className={`font-heading font-semibold tracking-tight ${sizeClasses[size]} ${gradientClass}`}
      >
        {wordmark}
      </span>
    </Tag>
  );
}

type CaptasLockupProps = {
  /** Superficie oscura (hero de pilar) o clara */
  tone?: "on-dark" | "on-light";
  label?: string;
  className?: string;
};

/** Lockup compacto — icono + texto en pill (ecosistema, badges) */
export function CaptasLockup({
  tone = "on-dark",
  label = "Ecosistema",
  className = "",
}: CaptasLockupProps) {
  const onDark = tone === "on-dark";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 pr-3 backdrop-blur-md ${
        onDark
          ? "border-bone/25 bg-ink/55"
          : "border-line-dark/80 bg-white/90 shadow-[0_4px_16px_rgba(15,18,24,0.06)]"
      } ${className}`}
    >
      <Image
        src="/brand/captas-icon.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 shrink-0 rounded-full"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-[0.7rem] font-semibold tracking-tight ${
            onDark ? "text-bone" : "text-ink"
          }`}
        >
          captas
        </span>
        <span
          className={`font-mono text-[0.5rem] uppercase tracking-[0.14em] ${
            onDark ? "text-on-ink-muted" : "text-on-light-muted"
          }`}
        >
          {label}
        </span>
      </span>
    </span>
  );
}

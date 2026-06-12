import Image from "next/image";

type CaptasLogoProps = {
  className?: string;
  shimmer?: boolean;
  /** Wordmark en gradiente de marca (icono + texto alineados a 1em) */
  gradient?: boolean;
  as?: "span" | "h1" | "p";
  size?: "sm" | "md" | "loader" | "xl";
  /** Muestra el icono circular de marca junto al wordmark — altura = cap height del texto */
  withMark?: boolean;
};

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-[clamp(2.5rem,8vw,5rem)]",
  loader: "text-[clamp(2.75rem,11vw,4.75rem)] leading-none tracking-[-0.04em]",
  xl: "text-[clamp(2.5rem,12vw,9rem)] leading-[0.9] tracking-tighter",
};

export function CaptasLogo({
  className = "",
  shimmer = false,
  gradient = false,
  as: Tag = "span",
  size = "sm",
  withMark = false,
}: CaptasLogoProps) {
  const wordmarkClass = shimmer
    ? "text-shimmer"
    : gradient
      ? "text-captas-brand-gradient"
      : "";

  const wordmark = (
    <>
      CAPTAS
      <span className={gradient || shimmer ? "" : "text-captas-brand-gradient"} aria-hidden>
        .
      </span>
    </>
  );

  return (
    <Tag
      className={`captas-logo inline-flex items-center gap-[0.34em] ${sizeClasses[size]} ${className}`.trim()}
      aria-label="Captas"
    >
      {withMark ? (
        <span
          className="captas-logo__mark relative inline-block h-[1em] w-[1em] shrink-0 overflow-hidden rounded-full shadow-[0_0_28px_rgba(0,122,255,0.32)] ring-1 ring-white/15"
          aria-hidden
        >
          <Image
            src="/brand/captas-icon.png"
            alt=""
            fill
            sizes="(max-width: 768px) 18vw, 80px"
            className="object-cover"
            priority={size === "loader" || size === "md"}
          />
        </span>
      ) : null}
      <span className={`font-heading font-semibold tracking-tight ${wordmarkClass}`}>{wordmark}</span>
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
      <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/brand/captas-icon.png"
          alt=""
          fill
          sizes="24px"
          className="object-cover"
        />
      </span>
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

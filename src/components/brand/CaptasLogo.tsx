type CaptasLogoProps = {
  className?: string;
  shimmer?: boolean;
  as?: "span" | "h1" | "p";
  size?: "sm" | "md" | "xl";
};

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-[clamp(2.5rem,8vw,5rem)]",
  xl: "text-[clamp(2.5rem,12vw,9rem)] leading-[0.9] tracking-tighter",
};

export function CaptasLogo({
  className = "",
  shimmer = false,
  as: Tag = "span",
  size = "sm",
}: CaptasLogoProps) {
  const gradientClass = shimmer ? "text-shimmer" : "";

  return (
    <Tag
      className={`font-heading font-semibold tracking-tight ${sizeClasses[size]} ${gradientClass} ${className}`.trim()}
      aria-label="Captas"
    >
      CAPTAS
      <span
        className="bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent"
        aria-hidden
      >
        .
      </span>
    </Tag>
  );
}

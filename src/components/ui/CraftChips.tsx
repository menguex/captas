type CraftChipsProps = {
  items: readonly string[];
  theme?: "dark" | "light";
  variant?: "default" | "hero";
  className?: string;
};

export function CraftChips({
  items,
  theme = "dark",
  variant = "default",
  className = "",
}: CraftChipsProps) {
  const isDark = theme === "dark";
  const isHero = variant === "hero" && isDark;

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-3 md:gap-4 ${className}`}
      role="list"
    >
      {items.map((item) => (
        <li key={item}>
          <span
            className={`site-craft-chip inline-flex items-center rounded-full border px-4 py-2.5 font-heading text-[0.9rem] font-medium leading-none tracking-[-0.02em] md:px-5 md:py-3 md:text-[0.95rem] ${
              isHero
                ? "border-white/22 bg-black/30 text-bone/92 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
                : isDark
                  ? "border-white/14 bg-white/[0.07] text-bone/88 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                  : "border-ink/12 bg-ink/[0.04] text-ink/85"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

import { getPillarIcon } from "@/components/icons";
import type { PillarTheme, Service } from "@/content/services";

type PillarIconBadgeProps = {
  serviceId: Service["id"];
  theme?: PillarTheme;
  size?: "sm" | "md" | "lg";
  featured?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: 20 },
  md: { box: "h-12 w-12", icon: 24 },
  lg: { box: "h-16 w-16", icon: 32 },
} as const;

export function PillarIconBadge({
  serviceId,
  theme,
  size = "md",
  featured = false,
  className = "",
}: PillarIconBadgeProps) {
  const Icon = getPillarIcon(serviceId);
  const { box, icon } = sizeMap[size];
  const accent = theme?.accent ?? "#3d556c";
  const soft = theme?.soft ?? "rgba(61,85,108,0.1)";

  if (!Icon) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] ${box} ${className}`}
      style={{
        borderColor: `${accent}44`,
        background: theme?.border ?? `linear-gradient(135deg, ${soft}, rgba(255,255,255,0.9))`,
        boxShadow: featured
          ? `0 8px 24px ${theme?.glow ?? "rgba(61,85,108,0.12)"}, inset 0 1px 0 rgba(255,255,255,0.65)`
          : undefined,
        color: accent,
      }}
      aria-hidden
    >
      <Icon size={icon} />
    </span>
  );
}

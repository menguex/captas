import { getPillarIcon } from "@/components/icons";
import type { Service } from "@/content/services";

type PillarIconBadgeProps = {
  serviceId: Service["id"];
  size?: "sm" | "md" | "lg";
  featured?: boolean;
  /** Sobre foto de fondo oscura */
  onDark?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: 20 },
  md: { box: "h-12 w-12", icon: 24 },
  lg: { box: "h-16 w-16", icon: 32 },
} as const;

export function PillarIconBadge({
  serviceId,
  size = "md",
  featured = false,
  onDark = false,
  className = "",
}: PillarIconBadgeProps) {
  const Icon = getPillarIcon(serviceId);
  const { box, icon } = sizeMap[size];

  if (!Icon) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl border backdrop-blur-sm ${
        onDark
          ? "border-bone/25 bg-bone/10 text-bone"
          : "border-line-dark bg-bone text-accent"
      } ${featured ? "shadow-[0_8px_24px_rgba(15,18,24,0.2)]" : ""} ${box} ${className}`}
      aria-hidden
    >
      <Icon size={icon} />
    </span>
  );
}

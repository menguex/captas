import type { IconProps } from "./types";
import { iconDefaults } from "./types";

export function VideoIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      {...iconDefaults}
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M16 9.5l6-3.5v12l-6-3.5V9.5z" />
      <path d="M6 9h6M6 12h4" />
    </svg>
  );
}

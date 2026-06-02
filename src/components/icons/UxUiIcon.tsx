import type { IconProps } from "./types";
import { iconDefaults } from "./types";

export function UxUiIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      {...iconDefaults}
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="8" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="11" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <path d="M8 13.5h8M8 16.5h5" />
    </svg>
  );
}

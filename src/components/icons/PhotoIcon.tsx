import type { IconProps } from "./types";
import { iconDefaults } from "./types";

export function PhotoIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      {...iconDefaults}
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M8 7.5l1.5-1.5a1 1 0 0 1 1.4 0L16 11" />
    </svg>
  );
}

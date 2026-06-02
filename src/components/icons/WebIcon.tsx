import type { IconProps } from "./types";
import { iconDefaults } from "./types";

export function WebIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      {...iconDefaults}
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
      <path d="M4 10h16" />
      <path d="M8 14l-2 4M12 14v4M16 14l2 4" />
    </svg>
  );
}

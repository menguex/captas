import type { IconProps } from "./types";
import { iconDefaults } from "./types";

export function BrandingIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      {...iconDefaults}
      width={size}
      height={size}
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.8L12 16.6 6.4 20.6l2.1-6.8L3 9.8h6.8L12 3z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

type SectionBridgeProps = {
  /** Transición visual entre bloques del home */
  variant?: "dark-continue" | "dark-to-light";
};

export function SectionBridge({ variant = "dark-continue" }: SectionBridgeProps) {
  if (variant === "dark-to-light") {
    return (
      <div
        className="home-section-bridge home-section-bridge--to-light pointer-events-none relative z-[2] -mt-px h-24 md:h-32"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="home-section-bridge home-section-bridge--dark pointer-events-none relative z-[2] -mt-px h-16 md:h-20"
      aria-hidden
    />
  );
}

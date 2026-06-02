export type HeroMarqueeSegment = {
  id: string;
  label: string;
  /** Alternating tones — primary (accent) vs secondary (muted) */
  tone: "primary" | "secondary";
};

export const heroMarqueeSegments: HeroMarqueeSegment[] = [
  { id: "ux-ui", label: "UX/UI", tone: "primary" },
  { id: "motion", label: "Motion", tone: "secondary" },
  { id: "branding", label: "Branding", tone: "primary" },
  { id: "foto", label: "Foto", tone: "secondary" },
  { id: "cine", label: "Cine", tone: "primary" },
  { id: "web", label: "Web", tone: "secondary" },
];

export function buildMarqueeMeasureText(segments: HeroMarqueeSegment[]) {
  return (
    segments.map((s) => `\u2002\u2002${s.label}`).join(" \u00B7 ") + " \u00B7 \u00A0"
  );
}

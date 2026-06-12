import { heroContent } from "@/content/hero";

export function heroVideoSrc(): string {
  return `${heroContent.backgroundVideo}?v=${heroContent.backgroundMediaVersion}`;
}

export function heroPosterSrc(): string {
  return `${heroContent.backgroundPoster}?v=${heroContent.backgroundMediaVersion}`;
}

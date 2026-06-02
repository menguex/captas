import type { ComponentType } from "react";
import type { IconProps } from "./types";
import { BrandingIcon } from "./BrandingIcon";
import { PhotoIcon } from "./PhotoIcon";
import { UxUiIcon } from "./UxUiIcon";
import { VideoIcon } from "./VideoIcon";
import { WebIcon } from "./WebIcon";

export type PillarId =
  | "ux-ui"
  | "fotografia"
  | "diseno-web"
  | "video-cinematografico"
  | "branding";

export const pillarIconMap: Record<
  PillarId,
  ComponentType<IconProps>
> = {
  "ux-ui": UxUiIcon,
  fotografia: PhotoIcon,
  "diseno-web": WebIcon,
  "video-cinematografico": VideoIcon,
  branding: BrandingIcon,
};

export function getPillarIcon(id: string): ComponentType<IconProps> | null {
  if (id in pillarIconMap) {
    return pillarIconMap[id as PillarId];
  }
  return null;
}

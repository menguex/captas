"use client";

import Image from "next/image";
import type { Service } from "@/content/services";

type ServicePhotoBackdropProps = {
  service: Pick<Service, "image" | "imageAlt">;
  children: React.ReactNode;
  className?: string;
  minHeightClass?: string;
  priority?: boolean;
  sizes?: string;
};

/** Foto a pantalla completa + scrim para texto legible */
export function ServicePhotoBackdrop({
  service,
  children,
  className = "",
  minHeightClass = "min-h-[min(420px,72vh)]",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 66vw",
}: ServicePhotoBackdropProps) {
  return (
    <div className={`group/photo relative overflow-hidden ${minHeightClass} ${className}`}>
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-slow group-hover/photo:scale-[1.04]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/94 via-ink/55 to-ink/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,transparent_0%,rgba(15,18,24,0.35)_100%)]"
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

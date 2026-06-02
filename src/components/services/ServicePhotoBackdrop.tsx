"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/content/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { serviceImageReveal } from "@/lib/motion";

type ServicePhotoBackdropProps = {
  service: Pick<Service, "image" | "imageAlt" | "id">;
  children: React.ReactNode;
  className?: string;
  minHeightClass?: string;
  priority?: boolean;
  sizes?: string;
  /** Cambia la foto con crossfade (explorer) */
  imageKey?: string;
};

export function ServicePhotoBackdrop({
  service,
  children,
  className = "",
  minHeightClass = "min-h-[min(420px,72vh)]",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 66vw",
  imageKey,
}: ServicePhotoBackdropProps) {
  const reduced = useReducedMotion();
  const key = imageKey ?? service.id;

  return (
    <div
      className={`group/photo relative isolate overflow-hidden ${minHeightClass} ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={key}
          className="absolute inset-0"
          variants={serviceImageReveal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${reduced ? "" : "transition-transform duration-[1.2s] ease-out group-hover/photo:scale-[1.05]"}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Foto visible arriba */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-transparent"
        aria-hidden
      />
      {/* Legibilidad en zona de contenido */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-ink from-0% via-ink/92 via-[45%] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(15,18,24,0.5)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col">{children}</div>
    </div>
  );
}

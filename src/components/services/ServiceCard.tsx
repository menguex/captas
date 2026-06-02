"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/content/services";
import { ServicePhotoBackdrop } from "@/components/services/ServicePhotoBackdrop";
import { ServiceOverlayContent } from "@/components/services/ServiceOverlayContent";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

type ServiceCardProps = {
  service: Service;
  featured?: boolean;
  index?: number;
};

export function ServiceCard({ service, featured = false, index = 0 }: ServiceCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, delay: index * 0.07, ease: easeOut }}
      whileHover={reduced ? undefined : { y: -5, transition: { duration: 0.4, ease: easeOut } }}
      className={`group relative overflow-hidden rounded-box-lg border border-line-dark/60 shadow-[0_12px_48px_rgba(15,18,24,0.14)] transition-[box-shadow] duration-base hover:shadow-[0_28px_72px_rgba(15,18,24,0.26)] focus-within:shadow-[0_28px_72px_rgba(15,18,24,0.26)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link
        href={`/servicios#${service.id}`}
        className="relative block h-full rounded-box-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
      >
        <ServicePhotoBackdrop
          service={service}
          priority={index === 0}
          minHeightClass={
            featured ? "min-h-[min(520px,78vh)]" : "min-h-[min(420px,68vh)]"
          }
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        >
          <ServiceOverlayContent
            service={service}
            variant={featured ? "card-featured" : "card"}
            motionTrigger="view"
          />
        </ServicePhotoBackdrop>
      </Link>
    </motion.article>
  );
}

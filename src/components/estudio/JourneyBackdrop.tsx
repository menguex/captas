"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import { estudioJourneyMedia } from "@/content/estudio-media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEP_COUNT = estudioJourneyMedia.length;

function layerOpacity(progress: number, index: number) {
  const t = progress * STEP_COUNT;
  const dist = Math.abs(t - index - 0.5) * 2;
  return Math.max(0, Math.min(1, 1 - dist));
}

function layerKenBurns(progress: number, index: number) {
  const t = progress * STEP_COUNT - index;
  const scale = 1.06 + Math.min(1, Math.max(0, t + 0.15)) * 0.1;
  const y = `${-2 + t * -5}%`;
  return { scale, y };
}

type MediaLayerProps = {
  index: number;
  scrollProgress: MotionValue<number>;
  active: number;
  media: (typeof estudioJourneyMedia)[number];
};

function MediaLayer({ index, scrollProgress, active, media }: MediaLayerProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const opacity = useTransform(scrollProgress, (v) => layerOpacity(v, index));
  const scale = useTransform(scrollProgress, (v) => layerKenBurns(v, index).scale);
  const y = useTransform(scrollProgress, (v) => layerKenBurns(v, index).y);

  const showVideo = !reduced && media.video && active === index;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (showVideo) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [showVideo]);

  const isLocal = media.image.startsWith("/");

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ opacity, scale, y }}>
      <Image
        src={media.image}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
        sizes="100vw"
        priority={index === 0}
        unoptimized={isLocal}
      />
      {media.video ? (
        <video
          ref={videoRef}
          src={media.video}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(15,18,24,0.15),rgba(15,18,24,0.88)_72%)]" />
    </motion.div>
  );
}

type JourneyBackdropProps = {
  scrollProgress: MotionValue<number>;
  active: number;
};

export function JourneyBackdrop({ scrollProgress, active }: JourneyBackdropProps) {
  const media = estudioJourneyMedia[active];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {estudioJourneyMedia.map((item, i) => (
        <MediaLayer
          key={item.id}
          index={i}
          scrollProgress={scrollProgress}
          active={active}
          media={item}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/92" />

      <AnimatePresence mode="wait">
        {media.credit ? (
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45 }}
            className="absolute bottom-24 right-gutter z-[1] max-w-[14rem] text-right font-mono text-[0.52rem] uppercase tracking-[0.14em] text-bone/45 md:bottom-28"
          >
            {media.credit}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Imagen estática para modo reducido / artículos apilados */
export function JourneyStepMedia({
  stepIndex,
  className = "",
}: {
  stepIndex: number;
  className?: string;
}) {
  const media = estudioJourneyMedia[stepIndex];
  if (!media) return null;
  const isLocal = media.image.startsWith("/");

  return (
    <div
      className={`relative mb-8 aspect-[16/10] overflow-hidden rounded-box-lg border border-line/60 ${className}`}
    >
      <Image
        src={media.image}
        alt={media.imageAlt}
        fill
        className="object-cover"
        style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
        sizes="(max-width: 768px) 100vw, 720px"
        unoptimized={isLocal}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      {media.credit ? (
        <p className="absolute bottom-3 right-3 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-bone/50">
          {media.credit}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import { estudioJourneyMedia } from "@/content/estudio-media";
import { useScrollScrubVideo } from "@/hooks/useScrollScrubVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { layerKenBurns, layerOpacity } from "@/lib/estudio-scroll";

const STEP_COUNT = estudioJourneyMedia.length;

type MediaLayerProps = {
  index: number;
  scrollProgress: MotionValue<number>;
  media: (typeof estudioJourneyMedia)[number];
};

function MediaLayer({ index, scrollProgress, media }: MediaLayerProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLocal = media.image.startsWith("/");

  const opacity = useTransform(scrollProgress, (v) => layerOpacity(v, index, STEP_COUNT));
  const scale = useTransform(scrollProgress, (v) => layerKenBurns(v, index, STEP_COUNT).scale);
  const y = useTransform(scrollProgress, (v) => layerKenBurns(v, index, STEP_COUNT).y);
  const videoOpacity = useTransform(scrollProgress, (v) => {
    const o = layerOpacity(v, index, STEP_COUNT);
    return reduced ? 0 : Math.min(1, o * 1.12);
  });

  useScrollScrubVideo(videoRef, {
    scrollProgress,
    stepIndex: index,
    stepCount: STEP_COUNT,
    enabled: !reduced,
    trim: media.trim,
  });

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

      <motion.video
        ref={videoRef}
        src={media.video}
        poster={media.image}
        muted
        playsInline
        preload={index <= 1 ? "auto" : "metadata"}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: media.objectPosition ?? "50% 50%",
          opacity: videoOpacity,
        }}
        aria-hidden
      />

      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(15,18,24,0.1),rgba(15,18,24,0.9)_74%)]" />
    </motion.div>
  );
}

type JourneyBackdropProps = {
  scrollProgress: MotionValue<number>;
  active: number;
};

export function JourneyBackdrop({ scrollProgress, active }: JourneyBackdropProps) {
  const reduced = useReducedMotion();
  const media = estudioJourneyMedia[active];

  useEffect(() => {
    if (reduced) return;
    const links: HTMLLinkElement[] = [];
    estudioJourneyMedia.forEach((item, i) => {
      if (i === 0) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = item.video;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((l) => l.remove());
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {estudioJourneyMedia.map((item, i) => (
        <MediaLayer key={item.id} index={i} scrollProgress={scrollProgress} media={item} />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/90" />

      <AnimatePresence mode="wait">
        {media.credit ? (
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.88, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45 }}
            className="absolute bottom-24 right-gutter z-[1] max-w-[14rem] text-right font-mono text-[0.52rem] uppercase tracking-[0.14em] text-bone/50 md:bottom-28"
          >
            {media.credit}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Imagen estática para modo reducido */
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

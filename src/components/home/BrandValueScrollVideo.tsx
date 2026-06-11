"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { brandValueIntro } from "@/content/brand-value";

type BrandValueScrollVideoProps = {
  progress: MotionValue<number>;
  reduced?: boolean;
};

export const BrandValueScrollVideo = forwardRef<HTMLVideoElement, BrandValueScrollVideoProps>(
  function BrandValueScrollVideo({ progress, reduced = false }, ref) {
    const barScale = useTransform(progress, [0, 1], [0, 1]);
    const label = useTransform(progress, (p) => `${Math.round(p * 100)}%`);

    return (
      <div className="brand-value-scroll-video relative overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_16px_48px_rgba(15,18,24,0.14)]">
        <div className="relative aspect-[4/5] min-h-[min(300px,52vh)] w-full lg:aspect-[3/4] lg:min-h-[min(420px,72vh)]">
          <Image
            src={brandValueIntro.poster}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
            priority
          />
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: brandValueIntro.videoPosition }}
            src={brandValueIntro.video}
            poster={brandValueIntro.poster}
            muted
            playsInline
            preload="auto"
            aria-hidden={!reduced}
          />
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[#080a0f]/55" />
            <div className="absolute inset-x-0 top-0 h-12 bg-[#080a0f]/25" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-[1] p-4 md:p-5">
            <div className="flex items-end justify-between gap-3">
              <span className="rounded-full border border-bone/25 bg-ink/55 px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-bone backdrop-blur-md">
                {brandValueIntro.videoLabel}
              </span>
              {!reduced && (
                <motion.span className="font-mono text-[0.68rem] tabular-nums text-bone/80">
                  {label}
                </motion.span>
              )}
            </div>
            {!reduced && (
              <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/15">
                <motion.span
                  className="block h-full w-full origin-left rounded-full bg-accent"
                  style={{ scaleX: barScale }}
                />
              </div>
            )}
          </div>
        </div>

        {!reduced && (
          <p className="border-t border-line-dark/60 bg-white px-4 py-2.5 text-center text-[0.72rem] text-on-light-muted">
            Desplázate para recorrer el reel — sincronizado con el recorrido
          </p>
        )}
      </div>
    );
  }
);

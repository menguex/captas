"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { BrandPrinciple } from "@/content/brand-value";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";

type BrandValuePrincipleProps = {
  principle: BrandPrinciple;
  index: number;
  isEven: boolean;
};

export function BrandValuePrinciple({ principle: p, index, isEven }: BrandValuePrincipleProps) {
  const reduced = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, margin: "-15% 0px" });
  const [videoOn, setVideoOn] = useState(false);

  return (
    <motion.li
      className="relative pl-14 md:pl-0"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, ease: easeOut, delay: index * 0.06 }}
    >
      <div
        className="absolute left-[0.625rem] top-8 z-10 -translate-x-1/2 md:left-1/2"
        aria-hidden
      >
        <motion.span
          className="block h-3.5 w-3.5 rounded-full border-2 border-white bg-accent shadow-[0_0_0_4px_rgba(61,85,108,0.15)]"
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
        />
      </div>

      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 ${
          isEven ? "" : "md:[&>*:first-child]:order-2"
        }`}
      >
        <div
          ref={mediaRef}
          className={`relative ${isEven ? "md:pr-6" : "md:pl-6"}`}
          onMouseEnter={() => !reduced && setVideoOn(true)}
          onMouseLeave={() => setVideoOn(false)}
          onFocus={() => setVideoOn(true)}
          onBlur={() => setVideoOn(false)}
        >
          <div className="relative min-h-[260px] overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_12px_40px_rgba(15,18,24,0.1)] md:min-h-[340px]">
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className={`object-cover transition-opacity duration-slow ${videoOn && p.video ? "opacity-0" : "opacity-100"}`}
            />
            {p.video && inView && (videoOn || reduced) ? (
              <video
                src={p.video}
                autoPlay={videoOn}
                muted
                loop
                playsInline
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ${
                  videoOn ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!videoOn}
              />
            ) : null}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent"
              aria-hidden
            />
            <span className="absolute left-4 top-4 font-heading text-[clamp(3rem,8vw,5rem)] leading-none text-bone/20">
              {p.step}
            </span>
            {!reduced && p.video ? (
              <span className="absolute bottom-4 right-4 rounded-full border border-bone/25 bg-ink/50 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-bone backdrop-blur-md">
                {videoOn ? "Reproduciendo" : "Hover · video"}
              </span>
            ) : null}
          </div>
        </div>

        <div className={`flex flex-col justify-center ${isEven ? "md:pl-6" : "md:pr-6"}`}>
          <div className="rounded-box-lg border border-line-dark bg-white p-6 shadow-[0_8px_32px_rgba(15,18,24,0.06)] md:p-8">
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-accent">
              {p.kicker}
            </p>
            <h3 className="mt-4 font-heading text-h2 leading-[1.05] tracking-tight text-ink">
              {p.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-clay">{p.body}</p>
            <p className="mt-3 text-small leading-relaxed text-clay/95">{p.detail}</p>

            <div className="mt-5 inline-flex items-baseline gap-2.5 rounded-full border border-line-dark bg-bone/60 px-4 py-2">
              <span className="font-heading text-h3 tabular-nums text-accent">{p.outcome.value}</span>
              <span className="font-mono text-kicker uppercase tracking-[0.16em] text-clay">
                {p.outcome.label}
              </span>
            </div>

            <ul className="mt-6 space-y-2 border-t border-line-dark pt-5">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-small text-clay">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={p.serviceHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-kicker uppercase tracking-[0.14em] text-bone transition-opacity hover:opacity-90"
              >
                Ver servicio
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={p.caseHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark px-5 py-2.5 font-mono text-kicker uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent/35 hover:text-accent"
              >
                {p.caseLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

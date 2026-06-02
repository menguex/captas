"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { territoryContent } from "@/content/territory";

gsap.registerPlugin(ScrollTrigger);

export function Territory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.04 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(100vh,54rem)] overflow-hidden bg-ink py-section"
      aria-labelledby="territory-heading"
    >
      <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-50" aria-hidden />

      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={territoryContent.image}
          alt={territoryContent.imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: territoryContent.imagePosition }}
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-ink/15" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/80"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(10,10,10,0.65),transparent_55%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 px-gutter">
        <div className="mx-auto flex min-h-[min(100vh,54rem)] w-full max-w-content flex-col justify-center py-4">
          <div className="gloss-card glass-panel relative mx-auto max-w-3xl overflow-hidden px-6 py-8 text-center md:px-10 md:py-11">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5b61ff]/80 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-shimmer opacity-60"
              aria-hidden
            />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sky">
                  {territoryContent.kicker}
                </p>
                <span className="hidden h-3 w-px bg-bone/35 sm:block" aria-hidden />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone/90">
                  {territoryContent.subkicker}
                </p>
              </div>

              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-bone/20 bg-white/[0.08] px-3.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky shadow-[0_0_8px_rgba(var(--c-accent-rgb),0.8)]"
                  aria-hidden
                />
                {territoryContent.location}
              </p>

              <h2
                id="territory-heading"
                className="mt-6 font-heading text-h2 leading-[1.1] tracking-tight text-bone md:text-h1 md:leading-[1.06]"
              >
                {territoryContent.title}{" "}
                <span className="text-shimmer-dark">{territoryContent.titleAccent}</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-body leading-relaxed text-bone md:text-lead">
                {territoryContent.body}
              </p>

              <dl className="mx-auto mt-9 inline-grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-box border border-bone/15 bg-bone/10">
                {territoryContent.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="min-w-[5rem] bg-ink/40 px-4 py-3.5 text-center backdrop-blur-md sm:px-5"
                  >
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-heading text-h3 leading-none tabular-nums tracking-tight text-bone">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-sky/55 to-transparent"
        aria-hidden
      />
    </section>
  );
}

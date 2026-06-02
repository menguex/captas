"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { territoryContent } from "@/content/territory";

gsap.registerPlugin(ScrollTrigger);

const textShadow =
  "0 1px 2px rgba(0,0,0,0.45), 0 8px 32px rgba(0,0,0,0.55)";

export function Territory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.05 },
        {
          scale: 1.14,
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
      className="relative min-h-[min(100vh,52rem)] overflow-hidden bg-ink py-section"
      aria-labelledby="territory-heading"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={territoryContent.image}
          alt={territoryContent.imageAlt}
          fill
          className="object-cover object-[center_42%]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-ink/20" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/50 to-ink/90"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-ink/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_38%,rgba(10,10,10,0.72),transparent_68%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(91,97,255,0.12),transparent_45%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 px-gutter">
        <div className="mx-auto flex min-h-[min(100vh,52rem)] w-full max-w-content flex-col justify-center py-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <p
                className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sky"
                style={{ textShadow }}
              >
                {territoryContent.kicker}
              </p>
              <span className="hidden h-3 w-px bg-bone/40 sm:block" aria-hidden />
              <p
                className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone/90"
                style={{ textShadow }}
              >
                {territoryContent.subkicker}
              </p>
            </div>

            <h2
              id="territory-heading"
              className="mt-6 font-heading text-h2 leading-[1.1] tracking-tight text-bone md:text-h1 md:leading-[1.06]"
              style={{ textShadow }}
            >
              {territoryContent.title}{" "}
              <span className="text-shimmer-dark">{territoryContent.titleAccent}</span>
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-body leading-relaxed text-bone/95 md:text-lead"
              style={{ textShadow }}
            >
              {territoryContent.body}
            </p>

            <dl className="mx-auto mt-10 inline-grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-box-lg border border-bone/20 bg-bone/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {territoryContent.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="min-w-[5rem] bg-ink/55 px-4 py-4 text-center backdrop-blur-sm sm:px-5"
                >
                  <dt
                    className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky"
                    style={{ textShadow }}
                  >
                    {fact.label}
                  </dt>
                  <dd
                    className="mt-1.5 font-heading text-h3 leading-none tabular-nums tracking-tight text-bone"
                    style={{ textShadow }}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-sky/50 to-transparent"
        aria-hidden
      />
    </section>
  );
}

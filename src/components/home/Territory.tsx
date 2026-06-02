"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const territoryFacts = [
  { value: "30°36'S", label: "Latitud" },
  { value: "300+", label: "Días de sol" },
  { value: "Limarí", label: "Origen" },
] as const;

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
          scale: 1.1,
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
      className="relative bg-ink py-16 md:py-20"
      aria-labelledby="territory-heading"
    >
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85"
          alt="Paisaje del valle de Limarí al atardecer"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-ink/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/60" />
      </div>

      <div className="relative z-10 px-gutter">
        <div className="mx-auto w-full max-w-content">
          <div
            className="mx-auto max-w-3xl rounded-box-lg border border-white/10 bg-ink/75 px-5 py-7 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-md md:px-8 md:py-9"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.3)" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sky">
                Territorio
              </p>
              <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-ink-muted">
                Procedencia como ventaja — no como excusa
              </p>
            </div>

            <h2
              id="territory-heading"
              className="mt-5 text-center font-heading text-h2 leading-[1.12] tracking-tight text-bone md:text-h1 md:leading-[1.08]"
            >
              Desde el Limarí para el mundo.{" "}
              <span className="text-sky">El lugar es nuestra ventaja.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-center text-body leading-relaxed text-on-ink-muted md:text-lead">
              Filmamos y diseñamos desde Ovalle con sensibilidad territorial y estándar global — marcas
              reales, memorables y listas para exportar.
            </p>

            <dl className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 sm:gap-x-10">
              {territoryFacts.map((fact) => (
                <div key={fact.label} className="min-w-[4.5rem] text-center">
                  <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sky">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-heading text-h3 leading-none tabular-nums tracking-tight text-bone">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}

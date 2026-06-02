"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const territoryFacts = [
  { value: "30°36'S", label: "Latitud" },
  { value: "300+", label: "Días de sol al año" },
  { value: "Limarí", label: "Valle de origen" },
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
      className="relative bg-ink py-section"
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
        <div className="absolute inset-0 bg-ink/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/72 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      </div>

      <div className="relative z-10 px-gutter">
        <div className="mx-auto w-full max-w-content text-center">
          <div
            className="mx-auto max-w-3xl rounded-box-lg border border-white/10 bg-ink/72 px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-12 md:py-14"
            style={{ textShadow: "0 1px 24px rgba(0,0,0,0.35)" }}
          >
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-px w-12 bg-gradient-to-r from-transparent to-sky"
                aria-hidden
              />
              <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">
                Territorio · 003
              </p>
              <span
                className="h-px w-12 bg-gradient-to-l from-transparent to-sky"
                aria-hidden
              />
            </div>

            <p className="mx-auto mt-6 max-w-md font-mono text-small uppercase tracking-[0.16em] text-bone">
              Procedencia como ventaja — no como excusa
            </p>

            <div className="mx-auto mt-10 max-w-4xl space-y-3 md:mt-12 md:space-y-4">
              <p
                id="territory-heading"
                className="font-heading text-h1 text-bone"
              >
                Desde el Limarí para el mundo.
              </p>

              <p className="font-heading text-h2 font-medium italic leading-[1.14] text-sky">
                El lugar no es un límite —
              </p>

              <p className="font-heading text-h1 text-bone">
                es nuestra{" "}
                <span className="text-sky">ventaja.</span>
              </p>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-lead leading-relaxed text-bone">
              Filmamos, diseñamos y movemos marcas desde Ovalle. La sensibilidad
              territorial sumada al enfoque UX global es lo que hace única a
              Captas — un estudio que conoce su lugar y opera a estándar
              internacional.
            </p>

            <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-8 gap-y-4 border-t border-white/20 pt-8">
              {territoryFacts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="font-mono text-kicker uppercase tracking-[0.16em] text-sky/90">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-heading text-h3 leading-tight tracking-tight text-bone">
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

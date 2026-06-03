"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { getEstudioMedia } from "@/content/estudio-media";
import { estudioJourney, estudioJourneyIntro, estudioPrinciples } from "@/content/estudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const ease = easeOut;

function StepMedia({ stepId }: { stepId: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const media = getEstudioMedia(stepId);
  if (!media) return null;

  const isLocal = media.image.startsWith("/");

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden rounded-box-lg border border-line/80 bg-ink-soft lg:aspect-[5/4]"
    >
      <Image
        src={media.image}
        alt={media.imageAlt}
        fill
        className="object-cover transition-transform duration-700 ease-out"
        style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
        sizes="(max-width: 1024px) 100vw, 560px"
        unoptimized={isLocal}
      />
      {media.video && inView && !reduced ? (
        <video
          src={media.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      {media.credit ? (
        <p className="absolute bottom-3 left-3 right-3 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-bone/55">
          {media.credit}
        </p>
      ) : null}
    </div>
  );
}

function Chapter({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  const step = estudioJourney[index];
  const isEven = index % 2 === 1;
  const next = estudioJourney[index + 1];

  return (
    <article
      id={step.id}
      className="scroll-mt-28"
      aria-labelledby={`${step.id}-title`}
      data-estudio-chapter
    >
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
          isEven ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <StepMedia stepId={step.id} />

        <div>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-[0.7rem] tabular-nums transition-colors ${
                active
                  ? "bg-accent text-white shadow-[0_0_20px_rgba(0,122,255,0.35)]"
                  : "border border-line bg-ink-soft text-sky"
              }`}
            >
              {step.step}
            </span>
            <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">{step.kicker}</p>
          </div>

          <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-terra">
            {step.hook}
          </p>

          <h2
            id={`${step.id}-title`}
            className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-bone"
          >
            {step.title}{" "}
            <span className="text-shimmer-dark">{step.titleAccent}</span>
          </h2>

          <p className="mt-4 max-w-md text-body leading-relaxed text-on-ink-muted">{step.body}</p>

          {step.chips ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {step.chips.map((chip) => (
                <li key={chip}>
                  <span className="inline-flex rounded-full border border-bone/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-on-ink-muted">
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {next ? (
            <button
              type="button"
              onClick={() =>
                document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="mt-6 inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.14em] text-on-ink-muted transition-colors hover:text-sky"
            >
              Siguiente: {next.kicker}
              <span aria-hidden>→</span>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function EstudioJourney() {
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const chapters = document.querySelectorAll<HTMLElement>("[data-estudio-chapter]");
    const mid = window.innerHeight * 0.42;
    let best = 0;
    let bestDist = Infinity;
    chapters.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    return () => window.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  const goTo = (i: number) => {
    const id = estudioJourney[i]?.id;
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(i);
  };

  return (
    <section id="recorrido" className="scroll-mt-24 py-section" aria-labelledby="recorrido-heading">
      <div className="site-container px-gutter">
        <motion.header
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">
            {estudioJourneyIntro.kicker}
          </p>
          <h2
            id="recorrido-heading"
            className="mt-3 font-heading text-h2 font-semibold tracking-tight text-bone md:text-h1"
          >
            {estudioJourneyIntro.title}
          </h2>
          <p className="mt-4 text-body leading-relaxed text-on-ink-muted">
            {estudioJourneyIntro.description}
          </p>
        </motion.header>

        <motion.ul
          className="mx-auto mt-8 flex max-w-lg justify-between gap-2 rounded-box-lg border border-line/60 bg-ink-soft/80 p-4 md:mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          role="list"
        >
          {estudioPrinciples.map((p) => (
            <li key={p.label} className="text-center">
              <p className="font-heading text-h3 font-semibold text-bone">{p.label}</p>
              <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-on-ink-subtle">
                {p.detail}
              </p>
            </li>
          ))}
        </motion.ul>

        {/* Pestañas móvil */}
        <div
          className="sticky top-[4.25rem] z-20 -mx-gutter mt-10 border-b border-line/60 bg-ink/90 px-gutter py-3 backdrop-blur-xl lg:hidden"
          role="tablist"
          aria-label="Pasos del proceso"
        >
          <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {estudioJourney.map((step, i) => (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => goTo(i)}
                className={`shrink-0 rounded-full px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors ${
                  active === i
                    ? "bg-accent text-white"
                    : "border border-bone/15 text-on-ink-muted"
                }`}
              >
                {step.step} · {step.id === "brief" ? "Brief" : step.id === "squad" ? "Squad" : "Entrega"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-14 xl:grid-cols-[minmax(0,12.5rem)_1fr] xl:gap-16">
          {/* Rail desktop */}
          <nav
            className="sticky top-28 hidden h-fit lg:block"
            aria-label="Navegación por pasos"
          >
            <ol className="relative space-y-1 border-l border-line/60 pl-5">
              {estudioJourney.map((step, i) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={`group -ml-5 flex w-full items-start gap-3 rounded-r-full py-2.5 pl-5 pr-2 text-left transition-colors ${
                      active === i ? "bg-accent/10" : "hover:bg-white/[0.03]"
                    }`}
                    aria-current={active === i ? "step" : undefined}
                  >
                    <span
                      className={`mt-0.5 font-mono text-[0.65rem] tabular-nums ${
                        active === i ? "text-sky" : "text-on-ink-subtle"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span>
                      <span
                        className={`block font-heading text-small font-medium ${
                          active === i ? "text-bone" : "text-on-ink-muted"
                        }`}
                      >
                        {step.id === "brief"
                          ? "Brief"
                          : step.id === "squad"
                            ? "Squad"
                            : "Entrega"}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.52rem] uppercase tracking-[0.1em] text-on-ink-subtle">
                        {step.hook}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-20 md:space-y-28 lg:space-y-32">
            {estudioJourney.map((_, i) => (
              <Chapter key={estudioJourney[i].id} index={i} active={active === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

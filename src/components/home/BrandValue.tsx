"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

type Principle = {
  id: string;
  step: string;
  kicker: string;
  title: string;
  body: string;
  outcome: { value: string; label: string };
  deliverables: string[];
  theme: {
    accent: string;
    accentInk: string;
    border: string;
    soft: string;
    glow: string;
  };
  icon: React.ReactNode;
};

const principles: Principle[] = [
  {
    id: "ux",
    step: "01",
    kicker: "Principio · UX",
    title: "Claridad que guía",
    body: "Interfaces claras, flujos intuitivos y microinteracciones que llevan al usuario hacia la acción — y hacia tu marca.",
    outcome: { value: "+65%", label: "conversión promedio" },
    deliverables: [
      "Research y arquitectura de información",
      "Wireframes y prototipos validados",
      "Design system y patrones de UI",
    ],
    theme: {
      accent: "#0052cc",
      accentInk: "#003a99",
      border: "linear-gradient(135deg, #4d9fff 0%, #0052cc 50%, #002d73 100%)",
      soft: "rgba(0,82,204,0.10)",
      glow: "rgba(0,82,204,0.28)",
    },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: "motion",
    step: "02",
    kicker: "Principio · Motion",
    title: "Movimiento que comunica",
    body: "Cada transición y reveal refuerza tu mensaje. No decoramos: comunicamos valor con movimiento preciso y curado.",
    outcome: { value: "+38%", label: "retención en scroll" },
    deliverables: [
      "Sistemas de motion con propósito",
      "Microinteracciones y feedback de UI",
      "Reveals y storytelling animado",
    ],
    theme: {
      accent: "#c2410c",
      accentInk: "#7c2d12",
      border: "linear-gradient(135deg, #fb923c 0%, #c2410c 50%, #7c2d12 100%)",
      soft: "rgba(194,65,12,0.10)",
      glow: "rgba(194,65,12,0.26)",
    },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c4-9 14-9 18 0" />
        <path d="M3 12c4 9 14 9 18 0" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "marca",
    step: "03",
    kicker: "Principio · Marca",
    title: "Percepción elevada",
    body: "Fotografía, video y branding que elevan cómo se siente tu negocio. Tu audiencia entiende, en segundos, por qué elegirte.",
    outcome: { value: "+2.4×", label: "valor percibido" },
    deliverables: [
      "Identidad visual y manual de marca",
      "Dirección de arte transversal",
      "Fotografía y video cinematográfico",
    ],
    theme: {
      accent: "#4338ca",
      accentInk: "#312e81",
      border: "linear-gradient(135deg, #818cf8 0%, #4338ca 52%, #312e81 100%)",
      soft: "rgba(67,56,202,0.10)",
      glow: "rgba(67,56,202,0.26)",
    },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.39 4.84 5.34.78-3.86 3.77.91 5.32L12 14.27l-4.78 2.52.91-5.32-3.86-3.77 5.34-.78L12 2z" />
      </svg>
    ),
  },
];

export function BrandValue() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 80%"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });
  const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);
  const orbY = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="filosofia"
      className="relative overflow-hidden border-y border-line-dark bg-bone py-section text-ink"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,122,255,0.06),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.05]"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          kicker="Filosofía · Por qué Captas"
          title={
            <>
              Promovemos marcas con experiencias que generan{" "}
              <span className="text-accent">valor real.</span>
            </>
          }
          description="Tres principios articulados en un solo recorrido — del primer click a la última impresión."
        />

        {/* Meta strip — etapas 01 → 03 */}
        <motion.div
          className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-4 font-mono text-kicker uppercase tracking-[0.24em] text-clay md:gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          <span>Etapa 01</span>
          <span className="h-px w-10 bg-gradient-to-r from-clay/40 via-clay/60 to-clay/40 md:w-16" aria-hidden />
          <span>Etapa 02</span>
          <span className="h-px w-10 bg-gradient-to-r from-clay/40 via-clay/60 to-clay/40 md:w-16" aria-hidden />
          <span>Etapa 03</span>
        </motion.div>

        {/* Timeline */}
        <div ref={trackRef} className="relative mx-auto mt-14 max-w-5xl md:mt-20">
          {/* Connector rail (desktop). On mobile lives at left:1.25rem */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-[1.125rem] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            <div className="relative h-full w-px overflow-hidden bg-ink/10">
              <motion.div
                className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent via-[#c2410c] to-[#4338ca]"
                style={{ height: reduced ? "100%" : lineHeight }}
              />
            </div>
            {/* Floating orb */}
            {!reduced && (
              <motion.div
                className="absolute -left-2.5 -ml-px h-5 w-5 rounded-full md:-left-2.5"
                style={{
                  top: orbY,
                  background:
                    "radial-gradient(circle, #ffffff 0%, #ffffff 35%, rgba(255,255,255,0) 65%)",
                  boxShadow:
                    "0 0 0 1px rgba(0,82,204,0.4), 0 0 18px rgba(0,82,204,0.5)",
                }}
                aria-hidden
              />
            )}
          </div>

          <ol className="relative space-y-14 md:space-y-24">
            {principles.map((p, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.li
                  key={p.id}
                  className="relative pl-14 md:pl-0"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.85, ease: easeOut, delay: i * 0.08 }}
                >
                  {/* Step marker (the dot on the rail) */}
                  <div
                    className="absolute left-[0.625rem] top-2 z-10 -translate-x-1/2 md:left-1/2"
                    aria-hidden
                  >
                    <motion.span
                      className="block h-3.5 w-3.5 rounded-full border-2 border-white"
                      style={{ background: p.theme.border, boxShadow: `0 0 0 4px ${p.theme.soft}, 0 8px 22px ${p.theme.glow}` }}
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-20% 0px" }}
                      transition={{ duration: 0.6, ease: easeOut, delay: 0.18 }}
                    />
                  </div>

                  {/* Card — alternates left/right on desktop */}
                  <div
                    className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${
                      isEven ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Number side */}
                    <div
                      className={`relative flex items-start ${
                        isEven ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10"
                      }`}
                    >
                      <div className="relative">
                        <motion.span
                          className="font-heading leading-none tracking-tight"
                          style={{
                            fontSize: "clamp(5.5rem, 14vw, 11rem)",
                            background: p.theme.border,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }}
                          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-15% 0px" }}
                          transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
                        >
                          {p.step}
                        </motion.span>
                        <motion.span
                          className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                          style={{ background: p.theme.soft }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: easeOut, delay: 0.3 }}
                          aria-hidden
                        />
                      </div>
                    </div>

                    {/* Content side */}
                    <div
                      className={`relative ${isEven ? "md:pl-10" : "md:pr-10"}`}
                    >
                      <div
                        className="rounded-box-lg p-px"
                        style={{ background: p.theme.border }}
                      >
                        <div className="relative overflow-hidden rounded-box-lg bg-white px-6 py-7 md:px-8 md:py-9">
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                              style={{ background: p.theme.border }}
                              aria-hidden
                            >
                              {p.icon}
                            </span>
                            <span
                              className="font-mono text-kicker uppercase tracking-[0.22em]"
                              style={{ color: p.theme.accentInk }}
                            >
                              {p.kicker}
                            </span>
                          </div>

                          <h3 className="mt-5 font-heading text-h2 leading-[1.05] tracking-tight text-balance text-ink">
                            {p.title}
                          </h3>

                          <p className="mt-4 text-body leading-relaxed text-pretty text-clay">
                            {p.body}
                          </p>

                          {/* Outcome chip */}
                          <div
                            className="mt-6 inline-flex items-baseline gap-2.5 rounded-full px-4 py-2 ring-1"
                            style={{
                              background: p.theme.soft,
                              // @ts-expect-error css custom prop ring color via style
                              "--tw-ring-color": p.theme.soft,
                            }}
                          >
                            <span
                              className="font-heading text-h3 tabular-nums leading-none"
                              style={{ color: p.theme.accentInk }}
                            >
                              {p.outcome.value}
                            </span>
                            <span className="font-mono text-kicker uppercase tracking-[0.18em] text-clay">
                              {p.outcome.label}
                            </span>
                          </div>

                          {/* Deliverables */}
                          <ul className="mt-7 space-y-2 border-t border-line-dark pt-6">
                            {p.deliverables.map((d, di) => (
                              <motion.li
                                key={d}
                                className="flex items-start gap-2.5 text-small leading-relaxed text-clay"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{
                                  duration: 0.5,
                                  ease: easeOut,
                                  delay: 0.35 + di * 0.07,
                                }}
                              >
                                <span
                                  className="mt-[0.45rem] block h-1 w-1 shrink-0 rounded-full"
                                  style={{ background: p.theme.accent }}
                                  aria-hidden
                                />
                                <span>{d}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Closing line */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl text-center md:mt-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="font-mono text-kicker uppercase tracking-[0.24em] text-accent-deep">
            Tres principios · Un sistema
          </p>
          <p className="mt-4 font-heading text-h3 leading-[1.18] tracking-tight text-balance text-ink">
            Cada decisión —UX, motion y marca— se conecta para que tu negocio crezca con intención.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

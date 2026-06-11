"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HomeSectionBackdrop } from "@/components/ui/HomeSectionBackdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrandValueIntro } from "@/components/home/BrandValueIntro";
import { BrandValueScrollVideo } from "@/components/home/BrandValueScrollVideo";
import { BrandValuePrinciple } from "@/components/home/BrandValuePrinciple";
import { brandPrinciples } from "@/content/brand-value";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollScrubVideo } from "@/hooks/useScrollScrubVideo";
import { easeOut, viewportOnce } from "@/lib/motion";

export function BrandValue() {
  const reduced = useReducedMotion();
  const cinemaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: cinemaRef,
    offset: ["start 0.78", "end 0.22"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.6,
  });
  const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);
  const orbY = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  useScrollScrubVideo(videoRef, scrollYProgress, { enabled: !reduced });

  return (
    <section
      id="filosofia"
      className="home-section-light relative -mt-px overflow-hidden border-b border-line-dark bg-bone py-section text-ink"
    >
      <HomeSectionBackdrop variant="light" />

      <div className="site-container relative z-[1]">
        <SectionHeader
          theme="light"
          kicker="Filosofía · Por qué Captas"
          title={
            <>
              Promovemos marcas con experiencias que generan{" "}
              <span className="bg-gradient-to-r from-accent-deep via-accent to-sky bg-clip-text text-transparent">
                valor real.
              </span>
            </>
          }
          description="Research, craft visual y ejecución en un solo equipo — del primer click al frame final."
        />

        <div ref={cinemaRef} className="brand-value-cinema mt-12 lg:mt-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-x-10">
            <motion.div
              className="brand-value-cinema__media lg:sticky lg:top-[5.5rem] lg:z-[2] lg:self-start"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              <BrandValueScrollVideo
                ref={videoRef}
                progress={scrollYProgress}
                reduced={reduced}
              />
            </motion.div>

            <div className="brand-value-cinema__content mt-8 lg:mt-0">
              <BrandValueIntro />

              <motion.p
                id="filosofia-principios"
                className="mt-12 max-w-2xl font-mono text-kicker uppercase tracking-[0.22em] text-on-light-muted md:mt-16 lg:max-w-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                Tres principios · Un recorrido con evidencia
              </motion.p>

              <div className="relative mt-10 md:mt-14">
                <div
                  className="pointer-events-none absolute top-0 bottom-0 left-[1.125rem] md:left-8"
                  aria-hidden
                >
                  <div className="relative h-full w-px overflow-hidden bg-ink/10">
                    <motion.div
                      className="absolute inset-x-0 top-0 origin-top bg-accent"
                      style={{ height: reduced ? "100%" : lineHeight }}
                    />
                  </div>
                  {!reduced && (
                    <motion.div
                      className="absolute -left-2.5 h-5 w-5 rounded-full bg-bone shadow-[0_0_0_1px_rgba(61,85,108,0.4),0_0_16px_rgba(61,85,108,0.35)]"
                      style={{ top: orbY }}
                      aria-hidden
                    />
                  )}
                </div>

                <ol className="relative space-y-16 md:space-y-24">
                  {brandPrinciples.map((p, i) => (
                    <BrandValuePrinciple
                      key={p.id}
                      principle={p}
                      index={i}
                      isEven={i % 2 === 0}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="relative mt-16 overflow-hidden rounded-box-lg border border-line-dark md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="grid gap-px bg-line-dark md:grid-cols-[1fr_auto]">
            <div className="bg-white px-6 py-8 md:px-10 md:py-10">
              <p className="font-mono text-kicker uppercase tracking-[0.2em] text-accent">
                Siguiente paso
              </p>
              <p className="mt-3 font-heading text-h2 leading-tight tracking-tight text-ink">
                ¿Listo para elevar cómo se siente tu marca?
              </p>
              <p className="mt-3 max-w-xl text-body leading-relaxed text-on-light-muted">
                Cuéntanos tu objetivo — rebranding, web, video o proyecto integral — y armamos una
                propuesta con alcance, plazos y el pilar creativo que más impacte ahora.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 bg-bone px-6 py-8 md:min-w-[240px] md:px-8">
              <Link href="/contacto" className="gloss-button text-center">
                Solicitar propuesta
              </Link>
              <Link
                href="/estudio"
                className="text-center font-mono text-kicker uppercase tracking-[0.16em] text-accent hover:opacity-80"
              >
                Conocer el estudio →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

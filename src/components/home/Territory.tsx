"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/motion/SplitText";
import { territoryContent } from "@/content/territory";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.75, ease: easeOut },
  }),
};

export function Territory() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -6, scale: 1.06 },
        {
          yPercent: 10,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        }
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 0 },
          {
            y: reduced ? 0 : -28,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="territorio"
      ref={sectionRef}
      className="relative min-h-[min(100dvh,58rem)] overflow-hidden bg-ink"
      aria-labelledby="territory-heading"
    >
      {/* Foto full-bleed — protagonista */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={territoryContent.image}
          alt={territoryContent.imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: territoryContent.imagePosition }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/45 to-ink/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_85%,rgba(199,91,57,0.12),transparent_50%)]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[min(100dvh,58rem)] flex-col justify-end py-section">
        <div ref={contentRef} className="site-container">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            {/* Editorial — izquierda */}
            <div className="lg:col-span-7 xl:col-span-7">
              <motion.header
                className="flex flex-wrap items-center gap-x-3 gap-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={0}
              >
                <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky">
                  {territoryContent.kicker}
                </p>
                <span className="hidden h-3 w-px bg-bone/30 sm:block" aria-hidden />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-on-ink-muted">
                  {territoryContent.subkicker}
                </p>
              </motion.header>

              <motion.p
                className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-bone/20 bg-ink/50 px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-bone backdrop-blur-md"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={1}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-terra shadow-[0_0_10px_rgba(199,91,57,0.65)]"
                  aria-hidden
                />
                {territoryContent.location}
              </motion.p>

              <h2
                id="territory-heading"
                className="mt-6 max-w-[14ch] font-heading text-[clamp(2.35rem,6.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bone"
              >
                <SplitText
                  as="span"
                  text={territoryContent.title}
                  align="start"
                  className="block"
                  delay={0.05}
                />
                <span className="mt-1 block">
                  <SplitText
                    as="span"
                    text={territoryContent.titleAccent}
                    align="start"
                    className="text-gradient-terra"
                    delay={0.2}
                  />
                </span>
              </h2>

              <motion.p
                className="mt-6 max-w-xl text-lead font-medium leading-snug text-bone md:text-[1.2rem]"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={2}
              >
                {territoryContent.lead}
              </motion.p>

              <motion.p
                className="mt-4 max-w-xl text-body leading-relaxed text-on-ink-muted"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={3}
              >
                {territoryContent.body}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={4}
              >
                <Link
                  href={territoryContent.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-bone/25 bg-bone/10 px-5 py-2.5 font-mono text-kicker uppercase tracking-[0.16em] text-bone backdrop-blur-sm transition-colors hover:border-terra/45 hover:bg-terra/15"
                >
                  {territoryContent.cta.label}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-on-ink-subtle">
                  {territoryContent.imageCredit}
                </span>
              </motion.div>
            </div>

            {/* Pilares + datos — derecha */}
            <div className="flex flex-col gap-8 lg:col-span-5 lg:pb-2 xl:col-span-5">
              <ul className="space-y-3" role="list">
                {territoryContent.pillars.map((pillar, i) => (
                  <motion.li
                    key={pillar.id}
                    className="group relative overflow-hidden rounded-box-lg border border-bone/12 bg-ink/55 p-4 backdrop-blur-xl transition-[border-color,background] duration-base hover:border-terra/30 hover:bg-ink/70 md:p-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={fadeUp}
                    custom={i}
                  >
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-terra/50 to-transparent opacity-0 transition-opacity duration-base group-hover:opacity-100"
                      aria-hidden
                    />
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-terra">
                      {pillar.title}
                    </p>
                    <p className="mt-2 text-small leading-relaxed text-on-ink-muted">
                      {pillar.text}
                    </p>
                  </motion.li>
                ))}
              </ul>

              <motion.dl
                className="grid grid-cols-3 gap-px overflow-hidden rounded-box-lg border border-bone/15 bg-bone/8"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                custom={3}
              >
                {territoryContent.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-ink/50 px-3 py-4 text-center backdrop-blur-md sm:px-4"
                  >
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-on-ink-subtle">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-heading text-[clamp(1.1rem,2.4vw,1.65rem)] leading-none tabular-nums tracking-tight text-bone">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}

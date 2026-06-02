"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SplitText } from "@/components/motion/SplitText";
import { ctaClosing } from "@/content/cta";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut, viewportOnce } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.08, duration: 0.85, ease: easeOut },
  }),
};

export function CtaSection() {
  const reduced = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, margin: "-12% 0px" });

  return (
    <section
      className="relative overflow-hidden bg-ink py-section"
      aria-labelledby="cta-closing-heading"
    >
      {/* Cinematic backdrop */}
      <div ref={mediaRef} className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={ctaClosing.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          priority={false}
        />
        {ctaClosing.video && inView && !reduced ? (
          <video
            src={ctaClosing.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/88 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(91,97,255,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_60%,rgba(0,122,255,0.18),transparent_45%)]" />
        <div className="absolute inset-0 mesh-grid opacity-[0.14]" />
      </div>

      <div className="site-container relative">
        {/* Kicker */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="h-px bg-gradient-to-r from-transparent via-[#5b61ff]/60 to-accent/50"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: easeOut }}
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
            {ctaClosing.kicker}
          </p>
          <motion.span
            className="h-px bg-gradient-to-l from-transparent via-accent/50 to-[#0ea5e9]/60"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: easeOut }}
            aria-hidden
          />
        </motion.div>

        {/* Headline — editorial stack */}
        <div className="mx-auto mt-10 max-w-5xl text-center md:mt-14">
          <SplitText
            as="p"
            text={ctaClosing.headlineLead}
            className="font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-bone"
            delay={0.05}
          />

          <motion.h2
            id="cta-closing-heading"
            className="relative mt-2 md:mt-3"
            initial={{ opacity: 0, y: 32, filter: reduced ? "none" : "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ delay: 0.35, duration: 1, ease: easeOut }}
          >
            <span className="relative inline-block font-heading text-[clamp(2.75rem,7.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              <span className="text-shimmer-dark">{ctaClosing.headlineAccent}</span>
              <motion.span
                className="pointer-events-none absolute -bottom-2 left-[8%] right-[8%] h-[3px] rounded-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] opacity-80"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.7, duration: 0.9, ease: easeOut }}
                style={{ transformOrigin: "center" }}
                aria-hidden
              />
            </span>
          </motion.h2>
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-lg text-center text-lead leading-relaxed text-pretty text-on-ink-muted md:mt-10"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {ctaClosing.body}
        </motion.p>

        {/* Conversion panel */}
        <motion.div
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-box-lg border border-white/10 bg-ink/55 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/45 md:mt-16"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5b61ff]/70 to-transparent"
            aria-hidden
          />

          <div className="relative px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
              <CaptasLockup tone="on-dark" label="Hablemos" />
              <ul className="flex flex-wrap justify-center gap-2 sm:justify-end">
                {ctaClosing.promises.map((p) => (
                  <li
                    key={p.label}
                    className="rounded-full border border-bone/15 bg-white/[0.06] px-3 py-1.5 text-center"
                  >
                    <span className="block font-heading text-body tabular-nums leading-none text-sky">
                      {p.value}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-on-ink-muted">
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8 text-center">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-ink-muted">
                Escríbenos directo
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-3 inline-block font-heading text-[clamp(1.5rem,4.5vw,2.75rem)] font-medium leading-none tracking-[-0.03em] text-bone transition-colors hover:text-sky"
              >
                {site.email}
                <span
                  className="mt-2 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] transition-transform duration-slow ease-out group-hover:scale-x-100"
                  aria-hidden
                />
              </a>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
              <MagneticButton href="/contacto" className="w-full justify-center sm:w-auto">
                Iniciar proyecto
              </MagneticButton>
              <MagneticButton href={site.whatsapp} external className="w-full justify-center sm:w-auto">
                WhatsApp directo
              </MagneticButton>
              <Link
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-muted transition-colors hover:text-sky"
              >
                @captas.cl →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer meta */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-y-2 border-t border-line/80 pt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-on-ink-muted sm:grid-cols-3 sm:gap-y-0"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p>{site.location}</p>
          <p>Limarí · Chile → mundo</p>
          <p>Remoto · presencial</p>
        </motion.div>
      </div>
    </section>
  );
}

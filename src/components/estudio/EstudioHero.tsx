"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SplitText } from "@/components/motion/SplitText";
import { estudioHero, estudioJourney } from "@/content/estudio";
import { easeOut } from "@/lib/motion";

const ease = easeOut;

export function EstudioHero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative min-h-[min(72vh,680px)] overflow-hidden border-b border-line/40">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/estudio/azul.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/92 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(91,97,255,0.18),transparent_55%)]" />
      </div>

      <div className="site-container relative flex min-h-[inherit] flex-col justify-center px-gutter py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-sky"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            {estudioHero.kicker} · {estudioHero.index} · {estudioHero.label}
          </motion.p>

          <h1 className="mt-6 font-heading">
            <SplitText
              as="span"
              text={estudioHero.titleLead}
              className="block text-[clamp(2.25rem,5.8vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-bone"
              delay={0.05}
            />
            <motion.span
              className="mt-1 block text-[clamp(2.25rem,5.8vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease }}
            >
              <span className="text-shimmer-dark">{estudioHero.titleAccent}</span>
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-md text-lead leading-relaxed text-on-ink-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65, ease }}
          >
            {estudioHero.body}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6, ease }}
          >
            <button
              type="button"
              onClick={() => scrollTo("recorrido")}
              className="gloss-button inline-flex"
            >
              {estudioHero.ctaPrimary}
            </button>
            <MagneticButton href="/contacto">{estudioHero.ctaSecondary}</MagneticButton>
          </motion.div>

          <motion.ol
            className="mt-10 flex flex-wrap justify-center gap-2"
            aria-label="Ir a un paso del proceso"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.58 } },
            }}
          >
            {estudioJourney.map((step) => (
              <motion.li
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollTo(step.id)}
                  className="rounded-full border border-bone/15 bg-white/[0.05] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-on-ink-muted transition-colors hover:border-sky/40 hover:bg-accent/10 hover:text-bone"
                >
                  <span className="text-sky">{step.step}</span>
                  <span className="mx-1.5 text-bone/25">·</span>
                  {step.id === "brief" ? "Brief" : step.id === "squad" ? "Squad" : "Entrega"}
                </button>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[estudioHero.onlineTag, estudioHero.onlineTagDetail].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/10 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-on-ink-subtle"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
}

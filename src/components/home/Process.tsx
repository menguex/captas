"use client";

import { motion } from "framer-motion";
import { methodValueSection } from "@/content/method-value";
import { stats } from "@/content/site";
import { ProcessJourney } from "@/components/services/ProcessJourney";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { viewportOnce, easeOut } from "@/lib/motion";

const statStyles = [
  {
    gradient: "linear-gradient(135deg, #64d2ff 0%, #007aff 100%)",
    accent: "#64d2ff",
    glow: "rgba(0,122,255,0.2)",
  },
  {
    gradient: "linear-gradient(135deg, #c4a574 0%, #9a7b52 100%)",
    accent: "#c4a574",
    glow: "rgba(154,123,82,0.2)",
  },
  {
    gradient: "linear-gradient(135deg, #7a9e8e 0%, #4d7264 100%)",
    accent: "#7a9e8e",
    glow: "rgba(77,114,100,0.2)",
  },
  {
    gradient: "linear-gradient(135deg, #8b85a6 0%, #5c5478 100%)",
    accent: "#8b85a6",
    glow: "rgba(92,84,120,0.2)",
  },
] as const;

export function Process() {
  return (
    <section
      id="metodo"
      className="relative overflow-hidden bg-bone py-section text-ink"
      aria-labelledby="method-value-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.35]" aria-hidden />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          kicker={methodValueSection.kicker}
          title={
            <>
              <span id="method-value-heading">{methodValueSection.title}</span>{" "}
              <span className="text-accent">{methodValueSection.titleAccent}</span>
            </>
          }
          description={methodValueSection.description}
        />

        <ProcessJourney embedded className="mt-12 md:mt-14" />

        <motion.div
          className="relative mt-10 overflow-hidden rounded-box-lg border border-line bg-ink-soft p-6 text-bone md:mt-12 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div
            className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.1]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(91,97,255,0.12),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent"
            aria-hidden
          />

          <p className="relative text-center font-mono text-kicker uppercase tracking-[0.22em] text-sky">
            Números · Valor entregado
          </p>
          <p className="relative mx-auto mt-2 max-w-lg text-center font-heading text-h3 tracking-tight text-bone md:text-h2">
            Resultados que hablan{" "}
            <span className="text-shimmer-dark">por sí solos.</span>
          </p>

          <div className="relative mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {stats.map((stat, i) => {
              const style = statStyles[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08, duration: 0.75, ease: easeOut }}
                  className="group relative pl-5"
                >
                  <span
                    className="absolute left-0 top-2 block h-[calc(100%-1rem)] w-px transition-all duration-base group-hover:w-[3px]"
                    style={{ background: style.gradient }}
                    aria-hidden
                  />
                  <span
                    className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em]"
                    style={{ color: style.accent }}
                  >
                    / 0{i + 1}
                  </span>
                  <p
                    className="mt-3 font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[0.9] tracking-[-0.04em]"
                    style={{
                      backgroundImage: style.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-4 font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-muted">
                    {stat.label}
                  </p>
                  <div
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-base group-hover:opacity-100"
                    style={{ backgroundColor: style.glow }}
                    aria-hidden
                  />
                </motion.div>
              );
            })}
          </div>

          <p className="relative mt-10 border-t border-line pt-6 text-center font-mono text-small uppercase tracking-[0.2em] text-on-ink-subtle">
            {methodValueSection.statsFootnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

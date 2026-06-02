"use client";

import { motion } from "framer-motion";
import { stats } from "@/content/site";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { viewportOnce, easeOut } from "@/lib/motion";

type StatStyle = {
  gradient: string;
  accent: string;
  glow: string;
};

const statStyles: StatStyle[] = [
  {
    gradient: "linear-gradient(135deg, #8fa3b8 0%, #3d556c 100%)",
    accent: "#8fa3b8",
    glow: "rgba(61,85,108,0.16)",
  },
  {
    gradient: "linear-gradient(135deg, #c4a574 0%, #9a7b52 100%)",
    accent: "#c4a574",
    glow: "rgba(154,123,82,0.16)",
  },
  {
    gradient: "linear-gradient(135deg, #7a9e8e 0%, #4d7264 100%)",
    accent: "#7a9e8e",
    glow: "rgba(77,114,100,0.16)",
  },
  {
    gradient: "linear-gradient(135deg, #8b85a6 0%, #5c5478 100%)",
    accent: "#8b85a6",
    glow: "rgba(92,84,120,0.16)",
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-soft py-section text-bone">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(61,85,108,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="dark"
          kicker="Números · Valor entregado"
          title={
            <>
              Resultados que hablan{" "}
              <span className="text-sky">por sí solos.</span>
            </>
          }
          description="Métricas de craft acumulado — experiencias diseñadas, marcas elevadas y un índice de satisfacción que sostiene la operación."
        />

        {/* Editorial four-column data grid with hairline dividers */}
        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {stats.map((stat, i) => {
            const style = statStyles[i];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.85, ease: easeOut }}
                className="group relative pl-5"
              >
                {/* Left accent bar */}
                <span
                  className="absolute left-0 top-2 block h-[calc(100%-1rem)] w-px transition-all duration-base group-hover:w-[3px]"
                  style={{ background: style.gradient }}
                  aria-hidden
                />

                {/* Index */}
                <span
                  className="font-mono text-kicker tabular-nums uppercase tracking-[0.22em]"
                  style={{ color: style.accent }}
                >
                  / 0{i + 1}
                </span>

                {/* The big number with gradient */}
                <p
                  className="mt-3 font-heading text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]"
                  style={{
                    backgroundImage: style.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>

                {/* Label */}
                <p
                  className="mt-5 font-mono text-kicker uppercase tracking-[0.22em]"
                  style={{ color: "rgba(238,244,252,0.78)" }}
                >
                  {stat.label}
                </p>

                {/* Subtle ambient glow on hover */}
                <div
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-base group-hover:opacity-100"
                  style={{ backgroundColor: style.glow }}
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>

        {/* Editorial footer note */}
        <motion.p
          className="mt-16 pt-8 text-center font-mono text-small uppercase tracking-[0.22em]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(238,244,252,0.55)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.85, ease: easeOut, delay: 0.1 }}
        >
          Datos acumulados 2018 — 2026 · Actualizado mensualmente
        </motion.p>
      </div>
    </section>
  );
}

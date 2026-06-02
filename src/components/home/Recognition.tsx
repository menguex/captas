"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { recognition } from "@/content/recognition";
import { viewportOnce, easeOut } from "@/lib/motion";

const categoryAccent: Record<string, string> = {
  Award: "#9a7b52",
  Press: "#7d92a8",
  Selection: "#4d7264",
  Talk: "#5c5478",
};

export function Recognition() {
  return (
    <section className="relative overflow-hidden bg-bone py-16 text-ink sm:py-20 lg:py-24">
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="light"
          compact
          kicker="Reconocimiento"
          title={
            <>
              Craft validado por la industria,{" "}
              <span className="text-accent">elegido por marcas reales.</span>
            </>
          }
        />

        {/* Editorial recognition list */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-box-lg border border-line-dark bg-line-dark">
          {recognition.map((item, i) => (
            <motion.article
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.06, duration: 0.75, ease: easeOut }}
              className="group relative grid grid-cols-[72px_1fr] items-start gap-4 bg-bone px-5 py-4 transition-colors duration-base hover:bg-bone-dim md:grid-cols-[88px_1fr_auto] md:items-center md:gap-8 md:px-8 md:py-5"
            >
              {/* Year */}
              <span className="pt-0.5 font-mono text-[0.62rem] tabular-nums uppercase tracking-[0.22em] text-clay md:pt-0 md:text-kicker">
                {item.year}
              </span>

              {/* Title + context */}
              <div className="min-w-0">
                <h3 className="font-heading text-[1.05rem] leading-snug tracking-tight text-ink transition-colors group-hover:text-accent md:text-h3 md:leading-tight">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-[0.9rem] leading-snug text-clay md:mt-2 md:text-small md:leading-relaxed">
                  {item.context}
                </p>
              </div>

              {/* Category badge */}
              <span
                className="hidden rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] md:inline-flex"
                style={{
                  borderColor: `${categoryAccent[item.category]}33`,
                  color: categoryAccent[item.category],
                  backgroundColor: `${categoryAccent[item.category]}0d`,
                }}
              >
                {item.category}
              </span>

              {/* Bottom accent line on hover */}
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent/40 via-accent to-sky/40 transition-transform duration-base group-hover:scale-x-100"
                aria-hidden
              />
            </motion.article>
          ))}
        </div>

        {/* Press marquee intentionally removed for a more compact section */}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"
        aria-hidden
      />
    </section>
  );
}

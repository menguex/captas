"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { viewportOnce, easeOut } from "@/lib/motion";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="relative overflow-hidden bg-ink py-section text-bone"
    >
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.12]" aria-hidden />

      <div className="site-container relative">
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="h-px bg-gradient-to-r from-transparent to-accent/60"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOut }}
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.24em] text-sky">
            Manifiesto · 001
          </p>
          <motion.span
            className="h-px bg-gradient-to-l from-transparent to-accent/60"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOut }}
            aria-hidden
          />
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl md:mt-20">
          <motion.div
            className="pointer-events-none mx-auto mb-[-2.5rem] flex justify-center font-heading text-[clamp(5rem,11vw,8.5rem)] leading-none text-accent/20 md:mb-[-3.5rem]"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOut }}
            aria-hidden
          >
            “
          </motion.div>

          <blockquote className="relative text-center">
            <motion.p
              className="mx-auto max-w-2xl font-heading text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium uppercase tracking-[0.18em] text-on-ink-subtle"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
            >
              No solo diseñamos interfaces —
            </motion.p>

            <div className="mt-6 md:mt-8">
              <SplitText
                as="p"
                text="Construimos la forma"
                className="font-heading text-[clamp(2.25rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-bone"
                delay={0.2}
              />
            </div>

            <div className="mt-1 md:mt-2">
              <SplitText
                as="p"
                text="en que una marca se"
                className="font-heading text-[clamp(2.25rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-bone"
                delay={0.32}
              />
            </div>

            <div className="mt-1 md:mt-2">
              <p className="font-heading text-[clamp(2.25rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
                <SplitText
                  as="span"
                  text="siente,"
                  className="text-bone"
                  delay={0.44}
                />{" "}
                <SplitText
                  as="span"
                  text="se mueve"
                  className="bg-gradient-to-r from-sky via-accent to-[#4338ca] bg-clip-text text-transparent"
                  delay={0.5}
                />{" "}
                <SplitText
                  as="span"
                  text="y se recuerda."
                  className="text-bone"
                  delay={0.6}
                />
              </p>
            </div>

            <motion.div
              className="mx-auto mt-14 flex max-w-md items-center gap-4 md:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.85, duration: 0.7 }}
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/30" aria-hidden />
              <footer className="font-mono text-kicker uppercase tracking-[0.22em] text-bone/75">
                Captas · Limarí, Chile / 2026
              </footer>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/30" aria-hidden />
            </motion.div>
          </blockquote>
        </div>

        <motion.p
          className="mx-auto mt-12 max-w-xl text-center font-mono text-small uppercase tracking-[0.22em] text-on-ink-subtle md:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.95, duration: 0.6 }}
        >
          Cómo pensamos cada proyecto · antes del primer pixel
        </motion.p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden
      />
    </section>
  );
}

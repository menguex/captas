"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  /** Play on mount instead of waiting for scroll into view */
  playOnMount?: boolean;
  /** When false, animation stays hidden until playOnMount triggers */
  active?: boolean;
};

export function SplitText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  playOnMount = false,
  active = true,
}: SplitTextProps) {
  const words = text.split(" ");
  const motionProps = playOnMount
    ? {
        animate: active ? "visible" : "hidden",
        viewport: undefined,
      }
    : {
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap justify-center"
        variants={staggerContainer}
        initial="hidden"
        {...motionProps}
        transition={{ delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

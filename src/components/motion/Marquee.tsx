"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
};

export function Marquee({
  items,
  separator = " / ",
  speed = 30,
  className = "",
  reverse = false,
}: MarqueeProps) {
  const content = items.join(separator) + separator;
  const dir = reverse ? 1 : -1;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div
        className="inline-flex"
        animate={{ x: [`0%`, `${dir * -50}%`] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block pr-[0.15em]">{content}</span>
        <span className="inline-block pr-[0.15em]">{content}</span>
      </motion.div>
    </div>
  );
}

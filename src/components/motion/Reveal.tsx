"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { fadeUp, fadeUpBlur, scaleIn, slideInLeft, viewportOnce } from "@/lib/motion";

const variantsMap = {
  fadeUp,
  fadeUpBlur,
  scaleIn,
  slideInLeft,
} as const;

type RevealVariant = keyof typeof variantsMap;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: RevealVariant;
};

export function Reveal({
  children,
  delay = 0,
  variant = "fadeUp",
  className,
  ...props
}: RevealProps) {
  const variants: Variants = variantsMap[variant];

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

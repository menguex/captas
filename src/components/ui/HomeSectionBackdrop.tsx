"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type HomeSectionBackdropVariant =
  | "manifesto"
  | "work"
  | "light"
  | "light-accent";

type HomeSectionBackdropProps = {
  variant: HomeSectionBackdropVariant;
};

export function HomeSectionBackdrop({ variant }: HomeSectionBackdropProps) {
  const reduced = useReducedMotion();
  const isDark = variant === "manifesto" || variant === "work";

  return (
    <div
      className={`home-section-backdrop home-section-backdrop--${variant} pointer-events-none absolute inset-0`}
      aria-hidden
    >
      <div className="home-section-backdrop__base" />

      {isDark && (
        <>
          <div className="home-section-backdrop__grid" />
          <div className="home-section-backdrop__mesh" />
          <motion.div
            className="home-section-backdrop__orb home-section-backdrop__orb--indigo"
            animate={reduced ? {} : { x: [0, 20, 0], y: [0, -14, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="home-section-backdrop__orb home-section-backdrop__orb--cyan"
            animate={reduced ? {} : { x: [0, -16, 0], y: [0, 12, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </>
      )}

      {variant === "manifesto" && (
        <>
          <div className="home-section-backdrop__spotlight" />
          <div className="home-section-backdrop__blueprint" />
          <div className="home-section-backdrop__fade home-section-backdrop__fade--top" />
        </>
      )}

      {variant === "work" && (
        <>
          <div className="home-section-backdrop__spotlight home-section-backdrop__spotlight--work" />
          <div className="home-section-backdrop__fade home-section-backdrop__fade--top" />
          <div className="home-section-backdrop__fade home-section-backdrop__fade--to-light" />
        </>
      )}

      {(variant === "light" || variant === "light-accent") && (
        <>
          <div className="home-section-backdrop__light-wash" />
          {variant === "light-accent" && (
            <div className="home-section-backdrop__light-accent" />
          )}
          <div className="home-section-backdrop__fade home-section-backdrop__fade--from-dark" />
        </>
      )}

      {isDark && <div className="home-section-backdrop__vignette" />}
    </div>
  );
}

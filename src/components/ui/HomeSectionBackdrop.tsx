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
          <div
            className={`home-section-backdrop__grid${variant === "manifesto" ? " home-section-backdrop__grid--manifesto" : ""}`}
          />
          {variant !== "manifesto" && <div className="home-section-backdrop__mesh" />}
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
          <div className="home-section-backdrop__manifesto-beam" />
          <div className="home-section-backdrop__manifesto-horizon" />
          <motion.div
            className="home-section-backdrop__manifesto-stage-glow"
            animate={
              reduced
                ? {}
                : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="home-section-backdrop__spotlight home-section-backdrop__spotlight--manifesto" />
          <svg
            className="home-section-backdrop__manifesto-arcs"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="manifesto-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(91,97,255,0)" />
                <stop offset="35%" stopColor="rgba(91,97,255,0.16)" />
                <stop offset="65%" stopColor="rgba(14,165,233,0.12)" />
                <stop offset="100%" stopColor="rgba(91,97,255,0)" />
              </linearGradient>
            </defs>
            <ellipse
              cx="720"
              cy="420"
              rx="340"
              ry="200"
              stroke="rgba(91,97,255,0.07)"
              strokeWidth="1"
            />
            <ellipse
              cx="720"
              cy="420"
              rx="460"
              ry="280"
              stroke="rgba(14,165,233,0.05)"
              strokeWidth="1"
              strokeDasharray="3 14"
            />
            <path
              d="M 120 520 Q 720 380 1320 520"
              stroke="url(#manifesto-arc-grad)"
              strokeWidth="1"
            />
            <line x1="0" y1="168" x2="1440" y2="168" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </svg>
          <div className="home-section-backdrop__fade home-section-backdrop__fade--top home-section-backdrop__fade--manifesto-top" />
        </>
      )}

      {variant === "work" && (
        <div className="home-section-backdrop__spotlight home-section-backdrop__spotlight--work" />
      )}

      {variant === "light-accent" && (
        <div className="home-section-backdrop__light-accent" aria-hidden />
      )}

      {isDark && <div className="home-section-backdrop__vignette" />}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BrandingIcon, UxUiIcon, VideoIcon, WebIcon } from "@/components/icons";
import { ManifestoDesignOrbitFallback } from "@/components/home/ManifestoDesignOrbit3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ManifestoDesignOrbit3D = dynamic(
  () =>
    import("@/components/home/ManifestoDesignOrbit3D").then((m) => m.ManifestoDesignOrbit3D),
  { ssr: false, loading: () => <ManifestoDesignOrbitFallback /> }
);

export function ManifestoDesignField() {
  const reduced = useReducedMotion();

  return (
    <div className="manifesto-design-field pointer-events-none absolute inset-0" aria-hidden>
      <div className="manifesto-design-orbit-slot absolute left-[2%] top-[10%] z-[1] hidden h-[min(42vw,22rem)] w-[min(42vw,22rem)] lg:block">
        {reduced ? <ManifestoDesignOrbitFallback /> : <ManifestoDesignOrbit3D />}
      </div>

      <svg
        className="manifesto-design-field-svg absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="manifesto-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(91,97,255,0)" />
            <stop offset="45%" stopColor="rgba(91,97,255,0.45)" />
            <stop offset="55%" stopColor="rgba(14,165,233,0.45)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0)" />
          </linearGradient>
          <linearGradient id="manifesto-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5b61ff" stopOpacity="0.35" />
          </linearGradient>
          <filter id="manifesto-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="0" y1="120" x2="1440" y2="120" stroke="url(#manifesto-line-grad)" strokeWidth="1" />
        <line x1="0" y1="780" x2="1440" y2="780" stroke="url(#manifesto-line-grad)" strokeWidth="1" opacity="0.6" />
        <line x1="120" y1="0" x2="120" y2="900" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="1320" y1="0" x2="1320" y2="900" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Blueprint esquina superior izquierda — complementa el 3D */}
        <g filter="url(#manifesto-glow-soft)" opacity="0.85">
          <path
            d="M 32 210 A 175 175 0 0 1 207 35"
            stroke="url(#manifesto-arc-grad)"
            strokeWidth="1.5"
            strokeDasharray="7 11"
          />
          <path d="M 48 48 H 175 M 48 48 V 175" stroke="rgba(255,255,255,0.22)" strokeWidth="1.25" />
          <path
            d="M 88 120 Q 140 80 200 95"
            stroke="rgba(100,210,255,0.35)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        <path
          d="M 1240 700 A 200 200 0 0 0 1440 500"
          stroke="rgba(91,97,255,0.4)"
          strokeWidth="1.5"
        />

        {[180, 260, 340, 1180, 1100, 1020].map((cx, i) => (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={i < 3 ? 160 + i * 28 : 720 - (i - 3) * 28}
            r="2.5"
            fill="rgba(100,210,255,0.4)"
          />
        ))}

        <g className="manifesto-wire-card" opacity="0.9">
          <rect
            x="1080"
            y="140"
            width="140"
            height="88"
            rx="8"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <path d="M 1068 128 H 1100 M 1068 128 V 160" stroke="rgba(100,210,255,0.35)" strokeWidth="1" />
          <line x1="1096" y1="168" x2="1204" y2="168" stroke="rgba(91,97,255,0.55)" strokeWidth="1" />
          <line x1="1096" y1="188" x2="1160" y2="188" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="1096" y1="208" x2="1188" y2="208" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </g>

        <circle cx="200" cy="620" r="48" stroke="rgba(91,97,255,0.2)" strokeWidth="1" />
        <circle cx="200" cy="620" r="72" stroke="rgba(14,165,233,0.12)" strokeWidth="1" strokeDasharray="4 8" />

        <path d="M 60 820 L 220 660" stroke="rgba(100,210,255,0.22)" strokeWidth="1" />
        <path d="M 1220 80 L 1380 240" stroke="rgba(91,97,255,0.28)" strokeWidth="1" />

        <path d="M 80 80 H 200 M 80 80 V 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M 1360 820 H 1240 M 1360 820 V 700" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>

      <motion.div
        className="manifesto-design-glyph manifesto-design-glyph--branding absolute left-[4%] top-[42%] hidden lg:block"
        animate={reduced ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <BrandingIcon size={38} strokeWidth={1} className="text-sky-soft/50" />
      </motion.div>
      <motion.div
        className="manifesto-design-glyph manifesto-design-glyph--ux absolute right-[5%] top-[22%] hidden lg:block"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <UxUiIcon size={42} strokeWidth={1} className="text-accent/40" />
      </motion.div>
      <motion.div
        className="manifesto-design-glyph manifesto-design-glyph--video absolute right-[8%] bottom-[28%] hidden lg:block"
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <VideoIcon size={34} strokeWidth={1} className="text-sky/35" />
      </motion.div>
      <motion.div
        className="manifesto-design-glyph manifesto-design-glyph--web absolute left-[10%] bottom-[18%] hidden lg:block"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <WebIcon size={30} strokeWidth={1} className="text-bone/30" />
      </motion.div>

      <span className="manifesto-design-watermark absolute right-[4%] top-[12%] hidden font-heading font-extrabold leading-none tracking-[-0.06em] text-white/[0.03] lg:block">
        001
      </span>
      <span className="manifesto-design-watermark manifesto-design-watermark--left absolute left-[2%] bottom-[8%] hidden font-heading font-extrabold leading-none tracking-[-0.06em] text-white/[0.025] lg:block">
        M
      </span>
    </div>
  );
}

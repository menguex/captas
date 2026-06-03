"use client";

import { motion } from "framer-motion";
import { BrandingIcon, UxUiIcon, VideoIcon, WebIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ManifestoDesignField() {
  const reduced = useReducedMotion();

  return (
    <div className="manifesto-design-field pointer-events-none absolute inset-0" aria-hidden>
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
          <linearGradient id="manifesto-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b61ff" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {/* Reglas editoriales — atraviesan la sección */}
        <line x1="0" y1="120" x2="1440" y2="120" stroke="url(#manifesto-line-grad)" strokeWidth="1" />
        <line x1="0" y1="780" x2="1440" y2="780" stroke="url(#manifesto-line-grad)" strokeWidth="1" opacity="0.6" />
        <line x1="120" y1="0" x2="120" y2="900" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="1320" y1="0" x2="1320" y2="900" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Arco superior izquierda */}
        <path
          d="M 40 200 A 160 160 0 0 1 200 40"
          stroke="rgba(100,210,255,0.35)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        {/* Arco inferior derecha */}
        <path
          d="M 1240 700 A 200 200 0 0 0 1440 500"
          stroke="rgba(91,97,255,0.4)"
          strokeWidth="1.5"
        />

        {/* Retícula de puntos */}
        {[180, 260, 340, 1180, 1100, 1020].map((cx, i) => (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={i < 3 ? 160 + i * 28 : 720 - (i - 3) * 28}
            r="2"
            fill="rgba(100,210,255,0.35)"
          />
        ))}

        {/* Forma tipográfica abstracta — “marca” */}
        <rect
          x="1080"
          y="140"
          width="140"
          height="88"
          rx="8"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <line x1="1096" y1="168" x2="1204" y2="168" stroke="rgba(91,97,255,0.5)" strokeWidth="1" />
        <line x1="1096" y1="188" x2="1160" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="1096" y1="208" x2="1188" y2="208" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Círculos de enfoque */}
        <circle cx="200" cy="620" r="48" stroke="rgba(91,97,255,0.25)" strokeWidth="1" />
        <circle cx="200" cy="620" r="72" stroke="rgba(14,165,233,0.15)" strokeWidth="1" strokeDasharray="4 8" />

        {/* Vector diagonal */}
        <path
          d="M 60 820 L 220 660"
          stroke="rgba(100,210,255,0.2)"
          strokeWidth="1"
        />
        <path
          d="M 1220 80 L 1380 240"
          stroke="rgba(91,97,255,0.25)"
          strokeWidth="1"
        />

        {/* Esquinas de encuadre */}
        <path d="M 80 80 H 200 M 80 80 V 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M 1360 820 H 1240 M 1360 820 V 700" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>

      <motion.div
        className="manifesto-design-ring absolute left-[6%] top-[18%] hidden h-32 w-32 rounded-full border border-dashed border-[#5b61ff]/30 lg:block"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="manifesto-design-ring manifesto-design-ring--inner absolute left-[7.5%] top-[21%] hidden h-20 w-20 rounded-full border border-[#0ea5e9]/25 lg:block"
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />

      <div className="manifesto-design-icon manifesto-design-icon--branding absolute left-[4%] top-[38%] hidden text-sky-soft/40 lg:block">
        <BrandingIcon size={36} strokeWidth={1} />
      </div>
      <div className="manifesto-design-icon manifesto-design-icon--ux absolute right-[5%] top-[22%] hidden text-accent/35 lg:block">
        <UxUiIcon size={40} strokeWidth={1} />
      </div>
      <div className="manifesto-design-icon manifesto-design-icon--video absolute right-[8%] bottom-[28%] hidden text-sky/30 lg:block">
        <VideoIcon size={32} strokeWidth={1} />
      </div>
      <div className="manifesto-design-icon manifesto-design-icon--web absolute left-[10%] bottom-[18%] hidden text-bone/25 lg:block">
        <WebIcon size={28} strokeWidth={1} />
      </div>

      <span className="manifesto-design-watermark absolute right-[4%] top-[12%] hidden font-heading font-extrabold leading-none tracking-[-0.06em] text-white/[0.03] lg:block">
        001
      </span>
      <span className="manifesto-design-watermark manifesto-design-watermark--left absolute left-[2%] bottom-[8%] hidden font-heading font-extrabold leading-none tracking-[-0.06em] text-white/[0.025] lg:block">
        M
      </span>
    </div>
  );
}

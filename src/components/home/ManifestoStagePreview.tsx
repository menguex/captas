"use client";

import { motion } from "framer-motion";
import type { ManifestoStage } from "@/content/manifesto";

type ManifestoStagePreviewProps = {
  stage: ManifestoStage;
};

export function ManifestoStagePreview({ stage }: ManifestoStagePreviewProps) {
  return (
    <motion.div
      key={stage.id}
      id={`manifesto-stage-${stage.id}`}
      role="tabpanel"
      aria-labelledby={`manifesto-tab-${stage.id}`}
      className="manifesto-stage-preview manifesto-stage-preview--open"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <div className="manifesto-stage-preview-chrome">
        <svg className="manifesto-stage-corner manifesto-stage-corner--tl" viewBox="0 0 16 16" aria-hidden>
          <path d="M2 14V2h12" stroke="currentColor" strokeWidth="1.25" fill="none" />
        </svg>
        <svg className="manifesto-stage-corner manifesto-stage-corner--tr" viewBox="0 0 16 16" aria-hidden>
          <path d="M14 14V2H2" stroke="currentColor" strokeWidth="1.25" fill="none" />
        </svg>
        <span className="manifesto-stage-pillar">{stage.pillar}</span>
      </div>

      <div className="manifesto-stage-preview-body">
        {stage.id === "feel" && <PreviewFeel />}
        {stage.id === "move" && <PreviewMove />}
        {stage.id === "interface" && <PreviewInterface />}
        {stage.id === "ai" && <PreviewAi />}
        {stage.id === "remember" && <PreviewRemember />}
      </div>

      <p className="manifesto-stage-preview-caption">{stage.caption}</p>
    </motion.div>
  );
}

function PreviewFeel() {
  return (
    <div className="manifesto-preview-feel">
      <div className="manifesto-preview-logo" />
      <div className="manifesto-preview-swatches">
        <span style={{ background: "#5b61ff" }} />
        <span style={{ background: "#0ea5e9" }} />
        <span style={{ background: "#eae8e4" }} />
        <span style={{ background: "#9a7b52" }} />
      </div>
      <div className="manifesto-preview-type">
        <span className="h-2 w-24 rounded-full bg-white/25" />
        <span className="h-2 w-16 rounded-full bg-white/12" />
      </div>
    </div>
  );
}

function PreviewMove() {
  return (
    <div className="manifesto-preview-move">
      <div className="manifesto-preview-play" aria-hidden>
        <span />
      </div>
      <div className="manifesto-preview-timeline">
        {[72, 45, 88, 34].map((w, i) => (
          <span
            key={i}
            className="manifesto-preview-timeline-bar"
            style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="manifesto-preview-time">00:24</span>
    </div>
  );
}

function PreviewInterface() {
  return (
    <div className="manifesto-preview-ui">
      <aside className="manifesto-preview-ui-nav">
        <span className="is-active" />
        <span />
        <span />
        <span />
      </aside>
      <div className="manifesto-preview-ui-main">
        <div className="manifesto-preview-ui-hero" />
        <div className="manifesto-preview-ui-grid">
          <span />
          <span />
          <span />
        </div>
        <span className="manifesto-preview-ui-cta" />
      </div>
      <span className="manifesto-preview-cursor" aria-hidden />
    </div>
  );
}

function PreviewAi() {
  return (
    <div className="manifesto-preview-ai">
      <div className="manifesto-preview-ai-prompt">
        <span className="manifesto-preview-ai-label">Sistema</span>
        <p>Propuesta de flujo para checkout — versión B</p>
      </div>
      <div className="manifesto-preview-ai-stream">
        <span className="manifesto-preview-ai-dot" />
        <span className="manifesto-preview-ai-dot" />
        <span className="manifesto-preview-ai-dot" />
      </div>
      <div className="manifesto-preview-ai-chip">IA · prototipo · iteración</div>
    </div>
  );
}

function PreviewRemember() {
  return (
    <div className="manifesto-preview-remember">
      <span className="manifesto-preview-remember-mark">C</span>
      <div>
        <span className="block font-heading text-[1.1rem] font-semibold tracking-tight text-bone">
          Captas
        </span>
        <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.14em] text-bone/45">
          Limarí · Chile
        </span>
      </div>
      <div className="manifesto-preview-remember-pulse" aria-hidden />
    </div>
  );
}

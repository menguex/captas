"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProjectCaseModalProps = {
  project: Project | null;
  index: number;
  onClose: () => void;
};

export function ProjectCaseModal({ project, index, onClose }: ProjectCaseModalProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  const number = String(index + 1).padStart(2, "0");

  if (!mounted || !project) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/55 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-ink/40"
        aria-label="Cerrar caso"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[var(--r-box-lg)] border border-line bg-ink shadow-[0_32px_80px_rgba(0,0,0,0.45)] sm:rounded-box-lg"
        initial={reduced ? false : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line/60 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 font-mono text-kicker uppercase tracking-[0.22em] text-fog">
            <span>{number}</span>
            <span className="text-line">·</span>
            <span>{project.year}</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-bone/80 transition-colors hover:border-sky/40 hover:text-sky"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <div className="relative aspect-[16/10] w-full shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>

          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky/90">
              {project.category}
            </p>
            <h2
              id="case-modal-title"
              className="mt-3 font-heading text-h2 leading-[1.06] tracking-tight text-balance text-bone"
            >
              {project.title}
            </h2>
            <p className="mt-2 font-mono text-small uppercase tracking-[0.18em] text-fog">
              {project.client}
            </p>

            <p className="mt-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-small uppercase tracking-[0.16em] text-sky">
              {project.result}
            </p>

            <p className="mt-7 text-body leading-relaxed text-pretty text-bone/78">
              {project.description}
            </p>

            <div className="mt-8 grid gap-6 border-t border-line/50 pt-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-kicker uppercase tracking-[0.2em] text-fog">
                  El desafío
                </p>
                <p className="mt-3 text-small leading-relaxed text-bone/72">{project.challenge}</p>
              </div>
              <div>
                <p className="font-mono text-kicker uppercase tracking-[0.2em] text-fog">
                  Nuestro enfoque
                </p>
                <p className="mt-3 text-small leading-relaxed text-bone/72">{project.approach}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-line/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone/65"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-line/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/contacto"
                className="gloss-button gloss-button-prose inline-flex items-center justify-center gap-2 text-center"
                onClick={onClose}
              >
                Proyecto similar
              </Link>
              <Link
                href="/trabajo"
                className="text-center font-mono text-kicker uppercase tracking-[0.18em] text-fog transition-colors hover:text-sky"
                onClick={onClose}
              >
                Ver portafolio completo →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

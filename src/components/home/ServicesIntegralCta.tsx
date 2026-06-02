"use client";

import Link from "next/link";
import { CaptasLockup } from "@/components/brand/CaptasLogo";

/** Cierre integrado del explorador — misma tarjeta, superficie clara */
export function ServicesIntegralCta() {
  return (
    <div className="border-t border-line-dark/60 bg-gradient-to-b from-white to-bone/90 px-5 py-6 md:px-8 md:py-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <CaptasLockup tone="on-light" label="Proyecto integral" />
          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent-deep">
              Varios pilares, un solo equipo
            </p>
            <p className="mt-1 max-w-md font-heading text-h3 leading-snug tracking-tight text-ink md:text-[1.35rem]">
              Roadmap, dirección y craft unificado para tu marca.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center">
          <Link href="/servicios" className="gloss-button inline-flex items-center justify-center gap-2">
            Ver servicios
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark bg-white px-5 py-3 font-sans text-body font-medium text-ink transition-colors hover:border-accent/35 hover:text-accent"
          >
            Conversemos
          </Link>
        </div>
      </div>
    </div>
  );
}

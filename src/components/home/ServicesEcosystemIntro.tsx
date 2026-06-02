"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CaptasLockup } from "@/components/brand/CaptasLogo";
import { ServicesIntegralCta } from "@/components/home/ServicesIntegralCta";
import { ProList, StatGroup } from "@/components/ui/ProList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPillarIcon } from "@/components/icons";
import { services } from "@/content/services";
import { ecosystemIntro, ecosystemPillarVideos } from "@/content/ecosystem";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  easeOut,
  serviceOverlayItem,
  serviceOverlayStagger,
  viewportOnce,
} from "@/lib/motion";

const ROTATE_MS = 6000;

type ServicesEcosystemIntroProps = {
  showHeader?: boolean;
};

type PillarNavProps = {
  active: number;
  paused: boolean;
  reduced: boolean;
  onSelect: (index: number) => void;
  variant: "sidebar" | "strip";
};

function EcosystemPillarNav({ active, paused, reduced, onSelect, variant }: PillarNavProps) {
  const isSidebar = variant === "sidebar";

  return (
    <div
      role="tablist"
      aria-label="Pilares del ecosistema creativo"
      className={
        isSidebar
          ? "flex flex-col gap-2"
          : "flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      }
    >
      {services.map((s, i) => {
        const isActive = active === i;
        const Icon = getPillarIcon(s.id);

        if (isSidebar) {
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(i)}
              className={`group relative overflow-hidden rounded-box-lg border text-left outline-none transition-[border-color,box-shadow,background] duration-base focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "border-accent/40 bg-white shadow-[0_12px_40px_rgba(var(--c-accent-rgb),0.12)]"
                  : "border-line-dark/70 bg-white/70 hover:border-accent/25 hover:bg-white"
              }`}
            >
              {isActive && !reduced ? (
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-accent/15"
                  aria-hidden
                >
                  <span
                    key={`progress-${active}`}
                    className={`ecosystem-progress-bar block h-full w-full bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] ${
                      paused ? "is-paused" : ""
                    }`}
                    style={{ ["--ecosystem-duration" as string]: `${ROTATE_MS}ms` }}
                  />
                </span>
              ) : null}

              <span className="flex items-start gap-3 p-4">
                {Icon ? (
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? "border-accent/30 bg-gradient-to-br from-[#5b61ff]/15 to-[#0ea5e9]/10 text-accent-deep"
                        : "border-line-dark bg-bone/80 text-on-light-muted group-hover:text-accent"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-on-light-subtle">
                    {s.pillar}
                  </span>
                  <span
                    className={`mt-0.5 block font-heading text-small leading-snug ${
                      isActive ? "text-ink" : "text-on-light-muted group-hover:text-ink"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-on-light-muted">
                    {s.short}
                  </span>
                </span>
              </span>
            </button>
          );
        }

        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${s.pillar}: ${s.title}`}
            onClick={() => onSelect(i)}
            className={`relative w-[42vw] max-w-[9.5rem] shrink-0 snap-center overflow-hidden rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[8.5rem] ${
              isActive ? "border-accent/50 ring-2 ring-accent/20" : "border-line-dark/80"
            }`}
          >
            <span className="relative block aspect-[4/5]">
              <Image src={s.image} alt="" fill sizes="120px" className="object-cover" />
              <span
                className={`absolute inset-0 transition-colors ${
                  isActive ? "bg-accent/20" : "bg-ink/40"
                }`}
              />
              {isActive && !reduced ? (
                <span className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-ink/30">
                  <span
                    key={`strip-progress-${active}`}
                    className={`ecosystem-progress-bar block h-full bg-gradient-to-r from-[#5b61ff] to-[#0ea5e9] ${
                      paused ? "is-paused" : ""
                    }`}
                    style={{ ["--ecosystem-duration" as string]: `${ROTATE_MS}ms` }}
                  />
                </span>
              ) : null}
            </span>
            <span className="block bg-white px-2 py-2 text-center">
              <span className="block truncate font-heading text-[0.65rem] text-ink">
                {s.pillar}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ServicesEcosystemIntro({ showHeader = true }: ServicesEcosystemIntroProps) {
  const reduced = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, margin: "-8% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = services[active];
  const pillarVideo = ecosystemPillarVideos[current.id];

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, active]);

  const goTo = useCallback((index: number) => setActive(index), []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const idx = services.findIndex((s) => s.id === hash);
    if (idx >= 0) setActive(idx);
  }, []);

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  return (
    <div {...pauseProps}>
      {showHeader ? (
        <SectionHeader
          theme="light"
          kicker={ecosystemIntro.kicker}
          title={
            <>
              {ecosystemIntro.titleLead}{" "}
              <span className="bg-gradient-to-r from-[#5b61ff] via-accent to-[#0ea5e9] bg-clip-text text-transparent">
                {ecosystemIntro.titleAccent}
              </span>
            </>
          }
          description={ecosystemIntro.description}
        >
          <StatGroup stats={ecosystemIntro.highlights} />
          <Link
            href="/servicios"
            className="mt-2 inline-flex items-center gap-1.5 font-mono text-kicker uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-80"
          >
            Mapa completo de servicios
            <span aria-hidden>→</span>
          </Link>
        </SectionHeader>
      ) : null}

      <motion.div
        className={`grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-8 ${showHeader ? "mt-12 md:mt-14" : "mt-10"}`}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div className="hidden lg:flex lg:flex-col">
          <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-light-muted">
            Explora el ecosistema
          </p>
          <EcosystemPillarNav
            variant="sidebar"
            active={active}
            paused={paused}
            reduced={reduced}
            onSelect={goTo}
          />
          <p className="mt-4 font-mono text-[0.58rem] leading-relaxed text-on-light-subtle">
            {paused ? "Pausado" : "Auto"} · selecciona un pilar o deja avanzar el recorrido.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-box-lg border border-line-dark/70 shadow-[0_20px_64px_rgba(15,18,24,0.12)]">
          <div
            ref={mediaRef}
            className="relative min-h-[min(440px,68vh)] md:min-h-[min(500px,70vh)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
                {pillarVideo && inView && !reduced ? (
                  <video
                    src={pillarVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-hidden
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/96 via-ink/50 to-ink/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(91,97,255,0.18),transparent_45%)]"
              aria-hidden
            />

            <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2 md:left-6 md:top-6">
              <CaptasLockup tone="on-dark" />
              <span className="rounded-full border border-bone/20 bg-gradient-to-r from-[#5b61ff] to-[#0ea5e9] px-3 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-white shadow-[0_4px_16px_rgba(var(--c-accent-rgb),0.35)]">
                {current.pillar}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${current.id}`}
                className="relative flex min-h-[inherit] flex-col justify-end"
                variants={reduced ? undefined : serviceOverlayStagger}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "visible"}
              >
                <div className="border-t border-bone/15 bg-ink/90 p-5 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/82 md:p-7 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8 lg:p-9">
                  <div className="relative">
                    <motion.div
                      variants={reduced ? undefined : serviceOverlayItem}
                      className="flex flex-wrap items-center gap-3"
                    >
                      {(() => {
                        const Icon = getPillarIcon(current.id);
                        return Icon ? (
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-bone/25 bg-gradient-to-br from-[#5b61ff]/25 to-[#0ea5e9]/15 text-bone">
                            <Icon size={22} />
                          </span>
                        ) : null;
                      })()}
                      <span className="rounded-full border border-bone/25 bg-ink/50 px-3 py-1 font-mono text-kicker uppercase tracking-[0.2em] text-bone">
                        {current.pillar}
                      </span>
                    </motion.div>

                    <motion.div variants={reduced ? undefined : serviceOverlayItem} className="relative mt-4">
                      <h3 className="font-heading text-h2 leading-tight tracking-tight text-bone md:text-h1">
                        {current.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-lead font-medium leading-relaxed text-bone">
                        {current.short}
                      </p>
                      <p className="mt-2 max-w-2xl text-body leading-relaxed text-on-ink-muted">
                        {current.description}
                      </p>
                    </motion.div>

                    <motion.div variants={reduced ? undefined : serviceOverlayItem} className="relative mt-5">
                      <ProList
                        tone="dark"
                        variant="inline"
                        items={current.deliverables}
                        limit={3}
                        moreLabel={`+${current.deliverables.length - 3} entregables`}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    variants={reduced ? undefined : serviceOverlayItem}
                    className="mt-6 flex flex-col gap-3 lg:mt-0 lg:min-w-[210px]"
                  >
                    <Link
                      href={`/servicios#${current.id}`}
                      className="gloss-button inline-flex w-full items-center justify-center gap-2"
                    >
                      Ver pilar completo
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href={`/contacto?servicio=${current.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-bone/30 bg-bone/10 px-6 py-3 font-mono text-kicker uppercase tracking-[0.14em] text-bone transition-colors hover:border-bone/50 hover:bg-bone/20"
                    >
                      Solicitar propuesta
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t border-line-dark/50 bg-bone/80 p-3 lg:hidden">
            <EcosystemPillarNav
              variant="strip"
              active={active}
              paused={paused}
              reduced={reduced}
              onSelect={goTo}
            />
            <p className="mt-2 text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-on-light-muted">
              {paused ? "Pausado" : "Auto"} · toca un pilar
            </p>
          </div>

          <ServicesIntegralCta />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { guideGoals, type GuideGoalId } from "@/lib/assistant";
import { services } from "@/content/services";
import { getPillarIcon } from "@/components/icons";

type Step = 1 | 2 | 3;

const ease = [0.16, 1, 0.3, 1] as const;

export function FooterAssistant() {
  const [step, setStep] = useState<Step>(1);
  const [goalId, setGoalId] = useState<GuideGoalId | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);

  const goal = guideGoals.find((g) => g.id === goalId);
  const suggestedServices = useMemo(() => {
    if (!goal) return [];
    return goal.serviceIds
      .map((id) => services.find((s) => s.id === id))
      .filter(Boolean) as typeof services;
  }, [goal]);

  const selected = services.find((s) => s.id === serviceId);

  const reset = () => {
    setStep(1);
    setGoalId(null);
    setServiceId(null);
  };

  const pickGoal = (id: GuideGoalId) => {
    setGoalId(id);
    setServiceId(null);
    setStep(2);
  };

  const pickService = (id: string) => {
    setServiceId(id);
    setStep(3);
  };

  return (
    <section
      className="relative overflow-hidden rounded-box-lg border border-accent/20 bg-white/[0.03] backdrop-blur-xl"
      aria-label="Guía de servicios Captas"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(0,122,255,0.1),transparent_50%)]" />

      <div className="relative border-b border-line/60 px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.18em] text-sky">
              Guía rápida
            </p>
            <p className="mt-1 font-heading text-h3 text-bone">
              Encuentra tu pilar en 3 pasos
            </p>
          </div>

          <ol className="flex items-center gap-2" aria-label="Progreso">
            {([1, 2, 3] as Step[]).map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[0.65rem] transition-colors ${
                    step >= n
                      ? "bg-accent text-white"
                      : "border border-line/70 text-fog"
                  }`}
                >
                  {n}
                </span>
                {n < 3 ? (
                  <span
                    className={`hidden h-px w-5 sm:block ${
                      step > n ? "bg-accent/60" : "bg-line/60"
                    }`}
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relative px-5 py-5 md:px-6 md:py-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="font-mono text-small uppercase tracking-[0.14em] text-fog">
                Paso 1 · Elige tu objetivo
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {guideGoals.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickGoal(item.id)}
                    className="group rounded-box border border-line/70 bg-ink/40 p-4 text-left transition-all duration-base hover:border-accent/35 hover:bg-ink/55"
                  >
                    <p className="font-heading text-body text-bone group-hover:text-sky">
                      {item.label}
                    </p>
                    <p className="mt-1 text-small text-on-ink-subtle">{item.hint}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && goal && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="font-mono text-small uppercase tracking-[0.14em] text-fog">
                Paso 2 · Elige un pilar
              </p>
              <p className="mt-2 text-small text-bone/60">
                Para <span className="text-sky">{goal.label.toLowerCase()}</span>, estos
                servicios encajan mejor:
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {suggestedServices.map((service) => {
                  const Icon = getPillarIcon(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => pickService(service.id)}
                      className="rounded-box-lg p-px text-left transition-transform duration-base hover:scale-[1.01]"
                      style={{ background: service.theme.border }}
                    >
                      <span className="flex h-full flex-col rounded-box-lg bg-ink/80 p-4">
                        <span className="flex items-center gap-3">
                          {Icon ? (
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-xl"
                              style={{
                                background: service.theme.soft,
                                color: service.theme.accent,
                              }}
                            >
                              <Icon size={18} />
                            </span>
                          ) : null}
                          <span
                            className="font-mono text-[0.62rem] uppercase tracking-[0.12em]"
                            style={{ color: service.theme.accent }}
                          >
                            {service.pillar}
                          </span>
                        </span>
                        <span className="mt-3 font-heading text-body text-bone">
                          {service.title}
                        </span>
                        <span className="mt-1 line-clamp-2 text-small text-on-ink-subtle">
                          {service.short}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-mono text-small uppercase tracking-[0.12em] text-fog transition-colors hover:text-sky"
                >
                  ← Cambiar objetivo
                </button>
                <Link
                  href="/servicios"
                  className="font-mono text-small uppercase tracking-[0.12em] text-on-ink-muted transition-colors hover:text-sky"
                >
                  Ver los 5 pilares →
                </Link>
              </div>
            </motion.div>
          )}

          {step === 3 && selected && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="font-mono text-small uppercase tracking-[0.14em] text-fog">
                Paso 3 · Tu recomendación
              </p>

              <div
                className="mt-4 rounded-box-lg p-px"
                style={{ background: selected.theme.border }}
              >
                <div
                  className="rounded-box-lg p-5 md:p-6"
                  style={{ background: selected.theme.fill }}
                >
                  <div className="rounded-box-lg bg-ink/75 p-5">
                    <p
                      className="font-mono text-kicker uppercase tracking-[0.14em]"
                      style={{ color: selected.theme.accent }}
                    >
                      {selected.pillar} · Pilar {selected.number}
                    </p>
                    <p className="mt-2 font-heading text-h3 text-bone">{selected.title}</p>
                    <p className="mt-2 text-body text-bone/70">{selected.short}</p>
                    <p className="mt-4 text-small text-on-ink-subtle">
                      Siguiente paso: cuéntanos tu proyecto y armamos una propuesta a medida.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contacto?servicio=${selected.id}`}
                  className="gloss-button inline-flex px-6 py-3"
                >
                  Ir a contacto →
                </Link>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-mono text-small uppercase tracking-[0.12em] text-fog transition-colors hover:text-sky"
                >
                  ← Elegir otro pilar
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-small uppercase tracking-[0.12em] text-on-ink-muted transition-colors hover:text-sky"
                >
                  Reiniciar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

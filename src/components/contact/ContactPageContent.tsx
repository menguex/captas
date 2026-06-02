"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Respuesta en 24–48 h",
  },
  {
    label: "WhatsApp",
    value: "Escríbenos directo",
    href: site.whatsapp,
    hint: "Lunes a viernes",
  },
  {
    label: "Instagram",
    value: "@captas.cl",
    href: site.instagram,
    hint: "Detrás de cámara",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Cuéntanos",
    text: "Comparte objetivo, plazos y referencias. Cuanto más claro, mejor la propuesta.",
  },
  {
    number: "02",
    title: "Propuesta",
    text: "Agendamos una llamada breve y te enviamos alcance, tiempos y inversión.",
  },
  {
    number: "03",
    title: "Arranque",
    text: "Definimos equipo, calendario y primer entregable. Tu marca empieza a elevarse.",
  },
] as const;

export function ContactPageContent() {
  return (
    <>
      <motion.header
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.span
            className="h-px w-12 bg-accent/55"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            style={{ transformOrigin: "center" }}
            aria-hidden
          />
          <p className="font-mono text-kicker uppercase tracking-[0.22em] text-sky/85">
            Conversemos
          </p>
        </div>
        <h1 className="mt-5 font-heading text-h1 text-balance text-bone">
          Hagamos realidad tu{" "}
          <span className="text-sky">próximo proyecto</span>
        </h1>
        <p className="mt-5 text-lead text-balance text-on-ink-muted">
          Rebranding, web, video o proyecto integral — cuéntanos qué necesitas y
          diseñamos la experiencia contigo.
        </p>
      </motion.header>

      <motion.div
        className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
      >
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group rounded-box-lg border border-line bg-ink/40 p-5 text-center transition-colors hover:border-accent/40 hover:bg-ink/60 md:p-6"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fog">
              {channel.label}
            </p>
            <p className="mt-2 font-heading text-body text-bone transition-colors group-hover:text-sky">
              {channel.value}
            </p>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-sky/60">
              {channel.hint}
            </p>
          </a>
        ))}
      </motion.div>

      <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_0.85fr] lg:gap-14 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
        >
          <div className="glass-panel relative overflow-hidden rounded-box-lg border border-white/10 p-6 md:p-8 lg:p-10">
            <div className="relative mb-8 border-b border-line pb-6">
              <p className="font-mono text-kicker uppercase tracking-[0.16em] text-sky/80">
                Brief de proyecto
              </p>
              <p className="mt-2 text-small text-on-ink-muted">
                Todos los campos marcados nos ayudan a responder con precisión.
              </p>
            </div>
            <Suspense
              fallback={
                <p className="relative text-small text-on-ink-subtle">Cargando formulario…</p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </motion.div>

        <motion.aside
          className="space-y-6 lg:sticky lg:top-28"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
        >
          <div className="rounded-box-lg border border-line bg-ink/30 p-6 md:p-8">
            <p className="font-mono text-kicker uppercase tracking-[0.16em] text-fog">
              Qué pasa después
            </p>
            <ol className="mt-6 space-y-6">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="font-mono text-kicker tabular-nums text-accent">
                    {step.number}
                  </span>
                  <div>
                    <p className="font-heading text-body text-bone">{step.title}</p>
                    <p className="mt-1.5 text-small leading-relaxed text-on-ink-muted">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-box-lg border border-line bg-ink/30 p-6 md:p-8">
            <p className="font-mono text-kicker uppercase tracking-[0.16em] text-fog">
              Estudio
            </p>
            <p className="mt-3 font-heading text-h3 text-bone">{site.location}</p>
            <p className="mt-1 text-body text-on-ink-muted">{site.region}</p>
            <p className="mt-5 text-small leading-relaxed text-on-ink-subtle">
              Trabajamos con marcas en Chile y proyectos globales. Presencial en
              Limarí, remoto donde haga falta.
            </p>
          </div>

          <Link
            href="/trabajo"
            className="flex items-center justify-between rounded-box-lg border border-line bg-ink/30 px-6 py-5 transition-colors hover:border-accent/35 hover:bg-ink/50"
          >
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fog">
                Antes de escribir
              </p>
              <p className="mt-1 font-heading text-body text-bone">
                Ver portafolio →
              </p>
            </div>
            <span className="font-mono text-accent" aria-hidden>
              ↗
            </span>
          </Link>
        </motion.aside>
      </div>
    </>
  );
}

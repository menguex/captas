"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { processSteps, team } from "@/content/process";
import { estudioNarrative, positioningTechniques } from "@/content/estudio";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function EstudioContent() {
  return (
    <>
      <div className="site-container relative">
        <SectionHeader
          as="h1"
          theme="dark"
          kicker="Estudio"
          title={site.tagline}
          description="Nacimos en Ovalle con una convicción: las marcas del Limarí merecen craft de nivel global. Hoy diseñamos experiencias, producimos contenido visual y movemos marcas que compiten en Chile y más allá."
        />
      </div>

      <div className="site-container relative mt-16 aspect-[21/9]">
        <div className="relative h-full w-full overflow-hidden rounded-box-lg">
          <Image
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=85"
            alt="Producción audiovisual Captas en el valle de Limarí"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-ink/35" />
        </div>
      </div>

      <div className="site-container relative mt-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-kicker uppercase tracking-[0.18em] text-sky/85">
            Quiénes somos
          </p>
          <p className="mt-5 text-lead leading-relaxed text-bone/75">
            {estudioNarrative.who}
          </p>
          <p className="mt-5 text-body leading-relaxed text-bone/60">
            {estudioNarrative.limari}
          </p>
        </motion.div>
      </div>

      <section className="site-container relative mt-24">
        <SectionHeader
          theme="dark"
          kicker="Técnicas que funcionan"
          title="Posicionamiento probado, explicado sin jerga"
          description="Combinamos research, narrativa, sistema visual y producción para que tu marca se sienta clara, premium y memorable en cada canal."
        />

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {positioningTechniques.map((technique) => (
            <motion.article
              key={technique.id}
              variants={fadeUp}
              className="rounded-box-lg border border-line bg-ink-soft p-7 transition-colors hover:border-accent/30 md:p-8"
            >
              <h3 className="font-heading text-h3 text-bone">{technique.title}</h3>
              <p className="mt-3 text-body leading-relaxed text-on-ink-muted">
                {technique.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="site-container relative mt-24">
        <SectionHeader
          theme="dark"
          kicker="Método"
          title="De la estrategia al lanzamiento, en cuatro fases"
        />

        <motion.ol
          className="relative mt-14 space-y-0 md:grid md:grid-cols-4 md:gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {processSteps.map((step, index) => (
            <motion.li
              key={step.id}
              variants={fadeUp}
              className="relative border-t border-line py-8 md:border-t-0 md:border-l md:px-6 md:py-0 md:first:border-l-0 md:first:pl-0"
            >
              {index < processSteps.length - 1 ? (
                <span
                  className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-accent/30 md:block"
                  aria-hidden
                />
              ) : null}
              <p className="font-mono text-kicker uppercase tracking-[0.18em] text-terra">
                {step.subtitle}
              </p>
              <h3 className="mt-3 font-heading text-h3 text-bone">{step.title}</h3>
              <p className="mt-4 text-body leading-relaxed text-on-ink-muted">
                {step.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section className="site-container relative mt-24">
        <SectionHeader
          theme="dark"
          kicker="Equipo"
          title="Craft multidisciplinario, una sola voz"
          description="Director creativo, producción in-house y red senior de estrategia y desarrollo — alineados en el mismo objetivo: elevar tu marca."
        />

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              className="flex flex-col rounded-box-lg border border-line bg-ink-soft p-8 transition-colors hover:border-terra/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-kicker text-accent">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-heading text-h3 text-bone">{member.name}</h3>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-terra">
                {member.role}
              </p>
              <p className="mt-4 flex-1 text-body leading-relaxed text-bone/65">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <div className="site-container relative mt-20">
        <div className="rounded-box-lg border border-line bg-ink-soft p-8 md:p-12">
          <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
            Territorio
          </p>
          <p className="mt-4 max-w-2xl text-lead text-bone/75">
            Desde el Limarí para el mundo. Filmamos con luz de valle, diseñamos
            con sensibilidad local y ejecutamos con estándar internacional. Esa
            combinación es nuestra ventaja — y la de las marcas que acompañamos.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <MagneticButton href="/contacto">Trabajemos juntos</MagneticButton>
          <Link
            href="/servicios"
            className="font-sans text-body font-medium text-bone/70 transition-colors hover:text-sky"
          >
            Ver servicios →
          </Link>
          <Link
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-kicker uppercase tracking-[0.16em] text-bone/70 hover:text-terra"
          >
            @captas.cl →
          </Link>
        </div>
      </div>
    </>
  );
}

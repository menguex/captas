"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

type CaseStudyContentProps = {
  project: Project;
  prev: Project | null;
  next: Project | null;
};

export function CaseStudyContent({ project, prev, next }: CaseStudyContentProps) {
  return (
    <article className="relative overflow-hidden bg-ink pb-section pt-32">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.14]"
        aria-hidden
      />
      <div className="site-container relative">
        <Reveal variant="slideInLeft">
          <Link
            href="/trabajo"
            className="inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.16em] text-fog transition-colors hover:text-sky"
          >
            <span aria-hidden>←</span>
            Portafolio
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 border-b border-line pb-12 md:grid-cols-2 md:gap-16">
          <Reveal variant="fadeUpBlur">
            <div>
              <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
                {project.client} · {project.year}
              </p>
              <h1 className="mt-4 font-heading text-h1 text-bone">{project.title}</h1>
              <p className="mt-6 text-lead text-bone/70">{project.excerpt}</p>
            </div>
          </Reveal>
          <Reveal variant="fadeUpBlur" delay={0.08}>
            <div className="flex flex-col justify-end gap-6">
              <div>
                <p className="font-mono text-kicker uppercase tracking-[0.14em] text-fog">
                  Resultado
                </p>
                <p className="mt-2 font-heading text-h3 text-terra">{project.result}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-4 py-1.5 font-mono text-kicker uppercase tracking-[0.1em] text-bone/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="scaleIn" className="site-container relative mt-12 aspect-[16/9]">
        <div className="relative h-full w-full overflow-hidden rounded-box-lg border border-line/60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </Reveal>

      <div className="site-container relative mt-20">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal variant="fadeUp">
            <div>
              <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
                El desafío
              </p>
              <p className="mt-4 text-body leading-relaxed text-bone/75">
                {project.challenge}
              </p>
            </div>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.08}>
            <div>
              <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
                Nuestro enfoque
              </p>
              <p className="mt-4 text-body leading-relaxed text-bone/75">
                {project.approach}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fadeUpBlur" className="mt-16 border-t border-line pt-16">
          <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
            Sobre el proyecto
          </p>
          <p className="mt-6 max-w-3xl text-lead leading-relaxed text-bone/75">
            {project.description}
          </p>
        </Reveal>

        {project.gallery.length > 0 && (
          <div className="mt-20 grid gap-4 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal
                key={img}
                variant={i === 0 ? "scaleIn" : "fadeUp"}
                delay={i * 0.06}
                className={`relative overflow-hidden rounded-box-lg border border-line/50 ${
                  i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title} — imagen ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes={i === 0 ? "100vw" : "50vw"}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {(prev || next) && (
        <div className="site-container relative mt-24 border-t border-line pt-12">
          <div className="grid gap-6 md:grid-cols-2">
            {prev ? (
              <Reveal variant="slideInLeft">
                <Link
                  href={`/trabajo/${prev.slug}`}
                  className="group block rounded-box-lg border border-line p-6 transition-colors hover:border-accent/35"
                >
                  <p className="font-mono text-kicker uppercase tracking-[0.14em] text-fog">
                    ← Anterior
                  </p>
                  <p className="mt-3 font-heading text-h3 text-bone transition-colors group-hover:text-sky">
                    {prev.title}
                  </p>
                </Link>
              </Reveal>
            ) : (
              <div />
            )}
            {next ? (
              <Reveal variant="fadeUp">
                <Link
                  href={`/trabajo/${next.slug}`}
                  className="group block rounded-box-lg border border-line p-6 text-right transition-colors hover:border-accent/35 md:ml-auto"
                >
                  <p className="font-mono text-kicker uppercase tracking-[0.14em] text-fog">
                    Siguiente →
                  </p>
                  <p className="mt-3 font-heading text-h3 text-bone transition-colors group-hover:text-sky">
                    {next.title}
                  </p>
                </Link>
              </Reveal>
            ) : null}
          </div>
        </div>
      )}

      <Reveal variant="fadeUp" className="site-container relative mt-24 text-center">
        <p className="font-mono text-kicker uppercase tracking-[0.16em] text-fog">
          ¿Quieres resultados similares?
        </p>
        <div className="mt-8">
          <MagneticButton href="/contacto">Hablemos de tu proyecto</MagneticButton>
        </div>
      </Reveal>
    </article>
  );
}

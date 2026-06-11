"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { getFeaturedProjects } from "@/content/projects";
import { FeaturedWorkShowcase } from "@/components/home/FeaturedWorkShowcase";
import { ProjectCaseModal } from "@/components/work/ProjectCaseModal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeSectionBackdrop } from "@/components/ui/HomeSectionBackdrop";
import { easeOut, viewportOnce } from "@/lib/motion";

export function FeaturedWork() {
  const projects = getFeaturedProjects();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openProject = useCallback((project: Project, index: number) => {
    setActiveProject(project);
    setActiveIndex(index);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section
      id="trabajo-destacado"
      className="home-section-stage relative overflow-hidden bg-ink py-section"
      aria-labelledby="trabajo-destacado-heading"
    >
      <HomeSectionBackdrop variant="work" />

      <div className="site-container relative z-[1]">
        <SectionHeader
          theme="dark"
          titleId="trabajo-destacado-heading"
          kicker="Trabajo · Destacados"
          title={
            <>
              Proyectos que transformaron marcas en{" "}
              <span className="bg-gradient-to-r from-sky-soft via-sky to-bone/90 bg-clip-text text-transparent">
                experiencias memorables.
              </span>
            </>
          }
          description="Casos reales con estrategia, craft visual y resultados medibles — explora el detalle o abre el caso completo."
        />

        <FeaturedWorkShowcase projects={projects} onOpenCase={openProject} />

        <motion.div
          className="featured-work-footer mt-12 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <div className="rounded-box-lg border border-line/60 bg-[#0f1218] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="text-center md:text-left">
              <p className="font-heading text-h3 font-semibold tracking-tight text-bone">
                ¿Tu marca es el próximo caso?
              </p>
              <p className="mx-auto mt-2 max-w-md text-body leading-relaxed text-on-ink-muted md:mx-0">
                Explora todos los proyectos o cuéntanos qué quieres construir.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:shrink-0 md:mt-0">
              <Link
                href="/trabajo"
                className="gloss-button gloss-button-prose inline-flex items-center justify-center gap-2"
              >
                Ver portafolio completo
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contacto"
                className="featured-work-footer-cta inline-flex items-center justify-center gap-2 rounded-full border border-bone/25 bg-bone/8 px-6 py-3 text-body font-medium text-bone transition-colors hover:border-bone/40 hover:bg-bone/14"
              >
                Iniciar proyecto
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-tone-bridge pointer-events-none absolute inset-x-0 bottom-0 z-[2]" aria-hidden>
        <div className="section-tone-bridge__band section-tone-bridge__band--mid" />
        <div className="section-tone-bridge__band section-tone-bridge__band--bone" />
      </div>

      <ProjectCaseModal
        project={activeProject}
        index={activeIndex}
        onClose={closeProject}
      />
    </section>
  );
}

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { getFeaturedProjects } from "@/content/projects";
import { FeaturedWorkShowcase } from "@/components/home/FeaturedWorkShowcase";
import { ProjectCaseModal } from "@/components/work/ProjectCaseModal";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <section id="trabajo" className="relative overflow-hidden bg-ink py-section">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.18]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/30 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        <SectionHeader
          theme="dark"
          kicker="Trabajo · Selected"
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
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <Link
            href="/trabajo"
            className="gloss-button gloss-button-prose inline-flex items-center gap-2.5"
          >
            Ver portafolio completo
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.18em] text-on-ink-muted transition-colors hover:text-sky"
          >
            ¿Tu marca es el próximo caso?
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>

      <ProjectCaseModal
        project={activeProject}
        index={activeIndex}
        onClose={closeProject}
      />
    </section>
  );
}

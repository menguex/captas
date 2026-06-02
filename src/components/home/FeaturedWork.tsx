"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { getFeaturedProjects } from "@/content/projects";
import { PortfolioCard } from "@/components/work/PortfolioCard";
import { ProjectCaseModal } from "@/components/work/ProjectCaseModal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeaturedWork() {
  const projects = getFeaturedProjects();
  const [featured, ...rest] = projects;
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
    <section className="relative overflow-hidden bg-ink py-section">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.18]" aria-hidden />

      <div className="site-container relative">
        <SectionHeader
          theme="dark"
          kicker="Trabajo · Selected"
          title={
            <>
              Proyectos que transformaron marcas en{" "}
              <span className="text-sky">experiencias memorables.</span>
            </>
          }
          description="Cada caso es una pieza de diseño con estrategia, craft y resultado medible."
        />

        <div className="mt-14 space-y-6 md:mt-16">
          {featured ? (
            <PortfolioCard
              project={featured}
              index={0}
              variant="featured"
              onOpen={(project) => openProject(project, 0)}
            />
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <PortfolioCard
                  key={project.slug}
                  project={project}
                  index={i + 1}
                  onOpen={(p) => openProject(p, i + 1)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <motion.div
          className="mt-14 text-center md:mt-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/trabajo"
            className="gloss-button gloss-button-prose inline-flex items-center gap-2.5"
          >
            Ver portafolio completo
            <span className="text-sky" aria-hidden>
              →
            </span>
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

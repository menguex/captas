import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Proyecto — Captas" };
  return {
    title: `${project.title} — Captas`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — Captas`,
      description: project.excerpt,
      images: [{ url: project.image }],
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(params.slug);

  return <CaseStudyContent project={project} prev={prev} next={next} />;
}

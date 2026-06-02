"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { useTilt } from "@/hooks/useTilt";
import { viewportOnce } from "@/lib/motion";

type PortfolioCardProps = {
  project: Project;
  index: number;
  variant?: "featured" | "default";
  className?: string;
  onOpen?: (project: Project) => void;
};

function FeaturedCardBody({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[min(420px,52vh)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
        <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-sky/10" />
        </div>
      </div>

      <div className="flex flex-col justify-center border-t border-line p-8 md:border-l md:border-t-0 md:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4 font-mono text-kicker uppercase tracking-[0.22em] text-fog">
          <span>{number}</span>
          <span>{project.year}</span>
        </div>
        <p className="mt-6 font-mono text-small uppercase tracking-[0.22em] text-sky/90">
          {project.category}
        </p>
        <h3 className="mt-3 font-heading text-h2 leading-[1.08] tracking-tight text-balance text-bone">
          {project.title}
        </h3>
        <p className="mt-5 text-lead leading-relaxed text-bone/75">{project.excerpt}</p>
        <p className="mt-6 font-mono text-small uppercase tracking-[0.18em] text-accent">
          {project.result}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.18em] text-sky/85 transition-colors group-hover:text-sky">
          Ver caso
          <span className="transition-transform duration-base group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </>
  );
}

function DefaultCardBody({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-center justify-between font-mono text-small uppercase tracking-[0.22em] text-bone/65">
            <span>{number}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-line p-6">
        <p className="font-mono text-small uppercase tracking-[0.22em] text-sky/90">
          {project.category}
        </p>
        <h3 className="mt-2.5 font-heading text-h3 leading-tight tracking-tight text-bone">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-small leading-relaxed text-bone/72">
          {project.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line/80 pt-4">
          <p className="font-mono text-small uppercase tracking-[0.18em] leading-snug text-accent">
            {project.result}
          </p>
          <span
            className="shrink-0 font-mono text-small uppercase tracking-[0.18em] text-sky/72 transition-transform duration-base group-hover:translate-x-1 group-hover:text-sky"
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </>
  );
}

export function PortfolioCard({
  project,
  index,
  variant = "default",
  className = "",
  onOpen,
}: PortfolioCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const isFeatured = variant === "featured";
  const { ref, onMove, onLeave } = useTilt({ max: isFeatured ? 4 : 7, scale: 1.015 });

  const featuredClass =
    "group grid w-full overflow-hidden rounded-box-lg border border-line bg-ink/30 text-left transition-colors hover:border-accent/35 md:grid-cols-[1.05fr_0.95fr]";
  const defaultClass =
    "group block w-full overflow-hidden rounded-box-lg border border-line bg-ink/30 text-left transition-colors hover:border-accent/35";

  const motionProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  };

  const tiltProps = {
    ref: ref as React.RefObject<HTMLDivElement>,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { transition: "transform 0.35s ease-out" } as const,
  };

  if (isFeatured) {
    return (
      <motion.article {...motionProps} className={className}>
        <div {...tiltProps}>
          {onOpen ? (
            <button
              type="button"
              onClick={() => onOpen(project)}
              className={featuredClass}
            >
              <FeaturedCardBody project={project} number={number} />
            </button>
          ) : (
            <Link href={`/trabajo/${project.slug}`} className={featuredClass}>
              <FeaturedCardBody project={project} number={number} />
            </Link>
          )}
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article {...motionProps} className={className}>
      <div {...tiltProps}>
        {onOpen ? (
          <button type="button" onClick={() => onOpen(project)} className={defaultClass}>
            <DefaultCardBody project={project} number={number} />
          </button>
        ) : (
          <Link href={`/trabajo/${project.slug}`} className={defaultClass}>
            <DefaultCardBody project={project} number={number} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

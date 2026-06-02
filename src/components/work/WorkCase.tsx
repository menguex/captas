"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type gsap from "gsap";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type WorkCaseProps = {
  project: Project;
  index: number;
};

export function WorkCase({ project, index }: WorkCaseProps) {
  const reduced = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRight = project.align === "right";

  useEffect(() => {
    if (reduced || !imageRef.current) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !imageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    };

    void init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  const handleEnter = () => {
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        isRight ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={`/trabajo/${project.slug}`}
        className="group relative block overflow-hidden"
       
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          ref={imageRef}
          className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-slow ease-out group-hover:scale-[1.05] group-hover:opacity-0"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-slow group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-40" />
        </div>
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <span className="font-mono text-kicker uppercase tracking-[0.14em] text-bone opacity-0 transition-all duration-base group-hover:opacity-100">
            Ver caso
          </span>
          <span className="block h-px w-0 bg-terra transition-all duration-base group-hover:w-10" />
          <span className="text-terra opacity-0 transition-all group-hover:opacity-100">→</span>
        </div>
      </Link>

      <Reveal delay={index * 0.05}>
        <p className="font-mono text-kicker uppercase tracking-[0.18em] text-fog">
          {project.client} · {project.year}
        </p>
        <h3 className="mt-3 font-heading text-h2 text-bone">{project.title}</h3>
        <p className="mt-4 text-lead text-bone/75">{project.excerpt}</p>
        <p className="mt-6 font-mono text-small text-terra">{project.result}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-bone/60"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </article>
  );
}

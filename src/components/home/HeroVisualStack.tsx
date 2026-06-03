"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/content/projects";
import { heroContent } from "@/content/hero";
import { useTilt } from "@/hooks/useTilt";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const featured = getFeaturedProjects().slice(0, 3);

const cardOffsets = [
  { x: "0%", y: "0%", z: 30, rotate: -2, delay: 0.5 },
  { x: "14%", y: "8%", z: 20, rotate: 3, delay: 0.62 },
  { x: "28%", y: "2%", z: 10, rotate: -1.5, delay: 0.74 },
] as const;

type HeroVisualStackProps = {
  active: boolean;
};

export function HeroVisualStack({ active }: HeroVisualStackProps) {
  const reduced = useReducedMotion();
  const tilt = useTilt<HTMLDivElement>({ max: 5, scale: 1.015 });

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <p className="mb-4 font-mono text-kicker uppercase tracking-[0.22em] text-bone/50 lg:mb-5">
        {heroContent.visualLabel}
      </p>

      <div
        ref={tilt.ref}
        className="hero-visual-stack relative aspect-[4/5] w-full max-w-[340px] sm:max-w-[380px] lg:ml-auto lg:max-w-[420px]"
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {featured.map((project, i) => {
          const layout = cardOffsets[i] ?? cardOffsets[0];
          return (
            <motion.div
              key={project.slug}
              className="hero-visual-card absolute overflow-hidden rounded-box-lg border border-white/12 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
              style={{
                left: layout.x,
                top: layout.y,
                width: i === 0 ? "72%" : "64%",
                zIndex: layout.z,
              }}
              initial={active ? { opacity: 0, y: 40, rotate: layout.rotate - 6 } : false}
              animate={{ opacity: 1, y: 0, rotate: layout.rotate }}
              transition={{ duration: 1, delay: layout.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/trabajo/${project.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 80vw, 420px"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                  <div className="hero-visual-card-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-sky-soft">
                    {String(i + 1).padStart(2, "0")} · {project.category.split("·")[0]?.trim()}
                  </p>
                  <p className="mt-1 font-heading text-h3 font-semibold tracking-tight text-bone">
                    {project.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {!reduced ? (
        <motion.div
          className="pointer-events-none absolute -right-2 top-1/2 hidden h-20 w-20 rounded-full border border-accent/25 lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <span className="absolute inset-2 rounded-full border border-dashed border-white/15" />
        </motion.div>
      ) : null}
    </div>
  );
}

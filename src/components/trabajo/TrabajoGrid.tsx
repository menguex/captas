"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  filterProjects,
  projectFilters,
  type ProjectFilterId,
} from "@/content/projects";
import { PortfolioCard } from "@/components/work/PortfolioCard";

function isValidFilter(value: string | null): value is ProjectFilterId {
  return projectFilters.some((f) => f.id === value);
}

export function TrabajoGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get("filter");
  const initial = isValidFilter(param) ? param : "all";

  const [filter, setFilter] = useState<ProjectFilterId>(initial);

  useEffect(() => {
    setFilter(initial);
  }, [initial]);

  const updateFilter = useCallback(
    (next: ProjectFilterId) => {
      setFilter(next);
      const params = new URLSearchParams(searchParams.toString());
      if (next === "all") {
        params.delete("filter");
      } else {
        params.set("filter", next);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const filtered = filterProjects(filter);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-2 md:mt-14">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => updateFilter(f.id)}
            className={`rounded-full border px-4 py-2 font-mono text-kicker uppercase tracking-[0.12em] transition-all duration-base ${
              filter === f.id
                ? "border-accent bg-accent text-bone shadow-[0_0_20px_var(--c-accent-glow)]"
                : "border-line text-bone/60 hover:border-accent/40 hover:text-bone"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <PortfolioCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-mono text-kicker uppercase tracking-[0.14em] text-fog">
            No hay proyectos en esta categoría aún.
          </p>
          <button
            type="button"
            onClick={() => updateFilter("all")}
            className="mt-6 font-mono text-small uppercase tracking-[0.12em] text-sky transition-colors hover:text-accent"
          >
            Ver todos los proyectos
          </button>
        </div>
      ) : null}
    </>
  );
}

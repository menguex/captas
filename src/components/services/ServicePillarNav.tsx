"use client";

import { services } from "@/content/services";
import { getPillarIcon } from "@/components/icons";

export function ServicePillarNav() {
  return (
    <nav
      className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:mt-10 md:flex-wrap md:justify-center"
      aria-label="Ir a un pilar"
    >
      {services.map((s) => {
        const Icon = getPillarIcon(s.id);
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex shrink-0 items-center gap-2 rounded-full border border-line-dark bg-white/90 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-on-light-muted transition-all duration-base hover:border-accent/35 hover:text-accent"
          >
            {Icon ? (
              <span className="text-accent opacity-80 group-hover:opacity-100">
                <Icon size={14} />
              </span>
            ) : null}
            <span>{s.pillar}</span>
          </a>
        );
      })}
    </nav>
  );
}

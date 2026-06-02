"use client";

import { useEffect, useState } from "react";
import { estudioSections } from "@/content/estudio";

export function EstudioSectionNav() {
  const [active, setActive] = useState<string>(estudioSections[0].id);

  useEffect(() => {
    const ids = estudioSections.map((s) => s.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.12, 0.35, 0.55] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-[4.25rem] z-30 -mx-gutter border-b border-line/80 bg-ink/88 px-gutter py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/75"
      aria-label="Secciones del estudio"
    >
      <ul className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {estudioSections.map((section) => {
          const on = active === section.id;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className={`inline-flex rounded-full border px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] transition-colors ${
                  on
                    ? "border-accent/45 bg-accent/15 text-sky"
                    : "border-bone/15 bg-white/[0.04] text-on-ink-muted hover:border-bone/25 hover:text-bone"
                }`}
                aria-current={on ? "true" : undefined}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

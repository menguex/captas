"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  className = "",
  external = false,
}: ButtonLinkProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;

      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.22;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  const classes = `gloss-button group relative inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out ${className}`;
  const inner = <span className="relative z-10">{children}</span>;
  const handlers = reduced
    ? {}
    : { onMouseMove: onMove, onMouseLeave: onLeave };

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...handlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes} {...handlers}>
      {inner}
    </Link>
  );
}

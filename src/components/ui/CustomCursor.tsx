"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reduced) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    document.body.classList.add("captas-custom-cursor");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]");
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");

      if (cursorEl) {
        setLabel(cursorEl.getAttribute("data-cursor") || "");
        setHovering(true);
      } else if (interactive) {
        setLabel("");
        setHovering(true);
      } else {
        setLabel("");
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("captas-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, cursorX, cursorY]);

  if (reduced) return null;

  const size = label ? 80 : hovering ? 48 : 10;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ width: { duration: 0.3 }, height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
    >
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-full bg-bone"
        animate={{ scale: hovering ? 1 : 1 }}
      >
        {label && (
          <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.14em] text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

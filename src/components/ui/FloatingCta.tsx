"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FloatingCta() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const hiddenRoute = pathname === "/contacto";

  useEffect(() => {
    if (hiddenRoute) return;
    const timer = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(timer);
  }, [hiddenRoute]);

  useEffect(() => {
    if (hiddenRoute) return;

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewBottom = window.scrollY + window.innerHeight;
      setNearFooter(viewBottom >= docHeight - 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hiddenRoute]);

  // Show tooltip once after visible
  useEffect(() => {
    if (!visible) return;
    const showTimer = setTimeout(() => setExpanded(true), 4500);
    const hideTimer = setTimeout(() => setExpanded(false), 11500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  const showTooltip = expanded || hovered;

  if (hiddenRoute) return null;

  return (
    <AnimatePresence>
      {visible && !nearFooter && (
        <motion.div
          className="fixed bottom-6 right-6 z-[100] flex items-end gap-3 md:bottom-8 md:right-8"
          initial={reduced ? false : { opacity: 0, y: 20, scale: 0.85 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Sophisticated tooltip bubble */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="hidden overflow-hidden rounded-2xl border border-accent/15 bg-ink/85 shadow-[0_12px_40px_rgba(61,85,108,0.2)] backdrop-blur-xl sm:block"
                initial={{ opacity: 0, x: 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative px-5 py-3.5">
                  {/* Top hairline */}
                  <span
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                    aria-hidden
                  />
                  <p className="font-heading text-small font-medium text-bone">
                    Hablemos de tu proyecto
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fog">
                    <span
                      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                      aria-hidden
                    />
                    Respuesta en 24–48 h hábiles
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button — refined gradient with two rings */}
          <a
            href={site.whatsapp}
            {...(site.whatsappIsExternal
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {})}
            aria-label="Enviar mensaje por WhatsApp"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(40,61,79,0.35)] transition-all duration-base hover:scale-105 hover:shadow-[0_16px_48px_rgba(40,61,79,0.45)]"
            style={{
              background: "linear-gradient(135deg, #4d9fff 0%, #0056d6 100%)",
            }}
          >
            {/* Outer subtle ring */}
            <span
              className="pointer-events-none absolute -inset-1 rounded-full border border-accent/30 opacity-60"
              aria-hidden
            />
            {/* Pulse ring — slower, more elegant */}
            {!reduced ? (
              <span
                className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-accent/20"
                style={{ animationDuration: "2.5s" }}
                aria-hidden
              />
            ) : null}

            {/* WhatsApp icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              className="relative z-10"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

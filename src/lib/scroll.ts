import type Lenis from "lenis";

export function scrollToId(
  id: string,
  lenis: Lenis | null,
  options?: { offset?: number; duration?: number }
) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = options?.offset ?? -88;
  const duration = options?.duration ?? 1.15;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

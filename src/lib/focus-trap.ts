const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

/** Mantiene el foco dentro de `container`; Escape opcional. */
export function createFocusTrap(
  container: HTMLElement,
  options?: { onEscape?: () => void; returnFocus?: HTMLElement | null }
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      options?.onEscape?.();
      return;
    }
    if (e.key !== "Tab") return;

    const focusable = getFocusableElements(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (active === first || !container.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    options?.returnFocus?.focus();
  };
}

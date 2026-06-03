"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { createFocusTrap } from "@/lib/focus-trap";

const navLinks = [
  { href: "/trabajo", label: "Trabajo" },
  { href: "/estudio", label: "Estudio" },
  { href: "/servicios", label: "Servicios" },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const menuVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

function NavLink({
  href,
  label,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  if (mobile) {
    return (
      <Link
        href={href}
        className={`font-heading text-h2 transition-colors ${
          active ? "text-sky" : "text-bone hover:text-sky"
        }`}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`site-header-link group relative font-mono text-kicker uppercase tracking-[0.22em] transition-colors duration-base ${
        active ? "text-sky" : ""
      }`}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-accent shadow-[0_0_8px_var(--c-accent-glow)] transition-all duration-base ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 32;
  const overHero = pathname === "/" && scrollY < 120;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const release = createFocusTrap(menuRef.current, {
      onEscape: () => setMenuOpen(false),
      returnFocus: menuButtonRef.current,
    });

    const firstLink = menuRef.current.querySelector("a");
    firstLink?.focus();

    return release;
  }, [menuOpen]);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-base ease-out ${
          overHero && !scrolled ? "site-header--hero-cinematic" : ""
        } ${
          scrolled
            ? "site-header--scrolled border-b border-accent/20 shadow-[0_8px_32px_rgba(var(--c-accent-rgb),0.12)] backdrop-blur-2xl"
            : "border-b border-transparent shadow-[0_4px_24px_rgba(var(--c-accent-rgb),0.06)] backdrop-blur-md"
        }`}
      >
        <div className="site-container flex h-[4.5rem] items-center justify-between md:h-20">
          <Link
            href="/"
            className="site-header-logo"
            onClick={() => setMenuOpen(false)}
          >
            <CaptasLogo withMark />
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Principal">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <Link href="/contacto" className="gloss-button py-2.5">
              Conversemos
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((open) => !open)}
            >
            <span
              className={`site-header-icon block h-px w-6 transition-transform duration-base ease-out ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`site-header-icon block h-px w-6 transition-opacity duration-base ease-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`site-header-icon block h-px w-6 transition-transform duration-base ease-out ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            className="fixed inset-0 z-40 flex flex-col bg-ink gloss-ambient md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-6 px-gutter pt-24"
              aria-label="Enlaces principales"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    mobile
                    onClick={() => setMenuOpen(false)}
                  />
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Link
                  href="/contacto"
                  className="gloss-button inline-flex"
                  onClick={() => setMenuOpen(false)}
                >
                  Conversemos
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

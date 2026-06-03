import type { ReactNode } from "react";
import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FooterAssistant } from "@/components/footer/FooterAssistant";
import { FooterTerritoryCard } from "@/components/footer/FooterTerritoryCard";
import { footerContent } from "@/content/footer";
import { site, socialLinks } from "@/content/site";
import { services } from "@/content/services";

const navLinks = [
  { href: "/trabajo", label: "Trabajo" },
  { href: "/estudio", label: "Estudio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Conversemos" },
];

const craftTags = ["UX/UI", "Branding", "Foto", "Cine", "Web", "Motion"] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-subtle">
        {title}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/40 bg-ink text-bone">
      {/* Ambiente 2026 — sin foto full-bleed (legibilidad + coherencia con CTA/Estudio) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(91,97,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_80%,rgba(0,122,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-soft/40 via-ink to-ink" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="absolute inset-0 mesh-grid opacity-[0.05]" />
      </div>

      <div className="site-container relative z-10 px-gutter">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-line/50 py-12 md:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-block text-bone/95 transition-colors hover:text-sky"
            >
              <CaptasLogo size="md" shimmer withMark />
            </Link>
            <p className="mt-5 font-mono text-kicker uppercase tracking-[0.2em] text-sky">
              {footerContent.kicker} · {site.region}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-bone">
              {footerContent.headline}
            </h2>
            <p className="mt-3 max-w-md text-body leading-relaxed text-on-ink-muted">
              {footerContent.subline}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch lg:gap-4">
            <MagneticButton href="/contacto" className="w-full justify-center sm:w-auto lg:min-w-[220px]">
              {footerContent.ctaPrimary}
            </MagneticButton>
            <a
              href={site.whatsapp}
              {...(site.whatsappIsExternal
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center justify-center rounded-full border border-line/80 bg-white/[0.04] px-6 py-3 font-mono text-kicker uppercase tracking-[0.18em] text-on-ink-muted transition-colors hover:border-sky/40 hover:text-sky"
            >
              {site.whatsappIsExternal
                ? `${footerContent.ctaWhatsApp} →`
                : `${footerContent.ctaContact} →`}
            </a>
          </div>
        </div>

        {/* Bento: enlaces + territorio en ventana */}
        <div className="grid gap-10 border-b border-line/50 py-12 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-10 lg:py-14">
          <div className="lg:col-span-2">
            <FooterColumn title="Navegación">
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-body text-on-ink-muted">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Servicios">
              <ul className="space-y-2.5">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/contacto?servicio=${service.id}`}
                      className="footer-link text-body text-on-ink-muted"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Contacto">
              <ul className="space-y-2.5 text-body text-on-ink-muted">
                <li>
                  <a href={`mailto:${site.email}`} className="footer-link">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsapp}
                    {...(site.whatsappIsExternal
                      ? { target: "_blank" as const, rel: "noopener noreferrer" }
                      : {})}
                    className="footer-link"
                  >
                    {site.whatsappIsExternal ? "WhatsApp" : footerContent.ctaContact}
                  </a>
                </li>
                <li className="text-on-ink-subtle">{site.location}</li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Redes">
              <ul className="space-y-2.5">
                {socialLinks.map((link) =>
                  link.href.startsWith("/") ? (
                    <li key={link.href}>
                      <Link href={link.href} className="footer-link text-body text-on-ink-muted">
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          link.href.startsWith("http") ? "noopener noreferrer" : undefined
                        }
                        className="footer-link text-body text-on-ink-muted"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </FooterColumn>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <FooterTerritoryCard />
          </div>
        </div>

        {/* Guía rápida */}
        <div className="border-b border-line/50 py-10 md:py-12">
          <FooterAssistant />
        </div>

        {/* Crafts */}
        <div className="border-b border-line/50 py-8">
          <p className="font-mono text-kicker uppercase tracking-[0.2em] text-on-ink-subtle">
            {footerContent.craftsLabel}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" role="list">
            {craftTags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-full border border-line/70 bg-white/[0.04] px-3 py-1.5 font-mono text-small uppercase tracking-[0.16em] text-on-ink-muted backdrop-blur-sm">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 py-6 font-mono text-small tracking-[0.04em] text-on-ink-subtle md:flex-row md:items-center md:justify-between md:gap-6">
          <p>© {year} Captas. Todos los derechos reservados.</p>
          <p className="tabular-nums">
            <LocalTime />
          </p>
          <p>{footerContent.legalCraft}</p>
        </div>
      </div>
    </footer>
  );
}

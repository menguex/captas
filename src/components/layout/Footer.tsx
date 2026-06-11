import type { ReactNode } from "react";
import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { FooterAssistant } from "@/components/footer/FooterAssistant";
import { FooterBackgroundMedia } from "@/components/footer/FooterBackgroundMedia";
import { CraftChips } from "@/components/ui/CraftChips";
import { FooterCtaBlock } from "@/components/footer/FooterCtaBlock";
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
    <footer
      id="conversemos"
      className="footer-unified relative overflow-hidden bg-ink text-bone"
    >
      <FooterBackgroundMedia />

      <FooterCtaBlock />

      <div className="footer-site relative z-10 border-t border-white/[0.1]">
        <div className="site-container px-gutter">
          <div className="flex flex-col gap-4 border-b border-line/40 py-10 md:flex-row md:items-center md:justify-between md:py-12">
            <Link
              href="/"
              className="inline-block text-bone/95 transition-colors hover:text-sky"
            >
              <CaptasLogo size="md" shimmer withMark />
            </Link>
            <p className="max-w-md font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-on-ink-muted">
              {footerContent.subline}
            </p>
          </div>

          <div className="grid gap-10 border-b border-line/40 py-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 lg:py-14">
            <div>
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

            <div>
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

            <div>
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
          </div>

          <div className="border-b border-line/40 py-10 md:py-12">
            <FooterAssistant />
          </div>

          <div className="border-b border-line/40 py-8">
            <p className="font-heading text-body font-medium text-on-ink-muted">
              {footerContent.craftsLabel}
            </p>
            <div className="mt-5">
              <CraftChips items={craftTags} theme="dark" className="!justify-start" />
            </div>
          </div>

          <div className="flex flex-col gap-3 py-6 font-mono text-small tracking-[0.04em] text-on-ink-subtle md:flex-row md:items-center md:justify-between md:gap-6">
            <p>
              © {year} {footerContent.kicker}. Todos los derechos reservados.
            </p>
            <p className="tabular-nums">
              <LocalTime />
            </p>
            <p>{footerContent.legalCraft}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

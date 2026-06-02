import Image from "next/image";
import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FooterAssistant } from "@/components/footer/FooterAssistant";
import { footerTerritoryImage } from "@/content/territory";
import { site, socialLinks } from "@/content/site";
import { services } from "@/content/services";

const navLinks = [
  { href: "/trabajo", label: "Trabajo" },
  { href: "/estudio", label: "Estudio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

const craftTags = ["UX/UI", "Branding", "Foto", "Cine", "Web", "Motion"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={footerTerritoryImage.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: footerTerritoryImage.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/88 to-ink/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/82 to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_85%,rgba(199,91,57,0.1),transparent_50%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] mesh-grid opacity-[0.06]" aria-hidden />

      <div className="site-container relative z-10 pt-section">
        <div className="flex flex-col gap-10 border-b border-bone/15 pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="group inline-block text-bone/95 transition-colors hover:text-sky"
            >
              <CaptasLogo size="xl" shimmer withMark />
            </Link>
            <p className="mt-6 max-w-lg font-heading text-h2 leading-[1.14] tracking-tight text-balance text-bone/92">
              {site.tagline}
            </p>
            <p className="mt-5 text-lead leading-relaxed text-on-ink-muted">
              {site.location} · {site.region}
            </p>
            <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-on-ink-subtle">
              {footerTerritoryImage.credit}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <MagneticButton href="/contacto" className="px-8 py-3.5">
              Iniciar proyecto
            </MagneticButton>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-muted transition-colors hover:text-sky"
            >
              WhatsApp directo →
            </a>
          </div>
        </div>

        <div className="border-b border-bone/15 py-8 md:py-10">
          <FooterAssistant />
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-muted">
              Navegación
            </p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-body text-on-ink-muted transition-colors hover:text-sky"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-muted">
              Servicios
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/contacto?servicio=${service.id}`}
                    className="footer-link text-body text-on-ink-muted transition-colors hover:text-sky"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-muted">
              Contacto
            </p>
            <ul className="mt-6 space-y-3 text-body text-on-ink-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="footer-link transition-colors hover:text-sky"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link transition-colors hover:text-sky"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-on-ink-muted">{site.location}</li>
              <li className="text-on-ink-muted">{site.region}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-on-ink-muted">
              Redes
            </p>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-body text-on-ink-muted transition-colors hover:text-sky"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="footer-link text-body text-on-ink-muted transition-colors hover:text-sky"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-bone/15 py-8">
          {craftTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bone/15 bg-ink/45 px-3 py-1.5 font-mono text-small uppercase tracking-[0.2em] text-on-ink-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/15 py-6 font-mono text-small tracking-[0.04em] text-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} Captas. Todos los derechos reservados.</p>
          <p className="text-on-ink-muted">
            <LocalTime />
          </p>
          <p className="text-on-ink-muted">Craft desde el valle · Chile</p>
        </div>
      </div>
    </footer>
  );
}

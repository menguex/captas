import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { CaptasLogo } from "@/components/brand/CaptasLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FooterAssistant } from "@/components/footer/FooterAssistant";
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.1]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-30" aria-hidden />

      <div className="site-container relative pt-section">
        <div className="flex flex-col gap-10 border-b border-line pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="group inline-block text-bone/95 transition-colors hover:text-sky"
            >
              <CaptasLogo size="xl" shimmer />
            </Link>
            <p className="mt-6 max-w-lg font-heading text-h2 leading-[1.14] tracking-tight text-balance text-bone/92">
              {site.tagline}
            </p>
            <p className="mt-5 text-lead leading-relaxed text-bone/65">
              {site.location} · {site.region}
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
              className="font-mono text-kicker uppercase tracking-[0.22em] text-bone/65 transition-colors hover:text-sky"
            >
              WhatsApp directo →
            </a>
          </div>
        </div>

        <div className="border-b border-line py-8 md:py-10">
          <FooterAssistant />
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-fog">
              Navegación
            </p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-body text-bone/85 transition-colors hover:text-sky"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-fog">
              Servicios
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/contacto?servicio=${service.id}`}
                    className="footer-link text-body text-bone/80 transition-colors hover:text-sky"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-fog">
              Contacto
            </p>
            <ul className="mt-6 space-y-3 text-body text-bone/85">
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
              <li className="text-bone/72">{site.location}</li>
              <li className="text-bone/72">{site.region}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-kicker uppercase tracking-[0.22em] text-fog">
              Redes
            </p>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-body text-bone/85 transition-colors hover:text-sky"
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
                      className="footer-link text-body text-bone/85 transition-colors hover:text-sky"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line py-8">
          {craftTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line/80 bg-white/[0.03] px-3 py-1.5 font-mono text-small uppercase tracking-[0.2em] text-on-ink-subtle"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line/80 py-6 font-mono text-small tracking-[0.04em] text-fog md:flex-row md:items-center md:justify-between">
          <p>© {year} Captas. Todos los derechos reservados.</p>
          <p className="text-on-ink-subtle">
            <LocalTime />
          </p>
          <p className="text-on-ink-subtle">Craft desde el valle · Chile</p>
        </div>
      </div>
    </footer>
  );
}

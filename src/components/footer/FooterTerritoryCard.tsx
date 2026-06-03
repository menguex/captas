import Image from "next/image";
import Link from "next/link";
import { footerTerritoryImage } from "@/content/territory";
import { footerContent } from "@/content/footer";

export function FooterTerritoryCard() {
  return (
    <article className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-box-lg border border-line/80 bg-ink-soft/60 lg:min-h-0">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:min-h-[168px] lg:flex-1">
        <Image
          src={footerTerritoryImage.src}
          alt={footerTerritoryImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 360px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: footerTerritoryImage.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(91,97,255,0.2),transparent_55%)]" />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="font-mono text-kicker uppercase tracking-[0.2em] text-sky">
            {footerContent.territoryEyebrow}
          </p>
          <h3 className="mt-2 font-heading text-h3 font-semibold tracking-tight text-bone">
            {footerContent.territoryTitle}
          </h3>
          <p className="mt-2 text-small leading-relaxed text-on-ink-muted">
            {footerContent.territoryBody}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/50 pt-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-on-ink-subtle">
            {footerTerritoryImage.credit}
          </p>
          <Link
            href="/estudio"
            className="font-mono text-kicker uppercase tracking-[0.14em] text-on-ink-muted transition-colors hover:text-sky"
          >
            Cómo trabajamos →
          </Link>
        </div>
      </div>
    </article>
  );
}

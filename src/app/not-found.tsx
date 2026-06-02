import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-ink px-gutter pb-section pt-32 text-center">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.18]" aria-hidden />

      {/* Glowing orbs */}
      <div
        className="pointer-events-none absolute left-1/3 top-1/4 h-[min(280px,50vw)] w-[min(280px,50vw)] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(0,122,255,0.12)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/3 bottom-1/4 h-[min(200px,40vw)] w-[min(200px,40vw)] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(100,210,255,0.08)" }}
        aria-hidden
      />

      {/* Giant 404 behind */}
      <p
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[clamp(10rem,30vw,22rem)] leading-none tracking-tighter"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,122,255,0.12) 0%, rgba(100,210,255,0.06) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        404
      </p>

      <p className="relative font-mono text-kicker uppercase tracking-[0.22em] text-sky/80">
        Error 404
      </p>
      <h1 className="relative mt-6 max-w-xl font-heading text-h1 text-bone">
        Esta pagina no existe — pero tu proximo proyecto{" "}
        <span className="text-sky">si puede.</span>
      </h1>
      <p className="relative mt-6 max-w-md text-lead text-bone/60">
        El enlace puede estar roto o la pagina fue movida. Vuelve al inicio o
        explora nuestro trabajo.
      </p>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton href="/">Ir al inicio</MagneticButton>
        <Link
          href="/trabajo"
          className="font-mono text-kicker uppercase tracking-[0.12em] text-bone/65 transition-colors hover:text-sky"
        >
          Ver portafolio →
        </Link>
      </div>
    </div>
  );
}

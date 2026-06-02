import type { Metadata } from "next";
import { EstudioContent } from "@/components/estudio/EstudioContent";

export const metadata: Metadata = {
  title: "Estudio — Captas",
  description:
    "Red creativa online: un director, squad a medida y UX, foto, cine, web y marca con una sola voz. Fácil de entender, craft de nivel global.",
};

export default function EstudioPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-28 text-bone md:pt-32">
      <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.1]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(55vh,520px)] bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(91,97,255,0.14),transparent_70%)]"
        aria-hidden
      />
      <EstudioContent />
    </div>
  );
}

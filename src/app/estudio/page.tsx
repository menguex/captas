import type { Metadata } from "next";
import { EstudioContent } from "@/components/estudio/EstudioContent";

export const metadata: Metadata = {
  title: "Estudio — Captas",
  description:
    "Red creativa online: un director, squad a medida y UX, foto, cine, web y marca con una sola voz. Fácil de entender, craft de nivel global.",
};

export default function EstudioPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-32 text-bone">
      <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.14]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(91,97,255,0.16),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_40%,rgba(14,165,233,0.1),transparent_45%)]"
        aria-hidden
      />
      <EstudioContent />
    </div>
  );
}

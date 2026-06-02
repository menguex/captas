import type { Metadata } from "next";
import { EstudioContent } from "@/components/estudio/EstudioContent";

export const metadata: Metadata = {
  title: "Estudio — Captas",
  description:
    "Captas no es un local: es una red creativa online que une UX, motion, foto, cine, web y marca bajo un solo director de proyecto.",
};

export default function EstudioPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-32 text-bone">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.12]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,97,255,0.12),transparent_50%)]"
        aria-hidden
      />
      <EstudioContent />
    </div>
  );
}

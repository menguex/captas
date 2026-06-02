import type { Metadata } from "next";
import { EstudioContent } from "@/components/estudio/EstudioContent";

export const metadata: Metadata = {
  title: "Estudio — Captas",
  description:
    "Cómo trabajamos contigo en 3 pasos: un brief, un squad a medida y entregas alineadas. Red creativa online desde el Limarí.",
};

export default function EstudioPage() {
  return (
    <div className="relative overflow-x-clip bg-ink text-bone">
      <div className="pointer-events-none absolute inset-0 gloss-ambient opacity-40" aria-hidden />
      <EstudioContent />
    </div>
  );
}

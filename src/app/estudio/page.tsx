import type { Metadata } from "next";
import { EstudioContent } from "@/components/estudio/EstudioContent";

export const metadata: Metadata = {
  title: "Estudio — Captas",
  description:
    "Conoce Captas: agencia UX/UI y creativa en el Limarí. Técnicas de posicionamiento, proceso y equipo con craft de nivel global.",
};

export default function EstudioPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-32">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.14]"
        aria-hidden
      />
      <EstudioContent />
    </div>
  );
}

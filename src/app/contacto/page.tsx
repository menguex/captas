import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Conversemos — Captas",
  description:
    "Cuéntanos tu proyecto. UX/UI, fotografía, web, video y branding con craft premium desde el Limarí.",
  openGraph: {
    title: "Conversemos — Captas",
    description:
      "Inicia tu proyecto con Captas. Respuesta en 24–48 horas hábiles.",
  },
};

export default function ContactoPage() {
  return (
    <div className="relative overflow-hidden bg-ink pb-section pt-32">
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.14]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 gloss-ambient opacity-40"
        aria-hidden
      />
      <div className="site-container relative">
        <ContactPageContent />
      </div>
    </div>
  );
}

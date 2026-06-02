import { processSteps } from "@/content/process";
import { testimonials } from "@/content/process";

/** Cierre ligero — debajo del ecosistema en /servicios */
export const serviciosBelow = {
  method: {
    kicker: "Método",
    line: "Cuatro etapas. Un solo estándar.",
    steps: processSteps.map((s) => ({ id: s.id, title: s.title, subtitle: s.subtitle })),
  },
  stats: [
    { value: "120+", label: "Proyectos" },
    { value: "8", label: "Años de craft" },
    { value: "92%", label: "Recomiendan" },
  ] as const,
  quote: {
    text: "Captas entendió nuestra marca mejor que nosotros.",
    author: testimonials[0].author,
    company: testimonials[0].company,
  },
  cta: {
    line: "¿Listo? Cuéntanos en 30 minutos.",
    primary: "Solicitar propuesta",
    secondary: "Ver casos",
  },
};

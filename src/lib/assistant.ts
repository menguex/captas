import { services } from "@/content/services";
import { site } from "@/content/site";

export type AssistantRecommendation = {
  reply: string;
  serviceId: string | null;
  serviceTitle: string | null;
  contactUrl: string;
  confidence: "high" | "medium" | "explore";
};

export const assistantIntents = [
  {
    id: "web",
    label: "Rediseñar mi web",
    message: "Necesito rediseñar o crear mi sitio web con buen diseño y performance.",
  },
  {
    id: "branding",
    label: "Identidad de marca",
    message: "Quiero desarrollar o renovar la identidad visual de mi marca.",
  },
  {
    id: "foto",
    label: "Fotografía",
    message: "Busco fotografía profesional para mi marca o producto.",
  },
  {
    id: "video",
    label: "Video / cine",
    message: "Necesito un video cinematográfico o contenido audiovisual para mi marca.",
  },
  {
    id: "ux",
    label: "UX / app digital",
    message: "Quiero mejorar la experiencia de usuario de mi producto digital o app.",
  },
  {
    id: "explore",
    label: "No sé por dónde empezar",
    message: "Tengo un proyecto pero no sé qué servicio necesito. ¿Me orientan?",
  },
] as const;

/** Flujo guiado compacto — objetivo → pilar → contacto */
export const guideGoals = [
  {
    id: "convert",
    step: "Paso 1 · Objetivo",
    question: "¿Qué quieres lograr primero?",
    label: "Vender y convertir más",
    hint: "Más leads, reservas o ventas online",
    serviceIds: ["ux-ui", "diseno-web"] as const,
  },
  {
    id: "brand",
    step: "Paso 1 · Objetivo",
    question: "¿Qué quieres lograr primero?",
    label: "Renovar mi marca",
    hint: "Identidad, posicionamiento, coherencia visual",
    serviceIds: ["branding", "ux-ui"] as const,
  },
  {
    id: "visual",
    step: "Paso 1 · Objetivo",
    question: "¿Qué quieres lograr primero?",
    label: "Contenido visual premium",
    hint: "Foto, video o piezas para campañas",
    serviceIds: ["fotografia", "video-cinematografico"] as const,
  },
  {
    id: "explore",
    step: "Paso 1 · Objetivo",
    question: "¿Qué quieres lograr primero?",
    label: "Aún no lo tengo claro",
    hint: "Te orientamos en 2 minutos",
    serviceIds: ["branding", "ux-ui", "diseno-web"] as const,
  },
] as const;

export type GuideGoalId = (typeof guideGoals)[number]["id"];

const serviceKeywords: Record<string, string[]> = {
  "ux-ui": [
    "ux",
    "ui",
    "app",
    "aplicación",
    "interfaz",
    "usuario",
    "producto digital",
    "prototipo",
    "wireframe",
    "conversión",
    "ecommerce",
    "e-commerce",
  ],
  fotografia: [
    "foto",
    "fotografía",
    "fotografia",
    "sesión",
    "sesion",
    "producto",
    "retrato",
    "imagen",
    "shooting",
    "packshot",
  ],
  "diseno-web": [
    "web",
    "sitio",
    "página",
    "pagina",
    "landing",
    "next",
    "desarrollo",
    "wordpress",
    "cms",
    "seo",
    "digital",
  ],
  "video-cinematografico": [
    "video",
    "cine",
    "cinematográfico",
    "cinematografico",
    "spot",
    "reel",
    "film",
    "filmación",
    "filmacion",
    "audiovisual",
    "comercial",
  ],
  branding: [
    "marca",
    "branding",
    "logo",
    "identidad",
    "naming",
    "packaging",
    "manual",
    "posicionamiento",
    "rebranding",
  ],
};

export function buildAssistantSystemPrompt() {
  const catalog = services
    .map(
      (s) =>
        `- id: ${s.id} | ${s.title}: ${s.short}. Entregables: ${s.deliverables.slice(0, 3).join(", ")}.`
    )
    .join("\n");

  return `Eres el asistente de Captas, agencia creativa en ${site.location}, ${site.region}.
Tu rol: entender qué busca el visitante y recomendar el servicio más adecuado con tono cercano, profesional y en español chileno neutro.
Servicios disponibles:
${catalog}

Responde SIEMPRE en JSON válido (sin markdown) con esta forma:
{
  "reply": "2-4 oraciones útiles, concretas, sin ser genérico",
  "serviceId": "id del servicio o null si no está claro",
  "confidence": "high" | "medium" | "explore"
}

Si el usuario no sabe por dónde empezar, haz 1 pregunta breve o sugiere empezar por branding o una llamada.
No inventes precios ni plazos. Invita a contacto cuando tenga sentido.`;
}

export function recommendLocally(message: string): AssistantRecommendation {
  const text = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const scores = Object.entries(serviceKeywords).map(([serviceId, keywords]) => ({
    serviceId,
    score: keywords.reduce((acc, kw) => (text.includes(kw) ? acc + 1 : acc), 0),
  }));

  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];
  const service = services.find((s) => s.id === best?.serviceId);

  if (!best || best.score === 0 || !service) {
    return {
      reply:
        "Gracias por contarnos. Con lo que describes, lo ideal es una conversación corta para mapear objetivo, plazos y alcance. Podemos orientarte en branding, web, foto, video o UX — según lo que más impacte tu marca ahora.",
      serviceId: null,
      serviceTitle: null,
      contactUrl: "/contacto",
      confidence: "explore",
    };
  }

  const confidence: AssistantRecommendation["confidence"] =
    best.score >= 2 ? "high" : "medium";

  return {
    reply: `Por lo que comentas, ${service.title} encaja muy bien: ${service.short} Te proponemos un primer contacto para afinar alcance y entregables.`,
    serviceId: service.id,
    serviceTitle: service.title,
    contactUrl: `/contacto?servicio=${service.id}`,
    confidence,
  };
}

export function parseAssistantJson(raw: string): AssistantRecommendation | null {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as {
      reply?: string;
      serviceId?: string | null;
      confidence?: AssistantRecommendation["confidence"];
    };

    if (!parsed.reply) return null;

    const service = parsed.serviceId
      ? services.find((s) => s.id === parsed.serviceId)
      : null;

    return {
      reply: parsed.reply,
      serviceId: service?.id ?? null,
      serviceTitle: service?.title ?? null,
      contactUrl: service ? `/contacto?servicio=${service.id}` : "/contacto",
      confidence: parsed.confidence ?? (service ? "high" : "explore"),
    };
  } catch {
    return null;
  }
}

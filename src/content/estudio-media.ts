/** Medios por capítulo — Estudio */

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const mixkit = (slug: string) =>
  `https://assets.mixkit.co/videos/preview/mixkit-${slug}-large.mp4`;

export type EstudioJourneyMedia = {
  id: string;
  image: string;
  imageAlt: string;
  video?: string;
  objectPosition?: string;
  credit?: string;
};

export const estudioJourneyMedia: readonly EstudioJourneyMedia[] = [
  {
    id: "brief",
    image: unsplash("photo-1460925895917-afdab827c52f"),
    imageAlt: "Mesa de trabajo — definición de brief y alcance",
    video: mixkit("aerial-view-of-a-sunny-landscape-4246"),
    objectPosition: "50% 40%",
    credit: "Dirección · brief",
  },
  {
    id: "squad",
    image: unsplash("photo-1625246333195-78d9c38ad449"),
    imageAlt: "Producción en terreno — squad creativo",
    video: mixkit("hands-holding-a-basket-full-of-vegetables-4076"),
    objectPosition: "50% 42%",
    credit: "Craft · foto y cine",
  },
  {
    id: "entrega",
    image: "/images/estudio/azul.jpg",
    imageAlt: "Territorio y entrega — Captas Limarí",
    video: mixkit("aerial-view-of-a-sunny-landscape-4246"),
    objectPosition: "50% 45%",
    credit: "Entrega · desde el valle",
  },
] as const;

export function getEstudioMedia(stepId: string) {
  return estudioJourneyMedia.find((m) => m.id === stepId);
}

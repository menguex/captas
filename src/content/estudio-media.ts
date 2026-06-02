/** Medios del recorrido Estudio — fondos por paso */

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
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85",
    imageAlt: "Equipo revisando un brief creativo en mesa de trabajo",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-4242-large.mp4",
    objectPosition: "50% 35%",
    credit: "Dirección · brief y estrategia",
  },
  {
    id: "squad",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=85",
    imageAlt: "Producción en terreno — craft visual Captas",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-4370-large.mp4",
    objectPosition: "50% 45%",
    credit: "Producción · foto, cine y motion",
  },
  {
    id: "entrega",
    image: "/images/territory/alameda-plaza-hero.jpg",
    imageAlt: "Alameda y plaza de Ovalle — territorio Captas",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-sunny-landscape-4246-large.mp4",
    objectPosition: "52% 38%",
    credit: "Reportaje · Alameda y Plaza Ovalle",
  },
] as const;

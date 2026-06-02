/**
 * Medios — recorrido Estudio (scroll + video scrub)
 *
 * AUDITORÍA (criterio narrativo + técnico)
 * ───────────────────────────────────────
 * Paso 1 · Brief
 *   Antes: tráfico nocturno (no conectaba con “un solo brief”).
 *   Ahora: poster UX/research + video aéreo lento = visión del reto completo.
 *   Ideal Captas: reunión director + cliente, wireframes en mesa.
 *
 * Paso 2 · Squad
 *   Antes: fuego de chef desconectado del campo Limarí.
 *   Ahora: foto cooperativa + video producto en manos = foto y producción en terreno.
 *   Alternativa stock: chef-preparing-a-dish-with-fire (cine). Ideal: BTS FX30 en set.
 *
 * Paso 3 · Entrega
 *   Imagen propia: /images/estudio/azul.jpg + video aéreo en scrub.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const mixkit = (slug: string) =>
  `https://assets.mixkit.co/videos/preview/mixkit-${slug}-large.mp4`;

export type EstudioJourneyMedia = {
  id: string;
  image: string;
  imageAlt: string;
  /** Video scrubbeado con el scroll (sin loop) */
  video: string;
  objectPosition?: string;
  credit?: string;
  /** Segundos opcionales del clip a usar (recorte suave) */
  trim?: { start: number; end?: number };
};

export const estudioJourneyMedia: readonly EstudioJourneyMedia[] = [
  {
    id: "brief",
    image: unsplash("photo-1460925895917-afdab827c52f"),
    imageAlt: "Mesa de trabajo con métricas y UX — definición de objetivo y alcance",
    video: mixkit("aerial-view-of-a-sunny-landscape-4246"),
    objectPosition: "50% 40%",
    credit: "Visión · brief y dirección",
    trim: { start: 0 },
  },
  {
    id: "squad",
    image: unsplash("photo-1625246333195-78d9c38ad449"),
    imageAlt: "Campo y producción en el Limarí — squad creativo en terreno",
    video: mixkit("hands-holding-a-basket-full-of-vegetables-4076"),
    objectPosition: "50% 42%",
    credit: "Craft · foto, cine y motion",
    trim: { start: 0 },
  },
  {
    id: "entrega",
    image: "/images/estudio/azul.jpg",
    imageAlt: "Captas — entrega con identidad y territorio Limarí",
    video: mixkit("aerial-view-of-a-sunny-landscape-4246"),
    objectPosition: "50% 45%",
    credit: "Entrega · craft desde el valle",
    trim: { start: 0 },
  },
] as const;

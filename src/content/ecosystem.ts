/** Copy y media del bloque «ecosistema creativo» (home + /servicios) */
export const ecosystemIntro = {
  kicker: "Servicios · 5 pilares",
  titleLead: "Un ecosistema creativo para",
  titleAccent: "elevar tu marca.",
  description:
    "Un solo equipo orquesta experiencia, imagen, web, cine y marca — con el azul Captas como hilo conductor y estándar de craft en cada entrega.",
  highlights: [
    { value: "5", label: "Disciplinas" },
    { value: "1", label: "Dirección" },
    { value: "360°", label: "Marca" },
  ] as const,
};

/** Video ambiental por pilar (Mixkit, muted loop — URLs ya usadas en el sitio) */
export const ecosystemPillarVideos: Partial<Record<string, string>> = {
  "ux-ui":
    "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-4242-large.mp4",
  fotografia:
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-sunny-landscape-4246-large.mp4",
  "diseno-web":
    "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-4242-large.mp4",
  "video-cinematografico":
    "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-fire-4370-large.mp4",
  branding:
    "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-basket-full-of-vegetables-4076-large.mp4",
};

import type { Metadata } from "next";

/** Imagen OG/Twitter compartida hasta tener `public/og.jpg` de marca */
export const SITE_OG_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85";

export const SITE_OG_IMAGE_ALT = "Captas — Agencia creativa en el Limarí, Chile";

export function pageOpenGraph({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `https://captas.cl${path}`;
  return {
    openGraph: {
      title,
      description,
      url,
      locale: "es_CL",
      type: "website",
      siteName: "Captas",
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}

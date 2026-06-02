import { site } from "@/content/site";
import { SITE_OG_IMAGE } from "@/lib/seo";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://captas.cl/#organization",
        name: site.name,
        url: "https://captas.cl",
        email: site.email,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ovalle",
          addressRegion: "Región de Coquimbo",
          addressCountry: "CL",
        },
        sameAs: [site.instagram],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://captas.cl/#localbusiness",
        name: site.name,
        image: SITE_OG_IMAGE,
        url: "https://captas.cl",
        ...(site.phone ? { telephone: site.phone } : {}),
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ovalle",
          addressLocality: "Ovalle",
          addressRegion: "Coquimbo",
          postalCode: "1840000",
          addressCountry: "CL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -30.598,
          longitude: -71.200,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

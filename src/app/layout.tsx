import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SkipLink } from "@/components/ui/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppProviders } from "@/providers/AppProviders";
import { fontMono, fontSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Captas — Agencia creativa | UX · Motion · Branding | Limarí, Chile",
  description:
    "Agencia creativa full-service en el Limarí. UX/UI, motion, fotografía, video cinematográfico y branding que elevan marcas con craft de nivel global.",
  metadataBase: new URL("https://captas.cl"),
  applicationName: "Captas",
  authors: [{ name: "Captas", url: "https://captas.cl" }],
  creator: "Captas",
  keywords: [
    "agencia creativa",
    "UX UI",
    "branding",
    "motion design",
    "fotografía",
    "video cinematográfico",
    "Limarí",
    "Ovalle",
    "Chile",
  ],
  openGraph: {
    title: "Captas — Experiencias que elevan marcas",
    description:
      "UX/UI · Motion · Branding · Foto · Cine · Web. Craft de nivel mundial, nacido del territorio.",
    locale: "es_CL",
    type: "website",
    siteName: "Captas",
    url: "https://captas.cl",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Captas — Agencia creativa Limarí",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Captas — Experiencias que elevan marcas",
    description:
      "UX/UI · Motion · Branding · Foto · Cine · Web. Craft de nivel mundial, nacido del territorio.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    ],
  },
  icons: {
    icon: [{ url: "/brand/captas-icon.png", type: "image/png" }],
    apple: [{ url: "/brand/captas-icon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#007aff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.setAttribute("data-theme","dark");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#007aff");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("captas-visited"))document.body.classList.add("captas-ready");}catch(e){}`,
          }}
        />
        <div id="captas-preload" aria-hidden>
          <div className="captas-preload-inner">
            <Image
              src="/brand/captas-icon.png"
              alt=""
              width={72}
              height={72}
              className="captas-preload-icon"
              priority
            />
            <span className="captas-preload-logo">
              CAPTAS<span className="captas-preload-dot">.</span>
            </span>
          </div>
        </div>
        <JsonLd />
        <AppProviders>
          <SkipLink />
          <GrainOverlay />
          <Header />
          <main id="contenido" tabIndex={-1} className="overflow-x-clip outline-none">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

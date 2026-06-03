import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { BrandValue } from "@/components/home/BrandValue";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { PlanesRetainer } from "@/components/sections/PlanesRetainer";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Captas — Agencia creativa | UX · Motion · Branding | Limarí, Chile",
  description:
    "UX/UI, motion, fotografía, video cinematográfico y branding integrados. Craft premium desde el Limarí para marcas en Chile y exportación.",
  alternates: { canonical: "https://captas.cl" },
  ...pageOpenGraph({
    title: "Captas — Experiencias que elevan marcas",
    description:
      "Agencia creativa full-service: UX, foto, cine, web y marca con un solo equipo director.",
    path: "",
  }),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <BrandValue />
      <Services />
      <PlanesRetainer />
      <FeaturedWork />
      <Process />
    </>
  );
}

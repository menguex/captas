import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { BrandValue } from "@/components/home/BrandValue";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { Territory } from "@/components/home/Territory";
import { Recognition } from "@/components/home/Recognition";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <BrandValue />
      <Services />
      <FeaturedWork />
      <Process />
      <Stats />
      <Recognition />
      <Territory />
      <CtaSection />
    </>
  );
}

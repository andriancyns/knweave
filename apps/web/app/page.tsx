import { ScrollReveal } from "../components/ScrollReveal";
import { Nav } from "../components/sections/Nav";
import { Hero } from "../components/sections/Hero";
import { UseCases } from "../components/sections/UseCases";
import { Features } from "../components/sections/Features";
import { OpenSource } from "../components/sections/OpenSource";
import { SelfHost } from "../components/sections/SelfHost";
import { SmallTeams } from "../components/sections/SmallTeams";
import { Screenshots } from "../components/sections/Screenshots";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { Footer } from "../components/sections/Footer";
import { WovenDivider } from "../components/primitives/WovenDivider";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <UseCases />
        <SectionBreak />
        <Features />
        <SectionBreak />
        <OpenSource />
        <SectionBreak />
        <SelfHost />
        <SectionBreak />
        <SmallTeams />
        <SectionBreak />
        <Screenshots />
        <SectionBreak />
        <Testimonials />
        <SectionBreak />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

/* a centered woven thread between sections */
function SectionBreak() {
  return (
    <div className="shell select-none" aria-hidden>
      <WovenDivider />
    </div>
  );
}

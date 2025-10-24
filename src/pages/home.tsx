import { HeroSection } from "../components/hero-section";
import { TopCreators } from "../components/top-creators";
import { CreatorsGrid } from "../components/creators-grid";
import { CTASection } from "../components/cta-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TopCreators />
      <CreatorsGrid />
      <CTASection />
    </>
  );
}

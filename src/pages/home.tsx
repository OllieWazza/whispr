import { HeroSection } from "../components/hero-section";
import { TopCreators } from "../components/top-creators";
import { FeaturedListings } from "../components/featured-listings";
import { CreatorsGrid } from "../components/creators-grid";
import { CTASection } from "../components/cta-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TopCreators />
      <FeaturedListings limit={6} showTitle={true} />
      <CreatorsGrid />
      <CTASection />
    </>
  );
}

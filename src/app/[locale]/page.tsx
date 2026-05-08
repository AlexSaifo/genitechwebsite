import HeroSection from "../components/hero-section";
import ServicesSection from "../components/services-section";
import StackedCarouselSection from "../components/stacked-carousel-section";
import StatisticsSection from "../components/statistics-section";
import TeamMembersSection from "../components/team-members-section";
import TeamShowcaseSection from "../components/team-showcase-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <StackedCarouselSection />
      <TeamMembersSection />
      <TeamShowcaseSection />
      <section id="blog" aria-hidden="true" className="home-anchor" />
      <section id="contact" aria-hidden="true" className="home-anchor" />
    </>
  );
}

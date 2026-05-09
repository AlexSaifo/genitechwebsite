import BlogSection from "../components/blog-section";
import HeroSection from "../components/hero-section";
import PartnersSection from "../components/partners-section";
import ServicesSection from "../components/services-section";
import StackedCarouselSection from "../components/stacked-carousel-section";
import StatisticsSection from "../components/statistics-section";
import TeamMembersSection from "../components/team-members-section";
import TeamShowcaseSection from "../components/team-showcase-section";
import TestimonialsSection from "../components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <StackedCarouselSection />
      <TeamMembersSection />
      <TeamShowcaseSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <section id="contact" aria-hidden="true" className="home-anchor" />
    </>
  );
}

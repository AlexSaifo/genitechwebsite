import HeroSection from "../components/hero-section";
import ServicesSection from "../components/services-section";
import StackedCarouselSection from "../components/stacked-carousel-section";
import StatisticsSection from "../components/statistics-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <StackedCarouselSection />
      <section id="about" aria-hidden="true" className="home-anchor" />
      <section id="blog" aria-hidden="true" className="home-anchor" />
      <section id="contact" aria-hidden="true" className="home-anchor" />
    </>
  );
}

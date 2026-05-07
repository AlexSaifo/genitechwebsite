import HeroSection from "../components/hero-section";
import StatisticsSection from "../components/statistics-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <section id="about" aria-hidden="true" className="home-anchor" />
      <section id="services" aria-hidden="true" className="home-anchor" />
      <section id="blog" aria-hidden="true" className="home-anchor" />
      <section id="contact" aria-hidden="true" className="home-anchor" />
    </>
  );
}

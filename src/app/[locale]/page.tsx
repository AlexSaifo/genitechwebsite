import HeroSection from "../components/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="about" aria-hidden="true" className="home-anchor" />
      <section id="services" aria-hidden="true" className="home-anchor" />
      <section id="blog" aria-hidden="true" className="home-anchor" />
      <section id="contact" aria-hidden="true" className="home-anchor" />
    </>
  );
}

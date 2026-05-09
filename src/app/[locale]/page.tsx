import { setRequestLocale } from "next-intl/server";
import BlogSection from "../components/blog-section";
import HeroSection from "../components/hero-section";
import PartnersSection from "../components/partners-section";
import ServicesSection from "../components/services-section";
import StackedCarouselSection from "../components/stacked-carousel-section";
import StatisticsSection from "../components/statistics-section";
import TeamMembersSection from "../components/team-members-section";
import TeamShowcaseSection from "../components/team-showcase-section";
import TestimonialsSection from "../components/testimonials-section";
import { LOCALES, type Locale } from "@/lib/site-config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isArabic = (locale as Locale) === "ar";
  return (
    <>
      <HeroSection />
      <div aria-hidden="true" className="section-bridge-effects">
        <div className="section-bridge-effects__right" />
        <div className="section-bridge-effects__left-orbit">
          <div className="section-bridge-effects__left-orbit-blob" />
        </div>
      </div>
      <StatisticsSection />
      <ServicesSection />
      <div aria-hidden="true" className="section-bridge-effects section-bridge-effects--left-only">
        <div className="section-bridge-effects__left-orbit">
          <div className="section-bridge-effects__left-orbit-blob" />
        </div>
      </div>
      <StackedCarouselSection />
      <TeamMembersSection />
      <div aria-hidden="true" className="section-bridge-effects section-bridge-effects--left-only">
        <div className="section-bridge-effects__left-orbit">
          <div className="section-bridge-effects__left-orbit-blob" />
        </div>
      </div>
      <TeamShowcaseSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection isArabic={isArabic} />
    </>
  );
}

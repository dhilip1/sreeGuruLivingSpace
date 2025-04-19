import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { CoursesSection } from "@/components/home/courses-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BookingSection } from "@/components/booking/booking-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Helmet } from "react-helmet-async";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useEffect } from "react";

export default function Home() {
  // Initialize the scroll-to-hash functionality
  const { scrollToHash } = useScrollToHash();

  useEffect(() => {
    // When the page loads, if there's a hash in the URL, scroll to that section
    if (window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      setTimeout(() => {
        scrollToHash(sectionId);
      }, 500);
    }
  }, [scrollToHash]);

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} - Build your dream Home in first attempt</title>
        <meta name="description" content={SITE_DESCRIPTION} />
      </Helmet>
      <Navbar />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <TestimonialsSection />
        <div id="booking">
          <BookingSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

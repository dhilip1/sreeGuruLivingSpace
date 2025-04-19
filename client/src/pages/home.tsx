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

export default function Home() {
  // Initialize the scroll-to-hash functionality
  useScrollToHash();
  
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} - Spiritual Harmony & Balance</title>
        <meta name="description" content={SITE_DESCRIPTION} />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

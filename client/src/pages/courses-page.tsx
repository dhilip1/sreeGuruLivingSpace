import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CoursesSection } from "@/components/home/courses-section";
import { Helmet } from "react-helmet-async";
import { SITE_TITLE } from "@/lib/constants";

export default function CoursesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Vasthu Astrology Courses - {SITE_TITLE}</title>
        <meta name="description" content="Expand your knowledge of Vasthu Astrology with our specialized courses for all knowledge levels." />
      </Helmet>
      <Navbar />
      <main>
        <div className="bg-primary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark">Our Courses</h1>
            <p className="mt-4 text-lg text-neutral-dark/80 max-w-2xl mx-auto">
              Expand your knowledge of Vasthu Astrology with our specialized courses for all knowledge levels.
            </p>
          </div>
        </div>
        <CoursesSection />
      </main>
      <Footer />
    </>
  );
}

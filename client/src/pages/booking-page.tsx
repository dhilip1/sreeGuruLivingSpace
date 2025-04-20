import { useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { BookingSection } from "../components/booking/booking-section";
import { Helmet } from "react-helmet";
import { SITE_TITLE } from "../lib/constants";

export default function BookingPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const consultationType = searchParams.get("type") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Book a Consultation - {SITE_TITLE}</title>
        <meta name="description" content="Schedule your Living Space Science consultation and begin your journey to build your dream home." />
      </Helmet>
      <Navbar />
      <main>
        <div className="bg-primary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark">Book Your Consultation</h1>
            <p className="mt-4 text-lg text-neutral-dark/80 max-w-2xl mx-auto">
              Schedule a session with our Living Space Science experts and start your journey toward harmony and balance.
            </p>
          </div>
        </div>
        <BookingSection initialConsultationType={consultationType} />
      </main>
      <Footer />
    </>
  );
}

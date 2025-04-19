import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/contact/contact-section";
import { Helmet } from "react-helmet";
import { SITE_TITLE } from "@/lib/constants";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - {SITE_TITLE}</title>
        <meta name="description" content="Get in touch with our Living Space Science experts for questions, consultations, or more information." />
      </Helmet>
      <Navbar />
      <main>
        <div className="bg-primary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark">Contact Us</h1>
            <p className="mt-4 text-lg text-neutral-dark/80 max-w-2xl mx-auto">
              Have questions or need more information? We're here to help you on your journey to spiritual harmony.
            </p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

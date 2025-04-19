import { Link } from "wouter";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <span className="text-accent font-medium tracking-widest uppercase text-sm md:text-base">
              Spiritual Harmony & Balance
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark">
              Discover Balance Through <span className="text-primary">Living Space Science & Astrology</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-dark/80 max-w-2xl">
              Unlock the ancient wisdom of Vasthu & Astrology to bring harmony, prosperity and spiritual balance to your life and spaces. Our consultations and courses offer personalized guidance for you to build the dream home at the first attempt! Home is something which is so much to our heart, any human will have the goal to build their own home.All of us run to earn and buy our home with our hard earned money without understanding this science !.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#services" className="inline-flex">
                <Button size="lg" className="px-8">
                  Our Services
                </Button>
              </a>
              <Link href="/booking" className="inline-flex">
                <Button size="lg" variant="outline" className="px-8 border-blue-600 text-blue-600 hover:bg-blue-600/10"
>
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30"></div>
              <img
                className="relative rounded-lg shadow-xl w-full"
                src="https://ik.imagekit.io/sreeGuru/IMG_20240907_113300.jpg?updatedAt=1745079551213"
                alt="Cosmos and astrology"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-5 w-24 h-24 bg-accent opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-primary opacity-5 rounded-full blur-2xl"></div>
    </section>
  );
}

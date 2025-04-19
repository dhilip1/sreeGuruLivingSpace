import { ABOUT_FEATURES } from "@/lib/constants";
import { Star, Scale, Home, Sun } from "lucide-react";

const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "star":
      return <Star />;
    case "scale":
      return <Scale />;
    case "home":
      return <Home />;
    case "sun":
      return <Sun />;
    default:
      return <Star />;
  }
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-lg">
            Our Story
          </span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">
            About Sree Guru Living Space Science
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Discover the ancient wisdom that guides our practice and how we
              help clients achieve harmony.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-xl -rotate-3 transform"></div>
            <div className="absolute inset-0 bg-accent/10 rounded-xl rotate-3 transform"></div>
            <img
              className="relative rounded-lg shadow-lg w-full"
              src="https://ik.imagekit.io/sreeGuru/IMG20250131233724.jpg?updatedAt=1745079535824"
              alt="Vasthu Astrology symbols and elements"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary">
              Ancient Wisdom for Modern Lives
            </h3>
            <p className="mt-4 text-lg text-neutral-dark/80">
              Sree Guru Living Space Science is an ancient architectural and
              directional science that addresses the relationship between humans
              and their living spaces. It integrates principles from astrology,
              architecture, and spiritual teachings to create environments that
              promote positive energy flow at our home.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {ABOUT_FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                      {getFeatureIcon(feature.icon)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-neutral-dark">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-neutral-dark/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#services"
                className="inline-flex items-center text-accent hover:text-primary transition duration-300"
              >
                Learn more about our services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

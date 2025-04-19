import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Star, StarHalf, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TestimonialsSection() {
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(
    0,
    TESTIMONIALS.length - (window.innerWidth >= 1024 ? 3 : 1),
  );

  const goToSlide = (index: number) => {
    setPosition(index);
  };

  const prevSlide = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const nextSlide = () => {
    if (position < maxPosition) {
      setPosition(position + 1);
    }
  };

  return (
    <section id="testimonials" className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-900 font-bold tracking-widest uppercase text-lg">
            Client Success Stories
          </span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">
            Testimonials
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Hear from our clients about how Vasthu Astrology has transformed
              their spaces and lives.
            </p>
          </div>
        </div>

        <div className="testimonial-slider relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${position * (100 / (window.innerWidth >= 1024 ? 3 : 1))}%)`,
              }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex text-accent mb-4">
                        {[...Array(Math.floor(testimonial.rating))].map(
                          (_, i) => (
                            <Star key={i} className="fill-current" />
                          ),
                        )}
                        {testimonial.rating % 1 > 0 && (
                          <StarHalf className="fill-current" />
                        )}
                      </div>
                      <p className="italic text-neutral-dark/80 mb-6">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-neutral-dark">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-neutral-dark/60">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={prevSlide}
            disabled={position === 0}
            className={cn(
              "testimonial-prev absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center z-10 p-0",
              position === 0 ? "opacity-50 cursor-not-allowed" : "",
            )}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            onClick={nextSlide}
            disabled={position === maxPosition}
            className={cn(
              "testimonial-next absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center z-10 p-0",
              position === maxPosition ? "opacity-50 cursor-not-allowed" : "",
            )}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="testimonial-dots flex space-x-2">
            {[...Array(maxPosition + 1)].map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === position
                    ? "bg-primary opacity-100"
                    : "bg-primary opacity-30"
                }`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ServicesSection() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "residential":
        return "bg-amber-500";
      case "commercial":
        return "bg-primary";
      case "personal":
        return "bg-secondary";
      default:
        return "bg-accent";
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "residential":
        return "Residential";
      case "commercial":
        return "Commercial";
      case "personal":
        return "Personal";
      default:
        return type;
    }
  };

  return (
    <section id="services" className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-900 font-bold tracking-widest uppercase text-lg">
            What We Offer
          </span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">
            Our Services
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Professional consultations and personalized guidance to improve
              your space and life through Vasthu principles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-48 bg-yellow-900">
                <img
                  className="w-full h-full object-cover"
                  src={service.imageUrl}
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className={`${getTypeColor(service.type)} text-white`}>
                    {getTypeName(service.type)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-neutral-dark">
                  {service.title}
                </h3>
                <p className="mt-3 text-neutral-dark/70">
                  {service.description}
                </p>
                <div className="mt-6">
                  <span className="text-lg font-medium text-primary">
                    {service.price}
                  </span>
                </div>
                <div className="mt-4 text-sm text-neutral-dark/60">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-accent mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 px-6 pb-6">
                <Link href={`/booking?type=${service.type}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border border-primary bg-transparent font-bold text-yellow-900 hover:bg-primary"
                  >
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/contact">
            <Button className="inline-flex items-center gap-2">
              Request Custom Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

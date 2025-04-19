import { Link } from "wouter";
import { Moon } from "lucide-react";
import { SITE_TITLE, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const getSocialIcon = (name: string) => {
  switch (name) {
    case "Facebook":
      return <FaFacebookF className="h-4 w-4" />;
    case "Instagram":
      return <FaInstagram className="h-4 w-4" />;
    case "Twitter":
      return <FaTwitter className="h-4 w-4" />;
    case "YouTube":
      return <FaYoutube className="h-4 w-4" />;
    default:
      return null;
  }
};

export function Footer() {
  const { toast } = useToast();
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been successfully subscribed to our newsletter.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to subscribe: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    newsletterMutation.mutate(data);
  };

  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-10">
                <Moon className="text-accent text-xl" />
              </div>
              <span className="ml-3 text-xl font-medium text-white">{SITE_TITLE}</span>
            </div>
            <p className="mt-4 text-gray-300">
              Guiding you towards harmony and balance through ancient wisdom and modern insight.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-300 hover:text-white transition duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="/#services" className="text-gray-300 hover:text-white transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/#courses" className="text-gray-300 hover:text-white transition duration-300">
                  Courses
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-300 hover:text-white transition duration-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-300 hover:text-white transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-accent mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition duration-300">
                  Home Consultations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition duration-300">
                  Business Consultations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-white transition duration-300">
                  Astrology Readings
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition duration-300">
                  Vasthu Courses
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">
                  Spiritual Guidance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-accent mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Vasthu Astrology. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label={`Visit our ${social.name} page`}
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <h4 className="text-lg font-medium text-white mb-3">Subscribe to our newsletter</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Your email address"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </footer>
  );
}

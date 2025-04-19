import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

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

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send message: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Get In Touch</span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">Contact Us</h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Have questions or need more information? We're here to help you on your journey to spiritual harmony.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-neutral-dark mb-6">Send a Message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-dark mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                        <Mail />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-neutral-dark">Email</h4>
                      <p className="mt-1 text-neutral-dark/70">{CONTACT_INFO.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                        <Phone />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-neutral-dark">Phone</h4>
                      <p className="mt-1 text-neutral-dark/70">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                        <MapPin />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-neutral-dark">Office Location</h4>
                      <p className="mt-1 text-neutral-dark/70">{CONTACT_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                        <Clock />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-neutral-dark">Office Hours</h4>
                      {CONTACT_INFO.hours.map((hour, index) => (
                        <p key={index} className={index === 0 ? "mt-1 text-neutral-dark/70" : "text-neutral-dark/70"}>
                          {hour}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-dark mb-6">Follow Us</h3>

                <div className="flex space-x-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
                      aria-label={`Visit our ${social.name} page`}
                    >
                      {getSocialIcon(social.name)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

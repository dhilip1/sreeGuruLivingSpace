import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CONSULTATION_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface BookingSectionProps {
  initialConsultationType?: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  consultationType: z.string().min(1, "Please select a consultation type."),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, "Please select a time."),
  notes: z.string().optional(),
  terms: z.boolean().refine((val) => val, {
    message: "You must agree to the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingSection({ initialConsultationType }: BookingSectionProps) {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>(
    initialConsultationType || ""
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consultationType: initialConsultationType || "",
      notes: "",
      terms: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: Omit<FormValues, "terms">) => {
      await apiRequest("POST", "/api/booking", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking confirmed!",
        description: "We've received your booking request and will contact you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to book consultation: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    const { terms, ...bookingData } = data;
    bookingMutation.mutate(bookingData);
  };

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    form.setValue("consultationType", type);
  };

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Schedule Your Session</span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">Book a Consultation</h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Select your preferred consultation type and find a time that works for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-primary/5 rounded-lg p-6">
              <h3 className="text-xl font-bold text-neutral-dark mb-4">Consultation Options</h3>

              <div className="space-y-4">
                {CONSULTATION_TYPES.map((type) => (
                  <div
                    key={type.value}
                    className={`cursor-pointer border ${
                      selectedType === type.value 
                        ? "border-primary" 
                        : "border-transparent"
                    } rounded-md p-4 hover:border-primary transition duration-300 bg-white shadow-sm`}
                    onClick={() => handleTypeSelection(type.value)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-5 w-5 border border-gray-300 rounded-full flex items-center justify-center">
                          <div className={`h-3 w-3 rounded-full bg-primary ${selectedType === type.value ? "block" : "hidden"}`}></div>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-neutral-dark">{type.label}</h4>
                        <p className="mt-1 text-sm text-neutral-dark/70">
                          {type.value === "residential" ? "90 minutes | Virtual or In-person" : 
                           type.value === "commercial" ? "120 minutes | Virtual or In-person" : 
                           "60 minutes | Virtual Only"}
                        </p>
                        <p className="mt-1 text-sm text-neutral-dark/70">
                          {type.value === "residential" ? "Starting at $150" : 
                           type.value === "commercial" ? "Starting at $250" : 
                           "Starting at $100"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-base font-medium text-neutral-dark mb-2">What to expect:</h4>
                <ul className="text-sm text-neutral-dark/70 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-accent mt-1 mr-2" />
                    <span>Detailed pre-consultation questionnaire</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-accent mt-1 mr-2" />
                    <span>In-depth analysis of your space or chart</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-accent mt-1 mr-2" />
                    <span>Practical recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-accent mt-1 mr-2" />
                    <span>Follow-up support period</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="booking-calendar mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-dark">Select a Date & Time</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="date" className="block text-sm font-medium text-neutral-dark mb-2">Date</Label>
                      <CalendarDatePicker
                        date={form.watch("date")}
                        setDate={(date) => form.setValue("date", date as Date, { shouldValidate: true })}
                      />
                      {form.formState.errors.date && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.date.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="time" className="block text-sm font-medium text-neutral-dark mb-2">Time</Label>
                      <TimePicker
                        value={form.watch("time") || ""}
                        onChange={(value) => form.setValue("time", value, { shouldValidate: true })}
                      />
                      {form.formState.errors.time && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.time.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="booking-form mt-8 border-t border-neutral-light pt-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Your Information</h3>

                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <Label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark">First name</Label>
                      <div className="mt-1">
                        <Input
                          {...form.register("firstName")}
                          id="firstName"
                          className={form.formState.errors.firstName ? "border-red-500" : ""}
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="block text-sm font-medium text-neutral-dark">Last name</Label>
                      <div className="mt-1">
                        <Input
                          {...form.register("lastName")}
                          id="lastName"
                          className={form.formState.errors.lastName ? "border-red-500" : ""}
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-neutral-dark">Email</Label>
                      <div className="mt-1">
                        <Input
                          {...form.register("email")}
                          type="email"
                          id="email"
                          className={form.formState.errors.email ? "border-red-500" : ""}
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-neutral-dark">Phone</Label>
                      <div className="mt-1">
                        <Input
                          {...form.register("phone")}
                          type="tel"
                          id="phone"
                          className={form.formState.errors.phone ? "border-red-500" : ""}
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="notes" className="block text-sm font-medium text-neutral-dark">Special requests or notes</Label>
                      <div className="mt-1">
                        <Textarea
                          {...form.register("notes")}
                          id="notes"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Checkbox
                            id="terms"
                            checked={form.watch("terms")}
                            onCheckedChange={(checked) => {
                              form.setValue("terms", checked as boolean, { shouldValidate: true });
                            }}
                            className={form.formState.errors.terms ? "border-red-500" : ""}
                          />
                        </div>
                        <div className="ml-3">
                          <Label htmlFor="terms" className="text-sm text-neutral-dark/70">
                            I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and understand the cancellation policy.
                          </Label>
                          {form.formState.errors.terms && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.terms.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={bookingMutation.isPending}
                      >
                        {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

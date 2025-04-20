import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { COURSES, COURSE_INTEREST_OPTIONS } from "../../lib/constants";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Calendar, Clock, Signal, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  courseInterest: z.string().min(1, "Please select a course interest."),
  newsletter: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function CoursesSection() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      courseInterest: "",
      newsletter: false,
    },
  });

  const courseInquiryMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      await apiRequest("POST", "/api/course-inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: "Course inquiry submitted!",
        description: "We'll send you the course information shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit inquiry: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    courseInquiryMutation.mutate(data);
  };

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-900 font-bold tracking-widest uppercase text-lg">
            Educational Offerings
          </span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-dark sm:text-4xl">
            Our Courses
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-dark/80">
              Expand your knowledge of Vasthu (aka. Living Space Science) with our specialized
              courses for all knowledge levels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-neutral-light rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="h-56 bg-gradient-to-br from-primary to-secondary relative">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white px-6 text-center">
                    {course.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center text-sm text-neutral-dark/70 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-2 text-accent" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-2 text-accent" />
                    <span>{course.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <Signal className="h-4 w-4 mr-2 text-accent" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <p className="text-neutral-dark/80">{course.description}</p>

                <div className="mt-4">
                  <h4 className="font-medium text-neutral-dark">
                    What you'll learn:
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-neutral-dark/70">
                    {course.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-neutral-light/50 border-t border-neutral-light">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-semibold text-primary">
                      {course.price}
                    </span>
                    <span className="text-neutral-dark/60 ml-2">USD</span>
                  </div>
                  <Button
                    onClick={() => {
                      window.open(
                        "https://www.eventbrite.com/e/unlock-the-secrets-of-living-space-science-vasthu-with-astrology-online-tickets-1331509132659",
                        "_blank", // This opens the link in a new tab
                      );
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="course-inquiry-form" className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-neutral-dark">
            Request Course Information
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-dark/70">
            Interested in our courses? Fill out the form to receive detailed
            syllabus, upcoming dates, and special offers.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 max-w-lg mx-auto"
            >
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="courseInterest"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Course of Interest</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COURSE_INTEREST_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none text-left">
                          <FormLabel>
                            I'd like to receive occasional newsletter emails
                            with spiritual insights and offers.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={courseInquiryMutation.isPending}
                  >
                    {courseInquiryMutation.isPending
                      ? "Submitting..."
                      : "Request Information"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

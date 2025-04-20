import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCourseInquirySchema, 
  insertConsultationBookingSchema, 
  insertContactMessageSchema, 
  insertNewsletterSubscriptionSchema
} from "./schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Get all services
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  // // Get a specific service
  // app.get("/api/services/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id = parseInt(req.params.id);
  //     if (isNaN(id)) {
  //       return res.status(400).json({ message: "Invalid service ID" });
  //     }
      
  //     const service = await storage.getService(id);
  //     if (!service) {
  //       return res.status(404).json({ message: "Service not found" });
  //     }
      
  //     res.json(service);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch service" });
  //   }
  // });
  
  // Get all courses
  app.get("/api/courses", async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  
  // // Get a specific course
  // app.get("/api/courses/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id = parseInt(req.params.id);
  //     if (isNaN(id)) {
  //       return res.status(400).json({ message: "Invalid course ID" });
  //     }
      
  //     const course = await storage.getCourse(id);
  //     if (!course) {
  //       return res.status(404).json({ message: "Course not found" });
  //     }
      
  //     res.json(course);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch course" });
  //   }
  // });
  
  // Get all testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // // Create a course inquiry
  // app.post("/api/course-inquiry", async (req: Request, res: Response) => {
  //   try {
  //     const validatedData = insertCourseInquirySchema.parse(req.body);
  //     const courseInquiry = await storage.createCourseInquiry(validatedData);
  //     res.status(201).json(courseInquiry);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       const validationError = fromZodError(error);
  //       return res.status(400).json({ message: validationError.message });
  //     }
  //     res.status(500).json({ message: "Failed to create course inquiry" });
  //   }
  // });
  
  // // Create a consultation booking
  // app.post("/api/booking", async (req: Request, res: Response) => {
  //   try {
  //     const validatedData = insertConsultationBookingSchema.parse(req.body);
  //     const booking = await storage.createBooking(validatedData);
  //     res.status(201).json(booking);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       const validationError = fromZodError(error);
  //       return res.status(400).json({ message: validationError.message });
  //     }
  //     res.status(500).json({ message: "Failed to create booking" });
  //   }
  // });
  
  // // Create a contact message
  // app.post("/api/contact", async (req: Request, res: Response) => {
  //   try {
  //     const validatedData = insertContactMessageSchema.parse(req.body);
  //     const contactMessage = await storage.createContactMessage(validatedData);
  //     res.status(201).json(contactMessage);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       const validationError = fromZodError(error);
  //       return res.status(400).json({ message: validationError.message });
  //     }
  //     res.status(500).json({ message: "Failed to send message" });
  //   }
  // });
  
  // // Create a newsletter subscription
  // app.post("/api/newsletter", async (req: Request, res: Response) => {
  //   try {
  //     const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
  //     // Check if email already exists
  //     const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
  //     if (existingSubscription) {
  //       return res.status(400).json({ message: "Email is already subscribed to the newsletter" });
  //     }
      
  //     const subscription = await storage.createNewsletterSubscription(validatedData);
  //     res.status(201).json(subscription);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       const validationError = fromZodError(error);
  //       return res.status(400).json({ message: validationError.message });
  //     }
  //     res.status(500).json({ message: "Failed to subscribe to newsletter" });
  //   }
  // });

  const httpServer = createServer(app);

  return httpServer;
}
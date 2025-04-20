import { 
  users, services, courses, testimonials, courseInquiries, consultationBookings, contactMessages, newsletterSubscriptions,
  type User, type Service, type Course, type Testimonial, type CourseInquiry, type ConsultationBooking, type ContactMessage, type NewsletterSubscription,
  type InsertUser, type InsertService, type InsertCourse, type InsertTestimonial, type InsertCourseInquiry, type InsertConsultationBooking, type InsertContactMessage, type InsertNewsletterSubscription
} from "../shared/schema";
import { SERVICES, COURSES, TESTIMONIALS } from "../client/src/lib/constants";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  
  // Course Inquiries
  createCourseInquiry(inquiry: InsertCourseInquiry): Promise<CourseInquiry>;
  
  // Bookings
  createBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Newsletter Subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
}

// Implementation that uses PostgreSQL database with Drizzle ORM
export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Services
  async getServices(): Promise<Service[]> {
    const servicesList = await db.select().from(services);
    if (servicesList.length === 0) {
      // Seed services if none exist
      await this.seedServices();
      return this.getServices();
    }
    return servicesList;
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }
  
  // Courses
  async getCourses(): Promise<Course[]> {
    const coursesList = await db.select().from(courses);
    if (coursesList.length === 0) {
      // Seed courses if none exist
      await this.seedCourses();
      return this.getCourses();
    }
    return coursesList;
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    const testimonialsList = await db.select().from(testimonials);
    if (testimonialsList.length === 0) {
      // Seed testimonials if none exist
      await this.seedTestimonials();
      return this.getTestimonials();
    }
    return testimonialsList;
  }
  
  // Course Inquiries
  async createCourseInquiry(inquiry: InsertCourseInquiry): Promise<CourseInquiry> {
    const [courseInquiry] = await db
      .insert(courseInquiries)
      .values({ ...inquiry, createdAt: new Date() })
      .returning();
    return courseInquiry;
  }
  
  // Bookings
  async createBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const [consultationBooking] = await db
      .insert(consultationBookings)
      .values({ ...booking, createdAt: new Date() })
      .returning();
    return consultationBooking;
  }
  
  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values({ ...message, createdAt: new Date() })
      .returning();
    return contactMessage;
  }
  
  // Newsletter Subscriptions
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [newsletterSubscription] = await db
      .insert(newsletterSubscriptions)
      .values({ ...subscription, createdAt: new Date() })
      .returning();
    return newsletterSubscription;
  }
  
  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return subscription || undefined;
  }

  // Seed methods
  private async seedServices() {
    await db.insert(services).values(
      SERVICES.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        type: service.type,
        features: service.features,
        imageUrl: service.imageUrl
      }))
    );
  }

  private async seedCourses() {
    await db.insert(courses).values(
      COURSES.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        hours: course.hours,
        level: course.level,
        learnings: course.learnings
      }))
    );
  }

  private async seedTestimonials() {
    await db.insert(testimonials).values(
      TESTIMONIALS.map(testimonial => ({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: Math.floor(testimonial.rating)
      }))
    );
  }
}

export const storage = new DatabaseStorage();

import { 
  users, services, courses, testimonials, courseInquiries, consultationBookings, contactMessages, newsletterSubscriptions,
  type User, type Service, type Course, type Testimonial, type CourseInquiry, type ConsultationBooking, type ContactMessage, type NewsletterSubscription,
  type InsertUser, type InsertService, type InsertCourse, type InsertTestimonial, type InsertCourseInquiry, type InsertConsultationBooking, type InsertContactMessage, type InsertNewsletterSubscription
} from "@shared/schema";
import { SERVICES, COURSES, TESTIMONIALS } from "../client/src/lib/constants";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private courses: Map<number, Course>;
  private testimonials: Map<number, Testimonial>;
  private courseInquiries: Map<number, CourseInquiry>;
  private bookings: Map<number, ConsultationBooking>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  currentUserId: number;
  currentCourseInquiryId: number;
  currentBookingId: number;
  currentContactMessageId: number;
  currentNewsletterSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.courses = new Map();
    this.testimonials = new Map();
    this.courseInquiries = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.currentUserId = 1;
    this.currentCourseInquiryId = 1;
    this.currentBookingId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriptionId = 1;
    
    // Seed initial data
    this.seedData();
  }

  private seedData() {
    // Seed services
    SERVICES.forEach(service => {
      this.services.set(service.id, {
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        type: service.type,
        features: service.features,
        imageUrl: service.imageUrl
      });
    });
    
    // Seed courses
    COURSES.forEach(course => {
      this.courses.set(course.id, {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        hours: course.hours,
        level: course.level,
        learnings: course.learnings
      });
    });
    
    // Seed testimonials
    TESTIMONIALS.forEach(testimonial => {
      this.testimonials.set(testimonial.id, {
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: Math.floor(testimonial.rating)
      });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  // Courses
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  // Course Inquiries
  async createCourseInquiry(inquiry: InsertCourseInquiry): Promise<CourseInquiry> {
    const id = this.currentCourseInquiryId++;
    const now = new Date();
    const courseInquiry: CourseInquiry = { ...inquiry, id, createdAt: now };
    this.courseInquiries.set(id, courseInquiry);
    return courseInquiry;
  }
  
  // Bookings
  async createBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const id = this.currentBookingId++;
    const now = new Date();
    const consultationBooking: ConsultationBooking = { ...booking, id, createdAt: now };
    this.bookings.set(id, consultationBooking);
    return consultationBooking;
  }
  
  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const now = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt: now };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  // Newsletter Subscriptions
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentNewsletterSubscriptionId++;
    const now = new Date();
    const newsletterSubscription: NewsletterSubscription = { ...subscription, id, createdAt: now };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }
  
  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }
}

export const storage = new MemStorage();

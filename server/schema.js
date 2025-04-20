"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewsletterSubscriptionSchema = exports.newsletterSubscriptions = exports.insertContactMessageSchema = exports.contactMessages = exports.insertConsultationBookingSchema = exports.consultationBookings = exports.insertCourseInquirySchema = exports.courseInquiries = exports.insertTestimonialSchema = exports.testimonials = exports.insertCourseSchema = exports.courses = exports.insertServiceSchema = exports.services = exports.insertUserSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});
exports.services = (0, pg_core_1.pgTable)("services", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    price: (0, pg_core_1.text)("price").notNull(),
    type: (0, pg_core_1.text)("type").notNull(), // 'residential', 'commercial', 'personal'
    features: (0, pg_core_1.text)("features").array().notNull(),
    imageUrl: (0, pg_core_1.text)("imageUrl").notNull(),
});
exports.insertServiceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.services).omit({
    id: true,
});
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    price: (0, pg_core_1.text)("price").notNull(),
    duration: (0, pg_core_1.text)("duration").notNull(),
    hours: (0, pg_core_1.text)("hours").notNull(),
    level: (0, pg_core_1.text)("level").notNull(), // 'beginner', 'intermediate', 'advanced'
    learnings: (0, pg_core_1.text)("learnings").array().notNull(),
});
exports.insertCourseSchema = (0, drizzle_zod_1.createInsertSchema)(exports.courses).omit({
    id: true,
});
exports.testimonials = (0, pg_core_1.pgTable)("testimonials", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    role: (0, pg_core_1.text)("role").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    rating: (0, pg_core_1.integer)("rating").notNull(),
});
exports.insertTestimonialSchema = (0, drizzle_zod_1.createInsertSchema)(exports.testimonials).omit({
    id: true,
});
exports.courseInquiries = (0, pg_core_1.pgTable)("course_inquiries", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    courseInterest: (0, pg_core_1.text)("course_interest").notNull(),
    newsletter: (0, pg_core_1.boolean)("newsletter").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertCourseInquirySchema = (0, drizzle_zod_1.createInsertSchema)(exports.courseInquiries).omit({
    id: true,
    createdAt: true,
});
exports.consultationBookings = (0, pg_core_1.pgTable)("consultation_bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    consultationType: (0, pg_core_1.text)("consultation_type").notNull(),
    date: (0, pg_core_1.text)("date").notNull(),
    time: (0, pg_core_1.text)("time").notNull(),
    notes: (0, pg_core_1.text)("notes"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertConsultationBookingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.consultationBookings).omit({
    id: true,
    createdAt: true,
});
exports.contactMessages = (0, pg_core_1.pgTable)("contact_messages", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    subject: (0, pg_core_1.text)("subject").notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertContactMessageSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contactMessages).omit({
    id: true,
    createdAt: true,
});
exports.newsletterSubscriptions = (0, pg_core_1.pgTable)("newsletter_subscriptions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertNewsletterSubscriptionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.newsletterSubscriptions).omit({
    id: true,
    createdAt: true,
});

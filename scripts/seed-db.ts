#!/usr/bin/env tsx

import { db } from "../server/db";
import { services, courses, testimonials } from "../shared/schema";
import { SERVICES, COURSES, TESTIMONIALS } from "../client/src/lib/constants";

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // Seed services
    console.log("Seeding services...");
    const servicesData = SERVICES.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      price: service.price,
      type: service.type,
      features: service.features,
      imageUrl: service.imageUrl
    }));
    await db.insert(services).values(servicesData).onConflictDoNothing();
    
    // Seed courses
    console.log("Seeding courses...");
    const coursesData = COURSES.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description, 
      price: course.price,
      duration: course.duration,
      hours: course.hours,
      level: course.level,
      learnings: course.learnings
    }));
    await db.insert(courses).values(coursesData).onConflictDoNothing();
    
    // Seed testimonials
    console.log("Seeding testimonials...");
    const testimonialsData = TESTIMONIALS.map(testimonial => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: Math.floor(testimonial.rating)
    }));
    await db.insert(testimonials).values(testimonialsData).onConflictDoNothing();

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

main();
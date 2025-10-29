import { z } from "zod";
import {
  CONTACT_SUBJECTS,
  GALLERY_CATEGORIES,
  NEWS_CATEGORIES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "./constants.js";

const stringOrDate = z.union([z.string(), z.date()]);

export const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

export const projectSchema = z.object({
  name: z.string().min(3),
  slug: z.string().optional(),
  category: z.enum(PROJECT_CATEGORIES),
  location: z.string().min(2),
  description: z.string().min(10),
  budget: z.number().min(0),
  progress: z.number().min(0).max(100),
  status: z.enum(PROJECT_STATUSES),
  startDate: stringOrDate.optional(),
  completionDate: stringOrDate.optional(),
  beneficiaries: z.number().optional(),
  images: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  milestones: z
    .array(
      z.object({
        title: z.string().min(3),
        description: z.string().min(3),
        date: stringOrDate.optional(),
      })
    )
    .optional(),
});

export const newsSchema = z.object({
  title: z.string().min(5),
  slug: z.string().optional(),
  category: z.enum(NEWS_CATEGORIES),
  featuredImage: z.string().url().optional(),
  content: z.string().min(20),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  publishDate: stringOrDate.optional(),
  status: z.enum(["Draft", "Published"]).default("Draft"),
});

export const eventSchema = z.object({
  title: z.string().min(5),
  date: stringOrDate,
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().min(3),
  description: z.string().min(10),
  image: z.string().url().optional(),
  rsvpLink: z.string().url().optional(),
  capacity: z.number().optional(),
});

export const gallerySchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().optional(),
  category: z.enum(GALLERY_CATEGORIES),
  dateTaken: stringOrDate.optional(),
});

export const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z.string().min(10).max(500),
});

export const contactStatusSchema = z.object({
  status: z.enum(["New", "Read", "Replied"]),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export const settingsSchema = z.array(
  z.object({
    key: z.string(),
    value: z.union([z.string(), z.number(), z.boolean(), z.object({}).passthrough()]),
  })
);

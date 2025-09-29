import { 
  integer, 
  pgTable, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  json,
  pgEnum,
  decimal
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userTierEnum = pgEnum('user_tier', ['free', 'paid', 'premium']);
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'super_admin']);
export const newsletterStatusEnum = pgEnum('newsletter_status', ['draft', 'published', 'archived']);
export const contentTypeEnum = pgEnum('content_type', ['newsletter', 'blog', 'presentation', 'product', 'bio', 'testimonial']);

// User subscriptions table (since auth is handled by Clerk)
export const userSubscriptionsTable = pgTable("user_subscriptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }),
  tier: userTierEnum().notNull().default('free'),
  role: userRoleEnum().notNull().default('user'),
  subscriptionStartDate: timestamp().defaultNow(),
  subscriptionEndDate: timestamp(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Newsletters table
export const newslettersTable = pgTable("newsletters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  content: text().notNull(),
  excerpt: text(),
  featuredImage: varchar({ length: 500 }),
  status: newsletterStatusEnum().notNull().default('draft'),
  publishedAt: timestamp(),
  authorId: varchar({ length: 255 }).notNull(), // Clerk user ID
  tags: json().$type<string[]>(),
  readTime: integer(), // in minutes
  isPremium: boolean().notNull().default(false),
  viewCount: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Blog posts table
export const blogPostsTable = pgTable("blog_posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  content: text().notNull(),
  excerpt: text(),
  featuredImage: varchar({ length: 500 }),
  status: newsletterStatusEnum().notNull().default('draft'),
  publishedAt: timestamp(),
  authorId: varchar({ length: 255 }).notNull(),
  tags: json().$type<string[]>(),
  readTime: integer(),
  isPremium: boolean().notNull().default(false),
  viewCount: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// AI Products table
export const aiProductsTable = pgTable("ai_products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text().notNull(),
  longDescription: text(),
  category: varchar({ length: 100 }),
  price: decimal({ precision: 10, scale: 2 }),
  currency: varchar({ length: 3 }).default('USD'),
  imageUrl: varchar({ length: 500 }),
  demoUrl: varchar({ length: 500 }),
  githubUrl: varchar({ length: 500 }),
  websiteUrl: varchar({ length: 500 }),
  features: json().$type<string[]>(),
  tags: json().$type<string[]>(),
  isActive: boolean().notNull().default(true),
  isFeatured: boolean().notNull().default(false),
  viewCount: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Presentations table
export const presentationsTable = pgTable("presentations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  content: text().notNull(), // JSON content for slides
  thumbnailUrl: varchar({ length: 500 }),
  status: newsletterStatusEnum().notNull().default('draft'),
  publishedAt: timestamp(),
  authorId: varchar({ length: 255 }).notNull(),
  tags: json().$type<string[]>(),
  duration: integer(), // in minutes
  isPremium: boolean().notNull().default(false),
  viewCount: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Bio pages table
export const bioPagesTable = pgTable("bio_pages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  content: text().notNull(),
  profileImage: varchar({ length: 500 }),
  socialLinks: json().$type<Record<string, string>>(),
  isActive: boolean().notNull().default(true),
  viewCount: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Testimonials table
export const testimonialsTable = pgTable("testimonials", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }),
  company: varchar({ length: 255 }),
  content: text().notNull(),
  avatar: varchar({ length: 500 }),
  rating: integer(), // 1-5 stars
  isActive: boolean().notNull().default(true),
  isFeatured: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// Newsletter subscriptions tracking
export const newsletterSubscriptionsTable = pgTable("newsletter_subscriptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId: varchar({ length: 255 }).notNull(),
  newsletterId: integer().notNull(),
  subscribedAt: timestamp().defaultNow(),
  isActive: boolean().notNull().default(true),
});

// User reading history
export const readingHistoryTable = pgTable("reading_history", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId: varchar({ length: 255 }).notNull(),
  contentType: contentTypeEnum().notNull(),
  contentId: integer().notNull(),
  readAt: timestamp().defaultNow(),
  readTime: integer(), // in seconds
});

// Relations
export const userSubscriptionsRelations = relations(userSubscriptionsTable, ({ many }) => ({
  newsletterSubscriptions: many(newsletterSubscriptionsTable),
  readingHistory: many(readingHistoryTable),
}));

export const newslettersRelations = relations(newslettersTable, ({ many }) => ({
  subscriptions: many(newsletterSubscriptionsTable),
  readingHistory: many(readingHistoryTable),
}));

export const blogPostsRelations = relations(blogPostsTable, ({ many }) => ({
  readingHistory: many(readingHistoryTable),
}));

export const aiProductsRelations = relations(aiProductsTable, ({ many }) => ({
  readingHistory: many(readingHistoryTable),
}));

export const presentationsRelations = relations(presentationsTable, ({ many }) => ({
  readingHistory: many(readingHistoryTable),
}));

export const bioPagesRelations = relations(bioPagesTable, ({ many }) => ({
  readingHistory: many(readingHistoryTable),
}));

export const testimonialsRelations = relations(testimonialsTable, ({ many }) => ({
  readingHistory: many(readingHistoryTable),
}));

export const newsletterSubscriptionsRelations = relations(newsletterSubscriptionsTable, ({ one }) => ({
  user: one(userSubscriptionsTable, {
    fields: [newsletterSubscriptionsTable.clerkUserId],
    references: [userSubscriptionsTable.clerkUserId],
  }),
  newsletter: one(newslettersTable, {
    fields: [newsletterSubscriptionsTable.newsletterId],
    references: [newslettersTable.id],
  }),
}));

export const readingHistoryRelations = relations(readingHistoryTable, ({ one }) => ({
  user: one(userSubscriptionsTable, {
    fields: [readingHistoryTable.clerkUserId],
    references: [userSubscriptionsTable.clerkUserId],
  }),
}));

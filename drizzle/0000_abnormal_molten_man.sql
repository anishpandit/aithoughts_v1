CREATE TYPE "public"."content_type" AS ENUM('newsletter', 'blog', 'presentation', 'product', 'bio', 'testimonial');--> statement-breakpoint
CREATE TYPE "public"."newsletter_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."user_tier" AS ENUM('free', 'paid', 'premium');--> statement-breakpoint
CREATE TABLE "ai_products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ai_products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"longDescription" text,
	"category" varchar(100),
	"price" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'USD',
	"imageUrl" varchar(500),
	"demoUrl" varchar(500),
	"githubUrl" varchar(500),
	"websiteUrl" varchar(500),
	"features" json,
	"tags" json,
	"isActive" boolean DEFAULT true NOT NULL,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "ai_products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "bio_pages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bio_pages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"profileImage" varchar(500),
	"socialLinks" json,
	"isActive" boolean DEFAULT true NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "bio_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"excerpt" text,
	"featuredImage" varchar(500),
	"status" "newsletter_status" DEFAULT 'draft' NOT NULL,
	"publishedAt" timestamp,
	"authorId" varchar(255) NOT NULL,
	"tags" json,
	"readTime" integer,
	"isPremium" boolean DEFAULT false NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscriptions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "newsletter_subscriptions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerkUserId" varchar(255) NOT NULL,
	"newsletterId" integer NOT NULL,
	"subscribedAt" timestamp DEFAULT now(),
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "newsletters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"excerpt" text,
	"featuredImage" varchar(500),
	"status" "newsletter_status" DEFAULT 'draft' NOT NULL,
	"publishedAt" timestamp,
	"authorId" varchar(255) NOT NULL,
	"tags" json,
	"readTime" integer,
	"isPremium" boolean DEFAULT false NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "newsletters_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "presentations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "presentations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"thumbnailUrl" varchar(500),
	"status" "newsletter_status" DEFAULT 'draft' NOT NULL,
	"publishedAt" timestamp,
	"authorId" varchar(255) NOT NULL,
	"tags" json,
	"duration" integer,
	"isPremium" boolean DEFAULT false NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "presentations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reading_history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reading_history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerkUserId" varchar(255) NOT NULL,
	"contentType" "content_type" NOT NULL,
	"contentId" integer NOT NULL,
	"readAt" timestamp DEFAULT now(),
	"readTime" integer
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"title" varchar(255),
	"company" varchar(255),
	"content" text NOT NULL,
	"avatar" varchar(500),
	"rating" integer,
	"isActive" boolean DEFAULT true NOT NULL,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_subscriptions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerkUserId" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"tier" "user_tier" DEFAULT 'free' NOT NULL,
	"subscriptionStartDate" timestamp DEFAULT now(),
	"subscriptionEndDate" timestamp,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_subscriptions_clerkUserId_unique" UNIQUE("clerkUserId")
);

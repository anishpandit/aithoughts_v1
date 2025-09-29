import { db } from './index';
import { 
  userSubscriptionsTable,
  newslettersTable,
  blogPostsTable,
  aiProductsTable,
  presentationsTable,
  bioPagesTable,
  testimonialsTable,
  newsletterSubscriptionsTable,
  readingHistoryTable,
  type userTierEnum,
  type userRoleEnum,
  type newsletterStatusEnum,
  type contentTypeEnum
} from './schema';
import { eq, and, desc, asc, count, sql } from 'drizzle-orm';

// User Subscriptions Queries
export async function createUserSubscription(user: typeof userSubscriptionsTable.$inferInsert) {
  return await db.insert(userSubscriptionsTable).values(user).returning();
}

export async function getUserSubscriptionByClerkId(clerkUserId: string) {
  return await db.select().from(userSubscriptionsTable).where(eq(userSubscriptionsTable.clerkUserId, clerkUserId));
}

export async function updateUserSubscription(clerkUserId: string, updates: Partial<typeof userSubscriptionsTable.$inferInsert>) {
  return await db.update(userSubscriptionsTable).set(updates).where(eq(userSubscriptionsTable.clerkUserId, clerkUserId)).returning();
}

export async function getUserTier(clerkUserId: string) {
  const result = await db.select({ tier: userSubscriptionsTable.tier }).from(userSubscriptionsTable).where(eq(userSubscriptionsTable.clerkUserId, clerkUserId));
  return result[0]?.tier || 'free';
}

// Newsletter Queries
export async function getAllNewsletters(limit = 10, offset = 0) {
  return await db.select().from(newslettersTable).orderBy(desc(newslettersTable.publishedAt)).limit(limit).offset(offset);
}

export async function getPublishedNewsletters(limit = 10, offset = 0) {
  return await db.select().from(newslettersTable).where(eq(newslettersTable.status, 'published')).orderBy(desc(newslettersTable.publishedAt)).limit(limit).offset(offset);
}

export async function getNewsletterById(id: number) {
  return await db.select().from(newslettersTable).where(eq(newslettersTable.id, id));
}

export async function getNewsletterBySlug(slug: string) {
  return await db.select().from(newslettersTable).where(eq(newslettersTable.slug, slug));
}

export async function createNewsletter(newsletter: typeof newslettersTable.$inferInsert) {
  return await db.insert(newslettersTable).values(newsletter).returning();
}

export async function updateNewsletter(id: number, updates: Partial<typeof newslettersTable.$inferInsert>) {
  return await db.update(newslettersTable).set(updates).where(eq(newslettersTable.id, id)).returning();
}

export async function deleteNewsletter(id: number) {
  return await db.delete(newslettersTable).where(eq(newslettersTable.id, id));
}

export async function incrementNewsletterViewCount(id: number) {
  return await db.update(newslettersTable).set({ viewCount: sql`${newslettersTable.viewCount} + 1` }).where(eq(newslettersTable.id, id)).returning();
}

// Blog Posts Queries
export async function getAllBlogPosts(limit = 10, offset = 0) {
  return await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt)).limit(limit).offset(offset);
}

export async function getPublishedBlogPosts(limit = 10, offset = 0) {
  return await db.select().from(blogPostsTable).where(eq(blogPostsTable.status, 'published')).orderBy(desc(blogPostsTable.publishedAt)).limit(limit).offset(offset);
}

export async function getBlogPostById(id: number) {
  return await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
}

export async function getBlogPostBySlug(slug: string) {
  return await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, slug));
}

export async function createBlogPost(blogPost: typeof blogPostsTable.$inferInsert) {
  return await db.insert(blogPostsTable).values(blogPost).returning();
}

export async function updateBlogPost(id: number, updates: Partial<typeof blogPostsTable.$inferInsert>) {
  return await db.update(blogPostsTable).set(updates).where(eq(blogPostsTable.id, id)).returning();
}

export async function deleteBlogPost(id: number) {
  return await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
}

// AI Products Queries
export async function getAllAIProducts(limit = 10, offset = 0) {
  return await db.select().from(aiProductsTable).where(eq(aiProductsTable.isActive, true)).orderBy(desc(aiProductsTable.createdAt)).limit(limit).offset(offset);
}

export async function getFeaturedAIProducts() {
  return await db.select().from(aiProductsTable).where(and(eq(aiProductsTable.isActive, true), eq(aiProductsTable.isFeatured, true)));
}

export async function getAIProductById(id: number) {
  return await db.select().from(aiProductsTable).where(eq(aiProductsTable.id, id));
}

export async function getAIProductBySlug(slug: string) {
  return await db.select().from(aiProductsTable).where(eq(aiProductsTable.slug, slug));
}

export async function createAIProduct(product: typeof aiProductsTable.$inferInsert) {
  return await db.insert(aiProductsTable).values(product).returning();
}

export async function updateAIProduct(id: number, updates: Partial<typeof aiProductsTable.$inferInsert>) {
  return await db.update(aiProductsTable).set(updates).where(eq(aiProductsTable.id, id)).returning();
}

export async function deleteAIProduct(id: number) {
  return await db.delete(aiProductsTable).where(eq(aiProductsTable.id, id));
}

// Presentations Queries
export async function getAllPresentations(limit = 10, offset = 0) {
  return await db.select().from(presentationsTable).orderBy(desc(presentationsTable.publishedAt)).limit(limit).offset(offset);
}

export async function getPublishedPresentations(limit = 10, offset = 0) {
  return await db.select().from(presentationsTable).where(eq(presentationsTable.status, 'published')).orderBy(desc(presentationsTable.publishedAt)).limit(limit).offset(offset);
}

export async function getPresentationById(id: number) {
  return await db.select().from(presentationsTable).where(eq(presentationsTable.id, id));
}

export async function getPresentationBySlug(slug: string) {
  return await db.select().from(presentationsTable).where(eq(presentationsTable.slug, slug));
}

export async function createPresentation(presentation: typeof presentationsTable.$inferInsert) {
  return await db.insert(presentationsTable).values(presentation).returning();
}

export async function updatePresentation(id: number, updates: Partial<typeof presentationsTable.$inferInsert>) {
  return await db.update(presentationsTable).set(updates).where(eq(presentationsTable.id, id)).returning();
}

export async function deletePresentation(id: number) {
  return await db.delete(presentationsTable).where(eq(presentationsTable.id, id));
}

// Bio Pages Queries
export async function getAllBioPages() {
  return await db.select().from(bioPagesTable).where(eq(bioPagesTable.isActive, true)).orderBy(desc(bioPagesTable.createdAt));
}

export async function getBioPageById(id: number) {
  return await db.select().from(bioPagesTable).where(eq(bioPagesTable.id, id));
}

export async function getBioPageBySlug(slug: string) {
  return await db.select().from(bioPagesTable).where(eq(bioPagesTable.slug, slug));
}

export async function createBioPage(bioPage: typeof bioPagesTable.$inferInsert) {
  return await db.insert(bioPagesTable).values(bioPage).returning();
}

export async function updateBioPage(id: number, updates: Partial<typeof bioPagesTable.$inferInsert>) {
  return await db.update(bioPagesTable).set(updates).where(eq(bioPagesTable.id, id)).returning();
}

export async function deleteBioPage(id: number) {
  return await db.delete(bioPagesTable).where(eq(bioPagesTable.id, id));
}

// Testimonials Queries
export async function getAllTestimonials() {
  return await db.select().from(testimonialsTable).where(eq(testimonialsTable.isActive, true)).orderBy(desc(testimonialsTable.createdAt));
}

export async function getFeaturedTestimonials() {
  return await db.select().from(testimonialsTable).where(and(eq(testimonialsTable.isActive, true), eq(testimonialsTable.isFeatured, true)));
}

export async function getTestimonialById(id: number) {
  return await db.select().from(testimonialsTable).where(eq(testimonialsTable.id, id));
}

export async function createTestimonial(testimonial: typeof testimonialsTable.$inferInsert) {
  return await db.insert(testimonialsTable).values(testimonial).returning();
}

export async function updateTestimonial(id: number, updates: Partial<typeof testimonialsTable.$inferInsert>) {
  return await db.update(testimonialsTable).set(updates).where(eq(testimonialsTable.id, id)).returning();
}

export async function deleteTestimonial(id: number) {
  return await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
}

// Newsletter Subscription Queries
export async function subscribeToNewsletter(clerkUserId: string, newsletterId: number) {
  return await db.insert(newsletterSubscriptionsTable).values({ clerkUserId, newsletterId }).returning();
}

export async function unsubscribeFromNewsletter(clerkUserId: string, newsletterId: number) {
  return await db.update(newsletterSubscriptionsTable).set({ isActive: false }).where(and(eq(newsletterSubscriptionsTable.clerkUserId, clerkUserId), eq(newsletterSubscriptionsTable.newsletterId, newsletterId))).returning();
}

export async function getUserNewsletterSubscriptions(clerkUserId: string) {
  return await db.select().from(newsletterSubscriptionsTable).where(and(eq(newsletterSubscriptionsTable.clerkUserId, clerkUserId), eq(newsletterSubscriptionsTable.isActive, true)));
}

// Reading History Queries
export async function addToReadingHistory(clerkUserId: string, contentType: typeof contentTypeEnum.enumValues[number], contentId: number, readTime?: number) {
  return await db.insert(readingHistoryTable).values({ clerkUserId, contentType, contentId, readTime }).returning();
}

export async function getUserReadingHistory(clerkUserId: string, limit = 20) {
  return await db.select().from(readingHistoryTable).where(eq(readingHistoryTable.clerkUserId, clerkUserId)).orderBy(desc(readingHistoryTable.readAt)).limit(limit);
}

// Analytics Queries
export async function getContentStats(contentType: typeof contentTypeEnum.enumValues[number], contentId: number) {
  const result = await db.select({ 
    totalViews: count(readingHistoryTable.id),
    avgReadTime: sql<number>`AVG(${readingHistoryTable.readTime})`
  }).from(readingHistoryTable).where(and(eq(readingHistoryTable.contentType, contentType), eq(readingHistoryTable.contentId, contentId)));
  
  return result[0];
}

// User tier-based content access
export async function canUserAccessContent(clerkUserId: string, isPremium: boolean) {
  const userTier = await getUserTier(clerkUserId);
  
  if (!isPremium) return true;
  if (userTier === 'free') return false;
  return true;
}

// Free tier newsletter limit check
export async function checkFreeTierNewsletterLimit(clerkUserId: string, month: number, year: number) {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);
  
  const result = await db.select({ count: count() }).from(readingHistoryTable)
    .where(and(
      eq(readingHistoryTable.clerkUserId, clerkUserId),
      eq(readingHistoryTable.contentType, 'newsletter'),
      sql`${readingHistoryTable.readAt} >= ${startOfMonth}`,
      sql`${readingHistoryTable.readAt} <= ${endOfMonth}`
    ));
  
  return result[0]?.count || 0;
}

// Admin Functions
export async function getUserRole(clerkUserId: string) {
  const result = await db.select({ role: userSubscriptionsTable.role }).from(userSubscriptionsTable).where(eq(userSubscriptionsTable.clerkUserId, clerkUserId));
  return result[0]?.role || 'user';
}

export async function isUserAdmin(clerkUserId: string) {
  const role = await getUserRole(clerkUserId);
  return role === 'admin' || role === 'super_admin';
}

export async function setUserAsAdmin(clerkUserId: string, email: string, name: string) {
  // First, try to update existing user
  const existingUser = await getUserSubscriptionByClerkId(clerkUserId);
  
  if (existingUser.length > 0) {
    // Update existing user to admin
    return await db.update(userSubscriptionsTable)
      .set({ 
        role: 'admin',
        email: email,
        name: name,
        updatedAt: new Date()
      })
      .where(eq(userSubscriptionsTable.clerkUserId, clerkUserId))
      .returning();
  } else {
    // Create new admin user
    return await db.insert(userSubscriptionsTable).values({
      clerkUserId: clerkUserId,
      email: email,
      name: name,
      tier: 'premium', // Admins get premium access
      role: 'admin',
      isActive: true
    }).returning();
  }
}

export async function getAllAdmins() {
  return await db.select().from(userSubscriptionsTable)
    .where(and(
      eq(userSubscriptionsTable.role, 'admin'),
      eq(userSubscriptionsTable.isActive, true)
    ));
}

export async function removeAdminRole(clerkUserId: string) {
  return await db.update(userSubscriptionsTable)
    .set({ 
      role: 'user',
      updatedAt: new Date()
    })
    .where(eq(userSubscriptionsTable.clerkUserId, clerkUserId))
    .returning();
}

'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { 
  getAllNewsletters, 
  getAllAIProducts, 
  getAllAdmins,
  createNewsletter,
  createAIProduct,
  setUserAsAdmin,
  createUserSubscription
} from '@/src/db/queries';

// Newsletter schemas
const createNewsletterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
  authorId: z.string().min(1, 'Author ID is required'),
  tags: z.array(z.string()).optional(),
  readTime: z.number().min(1, 'Read time must be at least 1 minute'),
  isPremium: z.boolean().default(false)
});

const createAIProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().min(1, 'Long description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.string().min(1, 'Price is required'),
  currency: z.string().min(1, 'Currency is required'),
  features: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false)
});

const setAdminSchema = z.object({
  clerkUserId: z.string().min(1, 'Clerk User ID is required'),
  email: z.string().email('Valid email is required'),
  name: z.string().min(1, 'Name is required')
});

const createUserSchema = z.object({
  clerkUserId: z.string().min(1, 'Clerk User ID is required'),
  email: z.string().email('Valid email is required'),
  name: z.string().min(1, 'Name is required'),
  tier: z.enum(['free', 'paid', 'premium']).default('free'),
  isActive: z.boolean().default(true)
});

// Server Actions
export async function getAdminData() {
  await requireAdmin(); // This will redirect if not admin
  
  const [newsletters, aiProducts, admins] = await Promise.all([
    getAllNewsletters(50, 0),
    getAllAIProducts(50, 0),
    getAllAdmins()
  ]);

  return {
    newsletters,
    aiProducts,
    admins: admins.map(admin => ({
      id: admin.id,
      clerkUserId: admin.clerkUserId,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      tier: admin.tier
    }))
  };
}

export async function createNewsletterAction(data: z.infer<typeof createNewsletterSchema>) {
  await requireAdmin();
  
  const validatedData = createNewsletterSchema.parse(data);
  
  // Transform publishedAt string to Date if provided
  const newsletterData = {
    ...validatedData,
    publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : null
  };
  
  return await createNewsletter(newsletterData);
}

export async function createAIProductAction(data: z.infer<typeof createAIProductSchema>) {
  await requireAdmin();
  
  const validatedData = createAIProductSchema.parse(data);
  return await createAIProduct(validatedData);
}

export async function setUserAsAdminAction(data: z.infer<typeof setAdminSchema>) {
  await requireAdmin();
  
  const validatedData = setAdminSchema.parse(data);
  return await setUserAsAdmin(validatedData.clerkUserId, validatedData.email, validatedData.name);
}

export async function createUserAction(data: z.infer<typeof createUserSchema>) {
  await requireAdmin();
  
  const validatedData = createUserSchema.parse(data);
  return await createUserSubscription(validatedData);
}

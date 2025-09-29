import { db } from './index';
import { 
  userSubscriptionsTable,
  newslettersTable,
  blogPostsTable,
  aiProductsTable,
  presentationsTable,
  bioPagesTable,
  testimonialsTable
} from './schema';
import { 
  createUserSubscription,
  createNewsletter,
  createBlogPost,
  createAIProduct,
  createPresentation,
  createBioPage,
  createTestimonial,
  getUserTier,
  canUserAccessContent,
  checkFreeTierNewsletterLimit
} from './queries';

async function testSchema() {
  console.log('🧪 Testing database schema...');

  try {
    // Test user subscription creation
    console.log('Testing user subscription creation...');
    const testUser = await createUserSubscription({
      clerkUserId: 'test_user_123',
      email: 'test@example.com',
      name: 'Test User',
      tier: 'free',
      isActive: true
    });
    console.log('✅ User subscription created:', testUser[0]);

    // Test newsletter creation
    console.log('Testing newsletter creation...');
    const testNewsletter = await createNewsletter({
      title: 'Test Newsletter',
      slug: 'test-newsletter',
      description: 'A test newsletter for schema validation',
      content: 'This is test content for the newsletter.',
      excerpt: 'Test excerpt',
      status: 'published',
      publishedAt: new Date(),
      authorId: 'test_user_123',
      tags: ['test', 'newsletter'],
      readTime: 3,
      isPremium: false
    });
    console.log('✅ Newsletter created:', testNewsletter[0]);

    // Test blog post creation
    console.log('Testing blog post creation...');
    const testBlogPost = await createBlogPost({
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      description: 'A test blog post for schema validation',
      content: 'This is test content for the blog post.',
      excerpt: 'Test excerpt',
      status: 'published',
      publishedAt: new Date(),
      authorId: 'test_user_123',
      tags: ['test', 'blog'],
      readTime: 5,
      isPremium: false
    });
    console.log('✅ Blog post created:', testBlogPost[0]);

    // Test AI product creation
    console.log('Testing AI product creation...');
    const testProduct = await createAIProduct({
      name: 'Test AI Product',
      slug: 'test-ai-product',
      description: 'A test AI product for schema validation',
      longDescription: 'This is a longer description for the test AI product.',
      category: 'Test Category',
      price: '9.99',
      currency: 'USD',
      features: ['Feature 1', 'Feature 2'],
      tags: ['test', 'ai', 'product'],
      isActive: true,
      isFeatured: false
    });
    console.log('✅ AI product created:', testProduct[0]);

    // Test presentation creation
    console.log('Testing presentation creation...');
    const testPresentation = await createPresentation({
      title: 'Test Presentation',
      slug: 'test-presentation',
      description: 'A test presentation for schema validation',
      content: JSON.stringify({ slides: [{ title: 'Test Slide', content: 'Test content' }] }),
      status: 'published',
      publishedAt: new Date(),
      authorId: 'test_user_123',
      tags: ['test', 'presentation'],
      duration: 15,
      isPremium: false
    });
    console.log('✅ Presentation created:', testPresentation[0]);

    // Test bio page creation
    console.log('Testing bio page creation...');
    const testBioPage = await createBioPage({
      title: 'Test Bio Page',
      slug: 'test-bio-page',
      content: 'This is test content for the bio page.',
      socialLinks: { twitter: 'https://twitter.com/test' },
      isActive: true
    });
    console.log('✅ Bio page created:', testBioPage[0]);

    // Test testimonial creation
    console.log('Testing testimonial creation...');
    const testTestimonial = await createTestimonial({
      name: 'Test User',
      title: 'Test Title',
      company: 'Test Company',
      content: 'This is a test testimonial.',
      rating: 5,
      isActive: true,
      isFeatured: false
    });
    console.log('✅ Testimonial created:', testTestimonial[0]);

    // Test user tier functionality
    console.log('Testing user tier functionality...');
    const userTier = await getUserTier('test_user_123');
    console.log('✅ User tier retrieved:', userTier);

    // Test content access functionality
    console.log('Testing content access functionality...');
    const canAccessFree = await canUserAccessContent('test_user_123', false);
    const canAccessPremium = await canUserAccessContent('test_user_123', true);
    console.log('✅ Content access test - Free content:', canAccessFree, 'Premium content:', canAccessPremium);

    // Test newsletter limit functionality
    console.log('Testing newsletter limit functionality...');
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const newsletterCount = await checkFreeTierNewsletterLimit('test_user_123', currentMonth, currentYear);
    console.log('✅ Newsletter limit check:', newsletterCount);

    console.log('🎉 All schema tests passed successfully!');

  } catch (error) {
    console.error('❌ Schema test failed:', error);
    throw error;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testSchema()
    .then(() => {
      console.log('✅ Schema testing completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Schema testing failed:', error);
      process.exit(1);
    });
}

export { testSchema };

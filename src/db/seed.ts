import { db } from './index';
import { 
  newslettersTable,
  blogPostsTable,
  aiProductsTable,
  presentationsTable,
  bioPagesTable,
  testimonialsTable
} from './schema';

export async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create initial newsletters
    const newsletters = await Promise.all([
      db.insert(newslettersTable).values({
        title: "New Interesting Features in Cursor",
        slug: "new-interesting-features-in-cursor",
        description: "Exploring the latest and most exciting features that Cursor has introduced to revolutionize AI-powered coding.",
        content: `
# New Interesting Features in Cursor

Cursor continues to push the boundaries of AI-assisted development with groundbreaking features that are changing how we write code.

## 🚀 Key Highlights

### 1. Advanced Code Generation
Cursor's latest AI models can now generate more contextually aware code, understanding your entire codebase structure and maintaining consistency across files.

### 2. Intelligent Refactoring
The new refactoring capabilities can automatically suggest and implement code improvements while maintaining functionality and following best practices.

### 3. Enhanced Debugging
Cursor now offers AI-powered debugging assistance that can predict potential issues and suggest fixes before they become problems.

### 4. Real-time Collaboration
New collaborative features allow teams to work together seamlessly with AI assistance, making pair programming more effective than ever.

## 🔮 What's Next?

Cursor is continuously evolving, with plans for even more advanced AI capabilities that will further streamline the development process.

*Stay tuned for more updates as Cursor continues to revolutionize the coding experience!*
        `,
        excerpt: "Exploring the latest and most exciting features that Cursor has introduced to revolutionize AI-powered coding.",
        featuredImage: "/images/cursor-features.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["cursor", "ai", "coding", "features", "development"],
        readTime: 5,
        isPremium: false,
        viewCount: 0
      }).returning(),

      db.insert(newslettersTable).values({
        title: "How Emergent is Impacting the AI World",
        slug: "how-emergent-is-impacting-the-ai-world",
        description: "A deep dive into how emergent AI capabilities are reshaping industries and creating new possibilities.",
        content: `
# How Emergent is Impacting the AI World

Emergent AI capabilities are fundamentally changing how we think about artificial intelligence and its applications across various industries.

## 🌟 Understanding Emergence

Emergent AI refers to capabilities that arise from complex interactions within AI systems that weren't explicitly programmed. These capabilities often surprise even their creators.

### Key Areas of Impact

#### 1. Healthcare Revolution
- AI systems are developing diagnostic capabilities that exceed human performance
- Drug discovery is being accelerated through emergent pattern recognition
- Personalized treatment plans are becoming more sophisticated

#### 2. Creative Industries
- AI-generated content is reaching new levels of sophistication
- Collaborative AI tools are enabling new forms of artistic expression
- The boundary between human and AI creativity is becoming increasingly blurred

#### 3. Scientific Research
- AI is accelerating scientific discovery through emergent pattern recognition
- Complex simulations are revealing insights that would take humans years to uncover
- Cross-disciplinary research is being facilitated by AI's ability to connect disparate concepts

## 🔬 The Science Behind Emergence

Emergent capabilities in AI systems often arise from:
- Scale effects in model training
- Complex interactions between different AI components
- Unexpected combinations of learned features
- Self-organizing behaviors in neural networks

## 🚀 Future Implications

As AI systems continue to develop emergent capabilities, we can expect:
- More sophisticated problem-solving approaches
- New forms of human-AI collaboration
- Unprecedented insights into complex systems
- Revolutionary applications across all industries

*The future of AI is not just about what we program, but what emerges from the complex interactions we enable.*
        `,
        excerpt: "A deep dive into how emergent AI capabilities are reshaping industries and creating new possibilities.",
        featuredImage: "/images/emergent-ai.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["emergent", "ai", "technology", "innovation", "future"],
        readTime: 7,
        isPremium: false,
        viewCount: 0
      }).returning(),

      db.insert(newslettersTable).values({
        title: "Impact of Veo3",
        slug: "impact-of-veo3",
        description: "Analyzing the revolutionary impact of Veo3 on video generation and content creation.",
        content: `
# Impact of Veo3

Veo3 represents a quantum leap in AI video generation technology, setting new standards for what's possible in automated content creation.

## 🎬 What is Veo3?

Veo3 is Google's latest video generation model that can create high-quality, coherent videos from text prompts. It represents a significant advancement in AI video synthesis technology.

### Key Capabilities

#### 1. Unprecedented Quality
- Generates videos with remarkable visual fidelity
- Maintains temporal consistency across frames
- Produces content that rivals professional video production

#### 2. Advanced Understanding
- Comprehends complex scene descriptions
- Handles multiple characters and interactions
- Maintains logical continuity throughout longer sequences

#### 3. Creative Flexibility
- Supports various artistic styles and genres
- Can generate content for different purposes (educational, entertainment, commercial)
- Adapts to specific requirements and constraints

## 🌍 Industry Impact

### Content Creation
- **Film Industry**: Enabling rapid prototyping and pre-visualization
- **Marketing**: Creating compelling video content at scale
- **Education**: Developing engaging educational materials
- **Social Media**: Empowering creators with professional-quality tools

### Economic Implications
- Reducing production costs for video content
- Democratizing access to high-quality video creation
- Creating new business models and opportunities
- Disrupting traditional video production workflows

## 🔮 Future Possibilities

Veo3 opens doors to:
- Personalized video content generation
- Real-time video synthesis for applications
- Enhanced virtual and augmented reality experiences
- New forms of interactive storytelling

## ⚖️ Considerations

While Veo3 offers incredible potential, it also raises important questions about:
- Intellectual property and copyright
- The future of human creativity
- Ethical use of AI-generated content
- The balance between automation and human artistry

*Veo3 is not just a tool—it's a glimpse into the future of visual storytelling and content creation.*
        `,
        excerpt: "Analyzing the revolutionary impact of Veo3 on video generation and content creation.",
        featuredImage: "/images/veo3-impact.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["veo3", "video", "ai", "generation", "content", "google"],
        readTime: 6,
        isPremium: false,
        viewCount: 0
      }).returning()
    ]);

    console.log('✅ Newsletters created successfully');

    // Create sample blog posts
    const blogPosts = await Promise.all([
      db.insert(blogPostsTable).values({
        title: "The Future of AI Development Tools",
        slug: "future-of-ai-development-tools",
        description: "Exploring how AI is transforming the development landscape and what tools are leading the charge.",
        content: "Comprehensive analysis of AI development tools and their impact on software engineering...",
        excerpt: "Exploring how AI is transforming the development landscape and what tools are leading the charge.",
        featuredImage: "/images/ai-dev-tools.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["ai", "development", "tools", "future"],
        readTime: 8,
        isPremium: false,
        viewCount: 0
      }).returning(),

      db.insert(blogPostsTable).values({
        title: "Understanding AI Ethics in Practice",
        slug: "understanding-ai-ethics-in-practice",
        description: "A practical guide to implementing ethical AI practices in real-world applications.",
        content: "Deep dive into AI ethics and how to implement responsible AI practices...",
        excerpt: "A practical guide to implementing ethical AI practices in real-world applications.",
        featuredImage: "/images/ai-ethics.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["ethics", "ai", "responsible", "practice"],
        readTime: 10,
        isPremium: true,
        viewCount: 0
      }).returning()
    ]);

    console.log('✅ Blog posts created successfully');

    // Create sample AI products
    const aiProducts = await Promise.all([
      db.insert(aiProductsTable).values({
        name: "AI Code Assistant Pro",
        slug: "ai-code-assistant-pro",
        description: "Advanced AI-powered coding assistant with context-aware suggestions and automated refactoring.",
        longDescription: "A comprehensive AI coding assistant that understands your entire codebase and provides intelligent suggestions for improvement, bug fixes, and optimization.",
        category: "Development Tools",
        price: "29.99",
        currency: "USD",
        imageUrl: "/images/ai-code-assistant.jpg",
        demoUrl: "https://demo.example.com/ai-code-assistant",
        githubUrl: "https://github.com/example/ai-code-assistant",
        websiteUrl: "https://ai-code-assistant.com",
        features: ["Context-aware suggestions", "Automated refactoring", "Bug detection", "Code optimization"],
        tags: ["ai", "coding", "assistant", "development"],
        isActive: true,
        isFeatured: true,
        viewCount: 0
      }).returning(),

      db.insert(aiProductsTable).values({
        name: "Smart Content Generator",
        slug: "smart-content-generator",
        description: "AI-powered content generation tool for blogs, social media, and marketing materials.",
        longDescription: "Generate high-quality, engaging content for various platforms using advanced AI models trained on successful content patterns.",
        category: "Content Creation",
        price: "19.99",
        currency: "USD",
        imageUrl: "/images/content-generator.jpg",
        demoUrl: "https://demo.example.com/content-generator",
        websiteUrl: "https://smart-content-generator.com",
        features: ["Multi-platform content", "SEO optimization", "Brand voice matching", "Content scheduling"],
        tags: ["content", "ai", "marketing", "generation"],
        isActive: true,
        isFeatured: false,
        viewCount: 0
      }).returning()
    ]);

    console.log('✅ AI products created successfully');

    // Create sample presentations
    const presentations = await Promise.all([
      db.insert(presentationsTable).values({
        title: "Introduction to AI Development",
        slug: "introduction-to-ai-development",
        description: "A comprehensive introduction to AI development concepts and best practices.",
        content: JSON.stringify({
          slides: [
            { title: "Welcome", content: "Introduction to AI Development" },
            { title: "What is AI?", content: "Understanding artificial intelligence" },
            { title: "AI Tools", content: "Popular AI development tools" },
            { title: "Best Practices", content: "AI development best practices" }
          ]
        }),
        thumbnailUrl: "/images/ai-dev-presentation.jpg",
        status: "published",
        publishedAt: new Date(),
        authorId: "admin",
        tags: ["ai", "development", "introduction", "tutorial"],
        duration: 30,
        isPremium: false,
        viewCount: 0
      }).returning()
    ]);

    console.log('✅ Presentations created successfully');

    // Create sample bio page
    const bioPage = await db.insert(bioPagesTable).values({
      title: "AI Thoughts Team",
      slug: "ai-thoughts-team",
      content: "Meet the team behind AI Thoughts - passionate about exploring the intersection of artificial intelligence and human creativity.",
      profileImage: "/images/team-bio.jpg",
      socialLinks: {
        twitter: "https://twitter.com/aithoughts",
        linkedin: "https://linkedin.com/company/aithoughts",
        github: "https://github.com/aithoughts"
      },
      isActive: true,
      viewCount: 0
    }).returning();

    console.log('✅ Bio page created successfully');

    // Create sample testimonials
    const testimonials = await Promise.all([
      db.insert(testimonialsTable).values({
        name: "Sarah Johnson",
        title: "Senior Developer",
        company: "TechCorp",
        content: "AI Thoughts has revolutionized how I approach development. The insights and tools shared here have made me a more effective developer.",
        avatar: "/images/sarah-johnson.jpg",
        rating: 5,
        isActive: true,
        isFeatured: true
      }).returning(),

      db.insert(testimonialsTable).values({
        name: "Michael Chen",
        title: "AI Researcher",
        company: "AI Labs",
        content: "The quality of content and depth of analysis in AI Thoughts is exceptional. It's become my go-to resource for staying updated on AI developments.",
        avatar: "/images/michael-chen.jpg",
        rating: 5,
        isActive: true,
        isFeatured: true
      }).returning(),

      db.insert(testimonialsTable).values({
        name: "Emily Rodriguez",
        title: "Product Manager",
        company: "InnovateTech",
        content: "AI Thoughts provides the perfect balance of technical depth and practical insights. It's helped me make better decisions about AI integration in our products.",
        avatar: "/images/emily-rodriguez.jpg",
        rating: 4,
        isActive: true,
        isFeatured: false
      }).returning()
    ]);

    console.log('✅ Testimonials created successfully');

    console.log('🎉 Database seeding completed successfully!');
    console.log(`Created: ${newsletters.length} newsletters, ${blogPosts.length} blog posts, ${aiProducts.length} AI products, ${presentations.length} presentations, 1 bio page, ${testimonials.length} testimonials`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

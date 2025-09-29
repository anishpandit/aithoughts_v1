# AI Thoughts Database Schema

This directory contains the database schema and related functionality for the AI Thoughts newsletter platform.

## 📁 File Structure

- `index.ts` - Database connection configuration
- `schema.ts` - Database schema definitions with all tables and relationships
- `queries.ts` - CRUD operations and business logic functions
- `seed.ts` - Database seeding script with initial data
- `test-schema.ts` - Schema validation and testing script
- `README.md` - This documentation file

## 🗄️ Database Schema Overview

### Core Tables

#### User Management
- **user_subscriptions** - User subscription information (integrates with Clerk auth)
- **newsletter_subscriptions** - Newsletter subscription tracking
- **reading_history** - User reading history and analytics

#### Content Tables
- **newsletters** - Newsletter articles and content
- **blog_posts** - Blog posts and articles
- **ai_products** - AI product portfolio
- **presentations** - AI workflow presentations
- **bio_pages** - Team and author bio pages
- **testimonials** - User testimonials and reviews

### Key Features

#### User Tiers
- **Free**: 3 newsletters per month
- **Paid**: Unlimited newsletters
- **Premium**: All content + exclusive features

#### Content Management
- Draft/Published/Archived status system
- Premium content gating
- Reading time estimation
- View count tracking
- Tag-based categorization

#### Analytics
- Reading history tracking
- Content performance metrics
- User engagement analytics

## 🚀 Getting Started

### 1. Database Setup

Make sure you have a PostgreSQL database configured with the connection string in your environment variables:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/aithoughts
```

### 2. Run Database Migrations

```bash
# Generate migration files
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit migrate
```

### 3. Seed Initial Data

```bash
# Run the seeding script
npx tsx src/db/seed.ts
```

### 4. Test Schema

```bash
# Run schema validation tests
npx tsx src/db/test-schema.ts
```

## 📊 Initial Data

The seeding script creates:

### Newsletters (3 initial topics)
1. **New Interesting Features in Cursor** - Exploring Cursor's latest AI coding features
2. **How Emergent is Impacting the AI World** - Analysis of emergent AI capabilities
3. **Impact of Veo3** - Deep dive into Google's Veo3 video generation model

### Sample Content
- Blog posts about AI development and ethics
- AI product listings with pricing and features
- Presentation templates for AI workflows
- Team bio pages and social links
- User testimonials and reviews

## 🔧 Usage Examples

### Creating a Newsletter

```typescript
import { createNewsletter } from './queries';

const newsletter = await createNewsletter({
  title: "My Newsletter",
  slug: "my-newsletter",
  content: "Newsletter content...",
  authorId: "clerk_user_id",
  tags: ["ai", "technology"],
  isPremium: false
});
```

### Checking User Access

```typescript
import { canUserAccessContent, getUserTier } from './queries';

const userTier = await getUserTier("clerk_user_id");
const canAccess = await canUserAccessContent("clerk_user_id", true);
```

### Managing Subscriptions

```typescript
import { subscribeToNewsletter, unsubscribeFromNewsletter } from './queries';

// Subscribe user to newsletter
await subscribeToNewsletter("clerk_user_id", newsletterId);

// Unsubscribe user from newsletter
await unsubscribeFromNewsletter("clerk_user_id", newsletterId);
```

## 🎯 Business Logic

### Free Tier Limitations
- Free users can read 3 newsletters per month
- Premium content is restricted to paid users
- Reading history is tracked for analytics

### Content Access Control
- `canUserAccessContent()` checks user tier and content premium status
- `checkFreeTierNewsletterLimit()` enforces monthly reading limits
- Reading history tracks user engagement for analytics

### Analytics and Insights
- View counts for all content types
- Reading time tracking
- User engagement metrics
- Content performance analytics

## 🔒 Security Considerations

- All user data is linked via Clerk user IDs
- No sensitive user information is stored locally
- Content access is controlled by user tier
- Reading history is anonymized for analytics

## 📈 Performance Optimizations

- Indexed fields for fast queries
- Efficient relationship mapping
- Optimized query patterns for common operations
- Pagination support for large datasets

## 🧪 Testing

The `test-schema.ts` file provides comprehensive testing for:
- Table creation and data insertion
- Relationship integrity
- Business logic functions
- User tier functionality
- Content access controls

Run tests with:
```bash
npx tsx src/db/test-schema.ts
```

## 📝 Schema Updates

When modifying the schema:

1. Update `schema.ts` with new tables/fields
2. Generate new migration: `npx drizzle-kit generate`
3. Apply migration: `npx drizzle-kit migrate`
4. Update `queries.ts` with new CRUD operations
5. Update `seed.ts` if needed for new data
6. Run tests to verify changes

## 🤝 Contributing

When adding new features:

1. Update the schema in `schema.ts`
2. Add corresponding queries in `queries.ts`
3. Update the seed data if needed
4. Add tests for new functionality
5. Update this README with new features

## 📞 Support

For questions about the database schema or implementation, please refer to the Drizzle ORM documentation or create an issue in the project repository.

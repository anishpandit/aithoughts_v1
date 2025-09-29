import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { userSubscriptionsTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof userSubscriptionsTable.$inferInsert = {
    clerkUserId: 'test_user_123',
    email: 'john@example.com',
    name: 'John Doe',
    tier: 'free',
    isActive: true,
  };
  
  await db.insert(userSubscriptionsTable).values(user);
  console.log('New user created!')
  
  const users = await db.select().from(userSubscriptionsTable);
  console.log('Getting all users from the database: ', users)
  
  await db
    .update(userSubscriptionsTable)
    .set({
      tier: 'paid',
    })
    .where(eq(userSubscriptionsTable.email, user.email));
  console.log('User info updated!')
  
  await db.delete(userSubscriptionsTable).where(eq(userSubscriptionsTable.email, user.email));
  console.log('User deleted!')
}

main();

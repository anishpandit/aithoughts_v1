import { auth } from '@clerk/nextjs/server';
import { getUserSubscriptionByClerkId } from '@/src/db/queries';
import { redirect } from 'next/navigation';

/**
 * Ensures the current user can only access their own data
 * This function should be used before any user-specific data operations
 */
export async function requireUserOwnership() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return userId;
}

/**
 * Gets the current user's data, ensuring they can only access their own information
 */
export async function getCurrentUserData() {
  const userId = await requireUserOwnership();
  
  const userData = await getUserSubscriptionByClerkId(userId);
  
  if (!userData || userData.length === 0) {
    // User doesn't exist in our database, redirect to sign up
    redirect('/sign-up');
  }
  
  return userData[0];
}

/**
 * Validates that a user is trying to access their own data
 * Throws an error if they try to access someone else's data
 */
export async function validateUserOwnership(requestedUserId: string) {
  const currentUserId = await requireUserOwnership();
  
  if (currentUserId !== requestedUserId) {
    throw new Error('Access denied: You can only access your own data');
  }
  
  return currentUserId;
}

/**
 * Gets user data only if the requesting user is the owner
 */
export async function getUserDataIfOwner(userId: string) {
  await validateUserOwnership(userId);
  return await getCurrentUserData();
}

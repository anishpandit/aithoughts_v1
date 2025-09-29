import { auth } from '@clerk/nextjs/server';
import { isUserAdmin } from '@/src/db/queries';
import { NextResponse } from 'next/server';

export async function requireAdminAuth() {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication required' 
    }, { status: 401 });
  }

  // Check if current user is admin
  const currentUserIsAdmin = await isUserAdmin(userId);
  if (!currentUserIsAdmin) {
    return NextResponse.json({ 
      success: false, 
      error: 'Admin access required' 
    }, { status: 403 });
  }

  return null; // No error, user is authenticated and is admin
}

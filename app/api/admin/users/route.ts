import { NextRequest, NextResponse } from 'next/server';
import { 
  createUserSubscription,
  getUserSubscriptionByClerkId,
  updateUserSubscription,
  getUserTier,
  canUserAccessContent,
  checkFreeTierNewsletterLimit
} from '@/src/db/queries';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET - Get user subscription info
export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    
    if (!clerkUserId) {
      return NextResponse.json({ success: false, error: 'clerkUserId is required' }, { status: 400 });
    }

    const user = await getUserSubscriptionByClerkId(clerkUserId);
    const tier = await getUserTier(clerkUserId);
    
    return NextResponse.json({ 
      success: true, 
      data: { user: user[0], tier } 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}

// POST - Create user subscription
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const user = await createUserSubscription(body);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error creating user subscription:', error);
    return NextResponse.json({ success: false, error: 'Failed to create user subscription' }, { status: 500 });
  }
}

// PUT - Update user subscription
export async function PUT(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const { clerkUserId, ...updates } = body;
    const user = await updateUserSubscription(clerkUserId, updates);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user subscription' }, { status: 500 });
  }
}

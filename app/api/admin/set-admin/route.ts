import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { setUserAsAdmin, isUserAdmin, getAllAdmins } from '@/src/db/queries';

// POST - Set user as admin
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { clerkUserId, email, name } = body;

    if (!clerkUserId || !email || !name) {
      return NextResponse.json({ 
        success: false, 
        error: 'clerkUserId, email, and name are required' 
      }, { status: 400 });
    }

    const adminUser = await setUserAsAdmin(clerkUserId, email, name);
    
    return NextResponse.json({ 
      success: true, 
      data: adminUser,
      message: 'User has been set as admin successfully' 
    });
  } catch (error) {
    console.error('Error setting user as admin:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to set user as admin' 
    }, { status: 500 });
  }
}

// GET - Check if user is admin
export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false, 
        error: 'clerkUserId is required' 
      }, { status: 400 });
    }

    const isAdmin = await isUserAdmin(clerkUserId);
    const allAdmins = await getAllAdmins();
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        isAdmin, 
        allAdmins: allAdmins.map(admin => ({
          id: admin.id,
          clerkUserId: admin.clerkUserId,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          tier: admin.tier
        }))
      }
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to check admin status' 
    }, { status: 500 });
  }
}

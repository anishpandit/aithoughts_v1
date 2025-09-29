import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllNewsletters, 
  getNewsletterById, 
  createNewsletter, 
  updateNewsletter, 
  deleteNewsletter,
  getPublishedNewsletters 
} from '@/src/db/queries';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET - Fetch all newsletters (public access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let newsletters;
    if (published === 'true') {
      newsletters = await getPublishedNewsletters(limit, offset);
    } else {
      // For non-admin users, only show published newsletters
      newsletters = await getPublishedNewsletters(limit, offset);
    }

    return NextResponse.json({ success: true, data: newsletters });
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch newsletters' }, { status: 500 });
  }
}

// POST - Create new newsletter
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const newsletter = await createNewsletter(body);
    return NextResponse.json({ success: true, data: newsletter });
  } catch (error) {
    console.error('Error creating newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to create newsletter' }, { status: 500 });
  }
}

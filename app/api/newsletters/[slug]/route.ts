import { NextRequest, NextResponse } from 'next/server';
import { getNewsletterBySlug } from '@/src/db/queries';

// GET - Fetch newsletter by slug (public access)
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const newsletters = await getNewsletterBySlug(slug);
    
    if (newsletters.length === 0) {
      return NextResponse.json({ success: false, error: 'Newsletter not found' }, { status: 404 });
    }

    const newsletter = newsletters[0];
    
    // Only return published newsletters for public access
    if (newsletter.status !== 'published') {
      return NextResponse.json({ success: false, error: 'Newsletter not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: newsletter });
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch newsletter' }, { status: 500 });
  }
}

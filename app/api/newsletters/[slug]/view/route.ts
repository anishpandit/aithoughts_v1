import { NextRequest, NextResponse } from 'next/server';
import { incrementNewsletterViewCount, getNewsletterBySlug } from '@/src/db/queries';

// POST - Increment newsletter view count
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    // First, get the newsletter to get its ID
    const newsletters = await getNewsletterBySlug(slug);
    
    if (newsletters.length === 0) {
      return NextResponse.json({ success: false, error: 'Newsletter not found' }, { status: 404 });
    }

    const newsletter = newsletters[0];
    
    // Only increment view count for published newsletters
    if (newsletter.status !== 'published') {
      return NextResponse.json({ success: false, error: 'Newsletter not found' }, { status: 404 });
    }

    // Increment the view count
    await incrementNewsletterViewCount(newsletter.id);

    return NextResponse.json({ success: true, message: 'View count incremented' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ success: false, error: 'Failed to increment view count' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/src/db/queries';

// GET - Fetch blog post by slug (public access)
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const blogPosts = await getBlogPostBySlug(slug);
    
    if (blogPosts.length === 0) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    const blogPost = blogPosts[0];
    
    // Only return published blog posts for public access
    if (blogPost.status !== 'published') {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blogPost });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

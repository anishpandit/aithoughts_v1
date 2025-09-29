import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug, incrementBlogPostViewCount } from '@/src/db/queries';

// POST - Increment blog post view count
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    // First, get the blog post to get its ID
    const blogPosts = await getBlogPostBySlug(slug);
    
    if (blogPosts.length === 0) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    const blogPost = blogPosts[0];
    
    // Only increment view count for published blog posts
    if (blogPost.status !== 'published') {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    // Increment the view count
    await incrementBlogPostViewCount(blogPost.id);

    return NextResponse.json({ success: true, message: 'View count incremented' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ success: false, error: 'Failed to increment view count' }, { status: 500 });
  }
}

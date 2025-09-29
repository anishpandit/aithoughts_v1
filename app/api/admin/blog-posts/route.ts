import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllBlogPosts, 
  getBlogPostById, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getPublishedBlogPosts 
} from '@/src/db/queries';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET - Fetch all blog posts (public access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let blogPosts;
    if (published === 'true') {
      blogPosts = await getPublishedBlogPosts(limit, offset);
    } else {
      // For non-admin users, only show published posts
      blogPosts = await getPublishedBlogPosts(limit, offset);
    }

    return NextResponse.json({ success: true, data: blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const blogPost = await createBlogPost(body);
    return NextResponse.json({ success: true, data: blogPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog post' }, { status: 500 });
  }
}

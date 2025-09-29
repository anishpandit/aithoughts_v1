import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllAIProducts, 
  getFeaturedAIProducts,
  createAIProduct 
} from '@/src/db/queries';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET - Fetch all AI products (public access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let products;
    if (featured === 'true') {
      products = await getFeaturedAIProducts();
    } else {
      products = await getAllAIProducts(limit, offset);
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching AI products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch AI products' }, { status: 500 });
  }
}

// POST - Create new AI product
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const product = await createAIProduct(body);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating AI product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create AI product' }, { status: 500 });
  }
}

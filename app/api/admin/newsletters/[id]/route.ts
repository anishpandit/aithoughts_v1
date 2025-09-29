import { NextRequest, NextResponse } from 'next/server';
import { 
  getNewsletterById, 
  updateNewsletter, 
  deleteNewsletter 
} from '@/src/db/queries';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET - Fetch newsletter by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const { id } = await params;
    const newsletter = await getNewsletterById(parseInt(id));
    return NextResponse.json({ success: true, data: newsletter });
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch newsletter' }, { status: 500 });
  }
}

// PUT - Update newsletter
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const newsletter = await updateNewsletter(parseInt(id), body);
    return NextResponse.json({ success: true, data: newsletter });
  } catch (error) {
    console.error('Error updating newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to update newsletter' }, { status: 500 });
  }
}

// DELETE - Delete newsletter
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const { id } = await params;
    await deleteNewsletter(parseInt(id));
    return NextResponse.json({ success: true, message: 'Newsletter deleted successfully' });
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete newsletter' }, { status: 500 });
  }
}

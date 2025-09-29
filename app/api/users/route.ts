import { NextRequest, NextResponse } from 'next/server';
import { getAllAdmins, createUserSubscription } from '@/src/db/queries';

export async function GET() {
  try {
    const users = await getAllAdmins();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clerkUserId, email, name, tier = 'free', isActive = true } = body;
    
    if (!clerkUserId || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newUser = await createUserSubscription({ 
      clerkUserId, 
      email, 
      name, 
      tier, 
      isActive 
    });
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

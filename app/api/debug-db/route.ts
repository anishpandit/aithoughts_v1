import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Debug database endpoint - not implemented' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ message: 'Debug database endpoint - not implemented' }, { status: 501 });
}


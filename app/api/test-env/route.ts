import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set',
    clerkSecretKey: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set',
    databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('CLERK') || key.includes('DATABASE'))
  });
}

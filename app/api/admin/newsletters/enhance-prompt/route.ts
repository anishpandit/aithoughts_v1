import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { enhancePrompt } from '@/lib/ai-service';

// POST - Enhance user prompts using AI
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const { prompt, contentType = 'newsletter' } = body;
    
    console.log('Enhance Prompt API called with:', {
      hasPrompt: !!prompt,
      contentType,
      promptLength: prompt?.length || 0
    });

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Prompt is required' 
      }, { status: 400 });
    }

    const enhancement = await enhancePrompt(prompt, contentType);
    
    if (!enhancement.success) {
      return NextResponse.json({ 
        success: false, 
        error: enhancement.error || 'Failed to enhance prompt' 
      }, { status: 500 });
    }

    console.log('Prompt enhanced successfully:', {
      originalLength: prompt.length,
      enhancedLength: enhancement.data?.enhancedPrompt?.length || 0
    });
    
    return NextResponse.json({ 
      success: true, 
      data: enhancement.data 
    });
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to enhance prompt' 
    }, { status: 500 });
  }
}

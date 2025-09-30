import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { createNewsletter } from '@/src/db/queries';
import { generateNewsletterContent } from '@/lib/ai-service';

// POST - Generate newsletter using AI prompts
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const body = await request.json();
    const { prompt, title, content, publish, authorId = 'admin', includeMedia = true } = body;
    
    console.log('AI Generate API called with:', {
      hasPrompt: !!prompt,
      hasTitle: !!title,
      hasContent: !!content,
      publish: publish,
      contentLength: content?.length || 0
    });

    let newsletterData;

    if (publish && content) {
      // Publishing pre-written content (from preview)
      newsletterData = {
        title: title || 'Untitled Newsletter',
        slug: generateSlug(title || 'untitled-newsletter'),
        description: content.slice(0, 150) + '...',
        content: content,
        excerpt: content.slice(0, 200) + '...',
        status: 'published' as const,
        publishedAt: new Date(),
        authorId,
        tags: ['newsletter', 'published'] as string[],
        readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        isPremium: false
      };
    } else {
      // Generate new content using AI
      if (!prompt) {
        return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
      }

      const aiResponse = await generateNewsletterContent(prompt, title, includeMedia);
      
      if (!aiResponse.success || !aiResponse.data) {
        return NextResponse.json({ success: false, error: 'error' in aiResponse ? aiResponse.error : 'Failed to generate content' }, { status: 500 });
      }

      newsletterData = {
        title: aiResponse.data.title,
        slug: generateSlug(aiResponse.data.title),
        description: aiResponse.data.description,
        content: aiResponse.data.content,
        excerpt: aiResponse.data.excerpt,
        status: 'published' as const,
        publishedAt: new Date(),
        authorId,
        tags: aiResponse.data.tags as string[],
        readTime: aiResponse.data.readTime,
        isPremium: false
      };
    }

    const newsletter = await createNewsletter(newsletterData);
    console.log('Newsletter created successfully:', newsletter);
    console.log('Newsletter data to return:', newsletter[0]);
    
    if (!newsletter || newsletter.length === 0) {
      console.error('No newsletter returned from database');
      return NextResponse.json({ success: false, error: 'Failed to create newsletter in database' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: newsletter[0] });
  } catch (error) {
    console.error('Error generating newsletter with AI:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate newsletter' 
    }, { status: 500 });
  }
}


function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // Add timestamp to make it unique
  const timestamp = Date.now();
  return `${baseSlug}-${timestamp}`;
}

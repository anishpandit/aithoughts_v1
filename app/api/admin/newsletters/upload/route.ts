import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { createNewsletter } from '@/src/db/queries';
import { 
  processTextFile, 
  processPDFFile, 
  processWordFile, 
  validateFileType,
  getFileTypeDescription 
} from '@/lib/file-processing';

// POST - Upload and process newsletter from file
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authError = await requireAdminAuth();
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const authorId = formData.get('authorId') as string || 'admin';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!validateFileType(file)) {
      return NextResponse.json({ 
        success: false, 
        error: `Invalid file type. Please upload PDF, DOC, DOCX, or TXT files only. Detected: ${getFileTypeDescription(file)}` 
      }, { status: 400 });
    }

    // Process the file
    const fileContent = await processUploadedFile(file);
    
    if (!fileContent.success) {
      return NextResponse.json({ success: false, error: fileContent.error }, { status: 500 });
    }

    // Create newsletter in database
    const newsletterData = {
      title: title || (fileContent.data ? fileContent.data.title : null) || `Uploaded Newsletter - ${file.name}`,
      slug: generateSlug(title || (fileContent.data ? fileContent.data.title : null) || file.name),
      description: (fileContent.data ? fileContent.data.description : null) || `Newsletter uploaded from ${file.name}`,
      content: fileContent.data ? fileContent.data.content : 'No content extracted',
      excerpt: (fileContent.data ? fileContent.data.excerpt : null) || 'No excerpt available',
      status: 'published' as const,
      publishedAt: new Date(),
      authorId,
      tags: ['uploaded', 'file-import'],
      readTime: fileContent.data ? Math.ceil(fileContent.data.content.length / 1000) : 5, // Rough estimate: 1000 chars per minute
      isPremium: false
    };

    const newsletter = await createNewsletter(newsletterData);
    return NextResponse.json({ success: true, data: newsletter });
  } catch (error) {
    console.error('Error processing uploaded file:', error);
    return NextResponse.json({ success: false, error: 'Failed to process uploaded file' }, { status: 500 });
  }
}

async function processUploadedFile(file: File) {
  try {
    let processedContent;
    
    // Process based on file type
    switch (file.type) {
      case 'text/plain':
        processedContent = await processTextFile(file);
        break;
      case 'application/pdf':
        processedContent = await processPDFFile(file);
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        processedContent = await processWordFile(file);
        break;
      default:
        throw new Error(`Unsupported file type: ${file.type}`);
    }

    return {
      success: true,
      data: processedContent
    };
  } catch (error) {
    console.error('Error processing file:', error);
    return { 
      success: false, 
      error: 'Failed to process the uploaded file. Please ensure the file is not corrupted.' 
    };
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

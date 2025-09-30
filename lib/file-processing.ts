// File processing utilities for newsletter uploads
// This is a basic implementation - in production, you'd want to use proper libraries

export interface ProcessedFileContent {
  title: string;
  description: string;
  content: string;
  excerpt: string;
}

export async function processTextFile(file: File): Promise<ProcessedFileContent> {
  const text = await file.text();
  
  return {
    title: extractTitleFromText(text),
    description: extractDescriptionFromText(text),
    content: formatContent(text),
    excerpt: extractExcerptFromText(text)
  };
}

export async function processPDFFile(file: File): Promise<ProcessedFileContent> {
  // For PDF processing, you would typically use a library like pdf-parse
  // For now, we'll return a placeholder
  return {
    title: `PDF Document - ${file.name}`,
    description: `Content extracted from PDF: ${file.name}`,
    content: `# PDF Content from ${file.name}\n\n*Note: Full PDF processing requires additional libraries like pdf-parse*`,
    excerpt: `PDF content from ${file.name}`
  };
}

export async function processWordFile(file: File): Promise<ProcessedFileContent> {
  // For Word document processing, you would typically use a library like mammoth
  // For now, we'll return a placeholder
  return {
    title: `Word Document - ${file.name}`,
    description: `Content extracted from Word document: ${file.name}`,
    content: `# Word Document Content from ${file.name}\n\n*Note: Full Word document processing requires additional libraries like mammoth*`,
    excerpt: `Word document content from ${file.name}`
  };
}

function extractTitleFromText(text: string): string {
  // Try to find a title in the first few lines
  const lines = text.split('\n').slice(0, 10);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 10 && trimmed.length < 100 && !trimmed.startsWith('#')) {
      return trimmed;
    }
  }
  return 'Uploaded Newsletter';
}

function extractDescriptionFromText(text: string): string {
  // Extract first paragraph as description
  const paragraphs = text.split('\n\n');
  const firstParagraph = paragraphs[0]?.trim();
  if (firstParagraph && firstParagraph.length > 20) {
    return firstParagraph.slice(0, 200) + (firstParagraph.length > 200 ? '...' : '');
  }
  return 'Newsletter content from uploaded file';
}

function extractExcerptFromText(text: string): string {
  // Extract first 200 characters as excerpt
  const cleanText = text.replace(/\n/g, ' ').trim();
  return cleanText.slice(0, 200) + (cleanText.length > 200 ? '...' : '');
}

function formatContent(text: string): string {
  // Basic formatting for the content
  const lines = text.split('\n');
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return '';
    
    // If line looks like a heading, format it
    if (trimmed.length < 50 && !trimmed.includes('.') && !trimmed.includes(',')) {
      return `## ${trimmed}`;
    }
    
    return trimmed;
  });
  
  return formattedLines.join('\n\n');
}

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  return allowedTypes.includes(file.type);
}

export function getFileTypeDescription(file: File): string {
  switch (file.type) {
    case 'application/pdf':
      return 'PDF Document';
    case 'application/msword':
      return 'Word Document (DOC)';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'Word Document (DOCX)';
    case 'text/plain':
      return 'Text File';
    default:
      return 'Unknown File Type';
  }
}

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIGenerationResult {
  success: boolean;
  data?: {
    title: string;
    content: string;
    description: string;
    excerpt: string;
    tags: string[];
    readTime: number;
    images?: string[];
    videos?: string[];
    enhancedPrompt?: string;
  };
  error?: string;
}

export interface PromptEnhancementResult {
  success: boolean;
  data?: {
    originalPrompt: string;
    enhancedPrompt: string;
    mediaSuggestions: {
      images: string[];
      videos: string[];
    };
    reasoning: string;
  };
  error?: string;
}

// Prompt Manager - Enhances user prompts for better content generation
export async function enhancePrompt(
  originalPrompt: string,
  contentType: 'newsletter' | 'blog' = 'newsletter'
): Promise<PromptEnhancementResult> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        success: false,
        error: 'OpenAI API key not configured'
      };
    }

    const systemPrompt = `You are an expert content strategist and prompt engineer. Your job is to enhance user prompts to create more engaging, comprehensive, and professional content.

ENHANCEMENT GUIDELINES:
- Add specific details and context to make prompts more actionable
- Suggest relevant multimedia elements (images, videos, infographics)
- Include target audience considerations
- Add trending topics and current events when relevant
- Ensure the enhanced prompt will generate high-quality, engaging content
- Maintain the original intent while expanding scope
- Consider SEO and social media optimization
- Suggest content structure and key points to cover

Your response should be a JSON object with:
- originalPrompt: the user's original prompt
- enhancedPrompt: your improved version
- mediaSuggestions: { images: [], videos: [] }
- reasoning: brief explanation of your enhancements`;

    const userPrompt = `Enhance this ${contentType} prompt for better content generation:

Original prompt: "${originalPrompt}"

Please enhance it to create more engaging, comprehensive content that will generate high-quality articles. Consider:
- Adding specific details and context
- Suggesting relevant images and videos
- Including current trends and insights
- Making it more actionable and valuable
- Ensuring it will appeal to our target audience (tech professionals, entrepreneurs, AI enthusiasts)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return {
        success: false,
        error: 'No enhancement generated'
      };
    }

    try {
      const enhanced = JSON.parse(response);
      return {
        success: true,
        data: enhanced
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        success: true,
        data: {
          originalPrompt,
          enhancedPrompt: response,
          mediaSuggestions: { images: [], videos: [] },
          reasoning: 'Enhanced prompt generated'
        }
      };
    }

  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to enhance prompt'
    };
  }
}

export async function generateNewsletterContent(
  prompt: string, 
  customTitle?: string,
  includeMedia: boolean = true
): Promise<AIGenerationResult> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        success: false,
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
      };
    }

    const systemPrompt = `You are a professional newsletter writer and content creator. Your task is to create high-quality, engaging newsletter content based on user prompts.

IMPORTANT GUIDELINES:
- Write as a human expert, not as an AI
- Never mention that the content is AI-generated
- Never use meta-referential language about AI or generation
- Focus on providing real value and insights
- Use a professional, engaging tone
- Structure content with clear headings and sections
- Include actionable insights and practical information
- Write in markdown format
- Keep content informative and well-researched
- Avoid generic templates or placeholder content
- Include relevant image and video suggestions where appropriate
- Use multimedia elements to enhance engagement

Your response should be a complete newsletter article that someone would actually want to read and share.`;

    const userPrompt = `Create a comprehensive newsletter article about: "${prompt}"

${customTitle ? `Use this title: "${customTitle}"` : 'Generate an engaging title for this topic.'}

The newsletter should:
- Be informative and well-researched
- Include practical insights and actionable advice
- Have a clear structure with headings
- Be engaging and professional
- Provide real value to readers
- Be 800-1500 words in length
- Include relevant images to enhance the content
- Use multimedia elements to enhance engagement

${includeMedia ? 'Include 2-3 relevant images in your content using placeholder URLs like ![Detailed image description for AI generation](https://placeholder.com/800x400) for images that would enhance the article. Make the image descriptions detailed and specific so AI can generate amazing visuals.' : ''}

Format your response as a complete newsletter article in markdown.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      return {
        success: false,
        error: 'No content generated by AI'
      };
    }

    // Extract title from content (first heading)
    const titleMatch = generatedContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : (customTitle || prompt);

    // Create description (first paragraph or excerpt)
    const description = generatedContent
      .replace(/^#.*$/m, '') // Remove title
      .replace(/^##.*$/gm, '') // Remove all headings
      .trim()
      .split('\n')[0]
      .slice(0, 150) + '...';

    // Create excerpt (first 200 characters of content)
    const excerpt = generatedContent
      .replace(/^#.*$/m, '') // Remove title
      .replace(/^##.*$/gm, '') // Remove all headings
      .trim()
      .slice(0, 200) + '...';

    // Estimate read time (average 200 words per minute)
    const wordCount = generatedContent.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Generate relevant tags based on content
    const tags = generateTagsFromContent(generatedContent, prompt);

    // Generate actual images using DALL-E for enhanced newsletters
    let finalContent = generatedContent;
    let images: string[] = [];
    let videos: string[] = [];
    
    if (includeMedia) {
      console.log('Generating images for newsletter content...');
      
      // Find all image placeholders in the content
      const imageMatches = generatedContent.match(/!\[(.*?)\]\((.*?)\)/g);
      if (imageMatches && imageMatches.length > 0) {
        console.log(`Found ${imageMatches.length} image placeholders to generate`);
        
        for (const match of imageMatches) {
          const [, description, placeholderUrl] = match.match(/!\[(.*?)\]\((.*?)\)/) || [];
          if (description && description.trim()) {
            try {
              console.log(`Generating image for: ${description}`);
              const actualImageUrl = await generateNewsletterImage(description, title);
              if (actualImageUrl) {
                finalContent = finalContent.replace(match, `![${description}](${actualImageUrl})`);
                images.push(actualImageUrl);
                console.log(`Successfully generated image: ${actualImageUrl}`);
              } else {
                console.warn(`Failed to generate image for: ${description}`);
                // Keep the placeholder if generation fails
              }
            } catch (error) {
              console.error(`Error generating image for "${description}":`, error);
              // Keep the placeholder if generation fails
            }
          }
        }
      }

      // Extract any remaining video links
      const videoMatches = finalContent.match(/\[.*?\]\((.*?)\)/g);
      if (videoMatches) {
        videos = videoMatches.map(match => {
          const urlMatch = match.match(/\[.*?\]\((.*?)\)/);
          return urlMatch ? urlMatch[1] : '';
        }).filter(url => url && !images.includes(url));
      }
      
      console.log(`Generated ${images.length} images and found ${videos.length} videos`);
    }

    return {
      success: true,
      data: {
        title,
        content: finalContent,
        description,
        excerpt,
        tags,
        readTime,
        images: includeMedia ? images : undefined,
        videos: includeMedia ? videos : undefined
      }
    };

  } catch (error) {
    console.error('Error generating newsletter content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content'
    };
  }
}

function generateTagsFromContent(content: string, prompt: string): string[] {
  const tags = new Set<string>();
  
  // Add tags based on prompt keywords
  const promptWords = prompt.toLowerCase().split(/\s+/);
  promptWords.forEach(word => {
    if (word.length > 3) {
      tags.add(word);
    }
  });

  // Add common newsletter tags
  tags.add('newsletter');
  tags.add('insights');

  // Add technology-related tags if content mentions tech
  if (content.toLowerCase().includes('technology') || content.toLowerCase().includes('tech')) {
    tags.add('technology');
  }

  if (content.toLowerCase().includes('ai') || content.toLowerCase().includes('artificial intelligence')) {
    tags.add('ai');
  }

  if (content.toLowerCase().includes('business') || content.toLowerCase().includes('startup')) {
    tags.add('business');
  }

  return Array.from(tags).slice(0, 5); // Limit to 5 tags
}

// Generate actual images for newsletter content
async function generateNewsletterImage(description: string, title: string): Promise<string | null> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured for image generation');
      return null;
    }

    // Create a more specific and engaging prompt for image generation
    const imagePrompt = `Create a stunning, professional image for a tech newsletter article titled "${title}". 

    Specific image description: ${description}
    
    Visual style requirements:
    - Modern, sleek, and professional design
    - High-quality, magazine-worthy composition
    - Perfect for a technology/AI newsletter
    - Clean, minimalist aesthetic
    - Vibrant but professional colors
    - No text or overlays
    - Focus on visual impact and engagement
    - Suitable for both web and print
    - High contrast and sharp details`;

    console.log(`Generating DALL-E image with prompt: ${imagePrompt.substring(0, 100)}...`);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid"
    });

    const imageUrl = response.data[0]?.url;
    if (imageUrl) {
      console.log('✅ Successfully generated DALL-E image:', imageUrl);
      return imageUrl;
    } else {
      console.warn('❌ No image URL returned from DALL-E');
      return null;
    }
  } catch (error) {
    console.error('❌ Error generating newsletter image:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}

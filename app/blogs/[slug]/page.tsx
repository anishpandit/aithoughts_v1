'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  excerpt: string;
  status: string;
  isPremium: boolean;
  viewCount: number;
  readTime: number;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  authorId: string;
  featuredImage?: string;
}

export default function BlogPostPage() {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogPost(data.data);
        // Increment view count
        await fetch(`/api/blogs/${slug}/view`, { method: 'POST' });
      } else {
        setError(data.error || 'Blog post not found');
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Button asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Blog Post Header */}
          <article className="bg-card border border-border rounded-lg p-8">
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {blogPost.title}
                  </h1>
                  {blogPost.description && (
                    <p className="text-xl text-muted-foreground mb-6">
                      {blogPost.description}
                    </p>
                  )}
                </div>
                {blogPost.isPremium && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20 ml-4">
                    Premium
                  </span>
                )}
              </div>

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPost.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(blogPost.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blogPost.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {blogPost.viewCount} views
                </div>
              </div>
            </div>

            {/* Blog Post Content */}
            <div className="newsletter-content prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-primary
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-4
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-foreground prose-em:italic
              prose-ul:my-4 prose-ol:my-4
              prose-li:text-foreground prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-table:border prose-table:border-border prose-table:rounded-lg
              prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2
              prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {blogPost.content}
              </ReactMarkdown>
            </div>

            {/* Blog Post Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Published on {new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blogs">
                      <BookOpen className="mr-2 h-4 w-4" />
                      More Blog Posts
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, Eye, Tag } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  status: string;
  isPremium: boolean;
  viewCount: number;
  readTime: number;
  tags: string[];
  publishedAt: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog-posts?published=true');
      const data = await response.json();
      if (data.success) {
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Blog</span> & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dives into AI technologies, practical tutorials, and thought-provoking insights from the AI community.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground text-lg mb-4">
                        {post.excerpt || post.description}
                      </p>
                    </div>
                    {post.isPremium && (
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20 ml-4">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.viewCount} views
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-6">
                    <Button asChild variant="outline" className="group">
                      <Link href={`/blogs/${post.slug}`}>
                        Read Full Article
                        <BookOpen className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground">
                We're working on our first blog post. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ExternalLink, Github, DollarSign, Star, Tag } from 'lucide-react';
import Link from 'next/link';

interface AIProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  price: string;
  currency: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  websiteUrl: string;
  features: string[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<AIProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/ai-products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading AI products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Products</span> & Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover cutting-edge AI tools, platforms, and products that are shaping the future of technology.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {product.description}
                      </p>
                    </div>
                    {product.isFeatured && (
                      <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20 ml-2">
                        <Star className="h-3 w-3 inline mr-1" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Category & Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary border border-primary/20">
                      {product.category}
                    </span>
                    {product.price && (
                      <div className="flex items-center text-sm font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {product.price}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {product.features.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{product.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    {product.websiteUrl && (
                      <Button asChild variant="default" className="w-full">
                        <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                    <div className="flex gap-2">
                      {product.demoUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                            Demo
                          </a>
                        </Button>
                      )}
                      {product.githubUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={product.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No AI products yet</h3>
              <p className="text-muted-foreground">
                We're curating amazing AI products. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

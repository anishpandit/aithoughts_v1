import { Button } from "@/components/ui/button";
import { Mail, Sparkles, Briefcase, TrendingUp, Users, Zap, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block animate-fade-in">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Welcome to the Future of AI 🚀
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            Exploring the Future of{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Join us on a journey to understand, explore, and share insights about AI. 
            We're building a community-driven platform for AI enthusiasts, learners, and innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button asChild size="lg" className="text-base group">
              <Link href="/newsletters">
                <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Read Newsletters
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/products">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore AI Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What We're Building
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            A vision for connecting AI enthusiasts, sharing knowledge, and exploring possibilities together
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Newsletter Feature */}
            <div className="group p-6 rounded-lg border border-border bg-card hover:bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Newsletters</h3>
              <p className="text-muted-foreground mb-4">
                We're creating thoughtful newsletters that dive into AI trends, research breakthroughs, 
                and practical insights. Join us as we learn and share knowledge together.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/newsletters">
                  <Mail className="mr-2 h-4 w-4" />
                  Read Newsletters
                </Link>
              </Button>
            </div>

            {/* AI Products Feature */}
            <div className="group p-6 rounded-lg border border-border bg-card hover:bg-card/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Product Showcase</h3>
              <p className="text-muted-foreground mb-4">
                We'll be exploring and sharing insights about emerging AI tools and platforms. 
                From LLMs to computer vision, let's discover what's possible together.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/products">
                  <Zap className="mr-2 h-4 w-4" />
                  Explore Products
                </Link>
              </Button>
            </div>

            {/* Blog Feature */}
            <div className="group p-6 rounded-lg border border-border bg-card hover:bg-card/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Blog & Insights</h3>
              <p className="text-muted-foreground mb-4">
                Deep dives into AI technologies, practical tutorials, and thought-provoking insights. 
                Growing together by exploring how AI can create real value.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/blogs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About/Bio Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground text-lg">
              Building a community around AI exploration and learning
            </p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                aithoughts.in is a passion project born from genuine curiosity about artificial intelligence 
                and its transformative potential. We're on a mission to explore, understand, and share 
                insights about AI in an authentic and accessible way.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 py-6 border-y border-border/50">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🎯</div>
                  <div className="font-semibold text-foreground">Our Mission</div>
                  <div className="text-sm text-muted-foreground">Make AI knowledge accessible and actionable</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">🚀</div>
                  <div className="font-semibold text-foreground">Our Journey</div>
                  <div className="text-sm text-muted-foreground">Learning and growing with the AI community</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">💡</div>
                  <div className="font-semibold text-foreground">Our Approach</div>
                  <div className="text-sm text-muted-foreground">Honest insights, real experiences</div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-foreground/90">
                We're here for anyone curious about AI - whether you're a developer exploring ML models, 
                a business professional considering AI adoption, or simply fascinated by the technology. 
                We believe in growing together, sharing what we learn, and being transparent about our journey.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-lg mb-3 text-foreground">What Drives Us</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Authentic exploration of AI technologies and their real-world applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Building a community where questions are welcomed and learning is shared</span>
          </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Connecting with individuals and organizations passionate about AI's potential</span>
          </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                  Machine Learning
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">
                  LLMs & NLP
                </span>
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm border border-pink-500/20">
                  Computer Vision
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
                  AI Ethics
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                  AI Applications
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join Us on This Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of something meaningful from the ground up. Whether you're curious about AI, 
            looking for collaboration opportunities, or interested in what we're building - let's connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-base group">
              <Link href="/newsletters">
                <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Read Newsletters
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/products">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                aithoughts.in
              </h3>
              <p className="text-sm text-muted-foreground">
                Exploring AI together. Join us on our journey to understand and share the transformative potential of artificial intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/newsletters" className="hover:text-primary transition-colors">Newsletters</Link></li>
                <li><Link href="/blogs" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/products" className="hover:text-primary transition-colors">AI Products</Link></li>
                <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 aithoughts.in. Building something meaningful, one insight at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

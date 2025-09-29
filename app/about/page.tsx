import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">AI Thoughts</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A passion project exploring the transformative potential of artificial intelligence.
            </p>
          </div>

          {/* Main Content */}
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

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground mb-6">
              Have questions, ideas, or want to collaborate? We'd love to hear from you.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="mailto:hello@aithoughts.in" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Mail className="h-4 w-4" />
                Email Us
              </Link>
              <Link href="https://github.com/aithoughts" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link href="https://linkedin.com/company/aithoughts" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="https://twitter.com/aithoughts" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

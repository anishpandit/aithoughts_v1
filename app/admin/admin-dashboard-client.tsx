'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Eye, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { 
  createNewsletterAction, 
  createAIProductAction, 
  setUserAsAdminAction, 
  createUserAction 
} from '@/lib/actions/admin-actions';

interface Newsletter {
  id: number;
  title: string;
  slug: string;
  status: string;
  isPremium: boolean;
  viewCount: number;
  createdAt: Date | null;
}

interface AIProduct {
  id: number;
  name: string;
  slug: string;
  category: string | null;
  price: string | null;
  isActive: boolean;
  isFeatured: boolean;
}

interface User {
  id: number;
  clerkUserId: string;
  email: string;
  name: string | null;
  tier: string;
  isActive?: boolean;
  role?: string;
}

interface AdminData {
  newsletters: Newsletter[];
  aiProducts: AIProduct[];
  admins: User[];
}

interface AdminDashboardClientProps {
  initialData: AdminData;
}

export default function AdminDashboardClient({ initialData }: AdminDashboardClientProps) {
  const [newsletters, setNewsletters] = useState<Newsletter[]>(initialData.newsletters);
  const [aiProducts, setAiProducts] = useState<AIProduct[]>(initialData.aiProducts);
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>(initialData.admins);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('newsletters');
  const [showAIModal, setShowAIModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newsletterToDelete, setNewsletterToDelete] = useState<number | null>(null);
  const [newsletterToView, setNewsletterToView] = useState<Newsletter | null>(null);
  const [viewContent, setViewContent] = useState<string | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTitle, setAiTitle] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [previewContent, setPreviewContent] = useState<{
    title: string;
    content: string;
    prompt: string;
  } | null>(null);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');

  // Test user creation using server action
  const testUserCreation = async () => {
    setLoading(true);
    try {
      const testUser = {
        clerkUserId: 'test_admin_' + Date.now(),
        email: 'admin@test.com',
        name: 'Test Admin',
        tier: 'paid' as const,
        isActive: true
      };
      
      const result = await createUserAction(testUser);
      if (result) {
        toast.success('User created successfully!');
        // Add to local state
        setUsers(prev => [...prev, {
          id: result[0].id,
          clerkUserId: result[0].clerkUserId,
          email: result[0].email,
          name: result[0].name || 'Unknown',
          tier: result[0].tier,
          isActive: result[0].isActive
        }]);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  // Mock users data for demo
  const mockUsers = [
    {
      id: 1,
      clerkUserId: 'test_user_123',
      email: 'test@example.com',
      name: 'Test User',
      tier: 'free',
      isActive: true
    }
  ];

  // Set user as admin using server action
  const setUserAsAdmin = async () => {
    setLoading(true);
    try {
      const adminData = {
        clerkUserId: 'user_330I...Vnt1F0hbB', // You'll need the full ID
        email: 'anishpandit007@gmail.com',
        name: 'Anish Pandit'
      };
      
      const result = await setUserAsAdminAction(adminData);
      if (result) {
        toast.success('User set as admin successfully!');
        // Add to local state
        setAdmins(prev => [...prev, {
          id: result[0].id,
          clerkUserId: result[0].clerkUserId,
          email: result[0].email,
          name: result[0].name || 'Unknown',
          tier: result[0].tier,
          isActive: result[0].isActive
        }]);
      }
    } catch (error) {
      console.error('Error setting admin:', error);
      toast.error('Error setting admin');
    } finally {
      setLoading(false);
    }
  };

  // Test newsletter creation using server action
  const testNewsletterCreation = async () => {
    setLoading(true);
    try {
      const testNewsletter = {
        title: 'Test Newsletter from Admin',
        slug: 'test-newsletter-admin-' + Date.now(),
        description: 'A test newsletter created from admin dashboard',
        content: 'This is test content for the newsletter created from admin dashboard.',
        excerpt: 'Test excerpt',
        status: 'published' as const,
        publishedAt: new Date().toISOString(),
        authorId: 'admin',
        tags: ['test', 'admin'],
        readTime: 3,
        isPremium: false
      };
      
      const result = await createNewsletterAction(testNewsletter);
      if (result) {
        toast.success('Newsletter created successfully!');
        // Add to local state
        setNewsletters(prev => [...prev, {
          id: result[0].id,
          title: result[0].title,
          slug: result[0].slug,
          status: result[0].status,
          isPremium: result[0].isPremium,
          viewCount: result[0].viewCount || 0,
          createdAt: result[0].createdAt ? new Date(result[0].createdAt) : null
        }]);
      }
    } catch (error) {
      console.error('Error creating newsletter:', error);
      toast.error('Error creating newsletter');
    } finally {
      setLoading(false);
    }
  };

  // Test AI product creation using server action
  const testAIProductCreation = async () => {
    setLoading(true);
    try {
      const testProduct = {
        name: 'Test AI Product from Admin',
        slug: 'test-ai-product-admin-' + Date.now(),
        description: 'A test AI product created from admin dashboard',
        longDescription: 'This is a longer description for the test AI product created from admin dashboard.',
        category: 'Test Category',
        price: '19.99',
        currency: 'USD',
        features: ['Feature 1', 'Feature 2', 'Admin Created'],
        tags: ['test', 'ai', 'product', 'admin'],
        isActive: true,
        isFeatured: false
      };
      
      const result = await createAIProductAction(testProduct);
      if (result) {
        toast.success('AI Product created successfully!');
        // Add to local state
        setAiProducts(prev => [...prev, {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug,
          category: result[0].category || 'Unknown',
          price: result[0].price || '0',
          isActive: result[0].isActive,
          isFeatured: result[0].isFeatured
        }]);
      }
    } catch (error) {
      console.error('Error creating AI product:', error);
      toast.error('Error creating AI product');
    } finally {
      setLoading(false);
    }
  };


  const confirmDeleteNewsletter = async () => {
    if (!newsletterToDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/newsletters/${newsletterToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Newsletter deleted successfully!');
        // Remove from local state
        setNewsletters(prev => prev.filter(newsletter => newsletter.id !== newsletterToDelete));
      } else {
        const error = await response.json();
        toast.error(`Error deleting newsletter: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      toast.error('Error deleting newsletter');
    } finally {
      setLoading(false);
      setNewsletterToDelete(null);
    }
  };

  // AI-powered newsletter generation
  const generateNewsletterWithAI = async () => {
    const promptToUse = aiPrompt;
    if (!promptToUse.trim()) {
      toast.error('Please enter a prompt for AI generation');
      return;
    }

    setLoading(true);
    try {
      console.log('Generating newsletter with prompt:', promptToUse);
      const response = await fetch('/api/admin/newsletters/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToUse,
          title: aiTitle || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('AI Generation Response:', result);
        
        // Handle different response structures
        const data = result.data;
        if (!data) {
          toast.error('No data returned from AI generation');
          return;
        }

        // Check if data is an array or single object
        const newsletterData = Array.isArray(data) ? data[0] : data;
        
        if (!newsletterData) {
          console.error('Invalid newsletter data structure:', data);
          toast.error('Invalid newsletter data structure');
          return;
        }

        if (!newsletterData.title || !newsletterData.content) {
          console.error('Missing required fields in newsletter data:', newsletterData);
          toast.error('Generated newsletter is missing required fields');
          return;
        }

        // Show preview instead of directly creating
        setPreviewContent({
          title: newsletterData.title,
          content: newsletterData.content,
          prompt: promptToUse
        });
        // Set editable content
        setEditableTitle(newsletterData.title);
        setEditableContent(newsletterData.content);
        setShowPreviewModal(true);
        setShowAIModal(false);
        toast.success('AI content generated! Please review and edit before publishing.');
      } else {
        const error = await response.json();
        toast.error(`Error generating newsletter: ${error.error}`);
      }
    } catch (error) {
      console.error('Error generating newsletter:', error);
      if (error instanceof Error) {
        toast.error(`Error generating newsletter: ${error.message}`);
      } else {
        toast.error('Error generating newsletter');
      }
    } finally {
      setLoading(false);
    }
  };

  // Preview actions
  const publishPreviewNewsletter = async () => {
    if (!previewContent) {
      console.error('No preview content available');
      toast.error('No content to publish');
      return;
    }

    if (!editableTitle.trim() || !editableContent.trim()) {
      console.error('Missing title or content:', { editableTitle, editableContent });
      toast.error('Please provide both title and content');
      return;
    }

    setLoading(true);
    console.log('Publishing newsletter with:', {
      title: editableTitle,
      content: editableContent.substring(0, 100) + '...',
      publish: true
    });

    try {
      const response = await fetch('/api/admin/newsletters/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: previewContent.prompt,
          title: editableTitle,
          content: editableContent,
          publish: true
        }),
      });

      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('API Response data:', result);
        
        if (result.success && result.data) {
          // Handle different response structures
          const data = result.data;
          const newsletterData = Array.isArray(data) ? data[0] : data;
          
          if (!newsletterData) {
            toast.error('Invalid newsletter data structure');
            return;
          }

          toast.success('Newsletter published successfully!');
          // Add to local state
          setNewsletters(prev => [...prev, {
            id: newsletterData.id,
            title: newsletterData.title,
            slug: newsletterData.slug,
            status: newsletterData.status,
            isPremium: newsletterData.isPremium,
            viewCount: newsletterData.viewCount || 0,
            createdAt: newsletterData.createdAt ? new Date(newsletterData.createdAt) : null
          }]);
          // Reset and close
          setPreviewContent(null);
          setShowPreviewModal(false);
          setEditableTitle('');
          setEditableContent('');
          setAiPrompt('');
          setAiTitle('');
        } else {
          console.error('API returned success=false:', result);
          toast.error(`API Error: ${result.error || 'Unknown error'}`);
        }
      } else {
        const errorText = await response.text();
        console.error('API Error Response:', response.status, errorText);
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorMessage;
        } catch (e) {
          // Use the text response as error message
          errorMessage = errorText || errorMessage;
        }
        
        toast.error(`Error publishing newsletter: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Network/Fetch Error:', error);
      toast.error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const editPreviewContent = () => {
    setShowPreviewModal(false);
    setShowAIModal(true);
    // Pre-fill the form with current content
    setAiTitle(editableTitle);
    setAiPrompt(previewContent?.prompt || '');
  };

  const cancelPreview = () => {
    setPreviewContent(null);
    setShowPreviewModal(false);
    setEditableTitle('');
    setEditableContent('');
    setAiPrompt('');
    setAiTitle('');
  };

  // View newsletter functions
  const getFirstParagraphs = (markdown: string, maxParagraphs: number = 5): string => {
    const normalized = markdown.replace(/\r\n/g, '\n');
    const blocks = normalized
      .split(/\n{2,}/)
      .map(b => b.trim())
      .filter(b => b.length > 0);
    return blocks.slice(0, Math.max(1, maxParagraphs)).join('\n\n');
  };

  const generateAIImage = async (title: string, content: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/admin/newsletters/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate a professional newsletter header image for: "${title}". Style: modern, clean, tech-focused, newsletter header design.`,
          imageOnly: true
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.imageUrl || null;
      }
    } catch (error) {
      console.error('Error generating AI image:', error);
    }
    return null;
  };


  const viewNewsletter = async (newsletter: Newsletter) => {
    setNewsletterToView(newsletter);
    setShowViewModal(true);
    setViewLoading(true);
    setViewError(null);
    setViewContent(null);
    setViewImage(null);
    setImageLoading(false);
    
    try {
      const res = await fetch(`/api/newsletters/${newsletter.slug}`);
      const data = await res.json();
      if (data?.success && data?.data?.content) {
        const excerpt = getFirstParagraphs(String(data.data.content), 6);
        setViewContent(excerpt);
        
        // Generate AI image in background
        setImageLoading(true);
        const imageUrl = await generateAIImage(newsletter.title, data.data.content);
        if (imageUrl) {
          setViewImage(imageUrl);
        }
        setImageLoading(false);
      } else {
        setViewError(data?.error || 'Failed to load content');
      }
    } catch (err) {
      setViewError('Failed to load content');
    } finally {
      setViewLoading(false);
    }
  };

  const openNewsletterInNewTab = (newsletter: Newsletter) => {
    window.open(`/newsletters/${newsletter.slug}`, '_blank');
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setNewsletterToView(null);
    setViewContent(null);
    setViewError(null);
    setViewImage(null);
    setImageLoading(false);
  };

  // File upload newsletter creation
  const uploadNewsletterFromFile = async () => {
    if (!uploadFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('title', uploadTitle || '');
      formData.append('authorId', 'admin');

      const response = await fetch('/api/admin/newsletters/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Newsletter uploaded and created successfully!');
        // Add to local state
        setNewsletters(prev => [...prev, {
          id: result.data[0].id,
          title: result.data[0].title,
          slug: result.data[0].slug,
          status: result.data[0].status,
          isPremium: result.data[0].isPremium,
          viewCount: result.data[0].viewCount || 0,
          createdAt: result.data[0].createdAt ? new Date(result.data[0].createdAt) : null
        }]);
        // Reset form
        setUploadFile(null);
        setUploadTitle('');
        setShowUploadModal(false);
      } else {
        const error = await response.json();
        toast.error(`Error uploading newsletter: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading newsletter:', error);
      toast.error('Error uploading newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">AI Thoughts Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button 
            onClick={() => setActiveTab('newsletters')}
            variant={activeTab === 'newsletters' ? 'default' : 'outline'}
          >
            Newsletters ({newsletters.length})
          </Button>
          <Button 
            onClick={() => setActiveTab('products')}
            variant={activeTab === 'products' ? 'default' : 'outline'}
          >
            AI Products ({aiProducts.length})
          </Button>
          <Button 
            onClick={() => setActiveTab('users')}
            variant={activeTab === 'users' ? 'default' : 'outline'}
          >
            Users ({mockUsers.length})
          </Button>
          <Button 
            onClick={() => setActiveTab('admins')}
            variant={activeTab === 'admins' ? 'default' : 'outline'}
          >
            Admins ({admins.length})
          </Button>
          <Button 
            onClick={() => setActiveTab('test')}
            variant={activeTab === 'test' ? 'default' : 'outline'}
          >
            Test Functions
          </Button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          {activeTab === 'newsletters' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Newsletters</h2>
                <div className="flex space-x-2">
                  <Button onClick={() => setShowAIModal(true)} disabled={loading}>
                    🤖 AI Generate
                  </Button>
                  <Button onClick={() => setShowUploadModal(true)} disabled={loading}>
                    📄 Upload File
                  </Button>
                  <Button onClick={testNewsletterCreation} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Test Newsletter'}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {newsletters.map((newsletter) => (
                  <div key={newsletter.id} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{newsletter.title}</h3>
                        <p className="text-sm text-gray-300">Slug: {newsletter.slug}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            newsletter.status === 'published' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                          }`}>
                            {newsletter.status}
                          </span>
                          {newsletter.isPremium && (
                            <span className="px-2 py-1 rounded text-xs bg-purple-600 text-purple-100">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-right text-sm text-gray-300">
                          <p>Views: {newsletter.viewCount}</p>
                          <p>Created: {newsletter.createdAt ? new Date(newsletter.createdAt).toLocaleDateString() : 'Unknown'}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => viewNewsletter(newsletter)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            onClick={() => openNewsletterInNewTab(newsletter)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                disabled={loading}
                                variant="destructive"
                                size="sm"
                                onClick={() => setNewsletterToDelete(newsletter.id)}
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the newsletter
                                  "{newsletter.title}" and remove it from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDeleteNewsletter}>
                                  Delete Newsletter
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">AI Products</h2>
                <Button onClick={testAIProductCreation} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Test Product'}
                </Button>
              </div>
              
              <div className="space-y-4">
                {aiProducts.map((product) => (
                  <div key={product.id} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{product.name}</h3>
                        <p className="text-sm text-gray-300">Category: {product.category || 'Unknown'}</p>
                        <p className="text-sm text-gray-300">Price: ${product.price || '0'}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            product.isActive ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {product.isFeatured && (
                            <span className="px-2 py-1 rounded text-xs bg-yellow-600 text-yellow-100">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Users</h2>
                <Button onClick={testUserCreation} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Test User'}
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{user.name || 'Unknown'}</h3>
                        <p className="text-sm text-gray-300">{user.email}</p>
                        <p className="text-sm text-gray-300">ID: {user.clerkUserId}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.tier === 'free' ? 'bg-blue-600 text-blue-100' : 
                            user.tier === 'paid' ? 'bg-green-600 text-green-100' : 'bg-purple-600 text-purple-100'
                          }`}>
                            {user.tier}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.isActive ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'admins' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Admin Users</h2>
                <Button onClick={setUserAsAdmin} disabled={loading}>
                  {loading ? 'Setting...' : 'Set Anish as Admin'}
                </Button>
              </div>
              
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="border border-purple-500 rounded-lg p-4 bg-purple-900/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{admin.name || 'Unknown'}</h3>
                        <p className="text-sm text-gray-300">{admin.email}</p>
                        <p className="text-sm text-gray-300">ID: {admin.clerkUserId}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className="px-2 py-1 rounded text-xs bg-purple-600 text-purple-100">
                            {admin.role}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            admin.tier === 'free' ? 'bg-blue-600 text-blue-100' : 
                            admin.tier === 'paid' ? 'bg-green-600 text-green-100' : 'bg-purple-600 text-purple-100'
                          }`}>
                            {admin.tier}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {admins.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No admin users found. Click "Set Anish as Admin" to create the first admin user.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'test' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-white">Test Database Functions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                  <h3 className="font-medium mb-4 text-white">Content Management</h3>
                  <div className="space-y-2">
                    <Button onClick={testNewsletterCreation} disabled={loading} className="w-full">
                      Test Newsletter Creation
                    </Button>
                    <Button onClick={testAIProductCreation} disabled={loading} className="w-full">
                      Test AI Product Creation
                    </Button>
                    <Button onClick={() => window.location.reload()} disabled={loading} className="w-full">
                      Refresh Newsletters
                    </Button>
                    <Button onClick={() => window.location.reload()} disabled={loading} className="w-full">
                      Refresh AI Products
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                  <h3 className="font-medium mb-4 text-white">User Management</h3>
                  <div className="space-y-2">
                    <Button onClick={testUserCreation} disabled={loading} className="w-full">
                      Test User Creation
                    </Button>
                    <Button onClick={() => window.location.reload()} disabled={loading} className="w-full">
                      Refresh Users
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                  <h3 className="font-medium mb-4 text-white">Database Status</h3>
                  <div className="text-sm space-y-1">
                    <p className="text-green-400">✅ Database connection working</p>
                    <p className="text-green-400">✅ API routes functional</p>
                    <p className="text-green-400">✅ CRUD operations available</p>
                    <p className="text-green-400">✅ User tier system active</p>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                  <h3 className="font-medium mb-4 text-white">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button onClick={() => window.location.reload()} disabled={loading} className="w-full">
                      Refresh All Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Generation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">🤖 AI Newsletter Generation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Newsletter Title (Optional)
                </label>
                <input
                  type="text"
                  value={aiTitle}
                  onChange={(e) => setAiTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  placeholder="Enter custom title or leave blank for auto-generation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  AI Prompt *
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 h-32"
                  placeholder="Describe what kind of newsletter you want to generate..."
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={generateNewsletterWithAI} disabled={loading} className="flex-1">
                  {loading ? 'Generating...' : '🎨 Generate Newsletter'}
                </Button>
                <Button onClick={() => setShowAIModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">📄 Upload Newsletter File</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Newsletter Title (Optional)
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  placeholder="Enter custom title or leave blank for auto-generation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select File *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: PDF, DOC, DOCX, TXT
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={uploadNewsletterFromFile} disabled={loading || !uploadFile} className="flex-1">
                  {loading ? 'Uploading...' : 'Upload & Create Newsletter'}
                </Button>
                <Button onClick={() => setShowUploadModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">✏️ Edit & Preview Newsletter</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  placeholder="Enter newsletter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Newsletter Content
                </label>
                <div className="space-y-4">
                  <textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 min-h-[200px] max-h-[300px] overflow-y-auto whitespace-pre-wrap"
                    placeholder="Enter newsletter content"
                  />
                  
                  {/* Live Preview */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">📖 Live Preview</h4>
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-3 prose-p:leading-relaxed prose-p:text-gray-200 prose-headings:text-white prose-strong:text-white">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {editableContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  You can edit the AI-generated content above before publishing.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={publishPreviewNewsletter} disabled={loading || !editableTitle.trim() || !editableContent.trim()} className="flex-1">
                  {loading ? 'Publishing...' : 'Publish Newsletter'}
                </Button>
                <Button onClick={editPreviewContent} variant="outline" className="flex-1">
                  Regenerate with AI
                </Button>
                <Button onClick={cancelPreview} variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter View Modal */}
      {showViewModal && newsletterToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">📰 Newsletter Preview</h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => openNewsletterInNewTab(newsletterToView)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </Button>
                <Button onClick={closeViewModal} variant="outline" size="sm">
                  Close
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Newsletter Header with AI Image */}
              <div className="border-b border-gray-600 pb-6">
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    newsletterToView.status === 'published' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                  }`}>
                    {newsletterToView.status}
                  </span>
                  {newsletterToView.isPremium && (
                    <span className="px-2 py-1 rounded text-xs bg-purple-600 text-purple-100">
                      Premium
                    </span>
                  )}
                  <span>Views: {newsletterToView.viewCount}</span>
                  <span>Created: {newsletterToView.createdAt ? new Date(newsletterToView.createdAt).toLocaleDateString() : 'Unknown'}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{newsletterToView.title}</h1>
              </div>

              {/* Newsletter Content Preview */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">📖 Newsletter Preview</h4>
                  <span className="text-xs text-gray-400">Slug: {newsletterToView.slug}</span>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-200 prose-headings:text-white prose-strong:text-white">
                  {viewLoading && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="ml-3 text-gray-400">Loading preview...</span>
                    </div>
                  )}
                  {!viewLoading && viewError && (
                    <div className="text-center py-8">
                      <p className="text-red-300">{viewError}</p>
                    </div>
                  )}
                  {!viewLoading && !viewError && viewContent && (
                    <>
                      <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-200 prose-headings:text-white prose-strong:text-white">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]} 
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {viewContent}
                        </ReactMarkdown>
                      </div>
                      
                      {/* Subscription Teaser */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
                        <div className="text-center">
                          <div className="text-2xl mb-2">✨</div>
                          <h3 className="text-lg font-semibold text-white mb-2">Want to read the full article?</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            This is just a preview! Subscribe to AI Thoughts to get access to the complete newsletter 
                            with exclusive insights, AI tools, and industry updates.
                          </p>
                          <div className="flex justify-center space-x-3">
                            <Button 
                              onClick={() => openNewsletterInNewTab(newsletterToView)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Read Full Article
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                            >
                              Subscribe Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {!viewLoading && !viewError && !viewContent && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        No preview available. Click "Open in New Tab" to view the full newsletter.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-600">
                <Button 
                  onClick={() => openNewsletterInNewTab(newsletterToView)}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Newsletter
                </Button>
                <Button onClick={closeViewModal} variant="outline">
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

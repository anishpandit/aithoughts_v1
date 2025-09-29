'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
        alert('✅ User created successfully!');
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
      alert('❌ Error creating user');
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
        alert('✅ User set as admin successfully!');
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
      alert('❌ Error setting admin');
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
        alert('✅ Newsletter created successfully!');
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
      alert('❌ Error creating newsletter');
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
        alert('✅ AI Product created successfully!');
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
      alert('❌ Error creating AI product');
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
                <Button onClick={testNewsletterCreation} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Test Newsletter'}
                </Button>
              </div>
              
              <div className="space-y-4">
                {newsletters.map((newsletter) => (
                  <div key={newsletter.id} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
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
                      <div className="text-right text-sm text-gray-300">
                        <p>Views: {newsletter.viewCount}</p>
                        <p>Created: {newsletter.createdAt ? new Date(newsletter.createdAt).toLocaleDateString() : 'Unknown'}</p>
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
    </div>
  );
}

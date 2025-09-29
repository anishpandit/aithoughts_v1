import { requireAuth, isCurrentUserAdmin } from '@/lib/auth';
import Link from 'next/link';

export default async function TestAuthPage() {
  // This will redirect if user is not authenticated
  const userId = await requireAuth();
  
  // Check if user is admin
  const isAdmin = await isCurrentUserAdmin();
  
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Authentication Test</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Current User Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white">Authenticated: Yes</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white">User ID: {userId}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {isAdmin ? (
                <>
                  <span className="text-green-400">✅</span>
                  <span className="text-white">Admin Status: Yes</span>
                </>
              ) : (
                <>
                  <span className="text-red-400">❌</span>
                  <span className="text-white">Admin Status: No</span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Available Actions</h3>
            <div className="space-y-2">
              <Link 
                href="/admin" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Go to Admin Dashboard
              </Link>
              <br />
              <Link 
                href="/" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

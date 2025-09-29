'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function TestClerkPage() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [envData, setEnvData] = useState<any>(null);

  useEffect(() => {
    // Test environment variables
    fetch('/api/test-env')
      .then(res => res.json())
      .then(data => setEnvData(data))
      .catch(err => console.error('Error fetching env data:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Clerk Configuration Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Clerk Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Clerk Status</h2>
            <div className="space-y-2">
              <p><strong>Is Loaded:</strong> {isLoaded ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Is Signed In:</strong> {isSignedIn ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User ID:</strong> {userId || 'Not available'}</p>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            {envData ? (
              <div className="space-y-2">
                <p><strong>Clerk Publishable Key:</strong> {envData.clerkPublishableKey}</p>
                <p><strong>Clerk Secret Key:</strong> {envData.clerkSecretKey}</p>
                <p><strong>Database URL:</strong> {envData.databaseUrl}</p>
                <p><strong>Node Environment:</strong> {envData.nodeEnv}</p>
                <p><strong>Available Env Keys:</strong> {envData.allEnvKeys.join(', ')}</p>
              </div>
            ) : (
              <p>Loading environment data...</p>
            )}
          </div>

          {/* Clerk Components Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Clerk Components</h2>
            <div className="space-y-4">
              <p>If Clerk is working properly, you should see sign-in/sign-up buttons below:</p>
              <div className="border rounded p-4 bg-gray-50">
                <p className="text-sm text-gray-600">
                  The sign-in/sign-up buttons should appear in the header if Clerk is configured correctly.
                  If you see "Sign In" and "Sign Up" buttons in the header, Clerk is working!
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-2 text-sm">
              <p><strong>If Clerk keys are not set:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Check that .env file exists and has correct keys</li>
                <li>Restart the development server</li>
                <li>Verify keys are valid in Clerk dashboard</li>
              </ul>
              
              <p className="mt-4"><strong>If keys are set but not working:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Check for typos in environment variable names</li>
                <li>Ensure NEXT_PUBLIC_ prefix for client-side variables</li>
                <li>Clear browser cache and reload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

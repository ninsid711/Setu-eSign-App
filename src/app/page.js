'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    // Check if credentials are stored
    const savedCredentials = localStorage.getItem('setuCredentials');
    setHasCredentials(!!savedCredentials);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Setu eSign Utility
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Simple app for Setu document signing
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/settings">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-full sm:w-80 cursor-pointer border-2 border-transparent hover:border-blue-200">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {hasCredentials ? 'Update Settings' : 'Configure Settings'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {hasCredentials 
                    ? 'Modify your Setu API credentials' 
                    : 'Enter your Setu API credentials to get started'
                  }
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  hasCredentials 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {hasCredentials ? 'Configured' : 'Setup Required'}
                </div>
              </div>
            </div>
          </Link>

          <Link href="/upload">
            <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-full sm:w-80 cursor-pointer border-2 border-transparent hover:border-green-200 ${
              !hasCredentials ? 'opacity-50' : ''
            }`}>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Contract</h3>
                <p className="text-gray-600 mb-4">
                  Upload PDF documents and initiate signature requests
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  hasCredentials 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {hasCredentials ? 'Ready' : 'Requires Setup'}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {!hasCredentials && (
          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm">
                <strong>First time?</strong> Start by configuring your API credentials in Settings.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js • React • Tailwind CSS</p>
          <p className="mt-1">Frontend Stage 2 - Setu API Integration</p>
        </div>
      </div>
    </div>
  );
}

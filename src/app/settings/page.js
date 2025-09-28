'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    clientId: '',
    clientSecret: '',
    productInstanceId: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing credentials from localStorage
    const savedCredentials = localStorage.getItem('setuCredentials');
    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (!credentials.clientId || !credentials.clientSecret || !credentials.productInstanceId) {
      setMessage('Please fill in all fields');
      return;
    }

    // Save to localStorage
    localStorage.setItem('setuCredentials', JSON.stringify(credentials));
    setMessage('Credentials saved successfully!');
    
    // Redirect to upload page after a short delay
    setTimeout(() => {
      router.push('/upload');
    }, 1500);
  };

  const handleClear = () => {
    setCredentials({
      clientId: '',
      clientSecret: '',
      productInstanceId: ''
    });
    localStorage.removeItem('setuCredentials');
    setMessage('Credentials cleared');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Setu API Settings
          </h1>
          
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Storing secrets in browser localStorage has security risks. 
              Only use this for development/testing purposes.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                Client ID (x-client-id)
              </label>
              <input
                type="text"
                id="clientId"
                name="clientId"
                value={credentials.clientId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your client ID"
              />
            </div>

            <div>
              <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 mb-2">
                Client Secret (x-client-secret)
              </label>
              <input
                type="password"
                id="clientSecret"
                name="clientSecret"
                value={credentials.clientSecret}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your client secret"
              />
            </div>

            <div>
              <label htmlFor="productInstanceId" className="block text-sm font-medium text-gray-700 mb-2">
                Product Instance ID (x-product-instance-id)
              </label>
              <input
                type="text"
                id="productInstanceId"
                name="productInstanceId"
                value={credentials.productInstanceId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your product instance ID"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-md ${
                message.includes('successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Save Credentials
              </button>
              
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/upload')}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Go to Upload Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
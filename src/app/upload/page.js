'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getStoredCredentials, 
  uploadDocument, 
  initiateSignature, 
  getSignatureStatus, 
  validatePdfFile 
} from '../utils/setuApi';

export default function UploadPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [documentData, setDocumentData] = useState(null);
  const [signatureData, setSignatureData] = useState(null);

  useEffect(() => {
    // Load credentials from localStorage
    const savedCredentials = getStoredCredentials();
    if (savedCredentials) {
      setCredentials(savedCredentials);
    } else {
      setMessage('No credentials found. Please configure your API credentials first.');
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      const validation = validatePdfFile(selectedFile);
      
      if (!validation.isValid) {
        setMessage(validation.error);
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file || !credentials) {
      setMessage('Please select a PDF file and ensure credentials are configured.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Step 1: Upload document using Documents API
      setMessage('Uploading document...');
      const uploadResult = await uploadDocument(file, credentials);
      setDocumentData(uploadResult);
      
      // Step 2: Initiate signature request using Signature API
      setMessage('Initiating signature request...');
      const signatureResult = await initiateSignature(uploadResult.documentId, credentials);
      setSignatureData(signatureResult);
      
      setMessage('Document uploaded and signature request initiated successfully!');

    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openSignatureUrl = () => {
    if (signatureData && signatureData.signatureUrl) {
      // Open in new tab/iframe as recommended
      window.open(signatureData.signatureUrl, '_blank', 'width=800,height=600');
    }
  };

  const refreshStatus = async () => {
    if (!signatureData || !credentials) return;

    try {
      setMessage('Refreshing status...');
      const statusResult = await getSignatureStatus(signatureData.signatureId, credentials);
      setSignatureData(prev => ({ ...prev, ...statusResult }));
      setMessage('Status updated successfully!');
    } catch (error) {
      console.error('Status refresh error:', error);
      setMessage(`Error refreshing status: ${error.message}`);
    }
  };

  if (!credentials) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">No Credentials Found</h1>
          <p className="text-gray-600 mb-4">Please configure your API credentials first.</p>
          <button
            onClick={() => router.push('/settings')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Upload Contract</h1>
            <button
              onClick={() => router.push('/settings')}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Settings
            </button>
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF files only, up to 10MB</p>
              </div>
            </div>
          </div>

          {file && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                Selected file: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          {message && (
            <div className={`mb-4 p-3 rounded-md ${
              message.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : message.includes('Error') || message.includes('failed')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message}
            </div>
          )}

          {/* Upload Button */}
          <div className="mb-6">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Upload and Initiate Signature'}
            </button>
          </div>

          {/* Document Data Display */}
          {documentData && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Document Upload Result</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Document ID:</strong> {documentData.documentId}</p>
                {documentData.status && <p><strong>Status:</strong> {documentData.status}</p>}
                {documentData.url && <p><strong>Document URL:</strong> Available</p>}
              </div>
            </div>
          )}

          {/* Signature Data Display */}
          {signatureData && (
            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-purple-900">Signature Request</h3>
                <button
                  onClick={refreshStatus}
                  className="text-purple-600 hover:text-purple-800 text-sm underline"
                >
                  Refresh Status
                </button>
              </div>
              <div className="text-sm text-purple-800 space-y-1 mb-3">
                <p><strong>Signature ID:</strong> {signatureData.signatureId}</p>
                {signatureData.signatureUrl && <p><strong>Signature URL:</strong> Available</p>}
                {signatureData.status && <p><strong>Status:</strong> {signatureData.status}</p>}
              </div>
              
              {signatureData.signatureUrl && (
                <button
                  onClick={openSignatureUrl}
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
                >
                  Open Signature Page
                </button>
              )}
            </div>
          )}

          {/* API Information */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">API Integration Info</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Document upload via Setu Documents API</p>
              <p>• Signature initiation via Setu Signature API</p>
              <p>• All calls made directly from browser (no backend)</p>
              <p>• Credentials stored in localStorage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
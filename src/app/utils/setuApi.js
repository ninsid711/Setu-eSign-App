/**
 * Setu API utility functions
 * Handles API calls to Setu services with proper authentication
 */

const SETU_BASE_URL = 'https://dg-sandbox.setu.co/api';

/**
 * Get credentials from localStorage
 * @returns {Object|null} - Credentials object or null if not found
 */
export function getStoredCredentials() {
  if (typeof window === 'undefined') return null;
  
  try {
    const credentials = localStorage.getItem('setuCredentials');
    return credentials ? JSON.parse(credentials) : null;
  } catch (error) {
    console.error('Error reading credentials from localStorage:', error);
    return null;
  }
}

/**
 * Store credentials in localStorage
 * @param {Object} credentials - The credentials to store
 */
export function storeCredentials(credentials) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('setuCredentials', JSON.stringify(credentials));
  } catch (error) {
    console.error('Error storing credentials:', error);
    throw new Error('Failed to store credentials');
  }
}

/**
 * Create headers for Setu API requests
 * @param {Object} credentials - API credentials
 * @param {boolean} isFormData - Whether the request body is FormData
 * @returns {Object} - Headers object
 */
function createHeaders(credentials, isFormData = false) {
  const headers = {
    'x-client-id': credentials.clientId,
    'x-client-secret': credentials.clientSecret,
    'x-product-instance-id': credentials.productInstanceId,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

/**
 * Upload document to Setu Documents API
 * @param {File} file - PDF file to upload
 * @param {Object} credentials - API credentials
 * @returns {Promise<Object>} - Upload response
 */
export async function uploadDocument(file, credentials) {
  if (!file || !credentials) {
    throw new Error('File and credentials are required');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${SETU_BASE_URL}/documents`, {
    method: 'POST',
    headers: createHeaders(credentials, true),
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Document upload failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Initiate signature request via Setu Signature API
 * @param {string} documentId - Document ID from upload response
 * @param {Object} credentials - API credentials
 * @param {Object} options - Additional signature options
 * @returns {Promise<Object>} - Signature response
 */
export async function initiateSignature(documentId, credentials, options = {}) {
  if (!documentId || !credentials) {
    throw new Error('Document ID and credentials are required');
  }

  const requestBody = {
    documentId,
    ...options,
  };

  const response = await fetch(`${SETU_BASE_URL}/signature`, {
    method: 'POST',
    headers: createHeaders(credentials),
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Signature initiation failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get signature status
 * @param {string} signatureId - Signature ID
 * @param {Object} credentials - API credentials
 * @returns {Promise<Object>} - Status response
 */
export async function getSignatureStatus(signatureId, credentials) {
  if (!signatureId || !credentials) {
    throw new Error('Signature ID and credentials are required');
  }

  const response = await fetch(`${SETU_BASE_URL}/signature/${signatureId}/status`, {
    method: 'GET',
    headers: createHeaders(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Status fetch failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Validate PDF file
 * @param {File} file - File to validate
 * @returns {Object} - Validation result
 */
export function validatePdfFile(file) {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPE = 'application/pdf';

  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.type !== ALLOWED_TYPE) {
    return { isValid: false, error: 'Please select a PDF file only' };
  }

  if (file.size > MAX_SIZE) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }

  return { isValid: true };
}
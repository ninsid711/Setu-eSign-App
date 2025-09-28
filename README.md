# Setu Frontend Integration

A frontend-only React/Next.js application that integrates with Setu APIs for document upload and electronic signature workflows.

## 🎯 Features

### ✅ Stage 2 Requirements Implemented
- **No Backend Required**: All API calls are made directly from the browser
- **Credentials Management**: Secure storage in localStorage with clear warnings about security risks
- **Settings Page**: Configuration interface for Setu API credentials (x-client-id, x-client-secret, x-product-instance-id)
- **Upload Contract Page**: PDF file upload with validation and Setu API integration
- **Document Processing**: Automatic workflow from upload to signature initiation
- **Status Tracking**: Real-time status updates for signature requests

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Setu API credentials (Client ID, Client Secret, Product Instance ID)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd setu-frontend
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage Guide

### 1. Configure API Credentials
- Visit the **Settings** page (`/settings`)
- Enter your Setu API credentials:
  - Client ID (`x-client-id`)
  - Client Secret (`x-client-secret`) 
  - Product Instance ID (`x-product-instance-id`)
- Click "Save Credentials"

⚠️ **Security Note**: Credentials are stored in browser localStorage for development/testing purposes only.

### 2. Upload and Sign Documents
- Navigate to **Upload** page (`/upload`)
- Select a PDF file (up to 10MB)
- Click "Upload and Initiate Signature"
- The app will:
  1. Upload document via Setu Documents API
  2. Initiate signature request via Setu Signature API
  3. Display document and signature metadata
  4. Provide signature URL for completion

### 3. Signature Process
- Click "Open Signature Page" to launch signing interface
- Complete signature in new tab/iframe
- Use "Refresh Status" to check completion status

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Native fetch with custom utility functions

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   └── Navigation.js       # App navigation
│   ├── settings/
│   │   └── page.js             # API credentials configuration
│   ├── upload/
│   │   └── page.js             # Document upload & signature
│   ├── utils/
│   │   └── setuApi.js          # Setu API utilities
│   ├── globals.css             # Global styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Homepage
```

### API Integration
- **Base URL**: `https://dg-sandbox.setu.co/api`
- **Documents API**: Upload PDF files
- **Signature API**: Initiate signature requests
- **Status API**: Track signature completion

## 🔧 Configuration

### Environment Variables
No environment variables required - all configuration is handled via the Settings UI.

### API Endpoints Used
- `POST /documents` - Document upload
- `POST /signature` - Signature initiation  
- `GET /signature/{id}/status` - Status checking

## 🛡️ Security Considerations

⚠️ **Important**: This implementation stores API credentials in localStorage for demonstration purposes only. In production:

- Use secure server-side credential storage
- Implement proper authentication flows
- Use environment variables for sensitive data
- Consider implementing proxy endpoints to hide credentials

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop browsers
- Tablet devices
- Mobile phones

## 🧪 Testing

### Manual Testing Steps
1. Configure API credentials in Settings
2. Upload a test PDF document
3. Verify document upload response
4. Check signature initiation
5. Test signature URL opening
6. Verify status refresh functionality

## 🐛 Troubleshooting

### Common Issues

**"No credentials found" error**
- Ensure credentials are saved in Settings page
- Check browser localStorage isn't being cleared

**File upload fails**
- Verify PDF file is under 10MB
- Check API credentials are correct
- Ensure CORS is properly configured in Setu dashboard

**Signature URL doesn't open**
- Check popup blockers in browser
- Verify signature API response contains valid URL

## 📄 API Documentation

Refer to Setu's official documentation for detailed API specifications:
- Documents API endpoints and parameters
- Signature API workflow requirements
- Error codes and troubleshooting

## 🤝 Contributing

This is a demonstration project implementing Setu's Stage 2 requirements. For production use, additional security and error handling should be implemented.

---

**Built with ❤️ using Next.js and Setu APIs**

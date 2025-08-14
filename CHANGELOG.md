# Frontend Changelog

## Version 1.0.0 - Backend Integration Update

### 🚀 Major Changes

#### Backend Integration
- **Replaced mock API with real backend integration**
- **Updated API endpoints to match backend structure**
  - `POST /scrape` - Single and bulk CNPJ search
  - `POST /upload-cnpjs` - File upload for batch processing
- **Added file upload functionality** for .txt and .csv files

#### Data Structure Updates
- **Updated CompanyData interface** to match backend response:
  - `NOME API DE PUXADA` - Company name from API
  - `CNPJ` - Company registration number
  - `NATUREZA` - Legal nature
  - `SITUACAO` - Company status
  - `PORTE` - Company size
  - `MEI` - Micro-entrepreneur status
  - `TEL` - Phone number
  - `EMAIL` - Email address

#### UI/UX Improvements
- **Added file upload tab** with drag-and-drop support
- **Enhanced error handling** with toast notifications
- **Improved validation** with better user feedback
- **Updated company card** to display new data structure
- **Enhanced download options** with better formatting

### 🔧 Technical Improvements

#### Code Organization
- **Created environment configuration** (`src/config/environment.ts`)
- **Centralized API utilities** (`src/utils/api.ts`)
- **Added helper functions** for CNPJ validation and formatting
- **Removed mock API** (`src/utils/mockApi.ts`)

#### Configuration Management
- **Environment-based configuration** for API URLs
- **Centralized validation rules** and constants
- **Configurable bulk search limits**

#### Error Handling
- **Comprehensive error handling** for API calls
- **User-friendly error messages** via toast notifications
- **Network error detection** and recovery

### 📁 New Files Added
- `src/config/environment.ts` - Environment configuration
- `src/utils/api.ts` - Real API integration
- `src/utils/test-api.ts` - API testing utilities
- `scripts/setup.sh` - Linux/macOS setup script
- `scripts/setup.ps1` - Windows PowerShell setup script
- `CHANGELOG.md` - This changelog

### 🗑️ Files Removed
- `src/utils/mockApi.ts` - Mock API (replaced with real API)

### 🔄 Files Modified
- `src/types/company.ts` - Updated data structure
- `src/components/ui/company-card.tsx` - Updated display fields
- `src/components/search-form.tsx` - Added file upload, improved validation
- `src/components/download-options.tsx` - Enhanced download functionality
- `src/pages/Index.tsx` - Updated to use real API
- `README.md` - Updated documentation

### 🛠️ Development Tools
- **Setup scripts** for easy project initialization
- **Environment configuration** for different deployment scenarios
- **API testing utilities** for development and debugging

### 🚦 Backend Requirements
- **Backend server** must be running on `http://localhost:5555`
- **CORS enabled** for cross-origin requests
- **File upload support** for .txt and .csv files

### 📋 Usage Instructions

#### Single Search
1. Enter a 14-digit CNPJ number
2. Click "Search Company"
3. View detailed company information

#### Bulk Search
1. Enter up to 6 CNPJs (one per line)
2. Click "Search & Download"
3. Choose download format (JSON or CSV)

#### File Upload
1. Upload a .txt or .csv file containing CNPJs
2. Click "Upload & Process"
3. Results will be automatically downloaded as CSV

### 🔧 Setup Instructions

#### Quick Setup (Windows)
```powershell
cd frontend
.\scripts\setup.ps1
```

#### Quick Setup (Linux/macOS)
```bash
cd frontend
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Manual Setup
```bash
cd frontend
npm install
npm run build
npm run dev
```

### 🎯 Next Steps
- [ ] Add unit tests for API functions
- [ ] Implement error retry mechanisms
- [ ] Add loading states for better UX
- [ ] Implement caching for frequently searched CNPJs
- [ ] Add export format customization options 
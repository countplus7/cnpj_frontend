# CNPJ Search Frontend

A modern React application for searching Brazilian company information using CNPJ numbers. This frontend connects to a Node.js backend that scrapes data from multiple Brazilian government APIs.

## Features

- **Single CNPJ Search**: Search for individual companies by CNPJ number
- **Bulk Search**: Search multiple CNPJs at once (up to 6)
- **File Upload**: Upload .txt or .csv files containing CNPJ numbers for batch processing
- **Multiple Export Formats**: Download results as JSON or CSV
- **Real-time Data**: Connects to live Brazilian government APIs
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Backend Integration

This frontend connects to a Node.js backend that:
- Queries multiple Brazilian government APIs (Brasil API, Receita WS, CNPJ A)
- Uses Puppeteer for web scraping when API data is incomplete
- Processes CNPJs in parallel for better performance
- Returns comprehensive company information

## API Endpoints Used

- `POST /scrape` - Search single or multiple CNPJs
- `POST /upload-cnpjs` - Upload file with CNPJs for batch processing

## Data Structure

The backend returns company data with the following fields:
- `NOME API DE PUXADA` - Company name from API
- `CNPJ` - Company registration number
- `NATUREZA` - Legal nature
- `SITUACAO` - Company status
- `PORTE` - Company size
- `MEI` - Micro-entrepreneur status
- `TEL` - Phone number
- `EMAIL` - Email address

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Make sure the backend is running**:
   The frontend expects the backend to be running on `http://localhost:5555`

## Usage

### Single Search
1. Enter a 14-digit CNPJ number
2. Click "Search Company"
3. View detailed company information

### Bulk Search
1. Enter up to 6 CNPJs (one per line)
2. Click "Search & Download"
3. Choose download format (JSON or CSV)

### File Upload
1. Upload a .txt or .csv file containing CNPJs
2. Click "Upload & Process"
3. Results will be automatically downloaded as CSV

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Lucide React** for icons

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## Backend Requirements

Make sure the backend server is running and accessible at `http://localhost:5555` before using the frontend.

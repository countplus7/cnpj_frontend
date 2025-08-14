// Test file to verify API functionality
import { searchCompanyByCnpj, searchCompaniesBulk } from './api';

// Test single CNPJ search
export const testSingleSearch = async () => {
  console.log('Testing single CNPJ search...');
  try {
    const result = await searchCompanyByCnpj('13037746000111');
    console.log('Single search result:', result);
    return result;
  } catch (error) {
    console.error('Single search error:', error);
    return null;
  }
};

// Test bulk CNPJ search
export const testBulkSearch = async () => {
  console.log('Testing bulk CNPJ search...');
  try {
    const cnpjs = ['13037746000111', '11222333000181'];
    const results = await searchCompaniesBulk(cnpjs);
    console.log('Bulk search results:', results);
    return results;
  } catch (error) {
    console.error('Bulk search error:', error);
    return null;
  }
};

// Test API connectivity
export const testApiConnectivity = async () => {
  console.log('Testing API connectivity...');
  try {
    const response = await fetch('http://localhost:5555/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cnpjs: ['13037746000111'] }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('API connectivity test successful:', data);
      return true;
    } else {
      console.error('API connectivity test failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('API connectivity test error:', error);
    return false;
  }
}; 
import { CompanyData, SearchResult, BulkSearchResult } from "@/types/company";
import { config, getApiUrl } from "@/config/environment";

export const searchCompanyByCnpj = async (cnpj: string): Promise<SearchResult> => {
  try {
    const response = await fetch(getApiUrl('/scrape'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpjs: [cnpj] }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to search company",
      };
    }

    const data: CompanyData[] = await response.json();
    
    if (data && data.length > 0) {
      return {
        success: true,
        data: data[0],
      };
    } else {
      return {
        success: false,
        error: "Company not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Network error occurred",
    };
  }
};

export const searchCompaniesBulk = async (cnpjs: string[]): Promise<CompanyData[]> => {
  try {
    const response = await fetch(getApiUrl('/scrape'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpjs }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to perform bulk search");
    }

    const data: CompanyData[] = await response.json();
    return data || [];
  } catch (error) {
    throw new Error("Network error occurred");
  }
};

export const uploadCnpjsFile = async (file: File): Promise<Blob> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(getApiUrl('/upload-cnpjs'), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to upload file");
  }

  return await response.blob();
};

export const downloadCompaniesAsJson = (companies: CompanyData[], filename: string = 'companies.json') => {
  const jsonData = JSON.stringify(companies, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCompaniesAsCsv = (companies: CompanyData[], filename: string = 'companies.csv') => {
  const headers = [
    'NOME API DE PUXADA',
    'CNPJ',
    'NATUREZA',
    'SITUACAO',
    'PORTE',
    'MEI',
    'TEL',
    'EMAIL'
  ];
  
  const rows = companies.map(company => [
    company["NOME API DE PUXADA"],
    company.CNPJ,
    company.NATUREZA,
    company.SITUACAO,
    company.PORTE,
    company.MEI,
    company.TEL,
    company.EMAIL
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

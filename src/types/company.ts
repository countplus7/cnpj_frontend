export interface CompanyData {
  "NOME API DE PUXADA": string;
  CNPJ: string;
  NATUREZA: string;
  SITUACAO: string;
  PORTE: string;
  MEI: string;
  TEL: string;
  EMAIL: string;
}

export interface SearchResult {
  success: boolean;
  data?: CompanyData;
  error?: string;
}

export interface BulkSearchResult {
  success: boolean;
  data?: CompanyData[];
  error?: string;
}
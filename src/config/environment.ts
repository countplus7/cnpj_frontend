// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5555",
    timeout: 30000, // 30 seconds
  },

  // Application Configuration
  app: {
    name: "CNPJ Search",
    version: "1.0.0",
    maxBulkSearch: 10, // Maximum number of CNPJs for bulk search
  },

  // Validation Configuration
  validation: {
    cnpjLength: 14,
    cnpjPattern: /^\d{14}$/,
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};

// Helper function to validate CNPJ format
export const validateCnpj = (cnpj: string): boolean => {
  const cleanCnpj = cnpj.replace(/\D/g, "");
  return config.validation.cnpjPattern.test(cleanCnpj);
};

// Helper function to format CNPJ for display
export const formatCnpj = (cnpj: string): string => {
  const cleanCnpj = cnpj.replace(/\D/g, "");
  if (cleanCnpj.length !== 14) return cnpj;

  return cleanCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { CompanyCard } from "@/components/ui/company-card";
import { DownloadOptions } from "@/components/download-options";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CompanyData, SearchResult } from "@/types/company";
import { searchCompanyByCnpj, searchCompaniesBulk } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<CompanyData | null>(null);
  const [bulkResults, setBulkResults] = useState<CompanyData[]>([]);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const handleSingleSearch = async (cnpj: string) => {
    setIsLoading(true);
    setError("");
    setSearchResult(null);
    setBulkResults([]);

    try {
      const result: SearchResult = await searchCompanyByCnpj(cnpj);

      if (result.success && result.data) {
        setSearchResult(result.data);
        toast({
          title: "Company found!",
          description: `Successfully found data for ${result.data["NOME API DE PUXADA"]}`,
        });
      } else {
        setError(result.error || "Company not found");
        toast({
          title: "No results",
          description: "No company found for the provided CNPJ",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMsg = "Failed to search company";
      setError(errorMsg);
      toast({
        title: "Search failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkSearch = async (cnpjs: string[]) => {
    setIsLoading(true);
    setError("");
    setSearchResult(null);
    setBulkResults([]);

    try {
      const results = await searchCompaniesBulk(cnpjs);

      if (results.length > 0) {
        setBulkResults(results);
        setShowDownloadOptions(true);
        toast({
          title: "Bulk search completed!",
          description: `Found ${results.length} companies out of ${cnpjs.length} searched`,
        });
      } else {
        setError("No companies found for the provided CNPJs");
        toast({
          title: "No results",
          description: "No companies found for any of the provided CNPJs",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMsg = "Failed to perform bulk search";
      setError(errorMsg);
      toast({
        title: "Bulk search failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto space-y-8">
        <SearchForm onSingleSearch={handleSingleSearch} onBulkSearch={handleBulkSearch} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searchResult && <CompanyCard company={searchResult} />}

        {showDownloadOptions && bulkResults.length > 0 && (
          <DownloadOptions companies={bulkResults} onClose={() => setShowDownloadOptions(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;

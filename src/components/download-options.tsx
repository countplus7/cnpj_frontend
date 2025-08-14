import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyData } from "@/types/company";
import { downloadCompaniesAsJson, downloadCompaniesAsCsv } from "@/utils/api";
import { Download, FileText, FileSpreadsheet, X } from "lucide-react";

interface DownloadOptionsProps {
  companies: CompanyData[];
  onClose: () => void;
}

export function DownloadOptions({ companies, onClose }: DownloadOptionsProps) {
  const handleDownloadJson = () => {
    const filename = `companies_${Date.now()}.json`;
    downloadCompaniesAsJson(companies, filename);
  };

  const handleDownloadCsv = () => {
    const filename = `companies_${Date.now()}.csv`;
    downloadCompaniesAsCsv(companies, filename);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Download Results
            </CardTitle>
            <CardDescription>
              Download {companies.length} company records in your preferred format
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={handleDownloadJson} className="h-auto p-4 flex flex-col items-center gap-2">
            <FileText className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Download as JSON</div>
              <div className="text-xs text-muted-foreground">Structured data format</div>
            </div>
          </Button>
          
          <Button onClick={handleDownloadCsv} className="h-auto p-4 flex flex-col items-center gap-2">
            <FileSpreadsheet className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Download as CSV</div>
              <div className="text-xs text-muted-foreground">Spreadsheet format</div>
            </div>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground text-center">
          Files will be downloaded with timestamp in the filename
        </div>
      </CardContent>
    </Card>
  );
}
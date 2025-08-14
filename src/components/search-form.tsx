import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search, Download, Building2, Upload, FileText } from "lucide-react";
import { uploadCnpjsFile } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { config, validateCnpj, formatCnpj } from "@/config/environment";

interface SearchFormProps {
  onSingleSearch: (cnpj: string) => Promise<void>;
  onBulkSearch: (cnpjs: string[]) => Promise<void>;
  isLoading: boolean;
}

export function SearchForm({ onSingleSearch, onBulkSearch, isLoading }: SearchFormProps) {
  const [singleCnpj, setSingleCnpj] = useState("");
  const [bulkCnpjs, setBulkCnpjs] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCnpj = singleCnpj.replace(/\D/g, "");

    if (!validateCnpj(cleanCnpj)) {
      toast({
        title: "Invalid CNPJ",
        description: "Please enter a valid CNPJ with 14 digits",
        variant: "destructive",
      });
      return;
    }

    await onSingleSearch(cleanCnpj);
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cnpjList = bulkCnpjs
      .split("\n")
      .map((line) => line.trim().replace(/\D/g, ""))
      .filter((cnpj) => cnpj.length > 0);

    if (cnpjList.length === 0) {
      toast({
        title: "No CNPJs provided",
        description: "Please enter at least one CNPJ",
        variant: "destructive",
      });
      return;
    }

    if (cnpjList.length > config.app.maxBulkSearch) {
      toast({
        title: "Too many CNPJs",
        description: `Maximum ${config.app.maxBulkSearch} CNPJs allowed`,
        variant: "destructive",
      });
      return;
    }

    const invalidCnpjs = cnpjList.filter((cnpj) => !validateCnpj(cnpj));
    if (invalidCnpjs.length > 0) {
      toast({
        title: "Invalid CNPJs",
        description: `Invalid CNPJs found: ${invalidCnpjs.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    await onBulkSearch(cnpjList);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const blob = await uploadCnpjsFile(uploadedFile);

      // Create download link for the CSV file
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `results_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "File processed successfully!",
        description: "Results have been downloaded as CSV",
      });

      setUploadedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to process file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = [".txt", ".csv"];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));

      if (!validExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a .txt or .csv file",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  const handleSingleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= config.validation.cnpjLength) {
      setSingleCnpj(formatCnpj(value));
    }
  };

  const cnpjList = ["00000000000000", "11111111111111", "22222222222222"];
  const placeholder = cnpjList.join("\n");

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-primary" />
          {config.app.name}
        </CardTitle>
        <CardDescription>Search for company information using CNPJ numbers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Search</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Search</TabsTrigger>
            {/* <TabsTrigger value="upload">File Upload</TabsTrigger> */}
          </TabsList>

          <TabsContent value="single" className="mt-6">
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="single-cnpj">CNPJ</Label>
                <Input
                  id="single-cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={singleCnpj}
                  onChange={handleSingleCnpjChange}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">Enter a 14-digit CNPJ number</p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !singleCnpj}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? "Searching..." : "Search Company"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="bulk" className="mt-6">
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-cnpjs">CNPJs (one per line)</Label>
                <Textarea
                  id="bulk-cnpjs"
                  placeholder={placeholder}
                  value={bulkCnpjs}
                  onChange={(e) => setBulkCnpjs(e.target.value)}
                  className="min-h-32 font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter up to {config.app.maxBulkSearch} CNPJs, one per line (14 digits each)
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !bulkCnpjs.trim()}>
                <Download className="mr-2 h-4 w-4" />
                {isLoading ? "Processing..." : "Search & Download"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File (.txt or .csv)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {uploadedFile.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a text file with CNPJs (one per line) or CSV file with CNPJ column
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isUploading || !uploadedFile}>
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Processing..." : "Upload & Process"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

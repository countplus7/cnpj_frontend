import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "@/types/company";
import { Building2, Phone, Mail, Calendar, Users } from "lucide-react";

interface CompanyCardProps {
  company: CompanyData;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getStatusColor = (status: string) => {
    return status.toLowerCase().includes("ativa") ? "default" : "destructive";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {company["NOME API DE PUXADA"] || "Company Name Not Available"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              CNPJ: {company.CNPJ}
            </p>
          </div>
          <Badge variant={getStatusColor(company.SITUACAO)}>
            {company.SITUACAO || "Status Unknown"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Legal Nature</p>
              <p>{company.NATUREZA || "Not specified"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company Size</p>
                <p>{company.PORTE || "Not specified"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">MEI</p>
              <Badge variant={company.MEI === "Sim" ? "secondary" : "outline"}>
                {company.MEI || "Não"}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            {company.TEL && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{company.TEL}</p>
                </div>
              </div>
            )}
            {company.EMAIL && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="break-all">{company.EMAIL}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
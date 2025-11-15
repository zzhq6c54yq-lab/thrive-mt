import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ClipboardList, FileCheck, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { useDownloadClientDocument, ClientDocument } from "@/hooks/useClientDocuments";

interface ClientDocumentCardProps {
  document: ClientDocument;
}

export function ClientDocumentCard({ document }: ClientDocumentCardProps) {
  const downloadDocument = useDownloadClientDocument();

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "session_note":
        return <FileText className="h-5 w-5" />;
      case "treatment_plan":
        return <ClipboardList className="h-5 w-5" />;
      case "assessment":
        return <FileCheck className="h-5 w-5" />;
      case "resource":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      session_note: "Session Note",
      treatment_plan: "Treatment Plan",
      assessment: "Assessment",
      resource: "Resource",
    };
    return labels[type] || type;
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      session_note: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      treatment_plan: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      assessment: "bg-green-500/10 text-green-500 border-green-500/20",
      resource: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {getDocumentIcon(document.document_type)}
            <CardTitle className="text-base">{document.title}</CardTitle>
          </div>
        </div>
        <Badge variant="outline" className={getDocumentTypeColor(document.document_type)}>
          {getDocumentTypeLabel(document.document_type)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {document.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {document.description}
          </p>
        )}
        
        <div className="space-y-1 text-xs text-muted-foreground">
          {document.session_date && (
            <p>Session: {format(new Date(document.session_date), "MMM d, yyyy")}</p>
          )}
          <p>File: {document.file_name}</p>
          <p>Size: {formatFileSize(document.file_size)}</p>
          <p>Shared: {format(new Date(document.created_at), "MMM d, yyyy")}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => downloadDocument.mutate(document)}
          disabled={downloadDocument.isPending}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}

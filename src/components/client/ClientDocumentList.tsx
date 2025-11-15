import { ClientDocumentCard } from "./ClientDocumentCard";
import { useClientDocuments } from "@/hooks/useClientDocuments";
import { Loader2 } from "lucide-react";

interface ClientDocumentListProps {
  clientId: string;
  documentType: string | null;
}

export function ClientDocumentList({ clientId, documentType }: ClientDocumentListProps) {
  const { data: documents, isLoading } = useClientDocuments(clientId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Filter documents: only show shared documents
  const sharedDocuments = documents?.filter(
    (doc) => 
      doc.shared_with_client && 
      (documentType === null || doc.document_type === documentType)
  ) || [];

  if (sharedDocuments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {documentType 
            ? `No ${documentType.replace('_', ' ')}s have been shared with you yet.`
            : "No documents have been shared with you yet."}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Your therapist will share relevant documents after your sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sharedDocuments.map((document) => (
        <ClientDocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
}

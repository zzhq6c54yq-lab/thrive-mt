import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Upload, Download, Trash2, Calendar, FileIcon, Share2 } from "lucide-react";
import {
  useClientDocuments,
  useUploadClientDocument,
  useDeleteClientDocument,
  useDownloadClientDocument,
  useUpdateDocumentSharing,
} from "@/hooks/useClientDocuments";
import { format } from "date-fns";

interface DocumentsTabProps {
  therapistId: string;
  clients: Array<{
    id: string;
    name: string;
  }>;
}

export function DocumentsTab({ therapistId, clients }: DocumentsTabProps) {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    clientId: "",
    file: null as File | null,
    documentType: "session_note",
    title: "",
    description: "",
    sessionDate: "",
  });

  const { data: documents, isLoading } = useClientDocuments(selectedClient || undefined);
  const uploadMutation = useUploadClientDocument();
  const deleteMutation = useDeleteClientDocument();
  const downloadMutation = useDownloadClientDocument();
  const updateSharing = useUpdateDocumentSharing();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.clientId || !uploadForm.title) {
      return;
    }

    await uploadMutation.mutateAsync({
      file: uploadForm.file,
      therapistId,
      clientId: uploadForm.clientId,
      documentType: uploadForm.documentType,
      title: uploadForm.title,
      description: uploadForm.description,
      sessionDate: uploadForm.sessionDate,
      sharedWithClient: false,
    });

    setUploadForm({
      clientId: "",
      file: null,
      documentType: "session_note",
      title: "",
      description: "",
      sessionDate: "",
    });
    setUploadDialogOpen(false);
  };

  const handleToggleSharing = (documentId: string, currentSharing: boolean) => {
    updateSharing.mutate({
      documentId,
      sharedWithClient: !currentSharing,
    });
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      session_note: "Session Note",
      treatment_plan: "Treatment Plan",
      assessment: "Assessment",
      other: "Other",
    };
    return labels[type] || type;
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      session_note: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      treatment_plan: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      assessment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };
    return colors[type] || colors.other;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Header with filters and upload button */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Label htmlFor="client-filter">Filter by Client</Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger id="client-filter">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Client Document</DialogTitle>
              <DialogDescription>
                Upload session notes, treatment plans, or other documents for your clients.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="upload-client">Client *</Label>
                <Select
                  value={uploadForm.clientId}
                  onValueChange={(value) =>
                    setUploadForm({ ...uploadForm, clientId: value })
                  }
                >
                  <SelectTrigger id="upload-client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="document-type">Document Type *</Label>
                <Select
                  value={uploadForm.documentType}
                  onValueChange={(value) =>
                    setUploadForm({ ...uploadForm, documentType: value })
                  }
                >
                  <SelectTrigger id="document-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="session_note">Session Note</SelectItem>
                    <SelectItem value="treatment_plan">Treatment Plan</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, title: e.target.value })
                  }
                  placeholder="e.g., Initial Assessment, Week 4 Session Notes"
                />
              </div>

              <div>
                <Label htmlFor="session-date">Session Date (Optional)</Label>
                <Input
                  id="session-date"
                  type="date"
                  value={uploadForm.sessionDate}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, sessionDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, description: e.target.value })
                  }
                  placeholder="Additional notes about this document"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="file">File *</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Supported: PDF, DOC, DOCX, TXT, JPG, PNG (Max 20MB)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={
                  !uploadForm.file ||
                  !uploadForm.clientId ||
                  !uploadForm.title ||
                  uploadMutation.isPending
                }
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents list */}
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading documents...</div>
      ) : !documents || documents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No documents yet</CardTitle>
            <CardDescription className="mb-4">
              Upload your first client document to get started
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => {
            const client = clients.find((c) => c.id === doc.client_id);
            return (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      <CardDescription>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(
                              doc.document_type
                            )}`}
                          >
                            {getDocumentTypeLabel(doc.document_type)}
                          </span>
                          <span>•</span>
                          <span>{client?.name || "Unknown Client"}</span>
                          {doc.session_date && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(doc.session_date), "MMM d, yyyy")}
                              </span>
                            </>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadMutation.mutate(doc)}
                        disabled={downloadMutation.isPending}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(doc)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-3">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {(doc as any).shared_with_client ? "Shared with client" : "Private"}
                      </span>
                    </div>
                    <Switch
                      checked={(doc as any).shared_with_client || false}
                      onCheckedChange={() => handleToggleSharing(doc.id, (doc as any).shared_with_client || false)}
                      disabled={updateSharing.isPending}
                    />
                  </div>
                  {doc.description && (
                    <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{doc.file_name}</span>
                    <span>•</span>
                    <span>{formatFileSize(doc.file_size)}</span>
                    <span>•</span>
                    <span>Uploaded {format(new Date(doc.created_at), "MMM d, yyyy")}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

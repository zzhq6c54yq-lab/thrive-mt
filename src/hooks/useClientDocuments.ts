import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClientDocument {
  id: string;
  therapist_id: string;
  client_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  document_type: string;
  title: string;
  description: string | null;
  session_date: string | null;
  created_at: string;
  updated_at: string;
  shared_with_client: boolean;
}

export function useClientDocuments(clientId?: string) {
  return useQuery({
    queryKey: ["client-documents", clientId],
    queryFn: async () => {
      let query = supabase
        .from("client_documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (clientId) {
        query = query.eq("client_id", clientId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as ClientDocument[];
    },
  });
}

export function useUploadClientDocument() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      therapistId,
      clientId,
      documentType,
      title,
      description,
      sessionDate,
      sharedWithClient = false,
    }: {
      file: File;
      therapistId: string;
      clientId: string;
      documentType: string;
      title: string;
      description?: string;
      sessionDate?: string;
      sharedWithClient?: boolean;
    }) => {
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${therapistId}/${clientId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("client-documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { data, error: dbError } = await supabase
        .from("client_documents")
        .insert({
          therapist_id: therapistId,
          client_id: clientId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          document_type: documentType,
          title,
          description,
          session_date: sessionDate,
          shared_with_client: sharedWithClient,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-documents"] });
      toast({
        title: "Document uploaded",
        description: "The document has been uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateDocumentSharing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (params: { documentId: string; sharedWithClient: boolean }) => {
      const { data, error } = await supabase
        .from("client_documents")
        .update({ shared_with_client: params.sharedWithClient })
        .eq("id", params.documentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-documents"] });
      toast({
        title: "Success",
        description: "Document sharing updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update sharing",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteClientDocument() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: ClientDocument) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("client-documents")
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("client_documents")
        .delete()
        .eq("id", document.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-documents"] });
      toast({
        title: "Document deleted",
        description: "The document has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDownloadClientDocument() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (doc: ClientDocument) => {
      const { data, error } = await supabase.storage
        .from("client-documents")
        .download(doc.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = doc.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    onError: (error) => {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

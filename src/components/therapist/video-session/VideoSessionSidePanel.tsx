import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Upload, X, FileText, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CrisisResourcesPanel from "./CrisisResourcesPanel";

interface Message {
  id: string;
  sender_type: 'therapist' | 'client';
  message: string;
  created_at: string;
}

interface FileItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number;
  created_at: string;
}

interface VideoSessionSidePanelProps {
  sessionId: string;
  therapistId: string;
  clientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoSessionSidePanel({
  sessionId,
  therapistId,
  clientId,
  isOpen,
  onClose
}: VideoSessionSidePanelProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Load chat messages
  useEffect(() => {
    if (!sessionId) return;

    const loadChatMessages = async () => {
      const { data, error } = await supabase
        .from('video_session_chat')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading chat:', error);
      } else if (data) {
        setChatMessages(data as Message[]);
      }
    };

    loadChatMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`session-chat-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_session_chat',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          setChatMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Load session notes
  useEffect(() => {
    if (!sessionId) return;

    const loadNotes = async () => {
      const { data, error } = await supabase
        .from('video_session_notes')
        .select('notes')
        .eq('session_id', sessionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading notes:', error);
      } else if (data) {
        setNotes(data.notes);
      }
    };

    loadNotes();
  }, [sessionId]);

  // Auto-save notes every 30 seconds
  useEffect(() => {
    if (!notes.trim()) return;

    const saveInterval = setInterval(async () => {
      await supabase.from('video_session_notes').upsert({
        session_id: sessionId,
        therapist_id: therapistId,
        client_id: clientId,
        notes: notes,
        updated_at: new Date().toISOString()
      }, { onConflict: 'session_id' });
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [notes, sessionId, therapistId, clientId]);

  // Load files
  useEffect(() => {
    if (!sessionId) return;

    const loadFiles = async () => {
      const { data, error } = await supabase
        .from('video_session_files')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading files:', error);
      } else if (data) {
        setFiles(data);
      }
    };

    loadFiles();
  }, [sessionId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('video_session_chat').insert({
      session_id: sessionId,
      sender_id: therapistId,
      sender_type: 'therapist',
      message: newMessage
    });

    if (error) {
      toast({ title: "Error sending message", variant: "destructive" });
    } else {
      setNewMessage("");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 50MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileName = `${sessionId}/${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('session-files')
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: "Upload failed", variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('session-files')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase.from('video_session_files').insert({
      session_id: sessionId,
      uploader_id: therapistId,
      file_name: file.name,
      file_url: publicUrl,
      file_type: file.type,
      file_size: file.size
    });

    if (dbError) {
      toast({ title: "Error saving file", variant: "destructive" });
    } else {
      toast({ title: "File uploaded successfully" });
      // Reload files
      const { data } = await supabase
        .from('video_session_files')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });
      if (data) setFiles(data);
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-96 bg-background/95 backdrop-blur-xl border-l border-border/50">
      <Tabs defaultValue="chat" className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1 p-4" ref={chatScrollRef}>
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_type === 'therapist' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.sender_type === 'therapist'
                        ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-background/50"
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="flex-1 p-4 m-0">
          <div className="space-y-4">
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload File'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {file.file_type?.startsWith('image/') ? (
                      <ImageIcon className="w-5 h-5 text-[hsl(var(--primary))]" />
                    ) : (
                      <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.file_size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.file_url, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="flex-1 p-4 m-0">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <p className="text-xs text-muted-foreground">Private - Client cannot see these notes</p>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Session notes (auto-saved every 30 seconds)..."
              className="flex-1 bg-background/50 resize-none"
            />
          </div>
        </TabsContent>

        <TabsContent value="resources" className="flex-1 p-4 m-0">
          <CrisisResourcesPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

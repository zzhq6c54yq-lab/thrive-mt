import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Flag } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  client_id: string;
  client_name: string;
  message_text: string;
  is_read: boolean;
  is_urgent: boolean;
  created_at: string;
  sender_type: string;
}

interface MessagesTabProps {
  messages: Message[];
}

export default function MessagesTab({ messages }: MessagesTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all");

  // Group messages by client
  const groupedMessages = messages.reduce((acc, msg) => {
    if (!acc[msg.client_id]) {
      acc[msg.client_id] = {
        client_name: msg.client_name,
        messages: [],
        unread_count: 0,
        has_urgent: false,
        last_message_date: msg.created_at,
      };
    }
    acc[msg.client_id].messages.push(msg);
    if (!msg.is_read && msg.sender_type === "client") {
      acc[msg.client_id].unread_count++;
    }
    if (msg.is_urgent) {
      acc[msg.client_id].has_urgent = true;
    }
    if (new Date(msg.created_at) > new Date(acc[msg.client_id].last_message_date)) {
      acc[msg.client_id].last_message_date = msg.created_at;
    }
    return acc;
  }, {} as Record<string, any>);

  const clientList = Object.entries(groupedMessages)
    .filter(([_, data]) => {
      if (filter === "unread" && data.unread_count === 0) return false;
      if (filter === "urgent" && !data.has_urgent) return false;
      if (searchTerm && !data.client_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort(([_, a], [__, b]) => 
      new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime()
    );

  const selectedThread = selectedClientId ? groupedMessages[selectedClientId]?.messages || [] : [];

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Messages</CardTitle>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
            >
              Unread
            </Button>
            <Button
              size="sm"
              variant={filter === "urgent" ? "default" : "outline"}
              onClick={() => setFilter("urgent")}
            >
              Urgent
            </Button>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(100vh-450px)] space-y-2">
          {clientList.map(([clientId, data]) => (
            <div
              key={clientId}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedClientId === clientId
                  ? "bg-primary/10 border-primary/20"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedClientId(clientId)}
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-sm">{data.client_name}</h4>
                <div className="flex items-center gap-1">
                  {data.has_urgent && <Flag className="h-3 w-3 text-red-500" />}
                  {data.unread_count > 0 && (
                    <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center text-xs">
                      {data.unread_count}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {data.messages[data.messages.length - 1]?.message_text}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(data.last_message_date), "MMM d, h:mm a")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="md:col-span-2 flex flex-col">
        {selectedClientId ? (
          <>
            <CardHeader>
              <CardTitle>{groupedMessages[selectedClientId]?.client_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {selectedThread.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_type === "therapist" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender_type === "therapist"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.message_text}</p>
                    <p className={`text-xs mt-1 ${msg.sender_type === "therapist" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {format(new Date(msg.created_at), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardContent className="border-t pt-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button onClick={handleSendReply} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a conversation to view messages</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

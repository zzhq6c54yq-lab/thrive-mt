
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Video, FileText, MessageSquare, Calendar, 
  MoreHorizontal, Download, Eye, Clock, Search, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SharedItem {
  id: string;
  title: string;
  type: "video" | "document" | "message";
  sender: string;
  date: string;
  viewed: boolean;
}

const SharedWithMeTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sharedItems, setSharedItems] = useState<SharedItem[]>([
    {
      id: "1",
      title: "Family Reunion Memories",
      type: "video",
      sender: "John Smith",
      date: "June 15, 2023",
      viewed: true
    },
    {
      id: "2",
      title: "Trust Documents - Please Review",
      type: "document",
      sender: "Sarah Johnson",
      date: "May 10, 2023",
      viewed: false
    },
    {
      id: "3",
      title: "Birthday Wishes",
      type: "message",
      sender: "David Williams",
      date: "April 27, 2023",
      viewed: true
    }
  ]);

  const handleView = (id: string) => {
    setSharedItems(sharedItems.map(item => 
      item.id === id ? { ...item, viewed: true } : item
    ));
    
    toast({
      title: "Opening Content",
      description: "The shared content is being loaded...",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Checking for new shared content...",
    });
    
    // Simulate refresh
    setTimeout(() => {
      toast({
        title: "Up to Date",
        description: "You're seeing all the latest shared content.",
      });
    }, 1500);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-6 w-6 text-blue-400" />;
      case "document":
        return <FileText className="h-6 w-6 text-amber-400" />;
      case "message":
        return <MessageSquare className="h-6 w-6 text-pink-400" />;
      default:
        return <FileText className="h-6 w-6 text-gray-400" />;
    }
  };

  const getTypeBackground = (type: string) => {
    switch (type) {
      case "video":
        return "from-blue-500/20 to-indigo-500/20";
      case "document":
        return "from-amber-500/20 to-orange-500/20";
      case "message":
        return "from-pink-500/20 to-purple-500/20";
      default:
        return "from-gray-500/20 to-gray-600/20";
    }
  };

  const filteredItems = sharedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-400" />
            Shared With Me
          </h2>
          <p className="text-gray-400">View content that has been shared with you by your family and friends.</p>
        </div>
        <Button 
          onClick={handleRefresh}
          variant="outline"
          className="border-green-500/30 text-green-400 hover:bg-green-500/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search shared content..."
          className="pl-10 bg-white/5 border-white/10 focus:border-green-500/50 focus:ring-green-500/20"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            {searchQuery ? "No matches found" : "No Shared Content"}
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `No content matching "${searchQuery}" was found. Try a different search.` 
              : "When someone shares content with you, it will appear here."}
          </p>
          {searchQuery && (
            <Button 
              onClick={() => setSearchQuery("")}
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`overflow-hidden border-white/10 transition-all duration-300 ${
                item.viewed ? "bg-white/5 hover:bg-white/10" : "bg-green-500/5 hover:bg-green-500/10 border-green-500/20"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeBackground(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-200 line-clamp-1">{item.title}</h3>
                        {!item.viewed && (
                          <div className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            New
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-400">From: {item.sender}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        {item.viewed && (
                          <>
                            <span className="text-xs text-gray-500">•</span>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Viewed</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleView(item.id)}
                      className="text-gray-300 hover:text-white bg-white/10 hover:bg-white/20"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/5 hover:bg-white/10">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800">
                        <DropdownMenuItem 
                          onClick={() => handleView(item.id)}
                          className="text-gray-300 hover:text-white focus:text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          <span>Download</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedWithMeTab;

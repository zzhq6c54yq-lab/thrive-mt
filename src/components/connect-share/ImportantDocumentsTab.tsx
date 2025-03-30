
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, ArrowUpDown, Calendar, LockIcon, Users, MoreHorizontal, Eye, Download, Trash2, Share2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: string;
  title: string;
  type: "will" | "living_will" | "testament" | "power_of_attorney" | "other";
  date: string;
  size: string;
  shared: boolean;
  secured: boolean;
}

const documentTypes = {
  will: "Last Will & Testament",
  living_will: "Living Will",
  testament: "Testament",
  power_of_attorney: "Power of Attorney",
  other: "Other Document"
};

const ImportantDocumentsTab = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "My Last Will - 2023",
      type: "will",
      date: "January 15, 2023",
      size: "1.2 MB",
      shared: true,
      secured: true
    },
    {
      id: "2",
      title: "Living Will - Healthcare Directives",
      type: "living_will",
      date: "March 10, 2023",
      size: "850 KB",
      shared: false,
      secured: true
    },
    {
      id: "3",
      title: "Power of Attorney - Finance",
      type: "power_of_attorney",
      date: "April 5, 2023",
      size: "1.5 MB",
      shared: false,
      secured: true
    }
  ]);

  const [sortBy, setSortBy] = useState<string>("date");
  const [filterType, setFilterType] = useState<string>("all");

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your document is being uploaded and secured...",
    });
    
    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      const newDocument = {
        id: `${documents.length + 1}`,
        title: "New Document",
        type: "other" as const,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        size: "1.1 MB",
        shared: false,
        secured: true
      };
      
      setDocuments([...documents, newDocument]);
      
      toast({
        title: "Document Secured",
        description: "Your document has been uploaded and secured successfully!",
      });
    }, 2000);
  };

  const handleShare = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, shared: true } : doc
    ));
    
    toast({
      title: "Document Shared",
      description: "Your document has been securely shared with your designated contacts.",
    });
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: "Document Deleted",
      description: "Your document has been permanently removed.",
    });
  };

  const getSortedAndFilteredDocuments = () => {
    let filtered = documents;
    
    if (filterType !== "all") {
      filtered = documents.filter(doc => doc.type === filterType);
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });
  };

  const sortedDocuments = getSortedAndFilteredDocuments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 rounded-xl backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-amber-400" />
            Important Documents
          </h2>
          <p className="text-gray-400">Securely store and share your important life documents.</p>
        </div>
        <Button 
          onClick={handleUpload}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gray-400" />
          <span className="text-gray-300 font-medium">
            {sortedDocuments.length} {sortedDocuments.length === 1 ? 'Document' : 'Documents'}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-[180px]">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-gray-300">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Document Types</SelectLabel>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="will">Last Will & Testament</SelectItem>
                  <SelectItem value="living_will">Living Will</SelectItem>
                  <SelectItem value="testament">Testament</SelectItem>
                  <SelectItem value="power_of_attorney">Power of Attorney</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-[180px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-gray-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Sort Options</SelectLabel>
                  <SelectItem value="date">Date (Newest first)</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedDocuments.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No Documents</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Upload your important documents to securely store and share them with your loved ones.
          </p>
          <Button 
            onClick={handleUpload}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Your First Document
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                      <FileText className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-200 line-clamp-1">{doc.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-400">{documentTypes[doc.type]}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{doc.size}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {doc.secured && (
                      <div className="bg-emerald-500/20 text-emerald-400 text-xs py-1 px-2 rounded-full flex items-center">
                        <LockIcon className="h-3 w-3 mr-1" />
                        <span>Secured</span>
                      </div>
                    )}
                    
                    {doc.shared && (
                      <div className="bg-blue-500/20 text-blue-400 text-xs py-1 px-2 rounded-full flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Shared</span>
                      </div>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800">
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleShare(doc.id)}
                          className="text-gray-300 hover:text-white focus:text-white"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          <span>{doc.shared ? "Manage Sharing" : "Share"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-950/30 focus:bg-red-950/30"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
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

export default ImportantDocumentsTab;

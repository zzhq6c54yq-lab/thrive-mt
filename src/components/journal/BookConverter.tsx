
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Book, Download, Share2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Entry {
  category: string;
  date: string;
  content: string;
}

interface BookConverterProps {
  entries: { [key: string]: string[] };
  userName?: string;
}

const BookConverter: React.FC<BookConverterProps> = ({ entries, userName = "Author" }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'preview' | 'share'>('select');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bookTitle, setBookTitle] = useState(`${userName}'s Legacy Journal`);
  const [isConverting, setIsConverting] = useState(false);
  const [bookGenerated, setBookGenerated] = useState(false);
  const { toast } = useToast();
  
  // Get all available categories
  const categories = Object.keys(entries);
  
  const hasEntries = categories.length > 0 && categories.some(cat => entries[cat] && entries[cat].length > 0);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...categories]);
    }
  };
  
  const handleConvert = () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "No categories selected",
        description: "Please select at least one journal category to include",
        variant: "destructive"
      });
      return;
    }
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setStep('preview');
      setBookGenerated(true);
      
      toast({
        title: "Book conversion complete",
        description: "Your journal entries have been formatted as a book",
      });
    }, 1500);
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your legacy journal book is being prepared for download",
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your legacy journal book has been downloaded",
      });
    }, 2000);
  };
  
  const handleShareWithFamily = () => {
    setStep('share');
  };
  
  const handleSendToFamily = () => {
    toast({
      title: "Book shared with family",
      description: "Your legacy journal book has been shared with your family members",
    });
    
    setTimeout(() => {
      setOpen(false);
      setStep('select');
    }, 1500);
  };
  
  const resetDialog = () => {
    setStep('select');
  };
  
  const closeDialog = () => {
    setOpen(false);
    setTimeout(resetDialog, 300);
  };
  
  return (
    <>
      <Button
        variant="outline"
        className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37] flex items-center gap-2"
        onClick={() => setOpen(true)}
        disabled={!hasEntries}
      >
        <Book className="h-4 w-4" />
        Convert to Book
      </Button>
      
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent className="bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] border border-[#9F9EA1]/30 text-white max-w-2xl">
          {step === 'select' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37]">
                  Create Your Legacy Book
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Transform your journal entries into a beautiful book format that you can download or share with loved ones.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="book-title" className="text-gray-200">Book Title</Label>
                  <input
                    id="book-title"
                    className="w-full bg-[#333]/50 text-gray-100 border border-[#9F9EA1]/30 rounded-md p-2 focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Enter a title for your book"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-200">Select Journal Categories to Include</Label>
                    <Button 
                      variant="link" 
                      className="text-[#D4AF37] p-0 h-auto"
                      onClick={handleSelectAll}
                    >
                      {selectedCategories.length === categories.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[200px] bg-[#1a1a1a]/80 rounded-md p-4 border border-[#9F9EA1]/20">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                            className="border-[#9F9EA1]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                          />
                          <Label 
                            htmlFor={`category-${category}`}
                            className="capitalize text-gray-300"
                          >
                            {category} ({entries[category]?.length || 0} entries)
                          </Label>
                        </div>
                      ))}
                      {categories.length === 0 && (
                        <div className="text-gray-400 text-center py-8">
                          No journal categories found. Start writing to create entries.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-gray-300 border-gray-500" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button 
                  className="bg-[#D4AF37] hover:bg-[#C4A030] text-black"
                  onClick={handleConvert}
                  disabled={isConverting || selectedCategories.length === 0}
                >
                  {isConverting ? "Converting..." : "Create Book"}
                </Button>
              </div>
            </>
          )}
          
          {step === 'preview' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37]">
                  Your Legacy Book
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Your journal has been converted to a book format. You can now download it or share it with your family.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="bg-[#1a1a1a]/80 rounded-md p-4 border border-[#9F9EA1]/20 flex items-center justify-center">
                  <div className="aspect-[3/4] w-48 bg-gradient-to-b from-[#D4AF37]/30 to-[#9F9EA1]/30 rounded shadow-lg flex flex-col items-center justify-center text-center p-4 relative">
                    <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded m-1"></div>
                    <Book className="h-12 w-12 text-[#D4AF37]/70 mb-2" />
                    <h3 className="text-sm font-serif font-bold text-white">{bookTitle}</h3>
                    <p className="text-xs text-gray-300 mt-1">by {userName}</p>
                    <div className="text-[10px] text-gray-400 mt-2">
                      Including {selectedCategories.length} categories
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="h-4 w-4" />
                    Download as PDF
                  </Button>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={handleShareWithFamily}
                  >
                    <Share2 className="h-4 w-4" />
                    Share with Family
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="text-gray-300 border-gray-500" onClick={resetDialog}>
                  Back to Selection
                </Button>
                <Button variant="outline" className="text-gray-300 border-gray-500" onClick={closeDialog}>
                  Close
                </Button>
              </div>
            </>
          )}
          
          {step === 'share' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37]">
                  Share Your Legacy Book
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Share your legacy journal book with your family members.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between px-3 py-2 border border-[#9F9EA1]/20 rounded-md bg-[#1a1a1a]/50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">JD</div>
                    <span className="ml-3 text-gray-200">Jane (Daughter)</span>
                  </div>
                  <Checkbox defaultChecked className="border-[#9F9EA1]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]" />
                </div>
                
                <div className="flex items-center justify-between px-3 py-2 border border-[#9F9EA1]/20 rounded-md bg-[#1a1a1a]/50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">MS</div>
                    <span className="ml-3 text-gray-200">Michael (Son)</span>
                  </div>
                  <Checkbox defaultChecked className="border-[#9F9EA1]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]" />
                </div>
                
                <div className="flex items-center justify-between px-3 py-2 border border-[#9F9EA1]/20 rounded-md bg-[#1a1a1a]/50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">SG</div>
                    <span className="ml-3 text-gray-200">Sarah (Granddaughter)</span>
                  </div>
                  <Checkbox className="border-[#9F9EA1]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]" />
                </div>
                
                <textarea 
                  className="w-full bg-[#333]/50 text-gray-100 border border-[#9F9EA1]/30 rounded-md p-3 focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20 h-24 resize-none"
                  placeholder="Add a personal message to your family members..."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="text-gray-300 border-gray-500" onClick={() => setStep('preview')}>
                  Back
                </Button>
                <Button 
                  className="bg-[#D4AF37] hover:bg-[#C4A030] text-black"
                  onClick={handleSendToFamily}
                >
                  Send to Family
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookConverter;

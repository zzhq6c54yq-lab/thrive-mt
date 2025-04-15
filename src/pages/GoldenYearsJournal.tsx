
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Save, Book, BookOpen, Sparkles, HelpCircle, Bookmark } from "lucide-react";
import JournalPrompts from "@/components/journal/JournalPrompts";
import { getPromptCategories } from "@/data/journalPrompts";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useToast } from "@/hooks/use-toast";
import BookConverter from "@/components/journal/BookConverter";

const GoldenYearsJournal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("wisdom");
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState<{[key: string]: string[]}>({});
  const [showTips, setShowTips] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get all available categories
  const categories = getPromptCategories();
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSaved(false);
  };
  
  // Handle prompt selection
  const handleSelectPrompt = (prompt: string) => {
    setJournalEntry(prompt + "\n\n");
    setSaved(false);
    
    // Focus on the textarea
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(prompt.length + 2, prompt.length + 2);
      }
    }, 100);
  };
  
  // Save journal entry
  const handleSave = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "No content to save",
        description: "Please write something before saving",
        duration: 2000,
      });
      return;
    }
    
    // Get current date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Save entry with date
    const newEntries = {...entries};
    if (!newEntries[selectedCategory]) {
      newEntries[selectedCategory] = [];
    }
    
    const entryWithDate = `## ${dateString}\n\n${journalEntry}`;
    newEntries[selectedCategory] = [entryWithDate, ...(newEntries[selectedCategory] || [])];
    
    setEntries(newEntries);
    setSaved(true);
    
    toast({
      title: "Journal Entry Saved",
      description: "Your legacy journal entry has been saved successfully",
      duration: 2000,
    });
  };
  
  // Handle navigation back to portal
  const handleBack = () => {
    navigate("/golden-years-portal", { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      }
    });
  };

  // Writing tips for seniors
  const writingTips = [
    "Start with small memories that stand out to you",
    "Don't worry about perfect grammar or spelling",
    "Write as if you're speaking to a loved one",
    "Include lessons you've learned throughout life",
    "Describe people who have influenced you",
    "Share family traditions and their origins",
    "Record your proudest achievements"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#333333] text-white">
      {/* Decorative elements - subtle metallic accents */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-[#9F9EA1]/10 to-[#D4AF37]/10"></div>
      <div className="absolute bottom-0 right-0 w-full h-12 bg-gradient-to-l from-[#9F9EA1]/10 to-[#D4AF37]/10"></div>
      
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="Legacy Journal"
        portalMode={true}
        portalPath="/golden-years-portal"
        backButtonAction={handleBack}
      />
      
      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        {/* Journal header with metallic styling */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37]">
            Your Legacy Journal
          </h1>
          <p className="text-gray-300 italic">
            Preserve your stories, wisdom, and memories for generations to come
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Categories & Prompts */}
          <Card className="bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] border border-[#9F9EA1]/30 shadow-lg">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37] flex items-center">
                <Book className="mr-2 h-5 w-5 text-[#D4AF37]" /> Journal Categories
              </h3>
              
              <ScrollArea className="h-[180px]">
                <div className="space-y-2 pr-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      className={`w-full justify-start ${selectedCategory === category 
                        ? 'bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border-[#D4AF37] text-[#D4AF37]' 
                        : 'bg-transparent hover:bg-[#9F9EA1]/10 text-gray-300 border-[#9F9EA1]/30'}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span className="capitalize">{category}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-6 border-t border-[#9F9EA1]/20 pt-6">
                <h3 className="text-xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37] flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-[#D4AF37]" /> Writing Prompts
                </h3>
                <JournalPrompts 
                  category={selectedCategory}
                  onSelectPrompt={handleSelectPrompt}
                />
              </div>
              
              <Button
                variant="ghost"
                className="mt-6 w-full border border-[#9F9EA1]/20 text-[#9F9EA1] hover:text-[#D4AF37] hover:bg-[#9F9EA1]/10"
                onClick={() => setShowTips(!showTips)}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                {showTips ? "Hide Writing Tips" : "Show Writing Tips"}
              </Button>
              
              {showTips && (
                <div className="mt-4 p-4 rounded-md bg-[#9F9EA1]/10 border border-[#9F9EA1]/20">
                  <h4 className="font-medium text-[#D4AF37] mb-2">Writing Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {writingTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Bookmark className="h-4 w-4 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Middle Column - Writing Area */}
          <Card className="lg:col-span-2 bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] border border-[#9F9EA1]/30 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37]">
                  Write Your Story
                </h2>
                <div className="flex items-center space-x-2">
                  <BookConverter entries={entries} userName="Your Name" />
                  
                  <Button
                    variant="outline" 
                    size="sm"
                    className={`bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37] ${saved ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSave}
                    disabled={saved}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#9F9EA1]/10 p-3 rounded-md mb-4 flex items-center border border-[#9F9EA1]/30">
                <Calendar className="h-5 w-5 text-[#D4AF37] mr-2" />
                <span className="text-gray-300">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <Textarea
                value={journalEntry}
                onChange={(e) => {
                  setJournalEntry(e.target.value);
                  setSaved(false);
                }}
                className="min-h-[300px] bg-[#333]/50 text-gray-100 placeholder-gray-400 border-[#9F9EA1]/30 focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20 resize-none"
                placeholder="Begin writing your legacy here. Share your wisdom, memories, and life experiences..."
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9F9EA1] to-[#D4AF37] flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-[#D4AF37]" /> Previous Entries
                </h3>
                
                {entries[selectedCategory] && entries[selectedCategory].length > 0 ? (
                  <ScrollArea className="h-[200px] bg-[#1a1a1a]/80 rounded-md p-4 border border-[#9F9EA1]/20">
                    <div className="space-y-6">
                      {entries[selectedCategory].map((entry, index) => (
                        <div key={index} className="prose prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: entry
                              .replace(/^## (.*)/gm, '<h3 class="text-[#D4AF37] font-serif font-bold mb-2">$1</h3>')
                              .replace(/\n/g, '<br/>') 
                          }} />
                          <div className="border-b border-[#9F9EA1]/20 mt-4 pb-2"></div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="bg-[#1a1a1a]/80 rounded-md p-6 text-center border border-[#9F9EA1]/20">
                    <BookOpen className="mx-auto h-12 w-12 text-[#9F9EA1]/30 mb-2" />
                    <p className="text-gray-400">No saved entries for this category yet.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Choose a prompt or start writing to create your first entry.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoldenYearsJournal;

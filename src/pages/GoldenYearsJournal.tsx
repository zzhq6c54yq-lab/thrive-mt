
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Save, Book, BookOpen } from "lucide-react";
import JournalPrompts from "@/components/journal/JournalPrompts";
import { getPromptCategories } from "@/data/journalPrompts";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useToast } from "@/hooks/use-toast";

const GoldenYearsJournal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("wisdom");
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState<{[key: string]: string[]}>({});
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#034b45] via-[#046b62] to-[#067b6d] text-white">
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
      
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Categories */}
          <Card className="bg-teal-900/30 backdrop-blur-md border-teal-200/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-teal-50 flex items-center">
                <Book className="mr-2 h-5 w-5 text-teal-300" /> Journal Categories
              </h3>
              
              <ScrollArea className="h-[180px]">
                <div className="space-y-2 pr-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      className={`w-full justify-start ${selectedCategory === category 
                        ? 'bg-teal-700 hover:bg-teal-800 border-teal-400 text-white' 
                        : 'bg-transparent hover:bg-teal-800/50 text-teal-100 border-teal-600/50'}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span className="capitalize">{category}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-teal-50 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-teal-300" /> Writing Prompts
                </h3>
                <JournalPrompts 
                  category={selectedCategory}
                  onSelectPrompt={handleSelectPrompt}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Middle Column - Writing Area */}
          <Card className="lg:col-span-2 bg-teal-900/30 backdrop-blur-md border-teal-200/30">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-teal-50">Your Legacy Journal</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    className="bg-teal-700 hover:bg-teal-800 border-teal-600 text-white"
                    onClick={handleSave}
                    disabled={saved}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
                  </Button>
                </div>
              </div>
              
              <div className="bg-teal-700/20 p-4 rounded-md mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-teal-300 mr-2" />
                <span className="text-teal-100">
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
                className="min-h-[300px] bg-teal-50 text-teal-900 placeholder-teal-500/50 border-teal-300"
                placeholder="Begin writing your legacy here. Share your wisdom, memories, and life experiences..."
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-teal-50 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-teal-300" /> Previous Entries
                </h3>
                
                {entries[selectedCategory] && entries[selectedCategory].length > 0 ? (
                  <ScrollArea className="h-[200px] bg-teal-800/30 rounded-md p-4">
                    <div className="space-y-6">
                      {entries[selectedCategory].map((entry, index) => (
                        <div key={index} className="prose prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: entry
                              .replace(/^## (.*)/gm, '<h3 class="text-teal-200 font-bold mb-2">$1</h3>')
                              .replace(/\n/g, '<br/>') 
                          }} />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="bg-teal-800/30 rounded-md p-6 text-center">
                    <p className="text-teal-200">No saved entries for this category yet.</p>
                    <p className="text-teal-300 text-sm mt-2">
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

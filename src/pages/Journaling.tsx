import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, List, Calendar, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Journaling = () => {
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState("");
  const [activeTab, setActiveTab] = useState("write");

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      toast({
        title: "Journal Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
      setJournalEntry("");
    } else {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
    }
  };

  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a challenge you're currently facing and how you might overcome it.",
    "What activities made you feel energized today?",
    "Write about something that brought you joy recently.",
    "Reflect on a recent accomplishment, no matter how small.",
    "What self-care activities would you like to prioritize this week?",
  ];

  const handlePromptSelect = (prompt: string) => {
    setJournalEntry(prompt + "\n\n");
    setActiveTab("write");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Therapeutic Journaling</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Express yourself and gain insights through guided writing practices.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                  Today's Journal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <Textarea
                  placeholder="What's on your mind today?"
                  className="min-h-[300px] mb-4"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
                <Button 
                  className="w-full"
                  onClick={handleSaveEntry}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of Journaling</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduces stress and anxiety by externalizing thoughts</li>
                  <li>• Helps process emotions and experiences</li>
                  <li>• Provides clarity and perspective</li>
                  <li>• Supports goal setting and personal growth</li>
                  <li>• Creates a record of progress over time</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prompts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prompts.map((prompt, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <List className="h-5 w-5 text-amber-500" />
                      Prompt {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{prompt}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handlePromptSelect(prompt)}
                    >
                      Use This Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Journal History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Your journal entries will appear here once you start writing regularly.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab("write")}
                >
                  Write Your First Entry
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Journaling;

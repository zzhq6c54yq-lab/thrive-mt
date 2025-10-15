import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const MirrorAiChat = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("Your compassionate reflection will appear here...");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const callMirrorAI = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Please enter a message",
        description: "Type your thoughts before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mirror-ai-chat', {
        body: {
          message: userInput
        }
      });

      if (error) {
        throw error;
      }

      setResponse(data?.response || "Sorry, no response received.");
      setUserInput(""); // Clear input after successful response
    } catch (error) {
      console.error('Error calling MirrorAI:', error);
      setResponse("I'm experiencing some technical difficulties. Please try again.");
      toast({
        title: "Connection Error", 
        description: "Unable to reach MirrorAI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callMirrorAI();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl text-primary">
            <Brain className="h-8 w-8" />
            MirrorAI: Your ThriveMT Companion
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            A trauma-informed AI companion to help you process emotions with compassion and clarity
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="userInput" className="text-sm font-medium text-foreground">
              Share your thoughts:
            </label>
            <Textarea
              id="userInput"
              placeholder="Share what's on your mind and heart..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={4}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
          </div>

          <Button 
            onClick={callMirrorAI}
            disabled={isLoading || !userInput.trim()}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <Card className="bg-muted/50 border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                MirrorAI Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[120px] p-4 bg-background border border-border rounded-lg">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {response}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
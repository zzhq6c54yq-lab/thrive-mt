
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, Heart, Share2, 
  MessageSquare, Bookmark, Copy, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import HomeButton from "@/components/HomeButton";

// Sample affirmations data
const affirmations = [
  {
    id: 1,
    text: "My military service has given me strength and resilience that I can apply to every challenge in my life.",
    author: "Thrive MT",
    category: "Strength"
  },
  {
    id: 2,
    text: "I am not defined by my past experiences. Each day is an opportunity to grow and move forward.",
    author: "Thrive MT",
    category: "Growth"
  },
  {
    id: 3,
    text: "My service has shaped me, but it does not define my entire future. I have the strength to create a meaningful civilian life.",
    author: "Thrive MT",
    category: "Transition"
  },
  {
    id: 4,
    text: "I honor my experiences by taking care of my mental health today. I deserve peace and healing.",
    author: "Thrive MT",
    category: "Healing"
  },
  {
    id: 5,
    text: "The discipline and focus I learned in the military are valuable tools as I navigate life's challenges.",
    author: "Capt. James Wilson, Ret.",
    category: "Discipline"
  },
  {
    id: 6,
    text: "I am part of a brotherhood/sisterhood that spans generations. I am never truly alone.",
    author: "Sgt. Maria Rodriguez, Ret.",
    category: "Community"
  },
  {
    id: 7,
    text: "Each step I take toward healing is an act of courage. Today, I choose courage.",
    author: "Thrive MT",
    category: "Courage"
  },
  {
    id: 8,
    text: "My military experience has given me unique perspectives and skills that make me valuable in civilian life.",
    author: "Maj. Robert Johnson, Ret.",
    category: "Value"
  },
  {
    id: 9,
    text: "I have overcome immense challenges before, and I have the strength to overcome the challenges I face today.",
    author: "Thrive MT",
    category: "Resilience"
  },
  {
    id: 10,
    text: "I give myself permission to ask for help when I need it. Seeking support is a sign of strength, not weakness.",
    author: "Dr. Sarah Miller",
    category: "Support"
  },
  {
    id: 11,
    text: "Today, I choose to focus on progress, not perfection. Small steps forward are still steps forward.",
    author: "Thrive MT",
    category: "Progress"
  },
  {
    id: 12,
    text: "My experiences have made me stronger. I have survived 100% of my worst days so far.",
    author: "Lt. Col. Thomas Brown, Ret.",
    category: "Survival"
  }
];

const MilitaryAffirmations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const form = useForm<{ affirmation: string }>({
    defaultValues: {
      affirmation: "",
    },
  });
  
  const currentAffirmation = affirmations[currentIndex];
  
  const nextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };
  
  const prevAffirmation = () => {
    setCurrentIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length);
  };
  
  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) => 
      prev.includes(id) 
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
    
    toast({
      title: favoriteIds.includes(id) ? "Removed from favorites" : "Added to favorites",
      description: favoriteIds.includes(id) 
        ? "Affirmation removed from your favorites." 
        : "Affirmation saved to your favorites.",
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Affirmation copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const onSubmit = (values: { affirmation: string }) => {
    toast({
      title: "Affirmation submitted",
      description: "Thank you for sharing your affirmation. It will be reviewed and may be added to our collection.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/app/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Daily Affirmations</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Positive affirmations specifically for military personnel and veterans to support mental wellbeing and resilience.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Affirmation */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="bg-gradient-to-r from-[#1c2e4a] to-[#0A1929] border border-[#B87333]/30 shadow-[0_0_15px_rgba(184,115,51,0.2)]">
            <CardContent className="p-10">
              <div className="flex flex-col items-center">
                <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-3 rounded-full mb-6">
                  {currentAffirmation.category}
                </div>
                
                <blockquote className="text-3xl text-center italic font-light mb-6 leading-relaxed">
                  "{currentAffirmation.text}"
                </blockquote>
                
                <cite className="text-gray-400 mb-8">— {currentAffirmation.author}</cite>
                
                <div className="flex gap-4 w-full justify-center">
                  <Button variant="ghost" className="text-white hover:bg-white/10" onClick={prevAffirmation}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button 
                    variant={favoriteIds.includes(currentAffirmation.id) ? "gold" : "outline"} 
                    className={`text-white ${!favoriteIds.includes(currentAffirmation.id) && "border-white/20 hover:bg-white/10"}`}
                    onClick={() => toggleFavorite(currentAffirmation.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${favoriteIds.includes(currentAffirmation.id) ? "fill-current" : ""}`} />
                    {favoriteIds.includes(currentAffirmation.id) ? "Favorited" : "Add to Favorites"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10"
                    onClick={() => copyToClipboard(currentAffirmation.text)}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  
                  <Button variant="ghost" className="text-white hover:bg-white/10" onClick={nextAffirmation}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Affirmation Gallery */}
        <h2 className="text-2xl font-bold text-[#B87333] mb-6">Explore More Affirmations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {affirmations.slice(0, 6).map((affirmation) => (
            <Card key={affirmation.id} className="bg-[#1c2e4a] border border-white/10 hover:border-[#B87333]/30 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-3">
                  {affirmation.category}
                </div>
                <p className="text-lg italic mb-4 leading-relaxed">"{affirmation.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">— {affirmation.author}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/10"
                    onClick={() => toggleFavorite(affirmation.id)}
                  >
                    <Heart className={`h-4 w-4 ${favoriteIds.includes(affirmation.id) ? "fill-[#B87333] text-[#B87333]" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Submit Your Affirmation */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-[#1c2e4a] to-[#0A1929] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#B87333]" />
                Submit Your Affirmation
              </CardTitle>
              <CardDescription className="text-gray-300">
                Share an affirmation that has helped you or that you'd like to share with others in the military community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="affirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Your Affirmation</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your affirmation here..." 
                            className="bg-[#0A1929] border-white/10 text-white min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Your affirmation will be reviewed before being added to our collection.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="gold">
                    Submit Affirmation
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Affirmation Tips */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-[#B87333] mb-6">How to Use Affirmations</h2>
          
          <div className="bg-[#1c2e4a] rounded-lg p-6 border border-white/10">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-[#B87333]/10 p-1.5 rounded-full mt-1">
                  <div className="h-2 w-2 bg-[#B87333] rounded-full"></div>
                </div>
                <div>
                  <strong className="text-white">Morning Ritual:</strong>
                  <p className="text-gray-300">
                    Start your day by reading your chosen affirmation aloud. Repeat it three times while taking deep breaths.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-[#B87333]/10 p-1.5 rounded-full mt-1">
                  <div className="h-2 w-2 bg-[#B87333] rounded-full"></div>
                </div>
                <div>
                  <strong className="text-white">Challenging Moments:</strong>
                  <p className="text-gray-300">
                    Save affirmations to your phone to read during difficult times or when feeling stressed.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-[#B87333]/10 p-1.5 rounded-full mt-1">
                  <div className="h-2 w-2 bg-[#B87333] rounded-full"></div>
                </div>
                <div>
                  <strong className="text-white">Make It Personal:</strong>
                  <p className="text-gray-300">
                    Modify affirmations to make them more meaningful to your specific experiences and challenges.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-[#B87333]/10 p-1.5 rounded-full mt-1">
                  <div className="h-2 w-2 bg-[#B87333] rounded-full"></div>
                </div>
                <div>
                  <strong className="text-white">Consistency Is Key:</strong>
                  <p className="text-gray-300">
                    Practice affirmations regularly to form new neural pathways that support positive thinking.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Affirmations are one tool in your mental health toolkit. For additional support, explore other resources in our Military Support section.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/app/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MilitaryAffirmations;

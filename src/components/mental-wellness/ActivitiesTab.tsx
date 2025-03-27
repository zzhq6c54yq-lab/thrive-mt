import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Music, HeartHandshake, Flower, Wind, Meditation, PenTool } from "lucide-react";
import CakeDecorationGame from "./CakeDecorationGame";
import HelpDialog from "./HelpDialog";
import MoodPlaylistGenerator from "@/components/playlists/MoodPlaylistGenerator";

const ActivitiesTab: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const defaultMood = 'neutral';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Activities</h2>
        <Button variant="outline" size="sm" onClick={() => setShowHelp(true)}>
          Help
        </Button>
        <HelpDialog isOpen={showHelp} onClose={() => setShowHelp(false)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><PenTool className="mr-2 h-4 w-4" /> Icing Game</CardTitle>
            <CardDescription>Unleash your creativity and decorate a cake!</CardDescription>
          </CardHeader>
          <CardContent>
            <CakeDecorationGame />
          </CardContent>
        </Card>
        
        <div className="col-span-1 md:col-span-2">
          <div className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 p-1 rounded-xl">
            <MoodPlaylistGenerator 
              currentMood={defaultMood} 
              className="bg-white/5 border-none"
            />
          </div>
        </div>

        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Brain className="mr-2 h-4 w-4" /> Mindfulness Exercises</CardTitle>
            <CardDescription>Reduce stress and increase focus.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Engage in guided meditation and breathing exercises.</p>
          </CardContent>
          <CardFooter>
            <Button>Start Now</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><HeartHandshake className="mr-2 h-4 w-4" /> Gratitude Journal</CardTitle>
            <CardDescription>Reflect on the positive aspects of your life.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Write down things you're grateful for each day.</p>
          </CardContent>
          <CardFooter>
            <Button>Open Journal</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Flower className="mr-2 h-4 w-4" /> Nature Walk</CardTitle>
            <CardDescription>Connect with nature for a calming experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Take a walk in a park or garden and observe your surroundings.</p>
          </CardContent>
          <CardFooter>
            <Button>Find Parks Near Me</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Wind className="mr-2 h-4 w-4" /> Breathing Exercises</CardTitle>
            <CardDescription>Practice deep breathing techniques to calm your mind.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Follow a guided breathing exercise for relaxation.</p>
          </CardContent>
          <CardFooter>
            <Button>Start Exercise</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Meditation className="mr-2 h-4 w-4" /> Guided Meditation</CardTitle>
            <CardDescription>Relax and focus with a guided meditation session.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Listen to a guided meditation to reduce stress.</p>
          </CardContent>
          <CardFooter>
            <Button>Begin Session</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ActivitiesTab;

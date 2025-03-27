
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, HeartHandshake, Flower, Wind, PenTool, Camera } from "lucide-react";
import CakeDecorationGame from "./CakeDecorationGame";
import HelpDialog from "./HelpDialog";
import GratitudeVisualizer from "./GratitudeVisualizer";

interface ActivitiesTabProps {
  onStartIcingGame?: () => void;
  onToolSelect?: (toolTitle: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ onStartIcingGame, onToolSelect }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showIcingGame, setShowIcingGame] = useState(false);
  const [showGratitudeVisualizer, setShowGratitudeVisualizer] = useState(false);

  const handleCloseIcingGame = () => {
    setShowIcingGame(false);
  };

  const handleCloseGratitudeVisualizer = () => {
    setShowGratitudeVisualizer(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Activities</h2>
        <Button variant="outline" size="sm" onClick={() => setShowHelp(true)}>
          Help
        </Button>
        <HelpDialog isOpen={showHelp} onClose={() => setShowHelp(false)} />
      </div>
      
      <Tabs defaultValue="creative" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creative" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center"><PenTool className="mr-2 h-4 w-4" /> Icing Game</CardTitle>
                <CardDescription>Unleash your creativity and decorate a cake!</CardDescription>
              </CardHeader>
              <CardContent>
                {showIcingGame ? (
                  <CakeDecorationGame onClose={handleCloseIcingGame} />
                ) : (
                  <div className="flex justify-center">
                    <Button onClick={() => setShowIcingGame(true)}>
                      Start Decorating
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center"><Camera className="mr-2 h-4 w-4" /> Gratitude Visualization</CardTitle>
                <CardDescription>Create visual representations of what you're grateful for</CardDescription>
              </CardHeader>
              <CardContent>
                {showGratitudeVisualizer ? (
                  <GratitudeVisualizer onClose={handleCloseGratitudeVisualizer} />
                ) : (
                  <div className="flex justify-center">
                    <Button onClick={() => setShowGratitudeVisualizer(true)}>
                      Create Visualization
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="wellness" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivitiesTab;

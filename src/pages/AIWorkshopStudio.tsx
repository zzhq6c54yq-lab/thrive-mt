import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from '@/components/Page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AIWorkshopPlayer from '@/components/workshop/AIWorkshopPlayer';
import { workshopData } from '@/data/workshopData';

const AIWorkshopStudio = () => {
  const [searchParams] = useSearchParams();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  // Support URL parameter for workshop selection
  useEffect(() => {
    const workshopIdFromUrl = searchParams.get('selected');
    if (workshopIdFromUrl) {
      setSelectedWorkshop(workshopIdFromUrl);
    }
  }, [searchParams]);

  if (selectedWorkshop) {
    const workshop = workshopData.find(w => w.id === selectedWorkshop);
    if (!workshop) {
      setSelectedWorkshop(null);
      return null;
    }

    // Convert workshopData format to AIWorkshopPlayer format
    const sections = workshop.sections.map(section => ({
      title: section.title,
      description: section.content,
      exercises: [{
        title: section.practicalExercise.title,
        instructions: section.practicalExercise.instructions,
        prompts: section.practicalExercise.outcomes
      }]
    }));

    return (
      <Page title="AI Workshop Studio" showBackButton={true}>
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedWorkshop(null)}
            className="mb-6"
          >
            ← Back to Workshops
          </Button>
          <AIWorkshopPlayer
            workshopId={selectedWorkshop}
            title={workshop.title}
            subtitle={workshop.description}
            introduction={workshop.learningOutcomes.join(' ')}
            sections={sections}
            clinicalContext={workshop.clinicalContext}
          />
        </div>
      </Page>
    );
  }

  return (
    <Page title="AI Workshop Studio" showBackButton={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground" style={{ textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>
            AI Workshop Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience interactive workshops with AI narration, guided exercises, and downloadable materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopData.map((workshop) => {
            const Icon = workshop.icon;
            return (
              <Card
                key={workshop.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-primary/20"
                onClick={() => setSelectedWorkshop(workshop.id)}
              >
                <div className={`relative h-48 overflow-hidden ${workshop.color}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-[#D4AF37]" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {workshop.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#D4AF37]/20 text-[#D4AF37] backdrop-blur-sm">
                      {workshop.clinicalContext.framework}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{workshop.title}</CardTitle>
                  <CardDescription className="text-base">
                    {workshop.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4" />
                    Start Workshop
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">How It Works</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>AI Narration:</strong> Professional voice guides you through each section</li>
                <li>• <strong>Interactive Exercises:</strong> Pause points for reflection and practice</li>
                <li>• <strong>Customizable Experience:</strong> Adjust playback speed and voice selection</li>
                <li>• <strong>Downloadable Worksheets:</strong> Take your learning offline with PDF materials</li>
                <li>• <strong>100% Free:</strong> Uses your browser's built-in speech synthesis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AIWorkshopStudio;


import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Target, Heart, Star } from "lucide-react";

const PersonalizedContent: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreFeature = (path: string) => {
    navigate(path);
  };

  return (
    <Page title="Your Personalized Content">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Personalized Wellness Journey
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Based on your selections, we've crafted unique content and recommendations just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#B87333]">
                <Lightbulb className="h-5 w-5" />
                <CardTitle>Recommended Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Discover mental wellness tools tailored to your needs and goals.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#A56625] text-white"
                onClick={() => handleExploreFeature("/app/mental-wellness-tools")}
              >
                Explore Tools
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#B87333]">
                <Target className="h-5 w-5" />
                <CardTitle>Goal-Based Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Activities and exercises designed around your personal goals.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#A56625] text-white"
                onClick={() => handleExploreFeature("/app/wellness-challenges")}
              >
                View Activities
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#B87333]">
                <Heart className="h-5 w-5" />
                <CardTitle>Wellness Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Curated resources based on your wellness preferences.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#A56625] text-white"
                onClick={() => handleExploreFeature("/app/resource-library")}
              >
                Browse Resources
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-[#B87333]">
                <Star className="h-5 w-5" />
                <CardTitle>Recommended Programs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Specialized programs that match your profile and interests.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#A56625] text-white"
                onClick={() => handleExploreFeature("/app/workshops")}
              >
                View Programs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default PersonalizedContent;

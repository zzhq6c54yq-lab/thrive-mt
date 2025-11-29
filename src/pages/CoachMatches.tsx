import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, MessageCircle, Video, Sparkles } from "lucide-react";
import { useCoaches } from "@/hooks/useCoaches";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const CoachMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preferences = location.state?.preferences || {};
  
  const { data: coaches, isLoading } = useCoaches();

  if (!preferences || Object.keys(preferences).length === 0) {
    navigate("/coach-questionnaire");
    return null;
  }

  const bestMatches = coaches?.slice(0, 3) || [];
  const allCoaches = coaches || [];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Your Perfect Matches</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Meet Your Matched Coaches
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your preferences, we've found coaches that fit your goals and style
          </p>
        </div>

        {/* Preferences Summary */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span>Your Preferences</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences.goals?.map((goal: string) => (
              <Badge key={goal} variant="secondary">{goal}</Badge>
            ))}
            {preferences.style && (
              <Badge variant="secondary">{preferences.style} style</Badge>
            )}
            {preferences.communication?.map((comm: string) => (
              <Badge key={comm} variant="secondary">{comm}</Badge>
            ))}
          </div>
          <Button
            variant="link"
            onClick={() => navigate("/coach-questionnaire")}
            className="mt-3 p-0 h-auto text-primary"
          >
            Retake questionnaire
          </Button>
        </Card>

        {/* Coaches Tabs */}
        <Tabs defaultValue="best" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="best">Best Matches ({bestMatches.length})</TabsTrigger>
            <TabsTrigger value="all">All Coaches ({allCoaches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="best">
            <CoachesList coaches={bestMatches} isLoading={isLoading} isBestMatch />
          </TabsContent>

          <TabsContent value="all">
            <CoachesList coaches={allCoaches} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CoachesList = ({ coaches, isLoading, isBestMatch = false }: { coaches: any[]; isLoading: boolean; isBestMatch?: boolean }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-20 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coaches.map((coach, index) => (
        <motion.div
          key={coach.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-xl transition-all group relative overflow-hidden">
            {isBestMatch && index === 0 && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Top Match
              </div>
            )}

            <div className="text-center mb-4">
              <img
                src={coach.image_url}
                alt={coach.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
              />
              <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{coach.title}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold">{coach.rating}</span>
                <span className="text-muted-foreground text-sm">({coach.total_reviews})</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex flex-wrap gap-1">
                {coach.specialties.slice(0, 3).map((specialty: string) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {coach.specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{coach.specialties.length - 3}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {coach.bio}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="text-lg font-bold text-primary">${coach.weekly_text_rate}/week</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/coach/${coach.id}`)}
              >
                View Profile
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Start Coaching
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CoachMatches;

import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, MessageCircle, Video, Phone, Award, Calendar, Globe } from "lucide-react";
import { useCoach } from "@/hooks/useCoach";
import { Skeleton } from "@/components/ui/skeleton";

const CoachProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: coach, isLoading } = useCoach(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-6 w-32 mx-auto mb-4" />
                <Skeleton className="h-40 w-full" />
              </Card>
            </div>
            <div>
              <Card className="p-6">
                <Skeleton className="h-32 w-full" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Coach Not Found</h2>
          <Button onClick={() => navigate("/coach-questionnaire")}>
            Find a Coach
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Matches
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coach Header */}
            <Card className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={coach.image_url}
                  alt={coach.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{coach.name}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{coach.title}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="font-semibold">{coach.rating}</span>
                      <span className="text-muted-foreground">({coach.total_reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>{coach.experience_years} years experience</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {coach.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About {coach.name.split(' ')[0]}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{coach.bio}</p>
              
              <Separator className="my-6" />

              <h3 className="text-xl font-semibold mb-3">Coaching Approach</h3>
              <p className="text-muted-foreground leading-relaxed">{coach.approach}</p>
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications & Training
              </h3>
              <ul className="space-y-2">
                {coach.certifications.map((cert: string) => (
                  <li key={cert} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {cert}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Availability */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Availability
              </h3>
              <p className="text-muted-foreground">{coach.availability_hours}</p>
              
              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {coach.languages.map((lang: string) => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
            </Card>

            {/* Communication Methods */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Communication Methods</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {coach.communication_styles.map((style: string) => (
                  <div key={style} className="text-center p-4 border border-border rounded-lg">
                    {style === "Text" && <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />}
                    {style === "Video" && <Video className="w-8 h-8 mx-auto mb-2 text-primary" />}
                    {style === "Audio" && <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />}
                    <p className="font-medium">{style}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Booking */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Text Coaching</p>
                    <p className="text-sm text-muted-foreground">Unlimited messaging</p>
                  </div>
                  <span className="text-lg font-bold text-primary">${coach.weekly_text_rate}/week</span>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-2">Audio Calls</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>15 minutes</span>
                      <span className="font-semibold">$12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>30 minutes</span>
                      <span className="font-semibold">$22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>45 minutes</span>
                      <span className="font-semibold">$32</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-2">Video Sessions</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>15 minutes</span>
                      <span className="font-semibold">$18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>30 minutes</span>
                      <span className="font-semibold">${coach.hourly_rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>45 minutes</span>
                      <span className="font-semibold">$42</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Coaching
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Video className="w-4 h-4 mr-2" />
                  Book a Session
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                First consultation is free (15 min)
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;

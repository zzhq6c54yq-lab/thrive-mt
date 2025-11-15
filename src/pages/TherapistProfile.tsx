import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTherapist } from "@/hooks/useTherapist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ArrowLeft, Calendar, DollarSign, Award, Clock } from "lucide-react";
import { BookingFlow } from "@/components/therapy/BookingFlow";
import AvailabilityCalendar from "@/components/therapist/AvailabilityCalendar";

export default function TherapistProfile() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useTherapist(id);
  const [showBooking, setShowBooking] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-semibold mb-2">Therapist Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The therapist you're looking for doesn't exist or is no longer available.
              </p>
              <Button asChild>
                <Link to="/therapist-matches">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Therapists
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { therapist, availability } = data;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/therapist-matches">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Therapists
          </Link>
        </Button>

        {/* Header Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={therapist.image_url || undefined} />
                <AvatarFallback className="text-3xl">
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {therapist.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">{therapist.title}</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-1">
                    {renderStars(therapist.rating || 0)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({therapist.total_reviews || 0} reviews)
                    </span>
                  </div>

                  {therapist.experience_years && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {therapist.experience_years} years experience
                    </Badge>
                  )}

                  {therapist.license_number && (
                    <Badge variant="outline">
                      License #{therapist.license_number}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <DollarSign className="h-5 w-5" />
                  ${therapist.hourly_rate}/hour
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {therapist.bio && (
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Bio</h3>
                <p className="text-muted-foreground leading-relaxed">{therapist.bio}</p>
              </div>
            )}

            {therapist.approach && (
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Therapeutic Approach</h3>
                <p className="text-muted-foreground leading-relaxed">{therapist.approach}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Specialties Section */}
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {therapist.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability Section */}
        {availability && availability.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Weekly Availability
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Available times are shown in your local timezone
              </p>
            </CardHeader>
            <CardContent>
              <AvailabilityCalendar availability={availability} />
            </CardContent>
          </Card>
        )}

        {/* Booking Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Ready to start your journey?</h3>
                <p className="text-muted-foreground">
                  Book a session with {therapist.name.split(' ')[0]} today
                </p>
              </div>
              <Button size="lg" onClick={() => setShowBooking(true)} className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showBooking && (
        <BookingFlow
          therapistId={therapist.id}
          therapistName={therapist.name}
          hourlyRate={Number(therapist.hourly_rate)}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}

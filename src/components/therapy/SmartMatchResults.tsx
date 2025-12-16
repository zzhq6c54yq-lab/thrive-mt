import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle, DollarSign, Shield, Clock, Calendar, MapPin, Video, MessageCircle } from "lucide-react";
import { SmartMatchResponse, TherapistMatch, useSaveSmartMatchRequest } from "@/hooks/useSmartMatch";
import { BookingFlow } from "./BookingFlow";
import { useToast } from "@/hooks/use-toast";

interface SmartMatchResultsProps {
  results: SmartMatchResponse;
  onBack: () => void;
  onClose?: () => void;
}

export function SmartMatchResults({ results, onBack, onClose }: SmartMatchResultsProps) {
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistMatch | null>(null);
  const { toast } = useToast();
  const saveRequest = useSaveSmartMatchRequest();

  const handleSelectTherapist = async (match: TherapistMatch) => {
    try {
      await saveRequest.mutateAsync({
        state: results.request.state,
        insurance_provider: results.request.insurance,
        session_type: results.request.sessionType,
        session_duration: results.request.sessionDuration,
        preferred_time: results.request.preferredTime,
        concerns: results.request.concerns,
        self_pay_allowed: results.request.selfPayAllowed,
        matched_therapist_id: match.therapist.id,
        session_rate: match.sessionRate,
        therapist_payout: match.therapistPayout,
        platform_revenue: match.platformRevenue,
      });
    } catch (error) {
      console.log('Guest user - skipping save');
    }
    setSelectedTherapist(match);
  };

  if (selectedTherapist) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedTherapist(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
        <BookingFlow 
          therapistId={selectedTherapist.therapist.id}
          therapistName={selectedTherapist.therapist.name}
          hourlyRate={selectedTherapist.sessionRate}
          onClose={() => setSelectedTherapist(null)}
        />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Search
          </Button>
          <Badge variant="secondary" className="text-primary">
            {results.summary.totalMatches} Matches Found
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold text-center pt-2">
          Your Therapist Matches
        </CardTitle>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{results.summary.totalMatches}</div>
            <div className="text-xs text-muted-foreground">Total Matches</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{results.summary.insuranceMatches}</div>
            <div className="text-xs text-muted-foreground">Insurance Accepted</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{results.summary.selfPayMatches}</div>
            <div className="text-xs text-muted-foreground">Self-Pay Options</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {results.matches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No therapists found matching your criteria.</p>
            <Button variant="outline" onClick={onBack} className="mt-4">
              Try Different Options
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {results.matches.map((match, index) => (
              <motion.div
                key={match.therapist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 ring-2 ring-muted group-hover:ring-primary transition-all">
                      <AvatarImage src={match.therapist.image_url} alt={match.therapist.name} />
                      <AvatarFallback>{match.therapist.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{match.therapist.name}</h3>
                        {match.therapist.rating && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{match.therapist.rating.toFixed(1)}</span>
                            {match.therapist.total_reviews && (
                              <span className="text-xs text-muted-foreground">
                                ({match.therapist.total_reviews})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{match.therapist.title}</p>
                      
                      {/* Match Reasons */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {match.matchReasons.slice(0, 3).map((reason, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {reason}
                          </Badge>
                        ))}
                      </div>

                      {/* Specialties */}
                      {match.therapist.specialties && match.therapist.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {match.therapist.specialties.slice(0, 4).map((spec, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-lg">${match.sessionRate}</span>
                        <span className="text-sm text-muted-foreground">/session</span>
                      </div>
                      {match.insuranceMatch && (
                        <Badge className="bg-green-100 text-green-700">
                          <Shield className="w-3 h-3 mr-1" />
                          Insurance Accepted
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectTherapist(match)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSelectTherapist(match)}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Request Summary */}
        <div className="bg-muted/30 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-sm mb-2">Your Search Criteria</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">
              <MapPin className="w-3 h-3 mr-1" />
              {results.request.state}
            </Badge>
            {results.request.insurance && (
              <Badge variant="outline">
                <Shield className="w-3 h-3 mr-1" />
                {results.request.insurance}
              </Badge>
            )}
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {results.request.sessionDuration} min {results.request.sessionType}
            </Badge>
            {results.request.preferredTime && (
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                {results.request.preferredTime}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

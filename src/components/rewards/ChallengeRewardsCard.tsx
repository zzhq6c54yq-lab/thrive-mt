
import React, { useState } from "react";
import { Award, Calendar, CheckCircle, ArrowUpRight, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import TutorialButton from "@/components/tutorials/TutorialButton";

interface ChallengeRewardsCardProps {
  points: number;
  coPayCredits: number;
  onRedeemPoints?: () => void;
}

const ChallengeRewardsCard: React.FC<ChallengeRewardsCardProps> = ({ 
  points = 75, 
  coPayCredits = 0,
  onRedeemPoints
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPointsDialog, setShowPointsDialog] = useState(false);
  
  // Calculate points needed for the next credit
  const pointsNeeded = 1000 - (points % 1000);
  
  // Calculate progress percentage
  const progressPercentage = (points % 1000) / 10;
  
  const handleViewChallenges = () => {
    navigate("/wellness-challenges");
  };
  
  const handleRedeemPoints = () => {
    if (points < 1000) {
      toast({
        title: "Not enough points",
        description: `You need at least 1,000 points to redeem $1 in co-pay credits.`,
        variant: "destructive"
      });
      return;
    }
    
    if (onRedeemPoints) {
      onRedeemPoints();
    } else {
      // Default behavior if no callback provided
      const creditsToRedeem = Math.floor(points / 1000);
      toast({
        title: "Points Redeemed Successfully!",
        description: `You've converted ${creditsToRedeem * 1000} points into $${creditsToRedeem} co-pay credits.`,
      });
    }
    
    setShowPointsDialog(false);
  };
  
  return (
    <>
      <Card className="bg-white shadow-md border border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
              <Award className="h-6 w-6 text-amber-600" />
              Challenge Rewards
            </CardTitle>
            <TutorialButton featureId="wellness-challenges" className="h-7" />
          </div>
          <CardDescription className="text-gray-600">
            Complete wellness challenges to earn points and co-pay credits
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold text-amber-600">{points}</span>
              <span className="text-gray-500 ml-2">points earned</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-green-600">${coPayCredits}</span>
              <span className="text-gray-500 ml-2">in credits</span>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
              <span>Progress to next credit</span>
              <span>{points % 1000}/1000 points</span>
            </div>
            <Progress value={progressPercentage} max={100} className="h-3 bg-gray-100">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
            </Progress>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {pointsNeeded} more points needed for your next $1 credit
            </p>
          </div>
          
          <div className="mt-6 space-y-5">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600" />
                How to Earn Points
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Daily Challenges: <span className="font-medium">10 points</span> each</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Complete all daily tasks: <span className="font-medium">+25 bonus points</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Weekly challenge completion: <span className="font-medium">+50 bonus points</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>Monthly streak bonus: <span className="font-medium">+100 points</span></span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Current Challenges
              </h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>10-Minute Mindful Meditation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Stress-Relief Exercise</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 border border-amber-400 rounded-full"></div>
                  <span>4 more challenges available</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={handleViewChallenges}
          >
            View All Challenges
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-medium"
            onClick={() => setShowPointsDialog(true)}
          >
            {points >= 1000 ? 'Redeem Points' : `${pointsNeeded} more points needed`}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Points Rewards Dialog */}
      <Dialog open={showPointsDialog} onOpenChange={setShowPointsDialog}>
        <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Redeem Points for Rewards</DialogTitle>
            <DialogDescription className="text-gray-300">
              Convert your earned points into co-pay credits
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[50vh] max-h-[400px] pr-4 -mr-4">
            <div className="py-4">
              <div className="bg-[#1e1e2c] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Available Points</span>
                  <span className="text-amber-400 font-bold text-lg">{points}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Redeemable Co-Pay Credits</span>
                  <span className="text-green-400 font-bold text-lg">${Math.floor(points/1000)}</span>
                </div>
                <Progress value={(points % 1000) / 10} className="h-2 bg-gray-700">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                </Progress>
                <p className="text-xs text-gray-400 mt-2">
                  {1000 - (points % 1000)} more points until your next co-pay credit
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-white mb-2">Points Conversion</h4>
                <p className="text-gray-300 text-sm">
                  • Every 1,000 points = $1 in co-pay credits<br />
                  • Credits can be used for therapy sessions or at Thrive Apparel<br />
                  • Points are earned by completing daily, weekly, and monthly challenges
                </p>
                
                <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 mt-4">
                  <h5 className="font-medium text-amber-300 mb-1">Special Offer</h5>
                  <p className="text-gray-300 text-sm">
                    Complete all challenges for the week to earn a 25-point bonus!
                  </p>
                </div>
                
                <div className="py-4">
                  <h4 className="font-medium text-white mb-2">How Points Accumulate</h4>
                  <div className="space-y-2 bg-[#262638] p-4 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      Points are awarded for completing wellness and mental health challenges:
                    </p>
                    <ul className="space-y-1.5 text-gray-300 text-sm pl-4">
                      <li>• Daily challenges: 10 points each</li>
                      <li>• Daily completion bonus: 25 points</li>
                      <li>• Weekly streak bonus: 50 points</li>
                      <li>• Monthly completion bonus: 100 points</li>
                      <li>• Special event challenges: 15-30 points</li>
                    </ul>
                  </div>
                </div>
                
                <div className="py-4">
                  <h4 className="font-medium text-white mb-2">Ways to Use Credits</h4>
                  <div className="space-y-2 bg-[#262638] p-4 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      Co-pay credits can be redeemed for:
                    </p>
                    <ul className="space-y-1.5 text-gray-300 text-sm pl-4">
                      <li>• Therapy session co-payments</li>
                      <li>• Thrive Apparel merchandise</li>
                      <li>• Premium wellness content</li>
                      <li>• Workshop registration fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowPointsDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRedeemPoints}
              disabled={points < 1000}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Redeem Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeRewardsCard;

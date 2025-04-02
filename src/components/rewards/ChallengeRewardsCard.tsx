
import React from "react";
import { Award, Calendar, CheckCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  
  // Calculate points needed for the next credit
  const pointsNeeded = 1000 - (points % 1000);
  
  // Calculate progress percentage
  const progressPercentage = (points % 1000) / 10;
  
  const handleViewChallenges = () => {
    navigate("/wellness-challenges");
  };
  
  return (
    <Card className="bg-white shadow-md border border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
          <Award className="h-6 w-6 text-amber-600" />
          Challenge Rewards
        </CardTitle>
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
          onClick={onRedeemPoints}
          disabled={points < 1000}
        >
          {points >= 1000 ? 'Redeem Points' : `${pointsNeeded} more points needed`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeRewardsCard;

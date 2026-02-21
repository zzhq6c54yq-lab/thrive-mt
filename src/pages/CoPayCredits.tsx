
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ChallengeRewardsCard from "@/components/rewards/ChallengeRewardsCard";
import HeroSection from "@/components/credits/HeroSection";
import MembershipPlansCard from "@/components/credits/MembershipPlansCard";
import CreditOverviewCard from "@/components/credits/CreditOverviewCard";
import ActivityHistoryCard from "@/components/credits/ActivityHistoryCard";
import HowItWorksTab from "@/components/credits/HowItWorksTab";
import EarnCreditsTab from "@/components/credits/EarnCreditsTab";
import RedeemCreditsTab from "@/components/credits/RedeemCreditsTab";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";

const CoPayCredits = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credits, setCredits] = useState(75);
  const [activeTab, setActiveTab] = useState("how-it-works");
  const [currentPlan, setCurrentPlan] = useState("basic");
  const [challengePoints, setChallengePoints] = useState(75);
  const [challengeCredits, setChallengeCredits] = useState(0);
  const [showCoPayPopup, setShowCoPayPopup] = useState(false);

  const handleEarnCredits = (amount: number, source: string) => {
    setCredits(prev => prev + amount);
    toast({
      title: `Earned ${amount} Points!`,
      description: `You've earned ${amount} points from ${source}.`,
    });
  };

  const handleUpgradePlan = (plan: string) => {
    let upgradeCost = 500;
    
    if (currentPlan === "basic" && plan === "platinum") {
      upgradeCost = 1000;
    } else if (currentPlan === "gold" && plan === "platinum") {
      upgradeCost = 500;
    }
    
    if (credits < upgradeCost) {
      toast({
        title: "Not enough points",
        description: `You need at least ${upgradeCost} points to upgrade to the ${plan} plan.`,
        variant: "destructive"
      });
      return;
    }
    
    navigate("/app/subscription-plans", { state: { plan, credits } });
  };

  const handleRedeemPoints = () => {
    // Updated point conversion: 100 points = 1 credit point
    if (challengePoints < 100) {
      toast({
        title: "Not enough points",
        description: "You need at least 100 points to redeem for credits.",
        variant: "destructive"
      });
      return;
    }
    
    // Convert in 100-point increments
    const creditsToRedeem = Math.floor(challengePoints / 100) * 10;
    const pointsToDeduct = Math.floor(challengePoints / 100) * 100;
    
    setChallengePoints(prev => prev - pointsToDeduct);
    setChallengeCredits(prev => prev + creditsToRedeem);
    setCredits(prev => prev + creditsToRedeem);
    
    toast({
      title: "Points Redeemed!",
      description: `You've converted ${pointsToDeduct} points into ${creditsToRedeem} credit points.`,
    });
  };

  // Handle cash out of credits in point increments
  const handleCashOut = (amount: number) => {
    if (credits < amount) {
      toast({
        title: "Not enough points",
        description: `You need at least ${amount} points to redeem.`,
        variant: "destructive"
      });
      return;
    }
    
    setCredits(prev => prev - amount);
    toast({
      title: "Points Redeemed!",
      description: `You've successfully redeemed ${amount} Thrive points.`,
    });
  };
  
  // Handle the "Get Started" button click
  const handleGetStarted = () => {
    setShowCoPayPopup(true);
  };

  return (
    <Page title="Points Program" fullWidth={true}>
      <div className="space-y-8 w-full">
        {/* Hero Section */}
        <HeroSection 
          credits={credits} 
          setActiveTab={setActiveTab}
          onGetStarted={handleGetStarted}
        />

        {/* Challenge Rewards Section */}
        <ChallengeRewardsCard 
          points={challengePoints}
          coPayCredits={challengeCredits}
          onRedeemPoints={handleRedeemPoints}
        />

        {/* Membership Plan Upgrade Section */}
        <MembershipPlansCard 
          currentPlan={currentPlan}
          handleUpgradePlan={handleUpgradePlan}
        />

        {/* Credit Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <CreditOverviewCard 
              credits={credits}
              handleCashOut={handleCashOut}
              handleUpgradePlan={handleUpgradePlan}
            />
          </div>
          
          <div className="md:col-span-4">
            <ActivityHistoryCard />
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-amber-100 p-1 rounded-lg">
            <TabsTrigger 
              value="how-it-works" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              How It Works
            </TabsTrigger>
            <TabsTrigger 
              value="earn" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              Earn Points
            </TabsTrigger>
            <TabsTrigger 
              value="redeem" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              Redeem Points
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works" className="mt-6">
            <HowItWorksTab setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="earn" className="mt-6">
            <EarnCreditsTab 
              handleEarnCredits={handleEarnCredits}
              handleUpgradePlan={handleUpgradePlan}
              currentPlan={currentPlan}
            />
          </TabsContent>
          
          <TabsContent value="redeem" className="mt-6">
            <RedeemCreditsTab 
              credits={credits}
              handleCashOut={handleCashOut}
              handleUpgradePlan={handleUpgradePlan}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Co-Pay Credit Welcome Popup */}
      <CoPayCreditPopup 
        open={showCoPayPopup}
        onOpenChange={setShowCoPayPopup}
      />
    </Page>
  );
};

export default CoPayCredits;


import React, { useState } from "react";
import { Crown, Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MembershipPlansCardProps {
  currentPlan: string;
  handleUpgradePlan: (plan: string) => void;
}

const MembershipPlansCard: React.FC<MembershipPlansCardProps> = ({ currentPlan, handleUpgradePlan }) => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const handleViewAllPlans = () => {
    navigate("/app/subscription-plans");
  };
  
  const getPrice = (monthlyPrice: string | number) => {
    if (monthlyPrice === "Free") return "Free";
    if (typeof monthlyPrice === 'string' && monthlyPrice.includes('Free')) return "Free";
    
    const price = typeof monthlyPrice === 'number' ? monthlyPrice : parseInt(monthlyPrice.replace(/\D/g, ''));
    
    if (billingCycle === 'yearly') {
      const yearlyPrice = price * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      return `$${discountedPrice}/year`;
    }
    
    return `$${price}/month`;
  };
  
  return (
    <Card className="bg-white shadow-md border border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
            <Crown className="h-6 w-6 text-amber-600" />
            Membership Plans
          </CardTitle>
          
          <div className="flex gap-1 p-0.5 bg-amber-100/50 rounded-lg border border-amber-200/50">
            <Button 
              variant={billingCycle === 'monthly' ? "secondary" : "ghost"}
              size="sm"
              className={`text-xs px-3 py-1 ${billingCycle === 'monthly' ? 'bg-amber-200' : 'text-amber-700'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </Button>
            <Button 
              variant={billingCycle === 'yearly' ? "secondary" : "ghost"}
              size="sm"
              className={`text-xs px-3 py-1 flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-amber-200' : 'text-amber-700'}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly 
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-full">-20%</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className={`border rounded-xl p-5 ${currentPlan === 'basic' ? 'bg-amber-50 border-amber-300' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Basic</h3>
              {currentPlan === 'basic' && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Current</span>
              )}
            </div>
            
            <p className="text-xl font-bold mb-4">Free</p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Standard co-pay credits (10%)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Basic wellness tools</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Add-ons at $3/each</span>
              </li>
            </ul>
            
            {currentPlan === 'basic' ? (
              <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-700"
                onClick={handleViewAllPlans}
              >
                Current Plan
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-700"
                onClick={() => handleUpgradePlan('basic')}
              >
                Downgrade
              </Button>
            )}
          </div>
          
          {/* Gold Plan */}
          <div className={`border rounded-xl p-5 ${currentPlan === 'gold' ? 'bg-amber-50 border-amber-300' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-700">Gold</h3>
              {currentPlan === 'gold' && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Current</span>
              )}
            </div>
            
            <p className="text-xl font-bold mb-4">{getPrice(5)}</p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Enhanced co-pay credits (+5%)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Advanced wellness tools</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Priority scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-sm text-gray-600">Add-ons at $2/each</span>
              </li>
            </ul>
            
            {currentPlan === 'gold' ? (
              <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-700"
                onClick={handleViewAllPlans}
              >
                Current Plan
              </Button>
            ) : (
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => handleUpgradePlan('gold')}
              >
                {currentPlan === 'platinum' ? 'Downgrade' : 'Upgrade'} <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          
          {/* Platinum Plan - Now marked as popular */}
          <div className={`border rounded-xl p-5 relative ${currentPlan === 'platinum' ? 'bg-gradient-to-br from-[#B87333]/10 to-amber-50 border-[#B87333]/30' : 'border-gray-200 bg-white'}`}>
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-[#B87333] text-white text-xs font-bold px-4 py-1 rounded-bl-lg shadow-md">
              MOST POPULAR
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#B87333]">Platinum</h3>
              {currentPlan === 'platinum' && (
                <span className="text-xs bg-[#B87333]/20 text-[#B87333] px-2 py-0.5 rounded-full">Current</span>
              )}
            </div>
            
            <p className="text-xl font-bold mb-4">{getPrice(10)}</p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#B87333] mt-0.5" />
                <span className="text-sm text-gray-600">Premium co-pay credits (+10%)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#B87333] mt-0.5" />
                <span className="text-sm text-gray-600">All wellness features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#B87333] mt-0.5" />
                <span className="text-sm text-gray-600">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#B87333] mt-0.5" />
                <span className="text-sm text-gray-600">Exclusive content access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#B87333] mt-0.5" />
                <span className="text-sm text-gray-600">Add-ons at $1/each</span>
              </li>
            </ul>
            
            {currentPlan === 'platinum' ? (
              <Button 
                variant="outline" 
                className="w-full border-[#B87333]/30 text-[#B87333]"
                onClick={handleViewAllPlans}
              >
                Current Plan
              </Button>
            ) : (
              <Button 
                className="w-full bg-gradient-to-r from-[#B87333] to-amber-600 hover:opacity-90 text-white"
                onClick={() => handleUpgradePlan('platinum')}
              >
                Upgrade <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-700"
            onClick={handleViewAllPlans}
          >
            View All Plans & Benefits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipPlansCard;

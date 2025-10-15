import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { addOns } from "./subscription-addons/data";
import { 
  getPriceDisplay, 
  calculateTotalPrice, 
  getBasePriceForPlan,
  getPriceDisplayWithStrikethrough 
} from "./subscription-addons/PriceCalculator";

interface CheckoutScreenProps {
  selectedPlan: string | null;
  selectedAddOns: string[];
  onContinue: () => void;
  onPrevious: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  selectedPlan,
  selectedAddOns,
  onContinue,
  onPrevious,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useUser();

  // Calculate pricing
  const planPricing = {
    'Basic': { monthly: 0, yearly: 0 },
    'Gold': { monthly: 5, yearly: 48 }, // $5/month, $48/year (20% discount)
    'Platinum': { monthly: 10, yearly: 96 } // $10/month, $96/year (20% discount)
  };

  const planPrice = selectedPlan ? planPricing[selectedPlan as keyof typeof planPricing] : { monthly: 0, yearly: 0 };
  const addOnTotal = calculateTotalPrice(selectedAddOns, selectedPlan, billingCycle);
  const planTotal = planPrice[billingCycle];
  const grandTotal = planTotal + addOnTotal;

  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan first.",
        variant: "destructive",
      });
      return;
    }

    // Wait for loading to complete and check authentication
    if (loading) {
      console.log('UserContext still loading, please wait...');
      return;
    }

    console.log('User authentication state:', { user, loading });

    if (!user) {
      // For free plans, allow proceeding without authentication
      if (grandTotal === 0) {
        toast({
          title: "Success!",
          description: "Your free plan has been activated.",
        });
        onContinue();
        return;
      }

      toast({
        title: "Authentication Required",
        description: "Please complete registration to continue.",
        variant: "destructive",
      });
      onPrevious(); // Go back to registration
      return;
    }

    setIsProcessing(true);

    try {
      // For free plans, just proceed
      if (grandTotal === 0) {
        toast({
          title: "Success!",
          description: "Your free plan has been activated.",
        });
        onContinue();
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planTitle: selectedPlan,
          billingCycle: billingCycle,
          selectedAddOns: selectedAddOns,
          totalAmount: grandTotal
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to payment...",
          description: "Complete your payment in the new tab, then return here.",
        });
        // Continue to vision board after opening payment
        setTimeout(onContinue, 2000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (amount: number, cycle: 'monthly' | 'yearly') => {
    return `$${amount}${cycle === 'yearly' ? '/year' : '/month'}`;
  };

  const getYearlyDiscount = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12;
    const discountedYearly = Math.round(yearlyPrice * 0.8);
    return { yearlyPrice, discountedYearly };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Review Your Order
          </CardTitle>
          <p className="text-muted-foreground">
            Complete your purchase to unlock your personalized mental wellness journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enhanced Billing Cycle Toggle */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-r from-muted/60 to-muted/40 p-1 rounded-xl border border-primary/20 shadow-lg">
              <div className="flex">
                <Button
                  variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                  size="lg"
                  onClick={() => setBillingCycle('monthly')}
                  className="rounded-xl px-6"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                  size="lg"
                  onClick={() => setBillingCycle('yearly')}
                  className="rounded-xl px-6"
                >
                  Yearly
                  <span className="ml-2 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full font-bold animate-pulse">
                    Save 20%!
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Prominent yearly savings message */}
            {billingCycle === 'yearly' && (
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-fade-in">
                <p className="text-green-800 font-semibold text-lg">
                  🎉 Great choice! You're saving 20% with yearly billing
                </p>
                <p className="text-green-600 text-sm mt-1">
                  That's 2.4 months free every year!
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Order Summary</h3>
            
            {/* Selected Plan */}
            {selectedPlan && (
              <div className="flex justify-between items-center py-2 border-b border-muted/30">
                <div>
                  <p className="font-medium">{selectedPlan} Plan</p>
                  <p className="text-sm text-muted-foreground">Base subscription</p>
                </div>
                <div className="text-right">
                  {billingCycle === 'yearly' && planTotal > 0 ? (
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground line-through">
                        ${planTotal * 12}/year
                      </span>
                      <p className="font-medium">{formatPrice(planTotal, billingCycle)}</p>
                    </div>
                  ) : (
                    <p className="font-medium">
                      {planTotal === 0 ? 'FREE' : formatPrice(planTotal, billingCycle)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Selected Add-ons */}
            {selectedAddOns.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Add-ons ({selectedAddOns.length})
                </h4>
                {selectedAddOns.map(addOnId => {
                  const addOn = addOns.find(a => a.id === addOnId);
                  if (!addOn) return null;
                  
                  const price = getPriceDisplay(selectedPlan, billingCycle);
                  const Icon = addOn.icon;
                  
                  return (
                    <div key={addOnId} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{addOn.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {addOn.description.slice(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-sm">{price}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total</p>
                <div className="text-right">
                  {billingCycle === 'yearly' && grandTotal > 0 ? (
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground line-through">
                        ${(planTotal + addOnTotal) * 12}/year
                      </span>
                      <p className="text-xl font-bold text-primary">
                        {formatPrice(grandTotal, billingCycle)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-primary">
                      {grandTotal === 0 ? 'FREE' : formatPrice(grandTotal, billingCycle)}
                    </p>
                  )}
                </div>
              </div>
              
              {billingCycle === 'yearly' && grandTotal > 0 && (
                <p className="text-sm text-green-600 mt-1 text-right">
                  You save ${((planTotal + addOnTotal) * 12) - grandTotal} per year!
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Add-ons</span>
            </Button>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex items-center space-x-2 min-w-[150px]"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : grandTotal === 0 ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Continue Free</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Complete Purchase</span>
                </>
              )}
            </Button>
          </div>

          {grandTotal > 0 && (
            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to a secure Stripe checkout page
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CheckoutScreen;
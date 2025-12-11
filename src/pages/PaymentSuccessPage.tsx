import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Sparkles, Trophy } from "lucide-react";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { checkSubscription } = useUser();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh subscription status after successful payment
    const refreshSubscription = async () => {
      try {
        await checkSubscription();
        toast({
          title: "Payment Successful!",
          description: "Your subscription has been activated. Welcome to premium features!",
          duration: 5000,
        });
      } catch (error) {
        console.error('Error refreshing subscription:', error);
      }
    };

    if (sessionId) {
      refreshSubscription();
    }
  }, [sessionId, checkSubscription, toast]);

  const handleGoHome = () => {
    navigate("/app/dashboard");
  };

  const handleManageSubscription = async () => {
    navigate("/subscription-plans");
  };

  return (
    <Page title="Payment Successful" fullWidth>
      <div className="min-h-[calc(100vh-200px)] relative overflow-hidden animate-fade-in">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c2e4a] via-[#2d3748] to-[#1a1a1f] -z-10"></div>
        
        {/* Animated background gradients */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '20s'}}></div>
        
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-green-500/20 backdrop-blur-sm rounded-full p-6 border border-green-500/40">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-400">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Thank you for subscribing to ThriveMT! Your premium features are now active and ready to enhance your mental wellness journey.
          </p>

          {/* Features Highlight */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-[#B87333]" />
              <h2 className="text-2xl font-semibold text-white">You Now Have Access To:</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Premium mental wellness tools</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Personalized wellness plans</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority support access</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Advanced analytics & insights</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Exclusive workshop content</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Co-pay credit bonuses</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-black font-semibold px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(184,115,51,0.4)] transition-all duration-300 group"
            >
              <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your Journey
            </Button>
            
            <Button
              onClick={handleManageSubscription}
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300"
            >
              View Subscription Details
            </Button>
          </div>

          {/* Session ID for reference */}
          {sessionId && (
            <div className="mt-8 text-sm text-gray-500">
              <p>Reference ID: {sessionId}</p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default PaymentSuccessPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/app/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Page title="Page Not Found">
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <AlertTriangle className="h-20 w-20 text-amber-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-300 mb-8">Sorry, we couldn't find the page you're looking for</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="default" 
            onClick={handleGoHome}
            className="bg-[#B87333] hover:bg-[#A56625] text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="border-white/10 text-gray-200 hover:bg-white/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default NotFound;

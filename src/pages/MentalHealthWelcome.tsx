
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const MentalHealthWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferredLanguage, getTranslatedText } = useTranslation();

  const handleContinue = () => {
    toast({
      title: getTranslatedText('enteringPortal'),
      description: getTranslatedText('loadingMentalHealthResources'),
      duration: 1500,
    });
    
    navigate("/mental-health-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={getTranslatedText('mentalHealth')} className="bg-gradient-to-br from-[#9b87f5]/10 to-[#6E59A5]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#9b87f5]/20 mb-4">
            <Brain size={40} className="text-[#9b87f5]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {getTranslatedText('welcomeToMentalHealth')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {getTranslatedText('mentalHealthDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <PieChart className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('statistics')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('mentalHealthStats')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <Book className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('resources')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('mentalHealthResources')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <CalendarCheck className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('workshops')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('mentalHealthWorkshops')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <ClipboardCheck className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('assessments')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('mentalHealthAssessments')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#9b87f5] hover:bg-[#6E59A5] text-white py-2 px-8 rounded-lg text-lg"
          >
            {getTranslatedText('continueToPortal')}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default MentalHealthWelcome;

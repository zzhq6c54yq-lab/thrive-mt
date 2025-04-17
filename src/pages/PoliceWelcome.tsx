
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const PoliceWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferredLanguage, getTranslatedText } = useTranslation();

  const handleContinue = () => {
    toast({
      title: getTranslatedText('enteringPortal'),
      description: getTranslatedText('loadingLawEnforcementResources'),
      duration: 1500,
    });
    
    navigate("/police-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={getTranslatedText('lawEnforcement')} className="bg-gradient-to-br from-[#1E3A8A]/10 to-[#1E40AF]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#1E3A8A]/20 mb-4">
            <Badge size={40} className="text-[#1E3A8A]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {getTranslatedText('welcomeTo')} {getTranslatedText('lawEnforcement')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {getTranslatedText('lawEnforcementDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <PieChart className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('statistics')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('lawEnforcementStats')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <Book className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('resources')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('lawEnforcementResources')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <CalendarCheck className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('workshops')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('lawEnforcementWorkshops')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <ClipboardCheck className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{getTranslatedText('assessments')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getTranslatedText('lawEnforcementAssessments')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2 px-8 rounded-lg text-lg"
          >
            {getTranslatedText('continueToPortal')}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default PoliceWelcome;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import MilitaryAssessment from "@/components/military/MilitaryAssessment";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MilitaryAssessmentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { assessmentType, assessmentTitle, returnToPortal } = location.state || {};

  const getPageTitle = () => {
    switch (assessmentType) {
      case "ptsd": return "PTSD Screening";
      case "depression": return "Depression Assessment";
      case "anxiety": return "Anxiety Assessment";
      case "stress": return "Stress Assessment";
      case "readjustment": return "Social Readjustment";
      default: return "Military Assessment";
    }
  };

  const handleBack = () => {
    navigate(returnToPortal || "/dod-portal", { 
      state: { 
        preventTutorial: true,
        activeTab: "assessments"
      } 
    });
  };

  // If no assessment type is provided, return to portal
  if (!assessmentType) {
    navigate("/dod-portal", { 
      state: { 
        preventTutorial: true,
        activeTab: "assessments"
      } 
    });
    return null;
  }

  return (
    <Page title={assessmentTitle || getPageTitle()}>
      <div className="mb-4">
        <Button 
          variant="ghost" 
          className="text-white/70 hover:text-white"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portal
        </Button>
      </div>

      <MilitaryAssessment 
        type={assessmentType} 
        title={assessmentTitle || getPageTitle()}
        returnPath={returnToPortal || "/dod-portal"}
      />
    </Page>
  );
};

export default MilitaryAssessmentPage;


import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Workshop from "@/components/Workshop";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const workshop = workshopData.find(w => w.id === workshopId);
  
  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }
  
  const handleBack = () => {
    toast({
      title: "Returning to Main Menu",
      description: "Taking you back to the main menu"
    });
    
    // Take user to main menu instead of previous page
    navigate("/", { state: { screenState: 'main' } });
  };
  
  return (
    <Page title={workshop.title} showBackButton={true} onBackClick={handleBack}>
      <Workshop workshopData={workshop} />
    </Page>
  );
};

export default WorkshopDetail;


import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Workshop from "@/components/Workshop";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  
  const workshop = workshopData.find(w => w.id === workshopId);
  
  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }
  
  const handleBack = () => {
    navigate("/");
  };
  
  return (
    <Page title={workshop.title} showBackButton={true} onBackClick={handleBack}>
      <Workshop workshopData={workshop} />
    </Page>
  );
};

export default WorkshopDetail;


import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Workshop from "@/components/Workshop";
import { workshopData } from "@/data/workshopData";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  
  const workshop = workshopData.find(w => w.id === workshopId);
  
  if (!workshop) {
    return <Navigate to="/" replace />;
  }
  
  return <Workshop workshopData={workshop} />;
};

export default WorkshopDetail;

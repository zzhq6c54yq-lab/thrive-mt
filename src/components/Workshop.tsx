
import React from "react";
import { LucideIcon } from "lucide-react";

export interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
  sections: Array<{
    title: string;
    duration: string;
    content: string;
    exercises: Array<{
      title: string;
      instructions: string;
    }>;
  }>;
}

interface WorkshopProps {
  workshopData: WorkshopData;
}

const Workshop: React.FC<WorkshopProps> = ({ workshopData }) => {
  return (
    <div>
      <h2>{workshopData.title}</h2>
      <p>{workshopData.description}</p>
    </div>
  );
};

export default Workshop;

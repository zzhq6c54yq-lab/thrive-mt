import React from "react";

interface WorkshopProps {
  workshopData: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    duration: string;
  };
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


import React from "react";
import { CheckSquare } from "lucide-react";

const DecisionSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
    <div className="flex items-center mb-2">
      <CheckSquare className="h-5 w-5 mr-2 text-[#D4AF37]" />
      <h4 className="text-lg font-medium text-[#F5DEB3]">{title}</h4>
    </div>
    <p className="text-gray-200 mb-1">Consider and document your preferences regarding:</p>
    <ul className="list-disc list-inside text-gray-200 text-sm ml-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const DecisionsTabContent = () => {
  return (
    <>
      <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Important Decisions to Consider</h3>
      <div className="space-y-4">
        <DecisionSection
          title="Medical Preferences"
          items={[
            "Life-sustaining treatments",
            "Palliative and hospice care",
            "Organ donation wishes",
            "Pain management approaches"
          ]}
        />
        <DecisionSection
          title="Final Arrangements"
          items={[
            "Burial or cremation",
            "Memorial service details",
            "Legacy donations or charitable gifts",
            "Personal mementos for loved ones"
          ]}
        />
      </div>
    </>
  );
};

export default DecisionsTabContent;

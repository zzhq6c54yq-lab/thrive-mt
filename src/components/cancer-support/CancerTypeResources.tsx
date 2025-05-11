
import React from "react";
import { useParams } from "react-router-dom";

const cancerTypeInfo: Record<string, {
  name: string;
  description: string;
  resources: Array<{title: string; description: string}>
}> = {
  breast: {
    name: "Breast Cancer",
    description: "Resources and support for those affected by breast cancer, including information on diagnosis, treatment options, and recovery.",
    resources: [
      { 
        title: "Understanding Breast Cancer Types", 
        description: "Information about different types of breast cancer, including ductal, lobular, and inflammatory." 
      },
      { 
        title: "Treatment Options", 
        description: "Overview of surgical options, chemotherapy, radiation, hormonal therapy, and targeted treatments." 
      },
      { 
        title: "Life After Diagnosis", 
        description: "Guidance for emotional support, telling family and friends, and managing work during treatment." 
      }
    ]
  },
  lung: {
    name: "Lung Cancer",
    description: "Information and support for those affected by lung cancer, covering screening, diagnosis, treatment, and survivorship.",
    resources: [
      { 
        title: "Types & Staging", 
        description: "Understanding small cell and non-small cell lung cancer, and what different stages mean." 
      },
      { 
        title: "Treatment Approaches", 
        description: "Information on surgery, radiation, chemotherapy, targeted therapy, and immunotherapy options." 
      },
      { 
        title: "Living Well with Lung Cancer", 
        description: "Tips for managing symptoms, breathing exercises, nutrition, and emotional wellbeing." 
      }
    ]
  },
  colorectal: {
    name: "Colorectal Cancer",
    description: "Resources for colorectal cancer patients and families, including screening information, treatment options, and survivor stories.",
    resources: [
      { 
        title: "Screening & Early Detection", 
        description: "Guidelines for colorectal cancer screening and understanding test results." 
      },
      { 
        title: "Treatment Pathways", 
        description: "Information about surgery, chemotherapy, radiation, and targeted therapies for colorectal cancer." 
      },
      { 
        title: "Ostomy Support", 
        description: "Resources for those with temporary or permanent ostomies, including care and adjustment." 
      }
    ]
  },
  // Add other cancer types as needed
};

const CancerTypeResources: React.FC = () => {
  const { cancerType } = useParams<{cancerType: string}>();
  const typeData = cancerType ? cancerTypeInfo[cancerType] : null;
  
  if (!typeData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Resource information for this cancer type is being developed.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{typeData.name} Resources</h2>
        <p className="text-gray-600 dark:text-white/70 mb-6">
          {typeData.description}
        </p>
        
        <div className="space-y-4">
          {typeData.resources.map((resource, index) => (
            <div key={index} className="p-4 bg-white dark:bg-[#1A1616] border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">{resource.title}</h3>
              <p className="text-gray-600 dark:text-white/70 text-sm">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CancerTypeResources;

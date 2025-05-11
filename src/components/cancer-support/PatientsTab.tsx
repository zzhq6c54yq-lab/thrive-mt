
import React from "react";
import { BookHeart, Users, Star, Calendar, Heart, MessageCircle, StarHalf } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Separator } from "@/components/ui/separator";

interface PatientsTabProps {
  onFeatureClick: (path: string) => void;
}

const cancerTypes = [
  { id: 'breast', name: 'Breast Cancer' },
  { id: 'lung', name: 'Lung Cancer' },
  { id: 'colorectal', name: 'Colorectal Cancer' },
  { id: 'prostate', name: 'Prostate Cancer' },
  { id: 'skin', name: 'Skin Cancer' },
  { id: 'lymphoma', name: 'Lymphoma' },
  { id: 'leukemia', name: 'Leukemia' },
  { id: 'pancreatic', name: 'Pancreatic Cancer' },
  { id: 'ovarian', name: 'Ovarian Cancer' },
  { id: 'brain', name: 'Brain Cancer' },
  { id: 'thyroid', name: 'Thyroid Cancer' },
  { id: 'kidney', name: 'Kidney Cancer' }
];

const PatientsTab: React.FC<PatientsTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Patient Support</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Resources specifically designed for individuals diagnosed with cancer at any stage of their journey - from newly diagnosed to long-term survivorship.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FeatureCard 
          title="Newly Diagnosed"
          description="Essential information and support for those recently diagnosed with cancer"
          icon={Heart}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/newly-diagnosed")}
        />
        <FeatureCard 
          title="Treatment Resources"
          description="Information about different treatment options, side effects, and management strategies"
          icon={Star}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/treatment")}
        />
        <FeatureCard 
          title="Cancer Stages"
          description="Understanding cancer stages and what they mean for treatment and prognosis"
          icon={StarHalf}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/stages")}
        />
        <FeatureCard 
          title="Survivorship"
          description="Resources for life after treatment, including follow-up care and emotional support"
          icon={BookHeart}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/survivorship")}
        />
        <FeatureCard 
          title="Peer Connect"
          description="Connect with others who understand what you're going through"
          icon={Users}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/peer-connect")}
        />
        <FeatureCard 
          title="Support Events"
          description="Virtual and in-person events specifically for cancer patients"
          icon={Calendar}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/events")}
        />
      </div>
    </div>
    
    <Separator className="my-8" />
    
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Cancer Type Resources</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Explore specialized information, support groups, and resources for specific cancer types.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cancerTypes.map((type) => (
          <button 
            key={type.id}
            onClick={() => onFeatureClick(`cancer-support/types/${type.id}`)}
            className="p-3 bg-white dark:bg-[#1A1616] border border-rose-200/30 dark:border-rose-800/30 rounded-md hover:border-rose-400/50 dark:hover:border-rose-600/50 text-gray-800 dark:text-white text-sm font-medium text-center transition-colors"
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
    
    <div className="mt-8 p-6 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800/30">
      <h4 className="font-medium text-rose-900 dark:text-rose-300 flex items-center gap-2 mb-2">
        <MessageCircle className="h-4 w-4" />
        Need Immediate Support?
      </h4>
      <p className="text-rose-800 dark:text-rose-200 text-sm">
        Connect with a support specialist or join a live virtual support group. 
        Available 24/7 for anyone affected by cancer.
      </p>
      <button
        onClick={() => onFeatureClick("cancer-support/immediate-support")}
        className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-sm font-medium"
      >
        Connect Now
      </button>
    </div>
  </div>
);

export default PatientsTab;


import React from "react";
import { BookOpen, BookHeart, Star, Calendar, MessageCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Educational Resources</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Access reliable, up-to-date information about cancer types, treatments, research, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="Cancer Types Library"
          description="Comprehensive information about different types of cancer, symptoms, and risk factors"
          icon={BookOpen}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/cancer-types")}
        />
        <FeatureCard 
          title="Treatment Options"
          description="Learn about surgery, chemotherapy, radiation, immunotherapy, and other treatment approaches"
          icon={BookHeart}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/treatment-options")}
        />
        <FeatureCard 
          title="Side Effect Management"
          description="Strategies and resources for coping with treatment side effects"
          icon={Star}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/side-effects")}
        />
        <FeatureCard 
          title="Nutrition During Cancer"
          description="Dietary guidance for different phases of cancer treatment and recovery"
          icon={BookOpen}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/nutrition")}
        />
        <FeatureCard 
          title="Clinical Trials"
          description="Information about finding and understanding clinical trials"
          icon={BookHeart}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/clinical-trials")}
        />
        <FeatureCard 
          title="Research Updates"
          description="Latest advances in cancer research and treatment"
          icon={BookOpen}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/research-updates")}
        />
      </div>
    </div>
    
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Practical Resources</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Tools and guides to help navigate the practical aspects of cancer care.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="Financial Resources"
          description="Information on insurance, financial assistance, and managing cancer-related costs"
          icon={BookOpen}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/financial-resources")}
        />
        <FeatureCard 
          title="Healthcare Navigation"
          description="Tools for communicating with your healthcare team and managing appointments"
          icon={Star}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/healthcare-navigation")}
        />
        <FeatureCard 
          title="Legal Resources"
          description="Information about employment rights, disability, and advance care planning"
          icon={BookHeart}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/legal-resources")}
        />
      </div>
    </div>
    
    <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
      <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Inspirational Resources</h4>
      <p className="text-amber-800 dark:text-amber-200 text-sm">
        Stories of hope, strength, and resilience from cancer survivors and their loved ones.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onFeatureClick("cancer-support/survivor-stories")}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium"
        >
          Survivor Stories
        </button>
        <button
          onClick={() => onFeatureClick("cancer-support/daily-inspiration")}
          className="px-4 py-2 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md text-sm font-medium"
        >
          Daily Inspiration
        </button>
      </div>
    </div>
  </div>
);

export default ResourcesTab;

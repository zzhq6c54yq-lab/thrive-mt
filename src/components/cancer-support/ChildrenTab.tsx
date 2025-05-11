
import React from "react";
import { BookHeart, Heart, Star, Calendar, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Separator } from "@/components/ui/separator";

interface ChildrenTabProps {
  onFeatureClick: (path: string) => void;
}

const ChildrenTab: React.FC<ChildrenTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">For Parents with Cancer</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Resources to help parents navigate cancer while supporting their children through the journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard 
          title="Talking to Children"
          description="Age-appropriate ways to discuss cancer diagnosis and treatment with children"
          icon={BookHeart}
          color="bg-sky-500"
          onClick={() => onFeatureClick("cancer-support/talking-to-children")}
        />
        <FeatureCard 
          title="Supporting Children's Emotions"
          description="Helping children process their feelings about a parent's cancer"
          icon={Heart}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/children-emotions")}
        />
        <FeatureCard 
          title="Parenting Through Treatment"
          description="Managing family life and parenting during cancer treatment"
          icon={Star}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/parenting-through-treatment")}
        />
        <FeatureCard 
          title="Family Activities"
          description="Meaningful ways to stay connected as a family during the cancer journey"
          icon={Calendar}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/family-activities")}
        />
      </div>
    </div>
    
    <Separator />
    
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">For Parents of Children with Cancer</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Specialized support and resources for families navigating pediatric cancer.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard 
          title="Understanding Pediatric Cancer"
          description="Information about common childhood cancers, treatments, and care"
          icon={BookHeart}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/pediatric-cancer")}
        />
        <FeatureCard 
          title="Family Support"
          description="Resources for the entire family, including siblings and extended family members"
          icon={Users}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/family-support")}
        />
        <FeatureCard 
          title="Hospital & School Navigation"
          description="Guidance for managing hospital stays and maintaining education"
          icon={Star}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/hospital-school")}
        />
        <FeatureCard 
          title="Parent Connect"
          description="Connect with other parents who understand what you're going through"
          icon={Heart}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/parent-connect")}
        />
      </div>
    </div>
    
    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Children's Support Programs</h4>
      <p className="text-blue-800 dark:text-blue-200 text-sm">
        Special programs designed specifically for children affected by cancer - whether their own diagnosis or a loved one's.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onFeatureClick("cancer-support/kids-connect")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Kids Connect Programs
        </button>
        <button
          onClick={() => onFeatureClick("cancer-support/teen-programs")}
          className="px-4 py-2 border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm font-medium"
        >
          Teen Support
        </button>
      </div>
    </div>
  </div>
);

export default ChildrenTab;

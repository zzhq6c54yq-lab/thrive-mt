
import React from "react";
import { Users, MessageCircle, Calendar, Star } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Separator } from "@/components/ui/separator";

interface CommunitiesTabProps {
  onFeatureClick: (path: string) => void;
}

const CommunitiesTab: React.FC<CommunitiesTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Support Communities</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Connect with others who understand your experience through our specialized support communities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard 
          title="General Cancer Support"
          description="For anyone affected by cancer - patients, survivors, caregivers, and loved ones"
          icon={Users}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/general-community")}
        />
        <FeatureCard 
          title="Cancer Type Groups"
          description="Communities organized by specific cancer types and experiences"
          icon={Users}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/cancer-type-communities")}
        />
        <FeatureCard 
          title="Virtual Support Meetings"
          description="Scheduled online gatherings facilitated by trained moderators"
          icon={Calendar}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/virtual-meetings")}
        />
        <FeatureCard 
          title="One-on-One Support"
          description="Connect with a peer mentor who has been through a similar experience"
          icon={MessageCircle}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/one-on-one")}
        />
      </div>
    </div>
    
    <Separator />
    
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Featured Community Groups</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-[#1A1616] border border-indigo-200/30 dark:border-indigo-800/30 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Young Adults with Cancer</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-white/70 mb-3">
            A space for young adults (18-39) dealing with the unique challenges of cancer during formative years.
          </p>
          <button
            onClick={() => onFeatureClick("cancer-support/young-adults")}
            className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Join Community →
          </button>
        </div>
        
        <div className="p-4 bg-white dark:bg-[#1A1616] border border-purple-200/30 dark:border-purple-800/30 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Metastatic Cancer Support</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-white/70 mb-3">
            Support for those dealing with metastatic/advanced stage cancer and their loved ones.
          </p>
          <button
            onClick={() => onFeatureClick("cancer-support/metastatic")}
            className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            Join Community →
          </button>
        </div>
        
        <div className="p-4 bg-white dark:bg-[#1A1616] border border-rose-200/30 dark:border-rose-800/30 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <Users className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Caregivers Circle</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-white/70 mb-3">
            A supportive community for those caring for someone with cancer.
          </p>
          <button
            onClick={() => onFeatureClick("cancer-support/caregivers-circle")}
            className="text-sm text-rose-600 dark:text-rose-400 font-medium hover:underline"
          >
            Join Community →
          </button>
        </div>
        
        <div className="p-4 bg-white dark:bg-[#1A1616] border border-amber-200/30 dark:border-amber-800/30 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Survivorship Community</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-white/70 mb-3">
            For those who have completed treatment and are navigating life after cancer.
          </p>
          <button
            onClick={() => onFeatureClick("cancer-support/survivorship-community")}
            className="text-sm text-amber-600 dark:text-amber-400 font-medium hover:underline"
          >
            Join Community →
          </button>
        </div>
      </div>
    </div>
    
    <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30 text-center">
      <Star className="h-8 w-8 mx-auto text-blue-500 mb-3" />
      <h4 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Start Your Own Group</h4>
      <p className="text-blue-700 dark:text-blue-200 text-sm mb-4">
        Don't see a community that meets your needs? Create your own support group 
        focused on specific experiences or cancer types.
      </p>
      <button
        onClick={() => onFeatureClick("cancer-support/create-group")}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
      >
        Start a Group
      </button>
    </div>
  </div>
);

export default CommunitiesTab;

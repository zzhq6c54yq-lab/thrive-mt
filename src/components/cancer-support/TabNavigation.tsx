
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, BookOpen, HeartHandshake, Star, Baby, Flower } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface TabNavigationProps {
  activeTab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children';
  onTabChange: (tab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'patients', label: isSpanish ? "Pacientes" : "Patients", icon: <User className="w-4 h-4" /> },
    { id: 'caregivers', label: isSpanish ? "Cuidadores" : "Caregivers", icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'children', label: isSpanish ? "Niños y Padres" : "Children & Parents", icon: <Baby className="w-4 h-4" /> },
    { id: 'resources', label: isSpanish ? "Recursos" : "Resources", icon: <BookOpen className="w-4 h-4" /> },
    { id: 'communities', label: isSpanish ? "Comunidades" : "Communities", icon: <Users className="w-4 h-4" /> },
    { id: 'remembrance', label: isSpanish ? "Conmemoración" : "Remembrance", icon: <Flower className="w-4 h-4" /> },
  ];
  
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-1 border-b border-rose-300/30 dark:border-rose-500/20 bg-[#FBE8E8] dark:bg-[#1A1212] px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex items-center space-x-1 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors
              ${activeTab === tab.id ? 
                'border-rose-500 text-rose-600 dark:text-rose-400 dark:border-rose-400' : 
                'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
          >
            <span className="inline-flex items-center justify-center mr-1.5">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;

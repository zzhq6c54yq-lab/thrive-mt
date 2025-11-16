
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
    <nav className="overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`group relative flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === tab.id ? 
                'text-rose-600 dark:text-rose-400' : 
                'text-gray-600 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-300'
              }`}
          >
            <span className={`transition-transform ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500"></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;

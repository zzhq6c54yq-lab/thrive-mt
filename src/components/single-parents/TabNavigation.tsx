import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, Users, BookOpen, Calendar } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface TabNavigationProps {
  activeTab: 'wellness' | 'tools' | 'network' | 'resources' | 'workshops';
  onTabChange: (tab: 'wellness' | 'tools' | 'network' | 'resources' | 'workshops') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { isSpanish } = useTranslation();

  const tabs = [
    { id: 'wellness' as const, label: isSpanish ? "Bienestar" : "Parent Wellness", icon: Heart },
    { id: 'tools' as const, label: isSpanish ? "Herramientas" : "Parenting Tools", icon: Lightbulb },
    { id: 'network' as const, label: isSpanish ? "Red de Padres" : "Parent Network", icon: Users },
    { id: 'resources' as const, label: isSpanish ? "Recursos" : "Resources", icon: BookOpen },
    { id: 'workshops' as const, label: isSpanish ? "Talleres" : "Workshops", icon: Calendar }
  ];

  return (
    <div className="flex overflow-x-auto border-b border-border bg-card/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 min-w-[120px] rounded-none border-b-2 transition-all ${
              activeTab === tab.id 
                ? "border-rose-500 bg-rose-500/10 text-rose-600" 
                : "border-transparent hover:bg-muted"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
